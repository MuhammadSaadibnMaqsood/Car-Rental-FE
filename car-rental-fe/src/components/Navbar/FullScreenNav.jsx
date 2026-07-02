import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FullScreenNav = ({ navOpen, setNavOpen }) => {
    const fullScreenRef = useRef(null);

    function gsapAnimation() {
        const tl = gsap.timeline();
        tl.to(".fullscreennav", {
            display: "block",
        });
        tl.to(".stairing", {
            delay: 0.1,
            height: "100%",
            stagger: {
                amount: -0.2,
            },
            ease: "power3.inOut"
        });
        tl.to(".link", {
            opacity: 1,
            rotateX: 0,
            stagger: {
                amount: 0.2,
            },
            ease: "power3.out"
        });
        tl.to(".navlink", {
            opacity: 1,
            duration: 0.4
        });
    }

    function gsapAnimationReverse() {
        const tl = gsap.timeline();
        tl.to(".link", {
            opacity: 0,
            rotateX: 90,
            stagger: {
                amount: 0.1,
            },
            ease: "power3.in"
        });
        tl.to(".stairing", {
            height: 0,
            stagger: {
                amount: 0.1,
            },
            ease: "power3.inOut"
        });
        tl.to(".navlink", {
            opacity: 0,
            duration: 0.3
        });
        tl.to(".fullscreennav", {
            display: "none",
        });
    }

    useGSAP(
        () => {
            if (navOpen) {
                gsapAnimation();
            } else {
                gsapAnimationReverse();
            }
        },
        [navOpen]
    );

    const navLinks = [
        { name: "HOME", path: "#home" },
        { name: "OUR FLEET", path: "#fleet" },
        { name: "TERRAIN MAP", path: "#routes" },
        { name: "PRICING", path: "#pricing" },
        { name: "CONTACT US", path: "#contact" },
    ];

    return (
        <div
            ref={fullScreenRef}
            className="fullscreennav hidden text-white overflow-hidden h-screen w-screen z-50 fixed top-0 left-0"
        >
            {/* Animated Background Stairs */}
            <div className="h-full w-full fixed top-0 left-0">
                <div className="h-full w-full flex">
                    <div className="stairing h-0 w-1/5 bg-[#050e06]" />
                    <div className="stairing h-0 w-1/5 bg-[#050e06]" />
                    <div className="stairing h-0 w-1/5 bg-[#050e06]" />
                    <div className="stairing h-0 w-1/5 bg-[#050e06]" />
                    <div className="stairing h-0 w-1/5 bg-[#050e06]" />
                </div>
            </div>

            {/* Navigation Content */}
            <div className="relative z-10 h-full overflow-y-auto flex flex-col">
                <div className="navlink opacity-0 flex w-full justify-between lg:px-16 px-8 py-8 items-center">
                    <div className="h-10">
                        <img
                            src="https://comforting-chebakia-469108.netlify.app/maplebridge-official-transparent.png"
                            alt="Maple Bridge Logo"
                            className="h-16 w-auto opacity-90"
                        />
                    </div>
                    <div
                        onClick={() => setNavOpen(false)}
                        className="h-12 w-12 flex items-center justify-center relative  cursor-pointer group"
                    >
                        <div className="h-16 w-0.5 rotate-45 absolute bg-green-400 group-hover:bg-green-300 transition-colors duration-200" />
                        <div className="h-16 w-0.5 -rotate-45 absolute bg-green-400 group-hover:bg-green-300 transition-colors duration-200" />
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-8 md:px-16 mb-20">
                    {navLinks.map((link) => (
                        <div
                            key={link.path}
                            onClick={() => setNavOpen(false)}
                            className="w-full block text-left"
                        >
                            <div className="link opacity-0 origin-top relative border-t border-white/5 hover:border-green-500/20 transition-colors duration-300 cursor-pointer overflow-hidden py-6 group">
                                <h1
                                    className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[6vw] text-left lg:leading-none uppercase tracking-wide text-green-100 group-hover:text-green-400 transition-colors duration-300"
                                    style={{ fontFamily: "'Bebas Neue', 'DM Sans', sans-serif" }}
                                >
                                    {link.name}
                                </h1>

                                {/* Hover slide-in marquee effect */}
                                <div className="absolute inset-0 bg-green-500 opacity-0 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out flex items-center pointer-events-none overflow-hidden">
                                    <div className="flex items-center whitespace-nowrap animate-[marquee_20s_linear_infinite]">
                                        {[...Array(4)].map((_, idx) => (
                                            <React.Fragment key={idx}>
                                                <span
                                                    className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[6vw] uppercase tracking-wide px-6 text-[#050e06]"
                                                    style={{ fontFamily: "'Bebas Neue', 'DM Sans', sans-serif" }}
                                                >
                                                    {link.name}
                                                </span>
                                                <div className="h-4 w-12 rounded-full shrink-0 bg-[#050e06] mx-4" />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    <div className="flex items-center whitespace-nowrap absolute top-0 animate-[marquee_20s_linear_infinite] delay-1000">
                                        {[...Array(4)].map((_, idx) => (
                                            <React.Fragment key={idx}>
                                                <span
                                                    className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[6vw] uppercase tracking-wide px-6 text-[#050e06]"
                                                    style={{ fontFamily: "'Bebas Neue', 'DM Sans', sans-serif" }}
                                                >
                                                    {link.name}
                                                </span>
                                                <div className="h-4 w-12 rounded-full shrink-0 bg-[#050e06] mx-4" />
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export default FullScreenNav;