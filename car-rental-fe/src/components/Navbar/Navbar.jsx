import React, { useRef, useState } from "react";
import FullScreenNav from './FullScreenNav';

const Navbar = () => {
    const navGreenRef = useRef(null);
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <div className="z-40 fixed top-0 left-0 w-full flex items-center justify-between border-b border-green-950/20 px-8 py-4">
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-3 cursor-pointer">
                        <img
                            src="https://comforting-chebakia-469108.netlify.app/maplebridge-official-transparent.png"
                            alt="Maple Bridge Logo"
                            className="h-16 w-auto opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </button>
                </div>

                <div
                    onClick={() => setNavOpen(true)}
                    className="cursor-pointer h-10 relative overflow-hidden group flex items-center justify-center rounded-xl border border-green-500/20 px-6 py-3"
                    style={{ background: 'rgba(20, 83, 45, 0.2)', minWidth: '120px' }}
                >
                    <div
                        ref={navGreenRef}
                        className="bg-green-500/25  transition-all duration-300 absolute inset-0 h-0 w-full group-hover:h-full"
                    />
                    <div className="relative z-10 flex flex-col items-end gap-1.5 ">
                        <div className="w-8 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-10" />
                        <div className="w-5 h-0.5 bg-green-200 transition-all duration-300 group-hover:w-10" />
                    </div>
                </div>
            </div>

            <FullScreenNav
                navOpen={navOpen}
                setNavOpen={setNavOpen}
            />
        </>
    );
};

export default Navbar;