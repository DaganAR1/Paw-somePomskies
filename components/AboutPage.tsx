
import React from 'react';

interface AboutPageProps {
  image: string;
  onBackToHome: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ image, onBackToHome }) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-teal-900 text-white py-24 relative overflow-hidden">
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
          <h1 className="text-6xl font-black mb-6">Our Pawsome Story</h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-80 text-xl leading-relaxed">
            Founded on love, built with integrity, and dedicated to the world's most charming companions.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-600 rounded-full blur-3xl"></div>
        </div>
      </header>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img 
                src={image} 
                alt="Breeder with puppy" 
                className="rounded-[3rem] shadow-2xl relative z-10 w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-10 -right-10 bg-teal-600 text-white p-12 rounded-[2rem] shadow-2xl hidden md:block">
                <p className="text-5xl font-black">12+</p>
                <p className="text-xs opacity-70 uppercase tracking-[0.2em] font-bold mt-2">Years Raising Pomskies</p>
              </div>
            </div>

            <div className="space-y-10">
              <div className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full font-black text-xs uppercase tracking-widest">
                Established 2012
              </div>
              <h2 className="text-5xl font-black text-slate-900 leading-tight">
                Where Family Meets <span className="text-teal-600">Excellence</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  At Pawsome Pomsky, we believe a puppy is not just a pet, but a lifelong family member. 
                  Our journey started over a decade ago with a simple goal: to elevate the standard of the Pomsky breed through ethical breeding and transparent practices.
                </p>
                <p>
                  Located in the heart of Frisco, Texas, our facility is more than just a kennel—it's a home. Every litter is raised under our roof, receiving 24/7 care, early neurological stimulation, and high-quality nutrition to ensure a strong start in life.
                </p>
                <p>
                  We are proud members of the Pomsky Owners Association and strictly adhere to DNA testing and health certifications. When you choose a Pawsome Pomsky, you're joining a community of dedicated owners who value quality above all else.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="font-black text-teal-900 text-xl mb-3">Our Mission</h4>
                  <p className="text-slate-500 text-sm">To produce healthy, happy, and well-socialized Pomskies that bring unmeasurable joy to their forever homes.</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h4 className="font-black text-teal-900 text-xl mb-3">Our Vision</h4>
                  <p className="text-slate-500 text-sm">To be recognized globally as the premier boutique breeder known for health, beauty, and temperament.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
