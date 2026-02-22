
import React, { useState } from 'react';
import { BREEDER_CONTACT_EMAIL } from '../constants';
import { sendEmail } from '../services/emailService';

interface WaitlistPageProps {
  onBackToHome: () => void;
}

const WaitlistPage: React.FC<WaitlistPageProps> = ({ onBackToHome }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    timeline: 'Within 3 Months',
    preference: 'No Preference',
    gender: 'No Preference',
    aboutHome: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    await sendEmail({
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone,
      timeline: formData.timeline,
      gender_pref: formData.gender,
      color_pref: formData.preference,
      home_details: formData.aboutHome,
      subject: `New Waitlist Application: ${formData.firstName} ${formData.lastName}`
    });
    
    setTimeout(() => {
      setStatus('success');
      window.scrollTo(0, 0);
    }, 1000);
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-24 px-4">
        <div className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl p-12 md:p-20 text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
          <h1 className="text-4xl font-black text-slate-900 mb-6">Application Received!</h1>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">Thank you for applying to the Pawsome Pomsky waitlist. We will review your home details and reach out via email within 2-3 business days.</p>
          <button onClick={onBackToHome} className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-500 transition-all shadow-xl">Return to Homepage</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-teal-900 text-white py-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10">
          <button onClick={onBackToHome} className="mb-8 inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors group font-black uppercase tracking-widest text-xs"><svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>Back to Home</button>
          <h1 className="text-6xl font-black mb-6">Join the Waitlist</h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-80 text-xl leading-relaxed">Begin the journey of bringing home a Pawsome companion. Our waitlist ensures you get first choice of our upcoming boutique litters.</p>
        </div>
      </header>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
              <div className="bg-teal-50 p-10 border-b border-teal-100">
                <div className="flex flex-wrap gap-8 items-center justify-center md:justify-between">
                  <div className="flex items-center gap-3"><span className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">1</span><span className="font-black text-teal-900 uppercase tracking-widest text-xs">Apply</span></div>
                  <div className="w-12 h-px bg-teal-200 hidden md:block"></div>
                  <div className="flex items-center gap-3 opacity-40"><span className="w-10 h-10 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center font-bold">2</span><span className="font-black text-slate-900 uppercase tracking-widest text-xs">Review</span></div>
                  <div className="w-12 h-px bg-teal-200 hidden md:block"></div>
                  <div className="flex items-center gap-3 opacity-40"><span className="w-10 h-10 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center font-bold">3</span><span className="font-black text-slate-900 uppercase tracking-widest text-xs">Secure Spot</span></div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-10 md:p-16 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3"><span className="w-1.5 h-8 bg-teal-600 rounded-full"></span>Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">First Name</label><input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Jane" /></div>
                    <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Last Name</label><input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Doe" /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Email Address</label><input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="jane@example.com" /></div>
                    <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Phone Number</label><input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="(555) 000-0000" /></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3"><span className="w-1.5 h-8 bg-teal-600 rounded-full"></span>Puppy Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Timeline</label><select value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})} className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"><option>Immediate</option><option>Within 3 Months</option><option>Next 6-12 Months</option></select></div>
                    <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Gender</label><select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"><option>No Preference</option><option>Male</option><option>Female</option></select></div>
                    <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">Color</label><select value={formData.preference} onChange={(e) => setFormData({...formData, preference: e.target.value})} className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"><option>No Preference</option><option>Silver/Grey & White</option><option>Black & White</option></select></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3"><span className="w-1.5 h-8 bg-teal-600 rounded-full"></span>About Your Home</h3>
                  <div><label className="block text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">About You</label><textarea required rows={4} value={formData.aboutHome} onChange={(e) => setFormData({...formData, aboutHome: e.target.value})} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Do you have other pets? Fenced yard?" /></div>
                </div>
                <div className="pt-10"><button type="submit" disabled={status === 'submitting'} className={`w-full py-8 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs transition-all shadow-2xl ${status === 'submitting' ? 'bg-slate-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/30'}`}>{status === 'submitting' ? 'Sending...' : 'Submit Waitlist Application'}</button></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaitlistPage;
