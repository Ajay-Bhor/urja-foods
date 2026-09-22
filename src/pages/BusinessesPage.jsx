import React, { useEffect } from 'react';
import BusinessesHero from '../components/BusinessesHero';
import BusinessPortfolioGrid from '../components/BusinessPortfolioGrid';
import IntegratedValueChain from '../components/IntegratedValueChain';
import SharedStrength from '../components/SharedStrength';

export default function BusinessesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="businesses-page-view" id="main-content">
      {/* 1. Hero Section */}
      <BusinessesHero />

      {/* 2. Five Businesses Portfolio Grid */}
      <BusinessPortfolioGrid />

      {/* 3. Integrated Value Chain 5-Step Flow */}
      <IntegratedValueChain />

      {/* 4. Shared Values & Collective Strength */}
      <SharedStrength />
    </main>
  );
}
