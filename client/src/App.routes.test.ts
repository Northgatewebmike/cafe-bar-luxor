import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "..", "..");
const appSource = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
const footerSource = readFileSync(resolve(projectRoot, "client/src/components/Footer.tsx"), "utf8");
const navigationSource = readFileSync(resolve(projectRoot, "client/src/components/Navigation.tsx"), "utf8");

describe("public routes", () => {
  it("does not expose the internal file-management page", () => {
    expect(appSource).not.toContain('path="/dateiverwaltung"');
    expect(appSource).not.toContain('import FileManager');
    expect(footerSource).not.toContain('href="/dateiverwaltung"');
    expect(footerSource).not.toContain("Dateiverwaltung");
  });

  it("exposes the public bilingual jobs and internship route", () => {
    expect(appSource).toContain('path="/jobs-praktikum"');
    expect(appSource).toContain('import JobsPraktikum');
    expect(navigationSource).toContain("href: '/jobs-praktikum'");
    expect(navigationSource).toContain("Jobs & Internships");
  });
});
