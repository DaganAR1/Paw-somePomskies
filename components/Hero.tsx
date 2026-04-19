
import React from 'react';

interface HeroProps {
  logo: string;
  backgroundImage: string;
  onOpenAdoption: () => void;
  onNavigateAbout: () => void;
}

const Hero: React.FC<HeroProps> = ({ logo, backgroundImage, onOpenAdoption, onNavigateAbout }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundImage} 
          className="w-full h-full object-cover"
          alt="Adorable Pomsky"
        />
        <div className="absolute inset-0 section-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <span className="inline-block px-6 py-2 mb-8 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-400/30 text-teal-300 text-xs font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-top-4 duration-1000">
          Premium Boutique Breeder
        </span>
        <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
          Find Your Perfect <br/><span className="text-teal-300">Pawsome Companion</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Specializing in healthy, socialized, and stunning Pomskies from champion lines in the heart of Texas.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <button 
            onClick={onOpenAdoption}
            className="bg-teal-500 hover:bg-teal-400 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-2xl shadow-teal-600/40 hover:-translate-y-1 active:scale-95"
          >
            Adopt Today
          </button>
          <button 
            onClick={onNavigateAbout} 
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all active:scale-95"
          >
            Our Story
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block opacity-30">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
