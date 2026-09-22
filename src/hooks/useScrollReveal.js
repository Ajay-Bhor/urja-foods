import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * Automatically attaches an IntersectionObserver to elements with `.animate-on-scroll`
 * and applies `.is-visible` when they enter the viewport.
 * Includes safety timeout so NO element is ever stuck invisible.
 */
export default function useScrollReveal(dependency) {
  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');

    elements.forEach((el) => observer.observe(el));

    // Safety timeout: ensure all content becomes visible even if observer fails or doesn't intersect
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 1200);

    return () => {
      clearTimeout(timer);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [dependency]);
}
