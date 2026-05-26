import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlantContext } from '../context/PlantContext';
import { ArrowLeft, CheckCircle, X, MapPin } from 'lucide-react';

const ShippingView = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleCloseModal = () => {
    setShowSuccess(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-xl relative z-10">
        <header className="mb-8 flex items-center gap-4">
          <Link to="/billing" className="p-2 backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
            <ArrowLeft className="w-6 h-6 text-emerald-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-widest uppercase">Shipping Details</h1>
            <p className="text-emerald-500/70 text-sm font-mono uppercase">Delivery Information</p>
          </div>
        </header>

        <div className="backdrop-blur-xl bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-8 text-emerald-500 border-b border-emerald-500/20 pb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-mono tracking-wider">DESTINATION COORDINATES</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-emerald-500/70 mb-2">Full Name</label>
              <input
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="Jane Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-500/70 mb-2">Street Address</label>
              <input
                type="text"
                required
                autoComplete="street-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="123 Eco Way"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-500/70 mb-2">City</label>
                <input
                  type="text"
                  required
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="Neo City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-500/70 mb-2">ZIP / Postal Code</label>
                <input
                  type="text"
                  required
                  autoComplete="postal-code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="10001"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#020617] font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] mt-4"
            >
              CONFIRM ORDER
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm backdrop-blur-2xl bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center animate-in zoom-in duration-300">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 text-emerald-500/50 hover:text-emerald-500 transition-colors bg-[#020617]/50 rounded-full hover:bg-[#020617]"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Purchase Successful</h2>
            <p className="text-emerald-500/70 text-sm mb-6">Your order is being processed for deployment.</p>
            
            <button
              onClick={handleCloseModal}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-emerald-500/20 rounded-xl text-white transition-all font-mono text-sm"
            >
              RETURN TO HUB
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingView;
