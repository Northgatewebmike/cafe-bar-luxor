/**
 * Datenschutz Page — Cafe&Bar Luxor
 * Privacy Policy as required by GDPR / DSGVO
 */
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

export default function Datenschutz() {
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
            {t('datenschutz.title')}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>

            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2 className="text-xl font-semibold text-red-700 mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                1. Datenschutz auf einen Blick
              </h2>
              <h3 className="text-base font-semibold text-white/80 mb-2">Allgemeine Hinweise</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              <h3 className="text-base font-semibold text-white/80 mb-2">Datenerfassung auf dieser Website</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
              </p>
            </div>

            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2 className="text-xl font-semibold text-red-700 mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                2. Verantwortliche Stelle
              </h2>
              <div className="text-white/70 text-sm space-y-1 leading-relaxed">
                <p className="font-semibold text-white">Ivan Sarakostov</p>
                <p>Cafe &amp; Bar Luxor</p>
                <p>Ohligser Markt 5</p>
                <p>42697 Solingen, Deutschland</p>
                <p className="mt-2">
                  E-Mail:{' '}
                  <a href="mailto:stoyansarakostov73@gmail.com"
                    className="text-red-700 hover:text-[#dc5050] transition-colors">
                    stoyansarakostov73@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2 className="text-xl font-semibold text-red-700 mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                3. Datenerfassung auf dieser Website
              </h2>
              <h3 className="text-base font-semibold text-white/80 mb-2">Kontaktformular</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <h3 className="text-base font-semibold text-white/80 mb-2">Server-Log-Dateien</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.
              </p>
            </div>

            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2 className="text-xl font-semibold text-red-700 mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                4. Ihre Rechte
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
              </p>
            </div>

            <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h2 className="text-xl font-semibold text-red-700 mb-4"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                5. Google Maps
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-[#dc5050] transition-colors">https://policies.google.com/privacy</a>.
              </p>
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link href="/">
                <span className="text-red-700 text-sm hover:text-[#dc5050] transition-colors cursor-pointer flex items-center gap-2"
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
