<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="title">VibeCode Editor</h1>
      <p class="subtitle">Vue + Vite + TypeScript Template</p>
    </header>
    
    <main class="main-content">
      <div class="card">
        <button class="btn" @click="count++">
          Count is: {{ count }}
        </button>
        <p class="card-text">
          Edit <code>src/App.vue</code> to test hot module replacement (HMR).
        </p>
      </div>
    </main>
    
    <footer class="footer">
      <p>Running securely inside WebContainer</p>
    </footer>
  </div>
</template>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #0f0f11;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.header {
  margin-bottom: 3rem;
}

.title {
  font-size: 3.2em;
  line-height: 1.1;
  color: #e93f3f;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #8f8f9e;
}

.btn {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #e93f3f;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;
}

.btn:hover {
  background-color: #d03636;
}

.btn:focus,
.btn:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
  background-color: #1b1b1f;
  border-radius: 12px;
  border: 1px solid #2a2a30;
  margin-bottom: 2rem;
}

.card-text {
  margin-top: 1.5rem;
  color: #8f8f9e;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  background-color: #2e2e34;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.footer {
  font-size: 0.9rem;
  color: #555562;
}
</style>
