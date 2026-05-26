import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

// v12 full-page mode — 11 pages, Sunday hours corrected to 10:00, all pages regenerated
const MENU_PAGES = [
  '/manus-storage/p01_welcome_47e4cd88.png',                            // Welcome + Oeffnungszeiten (Mo-Do 09-21, Fr-Sa 09-23, So 10-21 separate)
  '/manus-storage/p02_kaffee_tee_d52ec642.png',                         // Kaffee + Tee
  '/manus-storage/p03_kalt_beecc5ad.png',                               // Kaltgetranke + Eischokolade + Milkshake
  '/manus-storage/p04_limo_7d863050.png',                               // Hausgemachte Limonade
  '/manus-storage/p05_bier_26274e42.png',                               // Frueh Koelsch + Flaschenbier
  '/manus-storage/p06_cocktails1_3c6b912e.png',                         // Cocktails (alkoholisch + alkoholfrei)
  '/manus-storage/p07_cocktails2_4051109f.png',                         // Cocktails continued
  '/manus-storage/p08_shots_c2c75bc6.png',                              // Alkohol Shots
  '/manus-storage/p09_longdrinks_whiskey_aperitif_03ebd5e5.png',        // Long Drinks + Whiskey + Aperitif
  '/manus-storage/p10_wein_eis_46018829.png',                           // Wein & Sekt + Eis
  '/manus-storage/p11_thanks_1cd94c37.png',                             // Vielen Dank
];

const SOUND_URL = '/manus-storage/turn_d5b169b6.mp3';
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

export default function Menu() {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'ArrowLeft') setCurrentPage((p) => Math.max(0, p - 1));
      if (e.key === 'ArrowRight') setCurrentPage((p) => Math.min(MENU_PAGES.length - 1, p + 1));
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0603]">
      {/* ============ PAGE HERO ============ */}
      <section className="relative h-48 md:h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/60 to-[#0a0603]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-700" />
            <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium">
              Cafe&Bar Luxor
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {t('menu.title')}
          </h1>
        </div>
      </section>

      {/* ============ FLIPBOOK VIEWER ============ */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            {/* Flipbook Container */}
            <div
              className="w-full max-w-2xl aspect-[3/4] bg-white rounded-lg shadow-2xl overflow-hidden cursor-pointer hover:shadow-3xl transition-shadow"
              onClick={() => setIsFullscreen(true)}
            >
              <img
                src={MENU_PAGES[currentPage]}
                alt={`Menu page ${currentPage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Page Counter */}
            <div className="text-center">
              <p className="text-white/60 text-sm">
                {t('menu.page')} {currentPage + 1} / {MENU_PAGES.length}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="px-6 py-2 bg-red-700 hover:bg-red-600 disabled:bg-gray-600 text-white transition-colors"
              >
                ← {t('menu.prev')}
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(MENU_PAGES.length - 1, p + 1))}
                disabled={currentPage === MENU_PAGES.length - 1}
                className="px-6 py-2 bg-red-700 hover:bg-red-600 disabled:bg-gray-600 text-white transition-colors"
              >
                {t('menu.next')} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FULLSCREEN MODAL ============ */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-red-700 transition-colors"
          >
            <X size={32} />
          </button>
          <div className="w-full h-full max-w-4xl max-h-screen flex items-center justify-center">
            <img
              src={MENU_PAGES[currentPage]}
              alt={`Menu page ${currentPage + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-700 disabled:text-gray-600 transition-colors"
          >
            ← 
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(MENU_PAGES.length - 1, p + 1))}
            disabled={currentPage === MENU_PAGES.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-700 disabled:text-gray-600 transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
