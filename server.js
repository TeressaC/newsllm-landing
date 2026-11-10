import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { compileSiteContent } from './scripts/compile-site-content.js';

const root = resolve(process.argv.includes('--dist') ? 'dist' : '.');
const DEFAULT_PORT = 4173;
const port = Number(process.env.PORT || DEFAULT_PORT);
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

if (!process.argv.includes('--dist')) compileSiteContent();

function resolveRequestPath(requestUrl) {
  const pathname = new URL(requestUrl, 'http://localhost').pathname;
  const filePath = pathname === '/' ? '/index.html' : pathname;
  const absolutePath = resolve(root, `.${decodeURIComponent(filePath)}`);
  if (!absolutePath.startsWith(`${root}/`)) throw new Error('Invalid request path');
  return absolutePath;
}

createServer(async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const path = resolveRequestPath(req.url);
    const info = await stat(path);
    if (!info.isFile()) throw new Error('Not a file');
    const type = MIME_TYPES[extname(path)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type.startsWith('text/') ? `${type}; charset=utf-8` : type });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404);
    res.end('找不到頁面');
  }
}).listen(port, '127.0.0.1', () => console.log(`NewsLLM 模板：http://127.0.0.1:${port}`));
