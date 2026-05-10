/**
 * Menu Page — Cafe&Bar Luxor
 * Real 3D CSS flip-book: genuine page-turn with perspective, spine, shadow, and curl
 * Design: Elegant Red & Black
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── MENU DATA ─────────────────────────────────────────────────── */
interface MenuItem { name: string; desc: string; price: string; }
interface PageData { title: string; icon: string; items: MenuItem[]; }

const PAGES_DE: PageData[] = [
  { title: 'Heiße Getränke', icon: '☕', items: [
    { name: 'Espresso', desc: 'Intensiv & aromatisch', price: '2,20 €' },
    { name: 'Doppelter Espresso', desc: 'Für echte Kaffeeliebhaber', price: '2,80 €' },
    { name: 'Cappuccino', desc: 'Espresso mit cremigem Milchschaum', price: '3,20 €' },
    { name: 'Latte Macchiato', desc: 'Sanft & cremig', price: '3,50 €' },
    { name: 'Café au Lait', desc: 'Kaffee mit heißer Milch', price: '3,00 €' },
    { name: 'Americano', desc: 'Espresso mit heißem Wasser', price: '2,80 €' },
    { name: 'Flat White', desc: 'Doppelter Espresso mit Milch', price: '3,50 €' },
    { name: 'Heiße Schokolade', desc: 'Cremig & warm', price: '3,20 €' },
    { name: 'Tee (Auswahl)', desc: 'Schwarz, Grün, Kräuter, Früchte', price: '2,80 €' },
  ]},
  { title: 'Kalte Getränke', icon: '🧊', items: [
    { name: 'Iced Coffee', desc: 'Kalt gebrühter Kaffee auf Eis', price: '3,80 €' },
    { name: 'Iced Latte', desc: 'Espresso mit Eiswürfeln & Milch', price: '4,20 €' },
    { name: 'Frappuccino', desc: 'Cremig, kalt & erfrischend', price: '4,50 €' },
    { name: 'Smoothie des Tages', desc: 'Frisch zubereitet', price: '4,80 €' },
    { name: 'Frisch gepresster Orangensaft', desc: 'Direkt gepresst', price: '3,50 €' },
    { name: 'Limonade (hausgemacht)', desc: 'Zitrone, Minze, Ingwer', price: '3,80 €' },
    { name: 'Mineralwasser', desc: 'Still oder mit Kohlensäure', price: '2,20 €' },
    { name: 'Cola / Fanta / Sprite', desc: '0,33 l', price: '2,50 €' },
    { name: 'Red Bull', desc: 'Energy Drink', price: '3,50 €' },
  ]},
  { title: 'Bier & Wein', icon: '🍷', items: [
    { name: 'Bier vom Fass', desc: '0,3 l / 0,5 l', price: '3,20 € / 4,50 €' },
    { name: 'Flaschenbier', desc: 'Verschiedene Sorten', price: '3,00 €' },
    { name: 'Weißwein (Glas)', desc: 'Trocken oder halbtrocken', price: '4,50 €' },
    { name: 'Rotwein (Glas)', desc: 'Vollmundig & aromatisch', price: '4,50 €' },
    { name: 'Rosé (Glas)', desc: 'Frisch & fruchtig', price: '4,50 €' },
    { name: 'Prosecco (Glas)', desc: 'Prickelnd & leicht', price: '4,80 €' },
    { name: 'Weinflasche', desc: '0,75 l — Auswahl auf Anfrage', price: 'ab 18,00 €' },
    { name: 'Alkoholfreies Bier', desc: '0,33 l', price: '2,80 €' },
  ]},
  { title: 'Cocktails & Aperitifs', icon: '🍸', items: [
    { name: 'Aperol Spritz', desc: 'Aperol, Prosecco, Soda — unser Bestseller!', price: '5,00 €' },
    { name: 'Hugo', desc: 'Holunderblüte, Prosecco, Minze, Limette', price: '6,50 €' },
    { name: 'Mojito', desc: 'Rum, Minze, Limette, Rohrzucker', price: '7,50 €' },
    { name: 'Gin Tonic', desc: 'Premium Gin, Tonic Water, Gurke', price: '7,50 €' },
    { name: 'Campari Orange', desc: 'Campari & frischer Orangensaft', price: '6,00 €' },
    { name: 'Piña Colada', desc: 'Rum, Kokosnuss, Ananas', price: '7,50 €' },
    { name: 'Sex on the Beach', desc: 'Wodka, Pfirsich, Orangensaft', price: '7,50 €' },
    { name: 'Caipirinha', desc: 'Cachaça, Limette, Rohrzucker', price: '7,50 €' },
    { name: 'Cosmopolitan', desc: 'Wodka, Triple Sec, Cranberry', price: '7,50 €' },
  ]},
  { title: 'Shots & Spirituosen', icon: '🥃', items: [
    { name: 'Wodka Shot', desc: '4 cl', price: '2,50 €' },
    { name: 'Tequila Shot', desc: '4 cl — mit Salz & Limette', price: '2,80 €' },
    { name: 'Jägermeister', desc: '4 cl', price: '2,50 €' },
    { name: 'Sambuca', desc: '4 cl', price: '2,50 €' },
    { name: 'Whisky', desc: "4 cl — Jack Daniel's, Jameson", price: '4,50 €' },
    { name: 'Rum', desc: '4 cl — Havana, Bacardi', price: '4,00 €' },
    { name: 'Gin', desc: '4 cl — Hendricks, Bombay', price: '4,50 €' },
    { name: 'Baileys', desc: '4 cl — cremig & süß', price: '3,50 €' },
    { name: 'Amaretto Disaronno', desc: '4 cl', price: '3,50 €' },
  ]},
  { title: 'Speisen & Snacks', icon: '🍽️', items: [
    { name: 'Toast mit Butter', desc: 'Knusprig getoastet', price: '2,50 €' },
    { name: 'Croissant', desc: 'Butterig & frisch', price: '2,80 €' },
    { name: 'Käse-Schinken-Toast', desc: 'Überbacken & warm', price: '5,50 €' },
    { name: 'Club Sandwich', desc: 'Hähnchen, Bacon, Salat, Tomate', price: '7,50 €' },
    { name: 'Nachos mit Dips', desc: 'Guacamole, Salsa, Käse', price: '6,50 €' },
    { name: 'Portion Pommes', desc: 'Mit Ketchup & Mayo', price: '4,50 €' },
    { name: 'Käseplatte', desc: 'Auswahl regionaler Käsesorten', price: '8,50 €' },
    { name: 'Kuchen des Tages', desc: 'Hausgemacht — frisch', price: '3,50 €' },
    { name: 'Waffel', desc: 'Mit Sahne & Früchten', price: '4,50 €' },
  ]},
];

