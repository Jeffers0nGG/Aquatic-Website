import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useCustomHooks';

const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const particles = useRef([]);
    const mouse = useRef({ x: -100, y: -100 });
    const isActive = useRef(false);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const maxParticles = 120;
        const emissionRate = 2; // Particles per frame on move

        // Resize handling
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
            isActive.current = true;

            // Emit particles on move
            for (let i = 0; i < emissionRate; i++) {
                if (particles.current.length < maxParticles) {
                    createParticle(mouse.current.x, mouse.current.y);
                }
            }
        };

        // Only track in this container (top of page)
        const container = containerRef.current;
        if (container) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        // Particle factory
        const createParticle = (x, y) => {
            // Random spread around cursor
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;

            particles.current.push({
                x: x + offsetX,
                y: y + offsetY,
                vx: (Math.random() - 0.5) * 0.5, // Slight sideways wobble
                vy: -(Math.random() * 0.5 + 0.2), // Upward drift
                size: Math.random() * 1.5 + 0.5,
                life: 1, // 1.0 to 0.0
                decay: Math.random() * 0.015 + 0.005, // Life decay rate
                color: Math.random() > 0.5 ? '200, 230, 255' : '167, 139, 250' // Cyan-ish or Violet-ish
            });
        };

        // Animation loop
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Reset active state if no recent mouse move? 
            // Actually we just want them to fade out, loop runs always but effectively does nothing if no particles

            if (particles.current.length > 0) {
                for (let i = particles.current.length - 1; i >= 0; i--) {
                    const p = particles.current[i];

                    // Update
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vx += Math.sin(p.y * 0.1) * 0.02; // Wobbly path
                    p.life -= p.decay;

                    // Draw
                    if (p.life > 0) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.6})`;
                        ctx.fill();
                    } else {
                        // Remove dead particle
                        particles.current.splice(i, 1);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [prefersReducedMotion]);

    if (prefersReducedMotion) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none hidden md:block">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

export default ParticleCanvas;
