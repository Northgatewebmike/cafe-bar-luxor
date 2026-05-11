/**
 * Menu Page — Cafe&Bar Luxor
 * Design: True 3D flip-book — full page-turn animation like a real book
 * - Book starts CLOSED — professional black/gold cover
 * - Click cover to open: full 3D rotateY flip animation (cover peels back)
 * - Each page flip: full 180° rotateY with front/back faces (backface-visibility)
 * - Pages have category-specific background images with overlay
 * - Book is larger (up to 900px wide)
 * - White/cream pages, dark text
 * - Cocktail pages: 2-4 cocktails with full recipes
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── CDN URLS ────────────────────────────────────────────────────────────────
const COVER_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-cover-luxor-VY6RCEYWD9EiQRDJoFjiKM.png";

// Category background images
const BG = {
  coffee: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-coffee-bHCgWzdgLccx8QaoebjHvW.webp",
  tea: "/manus-storage/menu-bg-tea_a4841c93.jpg",
  beer: "/manus-storage/menu-bg-veltins_56de1f1c.jpg",
  bottledBeer: "/manus-storage/menu-bg-heineken_152dc755.jpg",
  coldDrinks: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-colddrinks-K2cYMpdZ2M8Xxct5VT5XEf.webp",
  lemonade: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-colddrinks-K2cYMpdZ2M8Xxct5VT5XEf.webp",
  spirits: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-spirits-UYQ7LT8yntchM6GGTS8HsV.webp",
  longdrinks: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-spirits-UYQ7LT8yntchM6GGTS8HsV.webp",
  aperitif: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-aperitif-oMMLgWX8xuNw6MRRKEq4ug.webp",
  wine: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-wine-aJfSwWATu3eMmqtHpTD2kK.webp",
  icecream: "/manus-storage/menu-bg-icecream-glass_22e2de7a.jpg",
  cocktail: "https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/menu-bg-cocktail-cuKewYz4FGYBy4tysqNJjG.webp",
  sunrise: "/manus-storage/menu-bg-sunrise_82ae9109.jpg",
};

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
    nameDe: "Aperol Spritz", nameEn: "Aperol Spritz", price: "€6,00",
    ingredientsDe: ["6cl Aperol", "10cl Prosecco", "4cl Sodawasser", "Eiswürfel", "Orangenscheibe"],
    ingredientsEn: ["6cl Aperol", "10cl Prosecco", "4cl Soda water", "Ice cubes", "Orange slice"],
    preparationDe: "Eiswürfel ins Weinglas, Prosecco eingießen, Aperol hinzufügen, mit Sodawasser auffüllen. Mit Orangenscheibe garnieren.",
    preparationEn: "Add ice to wine glass, pour Prosecco, add Aperol, top with soda water. Garnish with orange slice.",
    emoji: "🍊",
  },
  {
    nameDe: "Mojito", nameEn: "Mojito", price: "€8,00",
    ingredientsDe: ["5cl weißer Rum", "2cl Limettensaft", "1 TL Zucker", "Frische Minze", "Sodawasser", "Eiswürfel"],
    ingredientsEn: ["5cl white rum", "2cl lime juice", "1 tsp sugar", "Fresh mint", "Soda water", "Ice cubes"],
    preparationDe: "Minze und Zucker im Glas muddeln. Rum und Limettensaft hinzufügen, mit Crushed Ice auffüllen, mit Sodawasser toppen.",
    preparationEn: "Muddle mint and sugar in glass. Add rum and lime juice, fill with crushed ice, top with soda water.",
    emoji: "🌿",
  },
  {
    nameDe: "Caipirinha", nameEn: "Caipirinha", price: "€7,00",
    ingredientsDe: ["6cl Cachaça", "½ Limette (geviertelt)", "2 TL Rohrzucker", "Crushed Ice"],
    ingredientsEn: ["6cl Cachaça", "½ lime (quartered)", "2 tsp cane sugar", "Crushed ice"],
    preparationDe: "Limettenviertel und Zucker im Glas muddeln. Cachaça hinzufügen, mit Crushed Ice auffüllen und gut umrühren.",
    preparationEn: "Muddle lime quarters and sugar in glass. Add Cachaça, fill with crushed ice and stir well.",
    emoji: "🍋",
  },
  {
    nameDe: "Sex on the Beach", nameEn: "Sex on the Beach", price: "€8,00",
    ingredientsDe: ["4cl Wodka", "2cl Pfirsichlikör", "6cl Orangensaft", "6cl Cranberrysaft", "Eiswürfel"],
    ingredientsEn: ["4cl Vodka", "2cl Peach schnapps", "6cl Orange juice", "6cl Cranberry juice", "Ice cubes"],
    preparationDe: "Alle Zutaten mit Eis shaken, in ein Glas mit Eiswürfeln abseihen. Mit Orangenscheibe garnieren.",
    preparationEn: "Shake all ingredients with ice, strain into glass with ice. Garnish with orange slice.",
    emoji: "🏖️",
  },
  {
    nameDe: "Piña Colada", nameEn: "Piña Colada", price: "€8,00",
    ingredientsDe: ["5cl weißer Rum", "10cl Ananassaft", "4cl Kokosmilch", "Crushed Ice", "Ananasscheibe"],
    ingredientsEn: ["5cl white rum", "10cl pineapple juice", "4cl coconut milk", "Crushed ice", "Pineapple slice"],
    preparationDe: "Alle Zutaten mit Crushed Ice im Mixer cremig mixen. In ein gekühltes Glas gießen, mit Ananasscheibe garnieren.",
    preparationEn: "Blend all ingredients with crushed ice until creamy. Pour into chilled glass, garnish with pineapple slice.",
    emoji: "🍍",
  },
  {
    nameDe: "Blue Lagoon", nameEn: "Blue Lagoon", price: "€8,00",
    ingredientsDe: ["4cl Wodka", "2cl Blue Curaçao", "Limonade (Sprite)", "Eiswürfel", "Zitronenscheibe"],
    ingredientsEn: ["4cl Vodka", "2cl Blue Curaçao", "Lemonade (Sprite)", "Ice cubes", "Lemon slice"],
    preparationDe: "Eiswürfel ins Glas, Wodka und Blue Curaçao eingießen, mit Sprite auffüllen. Mit Zitronenscheibe garnieren.",
    preparationEn: "Add ice to glass, pour vodka and Blue Curaçao, top with Sprite. Garnish with lemon slice.",
    emoji: "💙",
  },
  {
    nameDe: "Neon Rush", nameEn: "Neon Rush", price: "€8,00",
    ingredientsDe: ["4cl Wodka", "2cl Melonenlikör", "Red Bull", "Eiswürfel", "Limettenspalte"],
    ingredientsEn: ["4cl Vodka", "2cl Melon liqueur", "Red Bull", "Ice cubes", "Lime wedge"],
    preparationDe: "Eiswürfel ins Glas, Wodka und Melonenlikör eingießen, mit Red Bull auffüllen. Mit Limettenspalte garnieren.",
    preparationEn: "Add ice to glass, pour vodka and melon liqueur, top with Red Bull. Garnish with lime wedge.",
    emoji: "⚡",
  },
  {
    nameDe: "Cuba Libre", nameEn: "Cuba Libre", price: "€8,00",
    ingredientsDe: ["5cl brauner Rum", "Cola", "2cl Limettensaft", "Eiswürfel", "Limettenspalte"],
    ingredientsEn: ["5cl dark rum", "Cola", "2cl lime juice", "Ice cubes", "Lime wedge"],
    preparationDe: "Eiswürfel und Limettensaft ins Glas, Rum eingießen, mit Cola auffüllen. Mit Limettenspalte garnieren.",
    preparationEn: "Add ice and lime juice to glass, pour rum, top with cola. Garnish with lime wedge.",
    emoji: "🥃",
  },
];

const NONALCO_COCKTAILS: CocktailRecipe[] = [
  {
    nameDe: "Sunrise (Alkoholfrei)", nameEn: "Sunrise (Non-Alcoholic)", price: "€7,00",
    ingredientsDe: ["10cl Orangensaft", "2cl Grenadine", "Sprite", "Eiswürfel", "Orangenscheibe & Kirsche"],
    ingredientsEn: ["10cl orange juice", "2cl grenadine", "Sprite", "Ice cubes", "Orange slice & cherry"],
    preparationDe: "Orangensaft mit Eis ins Glas, Grenadine langsam am Glasrand entlanglaufen lassen (Sonnenuntergang-Effekt), mit Sprite auffüllen.",
    preparationEn: "Pour orange juice with ice, slowly pour grenadine down the glass edge (sunset effect), top with Sprite.",
    emoji: "🌅",
  },
  {
    nameDe: "Roter Pepp (Alkoholfrei)", nameEn: "Roter Pepp (Non-Alcoholic)", price: "€7,00",
    ingredientsDe: ["8cl Cranberrysaft", "4cl Himbeersaft", "Sprite", "Eiswürfel", "Limettenscheibe"],
    ingredientsEn: ["8cl cranberry juice", "4cl raspberry juice", "Sprite", "Ice cubes", "Lime slice"],
    preparationDe: "Cranberry- und Himbeersaft mit Eis ins Glas, mit Sprite auffüllen. Mit Limettenscheibe garnieren.",
    preparationEn: "Pour cranberry and raspberry juice with ice, top with Sprite. Garnish with lime slice.",
    emoji: "🍓",
  },
  {
    nameDe: "Piña Colada (Alkoholfrei)", nameEn: "Piña Colada (Non-Alcoholic)", price: "€7,00",
    ingredientsDe: ["12cl Ananassaft", "4cl Kokosmilch", "Crushed Ice", "Ananasscheibe"],
    ingredientsEn: ["12cl pineapple juice", "4cl coconut milk", "Crushed ice", "Pineapple slice"],
    preparationDe: "Ananassaft und Kokosmilch mit Crushed Ice cremig mixen. In ein gekühltes Glas gießen, mit Ananasscheibe garnieren.",
    preparationEn: "Blend pineapple juice and coconut milk with crushed ice until creamy. Pour into chilled glass, garnish with pineapple slice.",
    emoji: "🥥",
  },
];

// ─── MENU DATA ────────────────────────────────────────────────────────────────
interface MenuItem { name: string; size?: string; price: string; note?: string; }
interface MenuSection { titleDe: string; titleEn: string; items: MenuItem[]; note?: string; bgImage: string; }

const MENU_SECTIONS: MenuSection[] = [
  {
    titleDe: "Kaffee & Heiße Getränke", titleEn: "Coffee & Hot Drinks",
    bgImage: BG.coffee,
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
    titleDe: "Tee", titleEn: "Tea",
    bgImage: BG.tea,
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
    titleDe: "Zapfbier vom Fass", titleEn: "Fresh Draft Beer",
    bgImage: BG.beer,
    items: [
      { name: "Veltins", size: "0,2l", price: "€2,00" },
      { name: "Veltins", size: "0,3l", price: "€2,70" },
      { name: "Veltins", size: "0,5l", price: "€4,50" },
      { name: "Früh Kölsch", size: "0,2l", price: "€2,00" },
      { name: "Früh Kölsch", size: "0,3l", price: "€2,70" },
      { name: "Früh Kölsch", size: "0,4l", price: "€3,60" },
    ],
    note: "🏆 Günstigstes Bier in Solingen · Remscheid · Wuppertal",
  },
  {
    titleDe: "Flaschenbier", titleEn: "Bottled Beer",
    bgImage: BG.bottledBeer,
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
    titleDe: "Kaltgetränke", titleEn: "Cold Drinks",
    bgImage: BG.coldDrinks,
    items: [
      { name: "Coca Cola / Zero", size: "0,33l", price: "€3,00" },
      { name: "Fanta / Sprite / Spezi", size: "0,33l", price: "€3,00" },
      { name: "Lemon / Orange / Mojito Soda", size: "0,33l", price: "€3,00" },
      { name: "Apfelschorle", size: "0,33l", price: "€3,00" },
      { name: "Eistee Pfirsich / Zitrone", size: "0,5l", price: "€3,00" },
      { name: "Schweppes Bitter Lemon", size: "0,25l", price: "€2,50" },
      { name: "Red Bull", size: "0,33l", price: "€3,50" },
      { name: "Orangensaft / Apfelsaft", size: "0,25l", price: "€2,50" },
      { name: "Wasser still / sprudel", size: "0,2l", price: "€2,00" },
    ],
  },
  {
    titleDe: "Hausgemachte Limonade", titleEn: "Homemade Lemonade",
    bgImage: BG.lemonade,
    items: [
      { name: "Mango", size: "0,5l", price: "€4,20" },
      { name: "Himbeere", size: "0,5l", price: "€4,20" },
      { name: "Erdbeere", size: "0,5l", price: "€4,20" },
      { name: "Minze", size: "0,5l", price: "€4,20" },
      { name: "Granatapfel", size: "0,5l", price: "€4,20" },
    ],
  },
  {
    titleDe: "Spirituosen", titleEn: "Spirits",
    bgImage: BG.spirits,
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
    titleDe: "Long Drinks", titleEn: "Long Drinks",
    bgImage: BG.longdrinks,
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
    titleDe: "Aperitif", titleEn: "Aperitif",
    bgImage: BG.aperitif,
    items: [
      { name: "Campari", size: "5cl", price: "€4,50" },
      { name: "Campari Orange", size: "0,2l", price: "€5,00" },
      { name: "Campari Soda", size: "0,2l", price: "€5,00" },
      { name: "Hugo", size: "0,2l", price: "€4,00" },
      { name: "Campari Spritz", size: "0,2l", price: "€6,00" },
    ],
  },
  {
    titleDe: "Wein & Sekt", titleEn: "Wine & Sparkling",
    bgImage: BG.wine,
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
    titleDe: "Eis & Desserts", titleEn: "Ice Cream & Desserts",
    bgImage: BG.icecream,
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
type PageContent =
  | { type: "cover" }
  | { type: "back" }
  | { type: "section"; idx: number }
  | { type: "cocktails"; start: number; end: number }
  | { type: "nonalco" };

function buildPages(): PageContent[] {
  const pages: PageContent[] = [{ type: "cover" }];
  MENU_SECTIONS.forEach((_, i) => pages.push({ type: "section", idx: i }));
  for (let i = 0; i < COCKTAILS.length; i += 3) {
    pages.push({ type: "cocktails", start: i, end: Math.min(i + 3, COCKTAILS.length) });
  }
  pages.push({ type: "nonalco" });
  pages.push({ type: "back" });
  return pages;
}

const ALL_PAGES = buildPages();

// ─── INLINE STYLES ────────────────────────────────────────────────────────────
const fontSerif = "'Cormorant Garamond', Georgia, serif";
const fontSans = "'Source Sans 3', sans-serif";

// ─── PAGE CONTENT COMPONENTS ─────────────────────────────────────────────────

function PageBrand({ dark = false }: { dark?: boolean }) {
  return (
    <div style={{ position: "absolute", top: 10, right: 12, textAlign: "right", lineHeight: 1.1, zIndex: 10 }}>
      <div style={{ fontFamily: fontSerif, fontSize: "0.55rem", color: dark ? "rgba(212,175,55,0.9)" : "#8b1a1a", letterSpacing: "0.08em", fontWeight: 600 }}>
        Cafe&amp;Bar
      </div>
      <div style={{ fontFamily: fontSerif, fontSize: "0.72rem", color: dark ? "#d4af37" : "#1a0a00", letterSpacing: "0.12em", fontWeight: 700 }}>
        LUXOR
      </div>
    </div>
  );
}

function CoverContent({ onOpen }: { onOpen: () => void }) {
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
      <div style={{
        position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.6)", color: "rgba(212,175,55,0.95)",
        fontFamily: fontSans, fontSize: "0.65rem", letterSpacing: "0.18em",
        padding: "7px 18px", border: "1px solid rgba(212,175,55,0.4)", whiteSpace: "nowrap",
        pointerEvents: "none",
        animation: "pulse-hint 2s ease-in-out infinite",
      }}>
        ▶ Aufschlagen / Open
      </div>
    </div>
  );
}

function BackContent() {
  return (
    <div style={{ width: "100%", height: "100%", background: "#1a0a00", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 10 }}>
      <div style={{ fontFamily: fontSerif, fontSize: "1.6rem", color: "#d4af37", letterSpacing: "0.2em" }}>LUXOR</div>
      <div style={{ width: 40, height: 1, background: "rgba(212,175,55,0.5)" }} />
      <div style={{ fontFamily: fontSans, fontSize: "0.65rem", color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.8, letterSpacing: "0.05em" }}>
        Ohligser Markt 5<br />42696 Solingen<br />
        <span style={{ color: "rgba(212,175,55,0.8)" }}>stoyansarakostov73@gmail.com</span>
      </div>
      <div style={{ marginTop: 8, fontFamily: fontSans, fontSize: "0.55rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
        Mo–Sa 09:00–21:00 · So 10:00–20:00
      </div>
    </div>
  );
}

function SectionContent({ section, lang, pageNum }: { section: MenuSection; lang: string; pageNum: number }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${section.bgImage})`,
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
      {/* Cream overlay so text is readable */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(250,248,243,0.91)" }} />
      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #8b1a1a, #c0392b, #8b1a1a)", zIndex: 5 }} />
      <PageBrand />
      <div style={{ position: "relative", zIndex: 2, padding: "clamp(10px,2vw,18px)", paddingTop: "clamp(14px,2.5vw,22px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 8, paddingRight: 60 }}>
          <div style={{ fontFamily: fontSerif, fontSize: "clamp(0.75rem,2vw,1rem)", fontWeight: 700, color: "#1a0a00", letterSpacing: "0.04em", marginBottom: 4 }}>
            {lang === "de" ? section.titleDe : section.titleEn}
          </div>
          <div style={{ width: 40, height: 2, background: "#8b1a1a", marginBottom: 10 }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
          {section.items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(139,26,26,0.1)", paddingBottom: 3, paddingTop: 1 }}>
              <div style={{ display: "flex", gap: 4, alignItems: "baseline" }}>
                <span style={{ fontFamily: fontSans, fontSize: "clamp(0.55rem,1.4vw,0.75rem)", color: "#2a1a0a" }}>{item.name}</span>
                {item.size && <span style={{ fontFamily: fontSans, fontSize: "clamp(0.45rem,1.1vw,0.6rem)", color: "#8a7060" }}>{item.size}</span>}
              </div>
              <span style={{ fontFamily: fontSerif, fontSize: "clamp(0.6rem,1.5vw,0.8rem)", color: "#8b1a1a", fontWeight: 700, whiteSpace: "nowrap", marginLeft: 4 }}>{item.price}</span>
            </div>
          ))}
          {section.note && (
            <div style={{ marginTop: 6, padding: "4px 8px", background: "rgba(139,26,26,0.06)", border: "1px solid rgba(139,26,26,0.15)", fontFamily: fontSans, fontSize: "clamp(0.45rem,1.1vw,0.55rem)", color: "#6a4a3a", lineHeight: 1.4 }}>
              {section.note}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 6, fontFamily: fontSerif, fontSize: "clamp(0.45rem,1.1vw,0.55rem)", color: "rgba(139,26,26,0.4)", letterSpacing: "0.1em" }}>
          — {pageNum} —
        </div>
      </div>
    </div>
  );
}

