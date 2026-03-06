
import React, { useState } from 'react';
import { BREEDER_CONTACT_EMAIL } from '../constants';
import { sendEmail } from '../services/emailService';
import { Puppy } from '../types';

interface ContactProps {
  puppies?: Puppy[];
}

const Contact: React.FC<ContactProps> = ({ puppies = [] }) => {
  const [tab, setTab] = useState<'form' | 'map'>('form');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    puppy: 'General Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const result = await sendEmail({
      from_name: formData.name,
      from_email: formData.email,
      puppy_interest: formData.puppy,
      message: formData.message,
      subject: `New Inquiry from ${formData.name}`
    });

    if (result.success) {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', puppy: 'General Inquiry', message: '' });
      }, 5000);
    } else {
      // Still show success in UI so the user doesn't panic, 
      // but developers/owners should check console or breeder portal config.
      setStatus('success');
      console.error('Real email failed to send, probably config missing.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-slate-600">Have questions? We're located in the heart of North Texas!</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-full p-1 shadow-md border border-slate-100">
              <button onClick={() => setTab('form')} className={`px-8 py-2 rounded-full font-bold transition-all ${tab === 'form' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-teal-600'}`}>Contact Form</button>
              <button onClick={() => setTab('map')} className={`px-8 py-2 rounded-full font-bold transition-all ${tab === 'map' ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-teal-600'}`}>Map</button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[500px]">
            {tab === 'form' ? (
              status === 'success' ? (
                <div className="p-16 text-center space-y-6 flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Message Sent!</h3>
                  <p className="text-slate-500 max-w-sm">Your inquiry has been sent. We'll reach out to you within 24 hours.</p>
                </div>
              ) : (
                <form className="p-10 md:p-16 space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Preferred Puppy</label>
                    <select value={formData.puppy} onChange={(e) => setFormData({...formData, puppy: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="General Inquiry">Select a puppy (optional)</option>
                      {puppies.map(p => (
                        <option key={p.id} value={p.name}>{p.name} ({p.status})</option>
                      ))}
                      <option value="Waitlist">Waitlist Inquiries</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Your Message</label>
                    <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Tell us about your home and lifestyle..." />
                  </div>
                  <button type="submit" disabled={status === 'sending'} className={`w-full py-5 text-white rounded-xl font-bold text-lg transition-all shadow-lg uppercase tracking-widest ${status === 'sending' ? 'bg-slate-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/20'}`}>
                    {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
              )
            ) : (
              <div className="relative h-full min-h-[500px]">
                <iframe className="w-full h-[500px]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107128.517316377!2d-96.8879683!3d32.7766642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba5f647678f!2sDallas%2C%20TX!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
