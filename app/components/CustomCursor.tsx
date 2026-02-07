'use client';

import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

const CustomCursor = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const animationRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      // Update main cursor position
      containerRef.current.style.left = `${x}px`;
      containerRef.current.style.top = `${y}px`;

      // Add trail point
      trailRef.current.push({ x, y, age: 0 });
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }

      // Check if hovering over interactive element
      const target = document.elementFromPoint(x, y) as HTMLElement;
      const isInteractive =
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.classList.contains('interactive') ||
        !!target?.closest('button') ||
        !!target?.closest('a');
      setIsPointer(isInteractive);
    };

    const handleMouseEnter = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop for trail
    const animate = () => {
      trailRef.current.forEach((point) => {
        point.age += 1;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <>
      <style>{`
        body {
          cursor: none;
        }
      `}</style>
      <div
        ref={containerRef}
        className="fixed pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          translate: '-50% -50%',
          opacity: 0,
        }}
      >
        {/* Main cursor */}
        <div
          className={`relative w-4 h-4 border-2 border-teal-500 rounded-full transition-all duration-150 ${
            isPointer ? 'scale-150 border-coral-500' : 'scale-100'
          }`}
          style={{
            boxShadow: isPointer
              ? '0 0 15px rgba(255, 107, 84, 0.6)'
              : '0 0 10px rgba(20, 184, 166, 0.4)',
          }}
        />
        {/* Inner dot */}
        <div
          className={`absolute w-1 h-1 bg-teal-500 rounded-full top-1/2 left-1/2 transition-all duration-150 ${
            isPointer ? 'bg-coral-500' : 'bg-teal-500'
          }`}
          style={{
            translate: '-50% -50%',
            opacity: 0.8,
          }}
        />
        {/* Trail bubbles */}
        {trailRef.current.map((point, idx) => {
          const opacity = 1 - point.age / 20;
          const size = 2 - (point.age / 20) * 2;
          return (
            <div
              key={idx}
              className="absolute rounded-full bg-teal-400 pointer-events-none"
              style={{
                left: point.x,
                top: point.y,
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default CustomCursor;
