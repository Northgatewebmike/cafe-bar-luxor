/**
 * Menu Page — Cafe&Bar Luxor
 * Design: Elegant 3D flip-book
 * - Book starts CLOSED — only the cover visible on load
 * - Click the cover to open the book
 * - Full 3D CSS rotateY page-flip animation (800ms ease)
 * - White/cream pages with dark text (NOT red/black)
 * - Dual-page spread (two pages side by side) when open
 * - Arrow icons on page edges — no text buttons
 * - 2-4 cocktails per page with full recipes
 * - "Cafe&Bar Luxor" branding in top-right of every page
 * - Professional generated cover image
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

// ─── CDN URLS ────────────────────────────────────────────────────────────────
const COVER_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-cover-luxor-VY6RCEYWD9EiQRDJoFjiKM.png";

// ─── COCKTAIL DATA WITH RECIPES ───────────────────────────────────────────────
interface CocktailRecipe {
  nameDe: string;
  nameEn: string;
  price: string;
  ingredientsDe: string[];
  ingredientsEn: string[];
  preparationDe: string;
  preparationEn: string;
  emoji: string;
}

const COCKTAILS: CocktailRecipe[] = [
  {
    nameDe: "Aperol Spritz",
    nameEn: "Aperol Spritz",
    price: "€6,00",
    ingredientsDe: ["6cl Aperol", "10cl Prosecco", "4cl Sodawasser", "Eiswürfel", "Orangenscheibe"],
    ingredientsEn: ["6cl Aperol", "10cl Prosecco", "4cl Soda water", "Ice cubes", "Orange slice"],
    preparationDe: "Eiswürfel ins Weinglas, Prosecco eingießen, Aperol hinzufügen, mit Sodawasser auffüllen. Mit Orangenscheibe garnieren.",
    preparationEn: "Add ice to wine glass, pour Prosecco, add Aperol, top with soda water. Garnish with orange slice.",
    emoji: "🍊",
  },
  {
    nameDe: "Mojito",
    nameEn: "Mojito",
    price: "€8,00",
    ingredientsDe: ["5cl weißer Rum", "2cl Limettensaft", "1 TL Zucker", "Frische Minze", "Sodawasser", "Eiswürfel"],
    ingredientsEn: ["5cl white rum", "2cl lime juice", "1 tsp sugar", "Fresh mint", "Soda water", "Ice cubes"],
    preparationDe: "Minze und Zucker im Glas muddeln. Rum und Limettensaft hinzufügen, mit Crushed Ice auffüllen, mit Sodawasser toppen.",
    preparationEn: "Muddle mint and sugar in glass. Add rum and lime juice, fill with crushed ice, top with soda water.",
    emoji: "🌿",
  },
  {
    nameDe: "Caipirinha",
    nameEn: "Caipirinha",
    price: "€7,00",
    ingredientsDe: ["6cl Cachaça", "½ Limette (geviertelt)", "2 TL Rohrzucker", "Crushed Ice"],
    ingredientsEn: ["6cl Cachaça", "½ lime (quartered)", "2 tsp cane sugar", "Crushed ice"],
    preparationDe: "Limettenviertel und Zucker im Glas muddeln. Cachaça hinzufügen, mit Crushed Ice auffüllen und gut umrühren.",
    preparationEn: "Muddle lime quarters and sugar in glass. Add Cachaça, fill with crushed ice and stir well.",
    emoji: "🍋",
  },
  {
    nameDe: "Sex on the Beach",
    nameEn: "Sex on the Beach",
    price: "€8,00",
    ingredientsDe: ["4cl Wodka", "2cl Pfirsichlikör", "6cl Orangensaft", "6cl Cranberrysaft", "Eiswürfel"],
    ingredientsEn: ["4cl Vodka", "2cl Peach schnapps", "6cl Orange juice", "6cl Cranberry juice", "Ice cubes"],
    preparationDe: "Alle Zutaten mit Eis in einen Shaker geben, schütteln und in ein Glas mit Eiswürfeln abseihen. Mit Orangenscheibe garnieren.",
    preparationEn: "Shake all ingredients with ice, strain into glass with ice cubes. Garnish with orange slice.",
    emoji: "🏖️",
  },
  {
    nameDe: "Piña Colada",
    nameEn: "Piña Colada",
    price: "€8,00",
    ingredientsDe: ["5cl weißer Rum", "10cl Ananassaft", "4cl Kokosmilch", "Crushed Ice", "Ananasscheibe"],
    ingredientsEn: ["5cl white rum", "10cl pineapple juice", "4cl coconut milk", "Crushed ice", "Pineapple slice"],
    preparationDe: "Alle Zutaten mit Crushed Ice im Mixer cremig mixen. In ein gekühltes Glas gießen, mit Ananasscheibe garnieren.",
    preparationEn: "Blend all ingredients with crushed ice until creamy. Pour into chilled glass, garnish with pineapple slice.",
    emoji: "🍍",
  },
  {
    nameDe: "Blue Lagoon",
    nameEn: "Blue Lagoon",
    price: "€8,00",
    ingredientsDe: ["4cl Wodka", "2cl Blue Curaçao", "Limonade (Sprite)", "Eiswürfel", "Zitronenscheibe"],
    ingredientsEn: ["4cl Vodka", "2cl Blue Curaçao", "Lemonade (Sprite)", "Ice cubes", "Lemon slice"],
    preparationDe: "Eiswürfel ins Glas, Wodka und Blue Curaçao eingießen, mit Sprite auffüllen. Mit Zitronenscheibe garnieren.",
    preparationEn: "Add ice to glass, pour vodka and Blue Curaçao, top with Sprite. Garnish with lemon slice.",
    emoji: "💙",
  },
  {
    nameDe: "Neon Rush",
    nameEn: "Neon Rush",
    price: "€8,00",
    ingredientsDe: ["4cl Wodka", "2cl Melonenlikör", "Red Bull", "Eiswürfel", "Limettenspalte"],
    ingredientsEn: ["4cl Vodka", "2cl Melon liqueur", "Red Bull", "Ice cubes", "Lime wedge"],
    preparationDe: "Eiswürfel ins Glas, Wodka und Melonenlikör eingießen, mit Red Bull auffüllen. Mit Limettenspalte garnieren.",
    preparationEn: "Add ice to glass, pour vodka and melon liqueur, top with Red Bull. Garnish with lime wedge.",
    emoji: "⚡",
  },
  {
    nameDe: "Cuba Libre",
    nameEn: "Cuba Libre",
    price: "€8,00",
    ingredientsDe: ["5cl brauner Rum", "Cola", "2cl Limettensaft", "Eiswürfel", "Limettenspalte"],
    ingredientsEn: ["5cl dark rum", "Cola", "2cl lime juice", "Ice cubes", "Lime wedge"],
    preparationDe: "Eiswürfel und Limettensaft ins Glas, Rum eingießen, mit Cola auffüllen. Mit Limettenspalte garnieren.",
    preparationEn: "Add ice and lime juice to glass, pour rum, top with cola. Garnish with lime wedge.",
    emoji: "🥃",
  },
];

const NONALCO_COCKTAILS: CocktailRecipe[] = [
  {
    nameDe: "Sunrise (Alkoholfrei)",
    nameEn: "Sunrise (Non-Alcoholic)",
    price: "€7,00",
    ingredientsDe: ["10cl Orangensaft", "2cl Grenadine", "Sprite", "Eiswürfel", "Orangenscheibe & Kirsche"],
    ingredientsEn: ["10cl orange juice", "2cl grenadine", "Sprite", "Ice cubes", "Orange slice & cherry"],
    preparationDe: "Orangensaft mit Eis ins Glas, Grenadine langsam am Glasrand entlanglaufen lassen (Sonnenuntergang-Effekt), mit Sprite auffüllen.",
    preparationEn: "Pour orange juice with ice, slowly pour grenadine down the glass edge (sunset effect), top with Sprite.",
    emoji: "🌅",
  },
  {
    nameDe: "Roter Pepp (Alkoholfrei)",
    nameEn: "Roter Pepp (Non-Alcoholic)",
    price: "€7,00",
    ingredientsDe: ["8cl Cranberrysaft", "4cl Himbeersaft", "Sprite", "Eiswürfel", "Limettenscheibe"],
    ingredientsEn: ["8cl cranberry juice", "4cl raspberry juice", "Sprite", "Ice cubes", "Lime slice"],
    preparationDe: "Cranberry- und Himbeersaft mit Eis ins Glas, mit Sprite auffüllen. Mit Limettenscheibe garnieren.",
    preparationEn: "Pour cranberry and raspberry juice with ice, top with Sprite. Garnish with lime slice.",
    emoji: "🍓",
  },
  {
    nameDe: "Piña Colada (Alkoholfrei)",
    nameEn: "Piña Colada (Non-Alcoholic)",
    price: "€7,00",
    ingredientsDe: ["12cl Ananassaft", "4cl Kokosmilch", "Crushed Ice", "Ananasscheibe"],
    ingredientsEn: ["12cl pineapple juice", "4cl coconut milk", "Crushed ice", "Pineapple slice"],
    preparationDe: "Ananassaft und Kokosmilch mit Crushed Ice cremig mixen. In ein gekühltes Glas gießen, mit Ananasscheibe garnieren.",
    preparationEn: "Blend pineapple juice and coconut milk with crushed ice until creamy. Pour into chilled glass, garnish with pineapple slice.",
    emoji: "🥥",
  },
];

// ─── MENU DATA ────────────────────────────────────────────────────────────────
interface MenuItem { name: string; size?: string; price: string; note?: string; }
interface MenuSection { titleDe: string; titleEn: string; items: MenuItem[]; note?: string; }

const MENU_SECTIONS: MenuSection[] = [
  {
    titleDe: "Kaffee & Heiße Getränke",
    titleEn: "Coffee & Hot Drinks",
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
    items: [
      { name: "Grüner Tee", price: "€1,80" },
      { name: "Schwarzer Tee", price: "€1,80" },
      { name: "Pfefferminztee", price: "€1,80" },
      { name: "Früchtetee", price: "€1,80" },
      { name: "Kamillentee", price: "€1,80" },
    ],
    note: "Alle Teesorten €1,80 pro Tasse · All teas €1.80 per cup",
  },
  {
    titleDe: "Zapfenbier",
    titleEn: "Draft Beer",
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
    items: [
      { name: "Coca Cola / Zero", size: "0,33l", price: "€3,00" },
      { name: "Fanta / Sprite / Spezi", size: "0,33l", price: "€3,00" },
      { name: "Lemon / Orange / Mojito Soda", size: "0,33l", price: "€3,00" },
      { name: "Apfelschorle / Do Tuk", size: "0,33l", price: "€3,00" },
      { name: "Eistee Pfirsich / Zitrone", size: "0,5l", price: "€3,00" },
      { name: "Schweppes Bitter Lemon", size: "0,25l", price: "€2,50" },
      { name: "Red Bull", size: "0,33l", price: "€3,50" },
      { name: "Orangensaft / Apfelsaft", size: "0,25l", price: "€2,50" },
      { name: "Wasser still / sprudel", size: "0,2l", price: "€2,00" },
    ],
  },
  {
    titleDe: "Hausgemachte Limonade",
    titleEn: "Homemade Lemonade",
    items: [
      { name: "Mango", size: "0,5l", price: "€4,20" },
      { name: "Himbeere", size: "0,5l", price: "€4,20" },
      { name: "Erdbeere", size: "0,5l", price: "€4,20" },
      { name: "Minze", size: "0,5l", price: "€4,20" },
      { name: "Granatapfel", size: "0,5l", price: "€4,20" },
    ],
  },
  {
    titleDe: "Spirituosen",
    titleEn: "Spirits",
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
    items: [
      { name: "Rotwein", size: "0,2l", price: "€5,00" },
      { name: "Weißwein", size: "0,2l", price: "€5,00" },
      { name: "Prosecco", size: "0,2l", price: "€5,00" },
      { name: "Sekt", size: "0,2l", price: "€5,00" },
      { name: "Flasche Wein", size: "0,75l", price: "€23,00" },
      { name: "Glühwein (Winter)", size: "0,2l", price: "€4,00" },
    ],
  },
  {
    titleDe: "Eis & Desserts",
    titleEn: "Ice Cream & Desserts",
    items: [
      { name: "1 Kugel / 1 Scoop", price: "€1,00" },
      { name: "2 Kugeln / 2 Scoops", price: "€1,50" },
      { name: "3 Kugeln / 3 Scoops", price: "€2,00" },
      { name: "Eisschokolade", price: "€3,50" },
      { name: "Milchshake (Erdbeere/Vanille/Schokolade)", price: "€4,50" },
    ],
    note: "Sorten: Vanille · Erdbeere · Schokolade",
  },
];

// ─── PAGE DEFINITIONS ─────────────────────────────────────────────────────────
// Each page is one of: "cover" | "back" | { type: "section", idx } | { type: "cocktails", start, end } | { type: "nonalco" }
type PageDef =
  | { type: "cover" }
  | { type: "back" }
  | { type: "section"; idx: number }
  | { type: "cocktails"; start: number; end: number }
  | { type: "nonalco" };

// Build page list: cover, sections, cocktail pages (2 per page), nonalco, back
function buildPages(): PageDef[] {
  const pages: PageDef[] = [{ type: "cover" }];
  MENU_SECTIONS.forEach((_, i) => pages.push({ type: "section", idx: i }));
  // Cocktails: 4 per page
  for (let i = 0; i < COCKTAILS.length; i += 4) {
    pages.push({ type: "cocktails", start: i, end: Math.min(i + 4, COCKTAILS.length) });
  }
  pages.push({ type: "nonalco" });
  pages.push({ type: "back" });
  return pages;
}

const PAGES = buildPages();

// ─── STYLES ───────────────────────────────────────────────────────────────────
const PAGE_STYLE: React.CSSProperties = {
  width: "100%",
  height: "100%",
  background: "#faf8f3",
  position: "relative",
  overflow: "hidden",
};

const PAGE_HEADER: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "clamp(0.75rem, 2vw, 1rem)",
  fontWeight: 700,
  color: "#1a0a00",
  letterSpacing: "0.04em",
  marginBottom: 4,
};

const PAGE_DIVIDER: React.CSSProperties = {
  width: 40,
  height: 2,
  background: "#8b1a1a",
  marginBottom: 10,
};

const PRICE_STYLE: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)",
  color: "#8b1a1a",
  fontWeight: 700,
  whiteSpace: "nowrap",
  marginLeft: 4,
};

const ITEM_NAME_STYLE: React.CSSProperties = {
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "clamp(0.55rem, 1.4vw, 0.75rem)",
  color: "#2a1a0a",
};

const ITEM_SIZE_STYLE: React.CSSProperties = {
  fontFamily: "'Source Sans 3', sans-serif",
  fontSize: "clamp(0.45rem, 1.1vw, 0.6rem)",
  color: "#8a7060",
};

// ─── PAGE BRAND ───────────────────────────────────────────────────────────────
function PageBrand() {
  return (
    <div style={{ position: "absolute", top: 10, right: 12, textAlign: "right", lineHeight: 1.1, zIndex: 10 }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.45rem, 1.1vw, 0.6rem)", color: "#8b1a1a", letterSpacing: "0.08em", fontWeight: 600 }}>
        Cafe&amp;Bar
      </div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)", color: "#1a0a00", letterSpacing: "0.12em", fontWeight: 700 }}>
        LUXOR
      </div>
    </div>
  );
}

// ─── PAGE COMPONENTS ──────────────────────────────────────────────────────────

function CoverPage({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      style={{ width: "100%", height: "100%", cursor: "pointer", position: "relative", overflow: "hidden" }}
      onClick={onOpen}
    >
      <img
        src={COVER_URL}
        alt="Cafe&Bar Luxor Speisekarte"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Subtle click hint */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.55)",
        color: "rgba(212,175,55,0.95)",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)",
        letterSpacing: "0.15em",
        padding: "6px 14px",
        borderRadius: 2,
        border: "1px solid rgba(212,175,55,0.4)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        ▶ Aufschlagen / Open
      </div>
    </div>
  );
}

