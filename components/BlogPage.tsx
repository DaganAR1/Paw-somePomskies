
import React, { useState } from 'react';
import { BlogPost } from '../types';

interface BlogPageProps {
  blogPosts: BlogPost[];
  onBackToHome: () => void;
  onReadArticle: (id: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ blogPosts, onBackToHome, onReadArticle }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Health' | 'Training' | 'News'>('All');

  const categories = ['All', 'Health', 'Training', 'News'] as const;
  const filteredPosts = blogPosts.filter(
    post => activeCategory === 'All' || post.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-slate-50">
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
          <h1 className="text-6xl font-black mb-6">Pawsome Blog</h1>
          <p className="text-teal-100 max-w-2xl mx-auto opacity-80 text-xl leading-relaxed">
            Your ultimate resource for Pomsky care, breeding standards, and the latest updates from our kennel.
          </p>
        </div>
      </header>

      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-6">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex bg-slate-100 p-1 rounded-2xl shadow-inner">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-8 py-2.5 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${
                  activeCategory === cat 
                    ? 'bg-teal-600 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-teal-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all group">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {post.category}
                    </span>
                    <time className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {post.date}
                    </time>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-teal-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    {post.excerpt}
                  </p>
                  <button 
                    onClick={() => onReadArticle(post.id)}
                    className="w-full py-4 rounded-2xl border-2 border-teal-600 text-teal-600 font-black uppercase tracking-widest text-[10px] hover:bg-teal-600 hover:text-white transition-all"
                  >
                    Read Full Article
                  </button>
                </div>
              </article>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">📝</div>
              <h3 className="text-2xl font-black text-slate-900">No articles found in this category</h3>
              <p className="text-slate-500 mt-2">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

      <div className="bg-teal-900 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Stay in the Loop</h2>
          <p className="text-teal-100 max-w-xl mx-auto opacity-70 mb-10 leading-relaxed">
            Subscribe to our newsletter to receive the latest breed news, litter updates, and exclusive care tips delivered straight to your inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
