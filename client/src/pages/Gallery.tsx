/**
 * Gallery Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Flying photo posters with a 3D pop-up lightbox
 */
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

// Real photos from Cafe&Bar Luxor — café/bar photos only (no machines)
const PHOTO_INTERIOR = '/media/real-photo-1_8c74bd6b.jpg';   // Interior blue neon bar
const PHOTO_TERRACE_DAY = '/manus-storage/real-photo-2_e4b6d6ba_6dbf3328_bd76cd61.jpg'; // Terrace daytime
const PHOTO_TERRACE_SUNSET = '/manus-storage/real-photo-3_90e7752e_1f5e1473_964b47e3.jpg'; // Terrace golden hour
const PHOTO_EVENING = '/media/real-photo-8_da6a67e8.jpg';     // Evening with guests
// New terrace photos (May 2026)
const PHOTO_TERRACE_NEW1 = '/manus-storage/1000011501_26ad3baf_d298c594_ab864c9e.jpg';  // Terrace wide view with Luxor sign
const PHOTO_TERRACE_NEW2 = '/manus-storage/1000011502_96f266a9_23a1f7b8_0a9f3ab6.jpg';  // Terrace panorama morning
const PHOTO_TERRACE_NEW3 = '/manus-storage/1000011503_f266baf2_422a2734_e2a28e48.jpg';  // Terrace close-up tables

