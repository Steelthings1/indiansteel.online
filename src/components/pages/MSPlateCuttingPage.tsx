import React from 'react';
import { 
  Layers, 
  Flame, 
  Ruler, 
  CheckCircle2, 
  FileText, 
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MSPlateCuttingPage: React.FC = () => {
  const { openQuoteModal, settings } = useApp();

  return (
    <div className="py-12 bg-[#0F1115] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="industrial-card rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-slate-700 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold uppercase">
                <Layers className="w-4 h-4" />
                <span>Heavy Gauge MS Plate Specialists</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-white leading-tight">
                Mild Steel (MS) Plate <br />
                <span className="orange-gradient-text">Sales & Custom Sizing</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Supplying prime certified IS 2062 mild steel plates in full sizes or cut to your exact length and width requirements. Available in thickness options from 6mm to 100mm+.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openQuoteModal({ materialType: 'Mild Steel (MS IS 2062)' })}
                  className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 transition-all flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Custom MS Plate Quote</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-72">
                <img
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800"
                  alt="Stacked Mild Steel Plates"
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono">
                  <span className="text-brand-orange font-bold">IS 2062 E250 / E350 GRADES</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">Mill Certified Prime Quality Steel</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Thickness Options Grid */}
        <div className="industrial-card rounded-2xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold font-display text-white">Available Thickness Options (mm)</h2>
              <p className="text-xs text-slate-400">All sizes can be cut to custom lengths & widths upon order.</p>
            </div>
            <button
              onClick={() => openQuoteModal()}
              className="px-4 py-2 rounded-lg bg-brand-orange text-white font-bold text-xs uppercase"
            >
              Get Pricing List
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {settings.thicknessOptionsMm.map((th) => (
              <div
                key={th}
                onClick={() => openQuoteModal({ thickness: th })}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-orange text-center cursor-pointer group transition-colors"
              >
                <div className="text-lg font-bold font-display text-white group-hover:text-brand-orange">{th} mm</div>
                <div className="text-[10px] font-mono text-slate-500">MS Plate</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
