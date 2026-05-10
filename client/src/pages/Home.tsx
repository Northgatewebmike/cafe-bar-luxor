/**
 * Home Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Cinematic hero, 3D scroll animations, testimonials
 */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Coffee, Martini, Sparkles, Star, ChevronDown } from 'lucide-react';

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

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';
const ABOUT_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/about-bg-2vMEk2NZGSdNcMaLn7t4Mh.webp';
const COCKTAIL_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/gallery-2-gyAU8VZZPmDtsvTHnEbb8j.webp';
const COFFEE_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/gallery-1-T4DBiubgsWCM4UCyaH7Sqw.webp';

export default function Home() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
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
        {/* Warm amber vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,6,3,0.7) 100%)'
        }} />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Pre-title */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#c9a84c]" />
            <span
              className="text-[#c9a84c] text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Solingen · Ohligser Markt
            </span>
            <div className="h-px w-12 bg-[#c9a84c]" />
          </div>

          {/* Main Title */}
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 40px rgba(0,0,0,0.8)' }}
          >
            Cafe&Bar
            <br />
            <span className="text-[#c9a84c]">Luxor</span>
          </h1>

          {/* Tagline */}
          <p
            className="text-xl sm:text-2xl md:text-3xl text-white/90 italic mb-3 font-light"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
          >
            {t('home.hero.tagline')}
          </p>

          {/* Subtitle */}
          <p
            className="text-sm sm:text-base text-white/60 mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t('home.hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/speisekarte">
              <button className="px-8 py-4 bg-[#c9a84c] text-[#0a0603] font-semibold text-sm tracking-widest uppercase hover:bg-[#e8c87a] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#c9a84c]/30"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('home.hero.cta')}
              </button>
            </Link>
            <Link href="/kontakt">
              <button className="px-8 py-4 border border-white/40 text-white font-medium text-sm tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('home.hero.cta2')}
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown size={20} className="text-[#c9a84c]/60" />
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="py-20 md:py-28 bg-[#0a0603] relative overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section header */}
          <div className="text-center mb-16 reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Cafe & Bar Luxor
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-semibold text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t('home.features.title')}
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Coffee size={28} className="text-[#c9a84c]" />,
                title: t('home.features.coffee.title'),
                desc: t('home.features.coffee.desc'),
                delay: '0ms',
                img: COFFEE_IMG,
              },
              {
                icon: <span className="text-2xl text-[#c9a84c]">🍸</span>,
                title: t('home.features.cocktails.title'),
                desc: t('home.features.cocktails.desc'),
                delay: '150ms',
                img: COCKTAIL_IMG,
              },
              {
                icon: <Sparkles size={28} className="text-[#c9a84c]" />,
                title: t('home.features.atmosphere.title'),
                desc: t('home.features.atmosphere.desc'),
                delay: '300ms',
                img: ABOUT_BG,
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="reveal card-3d group relative overflow-hidden border border-white/5 hover:border-[#c9a84c]/30 transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  transitionDelay: feature.delay,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Image overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    {feature.icon}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-white mb-3 group-hover:text-[#c9a84c] transition-colors duration-300"
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
                {/* Gold bottom line on hover */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#c9a84c] group-hover:w-full transition-all duration-500" />
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
        <div className="absolute inset-0 bg-[#0a0603]/85" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-[#c9a84c]" />
                <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium"
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
                <button className="flex items-center gap-3 text-[#c9a84c] font-medium text-sm tracking-wide hover:gap-5 transition-all duration-300 group"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  <span>{t('common.more')}</span>
                  <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="reveal-right grid grid-cols-2 gap-4">
              {[
                { num: '2024', label: 'Eröffnet / Founded' },
                { num: '5★', label: 'Google Bewertung' },
                { num: '€5', label: 'Aperol Spritz' },
                { num: '∞', label: 'Herzlichkeit / Warmth' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 border border-white/10 hover:border-[#c9a84c]/40 transition-all duration-300 text-center group"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div
                    className="text-3xl md:text-4xl font-bold text-[#c9a84c] mb-2"
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

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-20 md:py-28 bg-[#080503]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14 reveal">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Google Reviews
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-semibold text-white"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t('home.testimonials.title')}
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: t('home.testimonials.1.text'),
                author: t('home.testimonials.1.author'),
                role: t('home.testimonials.1.role'),
                stars: 5,
                delay: '0ms',
                initials: 'JF',
              },
              {
                text: t('home.testimonials.2.text'),
                author: t('home.testimonials.2.author'),
                role: t('home.testimonials.2.role'),
                stars: 5,
                delay: '150ms',
                initials: 'LK',
              },
              {
                text: t('home.testimonials.3.text'),
                author: t('home.testimonials.3.author'),
                role: t('home.testimonials.3.role'),
                stars: 5,
                delay: '300ms',
                initials: 'DN',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="reveal card-3d p-6 md:p-8 border border-white/8 hover:border-[#c9a84c]/25 transition-all duration-500 relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  transitionDelay: testimonial.delay,
                }}
              >
                {/* Quote mark */}
                <div
                  className="text-6xl text-[#c9a84c]/20 leading-none mb-2 -mt-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, j) => (
                    <Star key={j} size={14} className="text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                </div>

                {/* Text */}
                <p
                  className="text-white/70 text-sm leading-relaxed mb-6 italic"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem' }}
                >
                  „{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center">
                    <span className="text-[#c9a84c] text-xs font-bold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {testimonial.author}
                    </div>
                    <div className="text-white/40 text-xs"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="py-16 bg-[#c9a84c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #0a0603 0, #0a0603 1px, transparent 0, transparent 50%)',
          backgroundSize: '10px 10px'
        }} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#0a0603] mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('home.hero.tagline')}
          </h2>
          <p
            className="text-[#0a0603]/70 mb-8 text-base"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            Ohligser Markt 5 · 42696 Solingen · Mo–Sa 09:00–21:00 · So 10:00–20:00
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/speisekarte">
              <button className="px-8 py-3 bg-[#0a0603] text-[#c9a84c] font-semibold text-sm tracking-widest uppercase hover:bg-[#1a0f08] transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('home.hero.cta')}
              </button>
            </Link>
            <Link href="/oeffnungszeiten">
              <button className="px-8 py-3 border-2 border-[#0a0603] text-[#0a0603] font-semibold text-sm tracking-widest uppercase hover:bg-[#0a0603] hover:text-[#c9a84c] transition-all duration-300"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('nav.hours')}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
