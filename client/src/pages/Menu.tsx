/**
 * Menu Page — Cafe&Bar Luxor
 * Design: Elegant dual-page 3D flip book
 * - Two pages visible at once (left + right spread)
 * - Click/tap right page to go forward, left page to go back
 * - Arrow hint on right edge (no text buttons)
 * - Each spread has a full-bleed category background image
 * - "Cafe&Bar Luxor" branding top-right on every page
 * - Smooth CSS 3D rotateY page-turn animation
 * - Red/black/cream color scheme
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

// ─── CDN URLS ────────────────────────────────────────────────────────────────
const IMG = {
  cover:       "/manus-storage/real-photo-1_326bfea4.jpg",
  coffee:      "/manus-storage/menu-bg-coffee_ab0d42cd.jpg",
  beerTap:     "/manus-storage/menu-bg-veltins_3f5cd62a.jpg",
  beerBottle:  "/manus-storage/menu-bg-heineken_94682cb5.jpg",
  coldDrinks:  "/manus-storage/menu-bg-colddrinks_3b7b32c9.jpg",
  tea:         "/manus-storage/menu-bg-tea_5ad744ba.jpg",
  spirits:     "/manus-storage/menu-bg-spirits_17414f58.jpg",
  aperitif:    "/manus-storage/menu-bg-aperitif_9a10d48f.jpg",
  wine:        "/manus-storage/menu-bg-wine_67818448.jpg",
  cocktail:    "/manus-storage/menu-bg-cocktail_e066901a.jpg",
  icecream:    "/manus-storage/menu-bg-icecream-glass_cc2094a7.jpg",
  sunrise:     "/manus-storage/menu-bg-sunrise_e2c4fdef.jpg",
  outside:     "/manus-storage/real-photo-2_6bd6c58b.jpg",
};

// ─── MENU DATA ────────────────────────────────────────────────────────────────
interface MenuItem { name: string; size?: string; price: string; note?: string; }
interface MenuSection { titleDe: string; titleEn: string; bg: string; items: MenuItem[]; note?: string; recipe?: { de: string; en: string }; }

const MENU_SECTIONS: MenuSection[] = [
  {
    titleDe: "Kaffee & Heiße Getränke",
    titleEn: "Coffee & Hot Drinks",
    bg: IMG.coffee,
    items: [
      { name: "Milchkaffee", price: "€3,00" },
      { name: "Kaffee Crema", price: "€2,50" },
      { name: "Espresso", price: "€2,00" },
      { name: "Espresso Macchiato", price: "€2,50" },
      { name: "Doppelter Espresso", price: "€2,70" },
      { name: "Cappuccino", price: "€3,00" },
      { name: "Cappuccino klein", price: "€2,50" },
      { name: "Eiskaffee", price: "€4,00" },
      { name: "Latte Macchiato", price: "€3,00" },
      { name: "Frappé weiß", price: "€3,50" },
      { name: "Frappé schwarz", price: "€3,00" },
      { name: "Kakao", price: "€3,00" },
      { name: "Kakao mit Sahne", price: "€3,30" },
    ],
  },
  {
    titleDe: "Tee",
    titleEn: "Tea",
    bg: IMG.tea,
    items: [
      { name: "Grüner Tee / Green Tea", price: "€1,80" },
      { name: "Schwarzer Tee / Black Tea", price: "€1,80" },
      { name: "Pfefferminztee / Peppermint Tea", price: "€1,80" },
      { name: "Früchtetee / Fruit Tea", price: "€1,80" },
      { name: "Kamillentee / Chamomile Tea", price: "€1,80" },
    ],
    note: "Alle Teesorten €1,80 pro Tasse · All teas €1.80 per cup",
  },
  {
    titleDe: "Zapfenbier",
    titleEn: "Draft Beer",
    bg: IMG.beerTap,
    items: [
      { name: "Veltins", size: "0,2l", price: "€2,00" },
      { name: "Veltins", size: "0,3l", price: "€2,70" },
      { name: "Veltins", size: "0,5l", price: "€4,50" },
      { name: "Früh Kölsch", size: "0,2l", price: "€2,00" },
      { name: "Früh Kölsch", size: "0,3l", price: "€2,70" },
      { name: "Früh Kölsch", size: "0,4l", price: "€3,60" },
    ],
  },
  {
    titleDe: "Flaschenbier",
    titleEn: "Bottled Beer",
    bg: IMG.beerBottle,
    items: [
      { name: "Krombacher", size: "0,33l", price: "€3,00" },
      { name: "Krombacher Radler", size: "0,33l", price: "€3,00" },
      { name: "Krombacher Alkoholfrei", size: "0,33l", price: "€3,00" },
      { name: "Heineken", size: "0,33l", price: "€3,00" },
      { name: "Frankenheim", size: "0,33l", price: "€3,00" },
      { name: "Früh Kölsch", size: "0,33l", price: "€3,00" },
      { name: "Maisels Weizen Original", size: "0,5l", price: "€4,00" },
      { name: "Maisels Weizen Alkoholfrei", size: "0,5l", price: "€4,00" },
    ],
  },
  {
    titleDe: "Kaltgetränke",
    titleEn: "Cold Drinks",
    bg: IMG.coldDrinks,
    items: [
      { name: "Coca Cola / Zero", size: "0,33l", price: "€3,00" },
      { name: "Fanta / Sprite / Spezi", size: "0,33l", price: "€3,00" },
      { name: "Lemon / Orange / Mojito Soda", size: "0,33l", price: "€3,00" },
      { name: "Apfelschorle / Do Tuk", size: "0,33l", price: "€3,00" },
      { name: "Eistee Pfirsich / Zitrone", size: "0,5l", price: "€3,00" },
      { name: "Schweppes Bitter Lemon", size: "0,25l", price: "€2,50" },
      { name: "Red Bull", size: "0,33l", price: "€3,50" },
      { name: "Orangensaft / Apfelsaft", size: "0,25l", price: "€2,50" },
      { name: "Multivitaminsaft", size: "0,25l", price: "€2,50" },
      { name: "Wasser still / sprudel", size: "0,2l", price: "€2,00" },
    ],
  },
  {
    titleDe: "Hausgemachte Limonade",
    titleEn: "Homemade Lemonade",
    bg: IMG.coldDrinks,
    items: [
      { name: "Mango", size: "0,5l", price: "€4,20" },
      { name: "Himbeere / Raspberry", size: "0,5l", price: "€4,20" },
      { name: "Erdbeere / Strawberry", size: "0,5l", price: "€4,20" },
      { name: "Minze / Mint", size: "0,5l", price: "€4,20" },
      { name: "Granatapfel / Pomegranate", size: "0,5l", price: "€4,20" },
    ],
    note: "Alle hausgemachten Limonaden 0,5l · All homemade lemonades 0.5l",
  },
  {
    titleDe: "Spirituosen",
    titleEn: "Spirits",
    bg: IMG.spirits,
    items: [
      { name: "Wodka (Absolut)", size: "4cl", price: "€3,50" },
      { name: "Rum (Bacardi)", size: "4cl", price: "€3,50" },
      { name: "Gin (Gordon's)", size: "4cl", price: "€3,50" },
      { name: "Jägermeister", size: "4cl", price: "€3,50" },
      { name: "Tequila (Jose Cuervo)", size: "4cl", price: "€3,50" },
      { name: "Sambuca", size: "4cl", price: "€3,50" },
      { name: "Jack Daniel's", size: "4cl", price: "€4,50" },
      { name: "Ballantine's", size: "4cl", price: "€4,50" },
      { name: "Jim Beam", size: "4cl", price: "€4,50" },
    ],
  },
  {
    titleDe: "Long Drinks",
    titleEn: "Long Drinks",
    bg: IMG.spirits,
    items: [
      { name: "Vodka Lemon", price: "€5,00" },
      { name: "Vodka Energy", price: "€5,00" },
      { name: "Whiskey Cola", price: "€5,00" },
      { name: "Jägermeister Energy", price: "€5,00" },
      { name: "Jägermeister Cola", price: "€5,00" },
      { name: "Rum Cola", price: "€5,00" },
      { name: "Gin Tonic", price: "€5,00" },
    ],
  },
  {
    titleDe: "Aperitif",
    titleEn: "Aperitif",
    bg: IMG.aperitif,
    items: [
      { name: "Campari", size: "5cl", price: "€4,50" },
      { name: "Campari Orange", size: "0,2l", price: "€5,00" },
      { name: "Campari Soda", size: "0,2l", price: "€5,00" },
      { name: "Hugo", size: "0,2l", price: "€4,00" },
      { name: "Campari Spritz", size: "0,2l", price: "€6,00" },
    ],
  },
  {
    titleDe: "Wein & Sekt",
    titleEn: "Wine & Sparkling",
    bg: IMG.wine,
    items: [
      { name: "Rotwein / Red Wine", size: "0,2l", price: "€5,00" },
      { name: "Weißwein / White Wine", size: "0,2l", price: "€5,00" },
      { name: "Prosecco", size: "0,2l", price: "€5,00" },
      { name: "Sekt / Sparkling Wine", size: "0,2l", price: "€5,00" },
      { name: "Flasche Wein / Bottle of Wine", size: "0,75l", price: "€23,00" },
      { name: "Glühwein (Winter)", size: "0,2l", price: "€4,00" },
    ],
  },
  {
    titleDe: "Cocktails",
    titleEn: "Cocktails",
    bg: IMG.cocktail,
    items: [
      { name: "Aperol Spritz", price: "€6,00" },
      { name: "Sex on the Beach", price: "€8,00" },
      { name: "Caipirinha", price: "€7,00" },
      { name: "Mojito", price: "€8,00" },
      { name: "Piña Colada", price: "€8,00" },
      { name: "Blue Lagoon", price: "€8,00" },
      { name: "Neon Rush", price: "€8,00" },
      { name: "Cuba Libre", price: "€8,00" },
    ],
    recipe: {
      de: "Rezept: Mojito — 5cl weißer Rum, 2cl Limettensaft, 1 TL Zucker, frische Minze, Sodawasser. Minze und Zucker muddeln, Rum und Limettensaft hinzufügen, mit Eis und Sodawasser auffüllen.",
      en: "Recipe: Mojito — 5cl white rum, 2cl lime juice, 1 tsp sugar, fresh mint, soda water. Muddle mint and sugar, add rum and lime juice, top with ice and soda water.",
    },
  },
  {
    titleDe: "Alkoholfreie Cocktails",
    titleEn: "Non-Alcoholic Cocktails",
    bg: IMG.sunrise,
    items: [
      { name: "Piña Colada Alkoholfrei", price: "€7,00" },
      { name: "Roter Pepp", price: "€7,00" },
      { name: "Sunrise", price: "€7,00" },
    ],
    recipe: {
      de: "Rezept: Sunrise — Orangensaft, Grenadine, Sprite. Orangensaft ins Glas, Grenadine langsam einlaufen lassen, mit Sprite auffüllen. Mit Orangenscheibe und Kirsche garnieren.",
      en: "Recipe: Sunrise — Orange juice, grenadine, Sprite. Pour orange juice, slowly add grenadine, top with Sprite. Garnish with orange slice and cherry.",
    },
  },
  {
    titleDe: "Eis & Desserts",
    titleEn: "Ice Cream & Desserts",
    bg: IMG.icecream,
    items: [
      { name: "1 Kugel / 1 Scoop", price: "€1,00" },
      { name: "2 Kugeln / 2 Scoops", price: "€1,50" },
      { name: "3 Kugeln / 3 Scoops", price: "€2,00" },
      { name: "Eisschokolade / Ice Chocolate", price: "€3,50" },
      { name: "Milchshake (Erdbeere/Vanille/Schokolade)", price: "€4,50" },
    ],
    note: "Sorten: Vanille · Erdbeere · Schokolade · Flavours: Vanilla · Strawberry · Chocolate",
  },
];

// ─── BOOK PAGES ───────────────────────────────────────────────────────────────
// Each "spread" = left page + right page
// Spread 0 = Cover (front) + first section
// Spreads 1..N = pairs of sections
// Last spread = back cover

interface Spread {
  left: "cover" | "back" | number;  // section index or special
  right: "cover" | "back" | number;
}

function buildSpreads(): Spread[] {
  const spreads: Spread[] = [];
  // Spread 0: cover (left) + section 0 (right)
  spreads.push({ left: "cover", right: 0 });
  // Pairs of sections
  for (let i = 1; i < MENU_SECTIONS.length; i += 2) {
    if (i + 1 < MENU_SECTIONS.length) {
      spreads.push({ left: i, right: i + 1 });
    } else {
      spreads.push({ left: i, right: "back" });
    }
  }
  // If even number of sections after first, add back cover
  if (MENU_SECTIONS.length % 2 === 0) {
    spreads.push({ left: MENU_SECTIONS.length - 1, right: "back" });
  }
  // Ensure back cover exists
  const lastSpread = spreads[spreads.length - 1];
  if (lastSpread.right !== "back" && lastSpread.left !== "back") {
    spreads.push({ left: "back", right: "back" });
  }
  return spreads;
}

const SPREADS = buildSpreads();

// ─── PAGE CONTENT COMPONENTS ─────────────────────────────────────────────────

function PageBrand() {
  return (
    <div style={{
      position: "absolute", top: 12, right: 14, zIndex: 10,
      textAlign: "right", lineHeight: 1.1,
    }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.6rem", color: "rgba(220,80,80,0.9)", letterSpacing: "0.08em", fontWeight: 600 }}>
        Cafe&amp;Bar
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "#fff", letterSpacing: "0.12em", fontWeight: 700 }}>
        LUXOR
      </div>
    </div>
  );
}

function CoverPage() {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#0a0000",
    }}>
      <img src={IMG.cover} alt="Cafe Bar Luxor" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(10,0,0,0.7) 0%, rgba(120,0,0,0.4) 100%)",
      }} />
      {/* Ornamental border */}
      <div style={{
        position: "absolute", inset: 12,
        border: "1px solid rgba(220,80,80,0.5)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 16,
        border: "1px solid rgba(220,80,80,0.2)",
        pointerEvents: "none",
      }} />
      {/* Corner ornaments */}
      {["top:12px;left:12px", "top:12px;right:12px", "bottom:12px;left:12px", "bottom:12px;right:12px"].map((pos, i) => (
        <div key={i} style={{
          position: "absolute",
          ...(pos.includes("top:12") ? { top: 8 } : { bottom: 8 }),
          ...(pos.includes("left:12") ? { left: 8 } : { right: 8 }),
          width: 20, height: 20,
          borderTop: pos.includes("top") ? "2px solid rgba(220,80,80,0.7)" : "none",
          borderBottom: pos.includes("bottom") ? "2px solid rgba(220,80,80,0.7)" : "none",
          borderLeft: pos.includes("left:12") ? "2px solid rgba(220,80,80,0.7)" : "none",
          borderRight: pos.includes("right:12") ? "2px solid rgba(220,80,80,0.7)" : "none",
        }} />
      ))}
      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: "24px",
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.7rem", color: "rgba(220,80,80,0.9)", letterSpacing: "0.25em", marginBottom: 8, textTransform: "uppercase" }}>
          — Willkommen —
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "rgba(220,80,80,0.8)", letterSpacing: "0.1em", fontWeight: 400, marginBottom: 4 }}>
          Cafe&amp;Bar
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "2.8rem", color: "#fff",
          letterSpacing: "0.2em", fontWeight: 700, lineHeight: 1, marginBottom: 12,
          textShadow: "0 2px 20px rgba(180,0,0,0.6)",
        }}>
          LUXOR
        </div>
        <div style={{ width: 60, height: 1, background: "rgba(220,80,80,0.6)", marginBottom: 12 }} />
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.15em", textAlign: "center", lineHeight: 1.6 }}>
          SPEISEKARTE<br />
          <span style={{ color: "rgba(220,80,80,0.6)" }}>·</span> MENU <span style={{ color: "rgba(220,80,80,0.6)" }}>·</span>
        </div>
        <div style={{ marginTop: 16, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em" }}>
          Ohligser Markt 5 · Solingen
        </div>
      </div>
    </div>
  );
}

