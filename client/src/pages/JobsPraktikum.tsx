import { Link } from 'wouter';
import { ArrowRight, BriefcaseBusiness, GraduationCap, HeartHandshake, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { useLanguage } from '@/contexts/LanguageContext';

const APPLICATION_PHONE = '4917621899372';

export default function JobsPraktikum() {
  const { lang } = useLanguage();
  const isGerman = lang === 'de';
  const whatsappUrl = `https://wa.me/${APPLICATION_PHONE}?text=${encodeURIComponent(
    isGerman
      ? 'Hallo Cafe&Bar Luxor, ich interessiere mich für einen Job oder ein Praktikum.'
      : 'Hello Cafe&Bar Luxor, I am interested in a job or internship.'
  )}`;

  const roles = [
    {
      icon: BriefcaseBusiness,
      title: isGerman ? 'Job im Luxor' : 'Work at Luxor',
      text: isGerman
        ? 'Du suchst eine Aufgabe in einem lebendigen Café- und Bar-Team? Melde dich gerne initiativ bei uns.'
        : 'Looking for a role in a lively café and bar team? You are welcome to contact us with a speculative application.',
    },
    {
      icon: GraduationCap,
      title: isGerman ? 'Praktikum' : 'Internship',
      text: isGerman
        ? 'Du möchtest erste Erfahrungen in Gastronomie, Service oder Bar sammeln? Wir freuen uns, von dir zu hören.'
        : 'Would you like to gain first experience in hospitality, service, or bar work? We would be happy to hear from you.',
    },
  ];

  const steps = isGerman
    ? ['Erzähl uns kurz, ob du dich für einen Job oder ein Praktikum interessierst.', 'Schreib uns ein paar Worte zu dir und deiner Verfügbarkeit.', 'Wir melden uns bei dir, wenn wir einen passenden nächsten Schritt sehen.']
    : ['Tell us whether you are interested in a job or an internship.', 'Send us a few words about yourself and your availability.', 'We will contact you if there is a suitable next step.'];

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
                ? 'Du magst gute Atmosphäre, echte Gastfreundschaft und ein starkes Team? Dann lerne Cafe&Bar Luxor kennen.'
                : 'Do you enjoy a great atmosphere, genuine hospitality, and a strong team? Get to know Cafe&Bar Luxor.'}
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {roles.map(({ icon: Icon, title, text }) => (
              <article key={title} className="group border border-white/10 bg-white/[0.035] p-7 transition-colors duration-300 hover:border-red-500/40 hover:bg-red-950/20 sm:p-9">
                <div className="flex size-12 items-center justify-center rounded-full border border-red-500/40 bg-red-950/40 text-red-200">
                  <Icon size={23} aria-hidden="true" />
                </div>
                <h2 className="mt-6 font-serif text-3xl">{title}</h2>
                <p className="mt-3 max-w-lg leading-relaxed text-white/65">{text}</p>
              </article>
            ))}
          </div>

          <section className="mt-10 border border-red-900/50 bg-black/35 p-7 sm:p-10">
            <div className="flex items-center gap-3 text-red-200">
              <HeartHandshake size={21} aria-hidden="true" />
              <h2 className="font-serif text-3xl text-white">{isGerman ? 'So bewirbst du dich' : 'How to apply'}</h2>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red-700 text-xs font-bold">{index + 1}</span>
                  <p className="leading-relaxed text-white/70">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 border border-green-400/30 bg-green-500/[0.07] p-7 text-center sm:p-10">
            <h2 className="font-serif text-3xl">{isGerman ? 'Interesse geweckt?' : 'Interested?'}</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-white/70">
              {isGerman
                ? 'Schreib uns direkt per WhatsApp oder ruf uns an. Die Kontaktnummer wird nicht auf dieser Seite angezeigt.'
                : 'Message us directly on WhatsApp or call us. The contact number is not displayed on this page.'}
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center justify-center gap-3 border border-green-400/70 bg-green-500/15 px-6 text-sm font-semibold tracking-wider uppercase text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-green-500/25 hover:shadow-[0_0_22px_rgba(34,197,94,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0603] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <FaWhatsapp aria-hidden="true" className="size-5 text-green-200 transition-transform duration-200 group-hover:scale-110" />
                {isGerman ? 'Per WhatsApp bewerben' : 'Apply via WhatsApp'}
                <ArrowRight size={17} aria-hidden="true" />
              </a>
              <a
                href={`tel:+${APPLICATION_PHONE}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/15 px-6 text-sm font-semibold tracking-wider uppercase text-white/85 transition-colors duration-200 hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0603]"
              >
                <Phone size={16} aria-hidden="true" />
                {isGerman ? 'Direkt anrufen' : 'Call directly'}
              </a>
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-xs leading-relaxed text-white/45">
              {isGerman
                ? 'Mit dem Öffnen von WhatsApp entscheidest du selbst, welche Angaben du über den externen Dienst übermittelst.'
                : 'By opening WhatsApp, you decide which details to share through the external service.'}{' '}
              <Link href="/datenschutz" className="underline underline-offset-4 transition-colors hover:text-white/75">
                {isGerman ? 'Datenschutzerklärung' : 'Privacy policy'}
              </Link>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
