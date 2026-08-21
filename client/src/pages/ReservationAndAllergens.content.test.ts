import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..", "..", "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const contactSource = readFileSync(resolve(projectRoot, "client/src/pages/Contact.tsx"), "utf8");
const allergenSource = readFileSync(resolve(projectRoot, "client/src/pages/Allergene.tsx"), "utf8");

describe("reservation and allergen content", () => {
  it("provides direct WhatsApp reservation requests and phone-call access", () => {
    expect(homeSource).toContain("https://wa.me/4917621899372");
    expect(homeSource).toContain("tel:+4917621899372");
    expect(homeSource).toContain("hover:shadow-[0_0_22px_rgba(34,197,94,0.35)]");
    expect(homeSource).toContain("focus-visible:ring-2");
    expect(contactSource).toContain("https://wa.me/4917621899372");
    expect(contactSource).toContain("Send reservation request");
    expect(homeSource).not.toContain("+49 176 21899372");
    expect(contactSource).not.toContain("+49 176 21899372");
  });

  it("localizes the allergen page when English is selected", () => {
    expect(allergenSource).toContain("useLanguage");
    expect(allergenSource).toContain('const isEnglish = lang === "en"');
    expect(allergenSource).toContain("Allergens & Additives");
    expect(allergenSource).toContain("Cereals containing gluten");
    expect(allergenSource).toContain("Menu allergen overview");
    expect(allergenSource).toContain('"Sekt (0,2 l)": "Sparkling wine (0.2 l)"');
    expect(allergenSource).toContain('"Krombacher Radler": "Krombacher shandy"');
    expect(allergenSource).toContain('"Waldmeister": "Woodruff"');
    expect(allergenSource).toContain('"Früh Kölsch (Flasche)": "Früh beer (bottle)"');
  });
});
