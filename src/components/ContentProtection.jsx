import React, { useEffect, useState, useRef } from 'react';
import '../styles/protection.css';

/**
 * ContentProtection Component
 * Comprehensive multi-layer protection against:
 * 1. Screenshots (PrintScreen key capture, clipboard wipe)
 * 2. Snipping tools & external screen capture (window blur protection shield)
 * 3. Right-click context menu (Save image as, inspect)
 * 4. Developer Tools shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U)
 * 5. Page printing & PDF export (Ctrl+P, @media print)
 * 6. Image dragging and unauthorized text copying
 */
export default function ContentProtection() {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [shieldActive, setShieldActive] = useState(false);
  const toastTimeoutRef = useRef(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2800);
  };

  useEffect(() => {
    // 1. Block Context Menu (Right Click)
    const handleContextMenu = (e) => {
      e.preventDefault();
      triggerToast('Right-click is protected on this website.');
      return false;
    };

    // 2. Block Keyboard Shortcuts & Intercept PrintScreen
    const handleKeyDown = (e) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const key = e.key;

      // PrintScreen key
      if (key === 'PrintScreen' || e.keyCode === 44) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText('Protected Content • Urja Foods & Agro Pvt. Ltd.')
            .catch(() => {});
        }
        triggerToast('⚠️ Screenshots are protected on this website.');
      }

      // F12 (Developer Tools)
      if (key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        triggerToast('Developer inspection is disabled.');
        return false;
      }

      // Ctrl+Shift+I / Cmd+Opt+I (Inspect)
      // Ctrl+Shift+J / Cmd+Opt+J (Console)
      // Ctrl+Shift+C (Inspect Element)
      if (
        isCtrlOrMeta &&
        e.shiftKey &&
        (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c')
      ) {
        e.preventDefault();
        triggerToast('Inspection tools are disabled.');
        return false;
      }

      // Ctrl+U (View Source)
      if (isCtrlOrMeta && (key === 'u' || key === 'U')) {
        e.preventDefault();
        triggerToast('Viewing source code is disabled.');
        return false;
      }

      // Ctrl+S (Save Page)
      if (isCtrlOrMeta && (key === 's' || key === 'S')) {
        e.preventDefault();
        triggerToast('Page saving is disabled.');
        return false;
      }

      // Ctrl+P (Print Page)
      if (isCtrlOrMeta && (key === 'p' || key === 'P')) {
        e.preventDefault();
        triggerToast('Page printing and export is protected.');
        return false;
      }
    };

    // Keyup check for PrintScreen
    const handleKeyUp = (e) => {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText('Protected Content • Urja Foods & Agro Pvt. Ltd.')
            .catch(() => {});
        }
        triggerToast('⚠️ Screenshots are protected on this website.');
      }
    };

    // 3. Prevent Copy / Cut outside legitimate input elements
    const handleCopy = (e) => {
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable);

      if (!isInput) {
        e.preventDefault();
        triggerToast('Content copying is protected.');
      }
    };

    // 4. Prevent Dragging Images
    const handleDragStart = (e) => {
      if (e.target && e.target.nodeName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // 5. Anti-Snipping Tool Protection (Shield on Window Blur)
    // Only activate for desktop external capture, never during navigation, on touch devices, or popstate
    const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const handleWindowBlur = () => {
      // Do not block mobile devices or history navigation
      if (isTouchDevice) return;
      // Only shield if document is genuinely hidden/blurred
      setShieldActive(true);
    };

    const handleWindowFocus = () => {
      setShieldActive(false);
      document.body.style.overflow = '';
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!isTouchDevice) setShieldActive(true);
      } else {
        setShieldActive(false);
        document.body.style.overflow = '';
      }
    };

    // History Back/Forward Navigation & Restore Safeguards: ALWAYS dismiss shield
    const handleNavigationRestore = () => {
      setShieldActive(false);
      document.body.style.overflow = '';
    };

    // User interaction immediately dismisses shield
    const handleUserInteraction = () => {
      setShieldActive(false);
    };

    // Attach listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('popstate', handleNavigationRestore);
    window.addEventListener('pageshow', handleNavigationRestore);
    window.addEventListener('mousemove', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('popstate', handleNavigationRestore);
      window.removeEventListener('pageshow', handleNavigationRestore);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* Privacy Shield during Snipping Tool or Window Blur */}
      <div
        className={`urja-screen-protect-shield ${shieldActive ? 'active' : ''}`}
        aria-hidden={!shieldActive}
      >
        <div className="urja-protect-badge">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>PROTECTED CONTENT • URJA FOODS &amp; AGRO</span>
        </div>
        <p className="urja-protect-sub">
          Screen capture and recording are disabled for proprietary content protection.
        </p>
      </div>

      {/* Security Toast Notification */}
      <div
        className={`urja-screenshot-toast ${showToast ? 'show' : ''}`}
        role="alert"
        aria-live="assertive"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="#4ade80"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>{toastMessage}</span>
      </div>
    </>
  );
}
