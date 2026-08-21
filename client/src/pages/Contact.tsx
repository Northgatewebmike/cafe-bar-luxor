/**
 * Contact Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Phone/WhatsApp booking, info, interactive Google Maps
 */
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Clock, Phone, Shield } from 'lucide-react';
import { Link } from 'wouter';
import { MapView } from '@/components/Map';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';
const LUXOR_LAT = 51.16245;
const LUXOR_LNG = 6.9989;

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Contact() {
  const { t, lang } = useLanguage();
  const mapRef = useRef<google.maps.Map | null>(null);
  const reservationWhatsAppUrl = `https://wa.me/4917621899372?text=${encodeURIComponent(
    lang === 'de'
      ? 'Hallo Cafe&Bar Luxor, ich möchte gerne einen Tisch reservieren.\n\nName:\nDatum:\nUhrzeit:\nPersonenanzahl:'
      : 'Hello Cafe&Bar Luxor, I would like to request a table reservation.\n\nName:\nDate:\nTime:\nNumber of guests:'
  )}`;
  useReveal();

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0603]">
      {/* ============ PAGE HERO ============ */}
      <section className="relative h-48 md:h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/60 to-[#0a0603]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-700" />
            <span
              className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Cafe&Bar Luxor
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('contact.title')}
          </h1>
        </div>
      </section>

      {/* ============ CONTACT CONTENT ============ */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-white/50 text-base mb-12 reveal"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {lang === 'de' ? 'Rufen Sie uns an oder schreiben Sie uns — wir freuen uns auf Ihren Besuch!' : 'Call or message us — we look forward to welcoming you!'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ---- CALL / WHATSAPP ---- */}
            <div className="reveal-left flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-red-700" />
                  <span
                    className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {lang === 'de' ? 'Reservierung & Kontakt' : 'Reservations & contact'}
                  </span>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {lang === 'de' ? 'Tisch reservieren' : 'Request a table'}
                </h2>
                <p
                  className="text-white/55 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {lang === 'de'
                    ? 'Senden Sie uns Ihre Reservierungsanfrage per WhatsApp oder rufen Sie direkt an. Ein Tisch ist erst nach unserer Bestätigung reserviert.'
                    : 'Send your reservation request by WhatsApp or call us directly. A table is reserved only after we confirm it.'}
                </p>
              </div>

              {/* Big Call Button */}
              <a
                href="tel:+4917621899372"
                className="group flex items-center gap-5 w-full py-6 px-8 bg-red-700 hover:bg-red-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone size={30} className="text-white flex-shrink-0 group-hover:animate-pulse" />
                <div>
                  <p
                    className="text-white/70 text-xs tracking-widest uppercase mb-1"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {lang === 'de' ? 'Jetzt anrufen' : 'Call now'}
                  </p>
                  <p
                    className="text-white text-lg font-bold tracking-wide"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {lang === 'de' ? 'Zum Anrufen tippen' : 'Tap to call'}
                  </p>
                </div>
              </a>

              {/* WhatsApp Button */}
              <a
                href={reservationWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 w-full py-5 px-8 border border-green-600/40 bg-green-600/5 hover:bg-green-600/15 hover:border-green-500/60 transition-all duration-300"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-green-500 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p
                    className="text-white/60 text-xs tracking-widest uppercase mb-0.5"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {lang === 'de' ? 'WhatsApp-Reservierung' : 'WhatsApp reservation'}
                  </p>
                  <p
                    className="text-green-400 text-lg font-semibold"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {lang === 'de' ? 'Reservierungsanfrage senden' : 'Send reservation request'}
                  </p>
                </div>
              </a>

              {/* Info cards */}
              <div className="space-y-3 mt-2">
                {/* Address */}
                <div
                  className="flex items-start gap-4 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <MapPin size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p
                      className="text-white/40 text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {t('contact.info.address')}
                    </p>
                    <p
                      className="text-white/80 text-sm"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Ohligser Markt 5<br />
                      42697 Solingen, Deutschland
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div
                  className="flex items-start gap-4 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <Clock size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p
                      className="text-white/40 text-xs tracking-widest uppercase mb-1"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {t('contact.info.hours')}
                    </p>
                    <p
                      className="text-white/80 text-sm"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      Mo–Do: 09:00–21:00 Uhr<br />
                      Fr–Sa: 09:00–23:00 Uhr<br />
                      So: 10:00–21:00 Uhr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- INTERACTIVE MAP ---- */}
            <div className="reveal-right">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-red-700" />
                <span
                  className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {t('contact.map.title')}
                </span>
              </div>
              <div className="relative overflow-hidden border border-white/10 hover:border-red-700/30 transition-all duration-500">
                <MapView
                  className="w-full h-[420px]"
                  initialCenter={{ lat: LUXOR_LAT, lng: LUXOR_LNG }}
                  initialZoom={17}
                  onMapReady={(map) => {
                    mapRef.current = map;
                    new window.google.maps.marker.AdvancedMarkerElement({
                      map,
                      position: { lat: LUXOR_LAT, lng: LUXOR_LNG },
                      title: 'Cafe&Bar Luxor — Ohligser Markt 5',
                    });
                  }}
                />
                <div className="absolute inset-0 pointer-events-none border border-red-700/20" />
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)' }}
                />
              </div>
              <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <p
                  className="text-white/30 text-xs"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  Ohligser Markt 5, 42697 Solingen, Deutschland
                </p>
                <a
                  href="https://maps.app.goo.gl/AqP7qYQ39kBf4gvz6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-700 text-xs hover:text-[#dc5050] transition-colors flex items-center gap-1"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  <MapPin size={12} />
                  In Google Maps öffnen →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* DSGVO Art. 13 privacy notice — full width below grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-10">
          <div
            className="flex items-start gap-3 p-4 border border-white/8"
            style={{ background: 'rgba(255,255,255,0.015)' }}
          >
            <Shield size={16} className="text-white/25 flex-shrink-0 mt-0.5" />
            <p className="text-white/30 text-xs leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {lang === 'de'
                ? 'Ihre Kontaktdaten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b/f DSGVO. '
                : 'Your contact details are used solely to process your inquiry and are not shared with third parties. Legal basis: Art. 6(1)(b)/(f) GDPR. '}
              <Link href="/datenschutz">
                <span className="text-red-700/60 hover:text-red-700 transition-colors cursor-pointer underline">
                  {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
