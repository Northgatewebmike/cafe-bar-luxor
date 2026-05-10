/**
 * Automaten Page — Cafe&Bar Luxor
 * Cigarette machine + 2 slot machines
 * Design: Red & Black premium
 */
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cigarette, Dices, AlertTriangle, Phone } from 'lucide-react';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

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

                {/* Visual: cigarette machine illustration */}
                <div
                  className="relative mx-auto mb-6 overflow-hidden"
                  style={{
                    width: '140px',
                    height: '200px',
                    background: 'linear-gradient(180deg, #1a0000 0%, #0f0000 100%)',
                    border: '2px solid rgba(180,0,0,0.3)',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Machine screen */}
                  <div
                    className="mx-3 mt-3 mb-2"
                    style={{
                      height: '60px',
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(180,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="text-red-500/70 text-xs font-mono">LUXOR</span>
                  </div>
                  {/* Slots */}
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="mx-3 mb-1.5 flex items-center gap-1"
                      style={{ height: '18px' }}
                    >
                      <div style={{ width: '60px', height: '12px', background: 'rgba(180,0,0,0.15)', border: '1px solid rgba(180,0,0,0.2)' }} />
                      <div style={{ width: '30px', height: '12px', background: 'rgba(180,0,0,0.1)', border: '1px solid rgba(180,0,0,0.15)' }} />
                    </div>
                  ))}
                  {/* Coin slot */}
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    style={{ width: '30px', height: '6px', background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(180,0,0,0.3)', borderRadius: '2px' }}
                  />
                </div>

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

                {/* Two slot machine visuals */}
                <div className="flex gap-4 justify-center mb-6">
                  {[1, 2].map(num => (
                    <div
                      key={num}
                      className="relative overflow-hidden"
                      style={{
                        width: '100px',
                        height: '160px',
                        background: 'linear-gradient(180deg, #1a0000 0%, #0f0000 100%)',
                        border: '2px solid rgba(180,0,0,0.35)',
                        boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* Screen with reels */}
                      <div
                        className="mx-2 mt-2 mb-2 flex gap-1 items-center justify-center"
                        style={{
                          height: '70px',
                          background: 'rgba(0,0,0,0.7)',
                          border: '1px solid rgba(180,0,0,0.25)',
                        }}
                      >
                        {['7', '♦', '7'].map((sym, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-center text-red-500 font-bold"
                            style={{
                              width: '22px',
                              height: '50px',
                              background: 'rgba(180,0,0,0.1)',
                              border: '1px solid rgba(180,0,0,0.2)',
                              fontSize: '14px',
                            }}
                          >
                            {sym}
                          </div>
                        ))}
                      </div>
                      {/* Label */}
                      <div className="text-center">
                        <span className="text-red-500/50 text-xs font-mono">#{num}</span>
                      </div>
                      {/* Button */}
                      <div
                        className="absolute bottom-3 left-1/2 -translate-x-1/2"
                        style={{
                          width: '40px',
                          height: '14px',
                          background: 'rgba(180,0,0,0.3)',
                          border: '1px solid rgba(180,0,0,0.5)',
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                  ))}
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

        {/* ── Age Warning Banner ── */}
        <div className="max-w-5xl mx-auto mt-8">
          <RevealCard delay={300}>
            <div
              className="flex items-center gap-4 p-5"
              style={{
                background: 'rgba(180,0,0,0.06)',
                border: '1px solid rgba(180,0,0,0.2)',
              }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: 'rgba(180,0,0,0.2)',
                  border: '2px solid rgba(180,0,0,0.5)',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                }}
              >
                18+
              </div>
              <p
                className="text-white/60 text-sm leading-relaxed"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {t('automaten.age.warning')}
              </p>
            </div>
          </RevealCard>
        </div>

        {/* ── Responsible Gambling ── */}
        <div className="max-w-5xl mx-auto mt-6">
          <RevealCard delay={400}>
            <div
              className="p-5 md:p-6"
              style={{
                background: 'linear-gradient(135deg, #0f0000, #180000)',
                border: '1px solid rgba(180,0,0,0.15)',
              }}
            >
              <div className="flex items-start gap-4">
                <Phone size={20} className="text-red-600/60 flex-shrink-0 mt-1" />
                <div>
                  <h3
                    className="text-white/70 font-semibold mb-1"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.1rem' }}
                  >
                    {t('automaten.help')}
                  </h3>
                  <p
                    className="text-white/40 text-sm mb-2"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {t('automaten.help.desc')}
                  </p>
                  <a
                    href="https://www.bzga.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500/70 text-sm hover:text-red-400 transition-colors"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    www.bzga.de — Bundeszentrale für gesundheitliche Aufklärung
                  </a>
                  <div className="mt-1">
                    <a
                      href="tel:08001372700"
                      className="text-red-500/70 text-sm hover:text-red-400 transition-colors"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      0800 137 27 00 (kostenlos / free)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </RevealCard>
        </div>
      </section>
    </div>
  );
}
