import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..', '..', '..');
const pageSource = readFileSync(resolve(projectRoot, 'client/src/pages/Speisen.tsx'), 'utf8');
const appSource = readFileSync(resolve(projectRoot, 'client/src/App.tsx'), 'utf8');
const navigationSource = readFileSync(resolve(projectRoot, 'client/src/components/Navigation.tsx'), 'utf8');
const footerSource = readFileSync(resolve(projectRoot, 'client/src/components/Footer.tsx'), 'utf8');

describe('bilingual food and ingredients page', () => {
  it('contains all six requested dishes and prices', () => {
    for (const text of ['Kleines Frühstück', 'Großes Frühstück', 'Hähnchenschnitzel', 'Wurst', 'Frikadellen', 'Kartoffelsalat']) {
      expect(pageSource).toContain(text);
    }
    for (const price of ['5,90 €', '8,50 €', '7,90 €', '3,50 €', '2,50 €']) {
      expect(pageSource).toContain(price);
    }
  });

  it('contains English labels and bilingual ingredient/allergen content', () => {
    for (const text of ['Food & Ingredients', 'Small Breakfast', 'Large Breakfast', 'Chicken Schnitzel', 'German Meatballs', 'Potato Salad', 'Ingredients', 'Common allergens & notes']) {
      expect(pageSource).toContain(text);
    }
    for (const text of ['Gluten', 'Milk/lactose', 'Mustard', 'Celery']) {
      expect(pageSource).toContain(text);
    }
  });

  it('is reachable from the router and both navigation surfaces', () => {
    expect(appSource).toContain('import Speisen from "./pages/Speisen"');
    expect(appSource).toContain('path="/speisen"');
    expect(navigationSource).toContain("href: '/speisen'");
    expect(navigationSource).toContain("lang === 'de' ? 'Speisen' : 'Food'");
    expect(footerSource).toContain('href="/speisen"');
  });
});
