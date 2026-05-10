import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'de' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ============================================================
// TRANSLATIONS — All text in German (default) and English
// Natural, human-quality translations for a premium café-bar
// ============================================================
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.menu': 'Speisekarte',
    'nav.gallery': 'Galerie',
    'nav.hours': 'Öffnungszeiten',
    'nav.contact': 'Kontakt',
    'nav.impressum': 'Impressum',
    'nav.datenschutz': 'Datenschutz',

    // Home Hero
    'home.hero.tagline': 'Wo jeder Moment zählt',
    'home.hero.subtitle': 'Kaffee, Cocktails & unvergessliche Augenblicke am Ohligser Markt',
    'home.hero.cta': 'Speisekarte ansehen',
    'home.hero.cta2': 'Tisch reservieren',

    // Home Features
    'home.features.title': 'Erleben Sie den Luxor',
    'home.features.coffee.title': 'Erstklassiger Kaffee',
    'home.features.coffee.desc': 'Handverlesene Kaffeebohnen, zubereitet von leidenschaftlichen Baristas für den perfekten Genuss.',
    'home.features.cocktails.title': 'Signature Cocktails',
    'home.features.cocktails.desc': 'Kreative Cocktailkreationen und klassische Favoriten — für jeden Geschmack das Richtige.',
    'home.features.atmosphere.title': 'Einladende Atmosphäre',
    'home.features.atmosphere.desc': 'Ein warmer, gemütlicher Ort zum Verweilen, Entspannen und Genießen — zu jeder Tageszeit.',

    // Home Testimonials
    'home.testimonials.title': 'Was unsere Gäste sagen',
    'home.testimonials.1.text': 'Egal ob zum Kaffee mittags oder für Cocktails abends — wir gehen gerne dorthin. Freundlicher Service, faire Preise für Ohligs.',
    'home.testimonials.1.author': 'Joscha F.',
    'home.testimonials.1.role': 'Stammgast',
    'home.testimonials.2.text': 'Für 5 Euro der günstigste Aperol Spritz in Solingen! Unglaublich gutes Preis-Leistungs-Verhältnis und freundliches Personal.',
    'home.testimonials.2.author': 'Lu K.',
    'home.testimonials.2.role': 'Lokaler Guide · 23 Bewertungen',
    'home.testimonials.3.text': 'Essen: 4 | Service: 5 | Atmosphäre: 5. Ruhig, entspannte Unterhaltung möglich. Kein Warten.',
    'home.testimonials.3.author': 'Dragomir N.',
    'home.testimonials.3.role': 'Gast',

    // About
    'about.title': 'Über uns',
    'about.subtitle': 'Unsere Geschichte',
    'about.story.p1': 'Cafe&Bar Luxor ist mehr als ein Ort zum Kaffeetrinken — es ist ein Treffpunkt für Menschen, die das Besondere schätzen. Seit unserer Eröffnung im März 2024 am Ohligser Markt 5 in Solingen haben wir uns als herzliches Zuhause für Kaffeeliebhaber, Cocktailkenner und alle, die einfach eine gute Zeit suchen, etabliert.',
    'about.story.p2': 'Unser Café-Bar verbindet die Wärme eines traditionellen europäischen Bistros mit der Energie einer modernen Bar. Tagsüber genießen Sie bei uns aromatischen Kaffee und hausgemachte Speisen, abends verwandelt sich der Luxor in eine einladende Bar mit handgefertigten Cocktails und einer entspannten Atmosphäre.',
    'about.story.p3': 'Wir glauben daran, dass jeder Gast wie ein Freund behandelt werden sollte. Unser Team ist mit Leidenschaft dabei und sorgt dafür, dass Sie sich von dem Moment an, in dem Sie durch unsere Tür treten, willkommen fühlen.',
    'about.values.title': 'Unsere Werte',
    'about.values.quality': 'Qualität',
    'about.values.quality.desc': 'Nur die besten Zutaten und Produkte finden ihren Weg in unsere Küche und an unsere Bar.',
    'about.values.warmth': 'Herzlichkeit',
    'about.values.warmth.desc': 'Jeder Gast ist bei uns willkommen — egal wer Sie sind oder woher Sie kommen.',
    'about.values.community': 'Gemeinschaft',
    'about.values.community.desc': 'Wir sind stolz darauf, ein Ort zu sein, der Menschen zusammenbringt.',
    'about.features.title': 'Was uns auszeichnet',
    'about.features.wifi': 'Kostenloses WLAN',
    'about.features.reservations': 'Reservierungen möglich',
    'about.features.payment': 'Karten- & Barzahlung',
    'about.features.dogs': 'Hunde willkommen',
    'about.features.accessible': 'Barrierefrei zugänglich',
    'about.features.sport': 'Sport-Übertragungen',

    // Menu
    'menu.title': 'Speisekarte',
    'menu.subtitle': 'Blättern Sie durch unsere Karte',
    'menu.instruction': 'Klicken Sie auf die Seiten oder nutzen Sie die Pfeile zum Blättern',
    'menu.prev': 'Zurück',
    'menu.next': 'Weiter',
    'menu.cover.title': 'Cafe & Bar Luxor',
    'menu.cover.subtitle': 'Speisekarte',
    'menu.cover.address': 'Ohligser Markt 5 · Solingen',
    'menu.cat.coffee': 'Kaffee & Heißgetränke',
    'menu.cat.cold': 'Kaltgetränke',
    'menu.cat.cocktails': 'Cocktails & Longdrinks',
    'menu.cat.beer': 'Bier & Wein',
    'menu.cat.food': 'Speisen',
    'menu.cat.snacks': 'Snacks & Kleinigkeiten',

    // Menu items — Coffee
    'menu.espresso': 'Espresso',
    'menu.espresso.desc': 'Kräftiger Einzelespresso',
    'menu.doppio': 'Doppio',
    'menu.doppio.desc': 'Doppelter Espresso',
    'menu.cappuccino': 'Cappuccino',
    'menu.cappuccino.desc': 'Espresso mit aufgeschäumter Milch',
    'menu.latte': 'Caffè Latte',
    'menu.latte.desc': 'Espresso mit viel Milch',
    'menu.americano': 'Americano',
    'menu.americano.desc': 'Espresso mit heißem Wasser',
    'menu.macchiato': 'Macchiato',
    'menu.macchiato.desc': 'Espresso mit einem Hauch Milchschaum',
    'menu.flatwhite': 'Flat White',
    'menu.flatwhite.desc': 'Doppelter Ristretto mit Milch',
    'menu.tee': 'Tee',
    'menu.tee.desc': 'Auswahl verschiedener Teesorten',
    'menu.heisskakao': 'Heiße Schokolade',
    'menu.heisskakao.desc': 'Cremige heiße Schokolade',

    // Menu items — Cold drinks
    'menu.wasser': 'Wasser',
    'menu.wasser.desc': 'Still oder mit Kohlensäure',
    'menu.softdrink': 'Softdrinks',
    'menu.softdrink.desc': 'Cola, Fanta, Sprite u.v.m.',
    'menu.saft': 'Fruchtsaft',
    'menu.saft.desc': 'Orange, Apfel, Multivitamin',
    'menu.eiskaffee': 'Eiskaffee',
    'menu.eiskaffee.desc': 'Kalter Kaffee mit Eis und Sahne',
    'menu.smoothie': 'Smoothie',
    'menu.smoothie.desc': 'Frisch zubereitete Fruchtmixe',

    // Menu items — Cocktails
    'menu.aperol': 'Aperol Spritz',
    'menu.aperol.desc': 'Aperol, Prosecco, Soda, Orange',
    'menu.hugo': 'Hugo',
    'menu.hugo.desc': 'Holunderblütensirup, Prosecco, Minze',
    'menu.mojito': 'Mojito',
    'menu.mojito.desc': 'Rum, Limette, Minze, Zucker, Soda',
    'menu.gin.tonic': 'Gin & Tonic',
    'menu.gin.tonic.desc': 'Premium Gin mit Tonic Water',
    'menu.longdrink': 'Longdrinks',
    'menu.longdrink.desc': 'Vodka, Rum, Gin mit Mixer nach Wahl',
    'menu.negroni': 'Negroni',
    'menu.negroni.desc': 'Gin, Campari, roter Wermut',

    // Menu items — Beer & Wine
    'menu.bier.draft': 'Bier vom Fass',
    'menu.bier.draft.desc': '0,3l / 0,5l',
    'menu.bier.bottle': 'Flaschenbier',
    'menu.bier.bottle.desc': 'Verschiedene Sorten',
    'menu.wein.rot': 'Rotwein',
    'menu.wein.rot.desc': 'Glas / Flasche',
    'menu.wein.weiss': 'Weißwein',
    'menu.wein.weiss.desc': 'Glas / Flasche',
    'menu.sekt': 'Sekt / Prosecco',
    'menu.sekt.desc': 'Glas / Flasche',

    // Menu items — Food
    'menu.toast': 'Toast',
    'menu.toast.desc': 'Mit Käse und Schinken',
    'menu.sandwich': 'Sandwich',
    'menu.sandwich.desc': 'Belegt nach Tagesangebot',
    'menu.kuchen': 'Kuchen',
    'menu.kuchen.desc': 'Hausgemachter Kuchen des Tages',
    'menu.croissant': 'Croissant',
    'menu.croissant.desc': 'Buttercroissant, pur oder belegt',
    'menu.snacks': 'Snacks',
    'menu.snacks.desc': 'Nüsse, Chips, Oliven',

    // Gallery
    'gallery.title': 'Galerie',
    'gallery.subtitle': 'Einblicke in unsere Welt',
    'gallery.close': 'Schließen',
    'gallery.prev': 'Vorheriges',
    'gallery.next': 'Nächstes',
    'gallery.img1': 'Gemütliche Atmosphäre',
    'gallery.img2': 'Unsere Cocktails',
    'gallery.img3': 'Kaffeespezialitäten',
    'gallery.img4': 'Die Bar',
    'gallery.img5': 'Außenbereich',
    'gallery.img6': 'Abendstimmung',

    // Opening Hours
    'hours.title': 'Öffnungszeiten',
    'hours.subtitle': 'Wir freuen uns auf Ihren Besuch',
    'hours.monday': 'Montag',
    'hours.tuesday': 'Dienstag',
    'hours.wednesday': 'Mittwoch',
    'hours.thursday': 'Donnerstag',
    'hours.friday': 'Freitag',
    'hours.saturday': 'Samstag',
    'hours.sunday': 'Sonntag',
    'hours.open': 'Geöffnet',
    'hours.closed': 'Geschlossen',
    'hours.note': '* An Feiertagen können die Öffnungszeiten abweichen.',
    'hours.today': 'Heute',
    'hours.find.us': 'So finden Sie uns',
    'hours.address': 'Ohligser Markt 5, 42696 Solingen',

    // Contact
    'contact.title': 'Kontakt',
    'contact.subtitle': 'Wir freuen uns von Ihnen zu hören',
    'contact.form.name': 'Ihr Name',
    'contact.form.email': 'Ihre E-Mail-Adresse',
    'contact.form.subject': 'Betreff',
    'contact.form.message': 'Ihre Nachricht',
    'contact.form.send': 'Nachricht senden',
    'contact.form.sending': 'Wird gesendet...',
    'contact.form.success': 'Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald!',
    'contact.form.error': 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    'contact.info.address': 'Adresse',
    'contact.info.phone': 'Telefon',
    'contact.info.email': 'E-Mail',
    'contact.info.hours': 'Öffnungszeiten',
    'contact.reservation': 'Reservierung',
    'contact.reservation.desc': 'Für Reservierungen und Gruppenanfragen kontaktieren Sie uns bitte direkt.',
    'contact.map.title': 'Standort',

    // Impressum
    'impressum.title': 'Impressum',
    'impressum.angaben': 'Angaben gemäß § 5 TMG',
    'impressum.kontakt': 'Kontakt',
    'impressum.gewerbe': 'Gewerbeanmeldung',
    'impressum.anmeldung': 'Anmeldebehörde: Stadt Solingen',
    'impressum.datum': 'Datum der Anmeldung: 25.03.2024',
    'impressum.steuer': 'Steuernummer',
    'impressum.ust': 'Umsatzsteuer-ID',
    'impressum.incoming': '(wird nachgereicht)',
    'impressum.verantwortlich': 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV',

    // Datenschutz
    'datenschutz.title': 'Datenschutzerklärung',
    'datenschutz.intro': 'Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'footer.tagline': 'Kaffee, Cocktails & unvergessliche Momente',
    'footer.address': 'Ohligser Markt 5, 42696 Solingen',

    // Common
    'common.back': 'Zurück',
    'common.more': 'Mehr erfahren',
    'common.close': 'Schließen',
    'common.open.now': 'Jetzt geöffnet',
    'common.closed.now': 'Derzeit geschlossen',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.hours': 'Opening Hours',
    'nav.contact': 'Contact',
    'nav.impressum': 'Legal Notice',
    'nav.datenschutz': 'Privacy Policy',

    // Home Hero
    'home.hero.tagline': 'Where every moment counts',
    'home.hero.subtitle': 'Coffee, cocktails & unforgettable moments at Ohligser Markt',
    'home.hero.cta': 'View Menu',
    'home.hero.cta2': 'Reserve a Table',

    // Home Features
    'home.features.title': 'Experience the Luxor',
    'home.features.coffee.title': 'Premium Coffee',
    'home.features.coffee.desc': 'Hand-selected coffee beans, crafted by passionate baristas for the perfect cup.',
    'home.features.cocktails.title': 'Signature Cocktails',
    'home.features.cocktails.desc': 'Creative cocktail creations and classic favourites — something for every taste.',
    'home.features.atmosphere.title': 'Welcoming Atmosphere',
    'home.features.atmosphere.desc': 'A warm, cosy place to linger, relax and enjoy — at any time of day.',

    // Home Testimonials
    'home.testimonials.title': 'What our guests say',
    'home.testimonials.1.text': 'Whether for coffee at lunch or cocktails in the evening — we love coming here. Friendly service and fair prices for the Ohligs area.',
    'home.testimonials.1.author': 'Joscha F.',
    'home.testimonials.1.role': 'Regular Guest',
    'home.testimonials.2.text': 'The cheapest Aperol Spritz in Solingen for just €5! Incredible value for money and friendly staff.',
    'home.testimonials.2.author': 'Lu K.',
    'home.testimonials.2.role': 'Local Guide · 23 Reviews',
    'home.testimonials.3.text': 'Food: 4 | Service: 5 | Atmosphere: 5. Quiet, easy to have a conversation. No waiting.',
    'home.testimonials.3.author': 'Dragomir N.',
    'home.testimonials.3.role': 'Guest',

    // About
    'about.title': 'About Us',
    'about.subtitle': 'Our Story',
    'about.story.p1': 'Cafe&Bar Luxor is more than a place to have coffee — it\'s a meeting point for people who appreciate the finer things. Since opening in March 2024 at Ohligser Markt 5 in Solingen, we have established ourselves as a warm home for coffee lovers, cocktail enthusiasts, and anyone simply looking for a good time.',
    'about.story.p2': 'Our café-bar blends the warmth of a traditional European bistro with the energy of a modern bar. During the day, enjoy aromatic coffee and homemade dishes; in the evening, Luxor transforms into an inviting bar with handcrafted cocktails and a relaxed atmosphere.',
    'about.story.p3': 'We believe every guest should be treated like a friend. Our team is passionate about what they do and ensures you feel welcome from the moment you walk through our door.',
    'about.values.title': 'Our Values',
    'about.values.quality': 'Quality',
    'about.values.quality.desc': 'Only the finest ingredients and products make it into our kitchen and behind our bar.',
    'about.values.warmth': 'Warmth',
    'about.values.warmth.desc': 'Every guest is welcome here — regardless of who you are or where you come from.',
    'about.values.community': 'Community',
    'about.values.community.desc': 'We are proud to be a place that brings people together.',
    'about.features.title': 'What sets us apart',
    'about.features.wifi': 'Free Wi-Fi',
    'about.features.reservations': 'Reservations accepted',
    'about.features.payment': 'Card & cash payment',
    'about.features.dogs': 'Dogs welcome',
    'about.features.accessible': 'Wheelchair accessible',
    'about.features.sport': 'Sports screenings',

    // Menu
    'menu.title': 'Menu',
    'menu.subtitle': 'Browse our menu',
    'menu.instruction': 'Click on the pages or use the arrows to browse',
    'menu.prev': 'Previous',
    'menu.next': 'Next',
    'menu.cover.title': 'Cafe & Bar Luxor',
    'menu.cover.subtitle': 'Menu',
    'menu.cover.address': 'Ohligser Markt 5 · Solingen',
    'menu.cat.coffee': 'Coffee & Hot Drinks',
    'menu.cat.cold': 'Cold Drinks',
    'menu.cat.cocktails': 'Cocktails & Long Drinks',
    'menu.cat.beer': 'Beer & Wine',
    'menu.cat.food': 'Food',
    'menu.cat.snacks': 'Snacks & Light Bites',

    // Menu items — Coffee
    'menu.espresso': 'Espresso',
    'menu.espresso.desc': 'Strong single espresso',
    'menu.doppio': 'Doppio',
    'menu.doppio.desc': 'Double espresso',
    'menu.cappuccino': 'Cappuccino',
    'menu.cappuccino.desc': 'Espresso with steamed milk foam',
    'menu.latte': 'Caffè Latte',
    'menu.latte.desc': 'Espresso with plenty of milk',
    'menu.americano': 'Americano',
    'menu.americano.desc': 'Espresso with hot water',
    'menu.macchiato': 'Macchiato',
    'menu.macchiato.desc': 'Espresso with a touch of milk foam',
    'menu.flatwhite': 'Flat White',
    'menu.flatwhite.desc': 'Double ristretto with milk',
    'menu.tee': 'Tea',
    'menu.tee.desc': 'Selection of various teas',
    'menu.heisskakao': 'Hot Chocolate',
    'menu.heisskakao.desc': 'Creamy hot chocolate',

    // Menu items — Cold drinks
    'menu.wasser': 'Water',
    'menu.wasser.desc': 'Still or sparkling',
    'menu.softdrink': 'Soft Drinks',
    'menu.softdrink.desc': 'Cola, Fanta, Sprite and more',
    'menu.saft': 'Fruit Juice',
    'menu.saft.desc': 'Orange, apple, multivitamin',
    'menu.eiskaffee': 'Iced Coffee',
    'menu.eiskaffee.desc': 'Cold coffee with ice cream and cream',
    'menu.smoothie': 'Smoothie',
    'menu.smoothie.desc': 'Freshly prepared fruit blends',

    // Menu items — Cocktails
    'menu.aperol': 'Aperol Spritz',
    'menu.aperol.desc': 'Aperol, Prosecco, soda, orange',
    'menu.hugo': 'Hugo',
    'menu.hugo.desc': 'Elderflower syrup, Prosecco, mint',
    'menu.mojito': 'Mojito',
    'menu.mojito.desc': 'Rum, lime, mint, sugar, soda',
    'menu.gin.tonic': 'Gin & Tonic',
    'menu.gin.tonic.desc': 'Premium gin with tonic water',
    'menu.longdrink': 'Long Drinks',
    'menu.longdrink.desc': 'Vodka, rum, gin with mixer of your choice',
    'menu.negroni': 'Negroni',
    'menu.negroni.desc': 'Gin, Campari, red vermouth',

    // Menu items — Beer & Wine
    'menu.bier.draft': 'Draft Beer',
    'menu.bier.draft.desc': '0.3l / 0.5l',
    'menu.bier.bottle': 'Bottled Beer',
    'menu.bier.bottle.desc': 'Various varieties',
    'menu.wein.rot': 'Red Wine',
    'menu.wein.rot.desc': 'Glass / Bottle',
    'menu.wein.weiss': 'White Wine',
    'menu.wein.weiss.desc': 'Glass / Bottle',
    'menu.sekt': 'Sparkling Wine / Prosecco',
    'menu.sekt.desc': 'Glass / Bottle',

    // Menu items — Food
    'menu.toast': 'Toast',
    'menu.toast.desc': 'With cheese and ham',
    'menu.sandwich': 'Sandwich',
    'menu.sandwich.desc': 'Filled according to daily specials',
    'menu.kuchen': 'Cake',
    'menu.kuchen.desc': 'Homemade cake of the day',
    'menu.croissant': 'Croissant',
    'menu.croissant.desc': 'Butter croissant, plain or filled',
    'menu.snacks': 'Snacks',
    'menu.snacks.desc': 'Nuts, crisps, olives',

    // Gallery
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'A glimpse into our world',
    'gallery.close': 'Close',
    'gallery.prev': 'Previous',
    'gallery.next': 'Next',
    'gallery.img1': 'Cosy atmosphere',
    'gallery.img2': 'Our cocktails',
    'gallery.img3': 'Coffee specialities',
    'gallery.img4': 'The bar',
    'gallery.img5': 'Outdoor area',
    'gallery.img6': 'Evening ambience',

    // Opening Hours
    'hours.title': 'Opening Hours',
    'hours.subtitle': 'We look forward to your visit',
    'hours.monday': 'Monday',
    'hours.tuesday': 'Tuesday',
    'hours.wednesday': 'Wednesday',
    'hours.thursday': 'Thursday',
    'hours.friday': 'Friday',
    'hours.saturday': 'Saturday',
    'hours.sunday': 'Sunday',
    'hours.open': 'Open',
    'hours.closed': 'Closed',
    'hours.note': '* Opening hours may vary on public holidays.',
    'hours.today': 'Today',
    'hours.find.us': 'How to find us',
    'hours.address': 'Ohligser Markt 5, 42696 Solingen',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'We look forward to hearing from you',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Your message was sent successfully. We will be in touch soon!',
    'contact.form.error': 'An error occurred while sending. Please try again.',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.hours': 'Opening Hours',
    'contact.reservation': 'Reservation',
    'contact.reservation.desc': 'For reservations and group enquiries, please contact us directly.',
    'contact.map.title': 'Location',

    // Impressum
    'impressum.title': 'Legal Notice',
    'impressum.angaben': 'Information according to § 5 TMG',
    'impressum.kontakt': 'Contact',
    'impressum.gewerbe': 'Business Registration',
    'impressum.anmeldung': 'Registration authority: City of Solingen',
    'impressum.datum': 'Date of registration: 25.03.2024',
    'impressum.steuer': 'Tax Number',
    'impressum.ust': 'VAT ID',
    'impressum.incoming': '(to be provided)',
    'impressum.verantwortlich': 'Responsible for content pursuant to § 55 para. 2 RStV',

    // Datenschutz
    'datenschutz.title': 'Privacy Policy',
    'datenschutz.intro': 'The protection of your personal data is of particular importance to us.',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.impressum': 'Legal Notice',
    'footer.datenschutz': 'Privacy Policy',
    'footer.tagline': 'Coffee, cocktails & unforgettable moments',
    'footer.address': 'Ohligser Markt 5, 42696 Solingen',

    // Common
    'common.back': 'Back',
    'common.more': 'Learn more',
    'common.close': 'Close',
    'common.open.now': 'Open now',
    'common.closed.now': 'Currently closed',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('luxor-lang');
    if (stored === 'en' || stored === 'de') return stored;
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('de') ? 'de' : 'de'; // Default to German
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('luxor-lang', newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key] || translations['de'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
