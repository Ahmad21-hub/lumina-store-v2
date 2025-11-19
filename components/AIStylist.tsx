import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { getStylingAdvice } from '../services/geminiService';
import { Product } from '../types';

interface AIStylistProps {
  products: Product[];
}

const AIStylist: React.FC<AIStylistProps> = ({ products }) => {
  const [query, setQuery] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const result = await getStylingAdvice(query, products);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <section className="bg-stone-900 text-stone-100 py-12 px-6 rounded-2xl my-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles size={14} />
          <span>AI Stylist</span>
        </div>
        <h2 className="font-serif text-3xl md:text-4xl mb-4 text-white">Not sure what to choose?</h2>
        <p className="text-stone-400 mb-8 font-light">Describe your outfit, the occasion, or your budget, and let our AI curator suggest the perfect piece.</p>

        <form onSubmit={handleAsk} className="relative max-w-xl mx-auto mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., I need a gift for my mom under 200 AED..."
            className="w-full bg-white/10 border border-white/20 text-white placeholder-stone-400 rounded-full px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-sm transition-all"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="absolute right-2 top-2 w-10 h-10 bg-amber-600 hover:bg-amber-500 text-white rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={18} />}
          </button>
        </form>

        {advice && (
          <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-6 text-left animate-in fade-in slide-in-from-bottom-2">
             <p className="text-stone-200 italic leading-relaxed">"{advice}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIStylist;