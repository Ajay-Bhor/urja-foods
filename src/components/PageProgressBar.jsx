import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial page render if desired, or animate it too
    setVisible(true);
    setProgress(28);

    const timer1 = setTimeout(() => {
      setProgress(68);
    }, 90);

    const timer2 = setTimeout(() => {
      setProgress(92);
    }, 220);

    const timer3 = setTimeout(() => {
      setProgress(100);
    }, 380);

    const timer4 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [location.pathname, location.search]);

  if (!visible && progress === 0) return null;

  return (
    <>
      {/* Top glowing progress bar */}
      <div
        className="page-loader-progress-bar"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Subtle top-right loading badge */}
      {visible && progress < 100 && (
        <div className="page-loader-spinner-wrap" aria-live="polite">
          <div className="page-loader-spinner" />
          <span className="page-loader-text">Loading</span>
        </div>
      )}
    </>
  );
}
