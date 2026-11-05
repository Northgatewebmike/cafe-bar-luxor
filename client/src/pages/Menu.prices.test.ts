import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..", "..", "..");
const germanGenerator = readFileSync("/tmp/update_luxor_prices.py", "utf8");
const germanBeerGenerator = readFileSync("/tmp/fix_luxor_menu_layout.py", "utf8");
const englishGenerator = readFileSync("/tmp/make_updated_english_prices.py", "utf8");
const aboutSource = readFileSync(resolve(projectRoot, "client/src/pages/About.tsx"), "utf8");

describe("bilingual beverage price update", () => {
  it("sets German cold drinks to the requested prices", () => {
    expect(germanGenerator).toContain("'3,00 €'");
    expect(germanGenerator).toContain("cover_price(d, 530, '2,80 €')");
    expect(germanGenerator).toContain("'2,30 €'");
    expect(germanGenerator).toContain("cover_price(d, 812, '5,00 €')");
    expect(germanGenerator).toContain("cover_price(d, 856, '5,00 €')");
  });

  it("sets English cold drinks to the requested prices", () => {
    expect(englishGenerator).toContain("('Coca Cola','0.33 l','3.00 €'");
    expect(englishGenerator).toContain("('Schweppes Bitter Lemon','0.25 l','2.80 €'");
    expect(englishGenerator).toContain("('Still Water','0.2 l','2.30 €'");
    expect(englishGenerator).toContain("('Sparkling Water','0.2 l','2.30 €'");
    expect(englishGenerator).toContain("'Milkshake (Strawberry / Vanilla / Chocolate)','','5.00 €'");
  });

  it("removes Königshof Pils from both beer sheets and the About page", () => {
    expect(germanBeerGenerator).not.toContain("('Königshof Pils'");
    expect(englishGenerator).not.toContain("('Königshof Pils'");
    expect(aboutSource).not.toContain("Königshof");
  });

  it("includes Veltins 0.5 l at 4.50 euros in both languages", () => {
    expect(readFileSync("/tmp/rebuild_german_drinks_clean.py", "utf8")).toContain("('Veltins', '0,5 l', '4,50 €')");
    expect(englishGenerator).toContain("('Veltins','0.5 l','4.50 €')");
  });
});
