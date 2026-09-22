import React from 'react';

export default function MissionVision() {
  return (
    <section className="urja-mv-section" id="mission-vision">
      <div className="urja-mv-container">
        {/* Mission Card */}
        <div className="urja-mv-card">
          <div className="urja-mv-card-header">
            <div className="urja-mv-icon mission-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3V21" />
                <path d="M3 12H21" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>

            <div>
              <span className="urja-mv-label">WHAT DRIVES US</span>
              <h2>Our Mission</h2>
            </div>
          </div>

          <div className="urja-mv-content">
            <h3>
              To provide stable financial income to Indian farmers through continuous innovation, honesty and teamwork.
            </h3>

            <p>
              We work to create better opportunities for farmers through stronger products, better practices and long-term partnerships.
            </p>
          </div>
        </div>

        {/* Vision Card */}
        <div className="urja-mv-card">
          <div className="urja-mv-card-header">
            <div className="urja-mv-icon vision-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>

            <div>
              <span className="urja-mv-label">WHERE WE ARE GOING</span>
              <h2>Our Vision</h2>
            </div>
          </div>

          <div className="urja-mv-content">
            <h3>
              To be a part of every Indian kitchen — directly or indirectly.
            </h3>

            <p>
              Whether it is through the food we produce, the nutrition we provide, the animals we support, or the crops grown with our agricultural solutions, our vision is to create an ecosystem that touches the everyday lives of people across India.
            </p>

            <p>
              From feed to farm, farm to food, and food to the family table, we aim to build businesses that connect different parts of India's agricultural and food ecosystem.
            </p>

            <div className="urja-mv-highlight">
              One Vision. Every Indian Kitchen.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
