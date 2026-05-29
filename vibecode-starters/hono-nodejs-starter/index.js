import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.html(`
    <html>
      <head>
        <title>Hono API Server</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f0f11; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .container { text-align: center; border: 1px solid #2e2e34; padding: 3rem; border-radius: 12px; background: #1b1b1f; max-width: 400px; }
          h1 { color: #e36002; margin-bottom: 0.5rem; }
          p { color: #8f8f9e; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hono Server</h1>
          <p>Running successfully via Hono + Node.js in WebContainers!</p>
          <p style="font-size: 0.9rem; color: #555562;">Port: 3000</p>
        </div>
      </body>
    </html>
  `)
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', server: 'Hono' })
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
