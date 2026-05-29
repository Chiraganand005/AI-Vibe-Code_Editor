"use client";

import React, { useState } from "react";
import { 
  Server, 
  Terminal, 
  ExternalLink, 
  ArrowLeft,
  Settings,
  Sparkles,
  RefreshCw,
  Eye,
  Play
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ApiEndpoint {
  method: "GET" | "POST";
  route: string;
  name: string;
  description: string;
  headers: Record<string, string>;
  requestBody?: string;
  responseBody: string;
  queryParams?: Record<string, string>;
}

const endpoints: ApiEndpoint[] = [
  {
    method: "POST",
    route: "/api/chat",
    name: "AI Conversation Chat",
    description: "Accepts historical messages and triggers streaming responses from the system LLM model for the playground chat panel.",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Session token cookie managed by next-auth"
    },
    requestBody: `{
  "messages": [
    { "role": "user", "content": "How do I create a React button Component?" }
  ]
}`,
    responseBody: `{
  "id": "chat-response-1729",
  "role": "assistant",
  "content": "To create a button component in React, you can write:\\n\\n\`\`\`jsx\\nexport default function Button({ text }) {\\n  return <button>{text}</button>;\\n}\\n\`\`\`"
}`
  },
  {
    method: "POST",
    route: "/api/code-completion",
    name: "AI Code Suggestion Engine",
    description: "Analyzes code around the cursor (before/after context) and query a local Ollama server running CodeLlama to suggest inline completions as the user types.",
    headers: {
      "Content-Type": "application/json"
    },
    requestBody: `{
  "fileContent": "const express = require('express');\\nconst app = express();\\napp.use(express.json());\\n// create endpoint here\\n",
  "cursorLine": 3,
  "cursorColumn": 21,
  "suggestionType": "completion",
  "fileName": "index.js"
}`,
    responseBody: `{
  "suggestion": "app.get('/api', (req, res) => {\\n  res.json({ message: 'Hello World' });\\n});",
  "context": {
    "language": "JavaScript",
    "framework": "None",
    "beforeContext": "const express = require('express');\\nconst app = express();\\napp.use(express.json());",
    "currentLine": "// create endpoint here",
    "afterContext": "",
    "cursorPosition": { "line": 3, "column": 21 },
    "isInFunction": false,
    "isInClass": false,
    "isAfterComment": true,
    "incompletePatterns": []
  },
  "metadata": {
    "language": "JavaScript",
    "framework": "None",
    "position": { "line": 3, "column": 21 },
    "generatedAt": "2026-05-28T10:15:30.000Z"
  }
}`
  },
  {
    method: "GET",
    route: "/api/template/[id]",
    name: "Template Structure Loader",
    description: "Fetches starter template metadata (directories and files) for a specific playground type (React, Express, Vue, etc.) from static files and initializes database entries.",
    headers: {
      "Accept": "application/json"
    },
    queryParams: {
      "id": "A valid playground database ID"
    },
    responseBody: `{
  "success": true,
  "templateJson": {
    "folderName": "Root",
    "items": [
      {
        "filename": "package",
        "fileExtension": "json",
        "content": "{\\n  \\\"name\\\": \\\"vite-react-ts\\\",\\n  \\\"private\\\": true\\n}"
      },
      {
        "folderName": "src",
        "items": [
          {
            "filename": "main",
            "fileExtension": "tsx",
            "content": "import React from 'react'\\n..."
          }
        ]
      }
    ]
  }
}`
  },
  {
    method: "POST",
    route: "/api/auth/[...nextauth]",
    name: "NextAuth Authentication",
    description: "Handles user sessions, login redirects, and OAuth credential management for third-party authentications (GitHub, Google).",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    responseBody: `{
  "user": {
    "name": "Chirag Anand",
    "email": "chiraga087@gmail.com",
    "image": "https://avatars.githubusercontent.com/u/98218355?v=4"
  },
  "expires": "2026-06-28T14:30:00.000Z"
}`
  }
];

