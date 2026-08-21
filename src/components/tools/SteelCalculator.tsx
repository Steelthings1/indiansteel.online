import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Layers, 
  Ruler, 
  Shapes, 
  ArrowRight, 
  Info,
  Scale,
  Sparkles,
  Zap,
  Tag,
  DollarSign,
  Maximize2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SteelCalculator: React.FC = () => {
  const { openQuoteModal, settings } = useApp();

  const [shape, setShape] = useState<'rectangular' | 'circular' | 'ring'>('rectangular');
  const [lengthMm, setLengthMm] = useState<number>(2000);
  const [widthMm, setWidthMm] = useState<number>(1000);
  const [outerDiameterMm, setOuterDiameterMm] = useState<number>(1000);
  const [innerDiameterMm, setInnerDiameterMm] = useState<number>(300);
  const [thicknessMm, setThicknessMm] = useState<number>(16);
  const [quantity, setQuantity] = useState<number>(5);
  const [density, setDensity] = useState<number>(7.85); // g/cm3 for Mild Steel
  const [selectedMaterialName, setSelectedMaterialName] = useState('Mild Steel (MS IS 2062)');

  const materials = [
    { name: 'Mild Steel (MS IS 2062)', density: 7.85, baseRate: 64 },
    { name: 'High Tensile Steel (E350)', density: 7.85, baseRate: 72 },
    { name: 'Stainless Steel (SS 304)', density: 7.93, baseRate: 210 },
    { name: 'Carbon Steel (C45)', density: 7.85, baseRate: 85 },
    { name: 'Aluminium Alloy', density: 2.70, baseRate: 260 },
    { name: 'Brass / Copper', density: 8.50, baseRate: 480 },
  ];

  const [singleWeightKg, setSingleWeightKg] = useState<number>(0);
  const [totalWeightKg, setTotalWeightKg] = useState<number>(0);
  
  // Surcharge & Tax Options
  const [calcCuttingMethod, setCalcCuttingMethod] = useState<'Manual Cutting' | 'Machine Cutting' | 'Laser Cutting'>('Machine Cutting');
  const [calcDelivery, setCalcDelivery] = useState<'pickup' | 'local' | 'freight'>('pickup');
  
  const [rawCost, setRawCost] = useState<number>(0);
  const [cuttingCost, setCuttingCost] = useState<number>(0);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [taxableSubtotal, setTaxableSubtotal] = useState<number>(0);
  const [gstAmount, setGstAmount] = useState<number>(0);
  const [estCost, setEstCost] = useState<number>(0);

  // Quick Preset Sizing
  const applyPreset = (presetShape: 'rectangular' | 'circular' | 'ring', l: number, w: number, th: number) => {
    setShape(presetShape);
    if (presetShape === 'rectangular') {
      setLengthMm(l);
      setWidthMm(w);
    } else if (presetShape === 'circular') {
      setOuterDiameterMm(l);
    } else if (presetShape === 'ring') {
      setOuterDiameterMm(l);
      setInnerDiameterMm(w);
    }
    setThicknessMm(th);
  };

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
    const singleKg = Number(weightKg.toFixed(2));
    const totalKg = Number((weightKg * quantity).toFixed(2));
    
    setSingleWeightKg(singleKg);
    setTotalWeightKg(totalKg);

    // Calculate Costs with GST 18% & Surcharges
    const mat = materials.find(m => m.density === density) || materials[0];
    const materialBase = totalKg * (mat.baseRate || 64);
    
    // Cutting surcharge per kg based on method
    let cutRatePerKg = 5;
    if (calcCuttingMethod === 'Manual Cutting') cutRatePerKg = 3;
    if (calcCuttingMethod === 'Laser Cutting') cutRatePerKg = 10;
    const cutFee = Math.round(totalKg * cutRatePerKg);

    // Delivery surcharge
    let freightFee = 0;
    if (calcDelivery === 'local') freightFee = 800;
    if (calcDelivery === 'freight') freightFee = 1800;

    const subtotal = Math.round(materialBase + cutFee + freightFee);
    const gst18 = Math.round(subtotal * 0.18); // 18% GST
    const totalWithGst = subtotal + gst18;

    setRawCost(Math.round(materialBase));
    setCuttingCost(cutFee);
    setDeliveryCost(freightFee);
    setTaxableSubtotal(subtotal);
    setGstAmount(gst18);
    setEstCost(totalWithGst);
  }, [shape, lengthMm, widthMm, outerDiameterMm, innerDiameterMm, thicknessMm, quantity, density, calcCuttingMethod, calcDelivery]);

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
      materialType: selectedMaterialName,
      thickness: thicknessMm,
      length: l,
      width: w,
      quantity: quantity,
      requiredShape: shapeLabel as any,
      estimatedWeightKg: totalWeightKg
    });
  };

  return (
    <section className="py-20 bg-[#0C0E12] relative border-b border-slate-800" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Industrial Engineering Sizing Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-3">
            Steel Weight & Price Estimator
          </h2>
          <p className="text-sm text-slate-400">
            Calculate accurate theoretical weight for plates, sheets, circular discs, and flange profiles using standard nominal material density formulas.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="max-w-5xl mx-auto industrial-card rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-8">
          
          {/* Quick Presets Row */}
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase mr-1 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-brand-orange" /> Standard Presets:
            </span>
            <button
              onClick={() => applyPreset('rectangular', 2440, 1220, 12)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[11px] font-mono text-slate-300"
            >
              8ft x 4ft (12mm Plate)
            </button>
            <button
              onClick={() => applyPreset('rectangular', 2000, 1000, 20)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[11px] font-mono text-slate-300"
            >
              2000 x 1000mm (20mm Plate)
            </button>
            <button
              onClick={() => applyPreset('circular', 800, 800, 16)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[11px] font-mono text-slate-300"
            >
              Ø 800mm Circular Disc (16mm)
            </button>
            <button
              onClick={() => applyPreset('ring', 600, 250, 25)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-[11px] font-mono text-slate-300"
            >
              Flange OD 600 / ID 250 (25mm)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Parameters */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Shape Selector */}
              <div>
                <label className="block text-xs font-mono text-slate-300 font-semibold mb-2 flex items-center justify-between">
                  <span>1. Required Plate Profile Shape:</span>
                  <span className="text-brand-orange text-[11px] uppercase font-bold">{shape}</span>
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShape('rectangular')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      shape === 'rectangular'
                        ? 'bg-brand-orange/20 border-brand-orange text-white shadow-lg shadow-brand-orange/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <Shapes className="w-4 h-4" />
                    <span>Rectangular</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShape('circular')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      shape === 'circular'
                        ? 'bg-brand-orange/20 border-brand-orange text-white shadow-lg shadow-brand-orange/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                    <span>Circular Disc</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShape('ring')}
                    className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      shape === 'ring'
                        ? 'bg-brand-orange/20 border-brand-orange text-white shadow-lg shadow-brand-orange/20'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border-4 border-current" />
                    <span>Ring / Flange</span>
                  </button>
                </div>
              </div>

              {/* Material Type Selection */}
              <div>
                <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">
                  2. Material Alloy & Density:
                </label>
                <select
                  value={density}
                  onChange={e => {
                    const d = parseFloat(e.target.value);
                    setDensity(d);
                    const found = materials.find(m => m.density === d);
                    if (found) setSelectedMaterialName(found.name);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                >
                  {materials.map(m => (
                    <option key={m.name} value={m.density}>
                      {m.name} — ({m.density} g/cm³)
                    </option>
                  ))}
                </select>
              </div>

              {/* Dynamic Dimensions Inputs */}
              {shape === 'rectangular' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Length (mm)</label>
                    <input
                      type="number"
                      min={10}
                      value={lengthMm}
                      onChange={e => setLengthMm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Width (mm)</label>
                    <input
                      type="number"
                      min={10}
                      value={widthMm}
                      onChange={e => setWidthMm(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {shape === 'circular' && (
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Outer Diameter (OD mm)</label>
                  <input
                    type="number"
                    min={10}
                    value={outerDiameterMm}
                    onChange={e => setOuterDiameterMm(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Inner Hole Diameter (ID mm)</label>
                    <input
                      type="number"
                      min={0}
                      value={innerDiameterMm}
                      onChange={e => setInnerDiameterMm(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Additional Options: Cutting Method & Delivery */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1.5">Processing / Cutting Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'Manual Cutting', label: 'Manual Flame', extra: '+₹3/kg' },
                      { id: 'Machine Cutting', label: 'Machine Line', extra: '+₹5/kg' },
                      { id: 'Laser Cutting', label: 'Fiber Laser', extra: '+₹10/kg' },
                    ].map(opt => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setCalcCuttingMethod(opt.id as any)}
                        className={`p-2 rounded-xl text-left border text-[11px] font-mono transition-all ${
                          calcCuttingMethod === opt.id
                            ? 'bg-brand-orange/20 border-brand-orange text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold">{opt.label}</div>
                        <div className="text-[10px] text-brand-orange">{opt.extra}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1.5">Delivery / Transport Option</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pickup', label: 'Self Pickup', fee: '₹0' },
                      { id: 'local', label: 'Coimbatore Local', fee: '₹800' },
                      { id: 'freight', label: 'TN Freight', fee: '₹1,800' },
                    ].map(d => (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => setCalcDelivery(d.id as any)}
                        className={`p-2 rounded-xl text-left border text-[11px] font-mono transition-all ${
                          calcDelivery === d.id
                            ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold">{d.label}</div>
                        <div className="text-[10px] text-emerald-400">{d.fee}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Live Plate Visualizer Preview & Weight Card */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Interactive SVG Geometry Visualizer */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 relative flex flex-col items-center justify-center min-h-[160px] overflow-hidden group">
                <div className="absolute top-2.5 left-3 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Maximize2 className="w-3 h-3 text-brand-orange" />
                  <span>CAD Geometry Visualizer</span>
                </div>
                
                {/* SVG Shape Render */}
                <div className="w-48 h-28 flex items-center justify-center relative mt-3">
                  {shape === 'rectangular' && (
                    <div 
                      className="border-2 border-brand-orange bg-brand-orange/15 rounded flex items-center justify-center relative shadow-lg shadow-brand-orange/20"
                      style={{
                        width: `${Math.min(180, Math.max(70, (lengthMm / (lengthMm + widthMm)) * 260))}px`,
                        height: `${Math.min(90, Math.max(40, (widthMm / (lengthMm + widthMm)) * 260))}px`,
                      }}
                    >
                      <span className="text-[10px] font-mono text-white font-bold">{lengthMm} x {widthMm}mm</span>
                      <span className="absolute -bottom-4 text-[9px] font-mono text-slate-400">T: {thicknessMm}mm</span>
                    </div>
                  )}

                  {shape === 'circular' && (
                    <div 
                      className="border-2 border-brand-orange bg-brand-orange/15 rounded-full flex items-center justify-center relative shadow-lg shadow-brand-orange/20"
                      style={{
                        width: `90px`,
                        height: `90px`,
                      }}
                    >
                      <span className="text-[10px] font-mono text-white font-bold">Ø {outerDiameterMm}mm</span>
                      <span className="absolute -bottom-4 text-[9px] font-mono text-slate-400">T: {thicknessMm}mm</span>
                    </div>
                  )}

                  {shape === 'ring' && (
                    <div 
                      className="border-2 border-brand-orange bg-brand-orange/15 rounded-full flex items-center justify-center relative shadow-lg shadow-brand-orange/20"
                      style={{
                        width: `100px`,
                        height: `100px`,
                      }}
                    >
                      <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/60 bg-slate-950 flex items-center justify-center">
                        <span className="text-[8px] font-mono text-slate-300">Ø{innerDiameterMm}</span>
                      </div>
                      <span className="absolute -bottom-4 text-[9px] font-mono text-slate-400">OD: {outerDiameterMm}mm | T: {thicknessMm}mm</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Output Results Box & Full GST 18% Breakdown */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3.5">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Single Pc Weight:</span>
                    <span className="text-xl font-black font-display text-white">{singleWeightKg.toLocaleString()} <span className="text-xs font-normal text-slate-400">kg</span></span>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-br from-brand-orange/20 to-orange-950/30 border border-brand-orange/40">
                    <span className="text-[10px] font-mono text-brand-orange font-bold uppercase block">Total Weight ({quantity} pcs):</span>
                    <span className="text-2xl font-black font-display text-white">{totalWeightKg.toLocaleString()} <span className="text-xs font-normal text-slate-300">kg</span></span>
                  </div>
                </div>

                {/* Itemized Price & GST 18% Surcharge Breakdown */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Material Base ({totalWeightKg} kg):</span>
                    <span className="text-white">₹{rawCost.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>{calcCuttingMethod} Charge:</span>
                    <span className="text-white">₹{cuttingCost.toLocaleString()}</span>
                  </div>

                  {deliveryCost > 0 && (
                    <div className="flex justify-between text-slate-400">
                      <span>Freight / Delivery Charge:</span>
                      <span className="text-white">₹{deliveryCost.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-300 pt-1.5 border-t border-slate-800">
                    <span>Taxable Subtotal:</span>
                    <span className="text-white font-bold">₹{taxableSubtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-brand-orange font-semibold">
                    <span>GST @ 18% (9% CGST + 9% SGST):</span>
                    <span>+ ₹{gstAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-700/80 text-sm">
                    <span className="font-bold text-white uppercase">Grand Total (Incl. 18% GST):</span>
                    <span className="text-xl font-black font-display text-emerald-400">₹{estCost.toLocaleString()}</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 text-[10px] text-slate-400 border border-slate-800/80 font-mono">
                  <Info className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                  <p>
                    IS 2062 Mill Plate Density: {density} g/cm³. GST invoice (33AAIFJ0968J1Z6) generated with input tax credit support.
                  </p>
                </div>

                {/* Send to Quote Button */}
                <button
                  type="button"
                  onClick={handleTransferToQuote}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/30 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Transfer Dimensions to Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
