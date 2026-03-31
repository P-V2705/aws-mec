import { motion, AnimatePresence } from "motion/react";
import { Rocket } from "lucide-react";

export default function RocketAnimation({ isLaunching, onComplete }: { isLaunching: boolean, onComplete: () => void }) {
  return (
    <AnimatePresence>
      {isLaunching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
        >
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-aws-dark/60 backdrop-blur-sm"
          />

          {/* Sending message text — shown for first 2.5s before rocket launches */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
            transition={{ duration: 2.5, times: [0, 0.1, 0.8, 1] }}
            className="absolute text-center z-20"
          >
            <p className="text-neon-cyan font-bold tracking-widest uppercase text-xl font-mono animate-pulse">
              Sending your message...
            </p>
          </motion.div>

          {/* Rocket Container — delayed by 2.5s */}
          <motion.div
            initial={{ y: 300, scale: 0.8, rotate: 0 }}
            animate={{ y: [300, 0, -1200], scale: [0.8, 1, 1.4] }}
            transition={{
              duration: 3,
              delay: 2.5,
              times: [0, 0.35, 1],
              ease: "easeInOut"
            }}
            onAnimationComplete={onComplete}
            className="relative z-10 flex flex-col items-center"
            style={{ rotate: 0 }}
          >
            {/* Fire trail */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.2, repeat: Infinity }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-28 bg-gradient-to-t from-transparent via-aws-accent to-aws-purple blur-xl rounded-full"
            />

            {/* Rocket icon — rotated -90deg so it points straight up */}
            <div
              className="text-white drop-shadow-[0_0_20px_rgba(108,43,217,0.8)]"
              style={{ transform: "rotate(-90deg)" }}
            >
              <Rocket size={120} className="fill-aws-purple" />
            </div>

            {/* Sparkles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 200,
                  y: Math.random() * 200,
                }}
                transition={{ duration: 1, repeat: Infinity, delay: Math.random() }}
                className="absolute bottom-0 left-1/2 w-2 h-2 bg-aws-accent rounded-full"
              />
            ))}
          </motion.div>

          {/* Launch text — shown after rocket appears */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="absolute bottom-20 text-center"
          >
            <h3 className="text-3xl font-bold neon-text mb-2">IGNITION...</h3>
            <p className="text-aws-purple font-bold tracking-widest uppercase">
              Message launched to the cloud!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
