"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Shield, Sparkles, Terminal, AppWindow, Github, Chrome, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SettingsClientProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  } | null;
}

export default function SettingsClient({ user }: SettingsClientProps) {
  // Load preferences from localStorage or fallback
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [fontSize, setFontSize] = useState("14");
  const [tabSize, setTabSize] = useState("4");
  const [minimap, setMinimap] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAiSuggestions(localStorage.getItem("vibe_ai_suggestions") !== "false");
      setFontSize(localStorage.getItem("vibe_font_size") || "14");
      setTabSize(localStorage.getItem("vibe_tab_size") || "4");
      setMinimap(localStorage.getItem("vibe_minimap") === "true");
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("vibe_ai_suggestions", String(aiSuggestions));
        localStorage.setItem("vibe_font_size", fontSize);
        localStorage.setItem("vibe_tab_size", tabSize);
        localStorage.setItem("vibe_minimap", String(minimap));
      }
      setIsSaving(false);
      toast.success("Preferences saved successfully!");
    }, 800);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Profile Card */}
      {user && (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-zinc-700/50 bg-zinc-800 flex-shrink-0">
            <Image
              src={user.image}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full w-max mx-auto sm:mx-0">
                <Shield className="h-3 w-3" />
                {user.role}
              </span>
            </div>
            <p className="text-zinc-400 text-sm mt-1">{user.email}</p>
            <p className="text-[10px] text-zinc-500 font-mono mt-1">ID: {user.id}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Editor Preferences */}
        <div className="md:col-span-7 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm flex flex-col gap-6">
          <h4 className="font-bold text-zinc-200 border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Terminal className="h-4 w-4 text-red-500" />
            Editor Preferences
          </h4>

          {/* AI Suggestions Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                AI Code Completion
              </span>
              <span className="text-xs text-zinc-500 mt-0.5">
                Enable smart inline code suggestions as you type.
              </span>
            </div>
            <button
              onClick={() => setAiSuggestions(!aiSuggestions)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                aiSuggestions ? "bg-red-500" : "bg-zinc-800"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute ${
                  aiSuggestions ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Minimap Toggle */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-300 flex items-center gap-1.5">
                <AppWindow className="h-3.5 w-3.5 text-blue-400" />
                Show Code Minimap
              </span>
              <span className="text-xs text-zinc-500 mt-0.5">
                Toggle display of standard Monaco file minimap overlay.
              </span>
            </div>
            <button
              onClick={() => setMinimap(!minimap)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
                minimap ? "bg-red-500" : "bg-zinc-800"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute ${
                  minimap ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Font Size Selector */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-300">Editor Font Size</span>
              <span className="text-xs text-zinc-500 mt-0.5">Select preferred pixel scale.</span>
            </div>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-zinc-300 focus:outline-none focus:border-red-500"
            >
              <option value="12">12 px</option>
              <option value="14">14 px</option>
              <option value="16">16 px</option>
              <option value="18">18 px</option>
            </select>
          </div>

          {/* Tab Space Selector */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-zinc-300">Tab Indentation</span>
              <span className="text-xs text-zinc-500 mt-0.5">Select equivalent space units.</span>
            </div>
            <select
              value={tabSize}
              onChange={(e) => setTabSize(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-sm text-zinc-300 focus:outline-none focus:border-red-500"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
            </select>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="w-full bg-[#E93F3F] hover:bg-[#d03636] text-white mt-4 font-bold"
          >
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
        </div>

        {/* Connected Accounts */}
        <div className="md:col-span-5 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm flex flex-col gap-6">
          <h4 className="font-bold text-zinc-200 border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Key className="h-4 w-4 text-red-500" />
            Connections
          </h4>

          {/* GitHub Connection */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
                <Github className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-300">GitHub</span>
                <span className="text-xs text-green-400">Connected</span>
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded uppercase">
              Active
            </span>
          </div>

          {/* Google Connection */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
                <Chrome className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-zinc-300">Google OAuth</span>
                <span className="text-xs text-zinc-500">Not Linked</span>
              </div>
            </div>
            <span className="text-[10px] font-bold tracking-wider text-zinc-500 bg-zinc-800/50 border border-zinc-800 px-2 py-0.5 rounded uppercase">
              Optional
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
