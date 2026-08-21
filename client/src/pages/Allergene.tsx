import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const EN_ALLERGENS: Record<number, { name: string; detail: string }> = {
  1: { name: "Cereals containing gluten", detail: "Wheat, rye, barley, oats, spelt, kamut and products made from them" },
  2: { name: "Fish", detail: "Fish and products made from fish" },
  3: { name: "Crustaceans", detail: "Crustaceans and products made from them" },
  4: { name: "Sulphur dioxide and sulphites", detail: "In concentrations exceeding 10 mg/kg or 10 mg/l, expressed as SO₂" },
  5: { name: "Celery", detail: "Celery and products made from celery" },
  6: { name: "Milk and lactose", detail: "Milk and products made from milk, including lactose" },
  7: { name: "Sesame seeds", detail: "Sesame seeds and products made from them" },
  8: { name: "Nuts", detail: "Almonds, hazelnuts, walnuts, cashews, pecans, Brazil nuts, pistachios, macadamias and products made from them" },
  9: { name: "Eggs", detail: "Eggs and products made from eggs" },
  10: { name: "Lupin", detail: "Lupin and products made from lupin" },
  11: { name: "Mustard", detail: "Mustard and products made from mustard" },
  12: { name: "Soy", detail: "Soy and products made from soy" },
  13: { name: "Molluscs", detail: "Molluscs and products made from them" },
  14: { name: "Peanuts", detail: "Peanuts and products made from peanuts" },
};

const EN_CATEGORY_NAMES: Record<string, string> = {
  "KAFFEE": "COFFEE", "TEE": "TEA", "KALTGETRÄNKE": "COLD DRINKS", "HAUSGEMACHTE LIMONADE": "HOMEMADE LEMONADE",
  "ZAPFENBIER (vom Fass)": "DRAFT BEER", "FLASCHENBIER": "BOTTLED BEER", "COCKTAILS (mit Alkohol)": "COCKTAILS (with alcohol)",
  "ALKOHOLFREIE COCKTAILS": "NON-ALCOHOLIC COCKTAILS", "SHOTS / ALKOHOL (2 cl)": "SHOTS / SPIRITS (2 cl)",
  "LONG DRINKS": "LONG DRINKS", "WHISKEY (4 cl)": "WHISKEY (4 cl)", "APERITIF": "APERITIFS", "WEIN & SEKT": "WINE & SPARKLING WINE", "EIS": "ICE CREAM",
};

const EN_ITEM_NAMES: Record<string, string> = {
  "Milchkaffee": "Café au lait", "Kaffee Crema": "Caffè crema", "Doppelter Espresso": "Double espresso", "Cappuccino klein": "Small cappuccino", "Eiskaffee": "Iced coffee", "Frappe weiss": "White frappé", "Frappe schwarz": "Black frappé", "Kakao": "Hot chocolate", "Kakao mit Sahne": "Hot chocolate with whipped cream",
  "Grüner Tee": "Green tea", "Schwarzer Tee": "Black tea", "Pfefferminztee": "Peppermint tea", "Früchtetee": "Fruit tea", "Kamillentee": "Chamomile tea", "Frische Minze Tee": "Fresh mint tea", "Vanille Tee": "Vanilla tea", "Kräuter Tee": "Herbal tea", "Zitronen/Limone Tee": "Lemon/lime tea", "Waldbeere Tee": "Wild berry tea",
  "Apfelschorle": "Apple spritzer", "Eistee Pfirsich / Zitrone": "Iced tea peach / lemon", "Orangensaft": "Orange juice", "Apfelsaft": "Apple juice", "Multivitaminsaft": "Multivitamin juice", "Wasser still": "Still water", "Wasser sprudelnd": "Sparkling water", "Eischokolade": "Iced chocolate", "Milchshake (Erdbeere / Vanille / Schokolade)": "Milkshake (strawberry / vanilla / chocolate)",
  "Himbeere": "Raspberry", "Erdbeere": "Strawberry", "Minze": "Mint", "Granatapfel": "Pomegranate", "Zapfenbier (vom Fass)": "Draft beer", "Veltins (0,2 l / 0,3 l / 0,5 l)": "Veltins (0.2 l / 0.3 l / 0.5 l)", "Früh Kölsch (0,2 l / 0,3 l / 0,5 l)": "Früh beer (draft, 0.2 l / 0.3 l / 0.5 l)", "Früh Kölsch (Flasche)": "Früh beer (bottle)", "Krombacher Radler": "Krombacher shandy", "Krombacher Alkoholfrei": "Krombacher non-alcoholic", "Maisels Weizen Original": "Maisel's wheat beer original", "Maisels Weizen Alkoholfrei": "Maisel's wheat beer non-alcoholic", "Pina Colada Alkoholfrei": "Pina Colada non-alcoholic", "Roter Pepp": "Red Pepp", "Pfirsichlikör": "Peach liqueur", "Pfefferminz": "Peppermint", "Waldmeister": "Woodruff", "Rotwein (0,2 l)": "Red wine (0.2 l)", "Weisswein (0,2 l)": "White wine (0.2 l)", "Rosé Wein (0,2 l)": "Rosé wine (0.2 l)", "Prosecco (0,2 l)": "Prosecco (0.2 l)", "Sekt (0,2 l)": "Sparkling wine (0.2 l)", "Flasche Wein (0,75 l)": "Bottle of wine (0.75 l)", "Glühwein Winter (0,2 l)": "Mulled wine (winter, 0.2 l)", "Eiskugeln (Vanille / Erdbeere / Schokolade)": "Ice-cream scoops (vanilla / strawberry / chocolate)",
};

