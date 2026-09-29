import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const files = ['js/data.js', 'js/shared.js', 'js/tabs/Home.js', 'js/tabs/Members.js',
  'js/tabs/Publications.js', 'js/tabs/Teaching.js', 'js/tabs/Project.js',
  'js/tabs/ForStudents.js', 'js/tabs/Vacant.js', 'js/tabs/YearInReview.js', 'js/tabs/ResearchExplorer.js', 'js/main.js'];
const source = await Promise.all(files.map(file => readFile(path.join(root, file), 'utf8')));
await build({
  stdin: {
    contents: "import React from 'react';\nimport {createRoot} from 'react-dom/client';\n" + source.join('\n'),
    resolveDir: root,
    loader: 'jsx',
  },
  bundle: true,
  minify: true,
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' },
  outfile: path.join(root, 'site.bundle.js'),
  legalComments: 'inline',
});
let html = await readFile(path.join(root, 'index.html'), 'utf8');
for (const asset of ['site.bundle.js', 'styles.css']) {
  const bytes = await readFile(path.join(root, asset));
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  html = html.replace(new RegExp(asset.replaceAll('.', '\\.') + '(?:\\?v=[a-zA-Z0-9-]+)?', 'g'), asset + '?v=' + hash);
}
await writeFile(path.join(root, 'index.html'), html);
console.log('Built site.bundle.js and updated asset versions in index.html.');

if (process.argv.includes('--serve')) {
  const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf' };
  createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
      if (!file.startsWith(root + path.sep) || pathname.split('/').some(part => part.startsWith('.') || part === 'node_modules')) {
        res.writeHead(403); res.end(); return;
      }
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(body);
    } catch { res.writeHead(404); res.end('Not found'); }
  }).listen(8765, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:8765 (run npm run build after edits)'));
}
