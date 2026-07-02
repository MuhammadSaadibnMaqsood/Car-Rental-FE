import React, { Suspense, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Scene from './components/Hero/Scene';
import Overlay from './components/Hero/Overlay';
import Loader from './components/UI/Loader';
import Cursor from './components/UI/Cursor';

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="relative bg-[#050505] w-full min-h-screen">
      <Cursor />
      <Suspense fallback={<Loader />}>
        <div className="h-screen w-full sticky top-0 overflow-hidden">
          <Scene />
          <Overlay />
        </div>
        
        {/* Secondary Content for Scroll Experience */}
        <section className="h-screen bg-[#080808] relative z-20 flex items-center justify-center p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
             <div className="text-white space-y-6">
                <h2 className="text-5xl font-bold tracking-tighter uppercase">Beyond Velocity</h2>
                <p className="text-gray-400 leading-relaxed">
                  Every curve, every line, and every stitch is a testament to our pursuit of automotive perfection.
                  The Ferrari SF90 Stradale represents the new era of performance.
                </p>
             </div>
             <div className="aspect-video bg-red-600/10 border border-white/5 rounded-2xl flex items-center justify-center">
                <span className="text-white/20 italic tracking-widest uppercase">Performance Video</span>
             </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}

export default App;