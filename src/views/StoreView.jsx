import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePlantContext } from '../context/PlantContext';
import { ArrowLeft, Cpu, Zap, Maximize } from 'lucide-react';

const products = [
  {
    id: 'nano',
    name: 'PlantHub Nano',
    price: 49,
    description: 'Compact bio-sensor for single small plants.',
    icon: Cpu
  },
  {
    id: 'classic',
    name: 'PlantHub Classic',
    price: 129,
    description: 'Standard multi-sensor array with extended battery.',
    icon: Zap
  },
  {
    id: 'tower',
    name: 'PlantHub Tower',
    price: 299,
    description: 'Enterprise-grade environmental control system.',
    icon: Maximize
  }
];

const StoreView = () => {
  const { setSelectedProduct } = usePlantContext();
  const navigate = useNavigate();

  const handleBuy = (product) => {
    setSelectedProduct(product);
    navigate('/billing');
  };

  return (
    <div className="min-h-screen p-6 md:p-12 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <header className="mb-12 flex items-center gap-4 relative z-10">
        <Link to="/" className="p-2 backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
          <ArrowLeft className="w-6 h-6 text-emerald-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-widest uppercase">Hardware Store</h1>
          <p className="text-emerald-500/70 text-sm font-mono uppercase">Expand Your Network</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {products.map(product => {
          const Icon = product.icon;
          return (
            <div key={product.id} className="backdrop-blur-xl bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl flex flex-col transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:-translate-y-2">
              <div className="mb-8 p-4 bg-[#020617]/50 rounded-2xl w-max border border-emerald-500/20">
                <Icon className="w-8 h-8 text-emerald-400" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-400 text-sm mb-8 flex-grow">{product.description}</p>
              
              <div className="flex items-end justify-between mt-auto">
                <div>
                  <span className="text-emerald-500 text-sm font-bold tracking-widest uppercase">Price</span>
                  <p className="text-3xl font-light">${product.price}</p>
                </div>
                <button 
                  onClick={() => handleBuy(product)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#020617] font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                >
                  BUY NOW
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StoreView;
