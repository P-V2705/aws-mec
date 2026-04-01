import React from 'react';
import { motion } from 'motion/react';
import { Lock, Unlock } from 'lucide-react';
import { LabLevel } from './Labs';

interface LevelCardProps {
  key?: React.Key;
  lab: LabLevel;
  isLocked: boolean;
  onClick: () => void;
}

export default function LevelCard({ lab, isLocked, onClick }: LevelCardProps) {
  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`relative p-8 rounded-3xl border-2 transition-all cursor-pointer overflow-hidden ${
        isLocked 
          ? 'bg-gray-900/50 border-gray-700/50 grayscale' 
          : 'bg-purple-900/20 border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
      }`}
    >
      {/* Glow Effect */}
      {!isLocked && (
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full" />
      )}

      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl ${isLocked ? 'bg-gray-800' : 'bg-purple-600/30 text-purple-300'}`}>
          {lab.icon}
        </div>
        <div className={`p-2 rounded-full ${isLocked ? 'bg-gray-800 text-gray-500' : 'bg-green-500/20 text-green-400'}`}>
          {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
        </div>
      </div>

      <div className="space-y-2">
        <span className={`text-xs font-bold uppercase tracking-widest ${isLocked ? 'text-gray-500' : 'text-purple-400'}`}>
          Level {lab.id} • {lab.category}
        </span>
        <h3 className={`text-3xl font-black uppercase tracking-tight ${isLocked ? 'text-gray-600' : 'text-white'}`}>
          {lab.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isLocked ? 'text-gray-700' : 'text-blue-200/60'}`}>
          {lab.description}
        </p>
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-gray-900 px-4 py-2 rounded-full border border-gray-700 flex items-center gap-2">
            <Lock size={14} className="text-gray-500" />
            <span className="text-xs font-bold text-gray-500 uppercase">LOCKED</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
