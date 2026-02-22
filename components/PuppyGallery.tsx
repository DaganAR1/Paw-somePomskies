
import React, { useState } from 'react';
import { Puppy } from '../types';

interface PuppyGalleryProps {
  puppies: Puppy[];
  onOpenAdoption: (puppyName?: string) => void;
  onViewPuppy: (id: string) => void;
  onBackToHome: () => void;
  onNavigateParents: () => void;
  onNavigateSchedule: () => void;
}

const PuppyGallery: React.FC<PuppyGalleryProps> = ({ 
  puppies, 
  onOpenAdoption, 
  onViewPuppy,
  onBackToHome,
  onNavigateParents,
  onNavigateSchedule
}) => {
  const [filter, setFilter] = useState<'All' | 'Available' | 'Reserved'>('All');

  const filteredPuppies = puppies.filter(p => filter === 'All' || p.status === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <header className="bg-teal-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBackToHome}
            className="mb-8 inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-5xl font-bold mb-4">Our Puppy Gallery</h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-80 text-lg">
            Meet the newest members of the Pawsome Pomsky family. Find your future best friend below.
          </p>
        </div>
      </header>

      {/* Filter Section */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            {(['All', 'Available', 'Reserved'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-2 rounded-xl font-bold transition-all ${
                  filter === f ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-500 hover:text-teal-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="text-slate-500 font-medium">
            Showing <span className="text-teal-600 font-bold">{filteredPuppies.length}</span> Furry Friends
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.isArray(filteredPuppies) && filteredPuppies.map((puppy) => (
              <div key={puppy.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all group">
                <div className="relative h-72 overflow-hidden cursor-pointer" onClick={() => onViewPuppy(puppy.id)}>
                  <img 
                    src={puppy.image} 
                    alt={puppy.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${
                      puppy.status === 'Available' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {puppy.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6 cursor-pointer" onClick={() => onViewPuppy(puppy.id)}>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 leading-none group-hover:text-teal-600 transition-colors">{puppy.name}</h3>
                      <p className="text-teal-600 text-sm font-bold mt-2">{puppy.gender} • {puppy.age}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-widest">Eyes:</span>
                      <span className="text-slate-900 font-black">{puppy.eyeColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-bold uppercase tracking-widest">Coat:</span>
                      <span className="text-slate-900 font-black">{puppy.coatColor}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => onViewPuppy(puppy.id)}
                      className="w-full py-4 bg-slate-50 border-2 border-slate-100 text-slate-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all"
                    >
                      View Full Profile
                    </button>
                    <button 
                      disabled={puppy.status !== 'Available'}
                      onClick={() => onOpenAdoption(puppy.name)}
                      className={`w-full py-4 rounded-2xl font-black transition-all uppercase tracking-widest text-[10px] ${
                        puppy.status === 'Available' 
                          ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-lg shadow-teal-600/20' 
                          : 'bg-slate-100 text-slate-300 cursor-not-allowed border-none'
                      }`}
                    >
                      {puppy.status === 'Available' ? 'Adopt Me' : 'Reserved'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PuppyGallery;
