
import React from 'react';
import { Parent } from '../types';

interface MeetTheParentsProps {
  parents: Parent[];
  onBackToHome: () => void;
  onNavigatePuppies: () => void;
  onNavigateSchedule: () => void;
}

const MeetTheParents: React.FC<MeetTheParentsProps> = ({ parents, onBackToHome, onNavigatePuppies, onNavigateSchedule }) => {
  return (
    <div className="min-h-screen bg-slate-50">
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
          <h1 className="text-5xl font-black mb-4">Meet the Parents</h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-80 text-lg">
            The foundation of our excellence. Our sires and dams are chosen for health, temperament, and beauty.
          </p>
        </div>
      </header>

      {/* Internal Navigation Dropdown for Puppy Section */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-6">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="relative group">
            <button className="bg-teal-600 text-white px-10 py-3 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 shadow-lg hover:bg-teal-500 transition-all">
              Navigate Puppies
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-5 duration-200">
              <button onClick={onNavigatePuppies} className="w-full text-left px-6 py-4 hover:bg-teal-50 text-slate-700 font-bold transition-colors">Available Puppies</button>
              <button className="w-full text-left px-6 py-4 bg-teal-600 text-white font-bold cursor-default">Meet the Parents</button>
              <button onClick={onNavigateSchedule} className="w-full text-left px-6 py-4 hover:bg-teal-50 text-slate-700 font-bold transition-colors">Upcoming Litters</button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {parents.map((parent) => (
              <div key={parent.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 transition-all hover:shadow-2xl">
                <div className="relative h-96 overflow-hidden">
                  <img src={parent.image} alt={parent.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute top-6 left-6">
                    <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl ${
                      parent.role === 'Sire' ? 'bg-blue-600 text-white' : 'bg-pink-600 text-white'
                    }`}>
                      {parent.role}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{parent.name}</h3>
                  <div className="flex gap-4 mb-6 text-sm font-bold text-teal-600">
                    <span>{parent.breed}</span>
                    <span className="text-slate-300">|</span>
                    <span>{parent.weight}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed italic">"{parent.description}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MeetTheParents;