const EN_ADDITIVES: Record<string, string> = {
  "geschwefelt": "sulphited", "coffeinhaltig": "contains caffeine", "chininhaltig": "contains quinine", "mit Farbstoff": "with colour(s)", "mit Süßungsmittel(n)": "with sweetener(s)", "coffeinhaltig (Red Bull)": "contains caffeine (Red Bull)",
};

const allergens = [
  {
    num: 1, letter: "A",
    name: "Glutenhaltiges Getreide",
    detail: "Weizen, Roggen, Gerste, Hafer, Dinkel, Kamut und daraus hergestellte Erzeugnisse",
  },
  {
    num: 2, letter: "B",
    name: "Fisch",
    detail: "Fisch und daraus hergestellte Erzeugnisse",
  },
  {
    num: 3, letter: "C",
    name: "Krebstiere",
    detail: "Krebstiere und daraus hergestellte Erzeugnisse",
  },
  {
    num: 4, letter: "D",
    name: "Schwefeldioxid und Sulfite",
    detail: "In Konzentrationen von mehr als 10 mg/kg oder 10 mg/l als SO₂ angegeben",
  },
  {
    num: 5, letter: "E",
    name: "Sellerie",
    detail: "Sellerie und daraus hergestellte Erzeugnisse",
  },
  {
    num: 6, letter: "F",
    name: "Milch und Laktose",
    detail: "Milch und daraus hergestellte Erzeugnisse (einschließlich Laktose)",
  },
  {
    num: 7, letter: "G",
    name: "Sesamsamen",
    detail: "Sesamsamen und daraus hergestellte Erzeugnisse",
  },
  {
    num: 8, letter: "H",
    name: "Nüsse",
    detail: "Mandel, Haselnuss, Walnuss, Cashew, Pekannuss, Paranuss, Pistazie, Macadamia und daraus hergestellte Erzeugnisse",
  },
  {
    num: 9, letter: "I",
    name: "Eier",
    detail: "Eier und daraus hergestellte Erzeugnisse",
  },
  {
    num: 10, letter: "J",
    name: "Lupinen",
    detail: "Lupinen und daraus hergestellte Erzeugnisse",
  },
  {
    num: 11, letter: "K",
    name: "Senf",
    detail: "Senf und daraus hergestellte Erzeugnisse",
  },
  {
    num: 12, letter: "L",
    name: "Soja",
    detail: "Soja und daraus hergestellte Erzeugnisse",
  },
  {
    num: 13, letter: "M",
    name: "Weichtiere",
    detail: "Weichtiere und daraus hergestellte Erzeugnisse",
  },
  {
    num: 14, letter: "N",
    name: "Erdnüsse",
    detail: "Erdnüsse und daraus hergestellte Erzeugnisse",
  },
];

const additives = [
  { code: "geschwefelt", desc: "mit Schwefeldioxid behandelt (Sulfite) — bei Wein, Sekt, Prosecco, Bier, Aperitif" },
  { code: "coffeinhaltig", desc: "enthält Coffein — bei Red Bull, Vodka Energy, Neon Rush, Jägermeister Energy" },
  { code: "chininhaltig", desc: "enthält Chinin — bei Schweppes Bitter Lemon, Tonic Water" },
  { code: "mit Farbstoff", desc: "enthält Farbstoffe — bei bestimmten Limonaden und Sodas" },
  { code: "mit Süßungsmittel(n)", desc: "enthält Süßungsmittel — bei Schweppes Bitter Lemon, Cola Zero, Fanta Zero" },
];

