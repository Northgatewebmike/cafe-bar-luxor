/**
 * Navigation — Cafe&Bar Luxor
 * Design: Red & Black — Premium dark with red accents
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
    { href: '/automaten', label: t('nav.automaten') },
    { href: '/allergene', label: lang === 'de' ? 'Allergeninfo' : 'Allergen Info' },
    { href: '/speisen', label: lang === 'de' ? 'Speisen' : 'Food' },
    { href: '/jobs-praktikum', label: lang === 'de' ? 'Jobs & Praktikum' : 'Jobs & Internships' },
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
            ? 'border-b border-red-900/30'
            : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(10,0,0,0.96)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.7)',
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex flex-col leading-none cursor-pointer group">
                <span
                  className="text-lg md:text-xl font-medium tracking-wide transition-colors duration-300"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: 'rgba(220,80,80,0.85)',
                  }}
                >
                  Cafe&Bar
                </span>
                <span
                  className="text-2xl md:text-3xl font-bold tracking-widest text-white transition-colors duration-300 -mt-1"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    letterSpacing: '0.15em',
                    textShadow: '0 0 20px rgba(180,0,0,0.3)',
                  }}
                >
                  LUXOR
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300 relative group cursor-pointer ${
                      isActive(link.href)
                        ? 'text-red-400'
                        : 'text-white/75 hover:text-red-300'
                    }`}
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-px transition-transform duration-300 origin-left ${
                        isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                      style={{ background: 'rgba(180,0,0,0.8)' }}
                    />
                  </span>
                </Link>
              ))}
            </div>

            {/* Right: Language Toggle + Mobile Menu */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <div
                className="flex items-center p-0.5"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(180,0,0,0.25)',
                  borderRadius: '999px',
                }}
              >
                <button
                  onClick={() => setLang('de')}
                  className={`px-3 py-1 text-xs font-semibold tracking-wider transition-all duration-300 ${
                    lang === 'de' ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                  style={{
                    borderRadius: '999px',
                    background: lang === 'de' ? 'rgba(180,0,0,0.8)' : 'transparent',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  DE
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-xs font-semibold tracking-wider transition-all duration-300 ${
                    lang === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                  style={{
                    borderRadius: '999px',
                    background: lang === 'en' ? 'rgba(180,0,0,0.8)' : 'transparent',
                    fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 transition-colors"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Menü schließen' : 'Menü öffnen'}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden transition-all duration-400 overflow-hidden ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ background: 'rgba(10,0,0,0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(180,0,0,0.2)' }}>
            {navLinks.map((link, i) => (
              <Link key={link.href} href={link.href}>
                <div
                  className={`py-3.5 px-2 flex items-center justify-between group cursor-pointer transition-all duration-200 ${
                    isActive(link.href) ? 'text-red-400' : 'text-white/75 hover:text-red-300'
                  }`}
                  style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    animationDelay: `${i * 40}ms`,
                  }}
                >
                  <span className="text-base font-medium tracking-wide">{link.label}</span>
                  <span
                    className="transition-colors text-sm"
                    style={{ color: isActive(link.href) ? 'rgba(180,0,0,0.8)' : 'rgba(255,255,255,0.2)' }}
                  >
                    ›
                  </span>
                </div>
              </Link>
            ))}
            <div className="pt-4 flex gap-4">
              <Link href="/impressum">
                <span
                  className="text-xs transition-colors cursor-pointer hover:text-white/70"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Source Sans 3', sans-serif" }}
                >
                  {t('nav.impressum')}
                </span>
              </Link>
              <Link href="/datenschutz">
                <span
                  className="text-xs transition-colors cursor-pointer hover:text-white/70"
                  style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Source Sans 3', sans-serif" }}
                >
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
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
