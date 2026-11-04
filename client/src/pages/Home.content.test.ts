import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..", "..", "..");
const homeSource = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
const mapSource = readFileSync(resolve(projectRoot, "client/src/components/Map.tsx"), "utf8");
const languageSource = readFileSync(resolve(projectRoot, "client/src/contexts/LanguageContext.tsx"), "utf8");
const indexSource = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");

describe("homepage content integrity", () => {
  it("does not render testimonial or rating UI without verified customer content", () => {
    expect(homeSource).not.toContain("home.testimonials.");
    expect(homeSource).not.toMatch(/\bBewertungen\b|Google Bewertung|5\.0 · Unsere Gäste|4\.0 · Google/);
  });

  it("does not retain testimonial translation fixtures", () => {
    expect(languageSource).not.toContain("home.testimonials.");
  });

	 it("keeps Sunday hours separate at 10:00–21:00", () => {
		expect(indexSource).toContain("Mo–Do 09–21 Uhr, Fr–Sa 09–23 Uhr, So 10–21 Uhr");
		expect(indexSource).not.toContain("Mo–Do + So 09–21 Uhr");
		expect(languageSource).toContain("'footer.hours.sunday': 'So: 10:00–21:00 Uhr'");
		expect(languageSource).toContain("'footer.hours.sunday': 'Sun: 10:00–21:00'");
	});

	it("shows the current Espresso price and keeps homepage photos in Manus storage", () => {
		expect(homeSource).toContain("num: lang === 'de' ? '€2,50' : '€2.50'");
		expect(homeSource).not.toContain("num: '€2'");
		expect(homeSource).toContain("/manus-storage/real-photo-3_90e7752e_1f5e1473_964b47e3.jpg");
		expect(homeSource).toContain("/manus-storage/real-photo-2_e4b6d6ba_6dbf3328_bd76cd61.jpg");
	});

	it("keeps the homepage map visible on Netlify when the Manus loader is unavailable", () => {
    expect(homeSource).toContain("<MapView");
    expect(mapSource).toContain("mapLoadError");
    expect(mapSource).toContain("www.google.com/maps?q=Cafe%26Bar%20Luxor");
    expect(mapSource).toContain("if (!mapsConsent)");
  });
});
