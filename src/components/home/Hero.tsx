import React, { useEffect, useRef } from 'react';
import { 
  FileText, 
  ChevronRight, 
  Shield, 
  Zap, 
  CheckCircle2, 
  Flame, 
  Layers, 
  Ruler, 
  Cpu, 
  Truck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Hero: React.FC = () => {
  const { setActivePage, openQuoteModal } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subtle interactive spark canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Laser spark particles
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['#FF5500', '#FFAA00', '#FF3300', '#FFFFFF', '#FF8800'];

    const createSparks = () => {
      const originX = width * 0.72;
      const originY = height * 0.45;
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 0.8 - Math.PI * 0.4;
        const speed = Math.random() * 5 + 2;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed * 1.5,
          vy: Math.sin(angle) * speed - 1,
          size: Math.random() * 2.5 + 1,
          life: 0,
          maxLife: Math.random() * 40 + 20,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      createSparks();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fill();

        // Glow trail
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#0F1115] overflow-hidden pt-8 pb-16 border-b border-slate-800">
      
      {/* Background Gradients & Industrial Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
              <span className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
                indiansteel.online • India's Trusted Steel Sizing & Cutting Specialists
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display text-white leading-[1.1] tracking-tight">
              Steel Cut to Your <br />
              <span className="orange-gradient-text">Exact Requirement.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Quality MS Plates, Precision Cutting & CNC Laser Cutting Services engineered for industrial, fabrication, structural, and commercial applications.
            </p>

            {/* Trust Statement Chip Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1 pb-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                <Shield className="w-4 h-4 text-brand-orange" />
                <span>Reliable Steel Supply</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                <Ruler className="w-4 h-4 text-brand-orange" />
                <span>Accurate Cutting</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
                <Truck className="w-4 h-4 text-brand-orange" />
                <span>Fast Turnaround</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-black text-sm uppercase tracking-wider shadow-2xl shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-orange-400/40"
              >
                <FileText className="w-5 h-5" />
                <span>Get a Quote Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('services');
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="px-7 py-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Cutting Services</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left">
              <div>
                <div className="text-2xl font-black font-display text-white">6mm - 100mm</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">MS Plate Thickness</div>
              </div>
              <div>
                <div className="text-2xl font-black font-display text-brand-orange">±0.2 mm</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Laser Precision</div>
              </div>
              <div>
                <div className="text-2xl font-black font-display text-white">24-48 HR</div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Fast Dispatch</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Industrial Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden industrial-card border border-slate-700/60 shadow-2xl group">
              
              {/* Main Industrial Environment Image */}
              <div className="relative h-[440px] w-full bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200"
                  alt="Industrial Steel Plate Cutting & CNC Laser Processing"
                  className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Laser Canvas Overlay */}
                <canvas 
                  ref={canvasRef} 
                  className="absolute inset-0 pointer-events-none z-10 w-full h-full"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-slate-950/30" />
                
                {/* Industrial HUD Badges */}
                <div className="absolute top-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-brand-orange animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase">CNC Laser Head Active</span>
                </div>

                <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-300" />
                  <span className="text-xs font-mono font-medium text-slate-300">IS 2062 Grade</span>
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white">Custom Plate & Shape Processing</h4>
                    <p className="text-xs text-slate-400 font-mono">Manual • Machine • CNC Laser Cutting</p>
                  </div>
                  <button
                    onClick={() => openQuoteModal()}
                    className="px-3.5 py-2 rounded-lg bg-brand-orange text-white font-bold text-xs uppercase shadow-md hover:bg-orange-600 transition-colors"
                  >
                    Quick Quote
                  </button>
                </div>
              </div>

            </div>

            {/* Decorative Floating Accent Elements */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl backdrop-blur-md z-30">
              <div className="w-10 h-10 rounded-lg bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center text-brand-orange">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">CAD DXF / DWG Ready</div>
                <div className="text-[10px] text-slate-400">Direct Drawing Upload Support</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