const PAGES_EN: PageData[] = [
  { title: 'Hot Beverages', icon: '☕', items: [
    { name: 'Espresso', desc: 'Intense & aromatic', price: '€2.20' },
    { name: 'Double Espresso', desc: 'For true coffee lovers', price: '€2.80' },
    { name: 'Cappuccino', desc: 'Espresso with creamy milk foam', price: '€3.20' },
    { name: 'Latte Macchiato', desc: 'Gentle & creamy', price: '€3.50' },
    { name: 'Café au Lait', desc: 'Coffee with hot milk', price: '€3.00' },
    { name: 'Americano', desc: 'Espresso with hot water', price: '€2.80' },
    { name: 'Flat White', desc: 'Double espresso with milk', price: '€3.50' },
    { name: 'Hot Chocolate', desc: 'Creamy & warm', price: '€3.20' },
    { name: 'Tea (selection)', desc: 'Black, Green, Herbal, Fruit', price: '€2.80' },
  ]},
  { title: 'Cold Beverages', icon: '🧊', items: [
    { name: 'Iced Coffee', desc: 'Cold-brewed coffee on ice', price: '€3.80' },
    { name: 'Iced Latte', desc: 'Espresso with ice cubes & milk', price: '€4.20' },
    { name: 'Frappuccino', desc: 'Creamy, cold & refreshing', price: '€4.50' },
    { name: 'Smoothie of the Day', desc: 'Freshly prepared', price: '€4.80' },
    { name: 'Fresh Orange Juice', desc: 'Freshly squeezed', price: '€3.50' },
    { name: 'Lemonade (homemade)', desc: 'Lemon, mint, ginger', price: '€3.80' },
    { name: 'Mineral Water', desc: 'Still or sparkling', price: '€2.20' },
    { name: 'Cola / Fanta / Sprite', desc: '0.33 l', price: '€2.50' },
    { name: 'Red Bull', desc: 'Energy drink', price: '€3.50' },
  ]},
  { title: 'Beer & Wine', icon: '🍷', items: [
    { name: 'Draft Beer', desc: '0.3 l / 0.5 l', price: '€3.20 / €4.50' },
    { name: 'Bottled Beer', desc: 'Various types', price: '€3.00' },
    { name: 'White Wine (glass)', desc: 'Dry or semi-dry', price: '€4.50' },
    { name: 'Red Wine (glass)', desc: 'Full-bodied & aromatic', price: '€4.50' },
    { name: 'Rosé (glass)', desc: 'Fresh & fruity', price: '€4.50' },
    { name: 'Prosecco (glass)', desc: 'Sparkling & light', price: '€4.80' },
    { name: 'Wine Bottle', desc: '0.75 l — selection on request', price: 'from €18.00' },
    { name: 'Non-alcoholic Beer', desc: '0.33 l', price: '€2.80' },
  ]},
  { title: 'Cocktails & Aperitifs', icon: '🍸', items: [
    { name: 'Aperol Spritz', desc: 'Aperol, Prosecco, Soda — our bestseller!', price: '€5.00' },
    { name: 'Hugo', desc: 'Elderflower, Prosecco, mint, lime', price: '€6.50' },
    { name: 'Mojito', desc: 'Rum, mint, lime, cane sugar', price: '€7.50' },
    { name: 'Gin Tonic', desc: 'Premium gin, tonic water, cucumber', price: '€7.50' },
    { name: 'Campari Orange', desc: 'Campari & fresh orange juice', price: '€6.00' },
    { name: 'Piña Colada', desc: 'Rum, coconut, pineapple', price: '€7.50' },
    { name: 'Sex on the Beach', desc: 'Vodka, peach, orange juice', price: '€7.50' },
    { name: 'Caipirinha', desc: 'Cachaça, lime, cane sugar', price: '€7.50' },
    { name: 'Cosmopolitan', desc: 'Vodka, Triple Sec, cranberry', price: '€7.50' },
  ]},
  { title: 'Shots & Spirits', icon: '🥃', items: [
    { name: 'Vodka Shot', desc: '4 cl', price: '€2.50' },
    { name: 'Tequila Shot', desc: '4 cl — with salt & lime', price: '€2.80' },
    { name: 'Jägermeister', desc: '4 cl', price: '€2.50' },
    { name: 'Sambuca', desc: '4 cl', price: '€2.50' },
    { name: 'Whisky', desc: "4 cl — Jack Daniel's, Jameson", price: '€4.50' },
    { name: 'Rum', desc: '4 cl — Havana, Bacardi', price: '€4.00' },
    { name: 'Gin', desc: '4 cl — Hendricks, Bombay', price: '€4.50' },
    { name: 'Baileys', desc: '4 cl — creamy & sweet', price: '€3.50' },
    { name: 'Amaretto Disaronno', desc: '4 cl', price: '€3.50' },
  ]},
  { title: 'Food & Snacks', icon: '🍽️', items: [
    { name: 'Toast with Butter', desc: 'Crispy toasted', price: '€2.50' },
    { name: 'Croissant', desc: 'Buttery & fresh', price: '€2.80' },
    { name: 'Cheese & Ham Toast', desc: 'Gratinated & warm', price: '€5.50' },
    { name: 'Club Sandwich', desc: 'Chicken, bacon, lettuce, tomato', price: '€7.50' },
    { name: 'Nachos with Dips', desc: 'Guacamole, salsa, cheese', price: '€6.50' },
    { name: 'Portion of Fries', desc: 'With ketchup & mayo', price: '€4.50' },
    { name: 'Cheese Board', desc: 'Selection of regional cheeses', price: '€8.50' },
    { name: 'Cake of the Day', desc: 'Homemade — fresh', price: '€3.50' },
    { name: 'Waffle', desc: 'With cream & fruit', price: '€4.50' },
  ]},
];

