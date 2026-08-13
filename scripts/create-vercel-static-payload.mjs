import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const projectRoot = "/home/ubuntu/cafe-bar-luxor";
const publicRoot = join(projectRoot, "dist/public");
const outputPath = "/tmp/vercel-static-payload.json";
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt", ".webmanifest"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

const sourceFiles = await walk(publicRoot);
const files = await Promise.all(
  sourceFiles.map(async fullPath => {
    const relativePath = relative(publicRoot, fullPath).replaceAll("\\", "/");
    const extension = relativePath.includes(".") ? `.${relativePath.split(".").pop()}` : "";
    const isText = textExtensions.has(extension);
    const data = await readFile(fullPath);
    return {
      file: relativePath,
      data: isText ? data.toString("utf8") : data.toString("base64"),
      ...(isText ? {} : { encoding: "base64" }),
    };
  }),
);

files.push({
  file: "vercel.json",
  data: JSON.stringify(
    {
      "$schema": "https://openapi.vercel.sh/vercel.json",
      rewrites: [
        {
          source: "/manus-storage/:path*",
          destination: "https://cafeluxor-tosj4glv.manus.space/manus-storage/:path*",
        },
        { source: "/(.*)", destination: "/index.html" },
      ],
    },
    null,
    2,
  ),
});

await writeFile(
  outputPath,
  JSON.stringify({
    name: "cafe-bar-luxor",
    target: "production",
    teamId: "team_Kgr2Z5EEBF0W1ZnZ6YlmKEht",
    projectSettings: { framework: "vite", outputDirectory: "." },
    files,
  }),
);

console.log(`Prepared ${files.length} static deployment files at ${outputPath}`);
