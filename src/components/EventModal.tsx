import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Clock, User, MapPin } from 'lucide-react';

interface EventModalProps {
  event: any | null;
  onClose: () => void;
}

export default function EventModal({ event: ev, onClose }: EventModalProps) {
  useEffect(() => {
    if (ev) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [ev]);

  if (!ev) return null;

  return (
    <div className="fixed inset-0 bg-[#0b0f1a] z-[9999] overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 md:p-12 min-h-screen flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all z-50 shadow-xl backdrop-blur-md"
        >
          <X size={24} />
        </button>

        {/* Top Section */}
        <div className="mb-12 mt-8">
          <h1 className="font-display text-4xl md:text-6xl font-black mb-6 leading-tight text-white text-center">{ev.name}</h1>
          
          {/* Agenda with timing */}
          <div className="flex items-center justify-center gap-4 text-lav font-mono text-lg mb-10">
            <Clock size={24} />
            <span>{ev.time} | {ev.venue}</span>
          </div>

          {/* Description */}
          <p className="text-xl text-muted leading-relaxed max-w-4xl mx-auto text-center">
            {ev.description}
          </p>
        </div>

        {/* Speaker */}
        <div className="mb-24 flex flex-col items-center">
          <h3 className="font-bold mb-8 text-white border-b border-white/10 w-full text-center" style={{ paddingTop: '0px', paddingBottom: '9px', fontSize: '30px', lineHeight: '40px' }}>Speaker</h3>
          <div className="flex items-center gap-8 bg-white/5 p-10 rounded-[32px] border border-white/10 hover:border-lav/50 transition-all duration-500">
            <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-white/10 shadow-2xl bg-lav/20 flex items-center justify-center text-4xl">
              <User size={48} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">{ev.speaker}</h4>
            </div>
          </div>
        </div>

        {/* Agenda */}
        <div className="mb-24 flex flex-col items-center">
          <h3 className="font-bold mb-8 text-white border-b border-white/10 w-full text-center" style={{ fontSize: '28px', paddingBottom: '6px', paddingTop: '10px' }}>Agenda</h3>
          <div className="w-full max-w-4xl">
            <ul className="text-lg text-muted leading-relaxed text-left px-6 md:px-10 list-disc">
              {ev.agenda.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
