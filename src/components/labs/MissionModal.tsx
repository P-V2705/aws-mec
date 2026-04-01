import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { LabLevel } from './Labs';
import QuizBox from './QuizBox';

interface MissionModalProps {
  lab: LabLevel;
  onClose: () => void;
  onComplete: () => void;
}

export default function MissionModal({ lab, onClose, onComplete }: MissionModalProps) {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-4xl bg-[#1a0b3a] border-2 border-purple-500/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.2)]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-full transition-all z-10"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
          {/* Sidebar / Icon */}
          <div className="md:w-1/3 bg-gradient-to-b from-purple-600/20 to-blue-600/20 p-10 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-purple-500/20">
            <div className="w-24 h-24 bg-purple-500/30 rounded-3xl flex items-center justify-center text-purple-300 mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              {lab.icon}
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-2">{lab.title}</h2>
            <span className="px-4 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs font-bold text-purple-400 uppercase tracking-widest">
              Mission {lab.id}
            </span>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-10 space-y-8">
            {!isStarted ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <AlertCircle size={20} /> Briefing
                  </h3>
                  <p className="text-blue-200/70 leading-relaxed text-lg">
                    {lab.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} /> Objective
                  </h3>
                  <p className="text-white font-medium text-lg">
                    {lab.objective}
                  </p>
                </div>

                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsStarted(true)}
                    className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
                  >
                    Start Lab <Play size={20} fill="currentColor" />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-black/30 p-6 rounded-2xl border border-purple-500/20">
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">Instructions</h3>
                  <ul className="space-y-3">
                    {lab.instructions.map((inst, i) => (
                      <li key={i} className="text-blue-200/80 text-base flex gap-3">
                        <span className="text-purple-500 font-bold">•</span>
                        {inst}
                      </li>
                    ))}
                  </ul>
                </div>

                <QuizBox 
                  questions={lab.questions} 
                  onComplete={onComplete}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
