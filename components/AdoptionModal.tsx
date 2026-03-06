
import React, { useState, useEffect } from 'react';
import { sendEmail } from '../services/emailService';

interface AdoptionModalProps {
  logo: string;
  isOpen: boolean;
  onClose: () => void;
  initialPuppy?: string;
}

const AdoptionModal: React.FC<AdoptionModalProps> = ({ logo, isOpen, onClose, initialPuppy }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dogPreference: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialPuppy) {
      setFormData(prev => ({ ...prev, dogPreference: initialPuppy }));
    }
  }, [initialPuppy]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await sendEmail({
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      puppy_interest: formData.dogPreference,
      subject: `Adoption Application for ${formData.dogPreference}`
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', phone: '', dogPreference: '' });
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-teal-950/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-teal-600 px-8 py-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <img src={logo} alt="Modal Logo" className="w-full h-full object-contain" />
             </div>
             <div><h2 className="text-2xl font-bold">Puppy Application</h2><p className="text-teal-100 text-sm opacity-80">Start your journey with Pawsome Pomsky</p></div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <div className="p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>
              <h3 className="text-2xl font-bold text-slate-900">Application Received!</h3>
              <p className="text-slate-600">Your request has been sent to our breeding team. We'll get back to you shortly!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label><input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Enter your full name" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label><input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="john@example.com" /></div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label><input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="(555) 000-0000" /></div>
              </div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">What dog are you looking for? <span className="text-red-500">*</span></label><textarea required rows={3} value={formData.dogPreference} onChange={(e) => setFormData({...formData, dogPreference: e.target.value})} className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="e.g. A blue-eyed female, Luna, or general waitlist..." /></div>
              <div className="pt-4"><button type="submit" className="w-full py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-500 transition-all shadow-lg uppercase tracking-widest">Submit Application</button></div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdoptionModal;
