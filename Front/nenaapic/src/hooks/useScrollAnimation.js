import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 *
 * Usage:
 *   const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
 *   <div ref={ref} className={isVisible ? 'animate-slide-up' : 'opacity-0'}>
 */
const useScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return [ref, isVisible];
};

export default useScrollAnimation;
