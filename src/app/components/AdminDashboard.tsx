"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Plus, Copy, Trash2,
  HardDrive, Clock, CheckCircle2, FileEdit, Lock, Eye, Archive
} from 'lucide-react';
import { PROJECTS, STATUS_LABELS, type Project, type ProjectStatus } from '../data/projects';

const STATUS_DOT: Record<ProjectStatus, string> = {
  draft: '#9E9E7A',
  editing: '#7AAEAE',
  delivered: '#8AB87A',
  expired: '#6A6A6A',
};

const STATUS_ICONS: Record<ProjectStatus, React.ReactNode> = {
  draft: <FileEdit size={9} />,
  editing: <Clock size={9} />,
  delivered: <CheckCircle2 size={9} />,
  expired: <Lock size={9} />,
};

const FILTER_TABS: { key: ProjectStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'Tất Cả' },
  { key: 'delivered', label: 'Đã Giao' },
  { key: 'editing', label: 'Đang Chỉnh Sửa' },
  { key: 'draft', label: 'Bản Nháp' },
  { key: 'expired', label: 'Hết Hạn' },
];

/* ─── Overlay Card (text overlaid directly on image) ─── */
function OverlayCard({
  project,
  index,
  onView,
  size = 'md',
}: {
  project: Project;
  index: number;
  onView: () => void;
  size?: 'hero' | 'lg' | 'md' | 'sm';
}) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAccessible = project.status === 'delivered';

  const heightMap = {
    hero: '520px',
    lg: '460px',
    md: '320px',
    sm: '240px',
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/auth/${project.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const numStr = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer select-none"
      style={{ height: heightMap[size] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={isAccessible ? onView : undefined}
      onContextMenu={(e) => e.preventDefault()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Image */}
      <motion.img
        src={project.cover}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: project.status === 'expired'
            ? 'grayscale(80%) brightness(0.35)'
            : 'brightness(0.6)',
        }}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* Gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(18,26,26,0.92) 0%, rgba(18,26,26,0.5) 50%, rgba(18,26,26,0.15) 100%)'
            : 'linear-gradient(to top, rgba(18,26,26,0.85) 0%, rgba(18,26,26,0.3) 55%, rgba(18,26,26,0.05) 100%)',
          transition: 'background 0.6s ease',
        }}
      />

      {/* Top row: number + status */}
      <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-5">
        {/* Large editorial number */}
        <span
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: size === 'hero' ? '56px' : '36px',
            fontWeight: 400,
            color: 'rgba(234,230,216,0.12)',
            lineHeight: 1,
            fontStyle: 'italic',
            userSelect: 'none',
          }}
        >
          {numStr}
        </span>

        {/* Status */}
        <div className="flex items-center gap-1.5 mt-1">
          <div
            className="rounded-full"
            style={{
              width: 5,
              height: 5,
              backgroundColor: STATUS_DOT[project.status],
              boxShadow: `0 0 6px ${STATUS_DOT[project.status]}`,
            }}
          />
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '8px',
              letterSpacing: '0.25em',
              color: STATUS_DOT[project.status],
            }}
          >
            {STATUS_LABELS[project.status].toUpperCase()}
          </span>
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Category */}
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '8px',
            letterSpacing: '0.35em',
            color: 'rgba(234,230,216,0.45)',
            marginBottom: '6px',
          }}
        >
          {project.category.toUpperCase()}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#EAE6D8',
            fontSize: size === 'hero' ? '28px' : size === 'lg' ? '22px' : '17px',
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: '3px',
          }}
        >
          {project.title}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'Montserrat, sans-serif',
            color: 'rgba(234,230,216,0.5)',
            fontSize: '10px',
            letterSpacing: '0.08em',
            marginBottom: '10px',
          }}
        >
          {project.subtitle}
        </p>

        {/* Meta line */}
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.3)', fontSize: '9px', letterSpacing: '0.1em' }}>
            {project.imageCount} ảnh
          </span>
          <span style={{ color: 'rgba(234,230,216,0.15)', fontSize: '9px' }}>—</span>
          <span style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.3)', fontSize: '9px', letterSpacing: '0.06em' }}>
            {project.date}
          </span>
          <span style={{ color: 'rgba(234,230,216,0.15)', fontSize: '9px' }}>—</span>
          <span style={{ fontFamily: 'Montserrat, sans-serif', color: 'rgba(234,230,216,0.3)', fontSize: '9px' }}>
            {project.storageSize}
          </span>
        </div>

        {/* Editing progress bar */}
        {project.status === 'editing' && (
          <div className="mt-3">
            <div className="h-px w-full" style={{ backgroundColor: 'rgba(122,174,174,0.15)' }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: '#7AAEAE', opacity: 0.7 }}
                initial={{ width: '0%' }}
                animate={{ width: '68%' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
              />
            </div>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#7AAEAE', fontSize: '8px', letterSpacing: '0.2em', marginTop: '4px', opacity: 0.7 }}>
              ĐANG XỬ LÝ · 68%
            </p>
          </div>
        )}

        {/* Expired lock */}
        {project.status === 'expired' && (
          <div className="flex items-center gap-2 mt-2 opacity-40">
            <Lock size={10} style={{ color: '#EAE6D8' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#EAE6D8', fontSize: '8px', letterSpacing: '0.2em' }}>
              ĐÃ HẾT HẠN · {project.expiresAt}
            </span>
          </div>
        )}
      </div>

      {/* Hover actions panel */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col items-center gap-3">
              {isAccessible && (
                <motion.button
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 }}
                  className="flex items-center gap-2 px-6 py-2.5"
                  style={{
                    backgroundColor: 'rgba(234,230,216,0.1)',
                    border: '1px solid rgba(234,230,216,0.35)',
                    color: '#EAE6D8',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '0.25em',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <Eye size={11} />
                  XEM THƯ VIỆN
                </motion.button>
              )}
              <motion.div
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2"
              >
                <button
                  onClick={handleCopy}
                  className="p-2 transition-all hover:opacity-70"
                  style={{
                    backgroundColor: 'rgba(234,230,216,0.07)',
                    border: '1px solid rgba(234,230,216,0.15)',
                    color: '#EAE6D8',
                  }}
                  title="Sao chép link"
                >
                  <Copy size={11} />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 transition-all hover:opacity-70"
                  style={{
                    backgroundColor: 'rgba(234,230,216,0.07)',
                    border: '1px solid rgba(234,230,216,0.15)',
                    color: '#EAE6D8',
                  }}
                  title="Lưu trữ"
                >
                  <Archive size={11} />
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 transition-all hover:opacity-70"
                  style={{
                    backgroundColor: 'rgba(174,100,100,0.12)',
                    border: '1px solid rgba(174,100,100,0.2)',
                    color: '#C47A7A',
                  }}
                  title="Xóa"
                >
                  <Trash2 size={11} />
                </button>
              </motion.div>
              {copied && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontFamily: 'Montserrat, sans-serif', color: '#8AB87A', fontSize: '8px', letterSpacing: '0.2em' }}
                >
                  ĐÃ SAO CHÉP
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thin border on hover */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          border: `1px solid ${hovered ? 'rgba(234,230,216,0.15)' : 'rgba(234,230,216,0)'}`,
          transition: 'border-color 0.4s ease',
        }}
      />
    </motion.div>
  );
}

