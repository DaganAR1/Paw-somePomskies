
import React from 'react';
import { Puppy } from '../types';

interface PuppiesProps {
  puppies: Puppy[];
  onOpenAdoption: (puppyName?: string) => void;
  onViewPuppy: (id: string) => void;
  onViewAll: () => void;
}

const Puppies: React.FC<PuppiesProps> = ({ puppies, onOpenAdoption, onViewPuppy, onViewAll }) => {
  // Show only 3 puppies as a preview on home page
  const featuredPuppies = puppies.slice(0, 3);

  return (
    <section id="puppies" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-4">Featured Puppies</h2>
            <p className="text-slate-600 text-lg">
              Each puppy comes with a health guarantee, initial vaccinations, and a special puppy starter kit.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="group flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors uppercase tracking-widest text-sm"
          >
            View Full Gallery
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPuppies.map((puppy) => (
            <div key={puppy.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => onViewPuppy(puppy.id)}>
                <img 
                  src={puppy.image} 
                  alt={puppy.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    puppy.status === 'Available' ? 'bg-green-500 text-white shadow-md' : 'bg-orange-500 text-white shadow-md'
                  }`}>
                    {puppy.status}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => onViewPuppy(puppy.id)}>
                  <h3 className="text-2xl font-black text-slate-900 group-hover:text-teal-600 transition-colors">{puppy.name}</h3>
                  <span className="text-teal-600 font-bold">{puppy.age}</span>
                </div>
                <p className="text-slate-500 mb-6 text-sm line-clamp-2">{puppy.description}</p>
                <div className="grid grid-cols-2 gap-3">
                   <button 
                    onClick={() => onViewPuppy(puppy.id)}
                    className="py-4 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px]"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => onOpenAdoption(puppy.name)}
                    className="py-4 rounded-2xl bg-teal-600 text-white font-bold hover:bg-teal-500 transition-all uppercase tracking-widest text-[10px]"
                  >
                    Adopt Me
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Puppies;
