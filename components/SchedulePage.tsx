
import React from 'react';
import { ScheduleEvent } from '../types';

interface SchedulePageProps {
  schedule: ScheduleEvent[];
  onBackToHome: () => void;
  onNavigateWaitlist: (litterName?: string) => void;
}

const SchedulePage: React.FC<SchedulePageProps> = ({ schedule, onBackToHome, onNavigateWaitlist }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-teal-950 text-white py-32 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <button 
            onClick={onBackToHome}
            className="mb-8 inline-flex items-center gap-2 text-teal-400 hover:text-white transition-colors group font-black uppercase tracking-widest text-xs"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">Breeding Schedule</h1>
          <p className="text-teal-200 max-w-2xl mx-auto opacity-80 text-lg md:text-xl leading-relaxed font-medium">
            Planning for a new family member? View our projected litters and secure your spot on our premium waitlist.
          </p>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200">
              <div className="divide-y divide-slate-100">
                {Array.isArray(schedule) && schedule.map((item, idx) => (
                  <div key={idx} className="p-10 md:p-14 hover:bg-slate-50 transition-colors">
                    {/* Responsive Stack: Cards on mobile, Row on desktop */}
                    <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center gap-10 md:gap-16">
                      
                      {/* Date Block */}
                      <div className="w-full md:w-1/4 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0">
                        <div className="text-teal-600 font-black text-[10px] uppercase tracking-[0.4em] mb-3">{item.period}</div>
                        <div className="text-5xl font-black text-slate-900 tracking-tighter mb-1">
                          {item.date && item.date.includes(' ') ? item.date.split(' ')[0] : (item.date || 'TBD')}
                        </div>
                        <div className="text-slate-400 font-black uppercase tracking-[0.3em] text-[11px]">
                          {item.date && item.date.includes(' ') ? item.date.split(' ').slice(1).join(' ') : ''}
                        </div>
                      </div>

                      {/* Content Block */}
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">{item.event}</h3>
                        <p className="text-slate-500 text-sm md:text-lg font-medium leading-relaxed max-w-lg mx-auto md:mx-0">{item.details}</p>
                      </div>

                      {/* CTA Block */}
                      <div className="w-full md:w-auto shrink-0 pt-6 md:pt-0">
                        <button 
                          onClick={() => onNavigateWaitlist(item.event)}
                          className="w-full md:w-auto px-12 py-5 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-500 transition-all shadow-2xl shadow-teal-600/30 active:scale-95"
                        >
                          Join Waitlist
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-20 p-16 bg-teal-900 text-white rounded-[4rem] border border-teal-800 text-center shadow-2xl">
              <div className="w-20 h-20 bg-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-3xl shadow-xl">📋</div>
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Our Waitlist Policy</h3>
              <p className="text-teal-200/80 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
                To maintain our unshakeable commitment to quality, we only accept a limited number of families per litter. Waitlist members get exclusive first access to puppy photos and priority selection.
              </p>
              <button onClick={() => onNavigateWaitlist()} className="px-10 py-4 bg-white text-teal-900 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-teal-50 transition-colors">
                Read Detailed Policy
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
