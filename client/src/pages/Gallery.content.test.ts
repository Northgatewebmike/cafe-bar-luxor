import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '..', '..', '..');
const gallerySource = readFileSync(resolve(projectRoot, 'client/src/pages/Gallery.tsx'), 'utf8');
const cssSource = readFileSync(resolve(projectRoot, 'client/src/index.css'), 'utf8');
const translationSource = readFileSync(resolve(projectRoot, 'client/src/contexts/LanguageContext.tsx'), 'utf8');

describe('Flying Posters gallery', () => {
  it('preserves all six Luxor photos in a motion-enabled, clickable poster stage', () => {
    expect(gallerySource).toContain('luxor-poster-stage');
    expect(gallerySource).toContain('motion.button');
    expect(gallerySource).toContain('PHOTO_INTERIOR');
    expect(gallerySource).toContain('PHOTO_TERRACE_SUNSET');
    expect(gallerySource).toContain('PHOTO_TERRACE_DAY');
    expect(gallerySource).toContain('PHOTO_TERRACE_NEW1');
    expect(gallerySource).toContain('PHOTO_TERRACE_NEW2');
    expect(gallerySource).toContain('PHOTO_TERRACE_NEW3');
    expect(gallerySource).toContain('onClick={() => openLightbox(i)}');
    expect(gallerySource).toContain('whileHover');
  });

  it('keeps the gallery accessible and supports reduced motion', () => {
    expect(gallerySource).toContain('useReducedMotion');
    expect(gallerySource).toContain('aria-label={`${img.label} — ${t(\'gallery.open\')}`}');
    expect(cssSource).toContain('@media (prefers-reduced-motion: reduce)');
    expect(cssSource).toContain('.luxor-poster:focus-visible');
    expect(cssSource).toContain('@media (max-width: 767px)');
  });

  it('uses complete German and English poster captions', () => {
    expect(translationSource).toContain("'gallery.img4': 'Terrasse am Cafe&Bar Luxor'");
    expect(translationSource).toContain("'gallery.img4': 'Cafe&Bar Luxor terrace'");
    expect(translationSource).toContain("'gallery.open': 'Foto vergrößern'");
    expect(translationSource).toContain("'gallery.open': 'Enlarge photo'");
  });
});
