import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  UploadCloud, 
  FileCheck, 
  Download, 
  Phone, 
  MessageSquare,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuoteRequest, Order } from '../../types';

export const CustomerDashboard: React.FC = () => {
  const { quoteRequests, orders, openQuoteModal, updateQuoteStatus, settings } = useApp();
  const [activeTab, setActiveTab] = useState<'quotes' | 'orders' | 'drawings' | 'profile'>('quotes');

  return (
    <div className="py-8 bg-[#0F1115] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Customer Header */}
        <div className="industrial-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-xl shadow-lg border border-emerald-400/30">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Customer Portal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified Account
                </span>
              </div>
              <h1 className="text-2xl font-black font-display text-white mt-0.5">
                Welcome back, Client Workspace
              </h1>
              <p className="text-xs text-slate-400">Track your custom MS plate quotations, order cutting progress, and uploaded CAD drawings.</p>
            </div>
          </div>

          <button
            onClick={() => openQuoteModal()}
            className="px-5 py-3 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20 flex items-center gap-2 shrink-0"
          >
            <FileText className="w-4 h-4" />
            <span>New Quote Request</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'quotes', label: `My Quote Requests (${quoteRequests.length})`, icon: <FileText className="w-4 h-4 text-brand-orange" /> },
            { id: 'orders', label: `My Orders (${orders.length})`, icon: <ShoppingBag className="w-4 h-4 text-emerald-400" /> },
            { id: 'drawings', label: 'Uploaded Drawings', icon: <UploadCloud className="w-4 h-4 text-blue-400" /> },
            { id: 'profile', label: 'Company Profile', icon: <User className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: QUOTES */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">My Quotations & Status</h3>

            <div className="space-y-4">
              {quoteRequests.map(q => (
                <div key={q.id} className="industrial-card rounded-2xl p-6 space-y-4">
                  
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-brand-orange">{q.id}</span>
                        <span className="text-xs text-slate-400">Date: {new Date(q.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1">{q.materialType} — {q.thickness}mm Thick</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                        q.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        q.status === 'Quoted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        Status: {q.status}
                      </span>
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">DIMENSIONS</span>
                      <span className="text-white font-bold">{q.length} x {q.width} mm</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">QUANTITY</span>
                      <span className="text-white font-bold">{q.quantity} Pcs</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">CUTTING METHOD</span>
                      <span className="text-white font-bold">{q.cuttingMethod}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">EST WEIGHT</span>
                      <span className="text-brand-orange font-bold">{q.estimatedWeightKg} kg</span>
                    </div>
                  </div>

                  {/* Pricing Breakdown if Quoted */}
                  {q.quotedTotal ? (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs text-emerald-400 font-bold uppercase font-mono">Quotation Received:</div>
                        <div className="text-2xl font-black font-display text-white">₹{q.quotedTotal.toLocaleString()}</div>
                        <p className="text-xs text-slate-400 mt-0.5">Includes base material, GST (18%), and delivery option.</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuoteStatus(q.id, 'Approved')}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase"
                        >
                          Approve Quote
                        </button>
                        <a
                          href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello Indian Steel, regarding quote ${q.id}, I would like to proceed with the order.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                        >
                          Discuss on WhatsApp
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 font-mono">
                      Our shop estimator is currently calculating unit material weight & cut pricing for your specification.
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Active Order Progress Tracker</h3>

            <div className="space-y-4">
              {orders.map(o => (
                <div key={o.id} className="industrial-card rounded-2xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-brand-orange">{o.id}</span>
                        <span className="text-xs text-slate-400 font-mono">ETA: {o.completionEta}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mt-1">{o.materialSummary}</h4>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono text-slate-400">Order Amount:</div>
                      <div className="text-xl font-bold font-mono text-emerald-400">₹{o.totalAmount.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Status Timeline Bar */}
                  <div>
                    <div className="text-xs font-mono text-slate-400 mb-3">CURRENT STAGE: <strong className="text-brand-orange">{o.status}</strong></div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-mono">
                      {[
                        'Order Placed',
                        'Material Allocated',
                        'Cutting in Progress',
                        'Quality Checked',
                        'Ready for Dispatch'
                      ].map((step, idx) => {
                        const isDone = o.status === step || o.status === 'Completed';
                        return (
                          <div
                            key={step}
                            className={`p-2 rounded-lg border font-bold ${
                              isDone
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                          >
                            <span>{idx + 1}. {step}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DRAWINGS */}
        {activeTab === 'drawings' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">My CAD Drawing Library</h3>
            <div className="industrial-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-slate-300">UPLOADED FILES (DXF / DWG / PDF)</span>
                <button onClick={() => openQuoteModal()} className="text-xs font-mono text-brand-orange hover:underline">
                  + Upload New CAD File
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quoteRequests.filter(q => q.drawingFileName).map(q => (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-6 h-6 text-brand-orange shrink-0" />
                      <div>
                        <div className="font-bold text-white">{q.drawingFileName}</div>
                        <div className="text-[10px] font-mono text-slate-400">Quote Ref: {q.id}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-brand-orange hover:underline cursor-pointer">Download</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROFILE */}
        {activeTab === 'profile' && (
          <div className="industrial-card rounded-2xl p-8 max-w-2xl space-y-4">
            <h3 className="font-display font-bold text-xl text-white">Company Account Profile</h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Company Name:</span>
                <span className="text-white font-bold">Apex Engineering Works</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Primary Contact:</span>
                <span className="text-white font-bold">Rajesh Sharma</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Phone:</span>
                <span className="text-white font-bold">+91 98200 11223</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-bold">rajesh@apexengg.com</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
