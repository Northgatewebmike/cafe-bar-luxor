import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..', '..', '..');
const pageSource = readFileSync(resolve(projectRoot, 'client/src/pages/JobsPraktikum.tsx'), 'utf8');

describe('Jobs & Praktikum page', () => {
  it('offers separate clickable WhatsApp job and internship actions without displaying the phone number', () => {
    expect(pageSource).toContain('jobWhatsAppUrl');
    expect(pageSource).toContain('internshipWhatsAppUrl');
    expect(pageSource).toContain("https://wa.me/${APPLICATION_PHONE}");
    expect(pageSource).toContain('FaWhatsapp');
    expect(pageSource).toContain('cursor-pointer');
    expect(pageSource).not.toContain('href={`tel:+${APPLICATION_PHONE}`}');
    expect(pageSource).not.toContain('+49 176 21899372');
  });

  it('contains German and English application copy with a privacy notice', () => {
    expect(pageSource).toContain('Jobs & Praktikum');
    expect(pageSource).toContain('Jobs & Internships');
    expect(pageSource).toContain('Per WhatsApp bewerben');
    expect(pageSource).toContain('Apply via WhatsApp');
    expect(pageSource).toContain('Lebenslauf oder Bewerbung im geöffneten WhatsApp-Chat anhängen.');
    expect(pageSource).toContain('mein Name ist [Name]. Ich gehe zur Schule und möchte gerne ein Praktikum');
    expect(pageSource).not.toContain('Interesse geweckt?');
    expect(pageSource).toContain('Datenschutzerklärung');
    expect(pageSource).toContain('Privacy policy');
  });
});
