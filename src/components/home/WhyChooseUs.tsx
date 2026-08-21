import React from 'react';
import { 
  ShieldCheck, 
  Ruler, 
  Flame, 
  Zap, 
  Clock, 
  Sliders, 
  Briefcase
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Genuine Prime IS 2062 Material',
      desc: 'We only stock certified prime mild steel plates from trusted mills. Mill test certificates provided on request.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />
    },
    {
      title: 'Honest Weight & Fair Rates',
      desc: 'Transparent pricing by weight with accurate electronic weighbridge weighing. No hidden charges.',
      icon: <Ruler className="w-6 h-6 text-amber-400" />
    },
    {
      title: 'Right Cutting for Every Budget',
      desc: 'Choose from economical manual oxy-fuel, motorized machine tracking, or high-precision CNC fiber laser.',
      icon: <Zap className="w-6 h-6 text-blue-400" />
    },
    {
      title: 'Direct WhatsApp Quotations',
      desc: 'Send your measurements or DXF drawing to 9342472147 and get quick rates per kg and estimated lead time.',
      icon: <Clock className="w-6 h-6 text-emerald-400" />
    },
    {
      title: 'No Minimum Order Hassle',
      desc: 'Need just 1 machine base plate or 500 flange blanks? We treat single-piece orders with the same priority.',
      icon: <Sliders className="w-6 h-6 text-purple-400" />
    },
    {
      title: 'Deburred & Ready to Weld',
      desc: 'Edges are ground and cleaned before dispatch so your fabricators can start welding without extra prep time.',
      icon: <Briefcase className="w-6 h-6 text-rose-400" />
    }
  ];

  return (
    <section className="py-20 bg-[#0F1115] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
            Trust & Reliability
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Why Choose Indian Steel
          </h2>
          <p className="text-sm text-slate-400">
            We are committed to delivering material reliability, precise dimension cutting, and responsive service for every order.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="industrial-card rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:border-brand-orange/40 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-brand-orange transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                <span>Indian Steel Quality Guarantee</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
