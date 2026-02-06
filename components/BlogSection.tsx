
import React from 'react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogPosts: BlogPost[];
  onViewAll: () => void;
  onReadArticle: (id: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ blogPosts, onViewAll, onReadArticle }) => {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-4 text-slate-900">Breeder Insights</h2>
            <p className="text-slate-600 text-lg">
              Explore our latest articles on Pomsky health, training tips, and community news.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="group flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors uppercase tracking-widest text-sm"
          >
            Read All Articles
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.slice(0, 3).map((post) => (
            <article key={post.id} className="group cursor-pointer" onClick={() => onReadArticle(post.id)}>
              <div className="relative h-64 overflow-hidden rounded-[2rem] mb-6 shadow-xl border border-slate-100">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-teal-600 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <time className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">
                  {post.date}
                </time>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-teal-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="text-teal-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
