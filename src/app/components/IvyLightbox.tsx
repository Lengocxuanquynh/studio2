"use client";

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../data/projects';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  downloadEnabled: boolean;
}

export function IvyLightbox({ images, currentIndex, onClose, onNavigate, downloadEnabled }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const current = images[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handlePrev, handleNext, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onContextMenu={(e) => e.preventDefault()}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)' }}>
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: 'Playfair Display, serif', color: 'rgba(234,230,216,0.5)', fontSize: '14px', letterSpacing: '0.2em', fontWeight: 400, fontStyle: 'italic' }}>
            IVY BRIDAL
          </span>
          <span style={{ color: 'rgba(234,230,216,0.2)', fontSize: '10px' }}>·</span>
          <span style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.4)', fontSize: '10px', letterSpacing: '0.1em' }}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {downloadEnabled && (
            <a
              href={current.url}
              download
              className="flex items-center gap-2 px-3 py-1.5 transition-all hover:opacity-80"
              style={{
                border: '1px solid rgba(234,230,216,0.2)',
                color: '#EAE6D8',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.2em',
              }}
            >
              <Download size={11} />
              TẢI XUỐNG
            </a>
          )}
          <button
            onClick={onClose}
            className="p-2 transition-all hover:opacity-60"
            style={{ color: '#EAE6D8' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={current.url}
            alt={current.caption || ''}
            className="max-w-full max-h-[85vh] object-contain select-none"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
          />
          {current.caption && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 text-center pb-4"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.5)', fontSize: '10px', letterSpacing: '0.15em' }}>
                {current.caption}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 transition-all hover:opacity-80"
            style={{
              backgroundColor: 'rgba(234,230,216,0.06)',
              border: '1px solid rgba(234,230,216,0.12)',
              color: '#EAE6D8',
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 transition-all hover:opacity-80"
            style={{
              backgroundColor: 'rgba(234,230,216,0.06)',
              border: '1px solid rgba(234,230,216,0.12)',
              color: '#EAE6D8',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Bottom thumbnail strip */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-1.5 pb-5 px-6"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
        <div className="flex gap-1.5 max-w-lg overflow-hidden">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => onNavigate(i)}
              className="flex-shrink-0 transition-all"
              style={{
                width: i === currentIndex ? 28 : 20,
                height: 3,
                backgroundColor: i === currentIndex ? '#EAE6D8' : 'rgba(234,230,216,0.2)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
