/**
 * 404 Not Found — Cafe&Bar Luxor
 * Design: "Warme Patina" — Dark luxury 404 page
 */
import { Link } from 'wouter';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
      style={{ background: '#0a0603' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      <div className="absolute inset-0 bg-[#0a0603]/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* 404 Number */}
        <div
          className="text-[120px] md:text-[180px] font-bold leading-none"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            background: 'linear-gradient(135deg, rgba(180,0,0,0.85) 0%, #dc5050 50%, rgba(180,0,0,0.85) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0.8,
          }}
        >
          404
        </div>

        {/* Gold divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-700" />
          <span className="text-red-700 text-lg">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-700" />
        </div>

        <h1
          className="text-2xl md:text-3xl font-semibold text-white mb-3"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Seite nicht gefunden · Page not found
        </h1>

        <p
          className="text-white/50 text-base mb-8 max-w-md mx-auto"
          style={{ fontFamily: "'Source Sans 3', sans-serif" }}
        >
          Diese Seite existiert leider nicht. Vielleicht finden Sie, was Sie suchen, auf unserer Startseite.
        </p>

        <Link href="/">
          <button
            className="px-8 py-4 bg-red-700 text-[#0a0603] font-semibold text-sm tracking-widest uppercase hover:bg-[#dc5050] transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            ← Zurück zur Startseite
          </button>
        </Link>

        {/* Logo */}
        <div className="mt-12 opacity-30">
          <p
            className="text-red-700 text-sm tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Cafe&Bar Luxor
          </p>
        </div>
      </div>
    </div>
  );
}
