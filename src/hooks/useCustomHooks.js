import { useState, useEffect, useRef } from 'react';

// Hook for intersection observer (scroll animations)
export const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                // Once in view, stop observing (one-time animation)
                if (options.once !== false) {
                    observer.unobserve(entry.target);
                }
            } else if (options.once === false) {
                setIsInView(false);
            }
        }, {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px',
        });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.threshold, options.rootMargin, options.once]);

    return [ref, isInView];
};

// Hook for scroll progress
export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / scrollHeight) * 100;
            setProgress(progress);
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return progress;
};

// Hook for detecting scroll direction and position
export const useScroll = () => {
    const [scrollData, setScrollData] = useState({
        scrollY: 0,
        scrollDirection: 'up',
        isAtTop: true,
    });

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollData = () => {
            const scrollY = window.pageYOffset;
            const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
            const isAtTop = scrollY < 50;

            setScrollData({
                scrollY,
                scrollDirection,
                isAtTop,
            });

            lastScrollY = scrollY;
        };

        window.addEventListener('scroll', updateScrollData, { passive: true });
        updateScrollData();

        return () => window.removeEventListener('scroll', updateScrollData);
    }, []);

    return scrollData;
};

// Hook for window size
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

// Hook for mouse position (parallax effect)
export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return mousePosition;
};

// Hook for lazy loading images
export const useLazyLoad = (imageSrc) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (!imageSrc) {
            setIsError(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = new Image();
                        img.src = imageSrc;
                        img.onload = () => {
                            setIsLoaded(true);
                            if (imgRef.current) {
                                imgRef.current.src = imageSrc;
                            }
                        };
                        img.onerror = () => {
                            setIsError(true);
                        };
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.01 }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [imageSrc]);

    return { imgRef, isLoaded, isError };
};

// Hook for detecting reduced motion preference
export const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
};

// Hook for managing body scroll lock (for modals)
export const useBodyScrollLock = (isLocked) => {
    useEffect(() => {
        if (isLocked) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isLocked]);
};