function BackPage() {
  return (
    <div style={{ ...PAGE_STYLE, background: "#1a0a00" }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: 24, gap: 10,
      }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1rem, 3vw, 1.6rem)", color: "#d4af37", letterSpacing: "0.2em" }}>
          LUXOR
        </div>
        <div style={{ width: 40, height: 1, background: "rgba(212,175,55,0.5)" }} />
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "clamp(0.5rem, 1.3vw, 0.65rem)", color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.8, letterSpacing: "0.05em" }}>
          Ohligser Markt 5<br />42696 Solingen<br />
          <span style={{ color: "rgba(212,175,55,0.8)" }}>stoyansarakostov73@gmail.com</span>
        </div>
        <div style={{ marginTop: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: "clamp(0.45rem, 1.1vw, 0.55rem)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
          Mo–Sa 09:00–21:00 · So 10:00–20:00
        </div>
      </div>
    </div>
  );
}

function SectionPage({ section, lang, pageNum }: { section: MenuSection; lang: string; pageNum: number }) {
  return (
    <div style={{ ...PAGE_STYLE }}>
      {/* Subtle page texture */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #faf8f3 0%, #f5f0e8 100%)",
      }} />
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #8b1a1a, #c0392b, #8b1a1a)" }} />
      <PageBrand />
      <div style={{ position: "relative", padding: "clamp(10px, 2vw, 18px)", paddingTop: "clamp(14px, 2.5vw, 22px)", height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Title */}
        <div style={{ marginBottom: 8, paddingRight: 60 }}>
          <div style={PAGE_HEADER}>{lang === "de" ? section.titleDe : section.titleEn}</div>
          <div style={PAGE_DIVIDER} />
        </div>
        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
          {section.items.map((item, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              borderBottom: "1px solid rgba(139,26,26,0.1)",
              paddingBottom: 3, paddingTop: 1,
            }}>
              <div style={{ display: "flex", gap: 4, alignItems: "baseline" }}>
                <span style={ITEM_NAME_STYLE}>{item.name}</span>
                {item.size && <span style={ITEM_SIZE_STYLE}>{item.size}</span>}
              </div>
              <span style={PRICE_STYLE}>{item.price}</span>
            </div>
          ))}
          {section.note && (
            <div style={{
              marginTop: 6, padding: "4px 8px",
              background: "rgba(139,26,26,0.06)",
              border: "1px solid rgba(139,26,26,0.15)",
              borderRadius: 2,
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "clamp(0.45rem, 1.1vw, 0.55rem)",
              color: "#6a4a3a",
              lineHeight: 1.4,
            }}>
              {section.note}
            </div>
          )}
        </div>
        {/* Page number */}
        <div style={{
          textAlign: "center", marginTop: 6,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.45rem, 1.1vw, 0.55rem)",
          color: "rgba(139,26,26,0.4)",
          letterSpacing: "0.1em",
        }}>
          — {pageNum} —
        </div>
      </div>
    </div>
  );
}

