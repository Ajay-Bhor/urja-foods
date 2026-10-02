import React, { useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import HorizontalTimeline from '../components/HorizontalTimeline';
import ChairmanMessage from '../components/ChairmanMessage';
import MissionVision from '../components/MissionVision';
import CoreValues from '../components/CoreValues';
import LeadershipSection from '../components/LeadershipSection';
import InfrastructureSection from '../components/InfrastructureSection';
import WhyChooseUrja from '../components/WhyChooseUrja';
import CertificationsSection from '../components/CertificationsSection';
import { useLanguage } from '../hooks/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page-view" id="main-content">
      {/* 1. Clean, Consistent Page Banner (Replaced dark ATS Hero Banner) */}
      <PageBanner
        badge={t('navAboutOverview') || 'ABOUT URJA FOODS & AGRO'}
        title={t('aboutHeroTitle1') || 'Building with Purpose. Growing with Responsibility.'}
        subtitle={
          t('aboutHeroDesc') ||
          'From animal nutrition to an integrated agriculture, nutrition and food ecosystem.'
        }
        breadcrumb={t('navAbout') || 'About Us'}
      />

      {/* 2. Official Corporate Milestone Journey (Authentic 2004 - Today Milestones) */}
      <div id="our-journey">
        <HorizontalTimeline />
      </div>

      {/* 3. Rebuilt Executive Chairman's Message */}
      <ChairmanMessage />

      {/* 4. Directly Connected Mission & Vision */}
      <MissionVision />

      {/* 5. Foundational Core Values Orbit Grid */}
      <CoreValues />

      {/* 6. Connected Leadership & Management Team */}
      <LeadershipSection />

      {/* 7. Converted Infrastructure Graphics into Text Cards (9 Modern Facilities) */}
      <InfrastructureSection />

      {/* 8. Restructured Why Choose Urja Proposition */}
      <WhyChooseUrja />

      {/* 9. Official Certifications & Regulatory Accreditations */}
      <CertificationsSection />
    </main>
  );
}
