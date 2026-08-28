import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const sourceRoot = "/home/ubuntu/cafe-bar-luxor/dist/public";
const mediaRoot = "/home/ubuntu/cafe-bar-luxor-assets/media";
const outputRoot = "/home/ubuntu/cafe-bar-luxor-pages-build";
const publishedMediaRoot = "/home/ubuntu/cafe-bar-luxor-pages-repo/media";
const storageOrigin = "https://cafeluxor-tosj4glv.manus.space/manus-storage/";
const cloudfrontHero = "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp";
const cloudfrontLogo = "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/cafe-bar-luxor-logo-v3-ZHCckNnud7VaGAJRFa8Z7r.png";
const externalCoffeeImage = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80";
const jquerySource = "https://code.jquery.com/jquery-3.7.1.min.js";
const pdfWorkerSource = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
const pagesBase = "/cafe-bar-luxor-pages";
const flipbookRuntime = [
  "dflip.min_f418d53d.css",
  "three.min_98c01b76.js",
  "pdf.min_b18585e0.js",
  "dflip.min_33fd7677.js",
];
const publicRoutes = [
  "ueber-uns",
  "speisekarte",
  "galerie",
  "oeffnungszeiten",
  "kontakt",
  "automaten",
  "allergene",
  "jobs-praktikum",
  "impressum",
  "datenschutz",
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(fullPath)));
    if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

async function downloadPublicAsset(url, destination, fallbackSource) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Received HTTP ${response.status}`);
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    if (!fallbackSource) throw new Error(`Could not archive required public asset: ${url}`, { cause: error });
    await cp(fallbackSource, destination);
    console.warn(`Recovered unavailable asset from published Pages archive: ${url}`);
  }
}

async function copyRequiredAsset(primarySource, destination, fallbackSource, label) {
  try {
    await cp(primarySource, destination, { recursive: true });
  } catch (error) {
    if (!fallbackSource) throw new Error(`Could not archive required local asset: ${label}`, { cause: error });
    await cp(fallbackSource, destination, { recursive: true });
    console.warn(`Recovered unavailable ${label} from published Pages archive.`);
  }
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(sourceRoot, outputRoot, { recursive: true });
await copyRequiredAsset(mediaRoot, join(outputRoot, "media"), publishedMediaRoot, "media directory");
await copyRequiredAsset(
  "/home/ubuntu/webdev-static-assets/cafe-bar-luxor-logo-v3.png",
  join(outputRoot, "media", "cafe-bar-luxor-logo-v3.png"),
  join(publishedMediaRoot, "cafe-bar-luxor-logo-v3.png"),
  "Luxor logo",
);

for (const runtimeFile of flipbookRuntime) {
  await downloadPublicAsset(
    `${storageOrigin}${runtimeFile}`,
    join(outputRoot, "media", runtimeFile),
    join(publishedMediaRoot, runtimeFile),
  );
}

await Promise.all([
  downloadPublicAsset(externalCoffeeImage, join(outputRoot, "media", "about-coffee.jpg"), join(publishedMediaRoot, "about-coffee.jpg")),
  downloadPublicAsset(jquerySource, join(outputRoot, "media", "jquery-3.7.1.min.js"), join(publishedMediaRoot, "jquery-3.7.1.min.js")),
  downloadPublicAsset(pdfWorkerSource, join(outputRoot, "media", "pdf.worker.min.js"), join(publishedMediaRoot, "pdf.worker.min.js")),
]);

const textFiles = (await listFiles(outputRoot)).filter(file => /\.(?:html|js|css|json|webmanifest)$/i.test(file));
for (const file of textFiles) {
  const content = await readFile(file, "utf8");
  const withBundledMedia = content
    .replaceAll(storageOrigin, "/media/")
    .replaceAll("/manus-storage/", "/media/")
    .replaceAll(cloudfrontHero, "/media/hero-bg.webp")
    .replaceAll(cloudfrontLogo, "/media/cafe-bar-luxor-logo-v3.png")
    .replaceAll(externalCoffeeImage, "/media/about-coffee.jpg")
    .replaceAll(jquerySource, "/media/jquery-3.7.1.min.js")
    .replaceAll("/media/", `${pagesBase}/media/`);
  const withPagesPaths = file.endsWith(".html")
    ? withBundledMedia
      .replace(/(href|src)="\/(?!cafe-bar-luxor-pages\/|\/)/g, `$1="${pagesBase}/`)
      .replace(
        `<script src="${pagesBase}/media/dflip.min_33fd7677.js"></script>`,
        `<script>if (window.pdfjsLib?.GlobalWorkerOptions) window.pdfjsLib.GlobalWorkerOptions.workerSrc = "${pagesBase}/media/pdf.worker.min.js";</script><script src="${pagesBase}/media/dflip.min_33fd7677.js"></script>`,
      )
    : withBundledMedia;
  const withManifestPaths = file.endsWith("site.webmanifest")
    ? withPagesPaths.replace(/"src":\s*"\/(?!cafe-bar-luxor-pages\/)/g, `"src":"${pagesBase}/`)
    : withPagesPaths;
  if (withManifestPaths !== content) await writeFile(file, withManifestPaths);
}

if (process.env.PAGES_CUSTOM_DOMAIN === "1") {
  await writeFile(join(outputRoot, "CNAME"), "cafebarluxor.com\n");
}
await writeFile(join(outputRoot, ".nojekyll"), "");
const indexHtml = await readFile(join(outputRoot, "index.html"), "utf8");
const deepLinkRecovery = `<script>\n  (function () {\n    var base = "${pagesBase}";\n    var path = window.location.pathname;\n    if (path.indexOf(base + "/") !== 0) return;\n    var target = path.slice(base.length) + window.location.search + window.location.hash;\n    window.location.replace(base + "/?luxor-route=" + encodeURIComponent(target || "/"));\n  })();\n</script>`;
const rootRouteRecovery = `<script>\n  (function () {\n    var base = "${pagesBase}";\n    var params = new URLSearchParams(window.location.search);\n    var target = params.get("luxor-route");\n    if (!target) return;\n    window.history.replaceState(null, "", base + target);\n  })();\n</script>`;
await writeFile(join(outputRoot, "index.html"), indexHtml.replace("</head>", `${rootRouteRecovery}</head>`));
await writeFile(join(outputRoot, "404.html"), indexHtml.replace("</head>", `${deepLinkRecovery}</head>`));
await Promise.all(
  publicRoutes.map(async route => {
    const routeDirectory = join(outputRoot, route);
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(join(routeDirectory, "index.html"), indexHtml);
  }),
);
await writeFile(
  join(outputRoot, "README.md"),
  "# Cafe&Bar Luxor public website\n\nThis repository contains the compiled public Cafe&Bar Luxor website for GitHub Pages. It intentionally excludes server code, database configuration, OAuth credentials, and the owner-only file manager.\n",
);

console.log(`Created public GitHub Pages artifact at ${outputRoot}`);
console.log(`Custom domain file: ${process.env.PAGES_CUSTOM_DOMAIN === "1" ? "included" : "not included"}`);
console.log(`Bundled ${textFiles.length} text assets and archived public media.`);
