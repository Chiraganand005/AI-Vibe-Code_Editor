const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Express Server</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #0f0f11; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .container { text-align: center; border: 1px solid #2e2e34; padding: 3rem; border-radius: 12px; background: #1b1b1f; max-width: 400px; }
          h1 { color: #e93f3f; margin-bottom: 0.5rem; }
          p { color: #8f8f9e; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Express Server</h1>
          <p>Running successfully inside WebContainers!</p>
          <p style="font-size: 0.9rem; color: #555562;">Port: ${port}</p>
        </div>
      </body>
    </html>
  `);
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', runtime: 'WebContainer' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
