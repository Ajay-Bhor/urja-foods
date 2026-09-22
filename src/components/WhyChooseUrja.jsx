import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function WhyChooseUrja() {
  const { t } = useLanguage();

  return (
    <section className="urja-why-final-section" id="why-choose-urja">
      <div className="urja-why-final-container">
        {/* Top Row: Title & Philosophy Intro */}
        <div className="urja-why-final-top">
          <div className="urja-why-final-heading">
            <span className="urja-why-final-label">{t('whyOverline')}</span>
            <h2>
              {t('whyTitle1')}<br />
              <span>{t('whyTitle2')}</span>
            </h2>
          </div>

          <div className="urja-why-final-intro">
            <p>
              {t('whyIntro')}
            </p>
          </div>
        </div>

        {/* Main Area: Image & Narrative */}
        <div className="urja-why-final-main">
          {/* Authentic Imagery */}
          <div className="urja-why-final-image">
            <img
              src="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/2148214270.jpg"
              alt="Agriculture and farming at Urja"
              loading="lazy"
            />
          </div>

          {/* Bullet Points Content */}
          <div className="urja-why-final-content">
            <div className="urja-why-bullet-list">
              <div className="urja-why-bullet-item">
                <div className="urja-why-bullet-dot">
                  <CheckCircle2 size={19} />
                </div>
                <div>
                  <strong>{t('whyBullet1Title')}</strong> {t('whyBullet1Desc')}
                </div>
              </div>

              <div className="urja-why-bullet-item">
                <div className="urja-why-bullet-dot">
                  <CheckCircle2 size={19} />
                </div>
                <div>
                  <strong>{t('whyBullet2Title')}</strong> {t('whyBullet2Desc')}
                </div>
              </div>

              <div className="urja-why-bullet-item">
                <div className="urja-why-bullet-dot">
                  <CheckCircle2 size={19} />
                </div>
                <div>
                  <strong>{t('whyBullet3Title')}</strong> {t('whyBullet3Desc')}
                </div>
              </div>

              <div className="urja-why-bullet-item">
                <div className="urja-why-bullet-dot">
                  <CheckCircle2 size={19} />
                </div>
                <div>
                  <strong>{t('whyBullet4Title')}</strong> {t('whyBullet4Desc')}
                </div>
              </div>
            </div>

            {/* Closing Statement with High-Contrast Shaded Highlights */}
            <div className="urja-why-final-closing">
              <div className="urja-why-shade-quote-mark" aria-hidden="true">
                “
              </div>
              <div className="urja-why-shade-body">
                <p className="urja-why-shade-primary">
                  {t('whyQuote1')}{' '}
                  <span className="urja-why-shade-badge">
                    {t('whyQuoteHighlight')}
                  </span>
                </p>

                <div className="urja-why-shade-secondary">
                  <span className="urja-why-secondary-text">
                    {t('whyQuote2')}
                  </span>
                  <span className="urja-why-source-badge">
                    {t('whyQuoteBadge')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
