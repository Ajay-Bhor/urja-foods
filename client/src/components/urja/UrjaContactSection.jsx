import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaContactSection({ initialInquiryType = 'Cattle Feed / Pashu Aahar' }) {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    inquiryType: initialInquiryType || 'Cattle Feed / Pashu Aahar',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseStatus, setResponseStatus] = useState({ type: null, message: '', inquiryId: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      const errorMsg = language === 'en'
        ? 'Please provide Name and Contact Number.'
        : language === 'hi'
        ? 'कृपया अपना नाम और संपर्क नंबर भरें।'
        : 'कृपया आपले नाव आणि संपर्क क्रमांक भरा.';

      setResponseStatus({
        type: 'error',
        message: errorMsg
      });
      return;
    }

    setIsSubmitting(true);
    setResponseStatus({ type: null, message: '', inquiryId: '' });

    try {
      const res = await fetch('/api/urja/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setResponseStatus({
          type: 'success',
          message: data.message,
          inquiryId: data.inquiryId
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          location: '',
          inquiryType: 'Cattle Feed / Pashu Aahar',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Request submission failed.');
      }
    } catch (err) {
      setResponseStatus({
        type: 'error',
        message: `Submission error: ${err.message}. Direct helpline: +91-7028939900.`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#fafaf8] border-b border-stone-200/80 relative overflow-hidden text-left">
      {/* Dynamic Ambient Blur Spots */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-harvest-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
          
          {/* Left Column: Direct Contact Details & Plant Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.contact.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              {t.contact.title}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.contact.desc}
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 pt-2">
              
              {/* Phone Card */}
              <a
                href="tel:+917028939900"
                className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-sm flex items-start gap-4 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-3.5 rounded-2xl bg-emerald-700 text-white group-hover:scale-110 transition-transform shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block font-mono">
                    {t.contact.helplineTitle}
                  </span>
                  <span className="text-xl font-black text-stone-900 font-mono group-hover:text-emerald-700 transition-colors">
                    +91-7028939900
                  </span>
                  <span className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{t.contact.helplineTiming}</span>
                  </span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:info@urjafoods.net"
                className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-sm flex items-start gap-4 hover:border-harvest-400 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-3.5 rounded-2xl bg-harvest-500 text-white group-hover:scale-110 transition-transform shadow-md">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block font-mono">
                    {t.contact.emailTitle}
                  </span>
                  <span className="text-lg font-black text-stone-900 font-mono group-hover:text-harvest-600 transition-colors">
                    info@urjafoods.net
                  </span>
                  <span className="text-xs text-stone-500 block mt-1">{t.contact.emailSub}</span>
                </div>
              </a>

              {/* Plant & Factory Address Card */}
              <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-sm flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-stone-900 text-white shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-harvest-400" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-bold uppercase tracking-wider block font-mono">
                    {t.contact.addressTitle}
                  </span>
                  <span className="text-base font-black text-stone-900 leading-snug block mt-0.5">
                    Urja Foods & Agro Pvt. Ltd.
                  </span>
                  <span className="text-xs text-stone-600 mt-1 block leading-relaxed">
                    {t.contact.addressText}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Modern Glassmorphic Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-6">
                <div>
                  <h3 className="text-2xl font-black text-stone-900">
                    {t.contact.formTitle}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {t.contact.formDesc}
                  </p>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>

              {/* Status Alert */}
              {responseStatus.type && (
                <div
                  className={`p-4 rounded-2xl mb-6 flex items-start gap-3 text-sm ${
                    responseStatus.type === 'success'
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border border-rose-300 text-rose-950'
                  }`}
                >
                  {responseStatus.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-700 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold">{responseStatus.message}</p>
                    {responseStatus.inquiryId && (
                      <p className="text-xs font-mono text-emerald-800 mt-1 font-bold">
                        Ref ID: {responseStatus.inquiryId} (Saved directly in MySQL)
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      {t.contact.labels.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'e.g. Rahul Patil' : 'उदा. राहुल पाटील'}
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      {t.contact.labels.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98XXXXXXXX"
                      required
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      {t.contact.labels.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      {t.contact.labels.location}
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'e.g. Ambegaon, Pune' : 'उदा. आंबेगाव, पुणे'}
                      className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    {t.contact.labels.category}
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-300 text-stone-900 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm transition-all font-medium cursor-pointer"
                  >
                    {t.contact.categories.map((cat, i) => (
                      <option key={i} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                    {t.contact.labels.message}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      language === 'en'
                        ? 'e.g. Inquiring about 50 bags of Urja Supreme Gold or dealership terms...'
                        : 'उदा. मला ५० बॅग उर्जा सुप्रीम गोल्ड हवे आहे किंवा डीलरशिपसाठी माहिती हवी आहे...'
                    }
                    className="w-full px-4 py-3 rounded-2xl bg-stone-50/80 border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white text-sm transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-shine w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white font-black text-sm shadow-xl shadow-emerald-700/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 disabled:opacity-75 group"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>{isMarathi ? 'माहिती जतन होत आहे...' : 'Saving to Database & Notifying Urja Team...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>{t.contact.labels.submit}</span>
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

