import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Layers, 
  Ruler, 
  Shapes, 
  ArrowRight, 
  Info,
  Scale
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SteelCalculator: React.FC = () => {
  const { openQuoteModal } = useApp();

  const [shape, setShape] = useState<'rectangular' | 'circular' | 'ring'>('rectangular');
  const [lengthMm, setLengthMm] = useState<number>(2000);
  const [widthMm, setWidthMm] = useState<number>(1000);
  const [outerDiameterMm, setOuterDiameterMm] = useState<number>(1000);
  const [innerDiameterMm, setInnerDiameterMm] = useState<number>(300);
  const [thicknessMm, setThicknessMm] = useState<number>(16);
  const [quantity, setQuantity] = useState<number>(5);
  const [density, setDensity] = useState<number>(7.85); // g/cm3 for Mild Steel

  const materials = [
    { name: 'Mild Steel (MS / IS 2062)', density: 7.85 },
    { name: 'Stainless Steel (SS 304/316)', density: 7.93 },
    { name: 'Carbon Steel (C45)', density: 7.85 },
    { name: 'Aluminium Alloy', density: 2.70 },
    { name: 'Brass / Copper', density: 8.50 },
  ];

  const [singleWeightKg, setSingleWeightKg] = useState<number>(0);
  const [totalWeightKg, setTotalWeightKg] = useState<number>(0);

  useEffect(() => {
    let volumeCm3 = 0;
    const tCm = thicknessMm / 10;

    if (shape === 'rectangular') {
      const lCm = lengthMm / 10;
      const wCm = widthMm / 10;
      volumeCm3 = lCm * wCm * tCm;
    } else if (shape === 'circular') {
      const rCm = outerDiameterMm / 20;
      volumeCm3 = Math.PI * (rCm * rCm) * tCm;
    } else if (shape === 'ring') {
      const rOuterCm = outerDiameterMm / 20;
      const rInnerCm = innerDiameterMm / 20;
      const areaCm2 = Math.PI * ((rOuterCm * rOuterCm) - (rInnerCm * rInnerCm));
      volumeCm3 = Math.max(0, areaCm2 * tCm);
    }

    const weightGrams = volumeCm3 * density;
    const weightKg = weightGrams / 1000;
    
    setSingleWeightKg(Number(weightKg.toFixed(2)));
    setTotalWeightKg(Number((weightKg * quantity).toFixed(2)));
  }, [shape, lengthMm, widthMm, outerDiameterMm, innerDiameterMm, thicknessMm, quantity, density]);

  const handleTransferToQuote = () => {
    let shapeLabel = 'Rectangular Plate';
    let l = lengthMm;
    let w = widthMm;

    if (shape === 'circular') {
      shapeLabel = 'Circular Disc';
      l = outerDiameterMm;
      w = outerDiameterMm;
    } else if (shape === 'ring') {
      shapeLabel = 'Ring / Flange';
      l = outerDiameterMm;
      w = innerDiameterMm;
    }

    openQuoteModal({
      thickness: thicknessMm,
      length: l,
      width: w,
      quantity: quantity,
      requiredShape: shapeLabel as any,
      estimatedWeightKg: totalWeightKg
    });
  };

  return (
    <section className="py-20 bg-[#0F1115] relative border-b border-slate-800" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>Industrial Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Steel Weight Calculator
          </h2>
          <p className="text-sm text-slate-400">
            Calculate estimated theoretical weight for plates, sheets, discs, and flanges based on standard material density formulas.
          </p>
        </div>

        {/* Calculator Widget Card */}
        <div className="max-w-4xl mx-auto industrial-card rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Form Inputs */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Shape Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-300 font-semibold mb-2">
                  1. Select Required Plate Shape:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setShape('rectangular')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      shape === 'rectangular'
                        ? 'bg-brand-orange/20 border-brand-orange text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Shapes className="w-4 h-4" />
                    <span>Rectangular</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShape('circular')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      shape === 'circular'
                        ? 'bg-brand-orange/20 border-brand-orange text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                    <span>Circular Disc</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShape('ring')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      shape === 'ring'
                        ? 'bg-brand-orange/20 border-brand-orange text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border-4 border-current" />
                    <span>Ring / Flange</span>
                  </button>
                </div>
              </div>

              {/* Material Density Picker */}
              <div>
                <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">
                  2. Material Type & Density:
                </label>
                <select
                  value={density}
                  onChange={e => setDensity(parseFloat(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                >
                  {materials.map(m => (
                    <option key={m.name} value={m.density}>
                      {m.name} ({m.density} g/cm³)
                    </option>
                  ))}
                </select>
              </div>

              {/* Dimensions Input based on Shape */}
              {shape === 'rectangular' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Length (mm)</label>
                    <input
                      type="number"
                      min={10}
                      value={lengthMm}
                      onChange={e => setLengthMm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Width (mm)</label>
                    <input
                      type="number"
                      min={10}
                      value={widthMm}
                      onChange={e => setWidthMm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {shape === 'circular' && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Outer Diameter (OD in mm)</label>
                  <input
                    type="number"
                    min={10}
                    value={outerDiameterMm}
                    onChange={e => setOuterDiameterMm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                  />
                </div>
              )}

              {shape === 'ring' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Outer Diameter (OD mm)</label>
                    <input
                      type="number"
                      min={10}
                      value={outerDiameterMm}
                      onChange={e => setOuterDiameterMm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Inner Hole Dia (ID mm)</label>
                    <input
                      type="number"
                      min={0}
                      value={innerDiameterMm}
                      onChange={e => setInnerDiameterMm(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Thickness & Quantity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Thickness (mm)</label>
                  <input
                    type="number"
                    min={1}
                    value={thicknessMm}
                    onChange={e => setThicknessMm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Quantity (Pieces)</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Output Results */}
            <div className="md:col-span-5 flex flex-col justify-between p-6 rounded-xl bg-slate-950/80 border border-slate-800 space-y-6">
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Scale className="w-5 h-5 text-brand-orange" />
                  <span className="text-xs font-mono font-bold text-white uppercase">Weight Output Result</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Single Piece Weight:</div>
                  <div className="text-2xl font-black font-display text-white">
                    {singleWeightKg.toLocaleString()} <span className="text-sm font-normal text-slate-400">kg</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-brand-orange/15 to-orange-950/20 border border-brand-orange/40">
                  <div className="text-[11px] font-mono text-brand-orange uppercase font-bold">Total Estimated Weight ({quantity} pcs):</div>
                  <div className="text-3xl font-black font-display text-white">
                    {totalWeightKg.toLocaleString()} <span className="text-base font-normal text-slate-300">kg</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    ≈ {(totalWeightKg / 1000).toFixed(3)} Metric Tons
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-slate-900/60 text-[10px] text-slate-400 border border-slate-800/80">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    Disclaimer: Weight shown is an estimate based on standard nominal density ({density} g/cm³). Actual weight may vary depending on material rolling tolerances.
                  </p>
                </div>
              </div>

              {/* Transfer to Quote Button */}
              <button
                type="button"
                onClick={handleTransferToQuote}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Send to Quote Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
