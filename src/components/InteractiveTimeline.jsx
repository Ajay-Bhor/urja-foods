import React, { useState } from 'react';

const MILESTONES = [
  {
    year: '2015',
    label: 'Foundation',
    title: 'Regional Agribusiness Foundation',
    desc: 'Established core operations in Nirgudsar, Pune district, launching transparent direct partnerships with dairy farmers and scientific cattle feed rations.',
    image: '/company-plant.jpg',
    tagBg: '#ecfccb',
    tagColor: '#365314',
    accentColor: '#74ad29',
  },
  {
    year: '2017',
    label: 'Automation',
    title: 'Automated Feed Pelleting Plant',
    desc: 'Commissioned high-precision steam-pelleting lines, introducing Urja Pashu Aahar formulations with bypass-protein and fat technologies.',
    image: '/company.jpg',
    tagBg: '#ccfbf1',
    tagColor: '#115e59',
    accentColor: '#0d9488',
  },
  {
    year: '2018',
    label: 'European Tech',
    title: "Maharashtra's 1st European EC Shed",
    desc: 'Pioneered European Environment-Controlled (EC) poultry sheds in Western Maharashtra, reducing flock mortality below 1% through automated climate ventilation.',
    image: '/company-plant.jpg',
    tagBg: '#e0f2fe',
    tagColor: '#075985',
    accentColor: '#0284c7',
  },
  {
    year: '2020',
    label: 'Capacity Scale',
    title: 'New Manufacturing Facility',
    desc: 'Established a state-of-the-art manufacturing facility to strengthen our production capabilities and meet growing demand.',
    image: '/company.jpg',
    tagBg: '#ffedd5',
    tagColor: '#9a3412',
    accentColor: '#f58220',
  },
  {
    year: '2022',
    label: 'Hatchery Network',
    title: 'Automated Commercial Hatchery',
    desc: 'Integrated robotic single-stage incubators and in-ovo vaccination protocols, enhancing chick vigor and guaranteeing direct buyback security.',
    image: '/company-plant.jpg',
    tagBg: '#fef3c7',
    tagColor: '#92400e',
    accentColor: '#d97706',
  },
  {
    year: '2024',
    label: '150 TPD Scale',
    title: '150 TPD Scale & Retail Expansion',
    desc: 'Reached 150 metric tonnes per day computerized milling capacity while launching Chicken Feast antibiotic-free farm-to-table retail outlets.',
    image: '/company.jpg',
    tagBg: '#dcfce7',
    tagColor: '#166534',
    accentColor: '#16a34a',
  },
  {
    year: '2025',
    label: 'Future Horizons',
    title: 'Smart Farm Telemetry & Sustainability',
    desc: 'Deploying real-time IoT climate automation, precision feed monitoring, and circular bio-fertilizer programs empowering over 10,000 partner families.',
    image: '/company-plant.jpg',
    tagBg: '#f3e8ff',
    tagColor: '#581c87',
    accentColor: '#8b5cf6',
  },
];

