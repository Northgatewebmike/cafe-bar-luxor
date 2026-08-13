import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = "/home/ubuntu/cafe-bar-luxor-pages-build";
const mountPath = "/cafe-bar-luxor-pages";
const port = Number(process.env.PORT || 4179);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
  ".webp": "image/webp",
};

const server = createServer(async (request, response) => {
  const rawPath = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
  const requestPath = rawPath === mountPath || rawPath === `${mountPath}/`
    ? "/"
    : rawPath.startsWith(`${mountPath}/`)
      ? rawPath.slice(mountPath.length)
      : rawPath;
  const normalizedPath = normalize(requestPath).replace(/^[/\\]+/, "");
  const candidate = join(root, normalizedPath || "index.html");
  const safeCandidate = candidate.startsWith(root) ? candidate : join(root, "404.html");

  try {
    const info = await stat(safeCandidate);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, { "Content-Type": mimeTypes[extname(safeCandidate)] || "application/octet-stream" });
    createReadStream(safeCandidate).pipe(response);
  } catch {
    const fallback = join(root, "404.html");
    await access(fallback);
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(fallback).pipe(response);
  }
});

server.listen(port, "0.0.0.0", () => console.log(`GitHub Pages artifact server listening on ${port}`));
