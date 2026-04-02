import React, { useEffect, useRef } from 'react';

export default function AINeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes: Node[] = [];
    const connections: Connection[] = [];
    const particles: GeometricParticle[] = [];
    const hudRings: HUDRing[] = [];
    
    const nodeCount = 80;
    const connectionDistance = 150;
    const particleCount = 40;

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseX: number;
      baseY: number;
      angle: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Gentle breathing/floating
        this.angle += 0.01;
        this.x += Math.sin(this.angle) * 0.1;
        this.y += Math.cos(this.angle) * 0.1;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f3ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Connection {
      nodeA: Node;
      nodeB: Node;
      pulsePos: number;
      pulseSpeed: number;

      constructor(a: Node, b: Node) {
        this.nodeA = a;
        this.nodeB = b;
        this.pulsePos = Math.random();
        this.pulseSpeed = 0.002 + Math.random() * 0.005;
      }

      draw() {
        if (!ctx) return;
        const dx = this.nodeA.x - this.nodeB.x;
        const dy = this.nodeA.y - this.nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
          ctx.beginPath();
          ctx.moveTo(this.nodeA.x, this.nodeA.y);
          ctx.lineTo(this.nodeB.x, this.nodeB.y);
          ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.2})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Draw Pulse
          this.pulsePos += this.pulseSpeed;
          if (this.pulsePos > 1) this.pulsePos = 0;

          const px = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.pulsePos;
          const py = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.pulsePos;

          ctx.beginPath();
          ctx.arc(px, py, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(188, 19, 254, ${opacity})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = '#bc13fe';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    class GeometricParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'dot' | 'triangle' | 'hexagon';
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.1;
        this.vy = (Math.random() - 0.5) * 0.1;
        this.size = Math.random() * 4 + 2;
        const types: ('dot' | 'triangle' | 'hexagon')[] = ['dot', 'triangle', 'hexagon'];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = 'rgba(188, 19, 254, 0.3)';
        ctx.lineWidth = 1;

        if (this.type === 'dot') {
          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (this.type === 'triangle') {
          ctx.beginPath();
          for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3;
            const x = Math.cos(angle) * this.size;
            const y = Math.sin(angle) * this.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        } else if (this.type === 'hexagon') {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const x = Math.cos(angle) * this.size;
            const y = Math.sin(angle) * this.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    class HUDRing {
      x: number;
      y: number;
      radius: number;
      rotation: number;
      rotationSpeed: number;
      segments: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 200 + 100;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.002;
        this.segments = Math.floor(Math.random() * 3) + 2;
      }

      update() {
        this.rotation += this.rotationSpeed;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.03)';
        ctx.lineWidth = 2;

        for (let i = 0; i < this.segments; i++) {
          const startAngle = (i * Math.PI * 2) / this.segments;
          const endAngle = startAngle + Math.PI / this.segments;
          ctx.beginPath();
          ctx.arc(0, 0, this.radius, startAngle, endAngle);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    const init = () => {
      nodes.length = 0;
      connections.length = 0;
      particles.length = 0;
      hudRings.length = 0;

      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node());
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          connections.push(new Connection(nodes[i], nodes[j]));
        }
      }

      for (let i = 0; i < particleCount; i++) {
        particles.push(new GeometricParticle());
      }

      for (let i = 0; i < 3; i++) {
        hudRings.push(new HUDRing());
      }
    };

    init();

    const animate = () => {
      // Deep indigo/black background with slight gradient feel
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, width, height);

      // Subtle atmospheric glow
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      gradient.addColorStop(0, 'rgba(10, 15, 44, 0)');
      gradient.addColorStop(1, 'rgba(5, 8, 22, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      hudRings.forEach(ring => {
        ring.update();
        ring.draw();
      });

      connections.forEach(conn => conn.draw());
      
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-[-4] pointer-events-none overflow-hidden bg-[#050816]">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Digital Haze Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-cyan-900/10 mix-blend-overlay" />
    </div>
  );
}
