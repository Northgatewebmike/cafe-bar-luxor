/**
 * Gallery Page — Cafe&Bar Luxor
 * Design: "Warme Patina" — Photo grid with 3D pop-up lightbox
 */
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

// Real photos from Cafe&Bar Luxor — café/bar photos only (no machines)
const PHOTO_INTERIOR = '/manus-storage/real-photo-1_8c74bd6b.jpg';   // Interior blue neon bar
const PHOTO_TERRACE_DAY = '/manus-storage/real-photo-2_e4b6d6ba.jpg'; // Terrace daytime
const PHOTO_TERRACE_SUNSET = '/manus-storage/real-photo-3_90e7752e.jpg'; // Terrace golden hour
const PHOTO_EVENING = '/manus-storage/real-photo-8_da6a67e8.jpg';     // Evening with guests

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

export default function Gallery() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  useReveal();

  const galleryImages = [
    { src: PHOTO_INTERIOR, label: t('gallery.img1'), aspect: 'portrait' },
    { src: PHOTO_TERRACE_SUNSET, label: t('gallery.img2'), aspect: 'landscape' },
    { src: PHOTO_TERRACE_DAY, label: t('gallery.img3'), aspect: 'landscape' },
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

          {/* Masonry-style grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`reveal group relative overflow-hidden cursor-pointer ${
                  i === 0 || i === 3 || i === 4 || i === 7 ? 'col-span-2' : 'col-span-1'
                }`}
                style={{
                  aspectRatio: (i === 0 || i === 3 || i === 4 || i === 7) ? '16/9' : '1/1',
                  transitionDelay: `${(i % 4) * 80}ms`,
                }}
                onClick={() => openLightbox(i)}
              >
                {/* Image */}
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 flex flex-col items-center gap-2">
                    <ZoomIn size={28} className="text-red-700" />
                    <span
                      className="text-white text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'Source Sans 3', sans-serif" }}
                    >
                      {img.label}
                    </span>
                  </div>
                </div>

                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-700/0 group-hover:border-red-700/80 transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-700/0 group-hover:border-red-700/80 transition-all duration-300" />
              </div>
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
