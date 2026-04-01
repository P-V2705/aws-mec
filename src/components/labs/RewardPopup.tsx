import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RewardPopupProps {
  onClose: () => void;
}

export default function RewardPopup({ onClose }: RewardPopupProps) {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.5, y: 100, rotate: -10 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.5, y: 100, rotate: 10 }}
        className="relative w-full max-w-lg bg-gradient-to-b from-purple-600 to-blue-700 p-12 rounded-[40px] text-center shadow-[0_0_100px_rgba(168,85,247,0.5)] border-4 border-white/20"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 animate-bounce"><Star className="text-yellow-400" size={48} fill="currentColor" /></div>
        <div className="absolute -bottom-10 -right-10 animate-bounce delay-300"><PartyPopper className="text-pink-400" size={48} /></div>

        <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center text-yellow-400 mx-auto mb-8 shadow-2xl border-4 border-white/30">
          <Trophy size={64} fill="currentColor" />
        </div>

        <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-4">Lab Completed!</h2>
        <p className="text-blue-100 text-xl font-medium mb-10">You've mastered this cloud power and earned a reward.</p>

        <div className="bg-white/10 p-6 rounded-3xl border border-white/20 mb-10">
          <span className="text-sm font-bold text-blue-200 uppercase tracking-widest block mb-2">XP EARNED</span>
          <span className="text-5xl font-black text-white">+50 XP</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="w-full py-5 bg-white text-purple-700 font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-blue-50 transition-all text-lg"
        >
          Continue Journey
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
