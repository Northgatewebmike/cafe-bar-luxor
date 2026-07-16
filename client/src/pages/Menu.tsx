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

// v18 full-page mode — 11 pages (cover + 10 content) COMPLETE ALLERGEN AUDIT per EU LMIV
// Updated: bottled beer A=Gluten, Vodka/Jager Energy coffeinhaltig, improved shots notes, full legend
const MENU_PAGES = [
  '/manus-storage/menu-cover-luxor-v2_ecb75175.png',                    // AI Cover
  '/manus-storage/p01_welcome_2b120f43.png',                            // Welcome + Oeffnungszeiten
  '/manus-storage/p02_kaffee_tee_7e4a1674.png',                         // Kaffee + Tee (1/A-N codes)
  '/manus-storage/p03_kalt_1318c766.png',                               // Kaltgetranke (1/A-N codes)
  '/manus-storage/p04_limo_2ef2a3b9.png',                               // Hausgemachte Limonade
  '/manus-storage/p05_bier_53951fac.png',                               // Bier (1/A Gluten, 4/D Sulfite)
  '/manus-storage/p06_cocktails1_0ba8d16b.png',                         // Cocktails (1/A-N codes)
  '/manus-storage/p07_cocktails2_6e14b8dc.png',                         // Shots (1/A-N notes)
  '/manus-storage/p08_longdrinks_whiskey_aperitif_f953963b.png',        // Long Drinks + Whiskey + Aperitif
  '/manus-storage/p09_wein_eis_4839dc68.png',                           // Wein & Sekt + Eis (4/D, 6/F)
  '/manus-storage/p10_thanks_bf012ec9.png',                             // Vielen Dank
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
      <section className="pb-8 md:pb-12">
        <div className="w-full px-0 reveal">
          <DFlipBook />
        </div>
      </section>

      {/* ============ ALLERGEN NOTICE (EU LMIV) ============ */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 reveal">
          <div
            className="border border-red-900/40 rounded-sm p-5 md:p-6"
            style={{ backgroundColor: 'rgba(30,0,0,0.6)' }}
          >
            <div className="flex items-start gap-3">
              <span className="text-red-700 text-xl mt-0.5 flex-shrink-0">⚠</span>
              <div>
                <h3
                  className="text-white font-semibold text-sm tracking-widest uppercase mb-2"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Allergen- & Zusatzstoffhinweis
                </h3>
                <p
                  className="text-white/60 text-xs leading-relaxed mb-3"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Unsere Speise- und Getränkekarte enthält Kennzeichnungen für die 14 kennzeichnungspflichtigen
                  Allergene sowie Zusatzstoffe gemäß EU-Lebensmittelinformationsverordnung (LMIV 1169/2011).
                  Die Codes sind direkt bei den jeweiligen Produkten angegeben.
                  Trotz sorgfältiger Herstellung können Spuren anderer Stoffe nicht ausgeschlossen werden.
                </p>
                <p
                  className="text-white/60 text-xs leading-relaxed mb-3"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <strong className="text-white/80">Legende:</strong>{' '}
                  A = Gluten &nbsp;|&nbsp; D = Sulfite/geschwefelt &nbsp;|&nbsp; F = Milch/Laktose &nbsp;|&nbsp;
                  H = Nüsse &nbsp;|&nbsp; I = Eier &nbsp;|&nbsp; L = Soja
                </p>
                <a
                  href="/allergene"
                  className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-400 text-xs font-medium transition-colors"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Vollständige Allergenliste &amp; Zusatzstoffe ansehen →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