export default function InteractiveTimeline() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className="hover-timeline-container"
      onMouseLeave={() => setHoveredIndex(null)}
      role="region"
      aria-label="Company History Timeline"
    >
      {/* Main Single Horizontal Timeline Bar */}
      <div 
        className="hover-timeline-stage"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Track Line with dynamic glowing fill */}
        <div className="hover-timeline-line">
          <div 
            className="hover-timeline-progress"
            style={{ 
              width: hoveredIndex !== null ? `${(hoveredIndex / (MILESTONES.length - 1)) * 100}%` : '0%',
              background: hoveredIndex !== null 
                ? `linear-gradient(90deg, #74ad29 0%, ${MILESTONES[hoveredIndex].accentColor} 100%)`
                : 'transparent',
              boxShadow: hoveredIndex !== null
                ? `0 0 14px ${MILESTONES[hoveredIndex].accentColor}90`
                : 'none'
            }}
          />
        </div>

        {/* 7 Milestone Years Row */}
        <div className="hover-timeline-nodes">
          {MILESTONES.map((item, idx) => {
            const isActive = hoveredIndex === idx;
            const isPassed = hoveredIndex !== null && idx <= hoveredIndex;

            // Smart alignment class for popup positioning
            let alignClass = 'popup-align-center';
            if (idx === 0) alignClass = 'popup-align-left';
            else if (idx === 1) alignClass = 'popup-align-left-mid';
            else if (idx === MILESTONES.length - 2) alignClass = 'popup-align-right-mid';
            else if (idx === MILESTONES.length - 1) alignClass = 'popup-align-right';

            return (
              <div
                key={item.year}
                className={`hover-node-slot ${isActive ? 'is-active' : ''} ${isPassed ? 'is-passed' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onTouchStart={() => setHoveredIndex(idx)}
              >
                {/* ========================================================
                    AUTOMATIC POPUP INFORMATION WINDOW (OPENS ON HOVER)
                    ======================================================== */}
                {isActive && (
                  <div
                    className={`hover-timeline-popup ${alignClass}`}
                    role="tooltip"
                    aria-live="polite"
                    style={{ 
                      borderColor: `${item.accentColor}44`,
                      boxShadow: `0 24px 48px -12px rgba(15, 23, 42, 0.16), 0 8px 24px -6px ${item.accentColor}25`
                    }}
                  >
                    {/* Top Accent Gradient Bar */}
                    <div 
                      className="hover-popup-accent-bar" 
                      style={{ background: `linear-gradient(90deg, ${item.accentColor} 0%, #f58220 100%)` }}
                    />

                    {/* Directional Arrow Pointer toward active circular marker */}
                    <div 
                      className="hover-popup-pointer" 
                      style={{ borderColor: `${item.accentColor}33` }}
                    />

                    {/* Popup Window Content */}
                    <div className="hover-popup-inner">
                      {/* Header Row: Year + Category Pill */}
                      <div className="hover-popup-header">
                        <div 
                          className="hover-popup-year"
                          style={{ 
                            background: `linear-gradient(135deg, #0f172a 20%, ${item.accentColor} 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}
                        >
                          {item.year}
                        </div>
                        <span 
                          className="hover-popup-tag"
                          style={{ backgroundColor: item.tagBg, color: item.tagColor }}
                        >
                          {item.label}
                        </span>
                      </div>

                      {/* Milestone Title */}
                      <h4 className="hover-popup-title">{item.title}</h4>

                      {/* Relevant Company Image */}
                      <div className="hover-popup-media">
                        <img
                          src={item.image}
                          alt={`${item.year} - ${item.title}`}
                          className="hover-popup-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/company-plant.jpg';
                          }}
                        />
                        <div 
                          className="hover-popup-media-badge"
                          style={{ backgroundColor: `${item.accentColor}ee` }}
                        >
                          Urja Milestone
                        </div>
                      </div>

                      {/* Description Quote */}
                      <p 
                        className="hover-popup-desc"
                        style={{ borderLeftColor: item.accentColor }}
                      >
                        “{item.desc}”
                      </p>
                    </div>
                  </div>
                )}

                {/* Circular Milestone Marker on the Line */}
                <div className="hover-marker-wrapper">
                  <div 
                    className="hover-marker-circle"
                    style={
                      isActive 
                        ? {
                            background: `linear-gradient(135deg, ${item.accentColor} 0%, #f58220 100%)`,
                            borderColor: '#ffffff',
                            boxShadow: `0 0 0 3px #ffffff, 0 0 0 6px ${item.accentColor}44, 0 8px 20px ${item.accentColor}55`
                          }
                        : isPassed 
                          ? {
                              borderColor: item.accentColor,
                              backgroundColor: '#ffffff'
                            }
                          : {}
                    }
                  >
                    {isPassed && !isActive && (
                      <div 
                        className="hover-marker-inner-dot"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    )}
                  </div>
                </div>

                {/* Year Number Display (Not a button or link) */}
                <div 
                  className="hover-node-year"
                  style={isActive ? { color: item.accentColor, transform: 'translateY(-2px)' } : {}}
                >
                  {item.year}
                </div>

                {/* Small Milestone Label */}
                <div 
                  className="hover-node-label"
                  style={isActive ? { color: item.accentColor, fontWeight: 700 } : {}}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
