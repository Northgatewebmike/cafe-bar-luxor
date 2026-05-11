/**
 * About Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Story, values, atmosphere
 */
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Wifi, Calendar, CreditCard, Dog, Accessibility, Tv } from 'lucide-react';

const ABOUT_BG = '/manus-storage/real-photo-3_90e7752e.jpg';  // Terrace golden hour
const HERO_BG = '/manus-storage/real-photo-2_e4b6d6ba.jpg';   // Terrace daytime
const INTERIOR_BG = '/manus-storage/real-photo-1_8c74bd6b.jpg'; // Interior blue neon

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

export default function About() {
  const { t } = useLanguage();
  useReveal();

  const features = [
    { icon: <Wifi size={20} />, label: t('about.features.wifi') },
    { icon: <Calendar size={20} />, label: t('about.features.reservations') },
    { icon: <CreditCard size={20} />, label: t('about.features.payment') },
    { icon: <Dog size={20} />, label: t('about.features.dogs') },
    { icon: <Accessibility size={20} />, label: t('about.features.accessible') },
    { icon: <Tv size={20} />, label: t('about.features.sport') },
  ];

  const values = [
    {
      title: t('about.values.quality'),
      desc: t('about.values.quality.desc'),
      icon: '✦',
    },
    {
      title: t('about.values.warmth'),
      desc: t('about.values.warmth.desc'),
      icon: '♥',
    },
    {
      title: t('about.values.community'),
      desc: t('about.values.community.desc'),
      icon: '◈',
    },
  ];

  return (
    <div className="page-enter pt-16 md:pt-20">
      {/* ============ PAGE HERO ============ */}
      <section className="relative h-64 md:h-80 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${INTERIOR_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/60 to-[#0a0000]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-700" />
            <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {t('about.subtitle')}
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('about.title')}
          </h1>
        </div>
      </section>

      {/* ============ STORY SECTION ============ */}
      <section className="py-16 md:py-24 bg-[#0a0603]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="reveal-left relative">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={ABOUT_BG}
                  alt="Cafe&Bar Luxor Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0603]/40 to-transparent" />
              </div>
              {/* Decorative gold border */}
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-red-700/30 pointer-events-none" />
              {/* Gold accent */}
              <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-red-700" />
            </div>

            {/* Text */}
            <div className="reveal-right">
              <h2
                className="text-3xl md:text-4xl font-semibold text-white mb-6"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Cafe&Bar <span className="text-red-700">Luxor</span>
              </h2>
              <div className="space-y-4">
                {[t('about.story.p1'), t('about.story.p2'), t('about.story.p3')].map((para, i) => (
                  <p
                    key={i}
                    className="text-white/65 leading-relaxed text-base"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Gold divider */}
              <div className="my-6 h-px w-24 bg-gradient-to-r from-red-700 to-transparent" />

              {/* Address */}
              <div className="flex items-center gap-3">
                <span className="text-red-700 text-lg">📍</span>
                <span className="text-white/50 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Ohligser Markt 5, 42696 Solingen
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VALUES SECTION ============ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url(${ABOUT_BG})` }}
        />
        <div className="absolute inset-0 bg-[#0a0000]/88" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-700" />
              <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('about.values.title')}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-700" />
            </div>
            <h2
              className="text-3xl md:text-4xl font-semibold text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="reveal card-3d p-8 text-center border border-white/8 hover:border-red-700/30 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div
                  className="text-4xl text-red-700 mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {value.icon}
                </div>
                <h3
                  className="text-xl font-semibold text-white mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-white/55 text-sm leading-relaxed"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES / AMENITIES ============ */}
      <section className="py-16 md:py-24 bg-[#080503]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2
              className="text-3xl md:text-4xl font-semibold text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t('about.features.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="reveal flex items-center gap-3 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <span className="text-red-700 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
                <span
                  className="text-white/65 text-sm group-hover:text-white/90 transition-colors duration-300"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
