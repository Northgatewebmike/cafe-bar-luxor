/**
 * Menu Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Interactive 3D flip book menu
 * Real CSS 3D perspective flip effect, touch + click compatible
 */
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';
const MENU_COVER = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-cover-8ZjTmKhKU4uWrXkFmEuu3Q.webp';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

interface MenuPage {
  category: string;
  items: MenuItem[];
  bgColor: string;
}

export default function Menu() {
  const { t } = useLanguage();
  const [currentSpread, setCurrentSpread] = useState(0); // 0 = cover, 1,2,3... = spreads
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const touchStartX = useRef(0);

  const menuPages: MenuPage[] = [
    {
      category: t('menu.cat.coffee'),
      bgColor: '#1a0f08',
      items: [
        { name: t('menu.espresso'), desc: t('menu.espresso.desc'), price: '2,50 €' },
        { name: t('menu.doppio'), desc: t('menu.doppio.desc'), price: '3,20 €' },
        { name: t('menu.cappuccino'), desc: t('menu.cappuccino.desc'), price: '3,50 €' },
        { name: t('menu.latte'), desc: t('menu.latte.desc'), price: '4,00 €' },
        { name: t('menu.americano'), desc: t('menu.americano.desc'), price: '3,00 €' },
        { name: t('menu.macchiato'), desc: t('menu.macchiato.desc'), price: '2,80 €' },
        { name: t('menu.flatwhite'), desc: t('menu.flatwhite.desc'), price: '4,20 €' },
        { name: t('menu.tee'), desc: t('menu.tee.desc'), price: '3,00 €' },
        { name: t('menu.heisskakao'), desc: t('menu.heisskakao.desc'), price: '3,80 €' },
      ],
    },
    {
      category: t('menu.cat.cold'),
      bgColor: '#0f1a14',
      items: [
        { name: t('menu.wasser'), desc: t('menu.wasser.desc'), price: '2,00 €' },
        { name: t('menu.softdrink'), desc: t('menu.softdrink.desc'), price: '2,80 €' },
        { name: t('menu.saft'), desc: t('menu.saft.desc'), price: '3,00 €' },
        { name: t('menu.eiskaffee'), desc: t('menu.eiskaffee.desc'), price: '4,50 €' },
        { name: t('menu.smoothie'), desc: t('menu.smoothie.desc'), price: '4,80 €' },
      ],
    },
    {
      category: t('menu.cat.cocktails'),
      bgColor: '#1a0808',
      items: [
        { name: t('menu.aperol'), desc: t('menu.aperol.desc'), price: '5,00 €' },
        { name: t('menu.hugo'), desc: t('menu.hugo.desc'), price: '6,00 €' },
        { name: t('menu.mojito'), desc: t('menu.mojito.desc'), price: '7,00 €' },
        { name: t('menu.gin.tonic'), desc: t('menu.gin.tonic.desc'), price: '7,50 €' },
        { name: t('menu.longdrink'), desc: t('menu.longdrink.desc'), price: '6,50 €' },
        { name: t('menu.negroni'), desc: t('menu.negroni.desc'), price: '8,00 €' },
      ],
    },
    {
      category: t('menu.cat.beer'),
      bgColor: '#0f130a',
      items: [
        { name: t('menu.bier.draft'), desc: t('menu.bier.draft.desc'), price: '2,80 / 3,80 €' },
        { name: t('menu.bier.bottle'), desc: t('menu.bier.bottle.desc'), price: '3,00 €' },
        { name: t('menu.wein.rot'), desc: t('menu.wein.rot.desc'), price: '4,50 / 18,00 €' },
        { name: t('menu.wein.weiss'), desc: t('menu.wein.weiss.desc'), price: '4,50 / 18,00 €' },
        { name: t('menu.sekt'), desc: t('menu.sekt.desc'), price: '4,00 / 20,00 €' },
      ],
    },
    {
      category: t('menu.cat.food'),
      bgColor: '#1a1208',
      items: [
        { name: t('menu.toast'), desc: t('menu.toast.desc'), price: '4,50 €' },
        { name: t('menu.sandwich'), desc: t('menu.sandwich.desc'), price: '5,50 €' },
        { name: t('menu.kuchen'), desc: t('menu.kuchen.desc'), price: '3,50 €' },
        { name: t('menu.croissant'), desc: t('menu.croissant.desc'), price: '2,50 €' },
        { name: t('menu.snacks'), desc: t('menu.snacks.desc'), price: '2,00 €' },
      ],
    },
  ];

  // Total spreads: cover (0) + pages in pairs
  const totalSpreads = Math.ceil(menuPages.length / 2) + 1; // +1 for cover

  const goNext = () => {
    if (isFlipping || currentSpread >= totalSpreads - 1) return;
    setFlipDirection('next');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpread((s) => s + 1);
      setIsFlipping(false);
    }, 600);
  };

  const goPrev = () => {
    if (isFlipping || currentSpread <= 0) return;
    setFlipDirection('prev');
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentSpread((s) => s - 1);
      setIsFlipping(false);
    }, 600);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Get current pages to display
  const getLeftPage = () => {
    if (currentSpread === 0) return null; // cover
    const pageIndex = (currentSpread - 1) * 2;
    return menuPages[pageIndex] || null;
  };

  const getRightPage = () => {
    if (currentSpread === 0) return null; // cover
    const pageIndex = (currentSpread - 1) * 2 + 1;
    return menuPages[pageIndex] || null;
  };

  const leftPage = getLeftPage();
  const rightPage = getRightPage();

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
            <div className="h-px w-8 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Cafe&Bar Luxor
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('menu.title')}
          </h1>
        </div>
      </section>

      {/* ============ FLIP BOOK ============ */}
      <section className="py-8 md:py-12 px-4">
        <p
          className="text-center text-white/40 text-sm mb-8"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          {t('menu.instruction')}
        </p>

        {/* Book Container */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: '900px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Book shadow */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)' }}
          />

          {/* Book */}
          <div
            className={`relative mx-auto transition-all duration-600 ${isFlipping ? 'scale-[0.98]' : 'scale-100'}`}
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
            }}
          >
            {currentSpread === 0 ? (
              /* COVER */
              <div
                className="relative mx-auto overflow-hidden cursor-pointer group"
                style={{
                  maxWidth: '400px',
                  aspectRatio: '3/4',
                  boxShadow: '8px 8px 40px rgba(0,0,0,0.8), -2px 0 20px rgba(0,0,0,0.4)',
                  border: '1px solid rgba(201,168,76,0.3)',
                }}
                onClick={goNext}
              >
                <img
                  src={MENU_COVER}
                  alt="Menu Cover"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <div className="h-px w-16 bg-[#c9a84c] mb-6" />
                  <h2
                    className="text-3xl md:text-4xl font-bold text-[#c9a84c] mb-2 tracking-wider"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {t('menu.cover.title')}
                  </h2>
                  <p
                    className="text-white/70 text-sm tracking-[0.2em] uppercase mb-2"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {t('menu.cover.subtitle')}
                  </p>
                  <div className="h-px w-16 bg-[#c9a84c] mt-4 mb-6" />
                  <p className="text-white/40 text-xs tracking-widest uppercase"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t('menu.cover.address')}
                  </p>
                </div>
                {/* Open hint */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <span className="text-[#c9a84c]/60 text-xs tracking-widest uppercase animate-pulse"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t('menu.next')} →
                  </span>
                </div>
              </div>
            ) : (
              /* SPREAD (two pages) */
              <div
                className={`flex gap-0 transition-all duration-600 ${
                  isFlipping
                    ? flipDirection === 'next'
                      ? 'opacity-80 scale-[0.97]'
                      : 'opacity-80 scale-[0.97]'
                    : 'opacity-100 scale-100'
                }`}
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                }}
              >
                {/* Left Page */}
                <div
                  className="flex-1 min-h-[500px] md:min-h-[600px] p-6 md:p-8 relative overflow-hidden"
                  style={{
                    background: leftPage ? leftPage.bgColor : '#1a0f08',
                    borderRight: '2px solid rgba(201,168,76,0.2)',
                    boxShadow: 'inset -10px 0 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {leftPage ? (
                    <PageContent page={leftPage} />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-white/20 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        ←
                      </span>
                    </div>
                  )}
                  {/* Page number */}
                  <div className="absolute bottom-4 left-4 text-white/20 text-xs"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {currentSpread * 2 - 1}
                  </div>
                  {/* Spine shadow */}
                  <div className="absolute top-0 right-0 w-8 h-full"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.3))' }} />
                </div>

                {/* Right Page */}
                <div
                  className="flex-1 min-h-[500px] md:min-h-[600px] p-6 md:p-8 relative overflow-hidden"
                  style={{
                    background: rightPage ? rightPage.bgColor : '#1a0f08',
                    boxShadow: 'inset 10px 0 30px rgba(0,0,0,0.3)',
                  }}
                >
                  {rightPage ? (
                    <PageContent page={rightPage} />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="h-px w-16 bg-[#c9a84c]/30 mb-6" />
                      <p
                        className="text-[#c9a84c]/50 text-sm italic"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        Cafe&Bar Luxor
                      </p>
                      <p
                        className="text-white/20 text-xs mt-2"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        Ohligser Markt 5 · Solingen
                      </p>
                      <div className="h-px w-16 bg-[#c9a84c]/30 mt-6" />
                    </div>
                  )}
                  {/* Page number */}
                  <div className="absolute bottom-4 right-4 text-white/20 text-xs"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {currentSpread * 2}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 px-2">
            <button
              onClick={goPrev}
              disabled={currentSpread === 0 || isFlipping}
              className={`flex items-center gap-2 px-5 py-3 border transition-all duration-300 text-sm font-medium tracking-wide ${
                currentSpread === 0
                  ? 'border-white/10 text-white/20 cursor-not-allowed'
                  : 'border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]'
              }`}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <ChevronLeft size={16} />
              {t('menu.prev')}
            </button>

            {/* Page indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalSpreads }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!isFlipping) {
                      setFlipDirection(i > currentSpread ? 'next' : 'prev');
                      setIsFlipping(true);
                      setTimeout(() => {
                        setCurrentSpread(i);
                        setIsFlipping(false);
                      }, 400);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentSpread ? 'bg-[#c9a84c] scale-125' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={currentSpread >= totalSpreads - 1 || isFlipping}
              className={`flex items-center gap-2 px-5 py-3 border transition-all duration-300 text-sm font-medium tracking-wide ${
                currentSpread >= totalSpreads - 1
                  ? 'border-white/10 text-white/20 cursor-not-allowed'
                  : 'border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 hover:border-[#c9a84c]'
              }`}
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {t('menu.next')}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PageContent({ page }: { page: { category: string; items: { name: string; desc: string; price: string }[] } }) {
  return (
    <div className="h-full flex flex-col">
      {/* Category Header */}
      <div className="mb-6">
        <div className="h-px w-12 bg-[#c9a84c] mb-3" />
        <h2
          className="text-xl md:text-2xl font-semibold text-[#c9a84c]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {page.category}
        </h2>
        <div className="h-px w-full bg-[#c9a84c]/15 mt-3" />
      </div>

      {/* Menu Items */}
      <div className="flex-1 space-y-3 overflow-hidden">
        {page.items.map((item, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-3 pb-3 border-b border-white/5 last:border-0 group"
          >
            <div className="flex-1 min-w-0">
              <div
                className="text-white text-sm font-medium leading-tight group-hover:text-[#c9a84c] transition-colors duration-200"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem' }}
              >
                {item.name}
              </div>
              <div
                className="text-white/35 text-xs mt-0.5 leading-tight"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {item.desc}
              </div>
            </div>
            <div
              className="text-[#c9a84c] text-sm font-semibold whitespace-nowrap flex-shrink-0"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {item.price}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative footer */}
      <div className="mt-4 flex items-center gap-2">
        <div className="h-px flex-1 bg-[#c9a84c]/10" />
        <span className="text-[#c9a84c]/20 text-xs">✦</span>
        <div className="h-px flex-1 bg-[#c9a84c]/10" />
      </div>
    </div>
  );
}
