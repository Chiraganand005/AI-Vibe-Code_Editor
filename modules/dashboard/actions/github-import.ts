"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import JSZip from "jszip";
import type { TemplateFolder } from "@/modules/playground/lib/path-to-json";
import { revalidatePath } from "next/cache";

// Helper to parse github url or path
function parseGithubUrl(url: string) {
  let cleanUrl = url.trim().replace(/\.git$/, "").replace(/\/$/, "");
  
  // If it's "owner/repo"
  const simpleMatch = cleanUrl.match(/^([a-zA-Z0-9-_\.]+)\/([a-zA-Z0-9-_\.]+)$/);
  if (simpleMatch && !cleanUrl.startsWith("http")) {
    return { owner: simpleMatch[1], repo: simpleMatch[2] };
  }

  // If it's a URL
  try {
    const parsed = new URL(cleanUrl.startsWith("http") ? cleanUrl : `https://${cleanUrl}`);
    if (parsed.hostname === "github.com") {
      const paths = parsed.pathname.split("/").filter(Boolean);
      if (paths.length >= 2) {
        return { owner: paths[0], repo: paths[1] };
      }
    }
  } catch (e) {}

  return null;
}

export const importPlaygroundFromGithub = async (data: {
  repoUrl: string;
  title: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  description?: string;
}) => {
  const user = await currentUser();
  if (!user || !user.id) {
    return { success: false, error: "Authentication required. Please sign in." };
  }

  const parsed = parseGithubUrl(data.repoUrl);
  if (!parsed) {
    return { success: false, error: "Invalid GitHub URL or Repository path. Format: 'owner/repo' or GitHub URL." };
  }

  const { owner, repo } = parsed;

  try {
    // 1. Fetch user's GitHub access token from the DB if available
    const githubAccount = await db.account.findFirst({
      where: {
        userId: user.id,
        provider: "github",
      },
    });
    const token = githubAccount?.access_token;

    // 2. Fetch the repository default branch to build the download URL
    const repoInfoHeaders: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "VibeCode-IDE",
    };
    if (token) {
      repoInfoHeaders["Authorization"] = `Bearer ${token}`;
    }

    const repoInfoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: repoInfoHeaders,
    });

    if (!repoInfoRes.ok) {
      if (repoInfoRes.status === 404) {
        return { 
          success: false, 
          error: "Repository not found. Ensure it is public, or check your GitHub connection." 
        };
      }
      return { success: false, error: `GitHub API error: ${repoInfoRes.statusText}` };
    }

    const repoInfo = await repoInfoRes.json();
    const defaultBranch = repoInfo.default_branch || "main";

    // 3. Download zipball from GitHub
    const downloadHeaders: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "VibeCode-IDE",
    };
    if (token) {
      downloadHeaders["Authorization"] = `Bearer ${token}`;
    }

    const downloadRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/zipball/${defaultBranch}`,
      { headers: downloadHeaders }
    );

    if (!downloadRes.ok) {
      return { success: false, error: `Failed to download source archive: ${downloadRes.statusText}` };
    }

    // 4. Parse zip buffer in memory
    const buffer = await downloadRes.arrayBuffer();
    const zip = await JSZip.loadAsync(buffer);
    const zipFilesList = Object.keys(zip.files);

    if (zipFilesList.length === 0) {
      return { success: false, error: "The repository archive is empty." };
    }

    const rootDirName = zipFilesList[0].split("/")[0];
    const templateJson: TemplateFolder = {
      folderName: "Root",
      items: [],
    };

    // 5. Build file structure
    for (const [relativePath, file] of Object.entries(zip.files)) {
      if (file.dir) continue;

      const parts = relativePath.split("/");
      parts.shift(); // Remove the top-level repo folder
      if (parts.length === 0 || !parts[parts.length - 1]) continue;

      // Exclude common large directories and locked configuration files
      const isIgnored = parts.some(part =>
        ["node_modules", ".git", ".next", "dist", "build", "out", "coverage", ".vscode", ".idea", "package-lock.json", "yarn.lock", "pnpm-lock.yaml"].includes(part)
      );
      if (isIgnored) continue;

      const fullName = parts[parts.length - 1];
      const dotIndex = fullName.lastIndexOf(".");
      const fileExtension = dotIndex !== -1 ? fullName.substring(dotIndex + 1).toLowerCase() : "";
      
      // Exclude binary extensions
      const isBinary = /^(png|jpe?g|gif|ico|webp|svg|woff2?|eot|ttf|mp3|mp4|zip|pdf|docx|xlsx|tar|gz|exe|dll|so|dylib)$/i.test(fileExtension);
      if (isBinary) continue;

      // Traverse/create folders in template structure
      let currentFolder = templateJson;
      for (let i = 0; i < parts.length - 1; i++) {
        const dirName = parts[i];
        let subFolder = currentFolder.items.find(
          (item) => "folderName" in item && item.folderName === dirName
        ) as TemplateFolder | undefined;
        if (!subFolder) {
          subFolder = { folderName: dirName, items: [] };
          currentFolder.items.push(subFolder);
        }
        currentFolder = subFolder;
      }

      const filename = dotIndex !== -1 ? fullName.substring(0, dotIndex) : fullName;
      const content = await file.async("text");

      // Skip files exceeding size limits (e.g. 500KB)
      if (content.length > 500 * 1024) continue;

      currentFolder.items.push({
        filename,
        fileExtension,
        content,
      });
    }

    // 6. Create playground in the DB
    const playground = await db.playground.create({
      data: {
        title: data.title || repo,
        description: data.description || `Imported from ${owner}/${repo}`,
        template: data.template,
        userId: user.id,
        templateFiles: {
          create: {
            content: JSON.stringify(templateJson),
          },
        },
      },
    });

    revalidatePath("/dashboard");

    return {
      success: true,
      playgroundId: playground.id,
    };
  } catch (error) {
    console.error("Error importing GitHub repository:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unexpected error occurred during import.",
    };
  }
};
