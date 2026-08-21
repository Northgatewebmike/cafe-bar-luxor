/**
 * Home Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Cinematic hero, 3D scroll animations, testimonials
 * Updates: removed scroll button, strong hook, Google Maps, payment methods
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Coffee, Sparkles, MapPin, Clock, CreditCard } from 'lucide-react';
import { MapView } from '@/components/Map';

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

const HERO_BG = '/manus-storage/real-photo-8_da6a67e8.jpg';
const ABOUT_BG = '/manus-storage/real-photo-3_90e7752e.jpg';
const COCKTAIL_IMG = '/manus-storage/real-photo-2_e4b6d6ba.jpg';
const COFFEE_IMG = '/manus-storage/real-photo-1_8c74bd6b.jpg';

export default function Home() {
  const { t, lang } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const mapRef = useRef<google.maps.Map | null>(null);
  const reservationWhatsAppUrl = `https://wa.me/4917621899372?text=${encodeURIComponent(
    lang === 'de'
      ? 'Hallo Cafe&Bar Luxor, ich möchte gerne einen Tisch reservieren.\n\nName:\nDatum:\nUhrzeit:\nPersonenanzahl:'
      : 'Hello Cafe&Bar Luxor, I would like to request a table reservation.\n\nName:\nDate:\nTime:\nNumber of guests:'
  )}`;
  useReveal();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.4;

  return (
    <div className="page-enter">
      {/* ============ HERO SECTION ============ */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: `url(${HERO_BG})`,
            transform: `scale(1.1) translateY(${parallaxOffset * 0.3}px)`,
            willChange: 'transform',
          }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        {/* Warm vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,0,0,0.7) 100%)'
        }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Pre-title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-red-700" />
            <span
              className="text-red-500 text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Solingen · Ohligser Markt
            </span>
            <div className="h-px w-12 bg-red-700" />
          </div>

          {/* Main Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}
          >
            Cafe&Bar
            <br />
            <span className="text-red-600">Luxor</span>
          </h1>

          {/* Strong Hook — 2-3 sentences */}
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white font-semibold mb-3 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          >
            {lang === 'de'
              ? 'Kein gewöhnlicher Ort. Ein Erlebnis.'
              : 'Not just a place. An experience.'}
          </p>
          <p
            className="text-base sm:text-lg text-white/80 mb-3 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif", textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
          >
            {lang === 'de'
              ? 'Frisch gezapftes Bier, handgemachte Cocktails und der beste Kaffee der Stadt — mitten auf dem Ohligser Markt.'
              : 'Freshly tapped beer, handcrafted cocktails and the best coffee in town — right in the heart of Ohligser Markt.'}
          </p>
          <p
            className="text-sm sm:text-base text-white/60 mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {lang === 'de'
              ? 'Seit 2024 der Treffpunkt für unvergessliche Momente in Solingen.'
              : 'Since 2024, the meeting point for unforgettable moments in Solingen.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/speisekarte">
              <button
                className="px-8 py-4 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:brightness-110"
                style={{ background: 'rgba(180,0,0,0.9)', color: 'white', fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {t('home.hero.cta')}
              </button>
            </Link>
            <div className="flex flex-col items-center gap-2">
              <a href={reservationWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                <button
                  className="group px-8 py-4 border border-green-400/60 bg-green-500/10 text-white font-medium text-sm tracking-widest uppercase transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-green-400 hover:bg-green-500/20 hover:shadow-[0_0_22px_rgba(34,197,94,0.35)] focus-visible:-translate-y-0.5 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {lang === 'de' ? 'Per WhatsApp reservieren' : 'Reserve via WhatsApp'}
                  <span className="block text-xs text-green-200/80 mt-0.5 normal-case tracking-normal transition-colors duration-200 group-hover:text-green-100" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{lang === 'de' ? 'Reservierungsanfrage senden' : 'Send a reservation request'}</span>
                </button>
              </a>
              <a href="tel:+4917621899372" className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {lang === 'de' ? 'Oder direkt anrufen' : 'Or call directly'}
              </a>
            </div>
          </div>
        </div>
        {/* NO scroll indicator — removed as requested */}
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-20 md:py-28 bg-[#0a0000] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #b00000 0, #b00000 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-700" />
              <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Cafe &amp; Bar Luxor
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-700" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-semibold text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t('home.features.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Coffee size={28} className="text-red-500" />,
                title: t('home.features.coffee.title'),
                desc: t('home.features.coffee.desc'),
                delay: '0ms',
                img: COFFEE_IMG,
              },
              {
                icon: <span className="text-2xl">🍸</span>,
                title: t('home.features.cocktails.title'),
                desc: t('home.features.cocktails.desc'),
                delay: '150ms',
                img: COCKTAIL_IMG,
              },
              {
                icon: <Sparkles size={28} className="text-red-500" />,
                title: t('home.features.atmosphere.title'),
                desc: t('home.features.atmosphere.desc'),
                delay: '300ms',
                img: ABOUT_BG,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="reveal card-3d group relative overflow-hidden border border-white/5 hover:border-red-700/30 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  transitionDelay: feature.delay,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-white mb-3 group-hover:text-red-500 transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-white/55 text-sm leading-relaxed"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {feature.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-700 group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT TEASER ============ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_BG})` }}
        />
        <div className="absolute inset-0 bg-[#0a0000]/85" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-red-700" />
                <span className="text-red-500 text-xs tracking-[0.3em] uppercase font-medium"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {t('about.subtitle')}
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {t('about.title')}
              </h2>
              <p
                className="text-white/65 leading-relaxed mb-6 text-base"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {t('about.story.p1')}
              </p>
              <Link href="/ueber-uns">
                <button className="flex items-center gap-3 text-red-500 font-medium text-sm tracking-wide hover:gap-5 transition-all duration-300 group"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  <span>{t('common.more')}</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </Link>
            </div>

            <div className="reveal-right grid grid-cols-2 gap-4">
              {[
                { num: '2024', label: lang === 'de' ? 'Eröffnet' : 'Founded' },
                { num: '☕', label: lang === 'de' ? 'Kaffee & Bar' : 'Coffee & Bar' },
                { num: '€2', label: lang === 'de' ? 'Espresso ab' : 'Espresso from' },
                { num: '∞', label: lang === 'de' ? 'Herzlichkeit' : 'Warmth' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 border border-white/10 hover:border-red-700/40 transition-all duration-300 text-center group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className="text-3xl md:text-4xl font-bold text-red-600 mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="text-white/40 text-xs tracking-wide"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PAYMENT METHODS ============ */}
      <section className="py-16 bg-[#0a0000] border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-700" />
              <CreditCard size={18} className="text-red-500" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-700" />
            </div>
            <h2
              className="text-2xl md:text-3xl font-semibold text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {lang === 'de' ? 'Zahlungsmethoden' : 'Payment Methods'}
            </h2>
            <p className="text-white/50 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {lang === 'de'
                ? 'Wir akzeptieren Barzahlung sowie alle gängigen Karten und digitalen Zahlungen via SumUp.'
                : 'We accept cash and all major cards and digital payments via SumUp.'}
            </p>
          </div>

          <div className="reveal grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {/* Cash */}
            <div className="flex flex-col items-center gap-2 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-3xl">💵</span>
              <span className="text-white/70 text-xs font-medium tracking-wide uppercase"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {lang === 'de' ? 'Bargeld' : 'Cash'}
              </span>
            </div>
            {/* Visa */}
            <div className="flex flex-col items-center gap-2 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-white font-bold text-xl italic tracking-tight" style={{ fontFamily: 'sans-serif' }}>VISA</span>
              <span className="text-white/70 text-xs font-medium tracking-wide uppercase"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Visa</span>
            </div>
            {/* Mastercard */}
            <div className="flex flex-col items-center gap-2 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-red-600 opacity-90" />
                <div className="w-6 h-6 rounded-full bg-orange-400 opacity-90 -ml-3" />
              </div>
              <span className="text-white/70 text-xs font-medium tracking-wide uppercase"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Mastercard</span>
            </div>
            {/* G Pay / Apple Pay */}
            <div className="flex flex-col items-center gap-2 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span className="text-white text-sm font-semibold">G Pay</span>
              <span className="text-white/70 text-xs font-medium tracking-wide uppercase"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>Apple Pay</span>
            </div>
          </div>

          {/* More payment methods */}
          <div className="reveal flex flex-wrap items-center justify-center gap-3 text-white/40 text-xs"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {['V Pay', 'Maestro', 'American Express', 'Diners Club', 'Discover', 'UnionPay', 'NFC Kontaktlos'].map((m) => (
              <span key={m} className="px-3 py-1 border border-white/8 rounded-sm">{m}</span>
            ))}
          </div>
          <p className="text-center text-white/25 text-xs mt-4" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {lang === 'de' ? 'Powered by SumUp' : 'Powered by SumUp'}
          </p>
        </div>
      </section>

      {/* ============ COFFEE TO GO + BEER HIGHLIGHT ============ */}
      <section className="py-16 bg-[#0a0000] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coffee to Go card */}
            <div className="reveal-left relative overflow-hidden border border-white/8 hover:border-red-700/30 transition-all duration-500 p-8"
              style={{ background: 'linear-gradient(135deg, rgba(60,20,0,0.4) 0%, rgba(10,0,0,0.8) 100%)' }}>
              <div className="flex items-center gap-3 mb-4">
                <Coffee size={24} className="text-red-500" />
                <h3 className="text-2xl font-semibold text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {lang === 'de' ? 'Kaffee to Go' : 'Coffee to Go'}
                </h3>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-4"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {lang === 'de'
                  ? 'Keine Zeit zum Verweilen? Kein Problem. Unser Kaffee to Go ist frisch gebrüht und begleitet Sie perfekt durch den Tag — ob Espresso, Cappuccino oder Latte Macchiato.'
                  : 'No time to stay? No problem. Our coffee to go is freshly brewed and the perfect companion for your day — espresso, cappuccino or latte macchiato.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {['Espresso €2', 'Cappuccino €3', 'Latte Macchiato €3', 'Frappé €3–3,50'].map(item => (
                  <span key={item} className="px-3 py-1 text-xs border border-red-700/30 text-red-400"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}>{item}</span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-700 group-hover:w-full transition-all duration-500" />
            </div>

            {/* Fresh beer highlight card */}
            <div className="reveal-right relative overflow-hidden border border-white/8 hover:border-red-700/30 transition-all duration-500 p-8"
              style={{ background: 'linear-gradient(135deg, rgba(10,0,0,0.8) 0%, rgba(40,10,0,0.5) 100%)' }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🍺</span>
                <h3 className="text-2xl font-semibold text-white"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {lang === 'de' ? 'Frisch Gezapftes Bier' : 'Fresh Draft Beer'}
                </h3>
              </div>
              <p className="text-white/65 text-sm leading-relaxed mb-4"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {lang === 'de'
                  ? 'Eiskalt, frisch gezapft und unschlagbar günstig — das günstigste Bier im Umkreis von Solingen, Remscheid und Wuppertal. Veltins vom Fass und Früh Kölsch, perfekt für jede Jahreszeit.'
                  : 'Ice cold, freshly tapped and unbeatable value — the most affordable beer in the Solingen, Remscheid and Wuppertal area. Veltins on tap and Früh Kölsch, perfect for every season.'}
              </p>
              {/* Sizes grid */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[
                  { size: '0,2 l', price: '€2,00' },
                  { size: '0,3 l', price: '€2,70' },
                  { size: '0,4 l', price: '€3,60' },
                  { size: '0,5 l', price: '€4,50' },
                ].map((s, i) => (
                  <div key={i} className="text-center py-2" style={{ background: 'rgba(180,0,0,0.1)', border: '1px solid rgba(180,0,0,0.25)' }}>
                    <div className="text-white text-sm font-bold" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{s.size}</div>
                    <div className="text-red-400 text-xs font-semibold">{s.price}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 border border-red-700/25"
                style={{ background: 'rgba(180,0,0,0.08)' }}>
                <p className="text-red-400 text-sm font-semibold"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                  {lang === 'de'
                    ? '🏆 Das günstigste Bier in Solingen · Remscheid · Wuppertal'
                    : '🏆 Most affordable beer in Solingen · Remscheid · Wuppertal'}
                </p>
                <p className="text-white/50 text-xs mt-1" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Veltins vom Fass · Früh Kölsch vom Fass
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GOOGLE MAPS (Interactive) ============ */}
      <section className="py-16 bg-[#080000]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-700" />
              <MapPin size={18} className="text-red-500" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-700" />
            </div>
            <h2
              className="text-2xl md:text-3xl font-semibold text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {lang === 'de' ? 'So finden Sie uns' : 'Find Us'}
            </h2>
            <p className="text-white/50 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Ohligser Markt 5 · 42697 Solingen · Deutschland
            </p>
          </div>

          {/* Interactive Google Maps */}
          <div className="reveal relative overflow-hidden border border-white/10 hover:border-red-700/30 transition-all duration-500">
            <MapView
              className="w-full h-[380px]"
              initialCenter={{ lat: 51.16245, lng: 6.9989 }}
              initialZoom={16}
              onMapReady={(map) => {
                mapRef.current = map;
                // Add a marker for Cafe&Bar Luxor
                new window.google.maps.marker.AdvancedMarkerElement({
                  map,
                  position: { lat: 51.16245, lng: 6.9989 },
                  title: 'Cafe&Bar Luxor',
                });
              }}
            />
            <div className="absolute inset-0 pointer-events-none border border-red-700/20" />
          </div>

          {/* Address + hours quick info */}
          <div className="reveal mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 border border-white/8"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <MapPin size={16} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-white text-sm font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Ohligser Markt 5
                </p>
                <p className="text-white/50 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  42697 Solingen, Deutschland
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border border-white/8"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <Clock size={16} className="text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-white text-sm font-medium" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Mo–Do: 09:00–21:00
                </p>
                <p className="text-white/50 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Fr–Sa: 09:00–23:00
                </p>
                <p className="text-white/50 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  So: 10:00–21:00
                </p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/AqP7qYQ39kBf4gvz6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 p-4 border border-red-700/30 hover:border-red-600 hover:bg-red-700/10 transition-all duration-300 text-red-500 text-sm font-semibold tracking-wide uppercase"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <MapPin size={16} />
              {lang === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}
            </a>
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0000 0%, #1a0000 50%, #0a0000 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #1a0000 0, #1a0000 1px, transparent 0, transparent 50%)',
          backgroundSize: '10px 10px'
        }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {lang === 'de' ? 'Besuchen Sie uns noch heute' : 'Visit Us Today'}
          </h2>
          <p
            className="text-white/60 mb-8 text-base"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Ohligser Markt 5 · 42697 Solingen · Mo–Do 09:00–21:00 · Fr–Sa 09:00–23:00 · So 10:00–21:00
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/speisekarte">
              <button
                className="px-8 py-3 font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{ background: 'rgba(180,0,0,0.9)', color: 'white', fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {t('home.hero.cta')}
              </button>
            </Link>
            <Link href="/oeffnungszeiten">
              <button
                className="px-8 py-3 border border-white/30 text-white/80 font-semibold text-sm tracking-widest uppercase hover:border-red-700 hover:text-red-400 transition-all duration-300"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {t('nav.hours')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
