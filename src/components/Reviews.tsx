
import React, { useState, useEffect } from 'react';
import { REVIEWS, SOCIAL_LINKS } from '../constants';

const Reviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalReviews = REVIEWS.length;
  const itemsToShow = 3;

  // Auto-scroll logic
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (totalReviews - (itemsToShow - 1)));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalReviews - itemsToShow : prev - 1));
  };

  return (
    <section id="reviews" className="py-24 bg-[#EAF7F6]">
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-teal-100 text-teal-700 rounded-full mb-6">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">50,000+ Social Followers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Verified <span className="text-teal-600">Google Reviews</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Join hundreds of happy families who found their perfect Pawsome companion in North Texas.
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          {/* Carousel Viewport */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {REVIEWS.map((review) => (
                <div 
                  key={review.id} 
                  className="w-full md:w-1/3 shrink-0 px-4"
                >
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(13,148,136,0.1)] border border-white h-full flex flex-col transition-all hover:shadow-[0_20px_60px_rgba(13,148,136,0.15)]">
                    {/* Stars */}
                    <div className="flex gap-1 mb-8">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-[#FFD700] fill-current drop-shadow-sm" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    
                    <p className="text-slate-500 italic mb-10 flex-grow leading-relaxed text-sm font-medium tracking-wide">
                      "{review.text}"
                    </p>

                    <div className="flex items-center gap-5 pt-8 mt-auto border-t border-slate-50">
                      <div className="w-14 h-14 bg-[#0D9488] text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-lg">
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm tracking-widest uppercase">{review.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black text-[#0D9488] uppercase tracking-[0.1em]">GOOGLE VERIFIED</span>
                          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-12 gap-3">
            {[...Array(totalReviews - (itemsToShow - 1))].map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === i ? 'bg-teal-600 w-8' : 'bg-teal-200 hover:bg-teal-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Side Buttons for Desktop */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:translate-x-0 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all z-10 hidden md:flex"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-0 bg-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all z-10 hidden md:flex"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8">
          <a 
            href={SOCIAL_LINKS.reviews} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-12 py-5 bg-white border-2 border-slate-100 text-slate-700 rounded-3xl font-black uppercase tracking-widest text-[11px] hover:border-teal-600 hover:text-teal-600 transition-all shadow-xl shadow-teal-900/5 group"
          >
            <svg className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.26 1.07-3.71 1.07-2.87 0-5.3-1.94-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.09H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.91l3.66-2.8z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.09l3.66 2.84c.86-2.59 3.3-4.55 6.16-4.55z"/>
            </svg>
            Read All Reviews on Google
          </a>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-[10px] text-teal-800 uppercase">
                  {['JD', 'MS', 'RB', 'KL'][i-1]}
                </div>
              ))}
            </div>
            <div className="text-slate-400 font-black uppercase tracking-[0.2em] text-[9px] pl-2">
              Join 500+ Happy Families
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