function CocktailsPage({ cocktails, lang, pageNum }: { cocktails: CocktailRecipe[]; lang: string; pageNum: number }) {
  return (
    <div style={{ ...PAGE_STYLE }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #faf8f3 0%, #f5f0e8 100%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #8b1a1a, #c0392b, #8b1a1a)" }} />
      <PageBrand />
      <div style={{ position: "relative", padding: "clamp(10px, 2vw, 18px)", paddingTop: "clamp(14px, 2.5vw, 22px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 8, paddingRight: 60 }}>
          <div style={PAGE_HEADER}>{lang === "de" ? "Cocktails" : "Cocktails"}</div>
          <div style={PAGE_DIVIDER} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {cocktails.map((c, i) => (
            <div key={i} style={{
              borderBottom: i < cocktails.length - 1 ? "1px solid rgba(139,26,26,0.12)" : "none",
              paddingBottom: 7,
            }}>
              {/* Name + price */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)" }}>{c.emoji}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.65rem, 1.7vw, 0.9rem)", fontWeight: 700, color: "#1a0a00" }}>
                    {lang === "de" ? c.nameDe : c.nameEn}
                  </span>
                </div>
                <span style={PRICE_STYLE}>{c.price}</span>
              </div>
              {/* Ingredients */}
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "clamp(0.45rem, 1.1vw, 0.58rem)",
                color: "#5a3a2a",
                lineHeight: 1.4,
                marginBottom: 2,
              }}>
                {(lang === "de" ? c.ingredientsDe : c.ingredientsEn).join(" · ")}
              </div>
              {/* Preparation */}
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "clamp(0.42rem, 1.05vw, 0.55rem)",
                color: "#7a5a4a",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}>
                {lang === "de" ? c.preparationDe : c.preparationEn}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          textAlign: "center", marginTop: 6,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.45rem, 1.1vw, 0.55rem)",
          color: "rgba(139,26,26,0.4)",
          letterSpacing: "0.1em",
        }}>
          — {pageNum} —
        </div>
      </div>
    </div>
  );
}

