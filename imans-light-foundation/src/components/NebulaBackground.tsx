'use client';
import { useEffect, useRef } from 'react';

export default function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; radius: number; vx: number; vy: number; baseAlpha: number; isGold: boolean }[] = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 5000); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.4 + 0.3,
          vx: (Math.random(), 0.5) * 0.1, // Slower drift
          vy: -Math.abs((Math.random() * 0.2) + 0.1), // Drift upwards
          baseAlpha: Math.random() * 0.7 + 0.2,
          isGold: Math.random() > 0.55 // 45% of stars are gold tinted
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkle
        const twinkle = Math.sin(Date.now() * 0.001 + star.x) * 0.3;
        const alpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Premium star colors
        if (star.isGold) {
          ctx.fillStyle = `rgba(201, 168, 76, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      pointerEvents: 'none',
      background: '#040814', // Ultra deep space navy
      overflow: 'hidden'
    }}>
      {/* Deep Violet Nebula Core */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(90, 48, 165, 0.38) 0%, transparent 62%)',
        filter: 'blur(90px)',
        borderRadius: '50%',
        animation: 'nebulaDrift 30s infinite alternate ease-in-out',
        willChange: 'transform'
      }} />

      {/* Iman's Light Gold Glow */}
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-10%',
        width: '70vw',
        height: '70vw',
        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.22) 0%, transparent 62%)',
        filter: 'blur(100px)',
        borderRadius: '50%',
        animation: 'nebulaDrift 35s infinite alternate-reverse ease-in-out',
        willChange: 'transform'
      }} />

      {/* Warm Accent Glow */}
      <div style={{
        position: 'absolute',
        top: '55%',
        left: '30%',
        width: '45vw',
        height: '45vw',
        background: 'radial-gradient(circle, rgba(232, 201, 122, 0.14) 0%, transparent 65%)',
        filter: 'blur(85px)',
        borderRadius: '50%',
        animation: 'nebulaDrift 40s infinite alternate ease-in-out',
        willChange: 'transform'
      }} />

      {/* Center Deep Focus */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80vw',
        height: '80vw',
        background: 'radial-gradient(circle, rgba(10, 14, 26, 0.35) 0%, transparent 70%)',
        filter: 'blur(80px)',
        borderRadius: '50%',
      }} />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.95
        }}
      />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes nebulaDrift {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          100% { transform: translate(8%, -6%) scale(1.15) rotate(5deg); }
        }
      `}} />
    </div>
  );
}
