import React, { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Float,
  Sparkles,
} from "@react-three/drei";
import { Model as RealMaybachCar } from "../../../Maybach";

/* ---------------------------------------------------------
   COLOR / THEME
   Crisp pearl white + champagne gold, rich light elite feel
--------------------------------------------------------- */
const GOLD = "#b89753";       // Deepened slightly for crisp contrast on light backgrounds
const LIGHT_BG = "#fcfcfd";   // Premium off-white
const TEXT_DARK = "#111215";  // Deep charcoal for crisp typography
const CAR_PAINT = "#f4f4f6";  // High-end pearl metallic white

/* ---------------------------------------------------------
   PROCEDURAL SEDAN MODEL
--------------------------------------------------------- */
function MaybachCar({ ...props }) {
  const group = useRef();
  const wheelFL = useRef();
  const wheelFR = useRef();
  const wheelRL = useRef();
  const wheelRR = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = Math.sin(t * 0.6) * 0.04;
      group.current.rotation.y = Math.sin(t * 0.15) * 0.05 + props.baseRotation;
    }
    [wheelFL, wheelFR, wheelRL, wheelRR].forEach((w) => {
      if (w.current) w.current.rotation.x -= delta * 1.2;
    });
  });

  const bodyMat = (
    <meshPhysicalMaterial
      color={CAR_PAINT}
      metalness={0.4}
      roughness={0.1}
      clearcoat={1.0}
      clearcoatRoughness={0.02}
      reflectivity={0.9}
    />
  );

  const chromeMat = (
    <meshStandardMaterial color="#d1cbd4" metalness={1} roughness={0.05} />
  );

  const glassMat = (
    <meshPhysicalMaterial
      color="#1a2226"
      metalness={0.5}
      roughness={0}
      transmission={0.4}
      transparent
      opacity={0.9}
    />
  );

  const goldMat = (
    <meshStandardMaterial color={GOLD} metalness={0.8} roughness={0.2} />
  );

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Main lower body */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.6, 0.55, 1.9]} />
        {bodyMat}
      </mesh>

      {/* Front nose taper */}
      <mesh position={[2.55, 0.42, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 1.75]} />
        {bodyMat}
      </mesh>

      {/* Rear taper */}
      <mesh position={[-2.55, 0.42, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 1.75]} />
        {bodyMat}
      </mesh>

      {/* Hood */}
      <mesh position={[1.55, 0.72, 0]} rotation={[0, 0, 0.02]} castShadow>
        <boxGeometry args={[1.9, 0.14, 1.7]} />
        {bodyMat}
      </mesh>

      {/* Trunk deck */}
      <mesh position={[-1.75, 0.72, 0]} castShadow>
        <boxGeometry args={[1.4, 0.14, 1.7]} />
        {bodyMat}
      </mesh>

      {/* Greenhouse / cabin */}
      <mesh position={[-0.15, 1.0, 0]} castShadow>
        <boxGeometry args={[2.5, 0.5, 1.55]} />
        {bodyMat}
      </mesh>

      {/* Roof panel */}
      <mesh position={[-0.15, 1.27, 0]} castShadow>
        <boxGeometry args={[2.1, 0.12, 1.45]} />
        {bodyMat}
      </mesh>

      {/* Windshield */}
      <mesh position={[0.85, 1.05, 0]} rotation={[0, 0, -0.55]} castShadow>
        <boxGeometry args={[0.65, 0.05, 1.4]} />
        {glassMat}
      </mesh>

      {/* Rear windshield */}
      <mesh position={[-1.1, 1.03, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.55, 0.05, 1.4]} />
        {glassMat}
      </mesh>

      {/* Side windows */}
      <mesh position={[-0.15, 1.03, 0.76]}>
        <boxGeometry args={[2.3, 0.35, 0.02]} />
        {glassMat}
      </mesh>
      <mesh position={[-0.15, 1.03, -0.76]}>
        <boxGeometry args={[2.3, 0.35, 0.02]} />
        {glassMat}
      </mesh>

      {/* Chrome window trim */}
      <mesh position={[-0.15, 1.24, 0.775]}>
        <boxGeometry args={[2.55, 0.04, 0.03]} />
        {chromeMat}
      </mesh>
      <mesh position={[-0.15, 1.24, -0.775]}>
        <boxGeometry args={[2.55, 0.04, 0.03]} />
        {chromeMat}
      </mesh>

      {/* Chrome grille */}
      <mesh position={[2.78, 0.55, 0]} castShadow>
        <boxGeometry args={[0.08, 0.55, 1.15]} />
        {chromeMat}
      </mesh>
      {/* Grille slats */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[2.83, 0.55, -0.5 + i * 0.17]}>
          <boxGeometry args={[0.03, 0.5, 0.04]} />
          {goldMat}
        </mesh>
      ))}

      {/* Hood emblem stand */}
      <mesh position={[2.8, 0.86, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
        {chromeMat}
      </mesh>
      <mesh position={[2.8, 0.94, 0]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        {goldMat}
      </mesh>

      {/* Bumpers */}
      <mesh position={[2.75, 0.32, 0]} castShadow>
        <boxGeometry args={[0.25, 0.28, 1.85]} />
        {bodyMat}
      </mesh>
      <mesh position={[-2.75, 0.32, 0]} castShadow>
        <boxGeometry args={[0.25, 0.28, 1.85]} />
        {bodyMat}
      </mesh>

      {/* Headlights */}
      <mesh position={[2.86, 0.6, 0.62]}>
        <boxGeometry args={[0.05, 0.14, 0.35]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff2d8" emissiveIntensity={1.0} />
      </mesh>
      <mesh position={[2.86, 0.6, -0.62]}>
        <boxGeometry args={[0.05, 0.14, 0.35]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff2d8" emissiveIntensity={1.0} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2.86, 0.62, 0.65]}>
        <boxGeometry args={[0.05, 0.14, 0.3]} />
        <meshStandardMaterial color="#5a0000" emissive="#ff1a1a" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-2.86, 0.62, -0.65]}>
        <boxGeometry args={[0.05, 0.14, 0.3]} />
        <meshStandardMaterial color="#5a0000" emissive="#ff1a1a" emissiveIntensity={0.8} />
      </mesh>

      {/* Side skirts */}
      <mesh position={[0, 0.62, 0.955]}>
        <boxGeometry args={[5.0, 0.025, 0.02]} />
        {goldMat}
      </mesh>
      <mesh position={[0, 0.62, -0.955]}>
        <boxGeometry args={[5.0, 0.025, 0.02]} />
        {goldMat}
      </mesh>

      {/* Door handles */}
      {[0.85, -0.55].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.72, 0.965]}>
            <boxGeometry args={[0.22, 0.04, 0.03]} />
            {chromeMat}
          </mesh>
          <mesh position={[x, 0.72, -0.965]}>
            <boxGeometry args={[0.22, 0.04, 0.03]} />
            {chromeMat}
          </mesh>
        </group>
      ))}

      {/* Wheels */}
      {[
        { ref: wheelFL, x: 1.75, z: 1.0 },
        { ref: wheelFR, x: 1.75, z: -1.0 },
        { ref: wheelRL, x: -1.75, z: 1.0 },
        { ref: wheelRR, x: -1.75, z: -1.0 },
      ].map((w, i) => (
        <group key={i} ref={w.ref} position={[w.x, 0.42, w.z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.32, 32]} />
            <meshPhysicalMaterial color="#15161a" roughness={0.6} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.27, 0.27, 0.34, 32]} />
            <meshStandardMaterial color="#e2dee6" metalness={0.9} roughness={0.1} />
          </mesh>
          {Array.from({ length: 8 }).map((_, s) => (
            <mesh
              key={s}
              rotation={[0, (s * Math.PI) / 4, 0]}
              position={[0, 0, 0.17]}
            >
              <boxGeometry args={[0.05, 0.42, 0.03]} />
              <meshStandardMaterial color="#c5c1ca" metalness={0.9} roughness={0.1} />
            </mesh>
          ))}
          <mesh position={[0, 0, 0.175]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            {goldMat}
          </mesh>
        </group>
      ))}

      {/* Exhaust tips */}
      <mesh position={[-2.9, 0.28, 0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 16]} />
        {chromeMat}
      </mesh>
      <mesh position={[-2.9, 0.28, -0.4]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 16]} />
        {chromeMat}
      </mesh>
    </group>
  );
}

