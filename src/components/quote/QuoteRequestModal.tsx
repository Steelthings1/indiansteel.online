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
  Send 
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

  // Prefill when modal opens or prefill data changes
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const estWeight = calculateEstWeight();
    
    const quoteId = addQuoteRequest({
      customerName,
      companyName: companyName || 'Individual Contractor',
      mobileNumber,
      email,
      materialType,
      grade,
      thickness,
      length,
      width,
      quantity,
      cuttingMethod,
      requiredShape,
      deliveryOption,
      additionalRequirements,
      drawingFileName: drawingFileName || undefined,
      drawingFileUrl: drawingFileName ? '#' : undefined,
      estimatedWeightKg: estWeight
    });

    setGeneratedQuoteId(quoteId);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setGeneratedQuoteId('');
    closeQuoteModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#11141A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                Get a Quote — indiansteel.online
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                indiansteel.online • Custom Steel Sizing, Plate Retail & Cutting Services
              </p>
            </div>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {isSubmitted ? (
            <div className="py-12 px-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  Quote Submitted Successfully
                </span>
                <h3 className="text-2xl font-black font-display text-white">
                  Thank You. Your requirement has been received.
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Our engineering & sales team will review your specifications and contact you shortly with an official quotation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 inline-block max-w-sm w-full text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Quote Reference Number:</div>
                <div className="text-xl font-bold font-mono text-brand-orange">{generatedQuoteId}</div>
                <div className="text-[11px] text-slate-400 mt-2 border-t border-slate-800 pt-2">
                  Customer: <span className="text-white">{customerName}</span> ({mobileNumber})
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase"
                >
                  Close Window
                </button>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello Indian Steel, I just submitted quote reference ${generatedQuoteId} for ${materialType}. Please assist.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Section 1: Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Building2 className="w-4 h-4" />
                  <span>1. Contact & Company Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Customer Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Company / Workshop Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={e => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Fabricators"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={e => setMobileNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Material & Specs */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Ruler className="w-4 h-4" />
                  <span>2. Material & Dimensions Specifications</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Material Type</label>
                    <select
                      value={materialType}
                      onChange={e => setMaterialType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
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
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
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
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
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
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
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
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
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
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between font-mono">
                  <span className="text-slate-400">Calculated Est Weight:</span>
                  <span className="text-brand-orange font-bold text-sm">{calculateEstWeight()} kg</span>
                </div>
              </div>

              {/* Section 3: Cutting Method & Shape */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <Zap className="w-4 h-4" />
                  <span>3. Cutting Method & Required Shape</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Cutting Method</label>
                    <select
                      value={cuttingMethod}
                      onChange={e => setCuttingMethod(e.target.value as CuttingMethod)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    >
                      <option value="Manual Cutting">Manual Oxy-Fuel Cutting</option>
                      <option value="Machine Cutting">Machine Linear/Profile Cutting</option>
                      <option value="Laser Cutting">CNC Fiber Laser Precision Cutting</option>
                      <option value="Saw Cutting">Cold Saw Cutting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Required Shape</label>
                    <select
                      value={requiredShape}
                      onChange={e => setRequiredShape(e.target.value as PlateShape)}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
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
                        className={`p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                          deliveryOption === opt
                            ? 'bg-brand-orange/20 border-brand-orange text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: File Upload & Additional Notes */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <UploadCloud className="w-4 h-4" />
                  <span>4. Upload CAD Drawing / File (Optional)</span>
                </h4>

                {/* File Dropzone */}
                <div className="border-2 border-dashed border-slate-700 hover:border-brand-orange/60 rounded-xl p-4 text-center bg-slate-900/60 transition-colors">
                  <input
                    type="file"
                    id="drawing-upload"
                    accept=".dxf,.dwg,.pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="drawing-upload" className="cursor-pointer space-y-2 block">
                    <UploadCloud className="w-8 h-8 text-brand-orange mx-auto" />
                    <div className="text-xs text-slate-300">
                      {drawingFileName ? (
                        <span className="text-emerald-400 font-bold flex items-center justify-center gap-1">
                          <FileCheck className="w-4 h-4" /> {drawingFileName}
                        </span>
                      ) : (
                        <span>Click or Drag DXF, DWG, PDF, JPG, PNG drawing file here</span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono block">Max file size 25MB</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Additional Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={additionalRequirements}
                    onChange={e => setAdditionalRequirements(e.target.value)}
                    placeholder="e.g. Edge deburring required, hole drilling specs, project deadline..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-black text-sm uppercase tracking-wider shadow-2xl shadow-brand-orange/30 transition-all flex items-center justify-center gap-2 border border-orange-400/40"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Quote Request</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
