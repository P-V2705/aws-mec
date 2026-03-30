import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, User, Mail, MessageSquare, Zap, ShieldCheck } from "lucide-react";
import RocketAnimation from "../components/RocketAnimation";
import emailjs from "@emailjs/browser";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLaunching, setIsLaunching] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS configuration missing");
      alert("Email configuration is missing. Please contact the administrator.");
      return;
    }

    try {
      // Send email
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      // Simulate delay before rocket launch
      setTimeout(() => {
        setIsLaunching(true);
      }, 2000); // 2-3 second delay
    } catch (error) {
      console.error("EmailJS error details:", error);
      alert(`Failed to send message. Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleLaunchComplete = () => {
    setIsLaunching(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="join" className="py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
                <Zap size={12} />
                Network Expansion
              </div>
              <h2 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">JOIN THE</span><br />
                <span className="text-neon-purple neon-text-purple">RESISTANCE</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 font-mono leading-relaxed">
                [ENCRYPTION ENABLED] Become a part of the next generation of cloud architects. Access exclusive protocols, experimental labs, and high-priority missions.
                <br />
                <span className="text-neon-cyan">Send your details to: awsccmec@gmail.com</span>
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Access to AWS Cloud Practitioner Training",
                  "Priority Entry to Hackathons & CTFs",
                  "Exclusive Mentorship from Industry Experts",
                  "Hands-on Experience with Serverless & AI"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-white/80 font-mono text-sm"
                  >
                    <ShieldCheck className="text-neon-cyan" size={18} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-10 rounded-sm relative"
            >
              {/* Tech Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-purple opacity-40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-purple opacity-40" />

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-12"
                  >
                    <div className="w-24 h-24 bg-neon-purple/20 rounded-full flex items-center justify-center text-neon-purple mx-auto mb-8 shadow-[0_0_30px_rgba(188,19,254,0.3)]">
                      <CheckCircle size={48} />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-neon-purple neon-text-purple uppercase tracking-tight">UPLINK ESTABLISHED</h3>
                    <p className="text-white/60 mb-8 font-mono text-sm">
                      Your data packet has successfully reached the AWS Cloud Network. We'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-8 py-3 border border-neon-purple text-neon-purple font-bold uppercase tracking-widest text-xs hover:bg-neon-purple hover:text-white transition-all shadow-[0_0_15px_rgba(188,19,254,0.2)]"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-neon-purple font-bold font-mono">Operator Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="ENTER IDENTITY"
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-purple transition-all font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-neon-purple font-bold font-mono">Comms Frequency (Email)</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="OPERATOR@NETWORK.COM"
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-purple transition-all font-mono text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-neon-purple font-bold font-mono">Mission Statement</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-6 text-white/30" size={18} />
                        <textarea
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="WHY DO YOU WANT TO JOIN?"
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-neon-purple transition-all font-mono text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-4 bg-neon-purple text-white font-bold uppercase tracking-[0.2em] rounded-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(188,19,254,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] transition-all"
                    >
                      Initialize Uplink <Send size={18} />
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rocket Animation Component */}
      <RocketAnimation isLaunching={isLaunching} onComplete={handleLaunchComplete} />
    </section>
  );
}
