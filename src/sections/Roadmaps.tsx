import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Server, Database, Zap, Infinity, Cpu, Network } from "lucide-react";
import { roadmaps } from "../data/clubData";

const iconMap: { [key: string]: any } = {
  Server,
  Database,
  Zap,
  Infinity,
  Cpu,
  Network,
};

const TiltCard = ({ item, index }: { item: any, index: number, key?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = iconMap[item.icon];

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass p-8 rounded-sm flex flex-col md:flex-row items-center gap-8 group hover:neon-border transition-all cursor-default relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="w-16 h-16 bg-neon-purple/20 rounded-sm flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-white transition-colors shadow-[0_0_15px_rgba(188,19,254,0.2)]"
      >
        {Icon && <Icon size={32} />}
      </div>
      
      <div style={{ transform: "translateZ(30px)" }} className="flex-1 text-center md:text-left relative z-10">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-neon-purple transition-colors uppercase tracking-tight">
          {item.title}
        </h3>
        <p className="text-white/60 leading-relaxed font-mono text-sm">
          {item.description}
        </p>
      </div>
      
      <div style={{ transform: "translateZ(40px)" }} className="hidden md:block">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-neon-purple group-hover:text-neon-purple transition-all font-mono">
          0{index + 1}
        </div>
      </div>
    </motion.div>
  );
};

export default function Roadmaps() {
  return (
    <section id="roadmaps" className="roadmap-section py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            <span className="text-white">CLOUD</span>{" "}
            <span className="text-neon-purple neon-text-purple">PROTOCOLS</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-mono">
            [ACCESSING DATA] Select a learning path to initialize your cloud architecture sequence.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {roadmaps.map((item, index) => (
            <TiltCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