/* ─── BOOK COVER ────────────────────────────────────────────────── */
function BookCover({ lang }: { lang: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{ background: 'linear-gradient(160deg, #1c0000 0%, #0d0000 40%, #1c0000 100%)' }}>
      {/* Outer border frame */}
      <div className="absolute inset-[10px] pointer-events-none"
        style={{ border: '1px solid rgba(180,0,0,0.35)' }} />
      <div className="absolute inset-[14px] pointer-events-none"
        style={{ border: '1px solid rgba(180,0,0,0.12)' }} />
      {/* Top ornament */}
      <div className="absolute top-[22px] left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.55)' }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(180,0,0,0.75)' }} />
        <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.55)' }} />
      </div>
      {/* Content */}
      <div className="text-center px-8 z-10">
        <p className="text-[10px] tracking-[0.45em] uppercase mb-5"
          style={{ color: 'rgba(180,0,0,0.65)', fontFamily: "'Source Sans 3', sans-serif" }}>
          ✦ Solingen ✦
        </p>
        <h1 className="text-4xl sm:text-5xl font-light text-white/85 mb-0.5 leading-none"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.04em' }}>
          Cafe&amp;Bar
        </h1>
        <h2 className="text-6xl sm:text-7xl font-bold leading-none mb-7"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: '0.22em',
            background: 'linear-gradient(180deg, #e05050 0%, #b00000 45%, #6a0000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
          LUXOR
        </h2>
        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <div className="h-px w-14" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,0,0,0.75))' }} />
          <div className="w-2 h-2 rotate-45" style={{ background: 'rgba(180,0,0,0.75)' }} />
          <div className="h-px w-14" style={{ background: 'linear-gradient(270deg, transparent, rgba(180,0,0,0.75))' }} />
        </div>
        <p className="text-lg font-light tracking-[0.35em] uppercase mb-8"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'rgba(255,255,255,0.55)' }}>
          {lang === 'de' ? 'Speisekarte' : 'Menu'}
        </p>
        <p className="text-[10px] tracking-widest"
          style={{ color: 'rgba(180,0,0,0.45)', fontFamily: "'Source Sans 3', sans-serif" }}>
          Ohligser Markt 5 · Solingen
        </p>
      </div>
      {/* Bottom ornament */}
      <div className="absolute bottom-[22px] left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.55)' }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(180,0,0,0.75)' }} />
        <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.55)' }} />
      </div>
    </div>
  );
}

