import React from "react";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: "2rem" }}>
      <header>
        <h1 style={{ color: "#e93f3f", fontSize: "3rem", marginBottom: "0.5rem" }}>VibeCode Next.js App</h1>
        <p style={{ color: "#9ca3af", fontSize: "1.2rem" }}>Running inside browser WebContainers</p>
      </header>
      <main style={{ marginTop: "2rem", padding: "2rem", background: "#16161a", border: "1px solid #27272a", borderRadius: "8px", maxWidth: "500px" }}>
        <p>Edit <code>app/page.tsx</code> to see live reload in action.</p>
      </main>
    </div>
  );
}
