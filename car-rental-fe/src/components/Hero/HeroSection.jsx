import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MapPin, Calendar, ChevronRight, Star, Shield, Zap, ArrowRight } from 'lucide-react';

// ─── Floating orb decorations ───────────────────────────────────────────────
const Orb = ({ className }) => (
  <div
    className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`}
  />
);

// ─── Animated stat pill ─────────────────────────────────────────────────────
const StatBadge = ({ value, label, delay, refEl }) => (
  <div
    ref={refEl}
    style={{ opacity: 0, transform: 'translateY(20px)' }}
    className="flex flex-col items-center px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
  >
    <span className="text-3xl font-black text-white leading-none" style={{ fontFamily: "'robert-medium', sans-serif" }}>
      {value}
    </span>
    <span className="text-xs text-white/50 mt-1 tracking-widest uppercase">{label}</span>
  </div>
);

// ─── Feature chip ────────────────────────────────────────────────────────────
const FeatureChip = ({ Icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-medium">
    <Icon size={14} className="text-red-500" />
    {label}
  </div>
);

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const overlayRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const sublineRef = useRef(null);
  const ctaRef = useRef(null);
  const searchRef = useRef(null);
  const statsRef = useRef([]);
  const chipsRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const carRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // BG reveal
      if (bgRef.current) {
        tl.fromTo(bgRef.current,
          { scale: 1.15, filter: 'brightness(0)' },
          { scale: 1, filter: 'brightness(1)', duration: 2, ease: 'power2.out' }
        );
      }

      // Animated orbs
      if (orb1Ref.current && orb2Ref.current) {
        tl.fromTo([orb1Ref.current, orb2Ref.current],
          { opacity: 0, scale: 0.5 },
          { opacity: 0.35, scale: 1, duration: 1.8, stagger: 0.3, ease: 'power2.out' },
          '-=1.4'
        );
      }

      // Badge
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { opacity: 0, y: -20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          '-=0.8'
        );
      }

      // Headline — split-word animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        if (words.length > 0) {
          tl.fromTo(words,
            { opacity: 0, y: 60, skewY: 4 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.08 },
            '-=0.3'
          );
        }
      }

      // Red line accent
      if (lineRef.current) {
        tl.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.7, ease: 'power3.inOut' },
          '-=0.3'
        );
      }

      // Sub-headline
      if (subRef.current) {
        tl.fromTo(subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );
      }

      // Subline
      if (sublineRef.current) {
        tl.fromTo(sublineRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2'
        );
      }

      // Feature chips
      if (chipsRef.current && chipsRef.current.children.length > 0) {
        tl.fromTo(chipsRef.current.children,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.08, duration: 0.5 },
          '-=0.1'
        );
      }

      // CTA buttons
      if (ctaRef.current && ctaRef.current.children.length > 0) {
        tl.fromTo(ctaRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          '-=0.2'
        );
      }

      // Search bar
      if (searchRef.current) {
        tl.fromTo(searchRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.3'
        );
      }

      // Stats
      if (statsRef.current && statsRef.current.length > 0) {
        tl.to(statsRef.current,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
          '-=0.3'
        );
      }

      // Orb continuous float
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: -40, x: 20,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: 30, x: -25,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2,
        });
      }

      // Parallax on mouse move
      const handleMouse = (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        if (bgRef.current) {
          gsap.to(bgRef.current, {
            x: x * 18,
            y: y * 10,
            duration: 1.2,
            ease: 'power2.out',
          });
        }
        if (orb1Ref.current) {
          gsap.to(orb1Ref.current, {
            x: x * 35,
            duration: 1.5,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
        if (orb2Ref.current) {
          gsap.to(orb2Ref.current, {
            x: -x * 25,
            duration: 1.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      };

      window.addEventListener('mousemove', handleMouse);
      return () => window.removeEventListener('mousemove', handleMouse);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = ['INSTITUITION', 'TRANSPORTATION'];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: '#f8fafc' }}
    >
      {/* ── Background image ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/hero-bg-light.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
          filter: 'brightness(1)',
        }}
      />

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc]/95 via-[#f8fafc]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent" />

      {/* ── Animated orbs ── */}
      <div
        ref={orb1Ref}
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-0"
        style={{ background: 'radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 70%)' }}
      />
      <div
        ref={orb2Ref}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-0"
        style={{ background: 'radial-gradient(circle, rgba(29, 78, 216, 0.06) 0%, transparent 70%)' }}
      />

      {/* ── Navbar ── */}
      <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6">
        <div className="flex items-center">
          <img className='h-14 w-26' src="https://comforting-chebakia-469108.netlify.app/maplebridge-official-transparent.png" style={{ filter: 'brightness(0.1)' }} />
          <div className="ml-2">
            <span className="text-slate-800 font-bold text-xl tracking-tight" style={{ fontFamily: "'zentry', sans-serif" }}>MAPLIBRIDGE</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Fleet', 'Partner Network', 'About Us'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-8 md:px-16 pb-16 max-w-3xl">

        {/* Badge */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}
          className="inline-flex items-center gap-2 self-start mb-6 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-sm"
        >

        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-4 overflow-hidden">
          <h1
            className="leading-none tracking-tighter text-slate-800"
            style={{
              fontFamily: "'zentry', sans-serif",
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              lineHeight: 0.9,
            }}
          >
            {words.map((word, i) => (
              <span
                key={word}
                className="word inline-block mr-[0.2em] last:mr-0"
                style={{ display: 'inline-block', overflow: 'hidden' }}
              >
                {word === 'TRANSPORTATION' ? (
                  <span className="text-red-600">{word}</span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          {/* Red line accent */}
          <div
            ref={lineRef}
            className="h-1 w-32 bg-gradient-to-r from-red-600 to-red-500 rounded-full mt-4"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Sub-headline */}
        <p
          ref={subRef}
          style={{ opacity: 0 }}
          className="text-2xl md:text-3xl font-semibold text-slate-800 mb-3"
        >
          The world's finest cars,
          <span className="text-slate-400"> at your command.</span>
        </p>

        {/* Subline */}
        <p
          ref={sublineRef}
          style={{ opacity: 0 }}
          className="text-slate-500 text-base md:text-lg leading-relaxed mb-6 max-w-xl"
        >
          From weekend escapes to executive transfers — experience driving as it was meant to be.
          Zero compromise. Pure exhilaration.
        </p>

      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 right-16 z-20 flex flex-col items-center gap-2 text-slate-400">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-slate-300" />
        <span className="text-[10px] tracking-widest uppercase rotate-90 translate-y-4">Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;
