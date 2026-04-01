import { motion } from "motion/react";
import { Linkedin, Instagram, Facebook, MessageSquare, Twitter, ExternalLink, Cpu, Zap, Shield } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: MessageSquare, href: "#" },
  { icon: Twitter, href: "#" },
];

const resources = [
  { name: "AWS Docs", href: "https://docs.aws.amazon.com" },
  { name: "AWS Training", href: "https://explore.skillbuilder.aws" },
  { name: "AWS Educate", href: "https://aws.amazon.com/education/awseducate" },
];

const legal = [
  { name: "Privacy Policy", href: "#" },
  { name: "Terms & Services", href: "#" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-12 relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-neon-purple/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-neon-purple/20 flex items-center justify-center rounded-sm border border-neon-purple/30 group-hover:neon-border transition-all">
                <Cpu className="text-neon-purple" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white group-hover:text-neon-purple transition-colors">
                AWS <span className="text-neon-purple">CLOUD CLUB</span>
              </span>
            </div>
            <p className="text-white/40 text-sm font-mono leading-relaxed">
              [MEC NODE] Madha Engineering College. Building the next generation of cloud-native architects in a decentralized future.
              <br />
              <a href="mailto:awsccmec@gmail.com" className="text-neon-purple hover:underline">awsccmec@gmail.com</a>
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 bg-white/5 flex items-center justify-center rounded-sm border border-white/10 text-white/60 hover:text-neon-purple hover:border-neon-purple transition-all"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 font-mono flex items-center gap-2">
              <Zap size={14} className="text-neon-cyan" />
              Resource Nodes
            </h4>
            <ul className="space-y-4">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-neon-cyan transition-colors text-sm font-mono flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-neon-cyan transition-all"></span>
                    {link.name}
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8 font-mono flex items-center gap-2">
              <Shield size={14} className="text-neon-purple" />
              Legal Protocols
            </h4>
            <ul className="space-y-4">
              {legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-neon-purple transition-colors text-sm font-mono flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-neon-purple transition-all"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="glass p-6 rounded-sm border border-neon-cyan/20">
            <h4 className="text-neon-cyan font-bold uppercase tracking-widest text-xs mb-4 font-mono">System Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-mono">Uplink</span>
                <span className="text-neon-cyan text-xs font-mono animate-pulse">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-mono">Encryption</span>
                <span className="text-neon-cyan text-xs font-mono">AES-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-mono">Node ID</span>
                <span className="text-neon-cyan text-xs font-mono">MEC-042</span>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-white/40 font-mono uppercase">Sync Progress</span>
                  <span className="text-[10px] text-neon-cyan font-mono">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs font-mono">
            &copy; {currentYear} AWS CLOUD CLUB MEC. ALL RIGHTS RESERVED.
          </p>
          <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
            Designed with ❤️ for the Cloud Community.
          </p>
        </div>
      </div>
    </footer>
  );
}
