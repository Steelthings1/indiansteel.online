import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  Wrench, 
  Package, 
  Users, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Send,
  Download,
  Filter,
  Eye,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QuoteRequest, Order, Product, SiteSettings } from '../../types';
import { ThemeToggle } from '../layout/ThemeToggle';

export const AdminDashboard: React.FC = () => {
  const { 
    quoteRequests, 
    updateQuoteStatus, 
    orders, 
    updateOrderStatus, 
    cuttingJobs, 
    updateCuttingJobStatus, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    customers, 
    settings, 
    updateSettings 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'quotes' | 'orders' | 'jobs' | 'products' | 'customers' | 'settings'>('overview');

  // Selected Quote for pricing form
  const [editingQuote, setEditingQuote] = useState<QuoteRequest | null>(null);
  const [priceForm, setPriceForm] = useState({
    quotedPrice: 0,
    quotedTax: 0,
    quotedDeliveryFee: 0,
    adminNotes: ''
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({ ...settings });
  const [settingsSavedMsg, setSettingsSavedMsg] = useState(false);

  // New product form
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'MS Plates',
    description: '',
    applications: ['Structural Work'],
    thicknesses: ['6 mm', '8 mm', '12 mm'],
    grades: ['IS 2062 E250'],
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    pricePerKg: 64,
    inStock: true
  });

  // Overview Stats
  const pendingQuotesCount = quoteRequests.filter(q => q.status === 'Pending' || q.status === 'Reviewing').length;
  const totalQuotedCount = quoteRequests.filter(q => q.status === 'Quoted').length;
  const activeOrdersCount = orders.filter(o => o.status !== 'Completed').length;
  const completedOrdersCount = orders.filter(o => o.status === 'Completed').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const handleOpenPricingModal = (quote: QuoteRequest) => {
    setEditingQuote(quote);
    const estSubtotal = quote.quotedPrice || Math.round(quote.estimatedWeightKg * (settings.defaultBasePricePerKg || 64));
    const deliveryFee = quote.quotedDeliveryFee !== undefined ? quote.quotedDeliveryFee : 800;
    const estTax = Math.round((estSubtotal + deliveryFee) * 0.18);
    setPriceForm({
      quotedPrice: estSubtotal,
      quotedTax: quote.quotedTax || estTax,
      quotedDeliveryFee: deliveryFee,
      adminNotes: quote.adminNotes || 'IS 2062 Mill Certified Grade. 18% GST invoice (33AAIFJ0968J1Z6).'
    });
  };

  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuote) return;
    
    updateQuoteStatus(editingQuote.id, 'Quoted', {
      quotedPrice: Number(priceForm.quotedPrice),
      quotedTax: Number(priceForm.quotedTax),
      quotedDeliveryFee: Number(priceForm.quotedDeliveryFee),
      adminNotes: priceForm.adminNotes
    });

    setEditingQuote(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSavedMsg(true);
    setTimeout(() => setSettingsSavedMsg(false), 3000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProd);
    setIsAddProductOpen(false);
  };

  return (
    <div className="py-8 bg-[#0B0D11] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                System Administration
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
              Indian Steel Control Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              Logged in: <strong className="text-white">Shop Manager</strong>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'quotes', label: `Quote Requests (${pendingQuotesCount})`, icon: <FileText className="w-4 h-4 text-brand-orange" /> },
            { id: 'orders', label: `Orders (${orders.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'jobs', label: `Cutting Jobs (${cuttingJobs.length})`, icon: <Wrench className="w-4 h-4 text-blue-400" /> },
            { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
            { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
            { id: 'settings', label: 'Business Settings', icon: <Settings className="w-4 h-4 text-emerald-400" /> },
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

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="industrial-card rounded-2xl p-6 border-l-4 border-l-brand-orange">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>PENDING QUOTES</span>
                  <FileText className="w-4 h-4 text-brand-orange" />
                </div>
                <div className="text-3xl font-black font-display text-white">{pendingQuotesCount}</div>
                <div className="text-[11px] text-slate-400 mt-1">Requires admin review & pricing</div>
              </div>

              <div className="industrial-card rounded-2xl p-6 border-l-4 border-l-blue-500">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>ACTIVE ORDERS</span>
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black font-display text-white">{activeOrdersCount}</div>
                <div className="text-[11px] text-slate-400 mt-1">Currently on shop floor</div>
              </div>

              <div className="industrial-card rounded-2xl p-6 border-l-4 border-l-emerald-500">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>COMPLETED ORDERS</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black font-display text-white">{completedOrdersCount}</div>
                <div className="text-[11px] text-slate-400 mt-1">Successfully dispatched</div>
              </div>

              <div className="industrial-card rounded-2xl p-6 border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                  <span>TOTAL REVENUE</span>
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black font-display text-white">₹{totalRevenue.toLocaleString()}</div>
                <div className="text-[11px] text-slate-400 mt-1">Confirmed order value</div>
              </div>
            </div>

            {/* Quick Actions & Recent Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-white">Recent Quote Enquiries</h3>
                  <button onClick={() => setActiveTab('quotes')} className="text-xs font-mono text-brand-orange hover:underline">
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {quoteRequests.slice(0, 3).map(q => (
                    <div key={q.id} className="industrial-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-orange">{q.id}</span>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                            q.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            q.status === 'Quoted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {q.status}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-white mt-1">{q.customerName} ({q.companyName})</div>
                        <div className="text-xs text-slate-400">{q.materialType} • {q.thickness}mm • {q.length}x{q.width}mm • Qty: {q.quantity}</div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('quotes');
                          handleOpenPricingModal(q);
                        }}
                        className="px-3.5 py-2 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase shrink-0"
                      >
                        Price Quote
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4">
                <h3 className="font-display font-bold text-lg text-white">Shop Floor Jobs</h3>
                <div className="industrial-card rounded-2xl p-4 space-y-3">
                  {cuttingJobs.map(job => (
                    <div key={job.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-brand-orange font-bold">{job.id}</span>
                        <span className="text-slate-400">{job.cuttingMethod}</span>
                      </div>
                      <div className="font-bold text-white">{job.customerName}</div>
                      <div className="text-slate-400">{job.material} ({job.thicknessMm}mm)</div>
                      <div className="text-[10px] font-mono text-emerald-400 pt-1 border-t border-slate-800">
                        Operator: {job.assignedOperator} | Status: {job.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: QUOTE MANAGEMENT */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Quote Request Pipeline</h3>

            <div className="space-y-4">
              {quoteRequests.map(q => (
                <div key={q.id} className="industrial-card rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-brand-orange">{q.id}</span>
                        <span className="text-xs text-slate-400">Created: {new Date(q.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mt-1">{q.customerName} — {q.companyName}</h4>
                      <p className="text-xs text-slate-400">Phone: {q.mobileNumber} | Email: {q.email}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                        q.status === 'Pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        q.status === 'Quoted' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-slate-800 text-slate-300'
                      }`}>
                        Status: {q.status}
                      </span>

                      <button
                        onClick={() => handleOpenPricingModal(q)}
                        className="px-4 py-2 rounded-lg bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase shadow-md"
                      >
                        {q.quotedPrice ? 'Edit Quotation' : 'Calculate & Issue Quote'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">MATERIAL & GRADE</span>
                      <span className="text-white font-bold">{q.materialType}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">DIMENSIONS & THICKNESS</span>
                      <span className="text-white font-bold">{q.thickness}mm x {q.length}x{q.width}mm</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">CUTTING & SHAPE</span>
                      <span className="text-white font-bold">{q.cuttingMethod} ({q.requiredShape})</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">ESTIMATED WEIGHT</span>
                      <span className="text-brand-orange font-bold">{q.estimatedWeightKg} kg</span>
                    </div>
                  </div>

                  {q.drawingFileName && (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                      <span className="text-slate-300">Attached Drawing File: <strong className="text-emerald-400">{q.drawingFileName}</strong></span>
                      <span className="text-[11px] font-mono text-brand-orange hover:underline cursor-pointer">Download CAD File</span>
                    </div>
                  )}

                  {q.quotedTotal && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-emerald-400 font-bold">ISSUED QUOTATION TOTAL: ₹{q.quotedTotal.toLocaleString()}</span>
                        <p className="text-slate-400 text-[11px]">Subtotal: ₹{q.quotedPrice} | GST: ₹{q.quotedTax} | Freight: ₹{q.quotedDeliveryFee}</p>
                      </div>
                      <a
                        href={`https://wa.me/${q.mobileNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${q.customerName}, your quotation for ${q.id} is ready. Total amount: INR ${q.quotedTotal}. Please review on Indian Steel portal.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send via WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Active & Past Orders</h3>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="industrial-card rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-brand-orange">{order.id}</span>
                        <span className="text-xs font-mono text-slate-400">Quote Ref: {order.quoteId}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mt-1">{order.customerName} ({order.companyName})</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Material Allocated">Material Allocated</option>
                        <option value="Cutting in Progress">Cutting in Progress</option>
                        <option value="Quality Checked">Quality Checked</option>
                        <option value="Ready for Dispatch">Ready for Dispatch</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <div className="text-right">
                        <div className="text-xs font-mono text-slate-400">Total Order:</div>
                        <div className="text-base font-bold font-mono text-emerald-400">₹{order.totalAmount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">MATERIAL SUMMARY</span>
                      <span className="text-white">{order.materialSummary}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">DIMENSIONS & QUANTITY</span>
                      <span className="text-white">{order.dimensionsSummary}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">ASSIGNED OPERATOR / BAY</span>
                      <span className="text-amber-400 font-bold">{order.assignedOperator}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUTTING JOBS */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Shop Floor Cutting Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cuttingJobs.map(job => (
                <div key={job.id} className="industrial-card rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="font-mono font-bold text-brand-orange">{job.id}</span>
                    <span className="text-xs font-mono text-slate-400">Order: {job.orderId}</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base">{job.customerName}</h4>
                    <p className="text-xs text-slate-300">{job.material} ({job.thicknessMm}mm thick)</p>
                    <p className="text-xs font-mono text-slate-400">Dimensions: {job.dimensions} | Qty: {job.quantity}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Assigned Operator:</span>
                      <span className="text-white font-bold">{job.assignedOperator}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Current Job Status:</span>
                      <select
                        value={job.status}
                        onChange={e => updateCuttingJobStatus(job.id, e.target.value as any)}
                        className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-400 text-xs font-mono font-bold"
                      >
                        <option value="Queued">Queued</option>
                        <option value="Machine Setup">Machine Setup</option>
                        <option value="In Progress">In Progress</option>
                        <option value="QC Inspection">QC Inspection</option>
                        <option value="Done">Done</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-white">Manage Steel Product Catalog</h3>
              <button
                onClick={() => setIsAddProductOpen(!isAddProductOpen)}
                className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Steel Product</span>
              </button>
            </div>

            {/* Add Product Form Modal/Drawer */}
            {isAddProductOpen && (
              <form onSubmit={handleCreateProduct} className="industrial-card rounded-2xl p-6 space-y-4 border-brand-orange/40">
                <h4 className="font-bold text-base text-white">Add New Steel Product</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProd.name}
                      onChange={e => setNewProd({ ...newProd, name: e.target.value })}
                      placeholder="e.g. Heavy Duty MS Structural Plate"
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                    <select
                      value={newProd.category}
                      onChange={e => setNewProd({ ...newProd, category: e.target.value as any })}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                    >
                      <option value="MS Plates">MS Plates</option>
                      <option value="MS Sheets">MS Sheets</option>
                      <option value="Custom Steel Pieces">Custom Steel Pieces</option>
                      <option value="Industrial Steel Materials">Industrial Steel Materials</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newProd.description}
                    onChange={e => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAddProductOpen(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase">Save Product</button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(p => (
                <div key={p.id} className="industrial-card rounded-2xl p-6 flex items-start gap-4">
                  <img src={p.image} alt={p.name} className="w-24 h-24 rounded-xl object-cover shrink-0" />
                  <div className="space-y-1 w-full">
                    <span className="text-[10px] font-mono font-bold text-brand-orange uppercase">{p.category}</span>
                    <h4 className="font-bold text-white text-base">{p.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                    <div className="pt-2 flex items-center justify-between border-t border-slate-800 mt-2">
                      <span className="text-xs font-mono text-emerald-400 font-bold">₹{p.pricePerKg}/kg</span>
                      <button onClick={() => deleteProduct(p.id)} className="text-rose-400 text-xs hover:underline flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Customer Database & History</h3>
            <div className="industrial-card rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Company</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Total Orders</th>
                    <th className="p-4">Total Spent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {customers.map(c => (
                    <tr key={c.id} className="hover:bg-slate-900/50">
                      <td className="p-4 font-bold text-white">{c.name}</td>
                      <td className="p-4 text-slate-300">{c.company}</td>
                      <td className="p-4 font-mono text-slate-300">{c.phone}<br/>{c.email}</td>
                      <td className="p-4 text-slate-300">{c.city}</td>
                      <td className="p-4 font-mono font-bold text-brand-orange">{c.totalOrders}</td>
                      <td className="p-4 font-mono font-bold text-emerald-400">₹{c.totalSpent.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Dynamic Business Configuration</h3>
                <p className="text-xs text-slate-400">Update company phone, address, WhatsApp, GSTIN, and rate multipliers without changing code.</p>
              </div>
              {settingsSavedMsg && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30 animate-in fade-in">
                  ✓ Settings Saved Site-Wide!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="industrial-card rounded-2xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={e => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Primary Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Secondary Phone Number</label>
                  <input
                    type="text"
                    value={settingsForm.secondaryPhone || ''}
                    onChange={e => setSettingsForm({ ...settingsForm, secondaryPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">WhatsApp Business Number (with country code)</label>
                  <input
                    type="text"
                    value={settingsForm.whatsapp}
                    onChange={e => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Sales Email Address</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={settingsForm.gstNumber}
                    onChange={e => setSettingsForm({ ...settingsForm, gstNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Yard & Workshop Address</label>
                <textarea
                  rows={2}
                  value={settingsForm.address}
                  onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Base Steel Price (₹ per kg)</label>
                  <input
                    type="number"
                    value={settingsForm.defaultBasePricePerKg}
                    onChange={e => setSettingsForm({ ...settingsForm, defaultBasePricePerKg: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">WhatsApp Pre-filled Message</label>
                  <input
                    type="text"
                    value={settingsForm.whatsappPreFilledMessage}
                    onChange={e => setSettingsForm({ ...settingsForm, whatsappPreFilledMessage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>
              </div>

              {/* Theme Preference Option in Admin Settings */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase">Display Appearance & Theme</h4>
                  <p className="text-xs text-slate-400">Choose between Light, Dark, or automatic OS System theme preference.</p>
                </div>
                <ThemeToggle />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-orange/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PRICING MODAL FOR QUOTES */}
        {editingQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="w-full max-w-lg bg-[#11141A] border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="font-bold text-base text-white">Price Quote: {editingQuote.id}</h4>
                <button onClick={() => setEditingQuote(null)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs space-y-1 font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div>Client: <strong className="text-white">{editingQuote.customerName}</strong> ({editingQuote.companyName})</div>
                <div>Material: {editingQuote.materialType} ({editingQuote.thickness}mm)</div>
                <div>Size: {editingQuote.length}mm x {editingQuote.width}mm | Qty: {editingQuote.quantity}</div>
                <div>Est Weight: <strong className="text-brand-orange">{editingQuote.estimatedWeightKg} kg</strong></div>
              </div>

              <form onSubmit={handleSaveQuotation} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Material & Processing Subtotal (₹)</label>
                  <input
                    type="number"
                    required
                    value={priceForm.quotedPrice}
                    onChange={e => {
                      const newSubtotal = Number(e.target.value);
                      const newGst = Math.round((newSubtotal + priceForm.quotedDeliveryFee) * 0.18);
                      setPriceForm({ ...priceForm, quotedPrice: newSubtotal, quotedTax: newGst });
                    }}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Freight / Delivery Fee (₹)</label>
                    <input
                      type="number"
                      required
                      value={priceForm.quotedDeliveryFee}
                      onChange={e => {
                        const newDelivery = Number(e.target.value);
                        const newGst = Math.round((priceForm.quotedPrice + newDelivery) * 0.18);
                        setPriceForm({ ...priceForm, quotedDeliveryFee: newDelivery, quotedTax: newGst });
                      }}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">GST Tax (18% ₹)</label>
                    <input
                      type="number"
                      required
                      value={priceForm.quotedTax}
                      onChange={e => setPriceForm({ ...priceForm, quotedTax: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 font-semibold mb-1">Admin Notes / Terms</label>
                  <input
                    type="text"
                    value={priceForm.adminNotes}
                    onChange={e => setPriceForm({ ...priceForm, adminNotes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400 flex items-center justify-between">
                  <span>Grand Total to Issue:</span>
                  <span className="text-base">₹{(Number(priceForm.quotedPrice) + Number(priceForm.quotedTax) + Number(priceForm.quotedDeliveryFee)).toLocaleString()}</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setEditingQuote(null)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-lg bg-brand-orange text-white text-xs font-bold uppercase shadow-md">
                    Issue Quotation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
