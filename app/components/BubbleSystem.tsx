'use client';

import { useEffect, useRef, useState } from 'react';

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  targetOpacity: number;
}

const BubbleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(true);
  const bubbleCountRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (bubbleCountRef.current === null) {
      bubbleCountRef.current = 30 + Math.floor(Math.random() * 10);
    }
    const bubbleCount = bubbleCountRef.current;
    bubblesRef.current = Array.from({ length: bubbleCount }, () => {
      const radius = 2 + Math.random() * 8;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + radius,
        radius,
        speedY: -(0.5 + Math.random() * 1.5),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        targetOpacity: Math.random() * 0.5 + 0.3,
      };
    });

    // Mouse tracking for interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Tab visibility
    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation loop
    const animate = () => {
      if (!isActiveRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current = bubblesRef.current.filter((bubble) => {
        // Mouse repulsion
        const dx = bubble.x - mouseRef.current.x;
        const dy = bubble.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelDistance = 150;

        if (distance < repelDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / repelDistance) * 0.8;
          bubble.speedX += Math.cos(angle) * force;
          bubble.speedY += Math.sin(angle) * force;
          bubble.targetOpacity = 0.8;
        } else {
          bubble.targetOpacity = Math.random() * 0.5 + 0.3;
        }

        // Update position
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        bubble.speedX *= 0.98;
        bubble.speedY *= 0.98;

        // Damping
        bubble.speedY *= 0.99;

        // Wave motion
        bubble.speedX += Math.sin(bubble.y * 0.01) * 0.05;

        // Opacity animation
        bubble.opacity += (bubble.targetOpacity - bubble.opacity) * 0.02;

        // Boundary wrapping
        if (bubble.x - bubble.radius > canvas.width) {
          bubble.x = -bubble.radius;
        }
        if (bubble.x + bubble.radius < 0) {
          bubble.x = canvas.width + bubble.radius;
        }

        // Draw bubble with gradient
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          0,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `rgba(132, 204, 22, ${bubble.opacity * 0.6})`);
        gradient.addColorStop(0.5, `rgba(8, 145, 178, ${bubble.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(14, 116, 144, ${bubble.opacity * 0.1})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();

        // Bubble outline
        ctx.strokeStyle = `rgba(8, 145, 178, ${bubble.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        return bubble.y > -bubble.radius;
      });

      // Spawn new bubbles if needed
      if (bubblesRef.current.length < bubbleCount * 0.8) {
        const radius = 2 + Math.random() * 8;
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + radius,
          radius,
          speedY: -(0.5 + Math.random() * 1.5),
          speedX: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          targetOpacity: Math.random() * 0.5 + 0.3,
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isClient]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none contain-paint"
    />
  );
};

export default BubbleSystem;
