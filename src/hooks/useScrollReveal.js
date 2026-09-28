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

    // Immediately reveal elements that are already in/near the viewport
    const viewportHeight = window.innerHeight || 800;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewportHeight + 100 && rect.bottom >= -50) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    // Safety timeout: ensure all content becomes visible quickly
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
        el.classList.add('is-visible');
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [dependency]);
}
