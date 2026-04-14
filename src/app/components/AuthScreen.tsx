"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, Lock } from 'lucide-react';
import { PROJECTS } from '../data/projects';

export function AuthScreen() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const project = PROJECTS.find(p => p.id === id);

  // If already authenticated, redirect to gallery
  useEffect(() => {
    if (sessionStorage.getItem(`ivy_auth_${id}`) === 'true') {
      router.replace(`/gallery/${id}`);
    }
  }, [id, router]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#2C3939' }}>
        <div className="text-center">
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6A8080', fontSize: '11px', letterSpacing: '0.3em' }}>
            LIÊN KẾT KHÔNG HỢP LỆ
          </p>
        </div>
      </div>
    );
  }

  if (project.status === 'expired') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#1F2828' }}>
        <img
          src={project.cover}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(20px) grayscale(80%) brightness(0.3)', transform: 'scale(1.05)' }}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
        <div className="relative z-10 text-center px-8">
          <Lock size={28} style={{ color: '#6A8080', margin: '0 auto 20px' }} />
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#EAE6D8', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
            Phiên Truy Cập Đã Kết Thúc
          </h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6A8080', fontSize: '11px', letterSpacing: '0.15em' }}>
            Thư viện này không còn khả dụng.
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-8 px-6 py-2.5"
            style={{
              border: '1px solid rgba(234,230,216,0.15)',
              color: '#8A9E9E',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.2em',
            }}
          >
            QUAY LẠI
          </button>
        </div>
      </div>
    );
  }

  if (project.status === 'draft' || project.status === 'editing') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#1F2828' }}>
        <img
          src={project.cover}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(20px) brightness(0.25)', transform: 'scale(1.05)' }}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
        <div className="relative z-10 text-center px-8">
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6A8080', fontSize: '9px', letterSpacing: '0.4em', marginBottom: '16px' }}>
            IVY BRIDAL
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#EAE6D8', fontSize: '22px', fontWeight: 400, marginBottom: '12px' }}>
            Đang Chuẩn Bị
          </h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6A8080', fontSize: '11px', letterSpacing: '0.1em', lineHeight: 1.8 }}>
            Thư viện của bạn đang được xử lý.<br />Chúng tôi sẽ thông báo khi sẵn sàng.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate auth check delay
    await new Promise(r => setTimeout(r, 800));

    if (password === project.password) {
      sessionStorage.setItem(`ivy_auth_${id}`, 'true');
      router.push(`/gallery/${id}`);
    } else {
      setError('Mã truy cập không chính xác. Vui lòng thử lại.');
      setPassword('');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Background */}
      <img
        src={project.cover}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'blur(18px) brightness(0.3)', transform: 'scale(1.06)' }}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
      />

      {/* Overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(31,40,40,0.55)' }} />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-sm px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Logo */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#EAE6D8', fontSize: '20px', letterSpacing: '0.4em', fontWeight: 400 }}>
            IVY BRIDAL
          </h1>
          <div className="w-8 h-px mx-auto mt-3" style={{ backgroundColor: 'rgba(234,230,216,0.2)' }} />
        </motion.div>

        {/* Project info */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#6A8080', fontSize: '9px', letterSpacing: '0.35em', marginBottom: '8px' }}>
            {project.category.toUpperCase()}
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#EAE6D8', fontSize: '26px', fontWeight: 400, lineHeight: 1.3, marginBottom: '4px' }}>
            {project.title}
          </h2>
          <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#8A9E9E', fontSize: '12px', letterSpacing: '0.05em' }}>
            {project.subtitle}
          </p>
        </motion.div>

        {/* Auth Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="mb-2">
            <div
              className="relative"
              style={{
                boxShadow: focused ? '0 0 0 1px rgba(234,230,216,0.25), 0 0 20px rgba(234,230,216,0.05)' : 'none',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Nhập mã truy cập"
                autoComplete="off"
                className="w-full px-5 py-4 text-center outline-none"
                style={{
                  backgroundColor: 'rgba(31,40,40,0.8)',
                  border: `1px solid ${focused ? 'rgba(234,230,216,0.3)' : 'rgba(234,230,216,0.1)'}`,
                  color: '#EAE6D8',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '16px',
                  letterSpacing: '0.3em',
                  transition: 'border-color 0.3s ease',
                  backdropFilter: 'blur(8px)',
                }}
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: 'Montserrat, sans-serif', color: '#AE7A7A', fontSize: '10px', letterSpacing: '0.1em', marginBottom: '12px' }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-4 flex items-center justify-center gap-3 mt-3 transition-all"
            style={{
              backgroundColor: password ? 'rgba(234,230,216,0.12)' : 'rgba(234,230,216,0.04)',
              border: `1px solid ${password ? 'rgba(234,230,216,0.35)' : 'rgba(234,230,216,0.08)'}`,
              color: password ? '#EAE6D8' : '#4A6060',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.35em',
              transition: 'all 0.3s ease',
              cursor: password && !loading ? 'pointer' : 'default',
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ width: 14, height: 14, border: '1px solid rgba(234,230,216,0.3)', borderTopColor: '#EAE6D8', borderRadius: '50%' }}
              />
            ) : (
              <>
                TRUY CẬP
                <ArrowRight size={13} />
              </>
            )}
          </button>
        </motion.form>

        {/* Footer hint */}
        <motion.p
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ fontFamily: 'Montserrat, sans-serif', color: '#4A6060', fontSize: '9px', letterSpacing: '0.15em', lineHeight: 1.8 }}
        >
          Kho lưu trữ riêng tư · Được bảo mật bởi IVY BRIDAL
        </motion.p>
      </motion.div>

      {/* Hint for demo */}
      <motion.div
        className="absolute bottom-6 right-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p style={{ fontFamily: 'Montserrat, sans-serif', color: '#3A5050', fontSize: '9px', letterSpacing: '0.1em' }}>
          Demo: mật khẩu là "{project.password}"
        </p>
      </motion.div>
    </div>
  );
}
