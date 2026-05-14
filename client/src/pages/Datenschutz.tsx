/**
 * Datenschutzerklärung — Cafe&Bar Luxor
 * Gemäß DSGVO (EU) 2016/679, TDDDG, DDG § 5 — Stand Mai 2026
 * Stand: Mai 2026
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';
const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS  = "'Source Sans 3', sans-serif";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 p-6 border border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <h2 className="text-xl font-semibold text-red-700 mb-4" style={{ fontFamily: SERIF }}>{title}</h2>
      <div className="text-white/70 text-sm space-y-3 leading-relaxed" style={{ fontFamily: SANS }}>
        {children}
      </div>
    </div>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <h3 className="text-base font-semibold text-white/85 mb-2">{title}</h3>
      <div className="text-white/60 space-y-2">{children}</div>
    </div>
  );
}

export default function Datenschutz() {
  const { t, lang } = useLanguage();
  const de = lang === 'de';

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0603]">
      {/* Hero */}
      <section className="relative h-40 md:h-52 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/70 to-[#0a0603]/40" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: SERIF }}>
            {de ? 'Datenschutzerklärung' : 'Privacy Policy'}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 1. Überblick */}
          <Section title={de ? '1. Datenschutz auf einen Blick' : '1. Privacy at a Glance'}>
            <p>
              {de
                ? 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen finden Sie in den nachfolgenden Abschnitten.'
                : 'The following information gives a simple overview of what happens to your personal data when you visit this website. Personal data is any data by which you can be personally identified. Detailed information can be found in the sections below.'}
            </p>
            <Sub title={de ? 'Datenerfassung auf dieser Website' : 'Data collection on this website'}>
              <p>{de
                ? 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.'
                : 'Data processing on this website is carried out by the website operator. Contact details can be found in the Impressum of this website.'}</p>
              <p>{de
                ? 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (z. B. Internetbrowser, Betriebssystem, Uhrzeit des Seitenaufrufs).'
                : 'Your data is collected partly by you providing it to us (e.g. data entered in a contact form) and partly automatically by our IT systems when you visit the website (e.g. browser type, operating system, time of page access).'}</p>
            </Sub>
            <Sub title={de ? 'Wofür nutzen wir Ihre Daten?' : 'What do we use your data for?'}>
              <p>{de
                ? 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden, sofern Sie hierzu Ihre Einwilligung erteilt haben.'
                : 'Some data is collected to ensure the error-free provision of the website. Other data may be used to analyze your user behavior if you have given your consent.'}</p>
            </Sub>
            <Sub title={de ? 'Welche Rechte haben Sie bezüglich Ihrer Daten?' : 'What rights do you have regarding your data?'}>
              <p>{de
                ? 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.'
                : 'You have the right to obtain free information about the origin, recipient and purpose of your stored personal data at any time. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time. You also have the right to request the restriction of the processing of your personal data under certain circumstances.'}</p>
            </Sub>
          </Section>

          {/* 2. Verantwortliche Stelle */}
          <Section title={de ? '2. Verantwortliche Stelle' : '2. Data Controller'}>
            <p className="font-semibold text-white">Ivan Sarakostov</p>
            <p>Cafe &amp; Bar Luxor</p>
            <p>Ohligser Markt 5</p>
            <p>42697 Solingen, {de ? 'Deutschland' : 'Germany'}</p>
            <p className="mt-2">
              {de ? 'Telefon' : 'Phone'}:{' '}
              <a href="tel:+4917621899372" className="text-red-700 hover:text-[#dc5050] transition-colors">+49 176 21899372</a>
            </p>
            <p>
              E-Mail:{' '}
              <a href="mailto:stoyansarakostov73@gmail.com" className="text-red-700 hover:text-[#dc5050] transition-colors">stoyansarakostov73@gmail.com</a>
            </p>
            <p className="text-white/40 text-xs mt-3">
              {de
                ? 'Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.'
                : 'The controller is the natural or legal person who alone or jointly with others decides on the purposes and means of the processing of personal data.'}
            </p>
          </Section>

          {/* 3. Hosting */}
          <Section title={de ? '3. Hosting und Infrastruktur' : '3. Hosting and Infrastructure'}>
            <p>
              {de
                ? 'Diese Website wird bei Manus AI (Butterfly Effect Technologies Inc.) gehostet. Der Anbieter ist Butterfly Effect Technologies Inc., 2261 Market Street #4990, San Francisco, CA 94114, USA.'
                : 'This website is hosted by Manus AI (Butterfly Effect Technologies Inc.). The provider is Butterfly Effect Technologies Inc., 2261 Market Street #4990, San Francisco, CA 94114, USA.'}
            </p>
            <p>
              {de
                ? 'Die Nutzung des Hostingdienstleisters erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem zuverlässigen Betrieb der Website). Es besteht ein Auftragsverarbeitungsvertrag (AVV) gemäß Art. 28 DSGVO. Datenübertragungen in die USA erfolgen auf Basis der EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).'
                : 'The hosting service is used on the basis of Art. 6(1)(f) GDPR (legitimate interest in reliable website operation). A data processing agreement (DPA) pursuant to Art. 28 GDPR is in place. Data transfers to the USA are based on EU Standard Contractual Clauses (Art. 46(2)(c) GDPR).'}
            </p>
            <Sub title={de ? 'Server-Log-Dateien' : 'Server log files'}>
              <p>{de
                ? 'Der Hosting-Anbieter erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, IP-Adresse.'
                : 'The hosting provider automatically collects and stores information in server log files that your browser automatically transmits. These are: browser type and version, operating system, referrer URL, hostname of the accessing computer, time of server request, IP address.'}</p>
              <p>{de
                ? 'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung). Die Daten werden nach 7 Tagen gelöscht.'
                : 'Legal basis: Art. 6(1)(f) GDPR (legitimate interest in technical provision). Data is deleted after 7 days.'}</p>
            </Sub>
          </Section>

          {/* 4. Cookies */}
          <Section title={de ? '4. Cookies und Einwilligung' : '4. Cookies and Consent'}>
            <p>
              {de
                ? 'Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die Ihr Browser auf Ihrem Endgerät speichert. Gemäß § 25 TDDDG (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz) ist für das Setzen nicht technisch notwendiger Cookies Ihre Einwilligung erforderlich.'
                : 'This website uses cookies. Cookies are small text files that your browser stores on your device. Pursuant to § 25 TDDDG, your consent is required for setting non-technically necessary cookies.'}
            </p>
            <Sub title={de ? 'Technisch notwendige Cookies' : 'Technically necessary cookies'}>
              <p>{de
                ? 'Wir setzen technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind (z. B. Speicherung Ihrer Cookie-Einwilligungsentscheidung). Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG, Art. 6 Abs. 1 lit. f DSGVO.'
                : 'We set technically necessary cookies required for the operation of the website (e.g. storing your cookie consent decision). Legal basis: § 25(2)(2) TDDDG, Art. 6(1)(f) GDPR.'}</p>
            </Sub>
            <Sub title={de ? 'Analyse-Cookies (nur mit Einwilligung)' : 'Analytics cookies (with consent only)'}>
              <p>{de
                ? 'Mit Ihrer Einwilligung setzen wir Analyse-Cookies zur Auswertung des Nutzerverhaltens (Umami Analytics). Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über unser Cookie-Banner widerrufen.'
                : 'With your consent, we use analytics cookies to evaluate user behavior (Umami Analytics). Legal basis: Art. 6(1)(a) GDPR. You can withdraw your consent at any time via our cookie banner.'}</p>
            </Sub>
            <p className="text-white/40 text-xs">
              {de
                ? 'Sie können Cookies in Ihrem Browser jederzeit löschen oder das Setzen von Cookies verhindern. Bitte beachten Sie, dass dies die Funktionalität der Website einschränken kann.'
                : 'You can delete cookies in your browser at any time or prevent cookies from being set. Please note that this may restrict the functionality of the website.'}
            </p>
          </Section>

          {/* 5. Google Maps */}
          <Section title={de ? '5. Google Maps' : '5. Google Maps'}>
            <p>
              {de
                ? 'Diese Website verwendet Google Maps zur Darstellung interaktiver Karten. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (Muttergesellschaft: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA).'
                : 'This website uses Google Maps to display interactive maps. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland (parent company: Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA).'}
            </p>
            <p>
              {de
                ? 'Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Datenübertragungen in die USA erfolgen auf Basis der EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).'
                : 'To use the functions of Google Maps, it is necessary to save your IP address. This information is generally transferred to a Google server in the USA and stored there. Data transfers to the USA are based on EU Standard Contractual Clauses (Art. 46(2)(c) GDPR).'}
            </p>
            <p>
              {de
                ? 'Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung über Cookie-Banner). Google Maps wird erst nach Ihrer Einwilligung geladen.'
                : 'Legal basis: Art. 6(1)(a) GDPR (consent via cookie banner). Google Maps is only loaded after your consent.'}
            </p>
            <p>
              {de ? 'Weitere Informationen:' : 'Further information:'}{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-[#dc5050] transition-colors">
                https://policies.google.com/privacy
              </a>
            </p>
          </Section>

          {/* 6. Kontaktformular */}
          <Section title={de ? '6. Kontaktaufnahme' : '6. Contact'}>
            <p>
              {de
                ? 'Wenn Sie uns per Telefon, WhatsApp oder E-Mail kontaktieren, werden Ihre Angaben (Name, Telefonnummer, Nachrichteninhalt) zur Bearbeitung der Anfrage und für den Fall von Rückfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.'
                : 'When you contact us by phone, WhatsApp or email, your details (name, phone number, message content) are stored to process the request and in case of follow-up questions. We do not share this data without your consent.'}
            </p>
            <p>
              {de
                ? 'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist, spätestens nach 6 Monaten.'
                : 'Legal basis: Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest in responding to inquiries). Data is deleted once the request has been fully processed, at the latest after 6 months.'}
            </p>
          </Section>

          {/* 7. Ihre Rechte */}
          <Section title={de ? '7. Ihre Rechte als betroffene Person' : '7. Your Rights as a Data Subject'}>
            <p>{de ? 'Sie haben gemäß DSGVO folgende Rechte:' : 'You have the following rights under GDPR:'}</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-white/60">
              <li><strong className="text-white/80">{de ? 'Auskunftsrecht' : 'Right of access'}</strong> — Art. 15 DSGVO</li>
              <li><strong className="text-white/80">{de ? 'Recht auf Berichtigung' : 'Right to rectification'}</strong> — Art. 16 DSGVO</li>
              <li><strong className="text-white/80">{de ? 'Recht auf Löschung' : 'Right to erasure'}</strong> — Art. 17 DSGVO</li>
              <li><strong className="text-white/80">{de ? 'Recht auf Einschränkung der Verarbeitung' : 'Right to restriction of processing'}</strong> — Art. 18 DSGVO</li>
              <li><strong className="text-white/80">{de ? 'Recht auf Datenübertragbarkeit' : 'Right to data portability'}</strong> — Art. 20 DSGVO</li>
              <li><strong className="text-white/80">{de ? 'Widerspruchsrecht' : 'Right to object'}</strong> — Art. 21 DSGVO</li>
              <li><strong className="text-white/80">{de ? 'Recht auf Widerruf der Einwilligung' : 'Right to withdraw consent'}</strong> — Art. 7 Abs. 3 DSGVO</li>
            </ul>
            <p className="mt-3">
              {de
                ? 'Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: stoyansarakostov73@gmail.com'
                : 'To exercise your rights, please contact: stoyansarakostov73@gmail.com'}
            </p>
            <Sub title={de ? 'Beschwerderecht bei der Aufsichtsbehörde' : 'Right to lodge a complaint with the supervisory authority'}>
              <p>
                {de
                  ? 'Sie haben das Recht, sich bei der zuständigen Datenschutzaufsichtsbehörde zu beschweren. Die zuständige Behörde für Nordrhein-Westfalen ist:'
                  : 'You have the right to lodge a complaint with the competent data protection supervisory authority. The competent authority for North Rhine-Westphalia is:'}
              </p>
              <p className="mt-2 text-white/70">
                Landesbeauftragte für Datenschutz und Informationsfreiheit NRW<br />
                Postfach 20 04 44<br />
                40102 Düsseldorf<br />
                <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-[#dc5050] transition-colors">www.ldi.nrw.de</a>
              </p>
            </Sub>
          </Section>

          {/* 8. Datensicherheit */}
          <Section title={de ? '8. Datensicherheit' : '8. Data Security'}>
            <p>
              {de
                ? 'Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.'
                : 'This website uses SSL/TLS encryption for security reasons and to protect the transmission of confidential content. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.'}
            </p>
          </Section>

          {/* 9. Aktualität */}
          <Section title={de ? '9. Aktualität und Änderung dieser Datenschutzerklärung' : '9. Currency and Amendment of this Privacy Policy'}>
            <p>
              {de
                ? 'Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2026. Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf der Website unter /datenschutz abgerufen werden.'
                : 'This privacy policy is currently valid and has the status of May 2026. Due to the further development of our website and offers or due to changed legal or official requirements, it may be necessary to amend this privacy policy. The current privacy policy can be accessed at any time on the website at /datenschutz.'}
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
