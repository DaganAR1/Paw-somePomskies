
import React, { useState, useEffect } from 'react';

interface PricingProps {
  onOpenAdoption: () => void;
}

// Fix: Exported CountdownTimer so it can be imported in PricingPage.tsx
export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to 3 days from now for demonstration
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 14);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center gap-4 text-center mt-4">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hrs', value: timeLeft.hours },
        { label: 'Min', value: timeLeft.minutes },
        { label: 'Sec', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={i} className="flex flex-col bg-teal-900 text-white p-3 rounded-xl min-w-[70px] shadow-lg border border-teal-700">
          <span className="text-2xl font-bold font-mono">{String(item.value).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Pricing: React.FC<PricingProps> = ({ onOpenAdoption }) => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-red-100 text-red-600 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest mb-4 animate-pulse">
            🔥 Limited Time Flash Sale 🔥
          </div>
          <h2 className="text-4xl font-bold mb-4">Adoption Packages</h2>
          <p className="text-slate-600 mb-8">Special seasonal discounts for our boutique companions.</p>
          
          <div className="max-w-md mx-auto">
            <p className="text-sm font-bold text-teal-800 uppercase tracking-widest mb-2">Sale Ends In:</p>
            <CountdownTimer />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Pack */}
          <div className="bg-slate-50 p-10 rounded-3xl border-2 border-slate-100 flex flex-col h-full transition-all hover:border-teal-200 shadow-sm">
            <div className="mb-8">
              <span className="text-teal-600 font-bold uppercase tracking-widest text-sm">Classic Companion</span>
              <div className="mt-2 flex items-end gap-3 flex-wrap">
                <span className="text-2xl text-red-500 line-through decoration-2 opacity-60">$3,200</span>
                <h3 className="text-5xl font-bold text-slate-900">$2,500 <span className="text-lg text-slate-400 font-normal">Starting</span></h3>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Health Guarantee (1 Year)</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Vet Checked & Vaccinated</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Puppy Starter Kit</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Microchipped</span>
              </li>
            </ul>
            <button onClick={onOpenAdoption} className="text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors">Select Package</button>
          </div>

          {/* Premium Pack */}
          <div className="bg-teal-50 p-10 rounded-3xl border-2 border-teal-500 flex flex-col h-full relative shadow-xl transform scale-105">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              SAVE $1,000
            </div>
            <div className="mb-8">
              <span className="text-teal-600 font-bold uppercase tracking-widest text-sm">Elite Choice</span>
              <div className="mt-2 flex items-end gap-3 flex-wrap">
                <span className="text-2xl text-red-500 line-through decoration-2 opacity-60">$4,500</span>
                <h3 className="text-5xl font-bold text-teal-900">$3,500 <span className="text-lg text-teal-400 font-normal">Avg.</span></h3>
              </div>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span className="font-semibold text-slate-800">Extended Health Guarantee (2 Years)</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Top Pick Priority</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Personal Training Consultation</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                <span>Free Grooming (First 3 Sessions)</span>
              </li>
            </ul>
            <button onClick={onOpenAdoption} className="text-center py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-500 transition-all shadow-lg">Adopt Elite</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
