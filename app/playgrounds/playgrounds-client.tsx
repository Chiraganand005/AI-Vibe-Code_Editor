"use client";

import React, { useState, useTransition } from "react";
import { Search, Eye, Trash2, Calendar, Star, Code } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PlaygroundItem {
  id: string;
  title: string;
  description: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
  createdAt: string;
  starred: boolean;
}

interface PlaygroundsClientProps {
  initialPlaygrounds: PlaygroundItem[];
  onDeleteAction: (id: string) => Promise<unknown>;
}

export default function PlaygroundsClient({ 
  initialPlaygrounds, 
  onDeleteAction 
}: PlaygroundsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  const filters = ["ALL", "REACT", "NEXTJS", "EXPRESS", "VUE", "HONO", "ANGULAR"];

  const filteredPlaygrounds = initialPlaygrounds.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "ALL" || p.template === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this playground?")) return;

    startTransition(async () => {
      try {
        await onDeleteAction(id);
        toast.success("Playground deleted successfully");
        router.refresh();
      } catch {
        toast.error("Failed to delete playground");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
          <Input
            placeholder="Search playgrounds..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-red-500 text-zinc-100"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                selectedFilter === f
                  ? "bg-red-500/15 border-red-500/30 text-red-400 font-semibold"
                  : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredPlaygrounds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-zinc-900/10 border border-zinc-800 rounded-xl">
          <Code className="h-12 w-12 text-zinc-600 mb-4" />
          <h3 className="text-lg font-semibold text-zinc-300">No Playgrounds Found</h3>
          <p className="text-zinc-500 text-sm max-w-sm mt-1">
            Create a new workspace or adjust your search filter settings to view your playgrounds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaygrounds.map((p) => {
            const formattedDate = new Date(p.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div 
                key={p.id}
                className="bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="font-bold text-zinc-100 group-hover:text-white transition-colors truncate">
                      {p.title}
                    </h4>
                    {p.starred && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-zinc-400 text-xs line-clamp-2 min-h-[32px] mb-4">
                    {p.description || "No description provided."}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mt-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[10px] bg-red-500/5 text-red-400 border-red-500/20">
                      {p.template}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formattedDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/playground/${p.id}`}>
                      <Button size="icon" variant="ghost" className="h-7 w-7 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDelete(p.id)}
                      disabled={isPending}
                      className="h-7 w-7 text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
