import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ─── Jungle particle (falling leaf dot) ─────────────────────────────────────
const JungleParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + i * 7.5}%`,
    delay: i * 0.6,
    size: 3 + (i % 4),
    dur: 6 + (i % 5),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-0"
          style={{
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            background: `rgba(74, 222, 128, ${0.3 + (p.id % 3) * 0.15})`,
            animation: `leafFall ${p.dur}s ${p.delay}s infinite linear`,
          }}
        />
      ))}
      <style>{`
        @keyframes leafFall {
          0%   { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(100vh) translateX(40px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const headlineRef = useRef(null);
  const lineRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const vineLRef = useRef(null);
  const vineRRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // BG cinematic reveal
      tl.fromTo(bgRef.current,
        { scale: 1.12, filter: 'brightness(0) saturate(0)' },
        { scale: 1, filter: 'brightness(1) saturate(1.1)', duration: 2.2, ease: 'power2.inOut' }
      )

        // Orbs pulse in
        .fromTo([orb1Ref.current, orb2Ref.current],
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 2, stagger: 0.4, ease: 'power2.out' },
          '-=1.6'
        )

        // Vine decorations slide in
        .fromTo(vineLRef.current,
          { opacity: 0, x: -60, y: -30 },
          { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=1.2'
        )
        .fromTo(vineRRef.current,
          { opacity: 0, x: 60, y: -30 },
          { opacity: 1, x: 0, y: 0, duration: 1.2, ease: 'power3.out' },
          '-=1.1'
        )

        // Headline words staggered
        .fromTo(headlineRef.current.querySelectorAll('.word'),
          { opacity: 0, y: 70, skewY: 5 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.85, stagger: 0.1 },
          '-=0.3'
        )

        // Line accent
        .fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
          '-=0.4'
        );

      // Continuous orb breathing
      gsap.to(orb1Ref.current, { scale: 1.15, opacity: 0.6, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to(orb2Ref.current, { scale: 1.2, opacity: 0.5, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 });

      // Parallax mouse move
      const handleMouse = (e) => {
        const rx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ry = (e.clientY / window.innerHeight - 0.5) * 2;
        gsap.to(bgRef.current, { x: rx * 16, y: ry * 9, duration: 1.4, ease: 'power2.out' });
        gsap.to(orb1Ref.current, { x: rx * 30, duration: 1.8, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(orb2Ref.current, { x: -rx * 22, duration: 2, ease: 'power2.out', overwrite: 'auto' });
      };
      window.addEventListener('mousemove', handleMouse);
      return () => window.removeEventListener('mousemove', handleMouse);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = ['Maple', 'Bridge'];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ background: '#050e06' }}
    >
      {/* ── Background image ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 55%',
        }}
      />

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, rgba(3,12,4,0.97) 0%, rgba(3,12,4,0.80) 35%, rgba(3,12,4,0.35) 65%, transparent 100%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(3,12,4,1) 0%, rgba(3,12,4,0.5) 20%, transparent 50%)' }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(3,12,4,0.6) 0%, transparent 30%)' }} />

      {/* ── Jungle green orbs ── */}
      <div
        ref={orb1Ref}
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '38%',
          width: 520, height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,101,52,0.45) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0,
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute pointer-events-none"
        style={{
          bottom: '15%', right: '20%',
          width: 380, height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(101,163,13,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
          opacity: 0,
        }}
      />

      {/* ── Vine decorations (SVG) ── */}
      <div ref={vineLRef} className="absolute top-0 left-0 w-48 h-64 pointer-events-none opacity-70 z-10">
        <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0 Q40 60 10 120 Q-10 180 30 240 Q50 280 40 280" stroke="rgba(74,222,128,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="35" cy="55" rx="22" ry="14" fill="rgba(34,197,94,0.25)" transform="rotate(-30 35 55)" />
          <ellipse cx="15" cy="110" rx="18" ry="11" fill="rgba(22,163,74,0.3)" transform="rotate(20 15 110)" />
          <ellipse cx="32" cy="170" rx="20" ry="12" fill="rgba(74,222,128,0.2)" transform="rotate(-15 32 170)" />
          <ellipse cx="12" cy="225" rx="16" ry="10" fill="rgba(34,197,94,0.25)" transform="rotate(25 12 225)" />
        </svg>
      </div>
      <div ref={vineRRef} className="absolute top-0 right-0 w-48 h-64 pointer-events-none opacity-60 z-10" style={{ transform: 'scaleX(-1)' }}>
        <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0 Q40 60 10 120 Q-10 180 30 240 Q50 280 40 280" stroke="rgba(74,222,128,0.35)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <ellipse cx="35" cy="55" rx="22" ry="14" fill="rgba(22,163,74,0.2)" transform="rotate(-30 35 55)" />
          <ellipse cx="15" cy="110" rx="18" ry="11" fill="rgba(34,197,94,0.25)" transform="rotate(20 15 110)" />
          <ellipse cx="32" cy="170" rx="20" ry="12" fill="rgba(74,222,128,0.18)" transform="rotate(-15 32 170)" />
        </svg>
      </div>

      {/* ── Falling particles ── */}
      <JungleParticles />

      {/* ── Main content ── */}
      <div className="relative z-20 flex flex-col justify-center top-35 flex-1 px-8 md:px-16 pb-16 max-w-3xl">        {/* Headline */}
        <div ref={headlineRef} className="mb-5 ChangaOne overflow-visible">
          <h1
            className="leading-none tracking-tighter text-white"
            style={{
              fontFamily: "'Changa One', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 7rem)',
              lineHeight: 0.88,
              textShadow: '0 0 80px rgba(74,222,128,0.15)',
            }}
          >
            {words.map((word, i) => (
              <span key={word} className="word ChangaOne" style={{ display: 'inline-block', marginRight: '0.18em' }}>
                {i === 1 ? (
                  <span style={{
                    background: 'linear-gradient(135deg, #4ade80, #86efac)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </h1>

          {/* Animated green accent line */}
          <div
            ref={lineRef}
            className="mt-4 h-1 w-40 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #4ade80, #86efac, transparent)',
              transformOrigin: 'left',
              boxShadow: '0 0 12px rgba(74,222,128,0.6)',
            }}
          />
        </div>
      </div>

      {/* ── Institution Founder Bottom Banner ── */}
      <div className='absolute  bottom-15 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-6 text-white uppercase tracking-widest text-xs w-full max-w-5xl px-8 poppins'>
        <div className='bg-white/20 h-px flex-1'></div>
        <div className="font-semibold  tracking-[0.25em] whitespace-nowrap">Institution Founder</div>
        <div className='bg-white/20 h-px flex-1'></div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 right-16 z-20 flex flex-col items-center gap-2" style={{ color: 'rgba(74,222,128,0.3)' }}>
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.4))' }} />
        <span className="text-[10px] tracking-widest uppercase" style={{ transform: 'rotate(90deg) translateY(16px)', display: 'block' }}>Scroll</span>
      </div>


    </section >
  );
};

export default HeroSection;