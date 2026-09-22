import React, { useState } from 'react';

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      num: '01',
      name: 'Rajesh Kumar',
      role: 'Poultry Farmer',
      initial: 'R',
      text: 'Urja has built a strong and dependable ecosystem around farmers and poultry operations. Their focus on quality, technical support and long-term relationships makes working with them a positive experience.',
    },
    {
      num: '02',
      name: 'Sanjay Prasad',
      role: 'Business Partner',
      initial: 'S',
      text: 'The team understands the complete value chain, from nutrition and feed to farming and food. Their integrated approach gives partners confidence and helps build sustainable business relationships.',
    },
    {
      num: '03',
      name: 'Amit Singh',
      role: 'Channel Partner',
      initial: 'A',
      text: 'What stands out about Urja is its commitment to responsible growth. The combination of modern infrastructure, technical expertise and farmer partnerships creates a strong foundation for the future.',
    },
  ];

  return (
    <section className="urja-testimonials" id="testimonials">
      <div className="urja-testimonials-container">
        {/* Section Header */}
        <div className="urja-testimonials-header">
          <div>
            <span className="urja-testimonials-label">TESTIMONIALS</span>
            <h2>
              What our partners<br />
              <span>say about Urja.</span>
            </h2>
          </div>

          <p>
            Strong relationships are at the heart of our business. We work closely with farmers, customers and partners to create long-term value across the agricultural ecosystem.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="urja-testimonials-grid">
          {testimonials.map((item, idx) => (
            <div className="urja-testimonial-card" key={idx} id={`testimonial-card-${idx}`}>
              <div className="urja-testimonial-top">
                <span className="urja-testimonial-number">{item.num}</span>
                <span className="urja-quote">“</span>
              </div>

              <div className="urja-stars">★ ★ ★ ★ ★</div>

              <p className="urja-testimonial-text">{item.text}</p>

              <div className="urja-testimonial-person">
                <div className="urja-person-initial">{item.initial}</div>
                <div>
                  <h3>{item.name}</h3>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