// Menu items with their allergen codes
const menuItems: { category: string; items: { name: string; codes: string[]; zusatz?: string[] }[] }[] = [
  {
    category: "KAFFEE",
    items: [
      { name: "Milchkaffee", codes: ["6/F"] },
      { name: "Kaffee Crema", codes: [] },
      { name: "Espresso", codes: [] },
      { name: "Espresso Macchiato", codes: ["6/F"] },
      { name: "Doppelter Espresso", codes: [] },
      { name: "Cappuccino", codes: ["6/F"] },
      { name: "Cappuccino klein", codes: ["6/F"] },
      { name: "Eiskaffee", codes: ["6/F"] },
      { name: "Latte Macchiato", codes: ["6/F"] },
      { name: "Frappe weiss", codes: ["6/F"] },
      { name: "Frappe schwarz", codes: [] },
      { name: "Kakao", codes: ["6/F", "12/L"] },
      { name: "Kakao mit Sahne", codes: ["6/F", "12/L"] },
    ],
  },
  {
    category: "TEE",
    items: [
      { name: "Grüner Tee", codes: [] },
      { name: "Schwarzer Tee", codes: [] },
      { name: "Pfefferminztee", codes: [] },
      { name: "Früchtetee", codes: [] },
      { name: "Kamillentee", codes: [] },
      { name: "Frische Minze Tee", codes: [] },
      { name: "Vanille Tee", codes: [] },
      { name: "Kräuter Tee", codes: [] },
      { name: "Zitronen/Limone Tee", codes: [] },
      { name: "Waldbeere Tee", codes: [] },
    ],
  },
  {
    category: "KALTGETRÄNKE",
    items: [
      { name: "Coca Cola", codes: [] },
      { name: "Coca Cola Zero", codes: [], zusatz: ["mit Süßungsmittel(n)"] },
      { name: "Fanta", codes: [], zusatz: ["mit Farbstoff"] },
      { name: "Sprite", codes: [] },
      { name: "Spezi", codes: [] },
      { name: "Lemon Soda", codes: [] },
      { name: "Orange Soda", codes: [] },
      { name: "Mojito Soda", codes: [] },
      { name: "Apfelschorle", codes: [] },
      { name: "Eistee Pfirsich / Zitrone", codes: [] },
      { name: "Schweppes Bitter Lemon", codes: [], zusatz: ["chininhaltig", "mit Süßungsmittel(n)"] },
      { name: "Red Bull", codes: [], zusatz: ["coffeinhaltig"] },
      { name: "Orangensaft", codes: [] },
      { name: "Apfelsaft", codes: [] },
      { name: "Multivitaminsaft", codes: [] },
      { name: "Wasser still", codes: [] },
      { name: "Wasser sprudelnd", codes: [] },
      { name: "Eischokolade", codes: ["6/F"] },
      { name: "Milchshake (Erdbeere / Vanille / Schokolade)", codes: ["6/F"] },
    ],
  },
  {
    category: "HAUSGEMACHTE LIMONADE",
    items: [
      { name: "Mango", codes: [] },
      { name: "Himbeere", codes: [] },
      { name: "Erdbeere", codes: [] },
      { name: "Minze", codes: [] },
      { name: "Granatapfel", codes: [] },
      { name: "Cranberry", codes: [] },
    ],
  },
  {
    category: "ZAPFENBIER (vom Fass)",
    items: [
      { name: "Veltins (0,2 l / 0,3 l / 0,5 l)", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Früh Kölsch (0,2 l / 0,3 l / 0,5 l)", codes: ["1/A"], zusatz: ["geschwefelt"] },
    ],
  },
  {
    category: "FLASCHENBIER",
    items: [
      { name: "Krombacher", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Krombacher Radler", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Krombacher Alkoholfrei", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Krombacher 0,0 %", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Heineken", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Frankenheim", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Früh Kölsch (Flasche)", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Maisels Weizen Original", codes: ["1/A"], zusatz: ["geschwefelt"] },
      { name: "Maisels Weizen Alkoholfrei", codes: ["1/A"], zusatz: ["geschwefelt"] },
    ],
  },
  {
    category: "COCKTAILS (mit Alkohol)",
    items: [
      { name: "Aperol Spritz", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Sex on the Beach", codes: [] },
      { name: "Caipirinha", codes: [] },
      { name: "Mojito", codes: [] },
      { name: "Pina Colada", codes: [] },
      { name: "Blue Lagoon", codes: [] },
      { name: "Neon Rush", codes: [], zusatz: ["coffeinhaltig (Red Bull)"] },
      { name: "Vodka Energy", codes: [], zusatz: ["coffeinhaltig (Red Bull)"] },
      { name: "Cuba Libre", codes: [] },
    ],
  },
  {
    category: "ALKOHOLFREIE COCKTAILS",
    items: [
      { name: "Pina Colada Alkoholfrei", codes: [] },
      { name: "Roter Pepp", codes: [] },
      { name: "Sunrise", codes: [] },
    ],
  },
  {
    category: "SHOTS / ALKOHOL (2 cl)",
    items: [
      { name: "Ramazzotti", codes: [] },
      { name: "Sambuca", codes: [] },
      { name: "Baileys", codes: ["6/F"] },
      { name: "Jägermeister", codes: [] },
      { name: "Martini", codes: [] },
      { name: "Grappa", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Vodka", codes: [] },
      { name: "Tequila", codes: [] },
      { name: "Rum", codes: [] },
      { name: "Gin", codes: [] },
      { name: "Amaretto", codes: ["8/H"] },
      { name: "Averna", codes: [] },
      { name: "Brandy", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Pfirsichlikör", codes: [] },
      { name: "Rakija", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Vermouth", codes: [] },
      { name: "Genever", codes: [] },
      { name: "Ouzo", codes: [] },
      { name: "Waldmeister", codes: [] },
      { name: "Pfefferminz", codes: [] },
    ],
  },
  {
    category: "LONG DRINKS",
    items: [
      { name: "Vodka Lemon", codes: [] },
      { name: "Vodka Energy", codes: [], zusatz: ["coffeinhaltig (Red Bull)"] },
      { name: "Whiskey Cola", codes: [] },
      { name: "Jägermeister Energy", codes: [], zusatz: ["coffeinhaltig (Red Bull)"] },
      { name: "Jägermeister Cola", codes: [] },
      { name: "Rum Cola", codes: [] },
      { name: "Gin Tonic", codes: [] },
    ],
  },
  {
    category: "WHISKEY (4 cl)",
    items: [
      { name: "Jack Daniel's", codes: [] },
      { name: "Johnnie Walker", codes: [] },
      { name: "Ballantine's", codes: [] },
      { name: "Jim Beam", codes: [] },
    ],
  },
  {
    category: "APERITIF",
    items: [
      { name: "Campari", codes: [] },
      { name: "Campari Orange", codes: [] },
      { name: "Campari Soda", codes: [] },
      { name: "Hugo", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Campari Spritz", codes: ["4/D"], zusatz: ["geschwefelt"] },
    ],
  },
  {
    category: "WEIN & SEKT",
    items: [
      { name: "Rotwein (0,2 l)", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Weisswein (0,2 l)", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Rosé Wein (0,2 l)", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Prosecco (0,2 l)", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Sekt (0,2 l)", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Flasche Wein (0,75 l)", codes: ["4/D"], zusatz: ["geschwefelt"] },
      { name: "Glühwein Winter (0,2 l)", codes: ["4/D"], zusatz: ["geschwefelt"] },
    ],
  },
  {
    category: "EIS",
    items: [
      { name: "Eiskugeln (Vanille / Erdbeere / Schokolade)", codes: ["6/F"] },
    ],
  },
];

export default function Allergene() {
  const { lang } = useLanguage();
  const isEnglish = lang === "en";
  const localizedAllergens = allergens.map((allergen) => isEnglish ? { ...allergen, ...EN_ALLERGENS[allergen.num] } : allergen);
  const localizedAdditives = additives.map((additive) => isEnglish
    ? { ...additive, code: EN_ADDITIVES[additive.code] ?? additive.code, desc: additive.code === "geschwefelt"
      ? "treated with sulphur dioxide (sulphites) — in wine, sparkling wine, prosecco, beer and aperitifs"
      : additive.code === "coffeinhaltig"
        ? "contains caffeine — in Red Bull, Vodka Energy, Neon Rush and Jägermeister Energy"
        : additive.code === "chininhaltig"
          ? "contains quinine — in Schweppes Bitter Lemon and tonic water"
          : additive.code === "mit Farbstoff"
            ? "contains colour(s) — in selected lemonades and sodas"
            : "contains sweetener(s) — in Schweppes Bitter Lemon, Cola Zero and Fanta Zero" }
    : additive);
  const translateItemName = (name: string) => isEnglish ? (EN_ITEM_NAMES[name] ?? name) : name;
  const translateAdditive = (label: string) => isEnglish ? (EN_ADDITIVES[label] ?? label) : label;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      {/* Hero */}
      <div className="bg-[#111] border-b border-[#8b1a1a]/30 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#8b1a1a] text-sm tracking-[0.3em] uppercase mb-3">Cafe &amp; Bar Luxor</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {isEnglish ? "Allergens & Additives" : "Allergene & Zusatzstoffe"}
          </h1>
          <div className="w-24 h-px bg-[#8b1a1a] mx-auto mb-6" />
          <p className="text-sm text-[#999]">
            {isEnglish ? "In accordance with EU Food Information Regulation (EU) No. 1169/2011" : "Gemäß EU-Lebensmittelinformationsverordnung (LMIV) Nr. 1169/2011"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">

        {/* DISCLAIMER */}
        <div className="bg-[#1a1008] border border-[#8b1a1a]/40 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-[#8b1a1a] text-xl mt-0.5">⚠</span>
            <div>
              <h2 className="text-[#c9a84c] font-bold text-lg mb-3">{isEnglish ? "Important notice" : "Wichtiger Hinweis"}</h2>
              <p className="text-[#d4c9b0] text-sm leading-relaxed">
                {isEnglish
                  ? "Allergens are declared where the named substances or products made from them are present as ingredients in the final product. Despite careful preparation, our dishes may contain traces of other substances used in the kitchen production process."
                  : "Eine Nennung von Allergenen erfolgt, wenn die bezeichneten Stoffe oder daraus hergestellte Erzeugnisse als Zutat im Endprodukt enthalten sind. Trotz sorgfältiger Herstellung unserer Gerichte können neben den gekennzeichneten Zutaten Spuren anderer Stoffe enthalten sein, die im Produktionsprozess in der Küche verwendet werden."}
              </p>
              <p className="text-[#999] text-sm mt-3">
                {isEnglish ? "For questions about allergens and intolerances, please speak to our staff. We are happy to help." : "Bei Fragen zu Allergenen und Unverträglichkeiten wenden Sie sich bitte an unser Personal. Wir helfen Ihnen gerne weiter."}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: ALLERGEN LEGEND TABLE */}
        <section>
          <h2 className="text-[#8b1a1a] text-xs tracking-[0.3em] uppercase mb-1">{isEnglish ? "Section 1" : "Abschnitt 1"}</h2>
          <h3 className="font-serif text-2xl font-bold text-white mb-6">{isEnglish ? "Allergen legend" : "Allergene — Legende"}</h3>
          <div className="overflow-x-auto rounded-lg border border-[#2a2a2a]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
                  <th className="text-left px-4 py-3 text-[#c9a84c] font-semibold w-16">{isEnglish ? "No." : "Nr."}</th>
                  <th className="text-left px-4 py-3 text-[#c9a84c] font-semibold w-12">Code</th>
                  <th className="text-left px-4 py-3 text-[#c9a84c] font-semibold">{isEnglish ? "Allergen" : "Allergen"}</th>
                  <th className="text-left px-4 py-3 text-[#c9a84c] font-semibold hidden md:table-cell">{isEnglish ? "Description" : "Beschreibung"}</th>
                </tr>
              </thead>
              <tbody>
                {localizedAllergens.map((a, i) => (
                  <tr
                    key={a.num}
                    className={`border-b border-[#1e1e1e] ${i % 2 === 0 ? "bg-[#111]" : "bg-[#0d0d0d]"}`}
                  >
                    <td className="px-4 py-3 text-[#c9a84c] font-bold">{a.num}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-[#8b1a1a] text-white text-xs font-bold px-2 py-1 rounded">
                        {a.letter}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white font-medium">{a.name}</td>
                    <td className="px-4 py-3 text-[#999] hidden md:table-cell text-xs">{a.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#666] text-xs mt-3">
            {isEnglish ? "* The description column is hidden on mobile devices. Tap an allergen for details." : "* Auf mobilen Geräten wird die Beschreibungsspalte ausgeblendet. Tippen Sie auf ein Allergen für Details."}
          </p>
        </section>

        {/* SECTION 2: ADDITIVES */}
        <section>
          <h2 className="text-[#8b1a1a] text-xs tracking-[0.3em] uppercase mb-1">{isEnglish ? "Section 2" : "Abschnitt 2"}</h2>
          <h3 className="font-serif text-2xl font-bold text-white mb-6">{isEnglish ? "Additive declarations" : "Zusatzstoffe — Kennzeichnung"}</h3>
          <p className="text-[#999] text-sm mb-4">
            {isEnglish ? "The following additives are present in our products and are declared in accordance with the Food Information Regulation. Only confirmed additives from the manufacturers’ original recipes are listed." : "Die folgenden Zusatzstoffe sind in unseren Produkten enthalten und werden gemäß LMIV gekennzeichnet. Nur bestätigte Zusatzstoffe aus den Originalrezepten der Hersteller werden aufgeführt."}
          </p>
          <div className="space-y-3">
            {localizedAdditives.map((a) => (
              <div key={a.code} className="flex items-start gap-3 bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3">
                <span className="inline-block bg-[#1a3a1a] text-[#4caf50] text-xs font-bold px-2 py-1 rounded whitespace-nowrap mt-0.5">
                  {a.code}
                </span>
                <p className="text-[#d4c9b0] text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: MENU ITEMS OVERVIEW */}
        <section>
          <h2 className="text-[#8b1a1a] text-xs tracking-[0.3em] uppercase mb-1">{isEnglish ? "Section 3" : "Abschnitt 3"}</h2>
          <h3 className="font-serif text-2xl font-bold text-white mb-2">{isEnglish ? "Menu allergen overview" : "Speisekarte — Allergenübersicht"}</h3>
          <p className="text-[#999] text-sm mb-6">
            {isEnglish ? "All menu items with their allergen and additive declarations. Codes correspond to the legend above (number/letter)." : "Alle Positionen der Speisekarte mit ihren Allergen- und Zusatzstoffkennzeichnungen. Codes entsprechen der Legende oben (Nr./Buchstabe)."}
          </p>
          <div className="space-y-8">
            {menuItems.map((cat) => (
              <div key={cat.category}>
                <h4 className="text-[#8b1a1a] font-bold text-sm tracking-widest uppercase mb-3 pb-2 border-b border-[#2a2a2a]">
                  {isEnglish ? (EN_CATEGORY_NAMES[cat.category] ?? cat.category) : cat.category}
                </h4>
                <div className="space-y-1">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-start justify-between gap-4 py-1.5 border-b border-[#1a1a1a]">
                      <span className="text-[#d4c9b0] text-sm">{translateItemName(item.name)}</span>
                      <div className="flex flex-wrap gap-1 justify-end shrink-0">
                        {item.codes.length === 0 && (!item.zusatz || item.zusatz.length === 0) && (
                          <span className="text-[#444] text-xs">—</span>
                        )}
                        {item.codes.map((code) => (
                          <span
                            key={code}
                            className="inline-block bg-[#8b1a1a] text-white text-xs font-bold px-2 py-0.5 rounded"
                          >
                            {code}
                          </span>
                        ))}
                        {item.zusatz?.map((z) => (
                          <span
                            key={z}
                            className="inline-block bg-[#1a3a1a] text-[#4caf50] text-xs px-2 py-0.5 rounded"
                          >
                            {translateAdditive(z)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LEGAL FOOTER */}
        <div className="border-t border-[#2a2a2a] pt-8 text-center">
          <p className="text-[#666] text-xs leading-relaxed max-w-2xl mx-auto mb-4">
            {isEnglish
              ? "This allergen declaration follows the requirements of EU Regulation No. 1169/2011 on food information for consumers and the German Food Information Implementation Regulation. Status: July 2026. Subject to change."
              : "Diese Allergenkennzeichnung entspricht den Anforderungen der EU-Verordnung Nr. 1169/2011 (Lebensmittelinformationsverordnung, LMIV) sowie der deutschen Lebensmittelinformations-Durchführungsverordnung (LMIDV). Stand: Juli 2026. Änderungen vorbehalten."}
          </p>
          <Link href="/speisekarte" className="inline-block text-[#8b1a1a] hover:text-[#c9a84c] text-sm transition-colors">
            {isEnglish ? "← Back to menu" : "← Zurück zur Speisekarte"}
          </Link>
        </div>
      </div>
    </div>
  );
}
