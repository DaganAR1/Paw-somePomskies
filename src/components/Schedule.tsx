
import React from 'react';
import { ScheduleEvent } from '../types';

interface ScheduleProps {
  schedule: ScheduleEvent[];
  onJoinWaitlist: () => void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, onJoinWaitlist }) => {
  return (
    <section id="schedule" className="py-24 bg-teal-950 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Breeding Schedule</h2>
          <p className="text-teal-200 max-w-2xl mx-auto opacity-80 font-medium">
            Join our exclusive waitlist to be first in line for our upcoming seasonal litters.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Desktop Version: Only shown on MD and up */}
          <div className="hidden md:block overflow-hidden rounded-[3rem] border border-teal-800 shadow-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-teal-900/50 border-b border-teal-800">
                  <th className="px-10 py-6 text-teal-400 font-black uppercase tracking-widest text-[10px]">Season</th>
                  <th className="px-10 py-6 text-teal-400 font-black uppercase tracking-widest text-[10px]">Litter Event</th>
                  <th className="px-10 py-6 text-teal-400 font-black uppercase tracking-widest text-[10px]">Date Expected</th>
                  <th className="px-10 py-6 text-teal-400 font-black uppercase tracking-widest text-[10px] text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-800/50">
                {schedule.map((item, idx) => (
                  <tr key={idx} className="hover:bg-teal-900/30 transition-colors">
                    <td className="px-10 py-8 font-black text-xl text-teal-50">{item.period}</td>
                    <td className="px-10 py-8">
                      <p className="font-black text-white uppercase tracking-tight text-lg">{item.event}</p>
                      <p className="text-xs text-teal-500 mt-1 font-bold">{item.details}</p>
                    </td>
                    <td className="px-10 py-8 font-mono text-teal-300 text-sm font-bold">{item.date}</td>
                    <td className="px-10 py-8 text-right">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-teal-500/10 text-teal-400 border border-teal-500/20">
                        Open
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Version: Card-based layout for small screens */}
          <div className="md:hidden space-y-6">
            {schedule.map((item, idx) => (
              <div key={idx} className="bg-teal-900/40 border border-teal-800 rounded-[2rem] p-8 space-y-6 shadow-xl">
                <div className="flex justify-between items-center pb-4 border-b border-teal-800/50">
                  <span className="text-teal-400 text-[10px] font-black uppercase tracking-[0.2em]">{item.period}</span>
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full text-[9px] font-black uppercase tracking-widest">Open</span>
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{item.event}</h3>
                  <p className="text-teal-500 text-xs font-bold leading-relaxed">{item.details}</p>
                </div>

                <div className="pt-4 flex flex-col gap-1">
                  <span className="text-[9px] font-black text-teal-700 uppercase tracking-[0.3em]">Estimated Date</span>
                  <span className="text-lg font-mono text-teal-300 font-bold">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={onJoinWaitlist}
            className="inline-block px-14 py-6 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-2xl shadow-teal-600/30 active:scale-95"
          >
            Join the Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