export default function Gallery() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  const galleryImages = [
    { src: PHOTO_INTERIOR, label: t('gallery.img1'), left: '3%', top: '8%', width: '32%', rotation: -7, drift: 8, delay: 0 },
    { src: PHOTO_TERRACE_SUNSET, label: t('gallery.img2'), left: '35%', top: '2%', width: '29%', rotation: 4, drift: 11, delay: 0.35 },
    { src: PHOTO_TERRACE_DAY, label: t('gallery.img3'), left: '67%', top: '13%', width: '30%', rotation: 8, drift: 7, delay: 0.7 },
    { src: PHOTO_TERRACE_NEW1, label: t('gallery.img4'), left: '18%', top: '49%', width: '31%', rotation: 7, drift: 10, delay: 0.5 },
    { src: PHOTO_TERRACE_NEW2, label: t('gallery.img5'), left: '47%', top: '43%', width: '34%', rotation: -5, drift: 9, delay: 0.9 },
    { src: PHOTO_TERRACE_NEW3, label: t('gallery.img6'), left: '70%', top: '62%', width: '27%', rotation: 6, drift: 7, delay: 0.2 },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setTimeout(() => setLightboxVisible(true), 10);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex(null);
      document.body.style.overflow = '';
    }, 300);
  };

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex((i) => (i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length));
      setLightboxVisible(true);
    }, 200);
  }, [lightboxIndex, galleryImages.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxVisible(false);
    setTimeout(() => {
      setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryImages.length));
      setLightboxVisible(true);
    }, 200);
  }, [lightboxIndex, galleryImages.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, prevImage, nextImage]);

  return (
    <div className="page-enter pt-16 md:pt-20 min-h-screen bg-[#0a0603]">
      {/* ============ PAGE HERO ============ */}
      <section className="relative h-48 md:h-64 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${PHOTO_TERRACE_SUNSET})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0603] via-[#0a0603]/60 to-[#0a0603]/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-8 bg-red-700" />
            <span className="text-red-700 text-xs tracking-[0.3em] uppercase font-medium"
              style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {t('gallery.subtitle')}
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {t('gallery.title')}
          </h1>
        </div>
      </section>

      {/* ============ GALLERY GRID ============ */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-white/40 text-sm mb-10"
            style={{ fontFamily: "'Source Sans 3', sans-serif" }}
          >
            {t('gallery.subtitle')}
          </p>

          {/* Flying posters — a Luxor-specific layered photo composition */}
          <div className="luxor-poster-stage" aria-label={t('gallery.title')}>
            {galleryImages.map((img, i) => (
              <motion.button
                type="button"
                key={i}
                className="luxor-poster group"
                style={{
                  left: img.left,
                  top: img.top,
                  width: img.width,
                  zIndex: i + 1,
                }}
                initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.94, rotateZ: img.rotation - 2 }}
                animate={reduceMotion
                  ? { opacity: 1, y: 0, scale: 1, rotateZ: img.rotation }
                  : {
                      opacity: 1,
                      y: [0, -img.drift, 0],
                      scale: 1,
                      rotateZ: [img.rotation, img.rotation + 0.6, img.rotation],
                    }}
                transition={reduceMotion
                  ? { duration: 0.01 }
                  : {
                      opacity: { duration: 0.55, delay: i * 0.09 },
                      y: { duration: 7 + i * 0.45, repeat: Infinity, ease: 'easeInOut', delay: img.delay },
                      rotateZ: { duration: 9 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: img.delay },
                    }}
                whileHover={reduceMotion ? undefined : { scale: 1.045, y: -14, rotateZ: 0, zIndex: 20 }}
                whileFocus={reduceMotion ? undefined : { scale: 1.035, y: -10, rotateZ: 0, zIndex: 20 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => openLightbox(i)}
                aria-label={`${img.label} — ${t('gallery.open')}`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/45 group-focus-visible:bg-black/45">
                  <div className="flex scale-90 flex-col items-center gap-2 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
                    <ZoomIn size={26} className="text-red-400" />
                    <span
                      className="max-w-[14rem] px-3 text-center text-xs uppercase tracking-[0.18em] text-white"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {img.label}
                    </span>
                  </div>
                </div>

                <div className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-red-700/30 transition-all duration-300 group-hover:border-red-500 group-focus-visible:border-red-500" />
                <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-red-700/30 transition-all duration-300 group-hover:border-red-500 group-focus-visible:border-red-500" />
                <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/55 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LIGHTBOX ============ */}
      {lightboxIndex !== null && (
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-300 ${
            lightboxVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ background: 'rgba(5, 3, 1, 0.95)', backdropFilter: 'blur(20px)' }}
          onClick={closeLightbox}
        >
          {/* 3D Pop-up image container */}
          <div
            className={`relative max-w-5xl max-h-[90vh] mx-4 transition-all duration-400 ${
              lightboxVisible
                ? 'scale-100 opacity-100 translate-y-0'
                : 'scale-90 opacity-0 translate-y-8'
            }`}
            style={{
              transform: lightboxVisible
                ? 'scale(1) perspective(1000px) rotateX(0deg)'
                : 'scale(0.9) perspective(1000px) rotateX(5deg)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(201,168,76,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].label}
              className="max-w-full max-h-[80vh] object-contain"
              style={{ border: '1px solid rgba(201,168,76,0.2)' }}
            />

            {/* Caption */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 text-center"
              style={{ background: 'linear-gradient(to top, rgba(10,6,3,0.9), transparent)' }}
            >
              <p
                className="text-red-700 text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}
              >
                {galleryImages[lightboxIndex].label}
              </p>
              <p className="text-white/30 text-xs mt-1"
                style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
                {lightboxIndex + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Gold corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-700" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-700" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-700" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-700" />
          </div>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-red-700 transition-colors z-10 border border-white/20 hover:border-red-700/50"
            onClick={closeLightbox}
            aria-label={t('gallery.close')}
          >
            <X size={24} />
          </button>

          {/* Prev button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-red-700 transition-colors border border-white/20 hover:border-red-700/50 bg-black/40"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label={t('gallery.prev')}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-red-700 transition-colors border border-white/20 hover:border-red-700/50 bg-black/40"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label={t('gallery.next')}
          >
            <ChevronRight size={24} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-xs md:max-w-lg px-2">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                className={`flex-shrink-0 w-10 h-10 overflow-hidden border-2 transition-all duration-200 ${
                  i === lightboxIndex ? 'border-red-700 scale-110' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(i);
                }}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
