/**
 * Footer — Cafe&Bar Luxor
 * Design: "Warme Patina" — Dark luxury with gold accents
 */
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080503] border-t border-[#c9a84c]/20 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div
                className="text-xl font-semibold text-[#c9a84c]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Cafe&Bar
              </div>
              <div
                className="text-3xl font-bold text-white tracking-widest -mt-1"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.15em' }}
              >
                LUXOR
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {t('footer.tagline')}
            </p>
            {/* Gold divider */}
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-[#c9a84c] to-transparent" />
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              Navigation
            </h3>
            <nav className="space-y-2">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/ueber-uns', label: t('nav.about') },
                { href: '/speisekarte', label: t('nav.menu') },
                { href: '/galerie', label: t('nav.gallery') },
                { href: '/oeffnungszeiten', label: t('nav.hours') },
                { href: '/kontakt', label: t('nav.contact') },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className="text-white/50 hover:text-[#c9a84c] text-sm transition-colors cursor-pointer flex items-center gap-2 group"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                    <span className="text-[#c9a84c]/30 group-hover:text-[#c9a84c] transition-colors text-xs">›</span>
                    {link.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3
              className="text-[#c9a84c] text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}
            >
              {t('contact.title')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Ohligser Markt 5<br />42696 Solingen, Deutschland
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-[#c9a84c] flex-shrink-0" />
                <a
                  href="mailto:stoyansarakostov73@gmail.com"
                  className="text-white/50 hover:text-[#c9a84c] text-sm transition-colors"
                  style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  stoyansarakostov73@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={15} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                <div className="text-white/50 text-sm" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                  Mo–Sa: 09:00–21:00<br />
                  So: 10:00–20:00
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
            © {year} Cafe&Bar Luxor — Ivan Sarakostov. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/impressum">
              <span className="text-white/30 hover:text-[#c9a84c] text-xs transition-colors cursor-pointer"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('footer.impressum')}
              </span>
            </Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/datenschutz">
              <span className="text-white/30 hover:text-[#c9a84c] text-xs transition-colors cursor-pointer"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('footer.datenschutz')}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
