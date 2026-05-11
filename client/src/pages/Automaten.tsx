/**
 * Automaten Page — Cafe&Bar Luxor
 * Cigarette machine + 2 slot machines
 * Design: Red & Black premium
 */
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cigarette, Dices, AlertTriangle, Phone } from 'lucide-react';

const HERO_BG = '/manus-storage/real-photo-7_0555fc42.jpg';   // Slot machines - real photo
const CIGS_PHOTOS = [
  '/manus-storage/cigarette-machine_e20343bd.jpg',    // Front view
  '/manus-storage/cigarette-selection_0bce1145.jpg',  // Selection panel
  '/manus-storage/cigarette-side_ff22e91c.jpg',       // Side / contactless payment
];
const SLOTS_PHOTO = '/manus-storage/real-photo-7_0555fc42.jpg'; // Slot machines - real photo

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="scroll-reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── CIGARETTE MACHINE GALLERY ──────────────────────────────────────────────
function CigsGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="mb-6">
      {/* Main image */}
      <div
        className="relative overflow-hidden mb-2 cursor-zoom-in"
        style={{ borderRadius: '4px', border: '1px solid rgba(180,0,0,0.3)', aspectRatio: '4/3' }}
        onClick={() => setLightbox(active)}
      >
        {CIGS_PHOTOS.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Zigarettenautomat ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
            style={{ opacity: i === active ? 1 : 0, filter: 'brightness(0.9)' }}
          />
        ))}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,0,0,0.45) 0%, transparent 60%)' }} />
        {/* Zoom hint */}
        <div className="absolute top-2 right-2 bg-black/50 text-white/70 text-xs px-2 py-1 rounded-sm pointer-events-none" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          🔍 Klicken zum Vergrößern
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2">
        {CIGS_PHOTOS.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex-1 overflow-hidden transition-all duration-200"
            style={{
              borderRadius: '3px',
              border: i === active ? '2px solid rgba(180,0,0,0.8)' : '2px solid rgba(180,0,0,0.2)',
              aspectRatio: '4/3',
              padding: 0,
              background: 'none',
              cursor: 'pointer',
            }}
          >
            <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" style={{ filter: i === active ? 'brightness(1)' : 'brightness(0.6)' }} />
          </button>
        ))}
      </div>
      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <img
              src={CIGS_PHOTOS[lightbox]}
              alt="Zigarettenautomat"
              className="w-full rounded-sm"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />
            {/* Prev/Next */}
            {lightbox > 0 && (
              <button onClick={() => setLightbox(l => (l !== null ? l - 1 : l))}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 text-white text-xl rounded-full hover:bg-red-700/60 transition-colors">
                ‹
              </button>
            )}
            {lightbox < CIGS_PHOTOS.length - 1 && (
              <button onClick={() => setLightbox(l => (l !== null ? l + 1 : l))}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 text-white text-xl rounded-full hover:bg-red-700/60 transition-colors">
                ›
              </button>
            )}
            <button onClick={() => setLightbox(null)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/60 text-white/80 rounded-full hover:bg-red-700/60 transition-colors text-sm">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Automaten() {
  const { t } = useLanguage();

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen" style={{ background: '#0a0000' }}>
      {/* ── HERO ── */}
      <section className="relative h-52 md:h-72 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0a0000 0%, rgba(10,0,0,0.75) 50%, rgba(10,0,0,0.35) 100%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-600" />
            <span
              className="text-red-400 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Cafe&Bar Luxor
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('automaten.title')}
          </h1>
          <p className="text-white/50 mt-2 text-base" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {t('automaten.subtitle')}
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <RevealCard>
            <p
              className="text-white/60 text-base leading-relaxed"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {t('automaten.intro')}
            </p>
          </RevealCard>
        </div>
      </section>

      {/* ── MACHINES ── */}
      <section className="py-6 px-4 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

          {/* ── Cigarette Machine ── */}
          <RevealCard delay={0}>
            <div
              className="relative overflow-hidden h-full"
              style={{
                background: 'linear-gradient(135deg, #0f0000 0%, #1a0000 60%, #0f0000 100%)',
                border: '1px solid rgba(180,0,0,0.25)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, transparent, #b00000, transparent)' }} />

              <div className="p-6 md:p-8">
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-5"
                  style={{
                    background: 'rgba(180,0,0,0.1)',
                    border: '1px solid rgba(180,0,0,0.3)',
                  }}
                >
                  <Cigarette size={28} className="text-red-500" />
                </div>

                {/* Title */}
                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {t('automaten.cigarette.title')}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-red-700" />
                  <span className="text-red-500/60 text-xs tracking-widest uppercase" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    1 {t('automaten.cigarette.title')}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-white/55 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {t('automaten.cigarette.desc')}
                </p>

                {/* Cigarette machine gallery — 3 photos */}
                <CigsGallery />

                {/* Age warning */}
                <div
                  className="flex items-start gap-3 p-3"
                  style={{ background: 'rgba(180,0,0,0.08)', border: '1px solid rgba(180,0,0,0.2)' }}
                >
                  <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300/70 text-xs leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t('automaten.cigarette.note')}
                  </p>
                </div>
              </div>
              {/* Bottom accent */}
              <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(180,0,0,0.3), transparent)' }} />
            </div>
          </RevealCard>

          {/* ── Slot Machines ── */}
          <RevealCard delay={150}>
            <div
              className="relative overflow-hidden h-full"
              style={{
                background: 'linear-gradient(135deg, #0f0000 0%, #1a0000 60%, #0f0000 100%)',
                border: '1px solid rgba(180,0,0,0.25)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              }}
            >
              <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, transparent, #b00000, transparent)' }} />

              <div className="p-6 md:p-8">
                {/* Icon */}
                <div
                  className="w-14 h-14 flex items-center justify-center mb-5"
                  style={{ background: 'rgba(180,0,0,0.1)', border: '1px solid rgba(180,0,0,0.3)' }}
                >
                  <Dices size={28} className="text-red-500" />
                </div>

                <h2
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {t('automaten.spielautomat.title')}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-8 bg-red-700" />
                  <span className="text-red-500/60 text-xs tracking-widest uppercase" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t('automaten.spielautomat.count')}
                  </span>
                </div>

                <p
                  className="text-white/55 text-sm leading-relaxed mb-6"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {t('automaten.spielautomat.desc')}
                </p>

                {/* Real slot machines photo */}
                <div className="relative mb-6 overflow-hidden" style={{ borderRadius: '4px', border: '1px solid rgba(180,0,0,0.3)' }}>
                  <img
                    src={SLOTS_PHOTO}
                    alt="Spielautomaten"
                    className="w-full h-48 object-cover object-center"
                    style={{ filter: 'brightness(0.9)' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,0,0,0.5) 0%, transparent 60%)' }} />
                </div>

                {/* Warning */}
                <div
                  className="flex items-start gap-3 p-3 mb-3"
                  style={{ background: 'rgba(180,0,0,0.08)', border: '1px solid rgba(180,0,0,0.2)' }}
                >
                  <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300/70 text-xs leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    {t('automaten.spielautomat.note')}
                  </p>
                </div>
              </div>
              <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, rgba(180,0,0,0.3), transparent)' }} />
            </div>
          </RevealCard>
        </div>

        {/* ── Legal footnote (small, discrete) ── */}
        <div className="max-w-5xl mx-auto mt-10 border-t border-white/5 pt-6">
          <p
            className="text-white/20 text-xs text-center leading-relaxed"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t('automaten.age.warning')} &mdash; {t('automaten.help.desc')}{' '}
            <a href="https://www.bzga.de" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/40 transition-colors">www.bzga.de</a>
            {' '}&mdash;{' '}
            <a href="tel:08001372700" className="underline hover:text-white/40 transition-colors">0800 137 27 00</a>
          </p>
        </div>
      </section>
    </div>
  );
}