function NonAlcoPage({ lang, pageNum }: { lang: string; pageNum: number }) {
  return (
    <div style={{ ...PAGE_STYLE }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #faf8f3 0%, #f5f0e8 100%)",
      }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #8b1a1a, #c0392b, #8b1a1a)" }} />
      <PageBrand />
      <div style={{ position: "relative", padding: "clamp(10px, 2vw, 18px)", paddingTop: "clamp(14px, 2.5vw, 22px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 8, paddingRight: 60 }}>
          <div style={PAGE_HEADER}>{lang === "de" ? "Alkoholfreie Cocktails" : "Non-Alcoholic Cocktails"}</div>
          <div style={PAGE_DIVIDER} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {NONALCO_COCKTAILS.map((c, i) => (
            <div key={i} style={{
              borderBottom: i < NONALCO_COCKTAILS.length - 1 ? "1px solid rgba(139,26,26,0.12)" : "none",
              paddingBottom: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.9rem)" }}>{c.emoji}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.65rem, 1.7vw, 0.9rem)", fontWeight: 700, color: "#1a0a00" }}>
                    {lang === "de" ? c.nameDe : c.nameEn}
                  </span>
                </div>
                <span style={PRICE_STYLE}>{c.price}</span>
              </div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "clamp(0.45rem, 1.1vw, 0.58rem)",
                color: "#5a3a2a",
                lineHeight: 1.4,
                marginBottom: 2,
              }}>
                {(lang === "de" ? c.ingredientsDe : c.ingredientsEn).join(" · ")}
              </div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "clamp(0.42rem, 1.05vw, 0.55rem)",
                color: "#7a5a4a",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}>
                {lang === "de" ? c.preparationDe : c.preparationEn}
              </div>
            </div>
          ))}
        </div>
        <div style={{
          textAlign: "center", marginTop: 6,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(0.45rem, 1.1vw, 0.55rem)",
          color: "rgba(139,26,26,0.4)",
          letterSpacing: "0.1em",
        }}>
          — {pageNum} —
        </div>
      </div>
    </div>
  );
}

