import { useProgress, Html } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function Loader() {
  const { progress } = useProgress();
  
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-white text-xs tracking-[0.5em] font-light mb-4"
      >
        LOADING EXPERIENCE
      </motion.div>
      <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-red-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-red-600 font-mono text-sm">{Math.round(progress)}%</div>
    </div>
  );
}