import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
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
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ActivePage, UserRole } from '../../types';

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

  const navItems: { label: string; page: ActivePage; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Compass className="w-4 h-4" /> },
    { label: 'About Us', page: 'about', icon: <Layers className="w-4 h-4" /> },
    { label: 'Products', page: 'products', icon: <Wrench className="w-4 h-4" /> },
    { label: 'Services', page: 'services', icon: <Zap className="w-4 h-4" /> },
    { label: 'MS Plate Cutting', page: 'ms-plate-cutting', icon: <Wrench className="w-4 h-4" /> },
    { label: 'Laser Cutting', page: 'laser-cutting', icon: <Zap className="w-4 h-4 text-brand-orange" /> },
    { label: 'Industries', page: 'industries', icon: <Compass className="w-4 h-4" /> },
    { label: 'Steel Calculator', page: 'calculator', icon: <Calculator className="w-4 h-4 text-amber-400" /> },
    { label: 'Contact', page: 'contact', icon: <Phone className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0B0D11]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-2.5' 
        : 'bg-[#0F1115]/80 backdrop-blur-sm border-b border-white/5 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-orange to-red-700 flex items-center justify-center text-white shadow-lg shadow-brand-orange/20 border border-orange-400/30 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 stroke-white fill-none stroke-[2.5]" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-2xl tracking-wider text-white uppercase group-hover:text-brand-orange transition-colors">
                  INDIAN<span className="text-brand-orange">STEEL</span><span className="text-slate-400 font-mono text-lg lowercase">.online</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-orange/10 text-brand-orange border border-brand-orange/30">
                  ESTD 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight -mt-1 hidden sm:block">
                indiansteel.online • Steel Retail & Custom Cutting Services
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  activePage === item.page
                    ? 'text-brand-orange bg-brand-orange/10 border border-brand-orange/30 shadow-inner'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Call Now */}
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 text-xs font-semibold hover:border-slate-500 hover:text-white transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              <span>Call Now</span>
            </a>

            {/* Get a Quote Primary CTA */}
            <button
              onClick={() => openQuoteModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-brand-orange to-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-[1.02] active:scale-[0.98] transition-all border border-orange-400/40"
            >
              <FileText className="w-4 h-4" />
              <span>Get a Quote</span>
            </button>

            {/* Portal Switcher Dropdown (Admin / Customer / Visitor view toggle) */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-all text-xs flex items-center gap-1.5"
                title="Switch View Mode (Admin/Customer/Visitor)"
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
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono uppercase text-slate-400 px-3 py-1 border-b border-slate-800">
                    Switch App View
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('visitor');
                      handleNavClick('home');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 mt-1 ${
                      userRole === 'visitor' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Public Website</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('customer');
                      handleNavClick('customer-portal');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      userRole === 'customer' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Customer Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      handleNavClick('admin-dashboard');
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 ${
                      userRole === 'admin' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin Control Center</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openQuoteModal()}
              className="px-3 py-1.5 rounded-lg bg-brand-orange text-white font-bold text-[11px] uppercase tracking-wider shadow-md"
            >
              Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0F1115]/98 border-b border-slate-800 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
            
            {/* Quick View Mode Switcher for Mobile */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-mono">Current View:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setUserRole('visitor'); handleNavClick('home'); }}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold ${userRole === 'visitor' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}
                >
                  Public
                </button>
                <button
                  onClick={() => { setUserRole('customer'); handleNavClick('customer-portal'); }}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold ${userRole === 'customer' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  Customer
                </button>
                <button
                  onClick={() => { setUserRole('admin'); handleNavClick('admin-dashboard'); }}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold ${userRole === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1 pt-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.page
                      ? 'bg-brand-orange/15 text-brand-orange border border-brand-orange/30 font-bold'
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

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full py-3 rounded-lg bg-brand-orange text-white font-bold text-sm uppercase tracking-wider text-center shadow-lg shadow-brand-orange/20"
              >
                Get a Custom Quote
              </button>
              
              <a
                href={`tel:${settings.phone}`}
                className="w-full py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm text-center flex items-center justify-center gap-2"
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
