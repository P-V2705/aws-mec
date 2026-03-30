import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, User, X, ArrowRight, Zap } from "lucide-react";
import { events } from "../data/clubData";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            <span className="text-white">UPCOMING</span>{" "}
            <span className="text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">MISSIONS</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-mono">
            [TRANSMISSION RECEIVED] Sync your calendar with the latest cloud deployment operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedEvent(event)}
              className="glass p-8 rounded-2xl group hover:neon-border-cyan transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 -mr-12 -mt-12 rounded-full group-hover:scale-150 transition-transform"></div>
              
              <div className="flex items-center gap-2 text-neon-cyan text-xs font-bold uppercase tracking-widest mb-4 font-mono">
                <Zap size={14} className="animate-pulse" />
                <span>ACTIVE MISSION</span>
              </div>
              
              <h3 className="text-2xl font-bold mb-6 group-hover:text-neon-cyan transition-colors">
                {event.name}
              </h3>
              
              <div className="space-y-4 mb-8 font-mono text-sm">
                <div className="flex items-center gap-3 text-white/60">
                  <Clock size={18} className="text-neon-cyan" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin size={18} className="text-neon-cyan" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <User size={18} className="text-neon-cyan" />
                  <span>{event.speaker}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-neon-cyan font-bold group-hover:translate-x-2 transition-transform text-sm tracking-widest">
                INITIALIZE BRIEFING <ArrowRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-aws-dark/90 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-aws-dark border border-neon-cyan/30 rounded-sm p-8 md:p-12 shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden"
            >
              {/* Tech Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-cyan" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-cyan" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-cyan" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-cyan" />

              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-neon-cyan transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mb-8">
                <div className="text-neon-cyan text-xs font-bold mb-2 font-mono tracking-widest uppercase">Mission Briefing</div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {selectedEvent.name}
                </h2>
                <p className="text-white/60 leading-relaxed font-mono text-sm">
                  {selectedEvent.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-4">
                  <h4 className="text-neon-cyan font-bold uppercase tracking-widest text-xs font-mono">Parameters</h4>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex items-center gap-3 text-white/80">
                      <Clock size={18} className="text-neon-cyan" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <MapPin size={18} className="text-neon-cyan" />
                      <span>{selectedEvent.venue}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <User size={18} className="text-neon-cyan" />
                      <span>{selectedEvent.speaker}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-neon-cyan font-bold uppercase tracking-widest text-xs font-mono">Objectives</h4>
                  <ul className="space-y-2 font-mono text-sm">
                    {selectedEvent.agenda.map((item: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-white/80">
                        <div className="w-1 h-1 bg-neon-cyan rotate-45"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button className="w-full py-4 bg-neon-cyan text-aws-dark font-bold rounded-sm shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all uppercase tracking-widest text-sm">
                ACCEPT MISSION
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
