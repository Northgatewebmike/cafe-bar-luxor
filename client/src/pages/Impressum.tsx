/**
 * Impressum Page — Cafe&Bar Luxor
 * Legal notice as required by German law (§ 5 TMG)
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

export default function Impressum() {
  const { t } = useLanguage();

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0603]">
      {/* Page Hero */}
      <section className="relative h-40 md:h-52 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/70 to-[#0a0603]/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <h1
            className="text-3xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('impressum.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-invert max-w-none"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {/* Angaben gemäß § 5 TMG */}
            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2
                className="text-xl font-semibold text-[#c9a84c] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {t('impressum.angaben')}
              </h2>
              <div className="text-white/70 text-sm space-y-1 leading-relaxed">
                <p className="font-semibold text-white">Ivan Sarakostov</p>
                <p>Cafe &amp; Bar Luxor</p>
                <p>Ohligser Markt 5</p>
                <p>42696 Solingen, Deutschland</p>
              </div>
            </div>

            {/* Kontakt */}
            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2
                className="text-xl font-semibold text-[#c9a84c] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {t('impressum.kontakt')}
              </h2>
              <div className="text-white/70 text-sm space-y-1 leading-relaxed">
                <p>
                  E-Mail:{' '}
                  <a
                    href="mailto:stoyansarakostov73@gmail.com"
                    className="text-[#c9a84c] hover:text-[#e8c87a] transition-colors"
                  >
                    stoyansarakostov73@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Gewerbeanmeldung */}
            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2
                className="text-xl font-semibold text-[#c9a84c] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {t('impressum.gewerbe')}
              </h2>
              <div className="text-white/70 text-sm space-y-1 leading-relaxed">
                <p>{t('impressum.anmeldung')}</p>
                <p>{t('impressum.datum')}</p>
              </div>
            </div>

            {/* Steuernummer & USt */}
            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2
                className="text-xl font-semibold text-[#c9a84c] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Steuerliche Angaben
              </h2>
              <div className="text-white/70 text-sm space-y-1 leading-relaxed">
                <p>
                  <span className="text-white/50">{t('impressum.steuer')}:</span>{' '}
                  <span className="text-white/40 italic">{t('impressum.incoming')}</span>
                </p>
                <p>
                  <span className="text-white/50">{t('impressum.ust')}:</span>{' '}
                  <span className="text-white/40 italic">{t('impressum.incoming')}</span>
                </p>
              </div>
            </div>

            {/* Verantwortlich */}
            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2
                className="text-xl font-semibold text-[#c9a84c] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {t('impressum.verantwortlich')}
              </h2>
              <div className="text-white/70 text-sm space-y-1 leading-relaxed">
                <p className="font-semibold text-white">Ivan Sarakostov</p>
                <p>Ohligser Markt 5</p>
                <p>42696 Solingen, Deutschland</p>
              </div>
            </div>

            {/* Haftungsausschluss */}
            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2
                className="text-xl font-semibold text-[#c9a84c] mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Haftungsausschluss
              </h2>
              <div className="text-white/60 text-sm space-y-3 leading-relaxed">
                <p>
                  <strong className="text-white/80">Haftung für Inhalte:</strong> Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>
                <p>
                  <strong className="text-white/80">Haftung für Links:</strong> Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
                <p>
                  <strong className="text-white/80">Urheberrecht:</strong> Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link href="/">
                <span className="text-[#c9a84c] text-sm hover:text-[#e8c87a] transition-colors cursor-pointer flex items-center gap-2"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  ← {t('common.back')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
