/**
 * Navigation — Cafe&Bar Luxor
 * Design: "Warme Patina" — Dark luxury with gold accents
 * Mobile-first, sticky, with language toggle DE/EN
 */
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/ueber-uns', label: t('nav.about') },
    { href: '/speisekarte', label: t('nav.menu') },
    { href: '/galerie', label: t('nav.gallery') },
    { href: '/oeffnungszeiten', label: t('nav.hours') },
    { href: '/kontakt', label: t('nav.contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0d0905]/95 backdrop-blur-md shadow-2xl shadow-black/50 border-b border-[#c9a84c]/20'
            : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex flex-col leading-none cursor-pointer group">
                <span
                  className="text-xl md:text-2xl font-semibold tracking-wide text-[#c9a84c] group-hover:text-[#e8c87a] transition-colors duration-300"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Cafe&Bar
                </span>
                <span
                  className="text-2xl md:text-3xl font-bold tracking-widest text-white group-hover:text-[#c9a84c] transition-colors duration-300 -mt-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", letterSpacing: '0.15em' }}
                >
                  LUXOR
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300 relative group cursor-pointer ${
                      isActive(link.href)
                        ? 'text-[#c9a84c]'
                        : 'text-white/80 hover:text-[#c9a84c]'
                    }`}
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-px bg-[#c9a84c] transition-transform duration-300 origin-left ${
                        isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </span>
                </Link>
              ))}
            </div>

            {/* Right: Language Toggle + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/20">
                <button
                  onClick={() => setLang('de')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                    lang === 'de'
                      ? 'bg-[#c9a84c] text-[#0d0905]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                    lang === 'en'
                      ? 'bg-[#c9a84c] text-[#0d0905]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white/80 hover:text-[#c9a84c] transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden transition-all duration-400 overflow-hidden ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ background: 'rgba(10, 6, 3, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="px-4 py-4 border-t border-[#c9a84c]/20">
            {navLinks.map((link, i) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`py-3 px-2 border-b border-white/5 flex items-center justify-between group cursor-pointer transition-all duration-200 ${
                    isActive(link.href) ? 'text-[#c9a84c]' : 'text-white/80 hover:text-[#c9a84c]'
                  }`}
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  <span className="text-base font-medium tracking-wide">{link.label}</span>
                  <span className="text-[#c9a84c]/40 group-hover:text-[#c9a84c] transition-colors">›</span>
                </div>
              </Link>
            ))}
            <div className="pt-4 flex gap-4">
              <Link href="/impressum">
                <span className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                  {t('nav.impressum')}
                </span>
              </Link>
              <Link href="/datenschutz">
                <span className="text-xs text-white/40 hover:text-white/70 transition-colors cursor-pointer">
                  {t('nav.datenschutz')}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
