import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../hooks/useCustomHooks';

const UnderwaterBackground = ({ mousePosition = { x: 0, y: 0 } }) => {
    const canvasRef = useRef(null);
    const prefersReducedMotion = useReducedMotion();
    const [introComplete, setIntroComplete] = useState(false);

    // Intro sequence timing
    useEffect(() => {
        if (prefersReducedMotion) {
            setIntroComplete(true);
            return;
        }

        const timer = setTimeout(() => {
            setIntroComplete(true);
        }, 3500); // 3.5s intro duration

        return () => clearTimeout(timer);
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let rays = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                // Start randomly for idle loop, or specific if needed
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.2 - 0.1;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.opacity = Math.random() * 0.2 + 0.05;
            }

            update(introFactor = 1) {
                this.x += this.speedX * introFactor;
                this.y += this.speedY * introFactor;

                // Subtle parallax
                const parallaxX = (mousePosition.x / window.innerWidth - 0.5) * 0.2;
                const parallaxY = (mousePosition.y / window.innerHeight - 0.5) * 0.2;
                this.x += parallaxX;
                this.y += parallaxY;

                if (this.y > canvas.height + 10) this.y = -10;
                if (this.y < -10) this.y = canvas.height + 10;
                if (this.x > canvas.width + 10) this.x = -10;
                if (this.x < -10) this.x = canvas.width + 10;
            }

            draw(alphaMultiplier = 1) {
                ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity * alphaMultiplier})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Ray class
        class Ray {
            constructor() {
                this.reset();
            }

            reset() {
                this.angle = -Math.PI / 4;
                this.width = Math.random() * 100 + 50;
                this.x = Math.random() * (canvas.width * 1.5) - canvas.width * 0.2;
                this.speed = Math.random() * 0.002 + 0.001;
                this.opacity = Math.random() * 0.03 + 0.01;
                this.oscillationSpeed = Math.random() * 0.002;
                this.phase = Math.random() * Math.PI * 2;
            }

            update(time) {
                this.currentX = this.x + Math.sin(time * this.oscillationSpeed + this.phase) * 50;
            }

            draw(alphaMultiplier = 1) {
                ctx.save();
                ctx.translate(this.currentX, 0);
                ctx.rotate(this.angle);

                const gradient = ctx.createLinearGradient(0, 0, this.width, 0);
                gradient.addColorStop(0, 'rgba(34, 211, 238, 0)');
                gradient.addColorStop(0.5, `rgba(34, 211, 238, ${this.opacity * alphaMultiplier})`);
                gradient.addColorStop(1, 'rgba(34, 211, 238, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(-1000, 0, canvas.height * 2, this.width);
                ctx.restore();
            }
        }

        // Initialize
        for (let i = 0; i < 60; i++) particles.push(new Particle());
        for (let i = 0; i < 5; i++) rays.push(new Ray());

        let startTime = Date.now();
        const animate = () => {
            const currentTime = Date.now() - startTime;

            // Intro fade in for canvas elements
            const progress = Math.min(currentTime / 3500, 1);
            // Ease in the opacity of canvas elements
            const alphaMultiplier = introComplete ? 1 : Math.pow(progress, 2);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            rays.forEach(ray => {
                ray.update(currentTime);
                ray.draw(alphaMultiplier);
            });

            particles.forEach(particle => {
                particle.update();
                particle.draw(alphaMultiplier);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mousePosition, prefersReducedMotion]);

    // Reduced motion
    if (prefersReducedMotion) {
        return (
            <div className="fixed inset-0 -z-30 bg-navy-950">
                <div className="absolute inset-0 bg-gradient-ocean opacity-100"></div>
            </div>
        );
    }

    return (
        <>
            {/* 1. Base Dark Background */}
            <div className="fixed inset-0 -z-50 bg-navy-950" />

            {/* 2. Gradient Sweep Animation */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1, backgroundPosition: '0% 50%' }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    backgroundPosition: ['0% 50%', '100% 50%']
                }}
                transition={{
                    duration: 3.5,
                    ease: "easeInOut",
                    backgroundPosition: {
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                    }
                }}
                className="fixed inset-0 -z-40 bg-gradient-ocean bg-[length:200%_200%]"
                style={{ willChange: 'transform, opacity, background-position' }}
            />

            {/* 3. Noise Overlay */}
            <div className="bg-noise" />

            {/* 4. Canvas Layer (Particles & Rays) - Managed by useEffect */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-20 pointer-events-none"
                style={{ opacity: 0.8 }}
            />

            {/* 5. Vignette Revealing */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="fixed inset-0 -z-10 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(13, 26, 66, 0.5) 100%)'
                }}
            />

            {/* 6. Light Caustics (Subtle sliding texture) */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 0.4, x: 0 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="fixed inset-0 -z-20 pointer-events-none mix-blend-overlay"
                style={{
                    background: 'linear-gradient(45deg, transparent 40%, rgba(34, 211, 238, 0.1) 50%, transparent 60%)',
                    backgroundSize: '200% 200%',
                }}
            />
        </>
    );
};

export default UnderwaterBackground;
