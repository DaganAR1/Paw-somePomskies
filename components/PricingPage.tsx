
import React from 'react';
import { CountdownTimer } from './Pricing';

interface PricingPageProps {
  onBackToHome: () => void;
  onOpenAdoption: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBackToHome, onOpenAdoption }) => {
  return (
    <div className="min-h-screen bg-white">
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
          <div className="inline-block bg-teal-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] mb-6">
            Investment & Packages
          </div>
          <h1 className="text-6xl font-black mb-6">Adoption Investment</h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-80 text-xl leading-relaxed mb-10">
            A boutique experience for a boutique companion. Every puppy includes our gold-standard care package.
          </p>
          <div className="max-w-md mx-auto scale-110">
            <p className="text-[10px] font-black text-teal-300 uppercase tracking-[0.4em] mb-4">Seasonal Promo Ending Soon</p>
            <div className="flex justify-center gap-4">
              {/* Dummy timer values for aesthetic */}
              <div className="bg-teal-950/50 backdrop-blur-md p-4 rounded-2xl border border-teal-800 min-w-[80px]">
                <div className="text-3xl font-black">03</div>
                <div className="text-[10px] opacity-50 uppercase tracking-widest font-bold">Days</div>
              </div>
              <div className="bg-teal-950/50 backdrop-blur-md p-4 rounded-2xl border border-teal-800 min-w-[80px]">
                <div className="text-3xl font-black">14</div>
                <div className="text-[10px] opacity-50 uppercase tracking-widest font-bold">Hrs</div>
              </div>
              <div className="bg-teal-950/50 backdrop-blur-md p-4 rounded-2xl border border-teal-800 min-w-[80px]">
                <div className="text-3xl font-black">22</div>
                <div className="text-[10px] opacity-50 uppercase tracking-widest font-bold">Min</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Standard */}
            <div className="p-16 rounded-[3rem] border-2 border-slate-100 bg-slate-50 hover:border-teal-200 transition-all flex flex-col group">
              <div className="mb-10">
                <span className="text-teal-600 font-black uppercase tracking-[0.3em] text-xs">Standard Companion</span>
                <div className="flex items-baseline gap-4 mt-4">
                  <h3 className="text-6xl font-black text-slate-900">$2,500</h3>
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Starting</span>
                </div>
              </div>
              <ul className="space-y-6 mb-16 flex-grow">
                {['1 Year Health Guarantee', 'Vet Checked & Vaccinated', 'Standard Starter Kit', 'Microchipped', '30 Days Trupanion Insurance'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                    <div className="w-6 h-6 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={onOpenAdoption} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-800 transition-all">Select Package</button>
            </div>

            {/* Premium */}
            <div className="p-16 rounded-[3rem] border-4 border-teal-500 bg-white shadow-2xl flex flex-col relative transform scale-105 z-10 group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white px-8 py-2 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-xl">
                Most Popular
              </div>
              <div className="mb-10">
                <span className="text-teal-600 font-black uppercase tracking-[0.3em] text-xs">Elite Choice</span>
                <div className="flex items-baseline gap-4 mt-4">
                  <h3 className="text-6xl font-black text-teal-900">$3,500</h3>
                  <span className="text-teal-400 font-bold uppercase tracking-widest text-xs">Average</span>
                </div>
              </div>
              <ul className="space-y-6 mb-16 flex-grow">
                {[
                  '2 Year Extended Health Guarantee',
                  'Priority Pick Selection',
                  'Premium Starter Bag (Crate + Food)',
                  'Puppy Culture Training Manual',
                  'Lifetime Breeder Support',
                  'Travel Credit (Up to $300)'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-800 font-bold">
                    <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={onOpenAdoption} className="w-full py-6 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/30">Adopt Elite</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
