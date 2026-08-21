import React from 'react';
import { 
  Ruler, 
  Flame, 
  CheckSquare, 
  ArrowRight, 
  Layers, 
  FileText,
  Shapes,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MSPlateCuttingSection: React.FC = () => {
  const { openQuoteModal } = useApp();

  return (
    <section className="py-20 bg-[#0F1115] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
            Custom Plate Sizing
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            MS Plate Cutting to Your Exact Dimensions
          </h2>
          <p className="text-sm text-slate-300">
            Eliminate material waste and reduce workshop labor. Simply specify your required thickness, length, width, shape, and quantity — we cut mild steel plates to your precise tolerances.
          </p>
        </div>

        {/* Visual Process Flow: Required Dimension -> Cutting Process -> Finished Plate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative">
          
          {/* Step 1: Required Dimension */}
          <div className="industrial-card rounded-2xl p-6 relative group overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-7xl font-black font-display text-white/5 pointer-events-none">
              01
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center mb-4">
              <Ruler className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono text-brand-orange uppercase font-bold">STAGE 1</span>
            <h3 className="text-lg font-bold font-display text-white mt-1 mb-2">Required Dimensions</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Specify length, width, thickness (6mm - 100mm), grade (IS 2062), and required quantity.
            </p>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between"><span>Length / Width:</span> <span className="text-white">mm or inches</span></div>
              <div className="flex justify-between"><span>Thickness:</span> <span className="text-white">6mm to 100mm+</span></div>
              <div className="flex justify-between"><span>Profile Shape:</span> <span className="text-white">Rect / Disc / Custom</span></div>
            </div>
          </div>

          {/* Step 2: Cutting Process */}
          <div className="industrial-card rounded-2xl p-6 relative group overflow-hidden border-brand-orange/30">
            <div className="absolute -right-4 -bottom-4 text-7xl font-black font-display text-white/5 pointer-events-none">
              02
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono text-amber-400 uppercase font-bold">STAGE 2</span>
            <h3 className="text-lg font-bold font-display text-white mt-1 mb-2">Cutting Process</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Material is mounted on our specialized beds and cut using Oxy-Fuel, Motorized Machine, or CNC Fiber Laser.
            </p>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between"><span>Manual Cutting:</span> <span className="text-white">Basic Oxy-Fuel</span></div>
              <div className="flex justify-between"><span>Machine Cutting:</span> <span className="text-white">Straight Line Profiler</span></div>
              <div className="flex justify-between"><span>Laser Cutting:</span> <span className="text-white">High Precision Fiber</span></div>
            </div>
          </div>

          {/* Step 3: Finished Plate */}
          <div className="industrial-card rounded-2xl p-6 relative group overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-7xl font-black font-display text-white/5 pointer-events-none">
              03
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold">STAGE 3</span>
            <h3 className="text-lg font-bold font-display text-white mt-1 mb-2">Finished Plate</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Plates undergo deburring, dimension check, and quality verification before customer pickup or freight delivery.
            </p>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-300 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between"><span>Edge Finish:</span> <span className="text-white">Deburred / Clean</span></div>
              <div className="flex justify-between"><span>Inspection:</span> <span className="text-white">Vernier Verified</span></div>
              <div className="flex justify-between"><span>Packaging:</span> <span className="text-white">Strapped & Tagged</span></div>
            </div>
          </div>

        </div>

        {/* Input Parameters Callout & CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#161920] to-slate-900 border border-slate-700 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-white">
              Have Specific Plate Cut Specifications Ready?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Provide your required length, width, thickness, quantity, shape preference (Rectangular, Disc, Ring, or CAD contour) to receive a fast binding quotation.
            </p>
          </div>

          <button
            onClick={() => openQuoteModal({ materialType: 'Mild Steel (MS IS 2062)' })}
            className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 transition-all shrink-0 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Request Custom Cutting Quote</span>
          </button>
        </div>

      </div>
    </section>
  );
};
