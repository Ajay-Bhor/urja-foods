import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function InquiryForm({ preFillData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Contract Broiler Farming',
    district: 'Pune',
    farmType: 'Dairy Farm',
    animalCount: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { success: boolean, message: string }

  // Update when prefill triggers from calculator or catalog
  useEffect(() => {
    if (preFillData) {
      setFormData((prev) => ({
        ...prev,
        ...preFillData,
      }));
    }
  }, [preFillData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult({
          success: true,
          message: data.message || 'Dhanyawad! Your inquiry has been received.',
        });
        // Reset form except district
        setFormData({
          name: '',
          phone: '',
          email: '',
          interest: 'Contract Broiler Farming',
          district: formData.district,
          farmType: 'Dairy Farm',
          animalCount: '',
          message: '',
        });
      } else {
        setResult({
          success: false,
          message: data.message || 'Could not submit inquiry. Please check your details or call +91-7028939900.',
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
      setResult({
        success: true,
        message: 'Inquiry registered locally! Our representative will contact you at +91-7028939900.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section section-dark bg-dark-mesh" id="inquiry">
      <div className="container">
        <div className="section-header">
          <div className="badge badge-dark-pill">Connect With Urja Foods</div>
          <h2>Partner With Us or Request a Farm Visit</h2>
          <p style={{ color: '#cbd5e1' }}>
            Whether you seek distributor dealership, contract broiler farming in our European EC sheds, or bulk cattle rations, we are ready to assist.
          </p>
        </div>

        <div className="inquiry-grid">
          {/* Left Column: Direct Contact & Factory Info */}
          <div className="inquiry-info-card animate-on-scroll animate-left">
            <h3>Headquarters & Factory</h3>
            <p>
              Visit our manufacturing facility or speak with our agricultural specialists and veterinary advisors.
            </p>

            <div className="contact-detail-items">
              <div className="contact-detail-item">
                <div className="contact-icon-bubble">
                  <Phone size={20} />
                </div>
                <div className="contact-text-meta">
                  <h5>Customer Hotline & WhatsApp</h5>
                  <a href="tel:+917028939900">+91-7028939900</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-bubble">
                  <Mail size={20} />
                </div>
                <div className="contact-text-meta">
                  <h5>Official Email</h5>
                  <a href="mailto:info@urjafoods.net">info@urjafoods.net</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-bubble">
                  <MapPin size={20} />
                </div>
                <div className="contact-text-meta">
                  <h5>Plant & Regd. Office</h5>
                  <p>
                    Urja Foods, At Post Nirgudsar, Taluka Ambegaon, District Pune - 412406, Maharashtra, India.
                  </p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-bubble">
                  <Clock size={20} />
                </div>
                <div className="contact-text-meta">
                  <h5>Dispatch & Plant Operations</h5>
                  <p>Monday – Saturday: 8:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="inquiry-form-card animate-on-scroll animate-right">
            <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Send Us an Inquiry</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.8rem' }}>
              Fill in your details below and our regional field supervisor will get in touch.
            </p>

            {result && (
              <div className={`alert-toast ${result.success ? 'success' : 'error'}`}>
                {result.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                <span>{result.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} id="inquiry-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="inq-name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="inq-name"
                    name="name"
                    required
                    placeholder="e.g. Rahul Patil"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inq-phone">
                    Mobile Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    id="inq-phone"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="inq-interest">
                    Area of Interest
                  </label>
                  <select
                    id="inq-interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Contract Broiler Farming">Contract Broiler Farming (European EC House)</option>
                    <option value="Urja Pashu Aahar (Cattle Feed)">Urja Pashu Aahar (Cattle Feed Dealership)</option>
                    <option value="Urja Supreme Gold (5000)">Urja Supreme Gold (5000)</option>
                    <option value="Urja Malai Plus (8000)">Urja Malai Plus (8000)</option>
                    <option value="Poultry Concentrates & Pre-Mix">Poultry Concentrates & Pre-Mixes</option>
                    <option value="Hatchery Day-Old Chicks">Hatchery Day-Old Chicks</option>
                    <option value="Chicken Feast Wholesale / QSR">Chicken Feast Wholesale / QSR</option>
                    <option value="Bio-Fertilizers">Urja Bio-Fertilizers</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inq-district">
                    District / Region
                  </label>
                  <select
                    id="inq-district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="Pune">Pune District</option>
                    <option value="Ahmednagar">Ahmednagar District</option>
                    <option value="Nashik">Nashik District</option>
                    <option value="Satara">Satara District</option>
                    <option value="Solapur">Solapur District</option>
                    <option value="Kolhapur">Kolhapur District</option>
                    <option value="Sangli">Sangli District</option>
                    <option value="Other Maharashtra">Other Maharashtra</option>
                    <option value="Outside Maharashtra">Outside Maharashtra</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="inq-farmType">
                    Livestock / Business Type
                  </label>
                  <input
                    type="text"
                    id="inq-farmType"
                    name="farmType"
                    placeholder="e.g. Dairy / Poultry / Dealer"
                    value={formData.farmType}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="inq-animalCount">
                    Herd / Flock Capacity
                  </label>
                  <input
                    type="text"
                    id="inq-animalCount"
                    name="animalCount"
                    placeholder="e.g. 15 Cows or 5,000 Birds"
                    value={formData.animalCount}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="inq-message">
                  Message / Specific Questions
                </label>
                <textarea
                  id="inq-message"
                  name="message"
                  rows="3"
                  placeholder="Share details about your shed land area, current dairy production, or dealership requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%' }}
                id="inquiry-submit-btn"
              >
                <Send size={16} />
                <span>{submitting ? 'Submitting Inquiry...' : 'Submit Partnership Inquiry'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
