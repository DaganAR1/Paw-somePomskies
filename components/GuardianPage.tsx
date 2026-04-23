
import React, { useState } from 'react';
import { GuardianDog } from '../types';
import { sendEmail } from '../services/emailService';

interface GuardianPageProps {
  guardianDogs: GuardianDog[];
  heroImage?: string;
  programImage?: string;
}

const GuardianPage: React.FC<GuardianPageProps> = ({ guardianDogs, heroImage, programImage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    dogInterest: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const result = await sendEmail({
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      location: formData.location,
      interest: formData.dogInterest,
      experience: formData.experience,
      message: formData.message,
      subject: `Guardian Home Inquiry: ${formData.dogInterest}`
    });

    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', location: '', experience: '', dogInterest: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white">
      {/* Top Banner */}
      <div className="relative h-[40vh] min-h-[400px] overflow-hidden">
        <img 
          src={heroImage || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2000"} 
          alt="Guardian Home Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight uppercase">
              Guardian <span className="text-teal-400">Homes</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-90">
              Where every breeding dog is a cherished family pet.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-24 container mx-auto px-4">
        {/* Hero Section - Description */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <p className="text-2xl text-slate-600 leading-relaxed font-medium">
            Our Guardian Home program is designed to ensure that every one of our breeding dogs lives as a cherished family pet in a loving, forever home.
          </p>
        </div>

        {/* Explanation Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24 max-w-6xl mx-auto">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square md:aspect-auto md:h-[600px]">
            <img 
              src={programImage || "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200"} 
              alt="Happy dog in a home" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">What is a Guardian Home?</h2>
            <p className="text-slate-600 leading-relaxed">
              A Guardian Home is a unique opportunity for local families to receive a "pick of the litter" puppy or a young adult dog at no initial cost. In exchange, the dog remains part of our breeding program for a specified number of litters.
            </p>
            <p className="text-slate-600 leading-relaxed">
              These are <strong>loving dogs</strong> that deserve individual attention and a family environment. Once the breeding contract is fulfilled, the dog is spayed/neutered and full ownership is transferred to the Guardian family.
            </p>
            <div className="bg-teal-50 p-8 rounded-3xl border border-teal-100">
              <h3 className="font-bold text-teal-800 mb-4 uppercase tracking-wider text-sm">Program Benefits</h3>
              <ul className="space-y-3">
                {['Top-quality Pomsky at no cost', 'Health tested and well-socialized dogs', 'Ongoing support from us', 'A loving addition to your family'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-teal-700 text-sm font-medium">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Available Dogs Section */}
        {guardianDogs.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Dogs Seeking Guardian Homes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {guardianDogs.map((dog) => (
                <div key={dog.id} className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 transition-all hover:shadow-xl group">
                  <div className="h-64 overflow-hidden">
                    <img src={dog.image} alt={dog.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{dog.name}</h3>
                      <span className="px-4 py-1 bg-teal-100 text-teal-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {dog.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-3">{dog.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div>
                        <p className="text-teal-600 mb-1">Breed</p>
                        <p>{dog.breed}</p>
                      </div>
                      <div>
                        <p className="text-teal-600 mb-1">Age</p>
                        <p>{dog.age}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Form */}
        <div className="max-w-3xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Guardian Application</h2>
            <p className="text-slate-400">Tell us about your home and why you'd like to join our program.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-500">Full Name</label>
                <input 
                  required
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-500">Email Address</label>
                <input 
                  required
                  type="email"
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-500">Phone Number</label>
                <input 
                  required
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-teal-500">Location (City, State)</label>
                <input 
                  required
                  className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-teal-500">Dog of Interest</label>
              <select 
                className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                value={formData.dogInterest}
                onChange={e => setFormData({...formData, dogInterest: e.target.value})}
              >
                <option value="">Select a dog (or General Interest)</option>
                {guardianDogs.map(dog => (
                  <option key={dog.id} value={dog.name}>{dog.name}</option>
                ))}
                <option value="General Interest">General Interest / Future Openings</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-teal-500">Pet Experience</label>
              <textarea 
                required
                rows={4}
                className="w-full px-6 py-4 bg-slate-800 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                placeholder="Tell us about your current pets and experience with dogs..."
                value={formData.experience}
                onChange={e => setFormData({...formData, experience: e.target.value})}
              />
            </div>

            <button
              disabled={status === 'sending'}
              className={`w-full py-6 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all ${status === 'sending' ? 'bg-slate-600 cursor-not-allowed opacity-50' : 'bg-teal-600 hover:bg-teal-500 shadow-teal-600/20'}`}
            >
              {status === 'sending' ? 'Submitting...' : 'Submit Application'}
            </button>

            {status === 'success' && (
              <p className="text-teal-400 text-center font-bold">Application sent successfully! We'll be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-center font-bold">Something went wrong. Please try again later.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default GuardianPage;