/* ─── Main Dashboard ─── */
export function AdminDashboard() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<ProjectStatus | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = PROJECTS.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'all' || p.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const storageUsed = 53.4;
  const storageTotal = 100;
  const storagePercent = (storageUsed / storageTotal) * 100;

  /* Editorial grid layout: [hero, lg, md, sm, ...] */
  const getSize = (i: number): 'hero' | 'lg' | 'md' | 'sm' => {
    const pattern: ('hero' | 'lg' | 'md' | 'sm')[] = ['hero', 'lg', 'md', 'md', 'lg', 'sm'];
    return pattern[i % pattern.length];
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#1A2424' }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* ── HEADER ── */}
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          backgroundColor: 'rgba(26,36,36,0.9)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(234,230,216,0.05)',
        }}
      >
        <div className="flex items-center justify-between px-8 py-4 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <div className="flex items-end gap-6">
            <div>
              <div className="flex items-baseline gap-3">
                <h1
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#EAE6D8',
                    fontSize: '17px',
                    letterSpacing: '0.32em',
                    fontWeight: 400,
                  }}
                >
                  IVY BRIDAL
                </h1>
                <div className="w-px h-3 self-center" style={{ backgroundColor: 'rgba(234,230,216,0.15)' }} />
                <span
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    color: '#4A6060',
                    fontSize: '7px',
                    letterSpacing: '0.4em',
                  }}
                >
                  STUDIO PRIVÉ
                </span>
              </div>
            </div>
          </div>

          {/* Center: Filter tabs */}
          <div className="hidden md:flex items-center gap-0.5">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className="px-4 py-2 transition-all"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '8px',
                  letterSpacing: '0.22em',
                  color: activeFilter === tab.key ? '#EAE6D8' : '#4A6060',
                  borderBottom: `1px solid ${activeFilter === tab.key ? 'rgba(234,230,216,0.5)' : 'transparent'}`,
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Right: Search + Storage + New */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <input
                      type="text"
                      placeholder="Tìm kiếm..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      autoFocus
                      className="w-full px-3 py-1.5 outline-none"
                      style={{
                        backgroundColor: 'rgba(234,230,216,0.05)',
                        border: '1px solid rgba(234,230,216,0.1)',
                        color: '#EAE6D8',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '11px',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => { setSearchOpen(v => !v); if (searchOpen) setSearch(''); }}
                className="p-1.5 transition-all hover:opacity-60"
                style={{ color: '#4A6060' }}
              >
                <Search size={14} />
              </button>
            </div>

            {/* Storage indicator */}
            <div className="hidden lg:flex items-center gap-2.5">
              <HardDrive size={11} style={{ color: '#3A5050' }} />
              <div>
                <div className="h-px w-20" style={{ backgroundColor: 'rgba(234,230,216,0.06)' }}>
                  <div
                    style={{
                      width: `${storagePercent}%`,
                      height: '100%',
                      backgroundColor: '#5A9090',
                    }}
                  />
                </div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#3A5050', fontSize: '7px', letterSpacing: '0.15em', marginTop: '3px' }}>
                  {storageUsed} / {storageTotal} GB
                </p>
              </div>
            </div>

            {/* New project */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 transition-all hover:opacity-80"
              style={{
                backgroundColor: 'rgba(234,230,216,0.08)',
                border: '1px solid rgba(234,230,216,0.2)',
                color: '#EAE6D8',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '8px',
                letterSpacing: '0.25em',
              }}
            >
              <Plus size={11} />
              TẠO MỚI
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main
        className="pt-20 pb-24 max-w-screen-2xl mx-auto"
        style={{ paddingLeft: 'clamp(16px, 3vw, 48px)', paddingRight: 'clamp(16px, 3vw, 48px)' }}
      >
        {/* ── Page heading ── */}
        <motion.div
          className="flex items-end justify-between mb-10 pt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                color: '#3A5050',
                fontSize: '8px',
                letterSpacing: '0.4em',
                marginBottom: '10px',
              }}
            >
              KHÔNG GIAN LÀM VIỆC
            </p>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                color: '#EAE6D8',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1,
                fontStyle: 'italic',
              }}
            >
              Dự Án
            </h2>
          </div>
          <div className="text-right">
            <p style={{ fontFamily: 'Playfair Display, serif', color: '#3A5050', fontSize: '40px', fontWeight: 400, lineHeight: 1 }}>
              {String(filtered.length).padStart(2, '0')}
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#3A5050', fontSize: '7px', letterSpacing: '0.3em', marginTop: '4px' }}>
              DỰ ÁN · {PROJECTS.filter(p => p.status === 'delivered').length} ĐÃ GIAO
            </p>
          </div>
        </motion.div>

        {/* ── Thin divider ── */}
        <div className="w-full h-px mb-10" style={{ backgroundColor: 'rgba(234,230,216,0.06)' }} />

        {/* ── Editorial Grid ── */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40">
            <p style={{ fontFamily: 'Playfair Display, serif', color: '#2A3E3E', fontSize: '22px', fontStyle: 'italic', fontWeight: 400 }}>
              Không tìm thấy dự án nào
            </p>
          </div>
        ) : (
          <EditorialGrid
            projects={filtered}
            onView={(id) => router.push(`/auth/${id}`)}
            getSize={getSize}
          />
        )}
      </main>

      {/* ── Create Modal ── */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: 'rgba(10,18,18,0.88)', backdropFilter: 'blur(12px)' }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              className="w-full max-w-md"
              style={{ backgroundColor: '#1F2828', border: '1px solid rgba(234,230,216,0.08)' }}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header image strip */}
              <div className="h-24 overflow-hidden relative">
                <img
                  src={PROJECTS[0].cover}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: 'brightness(0.4) grayscale(30%)' }}
                  draggable={false}
                />
                <div className="absolute inset-0 flex items-end p-5">
                  <h3 style={{ fontFamily: 'Playfair Display, serif', color: '#EAE6D8', fontSize: '18px', fontWeight: 400, fontStyle: 'italic' }}>
                    Tạo Dự Án Mới
                  </h3>
                </div>
              </div>

              <div className="p-7">
                {[
                  { label: 'TÊN DỰ ÁN', placeholder: 'Uyên & Minh — Hôn Lễ' },
                  { label: 'DANH MỤC', placeholder: 'Đám Cưới' },
                  { label: 'MẬT KHẨU TRUY CẬP', placeholder: '••••' },
                ].map((field) => (
                  <div key={field.label} className="mb-5">
                    <label
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        color: '#3A5050',
                        fontSize: '7px',
                        letterSpacing: '0.35em',
                        display: 'block',
                        marginBottom: '8px',
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      className="w-full px-0 py-2 outline-none"
                      style={{
                        backgroundColor: 'transparent',
                        borderBottom: '1px solid rgba(234,230,216,0.1)',
                        borderTop: 'none',
                        borderLeft: 'none',
                        borderRight: 'none',
                        color: '#EAE6D8',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '13px',
                      }}
                    />
                  </div>
                ))}

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 transition-all hover:opacity-60"
                    style={{
                      border: '1px solid rgba(234,230,216,0.08)',
                      color: '#3A5050',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '8px',
                      letterSpacing: '0.25em',
                    }}
                  >
                    HỦY BỎ
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3 transition-all hover:opacity-80"
                    style={{
                      backgroundColor: '#EAE6D8',
                      color: '#1A2424',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '8px',
                      letterSpacing: '0.25em',
                      fontWeight: 500,
                    }}
                  >
                    TẠO DỰ ÁN
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Editorial Grid Layout ─── */
function EditorialGrid({
  projects,
  onView,
  getSize,
}: {
  projects: Project[];
  onView: (id: string) => void;
  getSize: (i: number) => 'hero' | 'lg' | 'md' | 'sm';
}) {
  // Build rows: [hero+lg], [md+md+md], [lg+md], ...
  // We'll do a bespoke layout for up to 6 projects, then repeat pattern
  const rows: Array<{ items: Array<{ project: Project; globalIndex: number; size: 'hero' | 'lg' | 'md' | 'sm' }> }> = [];

  let i = 0;
  let rowPattern = 0;

  while (i < projects.length) {
    const patterns = [
      // Row A: hero (2/3) + lg (1/3)
      [{ fraction: 2, size: 'hero' as const }, { fraction: 1, size: 'lg' as const }],
      // Row B: md (1/3) + md (1/3) + md (1/3)
      [{ fraction: 1, size: 'md' as const }, { fraction: 1, size: 'md' as const }, { fraction: 1, size: 'md' as const }],
      // Row C: lg (1/3) + hero (2/3)
      [{ fraction: 1, size: 'lg' as const }, { fraction: 2, size: 'hero' as const }],
      // Row D: sm + sm + sm + sm
      [{ fraction: 1, size: 'sm' as const }, { fraction: 1, size: 'sm' as const }, { fraction: 1, size: 'sm' as const }],
    ];

    const pat = patterns[rowPattern % patterns.length];
    const rowItems = [];
    for (const slot of pat) {
      if (i < projects.length) {
        rowItems.push({ project: projects[i], globalIndex: i, size: slot.size });
        i++;
      }
    }
    rows.push({ items: rowItems });
    rowPattern++;
  }

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, rowIdx) => (
        <motion.div
          key={rowIdx}
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: rowIdx * 0.08 }}
        >
          {row.items.map(({ project, globalIndex, size }, colIdx) => {
            // determine flex basis
            const totalCols = row.items.reduce((acc, it) => {
              const weights = { hero: 2, lg: 1.5, md: 1, sm: 1 };
              return acc + weights[it.size];
            }, 0);
            const weight = { hero: 2, lg: 1.5, md: 1, sm: 1 }[size];
            const flexBasis = `${(weight / totalCols) * 100}%`;

            return (
              <div key={project.id} style={{ flex: `0 0 ${flexBasis}`, minWidth: 0 }}>
                <OverlayCard
                  project={project}
                  index={globalIndex}
                  onView={() => onView(project.id)}
                  size={size}
                />
              </div>
            );
          })}
        </motion.div>
      ))}

      {/* Decorative bottom rule */}
      <div className="flex items-center gap-4 mt-8 pt-6" style={{ borderTop: '1px solid rgba(234,230,216,0.05)' }}>
        <span style={{ fontFamily: 'Playfair Display, serif', color: '#2A3838', fontSize: '11px', fontStyle: 'italic' }}>
          IVY BRIDAL Studio — Kho lưu trữ hình ảnh điện ảnh
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(234,230,216,0.04)' }} />
        <span style={{ fontFamily: 'Montserrat, sans-serif', color: '#2A3838', fontSize: '7px', letterSpacing: '0.3em' }}>
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
