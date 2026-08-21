import React from 'react';
import { 
  Layers, 
  Flame, 
  SlidersHorizontal, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivePage } from '../../types';

export const QuickServiceCards: React.FC = () => {
  const { setActivePage, openQuoteModal } = useApp();

  const services = [
    {
      id: 'ms-plate-supply',
      title: 'MS Plate Supply',
      description: 'Quality mild steel plates available in various standard sizes, custom thicknesses (6mm to 100mm+), and certified grades for industrial fabrication.',
      icon: <Layers className="w-6 h-6 text-brand-orange" />,
      badge: 'Stock & Retail',
      page: 'products' as ActivePage,
      material: 'Mild Steel IS 2062'
    },
    {
      id: 'manual-cutting',
      title: 'Manual Cutting',
      description: 'Custom manual oxy-fuel cutting tailored precisely according to customer measurements, site templates, and basic fabrication specs.',
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      badge: 'Cost-Effective',
      page: 'ms-plate-cutting' as ActivePage,
      method: 'Manual Cutting'
    },
    {
      id: 'machine-cutting',
      title: 'Machine Cutting',
      description: 'Machine-guided linear and profile cutting for uniform consistency, smooth edge finish, and repeatable batch dimensions.',
      icon: <SlidersHorizontal className="w-6 h-6 text-blue-400" />,
      badge: 'High Repeatability',
      page: 'ms-plate-cutting' as ActivePage,
      method: 'Machine Cutting'
    },
    {
      id: 'laser-cutting',
      title: 'Laser Cutting',
      description: 'State-of-the-art CNC fiber laser cutting for intricate custom shapes, gear blanks, pipe flanges, and tight-tolerance industrial components.',
      icon: <Zap className="w-6 h-6 text-brand-orange" />,
      badge: 'High Precision ±0.2mm',
      page: 'laser-cutting' as ActivePage,
      method: 'Laser Cutting'
    }
  ];

  return (
    <section className="py-16 bg-[#11141A] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
              Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Primary Steel & Cutting Services
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Delivering raw material supply alongside multi-method cutting capabilities to match your exact structural and engineering specs.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="industrial-card rounded-xl p-6 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shadow-inner group-hover:border-brand-orange/50 transition-colors">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-brand-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    if (service.method) {
                      openQuoteModal({ cuttingMethod: service.method as any });
                    } else {
                      openQuoteModal({ materialType: service.material });
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-brand-orange/15 hover:bg-brand-orange text-brand-orange hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setActivePage(service.page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-center text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors py-1"
                >
                  Learn More Details →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
