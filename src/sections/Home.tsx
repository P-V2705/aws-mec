import { motion, useMotionValue, useTransform } from "motion/react";
import { Server, Database, Zap, Cpu, Cloud, ArrowRight, Monitor, Cpu as Chip } from "lucide-react";
import { useEffect } from "react";
import CyberHeroText from '../components/CyberHeroText';

const FloatingIcon = ({ icon: Icon, className, delay = 0 }: { icon: any, className: string, delay?: number }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute text-neon-purple/20 ${className}`}
  >
    <Icon size={48} />
  </motion.div>
);

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const parallaxX = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  const parallaxY = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);

  return (
    <section id="home" className="home-section relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ x: parallaxX, y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <FloatingIcon icon={Monitor} className="top-1/4 left-1/4" delay={0} />
        <FloatingIcon icon={Chip} className="top-1/3 right-1/4" delay={1} />
        <FloatingIcon icon={Zap} className="bottom-1/4 left-1/3" delay={2} />
        <FloatingIcon icon={Server} className="bottom-1/3 right-1/3" delay={3} />
        
        <motion.div
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-1/4 text-neon-cyan/5"
        >
          <Cloud size={120} />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-block"
        >
          <div className="px-4 py-1 rounded-full border border-neon-purple/50 bg-neon-purple/10 text-neon-purple text-xs font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(188,19,254,0.2)]">
            SYSTEM ONLINE // CLOUD GAMING MEC
          </div>
        </motion.div>

        <CyberHeroText />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed font-mono"
        >
          <span className="text-neon-cyan">{" >>"}</span> Initializing cloud infrastructure... 
          <br />
          Empowering the next generation of cloud architects through high-performance learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#roadmaps"
            className="group px-10 py-4 bg-neon-purple text-white font-bold rounded-sm border border-neon-purple shadow-[0_0_20px_rgba(188,19,254,0.4)] hover:shadow-[0_0_30px_rgba(188,19,254,0.6)] transition-all flex items-center gap-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            ENTER DASHBOARD
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#join"
            className="px-10 py-4 bg-transparent border border-neon-cyan text-neon-cyan font-bold rounded-sm hover:bg-neon-cyan/10 shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all"
          >
            JOIN NETWORK
          </a>
        </motion.div>
      </div>

      {/* Retro Scanlines */}
      <div className="scanlines absolute inset-0 opacity-20 pointer-events-none"></div>
    </section>
  );
}
