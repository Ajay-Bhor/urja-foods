import React from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function ChairmanMessage() {
  const { t } = useLanguage();

  return (
    <section className="urja-chairman" id="chairman-message">
      <div className="cm-wrap">
        {/* Section Header */}
        <div className="cm-header">
          <div className="cm-label">
            <i aria-hidden="true"></i>
            <strong>{t('leadershipVision') || 'LEADERSHIP & VISION'}</strong>
          </div>

          <h2>
            Chairman's <em>Message</em>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="cm-grid">
          {/* Left Column: Chairman Portrait & Identity Card */}
          <div className="cm-left">
            <div className="cm-photo">
              <div className="cm-photo-inner">
                <img
                  src="/images/chairman.jpeg"
                  alt="Pramod Anandrao Hinge - Chairman, Urja Foods & Agro"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/male.jpeg';
                  }}
                />
              </div>
            </div>

            <div className="cm-person">
              <div className="cm-person-line" aria-hidden="true"></div>
              <div>
                <h3>Pramod Anandrao Hinge</h3>
                <span>Chairman &amp; Managing Director</span>
                <small style={{ color: '#687766', fontSize: '12px', display: 'block', marginTop: '2px' }}>
                  Urja Foods &amp; Agro Pvt. Ltd.
                </small>
              </div>
            </div>
          </div>

          {/* Right Column: Rebuilt Inspiring Chairman's Letter */}
          <div className="cm-right">
            <div className="cm-message-head">
              <span>{t('messageFromChairman') || 'A MESSAGE FROM THE CHAIRMAN'}</span>
              <h1>
                Building with Purpose.
                <br />
                Growing with <em>Responsibility.</em>
              </h1>
            </div>

            {/* Executive Pull-Quote Highlight */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                background: '#f4f8f1',
                borderLeft: '4px solid #315b38',
                padding: '20px 24px',
                borderRadius: '0 12px 12px 0',
                margin: '0 0 24px',
              }}
            >
              <Quote size={28} color="#315b38" style={{ flexShrink: 0, marginTop: '2px' }} />
              <blockquote
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  fontSize: '18px',
                  lineHeight: 1.55,
                  color: '#173b24',
                  fontStyle: 'italic',
                }}
              >
                “When I look back at Urja's journey, I see the evolution of an idea — to build an organization that contributes meaningfully to the farmers and families who form the foundation of our agricultural system.”
              </blockquote>
            </div>

            {/* Structured Executive Letter Paragraphs */}
            <div className="cm-copy" style={{ color: '#455448', fontSize: '15px', lineHeight: 1.75 }}>
              <p style={{ margin: '0 0 16px' }}>
                My journey began with a simple understanding: farmers need more than just products. They need dependable knowledge, honest quality, and trustworthy partnerships that genuinely elevate their productivity and family income.
              </p>
              <p style={{ margin: '0 0 16px' }}>
                That core philosophy took us from animal nutrition into integrated poultry, and eventually towards an interconnected ecosystem encompassing computerized feed manufacturing, parent breeding, robotic hatcheries, bio-secure farming, and live bird supply. Every stage has reinforced that lasting growth comes from nurturing the entire agribusiness value chain.
              </p>
              <p style={{ margin: '0 0 20px' }}>
                Today, Urja is entering its next phase with sustainable agro-processing, processed foods through Poushtik Chicken, and green environmental initiatives. Our ambition is not simply to be larger — it is to be better equipped, more capable, and ever more responsible to our partner farmers, dedicated employees, and loyal customers.
              </p>
            </div>

            {/* Closing Statement */}
            <div className="cm-closing">
              <div className="cm-closing-accent" aria-hidden="true"></div>
              <div>
                <span>{t('ourContinuingJourney') || 'OUR CONTINUING COMMITMENT'}</span>
                <strong>We have built the foundation.</strong>
                <b>Now, we build what comes next.</b>
              </div>
            </div>

            {/* Official Executive Signature */}
            <div className="cm-signature" style={{ marginTop: '24px' }}>
              <div className="cm-signature-line" aria-hidden="true"></div>
              <div className="cm-signature-text">
                <strong style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#173b24' }}>
                  Pramod Anandrao Hinge
                </strong>
                <span>Chairman</span>
                <small>Urja Foods &amp; Agro Pvt. Ltd.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
