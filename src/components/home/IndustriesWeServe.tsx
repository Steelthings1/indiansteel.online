import React from 'react';
import { 
  Building2, 
  Wrench, 
  Cog, 
  Factory, 
  Truck, 
  Layers, 
  Cpu, 
  Hammer, 
  HardHat,
  Anchor
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IndustriesWeServe: React.FC = () => {
  const { openQuoteModal } = useApp();

  const industries = [
    { name: 'Fabrication', desc: 'Heavy structural gussets, base plates, custom frames.', icon: <Hammer className="w-5 h-5 text-brand-orange" /> },
    { name: 'Construction', desc: 'Embedded plates, anchor bolt plates, structural column bases.', icon: <Building2 className="w-5 h-5 text-amber-400" /> },
    { name: 'Engineering', desc: 'Tight-tolerance machine parts, jigs, fixtures, test beds.', icon: <Cog className="w-5 h-5 text-blue-400" /> },
    { name: 'Manufacturing', desc: 'OEM machine body parts, press bolsters, side plates.', icon: <Factory className="w-5 h-5 text-purple-400" /> },
    { name: 'Machinery', desc: 'Earthmoving equipment parts, crane bases, gear blanks.', icon: <Wrench className="w-5 h-5 text-emerald-400" /> },
    { name: 'Automotive Components', desc: 'Chassis reinforcement brackets, heavy vehicle flanges.', icon: <Truck className="w-5 h-5 text-rose-400" /> },
    { name: 'Structural Works', desc: 'Bridge girders, portal frames, high-load stiffeners.', icon: <HardHat className="w-5 h-5 text-orange-400" /> },
    { name: 'Industrial Workshops', desc: 'Job-work steel cut pieces, maintenance replacement plates.', icon: <Layers className="w-5 h-5 text-cyan-400" /> },
    { name: 'Infrastructure', desc: 'Highway expansion joints, dam gate plates, pylon foundations.', icon: <Anchor className="w-5 h-5 text-indigo-400" /> },
    { name: 'General Engineering', desc: 'Flanges, rings, spacers, washers, and custom cut blocks.', icon: <Cpu className="w-5 h-5 text-brand-orange" /> }
  ];

  return (
    <section className="py-20 bg-[#11141A] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
            Sector Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Industries We Serve
          </h2>
          <p className="text-sm text-slate-400">
            Supplying precision mild steel materials and customized cut components to key industrial sectors across India.
          </p>
        </div>

        {/* 10 Grid Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <div
              key={i}
              onClick={() => openQuoteModal({ additionalRequirements: `Requirement for ${ind.name} industry application.` })}
              className="industrial-card rounded-xl p-5 cursor-pointer group hover:border-brand-orange/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {ind.icon}
                </div>
                <h3 className="font-bold font-display text-sm text-white mb-1 group-hover:text-brand-orange transition-colors">
                  {ind.name}
                </h3>
                <p className="text-[11px] text-slate-400 leading-snug">
                  {ind.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                Request Supply →
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
