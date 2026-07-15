import { useEffect } from "react";

const allergens = [
  {
    code: "A",
    number: "1",
    name: "Glutenhaltiges Getreide",
    description:
      "Weizen, Roggen, Gerste, Hafer, Dinkel, Kamut und daraus hergestellte Erzeugnisse (Stärke, Brot, Nudeln, Panaden, Wurstwaren, Desserts).",
    sub: [
      { code: "A.1", name: "Weizen" },
      { code: "A.2", name: "Roggen" },
      { code: "A.3", name: "Gerste" },
      { code: "A.4", name: "Hafer" },
      { code: "A.5", name: "Dinkel" },
      { code: "A.6", name: "Kamut" },
    ],
  },
  {
    code: "B",
    number: "2",
    name: "Fisch",
    description:
      "Alle Süß- und Salzwasserfischarten, Kaviar, Fischextrakte, Würzpasten, Saucen.",
  },
  {
    code: "C",
    number: "3",
    name: "Krebstiere",
    description:
      "Garnelen, Hummer, Krebse, Scampi, Shrimps, Langusten und daraus gewonnene Erzeugnisse.",
  },
  {
    code: "D",
    number: "4",
    name: "Schwefeldioxide und Sulfite",
    description:
      "In Softdrinks, Bier, Wein, Essig, Trockenfrüchten und diversen Fleisch-, Fisch- und Gemüseprodukten (ab 10 mg/kg oder 10 mg/l).",
  },
  {
    code: "E",
    number: "5",
    name: "Sellerie",
    description:
      "Knolle und Staude, als Gewürz in Fertiggerichten, Dressings, Ketchup, Saucen.",
  },
  {
    code: "F",
    number: "6",
    name: "Milch und Laktose",
    description:
      "Butter, Käse, Margarine und Produkte mit Milch/Laktose (Brot, Backwaren, Wurstwaren, Pürees, Suppen, Saucen).",
  },
  {
    code: "G",
    number: "7",
    name: "Sesamsamen",
    description:
      "Im Rohzustand, als Öl oder Paste, in Gebäck, Marinaden, Dressings, Falafel, Müsli, Hummus.",
  },
  {
    code: "H",
    number: "8",
    name: "Nüsse",
    description:
      "Mandeln, Haselnüsse, Walnüsse, Cashewnüsse, Pekannüsse, Paranüsse, Pistazien, Macadamia-/Queenslandnüsse und daraus gewonnene Erzeugnisse.",
    sub: [
      { code: "H.1", name: "Mandeln" },
      { code: "H.2", name: "Haselnüsse" },
      { code: "H.3", name: "Walnüsse" },
      { code: "H.4", name: "Cashewnüsse" },
      { code: "H.5", name: "Pekannüsse" },
      { code: "H.6", name: "Paranüsse" },
      { code: "H.7", name: "Pistazien" },
      { code: "H.8", name: "Macadamia-/Queenslandnüsse" },
    ],
  },
  {
    code: "I",
    number: "9",
    name: "Eier",
    description:
      "Als Flüssigei, Lecithin oder Albumin in Mayonnaise, Panaden, Dressings, Kuchen, Suppen, Saucen, Nudeln, Glasuren.",
  },
  {
    code: "J",
    number: "10",
    name: "Lupinen",
    description:
      "Lupinensamen, Lupinenmehl, Milch, Tofu und Konzentrat in Brot, Backwaren, Nudeln, Gewürzen, Würsten, Aufstrichen, Süßspeisen.",
  },
  {
    code: "K",
    number: "11",
    name: "Senf",
    description:
      "Senfkörner, Pulver und daraus gewonnene Erzeugnisse wie Dressings, Marinaden, Currys, Wurstwaren, Aufstriche, Gewürzmischungen.",
  },
  {
    code: "L",
    number: "12",
    name: "Soja",
    description:
      "Sojabohnen und daraus gewonnene Erzeugnisse (Miso, Sojasoße, Sojaöl, Gebäck, Marinaden, Kaffeeweißer, Suppen, Saucen, Dressings).",
  },
  {
    code: "M",
    number: "13",
    name: "Weichtiere",
    description:
      "Schnecken, Tintenfisch, Austern, Muscheln und alle Erzeugnisse mit Weichtieren (Gewürzmischungen, Saucen, Salate, Pasten).",
  },
  {
    code: "N",
    number: "14",
    name: "Erdnüsse",
    description:
      "Alle Erzeugnisse aus Erdnüssen (Erdnussöl, -butter) in Gebäck, Kuchen, Desserts, Pommes Frites, Aufstrichen, Füllungen.",
  },
];

