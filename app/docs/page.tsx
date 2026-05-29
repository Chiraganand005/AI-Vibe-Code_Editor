"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  ExternalLink, 
  Terminal, 
  Code, 
  Server, 
  Zap, 
  ChevronRight, 
  Flame, 
  Layers,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Tutorial {
  id: string;
  name: string;
  category: "frontend" | "backend" | "fullstack";
  icon: any;
  color: string;
  description: string;
  setupCommand: string;
  officialDocUrl: string;
  codeSnippet: string;
  steps: string[];
}

const tutorials: Tutorial[] = [
  {
    id: "react",
    name: "React (Vite)",
    category: "frontend",
    icon: Code,
    color: "from-cyan-400 to-blue-500",
    description: "Learn how to build component-driven single page applications using React and Vite.",
    setupCommand: "npm create vite@latest my-react-app -- --template react-ts",
    officialDocUrl: "https://react.dev",
    codeSnippet: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-medium text-black">React Counter</h2>
      <p className="text-gray-500">You clicked {count} times</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none"
      >
        Click me
      </button>
    </div>
  );
}`,
    steps: [
      "Initialize your app with Vite using the template react-ts.",
      "Vite structures your project with src/main.tsx as the entry point.",
      "Use useState hook for reactive component-level state variables.",
      "Export functional components and render them via JSX syntax.",
      "Build production assets using 'npm run build' which runs tsc && vite build."
    ]
  },
  {
    id: "vue",
    name: "Vue.js (Vite)",
    category: "frontend",
    icon: Layers,
    color: "from-emerald-400 to-green-600",
    description: "Create interactive user interfaces with Vue's approachable Composition API.",
    setupCommand: "npm create vite@latest my-vue-app -- --template vue-ts",
    officialDocUrl: "https://vuejs.org",
    codeSnippet: `<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => count.value++
</script>

<template>
  <div class="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
    <h3 class="text-lg font-bold text-white mb-2">Vue Composition Counter</h3>
    <p class="text-zinc-400 mb-4">Value: {{ count }}</p>
    <button 
      @click="increment" 
      class="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded"
    >
      Increment
    </button>
  </div>
</template>`,
    steps: [
      "Set up your Vue 3 app using Vite's Vue template.",
      "Use `<script setup>` syntax for writing Vue's Composition API.",
      "Declare reactive state using the ref() function.",
      "Render template tags where Vue reactive attributes like v-bind or @click bind elements.",
      "Style your components modularly using scoped CSS tags."
    ]
  },
  {
    id: "express",
    name: "Express.js",
    category: "backend",
    icon: Server,
    color: "from-gray-700 to-zinc-950",
    description: "Write fast, minimalist API endpoints and HTTP servers using Node.js.",
    setupCommand: "npm install express @types/express",
    officialDocUrl: "https://expressjs.com",
    codeSnippet: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.post('/api/echo', (req, res) => {
  res.json({ body: req.body, echoedAt: new Date() });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`,
    steps: [
      "Initialize standard npm structure and install Express.",
      "Create express application instance and configure middleware (e.g. express.json()).",
      "Declare endpoint routes using app.get(), app.post(), etc.",
      "Send JSON responses with status codes back to clients using res.status().json().",
      "Listen on configured host ports to process incoming TCP requests."
    ]
  },
  {
    id: "hono",
    name: "Hono.js",
    category: "backend",
    icon: Flame,
    color: "from-orange-500 to-red-600",
    description: "Develop blazing-fast APIs built on Web Standards supporting any JS runtime.",
    setupCommand: "npm create hono@latest my-hono-app",
    officialDocUrl: "https://hono.dev",
    codeSnippet: `import { Hono } from 'hono'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/users/:id', (c) => {
  const id = c.req.param('id')
  return c.json({ userId: id, status: 'active' })
})

export default app`,
    steps: [
      "Scaffold a lightweight routing architecture with Hono.",
      "Register global middlewares like logger() or cors() using app.use().",
      "Capture URL path params using context getters: c.req.param('id').",
      "Return standardized headers and payloads via Hono Context Helpers: c.json() / c.text().",
      "Run natively on Deno, Bun, Cloudflare Workers, or Node.js."
    ]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "fullstack",
    icon: Layers,
    color: "from-black to-zinc-800 dark:from-zinc-900 dark:to-zinc-700",
    description: "The React framework for production supporting server components and nested routes.",
    setupCommand: "npx create-next-app@latest my-next-app --typescript --tailwind --app",
    officialDocUrl: "https://nextjs.org",
    codeSnippet: `// app/api/hello/route.ts (Route Handler)
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from Next.js App Router!' });
}

// app/page.tsx (React Server Component)
export default async function Page() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-extrabold">Welcome to Next.js App Router</h1>
      <p className="mt-2 text-zinc-400">Rendering statically on server.</p>
    </main>
  );
}`,
    steps: [
      "Boot Next.js with app directory architecture.",
      "Use server components (rendered on server) by default to load data cleanly.",
      "Define page layouts using layout.tsx and nested page routes using page.tsx.",
      "Create API routes by exporting handler functions (GET, POST) in route.ts files.",
      "Next.js handles static page compilation and server side render routing seamlessly."
    ]
  },
  {
    id: "angular",
    name: "Angular",
    category: "fullstack",
    icon: Terminal,
    color: "from-red-500 to-pink-700",
    description: "Build robust, scalable enterprise-level web applications with Angular's platform.",
    setupCommand: "npm install -g @angular/cli && ng new my-angular-app",
    officialDocUrl: "https://angular.dev",
    codeSnippet: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <div class="angular-card">
      <h2>Hello from {{ title }}!</h2>
      <button (click)="toggleState()">Toggle State</button>
      <p *ngIf="showDetails">Angular reactive templates render instantly.</p>
    </div>
  \`,
  styles: [\`
    .angular-card { padding: 20px; border: 1px solid #ddd; }
  \`]
})
export class AppComponent {
  title = 'Angular Workspace';
  showDetails = false;

  toggleState() {
    this.showDetails = !this.showDetails;
  }
}`,
    steps: [
      "Install Angular CLI globally and bootstrap workspace.",
      "Declare standalone Components using @Component directive metadata.",
      "Use double curly braces {{ value }} for interpolation in component templates.",
      "Bind user click events using parenthesized event binding syntax (click)='handler()'.",
      "Angular compilation processes static dependency injectors and rendering pipelines."
    ]
  }
];

