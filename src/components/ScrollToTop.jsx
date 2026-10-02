import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Enhanced Scroll & Content Restoration Engine
 * - On New Page Navigation ('PUSH'): Resets scroll smoothly to top (or anchor hash).
 * - On Browser Back/Forward ('POP'): Automatically restores exact scroll position,
 *   re-triggers content reveal, and ensures ZERO blank or unloaded content.
 */
export default function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType(); // 'POP', 'PUSH', or 'REPLACE'

  // In-memory cache for ultra-fast scroll restoration during current session
  const scrollMapRef = useRef(new Map());
  const isPopNavRef = useRef(false);

  // Set browser's native scroll restoration to manual so our engine has 100% control
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Synchronously and continuously track scroll position
  useEffect(() => {
    const recordPosition = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      if (location.key) {
        scrollMapRef.current.set(location.key, currentY);
        try { sessionStorage.setItem(`urja_pos_${location.key}`, currentY.toString()); } catch {}
      }
      if (location.pathname) {
        scrollMapRef.current.set(location.pathname, currentY);
        try { sessionStorage.setItem(`urja_pos_${location.pathname}`, currentY.toString()); } catch {}
      }
    };

    let scrollRaf;
    const handleScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(recordPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      recordPosition(); // Synchronously capture exact position before route changes!
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(scrollRaf);
    };
  }, [location.key, location.pathname]);

  // Reveal all animated content immediately on navigation/restoration
  const revealPageContent = () => {
    if (typeof document !== 'undefined') {
      document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach((el) => {
        el.classList.add('is-visible');
      });
      document.body.style.overflow = '';
    }
  };

  useLayoutEffect(() => {
    const isPop = navType === 'POP';
    isPopNavRef.current = isPop;

    // Immediately ensure content is revealed
    revealPageContent();

    // 1. ANCHOR HASH NAVIGATION (e.g. #ecosystem, #businesses, #our-journey, #contact-cta)
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const scrollToHashElement = (attempt = 0) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (attempt < 8) {
          setTimeout(() => scrollToHashElement(attempt + 1), 50);
        }
      };
      scrollToHashElement();
      return;
    }

    // 2. BROWSER BACK / FORWARD NAVIGATION ('POP')
    if (isPop) {
      // Look up saved position by history key or pathname
      let targetY = 0;
      if (location.key && scrollMapRef.current.has(location.key)) {
        targetY = scrollMapRef.current.get(location.key);
      } else if (scrollMapRef.current.has(location.pathname)) {
        targetY = scrollMapRef.current.get(location.pathname);
      } else {
        try {
          const storedKey = sessionStorage.getItem(`urja_pos_${location.key}`);
          const storedPath = sessionStorage.getItem(`urja_pos_${location.pathname}`);
          if (storedKey) targetY = parseInt(storedKey, 10);
          else if (storedPath) targetY = parseInt(storedPath, 10);
        } catch {}
      }

      // Progressively restore scroll position as DOM layout paints
      let attempts = 0;
      const maxAttempts = 8;
      const interval = 40; // check every 40ms up to 320ms

      const tryScroll = () => {
        attempts++;
        if (targetY > 0) {
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
          if (document.documentElement) document.documentElement.scrollTop = targetY;
          if (document.body) document.body.scrollTop = targetY;
        }
        revealPageContent();

        const currentY = window.scrollY || window.pageYOffset || 0;
        if (attempts < maxAttempts && (targetY > 0 && Math.abs(currentY - targetY) > 5)) {
          setTimeout(tryScroll, interval);
        } else {
          window.dispatchEvent(new Event('resize'));
          window.dispatchEvent(new Event('scroll'));
          window.dispatchEvent(new CustomEvent('urja:route-restored', { detail: { targetY, pathname: location.pathname } }));
        }
      };

      tryScroll();
      const rafId = requestAnimationFrame(tryScroll);
      return () => cancelAnimationFrame(rafId);
    }

    // 3. NEW PAGE NAVIGATION ('PUSH' / 'REPLACE')
    // Smooth/instant reset to top (0, 0)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    // Reset inner scroll containers if any
    const scrollContainers = document.querySelectorAll(
      '.app-layout, .workday-main-outlet, .page-transition-container, .careers-redesign, .wd-main-container, main'
    );
    scrollContainers.forEach((el) => {
      if (el && el.scrollTop) el.scrollTop = 0;
    });

    const pushFrame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      revealPageContent();
    });

    return () => cancelAnimationFrame(pushFrame);
  }, [location.pathname, location.search, location.key, location.hash, navType]);

  // Handle browser Back/Forward Cache (bfcache) pageshow event
  useEffect(() => {
    const handlePageShow = (event) => {
      revealPageContent();
      document.body.style.overflow = '';
      window.dispatchEvent(new Event('resize'));
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', revealPageContent);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', revealPageContent);
    };
  }, []);

  return null;
}
