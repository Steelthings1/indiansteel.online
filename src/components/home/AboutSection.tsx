import React from 'react';
import { 
  ShieldCheck, 
  Ruler, 
  Cpu, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AboutSection: React.FC = () => {
  const { setActivePage } = useApp();

  const highlights = [
    {
      title: 'Quality Materials',
      description: 'Prime IS 2062 certified mild steel plates sourced from reputed mills with mill test certificates.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />
    },
    {
      title: 'Accurate Measurements',
      description: 'Strict dimension checks ensures zero deviation from your drawing or specified length/width.',
      icon: <Ruler className="w-5 h-5 text-amber-400" />
    },
    {
      title: 'Experienced Cutting',
      description: 'Skilled machine operators and oxy-fuel cut masters with decades of industrial metalworking expertise.',
      icon: <Award className="w-5 h-5 text-emerald-400" />
    },
    {
      title: 'Modern CNC Machinery',
      description: 'High-power CNC Fiber Laser & motorized profile cutting beds handling heavy gauge steel plates.',
      icon: <Cpu className="w-5 h-5 text-blue-400" />
    },
    {
      title: 'Customer-Focused Service',
      description: 'Dedicated assistance for single piece prototypes up to high-volume commercial production batches.',
      icon: <Users className="w-5 h-5 text-purple-400" />
    },
    {
      title: 'Fast Order Processing',
      description: 'Swift quotation response and streamlined shop floor processing to keep your project on schedule.',
      icon: <Clock className="w-5 h-5 text-rose-400" />
    }
  ];

  return (
    <section className="py-20 bg-[#0F1115] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image & Stacked Steel Visual */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden industrial-card border border-slate-700 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=1000"
                alt="Stacked MS Steel Plates and Industrial Storage Yard"
                className="w-full h-[420px] object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-brand-orange font-bold">STEEL STOCK YARD</span>
                  <span className="text-slate-400">READY INVENTORY</span>
                </div>
                <div className="text-sm font-bold text-white mt-1">
                  1,000+ Tons Stocked Across Grades & Thicknesses
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
                Our Workshop & Yard
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white leading-tight">
                Quality Steel Supply. <br />
                <span className="orange-gradient-text">Honest Cutting Services.</span>
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Based in Coimbatore, <strong className="text-white">Indian Steel</strong> was built to solve a simple problem fabricators and machine shops face daily: getting mild steel plates cut to exact sizes without paying for unnecessary scrap or waiting weeks for delivery.
            </p>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We stock certified IS 2062 mild steel plates from 6mm to 100mm+ and cut them directly in our yard using oxy-fuel, motorized line track, and CNC fiber laser machines. Every piece is measured, deburred, and weighed honestly on calibrated scales before leaving our gate.
            </p>

            {/* 6 Grid Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white mb-0.5">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-snug">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-brand-orange/50 text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2"
              >
                <span>Read More About Our Coimbatore Yard</span>
                <ArrowRight className="w-4 h-4 text-brand-orange" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