function CocktailsContent({ cocktails, lang, pageNum }: { cocktails: CocktailRecipe[]; lang: string; pageNum: number }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${BG.cocktail})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(250,248,243,0.90)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #8b1a1a, #c0392b, #8b1a1a)", zIndex: 5 }} />
      <PageBrand />
      <div style={{ position: "relative", zIndex: 2, padding: "clamp(10px,2vw,18px)", paddingTop: "clamp(14px,2.5vw,22px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 8, paddingRight: 60 }}>
          <div style={{ fontFamily: fontSerif, fontSize: "clamp(0.75rem,2vw,1rem)", fontWeight: 700, color: "#1a0a00", letterSpacing: "0.04em", marginBottom: 4 }}>
            {lang === "de" ? "Cocktails" : "Cocktails"}
          </div>
          <div style={{ width: 40, height: 2, background: "#8b1a1a", marginBottom: 10 }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {cocktails.map((c, i) => (
            <div key={i} style={{ borderBottom: i < cocktails.length - 1 ? "1px solid rgba(139,26,26,0.12)" : "none", paddingBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "clamp(0.7rem,1.8vw,0.9rem)" }}>{c.emoji}</span>
                  <span style={{ fontFamily: fontSerif, fontSize: "clamp(0.65rem,1.7vw,0.9rem)", fontWeight: 700, color: "#1a0a00" }}>
                    {lang === "de" ? c.nameDe : c.nameEn}
                  </span>
                </div>
                <span style={{ fontFamily: fontSerif, fontSize: "clamp(0.6rem,1.5vw,0.8rem)", color: "#8b1a1a", fontWeight: 700, whiteSpace: "nowrap", marginLeft: 4 }}>{c.price}</span>
              </div>
              <div style={{ fontFamily: fontSans, fontSize: "clamp(0.45rem,1.1vw,0.58rem)", color: "#5a3a2a", lineHeight: 1.4, marginBottom: 2 }}>
                {(lang === "de" ? c.ingredientsDe : c.ingredientsEn).join(" · ")}
              </div>
              <div style={{ fontFamily: fontSans, fontSize: "clamp(0.42rem,1.05vw,0.55rem)", color: "#7a5a4a", lineHeight: 1.4, fontStyle: "italic" }}>
                {lang === "de" ? c.preparationDe : c.preparationEn}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 6, fontFamily: fontSerif, fontSize: "clamp(0.45rem,1.1vw,0.55rem)", color: "rgba(139,26,26,0.4)", letterSpacing: "0.1em" }}>
          — {pageNum} —
        </div>
      </div>
    </div>
  );
}

function NonAlcoContent({ lang, pageNum }: { lang: string; pageNum: number }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${BG.sunrise})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(250,248,243,0.90)" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, #8b1a1a, #c0392b, #8b1a1a)", zIndex: 5 }} />
      <PageBrand />
      <div style={{ position: "relative", zIndex: 2, padding: "clamp(10px,2vw,18px)", paddingTop: "clamp(14px,2.5vw,22px)", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 8, paddingRight: 60 }}>
          <div style={{ fontFamily: fontSerif, fontSize: "clamp(0.75rem,2vw,1rem)", fontWeight: 700, color: "#1a0a00", letterSpacing: "0.04em", marginBottom: 4 }}>
            {lang === "de" ? "Alkoholfreie Cocktails" : "Non-Alcoholic Cocktails"}
          </div>
          <div style={{ width: 40, height: 2, background: "#8b1a1a", marginBottom: 10 }} />
        </div>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {NONALCO_COCKTAILS.map((c, i) => (
            <div key={i} style={{ borderBottom: i < NONALCO_COCKTAILS.length - 1 ? "1px solid rgba(139,26,26,0.12)" : "none", paddingBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "clamp(0.7rem,1.8vw,0.9rem)" }}>{c.emoji}</span>
                  <span style={{ fontFamily: fontSerif, fontSize: "clamp(0.65rem,1.7vw,0.9rem)", fontWeight: 700, color: "#1a0a00" }}>
                    {lang === "de" ? c.nameDe : c.nameEn}
                  </span>
                </div>
                <span style={{ fontFamily: fontSerif, fontSize: "clamp(0.6rem,1.5vw,0.8rem)", color: "#8b1a1a", fontWeight: 700, whiteSpace: "nowrap", marginLeft: 4 }}>{c.price}</span>
              </div>
              <div style={{ fontFamily: fontSans, fontSize: "clamp(0.45rem,1.1vw,0.58rem)", color: "#5a3a2a", lineHeight: 1.4, marginBottom: 2 }}>
                {(lang === "de" ? c.ingredientsDe : c.ingredientsEn).join(" · ")}
              </div>
              <div style={{ fontFamily: fontSans, fontSize: "clamp(0.42rem,1.05vw,0.55rem)", color: "#7a5a4a", lineHeight: 1.4, fontStyle: "italic" }}>
                {lang === "de" ? c.preparationDe : c.preparationEn}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 6, fontFamily: fontSerif, fontSize: "clamp(0.45rem,1.1vw,0.55rem)", color: "rgba(139,26,26,0.4)", letterSpacing: "0.1em" }}>
          — {pageNum} —
        </div>
      </div>
    </div>
  );
}

