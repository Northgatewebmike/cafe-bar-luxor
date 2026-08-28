import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..');
const builderSource = readFileSync(resolve(projectRoot, 'scripts/build-github-pages-artifact.mjs'), 'utf8');

describe('GitHub Pages artifact routing', () => {
  it('recovers a direct deep link from 404.html before the SPA loads', () => {
    expect(builderSource).toContain('luxor-route');
    expect(builderSource).toContain('window.location.replace(base + "/?luxor-route="');
    expect(builderSource).toContain('window.history.replaceState(null, "", base + target)');
    expect(builderSource).toContain('await writeFile(join(outputRoot, "404.html")');
  });

  it('recovers dFlip runtime assets from the published Pages archive when Manus storage is unavailable', () => {
    expect(builderSource).toContain('publishedMediaRoot');
    expect(builderSource).toContain('Recovered unavailable asset from published Pages archive');
    expect(builderSource).toContain('join(publishedMediaRoot, runtimeFile)');
  });

  it('recovers the entire media archive and logo when a sandbox reset removes the local media cache', () => {
    expect(builderSource).toContain('copyRequiredAsset(mediaRoot, join(outputRoot, "media"), publishedMediaRoot, "media directory")');
    expect(builderSource).toContain('Recovered unavailable ${label} from published Pages archive.');
    expect(builderSource).toContain('"Luxor logo"');
  });

  it('writes static entry documents for the jobs and internship route', () => {
    expect(builderSource).toContain('"jobs-praktikum"');
    expect(builderSource).toContain('writeFile(join(routeDirectory, "index.html"), indexHtml)');
  });
});
