
import React, { useState } from 'react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onAuthenticated }) => {
  const [passphrase, setPassphrase] = useState('');
  const [error, setError] = useState(false);

  // You can change this passphrase to whatever you like
  const SECRET_PASSPHRASE = 'AmongUs';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passphrase === SECRET_PASSPHRASE) {
      onAuthenticated();
      setPassphrase('');
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
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
          <p className="text-teal-400 text-xs font-bold uppercase tracking-[0.2em] mt-2">Restricted Area</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Master Passphrase</label>
            <input 
              autoFocus
              type="password"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className={`w-full px-6 py-4 bg-slate-50 border ${error ? 'border-red-500 bg-red-50' : 'border-slate-100'} rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold tracking-widest transition-all`}
              placeholder="••••••••••••"
            />
            {error && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-wider text-center">Incorrect Passphrase. Please try again.</p>}
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-teal-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-teal-500 transition-all shadow-xl shadow-teal-600/20"
          >
            Authenticate
          </button>
          
          <button 
            type="button"
            onClick={onClose}
            className="w-full text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
