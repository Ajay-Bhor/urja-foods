import React from 'react';

export default function CertificationsSection() {
  const certifications = [
    {
      num: '01',
      category: 'Certified Under',
      name: 'FSSAI',
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 7l21 9v15c0 13-8 21-21 26C19 52 11 44 11 31V16l21-9z" />
          <path d="M22 32l7 7 14-15" />
        </svg>
      ),
    },
    {
      num: '02',
      category: 'Certified Under',
      name: 'BIS',
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="23" />
          <path d="M21 32h22" />
          <path d="M32 21v22" />
        </svg>
      ),
    },
    {
      num: '03',
      category: 'Certified Under',
      name: 'NOP Organic Certification',
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 55C19 47 13 37 15 21c7 1 13 4 17 9 4-5 10-8 17-9 2 16-4 26-17 34z" />
          <path d="M32 54V29" />
        </svg>
      ),
    },
    {
      num: '04',
      category: 'Certified Under',
      name: 'Ecocert Organic Certification',
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 54C21 47 15 38 17 22c8 1 14 5 15 12 1-7 7-11 15-12 2 16-4 25-15 32z" />
          <path d="M32 54V30" />
        </svg>
      ),
    },
    {
      num: '05',
      category: 'Certified Under',
      name: 'Factory License',
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M9 54h46" />
          <path d="M14 54V25l12 7V25l12 7V20l12 7v27" />
          <path d="M22 40h5" />
          <path d="M37 40h5" />
          <path d="M22 47h5" />
          <path d="M37 47h5" />
        </svg>
      ),
    },
    {
      num: '06',
      category: 'Registration',
      name: 'M2 Registration',
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="13" y="10" width="38" height="44" rx="3" />
          <path d="M21 22h22" />
          <path d="M21 31h22" />
          <path d="M21 40h12" />
        </svg>
      ),
    },
    {
      num: '07',
      category: 'Compliance',
      name: 'MPCP Compliance',
      icon: (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="23" />
          <path d="M22 33l7 7 14-16" />
        </svg>
      ),
    },
  ];

  return (
    <section className="urja-certifications" id="certifications">
      <div className="ucert-container">
        {/* Section Header */}
        <div className="ucert-header">
          <div className="ucert-heading">
            <span className="ucert-eyebrow">TRUST • QUALITY • COMPLIANCE</span>
            <h2>
              Certifications &amp;
              <span>Accreditations</span>
            </h2>
          </div>

          <div className="ucert-intro">
            <p>
              Licensed and compliant manufacturing facility operating under recognized regulatory and quality standards.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="ucert-main">
          {/* Left Statement Card with Background Image */}
          <div className="ucert-statement">
            <div
              className="ucert-statement-image"
              style={{ backgroundImage: `url('/images/certifications-bg.jpg')` }}
              aria-hidden="true"
            ></div>
            <div className="ucert-statement-overlay" aria-hidden="true"></div>

            <div className="ucert-statement-content">
              <span>RECOGNIZED STANDARDS</span>
              <h3>
                Built on
                <strong>Compliance.</strong>
              </h3>
              <p>
                Strong focus on traceability, quality assurance, feed safety, and process compliance standards.
              </p>
            </div>
          </div>

          {/* Right Certifications List */}
          <div className="ucert-list">
            {certifications.map((item) => (
              <div className="ucert-item" key={item.num}>
                <div className="ucert-item-number">{item.num}</div>
                <div className="ucert-icon">{item.icon}</div>
                <div className="ucert-name">
                  <span>{item.category}</span>
                  <h4>{item.name}</h4>
                </div>
                <div className="ucert-arrow" aria-hidden="true">
                  ↗
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Quality Assurance Strip */}
        <div className="ucert-quality">
          <div className="ucert-quality-mark">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 7l21 9v15c0 13-8 21-21 26C19 52 11 44 11 31V16l21-9z" />
              <path d="M21 32l7 7 15-16" />
            </svg>
          </div>

          <div className="ucert-quality-text">
            <span>OUR FOCUS</span>
            <p>
              Traceability
              <b>•</b>
              Quality Assurance
              <b>•</b>
              Feed Safety
              <b>•</b>
              Process Compliance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