// ─── RENDER PAGE ──────────────────────────────────────────────────────────────
function RenderPage({ page, lang, pageNum, onOpen }: { page: PageDef; lang: string; pageNum: number; onOpen?: () => void }) {
  if (page.type === "cover") return <CoverPage onOpen={onOpen ?? (() => {})} />;
  if (page.type === "back") return <BackPage />;
  if (page.type === "section") return <SectionPage section={MENU_SECTIONS[page.idx]} lang={lang} pageNum={pageNum} />;
  if (page.type === "cocktails") return <CocktailsPage cocktails={COCKTAILS.slice(page.start, page.end)} lang={lang} pageNum={pageNum} />;
  if (page.type === "nonalco") return <NonAlcoPage lang={lang} pageNum={pageNum} />;
  return null;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Menu() {
  const { lang } = useLanguage();

  // Book state: closed = only cover shown; open = dual page spread
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // index into PAGES (0 = cover)
  const [flipping, setFlipping] = useState<"forward" | "backward" | null>(null);
  const [pendingPage, setPendingPage] = useState<number | null>(null);
  const [flipProgress, setFlipProgress] = useState(0); // 0..1 for animation
  const touchStartX = useRef<number | null>(null);
  const animRef = useRef<number | null>(null);

  // When book is open, show two pages: currentPage (left) and currentPage+1 (right)
  // Exception: cover page is shown alone (closed state)

  const totalPages = PAGES.length;

  const openBook = () => {
    if (isOpen) return;
    setIsOpen(true);
    setCurrentPage(1); // open to first content page
  };

  const goForward = () => {
    if (flipping || !isOpen) return;
    const next = currentPage + 2;
    if (next >= totalPages) return;
    setPendingPage(next);
    setFlipping("forward");
  };

  const goBackward = () => {
    if (flipping || !isOpen) return;
    if (currentPage <= 1) {
      // Close book
      setIsOpen(false);
      setCurrentPage(0);
      return;
    }
    const prev = currentPage - 2;
    setPendingPage(prev < 1 ? 1 : prev);
    setFlipping("backward");
  };

  useEffect(() => {
    if (flipping) {
      const timer = setTimeout(() => {
        if (pendingPage !== null) setCurrentPage(pendingPage);
        setFlipping(null);
        setPendingPage(null);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [flipping, pendingPage]);

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

  // Left page = currentPage, right page = currentPage + 1
  const leftPage = PAGES[currentPage];
  const rightPage = currentPage + 1 < totalPages ? PAGES[currentPage + 1] : PAGES[totalPages - 1];

  const canGoForward = isOpen && currentPage + 2 < totalPages && !flipping;
  const canGoBackward = isOpen && !flipping;

  // Spread count for indicator
  const spreadCount = Math.ceil((totalPages - 1) / 2); // excluding cover
  const currentSpread = Math.floor((currentPage - 1) / 2); // 0-indexed

  return (
    <div className="min-h-screen" style={{ background: "#0a0000", paddingTop: 80 }}>
      {/* Page header */}
      <div style={{ textAlign: "center", padding: "32px 16px 20px" }}>
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "0.7rem",
          color: "rgba(220,80,80,0.8)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}>
          — {lang === "de" ? "Unsere" : "Our"} —
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          color: "#fff",
          fontWeight: 700,
          letterSpacing: "0.1em",
          margin: 0,
        }}>
          {lang === "de" ? "Speisekarte" : "Menu"}
        </h1>
        <div style={{ width: 60, height: 2, background: "rgba(220,80,80,0.6)", margin: "12px auto 0" }} />
        <p style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "0.75rem",
          color: "rgba(255,255,255,0.45)",
          marginTop: 12,
          letterSpacing: "0.05em",
        }}>
          {isOpen
            ? (lang === "de" ? "Klicken oder wischen Sie zum Blättern" : "Click or swipe to turn pages")
            : (lang === "de" ? "Klicken Sie auf das Cover, um die Karte zu öffnen" : "Click the cover to open the menu")}
        </p>
      </div>

      {/* Book wrapper */}
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0 12px 48px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div style={{ position: "relative", width: "min(760px, 100%)", maxWidth: 760 }}>
          {/* Book shadow */}
          <div style={{
            position: "absolute",
            bottom: -16,
            left: "8%",
            right: "8%",
            height: 28,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)",
            filter: "blur(12px)",
            zIndex: 0,
          }} />

          {/* ── CLOSED STATE: single cover page ── */}
          {!isOpen && (
            <div style={{
              position: "relative",
              width: "min(340px, 50%)",
              margin: "0 auto",
              aspectRatio: "2/3",
              zIndex: 1,
              boxShadow: "8px 8px 40px rgba(0,0,0,0.8), -2px 0 8px rgba(0,0,0,0.4)",
              borderRadius: "2px 4px 4px 2px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02) rotateY(-3deg)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "12px 12px 50px rgba(0,0,0,0.9), -2px 0 8px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1) rotateY(0deg)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "8px 8px 40px rgba(0,0,0,0.8), -2px 0 8px rgba(0,0,0,0.4)";
              }}
            >
              <CoverPage onOpen={openBook} />
            </div>
          )}

          {/* ── OPEN STATE: dual page spread ── */}
          {isOpen && (
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "2/1.35",
              display: "flex",
              perspective: "1400px",
              zIndex: 1,
            }}>
              {/* Left page */}
              <div
                onClick={goBackward}
                style={{
                  flex: 1,
                  position: "relative",
                  cursor: canGoBackward ? "pointer" : "default",
                  transformOrigin: "right center",
                  transformStyle: "preserve-3d",
                  transition: flipping === "backward" ? "transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1.000)" : "none",
                  transform: flipping === "backward" ? "rotateY(25deg)" : "rotateY(0deg)",
                  boxShadow: "inset -6px 0 16px rgba(0,0,0,0.25)",
                  borderRadius: "3px 0 0 3px",
                  overflow: "hidden",
                  border: "1px solid rgba(139,26,26,0.15)",
                  borderRight: "none",
                }}
              >
                <RenderPage page={leftPage} lang={lang} pageNum={currentPage} />
                {/* Back arrow */}
                {canGoBackward && (
                  <div style={{
                    position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)",
                    width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(139,26,26,0.15)", borderRadius: "50%",
                    color: "#8b1a1a", fontSize: "1rem", opacity: 0.6,
                    pointerEvents: "none",
                  }}>
                    ‹
                  </div>
                )}
              </div>

              {/* Book spine */}
              <div style={{
                width: "clamp(6px, 1.5vw, 12px)",
                background: "linear-gradient(to right, #2a1a0a, #4a2a1a, #2a1a0a)",
                boxShadow: "0 0 10px rgba(0,0,0,0.6)",
                flexShrink: 0,
                zIndex: 2,
              }} />

              {/* Right page */}
              <div
                onClick={goForward}
                style={{
                  flex: 1,
                  position: "relative",
                  cursor: canGoForward ? "pointer" : "default",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transition: flipping === "forward" ? "transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1.000)" : "none",
                  transform: flipping === "forward" ? "rotateY(-25deg)" : "rotateY(0deg)",
                  boxShadow: "inset 6px 0 16px rgba(0,0,0,0.25)",
                  borderRadius: "0 3px 3px 0",
                  overflow: "hidden",
                  border: "1px solid rgba(139,26,26,0.15)",
                  borderLeft: "none",
                }}
              >
                <RenderPage page={rightPage} lang={lang} pageNum={currentPage + 1} />
                {/* Forward arrow */}
                {canGoForward && (
                  <div style={{
                    position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                    width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(139,26,26,0.15)", borderRadius: "50%",
                    color: "#8b1a1a", fontSize: "1rem", opacity: 0.6,
                    pointerEvents: "none",
                  }}>
                    ›
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Page indicator dots */}
          {isOpen && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 16 }}>
              {Array.from({ length: spreadCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (flipping) return;
                    const targetPage = 1 + i * 2;
                    if (targetPage === currentPage) return;
                    setPendingPage(targetPage);
                    setFlipping(targetPage > currentPage ? "forward" : "backward");
                  }}
                  style={{
                    width: i === currentSpread ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === currentSpread ? "rgba(220,80,80,0.9)" : "rgba(255,255,255,0.2)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}

          {/* Close book button */}
          {isOpen && (
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button
                onClick={() => { setIsOpen(false); setCurrentPage(0); }}
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.6rem",
                  color: "rgba(255,255,255,0.35)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  padding: "4px 8px",
                }}
              >
                ✕ {lang === "de" ? "Karte schließen" : "Close menu"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment info */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 16px 48px", textAlign: "center" }}>
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
              ? "Bar · Visa · Mastercard · Maestro · V Pay · American Express · Google Pay · Apple Pay · Kontaktlos"
              : "Cash · Visa · Mastercard · Maestro · V Pay · American Express · Google Pay · Apple Pay · Contactless"}
          </div>
        </div>
      </div>
    </div>
  );
}
