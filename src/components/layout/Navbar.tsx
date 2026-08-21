import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  FileText, 
  Menu, 
  X, 
  ChevronRight, 
  UserCheck, 
  LayoutDashboard, 
  User, 
  Calculator,
  Compass,
  Wrench,
  Zap,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  Clock,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivePage } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    userRole, 
    setUserRole, 
    openQuoteModal, 
    settings 
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; page: ActivePage; icon: React.ReactNode; category?: string; isHot?: boolean; desc?: string }[] = [
    { label: 'Home', page: 'home', icon: <Compass className="w-4 h-4 text-brand-orange" />, category: 'Main', desc: 'Overview & Shop Floor' },
    { label: 'About Us', page: 'about', icon: <Building2 className="w-4 h-4 text-slate-400" />, category: 'Main', desc: 'Company Profile & Story' },
    { label: 'Products Catalogue', page: 'products', icon: <Layers className="w-4 h-4 text-blue-400" />, category: 'Steel Supply', desc: 'MS Plates, Sheets & Coils' },
    { label: 'Services Overview', page: 'services', icon: <Wrench className="w-4 h-4 text-amber-400" />, category: 'Cutting', desc: 'All Metal Sizing Methods' },
    { label: 'MS Plate Cutting', page: 'ms-plate-cutting', icon: <Flame className="w-4 h-4 text-amber-500" />, category: 'Cutting', desc: '6mm – 100mm+ Custom Sizing' },
    { label: 'CNC Laser Cutting', page: 'laser-cutting', icon: <Zap className="w-4 h-4 text-brand-orange" />, category: 'Cutting', isHot: true, desc: '±0.2mm Precision CAD Vector' },
    { label: 'Industries We Serve', page: 'industries', icon: <Compass className="w-4 h-4 text-emerald-400" />, category: 'Sectors', desc: 'Fabrication & Engineering' },
    { label: 'Steel Weight Calculator', page: 'calculator', icon: <Calculator className="w-4 h-4 text-amber-400" />, category: 'Tools', desc: 'Theoretical Weight & Cost' },
    { label: 'Contact & Workshop', page: 'contact', icon: <Phone className="w-4 h-4 text-emerald-400" />, category: 'Main', desc: 'Coimbatore Plant & Yard' },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      
      {/* Top Industrial Live Ticker Bar */}
      <div className="bg-[#080A0D] border-b border-white/5 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SHOP FLOOR: ACTIVE</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
              <span>Prime IS 2062 Certified Plates</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-semibold">
              Live Base Steel: ₹{settings.defaultBasePricePerKg}/kg
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Laser Tolerance: <strong className="text-white">±0.2mm</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-mono">
              Coimbatore: <a href="tel:+919342472147" className="text-white hover:text-brand-orange">9342472147</a> / <a href="tel:+918056310565" className="text-white hover:text-brand-orange">8056310565</a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B0D12]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5' 
          : 'bg-[#0F1117]/95 backdrop-blur-md border-b border-white/5 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* LEFT SIDE: Navigation Trigger BEFORE Logo */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* ☰ Navigation Menu Button (Placed BEFORE Logo) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md ${
                  isMenuOpen
                    ? 'bg-brand-orange text-white border-brand-orange shadow-brand-orange/30'
                    : 'bg-slate-900/90 text-white border-slate-700 hover:border-brand-orange hover:bg-slate-800'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {isMenuOpen ? (
                  <X className="w-4 h-4 text-white" />
                ) : (
                  <Menu className="w-4 h-4 text-brand-orange" />
                )}
                <span className="hidden xs:inline font-mono">
                  {isMenuOpen ? 'Close' : 'Menu'}
                </span>
              </button>

              {/* Brand Logo with 3D Emblem */}
              <div 
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 shadow-lg shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden flex items-center justify-center shrink-0">
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
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-black text-lg sm:text-2xl tracking-wider text-white uppercase group-hover:text-brand-orange transition-colors">
                      INDIAN <span className="text-brand-orange">STEEL</span>
                    </span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30 font-bold hidden md:inline-block">
                      COIMBATORE
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono tracking-tight -mt-1 hidden sm:block">
                    Plate Cutting • Precision • Quality • Value
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Action Bar (Right Side) */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Quick Call */}
              <a
                href={`tel:${settings.phone}`}
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 text-xs font-semibold hover:border-slate-500 hover:text-white transition-all shadow-sm font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                <span>Call Now</span>
              </a>

              {/* Steel Calculator Quick Trigger */}
              <button
                onClick={() => handleNavClick('calculator')}
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 text-xs font-semibold hover:border-amber-400 hover:text-white transition-all shadow-sm font-mono"
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Weight Calc</span>
              </button>

              {/* Direct 1-Click Admin Panel Button */}
              <button
                onClick={() => {
                  setUserRole('admin');
                  handleNavClick('admin-dashboard');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  activePage === 'admin-dashboard'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-inner'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-amber-400/50'
                }`}
                title="Open Admin Control Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Admin Panel</span>
              </button>

              {/* Primary Get a Quote Glowing CTA */}
              <button
                onClick={() => openQuoteModal()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange via-orange-500 to-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all border border-orange-400/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                <FileText className="w-4 h-4" />
                <span className="hidden xs:inline">Get a Quote</span>
                <span className="xs:hidden">Quote</span>
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* FULL-FEATURED SLIDE-DOWN NAVIGATION DRAWER & MEGA MENU (Opens on Click) */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] sm:top-[85px] bottom-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Top View Mode Bar inside Drawer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-slate-900/90 border border-slate-800 mb-8 gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-slate-400 block font-bold">
                  Switch Portal Workspace:
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Currently active: <strong className="text-white uppercase">{userRole} view</strong>
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => { setUserRole('visitor'); handleNavClick('home'); }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    userRole === 'visitor' ? 'bg-slate-700 text-white font-bold shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Public Site</span>
                </button>
                <button
                  onClick={() => { setUserRole('customer'); handleNavClick('customer-portal'); }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    userRole === 'customer' ? 'bg-emerald-600 text-white font-bold shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Customer Portal</span>
                </button>
                <button
                  onClick={() => { setUserRole('admin'); handleNavClick('admin-dashboard'); }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    userRole === 'admin' ? 'bg-amber-600 text-white font-bold shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>

            {/* Navigation Grid Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Section 1: Main Pages */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-brand-orange font-bold tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
                  <Compass className="w-3.5 h-3.5" />
                  <span>General Navigation</span>
                </div>
                <div className="space-y-1.5">
                  {navItems.filter(i => i.category === 'Main').map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                        activePage === item.page
                          ? 'bg-brand-orange/20 border border-brand-orange/40 text-white'
                          : 'bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold font-display uppercase tracking-wider">{item.label}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 2: Steel Cutting Technologies & Products */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Steel Supply & Cutting Services</span>
                </div>
                <div className="space-y-1.5">
                  {navItems.filter(i => i.category === 'Cutting' || i.category === 'Steel Supply').map((item) => (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                        activePage === item.page
                          ? 'bg-brand-orange/20 border border-brand-orange/40 text-white'
                          : 'bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold font-display uppercase tracking-wider flex items-center gap-1.5">
                            <span>{item.label}</span>
                            {item.isHot && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-brand-orange text-white">HOT</span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{item.desc}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 3: Engineering Tools & Workshop Info */}
              <div className="space-y-3">
                <div className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider flex items-center gap-1.5 pb-2 border-b border-slate-800">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Tools & Workshop Yard</span>
                </div>
                
                {/* Weight Calculator Card */}
                <div 
                  onClick={() => handleNavClick('calculator')}
                  className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 cursor-pointer group hover:border-amber-400 transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-400">Interactive Sizing Tool</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h4 className="text-sm font-bold font-display text-white">Steel Weight & Cost Calculator</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Calculate theoretical kilograms for rectangular plates, circular discs, and flange rings with 1-click quote transfer.
                  </p>
                </div>

                {/* Plant Location & Contact Quick Box */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
                  <div className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange" /> Coimbatore Workshop:
                  </div>
                  <p className="text-[11px] text-slate-200">
                    NO 16, V.K Road, sivanandhapuram, saravanampatty, Coimbatore - 641006
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="text-emerald-400 font-bold">GST: 33AAIFJ0968J1Z6</span>
                    <div className="flex items-center gap-2">
                      <a href="tel:+919342472147" className="text-white hover:text-brand-orange font-bold font-mono">
                        9342472147
                      </a>
                      <span className="text-slate-500">/</span>
                      <a href="tel:+918056310565" className="text-white hover:text-brand-orange font-bold font-mono">
                        8056310565
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono">
                Indian Steel • Steel Retail & Precision Custom Metal Cutting • Coimbatore
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openQuoteModal();
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20"
                >
                  Request Instant Quote
                </button>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase"
                >
                  Close Menu
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
