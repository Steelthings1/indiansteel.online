import React from 'react';
import { 
  Ruler, 
  Flame, 
  CheckSquare, 
  ArrowRight, 
  Layers, 
  FileText,
  Shapes,
  Sliders,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MSPlateCuttingSection: React.FC = () => {
  const { openQuoteModal } = useApp();

  return (
    <section className="py-20 bg-[#0E1117] relative border-b border-slate-800" id="ms-plate-cutting">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Ruler className="w-3.5 h-3.5" />
            <span>Tailored Steel Sizing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            MS Plate Cutting to Exact Dimensions
          </h2>
          <p className="text-sm text-slate-400">
            Eliminate workshop waste and scrap losses. Order mild steel plates cut to your custom length, width, thickness, and profile shapes ready for instant welding or machining.
          </p>
        </div>

        {/* MS Plate Visual Showcase & Technical Banner */}
        <div className="industrial-card rounded-3xl p-6 sm:p-8 mb-12 border-slate-700/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: High Resolution MS Plate Image */}
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl h-72 sm:h-80 bg-slate-950">
                <img
                  src="/images/ms-plates.jpg"
                  alt="Industrial Mild Steel MS Plates"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                
                {/* Tech Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-900/90 text-brand-orange border border-brand-orange/40 text-[10px] font-mono font-bold uppercase backdrop-blur-md">
                    Prime Mill Stock
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase backdrop-blur-md">
                    6mm – 100mm+ Available
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/95 border border-slate-800 text-xs font-mono backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold font-display uppercase tracking-wider">IS 2062 Structural Plates</div>
                    <div className="text-[10px] text-slate-400 font-mono">Custom Length & Width Straight Flame / Laser Cut</div>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono text-xs">Ready for Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase">
                <Sliders className="w-3.5 h-3.5" />
                <span>Heavy Metal Plate Supply</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white leading-snug">
                Heavy Gauge MS Plates <br />
                <span className="orange-gradient-text">Cut Directly from Stock</span>
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Whether you require individual machine base plates, heavy structural gussets, or batch production blanks, our Coimbatore yard processes certified IS 2062 plates to tight linear tolerances.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Available Thicknesses:</div>
                  <div className="text-sm font-bold font-mono text-white mt-0.5">6mm to 100mm+</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Grade Standards:</div>
                  <div className="text-sm font-bold font-mono text-brand-orange mt-0.5">IS 2062 E250 / E350</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3-Step Interactive Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Step 1 */}
          <div className="industrial-card rounded-2xl p-6 relative group overflow-hidden border-slate-700/80">
            <div className="absolute top-4 right-4 text-5xl font-black font-display text-white/5 pointer-events-none group-hover:text-brand-orange/10 transition-colors">
              01
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center mb-4 shadow-lg shadow-brand-orange/20">
              <Ruler className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-brand-orange uppercase font-bold tracking-widest">STAGE 01</span>
            <h3 className="text-lg font-bold font-display text-white mt-1 mb-2">Required Dimensions</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Specify your length, width, plate thickness (6mm to 100mm+), material grade (IS 2062 E250/E350), and quantity.
            </p>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between"><span>Length / Width:</span> <span className="text-white">Custom mm / inches</span></div>
              <div className="flex justify-between"><span>Thickness:</span> <span className="text-white">6mm to 100mm+</span></div>
              <div className="flex justify-between"><span>Profile Shape:</span> <span className="text-white">Rect / Disc / Flange</span></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="industrial-card rounded-2xl p-6 relative group overflow-hidden border-brand-orange/40 bg-gradient-to-b from-[#181C26] to-[#0E1117]">
            <div className="absolute top-4 right-4 text-5xl font-black font-display text-white/5 pointer-events-none group-hover:text-brand-orange/10 transition-colors">
              02
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">STAGE 02</span>
            <h3 className="text-lg font-bold font-display text-white mt-1 mb-2">Cutting & Processing</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Material is mounted on specialized beds and precision cut using Oxy-Fuel, Motorized Line Track, or CNC Fiber Laser.
            </p>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between"><span>Oxy-Fuel:</span> <span className="text-white">Heavy Gauge Slabs</span></div>
              <div className="flex justify-between"><span>Machine Cut:</span> <span className="text-white">Linear Straight Edges</span></div>
              <div className="flex justify-between"><span>Fiber Laser:</span> <span className="text-white">±0.2mm Profiles</span></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="industrial-card rounded-2xl p-6 relative group overflow-hidden border-slate-700/80">
            <div className="absolute top-4 right-4 text-5xl font-black font-display text-white/5 pointer-events-none group-hover:text-brand-orange/10 transition-colors">
              03
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">STAGE 03</span>
            <h3 className="text-lg font-bold font-display text-white mt-1 mb-2">Finished Plate Delivery</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Plates undergo deburring, dimension caliper verification, and are bundled for fast customer pickup or freight dispatch.
            </p>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between"><span>Edge Finish:</span> <span className="text-white">Deburred / Clean Edge</span></div>
              <div className="flex justify-between"><span>QC Check:</span> <span className="text-white">Dimension Verified</span></div>
              <div className="flex justify-between"><span>Packaging:</span> <span className="text-white">Strapped & Tagged</span></div>
            </div>
          </div>

        </div>

        {/* Action Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-[#151922] to-slate-900 border border-slate-700 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
              <span>Need Custom Plate Dimensions Cut Today?</span>
              <Sparkles className="w-5 h-5 text-brand-orange" />
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Provide length, width, thickness, and quantity to receive a fast binding quotation with nested cutting efficiency.
            </p>
          </div>

          <button
            onClick={() => openQuoteModal({ materialType: 'Mild Steel (MS IS 2062)' })}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 transition-all shrink-0 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Request Custom Plate Quote</span>
          </button>
        </div>

      </div>
    </section>
  );
};
