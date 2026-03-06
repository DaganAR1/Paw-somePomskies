
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Puppies from './components/Puppies';
import Schedule from './components/Schedule';
import BlogSection from './components/BlogSection';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import AiAssistant from './components/AiAssistant';
import AdoptionModal from './components/AdoptionModal';
import PuppyGallery from './components/PuppyGallery';
import PuppyProfile from './components/PuppyProfile';
import MeetTheParents from './components/MeetTheParents';
import AdminDashboard from './components/AdminDashboard';
import AboutPage from './components/AboutPage';
import SchedulePage from './components/SchedulePage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import ContactPage from './components/ContactPage';
import WaitlistPage from './components/WaitlistPage';
import AdminLoginModal from './components/AdminLoginModal';
import { 
  INITIAL_PUPPIES, 
  SITE_ASSETS as DEFAULT_ASSETS, 
  INITIAL_BLOG_POSTS, 
  INITIAL_PARENTS,
  INITIAL_SCHEDULE,
  SOCIAL_LINKS, 
  BREEDER_CONTACT_EMAIL,
  BREEDER_PHONE
} from './constants';
import { Puppy, BlogPost, Parent, ScheduleEvent } from './types';
import { dataService } from './services/dataService';

type View = 'home' | 'puppies' | 'puppy-profile' | 'parents' | 'about' | 'schedule' | 'blog' | 'article' | 'contact' | 'admin' | 'waitlist';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedPuppyId, setSelectedPuppyId] = useState<string | null>(null);
  
  // -- GLOBAL STATE ENTITIES --
  const [puppies, setPuppies] = useState<Puppy[]>(INITIAL_PUPPIES);
  const [parents, setParents] = useState<Parent[]>(INITIAL_PARENTS);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>(INITIAL_SCHEDULE);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [siteAssets, setSiteAssets] = useState(DEFAULT_ASSETS);

  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adoptionInquiryName, setAdoptionInquiryName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [lastError, setLastError] = useState<string | null>(null);

  // -- HELPERS --
  const safeSaveLocal = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed to save ${key} to localStorage:`, e);
      // If quota exceeded, we might want to clear some old data or just ignore
    }
  };

  // -- DATA SYNC ENGINE (LOAD) --
  useEffect(() => {
    // Session Check
    const adminSession = sessionStorage.getItem('pawsome_admin_active');
    if (adminSession === 'true') setIsAdmin(true);

    const initData = async () => {
      try {
        const [p, par, s, b, a] = await Promise.all([
          dataService.getPuppies(),
          dataService.getParents(),
          dataService.getSchedule(),
          dataService.getBlogPosts(),
          dataService.getSiteAssets()
        ]);

        if (p && p.length > 0) {
  setPuppies(p);
  }

if (par && par.length > 0) {
  setParents(par);
}

if (s && s.length > 0) {
  setSchedule(s);
}

if (b && b.length > 0) {
  setBlogPosts(b);
}
        if (a) {
          setSiteAssets(prev => ({
            ...prev,
            ...a,
            branding: { ...prev.branding, ...(a.branding || {}) },
            sections: { ...prev.sections, ...(a.sections || {}) },
            emailConfig: { ...prev.emailConfig, ...(a.emailConfig || {}) }
          }));
        }
      } catch (error) {
        console.error('Error loading data from Supabase:', error);
        // Fallback to localStorage if Supabase fails
        const loadLocal = (key: string, setter: any, defaultVal: any) => {
          const saved = localStorage.getItem(key);
          if (saved) { try { setter(JSON.parse(saved)); } catch (e) { setter(defaultVal); } }
        };
        loadLocal('pawsome_puppies', setPuppies, INITIAL_PUPPIES);
        loadLocal('pawsome_parents', setParents, INITIAL_PARENTS);
        loadLocal('pawsome_schedule', setSchedule, INITIAL_SCHEDULE);
        loadLocal('pawsome_blogs', setBlogPosts, INITIAL_BLOG_POSTS);
        loadLocal('pawsome_assets', setSiteAssets, DEFAULT_ASSETS);
      } finally {
        setIsLoading(false);
        setIsInitialLoadDone(true);
      }
    };

    initData();
  }, []);

  // -- DATA SYNC ENGINE (SAVE) --
  // We only save to Supabase if the initial load is done to avoid overwriting with defaults
  useEffect(() => { 
  if (isInitialLoadDone && puppies.length > 0) {
    setSyncStatus('saving');
    dataService.savePuppies(puppies)
      .then(() => setSyncStatus('idle'))
      .catch(err => {
        console.error(err);
        setSyncStatus('error');
        setLastError(err.message || 'Failed to save puppies');
      });
    safeSaveLocal('pawsome_puppies', puppies); 
  }
}, [puppies, isInitialLoadDone]);

  useEffect(() => { 
  if (isInitialLoadDone && parents.length > 0) {
    setSyncStatus('saving');
    dataService.saveParents(parents)
      .then(() => setSyncStatus('idle'))
      .catch(err => {
        console.error(err);
        setSyncStatus('error');
        setLastError(err.message || 'Failed to save parents');
      });
    safeSaveLocal('pawsome_parents', parents); 
  }
}, [parents, isInitialLoadDone]);

  useEffect(() => { 
  if (isInitialLoadDone && schedule.length > 0) {
    setSyncStatus('saving');
    dataService.saveSchedule(schedule)
      .then(() => setSyncStatus('idle'))
      .catch(err => {
        console.error(err);
        setSyncStatus('error');
        setLastError(err.message || 'Failed to save schedule');
      });
    safeSaveLocal('pawsome_schedule', schedule); 
  }
}, [schedule, isInitialLoadDone]);

  useEffect(() => { 
  if (isInitialLoadDone && blogPosts.length > 0) {
    setSyncStatus('saving');
    dataService.saveBlogPosts(blogPosts)
      .then(() => setSyncStatus('idle'))
      .catch(err => {
        console.error(err);
        setSyncStatus('error');
        setLastError(err.message || 'Failed to save blog posts');
      });
    safeSaveLocal('pawsome_blogs', blogPosts); 
  }
}, [blogPosts, isInitialLoadDone]);

  useEffect(() => { 
  if (isInitialLoadDone) {
    setSyncStatus('saving');
    dataService.saveSiteAssets(siteAssets)
      .then(() => {
        setSyncStatus('idle');
        if (siteAssets.emailConfig) {
          safeSaveLocal('pawsome_email_config', siteAssets.emailConfig);
        }
      })
      .catch(err => {
        console.error(err);
        setSyncStatus('error');
        setLastError(err.message || 'Failed to save site assets');
      });
    safeSaveLocal('pawsome_assets', siteAssets); 
  }
}, [siteAssets, isInitialLoadDone]);

  const navigateTo = (view: View, id?: string) => {
    if (view === 'admin' && !isAdmin) { setIsLoginModalOpen(true); return; }
    if (view === 'article' && id) setSelectedArticleId(id);
    if (view === 'puppy-profile' && id) setSelectedPuppyId(id);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleAdminAuth = () => {
    setIsAdmin(true);
    sessionStorage.setItem('pawsome_admin_active', 'true');
    setIsLoginModalOpen(false);
    navigateTo('admin');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('pawsome_admin_active');
    navigateTo('home');
  };

  const selectedArticle = selectedArticleId ? blogPosts.find(p => p.id === selectedArticleId) : null;
  const selectedPuppy = selectedPuppyId ? puppies.find(p => p.id === selectedPuppyId) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-teal-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-400 font-black uppercase tracking-widest text-xs">Preparing your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <Navbar 
        logo={siteAssets.branding.logo}
        onOpenAdoption={() => setIsAdoptionModalOpen(true)} 
        onNavigateHome={() => navigateTo('home')}
        onNavigatePuppies={() => navigateTo('puppies')}
        onNavigateParents={() => navigateTo('parents')}
        onNavigateSchedule={() => navigateTo('schedule')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateBlog={() => navigateTo('blog')}
        onNavigateContact={() => navigateTo('contact')}
      />
      
      <div className="flex-grow">
        {currentView === 'home' && (
          <main>
            <Hero 
              logo={siteAssets.branding.logo}
              backgroundImage={siteAssets.sections.heroBackground}
              onOpenAdoption={() => setIsAdoptionModalOpen(true)} 
              onNavigateAbout={() => navigateTo('about')}
            />
            <About image={siteAssets.sections.aboutMain} />
            <Puppies 
              puppies={puppies} 
              onOpenAdoption={(n) => { setAdoptionInquiryName(n); setIsAdoptionModalOpen(true); }} 
              onViewPuppy={(id) => navigateTo('puppy-profile', id)}
              onViewAll={() => navigateTo('puppies')} 
            />
            <Schedule schedule={schedule} onJoinWaitlist={() => navigateTo('waitlist')} />
            <BlogSection 
              blogPosts={blogPosts}
              onViewAll={() => navigateTo('blog')} 
              onReadArticle={(id) => navigateTo('article', id)}
            />
            <Reviews />
            <Contact puppies={puppies} />
          </main>
        )}

        {currentView === 'puppies' && (
          <PuppyGallery 
            puppies={puppies} 
            onOpenAdoption={(n) => { setAdoptionInquiryName(n); setIsAdoptionModalOpen(true); }} 
            onViewPuppy={(id) => navigateTo('puppy-profile', id)}
            onBackToHome={() => navigateTo('home')} 
            onNavigateParents={() => navigateTo('parents')}
            onNavigateSchedule={() => navigateTo('schedule')}
          />
        )}

        {currentView === 'puppy-profile' && selectedPuppy && (
          <PuppyProfile 
            puppy={selectedPuppy}
            onOpenAdoption={(n) => { setAdoptionInquiryName(n); setIsAdoptionModalOpen(true); }}
            onBack={() => navigateTo('puppies')}
          />
        )}

        {currentView === 'parents' && (
          <MeetTheParents 
            parents={parents}
            onBackToHome={() => navigateTo('home')} 
            onNavigatePuppies={() => navigateTo('puppies')}
            onNavigateSchedule={() => navigateTo('schedule')}
          />
        )}

        {currentView === 'schedule' && (
          <SchedulePage 
            schedule={schedule}
            onBackToHome={() => navigateTo('home')} 
            onNavigateWaitlist={() => navigateTo('waitlist')} 
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            puppies={puppies} setPuppies={setPuppies} 
            parents={parents} setParents={setParents}
            schedule={schedule} setSchedule={setSchedule}
            blogPosts={blogPosts} setBlogPosts={setBlogPosts}
            siteAssets={siteAssets} setSiteAssets={setSiteAssets}
            onBackToHome={() => navigateTo('home')} 
            onLogout={handleLogout}
            syncStatus={syncStatus}
            lastError={lastError}
          />
        )}

        {/* Support Pages */}
        {currentView === 'about' && <AboutPage image={siteAssets.sections.aboutMain} onBackToHome={() => navigateTo('home')} />}
        {currentView === 'blog' && <BlogPage blogPosts={blogPosts} onBackToHome={() => navigateTo('home')} onReadArticle={(id) => navigateTo('article', id)} />}
        {currentView === 'article' && selectedArticle && <BlogPostPage post={selectedArticle} onBackToBlog={() => navigateTo('blog')} />}
        {currentView === 'contact' && <ContactPage puppies={puppies} onBackToHome={() => navigateTo('home')} />}
        {currentView === 'waitlist' && <WaitlistPage onBackToHome={() => navigateTo('home')} />}
      </div>

      <footer className="bg-teal-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={siteAssets.branding.logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-teal-400">Paw-some Pomskies</h3>
              </div>
              <p className="opacity-70 leading-relaxed text-sm mb-6">
                Elevating the Pomsky breed through ethical practices, DNA testing, and unshakeable love.
              </p>
              <div className="flex justify-center md:justify-start">
                <a href={SOCIAL_LINKS.goodDog} target="_blank" rel="noopener noreferrer" className="block w-32 transition-transform hover:scale-105">
                  <img src={siteAssets.branding.goodDogBadge} alt="Good Dog Badge" className="w-full h-auto" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Explore</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><button onClick={() => navigateTo('home')} className="hover:text-teal-400 transition-colors">Home</button></li>
                <li><button onClick={() => navigateTo('parents')} className="hover:text-teal-400 transition-colors">Meet the Parents</button></li>
                <li><button onClick={() => navigateTo('puppies')} className="hover:text-teal-400 transition-colors">Available Pups</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Knowledge</h4>
              <ul className="space-y-4 opacity-70 text-sm">
                <li><button onClick={() => navigateTo('blog')} className="hover:text-teal-400 transition-colors">Breeder Blog</button></li>
                <li><button onClick={() => navigateTo('schedule')} className="hover:text-teal-400 transition-colors">Schedule</button></li>
                <li><button onClick={() => navigateTo('admin')} className="text-teal-500 font-bold hover:text-teal-400 flex items-center gap-2 justify-center md:justify-start">
                  Breeder Portal
                </button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Connect</h4>
              <p className="opacity-70 mb-2 text-sm font-bold">North Texas</p>
              <p className="opacity-70 mb-4 text-sm">{BREEDER_PHONE}</p>
              <a href={`mailto:${BREEDER_CONTACT_EMAIL}`} className="text-teal-400 hover:underline text-sm break-all font-mono block mb-6">{BREEDER_CONTACT_EMAIL}</a>
              
              <div className="flex justify-center md:justify-start gap-4">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-900 rounded-xl flex items-center justify-center text-teal-400 hover:bg-teal-600 hover:text-white transition-all shadow-lg" title="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-900 rounded-xl flex items-center justify-center text-teal-400 hover:bg-teal-600 hover:text-white transition-all shadow-lg" title="TikTok">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-teal-900 rounded-xl flex items-center justify-center text-teal-400 hover:bg-teal-600 hover:text-white transition-all shadow-lg" title="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-teal-900 text-center opacity-40 text-[10px] uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Paw-some Pomskies. Handcrafted for Excellence.
          </div>
        </div>
      </footer>

      <AiAssistant />
      <AdoptionModal 
        logo={siteAssets.branding.logo}
        isOpen={isAdoptionModalOpen} 
        onClose={() => setIsAdoptionModalOpen(false)} 
        initialPuppy={adoptionInquiryName}
      />
      <AdminLoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onAuthenticated={handleAdminAuth}
      />
    </div>
  );
};

export default App;
