/**
 * Impressum — Cafe&Bar Luxor
 * Pflichtangaben gemäß § 5 TMG (Telemediengesetz) und § 55 RStV
 * Last updated: 2026
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'Source Sans 3', sans-serif";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <h2 className="text-xl font-semibold text-red-700 mb-4" style={{ fontFamily: SERIF }}>
        {title}
      </h2>
      <div className="text-white/70 text-sm space-y-1 leading-relaxed" style={{ fontFamily: SANS }}>
        {children}
      </div>
    </div>
  );
}

export default function Impressum() {
  const { t, lang } = useLanguage();

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0603]">
      {/* Page Hero */}
      <section className="relative h-40 md:h-52 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/70 to-[#0a0603]/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: SERIF }}>
            {t('impressum.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 1. Angaben gemäß § 5 TMG */}
          <Section title={lang === 'de' ? 'Angaben gemäß § 5 TMG' : 'Legal Notice (§ 5 TMG)'}>
            <p className="font-semibold text-white">Ivan Sarakostov</p>
            <p>Cafe &amp; Bar Luxor</p>
            <p>Ohligser Markt 5</p>
            <p>42697 Solingen, {lang === 'de' ? 'Deutschland' : 'Germany'}</p>
          </Section>

          {/* 2. Kontakt */}
          <Section title={lang === 'de' ? 'Kontakt' : 'Contact'}>
            <p>
              {lang === 'de' ? 'Telefon' : 'Phone'}:{' '}
              <a href="tel:+4917621899372" className="text-red-700 hover:text-[#dc5050] transition-colors">
                +49 176 21899372
              </a>
            </p>
            <p>
              E-Mail:{' '}
              <a href="mailto:stoyansarakostov73@gmail.com" className="text-red-700 hover:text-[#dc5050] transition-colors">
                stoyansarakostov73@gmail.com
              </a>
            </p>
          </Section>

          {/* 3. Gewerbeanmeldung */}
          <Section title={lang === 'de' ? 'Gewerbeanmeldung' : 'Business Registration'}>
            <p>{lang === 'de' ? 'Anmeldebehörde' : 'Registration authority'}: {lang === 'de' ? 'Stadt Solingen' : 'City of Solingen'}</p>
            <p>{lang === 'de' ? 'Datum der Anmeldung' : 'Date of registration'}: 25.03.2024</p>
          </Section>

          {/* 4. Steuerliche Angaben */}
          <Section title={lang === 'de' ? 'Steuerliche Angaben' : 'Tax Information'}>
            <p>
              <span className="text-white/50">{lang === 'de' ? 'Steuernummer' : 'Tax number'}:</span>{' '}
              <span className="text-white">128/5528/5468</span>
            </p>
            <p className="text-white/40 text-xs mt-2">
              {lang === 'de'
                ? 'Umsatzsteuer-ID gemäß § 27a UStG: nicht vorhanden (Kleinunternehmer gem. § 19 UStG)'
                : 'VAT ID pursuant to § 27a UStG: not applicable (small business pursuant to § 19 UStG)'}
            </p>
          </Section>

          {/* 5. Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV */}
          <Section title={lang === 'de' ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Responsible for Content (§ 55 Abs. 2 RStV)'}>
            <p className="font-semibold text-white">Ivan Sarakostov</p>
            <p>Ohligser Markt 5</p>
            <p>42697 Solingen, {lang === 'de' ? 'Deutschland' : 'Germany'}</p>
          </Section>

          {/* 6. Haftungsausschluss */}
          <Section title={lang === 'de' ? 'Haftungsausschluss' : 'Disclaimer'}>
            <p>
              <strong className="text-white/80">{lang === 'de' ? 'Haftung für Inhalte:' : 'Liability for content:'}</strong>{' '}
              {lang === 'de'
                ? 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.'
                : 'The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness or topicality of the content.'}
            </p>
            <p className="mt-3">
              <strong className="text-white/80">{lang === 'de' ? 'Haftung für Links:' : 'Liability for links:'}</strong>{' '}
              {lang === 'de'
                ? 'Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.'
                : 'Our website contains links to external third-party websites, over whose content we have no control. Therefore, we cannot accept any liability for this external content.'}
            </p>
            <p className="mt-3">
              <strong className="text-white/80">{lang === 'de' ? 'Urheberrecht:' : 'Copyright:'}</strong>{' '}
              {lang === 'de'
                ? 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
                : 'The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright law require the written consent of the respective author or creator.'}
            </p>
          </Section>

          {/* 7. Online-Streitbeilegung */}
          <Section title={lang === 'de' ? 'Online-Streitbeilegung (OS)' : 'Online Dispute Resolution (ODR)'}>
            <p>
              {lang === 'de'
                ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:'
                : 'The European Commission provides a platform for online dispute resolution (ODR):'}
            </p>
            <p className="mt-2">
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 hover:text-[#dc5050] transition-colors"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
            <p className="mt-3 text-white/50">
              {lang === 'de'
                ? 'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
                : 'We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.'}
            </p>
          </Section>

          {/* Back link */}
          <div className="mt-8">
            <Link href="/">
              <span className="text-red-700 text-sm hover:text-[#dc5050] transition-colors cursor-pointer flex items-center gap-2" style={{ fontFamily: SANS }}>
                ← {t('common.back')}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
