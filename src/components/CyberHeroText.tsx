import React from 'react';
import { motion } from 'motion/react';

const words = ["AWS", "CLOUD", "CLUB"];

export default function CyberHeroText() {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 perspective-1000 [transform-style:preserve-3d]">
      {words.map((word, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: (Math.random() - 0.5) * 1000, 
            y: (Math.random() - 0.5) * 1000, 
            z: Math.random() * 2000 - 1000,
            rotateX: Math.random() * 360 - 180,
            rotateY: Math.random() * 360 - 180,
            opacity: 0 
          }}
          animate={{ 
            x: 0, y: 0, z: 0, 
            rotateX: 0, rotateY: 0, 
            opacity: 1 
          }}
          transition={{ 
            duration: 6, 
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.3
          }}
          className="relative [transform-style:preserve-3d]"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-violet-200 drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)] [transform:translateZ(50px)]">
            {word}
          </h1>
          {/* Subtle Glow Pulse */}
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-cyan-500/20 blur-2xl -z-10 [transform:translateZ(-20px)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
