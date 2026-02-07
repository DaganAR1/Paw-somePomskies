import { supabase } from '../lib/supabase'

import React, { useState, useRef, useEffect } from 'react';
import { Puppy, BlogPost, Parent, ScheduleEvent } from '../types';
import { SITE_ASSETS as DEFAULT_ASSETS } from '../constants';

interface AdminDashboardProps {
  puppies: Puppy[];
  setPuppies: React.Dispatch<React.SetStateAction<Puppy[]>>;
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  schedule: ScheduleEvent[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleEvent[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  siteAssets: typeof DEFAULT_ASSETS;
  setSiteAssets: (assets: typeof DEFAULT_ASSETS) => void;
  onBackToHome: () => void;
  onLogout: () => void;
}

const ImageUploader: React.FC<{
  currentImage: string | undefined;
  onImageChange: (base64: string) => void;
  label: string;
  isGallery?: boolean;
}> = ({ currentImage, onImageChange, label, isGallery }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onImageChange(result);
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
  siteAssets, setSiteAssets,
  onBackToHome, onLogout 
}) => {

  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [schedule, setSchedule] = useState<ScheduleEvent[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const [activeTab, setActiveTab] = useState<'puppies' | 'parents' | 'schedule' | 'articles' | 'settings'>('puppies');
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [formData, setFormData] = useState<any>({});
  
  // Local Temp State for Site Settings
  const [tempAssets, setTempAssets] = useState(siteAssets);
  const [emailConfig, setEmailConfig] = useState({
    serviceId: '',
    templateId: '',
    publicKey: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('pawsome_email_config');
    if (saved) {
      try { setEmailConfig(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
  fetchAll();
}, []);

const fetchAll = async () => {
  const [dogsRes, parentsRes, littersRes, articlesRes] = await Promise.all([
    supabase.from('dogs').select('*').order('created_at', { ascending: false }),
    supabase.from('parent_dogs').select('*'),
    supabase.from('litters').select('*'),
    supabase.from('articles').select('*').order('created_at', { ascending: false })
  ]);

  setPuppies(dogsRes.data || []);
  setParents(parentsRes.data || []);
  setSchedule(littersRes.data || []);
  setBlogPosts(articlesRes.data || []);
};



  // --- Handlers ---
  const cancelEdit = () => { setEditingId(null); setFormData({}); };

  const startEdit = (type: string, item: any) => {
    setEditingId(item.id || item.event); // event is the key for schedule
    setFormData({ ...item });
  };

  const startNew = (type: string) => {
    setEditingId('new');
    if (type === 'puppy') setFormData({ name: '', gender: 'Female', status: 'Available', age: '8 Weeks', image: '', description: '' });
    if (type === 'parent') setFormData({ name: '', role: 'Sire', breed: 'F1 Pomsky', weight: '15 lbs', image: '', description: '' });
    if (type === 'schedule') setFormData({ period: 'Seasonal', event: '', date: 'TBD', details: '' });
    if (type === 'article') setFormData({ title: '', excerpt: '', category: 'News', date: new Date().toLocaleDateString(), content: [''] });
  };

  const buildDogPayload = (formData: any) => ({
  name: formData.name,
  description: formData.description || null,
  price: formData.price || null,
  status: formData.status || 'available',
  image_url: formData.image || null
});

alert('HANDLE SAVE FIRED');
const handleSave = async () => {
  let table = '';

  if (activeTab === 'puppies') table = 'dogs';
  if (activeTab === 'parents') table = 'parent_dogs';
  if (activeTab === 'schedule') table = 'litters';
  if (activeTab === 'articles') table = 'articles';

  let res;

 if (editingId === 'new') {
  const payload =
    activeTab === 'puppies'
      ? buildDogPayload(formData)
      : formData;

  res = await supabase.from(table).insert(payload);
} else {
  const payload =
    activeTab === 'puppies'
      ? buildDogPayload(formData)
      : formData;

  res = await supabase.from(table).update(payload).eq('id', editingId);
}


  console.log('SUPABASE SAVE RESPONSE:', res);

  if (res.error) {
    alert(res.error.message);
    return;
  }

  await fetchAll();
  cancelEdit();
};



 const handleDelete = async (id: string | number) => {
  if (!window.confirm('Are you sure?')) return;

  let table = '';
  if (activeTab === 'puppies') table = 'dogs';
  if (activeTab === 'parents') table = 'parent_dogs';
  if (activeTab === 'schedule') table = 'litters';
  if (activeTab === 'articles') table = 'articles';

  await supabase.from(table).delete().eq('id', id);
  await fetchAll();
};



  const saveSiteSettings = () => {
    setSiteAssets(tempAssets);
    localStorage.setItem('pawsome_email_config', JSON.stringify(emailConfig));
    alert("Site appearance and Email settings saved!");
  };

  const getActiveSingular = () => {
    if (activeTab === 'puppies') return 'Puppy';
    if (activeTab === 'parents') return 'Parent';
    if (activeTab === 'schedule') return 'Litter';
    if (activeTab === 'articles') return 'Article';
    return '';
  };

  return (
    <div className="min-h-screen bg-teal-950 text-teal-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-teal-900/40 border-r border-teal-800 p-8 flex flex-col gap-12">
        <div>
          <h1 className="text-2xl font-black text-teal-400 uppercase tracking-tighter">Breeder Portal</h1>
          <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest mt-1">Management Command Center</p>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { id: 'puppies', label: 'Available Pups', icon: '🐾' },
            { id: 'parents', label: 'Breeding Parents', icon: '🐕' },
            { id: 'schedule', label: 'Litter Schedule', icon: '📅' },
            { id: 'articles', label: 'Blog Articles', icon: '📝' },
            { id: 'settings', label: 'Site Branding', icon: '🎨' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); cancelEdit(); }}
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
      <div className="flex-grow p-8 md:p-16 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tight">
              Manage {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-teal-500 font-medium mt-1">Directly control what visitors see on your website.</p>
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
                    value={emailConfig.serviceId} 
                    onChange={e => setEmailConfig({...emailConfig, serviceId: e.target.value})} 
                    placeholder="service_xxxxxxxx" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-teal-600 tracking-widest">Template ID</label>
                  <input 
                    className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none text-white font-mono text-sm" 
                    value={emailConfig.templateId} 
                    onChange={e => setEmailConfig({...emailConfig, templateId: e.target.value})} 
                    placeholder="template_xxxxxxxx" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-teal-600 tracking-widest">Public Key</label>
                  <input 
                    className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none text-white font-mono text-sm" 
                    value={emailConfig.publicKey} 
                    onChange={e => setEmailConfig({...emailConfig, publicKey: e.target.value})} 
                    placeholder="user_xxxxxxxx" 
                  />
                </div>
                <p className="text-[9px] text-teal-600 font-bold leading-relaxed mt-4 italic text-center">
                  * Adoption inquiries will be routed through this service.
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-teal-900/30 p-10 rounded-[2.5rem] border border-teal-800">
              <h3 className="text-xl font-black mb-8 uppercase tracking-widest text-teal-400">Section Backgrounds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ImageUploader label="Hero Banner Image" currentImage={tempAssets.sections.heroBackground} onImageChange={(b) => setTempAssets({...tempAssets, sections: {...tempAssets.sections, heroBackground: b}})} />
                <ImageUploader label="About Us Section Image" currentImage={tempAssets.sections.aboutMain} onImageChange={(b) => setTempAssets({...tempAssets, sections: {...tempAssets.sections, aboutMain: b}})} />
              </div>
            </div>

            <div className="lg:col-span-2 text-center pt-8">
              <button onClick={saveSiteSettings} className="px-16 py-6 bg-teal-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-sm shadow-2xl hover:bg-teal-500 transition-all">Save Portal Settings</button>
            </div>
          </div>
        ) : (
          <div className="bg-teal-900/20 rounded-[3rem] border border-teal-800 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-teal-900/40 border-b border-teal-800">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-teal-500">Preview</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-teal-500">Details</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-teal-500 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-800/50">
                {(activeTab === 'puppies' ? puppies : activeTab === 'parents' ? parents : activeTab === 'schedule' ? schedule : blogPosts).map((item: any, idx: number) => (
                  <tr key={item.id || item.event} className="hover:bg-teal-900/20 transition-colors">
                    <td className="px-10 py-6">
                      {item.image ? (
                        <img src={item.image} className="w-20 h-20 rounded-2xl object-cover border border-teal-800 shadow-xl" />
                      ) : (
                        <div className="w-20 h-20 rounded-2xl bg-teal-900/40 flex items-center justify-center text-2xl">?</div>
                      )}
                    </td>
                    <td className="px-10 py-6">
                      <p className="font-black text-xl text-white tracking-tight uppercase">{item.name || item.title || item.event}</p>
                      <p className="text-teal-500 text-xs font-bold mt-1">
                        {item.status || item.role || item.period || item.category} • {item.age || item.breed || item.date}
                      </p>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => startEdit(activeTab.slice(0, -1), item)} className="p-3 bg-teal-800/40 text-teal-400 rounded-xl hover:bg-teal-800 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                        <button onClick={() => handleDelete(item.id || item.event)} className="p-3 bg-red-950/40 text-red-400 rounded-xl hover:bg-red-900/40 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
                    {activeTab === 'puppies' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Status</label>
                        <select className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                          <option value="Available">Available</option><option value="Reserved">Reserved</option><option value="Adopted">Adopted</option>
                        </select>
                      </div>
                    )}
                    {activeTab === 'parents' && (
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Role</label>
                        <select className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as any})}>
                          <option value="Sire">Sire</option><option value="Dam">Dam</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-teal-600">Description / Details</label>
                    <textarea rows={10} className="w-full px-6 py-4 bg-teal-950/50 border border-teal-800 rounded-3xl focus:ring-2 focus:ring-teal-500 outline-none transition-all" value={formData.description || formData.details || (formData.content ? formData.content.join('\n\n') : '')} onChange={e => {
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
