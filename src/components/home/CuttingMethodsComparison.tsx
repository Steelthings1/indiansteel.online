import React from 'react';
import { 
  Flame, 
  SlidersHorizontal, 
  Zap, 
  Check, 
  ArrowRight,
  Sparkles,
  Gauge,
  Cpu,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CuttingMethod } from '../../types';

export const CuttingMethodsComparison: React.FC = () => {
  const { openQuoteModal } = useApp();

  const methods = [
    {
      name: 'Manual Oxy-Fuel Cutting' as CuttingMethod,
      shortName: 'Manual Cutting',
      badge: 'Cost-Effective',
      tolerance: '± 2.0 mm',
      speed: 'Moderate',
      edgeFinish: 'Standard Torch Edge',
      maxThickness: 'Up to 150 mm',
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      features: [
        'High flexibility for site templates',
        'Cost-effective for single piece jobs',
        'Custom non-standard dimensions',
        'Minimal machine setup overhead'
      ],
      idealFor: 'On-site fitments, basic gussets, single repair plates, heavy rough slabs.',
      rating: 70
    },
    {
      name: 'Machine Linear & Profile Cutting' as CuttingMethod,
      shortName: 'Machine Cutting',
      badge: 'High Repeatability',
      tolerance: '± 0.8 mm',
      speed: 'Fast Batching',
      edgeFinish: 'Uniform Straight Edge',
      maxThickness: 'Up to 100 mm',
      icon: <SlidersHorizontal className="w-6 h-6 text-blue-400" />,
      features: [
        'Consistent straight cut edges',
        'Repeatable dimensions across pieces',
        'Motorized track accuracy',
        'Suitable for multi-piece production'
      ],
      idealFor: 'Structural beam flanges, foundation plates, conveyor sides, multiple batch plates.',
      rating: 85
    },
    {
      name: 'CNC Fiber Laser Precision Cutting' as CuttingMethod,
      shortName: 'Laser Cutting',
      badge: 'Ultra Precision',
      tolerance: '± 0.2 mm',
      speed: 'High-Speed CNC',
      edgeFinish: 'Smooth Burr-Free Finish',
      maxThickness: 'Up to 25 mm',
      icon: <Zap className="w-6 h-6 text-brand-orange" />,
      features: [
        'Ultra-high precision tolerances (±0.2mm)',
        'Complex contours & intricate profiles',
        'Clean, burr-free edge finish',
        'Direct DXF / DWG CAD vector cutting',
        'Zero tooling wear & minimal kerf'
      ],
      idealFor: 'Robotic machinery parts, gear blanks, custom flanges, tight-tolerance assemblies.',
      isFeatured: true,
      rating: 98
    }
  ];

  return (
    <section className="py-20 bg-[#0C0E12] relative border-b border-slate-800" id="cutting-methods">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Gauge className="w-3.5 h-3.5" />
            <span>Process Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Compare Metal Cutting Technologies
          </h2>
          <p className="text-sm text-slate-400">
            Select the optimal balance of dimensional tolerance, edge smoothness, processing speed, and budget for your engineering application.
          </p>
        </div>

        {/* 3 Interactive Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {methods.map((m) => (
            <div
              key={m.name}
              className={`industrial-card rounded-2xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                m.isFeatured 
                  ? 'border-brand-orange/60 bg-gradient-to-b from-[#191D26] to-[#0E1117] shadow-2xl shadow-brand-orange/15 scale-100 lg:-translate-y-2' 
                  : 'bg-slate-900/60'
              }`}
            >
              {m.isFeatured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-orange to-orange-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Recommended for High Precision</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner">
                    {m.icon}
                  </div>
                  <span className="text-[11px] font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-semibold">
                    {m.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-white mb-1">
                    {m.shortName}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Tolerance: <strong className="text-brand-orange">{m.tolerance}</strong> • Max: {m.maxThickness}
                  </p>
                </div>

                {/* Technical Gauges Matrix */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Tolerance Rating:</span>
                    <span className="text-white font-bold">{m.tolerance}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${m.isFeatured ? 'bg-brand-orange' : 'bg-blue-400'}`} 
                      style={{ width: `${m.rating}%` }} 
                    />
                  </div>

                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-400">Edge Quality:</span>
                    <span className="text-slate-200">{m.edgeFinish}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-1">
                  <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Key Strengths:
                  </div>
                  {m.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <div className="p-0.5 rounded-full bg-brand-orange/20 text-brand-orange mt-0.5 shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Ideal For Box */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="font-bold text-slate-300 block mb-0.5">Best Suited For:</span>
                  <span className="text-slate-400">{m.idealFor}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => openQuoteModal({ cuttingMethod: m.name })}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    m.isFeatured
                      ? 'bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white shadow-lg shadow-brand-orange/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                  }`}
                >
                  <span>Request {m.shortName} Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