const additives = [
  { label: "mit Farbstoff", description: "Lebensmittel mit Farbstoffen (E 100–E 180)" },
  { label: "mit Konservierungsstoff / konserviert", description: "Lebensmittel mit Konservierungsstoffen (E 200–E 285, E 1105)" },
  { label: "mit Antioxidationsmittel", description: "Lebensmittel mit Antioxidationsmitteln (E 310–E 321)" },
  { label: "mit Geschmacksverstärker", description: "Lebensmittel mit Geschmacksverstärkern (E 620–E 635)" },
  { label: "geschwefelt", description: "Lebensmittel mit Schwefeldioxid/Sulfiten (E 220–E 228, ab 10 mg/kg)" },
  { label: "geschwärzt", description: "Lebensmittel mit Eisensalzen (E 579, E 585) — z. B. schwarze Oliven" },
  { label: "gewachst", description: "Lebensmittel mit Oberflächenbehandlung (E 901–E 904, E 912, E 914)" },
  { label: "mit Süßungsmittel(n)", description: "Lebensmittel mit Süßstoffen (E 950–E 967)" },
  { label: "mit Phosphat", description: "Fleischerzeugnisse mit Phosphaten (E 338–E 341, E 450–E 452)" },
  { label: "coffeinhaltig", description: "Coffeinhaltige Erfrischungsgetränke" },
  { label: "chininhaltig", description: "Getränke mit Chinin/Chininsalzen (z. B. Bitter Lemon)" },
];

