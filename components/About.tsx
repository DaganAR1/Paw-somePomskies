
import React from 'react';

interface AboutProps {
  image: string;
}

const About: React.FC<AboutProps> = ({ image }) => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-teal-100 rounded-full -z-10"></div>
            <img 
              src={image} 
              alt="Breeder with puppy" 
              className="rounded-3xl shadow-2xl relative z-10 w-full h-auto object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-teal-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-3xl font-bold">12+</p>
              <p className="text-sm opacity-80 uppercase tracking-wider font-semibold">Years of Experience</p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Passionate Breeders Dedicated to <span className="text-teal-600">Excellence</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Pawsome Pomsky, we believe a puppy is not just a pet, but a family member. 
              Our journey started over a decade ago with a love for the majestic Husky and the spirited Pomeranian.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-2">Health First</h4>
                <p className="text-slate-600">Full DNA health testing for all our breeding sires and dams.</p>
              </div>
              
              <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="font-bold text-xl mb-2">Socialized</h4>
                <p className="text-slate-600">Puppies are raised in our home with children and other pets for early socialization.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
