import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import NavDrawer from "../Navbar/NavDrawer";
import Footer from "../Footer/footer";
import Carousel from './Carousel'

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#b89753";
const LIGHT_BG = "#fcfcfd";
const TEXT_DARK = "#111215";

const STATS = [
  ["9", "Major Canadian Cities"],
  ["20+", "Years Experience"],
  ["PIPEDA", "Compliant Data Handling"],
  ["CAD", "Consolidated Billing"],
];

export default function HeroSection() {
  const [navOpen, setNavOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // refs for animation targets
  const rootRef = useRef(null);
  const toplineRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollHintRef = useRef(null);
  const statsRef = useRef(null);
  const statNumRefs = useRef([]);
  const aboutLeftRef = useRef(null);
  const aboutRightRef = useRef(null);
  const fleetTitleRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaSectionRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  // ---------- HERO LOAD-IN TIMELINE ----------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } });

      // Reset only the elements whose visibility we animate directly.
      // titleRef.current (the <h1>) is intentionally excluded here — only its
      // .title-line children get reset/animated below. autoAlpha:0 on the <h1>
      // itself left it visibility:hidden forever, since nothing ever tweened
      // the <h1> back to autoAlpha:1 — that was the bug hiding the title.
      tl.set([toplineRef.current, subRef.current, scrollHintRef.current], {
        autoAlpha: 0,
      });
      tl.set(titleRef.current.querySelectorAll(".title-line"), { autoAlpha: 0 });
      tl.set(ctaRef.current.children, { autoAlpha: 0 });

      tl.fromTo(
        toplineRef.current,
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7 },
        0.1
      )

        // title lines fly up with a slight rotation, staggered per line
        .fromTo(
          titleRef.current.querySelectorAll(".title-line"),
          { yPercent: 120, rotate: 3, autoAlpha: 0 },
          { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1.1, stagger: 0.12 },
          0.3
        )

        .fromTo(
          subRef.current,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.6"
        )

        .fromTo(
          ctaRef.current.children,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )

        .to(scrollHintRef.current, { autoAlpha: 1, duration: 0.6 }, "-=0.3");

      // ambient scroll-cue loop (the little line pulsing)
      gsap.to(".scroll-line", {
        scaleY: 0.4,
        transformOrigin: "top",
        repeat: -1,
        yoyo: true,
        duration: 1.1,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // ---------- SCROLL-TRIGGERED SECTION REVEALS ----------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stats strip: fade/rise in, numbers count up if numeric
      gsap.from(statsRef.current.querySelectorAll(".stat"), {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });

      statNumRefs.current.forEach((el) => {
        if (!el) return;
        const raw = el.dataset.value || "";
        const match = raw.match(/^(\d+)(\+?)$/);
        if (!match) return; // skip non-numeric stats like "PIPEDA" / "CAD"
        const target = parseInt(match[1], 10);
        const suffix = match[2] || "";
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix;
          },
        });
      });

      // About section: left label + right paragraphs slide in from opposite sides
      gsap.from(aboutLeftRef.current, {
        scrollTrigger: { trigger: aboutLeftRef.current, start: "top 80%" },
        x: -50,
        autoAlpha: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(aboutRightRef.current.querySelectorAll("p"), {
        scrollTrigger: { trigger: aboutRightRef.current, start: "top 80%" },
        x: 50,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // Fleet heading
      gsap.from(fleetTitleRef.current.children, {
        scrollTrigger: { trigger: fleetTitleRef.current, start: "top 85%" },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Fleet cards: staggered rise with a subtle 3D tilt-in
      gsap.from(cardsRef.current, {
        scrollTrigger: { trigger: ".fleet-grid", start: "top 80%" },
        y: 60,
        rotateX: -8,
        transformOrigin: "top center",
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });

      // CTA section: gold text scales/fades in, button pops last
      gsap.from(ctaSectionRef.current.querySelectorAll(".eyebrow, h2, p"), {
        scrollTrigger: { trigger: ctaSectionRef.current, start: "top 80%" },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
      gsap.from(ctaSectionRef.current.querySelector(".btn-gold.large"), {
        scrollTrigger: { trigger: ctaSectionRef.current, start: "top 70%" },
        scale: 0.85,
        autoAlpha: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      });

      // Parallax drift on the hero canvas layer
      gsap.to(".hero-canvas", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // ---------- MAGNETIC / TILT CARD HOVER ----------
  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  const handleCardMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    gsap.to(card, {
      rotateX: py * -8,
      rotateY: px * 10,
      scale: 1.03,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 700,
    });

    gsap.to(card.querySelector(".card-glow"), {
      opacity: 1,
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleCardLeave = useCallback((e) => {
    const card = e.currentTarget;
    gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.6)" });
    gsap.to(card.querySelector(".card-glow"), { opacity: 0, duration: 0.4 });
  }, []);

  // ---------- BUTTON MAGNETIC HOVER ----------
  const handleBtnMove = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.25, y: y * 0.4, duration: 0.4, ease: "power2.out" });
  }, []);

  const handleBtnLeave = useCallback((e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  }, []);

  return (
    <div ref={rootRef} className="page light-theme" style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}>
      <NavDrawer open={navOpen} setOpen={setNavOpen} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-canvas">
          <HeroScene />
        </div>

        <div className="hero-overlay">
          <div ref={toplineRef} className="hero-topline" style={{ color: GOLD }}>
            <span>PROUDLY CANADIAN</span>
            <span className="dot" style={{ backgroundColor: GOLD }} />
            <span>INSTITUTIONAL TRANSPORTATION</span>
          </div>

          <h1 ref={titleRef} className="hero-title " style={{ color: TEXT_DARK }}>
            <span className="title-line-wrap"><span className="title-line">MAPLE</span></span>
            <br />
            <span className="title-line-wrap"><span className="title-line" style={{ color: GOLD, fontStyle: "italic" }}>BRIDGE.</span></span>
          </h1>

          <p ref={subRef} className="hero-sub" style={{ color: "#4a4d55" }}>
            Structured, compliant, and professionally managed ground transportation for corporations,
            institutional organisations, and government bodies operating across Canada.
          </p>

          <div ref={ctaRef} className="hero-cta">
            <a
              href="#"
              className="btn-gold"
              style={{ backgroundColor: GOLD, color: "#fff" }}
              onMouseMove={handleBtnMove}
              onMouseLeave={handleBtnLeave}
            >
              Request a Formal Proposal
            </a>
            <a
              href="#"
              className="btn-ghost dark-outline"
              style={{ border: `1px solid ${TEXT_DARK}`, color: TEXT_DARK }}
              onMouseMove={handleBtnMove}
              onMouseLeave={handleBtnLeave}
            >
              Explore Coverage
            </a>
          </div>
        </div>

        <div ref={scrollHintRef} className="hero-scroll">
          <span style={{ color: "#7a7e85" }}>SCROLL</span>
          <div className="scroll-line light-mode-line" style={{ backgroundColor: "#c5c8cf" }} />
        </div>
      </section>

      {/* STATS STRIP */}
      <section
        ref={statsRef}
        className="stats light-strip"
        style={{ backgroundColor: "#f0f1f5", borderTop: "1px solid #e1e2e6", borderBottom: "1px solid #e1e2e6" }}
      >
        {STATS.map(([num, label], i) => (
          <div className="stat" key={label}>
            <div
              className="stat-num"
              style={{ color: GOLD }}
              data-value={num}
              ref={(el) => (statNumRefs.current[i] = el)}
            >
              {num}
            </div>
            <div className="stat-label" style={{ color: "#4a4d55" }}>{label}</div>
          </div>
        ))}
      </section>

      {/* FLEET SHOWCASE */}
      <section className="fleet-showcase">
        <div className="fleet-showcase-header">
          <span className="eyebrow">The Maplebridge Fleet</span>
          <h2>First-Class Vehicles, Certified Chauffeurs</h2>
          <p>
            Experience the standard of institutional ground transportation. Our fleet features
            late-model executive SUVs, luxury sedans, and high-capacity sprinters,
            all operated by professional local chauffeurs.
          </p>
        </div>
        <div className="fleet-showcase-carousel-wrapper">
          <Carousel
            baseWidth={420}
            autoplay={true}
            autoplayDelay={4500}
            pauseOnHover={true}
            loop={true}
          />
        </div>
      </section>

      {/* ABOUT / PHILOSOPHY */}
      <section className="about">
        <div ref={aboutLeftRef} className="about-left">
          <span className="eyebrow" style={{ color: GOLD }}>Built for Institutions</span>
          <h2 style={{ color: TEXT_DARK }}>
            Not a ride-hailing platform.<br />Not an aggregator.
          </h2>
        </div>
        <div ref={aboutRightRef} className="about-right">
          <p style={{ color: "#4a4d55" }}>
            Maplebridge is a professionally operated Canadian ground transportation company —
            structured for organisations that require formal proposals, service agreements, compliance
            documentation, and a single named account manager across all 9 supported Canadian cities.
          </p>
          <p style={{ color: "#4a4d55" }}>
            When your executives, visiting international partners, and official guests arrive in Canada,
            Maplebridge ensures their ground transportation experience reflects the standard of the organisation
            they represent.
          </p>
        </div>
      </section>

      {/* FLEET / FEATURE GRID */}
      <section className="fleet" style={{ backgroundColor: "#f8f9fa" }}>
        <div ref={fleetTitleRef}>
          <span className="eyebrow center" style={{ color: GOLD }}>What We Deliver</span>
          <h2 className="fleet-title" style={{ color: TEXT_DARK }}>Operational Excellence Behind Every Assignment</h2>
        </div>

        <div className="fleet-grid">
          {[
            {
              cls: "fleet-card large light-card",
              title: "Corporate Transportation Programmes",
              body: "Centralised account management, consolidated CAD billing, and dedicated coordination for corporations with recurring Canadian ground transportation requirements — across 1 city or all 9.",
            },
            {
              cls: "fleet-card light-card",
              title: "Events & Delegation Logistics",
              body: "Full coordination for international summits, conferences, and board events with complete documentation.",
            },
            {
              cls: "fleet-card light-card",
              title: "Executive Airport Transfers",
              body: "Real-time flight monitoring, professional meet-and-greet, and prompt-free chauffeur positioning on arrival.",
            },
            {
              cls: "fleet-card light-card",
              title: "Safety & Compliance",
              body: "COI, provincial licensing, PIPEDA confirmation, and chauffeur credentialling ready for procurement vendor qualification.",
            },
            {
              cls: "fleet-card large alt light-card",
              title: "Institutional Procurement & Partnerships",
              body: "Formal RFQ responses, service level agreements, standing offer frameworks, and global mobility partnership arrangements for international networks.",
            },
          ].map((card) => (
            <div
              key={card.title}
              ref={addCardRef}
              className={`${card.cls} tilt-card`}
              style={{ backgroundColor: "#fff", border: "1px solid #e1e2e6", position: "relative", overflow: "hidden" }}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
            >
              <span className="card-glow" />
              <h3 style={{ color: TEXT_DARK }}>{card.title}</h3>
              <p style={{ color: "#4a4d55" }}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ENGAGEMENT / CTA */}
      <section ref={ctaSectionRef} className="cta-section" style={{ borderTop: "1px solid #e1e2e6" }}>
        <div className="cta-inner">
          <span className="eyebrow" style={{ color: GOLD }}>Engagement</span>
          <h2 style={{ color: GOLD }}>
            National Service. <em style={{ color: GOLD }}>Local Precision.</em>
          </h2>
          <p style={{ color: "#4a4d55" }}>
            Submit a formal proposal request through our secure institutional inquiry channel —
            or contact the corporate team directly. All submissions acknowledged within one business day.
          </p>
          <a
            href="#"
            className="btn-gold large"
            style={{ backgroundColor: GOLD, color: "#fff" }}
            onMouseMove={handleBtnMove}
            onMouseLeave={handleBtnLeave}
          >
            Request a Formal Proposal
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}