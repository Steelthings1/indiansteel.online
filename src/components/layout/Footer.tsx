import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivePage } from '../../types';

export const Footer: React.FC = () => {
  const { setActivePage, openQuoteModal, settings } = useApp();

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0D11] border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      {/* Metallic grid accent overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Profile (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 shadow-lg shadow-brand-orange/20 flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Indian Steel Logo" 
                  className="w-full h-full object-contain rounded-lg filter drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.jpg';
                  }}
                />
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-wider text-white uppercase block">
                  INDIAN<span className="text-brand-orange">STEEL</span><span className="text-slate-400 font-mono text-lg lowercase">.online</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block -mt-1">
                  Plate Cutting • Precision • Quality • Value
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pr-4">
              Premium steel retail and industrial custom metal cutting service provider. Specializing in high-grade MS plates, CNC fiber laser cutting, machine profiling, and fast-turnaround custom size steel supply for engineering units, fabricators, and contractors.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Shop Floor Active: Workshop accepting orders & custom cutting jobs</span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand-orange/20 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Requirements for Quote</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Home', page: 'home' as ActivePage },
                { label: 'About Us', page: 'about' as ActivePage },
                { label: 'Products Catalogue', page: 'products' as ActivePage },
                { label: 'Services Overview', page: 'services' as ActivePage },
                { label: 'Laser Cutting', page: 'laser-cutting' as ActivePage },
                { label: 'MS Plate Cutting', page: 'ms-plate-cutting' as ActivePage },
                { label: 'Industries We Serve', page: 'industries' as ActivePage },
                { label: 'Steel Weight Calculator', page: 'calculator' as ActivePage },
                { label: 'Contact Us', page: 'contact' as ActivePage },
                { label: 'Customer Portal', page: 'customer-portal' as ActivePage },
                { label: 'Admin Control Panel', page: 'admin-dashboard' as ActivePage },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="hover:text-brand-orange flex items-center gap-1.5 transition-colors text-slate-300"
                  >
                    <ArrowRight className="w-3 h-3 text-brand-orange/70" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cutting Services */}
          <div>
            <h4 className="font-display text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-3">
              Cutting Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>MS Plate Cutting (6mm - 100mm)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>Manual Oxygen-Fuel Cutting</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>Machine Straight & Bevel Cutting</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>CNC Fiber Laser Precision Cutting</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>Custom Flange & Ring Profiling</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>CAD DXF/DWG Drawing Cutting</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>Bulk Commercial Steel Supply</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-orange pl-3">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-slate-300">{settings.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-x-2 text-slate-300 font-mono">
                  <a href={`tel:${settings.phone}`} className="hover:text-white transition-colors">
                    {settings.phone}
                  </a>
                  {settings.secondaryPhone && (
                    <span className="text-slate-500">/</span>
                  )}
                  {settings.secondaryPhone && (
                    <a href={`tel:${settings.secondaryPhone}`} className="hover:text-white transition-colors">
                      {settings.secondaryPhone}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  WhatsApp: +{settings.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">{settings.businessHours}</span>
              </li>
              <li className="pt-2 text-[11px] font-mono text-slate-500">
                GSTIN: <span className="text-slate-300">{settings.gstNumber}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Indian Steel (indiansteel.online). All Rights Reserved. Built for Industrial Steel Excellence.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>IS 2062 Quality Certified Material</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Accuracy & Precision Steel Processing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
