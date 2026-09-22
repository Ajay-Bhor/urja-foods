import React, { useState, useEffect, useRef } from 'react';
import '../styles/preloader.css';

export default function CompanyPreloader() {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const animFrameRef = useRef(null);

  useEffect(() => {
    // 1. Immediately absorb & dismiss inline HTML fallback to avoid double-pop
    const inlinePreloader = document.getElementById('initial-preloader');
    if (inlinePreloader) {
      inlinePreloader.style.opacity = '0';
      setTimeout(() => {
        if (inlinePreloader.parentNode) {
          inlinePreloader.parentNode.removeChild(inlinePreloader);
        }
      }, 150);
    }

    // 2. Lock body scroll during the cinematic presentation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 3. Smooth, cinematic easing progression (0 -> 100%)
    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds balanced, luxurious reveal

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      // Quartic ease-out for ultra-smooth deceleration
      const easedProgress = Math.floor((1 - Math.pow(1 - t, 4)) * 100);
      setProgress(easedProgress);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        setProgress(100);

        // Record that user has experienced the initial loading animation
        try {
          sessionStorage.setItem('urja_preloader_seen', 'true');
        } catch (e) {
          // Ignore private browsing storage restriction
        }

        // Trigger graceful scale & dissolve transition
        setTimeout(() => {
          setIsFadingOut(true);
          document.body.style.overflow = originalOverflow;
        }, 300);

        // Completely unmount after transition completes
        setTimeout(() => {
          setIsMounted(false);
        }, 1000);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!isMounted) return null;

  // Compute dynamic agricultural milestone caption based on percentage
  const getStatusCaption = () => {
    if (progress < 30) return '🌱 Harmonizing Nature & Agriculture...';
    if (progress < 65) return '🌾 Empowering Farmers & Nutrition...';
    if (progress < 92) return '✨ Pure Agro-Nutrition Ecosystem...';
    return '🚀 Welcome to Urja Foods';
  };

  return (
    <div
      className={`urja-company-preloader-overlay ${isFadingOut ? 'is-fading-out' : ''}`}
      aria-label="Loading Urja Foods & Agro"
      role="status"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="urja-preloader-ambient-glow" aria-hidden="true" />
      <div className="urja-preloader-ambient-glow secondary" aria-hidden="true" />

      {/* Floating Organic Golden-Green Particles */}
      <div className="urja-preloader-particle p1" aria-hidden="true" />
      <div className="urja-preloader-particle p2" aria-hidden="true" />
      <div className="urja-preloader-particle p3" aria-hidden="true" />
      <div className="urja-preloader-particle p4" aria-hidden="true" />
      <div className="urja-preloader-particle p5" aria-hidden="true" />
      <div className="urja-preloader-particle p6" aria-hidden="true" />

      <div className="urja-preloader-content-box">
        
        {/* Animated Multi-Ring Agro-Cycle Orbit Visual */}
        <div className="urja-preloader-hero-visual">
          
          {/* Concentric Rotating & Breathing Rings */}
          <div className="urja-orbit-concentric-ring outer-orbit" aria-hidden="true" />
          <div className="urja-orbit-concentric-ring inner-pulse" aria-hidden="true" />

          {/* Pulsing Radar Waves */}
          <div className="urja-radar-wave w1" aria-hidden="true" />
          <div className="urja-radar-wave w2" aria-hidden="true" />

          {/* Central Elevated Logo Badge with Specular Gloss Sweep */}
          <div className="urja-preloader-logo-ring">
            <div className="urja-logo-inner-wrap">
              <img
                src="/logo.png"
                alt="Urja Foods & Agro Pvt. Ltd."
                className="urja-preloader-logo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/urja-foods.png';
                }}
              />
              {/* Brilliant Specular Light Beam Traveling Across Logo */}
              <div className="urja-logo-gloss-sweep" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Shimmering Brand Meta & Dynamic Stage Caption */}
        <div className="urja-preloader-brand-meta">
          <span className="urja-preloader-overline">URJA FOODS &amp; AGRO PVT. LTD.</span>
          <p className="urja-preloader-tagline">From Feed to Food • Pure Agro-Nutrition</p>
          <div className="urja-preloader-status-caption">
            <span key={getStatusCaption()}>{getStatusCaption()}</span>
          </div>
        </div>

        {/* Glowing Progress Bar with Leading Radiant Bead */}
        <div className="urja-preloader-progress-track">
          <div
            className="urja-preloader-progress-fill"
            style={{ width: `${progress}%` }}
          >
            <span className="urja-progress-leading-bead" />
          </div>
        </div>

        {/* Numeric Percentage Counter with Live Status Indicator */}
        <div className="urja-preloader-counter-row">
          <span className="urja-preloader-percent-badge">{progress}%</span>
          <span className="urja-preloader-status-dot" />
        </div>

      </div>
    </div>
  );
}