export default function DocsPage() {
  const [selectedTab, setSelectedTab] = useState<string>("react");
  const activeTutorial = tutorials.find((t) => t.id === selectedTab) || tutorials[0];

  const IconComponent = activeTutorial.icon;

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
            <BookOpen className="h-5 w-5 text-red-500" />
            <h1 className="font-bold text-lg">Developer Documentation</h1>
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
        <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-2 mb-2">Technologies</h2>
          {tutorials.map((t) => {
            const TabIcon = t.icon;
            const isActive = t.id === selectedTab;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTab(t.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 border ${
                  isActive
                    ? "bg-red-500/10 border-red-500/30 text-white font-medium shadow-md"
                    : "bg-zinc-900/30 border-zinc-900 hover:bg-zinc-900/60 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md bg-zinc-800 ${isActive ? "text-red-500" : "text-zinc-500"}`}>
                    <TabIcon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{t.name}</span>
                </div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-600 dark:text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                  {t.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 md:p-8 backdrop-blur-sm flex flex-col">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-6">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${activeTutorial.color} text-white`}>
                <IconComponent className="h-8 w-8" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">{activeTutorial.name}</h2>
                  <span className="text-xs uppercase font-semibold bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-zinc-400">
                    {activeTutorial.category}
                  </span>
                </div>
                <p className="text-zinc-400 mt-1 max-w-xl text-sm">{activeTutorial.description}</p>
              </div>
            </div>
            <a 
              href={activeTutorial.officialDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg transition-all"
            >
              Official Documentation
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Quick Setup */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-zinc-400 mb-2">Bootstrap Command</h3>
            <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 flex items-center justify-between font-mono text-xs text-emerald-400 overflow-x-auto">
              <span>$ {activeTutorial.setupCommand}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Steps list */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-zinc-400">Key Concepts</h3>
              <div className="flex flex-col gap-3">
                {activeTutorial.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-sm">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 text-xs font-semibold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-zinc-300 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="lg:col-span-7 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-zinc-500 px-2">
                <span>Code Example</span>
                <span>TypeScript / JavaScript</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden font-mono text-xs">
                <pre className="p-4 overflow-x-auto text-zinc-300 leading-relaxed max-h-[350px]">
                  <code>{activeTutorial.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Tutorial Footer */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <span>Read more developer guides:</span>
            <div className="flex gap-4">
              <a 
                href="https://developer.mozilla.org/en-US/docs/Web" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-zinc-300 underline flex items-center gap-1"
              >
                MDN Web Docs
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-zinc-800">|</span>
              <a 
                href={activeTutorial.officialDocUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-zinc-300 underline flex items-center gap-1"
              >
                Framework Portal
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
