import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlantContext } from '../context/PlantContext';
import { Sprout } from 'lucide-react';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = usePlantContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full"></div>
        <div className="relative backdrop-blur-xl bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl shadow-2xl">
          
          <div className="flex flex-col items-center mb-8">
            <div className="bg-emerald-500/20 p-4 rounded-full mb-4">
              <Sprout className="w-10 h-10 text-emerald-500" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-wider">PlantHub</h1>
            <p className="text-emerald-500/70 mt-2 text-sm uppercase tracking-widest">Bio-Tech Companion</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-emerald-500/70 mb-2">Secure ID (Email)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="operator@planthub.io"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-500/70 mb-2">Access Code</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#020617] font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              INITIALIZE CONNECTION
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
