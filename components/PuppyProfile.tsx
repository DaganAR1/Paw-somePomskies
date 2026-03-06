
import React, { useState } from 'react';
import { Puppy } from '../types';

interface PuppyProfileProps {
  puppy: Puppy;
  onOpenAdoption: (name: string) => void;
  onBack: () => void;
}

const PuppyProfile: React.FC<PuppyProfileProps> = ({ puppy, onOpenAdoption, onBack }) => {
  const allImages = [puppy.image, ...(puppy.additionalImages || [])];
  const [activeImage, setActiveImage] = useState(puppy.image);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Nav/Header */}
      <div className="bg-teal-900 py-12">
        <div className="container mx-auto px-4">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors group font-black uppercase tracking-widest text-xs"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gallery
          </button>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Gallery Column */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50">
                <img 
                  src={activeImage} 
                  alt={puppy.name} 
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute top-6 right-6">
                  <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl ${
                    puppy.status === 'Available' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {puppy.status}
                  </span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex flex-wrap gap-4">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === img ? 'border-teal-600 scale-105 shadow-lg' : 'border-slate-100 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Column */}
            <div className="flex flex-col">
              <div className="mb-10">
                <div className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full font-black text-[10px] uppercase tracking-widest mb-4">
                  Meet our star
                </div>
                <h1 className="text-6xl font-black text-slate-900 mb-2 uppercase tracking-tight">{puppy.name}</h1>
                <p className="text-teal-600 text-2xl font-bold uppercase tracking-widest">{puppy.gender} • {puppy.age}</p>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Coat Color</p>
                  <p className="text-lg font-black text-slate-900">{puppy.coatColor || 'Classic'}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Eye Color</p>
                  <p className="text-lg font-black text-slate-900">{puppy.eyeColor || 'Blue'}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                  <p className="text-lg font-black text-slate-900">{puppy.weight || 'N/A'}</p>
                </div>
              </div>

              <div className="prose prose-teal mb-12 flex-grow">
                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-widest">About {puppy.name}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {puppy.description}
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-4 text-slate-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>Fully vaccinated & dewormed</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>1-Year Health Guarantee included</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    <span>Raised in a home with children</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onOpenAdoption(puppy.name)}
                disabled={puppy.status !== 'Available'}
                className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-sm shadow-2xl transition-all ${
                  puppy.status === 'Available' 
                    ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-teal-600/20' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {puppy.status === 'Available' ? `Apply to Adopt ${puppy.name}` : 'Reserved'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PuppyProfile;
