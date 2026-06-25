/**
 * Menu Page — Cafe&Bar Luxor
 * Uses the real dFlip 3D Flipbook library (same as altohligs.de)
 * dFlip uses Three.js WebGL for authentic page-curl animation with sound.
 * Single-page mode: one page fills the full width — big readable text, no zoom needed.
 */

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Declare global dFlip types
declare global {
  interface Window {
    DFLIP: {
      defaults: Record<string, unknown>;
      Application: (opts: Record<string, unknown>) => unknown;
    };
    DEARFLIP: typeof window.DFLIP;
    jQuery: ((selector: unknown) => unknown) & {
      fn: Record<string, unknown>;
    };
    $: typeof window.jQuery;
  }
}

// v16 full-page mode — 11 pages (cover + 10 content), Beer 0.3l=3EUR 0.5l=5EUR, Wine 6EUR, Aperol 7EUR
const MENU_PAGES = [
  '/manus-storage/menu-cover-luxor-v2_ecb75175.png',                    // AI Cover
  '/manus-storage/p01_welcome_8e990118.png',                            // Welcome + Oeffnungszeiten (Mo-Do 09-21, Fr-Sa 09-23, So 10-21 separate)
  '/manus-storage/p02_kaffee_tee_e60ad75d.png',                         // Kaffee + Tee
  '/manus-storage/p03_kalt_1021e496.png',                               // Kaltgetranke + Eischokolade + Milchshake (3 flavors)
  '/manus-storage/p04_limo_4e66f31b.png',                               // Hausgemachte Limonade
  '/manus-storage/p05_bier_677d80c2.png',                               // Zapfenbier: Veltins/Frueh 0,2l=2EUR, 0,3l=3EUR, 0,5l=5EUR
  '/manus-storage/p06_cocktails1_47ad84f1.png',                         // Cocktails: Aperol 7EUR, Caipirinha 7EUR, Others 8EUR, Alkoholfrei 7EUR
  '/manus-storage/p07_cocktails2_09866c62.png',                         // Alkohol Shots (single page)
  '/manus-storage/p08_longdrinks_whiskey_aperitif_42fbc82c.png',        // Long Drinks + Whiskey + Aperitif
  '/manus-storage/p09_wein_eis_a6ecbd27.png',                           // Wein & Sekt (incl. Rose) 6EUR + Eis
  '/manus-storage/p10_thanks_aa22a943.png',                             // Vielen Dank
];

const SOUND_URL = '/manus-storage/turn_d5b169b6.mp3';
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function DFlipBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 80; // 8 seconds

    const tryInit = () => {
      attempts++;
      const DFLIP = window.DFLIP || window.DEARFLIP;

      if (DFLIP && containerRef.current) {
        setStatus('ready');
        setTimeout(() => {
          if (!containerRef.current) return;
          try {
            DFLIP.Application({
              source: MENU_PAGES,
              element: containerRef.current,
              // 3D WebGL mode — the key feature
              is3D: true,
              // Sound
              enableSound: true,
              soundFile: SOUND_URL,
              // SINGLE page mode — one page fills full width, big readable text, no zoom needed
              pageMode: 1,
              singlePageMode: 1,
              // No zoom controls needed — text is already big enough
              showZoomControl: false,
              // Appearance
              backgroundColor: '#0a0000',
              // Controls at bottom
              controlsPosition: 'bottom',
              showDownloadControl: false,
              showShareControl: false,
              showFullScreenControl: true,
              // Hard cover
              cover3DType: true,
              flipbookHardPages: 'cover',
              // Auto height — fills available width proportionally
              height: 'auto',
              // Flip speed — smooth
              duration: 700,
            });
          } catch (err) {
            console.error('dFlip init error:', err);
            setStatus('error');
          }
        }, 150);
      } else if (attempts < maxAttempts) {
        setTimeout(tryInit, 100);
      } else {
        setStatus('error');
      }
    };

    tryInit();
  }, []);

  return (
    <div className="w-full relative">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#0a0000]" style={{ minHeight: '400px' }}>
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-red-700/40 border-t-red-700 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/40 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Speisekarte wird geladen…
            </p>
          </div>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center justify-center py-20 text-white/30 text-sm text-center" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Die Speisekarte konnte nicht geladen werden. Bitte Seite neu laden.
        </div>
      )}
      {/* dFlip mounts here */}
      <div
        ref={containerRef}
        id="luxor-flipbook"
        style={{ width: '100%', minHeight: '500px' }}
      />
    </div>
  );
}

export default function Menu() {
  const { t } = useLanguage();
  useReveal();

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0000]">
      {/* ============ PAGE HERO ============ */}
      <section className="relative h-48 md:h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/60 to-[#0a0000]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-700" />
            <span
              className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Cafe&Bar Luxor
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('nav.menu')}
          </h1>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="py-6 md:py-8">
        <div className="max-w-3xl mx-auto px-4 text-center reveal">
          <p
            className="text-white/50 text-sm leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Klicken Sie auf das Cover, um das Buch zu öffnen — dann auf den Seitenrand oder die Pfeile zum Blättern.
            Auf dem Handy: Wischen Sie nach links oder rechts.
          </p>
        </div>
      </section>

      {/* ============ FLIPBOOK ============ */}
      <section className="pb-16 md:pb-24">
        <div className="w-full px-0 reveal">
          <DFlipBook />
        </div>
      </section>
    </div>
  );
}
