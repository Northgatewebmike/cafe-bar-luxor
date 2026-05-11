/**
 * Menu Page — Cafe&Bar Luxor
 * Design: Real 3D dual-page flip book — two pages side by side
 * Click/swipe on RIGHT page to go forward, LEFT page to go back
 * No Weiter/Zurück buttons — only page-edge interaction
 * Each spread has a background image matching the category
 */
import { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BG = {
  cover:     '/manus-storage/real-photo-1_8c74bd6b.jpg',
  coffee:    '/manus-storage/menu-bg-coffee_290225e3.jpg',
  beer:      '/manus-storage/menu-bg-beer_c74b0f17.jpg',
  cocktail:  '/manus-storage/menu-bg-cocktail_83d612d1.jpg',
  wine:      '/manus-storage/menu-bg-wine_9cb9f14f.jpg',
  icecream:  '/manus-storage/menu-bg-icecream_87b1cb54.jpg',
  spirits:   '/manus-storage/menu-bg-spirits_03425546.jpg',
  colddrinks:'/manus-storage/menu-bg-colddrinks_1df093ab.jpg',
  aperitif:  '/manus-storage/menu-bg-aperitif_d1d664a5.jpg',
};

interface MenuItem { name: string; nameEn?: string; size?: string; price: string; }
interface Recipe { titleDe: string; titleEn: string; ingredients: string[]; methodDe: string; methodEn: string; }
interface MenuSection {
  titleDe: string; titleEn: string; icon: string; bg: string;
  items: MenuItem[];
  noteDe?: string; noteEn?: string;
  recipe?: Recipe;
}

const SECTIONS: MenuSection[] = [
  {
    titleDe: 'Kaffee', titleEn: 'Coffee', icon: '☕', bg: BG.coffee,
    items: [
      { name: 'Milchkaffee', price: '€ 3,00' },
      { name: 'Kaffee Crema', price: '€ 2,50' },
      { name: 'Espresso', price: '€ 2,00' },
      { name: 'Espresso Macchiato', price: '€ 2,50' },
      { name: 'Doppelter Espresso', nameEn: 'Double Espresso', price: '€ 2,70' },
      { name: 'Cappuccino', price: '€ 3,00' },
      { name: 'Cappuccino klein', nameEn: 'Small Cappuccino', price: '€ 2,50' },
      { name: 'Eiskaffee', nameEn: 'Iced Coffee', price: '€ 4,00' },
      { name: 'Latte Macchiato', price: '€ 3,00' },
      { name: 'Frappé weiß', nameEn: 'White Frappé', price: '€ 3,50' },
      { name: 'Frappé schwarz', nameEn: 'Black Frappé', price: '€ 3,00' },
      { name: 'Kakao', nameEn: 'Hot Chocolate', price: '€ 3,00' },
      { name: 'Kakao mit Sahne', nameEn: 'Hot Chocolate with Cream', price: '€ 3,30' },
    ],
  },
  {
    titleDe: 'Tee', titleEn: 'Tea', icon: '🍵', bg: BG.coffee,
    noteDe: '€ 1,80 je Tasse', noteEn: '€ 1.80 per cup',
    items: [
      { name: 'Grüner Tee', nameEn: 'Green Tea', price: '€ 1,80' },
      { name: 'Schwarzer Tee', nameEn: 'Black Tea', price: '€ 1,80' },
      { name: 'Pfefferminztee', nameEn: 'Peppermint Tea', price: '€ 1,80' },
      { name: 'Früchtetee', nameEn: 'Fruit Tea', price: '€ 1,80' },
      { name: 'Kamillentee', nameEn: 'Chamomile Tea', price: '€ 1,80' },
    ],
  },
  {
    titleDe: 'Zapfbier', titleEn: 'Draft Beer', icon: '🍺', bg: BG.beer,
    items: [
      { name: 'Veltins', size: '0,2 l', price: '€ 2,00' },
      { name: 'Veltins', size: '0,3 l', price: '€ 2,70' },
      { name: 'Veltins', size: '0,5 l', price: '€ 4,50' },
      { name: 'Früh Kölsch', size: '0,2 l', price: '€ 2,00' },
      { name: 'Früh Kölsch', size: '0,3 l', price: '€ 2,70' },
      { name: 'Früh Kölsch', size: '0,4 l', price: '€ 3,60' },
    ],
  },
  {
    titleDe: 'Flaschenbier', titleEn: 'Bottled Beer', icon: '🍾', bg: BG.beer,
    noteDe: '0,33 l — € 3,00 je Flasche\nKrombacher · Krombacher Radler · Krombacher Alkoholfrei · Heineken · Frankenheim · Früh Kölsch',
    noteEn: '0.33 l — € 3.00 per bottle\nKrombacher · Krombacher Radler · Krombacher Non-Alcoholic · Heineken · Frankenheim · Früh Kölsch',
    items: [
      { name: 'Maisels Weizen Original', size: '0,5 l', price: '€ 4,00' },
      { name: 'Maisels Weizen Alkoholfrei', nameEn: 'Maisels Wheat Non-Alcoholic', size: '0,5 l', price: '€ 4,00' },
    ],
  },
  {
    titleDe: 'Kaltgetränke', titleEn: 'Cold Drinks', icon: '🥤', bg: BG.colddrinks,
    items: [
      { name: 'Coca Cola', size: '0,33 l', price: '€ 3,00' },
      { name: 'Coca Cola Zero', size: '0,33 l', price: '€ 3,00' },
      { name: 'Fanta', size: '0,33 l', price: '€ 3,00' },
      { name: 'Sprite', size: '0,33 l', price: '€ 3,00' },
      { name: 'Spezi', size: '0,33 l', price: '€ 3,00' },
      { name: 'Lemon Soda', size: '0,33 l', price: '€ 3,00' },
      { name: 'Orange Soda', size: '0,33 l', price: '€ 3,00' },
      { name: 'Mojito Soda', size: '0,33 l', price: '€ 3,00' },
      { name: 'Apfelschorle', nameEn: 'Apple Spritzer', size: '0,33 l', price: '€ 3,00' },
      { name: 'Do Tuk', size: '0,33 l', price: '€ 3,00' },
      { name: 'Eistee Pfirsich/Zitrone', nameEn: 'Iced Tea Peach/Lemon', size: '0,5 l', price: '€ 3,00' },
      { name: 'Schweppes Bitter Lemon', size: '0,25 l', price: '€ 2,50' },
      { name: 'Red Bull', size: '0,33 l', price: '€ 3,50' },
      { name: 'Orangensaft', nameEn: 'Orange Juice', size: '0,25 l', price: '€ 2,50' },
      { name: 'Apfelsaft', nameEn: 'Apple Juice', size: '0,25 l', price: '€ 2,50' },
      { name: 'Multivitaminsaft', nameEn: 'Multivitamin Juice', size: '0,25 l', price: '€ 2,50' },
      { name: 'Wasser still', nameEn: 'Still Water', size: '0,2 l', price: '€ 2,00' },
      { name: 'Wasser sprudel', nameEn: 'Sparkling Water', size: '0,2 l', price: '€ 2,00' },
    ],
  },
  {
    titleDe: 'Hausgemachte Limonade', titleEn: 'Homemade Lemonade', icon: '🍋', bg: BG.colddrinks,
    noteDe: '0,5 l — € 4,20\nMango · Himbeere · Erdbeere · Minze · Granatapfel',
    noteEn: '0.5 l — € 4.20\nMango · Raspberry · Strawberry · Mint · Pomegranate',
    items: [],
  },
  {
    titleDe: 'Aperitif', titleEn: 'Aperitifs', icon: '🍊', bg: BG.aperitif,
    items: [
      { name: 'Campari', size: '5 cl', price: '€ 4,50' },
      { name: 'Campari Orange', size: '0,2 l', price: '€ 5,00' },
      { name: 'Campari Soda', size: '0,2 l', price: '€ 5,00' },
      { name: 'Hugo', size: '0,2 l', price: '€ 4,00' },
      { name: 'Campari Spritz', size: '0,2 l', price: '€ 6,00' },
    ],
  },
  {
    titleDe: 'Wein & Sekt', titleEn: 'Wine & Sparkling', icon: '🍷', bg: BG.wine,
    items: [
      { name: 'Rotwein', nameEn: 'Red Wine', size: '0,2 l', price: '€ 5,00' },
      { name: 'Weißwein', nameEn: 'White Wine', size: '0,2 l', price: '€ 5,00' },
      { name: 'Prosecco', size: '0,2 l', price: '€ 5,00' },
      { name: 'Sekt', nameEn: 'Sparkling Wine', size: '0,2 l', price: '€ 5,00' },
      { name: 'Flasche Wein', nameEn: 'Bottle of Wine', size: '0,75 l', price: '€ 23,00' },
      { name: 'Glühwein (Winter)', nameEn: 'Mulled Wine (Winter)', size: '0,2 l', price: '€ 4,00' },
    ],
  },
  {
    titleDe: 'Spirituosen', titleEn: 'Spirits', icon: '🥃', bg: BG.spirits,
    noteDe: '4 cl je Sorte', noteEn: '4 cl per variety',
    items: [
      { name: 'Wodka', nameEn: 'Vodka', price: '€ 3,50' },
      { name: 'Rum', price: '€ 3,50' },
      { name: 'Gin', price: '€ 4,00' },
      { name: 'Tequila', price: '€ 4,00' },
      { name: 'Jägermeister', price: '€ 3,50' },
      { name: 'Sambuca', price: '€ 3,50' },
      { name: 'Baileys', price: '€ 3,50' },
      { name: 'Amaretto', price: '€ 3,50' },
      { name: 'Ouzo', price: '€ 3,50' },
      { name: 'Raki', price: '€ 3,50' },
      { name: "Jack Daniel's", price: '€ 4,50' },
      { name: "Ballantine's", price: '€ 4,50' },
      { name: 'Jim Beam', price: '€ 4,50' },
    ],
  },
  {
    titleDe: 'Long Drinks', titleEn: 'Long Drinks', icon: '🍹', bg: BG.cocktail,
    noteDe: '€ 5,00 je Drink\nVodka Lemon · Vodka Energy · Whiskey Cola · Jägermeister Energy · Jägermeister Cola · Rum Cola · Gin Tonic',
    noteEn: '€ 5.00 per drink\nVodka Lemon · Vodka Energy · Whiskey Cola · Jägermeister Energy · Jägermeister Cola · Rum Cola · Gin Tonic',
    items: [],
  },
  {
    titleDe: 'Eis & Desserts', titleEn: 'Ice Cream & Desserts', icon: '🍦', bg: BG.icecream,
    noteDe: 'Sorten: Vanille · Erdbeere · Schokolade', noteEn: 'Flavours: Vanilla · Strawberry · Chocolate',
    items: [
      { name: '1 Kugel', nameEn: '1 Scoop', price: '€ 1,00' },
      { name: '2 Kugeln', nameEn: '2 Scoops', price: '€ 1,50' },
      { name: '3 Kugeln', nameEn: '3 Scoops', price: '€ 2,00' },
      { name: 'Eisschokolade', nameEn: 'Chocolate Ice Drink', price: '€ 3,50' },
      { name: 'Milchshake (Erdbeere/Vanille/Schokolade)', nameEn: 'Milkshake (Strawberry/Vanilla/Chocolate)', price: '€ 4,50' },
    ],
  },
  {
    titleDe: 'Cocktails', titleEn: 'Cocktails', icon: '🍸', bg: BG.cocktail,
    items: [
      { name: 'Aperol Spritz', price: '€ 6,00' },
      { name: 'Sex on the Beach', price: '€ 8,00' },
      { name: 'Caipirinha', price: '€ 7,00' },
      { name: 'Mojito', price: '€ 8,00' },
      { name: 'Piña Colada', price: '€ 8,00' },
      { name: 'Blue Lagoon', price: '€ 8,00' },
      { name: 'Neon Rush', price: '€ 8,00' },
      { name: 'Cuba Libre', price: '€ 8,00' },
    ],
    recipe: {
      titleDe: 'Rezept: Mojito', titleEn: 'Recipe: Mojito',
      ingredients: ['5 cl weißer Rum', '3 cl Limettensaft', '2 TL Zucker', '8 Minzblätter', 'Sodawasser', 'Crushed Ice'],
      methodDe: 'Minze und Zucker im Glas zerstoßen. Rum und Limettensaft hinzufügen. Mit Crushed Ice auffüllen, mit Sodawasser toppen.',
      methodEn: 'Muddle mint and sugar in glass. Add rum and lime juice. Fill with crushed ice, top with soda water.',
    },
  },
  {
    titleDe: 'Alkoholfreie Cocktails', titleEn: 'Non-Alcoholic Cocktails', icon: '🥂', bg: BG.cocktail,
    items: [
      { name: 'Piña Colada Alkoholfrei', nameEn: 'Virgin Piña Colada', price: '€ 7,00' },
      { name: 'Roter Pepp', nameEn: 'Red Pepp', price: '€ 7,00' },
      { name: 'Sunrise', price: '€ 7,00' },
    ],
    recipe: {
      titleDe: 'Rezept: Virgin Piña Colada', titleEn: 'Recipe: Virgin Piña Colada',
      ingredients: ['8 cl Ananassaft', '4 cl Kokosmilch', '2 cl Limettensaft', 'Crushed Ice', 'Ananasscheibe'],
      methodDe: 'Alle Zutaten mit Crushed Ice cremig mixen. In gekühltes Glas gießen, mit Ananasscheibe garnieren.',
      methodEn: 'Blend all ingredients with crushed ice until creamy. Pour into chilled glass, garnish with pineapple.',
    },
  },
];

// Build spreads: cover + pairs of sections + back cover
interface Spread {
  type: 'cover' | 'content' | 'back';
  left?: MenuSection;
  right?: MenuSection;
  bg: string;
}

function buildSpreads(): Spread[] {
  const spreads: Spread[] = [{ type: 'cover', bg: BG.cover }];
  for (let i = 0; i < SECTIONS.length; i += 2) {
    spreads.push({ type: 'content', left: SECTIONS[i], right: SECTIONS[i + 1], bg: SECTIONS[i].bg });
  }
  spreads.push({ type: 'back', bg: BG.cover });
  return spreads;
}

const SPREADS = buildSpreads();

function PageContent({ section, lang }: { section: MenuSection; lang: string }) {
  const title = lang === 'de' ? section.titleDe : section.titleEn;
  const note = lang === 'de' ? section.noteDe : section.noteEn;
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: 'rgba(6,0,0,0.95)', padding: '14px 12px', position: 'relative' }}>
      <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${section.bg})`, opacity: 0.08 }} />
      <div className="relative z-10 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 mb-1">
          <span style={{ fontSize: '16px', lineHeight: 1 }}>{section.icon}</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(180,0,0,0.6), transparent)' }} />
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(12px, 2.2vw, 17px)', fontWeight: 700, color: '#fff', lineHeight: 1.2, letterSpacing: '0.02em' }}>
          {title}
        </h2>
      </div>
      {note && (
        <div className="relative z-10 mb-2 flex-shrink-0 p-1.5" style={{ background: 'rgba(180,0,0,0.07)', border: '1px solid rgba(180,0,0,0.2)', borderRadius: '2px' }}>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 'clamp(7px, 1.3vw, 10px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{note}</p>
        </div>
      )}
      {section.items.length > 0 && (
        <div className="relative z-10 flex-1 overflow-hidden">
          {section.items.map((item, i) => (
            <div key={i} className="flex items-baseline justify-between gap-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '1.5px', paddingTop: '1.5px' }}>
              <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 'clamp(7.5px, 1.3vw, 10.5px)', color: 'rgba(255,255,255,0.75)', flex: 1, minWidth: 0 }}>
                {lang === 'de' ? item.name : (item.nameEn || item.name)}
                {item.size && <span style={{ color: 'rgba(255,255,255,0.3)', marginLeft: '3px', fontSize: '0.85em' }}>{item.size}</span>}
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(8.5px, 1.4vw, 11.5px)', color: '#dc5050', fontWeight: 600, flexShrink: 0 }}>{item.price}</span>
            </div>
          ))}
        </div>
      )}
      {section.recipe && (
        <div className="relative z-10 mt-1.5 flex-shrink-0 p-1.5" style={{ background: 'rgba(180,0,0,0.06)', border: '1px solid rgba(180,0,0,0.22)', borderRadius: '2px' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(8px, 1.4vw, 11px)', color: '#dc5050', fontWeight: 700, marginBottom: '2px' }}>
            {lang === 'de' ? section.recipe.titleDe : section.recipe.titleEn}
          </p>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 'clamp(6.5px, 1.1vw, 9px)', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, marginBottom: '2px' }}>
            {section.recipe.ingredients.join(' · ')}
          </p>
          <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 'clamp(6.5px, 1.1vw, 9px)', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
            {lang === 'de' ? section.recipe.methodDe : section.recipe.methodEn}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Menu() {
  const { lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState<'fwd' | 'bwd' | null>(null);
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);
  const total = SPREADS.length;

  const go = useCallback((dir: 'fwd' | 'bwd') => {
    if (flipping) return;
    if (dir === 'fwd' && current >= total - 1) return;
    if (dir === 'bwd' && current <= 0) return;
    setFlipping(dir);
    setTimeout(() => {
      setCurrent(p => dir === 'fwd' ? p + 1 : p - 1);
      setFlipping(null);
    }, 550);
  }, [flipping, current, total]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go('fwd');
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go('bwd');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [go]);

  const spread = SPREADS[current];

  return (
    <div className="page-enter min-h-screen flex flex-col items-center" style={{ background: '#040000', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="text-center mb-5 px-4">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="h-px w-8" style={{ background: 'rgba(180,0,0,0.5)' }} />
          <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(180,0,0,0.7)', textTransform: 'uppercase' }}>Cafe&Bar Luxor</span>
          <div className="h-px w-8" style={{ background: 'rgba(180,0,0,0.5)' }} />
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(26px, 5.5vw, 44px)', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
          {lang === 'de' ? 'Speisekarte' : 'Menu'}
        </h1>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '3px' }}>
          {lang === 'de' ? 'Tippen oder wischen zum Blättern' : 'Tap or swipe to turn pages'}
        </p>
      </div>

      <div
        className="relative w-full flex justify-center items-center px-2"
        style={{ perspective: '1400px', maxWidth: '860px' }}
        onTouchStart={e => { touchX.current = e.touches[0].clientX; touchY.current = e.touches[0].clientY; }}
        onTouchEnd={e => {
          if (touchX.current === null || touchY.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          const dy = e.changedTouches[0].clientY - touchY.current;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 35) {
            if (dx < 0) go('fwd'); else go('bwd');
          }
          touchX.current = null; touchY.current = null;
        }}
      >
        {/* Book shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '75%', height: '18px', background: 'radial-gradient(ellipse, rgba(180,0,0,0.25) 0%, transparent 70%)', filter: 'blur(8px)', zIndex: 0 }} />

        {/* Book */}
        <div
          className={flipping === 'fwd' ? 'book-flip-fwd' : flipping === 'bwd' ? 'book-flip-bwd' : ''}
          style={{ width: '100%', maxWidth: '820px', aspectRatio: '2 / 1.35', transformStyle: 'preserve-3d', position: 'relative', zIndex: 1 }}
        >
          {/* Spine */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{ width: '5px', background: 'linear-gradient(to right, rgba(0,0,0,0.9), rgba(180,0,0,0.35), rgba(0,0,0,0.9))', zIndex: 10, boxShadow: '0 0 10px rgba(180,0,0,0.35)' }} />

          {spread.type === 'cover' && (
            <div className="absolute inset-0 flex" style={{ boxShadow: '0 18px 55px rgba(0,0,0,0.85), 0 0 0 1px rgba(180,0,0,0.18)', borderRadius: '2px 4px 4px 2px' }}>
              {/* Left half */}
              <div className="w-1/2 h-full relative overflow-hidden" style={{ background: '#060000', borderRadius: '2px 0 0 2px', cursor: current > 0 ? 'pointer' : 'default', borderRight: '1px solid rgba(180,0,0,0.08)' }} onClick={current > 0 ? () => go('bwd') : undefined}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG.cover})`, opacity: 0.18 }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)' }} />
                {current > 0 && (
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-70 transition-opacity" style={{ color: '#dc5050' }}>
                    <ChevronLeft size={18} />
                  </div>
                )}
              </div>
              {/* Right half — cover */}
              <div className="w-1/2 h-full relative overflow-hidden flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #0d0000 0%, #180000 50%, #0d0000 100%)', borderRadius: '0 4px 4px 0', cursor: 'pointer', border: '1px solid rgba(180,0,0,0.12)' }} onClick={() => go('fwd')}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG.cover})`, opacity: 0.08 }} />
                <div className="absolute inset-3 pointer-events-none" style={{ border: '1px solid rgba(180,0,0,0.28)' }} />
                <div className="absolute inset-5 pointer-events-none" style={{ border: '1px solid rgba(180,0,0,0.1)' }} />
                <div className="relative z-10 text-center px-5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-px w-5" style={{ background: 'rgba(180,0,0,0.55)' }} />
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(180,0,0,0.65)', textTransform: 'uppercase' }}>◆ SOLINGEN ◆</span>
                    <div className="h-px w-5" style={{ background: 'rgba(180,0,0,0.55)' }} />
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(11px, 2.2vw, 16px)', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em', marginBottom: '2px' }}>Cafe&Bar</p>
                  <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(26px, 5.5vw, 48px)', fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1, background: 'linear-gradient(180deg, #ff5555 0%, #b00000 55%, #700000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '6px' }}>LUXOR</h1>
                  <div className="flex items-center justify-center gap-2 my-2">
                    <div className="h-px w-6" style={{ background: 'rgba(180,0,0,0.45)' }} />
                    <span style={{ color: 'rgba(180,0,0,0.55)', fontSize: '9px' }}>◆</span>
                    <div className="h-px w-6" style={{ background: 'rgba(180,0,0,0.45)' }} />
                  </div>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 'clamp(7px, 1.3vw, 10px)', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: '12px' }}>{lang === 'de' ? 'SPEISEKARTE' : 'MENU'}</p>
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 'clamp(6px, 1.1vw, 9px)', color: 'rgba(180,0,0,0.45)', letterSpacing: '0.08em' }}>Ohligser Markt 5 · Solingen</p>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 opacity-35 hover:opacity-70 transition-opacity" style={{ color: '#dc5050' }}>
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '9px', letterSpacing: '0.05em' }}>{lang === 'de' ? 'Öffnen' : 'Open'}</span>
                  <ChevronRight size={12} />
                </div>
              </div>
            </div>
          )}

          {spread.type === 'back' && (
            <div className="absolute inset-0 flex" style={{ boxShadow: '0 18px 55px rgba(0,0,0,0.85), 0 0 0 1px rgba(180,0,0,0.15)', borderRadius: '2px 4px 4px 2px' }}>
              <div className="w-1/2 h-full relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0d0000 0%, #180000 50%, #0d0000 100%)', borderRadius: '2px 0 0 2px', cursor: 'pointer', border: '1px solid rgba(180,0,0,0.12)' }} onClick={() => go('bwd')}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG.cover})`, opacity: 0.08 }} />
                <div className="absolute inset-3 pointer-events-none" style={{ border: '1px solid rgba(180,0,0,0.18)' }} />
                <div className="relative z-10 text-center px-4">
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(14px, 2.5vw, 20px)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>Cafe&Bar</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(20px, 4vw, 34px)', fontWeight: 700, color: 'rgba(180,0,0,0.35)', letterSpacing: '0.12em' }}>LUXOR</p>
                  <div className="flex items-center justify-center gap-1 mt-2" style={{ color: 'rgba(180,0,0,0.35)' }}>
                    <ChevronLeft size={12} />
                    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '9px', letterSpacing: '0.08em', color: 'rgba(180,0,0,0.35)' }}>{lang === 'de' ? 'Zurückblättern' : 'Go back'}</span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 h-full relative overflow-hidden flex items-center justify-center" style={{ background: '#050000', borderRadius: '0 4px 4px 0' }}>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${BG.cover})`, opacity: 0.12 }} />
                <div className="relative z-10 text-center px-4">
                  <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(180,0,0,0.45)', textTransform: 'uppercase', marginBottom: '6px' }}>{lang === 'de' ? 'Besuchen Sie uns' : 'Visit us'}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(10px, 1.8vw, 14px)', color: 'rgba(255,255,255,0.35)', lineHeight: 1.9 }}>
                    Ohligser Markt 5<br />42696 Solingen<br />
                    <span style={{ color: 'rgba(180,0,0,0.38)', fontSize: '0.9em' }}>Mo–Sa 09:00–21:00</span><br />
                    <span style={{ color: 'rgba(180,0,0,0.38)', fontSize: '0.9em' }}>So 10:00–20:00</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {spread.type === 'content' && (
            <div className="absolute inset-0 flex" style={{ boxShadow: '0 18px 55px rgba(0,0,0,0.85), 0 0 0 1px rgba(180,0,0,0.12)', borderRadius: '2px 4px 4px 2px' }}>
              {/* LEFT PAGE */}
              <div className="w-1/2 h-full relative overflow-hidden" style={{ borderRadius: '2px 0 0 2px', cursor: current > 0 ? 'pointer' : 'default', borderRight: '1px solid rgba(180,0,0,0.08)' }} onClick={current > 0 ? () => go('bwd') : undefined}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.12) 0%, transparent 12%)', zIndex: 5 }} />
                {spread.left ? <PageContent section={spread.left} lang={lang} /> : <div className="w-full h-full" style={{ background: '#060000' }} />}
                {current > 0 && <div className="absolute left-1.5 top-1/2 -translate-y-1/2 opacity-15 hover:opacity-55 transition-opacity pointer-events-none" style={{ color: '#dc5050' }}><ChevronLeft size={16} /></div>}
              </div>
              {/* RIGHT PAGE */}
              <div className="w-1/2 h-full relative overflow-hidden" style={{ borderRadius: '0 4px 4px 0', cursor: current < total - 1 ? 'pointer' : 'default' }} onClick={current < total - 1 ? () => go('fwd') : undefined}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(0,0,0,0.12) 0%, transparent 12%)', zIndex: 5 }} />
                {spread.right ? <PageContent section={spread.right} lang={lang} /> : <div className="w-full h-full" style={{ background: '#060000' }} />}
                {current < total - 1 && <div className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-15 hover:opacity-55 transition-opacity pointer-events-none" style={{ color: '#dc5050' }}><ChevronRight size={16} /></div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5 mt-5">
        {SPREADS.map((_, i) => (
          <button key={i} onClick={() => { if (flipping) return; const dir = i > current ? 'fwd' : 'bwd'; setFlipping(dir); setTimeout(() => { setCurrent(i); setFlipping(null); }, 550); }} style={{ width: i === current ? '18px' : '5px', height: '5px', borderRadius: '3px', background: i === current ? '#b00000' : 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
        ))}
      </div>
      <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: '10px', color: 'rgba(255,255,255,0.2)', marginTop: '6px', letterSpacing: '0.08em' }}>{current + 1} / {total}</p>

      <style>{`
        @keyframes flipFwd { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(-14deg); } 100% { transform: rotateY(0deg); } }
        @keyframes flipBwd { 0% { transform: rotateY(0deg); } 50% { transform: rotateY(14deg); } 100% { transform: rotateY(0deg); } }
        .book-flip-fwd { animation: flipFwd 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
        .book-flip-bwd { animation: flipBwd 0.55s cubic-bezier(0.4,0,0.2,1) forwards; }
      `}</style>
    </div>
  );
}
