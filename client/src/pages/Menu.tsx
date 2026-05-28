import { useState, useEffect, useRef } from 'react';

const MENU_PAGES = [
  '/manus-storage/menu-cover-luxor-v2_ecb75175.png',                    // AI Cover
  '/manus-storage/p01_welcome_e31b2833.png',                            // Welcome + Öffnungszeiten
  '/manus-storage/p02_kaffee_tee_70aa67fc.png',                         // Kaffee + Tee
  '/manus-storage/p03_kalt_a7de1475.png',                               // Kaltgetränke + Eischokolade + Milchshake
  '/manus-storage/p04_limo_baa43690.png',                               // Hausgemachte Limonade
  '/manus-storage/p05_bier_cf156e78.png',                               // Zapfenbier
  '/manus-storage/p06_cocktails1_df196d4b.png',                         // Cocktails
  '/manus-storage/p07_cocktails2_a060e89e.png',                         // Alkohol Shots
  '/manus-storage/p08_longdrinks_whiskey_aperitif_4b1018ca.png',        // Long Drinks + Whiskey + Aperitif
  '/manus-storage/p09_wein_eis_80a4c9b1.png',                           // Wein & Sekt + Eis
  '/manus-storage/p10_thanks_f9d32172.png',                             // Vielen Dank
];

const SOUND_URL = '/manus-storage/turn_d5b169b6.mp3';
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

export default function Menu() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const playPageTurnSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Silently fail if audio can't play
      });
    }
  };

  const nextPage = () => {
    if (currentPage < MENU_PAGES.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const goToPage = (pageNum: number) => {
    if (pageNum !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection(pageNum > currentPage ? 'next' : 'prev');
      playPageTurnSound();
      setTimeout(() => {
        setCurrentPage(pageNum);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <div className="page-enter min-h-screen bg-[#0a0603] pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative h-48 md:h-64 flex items-end overflow-hidden mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/60 to-[#0a0603]/30" />
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
            Speisekarte
          </h1>
        </div>
      </section>

      {/* Flipbook Container */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Flipbook Display with 3D Flip Effect */}
          <div ref={containerRef} className="relative mb-8 group perspective">
            <div
              className="relative w-full aspect-[3/4] bg-black/40 overflow-hidden"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Left Page (Back) */}
              <div
                className="absolute inset-0 w-1/2 left-0 origin-right transition-transform duration-600"
                style={{
                  transform: isFlipping && flipDirection === 'next' ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={MENU_PAGES[currentPage]}
                  alt={`Menu Page ${currentPage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Left Page (Front) */}
              <div
                className="absolute inset-0 w-1/2 left-0 origin-right"
                style={{
                  transform: isFlipping && flipDirection === 'prev' ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transition: 'transform 0.6s ease-out',
                }}
              >
                <img
                  src={MENU_PAGES[Math.max(0, currentPage - 1)]}
                  alt={`Menu Page ${Math.max(1, currentPage)}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Page (Front) */}
              <div
                className="absolute inset-0 w-1/2 right-0 origin-left"
                style={{
                  transform: isFlipping && flipDirection === 'next' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transition: 'transform 0.6s ease-out',
                }}
              >
                <img
                  src={MENU_PAGES[currentPage]}
                  alt={`Menu Page ${currentPage + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Page (Back) */}
              <div
                className="absolute inset-0 w-1/2 right-0 origin-left transition-transform duration-600"
                style={{
                  transform: isFlipping && flipDirection === 'prev' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <img
                  src={MENU_PAGES[Math.min(MENU_PAGES.length - 1, currentPage + 1)]}
                  alt={`Menu Page ${Math.min(MENU_PAGES.length, currentPage + 2)}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center Spine */}
              <div className="absolute inset-y-0 left-1/2 w-1 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10 pointer-events-none" />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevPage}
              disabled={currentPage === 0 || isFlipping}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 p-3 rounded-full border border-white/20 hover:border-red-700 hover:bg-red-700/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous page"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextPage}
              disabled={currentPage === MENU_PAGES.length - 1 || isFlipping}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 p-3 rounded-full border border-white/20 hover:border-red-700 hover:bg-red-700/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next page"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Page Counter */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-white/60 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Seite {currentPage + 1} von {MENU_PAGES.length}
            </span>
          </div>

          {/* Page Navigation Thumbnails */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-2 justify-center min-w-max px-4">
              {MENU_PAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  className={`flex-shrink-0 w-12 h-16 border-2 transition-all duration-300 ${
                    currentPage === idx
                      ? 'border-red-700 bg-red-700/20'
                      : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                >
                  <span className="text-xs text-white/70 flex items-center justify-center h-full">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Audio for page turn sound */}
          <audio ref={audioRef} src={SOUND_URL} preload="auto" />
        </div>
      </section>
    </div>
  );
}
