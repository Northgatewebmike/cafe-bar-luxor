/**
 * Opening Hours Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Clean, elegant hours display with today highlight
 */
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { MapView } from '@/components/Map';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

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

function isCurrentlyOpen(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const time = hours * 60 + minutes;

  if (day === 5 || day === 6) {
    // Fri–Sat: 09:00–23:00
    return time >= 540 && time < 1380;
  } else {
    // Mo–Do + So: 09:00–21:00
    return time >= 540 && time < 1260;
  }
}

export default function Hours() {
  const { t, lang } = useLanguage();
  const today = new Date().getDay(); // 0=Sun
  const openNow = isCurrentlyOpen();
  const mapRef = useRef<google.maps.Map | null>(null);
  useReveal();

  const schedule = [
    { key: 'hours.monday', day: 1, open: '09:00', close: '21:00', isOpen: true },
    { key: 'hours.tuesday', day: 2, open: '09:00', close: '21:00', isOpen: true },
    { key: 'hours.wednesday', day: 3, open: '09:00', close: '21:00', isOpen: true },
    { key: 'hours.thursday', day: 4, open: '09:00', close: '21:00', isOpen: true },
    { key: 'hours.friday', day: 5, open: '09:00', close: '23:00', isOpen: true },
    { key: 'hours.saturday', day: 6, open: '09:00', close: '23:00', isOpen: true },
    { key: 'hours.sunday', day: 0, open: '10:00', close: '21:00', isOpen: true },
  ];

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
            <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Cafe&Bar Luxor
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('hours.title')}
          </h1>
        </div>
      </section>

      {/* ============ HOURS CONTENT ============ */}
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Open/Closed status badge */}
          <div className="flex justify-center mb-10 reveal">
            <div
              className={`flex items-center gap-3 px-6 py-3 border ${
                openNow
                  ? 'border-green-500/40 bg-green-500/10'
                  : 'border-red-500/40 bg-red-500/10'
              }`}
            >
              {openNow ? (
                <CheckCircle size={18} className="text-green-400" />
              ) : (
                <XCircle size={18} className="text-red-400" />
              )}
              <span
                className={`text-sm font-semibold tracking-wide ${
                  openNow ? 'text-green-400' : 'text-red-400'
                }`}
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {openNow ? t('common.open.now') : t('common.closed.now')}
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="text-center text-white/50 text-base mb-12 reveal"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t('hours.subtitle')}
          </p>

          {/* Hours Table */}
          <div className="reveal border border-white/10 overflow-hidden">
            {schedule.map((item, i) => {
              const isToday = item.day === today;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 transition-all duration-300 ${
                    isToday
                      ? 'bg-red-700/10 border-l-2 border-l-[rgba(180,0,0,0.85)]'
                      : 'hover:bg-white/3'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <span
                        className="text-red-700 text-xs font-bold tracking-widest uppercase"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {t('hours.today')}
                      </span>
                    )}
                    <span
                      className={`text-base font-medium ${
                        isToday ? 'text-red-700' : 'text-white/80'
                      }`}
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem' }}
                    >
                      {t(item.key)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.isOpen ? (
                      <span
                        className={`text-base font-medium ${
                          isToday ? 'text-red-700' : 'text-white/70'
                        }`}
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {item.open} – {item.close} Uhr
                      </span>
                    ) : (
                      <span
                        className="text-red-400/70 text-sm"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {t('hours.closed')}
                      </span>
                    )}
                    {isToday && (
                      <Clock size={14} className="text-red-700" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Note */}
          <p
            className="text-white/30 text-xs mt-4 text-center"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t('hours.note')}
          </p>

          {/* Location Card */}
          <div className="mt-12 reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-red-700" />
              <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('hours.find.us')}
              </span>
            </div>

            <div
              className="p-6 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <MapPin size={24} className="text-red-700 flex-shrink-0" />
              <div>
                <p
                  className="text-white text-base font-medium"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem' }}
                >
                  Cafe&Bar Luxor
                </p>
                <p
                  className="text-white/55 text-sm"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {t('hours.address')}
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/AqP7qYQ39kBf4gvz6"
                target="_blank"
                rel="noopener noreferrer"
                className="sm:ml-auto px-4 py-2 border border-red-700/40 text-red-700 text-xs font-medium tracking-wide uppercase hover:bg-red-700/10 transition-all duration-300"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                Google Maps →
              </a>
            </div>
          </div>

          {/* ============ INTERACTIVE GOOGLE MAPS ============ */}
          <div className="mt-12 reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-red-700" />
              <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {lang === 'de' ? 'Karte & Anfahrt' : 'Map & Directions'}
              </span>
            </div>
            <div className="relative overflow-hidden border border-white/10 hover:border-red-700/30 transition-all duration-500">
              <MapView
                className="w-full h-[360px]"
                initialCenter={{ lat: 51.16245, lng: 6.9989 }}
                initialZoom={16}
                onMapReady={(map) => {
                  mapRef.current = map;
                  new window.google.maps.marker.AdvancedMarkerElement({
                    map,
                    position: { lat: 51.16245, lng: 6.9989 },
                    title: 'Cafe&Bar Luxor',
                  });
                }}
              />
              <div className="absolute inset-0 pointer-events-none border border-red-700/20" />
            </div>
            <a
              href="https://maps.app.goo.gl/AqP7qYQ39kBf4gvz6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 py-3 border border-red-700/30 hover:border-red-600 hover:bg-red-700/10 transition-all duration-300 text-red-500 text-sm font-semibold tracking-wide uppercase"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              <MapPin size={15} />
              {lang === 'de' ? 'In Google Maps öffnen' : 'Open in Google Maps'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