/* ─── BACK COVER ────────────────────────────────────────────────── */
function BookBackCover({ lang }: { lang: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{ background: 'linear-gradient(160deg, #0d0000 0%, #1c0000 50%, #0d0000 100%)' }}>
      <div className="absolute inset-[10px] pointer-events-none"
        style={{ border: '1px solid rgba(180,0,0,0.25)' }} />
      <div className="text-center px-8 z-10">
        <div className="flex items-center justify-center gap-2 mb-7">
          <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.55)' }} />
          <span style={{ color: 'rgba(180,0,0,0.75)', fontSize: '1.1rem' }}>✦</span>
          <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.55)' }} />
        </div>
        <h2 className="text-3xl font-semibold text-white/85 mb-3"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {lang === 'de' ? 'Danke für Ihren Besuch' : 'Thank You for Your Visit'}
        </h2>
        <p className="text-sm mb-8"
          style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Source Sans 3', sans-serif" }}>
          {lang === 'de' ? 'Wir freuen uns, Sie wieder zu sehen' : 'We look forward to seeing you again'}
        </p>
        <div className="space-y-2.5">
          <p className="text-sm" style={{ color: 'rgba(180,0,0,0.65)', fontFamily: "'Source Sans 3', sans-serif" }}>
            Ohligser Markt 5 · 42696 Solingen
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Source Sans 3', sans-serif" }}>
            {lang === 'de' ? 'Mo–Sa: 09:00–21:00 · So: 10:00–20:00' : 'Mon–Sat: 09:00–21:00 · Sun: 10:00–20:00'}
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Sans 3', sans-serif" }}>
            stoyansarakostov73@gmail.com
          </p>
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.4)' }} />
          <span className="text-2xl font-bold tracking-widest"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              background: 'linear-gradient(180deg, #dc5050, #b00000)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
            LUXOR
          </span>
          <div className="h-px w-10" style={{ background: 'rgba(180,0,0,0.4)' }} />
        </div>
      </div>
    </div>
  );
}

