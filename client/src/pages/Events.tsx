/**
 * Events Page — Cafe&Bar Luxor
 * A dedicated bilingual event listing designed to grow with future Luxor events.
 */
import { CalendarDays, Clock3, DoorOpen, MapPin, Music2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const EVENT_POSTER = '/manus-storage/event-winterparty-2026_1e22c79a.png';

export default function Events() {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();

  const details = [
    { icon: CalendarDays, label: t('events.date.label'), value: t('events.date.value') },
    { icon: Clock3, label: t('events.time.label'), value: t('events.time.value') },
    { icon: DoorOpen, label: t('events.venue.label'), value: t('events.venue.value') },
    { icon: Music2, label: t('events.music.label'), value: t('events.music.value') },
  ];

  return (
    <div className="page-enter min-h-screen bg-[#0a0603] pt-16 md:pt-20">
      <section className="relative overflow-hidden border-b border-red-900/20 py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(140,0,0,0.22),transparent_38%),radial-gradient(circle_at_85%_70%,rgba(201,168,76,0.09),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-10 bg-red-700" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-red-500" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {t('events.eyebrow')}
            </span>
          </div>
          <h1 className="max-w-3xl text-5xl font-bold leading-none text-white md:text-7xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            {t('events.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            {t('events.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="relative overflow-hidden border border-red-800/30 bg-black/30 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-red-700/70" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-red-700/70" />
              <img
                src={EVENT_POSTER}
                alt={t('events.poster.alt')}
                className="h-auto w-full"
                width={1024}
                height={1535}
              />
            </div>
          </motion.div>

          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="border border-red-900/30 bg-[#110906]/80 p-6 md:p-10"
          >
            <div className="mb-7 flex items-center gap-3">
              <span className="rounded-full border border-red-700/50 bg-red-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('events.card.label')}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-red-700/50 to-transparent" />
            </div>
            <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {t('events.card.title')}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/65" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {t('events.card.description')}
            </p>
            <p className="mt-5 border-l-2 border-red-700/70 pl-4 text-sm font-medium leading-relaxed text-red-200/85" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {t('events.welcome')}
            </p>

            <div className="mt-8 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon size={18} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
                  <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/35">{label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/80">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 border-t border-white/10 pt-6 text-sm text-white/65" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              <MapPin size={18} className="mt-0.5 shrink-0 text-red-500" aria-hidden="true" />
              <span>{t('events.location')}</span>
            </div>
          </motion.article>
        </div>
      </section>
    </div>
  );
}