/* ---------------------------------------------------------
   HERO 3D SCENE (Optimized for Light Background)
--------------------------------------------------------- */
function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [6.5, 2.2, 6.5], fov: 32 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[LIGHT_BG]} />
      <fog attach="fog" args={[LIGHT_BG, 10, 22]} />

      <ambientLight intensity={0.7} />
      <spotLight
        position={[6, 9, 4]}
        angle={0.35}
        penumbra={1}
        intensity={1.8}
        color={"#ffffff"}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight
        position={[-6, 6, -4]}
        angle={0.5}
        penumbra={1}
        intensity={0.6}
        color={GOLD}
      />
      <pointLight position={[0, 2, 4]} intensity={0.4} color={"#ffffff"} />

      <Suspense fallback={null}>
        {/* 🚀 UPGRADED FLOAT: Adds gentle breathing, subtle tilt, and automatic slow rotation */}
        <Float
          speed={1.5}             // Speed of the floating animation (default was 1.2)
          floatIntensity={1.2}    // Up-and-down movement range
          rotationIntensity={0.6} // Allows the car to gently tilt side-to-side as it floats
          autoInvalidate
        >
          <RealMaybachCar
            position={[0, -0.2, 0]}
            rotation={[0, 0.55, 0]} // Initial starting angle
            scale={1.2}
          />
        </Float>

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.35}
          scale={16}
          blur={2.4}
          far={4}
          color="#22262a"
        />

        <Sparkles count={30} scale={[12, 4, 12]} size={2} speed={0.25} color={GOLD} opacity={0.4} />

        <Environment preset="studio" />
      </Suspense>

      <gridHelper args={[40, 40, "#e1e2e6", "#f0f1f5"]} position={[0, 0.001, 0]} />
    </Canvas>
  );
}

