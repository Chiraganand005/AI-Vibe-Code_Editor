import React from "react";
import { getAllPlaygroundForUser, deleteProjectById } from "@/modules/dashboard/actions";
import PlaygroundsClient from "./playgrounds-client";
import { FolderOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PlaygroundsPage() {
  const playgrounds = await getAllPlaygroundForUser() || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Header Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-zinc-600 dark:text-zinc-400">|</span>
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-red-500" />
            <h1 className="font-bold text-lg">All Playgrounds</h1>
          </div>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-300">
            To Dashboard
          </Button>
        </Link>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <PlaygroundsClient 
          initialPlaygrounds={playgrounds.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description || "",
            template: p.template,
            createdAt: p.createdAt.toISOString(),
            starred: p.Starmark?.[0]?.isMarked || false,
          }))}
          onDeleteAction={deleteProjectById}
        />
      </div>
    </div>
  );
}
