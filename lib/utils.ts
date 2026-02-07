import { useRef, useEffect } from 'react';

/**
 * Utility functions for common operations
 */

/**
 * Debounce function to limit function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Format price to USD currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Interpolate between two values
 */
export const lerp = (start: number, end: number, t: number): number => {
  return start + (end - start) * t;
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
};

/**
 * Get scroll progress (0 to 1)
 */
export const getScrollProgress = (): number => {
  const windowHeight = document.documentElement.clientHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  return Math.min(window.scrollY / documentHeight, 1);
};

/**
 * Parallax offset calculation
 */
export const getParallaxOffset = (scrollY: number, speed: number = 0.5): number => {
  return scrollY * speed;
};

export default {
  debounce,
  throttle,
  formatPrice,
  clamp,
  lerp,
  isInViewport,
  getScrollProgress,
  getParallaxOffset,
};