/* ─── CONTENT PAGE ──────────────────────────────────────────────── */
function ContentPage({ page, pageNum, total }: { page: PageData; pageNum: number; total: number }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-none"
      style={{ background: 'linear-gradient(160deg, #140000 0%, #0a0000 100%)' }}>
      {/* Header */}
      <div className="flex-shrink-0 px-5 pt-5 pb-3"
        style={{ borderBottom: '1px solid rgba(180,0,0,0.18)' }}>
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-xl leading-none">{page.icon}</span>
          <h3 className="text-base sm:text-lg font-semibold text-white/90 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {page.title}
          </h3>
        </div>
        <div className="h-px mt-1" style={{ background: 'linear-gradient(90deg, rgba(180,0,0,0.55), transparent)' }} />
      </div>
      {/* Items */}
      <div className="flex-1 overflow-y-auto px-5 py-2 space-y-0">
        {page.items.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-2 py-2"
            style={{ borderBottom: i < page.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-white/88 leading-snug"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {item.name}
              </p>
              <p className="text-[10px] sm:text-xs mt-0.5 leading-snug"
                style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Source Sans 3', sans-serif" }}>
                {item.desc}
              </p>
            </div>
            <span className="flex-shrink-0 text-xs sm:text-sm font-semibold whitespace-nowrap"
              style={{ color: 'rgba(220,70,70,0.9)', fontFamily: "'Source Sans 3', sans-serif" }}>
              {item.price}
            </span>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="flex-shrink-0 px-5 py-2 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(180,0,0,0.1)' }}>
        <span className="text-[10px]" style={{ color: 'rgba(180,0,0,0.4)', fontFamily: "'Source Sans 3', sans-serif" }}>
          Cafe&Bar Luxor
        </span>
        <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.18)', fontFamily: "'Source Sans 3', sans-serif" }}>
          {pageNum} / {total}
        </span>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────── */
export default function Menu() {
  const { lang } = useLanguage();
  const pages = lang === 'de' ? PAGES_DE : PAGES_EN;
  const totalPages = pages.length + 2; // cover + content pages + back cover

  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState<'fwd' | 'bwd' | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const flipTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const FLIP_DURATION = 600; // ms

  const navigate = useCallback((target: number) => {
    if (flipping !== null) return;
    if (target < 0 || target >= totalPages) return;
    const dir = target > currentPage ? 'fwd' : 'bwd';
    setFlipping(dir);
    if (flipTimeout.current) clearTimeout(flipTimeout.current);
    flipTimeout.current = setTimeout(() => {
      setCurrentPage(target);
      setFlipping(null);
    }, FLIP_DURATION);
  }, [flipping, currentPage, totalPages]);

  const goNext = useCallback(() => navigate(currentPage + 1), [navigate, currentPage]);
  const goPrev = useCallback(() => navigate(currentPage - 1), [navigate, currentPage]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  useEffect(() => () => { if (flipTimeout.current) clearTimeout(flipTimeout.current); }, []);

  const renderPage = (idx: number) => {
    if (idx === 0) return <BookCover lang={lang} />;
    if (idx === totalPages - 1) return <BookBackCover lang={lang} />;
    const p = pages[idx - 1];
    if (!p) return null;
    return <ContentPage page={p} pageNum={idx} total={pages.length} />;
  };

  // Next page index for the flip animation
  const nextIdx = flipping === 'fwd'
    ? Math.min(currentPage + 1, totalPages - 1)
    : Math.max(currentPage - 1, 0);

  return (
    <div className="min-h-screen pt-16 md:pt-20 flex flex-col items-center" style={{ background: '#080000' }}>
      {/* Inline keyframes */}
      <style>{`
        @keyframes luxorFlipFwd {
          0%   { transform: rotateY(0deg); box-shadow: -4px 0 20px rgba(0,0,0,0.5); }
          40%  { transform: rotateY(-90deg); box-shadow: -20px 0 40px rgba(0,0,0,0.8); }
          100% { transform: rotateY(-180deg); box-shadow: -4px 0 20px rgba(0,0,0,0.5); }
        }
        @keyframes luxorFlipBwd {
          0%   { transform: rotateY(0deg); box-shadow: 4px 0 20px rgba(0,0,0,0.5); }
          40%  { transform: rotateY(90deg); box-shadow: 20px 0 40px rgba(0,0,0,0.8); }
          100% { transform: rotateY(180deg); box-shadow: 4px 0 20px rgba(0,0,0,0.5); }
        }
        @keyframes luxorShadowPulse {
          0%   { opacity: 0; }
          40%  { opacity: 1; }
          100% { opacity: 0; }
        }
        .book-page-flip {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          z-index: 30;
          pointer-events: none;
        }
        .book-page-flip.fwd {
          transform-origin: right center;
          animation: luxorFlipFwd ${FLIP_DURATION}ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        .book-page-flip.bwd {
          transform-origin: left center;
          animation: luxorFlipBwd ${FLIP_DURATION}ms cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
        .book-page-flip .page-front {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          overflow: hidden;
        }
        .book-page-flip .page-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          transform: rotateY(180deg);
          overflow: hidden;
        }
        .flip-center-shadow {
          position: absolute;
          top: 0; bottom: 0;
          width: 40px;
          pointer-events: none;
          z-index: 40;
          animation: luxorShadowPulse ${FLIP_DURATION}ms ease-in-out forwards;
        }
        .flip-center-shadow.fwd { right: 0; background: linear-gradient(to right, rgba(0,0,0,0.7), transparent); }
        .flip-center-shadow.bwd { left: 0; background: linear-gradient(to left, rgba(0,0,0,0.7), transparent); }
      `}</style>

      {/* Page title */}
      <div className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(180,0,0,0.65))' }} />
          <span className="text-[10px] tracking-[0.35em] uppercase"
            style={{ color: 'rgba(180,0,0,0.65)', fontFamily: "'Source Sans 3', sans-serif" }}>
            Cafe&Bar Luxor
          </span>
          <div className="h-px w-12" style={{ background: 'linear-gradient(270deg, transparent, rgba(180,0,0,0.65))' }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white/90"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
          {lang === 'de' ? 'Unsere Speisekarte' : 'Our Menu'}
        </h1>
        <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.28)', fontFamily: "'Source Sans 3', sans-serif" }}>
          {lang === 'de' ? 'Klicken, tippen oder Pfeiltasten zum Blättern' : 'Click, swipe or use arrow keys to browse'}
        </p>
      </div>

      {/* Book container */}
      <div
        className="w-full flex flex-col items-center px-4 pb-12"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 45) { diff > 0 ? goNext() : goPrev(); }
          setTouchStart(null);
        }}
      >
        {/* 3D perspective wrapper */}
        <div style={{ perspective: '1600px', perspectiveOrigin: '50% 38%' }}>
          {/* The book itself */}
          <div
            style={{
              width: 'min(340px, 86vw)',
              height: 'min(490px, 70vh)',
              position: 'relative',
              transformStyle: 'preserve-3d',
              // Slight resting tilt for depth illusion
              transform: flipping
                ? (flipping === 'fwd' ? 'rotateY(-5deg) rotateX(2deg)' : 'rotateY(5deg) rotateX(2deg)')
                : 'rotateY(-3deg) rotateX(1.5deg)',
              transition: `transform ${FLIP_DURATION}ms cubic-bezier(0.45,0,0.55,1)`,
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(180,0,0,0.1))',
            }}
          >
            {/* ── Book spine (left edge) ── */}
            <div
              style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: '14px',
                background: 'linear-gradient(90deg, #3a0000, #8b0000, #5a0000)',
                transform: 'rotateY(-90deg) translateZ(0px)',
                transformOrigin: 'left center',
                zIndex: 10,
              }}
            />
            {/* ── Book top edge ── */}
            <div
              style={{
                position: 'absolute',
                left: 0, right: 0, top: 0,
                height: '6px',
                background: 'linear-gradient(180deg, #4a0000, #1a0000)',
                transform: 'rotateX(90deg) translateZ(0px)',
                transformOrigin: 'top center',
                zIndex: 10,
              }}
            />

            {/* ── Static background page (always visible) ── */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                borderRadius: '1px 3px 3px 1px',
                border: '1px solid rgba(180,0,0,0.1)',
                zIndex: 1,
              }}
            >
              {renderPage(flipping === 'fwd' ? nextIdx : currentPage)}
            </div>

            {/* ── Flipping page layer ── */}
            {flipping && (
              <>
                <div className={`book-page-flip ${flipping}`}>
                  <div className="page-front"
                    style={{ background: 'linear-gradient(160deg, #140000 0%, #0a0000 100%)' }}>
                    {renderPage(currentPage)}
                  </div>
                  <div className="page-back"
                    style={{ background: 'linear-gradient(160deg, #0a0000 0%, #140000 100%)' }}>
                    {renderPage(nextIdx)}
                  </div>
                </div>
                {/* Center crease shadow */}
                <div className={`flip-center-shadow ${flipping}`} />
              </>
            )}

            {/* ── Right-edge page curl hint ── */}
            {!flipping && currentPage < totalPages - 1 && (
              <div
                style={{
                  position: 'absolute',
                  right: 0, bottom: 0,
                  width: '28px', height: '28px',
                  background: 'linear-gradient(135deg, transparent 50%, rgba(180,0,0,0.15) 50%)',
                  zIndex: 20,
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={goPrev}
            disabled={currentPage === 0 || flipping !== null}
            className="flex items-center gap-2 px-5 py-2.5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
            style={{
              background: 'rgba(180,0,0,0.08)',
              border: '1px solid rgba(180,0,0,0.22)',
              color: 'rgba(220,80,80,0.8)',
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.05em',
            }}
          >
            <ChevronLeft size={14} />
            {lang === 'de' ? 'Zurück' : 'Back'}
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                disabled={flipping !== null}
                style={{
                  width: i === currentPage ? '18px' : '5px',
                  height: '5px',
                  borderRadius: '3px',
                  background: i === currentPage ? 'rgba(180,0,0,0.85)' : 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1 || flipping !== null}
            className="flex items-center gap-2 px-5 py-2.5 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed active:scale-95"
            style={{
              background: currentPage < totalPages - 1 ? 'rgba(180,0,0,0.75)' : 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(180,0,0,0.3)',
              color: 'white',
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.05em',
            }}
          >
            {lang === 'de' ? 'Weiter' : 'Next'}
            <ChevronRight size={14} />
          </button>
        </div>

        <p className="mt-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'Source Sans 3', sans-serif" }}>
          {lang === 'de' ? 'Seite' : 'Page'} {currentPage + 1} / {totalPages}
        </p>
        <p className="mt-1 text-[10px] text-center" style={{ color: 'rgba(180,0,0,0.3)', fontFamily: "'Source Sans 3', sans-serif" }}>
          {lang === 'de' ? 'Pfeiltasten oder Wischen auf Mobile' : 'Arrow keys or swipe on mobile'}
        </p>
      </div>
    </div>
  );
}
