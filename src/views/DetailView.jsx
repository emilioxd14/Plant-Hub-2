import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlantContext } from '../context/PlantContext';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DetailView = () => {
  const { id } = useParams();
  const { plants } = usePlantContext();
  const plant = plants.find(p => p.id === id);

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white">Plant not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <header className="mb-8 flex items-center gap-4 relative z-10">
        <Link to="/" className="p-2 backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
          <ArrowLeft className="w-6 h-6 text-emerald-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-widest">{plant.name}</h1>
          <p className="text-emerald-500/70 text-sm font-mono uppercase">ID: {plant.id} // Status: {plant.status}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Container */}
          <div className="backdrop-blur-xl bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-3xl h-[400px]">
            <h3 className="text-sm font-mono text-emerald-500/70 mb-6 uppercase tracking-wider">Moisture & Light Telemetry</h3>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={plant.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#10b981" strokeOpacity={0.1} />
                <XAxis dataKey="time" stroke="#10b981" strokeOpacity={0.5} tick={{fill: '#10b981', fillOpacity: 0.7, fontSize: 12}} />
                <YAxis stroke="#10b981" strokeOpacity={0.5} tick={{fill: '#10b981', fillOpacity: 0.7, fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', borderColor: '#10b981', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="moisture" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMoisture)" />
                <Area type="monotone" dataKey="light" stroke="#eab308" fillOpacity={1} fill="url(#colorLight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          {/* AI Insights Panel */}
          <div className="backdrop-blur-xl bg-[#020617]/80 border border-emerald-500/30 p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl"></div>
            <div className="flex items-center gap-3 mb-6 border-b border-emerald-500/20 pb-4">
              <BrainCircuit className="w-6 h-6 text-emerald-400" />
              <h3 className="font-semibold text-emerald-500 tracking-wider">AI INSIGHTS</h3>
            </div>
            
            <ul className="space-y-4">
              {plant.status === 'Optimal' && (
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">Current conditions are ideal. Water consumption rate is stable at 12ml/day.</p>
                </li>
              )}
              {plant.status === 'Warning' && (
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">Moisture levels are dropping faster than historical averages. Prepare to water within 48 hours.</p>
                </li>
              )}
              {plant.status === 'Critical' && (
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">Immediate action required. Substrate is critically dry, risking root damage.</p>
                </li>
              )}
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                <p className="text-sm text-gray-300 leading-relaxed">Predicted temperature drop tonight. Ensure plant is away from drafty windows.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
