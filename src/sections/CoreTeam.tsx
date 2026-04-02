import { motion } from "motion/react";
import { Github, Linkedin, ExternalLink, Shield } from "lucide-react";
import { team } from "../data/clubData";

const TeamCard = ({ member, type }: { member: any, type: 'faculty' | 'core' | 'crew', key?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, scale: 1.05 }}
    viewport={{ once: true }}
    className={`glass p-6 rounded-sm group hover:neon-border transition-all flex flex-col items-center text-center relative overflow-hidden ${
      type === 'faculty' ? 'md:p-10' : ''
    }`}
  >
    {/* Tech Accents */}
    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neon-purple opacity-40" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neon-purple opacity-40" />

    <div className={`relative mb-6 ${type === 'faculty' ? 'w-48 h-48' : 'w-32 h-32'}`}>
      <div className="absolute inset-0 bg-neon-purple rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
      <div className="absolute inset-0 border-2 border-neon-purple/20 rounded-full group-hover:border-neon-purple transition-colors" />
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover object-top rounded-full p-1 relative z-10 transition-all duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    
    <h3 className={`font-bold mb-1 group-hover:text-neon-purple transition-colors ${
      type === 'faculty' ? 'text-2xl' : 'text-xl'
    }`}>
      {member.name}
    </h3>
    <p className="text-neon-cyan text-xs mb-6 uppercase tracking-widest font-mono font-bold">
      {member.role}
    </p>
    
    <div className="flex items-center gap-4">
      {member.github && (
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-sm bg-white/5 hover:bg-neon-purple hover:text-white transition-all shadow-[0_0_10px_rgba(188,19,254,0.1)] hover:shadow-[0_0_15px_rgba(188,19,254,0.4)]"
        >
          <Github size={18} />
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-sm bg-white/5 hover:bg-neon-purple hover:text-white transition-all shadow-[0_0_10px_rgba(188,19,254,0.1)] hover:shadow-[0_0_15px_rgba(188,19,254,0.4)]"
        >
          <Linkedin size={18} />
        </a>
      )}
    </div>
  </motion.div>
);

export default function CoreTeam() {
  return (
    <section id="team" className="coreteam-section py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-4">
            <span className="text-white">NODE</span>{" "}
            <span className="text-neon-purple neon-text-purple">OPERATORS</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-mono">
            [IDENTIFYING PERSONNEL] Authorized cloud architects and network administrators.
          </p>
        </motion.div>

        {/* Faculty Advisor */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Shield className="text-neon-purple" size={20} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.faculty.map((member) => (
              <TeamCard key={member.name} member={member} type="faculty" />
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-8 h-[1px] bg-neon-purple/30" />
            <h3 className="text-neon-purple font-bold uppercase tracking-[0.4em] text-[20px] font-mono">Core Team</h3>
            <div className="w-8 h-[1px] bg-neon-purple/30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.core.map((member) => (
              <TeamCard key={member.name} member={member} type="core" />
            ))}
          </div>
        </div>

        {/* Crew Team */}
        <div>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-8 h-[1px] bg-neon-purple/30" />
            <h3 className="text-neon-purple font-bold uppercase tracking-[0.4em] text-[20px] font-mono">Crew Team</h3>
            <div className="w-8 h-[1px] bg-neon-purple/30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.crew.map((member) => (
              <TeamCard key={member.name} member={member} type="crew" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
