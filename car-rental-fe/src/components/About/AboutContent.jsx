import { useLayoutEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Carousel from "../Hero/Carousel";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "#b89753";
const TEXT_DARK = "#111215";

const STATS = [
  ["9", "Major Canadian Cities"],
  ["20+", "Years Experience"],
  ["PIPEDA", "Compliant Data Handling"],
  ["CAD", "Consolidated Billing"],
];

const STACK_CARDS = [
  {
    id: "executive-suv",
    title: "Executive SUVs",
    badge: "Signature Car",
    image: "/carousel-img/2026-suburban-mov-design-02-v2.avif",
    description:
      "A refined arrival experience for executives, diplomats, and VIP guests with premium cabin comfort and discreet service.",
    features: [
      "Airport meet & greet",
      "Quiet luxury cabin",
      "Live flight monitoring",
    ],
  },
  {
    id: "luxury-sedan",
    title: "Luxury Sedans",
    badge: "Airport Ready",
    image: "/carousel-img/images (1).jpg",
    description:
      "Ideal for polished business travel, discreet transfers, and seamless multi-stop itineraries across the city.",
    features: [
      "Executive seating",
      "Complimentary water",
      "Flexible scheduling",
    ],
  },
  {
    id: "sprinter-van",
    title: "Corporate Sprinters",
    badge: "Group Transfer",
    image: "/carousel-img/images.jpg",
    description:
      "Spacious, modern transport for delegations, events, and corporate groups that demand elevated coordination.",
    features: ["Group comfort", "Luggage-ready", "Professional chauffeurs"],
  },
];

export default function AboutContent() {
  const statsRef = useRef(null);
  const statNumRefs = useRef([]);
  const aboutLeftRef = useRef(null);
  const aboutRightRef = useRef(null);
  const fleetTitleRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaSectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(fleetTitleRef.current.children, {
        scrollTrigger: { trigger: fleetTitleRef.current, start: "top 85%" },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

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
    }, statsRef);

    return () => ctx.revert();
  }, []);

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
    <div>
      <section className="about-stack-shell">
        <div className="about-stack-intro">
          <span className="eyebrow">Featured Fleet Experience</span>
          <h2>
            Luxury vehicles, styled for every arrival and every itinerary.
          </h2>
          <p>
            Explore our most requested transport options, each designed to
            reflect the standard of a premium, professional ground experience.
          </p>
        </div>

        <ScrollStack
          className="about-stack-section"
          useWindowScroll
          itemDistance={92}
          itemStackDistance={38}
          stackPosition="22%"
          scaleEndPosition="12%"
          baseScale={0.88}
          blurAmount={0.9}
          rotationAmount={0.4}
        >
          {STACK_CARDS.map((card) => (
            <ScrollStackItem
              key={card.id}
              image={card.image}
              mediaAlt={card.title}
              badge={card.badge}
              actionLabel="Request this vehicle"
            >
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul className="about-stack-tags">
                {card.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>
      <section
        ref={statsRef}
        className="stats light-strip"
        style={{
          backgroundColor: "#f0f1f5",
          borderTop: "1px solid #e1e2e6",
          borderBottom: "1px solid #e1e2e6",
        }}
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
            <div className="stat-label" style={{ color: "#4a4d55" }}>
              {label}
            </div>
          </div>
        ))}
      </section>

      <section className="fleet-showcase">
        <div className="fleet-showcase-header">
          <span className="eyebrow">The Maplebridge Fleet</span>
          <h2>First-Class Vehicles, Certified Chauffeurs</h2>
          <p>
            Experience the standard of institutional ground transportation. Our
            fleet features late-model executive SUVs, luxury sedans, and
            high-capacity sprinters, all operated by professional local
            chauffeurs.
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

      <section className="about">
        <div ref={aboutLeftRef} className="about-left">
          <span className="eyebrow" style={{ color: GOLD }}>
            Built for Institutions
          </span>
          <h2 style={{ color: TEXT_DARK }}>
            Not a ride-hailing platform.
            <br />
            Not an aggregator.
          </h2>
        </div>
        <div ref={aboutRightRef} className="about-right">
          <p style={{ color: "#4a4d55" }}>
            Maplebridge is a professionally operated Canadian ground
            transportation company — structured for organisations that require
            formal proposals, service agreements, compliance documentation, and
            a single named account manager across all 9 supported Canadian
            cities.
          </p>
          <p style={{ color: "#4a4d55" }}>
            When your executives, visiting international partners, and official
            guests arrive in Canada, Maplebridge ensures their ground
            transportation experience reflects the standard of the organisation
            they represent.
          </p>
        </div>
      </section>

      <section className="fleet" style={{ backgroundColor: "#f8f9fa" }}>
        <div ref={fleetTitleRef}>
          <span className="eyebrow center" style={{ color: GOLD }}>
            What We Deliver
          </span>
          <h2 className="fleet-title" style={{ color: TEXT_DARK }}>
            Operational Excellence Behind Every Assignment
          </h2>
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
              style={{
                backgroundColor: "#fff",
                border: "1px solid #e1e2e6",
                position: "relative",
                overflow: "hidden",
              }}
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

      <section
        ref={ctaSectionRef}
        className="cta-section"
        style={{ borderTop: "1px solid #e1e2e6" }}
      >
        <div className="cta-inner">
          <span className="eyebrow" style={{ color: GOLD }}>
            Engagement
          </span>
          <h2 style={{ color: GOLD }}>
            National Service. <em style={{ color: GOLD }}>Local Precision.</em>
          </h2>
          <p style={{ color: "#4a4d55" }}>
            Submit a formal proposal request through our secure institutional
            inquiry channel — or contact the corporate team directly. All
            submissions acknowledged within one business day.
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
    </div>
  );
}
