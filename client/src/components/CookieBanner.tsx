import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X } from 'lucide-react';

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    const cookieDecision = localStorage.getItem('cookieConsent');
    if (cookieDecision) {
      setHasDecided(true);
    } else {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    setHasDecided(true);
    // Enable analytics
    window.location.reload();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
    setHasDecided(true);
  };

  if (!isVisible || hasDecided) {
    return null;
  }

  const content = lang === 'en' ? {
    title: 'Cookie Consent',
    description: 'We use cookies to enhance your experience and analyze website traffic. You can accept or reject cookies at any time.',
    accept: 'Accept',
    reject: 'Reject',
    learnMore: 'Learn More',
  } : {
    title: 'Cookie-Zustimmung',
    description: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern und Website-Verkehr zu analysieren. Sie können Cookies jederzeit akzeptieren oder ablehnen.',
    accept: 'Akzeptieren',
    reject: 'Ablehnen',
    learnMore: 'Mehr erfahren',
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {content.title}
            </h3>
            <p className="text-white/70 text-sm">
              {content.description}{' '}
              <a
                href={lang === 'en' ? '/datenschutz' : '/datenschutz'}
                className="text-red-700 hover:text-red-600 transition-colors underline"
              >
                {content.learnMore}
              </a>
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-white/70 border border-white/20 rounded hover:border-white/40 transition-colors text-sm"
            >
              {content.reject}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors text-sm font-semibold"
            >
              {content.accept}
            </button>
          </div>

          <button
            onClick={handleReject}
            className="absolute top-4 right-4 text-white/50 hover:text-white/80 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
