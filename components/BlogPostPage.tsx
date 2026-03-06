
import React from 'react';
// Fix: Import BlogPost from types instead of constants as it is defined and exported from types.ts
import { BlogPost } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  onBackToBlog: () => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onBackToBlog }) => {
  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <header className="relative h-[60vh] md:h-[70vh] flex items-end">
        <img 
          src={post.image} 
          alt={post.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10 pb-20">
          <button 
            onClick={onBackToBlog}
            className="mb-8 inline-flex items-center gap-2 text-teal-300 hover:text-white transition-colors group font-black uppercase tracking-widest text-xs"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </button>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-teal-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                {post.category}
              </span>
              <span className="text-teal-300 font-bold text-xs uppercase tracking-widest">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center font-black text-white shadow-lg">
                {post.author.charAt(0)}
              </div>
              <div className="text-white">
                <p className="font-black text-sm uppercase tracking-widest">{post.author}</p>
                <p className="text-teal-400 text-xs font-bold">Expert Breeder & Contributor</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Social Share (Desktop Sticky) */}
            <div className="hidden lg:block absolute left-4 xl:left-24 top-24 space-y-4">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr] mb-4">Share Story</p>
              <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">FB</button>
              <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">IG</button>
              <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-teal-600 hover:text-white transition-all">TW</button>
            </div>

            <div className="space-y-8 text-slate-700 text-xl leading-relaxed">
              {/* Introduction/Excerpt Highlight */}
              <p className="text-2xl font-bold text-slate-900 leading-normal border-l-4 border-teal-500 pl-8 mb-12 italic">
                {post.excerpt}
              </p>

              {/* Dynamically Render Paragraphs */}
              {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {/* Call to Action Inside Article */}
              <div className="my-16 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 text-center">
                <h3 className="text-3xl font-black text-slate-900 mb-4">Inspired by this story?</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">Our puppies are raised with the exact care and philosophy we share in our blog posts.</p>
                <button 
                  onClick={() => window.location.hash = '#puppies'}
                  className="px-12 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-600/20 hover:bg-teal-500 transition-all"
                >
                  View Available Puppies
                </button>
              </div>

              {/* Final Conclusion Heading (Optional placeholder for future use) */}
              <h2 className="text-3xl font-black text-slate-900 pt-8">Final Thoughts</h2>
              <p>
                Choosing a Pomsky is a decade-long commitment to grooming, training, and love. We hope these insights help you on your journey to becoming the best pet parent possible.
              </p>
            </div>

            {/* Author Section */}
            <footer className="mt-24 pt-16 border-t border-slate-100 flex flex-col md:flex-row gap-10 items-center">
               <div className="w-32 h-32 rounded-[2rem] bg-teal-100 flex items-center justify-center text-4xl font-black text-teal-600 shadow-inner">
                {post.author.charAt(0)}
               </div>
               <div className="flex-grow text-center md:text-left">
                  <h4 className="text-2xl font-black text-slate-900 mb-2">{post.author}</h4>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    {post.author} has over 15 years of experience in canine genetics and boutique breeding. As a core member of the Pawsome Pomsky team, they are dedicated to educating the community about responsible ownership.
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <button className="text-teal-600 font-bold uppercase tracking-widest text-[10px] hover:underline">View Bio</button>
                    <button className="text-teal-600 font-bold uppercase tracking-widest text-[10px] hover:underline">More Articles</button>
                  </div>
               </div>
            </footer>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <div className="bg-slate-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Never Miss a Story</h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-10">Get the latest Pomsky training tips and breeding news sent to your inbox every Sunday morning.</p>
          <form className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Your email address" className="flex-grow px-8 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            <button className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs">Join</button>
          </form>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;
