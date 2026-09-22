import React from 'react';

export default function ChairmanMessage() {
  return (
    <section className="urja-chairman" id="chairman-message">
      <div className="cm-wrap">
        {/* Section Header */}
        <div className="cm-header">
          <div className="cm-label">
            <i aria-hidden="true"></i>
            <strong>LEADERSHIP</strong>
          </div>

          <h2>
            Chairman's <em>Message</em>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="cm-grid">
          {/* Left Column: Chairman Portrait & Identity */}
          <div className="cm-left">
            <div className="cm-photo">
              <div className="cm-photo-inner">
                <img
                  src="/images/chairman.jpeg"
                  alt="Pramod Anandrao Hinge - Chairman"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/male.jpeg';
                  }}
                />
              </div>
            </div>

            <div className="cm-person">
              <div className="cm-person-line" aria-hidden="true"></div>
              <div>
                <h3>Pramod Anandrao Hinge</h3>
                <span>Chairman</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inspiring Chairman's Letter */}
          <div className="cm-right">
            <div className="cm-message-head">
              <span>A MESSAGE FROM THE CHAIRMAN</span>
              <h1>
                Building with Purpose.
                <br />
                Growing with <em>Responsibility.</em>
              </h1>
            </div>

            <div className="cm-copy">
              <p>
                When I look back at Urja's journey, I see more than the growth of a business. I see the evolution of an idea—to build an organisation that can contribute meaningfully to the people who form the foundation of our food and agricultural system. My journey began with a simple understanding: farmers need more than products. They need reliable knowledge, dependable partnerships and solutions that genuinely improve their productivity and income. That belief took us from animal nutrition into poultry, and eventually towards an integrated model encompassing feed manufacturing, breeding, hatcheries, farming and live bird supply. Every stage of this journey has taught us that sustainable growth comes from understanding the entire ecosystem rather than focusing on a single part of it. Today, Urja is entering its next phase. We are building on this foundation through animal nutrition, processed chicken, soya processing, sustainable agriculture and consumer-focused food products. Our ambition is not simply to become bigger. It is to become better equipped, more capable and more responsible as we grow. We will continue to invest in technology, infrastructure and people, while remaining grounded in the values that brought us here—honesty, teamwork, continuous learning and the courage to find a way forward. The opportunities ahead are significant, but so is our responsibility. To our farmers, employees, customers, partners and everyone who has been part of the Urja journey—thank you for your trust.
              </p>
            </div>

            {/* Closing Statement */}
            <div className="cm-closing">
              <div className="cm-closing-accent" aria-hidden="true"></div>
              <div>
                <span>OUR CONTINUING JOURNEY</span>
                <strong>We have built the foundation.</strong>
                <b>Now, we build what comes next.</b>
              </div>
            </div>

            {/* Official Signature */}
            <div className="cm-signature">
              <div className="cm-signature-line" aria-hidden="true"></div>
              <div className="cm-signature-text">
                <strong>Pramod Anandrao Hinge</strong>
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
