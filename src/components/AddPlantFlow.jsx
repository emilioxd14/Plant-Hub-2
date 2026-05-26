import React, { useState, useEffect } from 'react';
import { Plus, X, Loader2, CheckCircle, Database } from 'lucide-react';
import { usePlantContext } from '../context/PlantContext';

const AddPlantFlow = () => {
  const { addPlant } = usePlantContext();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [plantName, setPlantName] = useState('');
  const [species, setSpecies] = useState('');
  const [ragStatus, setRagStatus] = useState(''); // Stores the detected species info

  // Handle RAG simulation
  useEffect(() => {
    const term = species.toLowerCase();
    if (term.includes('aloe vera')) {
      setRagStatus('Succulent Family - Optimal Moisture: 10-20%');
    } else if (term.includes('orchid')) {
      setRagStatus('Orchidaceae - Optimal Moisture: 50-70%');
    } else if (term.trim().length > 2) {
      setRagStatus('Searching RAG database...');
    } else {
      setRagStatus('');
    }
  }, [species]);

  const isRagDetected = ragStatus.includes('Optimal Moisture');

  // Handle auto-advance in Step 2
  useEffect(() => {
    let timer;
    if (isOpen && step === 2) {
      timer = setTimeout(() => {
        setStep(3);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, step]);

  const handleOpen = () => {
    setIsOpen(true);
    setStep(1);
    setPlantName('');
    setSpecies('');
    setRagStatus('');
  };

  const handleClose = () => {
    if (step === 3) {
      // Add the plant to the main view
      addPlant({
        id: Date.now().toString(),
        name: plantName || 'New Plant',
        status: 'Optimal',
        moisture: 50,
        light: 70,
        temperature: 22,
        history: [
          { time: '08:00', moisture: 50, light: 70 },
          { time: '12:00', moisture: 50, light: 70 },
        ]
      });
    }
    setIsOpen(false);
    setTimeout(() => setStep(1), 300); // Reset after fade out
  };

  const handleConnect = () => {
    if (plantName && isRagDetected) {
      setStep(2);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#22c55e] rounded-full shadow-[0_8px_30px_rgb(34,197,94,0.4)] flex items-center justify-center hover:scale-105 transition-transform hover:bg-[#16a34a] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-[#0a100d]"
      >
        <Plus className="w-8 h-8 text-black" strokeWidth={2.5} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Modal Card */}
          <div className="bg-[#121c17] border border-white/10 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative flex flex-col">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)} // Just close without saving if x is clicked
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              
              {/* Step 1: Input & RAG */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-white mb-6">Add New Plant</h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-emerald-500/80 mb-2">Plant Name</label>
                      <input 
                        type="text" 
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        placeholder="e.g. Office Corner"
                        className="w-full bg-[#0a100d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-emerald-500/80 mb-2">Species (RAG Search)</label>
                      <input 
                        type="text" 
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        placeholder="Try 'Aloe vera' or 'Orchid'"
                        className="w-full bg-[#0a100d] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                      {/* RAG Status Badge */}
                      {ragStatus && (
                        <div className={`mt-3 flex items-center gap-2 p-2 rounded-lg text-sm transition-colors duration-300 ${isRagDetected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-white/50'}`}>
                          {isRagDetected ? <CheckCircle className="w-4 h-4" /> : <Database className="w-4 h-4 animate-pulse" />}
                          <span>{isRagDetected ? `Detected: ${ragStatus}` : ragStatus}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={handleConnect}
                    disabled={!plantName || !isRagDetected}
                    className="w-full mt-8 bg-emerald-600 hover:bg-emerald-500 disabled:bg-white/5 disabled:text-white/30 text-white font-medium py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:shadow-none"
                  >
                    Connect Device
                  </button>
                </div>
              )}

              {/* Step 2: Device Simulation */}
              {step === 2 && (
                <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mb-6" />
                  <h3 className="text-xl font-medium text-white mb-2">Searching for device...</h3>
                  <p className="text-white/40 text-sm text-center">Make sure your PlantHub sensor is turned on and in pairing mode.</p>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center py-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">All Set!</h3>
                  <p className="text-white/60 mb-8">
                    The new plant has been setup successfully!
                  </p>
                  
                  <button 
                    onClick={handleClose}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium py-3.5 rounded-xl transition-all"
                  >
                    Back to the hub
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPlantFlow;
