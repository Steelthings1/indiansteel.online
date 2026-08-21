import React from 'react';
import { 
  Zap, 
  UploadCloud, 
  CheckCircle2, 
  Flame, 
  Cpu, 
  Layers, 
  Shapes, 
  FileText, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LaserCuttingPage: React.FC = () => {
  const { openQuoteModal } = useApp();

  const offerings = [
    { title: 'Custom Shape Cutting', desc: 'Precision contouring of non-standard geometries, gussets, brackets, and decorative panels.', icon: <Shapes className="w-5 h-5 text-brand-orange" /> },
    { title: 'Industrial Machinery Components', desc: 'Engineered parts for press tools, cranes, earthmoving equipment, and conveyor assemblies.', icon: <Cpu className="w-5 h-5 text-amber-400" /> },
    { title: 'Drawing-Based Cutting', desc: 'Direct vector import from DXF, DWG, and PDF files for exact 1-to-1 manufacturing replication.', icon: <UploadCloud className="w-5 h-5 text-blue-400" /> },
    { title: 'Flange & Disc Profiling', desc: 'Clean circular discs, pipe connection flanges, pitch circle hole drilling, and gear blanks.', icon: <Zap className="w-5 h-5 text-emerald-400" /> },
    { title: 'Bulk Production Batches', desc: 'High-speed automated laser cutting for consistent high-volume commercial production runs.', icon: <Layers className="w-5 h-5 text-purple-400" /> },
    { title: 'Rapid Prototype Cutting', desc: 'Fast single-piece prototype processing for design verification before full manufacturing.', icon: <Flame className="w-5 h-5 text-rose-400" /> },
  ];

  return (
    <div className="py-12 bg-[#0F1115] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="industrial-card rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-brand-orange/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/40 text-brand-orange text-xs font-mono font-bold uppercase">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>CNC Fiber Laser Technology</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-display text-white leading-tight">
                Precision Laser Cutting for <br />
                <span className="orange-gradient-text">Custom Steel Components</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Utilizing modern CNC fiber laser cutting heads to deliver high accuracy, narrow kerf width, and smooth edge finish across mild steel plates and sheets.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openQuoteModal({ cuttingMethod: 'Laser Cutting' })}
                  className="px-7 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 transition-all flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Drawing & Request Quote</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-2xl h-72">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
                  alt="Laser Cutting Sparks and Industrial Component"
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono">
                  <span className="text-brand-orange font-bold">LASER SPARKS & EDGE FINISH</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">High repeatability for complex CAD profiles</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Offerings Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
              What We Offer in Laser Cutting
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Versatile cutting capabilities tailored for precision engineering requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, idx) => (
              <div key={idx} className="industrial-card rounded-2xl p-6 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:border-brand-orange/50 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-bold font-display text-base text-white mb-2 group-hover:text-brand-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() => openQuoteModal({ cuttingMethod: 'Laser Cutting', additionalRequirements: `Inquiry for ${item.title}` })}
                  className="text-xs font-mono font-bold text-brand-orange hover:underline flex items-center gap-1"
                >
                  <span>Request Quote for {item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload CAD Callout Banner */}
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <UploadCloud className="w-12 h-12 text-brand-orange mx-auto animate-bounce" />
          <h3 className="text-2xl font-bold font-display text-white">Have CAD Drawings Ready? (DXF / DWG / PDF)</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Upload your drawing file in our quote modal for instant pricing and workshop scheduling by our cutting specialists.
          </p>
          <button
            onClick={() => openQuoteModal({ cuttingMethod: 'Laser Cutting' })}
            className="px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20"
          >
            Launch CAD Quote Upload
          </button>
        </div>

      </div>
    </div>
  );
};
