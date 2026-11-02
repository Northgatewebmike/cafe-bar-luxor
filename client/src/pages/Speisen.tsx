import { Link } from 'wouter';
import { ChefHat, Wheat, Milk, Egg, Leaf, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type FoodItem = {
  nameDe: string;
  nameEn: string;
  price: string;
  descriptionDe: string;
  descriptionEn: string;
  ingredientsDe: string[];
  ingredientsEn: string[];
  allergensDe: string[];
  allergensEn: string[];
};

const foods: FoodItem[] = [
  {
    nameDe: 'Kleines Frühstück',
    nameEn: 'Small Breakfast',
    price: '5,90 €',
    descriptionDe: 'Mit frischen Brötchen, Butter, Marmelade oder Honig sowie Käse oder Wurst.',
    descriptionEn: 'Fresh bread rolls with butter, jam or honey, plus cheese or cold cuts.',
    ingredientsDe: ['1–2 Brötchen', 'Butter', 'Marmelade oder Honig', '1–2 Scheiben Käse oder Wurst'],
    ingredientsEn: ['1–2 bread rolls', 'Butter', 'Jam or honey', '1–2 slices of cheese or cold cuts'],
    allergensDe: ['Gluten (Weizen/Roggen in den Brötchen)', 'Milch/Laktose (Butter, Käse)'],
    allergensEn: ['Gluten (wheat/rye in the rolls)', 'Milk/lactose (butter, cheese)'],
  },
  {
    nameDe: 'Großes Frühstück',
    nameEn: 'Large Breakfast',
    price: '8,50 €',
    descriptionDe: 'Mit Brötchen oder Artisan-Brot, Butter, Marmelade, Honig, Käse, Aufschnitt und Ei.',
    descriptionEn: 'Bread rolls or artisan bread with butter, jam, honey, cheese, cold cuts and egg.',
    ingredientsDe: ['2–3 Brötchen oder Artisan-Brot', 'Butter', 'Marmelade und Honig', 'Käse und Aufschnitt', 'Gekochtes oder gebratenes Ei'],
    ingredientsEn: ['2–3 bread rolls or artisan bread', 'Butter', 'Jam and honey', 'Selection of cheeses and cold cuts', 'Boiled or fried egg'],
    allergensDe: ['Gluten (Brot/Brötchen)', 'Milch/Laktose (Butter, Käse)', 'Ei'],
    allergensEn: ['Gluten (bread/rolls)', 'Milk/lactose (butter, cheese)', 'Egg'],
  },
  {
    nameDe: 'Hähnchenschnitzel',
    nameEn: 'Chicken Schnitzel',
    price: '7,90 €',
    descriptionDe: 'Paniertes, zartes Hähnchenbrustfilet mit Zitrone.',
    descriptionEn: 'Tender chicken breast fillet in a crisp breadcrumb coating, served with lemon.',
    ingredientsDe: ['Hähnchenbrustfilet', 'Mehl, Ei und Paniermehl', 'Pflanzenöl', 'Salz und Pfeffer', 'Zitronenscheibe'],
    ingredientsEn: ['Chicken breast fillet', 'Flour, egg and breadcrumbs', 'Vegetable oil', 'Salt and pepper', 'Lemon slice'],
    allergensDe: ['Gluten (Weizenmehl und Paniermehl)', 'Ei'],
    allergensEn: ['Gluten (wheat flour and breadcrumbs)', 'Egg'],
  },
  {
    nameDe: 'Wurst',
    nameEn: 'Sausage',
    price: '3,50 €',
    descriptionDe: 'Herzhafte Bratwurst oder Bockwurst, gebraten oder gekocht.',
    descriptionEn: 'A savoury German bratwurst or bockwurst, pan-fried or boiled.',
    ingredientsDe: ['Schweine- und/oder Rindfleisch', 'Gewürze: Majoran, Pfeffer, Muskat', 'Salz', 'Naturdarm'],
    ingredientsEn: ['Pork and/or beef', 'Spices: marjoram, pepper and nutmeg', 'Salt', 'Natural casing'],
    allergensDe: ['Senf (in Gewürzmischungen möglich)', 'Sellerie (in Brühe/Gewürzmischungen möglich)', 'Nitritpökelsalz/Phosphate je nach Produkt'],
    allergensEn: ['Mustard (may be present in spice mixes)', 'Celery (may be present in stock/spice mixes)', 'Nitrites/phosphates depending on the product'],
  },
  {
    nameDe: 'Frikadellen',
    nameEn: 'German Meatballs',
    price: '2,50 €',
    descriptionDe: 'Hausgemachte, gebratene Hackfleischfrikadelle mit Kräutern und Gewürzen.',
    descriptionEn: 'Pan-fried seasoned minced-meat patty with herbs and spices.',
    ingredientsDe: ['Gemischtes Hackfleisch', 'Eingeweichtes Brötchen oder Paniermehl', 'Zwiebeln', 'Ei und Senf', 'Petersilie, Salz, Pfeffer und Öl'],
    ingredientsEn: ['Mixed minced meat', 'Soaked bread roll or breadcrumbs', 'Onions', 'Egg and mustard', 'Parsley, salt, pepper and frying oil'],
    allergensDe: ['Gluten (Brötchen/Paniermehl)', 'Ei', 'Senf'],
    allergensEn: ['Gluten (bread/breadcrumbs)', 'Egg', 'Mustard'],
  },
  {
    nameDe: 'Kartoffelsalat',
    nameEn: 'Potato Salad',
    price: '3,50 €',
    descriptionDe: 'Klassischer Kartoffelsalat mit Mayonnaise oder Dressing.',
    descriptionEn: 'Traditional potato salad with mayonnaise or a dressed potato salad dressing.',
    ingredientsDe: ['Gekochte Kartoffeln', 'Mayonnaise', 'Gewürzgurken', 'Zwiebeln', 'Salz, Pfeffer und Essig', 'Je nach Rezept: Brühe, Öl und Senf'],
    ingredientsEn: ['Boiled potatoes', 'Mayonnaise', 'Pickles', 'Onions', 'Salt, pepper and vinegar', 'Depending on the recipe: stock, oil and mustard'],
    allergensDe: ['Ei (Mayonnaise)', 'Senf (Mayonnaise/Dressing)', 'Sellerie bei Verwendung von Gemüse- oder Fleischbrühe'],
    allergensEn: ['Egg (mayonnaise)', 'Mustard (mayonnaise/dressing)', 'Celery if vegetable or meat stock is used'],
  },
];

function AllergenIcon({ label }: { label: string }) {
  const value = label.toLowerCase();
  if (value.includes('gluten')) return <Wheat size={15} aria-hidden="true" />;
  if (value.includes('milch') || value.includes('milk')) return <Milk size={15} aria-hidden="true" />;
  if (value.includes('ei') || value.includes('egg')) return <Egg size={15} aria-hidden="true" />;
  if (value.includes('sellerie') || value.includes('celery')) return <Leaf size={15} aria-hidden="true" />;
  return <AlertCircle size={15} aria-hidden="true" />;
}

export default function Speisen() {
  const { lang } = useLanguage();
  const isEnglish = lang === 'en';

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      <header className="bg-[#111] border-b border-[#8b1a1a]/30 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#8b1a1a] text-sm tracking-[0.3em] uppercase mb-3">Cafe &amp; Bar Luxor</p>
          <div className="flex justify-center mb-5"><ChefHat className="text-[#c9a84c]" size={30} aria-hidden="true" /></div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {isEnglish ? 'Food & Ingredients' : 'Speisen & Zutaten'}
          </h1>
          <div className="w-24 h-px bg-[#8b1a1a] mx-auto mb-6" />
          <p className="max-w-2xl mx-auto text-[#b9ad9a] leading-relaxed">
            {isEnglish
              ? 'A clear overview of our food, ingredients, prices and the most common allergens.'
              : 'Eine klare Übersicht unserer Speisen, Zutaten, Preise und der häufigsten Allergene.'}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {foods.map((food, index) => {
            const name = isEnglish ? food.nameEn : food.nameDe;
            const ingredients = isEnglish ? food.ingredientsEn : food.ingredientsDe;
            const allergens = isEnglish ? food.allergensEn : food.allergensDe;
            return (
              <article key={food.nameDe} className="group rounded-xl border border-[#2a2a2a] bg-[#111] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#8b1a1a]/70 hover:shadow-[0_14px_40px_rgba(139,26,26,0.16)]">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-[#8b1a1a] text-xs tracking-[0.25em] uppercase mb-2">{String(index + 1).padStart(2, '0')}</p>
                    <h2 className="font-serif text-2xl font-bold text-white">{name}</h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#8b1a1a] px-3 py-1.5 text-sm font-bold text-white">{food.price}</span>
                </div>
                <p className="text-[#d4c9b0] text-sm leading-relaxed mb-5">
                  {isEnglish ? food.descriptionEn : food.descriptionDe}
                </p>
                <div className="border-t border-[#2a2a2a] pt-4">
                  <h3 className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">
                    {isEnglish ? 'Ingredients' : 'Zutaten'}
                  </h3>
                  <ul className="grid gap-2 text-sm text-[#b9ad9a]">
                    {ingredients.map((ingredient) => <li key={ingredient} className="flex gap-2"><span className="text-[#8b1a1a]">•</span><span>{ingredient}</span></li>)}
                  </ul>
                </div>
                <div className="mt-5 rounded-lg border border-[#8b1a1a]/30 bg-[#1a1008] p-4">
                  <h3 className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3">
                    {isEnglish ? 'Common allergens & notes' : 'Häufige Allergene & Hinweise'}
                  </h3>
                  <ul className="space-y-2 text-sm text-[#d4c9b0]">
                    {allergens.map((allergen) => <li key={allergen} className="flex items-start gap-2"><span className="mt-0.5 shrink-0 text-[#8b1a1a]"><AllergenIcon label={allergen} /></span><span>{allergen}</span></li>)}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-12 rounded-xl border border-[#8b1a1a]/40 bg-[#160b07] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 shrink-0 text-[#c9a84c]" size={20} aria-hidden="true" />
            <div>
              <h2 className="font-serif text-2xl font-bold text-white mb-3">
                {isEnglish ? 'Please ask our team' : 'Bitte sprechen Sie unser Team an'}
              </h2>
              <p className="text-[#d4c9b0] text-sm leading-relaxed">
                {isEnglish
                  ? 'Recipes and ingredients can vary by product or supplier. If you have an allergy or intolerance, please speak to our staff before ordering. For the full allergen and additive legend, please see our allergen information page.'
                  : 'Rezepte und Zutaten können je nach Produkt oder Lieferant variieren. Wenn Sie eine Allergie oder Unverträglichkeit haben, sprechen Sie bitte vor der Bestellung unser Personal an. Die vollständige Allergen- und Zusatzstofflegende finden Sie auf unserer Allergeninfo-Seite.'}
              </p>
              <Link href="/allergene" className="inline-block mt-4 text-[#c9a84c] hover:text-white text-sm transition-colors">
                {isEnglish ? 'View full allergen information →' : 'Vollständige Allergeninfo ansehen →'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