/* ---------------------------------------------------------
   NAV DRAWER
--------------------------------------------------------- */
function NavDrawer({ open, setOpen }) {
  const links = [
    "Institutional Services",
    "Coverage Area",
    "Events & Delegations",
    "Safety & Compliance",
    "Corporate Transportation"
  ];
  return (
    <>
      <button className="nav-toggle light" onClick={() => setOpen(!open)} aria-label="menu">
        <span className={`bar ${open ? "open" : ""}`} />
        <span className={`bar ${open ? "open" : ""}`} />
        <span className={`bar ${open ? "open" : ""}`} />
      </button>

      <div className={`nav-drawer light ${open ? "active" : ""}`}>
        <div className="nav-drawer-inner">
          <div className="nav-mark">MAPLEBRIDGE</div>
          <ul>
            {links.map((l, i) => (
              <li key={l} style={{ transitionDelay: `${i * 60}ms` }}>
                <a href="#" onClick={() => setOpen(false)}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-foot">
            <p>Toronto — Ottawa — Montréal — Vancouver — Calgary</p>
            <p>+1 (888) 627-5313</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------
   MAIN APP / HERO SECTION
--------------------------------------------------------- */
export default function HeroSection() {
  const [navOpen, setNavOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page light-theme" style={{ backgroundColor: LIGHT_BG, color: TEXT_DARK }}>
      <NavDrawer open={navOpen} setOpen={setNavOpen} />

      {/* HERO */}
      <section className="hero">
        <div className="hero-canvas">
          <HeroScene />
        </div>

        <div className="hero-overlay">
          <div className="hero-topline" style={{ color: GOLD }}>
            <span>PROUDLY CANADIAN</span>
            <span className="dot" style={{ backgroundColor: GOLD }} />
            <span>INSTITUTIONAL TRANSPORTATION</span>
          </div>

          <h1 className={`hero-title ${loaded ? "in" : ""}`} style={{ color: TEXT_DARK }}>
            MAPLE.
            <br />
            <em style={{ color: GOLD }}>BRIDGE.</em>
          </h1>

          <p className={`hero-sub ${loaded ? "in" : ""}`} style={{ color: "#4a4d55" }}>
            Structured, compliant, and professionally managed ground transportation for corporations,
            institutional organisations, and government bodies operating across Canada.
          </p>

          <div className={`hero-cta ${loaded ? "in" : ""}`}>
            <a href="#" className="btn-gold" style={{ backgroundColor: GOLD, color: "#fff" }}>
              Request a Formal Proposal
            </a>
            <a href="#" className="btn-ghost dark-outline" style={{ border: `1px solid ${TEXT_DARK}`, color: TEXT_DARK }}>
              Explore Coverage
            </a>
          </div>
        </div>

        <div className="hero-scroll">
          <span style={{ color: "#7a7e85" }}>SCROLL</span>
          <div className="scroll-line light-mode-line" style={{ backgroundColor: "#c5c8cf" }} />
        </div>

        <div className="hero-corner-tl" style={{ color: "#8a8e95" }}>9 CANADIAN CITIES SUPPORTED</div>
        <div className="hero-corner-br" style={{ color: "#8a8e95" }}>MAPLEBRIDGE NATIONAL PROGRAMME</div>
      </section>

      {/* STATS STRIP */}
      <section className="stats light-strip" style={{ backgroundColor: "#f0f1f5", borderTop: "1px solid #e1e2e6", borderBottom: "1px solid #e1e2e6" }}>
        {[
          ["9", "Major Canadian Cities"],
          ["20+", "Years Experience"],
          ["PIPEDA", "Compliant Data Handling"],
          ["CAD", "Consolidated Billing"],
        ].map(([num, label]) => (
          <div className="stat" key={label}>
            <div className="stat-num" style={{ color: GOLD }}>{num}</div>
            <div className="stat-label" style={{ color: "#4a4d55" }}>{label}</div>
          </div>
        ))}
      </section>

      {/* ABOUT / PHILOSOPHY */}
      <section className="about">
        <div className="about-left">
          <span className="eyebrow" style={{ color: GOLD }}>Built for Institutions</span>
          <h2 style={{ color: TEXT_DARK }}>
            Not a ride-hailing platform.<br />Not an aggregator.
          </h2>
        </div>
        <div className="about-right">
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
        <span className="eyebrow center" style={{ color: GOLD }}>What We Deliver</span>
        <h2 className="fleet-title" style={{ color: TEXT_DARK }}>Operational Excellence Behind Every Assignment</h2>

        <div className="fleet-grid">
          <div className="fleet-card large light-card" style={{ backgroundColor: "#fff", border: "1px solid #e1e2e6" }}>
            <h3 style={{ color: TEXT_DARK }}>Corporate Transportation Programmes</h3>
            <p style={{ color: "#4a4d55" }}>
              Centralised account management, consolidated CAD billing, and dedicated coordination
              for corporations with recurring Canadian ground transportation requirements — across 1 city or all 9.
            </p>
          </div>
          <div className="fleet-card light-card" style={{ backgroundColor: "#fff", border: "1px solid #e1e2e6" }}>
            <h3 style={{ color: TEXT_DARK }}>Events & Delegation Logistics</h3>
            <p style={{ color: "#4a4d55" }}>Full coordination for international summits, conferences, and board events with complete documentation.</p>
          </div>
          <div className="fleet-card light-card" style={{ backgroundColor: "#fff", border: "1px solid #e1e2e6" }}>
            <h3 style={{ color: TEXT_DARK }}>Executive Airport Transfers</h3>
            <p style={{ color: "#4a4d55" }}>Real-time flight monitoring, professional meet-and-greet, and prompt-free chauffeur positioning on arrival.</p>
          </div>
          <div className="fleet-card light-card" style={{ backgroundColor: "#fff", border: "1px solid #e1e2e6" }}>
            <h3 style={{ color: TEXT_DARK }}>Safety & Compliance</h3>
            <p style={{ color: "#4a4d55" }}>COI, provincial licensing, PIPEDA confirmation, and chauffeur credentialling ready for procurement vendor qualification.</p>
          </div>
          <div className="fleet-card large alt light-card" style={{ backgroundColor: "#fff", border: "1px solid #e1e2e6" }}>
            <h3 style={{ color: TEXT_DARK }}>Institutional Procurement & Partnerships</h3>
            <p style={{ color: "#4a4d55" }}>
              Formal RFQ responses, service level agreements, standing offer frameworks, and global mobility
              partnership arrangements for international networks.
            </p>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT / CTA */}
      <section className="cta-section" style={{ borderTop: "1px solid #e1e2e6" }}>
        <div className="cta-inner">
          <span className="eyebrow" style={{ color: GOLD }}>Engagement</span>
          <h2 style={{ color: TEXT_DARK }}>
            National Service. <em style={{ color: GOLD }}>Local Precision.</em>
          </h2>
          <p style={{ color: "#4a4d55" }}>
            Submit a formal proposal request through our secure institutional inquiry channel —
            or contact the corporate team directly. All submissions acknowledged within one business day.
          </p>
          <a href="#" className="btn-gold large" style={{ backgroundColor: GOLD, color: "#fff" }}>
            Request a Formal Proposal
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ backgroundColor: "#111215", color: "#fff", paddingTop: "60px" }}>
        <div className="footer-top">
          <div className="footer-mark" style={{ color: GOLD }}>MAPLEBRIDGE</div>
          <div className="footer-links">
            <div>
              <h4 style={{ color: GOLD }}>Services</h4>
              <a href="#" style={{ color: "#c5c8cf" }}>Institutional Services</a>
              <a href="#" style={{ color: "#c5c8cf" }}>Events & Delegations</a>
              <a href="#" style={{ color: "#c5c8cf" }}>Corporate Travel</a>
              <a href="#" style={{ color: "#c5c8cf" }}>Safety & Compliance</a>
            </div>
            <div>
              <h4 style={{ color: GOLD }}>Cities</h4>
              <a href="#" style={{ color: "#c5c8cf" }}>Toronto · Ottawa · Montréal</a>
              <a href="#" style={{ color: "#c5c8cf" }}>Vancouver · Calgary · Edmonton</a>
              <a href="#" style={{ color: "#c5c8cf" }}>Québec City · Niagara Falls · Hamilton</a>
            </div>
            <div>
              <h4 style={{ color: GOLD }}>Contact</h4>
              <a href="mailto:corporate@maplepont.ca" style={{ color: "#c5c8cf" }}>corporate@maplepont.ca</a>
              <a href="tel:+18886275313" style={{ color: "#c5c8cf" }}>+1 (888) 627-5313</a>
              <p style={{ fontSize: '11px', marginTop: '10px', color: 'rgba(255,255,255,0.4)' }}>
                100 King St W, Suite 5600, Toronto, ON
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "#8a8e95" }}>
          <span>© 2026 Maplebridge. All rights reserved. All pricing in CAD.</span>
          <span>No platforms. No aggregators. Accountable ground transportation.</span>
        </div>
      </footer>
    </div>
  );
}