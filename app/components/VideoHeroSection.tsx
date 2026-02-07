'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface VideoHeroProps {
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    href: string;
  };
  overlayColor?: string;
  videoType?: 'bubbles' | 'underwater' | 'coral';
}

const VideoHeroSection = ({
  title,
  subtitle,
  cta,
  overlayColor = 'from-ocean-900/60 to-ocean-900/30',
  videoType = 'underwater',
}: VideoHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Array<any>>([]);

  useEffect(() => {
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

    // Initialize particles based on video type
    const initializeParticles = () => {
      particlesRef.current = [];
      
      if (videoType === 'bubbles') {
        for (let i = 0; i < 50; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            speedY: Math.random() * 0.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.2,
            wobble: Math.random() * Math.PI * 2,
          });
        }
      } else if (videoType === 'underwater') {
        for (let i = 0; i < 80; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedY: Math.random() * 0.3 + 0.05,
            speedX: Math.sin(i) * 0.2,
            opacity: Math.random() * 0.3 + 0.1,
            size: Math.random() * 2 + 1,
            drift: Math.random() * Math.PI * 2,
          });
        }
      } else if (videoType === 'coral') {
        for (let i = 0; i < 40; i++) {
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 6 + 2,
            opacity: Math.random() * 0.5 + 0.15,
            hue: Math.random() * 30 - 15,
          });
        }
      }
    };

    initializeParticles();

    // Animation loop
    let time = 0;
    const animate = () => {
      time++;

      // Create gradient background simulating water
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f766e');
      gradient.addColorStop(0.5, '#155e75');
      gradient.addColorStop(1, '#0f2f3f');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated light rays
      if (videoType !== 'coral') {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          const offset = (time * 0.5 + i * 100) % canvas.width;
          ctx.beginPath();
          ctx.moveTo(offset, -50);
          ctx.quadraticCurveTo(offset + 50, canvas.height / 2, offset, canvas.height + 50);
          ctx.stroke();
        }
      }

      // Update and draw particles
      particlesRef.current.forEach((particle, idx) => {
        if (videoType === 'bubbles') {
          particle.y -= particle.speedY;
          particle.x += particle.speedX + Math.sin(particle.wobble + time * 0.02) * 0.3;
          particle.wobble += 0.02;

          if (particle.y < -particle.radius) {
            particle.y = canvas.height + particle.radius;
            particle.x = Math.random() * canvas.width;
          }

          // Draw bubble
          const grad = ctx.createRadialGradient(
            particle.x - particle.radius * 0.3,
            particle.y - particle.radius * 0.3,
            0,
            particle.x,
            particle.y,
            particle.radius
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * 0.8})`);
          grad.addColorStop(0.5, `rgba(20, 184, 166, ${particle.opacity * 0.3})`);
          grad.addColorStop(1, `rgba(8, 145, 178, ${particle.opacity * 0.05})`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(255, 255, 255, ${particle.opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (videoType === 'underwater') {
          particle.y -= particle.speedY;
          particle.x += Math.sin(particle.drift + time * 0.01) * particle.speedX;
          particle.opacity += (Math.random() - 0.5) * 0.02;

          if (particle.y < -10) {
            particle.y = canvas.height + 10;
            particle.x = Math.random() * canvas.width;
          }

          ctx.fillStyle = `rgba(200, 240, 255, ${Math.max(0, particle.opacity)})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (videoType === 'coral') {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vx += (Math.random() - 0.5) * 0.05;
          particle.vy += (Math.random() - 0.5) * 0.05;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          const hue = 15 + particle.hue;
          ctx.fillStyle = `hsla(${hue}, 80%, 50%, ${particle.opacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [videoType]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none contain-paint"
      />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${overlayColor} z-5`} />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl">
          <motion.p
            variants={item}
            className="text-cyan-300 text-sm md:text-base font-medium uppercase tracking-widest mb-4"
          >
            Premium Aquatic Care
          </motion.p>
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-xl text-gray-100 mb-8 max-w-lg">
            {subtitle}
          </motion.p>

          {cta && (
            <motion.div variants={item} className="flex gap-4 flex-wrap">
              <a href={cta.href}>
                <motion.button
                  className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(20, 184, 166, 0.6)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cta.text}
                </motion.button>
              </a>
              <motion.button
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Browse Catalog
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-white text-sm text-center">
          <p className="mb-2">Scroll to explore</p>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoHeroSection;
