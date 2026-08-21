import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..", "..", "..");
const menuSource = readFileSync(resolve(projectRoot, "client/src/pages/Menu.tsx"), "utf8");

describe("flipbook closing cover", () => {
  it("uses a matching back cover after the final menu page", () => {
    expect(menuSource).toContain("const MENU_BACK_COVER = MENU_FRONT_COVER");
    expect(menuSource).toMatch(/p10_thanks_bf012ec9\.png[\s\S]*MENU_BACK_COVER/);
  });

  it("keeps an even page count so dFlip has no empty closing sheet", () => {
    const pageList = menuSource.match(/const MENU_PAGES = \[([\s\S]*?)\n\];/)?.[1] ?? "";
    const pageEntries = pageList
      .split("\n")
      .filter(line => /^\s*(MENU_|['"])/.test(line));

    expect(pageEntries).toHaveLength(12);
    expect(pageEntries.length % 2).toBe(0);
  });

  it("keeps the dFlip hard-cover behavior enabled", () => {
    expect(menuSource).toContain("flipbookHardPages: 'cover'");
  });
});
