"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Github, 
  Code, 
  Server, 
  Globe, 
  Zap, 
  Loader2,
  FolderOpen
} from "lucide-react";
import Image from "next/image";
import { importPlaygroundFromGithub } from "../actions/github-import";

type ImportRepoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

interface TemplateOption {
  id: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  name: string;
  icon: string;
  color: string;
  category: "frontend" | "backend" | "fullstack";
}

const stacks: TemplateOption[] = [
  {
    id: "REACT",
    name: "React (Vite)",
    icon: "/react.svg",
    color: "#61DAFB",
    category: "frontend",
  },
  {
    id: "NEXTJS",
    name: "Next.js",
    icon: "/nextjs-icon.svg",
    color: "#000000",
    category: "fullstack",
  },
  {
    id: "EXPRESS",
    name: "Express.js",
    icon: "/expressjs-icon.svg",
    color: "#000000",
    category: "backend",
  },
  {
    id: "VUE",
    name: "Vue.js (Vite)",
    icon: "/vuejs-icon.svg",
    color: "#4FC08D",
    category: "frontend",
  },
  {
    id: "HONO",
    name: "Hono.js",
    icon: "/hono.svg",
    color: "#e36002",
    category: "backend",
  },
  {
    id: "ANGULAR",
    name: "Angular",
    icon: "/angular-2.svg",
    color: "#DD0031",
    category: "fullstack",
  },
];

export default function ImportRepoModal({ isOpen, onClose }: ImportRepoModalProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [selectedStack, setSelectedStack] = useState<TemplateOption["id"] | null>("REACT");
  const [isImporting, setIsImporting] = useState(false);
  const router = useRouter();

  // Extract repo name for title placeholder
  const handleUrlChange = (val: string) => {
    setRepoUrl(val);
    
    // Auto-fill project title if empty or matches previous auto-fill
    const cleanUrl = val.trim().replace(/\.git$/, "").replace(/\/$/, "");
    const parts = cleanUrl.split("/");
    const repoName = parts[parts.length - 1];
    
    if (repoName && repoName !== "github.com") {
      setProjectTitle(repoName);
    }
  };

  const handleImport = async () => {
    if (!repoUrl) {
      toast.error("Please enter a GitHub repository URL or identifier.");
      return;
    }
    if (!selectedStack) {
      toast.error("Please select a template stack to run your repository.");
      return;
    }

    setIsImporting(true);
    const promise = importPlaygroundFromGithub({
      repoUrl,
      title: projectTitle,
      template: selectedStack,
    });

    toast.promise(promise, {
      loading: "Cloning repository and preparing workspace...",
      success: (data) => {
        if (!data.success) {
          throw new Error(data.error);
        }
        onClose();
        router.push(`/playground/${data.playgroundId}`);
        return "Repository imported successfully!";
      },
      error: (err) => {
        setIsImporting(false);
        return err instanceof Error ? err.message : "Failed to import repository.";
      }
    });

    try {
      await promise;
    } catch (e) {
      setIsImporting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isImporting) {
          onClose();
          // Reset states
          setRepoUrl("");
          setProjectTitle("");
          setSelectedStack("REACT");
        }
      }}
    >
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#e93f3f] flex items-center gap-2">
            <Github size={24} className="text-[#e93f3f]" />
            Import from GitHub
          </DialogTitle>
          <DialogDescription>
            Import a public repository to run and edit directly in the browser.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 py-4">
          {/* GitHub Repo Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="repo-url" className="text-sm font-semibold">
              Repository URL or Path
            </Label>
            <Input
              id="repo-url"
              placeholder="https://github.com/owner/repo or owner/repo"
              value={repoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              disabled={isImporting}
              className="bg-zinc-900/50 border-zinc-800"
            />
          </div>

          {/* Project Title Input */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="project-title" className="text-sm font-semibold">
              Project Name
            </Label>
            <Input
              id="project-title"
              placeholder="my-project-name"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              disabled={isImporting}
              className="bg-zinc-900/50 border-zinc-800"
            />
          </div>

          {/* Stack Selection */}
          <div className="flex flex-col gap-3">
            <div>
              <Label className="text-sm font-semibold">Select Runtime Environment</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose the stack that corresponds to your repository, used to start the development server.
              </p>
            </div>

            <RadioGroup
              value={selectedStack || ""}
              onValueChange={(val) => setSelectedStack(val as any)}
              disabled={isImporting}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stacks.map((stack) => (
                  <div
                    key={stack.id}
                    onClick={() => !isImporting && setSelectedStack(stack.id)}
                    className={`relative flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-[1.02]
                      ${
                        selectedStack === stack.id
                          ? "border-[#E93F3F] bg-[#E93F3F]/5 shadow-[0_0_0_1px_#E93F3F,0_8px_20px_rgba(233,63,63,0.1)]"
                          : "border-zinc-800 bg-zinc-900/30 hover:border-[#E93F3F]"
                      }`}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full mb-2"
                      style={{ backgroundColor: `${stack.color}15` }}
                    >
                      <Image
                        src={stack.icon || "/placeholder.svg"}
                        alt={`${stack.name} icon`}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>

                    <span className="text-xs font-semibold text-center">{stack.name}</span>

                    <div className="flex items-center gap-1 mt-1">
                      {stack.category === "frontend" && (
                        <Code size={10} className="text-blue-500" />
                      )}
                      {stack.category === "backend" && (
                        <Server size={10} className="text-green-500" />
                      )}
                      {stack.category === "fullstack" && (
                        <Globe size={10} className="text-purple-500" />
                      )}
                      <span className="text-[10px] text-muted-foreground capitalize">
                        {stack.category}
                      </span>
                    </div>

                    <RadioGroupItem
                      value={stack.id}
                      id={stack.id}
                      className="sr-only"
                    />
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-zinc-800">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isImporting}
            className="border-zinc-800"
          >
            Cancel
          </Button>
          <Button
            className="bg-[#E93F3F] hover:bg-[#d03636] text-white flex items-center gap-2"
            disabled={isImporting || !repoUrl}
            onClick={handleImport}
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <FolderOpen className="h-4 w-4" />
                Import Project
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