export default function ApiDocsPage() {
  const [activeRoute, setActiveRoute] = useState<string>("/api/code-completion");
  const selectedApi = endpoints.find((e) => e.route === activeRoute) || endpoints[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header Back Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-zinc-400 hover:text-zinc-200 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="text-zinc-600 dark:text-zinc-400">|</span>
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-red-500" />
            <h1 className="font-bold text-lg">Project API Reference</h1>
          </div>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm" className="border-zinc-800 hover:bg-zinc-800 hover:text-white text-zinc-300">
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 md:p-8 gap-8">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0 flex flex-col gap-2">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">Endpoints</h2>
          {endpoints.map((e) => {
            const isActive = e.route === activeRoute;
            const isGet = e.method === "GET";
            return (
              <button
                key={e.route}
                onClick={() => setActiveRoute(e.route)}
                className={`w-full flex flex-col p-3 rounded-lg text-left transition-all duration-200 border ${
                  isActive
                    ? "bg-red-500/10 border-red-500/30 text-white shadow-md"
                    : "bg-zinc-900/30 border-zinc-900 hover:bg-zinc-900/60 text-zinc-400"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isGet 
                      ? "bg-blue-500/10 border border-blue-500/20 text-blue-400" 
                      : "bg-green-500/10 border border-green-500/20 text-green-400"
                  }`}>
                    {e.method}
                  </span>
                  <span className="font-mono text-xs font-bold truncate max-w-[200px] text-zinc-300">{e.route}</span>
                </div>
                <span className="text-xs text-zinc-500 font-medium truncate">{e.name}</span>
              </button>
            );
          })}
        </div>

        {/* API Details Panel */}
        <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 md:p-8 backdrop-blur-sm flex flex-col">
          {/* Header route detail */}
          <div className="border-b border-zinc-800 pb-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded ${
                selectedApi.method === "GET" 
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" 
                  : "bg-green-500/20 text-green-400 border border-green-500/30"
              }`}>
                {selectedApi.method}
              </span>
              <h2 className="text-xl font-mono font-bold text-white">{selectedApi.route}</h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">{selectedApi.description}</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 flex-1">
            {/* Properties & Headers */}
            <div className="xl:col-span-5 flex flex-col gap-6">
              {/* Headers */}
              <div>
                <h3 className="text-sm font-semibold text-zinc-400 mb-2">Required Headers</h3>
                <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 font-mono text-xs flex flex-col gap-2 text-zinc-400">
                  {Object.entries(selectedApi.headers).map(([key, val]) => (
                    <div key={key} className="flex flex-col gap-0.5 border-b border-zinc-900 pb-2 last:border-b-0 last:pb-0">
                      <span className="text-emerald-400 font-semibold">{key}:</span>
                      <span className="text-zinc-500 text-[10px]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Params */}
              {selectedApi.queryParams && (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 mb-2">Query Parameters</h3>
                  <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 font-mono text-xs flex flex-col gap-2 text-zinc-400">
                    {Object.entries(selectedApi.queryParams).map(([key, val]) => (
                      <div key={key} className="flex gap-2">
                        <span className="text-red-400 font-semibold">{key}:</span>
                        <span className="text-zinc-500">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Request/Response Payload Code Blocks */}
            <div className="xl:col-span-7 flex flex-col gap-6">
              {/* Request Body */}
              {selectedApi.requestBody && (
                <div>
                  <div className="flex justify-between items-center text-xs text-zinc-500 px-2 mb-1.5">
                    <span>Example Request Body</span>
                    <span>JSON</span>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden font-mono text-[11px]">
                    <pre className="p-4 overflow-x-auto text-zinc-300 leading-relaxed max-h-[180px]">
                      <code>{selectedApi.requestBody}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Response Body */}
              <div>
                <div className="flex justify-between items-center text-xs text-zinc-500 px-2 mb-1.5">
                  <span>Example Response Body (200 OK)</span>
                  <span>JSON</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden font-mono text-[11px]">
                  <pre className="p-4 overflow-x-auto text-zinc-300 leading-relaxed max-h-[280px]">
                    <code>{selectedApi.responseBody}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
