import React, { useEffect, useRef, useState } from 'react';
import { 
  FileText, 
  ChevronRight, 
  Shield, 
  Zap, 
  Flame, 
  Layers, 
  Ruler, 
  Cpu, 
  Truck,
  Activity,
  Maximize2,
  Sliders,
  CheckCircle2,
  Sparkles,
  Award,
  ArrowUpRight,
  Calculator,
  Phone
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Hero: React.FC = () => {
  const { setActivePage, openQuoteModal, settings } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Interactive Plate Thickness Selector on Hero
  const [selectedThickness, setSelectedThickness] = useState<number>(16);

  const thicknessList = [6, 8, 10, 12, 16, 20, 25, 32, 40, 50, 100];
  const weightPerSqM = Number(((1 * 1 * selectedThickness * 7.85)).toFixed(1)); // kg/m2
  const pricePerSqM = Math.round(weightPerSqM * (settings.defaultBasePricePerKg || 64));

  // Interactive CNC Laser Head & Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let t = 0;
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const sparks: Spark[] = [];
    const cutPath: { x: number; y: number }[] = [];
    const colors = ['#FF5500', '#FFAA00', '#FF3300', '#FFFFFF', '#FF8800', '#FFE58F'];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.50;
      const cy = height * 0.48;
      const radius = Math.min(width, height) * 0.30;

      // Parametric cut contour (Industrial Flange Profile)
      const angle = t * 0.032;
      const gearTeeth = 8;
      const r = radius + Math.sin(angle * gearTeeth) * 18;
      const headX = cx + Math.cos(angle) * r;
      const headY = cy + Math.sin(angle) * r;

      cutPath.push({ x: headX, y: headY });
      if (cutPath.length > 220) cutPath.shift();

      // Render glowing cut path
      if (cutPath.length > 1) {
        ctx.beginPath();
        ctx.moveTo(cutPath[0].x, cutPath[0].y);
        for (let i = 1; i < cutPath.length; i++) {
          ctx.lineTo(cutPath[i].x, cutPath[i].y);
        }
        ctx.strokeStyle = 'rgba(255, 85, 0, 0.45)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF5500';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Generate sparks
      for (let i = 0; i < 4; i++) {
        const sparkAngle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        sparks.push({
          x: headX,
          y: headY,
          vx: Math.cos(sparkAngle) * speed,
          vy: Math.sin(sparkAngle) * speed + 1.2,
          size: Math.random() * 2.8 + 1,
          life: 0,
          maxLife: Math.random() * 35 + 15,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // Draw CNC Laser Head
      ctx.beginPath();
      ctx.arc(headX, headY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#FF5500';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(headX, headY, 15, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 85, 0, 0.35)';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update & Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.18;
        s.life++;

        const alpha = 1 - s.life / s.maxLife;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.shadowBlur = 6;
        ctx.shadowColor = s.color;
        ctx.fill();

        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      t++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center bg-[#0A0C10] overflow-hidden pt-8 pb-20 border-b border-slate-800">
      
      {/* Background Gradients & CAD Overlay */}
      <div className="absolute inset-0 cad-crosshair-bg opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-brand-orange/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-40 left-1/4 w-[550px] h-[550px] bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Laser Top Glow Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Thickness Quick Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 shadow-inner">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider text-slate-200 uppercase">
                Mild Steel Plates & Custom Cutting • Coimbatore Yard
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display text-white leading-[1.08] tracking-tight">
              Cut-to-Size Mild Steel Plates. <br />
              <span className="orange-gradient-text">Direct from Warehouse.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              We supply prime IS 2062 mild steel plates in full sizes or cut to your exact length, width, and shape. Whether you need a single machine base plate or batch production parts, get clean cuts and honest per-kg rates with fast dispatch across Tamil Nadu and India.
            </p>

            {/* Interactive Plate Thickness Quick Selector Strip */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Choose Plate Thickness:</span>
                </span>
                <span className="text-brand-orange font-bold">
                  {selectedThickness} mm Selected
                </span>
              </div>

              {/* Thickness Chips */}
              <div className="flex flex-wrap gap-1.5">
                {thicknessList.map((th) => (
                  <button
                    key={th}
                    onClick={() => setSelectedThickness(th)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedThickness === th
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-105 border border-orange-400'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {th}mm
                  </button>
                ))}
              </div>

              {/* Live Spec Readout */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">
                  Approx Weight: <strong className="text-white">{weightPerSqM} kg/m²</strong>
                </span>
                <span className="text-slate-400">
                  Base Rate: <strong className="text-emerald-400">≈ ₹{pricePerSqM.toLocaleString()}/m²</strong>
                </span>
                <button
                  onClick={() => openQuoteModal({ thickness: selectedThickness })}
                  className="text-brand-orange hover:underline font-bold flex items-center gap-1 text-[11px]"
                >
                  <span>Get {selectedThickness}mm Price</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1">
              <button
                onClick={() => openQuoteModal({ thickness: selectedThickness })}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange via-orange-500 to-red-600 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:scale-[1.02] active:scale-[0.98] transition-all border border-orange-400/50 flex items-center justify-center gap-2 group"
              >
                <FileText className="w-4 h-4" />
                <span>Get a Fast Quotation</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('calculator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-brand-orange/60 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>Calculate Weight</span>
              </button>

              <a
                href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello Indian Steel, I need a quote for ${selectedThickness}mm MS plate cut to size.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Specs</span>
              </a>
            </div>

            {/* Benchmark Quality Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black font-display text-white">6mm - 100mm</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">Plate Thickness Stock</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-display text-brand-orange">±0.2 mm</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">CNC Laser Precision</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-display text-emerald-400">100% CAD</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">DXF/DWG Vector Import</div>
              </div>
            </div>

          </div>

          {/* Right Column: CNC Laser Simulation Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden industrial-card border border-slate-700 shadow-2xl group">
              
              {/* Telemetry Top Bar */}
              <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-brand-orange animate-pulse" />
                  <span className="text-white font-bold">FIBER LASER 6.0 kW</span>
                </div>
                <span className="text-emerald-400 text-[11px] font-bold">● ACTIVE SIMULATION</span>
              </div>

              {/* Simulation Canvas Viewport */}
              <div className="relative h-[390px] w-full bg-[#080A0D] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000"
                  alt="CNC Laser Cutting MS Plate"
                  className="w-full h-full object-cover filter brightness-[0.45] contrast-125"
                />

                {/* Laser Canvas Overlay */}
                <canvas 
                  ref={canvasRef} 
                  className="absolute inset-0 pointer-events-none z-10 w-full h-full"
                />

                {/* HUD Coordinate Crosshairs */}
                <div className="absolute top-3 left-3 z-20 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-[10px] font-mono text-slate-300">
                  <span>[X: 1240.5mm | Y: 860.2mm]</span>
                </div>

                <div className="absolute top-3 right-3 z-20 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-[10px] font-mono text-brand-orange">
                  <span>ASSIST GAS: N2 @ 18 BAR</span>
                </div>

                {/* Bottom Live Telemetry Overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-20 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/80 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>Custom Flange & Plate Profiling</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Material: Mild Steel IS 2062 | Thickness: {selectedThickness}mm
                    </div>
                  </div>

                  <button
                    onClick={() => openQuoteModal({ cuttingMethod: 'Laser Cutting', thickness: selectedThickness })}
                    className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase shadow-md transition-colors"
                  >
                    Quote Cut
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