function RenderPageContent({ page, lang, pageNum, onOpen }: { page: PageContent; lang: string; pageNum: number; onOpen?: () => void }) {
  if (page.type === "cover") return <CoverContent onOpen={onOpen ?? (() => {})} />;
  if (page.type === "back") return <BackContent />;
  if (page.type === "section") return <SectionContent section={MENU_SECTIONS[page.idx]} lang={lang} pageNum={pageNum} />;
  if (page.type === "cocktails") return <CocktailsContent cocktails={COCKTAILS.slice(page.start, page.end)} lang={lang} pageNum={pageNum} />;
  if (page.type === "nonalco") return <NonAlcoContent lang={lang} pageNum={pageNum} />;
  return null;
}

// ─── TRUE 3D FLIP BOOK ────────────────────────────────────────────────────────
// Architecture:
//   - Closed state: single cover page shown
//   - Open state: dual-page spread (left + right)
//   - Flip: a "flipping leaf" div rotates from 0° → -180° (forward) or -180° → 0° (backward)
//     using CSS rotateY with backface-visibility:hidden so front/back faces show correctly
//   - The flipping leaf sits on top of the spread during animation

export default function Menu() {
  const { lang } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  // currentSpread: index of the left page in the open spread (always odd, 1-based)
  // spread 0 = pages[1]+pages[2], spread 1 = pages[3]+pages[4], etc.
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [flipping, setFlipping] = useState<"forward" | "backward" | null>(null);
  const [flipAngle, setFlipAngle] = useState(0); // 0 = not flipping
  const flipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const totalSpreads = Math.floor((ALL_PAGES.length - 1) / 2); // excluding cover

  // Pages shown in the current spread
  const leftPageIdx = 1 + spreadIndex * 2;
  const rightPageIdx = leftPageIdx + 1;
  const leftPage = ALL_PAGES[leftPageIdx] ?? ALL_PAGES[ALL_PAGES.length - 1];
  const rightPage = ALL_PAGES[rightPageIdx] ?? ALL_PAGES[ALL_PAGES.length - 1];

  // Pages for the flip animation:
  // Forward flip: right page peels away → reveals next spread's left page on back
  // Backward flip: left page peels away → reveals previous spread's right page on back
  const nextLeftPageIdx = leftPageIdx + 2;
  const nextRightPageIdx = rightPageIdx + 2;
  const prevLeftPageIdx = leftPageIdx - 2;
  const prevRightPageIdx = rightPageIdx - 2;

  const nextLeftPage = ALL_PAGES[nextLeftPageIdx] ?? ALL_PAGES[ALL_PAGES.length - 1];
  const nextRightPage = ALL_PAGES[nextRightPageIdx] ?? ALL_PAGES[ALL_PAGES.length - 1];
  const prevLeftPage = ALL_PAGES[prevLeftPageIdx] ?? ALL_PAGES[ALL_PAGES.length - 1];
  const prevRightPage = ALL_PAGES[prevRightPageIdx] ?? ALL_PAGES[ALL_PAGES.length - 1];

  const canGoForward = isOpen && spreadIndex < totalSpreads - 1 && !flipping;
  const canGoBackward = isOpen && !flipping;

  const startFlip = useCallback((dir: "forward" | "backward") => {
    if (flipping) return;
    setFlipping(dir);
    // Animate angle from 0 → -180 (forward) or 0 → 180 (backward)
    // We use CSS transition on the element directly via state
    setFlipAngle(0);
    // Small delay so initial state renders before transition starts
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlipAngle(dir === "forward" ? -180 : 180);
      });
    });

    // After animation completes, update spread
    flipTimerRef.current = setTimeout(() => {
      if (dir === "forward") {
        setSpreadIndex(i => i + 1);
      } else {
        if (spreadIndex <= 0) {
          // Close the book
          setIsOpen(false);
          setSpreadIndex(0);
        } else {
          setSpreadIndex(i => i - 1);
        }
      }
      setFlipping(null);
      setFlipAngle(0);
    }, 750);
  }, [flipping, spreadIndex]);

  useEffect(() => {
    return () => {
      if (flipTimerRef.current) clearTimeout(flipTimerRef.current);
    };
  }, []);

  const openBook = () => {
    if (isOpen) return;
    setIsOpen(true);
    setSpreadIndex(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50 && canGoForward) startFlip("forward");
    else if (dx > 50 && canGoBackward) startFlip("backward");
    touchStartX.current = null;
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0000", paddingTop: 80 }}>
      {/* Keyframe for hint pulse */}
      <style>{`
        @keyframes pulse-hint {
          0%, 100% { opacity: 0.85; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.04); }
        }
        @keyframes book-open-cover {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-180deg); }
        }
      `}</style>

      {/* Page header */}
      <div style={{ textAlign: "center", padding: "32px 16px 20px" }}>
        <div style={{ fontFamily: fontSans, fontSize: "0.7rem", color: "rgba(220,80,80,0.8)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 8 }}>
          — {lang === "de" ? "Unsere" : "Our"} —
        </div>
        <h1 style={{ fontFamily: fontSerif, fontSize: "clamp(2rem,6vw,3.5rem)", color: "#fff", fontWeight: 700, letterSpacing: "0.1em", margin: 0 }}>
          {lang === "de" ? "Speisekarte" : "Menu"}
        </h1>
        <div style={{ width: 60, height: 2, background: "rgba(220,80,80,0.6)", margin: "12px auto 0" }} />
        <p style={{ fontFamily: fontSans, fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: 12, letterSpacing: "0.05em" }}>
          {isOpen
            ? (lang === "de" ? "Klicken Sie auf die Seite oder wischen Sie zum Blättern" : "Click a page or swipe to turn pages")
            : (lang === "de" ? "Klicken Sie auf das Cover, um die Karte zu öffnen" : "Click the cover to open the menu")}
        </p>
      </div>

      {/* Book wrapper */}
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "0 12px 60px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div style={{ position: "relative", width: "min(900px, 100%)", maxWidth: 900 }}>
          {/* Book shadow */}
          <div style={{
            position: "absolute", bottom: -20, left: "5%", right: "5%", height: 32,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)",
            filter: "blur(16px)", zIndex: 0,
          }} />

          {/* ── CLOSED STATE ── */}
          {!isOpen && (
            <div
              style={{
                position: "relative", width: "min(380px, 52%)", margin: "0 auto",
                aspectRatio: "2/3", zIndex: 1,
                boxShadow: "10px 10px 50px rgba(0,0,0,0.85), -3px 0 10px rgba(0,0,0,0.5)",
                borderRadius: "2px 5px 5px 2px", overflow: "hidden", cursor: "pointer",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.025) rotateY(-5deg)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "16px 16px 60px rgba(0,0,0,0.95), -3px 0 10px rgba(0,0,0,0.6)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1) rotateY(0deg)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "10px 10px 50px rgba(0,0,0,0.85), -3px 0 10px rgba(0,0,0,0.5)";
              }}
            >
              <CoverContent onOpen={openBook} />
            </div>
          )}

          {/* ── OPEN STATE ── */}
          {isOpen && (
            <div style={{ position: "relative", width: "100%", zIndex: 1 }}>
              {/* 3D perspective container */}
              <div style={{
                position: "relative", width: "100%", aspectRatio: "2/1.4",
                display: "flex", perspective: "2000px", perspectiveOrigin: "50% 50%",
              }}>
                {/* ── LEFT PAGE ── */}
                <div
                  onClick={() => canGoBackward && startFlip("backward")}
                  style={{
                    flex: 1, position: "relative",
                    cursor: canGoBackward ? "pointer" : "default",
                    boxShadow: "inset -8px 0 20px rgba(0,0,0,0.3)",
                    borderRadius: "4px 0 0 4px", overflow: "hidden",
                    border: "1px solid rgba(139,26,26,0.2)", borderRight: "none",
                  }}
                >
                  {/* Show next-spread left page behind during forward flip */}
                  {flipping === "forward" ? (
                    <RenderPageContent page={nextLeftPage} lang={lang} pageNum={nextLeftPageIdx} />
                  ) : (
                    <RenderPageContent page={leftPage} lang={lang} pageNum={leftPageIdx} />
                  )}
                  {/* Back arrow */}
                  {canGoBackward && !flipping && (
                    <div style={{
                      position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(139,26,26,0.18)", borderRadius: "50%",
                      color: "#8b1a1a", fontSize: "1.2rem", opacity: 0.7, pointerEvents: "none",
                      transition: "opacity 0.2s",
                    }}>‹</div>
                  )}
                </div>

                {/* ── BOOK SPINE ── */}
                <div style={{
                  width: "clamp(8px,1.8vw,14px)",
                  background: "linear-gradient(to right, #2a1a0a, #5a3a1a, #2a1a0a)",
                  boxShadow: "0 0 12px rgba(0,0,0,0.7)", flexShrink: 0, zIndex: 10,
                }} />

                {/* ── RIGHT PAGE ── */}
                <div
                  onClick={() => canGoForward && startFlip("forward")}
                  style={{
                    flex: 1, position: "relative",
                    cursor: canGoForward ? "pointer" : "default",
                    boxShadow: "inset 8px 0 20px rgba(0,0,0,0.3)",
                    borderRadius: "0 4px 4px 0", overflow: "hidden",
                    border: "1px solid rgba(139,26,26,0.2)", borderLeft: "none",
                  }}
                >
                  {/* Show next-spread right page behind during backward flip */}
                  {flipping === "backward" ? (
                    <RenderPageContent page={prevRightPage} lang={lang} pageNum={prevRightPageIdx} />
                  ) : (
                    <RenderPageContent page={rightPage} lang={lang} pageNum={rightPageIdx} />
                  )}
                  {/* Forward arrow */}
                  {canGoForward && !flipping && (
                    <div style={{
                      position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                      width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(139,26,26,0.18)", borderRadius: "50%",
                      color: "#8b1a1a", fontSize: "1.2rem", opacity: 0.7, pointerEvents: "none",
                    }}>›</div>
                  )}
                </div>

                {/* ── FLIPPING LEAF (the actual 3D page turn) ── */}
                {flipping && (
                  <div style={{
                    position: "absolute",
                    top: 0, bottom: 0,
                    // Forward: leaf starts on right half, flips left
                    // Backward: leaf starts on left half, flips right
                    left: flipping === "forward" ? "50%" : 0,
                    right: flipping === "forward" ? 0 : "50%",
                    transformOrigin: flipping === "forward" ? "left center" : "right center",
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${flipAngle}deg)`,
                    transition: "transform 0.75s cubic-bezier(0.645, 0.045, 0.355, 1.000)",
                    zIndex: 20,
                    pointerEvents: "none",
                  }}>
                    {/* FRONT face of the flipping leaf */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      overflow: "hidden",
                      boxShadow: flipping === "forward"
                        ? "-4px 0 20px rgba(0,0,0,0.4)"
                        : "4px 0 20px rgba(0,0,0,0.4)",
                    }}>
                      {flipping === "forward"
                        ? <RenderPageContent page={rightPage} lang={lang} pageNum={rightPageIdx} />
                        : <RenderPageContent page={leftPage} lang={lang} pageNum={leftPageIdx} />
                      }
                    </div>
                    {/* BACK face of the flipping leaf (shown when rotated past 90°) */}
                    <div style={{
                      position: "absolute", inset: 0,
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      overflow: "hidden",
                      boxShadow: flipping === "forward"
                        ? "4px 0 20px rgba(0,0,0,0.4)"
                        : "-4px 0 20px rgba(0,0,0,0.4)",
                    }}>
                      {flipping === "forward"
                        ? <RenderPageContent page={nextRightPage} lang={lang} pageNum={nextRightPageIdx} />
                        : <RenderPageContent page={prevLeftPage} lang={lang} pageNum={prevLeftPageIdx} />
                      }
                    </div>
                  </div>
                )}
              </div>

              {/* Page indicator dots */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 18 }}>
                {Array.from({ length: totalSpreads }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (flipping || i === spreadIndex) return;
                      const dir = i > spreadIndex ? "forward" : "backward";
                      // Jump directly for multi-step navigation
                      setSpreadIndex(i);
                    }}
                    style={{
                      width: i === spreadIndex ? 22 : 7,
                      height: 7, borderRadius: 3.5,
                      background: i === spreadIndex ? "rgba(220,80,80,0.9)" : "rgba(255,255,255,0.2)",
                      border: "none", cursor: "pointer",
                      transition: "all 0.3s ease", padding: 0,
                    }}
                  />
                ))}
              </div>

              {/* Close button */}
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button
                  onClick={() => { setIsOpen(false); setSpreadIndex(0); setFlipping(null); }}
                  style={{
                    fontFamily: fontSans, fontSize: "0.6rem", color: "rgba(255,255,255,0.35)",
                    background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em", padding: "4px 8px",
                  }}
                >
                  ✕ {lang === "de" ? "Karte schließen" : "Close menu"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment info */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 48px", textAlign: "center" }}>
        <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(220,80,80,0.15)", borderRadius: 4 }}>
          <div style={{ fontFamily: fontSerif, fontSize: "0.8rem", color: "rgba(220,80,80,0.8)", marginBottom: 8, letterSpacing: "0.1em" }}>
            {lang === "de" ? "Zahlungsmethoden" : "Payment Methods"}
          </div>
          <div style={{ fontFamily: fontSans, fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
            {lang === "de"
              ? "Bar · Visa · Mastercard · Maestro · V Pay · American Express · Google Pay · Apple Pay · Kontaktlos"
              : "Cash · Visa · Mastercard · Maestro · V Pay · American Express · Google Pay · Apple Pay · Contactless"}
          </div>
        </div>
      </div>
    </div>
  );
}
