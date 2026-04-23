
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      onAuthenticated();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setTimeout(() => setError(null), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-teal-900 p-8 text-white text-center">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-2xl font-black">Breeder Access</h2>
          <p className="text-teal-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Secure Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Admin Email</label>
            <input 
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold transition-all"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-2">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold tracking-widest transition-all"
              placeholder="••••••••••••"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider text-center">{error}</p>
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/20 disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
          
          <button 
            type="button"
            onClick={onClose}
            className="w-full text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-[9px] text-slate-400 text-center leading-relaxed">
              To secure your database, you must create an admin user in your 
              <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline mx-1">Supabase Dashboard</a> 
              under Authentication &gt; Users.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
