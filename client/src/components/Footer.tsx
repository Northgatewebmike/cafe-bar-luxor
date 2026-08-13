/**
 * Footer — Cafe&Bar Luxor
 * Design: Red & Black premium
 * Fully bilingual DE/EN
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#080000', borderTop: '1px solid rgba(180,0,0,0.2)' }} className="pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div
                className="text-xl font-semibold text-white/70"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Cafe&Bar
              </div>
              <div
                className="text-3xl font-bold tracking-widest -mt-1"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  letterSpacing: '0.15em',
                  background: 'linear-gradient(180deg, #dc5050, #b00000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                LUXOR
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {t('footer.tagline')}
            </p>
            <div className="mt-4 h-px w-16" style={{ background: 'linear-gradient(90deg, rgba(180,0,0,0.7), transparent)' }} />
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'rgba(180,0,0,0.8)', fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {t('footer.nav.title')}
            </h3>
            <nav className="space-y-2">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/ueber-uns', label: t('nav.about') },
                { href: '/speisekarte', label: t('nav.menu') },
                { href: '/galerie', label: t('nav.gallery') },
                { href: '/oeffnungszeiten', label: t('nav.hours') },
                { href: '/kontakt', label: t('nav.contact') },
                { href: '/automaten', label: t('nav.automaten') },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="text-white/40 text-sm transition-colors cursor-pointer flex items-center gap-2 group"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(220,80,80,0.9)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                    <span className="transition-colors text-xs" style={{ color: 'rgba(180,0,0,0.4)' }}>›</span>
                    {link.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: 'rgba(180,0,0,0.8)', fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {t('contact.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(180,0,0,0.7)' }} />
                <span className="text-white/40 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Ohligser Markt 5<br />
                  42697 Solingen{lang === 'de' ? ', Deutschland' : ', Germany'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="flex-shrink-0" style={{ color: 'rgba(180,0,0,0.7)' }} />
                <a
                  href="mailto:stoyansarakostov73@gmail.com"
                  className="text-white/40 text-sm transition-colors"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(220,80,80,0.9)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                >
                  stoyansarakostov73@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(180,0,0,0.7)' }} />
                <div className="text-white/40 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  {lang === 'de' ? 'Mo–Do' : 'Mon–Thu'}: 09:00–21:00<br />
                  {lang === 'de' ? 'Fr–Sa' : 'Fri–Sat'}: 09:00–23:00<br />
                  {lang === 'de' ? 'So' : 'Sun'}: 10:00–21:00
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            © {year} Cafe&Bar Luxor — Ivan Sarakostov. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/impressum">
              <span className="text-white/25 text-xs transition-colors cursor-pointer"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(220,80,80,0.8)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>  
                {t('footer.impressum')}
              </span>
            </Link>
            <span className="text-white/15 text-xs">|</span>
            <Link href="/allergene">
              <span className="text-white/25 text-xs transition-colors cursor-pointer"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(220,80,80,0.8)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                Allergene
              </span>
            </Link>
            <span className="text-white/15 text-xs">|</span>
            <Link href="/datenschutz">
              <span className="text-white/25 text-xs transition-colors cursor-pointer"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(220,80,80,0.8)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>  
                {t('footer.datenschutz')}
              </span>
            </Link>
            <span className="text-white/15 text-xs">|</span>
            <Link href="/dateiverwaltung">
              <span className="text-white/25 text-xs transition-colors cursor-pointer"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(220,80,80,0.8)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                Dateiverwaltung
              </span>
            </Link>
          </div>
        </div>

        {/* Northgateweb credit */}
        <div className="pt-4 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', marginTop: 8 }}>
          <a
            href="https://www.northgateweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-all duration-300 group"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="text-white/20 text-xs group-hover:text-white/45 transition-colors duration-300"
              style={{ fontFamily: "'Source Sans 3', sans-serif", letterSpacing: '0.05em' }}
            >
              Made by
            </span>
            <span
              className="text-white/30 text-xs font-semibold group-hover:text-red-400/70 transition-colors duration-300"
              style={{ fontFamily: "'Source Sans 3', sans-serif", letterSpacing: '0.08em' }}
            >
              Northgateweb.com
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
