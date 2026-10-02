import { useEffect } from 'react';

/**
 * Global helper to immediately reveal all scroll-animated content
 * Ensures zero blank or invisible elements during back/forward navigation.
 */
export function revealAllContent() {
  if (typeof document !== 'undefined') {
    document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
      el.classList.add('is-visible');
    });
  }
}

/**
 * useScrollReveal Hook
 * Automatically attaches an IntersectionObserver to elements with `.animate-on-scroll`
 * and applies `.is-visible` when they enter the viewport.
 * Resilient against history navigation: immediately reveals all content on popstate / restore.
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
      rootMargin: '100px 0px 100px 0px',
      threshold: 0.02,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.animate-on-scroll:not(.is-visible)');

    // Immediately reveal elements that are already in/near the viewport
    const viewportHeight = window.innerHeight || 800;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= viewportHeight + 150 && rect.bottom >= -100) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    // Rapid safety timeout: ensure all content becomes visible quickly
    const timer = setTimeout(() => {
      revealAllContent();
    }, 100);

    // Listen for history restore events
    const handleRestore = () => {
      revealAllContent();
    };

    window.addEventListener('popstate', handleRestore);
    window.addEventListener('pageshow', handleRestore);
    window.addEventListener('urja:route-restored', handleRestore);

    return () => {
      clearTimeout(timer);
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      window.removeEventListener('popstate', handleRestore);
      window.removeEventListener('pageshow', handleRestore);
      window.removeEventListener('urja:route-restored', handleRestore);
    };
  }, [dependency]);
}
