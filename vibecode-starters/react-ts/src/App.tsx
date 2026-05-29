import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">VibeCode Editor</h1>
        <p className="subtitle">React + Vite + TypeScript Template</p>
      </header>
      
      <main className="main-content">
        <div className="card">
          <button className="btn" onClick={() => setCount((count) => count + 1)}>
            Count is: {count}
          </button>
          <p className="card-text">
            Edit <code>src/App.tsx</code> to test hot module replacement (HMR).
          </p>
        </div>
      </main>
      
      <footer className="footer">
        <p>Running securely inside WebContainer</p>
      </footer>
    </div>
  )
}

export default App