function BackPage() {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#0a0000",
    }}>
      <img src={IMG.outside} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(10,0,0,0.7)" }} />
      <div style={{ position: "absolute", inset: 12, border: "1px solid rgba(220,80,80,0.3)", pointerEvents: "none" }} />
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 24, gap: 8,
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", color: "#fff", letterSpacing: "0.2em" }}>LUXOR</div>
        <div style={{ width: 40, height: 1, background: "rgba(220,80,80,0.5)" }} />
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 1.8, letterSpacing: "0.05em" }}>
          Ohligser Markt 5<br />42696 Solingen<br />
          <span style={{ color: "rgba(220,80,80,0.7)" }}>stoyansarakostov73@gmail.com</span>
        </div>
        <div style={{ marginTop: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
          Mo–Sa 09:00–21:00 · So 10:00–20:00
        </div>
      </div>
    </div>
  );
}

function SectionPage({ section, lang }: { section: MenuSection; lang: string }) {
  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "#0a0000",
    }}>
      {/* Background image with dark overlay */}
      <img src={section.bg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(10,0,0,0.85) 0%, rgba(10,0,0,0.6) 40%, rgba(10,0,0,0.9) 100%)",
      }} />
      {/* Subtle border */}
      <div style={{ position: "absolute", inset: 6, border: "1px solid rgba(220,80,80,0.15)", pointerEvents: "none" }} />
      {/* Brand top-right */}
      <PageBrand />
      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, padding: "14px 14px 10px 14px",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Section title */}
        <div style={{ marginBottom: 8, paddingRight: 50 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "0.85rem",
            color: "#fff",
            fontWeight: 700,
            letterSpacing: "0.05em",
            lineHeight: 1.2,
          }}>
            {lang === "de" ? section.titleDe : section.titleEn}
          </div>
          <div style={{ width: 30, height: 1.5, background: "rgba(220,80,80,0.7)", marginTop: 4 }} />
        </div>
        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
          {section.items.map((item, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              paddingBottom: 2,
            }}>
              <div style={{ display: "flex", gap: 4, alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.85)" }}>
                  {item.name}
                </span>
                {item.size && (
                  <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.5rem", color: "rgba(255,255,255,0.4)" }}>
                    {item.size}
                  </span>
                )}
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(220,80,80,0.9)", fontWeight: 600, whiteSpace: "nowrap", marginLeft: 4 }}>
                {item.price}
              </span>
            </div>
          ))}
          {/* Note */}
          {section.note && (
            <div style={{
              marginTop: 4, padding: "4px 6px",
              background: "rgba(220,80,80,0.08)",
              border: "1px solid rgba(220,80,80,0.2)",
              borderRadius: 2,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.5rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.4,
            }}>
              {section.note}
            </div>
          )}
          {/* Recipe card */}
          {section.recipe && (
            <div style={{
              marginTop: 6, padding: "6px 8px",
              background: "rgba(180,0,0,0.12)",
              border: "1px solid rgba(220,80,80,0.3)",
              borderRadius: 2,
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.65rem", color: "rgba(220,80,80,0.9)", fontWeight: 700, marginBottom: 3 }}>
                {lang === "de" ? "Rezept" : "Recipe"}
              </div>
              <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.5rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                {lang === "de" ? section.recipe.de : section.recipe.en}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Menu() {
  const { lang, t } = useLanguage();
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [flipping, setFlipping] = useState<"forward" | "backward" | null>(null);
  const [pendingSpread, setPendingSpread] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const totalSpreads = SPREADS.length;

  const goForward = () => {
    if (flipping || spreadIndex >= totalSpreads - 1) return;
    setPendingSpread(spreadIndex + 1);
    setFlipping("forward");
  };

  const goBackward = () => {
    if (flipping || spreadIndex <= 0) return;
    setPendingSpread(spreadIndex - 1);
    setFlipping("backward");
  };

  useEffect(() => {
    if (flipping) {
      const t = setTimeout(() => {
        if (pendingSpread !== null) setSpreadIndex(pendingSpread);
        setFlipping(null);
        setPendingSpread(null);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [flipping, pendingSpread]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) goForward();
    else if (dx > 40) goBackward();
    touchStartX.current = null;
  };

  const currentSpread = SPREADS[spreadIndex];

  const renderPage = (side: "cover" | "back" | number) => {
    if (side === "cover") return <CoverPage />;
    if (side === "back") return <BackPage />;
    return <SectionPage section={MENU_SECTIONS[side]} lang={lang} />;
  };

  // Scroll reveal
  useEffect(() => {
    const el = document.querySelector(".menu-book-container");
    if (el) {
      el.classList.add("opacity-0", "translate-y-8");
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-8");
        el.classList.add("transition-all", "duration-700");
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0000]" style={{ paddingTop: 80 }}>
      {/* Page header */}
      <div style={{ textAlign: "center", padding: "32px 16px 24px" }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.7rem", color: "rgba(220,80,80,0.8)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>
          — {lang === "de" ? "Unsere" : "Our"} —
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", color: "#fff", fontWeight: 700, letterSpacing: "0.1em", margin: 0 }}>
          {lang === "de" ? "Speisekarte" : "Menu"}
        </h1>
        <div style={{ width: 60, height: 2, background: "rgba(220,80,80,0.6)", margin: "12px auto 0" }} />
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: 12, letterSpacing: "0.05em" }}>
          {lang === "de"
            ? "Blättern Sie durch unsere Karte — klicken oder wischen Sie"
            : "Browse our menu — click or swipe to turn pages"}
        </p>
      </div>

      {/* Book container */}
      <div
        className="menu-book-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 16px 48px",
        }}
      >
        <div
          ref={bookRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            width: "min(700px, 100%)",
            maxWidth: 700,
          }}
        >
          {/* Book shadow */}
          <div style={{
            position: "absolute",
            bottom: -20,
            left: "10%",
            right: "10%",
            height: 30,
            background: "radial-gradient(ellipse, rgba(180,0,0,0.3) 0%, transparent 70%)",
            filter: "blur(10px)",
            zIndex: 0,
          }} />

          {/* The book itself */}
          <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "2/1.35",
            display: "flex",
            perspective: "1200px",
            zIndex: 1,
          }}>
            {/* Left page */}
            <div
              onClick={goBackward}
              style={{
                flex: 1,
                position: "relative",
                cursor: spreadIndex > 0 ? "pointer" : "default",
                transformOrigin: "right center",
                transformStyle: "preserve-3d",
                transition: flipping === "backward" ? "transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1.000)" : "none",
                transform: flipping === "backward" ? "rotateY(20deg)" : "rotateY(0deg)",
                boxShadow: "inset -4px 0 12px rgba(0,0,0,0.5)",
                borderRadius: "2px 0 0 2px",
                overflow: "hidden",
              }}
            >
              {renderPage(currentSpread.left)}
              {/* Left page back-arrow hint */}
              {spreadIndex > 0 && (
                <div style={{
                  position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                  width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(180,0,0,0.5)", borderRadius: "50%",
                  color: "#fff", fontSize: "0.7rem", opacity: 0.7,
                  pointerEvents: "none",
                }}>
                  ‹
                </div>
              )}
            </div>

            {/* Book spine */}
            <div style={{
              width: 8,
              background: "linear-gradient(to right, #1a0000, #3a0000, #1a0000)",
              boxShadow: "0 0 8px rgba(180,0,0,0.4)",
              flexShrink: 0,
              zIndex: 2,
            }} />

            {/* Right page */}
            <div
              onClick={goForward}
              style={{
                flex: 1,
                position: "relative",
                cursor: spreadIndex < totalSpreads - 1 ? "pointer" : "default",
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                transition: flipping === "forward" ? "transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1.000)" : "none",
                transform: flipping === "forward" ? "rotateY(-20deg)" : "rotateY(0deg)",
                boxShadow: "inset 4px 0 12px rgba(0,0,0,0.5)",
                borderRadius: "0 2px 2px 0",
                overflow: "hidden",
              }}
            >
              {renderPage(currentSpread.right)}
              {/* Right page forward-arrow hint */}
              {spreadIndex < totalSpreads - 1 && (
                <div style={{
                  position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                  width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(180,0,0,0.5)", borderRadius: "50%",
                  color: "#fff", fontSize: "0.7rem", opacity: 0.7,
                  pointerEvents: "none",
                }}>
                  ›
                </div>
              )}
            </div>
          </div>

          {/* Page indicator */}
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: 6, marginTop: 16,
          }}>
            {SPREADS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i === spreadIndex || flipping) return;
                  setPendingSpread(i);
                  setFlipping(i > spreadIndex ? "forward" : "backward");
                }}
                style={{
                  width: i === spreadIndex ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === spreadIndex ? "rgba(220,80,80,0.9)" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Spread label */}
          <div style={{
            textAlign: "center", marginTop: 8,
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.1em",
          }}>
            {spreadIndex + 1} / {totalSpreads}
          </div>
        </div>
      </div>

      {/* Payment info */}
      <div style={{
        maxWidth: 700, margin: "0 auto", padding: "0 16px 48px",
        textAlign: "center",
      }}>
        <div style={{
          padding: "16px 24px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(220,80,80,0.15)",
          borderRadius: 4,
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", color: "rgba(220,80,80,0.8)", marginBottom: 8, letterSpacing: "0.1em" }}>
            {lang === "de" ? "Zahlungsmethoden" : "Payment Methods"}
          </div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            {lang === "de"
              ? "Bar · Visa · Mastercard · Maestro · V Pay · American Express · Diners Club · Discover · UnionPay · Google Pay · Apple Pay · Kontaktlos"
              : "Cash · Visa · Mastercard · Maestro · V Pay · American Express · Diners Club · Discover · UnionPay · Google Pay · Apple Pay · Contactless"}
          </div>
        </div>
      </div>
    </div>
  );
}
