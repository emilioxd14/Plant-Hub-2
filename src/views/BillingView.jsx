import React, { useState, useEffect } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { usePlantContext } from '../context/PlantContext';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';

const BillingView = () => {
  const { selectedProduct } = usePlantContext();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [displayNumber, setDisplayNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isFocused && cardNumber) {
      const last4 = cardNumber.slice(-4);
      setDisplayNumber(`•••• •••• •••• ${last4}`);
    } else {
      setDisplayNumber(cardNumber);
    }
  }, [isFocused, cardNumber]);

  if (!selectedProduct) {
    return <Navigate to="/store" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      navigate('/shipping');
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-xl relative z-10">
        <header className="mb-8 flex items-center gap-4">
          <Link to="/store" className="p-2 backdrop-blur-md bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
            <ArrowLeft className="w-6 h-6 text-emerald-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-widest uppercase">Secure Checkout</h1>
            <p className="text-emerald-500/70 text-sm font-mono uppercase">Total: ${selectedProduct.price}.00 USD</p>
          </div>
        </header>

        <div className="backdrop-blur-xl bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-3xl">
          <div className="flex items-center gap-2 mb-8 text-emerald-500/70 border-b border-emerald-500/20 pb-4">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-mono tracking-wider">256-BIT ENCRYPTION ACTIVE</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-emerald-500/70 mb-2">Cardholder Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="JOHN DOE"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-500/70 mb-2">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={displayNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  maxLength={19} // Basic limit
                  className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                  placeholder="0000 0000 0000 0000"
                />
                <CreditCard className="w-5 h-5 text-emerald-500/50 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-emerald-500/70 mb-2">Expiry Date</label>
                <input
                  type="text"
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-emerald-500/70 mb-2">Security Code</label>
                <input
                  type="password"
                  required
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={4}
                  className="w-full bg-[#020617]/50 border border-emerald-500/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono tracking-widest"
                  placeholder="***"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#020617] font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] disabled:opacity-70 disabled:cursor-not-allowed mt-4 flex justify-center items-center h-[56px]"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[#020617] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                `PAY $${selectedProduct.price}.00`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BillingView;
