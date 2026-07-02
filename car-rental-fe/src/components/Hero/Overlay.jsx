import { motion } from 'framer-motion';

export default function Overlay() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] } }
  };

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-8 md:p-20 pointer-events-none">
      <nav className="flex justify-between items-center pointer-events-auto">
        <div className="text-white font-bold text-2xl tracking-tighter italic">FERRARI</div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Heritage</a>
          <a href="#" className="hover:text-white transition-colors">Models</a>
          <a href="#" className="hover:text-white transition-colors">Racing</a>
        </div>
      </nav>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
        <motion.h1 variants={item} className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-4">
          ENGINEERED <br /> <span className="text-red-600">FOR LEGENDS</span>
        </motion.h1>
        <motion.p variants={item} className="text-gray-400 text-lg md:text-xl max-w-lg mb-8 font-light leading-relaxed">
          Experience the perfect fusion of Italian performance, luxury, and soul-stirring innovation.
        </motion.p>
        <motion.div variants={item} className="flex gap-4 pointer-events-auto">
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,40,0,0.4)]">
            Explore Collection
          </button>
          <button className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-xs transition-all">
            Watch Experience
          </button>
        </motion.div>
      </motion.div>

      <div className="flex justify-between items-end">
        <div className="text-[10px] text-gray-500 uppercase tracking-widest flex flex-col gap-2">
          <span>01. Hybrid V12</span>
          <span>02. Carbon Aero</span>
          <span>03. Scuderia Tech</span>
        </div>
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center animate-bounce">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}