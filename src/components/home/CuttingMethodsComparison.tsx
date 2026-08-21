import React from 'react';
import { 
  Flame, 
  SlidersHorizontal, 
  Zap, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CuttingMethod } from '../../types';

export const CuttingMethodsComparison: React.FC = () => {
  const { openQuoteModal } = useApp();

  const methods: {
    name: CuttingMethod;
    badge: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    idealFor: string;
    isFeatured?: boolean;
  }[] = [
    {
      name: 'Manual Cutting',
      badge: 'Basic & Flexible',
      description: 'Suitable for basic, one-off, or custom-measured plate cutting requirements.',
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      features: [
        'Highly flexible for site templates',
        'Cost-effective for single piece jobs',
        'Custom non-standard dimensions',
        'Quick setup time'
      ],
      idealFor: 'On-site fitments, basic gussets, single repair plates, general workshop jobs.'
    },
    {
      name: 'Machine Cutting',
      badge: 'Consistent & Fast',
      description: 'Motorized straight-line and profile machine cutting for batch repeatability.',
      icon: <SlidersHorizontal className="w-6 h-6 text-blue-400" />,
      features: [
        'Consistent, straight cut edges',
        'Repeatable dimensions across pieces',
        'Faster processing for medium batches',
        'Suitable for multi-piece production'
      ],
      idealFor: 'Structural beam flanges, foundation plates, conveyor sides, multiple batch plates.'
    },
    {
      name: 'Laser Cutting',
      badge: 'Premium CNC Precision',
      description: 'High-power CNC Fiber Laser cutting for detailed profiles and tight tolerances.',
      icon: <Zap className="w-6 h-6 text-brand-orange" />,
      features: [
        'High precision tolerances (±0.2mm)',
        'Intricate shapes & complex geometries',
        'Clean, burr-free edge finish',
        'Direct DXF / DWG CAD cutting',
        'Suitable for industrial engineering'
      ],
      idealFor: 'Robotic machinery parts, gear blanks, custom flanges, decorative panels, tight-fit assemblies.',
      isFeatured: true
    }
  ];

  return (
    <section className="py-20 bg-[#11141A] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
            Technology Comparison
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Choose the Right Cutting Solution
          </h2>
          <p className="text-sm text-slate-400">
            Compare our manual, machine, and CNC laser cutting options to select the optimal balance of precision, speed, and budget for your application.
          </p>
        </div>

        {/* 3 Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {methods.map((m) => (
            <div
              key={m.name}
              className={`industrial-card rounded-2xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                m.isFeatured 
                  ? 'border-brand-orange/60 bg-gradient-to-b from-[#181B22] to-[#11141A] shadow-2xl shadow-brand-orange/10 scale-100 lg:-translate-y-2' 
                  : ''
              }`}
            >
              {m.isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-orange text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                    {m.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    {m.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2">
                  {m.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {m.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    Key Features:
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

                {/* Ideal For */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs mb-6">
                  <span className="font-bold text-slate-200 block mb-1">Ideal Application:</span>
                  <span className="text-slate-400">{m.idealFor}</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => openQuoteModal({ cuttingMethod: m.name })}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  m.isFeatured
                    ? 'bg-brand-orange hover:bg-orange-600 text-white shadow-lg shadow-brand-orange/25'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700'
                }`}
              >
                <span>Request {m.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
