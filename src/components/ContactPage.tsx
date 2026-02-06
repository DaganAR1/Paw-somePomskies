
import React, { useState } from 'react';
import { BREEDER_CONTACT_EMAIL, SOCIAL_LINKS, BREEDER_PHONE } from '../constants';

interface ContactPageProps {
  onBackToHome: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBackToHome }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'General Question',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate sending email to placeholder
    console.log(`Sending Dedicated Page Contact Form data to ${BREEDER_CONTACT_EMAIL}`);
    console.table(formData);

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', type: 'General Question', message: '' });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-teal-900 text-white py-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={onBackToHome}
            className="mb-8 inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-6xl font-black mb-6">Connect With Us</h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-80 text-xl leading-relaxed">
            Ready to add a Pawsome Pomsky to your family? Our team is here to guide you through every step.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-2 bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-12 md:p-16">
              {status === 'success' ? (
                <div className="py-24 text-center space-y-8 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shadow-inner">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h2 className="text-4xl font-black text-slate-900">Inquiry Funneled!</h2>
                  <p className="text-slate-500 text-lg max-w-md">Your message has been sent to our breeder dashboard at <span className="text-teal-600 font-bold">{BREEDER_CONTACT_EMAIL}</span>. Thank you for your interest!</p>
                  <button onClick={() => setStatus('idle')} className="text-teal-600 font-bold uppercase tracking-widest text-sm hover:underline">Send another message</button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-slate-900 mb-8">Send an Inquiry</h2>
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Full Name</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium" 
                          placeholder="Jane Doe" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Email Address</label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium" 
                          placeholder="jane@example.com" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Inquiry Type</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Available Puppy Inquiry">Available Puppy Inquiry</option>
                        <option value="Join the Waitlist">Join the Waitlist</option>
                        <option value="Schedule a Visit">Schedule a Visit</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Your Message</label>
                      <textarea 
                        required
                        rows={6} 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium" 
                        placeholder="Tell us about your home and why you're looking for a Pomsky..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'sending'}
                      className={`w-full py-6 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all shadow-xl ${
                        status === 'sending' ? 'bg-slate-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/20'
                      }`}
                    >
                      {status === 'sending' ? 'Sending...' : 'Submit Inquiry'}
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="space-y-8">
              <div className="bg-teal-900 text-white rounded-[3rem] p-12 shadow-2xl">
                <h3 className="text-2xl font-black mb-6">Contact Info</h3>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-800 rounded-2xl flex items-center justify-center shrink-0 text-xl">📍</div>
                    <div>
                      <p className="font-bold text-teal-400 text-xs uppercase tracking-widest mb-1">Location</p>
                      <p className="text-lg">Frisco, North Texas</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-800 rounded-2xl flex items-center justify-center shrink-0 text-xl">📱</div>
                    <div>
                      <p className="font-bold text-teal-400 text-xs uppercase tracking-widest mb-1">Phone</p>
                      <p className="text-lg">{BREEDER_PHONE}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-800 rounded-2xl flex items-center justify-center shrink-0 text-xl">✉️</div>
                    <div>
                      <p className="font-bold text-teal-400 text-xs uppercase tracking-widest mb-1">Email</p>
                      <p className="text-lg break-all">{BREEDER_CONTACT_EMAIL}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal-800 rounded-2xl flex items-center justify-center shrink-0 text-xl">📸</div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-teal-400 text-xs uppercase tracking-widest mb-1">Social</p>
                      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-teal-300 transition-colors">Instagram</a>
                      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-teal-300 transition-colors">Facebook</a>
                      <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-lg hover:text-teal-300 transition-colors">TikTok</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-xl text-center">
                <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">💬</div>
                <h4 className="font-black text-slate-900 text-xl mb-2">Live Chat</h4>
                <p className="text-slate-500 text-sm mb-6">Our AI Assistant is available 24/7 for quick answers!</p>
                <button className="text-teal-600 font-bold uppercase tracking-widest text-xs hover:underline">Open Chat Assistant</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
