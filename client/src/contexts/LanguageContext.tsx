import { createContext, useContext, useState, useEffect } from 'react';

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
    'nav.automaten': 'Automaten',
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
    'menu.instruction': 'Klicken Sie auf die Pfeile oder wischen Sie zum Blättern',
    'menu.prev': 'Zurück',
    'menu.next': 'Weiter',
    'menu.cover.title': 'Cafe & Bar Luxor',
    'menu.cover.subtitle': 'Speisekarte',
    'menu.cover.address': 'Ohligser Markt 5 · Solingen',
    'menu.cover.open': 'Öffnen',
    'menu.recipe': 'Rezept',
    'menu.ingredients': 'Zutaten',
    'menu.preparation': 'Zubereitung',

    // Menu categories
    'menu.cat.coffee': 'Kaffee',
    'menu.cat.cold': 'Kaltgetränke',
    'menu.cat.lemonade': 'Hausgemachte Limonade',
    'menu.cat.tee': 'Tee',
    'menu.cat.cocktails': 'Cocktails',
    'menu.cat.cocktails.nona': 'Alkoholfreie Cocktails',
    'menu.cat.spirits': 'Alkohol & Shots',
    'menu.cat.whiskey': 'Whiskey',
    'menu.cat.longdrinks': 'Longdrinks',
    'menu.cat.aperitif': 'Aperitif',
    'menu.cat.beer.draft': 'Zapfbier',
    'menu.cat.beer.bottle': 'Flaschenbier',
    'menu.cat.wine': 'Wein & Sekt',
    'menu.cat.eis': 'Eis & Shakes',

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
    'hours.address': 'Ohligser Markt 5, 42697 Solingen',
    'hours.maps.link': 'In Google Maps öffnen',

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
    'contact.map.open': 'In Google Maps öffnen',

    // Automaten
    'automaten.title': 'Automaten',
    'automaten.subtitle': 'Unterhaltung & Komfort',
    'automaten.intro': 'Im Cafe&Bar Luxor stehen Ihnen verschiedene Automaten für Ihren Komfort und Ihre Unterhaltung zur Verfügung.',
    'automaten.cigarette.title': 'Zigarettenautomat',
    'automaten.cigarette.desc': 'Unser Zigarettenautomat bietet eine Auswahl der beliebtesten Zigarettenmarken. Rund um die Uhr verfügbar für unsere Gäste.',
    'automaten.cigarette.note': 'Nur für Personen ab 18 Jahren. Bitte Ausweis bereithalten.',
    'automaten.spielautomat.title': 'Spielautomat',
    'automaten.spielautomat.desc': 'Zwei moderne Spielautomaten stehen Ihnen für spannende Unterhaltung zur Verfügung. Spielen Sie verantwortungsbewusst.',
    'automaten.spielautomat.note': 'Nur für Personen ab 18 Jahren. Spielen Sie verantwortungsvoll.',
    'automaten.spielautomat.count': '2 Spielautomaten verfügbar',
    'automaten.age.warning': 'Alle Automaten sind ausschließlich für Personen ab 18 Jahren zugänglich.',
    'automaten.responsible': 'Spielen Sie verantwortungsvoll',
    'automaten.help': 'Hilfe bei Spielsucht',
    'automaten.help.desc': 'Bei Problemen mit Glücksspiel wenden Sie sich an die Bundeszentrale für gesundheitliche Aufklärung:',

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
    'impressum.haftung': 'Haftungsausschluss',
    'impressum.haftung.inhalte': 'Haftung für Inhalte',
    'impressum.haftung.inhalte.text': 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
    'impressum.haftung.links': 'Haftung für Links',
    'impressum.haftung.links.text': 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.',
    'impressum.urheberrecht': 'Urheberrecht',
    'impressum.urheberrecht.text': 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.',

    // Datenschutz
    'datenschutz.title': 'Datenschutzerklärung',
    'datenschutz.intro': 'Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.',

    // Footer
    'footer.rights': 'Alle Rechte vorbehalten.',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'footer.tagline': 'Kaffee, Cocktails & unvergessliche Momente',
    'footer.address': 'Ohligser Markt 5, 42697 Solingen',
    'footer.nav.title': 'Navigation',
    'footer.contact.title': 'Kontakt',
    'footer.hours.title': 'Öffnungszeiten',
    'footer.hours.weekday': 'Mo–Sa: 09:00–23:00 Uhr',
    'footer.hours.sunday': 'So: 10:00–22:00 Uhr',

    // Common
    'common.back': 'Zurück',
    'common.more': 'Mehr erfahren',
    'common.close': 'Schließen',
    'common.open.now': 'Jetzt geöffnet',
    'common.closed.now': 'Derzeit geschlossen',
    'common.uhr': 'Uhr',
    'common.age18': 'Ab 18 Jahren',
    'common.address': 'Adresse',
  },

  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.menu': 'Menu',
    'nav.gallery': 'Gallery',
    'nav.hours': 'Opening Hours',
    'nav.contact': 'Contact',
    'nav.automaten': 'Machines',
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
    'menu.instruction': 'Click the arrows or swipe to browse',
    'menu.prev': 'Previous',
    'menu.next': 'Next',
    'menu.cover.title': 'Cafe & Bar Luxor',
    'menu.cover.subtitle': 'Menu',
    'menu.cover.address': 'Ohligser Markt 5 · Solingen',
    'menu.cover.open': 'Open',
    'menu.recipe': 'Recipe',
    'menu.ingredients': 'Ingredients',
    'menu.preparation': 'Preparation',

    // Menu categories
    'menu.cat.coffee': 'Coffee',
    'menu.cat.cold': 'Cold Drinks',
    'menu.cat.lemonade': 'Homemade Lemonade',
    'menu.cat.tee': 'Tea',
    'menu.cat.cocktails': 'Cocktails',
    'menu.cat.cocktails.nona': 'Non-Alcoholic Cocktails',
    'menu.cat.spirits': 'Spirits & Shots',
    'menu.cat.whiskey': 'Whiskey',
    'menu.cat.longdrinks': 'Long Drinks',
    'menu.cat.aperitif': 'Aperitif',
    'menu.cat.beer.draft': 'Draft Beer',
    'menu.cat.beer.bottle': 'Bottled Beer',
    'menu.cat.wine': 'Wine & Sparkling',
    'menu.cat.eis': 'Ice Cream & Shakes',

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
    'hours.address': 'Ohligser Markt 5, 42697 Solingen',
    'hours.maps.link': 'Open in Google Maps',

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
    'contact.map.open': 'Open in Google Maps',

    // Automaten
    'automaten.title': 'Machines',
    'automaten.subtitle': 'Entertainment & Convenience',
    'automaten.intro': 'At Cafe&Bar Luxor, various machines are available for your convenience and entertainment.',
    'automaten.cigarette.title': 'Cigarette Machine',
    'automaten.cigarette.desc': 'Our cigarette machine offers a selection of the most popular cigarette brands. Available around the clock for our guests.',
    'automaten.cigarette.note': 'For persons aged 18 and over only. Please have your ID ready.',
    'automaten.spielautomat.title': 'Slot Machine',
    'automaten.spielautomat.desc': 'Two modern slot machines are available for exciting entertainment. Please play responsibly.',
    'automaten.spielautomat.note': 'For persons aged 18 and over only. Please gamble responsibly.',
    'automaten.spielautomat.count': '2 slot machines available',
    'automaten.age.warning': 'All machines are exclusively accessible to persons aged 18 and over.',
    'automaten.responsible': 'Please gamble responsibly',
    'automaten.help': 'Help with gambling addiction',
    'automaten.help.desc': 'If you have problems with gambling, contact the Federal Centre for Health Education:',

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
    'impressum.haftung': 'Disclaimer',
    'impressum.haftung.inhalte': 'Liability for Content',
    'impressum.haftung.inhalte.text': 'The contents of our pages were created with the utmost care. However, we cannot guarantee the accuracy, completeness or topicality of the content.',
    'impressum.haftung.links': 'Liability for Links',
    'impressum.haftung.links.text': 'Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot assume any liability for these external contents.',
    'impressum.urheberrecht': 'Copyright',
    'impressum.urheberrecht.text': 'The content and works created by the site operators on these pages are subject to German copyright law.',

    // Datenschutz
    'datenschutz.title': 'Privacy Policy',
    'datenschutz.intro': 'The protection of your personal data is of particular importance to us.',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.impressum': 'Legal Notice',
    'footer.datenschutz': 'Privacy Policy',
    'footer.tagline': 'Coffee, cocktails & unforgettable moments',
    'footer.address': 'Ohligser Markt 5, 42697 Solingen',
    'footer.nav.title': 'Navigation',
    'footer.contact.title': 'Contact',
    'footer.hours.title': 'Opening Hours',
    'footer.hours.weekday': 'Mon–Sat: 09:00–23:00',
    'footer.hours.sunday': 'Sun: 10:00–22:00',

    // Common
    'common.back': 'Back',
    'common.more': 'Learn more',
    'common.close': 'Close',
    'common.open.now': 'Open now',
    'common.closed.now': 'Currently closed',
    'common.uhr': '',
    'common.age18': 'Ages 18+',
    'common.address': 'Address',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem('luxor-lang');
    if (stored === 'en' || stored === 'de') return stored;
    return 'de'; // Default to German
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
