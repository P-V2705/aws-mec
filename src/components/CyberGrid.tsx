import { useEffect } from 'react';

export default function CyberGrid() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const parallaxElements = document.querySelectorAll('.bg-parallax');
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      
      parallaxElements.forEach((el, index) => {
        const speed = 5 + (index * 2); // Varying speed for depth
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        // Preserve existing transforms (like perspective/rotateX for grid)
        const baseTransform = el.classList.contains('bg-grid-layer') 
          ? 'perspective(1000px) rotateX(60deg)' 
          : '';
          
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px) ${baseTransform}`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* AWS Related Background Image */}
      <div className="bg-layer bg-image-layer bg-parallax"></div>

      {/* Animated Gradient Layer */}
      <div className="bg-layer bg-gradient-layer bg-parallax"></div>
      
      {/* Grid Layer */}
      <div className="bg-layer bg-grid-layer bg-parallax"></div>
      
      {/* Floating Elements */}
      <div className="bg-floating-container">
        <div className="floating-element float-1 bg-parallax"></div>
        <div className="floating-element float-2 bg-parallax"></div>
        <div className="floating-element float-3 bg-parallax"></div>
        <div className="floating-element float-4 bg-parallax"></div>
        <div className="floating-element float-5 bg-parallax"></div>
      </div>

      {/* Contrast Safety Overlay */}
      <div className="bg-layer bg-overlay-layer"></div>
    </>
  );
}
