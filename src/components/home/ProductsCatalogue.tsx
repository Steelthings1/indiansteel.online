import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  FileText, 
  Filter, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

export const ProductsCatalogue: React.FC = () => {
  const { products, openQuoteModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'MS Plates', 'MS Sheets', 'Custom Steel Pieces', 'Industrial Steel Materials'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="py-20 bg-[#11141A] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
            Material Inventory
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Our Steel Product Catalogue
          </h2>
          <p className="text-sm text-slate-400">
            Sourced directly from reputed steel mills with full quality traceability. Supplied raw or pre-cut to your exact project measurements.
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
                  ? 'bg-brand-orange text-white border-brand-orange shadow-lg shadow-brand-orange/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="industrial-card rounded-2xl overflow-hidden flex flex-col md:flex-row group"
            >
              {/* Product Image */}
              <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-950/90" />
                <span className="absolute top-3 left-3 text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-slate-900/90 text-brand-orange border border-brand-orange/30">
                  {product.category}
                </span>
              </div>

              {/* Product Content */}
              <div className="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-brand-orange transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  {/* Thickness / Specifications */}
                  <div className="mb-4">
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-1.5 font-semibold">
                      Available Thickness / Gauge:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.thicknesses.map((th, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                          {th}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Typical Applications */}
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase mb-1.5 font-semibold">
                      Typical Applications:
                    </div>
                    <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                      {product.applications.slice(0, 4).map((app, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-brand-orange shrink-0" />
                          <span className="truncate">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    {product.pricePerKg && (
                      <div className="text-xs font-mono text-slate-400">
                        Indicative: <span className="text-white font-bold">₹{product.pricePerKg}/kg</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => openQuoteModal({ materialType: product.name })}
                    className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20 transition-all flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Request Quote</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
