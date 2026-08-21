import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..', '..', '..');
const pageSource = readFileSync(resolve(projectRoot, 'client/src/pages/JobsPraktikum.tsx'), 'utf8');

describe('Jobs & Praktikum page', () => {
  it('offers private WhatsApp and call application actions without displaying the phone number', () => {
    expect(pageSource).toContain("https://wa.me/${APPLICATION_PHONE}");
    expect(pageSource).toContain('href={`tel:+${APPLICATION_PHONE}`}');
    expect(pageSource).toContain('FaWhatsapp');
    expect(pageSource).not.toContain('+49 176 21899372');
  });

  it('contains German and English application copy with a privacy notice', () => {
    expect(pageSource).toContain('Jobs & Praktikum');
    expect(pageSource).toContain('Jobs & Internships');
    expect(pageSource).toContain('Per WhatsApp bewerben');
    expect(pageSource).toContain('Apply via WhatsApp');
    expect(pageSource).toContain('Datenschutzerklärung');
    expect(pageSource).toContain('Privacy policy');
  });
});
