import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  FileText, 
  CheckCircle2, 
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContactSection: React.FC = () => {
  const { settings, openQuoteModal, addQuoteRequest } = useApp();

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    material: 'Mild Steel (MS IS 2062)',
    requirements: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = addQuoteRequest({
      customerName: formState.name,
      companyName: formState.company,
      mobileNumber: formState.phone,
      email: formState.email,
      materialType: formState.material,
      grade: 'IS 2062 E250',
      thickness: 12,
      length: 1000,
      width: 1000,
      quantity: 1,
      cuttingMethod: 'Machine Cutting',
      requiredShape: 'Rectangular Plate',
      deliveryOption: 'Standard Freight Delivery',
      additionalRequirements: formState.requirements,
      estimatedWeightKg: 94.2
    });

    setSubmittedId(newId);
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 bg-[#11141A] relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono font-bold text-brand-orange uppercase tracking-widest mb-1">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white mb-2">
            Contact Indian Steel (indiansteel.online)
          </h2>
          <p className="text-sm text-slate-400">
            indiansteel.online • Steel Retail & Custom Cutting Services • Workshop & Sales Yard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Info & Interactive Map Mockup */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Company Info Box */}
            <div className="industrial-card rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-10 h-10 rounded-lg bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white">INDIAN STEEL<span className="text-slate-400 font-mono text-base font-normal lowercase">.online</span></h3>
                  <p className="text-xs text-brand-orange font-mono">Official Steel Retail & Custom Metal Cutting Portal</p>
                </div>
              </div>

              <ul className="space-y-4 text-xs">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Business Address:</span>
                    <span className="text-slate-200 font-medium">{settings.address}</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Phone & Orders:</span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <a href={`tel:${settings.phone}`} className="text-white font-bold text-sm hover:text-brand-orange transition-colors font-mono">
                        {settings.phone}
                      </a>
                      {settings.secondaryPhone && (
                        <span className="text-slate-500 font-mono">/</span>
                      )}
                      {settings.secondaryPhone && (
                        <a href={`tel:${settings.secondaryPhone}`} className="text-white font-bold text-sm hover:text-brand-orange transition-colors font-mono">
                          {settings.secondaryPhone}
                        </a>
                      )}
                    </div>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">WhatsApp Assistance:</span>
                    <a 
                      href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.whatsappPreFilledMessage)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-400 font-bold hover:underline font-mono"
                    >
                      +{settings.whatsapp}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Sales Email:</span>
                    <a href={`mailto:${settings.email}`} className="text-slate-200 font-medium hover:text-white">
                      {settings.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">Working Hours:</span>
                    <span className="text-slate-300">{settings.businessHours}</span>
                  </div>
                </li>

                <li className="flex items-center gap-3 pt-1 border-t border-slate-800/80">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-mono text-[10px] uppercase">GST Identification Number (GSTIN):</span>
                    <span className="text-emerald-400 font-mono font-bold">{settings.gstNumber}</span>
                  </div>
                </li>
              </ul>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => openQuoteModal()}
                  className="w-full py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Launch Full Quote Calculator</span>
                </button>
              </div>
            </div>

            {/* Google Maps Visual Representation */}
            <div className="industrial-card rounded-2xl p-4 overflow-hidden relative">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-slate-300 font-bold">COIMBATORE WORKSHOP & YARD</span>
                <span className="text-brand-orange">MAP LOCATION</span>
              </div>
              <div className="w-full h-44 rounded-xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden group">
                {/* Stylized dark map illustration */}
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                <div className="text-center p-4 relative z-10 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-brand-orange/20 border border-brand-orange/50 text-brand-orange mx-auto flex items-center justify-center animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-xs text-white">Indian Steel Yard & Cutting Plant</h5>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">NO 16, V.K Road, sivanandhapuram, saravanampatty, Coimbatore - 641006</p>
                  <a
                    href="https://maps.google.com/?q=NO+16+VK+Road+sivanandhapuram+saravanampatty+Coimbatore+641006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 rounded bg-slate-800 text-[11px] font-mono text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Quick Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="industrial-card rounded-2xl p-8 border border-slate-700 shadow-2xl">
              <h3 className="text-xl font-bold font-display text-white mb-1">
                Request Your Steel Requirement
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in your details and material specifications below. Our sales team will get back to you with price estimation within 2 business hours.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-lg text-white">Thank You! Requirement Received.</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Your inquiry reference number is <strong className="text-brand-orange font-mono">{submittedId}</strong>. Our team will review your specs and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: '',
                        company: '',
                        phone: '',
                        email: '',
                        material: 'Mild Steel (MS IS 2062)',
                        requirements: ''
                      });
                    }}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Customer Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Company / Workshop Name</label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={e => setFormState({ ...formState, company: e.target.value })}
                        placeholder="e.g. Kumar Engineering"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                        placeholder="sales@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Material Required</label>
                    <select
                      value={formState.material}
                      onChange={e => setFormState({ ...formState, material: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    >
                      {settings.materialsList.map(mat => (
                        <option key={mat} value={mat}>{mat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Requirement Details (Dimensions, Thickness, Quantity, Cutting Method)</label>
                    <textarea
                      rows={4}
                      required
                      value={formState.requirements}
                      onChange={e => setFormState({ ...formState, requirements: e.target.value })}
                      placeholder="e.g. Need 10 pieces of MS Plate 16mm thick, size 2400mm x 1200mm cut using Laser Cutting according to attached drawing..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-600 hover:to-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/25 transition-all flex items-center justify-center gap-2 border border-orange-400/30"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Requirement Request</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
