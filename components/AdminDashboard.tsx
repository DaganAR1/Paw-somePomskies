
import React, { useState, useRef, useEffect } from 'react';
import { Puppy, BlogPost, Parent, ScheduleEvent } from '../types';
import { SITE_ASSETS as DEFAULT_ASSETS } from '../constants';

interface AdminDashboardProps {
  puppies: Puppy[];
  setPuppies: React.Dispatch<React.SetStateAction<Puppy[]>>;
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  guardianDogs: any[];
  setGuardianDogs: React.Dispatch<React.SetStateAction<any[]>>;
  schedule: ScheduleEvent[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleEvent[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  siteAssets: typeof DEFAULT_ASSETS;
  setSiteAssets: (assets: typeof DEFAULT_ASSETS) => void;
  onBackToHome: () => void;
  onLogout: () => void;
  syncStatus?: 'idle' | 'saving' | 'error';
  lastError?: string | null;
}

const ImageUploader: React.FC<{
  currentImage: string | undefined;
  onImageChange: (base64: string) => void;
  label: string;
  isGallery?: boolean;
  forceSquare?: boolean;
}> = ({ currentImage, onImageChange, label, isGallery, forceSquare }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (forceSquare) {
          const size = Math.min(width, height);
          const targetSize = Math.min(size, 512); // Max 512x512 for square assets
          canvas.width = targetSize;
          canvas.height = targetSize;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, (width - size) / 2, (height - size) / 2, size, size, 0, 0, targetSize, targetSize);
            onImageChange(canvas.toDataURL('image/png'));
            return;
          }
        }

