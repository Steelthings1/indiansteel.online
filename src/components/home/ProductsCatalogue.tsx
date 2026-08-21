import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  FileText, 
  Filter, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const ProductsCatalogue: React.FC = () => {
  const { products, openQuoteModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTabMap, setActiveTabMap] = useState<{ [productId: string]: 'overview' | 'specs' | 'apps' }>({});

  const categories = ['All', 'MS Plates', 'MS Sheets', 'Custom Steel Pieces', 'Industrial Steel Materials'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const getProductTab = (id: string) => activeTabMap[id] || 'overview';
  const setProductTab = (id: string, tab: 'overview' | 'specs' | 'apps') => {
    setActiveTabMap(prev => ({ ...prev, [id]: tab }));
  };

  return (
    <section className="py-20 bg-[#0E1117] relative border-b border-slate-800" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Mill Certified Steel Stock</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Our Steel Product Inventory
          </h2>
          <p className="text-sm text-slate-400">
            Sourced directly from leading steel mills with full chemical and mechanical mill test certificate traceability. Available in full standard plates or cut to size.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/25'
                  : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => {
            const activeTab = getProductTab(product.id);

            return (
              <div
                key={product.id}
                className="industrial-card rounded-2xl overflow-hidden flex flex-col group border-slate-700/80"
              >
                {/* Product Top Header & Media */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161A22] via-transparent to-transparent" />
                  
                  {/* Category & Stock Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-lg bg-slate-950/90 text-brand-orange border border-brand-orange/40 backdrop-blur-md">
                      {product.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      In Stock
                    </span>
                  </div>

                  {/* Benchmark Price Badge */}
                  {product.pricePerKg && (
                    <div className="absolute bottom-3 right-4 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-right">
                      <div className="text-[10px] font-mono text-slate-400">Benchmark Rate:</div>
                      <div className="text-sm font-black font-mono text-emerald-400">₹{product.pricePerKg}/kg</div>
                    </div>
                  )}
                </div>

                {/* Content Body with Tab Controls */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </h3>

                    {/* Interactive Sub-Tabs for Specs */}
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3 text-xs font-mono">
                      <button
                        onClick={() => setProductTab(product.id, 'overview')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        Overview
                      </button>
                      <button
                        onClick={() => setProductTab(product.id, 'specs')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${activeTab === 'specs' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        Thicknesses ({product.thicknesses.length})
                      </button>
                      <button
                        onClick={() => setProductTab(product.id, 'apps')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${activeTab === 'apps' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        Applications
                      </button>
                    </div>

                    {activeTab === 'overview' && (
                      <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[48px]">
                        {product.description}
                      </p>
                    )}

                    {activeTab === 'specs' && (
                      <div className="space-y-2 mb-4 min-h-[48px]">
                        <div className="text-[11px] font-mono text-slate-400">Available Standard Thicknesses:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {product.thicknesses.map((th, i) => (
                            <button
                              key={i}
                              onClick={() => openQuoteModal({ materialType: product.name, thickness: parseFloat(th) || 12 })}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 hover:bg-brand-orange/20 text-slate-200 hover:text-brand-orange border border-slate-800 hover:border-brand-orange/40 transition-colors"
                            >
                              {th}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'apps' && (
                      <div className="space-y-1 mb-4 min-h-[48px]">
                        <ul className="grid grid-cols-2 gap-1.5 text-xs text-slate-300">
                          {product.applications.map((app, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                              <span className="truncate">{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer Action Bar */}
                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => openQuoteModal({ materialType: product.name })}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Request Custom Cut Quote</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
