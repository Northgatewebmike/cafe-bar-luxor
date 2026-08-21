import { Link } from 'wouter';
import { ArrowRight, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { useLanguage } from '@/contexts/LanguageContext';

const APPLICATION_PHONE = '4917621899372';

export default function JobsPraktikum() {
  const { lang } = useLanguage();
  const isGerman = lang === 'de';

  const jobWhatsAppUrl = `https://wa.me/${APPLICATION_PHONE}?text=${encodeURIComponent(
    isGerman
      ? 'Hallo liebes Cafe&Bar Luxor Team,\n\nmein Name ist [Name]. Ich möchte mich gerne für einen Job bei euch bewerben. Im Anhang sende ich euch meinen Lebenslauf oder meine Bewerbung.\n\nIch freue mich über eine Rückmeldung.\n\nViele Grüße\n[Name]'
      : 'Hello Cafe&Bar Luxor team,\n\nmy name is [Name]. I would like to apply for a job with you. I will attach my CV or application in this chat.\n\nI look forward to hearing from you.\n\nKind regards,\n[Name]'
  )}`;

  const internshipWhatsAppUrl = `https://wa.me/${APPLICATION_PHONE}?text=${encodeURIComponent(
    isGerman
      ? 'Hallo liebes Cafe&Bar Luxor Team,\n\nmein Name ist [Name]. Ich gehe zur Schule und möchte gerne ein Praktikum bei euch anfragen. Mein Wunschtermin ist [Zeitraum].\n\nVielen Dank und freundliche Grüße\n[Name]'
      : 'Hello Cafe&Bar Luxor team,\n\nmy name is [Name]. I am a student and would like to ask about an internship with you. My preferred period is [Dates].\n\nThank you and kind regards,\n[Name]'
  )}`;

  const roles = [
    {
      icon: BriefcaseBusiness,
      href: jobWhatsAppUrl,
      label: isGerman ? 'Job im Luxor' : 'Work at Luxor',
      headline: isGerman ? 'Per WhatsApp bewerben' : 'Apply via WhatsApp',
      text: isGerman
        ? 'Du suchst eine Aufgabe in einem lebendigen Café- und Bar-Team? Klicke auf diese Karte und sende uns direkt deine Bewerbung.'
        : 'Looking for a role in a lively café and bar team? Click this card and send us your application directly.',
      hint: isGerman
        ? 'Lebenslauf oder Bewerbung im geöffneten WhatsApp-Chat anhängen.'
        : 'Attach your CV or application in the WhatsApp chat that opens.',
      cta: isGerman ? 'Nachricht zur Bewerbung vorbereiten' : 'Prepare application message',
    },
    {
      icon: GraduationCap,
      href: internshipWhatsAppUrl,
      label: isGerman ? 'Praktikum' : 'Internship',
      headline: isGerman ? 'Praktikum per WhatsApp anfragen' : 'Ask about an internship via WhatsApp',
      text: isGerman
        ? 'Du bist in der Schule und möchtest ein Praktikum machen? Klicke auf diese Karte und schreib uns direkt.'
        : 'Are you at school and looking for an internship? Click this card and message us directly.',
      hint: isGerman
        ? 'In der Nachricht nur deinen Namen, deine Schule und den gewünschten Zeitraum ergänzen.'
        : 'In the message, simply add your name, school, and preferred dates.',
      cta: isGerman ? 'Nachricht zum Praktikum vorbereiten' : 'Prepare internship message',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0603] text-white">
      <section className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:pb-24 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(150,0,0,0.28),transparent_43%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.28em] text-red-300 uppercase">
              <span className="h-px w-10 bg-red-600/70" />
              {isGerman ? 'Werde Teil des Luxor' : 'Become Part of Luxor'}
              <span className="h-px w-10 bg-red-600/70" />
            </div>
            <h1 className="font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">
              {isGerman ? 'Jobs & Praktikum' : 'Jobs & Internships'}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
              {isGerman
                ? 'Wähle die passende Karte aus. Sie öffnet direkt eine freundliche WhatsApp-Nachricht für deine Bewerbung oder Praktikumsanfrage.'
                : 'Choose the matching card. It opens a friendly WhatsApp message for your application or internship request.'}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {roles.map(({ icon: Icon, href, label, headline, text, hint, cta }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[24rem] cursor-pointer flex-col overflow-hidden border border-green-400/35 bg-white/[0.035] p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:border-green-400/80 hover:bg-green-500/[0.09] hover:shadow-[0_0_28px_rgba(34,197,94,0.18)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0603] active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none sm:min-h-[26rem] sm:p-9"
              >
                <div className="absolute right-0 top-0 h-24 w-24 bg-green-400/[0.08] blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute right-6 top-6 flex size-9 items-center justify-center rounded-full border border-green-400/45 bg-green-500/10 text-green-200 transition-all duration-300 group-hover:scale-110 group-hover:border-green-300 group-hover:bg-green-500/20 group-hover:shadow-[0_0_16px_rgba(34,197,94,0.38)] motion-reduce:transition-none" aria-hidden="true">
                  <FaWhatsapp className="size-5" />
                </span>
                <div className="flex size-12 items-center justify-center rounded-full border border-green-400/50 bg-green-500/10 text-green-200 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-green-200 uppercase">
                  <FaWhatsapp aria-hidden="true" className="size-4" />
                  {headline}
                </div>
                <h2 className="mt-4 font-serif text-3xl sm:text-4xl">{label}</h2>
                <p className="mt-4 max-w-lg leading-relaxed text-white/75">{text}</p>
                <div className="mt-6 border-l-2 border-green-400/70 bg-black/20 px-4 py-3 text-sm leading-relaxed text-green-100/85">
                  {hint}
                </div>
                <div className="mt-auto flex items-center gap-3 pt-8 text-sm font-semibold tracking-wider text-green-200 uppercase">
                  <span>{cta}</span>
                  <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-white/45">
            {isGerman
              ? 'Mit dem Öffnen von WhatsApp entscheidest du selbst, welche Angaben und Dokumente du über den externen Dienst übermittelst.'
              : 'By opening WhatsApp, you decide which details and documents to share through the external service.'}{' '}
            <Link href="/datenschutz" className="underline underline-offset-4 transition-colors hover:text-white/75">
              {isGerman ? 'Datenschutzerklärung' : 'Privacy policy'}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
