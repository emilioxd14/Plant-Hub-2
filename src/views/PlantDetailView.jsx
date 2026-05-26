import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Settings, 
  Droplet, 
  Plane, 
  Camera, 
  Brain, 
  Activity, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Generar datos simulados de telemetría de 24 horas (0:00 a 23:00)
const generateTelemetryData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    const timeString = `${i}:00`;
    // Simular que la humedad aumenta (sobresaturación) y la luz sigue un ciclo solar
    const moisture = 25 + Math.sin(i / 3.5) * 5 + (i > 16 ? 5 : 0); // Termina sobre 35%
    const light = i >= 6 && i <= 18 
      ? Math.round(150 + Math.sin((i - 6) * Math.PI / 12) * 750 + Math.random() * 50) 
      : Math.round(10 + Math.random() * 15);
    
    data.push({
      time: timeString,
      'Moisture (%)': parseFloat(moisture.toFixed(1)),
      'Light (lx)': light
    });
  }
  return data;
};

const PlantDetailView = () => {
  const navigate = useNavigate();
  const [telemetryData] = useState(generateTelemetryData());
  const [activeActuator, setActiveActuator] = useState('ai'); // 'ai', 'manual', 'vacation'
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(false);

  // Simulación de escaneo visual
  useEffect(() => {
    let interval;
    if (isScanning) {
      setScanProgress(0);
      setScanResult(false);
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            setScanResult(true);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const handleStartScan = () => {
    setIsScanning(true);
  };

  return (
    <div className="h-screen overflow-y-auto p-6 bg-[#0a100d] text-gray-100 font-sans relative">
      {/* Luces de fondo decorativas (Glow Effects) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0d9488]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#eab308]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Contenedor Principal Limitado en Ancho y Centrado para Excelente UX */}
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER (Ancho completo) */}
        <header className="flex items-center gap-4 py-4 border-b border-white/5 backdrop-blur-md bg-white/[0.01] px-4 rounded-2xl">
          <button 
            onClick={() => navigate(-1)} 
            className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/10 group cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-[#0d9488] group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Office Corner</h1>
            <p className="text-sm font-medium text-[#0d9488] tracking-wider uppercase">Snake Plant</p>
          </div>
        </header>

        {/* REJILLA PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* GRÁFICA 'Historical Telemetry 24h' (Ocupa 2 columnas, lg:col-span-2) */}
          <section className="lg:col-span-2 bg-[#111815] border border-white/5 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl flex flex-col justify-between min-h-[420px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0d9488]/5 blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#0d9488]/10 rounded-xl">
                  <Activity className="w-5 h-5 text-[#0d9488]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">Historical Telemetry</h3>
                  <p className="text-xs text-gray-400">Past 24 hours logs</p>
                </div>
              </div>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#0d9488]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488] inline-block" /> Moisture (%)
                </span>
                <span className="flex items-center gap-1.5 text-[#eab308]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] inline-block" /> Light (lx)
                </span>
              </div>
            </div>

            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222c26" strokeOpacity={0.5} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#4b5563" 
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  {/* Eje Y izquierdo: Moisture */}
                  <YAxis 
                    yAxisId="left"
                    domain={[0, 40]}
                    stroke="#0d9488"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#0d9488', fontSize: 11 }}
                  />
                  {/* Eje Y derecho: Light */}
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 1000]}
                    stroke="#eab308"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#eab308', fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#111815', 
                      borderColor: 'rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      color: '#f3f4f6',
                      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                    }}
                    itemStyle={{ fontSize: '12px' }}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '12px' }}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="Moisture (%)" 
                    stroke="#0d9488" 
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#0d9488', strokeWidth: 2, fill: '#0a100d' }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="Light (lx)" 
                    stroke="#eab308" 
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 6, stroke: '#eab308', strokeWidth: 2, fill: '#0a100d' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* ACTUATOR CONTROLS (Ocupa 1 columna, lg:col-span-1) */}
          <section className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-2">Actuator Controls</h3>
            
            {/* Card 1: AI Automated Target (Active style default) */}
            <div 
              onClick={() => setActiveActuator('ai')}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                activeActuator === 'ai' 
                  ? 'border-[#0d9488] bg-[#0d9488]/5 shadow-lg shadow-[#0d9488]/5' 
                  : 'border-white/5 bg-[#111815] hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                  activeActuator === 'ai' ? 'bg-[#0d9488]/20 text-[#0d9488]' : 'bg-white/5 text-gray-400'
                }`}>
                  <Settings className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">AI Automated Target</h4>
                  <p className="text-xs text-gray-400">Self-regulating telemetry target</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${
                  activeActuator === 'ai' ? 'bg-[#22c55e] animate-pulse' : 'bg-gray-600'
                }`} />
              </div>
            </div>

            {/* Card 2: Manual Override */}
            <div 
              onClick={() => setActiveActuator('manual')}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                activeActuator === 'manual' 
                  ? 'border-[#0d9488] bg-[#0d9488]/5 shadow-lg shadow-[#0d9488]/5' 
                  : 'border-white/5 bg-[#111815] hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                  activeActuator === 'manual' ? 'bg-[#0d9488]/20 text-[#0d9488]' : 'bg-white/5 text-gray-400'
                }`}>
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Manual Override</h4>
                  <p className="text-xs text-gray-400">Direct parameter intervention</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${
                  activeActuator === 'manual' ? 'bg-[#22c55e] animate-pulse' : 'bg-gray-600'
                }`} />
              </div>
            </div>

            {/* Card 3: Vacation Mode */}
            <div 
              onClick={() => setActiveActuator('vacation')}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                activeActuator === 'vacation' 
                  ? 'border-[#0d9488] bg-[#0d9488]/5 shadow-lg shadow-[#0d9488]/5' 
                  : 'border-white/5 bg-[#111815] hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors duration-300 ${
                  activeActuator === 'vacation' ? 'bg-[#0d9488]/20 text-[#0d9488]' : 'bg-white/5 text-gray-400'
                }`}>
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Vacation Mode</h4>
                  <p className="text-xs text-gray-400">Minimal energy & water conservation</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`w-3 h-3 rounded-full ${
                  activeActuator === 'vacation' ? 'bg-[#22c55e] animate-pulse' : 'bg-gray-600'
                }`} />
              </div>
            </div>
          </section>

          {/* VISUAL HEALTH ANALYSIS (Ocupa 2 columnas, lg:col-span-2) */}
          <section className="lg:col-span-2 bg-[#111815] border border-white/5 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg text-white">Visual Health Analysis</h3>
                <p className="text-xs text-gray-400">Simulate optical diagnostics scans</p>
              </div>
              <button 
                onClick={handleStartScan}
                disabled={isScanning}
                className="flex items-center gap-2 px-4 py-2 border border-[#0d9488] hover:bg-[#0d9488]/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-semibold text-[#0d9488] transition-all duration-300 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </button>
            </div>

            {/* Video / Camera Feed simulated container */}
            <div className="flex-1 bg-[#060a08] border border-white/5 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
              
              {/* Scan overlays and animations */}
              {isScanning && (
                <>
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#0d9488] to-transparent shadow-[0_0_12px_#0d9488] animate-scan" />
                  <div className="absolute inset-0 bg-[#0d9488]/[0.02] bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                  
                  <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-2.5 flex items-center gap-3">
                    <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#0d9488] h-full transition-all duration-100" style={{ width: `${scanProgress}%` }} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-300 w-8 text-right">{scanProgress}%</span>
                  </div>
                </>
              )}

              {/* Scan Results Screen */}
              {scanResult && !isScanning ? (
                <div className="text-center p-6 space-y-3 max-w-sm animate-fade-in">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#0d9488]/15 flex items-center justify-center text-[#0d9488]">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Visual Diagnostics Complete</h4>
                    <p className="text-xs text-gray-400 mt-1">Leaves pigmentation level stable. Chlorophyll index at 94%. No signs of pests or root deterioration detected.</p>
                  </div>
                </div>
              ) : (
                !isScanning && (
                  <div className="text-center text-gray-500 space-y-2 select-none">
                    <Camera className="w-12 h-12 mx-auto stroke-[1.2] opacity-30" />
                    <span className="block text-xs font-medium tracking-wide">Camera Feed Simulated</span>
                  </div>
                )
              )}
            </div>
          </section>

          {/* AI CARE INSIGHTS (Ocupa 1 columna, lg:col-span-1) */}
          <section className="bg-gradient-to-br from-[#1c140f] to-[#111815] border border-orange-500/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-400">
                  <Brain className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="font-bold text-white text-base">AI Care Insights</h3>
              </div>

              <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-orange-300">Soil Over-saturation</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Warning: Soil moisture has spiked to <strong className="text-orange-400 font-bold">35%</strong>. Continuous overwatering risks root hypoxia and subsequent rot. Ensure perfect drainage.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400">
              <span>Recommendation Status:</span>
              <span className="text-orange-400 font-semibold uppercase tracking-wider">Urgent Intervention</span>
            </div>
          </section>

        </div>
      </div>

      {/* Estilos inline para animación de escáner en Tailwind si no estuvieran ya en la config */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PlantDetailView;
