import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, MapPin, User, X, ArrowRight, Zap } from "lucide-react";
import { events } from "../data/clubData";
import EventModal from "../components/EventModal";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <section id="events" className="events-section py-24 relative overflow-hidden">
        <div id="events-list" className="container mx-auto px-6 relative z-10">
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
                onClick={() => {
                  setSelectedEvent(event);
                  const list = document.getElementById("events-list");
                  if (list) list.style.display = "none";
                }}
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
          <EventModal 
            event={selectedEvent} 
            onClose={() => {
              setSelectedEvent(null);
              const list = document.getElementById("events-list");
              if (list) list.style.display = "block";
            }} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
