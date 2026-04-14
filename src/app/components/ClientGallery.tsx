"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Download, ArrowLeft } from 'lucide-react';
import { PROJECTS, type GalleryImage } from '../data/projects';
import { IvyLightbox } from './IvyLightbox';

function GalleryItem({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden cursor-pointer group"
      style={{ marginBottom: '12px' }}
      initial={{ opacity: 0, y: 16 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 6) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Blur placeholder */}
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#1F2828', backgroundImage: `url(${image.url}&w=40&q=10)`, backgroundSize: 'cover', filter: 'blur(12px)', transform: 'scale(1.05)' }}
        />
      )}

      <motion.img
        src={image.url}
        alt={image.caption || ''}
        className="w-full h-auto block select-none"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          filter: 'brightness(0.88)',
        }}
        onLoad={() => setLoaded(true)}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02, filter: 'brightness(1)' } as any}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4"
        style={{ background: 'linear-gradient(to top, rgba(31,40,40,0.6) 0%, transparent 60%)' }}
      >
        {image.caption && (
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.7)', fontSize: '10px', letterSpacing: '0.1em' }}>
            {image.caption}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function ClientGallery() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const project = PROJECTS.find(p => p.id === id);

  useEffect(() => {
    // Check authentication
    if (!sessionStorage.getItem(`ivy_auth_${id}`)) {
      router.replace(`/auth/${id}`);
    }
  }, [id, router]);

  useEffect(() => {
    document.oncontextmenu = () => false;
    return () => { document.oncontextmenu = null; };
  }, []);

  if (!project) return null;

  // Group by section
  const sections = Array.from(new Set(project.gallery.map(img => img.section).filter(Boolean)));
  const ungrouped = project.gallery.filter(img => !img.section);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#2C3939' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Hero */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ height: '80vh' }}>
        <motion.img
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover select-none"
          style={{ filter: 'brightness(0.55)' }}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(44,57,57,1) 0%, rgba(44,57,57,0.1) 60%, transparent 100%)' }}
        />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.5)', fontSize: '10px', letterSpacing: '0.4em', marginBottom: '20px' }}
          >
            {project.category.toUpperCase()}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5 }}
            style={{ fontFamily: 'Playfair Display, serif', color: '#EAE6D8', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '0.03em' }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.6)', fontSize: '14px', letterSpacing: '0.12em' }}
          >
            {project.subtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.35)', fontSize: '11px', letterSpacing: '0.1em', marginTop: '10px' }}
          >
            {project.date} · {project.imageCount} hình ảnh
          </motion.p>
        </div>
      </div>

      {/* Sticky Top Bar */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-4"
        style={{ backgroundColor: 'rgba(44,57,57,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(234,230,216,0.06)' }}
      >
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 transition-all hover:opacity-60"
          style={{ color: '#6A8080' }}
        >
          <ArrowLeft size={14} />
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '0.25em' }}>
            TỔNG QUAN
          </span>
        </button>

        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#EAE6D8', fontSize: '14px', fontWeight: 400, letterSpacing: '0.1em', fontStyle: 'italic' }}>
          {project.title}
        </h2>

        <div className="flex items-center gap-3">
          {project.downloadEnabled && (
            <button
              className="flex items-center gap-2 px-4 py-2 transition-all hover:opacity-80"
              style={{
                border: '1px solid rgba(234,230,216,0.2)',
                color: '#EAE6D8',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.25em',
              }}
            >
              <Download size={11} />
              TẢI XUỐNG TẤT CẢ
            </button>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="px-4 md:px-8 pb-24">
        {/* Description */}
        <motion.div
          className="text-center py-16 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p style={{ fontFamily: 'Playfair Display, serif', color: '#8A9E9E', fontSize: '16px', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.8 }}>
            &quot;{project.description}&quot;
          </p>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: 'rgba(234,230,216,0.15)' }} />
        </motion.div>

        {/* Gallery by section */}
        {sections.length > 0 ? (
          sections.map((section) => {
            const sectionImages = project.gallery.filter(img => img.section === section);
            return (
              <div key={section} className="mb-16">
                {/* Section header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(234,230,216,0.07)' }} />
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', color: '#6A8080', fontSize: '9px', letterSpacing: '0.35em' }}>
                    {section?.toUpperCase()}
                  </h3>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(234,230,216,0.07)' }} />
                </div>

                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
                  <Masonry gutter="12px">
                    {sectionImages.map((image, i) => (
                      <GalleryItem
                        key={image.id}
                        image={image}
                        index={i}
                        onClick={() => {
                          const globalIndex = project.gallery.findIndex(g => g.id === image.id);
                          setLightboxIndex(globalIndex);
                        }}
                      />
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </div>
            );
          })
        ) : (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
            <Masonry gutter="12px">
              {project.gallery.map((image, i) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  index={i}
                  onClick={() => setLightboxIndex(i)}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}

        {/* Footer */}
        <div className="text-center pt-16 pb-8">
          <p style={{ fontFamily: 'Playfair Display, serif', color: '#4A6060', fontSize: '14px', fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.1em' }}>
            IVY BRIDAL Studio
          </p>
          {project.expiresAt && (
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#3A5050', fontSize: '9px', letterSpacing: '0.2em', marginTop: '8px' }}>
              Thư viện có hiệu lực đến {project.expiresAt}
            </p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <IvyLightbox
            images={project.gallery}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
            downloadEnabled={project.downloadEnabled}
          />
        )}
      </AnimatePresence>
    </div>
  );
}