        const maxDimension = 1000; // Max width or height
        if (width > height) {
          if (width > maxDimension) {
            height *= maxDimension / width;
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width *= maxDimension / height;
            height = maxDimension;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Use white background for JPEGs to avoid black transparency
          if (file.type === 'image/jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
          }
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.8);
          onImageChange(compressedBase64);
        } else {
          onImageChange(e.target?.result as string);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-black uppercase text-teal-400 tracking-widest">{label}</label>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`relative ${isGallery ? 'h-32' : 'h-48'} rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-2 group ${
          isDragging ? 'border-teal-500 bg-teal-900/50' : 'border-teal-800 bg-teal-900/20 hover:border-teal-400 hover:bg-teal-900/40'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        {currentImage ? (
          <>
            <img src={currentImage} alt="Preview" className="w-full h-full object-contain p-2" />
            <div className="absolute inset-0 bg-teal-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white font-black uppercase tracking-widest text-[8px] bg-teal-600 px-3 py-1.5 rounded-full shadow-xl">
                Swap Image
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-8 h-8 bg-teal-800 rounded-lg shadow-sm flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            {!isGallery && <p className="text-[10px] font-bold text-teal-500 text-center uppercase tracking-widest">Tap to upload</p>}
          </>
        )}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  puppies, setPuppies,
  parents, setParents,
  guardianDogs, setGuardianDogs,
  schedule, setSchedule,
  blogPosts, setBlogPosts,
  siteAssets, setSiteAssets,
  onBackToHome, onLogout,
  syncStatus = 'idle', lastError = null
}) => {
  const [activeTab, setActiveTab] = useState<'puppies' | 'parents' | 'guardian' | 'schedule' | 'articles' | 'settings'>('puppies');
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Local Temp State for Site Settings
  const [tempAssets, setTempAssets] = useState(siteAssets);

  // --- Handlers ---
  const cancelEdit = () => { setEditingId(null); setFormData({}); };

  const startEdit = (type: string, item: any) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const startNew = (type: string) => {
    setEditingId('new');
    if (type === 'puppy') setFormData({ name: '', gender: 'Female', status: 'Available', age: '8 Weeks', image: '', description: '', coatColor: '', eyeColor: '', weight: '' });
    if (type === 'parent') setFormData({ name: '', role: 'Female', breed: 'F1 Pomsky', weight: '15 lbs', image: '', description: '', age: '2 Years', coatColor: '', eyeColor: '' });
    if (type === 'guardian') setFormData({ name: '', gender: 'Female', breed: 'F2 Pomsky', age: '1 Year', image: '', description: '', status: 'Available' });
    if (type === 'schedule') setFormData({ id: 's' + Date.now(), period: 'Seasonal', event: '', date: 'TBD', details: '' });
    if (type === 'article') setFormData({ title: '', excerpt: '', category: 'News', date: new Date().toLocaleDateString(), content: [''] });
  };

  const handleSave = () => {
    if (activeTab === 'puppies') {
      if (editingId === 'new') setPuppies([...puppies, { ...formData, id: Date.now().toString() }]);
      else setPuppies(puppies.map(p => p.id === editingId ? formData : p));
    } else if (activeTab === 'parents') {
      if (editingId === 'new') setParents([...parents, { ...formData, id: 'p'+Date.now() }]);
      else setParents(parents.map(p => p.id === editingId ? formData : p));
    } else if (activeTab === 'guardian') {
      if (editingId === 'new') setGuardianDogs([...guardianDogs, { ...formData, id: 'g'+Date.now() }]);
      else setGuardianDogs(guardianDogs.map(d => d.id === editingId ? formData : d));
    } else if (activeTab === 'schedule') {
      if (editingId === 'new') setSchedule([...schedule, formData]);
      else setSchedule(schedule.map(s => s.id === editingId ? formData : s));
    } else if (activeTab === 'articles') {
      if (editingId === 'new') setBlogPosts([{ ...formData, id: 'b'+Date.now() }, ...blogPosts]);
      else setBlogPosts(blogPosts.map(a => a.id === editingId ? formData : a));
    }
    cancelEdit();
  };

  const handleDelete = (id: string | number) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    if (activeTab === 'puppies') setPuppies(puppies.filter(p => p.id !== id));
    if (activeTab === 'parents') setParents(parents.filter(p => p.id !== id));
    if (activeTab === 'guardian') setGuardianDogs(guardianDogs.filter(d => d.id !== id));
    if (activeTab === 'schedule') setSchedule(schedule.filter(s => s.id !== id && s.event !== id));
    if (activeTab === 'articles') setBlogPosts(blogPosts.filter(a => a.id !== id));
  };

  const saveSiteSettings = () => {
    setSiteAssets(tempAssets);
    if (tempAssets.emailConfig) {
      localStorage.setItem('pawsome_email_config', JSON.stringify(tempAssets.emailConfig));
    }
    alert("Site appearance and Email settings saved!");
  };

  const getActiveSingular = () => {
    if (activeTab === 'puppies') return 'Puppy';
    if (activeTab === 'parents') return 'Parent';
    if (activeTab === 'guardian') return 'Guardian Dog';
    if (activeTab === 'schedule') return 'Litter';
    if (activeTab === 'articles') return 'Article';
    return '';
  };

  const tabs = [
    { id: 'puppies', label: 'Available Pups', icon: '🐾' },
    { id: 'parents', label: 'Breeding Parents', icon: '🐕' },
    { id: 'guardian', label: 'Guardian Homes', icon: '🏠' },
    { id: 'schedule', label: 'Litter Schedule', icon: '📅' },
    { id: 'articles', label: 'Blog Articles', icon: '📝' },
    { id: 'settings', label: 'Site Branding', icon: '🎨' },
  ];

  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label ?? activeTab;

  return (
    <div className="min-h-screen bg-teal-950 text-teal-50 flex flex-col md:flex-row">

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-teal-950/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar — hidden on mobile until hamburger opens it */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-teal-900 border-r border-teal-800 p-8 flex flex-col gap-10 transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:flex md:bg-teal-900/40
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-teal-400 uppercase tracking-tighter">Breeder Portal</h1>
            <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mt-1">Management Command Center</p>
          </div>
          {/* Close button (mobile only) */}
          <button
            className="md:hidden p-2 rounded-xl text-teal-400 hover:text-white hover:bg-teal-800 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); cancelEdit(); setMobileMenuOpen(false); }}
              className={`w-full text-left px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-4 transition-all ${
                activeTab === tab.id ? 'bg-teal-600 text-white shadow-xl shadow-teal-600/20' : 'text-teal-400/60 hover:bg-teal-900/60 hover:text-teal-400'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-teal-800 space-y-4">
          <button onClick={onBackToHome} className="w-full py-4 text-center text-teal-500 font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors">Exit Portal</button>
          <button onClick={onLogout} className="w-full py-4 bg-red-950/40 text-red-500 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-red-900/30 hover:bg-red-900/40 transition-all">Lock Portal</button>
        </div>
      </div>

      {/* Main Panel */}
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-5 py-4 bg-teal-900/60 border-b border-teal-800 sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl text-teal-400 hover:text-white hover:bg-teal-800 transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-black uppercase tracking-widest text-teal-300">{activeTabLabel}</span>
          {activeTab !== 'settings' && (
            <button
              onClick={() => startNew(activeTab === 'puppies' ? 'puppy' : activeTab.slice(0, -1))}
              className="px-4 py-2 bg-teal-600 text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg hover:bg-teal-500 transition-all"
            >
              + Add
            </button>
          )}
          {activeTab === 'settings' && <div className="w-16" />}
        </div>

      <div className="flex-grow p-5 md:p-16 overflow-y-auto">
        <header className="hidden md:flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-4xl font-black uppercase tracking-tight">
                Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              {syncStatus === 'saving' && (
                <div className="flex items-center gap-2 px-3 py-1 bg-teal-800/50 rounded-full border border-teal-700">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">Syncing...</span>
                </div>
              )}
              {syncStatus === 'error' && (
                <div className="flex items-center gap-2 px-3 py-1 bg-red-900/50 rounded-full border border-red-800">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400" title={lastError || 'Unknown Error'}>Sync Error</span>
                </div>
              )}
            </div>
            <p className="text-teal-500 font-medium mt-1">Directly control what visitors see on your website.</p>
            {syncStatus === 'error' && lastError && (
              <p className="text-red-400 text-[10px] font-bold mt-2 bg-red-950/30 p-2 rounded-lg border border-red-900/30">
                ⚠️ {lastError}. Check your Supabase table schema (missing columns?).
              </p>
            )}
          </div>
          {activeTab !== 'settings' && (
            <button 
              onClick={() => startNew(activeTab === 'puppies' ? 'puppy' : activeTab.slice(0, -1))} 
              className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-teal-600/30 hover:bg-teal-500 hover:-translate-y-1 transition-all"
            >
              Add New {getActiveSingular()}
            </button>
          )}
        </header>

        {activeTab === 'settings' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-teal-900/30 p-10 rounded-[2.5rem] border border-teal-800">
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-teal-400">Logos & Badges</h3>
              <div className="space-y-8">
                <ImageUploader label="Main Website Logo" currentImage={tempAssets.branding.logo} onImageChange={(b) => setTempAssets({...tempAssets, branding: {...tempAssets.branding, logo: b}})} />
                <ImageUploader label="Favicon (Browser Tab Icon)" currentImage={tempAssets.branding.favicon} onImageChange={(b) => setTempAssets({...tempAssets, branding: {...tempAssets.branding, favicon: b}})} forceSquare />
                <ImageUploader label="Good Dog Certification Badge" currentImage={tempAssets.branding.goodDogBadge} onImageChange={(b) => setTempAssets({...tempAssets, branding: {...tempAssets.branding, goodDogBadge: b}})} />
              </div>
            </div>

            <div className="bg-teal-900/30 p-10 rounded-[2.5rem] border border-teal-800">
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-teal-400">Email Integration (EmailJS)</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase text-teal-600 tracking-widest">Service ID</label>
                    <input 
                      className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none text-white font-mono text-sm" 
                      value={tempAssets.emailConfig?.serviceId || ''} 
                      onChange={e => setTempAssets({...tempAssets, emailConfig: {...(tempAssets.emailConfig || {serviceId: '', templateId: '', publicKey: ''}), serviceId: e.target.value}})} 
                      placeholder="service_xxxxxxxx" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase text-teal-600 tracking-widest">Template ID</label>
                    <input 
                      className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none text-white font-mono text-sm" 
                      value={tempAssets.emailConfig?.templateId || ''} 
                      onChange={e => setTempAssets({...tempAssets, emailConfig: {...(tempAssets.emailConfig || {serviceId: '', templateId: '', publicKey: ''}), templateId: e.target.value}})} 
                      placeholder="template_xxxxxxxx" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black uppercase text-teal-600 tracking-widest">Public Key</label>
                    <input 
                      className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none text-white font-mono text-sm" 
                      value={tempAssets.emailConfig?.publicKey || ''} 
                      onChange={e => setTempAssets({...tempAssets, emailConfig: {...(tempAssets.emailConfig || {serviceId: '', templateId: '', publicKey: ''}), publicKey: e.target.value}})} 
                      placeholder="user_xxxxxxxx" 
                    />
                  </div>
                  <p className="text-[9px] text-teal-600 font-bold leading-relaxed mt-4 italic text-center">
                    * Adoption inquiries will be routed through this service. <br/>
                    <a href="https://dashboard.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-400 transition-colors">Find your keys at EmailJS.com</a>
                  </p>
                </div>
            </div>

            <div className="lg:col-span-2 bg-teal-900/30 p-10 rounded-[2.5rem] border border-teal-800">
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-teal-400">Section Backgrounds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <ImageUploader label="Hero Banner Image" currentImage={tempAssets.sections.heroBackground} onImageChange={(b) => setTempAssets({...tempAssets, sections: {...tempAssets.sections, heroBackground: b}})} />
                <ImageUploader label="About Us Section Image" currentImage={tempAssets.sections.aboutMain} onImageChange={(b) => setTempAssets({...tempAssets, sections: {...tempAssets.sections, aboutMain: b}})} />
                <ImageUploader label="Guardian Hero" currentImage={tempAssets.sections.guardianHero} onImageChange={(b) => setTempAssets({...tempAssets, sections: {...tempAssets.sections, guardianHero: b}})} />
                <ImageUploader label="Guardian Program" currentImage={tempAssets.sections.guardianProgram} onImageChange={(b) => setTempAssets({...tempAssets, sections: {...tempAssets.sections, guardianProgram: b}})} />
              </div>
            </div>

            <div className="lg:col-span-2 bg-teal-900/30 p-10 rounded-[2.5rem] border border-teal-800">
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-teal-400">Database Backup & Restore</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-teal-950/40 rounded-2xl border border-teal-800">
                  <h4 className="text-sm font-black uppercase text-teal-500 mb-2">Export Data</h4>
                  <p className="text-[10px] text-teal-600 mb-6 leading-relaxed">Download a complete snapshot of your website data (Puppies, Parents, Blogs, etc.) as a JSON file for safe keeping.</p>
                  <button 
                    onClick={() => {
                      const backup = { puppies, parents, guardianDogs, schedule, blogPosts, siteAssets };
                      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `pawsome_backup_${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                    }}
                    className="w-full py-4 bg-teal-800 text-teal-300 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-teal-700 transition-all"
                  >
                    Download JSON Backup
                  </button>
                </div>
                
                <div className="p-6 bg-teal-950/40 rounded-2xl border border-teal-800">
                  <h4 className="text-sm font-black uppercase text-teal-500 mb-2">Import Data</h4>
                  <p className="text-[10px] text-teal-600 mb-6 leading-relaxed">Restore your website from a previously saved backup file. <span className="text-red-400 font-bold">Warning: This will overwrite current data.</span></p>
                  <input 
                    type="file" 
                    id="restore-upload" 
                    className="hidden" 
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        try {
                          const data = JSON.parse(event.target?.result as string);
                          if (window.confirm("Are you absolutely sure? This will replace all current puppies, parents, and blog posts with the backup data.")) {
                            if (data.puppies) setPuppies(data.puppies);
                            if (data.parents) setParents(data.parents);
                            if (data.guardianDogs) setGuardianDogs(data.guardianDogs);
                            if (data.schedule) setSchedule(data.schedule);
                            if (data.blogPosts) setBlogPosts(data.blogPosts);
                            if (data.siteAssets) setSiteAssets(data.siteAssets);
                            alert("Restore successful! Your changes are being synced to Supabase.");
                          }
                        } catch (err) {
                          alert("Invalid backup file format.");
                        }
                      };
                      reader.readAsText(file);
                    }}
                  />
                  <button 
                    onClick={() => document.getElementById('restore-upload')?.click()}
                    className="w-full py-4 bg-teal-900/60 text-teal-500 border border-teal-800 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-teal-800 transition-all"
                  >
                    Upload & Restore
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 text-center pt-8">
              <button onClick={saveSiteSettings} className="px-16 py-6 bg-teal-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-teal-500 transition-all">Save Portal Settings</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {(activeTab === 'puppies' ? puppies : activeTab === 'parents' ? parents : activeTab === 'guardian' ? guardianDogs : activeTab === 'schedule' ? schedule : blogPosts).map((item: any, idx: number) => (
              <div key={item?.id || item?.event || idx} className="bg-teal-900/30 border border-teal-800 rounded-3xl overflow-hidden flex flex-col">
                {/* Image */}
                <div className="h-40 bg-teal-950/40 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">?</span>
                  )}
                </div>
                {/* Details */}
                <div className="p-4 flex-grow">
                  <p className="font-black text-base text-white tracking-tight uppercase leading-tight">{item.name || item.title || item.event}</p>
                  <p className="text-teal-500 text-[11px] font-bold mt-1">
                    {[item.status || item.period || item.category, item.gender || item.role, item.age || item.breed || item.date].filter(Boolean).join(' • ')}
                  </p>
                </div>
                {/* Actions */}
                <div className="flex border-t border-teal-800">
                  <button
                    onClick={() => startEdit(activeTab.slice(0, -1), item)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-teal-400 hover:bg-teal-800/40 transition-colors font-black text-[10px] uppercase tracking-widest"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    Edit
                  </button>
                  <div className="w-px bg-teal-800" />
                  <button
                    onClick={() => handleDelete(item.id || item.event)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 text-red-400 hover:bg-red-950/40 transition-colors font-black text-[10px] uppercase tracking-widest"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-teal-950/90 backdrop-blur-xl" onClick={cancelEdit}></div>
          <div className="relative bg-teal-900 border border-teal-800 w-full max-w-4xl rounded-[3rem] shadow-[0_0_100px_rgba(13,148,136,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
            <header className="p-10 border-b border-teal-800 flex justify-between items-center bg-teal-900/50">
              <h3 className="text-3xl font-black uppercase tracking-tight">Edit {getActiveSingular()}</h3>
              <button onClick={cancelEdit} className="text-teal-500 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>
            
            <div className="p-10 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                  <ImageUploader label="Profile Image" currentImage={formData.image} onImageChange={(b) => setFormData({...formData, image: b})} />
                  
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Name / Title</label>
                        <input className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.name || formData.title || formData.event || ''} onChange={e => setFormData({...formData, [activeTab === 'schedule' ? 'event' : activeTab === 'articles' ? 'title' : 'name']: e.target.value})} />
                      </div>
                      {activeTab === 'articles' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Category</label>
                            <select 
                              className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                              value={formData.category || 'News'} 
                              onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                              <option value="Health">Health</option>
                              <option value="Training">Training</option>
                              <option value="News">News</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Excerpt</label>
                            <input 
                              className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" 
                              value={formData.excerpt || ''} 
                              onChange={e => setFormData({...formData, excerpt: e.target.value})}
                              placeholder="Short summary of the article..."
                            />
                          </div>
                        </>
                      )}
                      {(activeTab === 'puppies' || activeTab === 'parents') && (
                        <>
                          {activeTab === 'puppies' && (
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Status</label>
                              <select className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                                <option value="Available">Available</option><option value="Reserved">Reserved</option><option value="Adopted">Adopted</option>
                              </select>
                            </div>
                          )}
                          {activeTab === 'guardian' && (
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Status</label>
                              <select className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                                <option value="Available">Available</option><option value="Found">Found</option>
                              </select>
                            </div>
                          )}
                          {(activeTab === 'puppies' || activeTab === 'parents' || activeTab === 'guardian') && (
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Gender</label>
                              <select className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={activeTab === 'puppies' || activeTab === 'guardian' ? formData.gender : formData.role} onChange={e => setFormData({...formData, [activeTab === 'puppies' || activeTab === 'guardian' ? 'gender' : 'role']: e.target.value as any})}>
                                <option value="Male">Male</option><option value="Female">Female</option>
                              </select>
                            </div>
                          )}
                          {(activeTab === 'parents' || activeTab === 'guardian') && (
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Breed</label>
                              <input className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.breed || ''} onChange={e => setFormData({...formData, breed: e.target.value})} placeholder="e.g. F1 Pomsky" />
                            </div>
                          )}
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Age</label>
                            <input className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.age || ''} onChange={e => setFormData({...formData, age: e.target.value})} placeholder={activeTab === 'puppies' ? "e.g. 8 Weeks" : "e.g. 2 Years"} />
                          </div>
                          {(activeTab === 'puppies' || activeTab === 'parents') && (
                            <>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Coat Color</label>
                                <input className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.coatColor || ''} onChange={e => setFormData({...formData, coatColor: e.target.value})} placeholder="e.g. Husky Grey" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Eye Color</label>
                                <input className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.eyeColor || ''} onChange={e => setFormData({...formData, eyeColor: e.target.value})} placeholder="e.g. Double Blue" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Weight</label>
                                <input className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.weight || ''} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder={activeTab === 'puppies' ? "e.g. 4 lbs" : "e.g. 15 lbs"} />
                              </div>
                            </>
                          )}
                        </>
                      )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Description / Details</label>
                    <textarea rows={10} className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-3xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.description || formData.details || (Array.isArray(formData.content) ? formData.content.join('\n\n') : '')} onChange={e => {
                      if (activeTab === 'articles') setFormData({...formData, content: e.target.value.split('\n\n')});
                      else if (activeTab === 'schedule') setFormData({...formData, details: e.target.value});
                      else setFormData({...formData, description: e.target.value});
                    }} />
                  </div>
                </div>
              </div>
            </div>

            <footer className="p-10 border-t border-teal-800 bg-teal-900/50 flex justify-end gap-4">
              <button onClick={cancelEdit} className="px-10 py-4 text-teal-500 font-black uppercase tracking-widest text-[10px]">Discard Changes</button>
              <button onClick={handleSave} className="px-12 py-4 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-teal-600/30 hover:bg-teal-500 transition-all">Save {getActiveSingular()}</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
