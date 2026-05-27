import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Settings, Droplet, Plane, Camera, Brain, Loader2, RefreshCw } from 'lucide-react';
import { usePlantContext } from '../context/PlantContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function PlantDetailView() {
  const { id } = useParams();
  const { plants } = usePlantContext();
  const plant = plants.find(p => p.id === id);
  const [selectedMode, setSelectedMode] = useState('ai');
  const [imageSrc, setImageSrc] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      setScanning(true);
      setAnalysisResult(null);

      // Simulate computer vision analysis taking 3 seconds
      setTimeout(() => {
        setScanning(false);
        setAnalysisResult({
          score: Math.floor(Math.random() * 15) + 82, // 82 to 96
          status: "Optimal Hydration & Foliage Health",
          details: "AI Neural Vision detects healthy chlorophyll concentration. Stomata apertures and leaf turgor pressure indicate excellent transpiration. No pathogens, necrosis, or spider mites spotted."
        });
      }, 3000);
    }
  };

  if (!plant) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a100d] text-white">
        <div className="text-center">
          <p className="text-xl mb-4">Plant not found.</p>
          <Link to="/" className="text-emerald-500 hover:text-emerald-400">Return to Hub</Link>
        </div>
      </div>
    );
  }

  // Use the plant's history if available, otherwise fallback
  const chartData = plant.history || [
    { time: '0:00', moisture: plant.moisture, light: plant.light },
    { time: '23:00', moisture: plant.moisture, light: plant.light },
  ];

  return (
    <div className="h-screen overflow-y-auto p-6 bg-[#0a100d] text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/50">
            <ArrowLeft className="w-6 h-6 text-white" />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">{plant.name}</h1>
            <p className="text-teal-400 font-medium">Status: {plant.status}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Historical Telemetry 24h */}
          <section className="lg:col-span-2 bg-[#121c17]/60 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-lg font-medium text-white mb-6">Historical Telemetry 24h</h2>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#6b7280" 
                    tick={{ fill: '#6b7280', fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    yAxisId="left" 
                    stroke="#2dd4bf" 
                    domain={[0, 40]} 
                    tick={{ fill: '#2dd4bf', fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false} 
                    dx={-10}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#facc15" 
                    domain={[0, 1000]} 
                    tick={{ fill: '#facc15', fontSize: 12 }} 
                    axisLine={false} 
                    tickLine={false}
                    dx={10} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a100d', border: '1px solid #222', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="moisture" 
                    name="Moisture (%)" 
                    stroke="#2dd4bf" 
                    strokeWidth={3} 
                    dot={false} 
                    activeDot={{ r: 6, strokeWidth: 0 }} 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="light" 
                    name="Light (lx)" 
                    stroke="#facc15" 
                    strokeWidth={3} 
                    dot={false} 
                    activeDot={{ r: 6, strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Actuator Controls */}
          <section className="lg:col-span-1 flex flex-col gap-4">
            <h2 className="text-lg font-medium text-white mb-2">Actuator Controls</h2>
            
            {/* AI Automated Target */}
            <button 
              onClick={() => setSelectedMode('ai')}
              className={`flex items-center p-4 rounded-2xl transition-all text-left cursor-pointer group ${
                selectedMode === 'ai' 
                  ? 'bg-[#121c17] border border-teal-500/50 shadow-lg shadow-teal-900/20 text-white' 
                  : 'bg-[#0d1511] border border-white/5 text-gray-400 hover:text-gray-300 hover:bg-[#121c17]'
              }`}
            >
              <div className={`p-3 rounded-xl mr-4 transition-colors ${
                selectedMode === 'ai' ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
              }`}>
                <Settings className="w-6 h-6" />
              </div>
              <span className="flex-1 font-medium">AI Automated Target</span>
              {selectedMode === 'ai' && (
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              )}
            </button>

            {/* Manual Override */}
            <button 
              onClick={() => setSelectedMode('manual')}
              className={`flex items-center p-4 rounded-2xl transition-all text-left cursor-pointer group ${
                selectedMode === 'manual' 
                  ? 'bg-[#121c17] border border-teal-500/50 shadow-lg shadow-teal-900/20 text-white' 
                  : 'bg-[#0d1511] border border-white/5 text-gray-400 hover:text-gray-300 hover:bg-[#121c17]'
              }`}
            >
              <div className={`p-3 rounded-xl mr-4 transition-colors ${
                selectedMode === 'manual' ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
              }`}>
                <Droplet className="w-6 h-6" />
              </div>
              <span className="flex-1 font-medium">Manual Override</span>
              {selectedMode === 'manual' && (
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              )}
            </button>

            {/* Vacation Mode */}
            <button 
              onClick={() => setSelectedMode('vacation')}
              className={`flex items-center p-4 rounded-2xl transition-all text-left cursor-pointer group ${
                selectedMode === 'vacation' 
                  ? 'bg-[#121c17] border border-teal-500/50 shadow-lg shadow-teal-900/20 text-white' 
                  : 'bg-[#0d1511] border border-white/5 text-gray-400 hover:text-gray-300 hover:bg-[#121c17]'
              }`}
            >
              <div className={`p-3 rounded-xl mr-4 transition-colors ${
                selectedMode === 'vacation' ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'
              }`}>
                <Plane className="w-6 h-6" />
              </div>
              <span className="flex-1 font-medium">Vacation Mode</span>
              {selectedMode === 'vacation' && (
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              )}
            </button>
          </section>

          {/* Visual Health Analysis */}
          <section className="lg:col-span-2 bg-[#0c1310] border border-white/10 rounded-3xl overflow-hidden relative min-h-[340px] flex items-center justify-center group shadow-xl">
            {/* Background captured image */}
            {imageSrc && (
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500" 
                style={{ backgroundImage: `url(${imageSrc})` }}
              />
            )}

            {/* Simulated scan overlay style */}
            <style>{`
              @keyframes scanline {
                0% { top: 0%; opacity: 0.3; }
                50% { opacity: 0.8; }
                100% { top: 100%; opacity: 0.3; }
              }
              .animate-scanline {
                animation: scanline 2.5s ease-in-out infinite;
              }
            `}</style>

            {/* Action Button */}
            <div className="absolute top-5 right-5 z-20">
              <label 
                htmlFor="camera-capture" 
                className="flex items-center gap-2 px-4 py-2 bg-[#0a100d]/80 hover:bg-[#0a100d] border border-white/20 rounded-xl text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/40 cursor-pointer shadow-lg"
              >
                {imageSrc ? <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} /> : <Camera className="w-4 h-4" />}
                {scanning ? 'Analyzing...' : imageSrc ? 'Scan Again' : 'Start Scan'}
                <input 
                  id="camera-capture" 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handleImageCapture} 
                  className="hidden" 
                  disabled={scanning}
                />
              </label>
            </div>

            {/* Scanning Loader Overlay */}
            {scanning && (
              <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                {/* Glowing moving scanline */}
                <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-scanline"></div>
                <div className="p-4 bg-black/60 rounded-2xl border border-emerald-500/20 backdrop-blur-md flex flex-col items-center">
                  <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-3" />
                  <span className="text-emerald-400 font-mono tracking-widest text-xs uppercase animate-pulse">Running Neural Diagnosis...</span>
                </div>
              </div>
            )}
            
            {/* Simulated Video Area (Placeholder state) */}
            {!imageSrc && !scanning && (
              <div className="flex flex-col items-center justify-center text-white/10 relative z-10">
                <Camera className="w-16 h-16 mb-4" strokeWidth={1} />
                <span className="text-sm font-medium uppercase tracking-widest">Camera Feed Simulated</span>
              </div>
            )}

            {/* Analysis Result Details Overlay */}
            {analysisResult && !scanning && (
              <div className="absolute bottom-4 left-4 right-4 bg-[#0a100d]/90 border border-teal-500/30 p-5 rounded-2xl backdrop-blur-md z-10 flex flex-col gap-2 transition-all shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-teal-400 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    AI Computer Vision Diagnosed
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-lg font-mono text-xs font-semibold">
                    Health Score: {analysisResult.score}%
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">{analysisResult.status}</span>
                <p className="text-xs text-white/65 leading-relaxed">{analysisResult.details}</p>
              </div>
            )}
          </section>

          {/* AI Care Insights */}
          <section className="lg:col-span-1">
            <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-3xl flex items-start gap-4 shadow-lg shadow-amber-900/10">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl shrink-0">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-amber-400 font-semibold mb-1">AI Care Insight</h3>
                <p className="text-amber-500/80 text-sm leading-relaxed">
                  Warning: Soil oversaturation detected at 35%. Automated watering paused.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
