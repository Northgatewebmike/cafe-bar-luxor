import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    jQuery: any;
    dFlip: any;
  }
}

// v16 full-page mode — 11 pages (cover + 10 content), Updated pricing: Aperol 7€, Wines 6€
const MENU_PAGES = [
  '/manus-storage/menu-cover-luxor-v2_ecb75175.png',                    // AI Cover
  '/manus-storage/p01_welcome_e31b2833.png',                            // Welcome + Öffnungszeiten (Mo-Do 09-21, Fr-Sa 09-23, So 10-21 separate)
  '/manus-storage/p02_kaffee_tee_70aa67fc.png',                         // Kaffee + Tee
  '/manus-storage/p03_kalt_a7de1475.png',                               // Kaltgetränke + Eischokolade + Milchshake (3 flavors)
  '/manus-storage/p04_limo_baa43690.png',                               // Hausgemachte Limonade
  '/manus-storage/p05_bier_cf156e78.png',                               // Zapfenbier: Veltins/Früh 0,3l=3€, 0,5l=5€
  '/manus-storage/p06_cocktails1_df196d4b.png',                         // Cocktails: Aperol 7€, Others 9€, Alkoholfrei 7€
  '/manus-storage/p07_cocktails2_a060e89e.png',                         // Alkohol Shots (single page)
  '/manus-storage/p08_longdrinks_whiskey_aperitif_4b1018ca.png',        // Long Drinks + Whiskey + Aperitif
  '/manus-storage/p09_wein_eis_80a4c9b1.png',                           // Wein & Sekt 6€ + Eis (only ice cream, no Eischokolade/Milchshake)
  '/manus-storage/p10_thanks_f9d32172.png',                             // Vielen Dank
];

const SOUND_URL = '/manus-storage/turn_d5b169b6.mp3';
const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

export default function Menu() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDFlip = async () => {
      // Load jQuery
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jqueryScript.onload = () => {
        // Load dFlip
        const dflipScript = document.createElement('script');
        dflipScript.src = 'https://www.dflip.io/js/dflip.js';
        dflipScript.onload = () => {
          // Load dFlip CSS
          const dflipCSS = document.createElement('link');
          dflipCSS.rel = 'stylesheet';
          dflipCSS.href = 'https://www.dflip.io/css/dflip.min.css';
          document.head.appendChild(dflipCSS);

          // Initialize dFlip with multiple pages
          if (window.jQuery && window.dFlip) {
            const pages = MENU_PAGES.map((url) => ({ src: url }));
            window.jQuery(containerRef.current).dFlip({
              pages,
              sound: SOUND_URL,
              webgl: true,
              height: 600,
              backgroundColor: '#1a1a1a',
              duration: 800,
              direction: 'ltr',
            });
          }
        };
        document.head.appendChild(dflipScript);
      };
      document.head.appendChild(jqueryScript);
    };

    loadDFlip();
  }, []);

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

      {/* dFlip Container */}
      <section className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={containerRef} className="dflip-container" />
        </div>
      </section>
    </div>
  );
}
