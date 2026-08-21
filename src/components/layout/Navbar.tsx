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
  Search,
  Activity,
  ShieldCheck
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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

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

  const navItems: { label: string; page: ActivePage; icon: React.ReactNode; isHot?: boolean }[] = [
    { label: 'Home', page: 'home', icon: <Compass className="w-3.5 h-3.5" /> },
    { label: 'About Us', page: 'about', icon: <Layers className="w-3.5 h-3.5" /> },
    { label: 'Products', page: 'products', icon: <Wrench className="w-3.5 h-3.5" /> },
    { label: 'Services', page: 'services', icon: <Zap className="w-3.5 h-3.5" /> },
    { label: 'MS Plate Cutting', page: 'ms-plate-cutting', icon: <Wrench className="w-3.5 h-3.5" /> },
    { label: 'Laser Cutting', page: 'laser-cutting', icon: <Zap className="w-3.5 h-3.5 text-brand-orange" />, isHot: true },
    { label: 'Industries', page: 'industries', icon: <Compass className="w-3.5 h-3.5" /> },
    { label: 'Steel Calculator', page: 'calculator', icon: <Calculator className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'Contact', page: 'contact', icon: <Phone className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      
      {/* Top Industrial Live Ticker Bar */}
      <div className="bg-[#090B0E] border-b border-white/5 py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SHOP FLOOR: ACTIVE</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3 h-3 text-brand-orange" />
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
            <a 
              href={`mailto:${settings.email}`} 
              className="text-slate-400 hover:text-white transition-colors"
            >
              {settings.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B0D12]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5' 
          : 'bg-[#0F1117]/90 backdrop-blur-md border-b border-white/5 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 shadow-lg shadow-brand-orange/20 group-hover:scale-105 transition-transform duration-300 relative overflow-hidden flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Indian Steel Logo" 
                  className="w-full h-full object-contain rounded-lg filter drop-shadow-md"
                  onError={(e) => {
                    // Fallback to logo.jpg if logo.png fails
                    (e.target as HTMLImageElement).src = '/logo.jpg';
                  }}
                />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-white uppercase group-hover:text-brand-orange transition-colors">
                    INDIAN<span className="text-brand-orange">STEEL</span><span className="text-slate-400 font-mono text-base font-normal lowercase">.online</span>
                  </span>
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30 font-bold hidden sm:inline-block">
                    ESTD 2026
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-tight -mt-1 hidden sm:block">
                  Plate Cutting • Precision • Quality • Value
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-200 flex items-center gap-1.5 relative ${
                    activePage === item.page
                      ? 'text-white bg-brand-orange/20 border border-brand-orange/40 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.isHot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Bar */}
            <div className="hidden sm:flex items-center gap-2.5">
              
              {/* Call CTA */}
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-900/90 text-slate-200 text-xs font-semibold hover:border-slate-500 hover:text-white transition-all shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
                <span className="hidden md:inline">Call Now</span>
              </a>

              {/* Get a Quote Primary Glowing CTA */}
              <button
                onClick={() => openQuoteModal()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange via-orange-500 to-red-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.03] active:scale-[0.98] transition-all border border-orange-400/50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                <FileText className="w-4 h-4" />
                <span>Get a Quote</span>
              </button>

              {/* Portal View Switcher (Admin / Customer / Visitor) */}
              <div className="relative">
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all text-xs flex items-center gap-1.5 shadow-sm"
                  title="Switch Portal Mode (Admin/Customer/Visitor)"
                >
                  {userRole === 'admin' ? (
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                  ) : userRole === 'customer' ? (
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <User className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isRoleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                      <span>Switch Application View</span>
                      <Sparkles className="w-3 h-3 text-brand-orange" />
                    </div>
                    
                    <button
                      onClick={() => {
                        setUserRole('visitor');
                        handleNavClick('home');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 mt-1 transition-colors ${
                        userRole === 'visitor' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <div>
                        <div>Public Website</div>
                        <div className="text-[10px] text-slate-500 font-mono">Catalog & Quote Tools</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setUserRole('customer');
                        handleNavClick('customer-portal');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                        userRole === 'customer' ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div>Customer Portal</div>
                        <div className="text-[10px] text-emerald-400/70 font-mono">Track Orders & Drawings</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setUserRole('admin');
                        handleNavClick('admin-dashboard');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                        userRole === 'admin' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4 text-amber-400" />
                      <div>
                        <div>Admin Dashboard</div>
                        <div className="text-[10px] text-amber-400/70 font-mono">Quotes, Jobs & Settings</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openQuoteModal()}
                className="px-3 py-1.5 rounded-lg bg-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-md"
              >
                Quote
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 hover:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0C0E14]/98 border-b border-slate-800 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono">View Mode:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setUserRole('visitor'); handleNavClick('home'); }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${userRole === 'visitor' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                >
                  Public
                </button>
                <button
                  onClick={() => { setUserRole('customer'); handleNavClick('customer-portal'); }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${userRole === 'customer' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  Customer
                </button>
                <button
                  onClick={() => { setUserRole('admin'); handleNavClick('admin-dashboard'); }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${userRole === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activePage === item.page
                      ? 'bg-brand-orange/20 text-brand-orange border border-brand-orange/40 font-bold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-brand-orange/25"
              >
                Get a Custom Cutting Quote
              </button>
              
              <a
                href={`tel:${settings.phone}`}
                className="w-full py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-sm text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-orange" />
                <span>Call {settings.phone}</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </header>
  );
};
