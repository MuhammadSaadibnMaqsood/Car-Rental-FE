import {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./HeroScene";
import NavDrawer from "../Navbar/NavDrawer";
import Footer from "../Footer/footer";
import Carousel from "./Carousel";

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
    if (!rootRef.current) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: "power4.out" },
      });

      const heroTargets = [toplineRef.current, subRef.current, scrollHintRef.current].filter(Boolean);
      if (heroTargets.length) {
        tl.set(heroTargets, { autoAlpha: 0 });
      }

      const titleLines = titleRef.current?.querySelectorAll(".title-line");
      if (titleLines?.length) {
        tl.set(titleLines, { autoAlpha: 0 });
      }

      const ctaChildren = ctaRef.current?.children;
      if (ctaChildren?.length) {
        tl.set(ctaChildren, { autoAlpha: 0 });
      }

      if (toplineRef.current) {
        tl.fromTo(
          toplineRef.current,
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          0.1,
        );
      }

      if (titleLines?.length) {
        tl.fromTo(
          titleLines,
          { yPercent: 120, rotate: 3, autoAlpha: 0 },
          {
            yPercent: 0,
            rotate: 0,
            autoAlpha: 1,
            duration: 1.1,
            stagger: 0.12,
          },
          0.3,
        );
      }

      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8 },
          "-=0.6",
        );
      }

      if (ctaChildren?.length) {
        tl.fromTo(
          ctaChildren,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.1 },
          "-=0.5",
        );
      }

      if (scrollHintRef.current) {
        tl.to(scrollHintRef.current, { autoAlpha: 1, duration: 0.6 }, "-=0.3");
      }

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
    if (!rootRef.current) return undefined;

    const ctx = gsap.context(() => {
      const statsItems = statsRef.current?.querySelectorAll(".stat");
      if (statsItems?.length) {
        gsap.from(statsItems, {
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
      }

      statNumRefs.current.forEach((el) => {
        if (!el) return;
        const raw = el.dataset.value || "";
        const match = raw.match(/^(\d+)(\+?)$/);
        if (!match) return;
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

      if (aboutLeftRef.current) {
        gsap.from(aboutLeftRef.current, {
          scrollTrigger: { trigger: aboutLeftRef.current, start: "top 80%" },
          x: -50,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      const aboutParagraphs = aboutRightRef.current?.querySelectorAll("p");
      if (aboutParagraphs?.length) {
        gsap.from(aboutParagraphs, {
          scrollTrigger: { trigger: aboutRightRef.current, start: "top 80%" },
          x: 50,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      }

      const fleetChildren = fleetTitleRef.current?.children;
      if (fleetChildren?.length) {
        gsap.from(fleetChildren, {
          scrollTrigger: { trigger: fleetTitleRef.current, start: "top 85%" },
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        });
      }

      if (cardsRef.current.length) {
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
      }

      if (ctaSectionRef.current) {
        const ctaItems = ctaSectionRef.current.querySelectorAll(".eyebrow, h2, p");
        if (ctaItems.length) {
          gsap.from(ctaItems, {
            scrollTrigger: { trigger: ctaSectionRef.current, start: "top 80%" },
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          });
        }

        const ctaButton = ctaSectionRef.current.querySelector(".btn-gold.large");
        if (ctaButton) {
          gsap.from(ctaButton, {
            scrollTrigger: { trigger: ctaSectionRef.current, start: "top 70%" },
            scale: 0.85,
            autoAlpha: 0,
            duration: 0.7,
            ease: "back.out(1.7)",
          });
        }
      }

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
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.6)",
    });
    gsap.to(card.querySelector(".card-glow"), { opacity: 0, duration: 0.4 });
  }, []);

  // ---------- BUTTON MAGNETIC HOVER ----------
  const handleBtnMove = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.4,
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleBtnLeave = useCallback((e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={rootRef}
      className="page light-theme"
      style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}
    >

      {/* HERO */}
      <section className="hero">
        <div className="hero-canvas">
          <HeroScene />
        </div>
        <div className="hero-overlay">
          <div
            ref={toplineRef}
            className="hero-topline"
            style={{ color: GOLD }}
          >
            <span>PROUDLY CANADIAN</span>
            <span className="dot" style={{ backgroundColor: GOLD }} />
            <span>INSTITUTIONAL TRANSPORTATION</span>
          </div>

          <h1
            ref={titleRef}
            className="hero-title "
            style={{ color: TEXT_DARK }}
          >
            <span className="title-line-wrap">
              <span className="title-line">MAPLE</span>
            </span>
            <br />
            <span className="title-line-wrap">
              <span
                className="title-line"
                style={{ color: GOLD, fontStyle: "italic" }}
              >
                BRIDGE.
              </span>
            </span>
          </h1>

          <p ref={subRef} className="hero-sub" style={{ color: "#4a4d55" }}>
            Structured, compliant, and professionally managed ground
            transportation for corporations, institutional organisations, and
            government bodies operating across Canada.
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
          <div
            className="scroll-line light-mode-line"
            style={{ backgroundColor: "#c5c8cf" }}
          />
        </div>
      </section>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}
