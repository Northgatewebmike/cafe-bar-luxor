import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..", "..", "..");
const menuSource = readFileSync(resolve(projectRoot, "client/src/pages/Menu.tsx"), "utf8");
const documentSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("flipbook closing cover", () => {
  it("uses a matching back cover after the final menu page", () => {
    expect(menuSource).toContain("const MENU_BACK_COVER = MENU_FRONT_COVER");
    expect(menuSource).toMatch(/p10_thanks_bf012ec9\.png[\s\S]*MENU_BACK_COVER/);
  });

  it("keeps an even page count so dFlip has no empty closing sheet", () => {
    const pageList = menuSource.match(/const MENU_PAGES = \[([\s\S]*?)\n\];/)?.[1] ?? "";
    const pageEntries = pageList
      .split("\n")
      .filter(line => /^\s*(MENU_|menuAsset\(|['"])/.test(line));

    expect(pageEntries).toHaveLength(12);
    expect(pageEntries.length % 2).toBe(0);
  });

  it("keeps the dFlip hard-cover behavior enabled", () => {
    expect(menuSource).toContain("flipbookHardPages: 'cover'");
  });

  it("loads the dFlip runtime from browser-safe JavaScript and CSS assets", () => {
    expect(documentSource).toContain("cdn.jsdelivr.net/gh/Northgatewebmike/cafe-bar-luxor-pages@master/media/dflip.min_f418d53d.css");
    expect(documentSource).toContain("cdn.jsdelivr.net/gh/Northgatewebmike/cafe-bar-luxor-pages@master/media/three.min_98c01b76.js");
    expect(documentSource).toContain("cdn.jsdelivr.net/gh/Northgatewebmike/cafe-bar-luxor-pages@master/media/dflip.min_33fd7677.js");
  });

  it("loads menu pages and sound from the browser-safe public archive", () => {
    expect(menuSource).toContain("const MENU_MEDIA_BASE = 'https://cdn.jsdelivr.net/gh/Northgatewebmike/cafe-bar-luxor-pages@master/media/'");
    expect(menuSource).toContain("menuAsset('p01_welcome_2b120f43.png')");
    expect(menuSource).toContain("menuAsset('p10_thanks_bf012ec9.png')");
    expect(menuSource).toContain("menuAsset('turn_d5b169b6.mp3')");
  });
});
