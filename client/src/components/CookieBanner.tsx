/**
 * CookieBanner — Cafe&Bar Luxor
 * DSGVO / TDDDG compliant (§ 25 TDDDG, Art. 6 DSGVO)
 * - Shows on EVERY first visit (no prior consent stored)
 * - Granular: essential-only vs. all cookies
 * - Stores consent in localStorage with timestamp + version
 * - Links to /datenschutz and /impressum
 * - No page reload on accept
 */
import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

const STORAGE_KEY = 'luxor_cookie_consent';
const STORAGE_VERSION = '2'; // bump to re-ask after policy changes

export type ConsentState = {
  essential: true;
  analytics: boolean;
  maps: boolean;
  timestamp: number;
  version: string;
};

/** Read stored consent — returns null if not yet given or version outdated */
export function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: ConsentState = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, maps: boolean): ConsentState {
  const consent: ConsentState = {
    essential: true,
    analytics,
    maps,
    timestamp: Date.now(),
    version: STORAGE_VERSION,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('luxor:consent', { detail: consent }));
  // Load Umami analytics script if analytics consent was granted
  if (analytics) {
    loadUmamiIfNeeded();
  }
  return consent;
}

/** Inject Umami script tag once — only after analytics consent */
export function loadUmamiIfNeeded() {
  if (document.getElementById('umami-script')) return; // already loaded
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
  if (!endpoint || !websiteId) return;
  const script = document.createElement('script');
  script.id = 'umami-script';
  script.defer = true;
  script.src = `${endpoint}/umami`;
  script.setAttribute('data-website-id', websiteId);
  document.head.appendChild(script);
}

const SANS = "'Source Sans 3', sans-serif";

export default function CookieBanner() {
  const { lang } = useLanguage();
  const de = lang === 'de';
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);
  const [mapsChecked, setMapsChecked] = useState(true);

  useEffect(() => {
    const consent = getStoredConsent();
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    } else {
      // Restore previously granted consents on page load
      if (consent.analytics) loadUmamiIfNeeded();
    }
  }, []);

  if (!visible) return null;

  const handleAcceptAll = () => {
    saveConsent(true, true);
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    saveConsent(false, false);
    setVisible(false);
  };

  const handleSaveSelection = () => {
    saveConsent(analyticsChecked, mapsChecked);
    setVisible(false);
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
      style={{ background: 'rgba(8,0,0,0.97)', borderTop: '1px solid rgba(180,0,0,0.35)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">

          {/* Text block */}
          <div className="flex-1">
            <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: SANS }}>
              {de ? 'Wir verwenden Cookies' : 'We use cookies'}
            </p>
            <p className="text-white/55 text-xs leading-relaxed" style={{ fontFamily: SANS }}>
              {de
                ? 'Diese Website verwendet Cookies gemäß § 25 TDDDG und Art. 6 DSGVO. Technisch notwendige Cookies sind immer aktiv. Für Analyse (Umami) und Google Maps benötigen wir Ihre Einwilligung.'
                : 'This website uses cookies pursuant to § 25 TDDDG and Art. 6 GDPR. Technically necessary cookies are always active. For analytics (Umami) and Google Maps we require your consent.'}
              {' '}
              <Link href="/datenschutz">
                <span className="text-red-700 hover:text-[#dc5050] transition-colors cursor-pointer underline">
                  {de ? 'Datenschutzerklärung' : 'Privacy Policy'}
                </span>
              </Link>
              {' | '}
              <Link href="/impressum">
                <span className="text-red-700 hover:text-[#dc5050] transition-colors cursor-pointer underline">
                  Impressum
                </span>
              </Link>
            </p>

            {/* Details toggle */}
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-white/40 text-xs mt-2 hover:text-white/70 transition-colors underline"
              style={{ fontFamily: SANS }}
            >
              {showDetails
                ? (de ? 'Details ausblenden' : 'Hide details')
                : (de ? 'Einstellungen anpassen' : 'Customize settings')}
            </button>

            {/* Granular controls */}
            {showDetails && (
              <div className="mt-3 space-y-2 border border-white/10 p-3" style={{ background: 'rgba(255,255,255,0.02)' }}>
                {/* Essential — always on */}
                <label className="flex items-start gap-3 cursor-not-allowed">
                  <input type="checkbox" checked readOnly disabled className="mt-0.5 w-4 h-4 accent-red-700" />
                  <div>
                    <p className="text-white/70 text-xs font-semibold" style={{ fontFamily: SANS }}>
                      {de ? 'Technisch notwendig (immer aktiv)' : 'Technically necessary (always active)'}
                    </p>
                    <p className="text-white/35 text-xs" style={{ fontFamily: SANS }}>
                      {de ? 'Cookie-Einwilligung, Spracheinstellung' : 'Cookie consent, language preference'}
                    </p>
                  </div>
                </label>

                {/* Analytics */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-red-700"
                  />
                  <div>
                    <p className="text-white/70 text-xs font-semibold" style={{ fontFamily: SANS }}>
                      {de ? 'Analyse — Umami Analytics' : 'Analytics — Umami Analytics'}
                    </p>
                    <p className="text-white/35 text-xs" style={{ fontFamily: SANS }}>
                      {de
                        ? 'Anonyme Besucherstatistiken. Kein Cross-Site-Tracking, keine Weitergabe an Dritte.'
                        : 'Anonymous visitor statistics. No cross-site tracking, no third-party sharing.'}
                    </p>
                  </div>
                </label>

                {/* Google Maps */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapsChecked}
                    onChange={(e) => setMapsChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-red-700"
                  />
                  <div>
                    <p className="text-white/70 text-xs font-semibold" style={{ fontFamily: SANS }}>
                      Google Maps
                    </p>
                    <p className="text-white/35 text-xs" style={{ fontFamily: SANS }}>
                      {de
                        ? 'Interaktive Karte auf der Kontaktseite. Datenübertragung an Google LLC (USA) gem. Art. 46 DSGVO.'
                        : 'Interactive map on the contact page. Data transfer to Google LLC (USA) pursuant to Art. 46 GDPR.'}
                    </p>
                  </div>
                </label>

                <button
                  onClick={handleSaveSelection}
                  className="mt-2 text-xs px-4 py-1.5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all"
                  style={{ fontFamily: SANS }}
                >
                  {de ? 'Auswahl speichern' : 'Save selection'}
                </button>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-row md:flex-col gap-2 md:min-w-[160px]">
            <button
              onClick={handleAcceptAll}
              className="flex-1 md:flex-none px-6 py-2.5 bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: SANS }}
            >
              {de ? 'Alle akzeptieren' : 'Accept all'}
            </button>
            <button
              onClick={handleEssentialOnly}
              className="flex-1 md:flex-none px-6 py-2.5 border border-white/20 text-white/60 text-sm hover:border-white/40 hover:text-white/80 transition-all duration-200"
              style={{ fontFamily: SANS }}
            >
              {de ? 'Nur notwendige' : 'Essential only'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
