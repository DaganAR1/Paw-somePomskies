
import React, { useState } from 'react';

interface NavbarProps {
  logo: string;
  onOpenAdoption: () => void;
  onNavigateHome: () => void;
  onNavigatePuppies: () => void;
  onNavigateParents: () => void;
  onNavigateSchedule: () => void;
  onNavigateAbout: () => void;
  onNavigateBlog: () => void;
  onNavigateContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  logo,
  onOpenAdoption, 
  onNavigateHome,
  onNavigatePuppies,
  onNavigateParents,
  onNavigateSchedule,
  onNavigateAbout,
  onNavigateBlog,
  onNavigateContact
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[110] bg-teal-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95"
        >
          <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
             <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-2xl font-black tracking-tight text-teal-300">
            Paw-some Pomskies
          </span>
        </button>

        <div className="hidden lg:flex items-center space-x-10">
          <button onClick={onNavigateHome} className="hover:text-teal-300 transition-colors font-bold uppercase tracking-widest text-[11px] py-2">Home</button>
          <button onClick={onNavigateAbout} className="hover:text-teal-300 transition-colors font-bold uppercase tracking-widest text-[11px] py-2">About</button>
          
          <div 
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-teal-300 transition-colors font-bold uppercase tracking-widest text-[11px] py-2">
              Puppy Options
              <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
              <div className="p-2">
                <button 
                  onClick={() => { onNavigatePuppies(); setIsDropdownOpen(false); }}
                  className="w-full text-left px-5 py-4 hover:bg-teal-50 hover:text-teal-700 font-bold transition-all rounded-xl flex items-center gap-3"
                >
                  <span className="text-xl">🐾</span> 
                  <div>
                    <div className="text-sm">Available Puppies</div>
                    <div className="text-[10px] opacity-40 font-normal uppercase tracking-wider">Meet the pups</div>
                  </div>
                </button>
                <button 
                  onClick={() => { onNavigateParents(); setIsDropdownOpen(false); }}
                  className="w-full text-left px-5 py-4 hover:bg-teal-50 hover:text-teal-700 font-bold transition-all rounded-xl flex items-center gap-3"
                >
                  <span className="text-xl">🐕</span> 
                  <div>
                    <div className="text-sm">Meet the Parents</div>
                    <div className="text-[10px] opacity-40 font-normal uppercase tracking-wider">Breeding foundation</div>
                  </div>
                </button>
                <button 
                  onClick={() => { onNavigateSchedule(); setIsDropdownOpen(false); }}
                  className="w-full text-left px-5 py-4 hover:bg-teal-50 hover:text-teal-700 font-bold transition-all rounded-xl flex items-center gap-3"
                >
                  <span className="text-xl">📅</span> 
                  <div>
                    <div className="text-sm">Upcoming Litters</div>
                    <div className="text-[10px] opacity-40 font-normal uppercase tracking-wider">Future litters</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <button onClick={onNavigateSchedule} className="hover:text-teal-300 transition-colors font-bold uppercase tracking-widest text-[11px] py-2">Schedule</button>
          <button onClick={onNavigateBlog} className="hover:text-teal-300 transition-colors font-bold uppercase tracking-widest text-[11px] py-2">Blogs</button>
          <button onClick={onNavigateContact} className="hover:text-teal-300 transition-colors font-bold uppercase tracking-widest text-[11px] py-2">Contact</button>

          <button 
            onClick={onOpenAdoption}
            className="bg-teal-600 hover:bg-teal-500 px-8 py-2.5 rounded-full font-black transition-all shadow-lg shadow-teal-700/50 uppercase tracking-widest text-[10px] transform hover:scale-105 active:scale-95"
          >
            Adopt Today
          </button>
        </div>

        <button 
          className="lg:hidden p-2 rounded-xl hover:bg-teal-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-teal-950 border-t border-teal-800 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-8 space-y-6">
            <button onClick={() => { onNavigateHome(); setIsOpen(false); }} className="text-left font-bold uppercase tracking-[0.2em] text-xs">Home</button>
            <button onClick={() => { onNavigateAbout(); setIsOpen(false); }} className="text-left font-bold uppercase tracking-[0.2em] text-xs">About Us</button>
            
            <div className="space-y-4 pt-4 border-t border-teal-900">
              <p className="text-teal-500 font-black text-[10px] uppercase tracking-[0.3em]">Puppy Section</p>
              <button onClick={() => { onNavigatePuppies(); setIsOpen(false); }} className="block w-full text-left py-2 font-bold text-lg">Available Puppies</button>
              <button onClick={() => { onNavigateParents(); setIsOpen(false); }} className="block w-full text-left py-2 font-bold text-lg">Meet the Parents</button>
              <button onClick={() => { onNavigateSchedule(); setIsOpen(false); }} className="block w-full text-left py-2 font-bold text-lg">Upcoming Litters</button>
            </div>

            <button onClick={() => { onNavigateSchedule(); setIsOpen(false); }} className="text-left font-bold uppercase tracking-[0.2em] text-xs pt-4 border-t border-teal-900">Schedule</button>
            <button onClick={() => { onNavigateBlog(); setIsOpen(false); }} className="text-left font-bold uppercase tracking-[0.2em] text-xs">Blogs</button>
            <button onClick={() => { onNavigateContact(); setIsOpen(false); }} className="text-left font-bold uppercase tracking-[0.2em] text-xs">Contact</button>
            
            <button 
              onClick={() => { onOpenAdoption(); setIsOpen(false); }}
              className="w-full text-center bg-teal-600 hover:bg-teal-500 px-6 py-5 rounded-2xl font-black transition-all shadow-xl uppercase tracking-widest text-sm mt-4"
            >
              Adopt Today
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
