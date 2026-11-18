import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { bootstrapNestApp } from './src/main.js'; // Note the .js extension for NodeNext

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const portArgIndex = process.argv.indexOf('--port');
  const portFromArg = portArgIndex !== -1 ? Number(process.argv[portArgIndex + 1]) : null;
  const PORT = portFromArg || Number(process.env.PORT) || 3001;
  const isProduction = process.env.NODE_ENV === 'production';

  const server = express();

  // Bootstrap NestJS application attached to Express server
  const { app } = await bootstrapNestApp(server);

  if (!isProduction) {
    // Mount Vite dev server middleware for the frontend in development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });

    // Key fix: skip Vite middleware for API requests
    server.use((req, res, next) => {
      if (req.url.startsWith('/api/') || req.url.startsWith('/api?')) {
        return next(); // Leave it to NestJS
      }
      vite.middlewares.handle(req, res, next);
    });
  } else {
    // Serve static production build for frontend in production mode
    const distPath = path.resolve(__dirname, 'dist');
    server.use(express.static(distPath));

    server.get('*', (req, res, next) => {
      // Don't return HTML for API requests
      if (req.originalUrl.startsWith('/api/') || req.originalUrl.startsWith('/api?')) {
        return next();
      }
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NestJS] Cortouch Media server running on http://localhost:${PORT}`);
    console.log(`[NestJS] API endpoints live at http://localhost:${PORT}/api`);
    console.log(`[NestJS] LAN access: http://192.168.100.51:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Cortouch Media full-stack server:', err);
  process.exit(1);
});