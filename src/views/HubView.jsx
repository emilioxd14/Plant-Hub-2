import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, LogOut, Activity, Droplets, Sun, Thermometer } from 'lucide-react';
import { usePlantContext } from '../context/PlantContext';
import AlertBanner from '../components/AlertBanner';


const HubView = () => {
  const { plants, logout } = usePlantContext();
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Optimal': return 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
      case 'Warning': return 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]';
      case 'Critical': return 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      default: return 'bg-gray-500';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="flex justify-between items-center mb-12 relative z-10">
        <div className="flex items-center gap-3">
          <Activity className="w-8 h-8 text-emerald-500" />
          <h1 className="text-2xl font-bold tracking-widest uppercase">System Hub</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/store" className="text-emerald-500/70 hover:text-emerald-400 transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </Link>
          <button onClick={handleLogout} className="text-emerald-500/70 hover:text-red-400 transition-colors">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Alert Banner */}
      <AlertBanner />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
        {plants.map(plant => (
          <Link 
            to={`/plant/${plant.id}`} 
            key={plant.id}
            className="group block"
          >
            <div className="backdrop-blur-xl bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl transition-all duration-300 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold">{plant.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-wider">{plant.status}</span>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(plant.status)}`}></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 rounded-2xl bg-[#020617]/50 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <Droplets className="w-5 h-5 text-blue-400 mb-2" />
                  <span className="text-sm font-mono">{plant.moisture}%</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-[#020617]/50 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <Sun className="w-5 h-5 text-yellow-400 mb-2" />
                  <span className="text-sm font-mono">{plant.light}%</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-2xl bg-[#020617]/50 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                  <Thermometer className="w-5 h-5 text-orange-400 mb-2" />
                  <span className="text-sm font-mono">{plant.temperature}°C</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HubView;
