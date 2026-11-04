import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..', '..', '..');
const menuSource = readFileSync(resolve(projectRoot, 'client/src/pages/Menu.tsx'), 'utf8');
const foodPageSource = readFileSync(resolve(projectRoot, 'client/src/pages/Speisen.tsx'), 'utf8');
const appSource = readFileSync(resolve(projectRoot, 'client/src/App.tsx'), 'utf8');
const navigationSource = readFileSync(resolve(projectRoot, 'client/src/components/Navigation.tsx'), 'utf8');
const footerSource = readFileSync(resolve(projectRoot, 'client/src/components/Footer.tsx'), 'utf8');

describe('food content inside the flipbook menu', () => {
  it('keeps all six requested dishes and prices in the bilingual food source', () => {
    for (const text of ['Kleines Frühstück', 'Großes Frühstück', 'Hähnchenschnitzel', 'Wurst', 'Frikadellen', 'Kartoffelsalat']) {
      expect(foodPageSource).toContain(text);
    }
    for (const price of ['5,90 €', '8,50 €', '7,90 €', '3,50 €', '2,50 €']) {
      expect(foodPageSource).toContain(price);
    }
  });

  it('contains English labels and bilingual ingredient/allergen content', () => {
    for (const text of ['Food & Ingredients', 'Small Breakfast', 'Large Breakfast', 'Chicken Schnitzel', 'German Meatballs', 'Potato Salad', 'Ingredients', 'Common allergens & notes']) {
      expect(foodPageSource).toContain(text);
    }
    for (const text of ['Gluten', 'Milk/lactose', 'Mustard', 'Celery']) {
      expect(foodPageSource).toContain(text);
    }
  });

  it('loads the food content as a real flipbook sheet and removes the standalone page links', () => {
    expect(menuSource).toContain("'/media/p10_speisen_de_7c4e2a1b.png'");
    expect(menuSource).toContain("'/media/p10_speisen_en_7c4e2a1b.png'");
    expect(menuSource).toContain("'/media/p11_closing_de_9d2f6a4c.png'");
    expect(menuSource).toContain("'/media/p11_closing_en_9d2f6a4c.png'");
    expect(appSource).not.toContain('path="/speisen"');
    expect(appSource).not.toContain('import Speisen from "./pages/Speisen"');
    expect(navigationSource).not.toContain("href: '/speisen'");
    expect(footerSource).not.toContain('href="/speisen"');
  });
});
