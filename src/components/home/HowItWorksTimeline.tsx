import React from 'react';
import { 
  FileText, 
  Calculator, 
  Flame, 
  Truck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorksTimeline: React.FC = () => {
  const { openQuoteModal } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Share Your Requirement',
      description: 'Provide material type, plate thickness, length, width, quantity, and required shape or upload your CAD drawing (DXF/DWG/PDF).',
      icon: <FileText className="w-5 h-5 text-brand-orange" />,
      tag: 'Requirement Submission'
    },
    {
      step: '02',
      title: 'Get a Quote',
      description: 'Indian Steel engineering team reviews your requirement, calculates weight & cutting charges, and sends a binding quotation.',
      icon: <Calculator className="w-5 h-5 text-amber-400" />,
      tag: 'Fast Pricing'
    },
    {
      step: '03',
      title: 'Cutting & Processing',
      description: 'Upon quote approval, raw certified MS plate is mounted and processed on our oxy-fuel, machine, or CNC fiber laser cutting line.',
      icon: <Flame className="w-5 h-5 text-blue-400" />,
      tag: 'Shop Floor Execution'
    },
    {
      step: '04',
      title: 'Pickup / Delivery',
      description: 'Cut material undergoes dimensional inspection, edge deburring, and is prepared for workshop pickup or freight dispatch.',
      icon: <Truck className="w-5 h-5 text-emerald-400" />,
      tag: 'Dispatch Ready'
    }
  ];

  return (
    <section className="py-20 bg-[#0F1115] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
            Order Fulfillment Flow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            How It Works — Simple 4-Step Process
          </h2>
          <p className="text-sm text-slate-400">
            From initial size inquiry to finished cut plate delivery, experience a transparent, fast-turnaround industrial workflow.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="industrial-card rounded-2xl p-6 relative flex flex-col justify-between group"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-[2px] bg-slate-700 z-20 pointer-events-none" />
              )}

              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-3xl text-slate-600 group-hover:text-brand-orange transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 font-medium">
                  {item.tag}
                </span>

                <h3 className="text-lg font-bold font-display text-white mt-3 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Phase {item.step} of 04</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
              </div>

            </div>
          ))}
        </div>

        {/* Flow CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => openQuoteModal()}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/25 transition-all inline-flex items-center gap-2"
          >
            <span>Start Step 01 — Get Your Quotation Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