export default function Allergene() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0ead6]">
      {/* Hero */}
      <div className="relative py-20 px-6 text-center border-b border-[#c8a96e]/20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a0a] opacity-80" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#c8293a] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Cafe&Bar Luxor — Solingen
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Allergene &amp; Zusatzstoffe
          </h1>
          <div className="w-16 h-px bg-[#c8293a] mx-auto mb-6" />
          <p className="text-[#a89070] text-sm leading-relaxed">
            Gemäß EU-Lebensmittelinformationsverordnung (LMIV EU 1169/2011) informieren wir Sie
            über allergene Zutaten und Zusatzstoffe in unseren Speisen und Getränken.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">

        {/* Guest Notice */}
        <div className="bg-[#1a0a0a] border border-[#c8293a]/40 rounded-lg p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#c8293a]/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-[#c8293a] text-lg font-bold">!</span>
            </div>
            <div>
              <h2 className="text-white font-serif text-xl font-semibold mb-3">
                Hinweis für unsere Gäste
              </h2>
              <p className="text-[#a89070] leading-relaxed mb-3">
                Informationen über Zutaten in unseren Speisen und Getränken, die Allergien oder
                Unverträglichkeiten auslösen können, erhalten Sie auf Nachfrage bei unseren
                Servicemitarbeiterinnen und Servicemitarbeitern. Diese stellen Ihnen gerne auch
                eine schriftliche Dokumentation zur Verfügung.
              </p>
              <p className="text-[#a89070] leading-relaxed text-sm">
                <strong className="text-[#c8a96e]">Hinweis:</strong> Eine Nennung von Allergenen
                erfolgt, wenn die bezeichneten Stoffe oder daraus hergestellte Erzeugnisse als
                Zutat im Endprodukt enthalten sind. Trotz sorgfältiger Herstellung unserer Speisen
                und Getränke können neben den gekennzeichneten Zutaten Spuren anderer Stoffe
                enthalten sein, die im Produktionsprozess in der Küche verwendet werden.
              </p>
            </div>
          </div>
        </div>

        {/* 14 Allergens */}
        <div>
          <h2 className="text-white font-serif text-2xl font-bold mb-2">
            Die 14 kennzeichnungspflichtigen Allergene
          </h2>
          <div className="w-12 h-px bg-[#c8293a] mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allergens.map((allergen) => (
              <div
                key={allergen.code}
                className="bg-[#111] border border-[#c8a96e]/20 rounded-lg p-5 hover:border-[#c8293a]/40 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#c8293a]/20 text-[#c8293a] font-bold text-sm flex-shrink-0">
                    {allergen.code}
                  </span>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{allergen.name}</h3>
                    <p className="text-[#a89070] text-xs mt-1 leading-relaxed">
                      {allergen.description}
                    </p>
                  </div>
                </div>
                {allergen.sub && (
                  <div className="mt-3 ml-11 flex flex-wrap gap-1">
                    {allergen.sub.map((s) => (
                      <span
                        key={s.code}
                        className="text-xs bg-[#1a1a1a] border border-[#c8a96e]/20 text-[#c8a96e] px-2 py-0.5 rounded"
                      >
                        {s.code}: {s.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additives */}
        <div>
          <h2 className="text-white font-serif text-2xl font-bold mb-2">
            Kennzeichnungspflichtige Zusatzstoffe
          </h2>
          <div className="w-12 h-px bg-[#c8293a] mb-4" />
          <p className="text-[#a89070] text-sm mb-6 leading-relaxed">
            Folgende Zusatzstoffe müssen gemäß Lebensmittelrecht auf Speise- und Getränkekarten
            kenntlich gemacht werden:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#c8a96e]/30">
                  <th className="text-left py-3 px-4 text-[#c8a96e] font-semibold text-xs uppercase tracking-wider">
                    Kenntlichmachung
                  </th>
                  <th className="text-left py-3 px-4 text-[#c8a96e] font-semibold text-xs uppercase tracking-wider">
                    Beschreibung
                  </th>
                </tr>
              </thead>
              <tbody>
                {additives.map((item, i) => (
                  <tr
                    key={i}
                    className={`border-b border-[#c8a96e]/10 ${
                      i % 2 === 0 ? "bg-[#111]" : "bg-[#0d0d0d]"
                    }`}
                  >
                    <td className="py-3 px-4 text-white font-medium whitespace-nowrap">
                      {item.label}
                    </td>
                    <td className="py-3 px-4 text-[#a89070]">{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legal basis */}
        <div className="border-t border-[#c8a96e]/20 pt-8">
          <h2 className="text-white font-serif text-lg font-semibold mb-3">Rechtliche Grundlagen</h2>
          <ul className="text-[#a89070] text-sm space-y-2 leading-relaxed">
            <li>
              • EU-Verordnung LMIV EU 1169/2011 vom 25. Oktober 2011 zur Information der
              Verbraucher über Lebensmittel
            </li>
            <li>
              • Verordnung zur Durchführung unionsrechtlicher Vorschriften betreffend die
              Information der Verbraucher über Lebensmittel (LMIDV)
            </li>
            <li>
              • Lebensmittel-, Bedarfsgegenstände- und Futtermittelgesetzbuch (LFGB)
            </li>
          </ul>
          <p className="text-[#6b5a45] text-xs mt-6">
            Stand: gemäß LMIV EU 1169/2011 (gültig seit 13. Dezember 2014). Bei Fragen wenden
            Sie sich bitte an unser Servicepersonal.
          </p>
        </div>
      </div>
    </div>
  );
}
