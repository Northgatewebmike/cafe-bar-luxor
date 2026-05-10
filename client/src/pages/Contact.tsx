/**
 * Contact Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Contact form, info, Google Maps embed
 */
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, Clock, Send, CheckCircle } from 'lucide-react';

const HERO_BG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663501764506/ToSJ4GLVSPtLhFJydzwdTV/hero-bg-TiiQnZUxf7WXxAPwW5fEL7.webp';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  useReveal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const mailtoLink = `mailto:stoyansarakostov73@gmail.com?subject=${encodeURIComponent(
        formData.subject || 'Kontaktanfrage — Cafe&Bar Luxor'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nE-Mail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setTimeout(() => setStatus('success'), 1000);
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `w-full bg-white/5 border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-red-700/60 focus:bg-white/8 transition-all duration-300`;

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0603]">
      {/* ============ PAGE HERO ============ */}
      <section className="relative h-48 md:h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/60 to-[#0a0603]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-700" />
            <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              Cafe&Bar Luxor
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('contact.title')}
          </h1>
        </div>
      </section>

      {/* ============ CONTACT CONTENT ============ */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-white/50 text-base mb-12 reveal"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t('contact.subtitle')}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ---- Contact Form ---- */}
            <div className="reveal-left">
              <h2
                className="text-2xl font-semibold text-white mb-6"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {t('contact.title')}
              </h2>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center border border-green-500/30 bg-green-500/5">
                  <CheckCircle size={48} className="text-green-400 mb-4" />
                  <p
                    className="text-green-400 text-base"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    {t('contact.form.success')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-white/50 text-xs tracking-widest uppercase mb-2"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {t('contact.form.name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('contact.form.name')}
                        className={inputClass}
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-white/50 text-xs tracking-widest uppercase mb-2"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        {t('contact.form.email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('contact.form.email')}
                        className={inputClass}
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-white/50 text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {t('contact.form.subject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t('contact.form.subject')}
                      className={inputClass}
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-white/50 text-xs tracking-widest uppercase mb-2"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.message')}
                      className={`${inputClass} resize-none`}
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    />
                  </div>

                  {status === 'error' && (
                    <p
                      className="text-red-400 text-sm"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {t('contact.form.error')}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center gap-3 px-8 py-4 bg-red-700 text-[#0a0603] font-semibold text-sm tracking-widest uppercase hover:bg-[#dc5050] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                  >
                    <Send size={16} />
                    {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                  </button>
                </form>
              )}
            </div>

            {/* ---- Contact Info ---- */}
            <div className="reveal-right space-y-8">
              <div>
                <h2
                  className="text-2xl font-semibold text-white mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {t('contact.info.address')}
                </h2>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-4 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <MapPin size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-xs tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {t('contact.info.address')}
                      </p>
                      <p className="text-white/80 text-sm"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        Ohligser Markt 5<br />
                        42696 Solingen<br />
                        Deutschland
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <Mail size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-xs tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {t('contact.info.email')}
                      </p>
                      <a
                        href="mailto:stoyansarakostov73@gmail.com"
                        className="text-red-700 hover:text-[#dc5050] text-sm transition-colors break-all"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                      >
                        stoyansarakostov73@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-4 border border-white/8 hover:border-red-700/30 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <Clock size={20} className="text-red-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/40 text-xs tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {t('contact.info.hours')}
                      </p>
                      <p className="text-white/80 text-sm"
                        style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                        {t('hours.monday')}–{t('hours.saturday')}: 09:00–21:00 Uhr<br />
                        {t('hours.sunday')}: 10:00–20:00 Uhr
                      </p>
                    </div>
                  </div>

                  {/* Reservation note */}
                  <div className="p-4 border border-red-700/20 bg-red-700/5">
                    <p className="text-red-700 text-xs tracking-widest uppercase mb-1 font-semibold"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {t('contact.reservation')}
                    </p>
                    <p className="text-white/55 text-sm"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                      {t('contact.reservation.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ GOOGLE MAPS ============ */}
          <div className="mt-14 reveal">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-red-700" />
              <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {t('contact.map.title')}
              </span>
            </div>

            <div
              className="relative overflow-hidden border border-white/10"
              style={{ height: '420px' }}
            >
              {/* Real Google Maps embed for Ohligser Markt 5, 42696 Solingen */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2499.8!2d7.0742!3d51.1657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8d5f4b5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sOhligser%20Markt%205%2C%2042696%20Solingen!5e0!3m2!1sde!2sde!4v1715000000000!5m2!1sde!2sde"
                width="100%"
                height="420"
                style={{
                  border: 0,
                  filter: 'grayscale(20%) contrast(1.05) brightness(0.9) saturate(0.9)',
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe&Bar Luxor — Ohligser Markt 5, 42696 Solingen"
              />
              {/* Gold top border accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)' }}
              />
            </div>

            <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <p className="text-white/30 text-xs"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                Ohligser Markt 5, 42696 Solingen, Deutschland
              </p>
              <a
                href="https://maps.app.goo.gl/AqP7qYQ39kBf4gvz6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-700 text-xs hover:text-[#dc5050] transition-colors flex items-center gap-1"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                <MapPin size={12} />
                In Google Maps öffnen →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
