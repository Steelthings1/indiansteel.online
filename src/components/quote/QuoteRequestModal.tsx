import React, { useState, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  FileCheck, 
  CheckCircle2, 
  FileText, 
  MessageSquare, 
  Building2, 
  Ruler, 
  Zap, 
  Truck, 
  Send,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CuttingMethod, PlateShape, DeliveryOption } from '../../types';

export const QuoteRequestModal: React.FC = () => {
  const { 
    isQuoteModalOpen, 
    closeQuoteModal, 
    quoteModalPrefill, 
    addQuoteRequest, 
    settings 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  
  const [materialType, setMaterialType] = useState('Mild Steel (MS IS 2062)');
  const [grade, setGrade] = useState('IS 2062 E250 Gr A/B');
  const [thickness, setThickness] = useState<number>(12);
  const [length, setLength] = useState<number>(1200);
  const [width, setWidth] = useState<number>(1000);
  const [quantity, setQuantity] = useState<number>(1);
  
  const [cuttingMethod, setCuttingMethod] = useState<CuttingMethod>('Machine Cutting');
  const [requiredShape, setRequiredShape] = useState<PlateShape>('Rectangular Plate');
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>('Standard Freight Delivery');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  const [drawingFile, setDrawingFile] = useState<File | null>(null);
  const [drawingFileName, setDrawingFileName] = useState<string>('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedQuoteId, setGeneratedQuoteId] = useState('');

  // Prefill when modal opens
  useEffect(() => {
    if (quoteModalPrefill) {
      if (quoteModalPrefill.thickness) setThickness(quoteModalPrefill.thickness);
      if (quoteModalPrefill.length) setLength(quoteModalPrefill.length);
      if (quoteModalPrefill.width) setWidth(quoteModalPrefill.width);
      if (quoteModalPrefill.quantity) setQuantity(quoteModalPrefill.quantity);
      if (quoteModalPrefill.cuttingMethod) setCuttingMethod(quoteModalPrefill.cuttingMethod);
      if (quoteModalPrefill.requiredShape) setRequiredShape(quoteModalPrefill.requiredShape);
      if (quoteModalPrefill.materialType) setMaterialType(quoteModalPrefill.materialType);
      if (quoteModalPrefill.additionalRequirements) setAdditionalRequirements(quoteModalPrefill.additionalRequirements);
    }
  }, [quoteModalPrefill, isQuoteModalOpen]);

  if (!isQuoteModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDrawingFile(file);
      setDrawingFileName(file.name);
    }
  };

  const calculateEstWeight = () => {
    const lCm = length / 10;
    const wCm = width / 10;
    const tCm = thickness / 10;
    const weightGrams = (lCm * wCm * tCm) * 7.85;
    return Number(((weightGrams / 1000) * quantity).toFixed(2));
  };

  const calculateEstMaterialCost = () => {
    const wt = calculateEstWeight();
    const rate = settings.defaultBasePricePerKg || 64;
    return Math.round(wt * rate);
  };

  const calculateEstCuttingFee = () => {
    const wt = calculateEstWeight();
    let cutRate = 5;
    if (cuttingMethod === 'Manual Cutting') cutRate = 3;
    if (cuttingMethod === 'Laser Cutting') cutRate = 10;
    return Math.round(wt * cutRate);
  };

  const calculateEstDeliveryFee = () => {
    if (deliveryOption === 'Express Site Delivery') return 1800;
    if (deliveryOption === 'Standard Freight Delivery') return 800;
    return 0;
  };

  const calculateTaxableSubtotal = () => {
    return calculateEstMaterialCost() + calculateEstCuttingFee() + calculateEstDeliveryFee();
  };

  const calculateGst18 = () => {
    return Math.round(calculateTaxableSubtotal() * 0.18);
  };

  const calculateGrandTotal = () => {
    return calculateTaxableSubtotal() + calculateGst18();
  };

  const calculateEstPrice = () => {
    return calculateGrandTotal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (!customerName.trim() || !mobileNumber.trim() || !email.trim()) {
        alert('Please fill in your Name, Mobile Number, and Email to proceed.');
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (length <= 0 || width <= 0 || thickness <= 0 || quantity <= 0) {
        alert('Please provide valid positive values for length, width, thickness, and quantity.');
        return;
      }
      setStep(3);
      return;
    }

    const estWeight = calculateEstWeight();
    const materialCost = calculateEstMaterialCost();
    const cuttingFee = calculateEstCuttingFee();
    const deliveryFee = calculateEstDeliveryFee();
    const tax18 = calculateGst18();
    const grandTotal = calculateGrandTotal();
    
    const quoteId = addQuoteRequest({
      customerName,
      companyName: companyName || 'Individual Contractor',
      mobileNumber,
      email,
      materialType,
      grade,
      thickness: Number(thickness) || 12,
      length: Number(length) || 1000,
      width: Number(width) || 1000,
      quantity: Number(quantity) || 1,
      cuttingMethod,
      requiredShape,
      deliveryOption,
      additionalRequirements,
      drawingFileName: drawingFileName || undefined,
      drawingFileUrl: drawingFileName ? '#' : undefined,
      estimatedWeightKg: estWeight,
      quotedPrice: materialCost + cuttingFee,
      quotedDeliveryFee: deliveryFee,
      quotedTax: tax18,
      quotedTotal: grandTotal
    });

    setGeneratedQuoteId(quoteId);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setGeneratedQuoteId('');
    setStep(1);
    closeQuoteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#101319] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B0D12] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 shadow-lg shadow-brand-orange/20 flex items-center justify-center shrink-0">
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
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                Instant Cutting Quotation Engine
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Indian Steel • Accurate Dimension Sizing & Mill Certified Material • Coimbatore
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Indicator */}
        {!isSubmitted && (
          <div className="bg-slate-950 px-6 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setStep(1)} 
                className={`flex items-center gap-1.5 ${step === 1 ? 'text-brand-orange font-bold' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">1</span>
                <span>Contact Info</span>
              </button>
              <span className="text-slate-600">→</span>
              <button 
                onClick={() => setStep(2)} 
                className={`flex items-center gap-1.5 ${step === 2 ? 'text-brand-orange font-bold' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">2</span>
                <span>Dimensions & Specs</span>
              </button>
              <span className="text-slate-600">→</span>
              <button 
                onClick={() => setStep(3)} 
                className={`flex items-center gap-1.5 ${step === 3 ? 'text-brand-orange font-bold' : 'text-slate-400'}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]">3</span>
                <span>Cutting & CAD Files</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400">
              <span>Estimated Weight: <strong className="text-brand-orange">{calculateEstWeight()} kg</strong></span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {isSubmitted ? (
            <div className="py-12 px-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Quote Request Received
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
                  Thank You! Your specification has been logged.
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Our engineering team is calculating nested cutting efficiency and will contact you with a binding quotation shortly.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 inline-block max-w-md w-full text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Quote Tracking ID:</span>
                  <span className="text-lg font-bold font-mono text-brand-orange">{generatedQuoteId}</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 font-mono">
                  <div>Customer: <strong className="text-white">{customerName}</strong> ({mobileNumber})</div>
                  <div>Specification: {materialType} • {thickness}mm • Qty: {quantity}</div>
                  <div>Estimated Weight: <strong className="text-emerald-400">{calculateEstWeight()} kg</strong></div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase"
                >
                  Close Window
                </button>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello Indian Steel, I just submitted quote ${generatedQuoteId} for ${materialType} (${thickness}mm). Please review.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center gap-2 shadow-lg shadow-emerald-600/30"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* STEP 1: CONTACT DETAILS */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      <span>Step 1: Contact & Delivery Information</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Step 1 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Customer / Contact Name *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Company / Workshop Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={e => setCompanyName(e.target.value)}
                        placeholder="e.g. Apex Fabricators Pvt Ltd"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Mobile Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={mobileNumber}
                        onChange={e => setMobileNumber(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="sales@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!customerName || !mobileNumber || !email) {
                          alert('Please fill in your Name, Mobile Number, and Email to proceed.');
                          return;
                        }
                        setStep(2);
                      }}
                      className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-orange/20"
                    >
                      <span>Proceed to Dimensions</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DIMENSIONS & SPECS */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                      <Ruler className="w-4 h-4" />
                      <span>Step 2: Material & Plate Dimensions</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Step 2 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Material Type</label>
                      <select
                        value={materialType}
                        onChange={e => setMaterialType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      >
                        {settings.materialsList.map(mat => (
                          <option key={mat} value={mat}>{mat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Steel Grade</label>
                      <select
                        value={grade}
                        onChange={e => setGrade(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      >
                        {settings.gradesList.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Thickness (mm) *</label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={thickness}
                        onChange={e => setThickness(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Length (mm) *</label>
                      <input
                        type="number"
                        required
                        min={10}
                        value={length}
                        onChange={e => setLength(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Width (mm) *</label>
                      <input
                        type="number"
                        required
                        min={10}
                        value={width}
                        onChange={e => setWidth(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Quantity (Pcs) *</label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Weight & Cost Live HUD */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Est. Theoretical Weight:</span>
                      <span className="text-brand-orange font-bold text-base">{calculateEstWeight()} kg</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[10px] uppercase">Indicative Subtotal:</span>
                      <span className="text-emerald-400 font-bold text-base">₹{calculateEstPrice().toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs uppercase flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-orange/20"
                    >
                      <span>Proceed to Cutting & CAD</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CUTTING METHOD & CAD UPLOAD */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-4 h-4" />
                      <span>Step 3: Cutting Method & CAD Vector Upload</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">Step 3 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Cutting Method</label>
                      <select
                        value={cuttingMethod}
                        onChange={e => setCuttingMethod(e.target.value as CuttingMethod)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      >
                        <option value="Manual Cutting">Manual Oxy-Fuel Cutting</option>
                        <option value="Machine Cutting">Machine Linear/Profile Cutting</option>
                        <option value="Laser Cutting">CNC Fiber Laser Precision Cutting</option>
                        <option value="Saw Cutting">Cold Saw Cutting</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Required Profile Shape</label>
                      <select
                        value={requiredShape}
                        onChange={e => setRequiredShape(e.target.value as PlateShape)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      >
                        <option value="Rectangular Plate">Rectangular Plate</option>
                        <option value="Circular Disc">Circular Disc</option>
                        <option value="Ring / Flange">Ring / Pipe Flange</option>
                        <option value="L-Angle / Custom Profile">L-Angle / Gusset Profile</option>
                        <option value="CAD Drawing Profile">CAD Drawing Profile</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Delivery / Pickup Preference</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Pickup from Workshop',
                        'Standard Freight Delivery',
                        'Express Site Delivery'
                      ].map(opt => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setDeliveryOption(opt as DeliveryOption)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                            deliveryOption === opt
                              ? 'bg-brand-orange/20 border-brand-orange text-white font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CAD File Dropzone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-slate-300 font-semibold">Upload CAD Drawing / File (Optional)</label>
                    <div className="border-2 border-dashed border-slate-700 hover:border-brand-orange/60 rounded-2xl p-5 text-center bg-slate-950/60 transition-colors">
                      <input
                        type="file"
                        id="drawing-upload-input"
                        accept=".dxf,.dwg,.pdf,.jpg,.jpeg,.png,.step,.iges"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="drawing-upload-input" className="cursor-pointer space-y-2 block">
                        <UploadCloud className="w-8 h-8 text-brand-orange mx-auto animate-bounce" />
                        <div className="text-xs text-slate-200">
                          {drawingFileName ? (
                            <span className="text-emerald-400 font-bold flex items-center justify-center gap-1.5">
                              <FileCheck className="w-4 h-4" /> {drawingFileName}
                            </span>
                          ) : (
                            <span>Drag & Drop CAD Drawings (DXF, DWG, PDF, STEP) or Click to Browse</span>
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-2 pt-1">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">.DXF</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">.DWG</span>
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">.PDF</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Additional Project Specifications</label>
                    <textarea
                      rows={2}
                      value={additionalRequirements}
                      onChange={e => setAdditionalRequirements(e.target.value)}
                      placeholder="e.g. Edge beveling, hole pitch tolerance, delivery target date..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                    <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2.5 font-mono text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase border-b border-slate-800 pb-2">
                        <span>Order Cost Breakdown</span>
                        <span className="text-brand-orange">Est. Weight: {calculateEstWeight()} kg</span>
                      </div>

                      <div className="flex justify-between text-slate-400">
                        <span>Material Raw Cost ({calculateEstWeight()} kg @ ₹{settings.defaultBasePricePerKg || 64}/kg):</span>
                        <span className="text-white font-semibold">₹{calculateEstMaterialCost().toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-slate-400">
                        <span>{cuttingMethod} Processing Charge:</span>
                        <span className="text-white font-semibold">₹{calculateEstCuttingFee().toLocaleString()}</span>
                      </div>

                      {calculateEstDeliveryFee() > 0 && (
                        <div className="flex justify-between text-slate-400">
                          <span>{deliveryOption}:</span>
                          <span className="text-white font-semibold">₹{calculateEstDeliveryFee().toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-300 pt-1.5 border-t border-slate-800">
                        <span>Taxable Value (Subtotal):</span>
                        <span className="text-white font-bold">₹{calculateTaxableSubtotal().toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-brand-orange font-bold">
                        <span>GST @ 18% (9% CGST + 9% SGST):</span>
                        <span>+ ₹{calculateGst18().toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-700 text-sm">
                        <span className="font-bold text-white uppercase">Grand Total (Incl. 18% GST):</span>
                        <span className="text-xl font-black font-display text-emerald-400">₹{calculateGrandTotal().toLocaleString()}</span>
                      </div>

                      <div className="text-[10px] text-slate-500 pt-1">
                        * GST Invoice (33AAIFJ0968J1Z6) will be generated. Final amount confirmed upon actual electronic scale weighing.
                      </div>
                    </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs uppercase flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange via-orange-500 to-red-600 hover:from-orange-600 hover:to-brand-orange text-white font-black text-xs uppercase tracking-wider shadow-2xl shadow-brand-orange/35 flex items-center gap-2 border border-orange-400/40"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Quote Requirement</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
