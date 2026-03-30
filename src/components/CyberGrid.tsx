import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function CyberGrid() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [floatingElements, setFloatingElements] = useState<any[]>([]);

  useEffect(() => {
    // Generate floating elements with depth simulation
    const elements = Array.from({ length: 6 }).map((_, i) => {
      const sizeVal = 30 + Math.random() * 70; // 30px to 100px
      // Depth simulation: smaller + more blurred = farther, larger + sharper = closer
      // size 30 -> blur 6px, size 100 -> blur 1px
      const blurVal = 6 - ((sizeVal - 30) / 70) * 5;
      
      return {
        id: i,
        rotate: `${Math.random() * 360}deg`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${sizeVal}px`,
        delay: `${Math.random() * -20}s`, // Random start point
        blur: `${blurVal.toFixed(1)}px`,
        opacity: 0.1 + Math.random() * 0.1,
      };
    });
    setFloatingElements(elements);

    // Parallax logic
    const handleMouseMove = (e: MouseEvent) => {
      if (!backgroundRef.current) return;
      
      const layers = backgroundRef.current.querySelectorAll('.parallax-layer, .floating-element, .background-glow, .background-grid');
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      // Subtle shift: max 10px
      const translateX = mouseX * 10;
      const translateY = mouseY * 10;

      layers.forEach((layer: any, index) => {
        const speed = 0.5 + (index * 0.2); // Varying speed for depth
        const x = translateX * speed;
        const y = translateY * speed;
        
        // Preserve existing transforms (like perspective/rotateX for grid)
        const baseTransform = layer.classList.contains('background-grid') 
          ? 'perspective(1000px) rotateX(5deg)' 
          : layer.classList.contains('background-glow')
          ? 'translate(-50%, -50%)'
          : '';
          
        layer.style.transform = `translate(${x}px, ${y}px) ${baseTransform}`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={backgroundRef} className="background-main">
      <div className="background-glow" />
      <div className="background-grid" />
      
      {/* Floating Elements */}
      {floatingElements.map((el) => (
        <div
          key={el.id}
          className="floating-element"
          style={{
            top: el.top,
            left: el.left,
            width: el.size,
            height: el.size,
            animationDelay: el.delay,
            filter: `blur(${el.blur})`,
            opacity: el.opacity,
            '--rotate': el.rotate,
          } as any}
        />
      ))}

      {/* Content Overlay for contrast safety */}
      <div className="content-overlay" />
    </div>
  );
}
