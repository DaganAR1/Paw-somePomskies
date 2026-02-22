
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

        setPuppies(p || []);
        setParents(par || []);
        setSchedule(s || []);
        setBlogPosts(b || []);
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
    if (isInitialLoadDone) {
      setSyncStatus('saving');
      dataService.savePuppies(puppies)
        .then(() => setSyncStatus('idle'))
        .catch(err => {
          console.error(err);
          setSyncStatus('error');
          setLastError(err.message || 'Failed to save puppies');
        });
      localStorage.setItem('pawsome_puppies', JSON.stringify(puppies)); 
    }
  }, [puppies, isInitialLoadDone]);

  useEffect(() => { 
    if (isInitialLoadDone) {
      setSyncStatus('saving');
      dataService.saveParents(parents)
        .then(() => setSyncStatus('idle'))
        .catch(err => {
          console.error(err);
          setSyncStatus('error');
          setLastError(err.message || 'Failed to save parents');
        });
      localStorage.setItem('pawsome_parents', JSON.stringify(parents)); 
    }
  }, [parents, isInitialLoadDone]);

  useEffect(() => { 
    if (isInitialLoadDone) {
      setSyncStatus('saving');
      dataService.saveSchedule(schedule)
        .then(() => setSyncStatus('idle'))
        .catch(err => {
          console.error(err);
          setSyncStatus('error');
          setLastError(err.message || 'Failed to save schedule');
        });
      localStorage.setItem('pawsome_schedule', JSON.stringify(schedule)); 
    }
  }, [schedule, isInitialLoadDone]);

  useEffect(() => { 
    if (isInitialLoadDone) {
      setSyncStatus('saving');
      dataService.saveBlogPosts(blogPosts)
        .then(() => setSyncStatus('idle'))
        .catch(err => {
          console.error(err);
          setSyncStatus('error');
          setLastError(err.message || 'Failed to save blog posts');
        });
      localStorage.setItem('pawsome_blogs', JSON.stringify(blogPosts)); 
    }
  }, [blogPosts, isInitialLoadDone]);

  useEffect(() => { 
    if (isInitialLoadDone) {
      setSyncStatus('saving');
      dataService.saveSiteAssets(siteAssets)
        .then(() => {
          setSyncStatus('idle');
          if (siteAssets.emailConfig) {
            localStorage.setItem('pawsome_email_config', JSON.stringify(siteAssets.emailConfig));
          }
        })
        .catch(err => {
          console.error(err);
          setSyncStatus('error');
          setLastError(err.message || 'Failed to save site assets');
        });
      localStorage.setItem('pawsome_assets', JSON.stringify(siteAssets)); 
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
          <p className="text-teal-400 font-black uppercase tracking-widest text-xs">Connecting to Cloud...</p>
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
              <a href={`mailto:${BREEDER_CONTACT_EMAIL}`} className="text-teal-400 hover:underline text-sm break-all font-mono">{BREEDER_CONTACT_EMAIL}</a>
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
