import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..", "..", "..");
const menuSource = readFileSync(resolve(projectRoot, "client/src/pages/Menu.tsx"), "utf8");
const documentSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
const germanClosingSource = readFileSync(resolve(projectRoot, "client/public/media/p11_closing_de_9d2f6a4c.svg"), "utf8");

describe("flipbook closing cover", () => {
  it("uses a matching back cover after the final menu page", () => {
    expect(menuSource).toContain("const MENU_BACK_COVER = `${MENU_FRONT_COVER}?sheet=back-cover`");
    expect(menuSource).toMatch(/p11_closing_de_9d2f6a4c\.png[\s\S]*MENU_BACK_COVER/);
  });

  it("keeps an even page count so dFlip has no empty closing sheet", () => {
    const pageList = menuSource.match(/const MENU_PAGES_DE = \[([\s\S]*?)\n\];/)?.[1] ?? "";
    const pageEntries = pageList
      .split("\n")
      .filter(line => /^\s*(MENU_|menuAsset\(|['"])/.test(line));

    expect(pageEntries).toHaveLength(14);
    expect(pageEntries).not.toContain("'/media/p10_contact_de_4a7e1c2d.png'");
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
    expect(menuSource).toContain("'/media/p02_kaffee_tee_de_prices_20261104.png'");
    expect(menuSource).toContain("'/media/p03_kalt_de_prices_20261104.png'");
    expect(menuSource).toContain("'/media/p04_limo_de_prices_20261104.png'");
    expect(menuSource).toContain("'/media/p05_bier_de_prices_20261104.png'");
    expect(menuSource).toContain("'/media/p10_speisen_de_7c4e2a1b.png'");
    expect(menuSource).toContain("'/media/p10_speisen_en_7c4e2a1b.png'");
    expect(menuSource).not.toContain("'/media/p10_contact_de_4a7e1c2d.png'");
    expect(menuSource).toContain("'/media/p11_closing_de_9d2f6a4c.png'");
    expect(menuSource).toContain("'/media/p11_closing_en_9d2f6a4c.png'");
    expect(menuSource).toContain("'/media/p01_welcome_en_exact_2d6f4a91.png'");
    expect(menuSource).toContain("'/media/p03_cold_en_exact_2d6f4a91.png'");
    expect(menuSource).toContain("'/media/p04_lemonade_en_exact_2d6f4a91.png'");
    expect(menuSource).toContain("'/media/p09_wine_ice_en_exact_2d6f4a91.png'");
    expect(menuSource).toContain("'/media/p11_inner_cover_light_8b1d2e3f.png'");
    expect(menuSource).toContain("menuAsset('turn_d5b169b6.mp3')");
  });

  it("preloads menu sheets and uses a fast, smooth hard-cover close duration", () => {
    expect(menuSource).toContain("preloadedPagesRef.current = pages.map");
    expect(menuSource).toContain("image.decoding = 'async'");
    expect(menuSource).toContain("duration: 480");
    expect(menuSource).toContain("containerRef.current.innerHTML = ''");
  });

  it("uses the matching hard cover as the sole final state of the book", () => {
    const pageList = menuSource.match(/const MENU_PAGES_DE = \[([\s\S]*?)\n\];/)?.[1] ?? "";
    const pageEntries = pageList
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.startsWith("MENU_") || line.startsWith("menuAsset("));

    expect(pageEntries.at(-1)).toContain("MENU_BACK_COVER");
    expect(menuSource).toContain("flipbookHardPages: 'cover'");
  });

  it("keeps the final hard cover distinct from the first cover to prevent texture reuse", () => {
    expect(menuSource).toContain("?sheet=back-cover");
    expect(menuSource).not.toContain("const MENU_BACK_COVER = MENU_FRONT_COVER");
  });

  it("keeps the German closing sheet completely German", () => {
    for (const text of ["VIELEN DANK", "Wir freuen uns auf Ihren nächsten Besuch.", "ÖFFNUNGSZEITEN", "Mo–Do", "Fr–Sa", "So"]) {
      expect(germanClosingSource).toContain(text);
    }
    for (const text of ["THANK YOU", "Thank you", "OPENING HOURS", "Mon–Thu", "Fri–Sat", "Sun"]) {
      expect(germanClosingSource).not.toContain(text);
    }
  });
});
