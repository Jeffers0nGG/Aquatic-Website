/**
 * Animation utilities and constants
 */

export const EASING = {
  smooth: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
} as const;

export const TRANSITION = {
  default: { duration: 0.6, ease: EASING.smooth },
  fast: { duration: 0.3, ease: EASING.smooth },
  slow: { duration: 0.9, ease: EASING.smooth },
} as const;

export const ANIMATION_DELAY = {
  stagger: 0.1,
  paragraph: 0.3,
} as const;

/**
 * Hover effects
 */
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.4, ease: EASING.easeOut },
};

export const hoverElevation = {
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  transition: { duration: 0.3 },
};

/**
 * Scroll animations
 */
export const scrollReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: EASING.smooth,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Page transitions
 */
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};
