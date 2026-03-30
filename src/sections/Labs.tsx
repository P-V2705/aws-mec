import { motion } from "motion/react";
import { Globe, Code, Image, Layers, ExternalLink, Zap } from "lucide-react";
import { labs } from "../data/clubData";

const iconMap: { [key: string]: any } = {
  Globe,
  Code,
  Image,
  Layers,
};

export default function Labs() {
  return (
    <section id="labs" className="py-24 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none opacity-40"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none opacity-40"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
            <Zap size={12} />
            Experimental Zones
          </div>
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            <span className="text-neon-purple">RESEARCH</span>{" "}
            <span className="text-neon-cyan neon-text-cyan">LABS</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-mono">
            [SYSTEM STATUS: ACTIVE] Exploring the frontiers of cloud computing and decentralized networks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {labs.map((lab, index) => {
            const Icon = iconMap[lab.icon];
            return (
              <motion.div
                key={lab.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-sm group hover:neon-border transition-all flex flex-col md:flex-row items-center gap-8 cursor-default relative overflow-hidden"
              >
                {/* Tech Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neon-cyan opacity-40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neon-cyan opacity-40" />

                <div className="w-20 h-20 bg-white/5 rounded-sm flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-all relative shrink-0">
                  <div className="absolute inset-0 border border-neon-cyan/20 group-hover:border-neon-cyan transition-colors" />
                  {Icon && <Icon size={36} />}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-cyan transition-colors uppercase tracking-tight">
                    {lab.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed mb-6 font-mono text-sm">
                    {lab.description}
                  </p>
                  <button className="flex items-center gap-2 text-neon-cyan font-bold text-xs uppercase tracking-widest hover:translate-x-2 transition-transform font-mono">
                    Access Protocol <ExternalLink size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
