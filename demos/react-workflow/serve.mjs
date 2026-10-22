import { createServer } from "node:http";
import { readFile, realpath } from "node:fs/promises";
import { resolve, relative, extname, sep, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

// Serve the public portfolio root, so shared CSS/navigation resolve unchanged.
const root = await realpath(fileURLToPath(new URL("../../", import.meta.url)));
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg" };
createServer(async (request, response) => {
  try {
    if (!["GET", "HEAD"].includes(request.method)) { response.writeHead(405); response.end(); return; }
    let path = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = await realpath(resolve(root, "." + path));
    const rel = relative(root, file);
    if (isAbsolute(rel) || rel === ".." || rel.startsWith(".." + sep) || rel.split(sep).includes("node_modules")) { response.writeHead(403); response.end(); return; }
    const content = await readFile(file);
    response.writeHead(200, { "Content-Type": types[extname(file)] || "text/plain; charset=utf-8", "Cache-Control": "no-store" });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch { response.writeHead(404); response.end("Not found"); }
}).listen(4173, "127.0.0.1", () => console.log("Preview: http://127.0.0.1:4173/demos/react-workflow/"));
