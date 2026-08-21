import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ActivePage, 
  UserRole, 
  ThemeMode,
  QuoteRequest, 
  Order, 
  CuttingJob, 
  Product, 
  Customer, 
  SiteSettings 
} from '../types';

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  
  // Theme Setup (Light, Dark, System)
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
  
  // Modals & Triggers
  isQuoteModalOpen: boolean;
  openQuoteModal: (prefill?: Partial<QuoteRequest>) => void;
  closeQuoteModal: () => void;
  quoteModalPrefill: Partial<QuoteRequest> | null;
  
  // Data State
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  quoteRequests: QuoteRequest[];
  addQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) => string;
  updateQuoteStatus: (
    id: string, 
    status: QuoteRequest['status'], 
    pricing?: { quotedPrice?: number; quotedTax?: number; quotedDeliveryFee?: number; adminNotes?: string }
  ) => void;
  
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status'], operator?: string) => void;
  
  cuttingJobs: CuttingJob[];
  updateCuttingJobStatus: (id: string, status: CuttingJob['status'], operator?: string) => void;
  
  customers: Customer[];
}

const defaultSettings: SiteSettings = {
  companyName: 'Indian Steel',
  tagline: 'Steel Retail & Custom Metal Cutting Service',
  phone: '+91 93424 72147',
  secondaryPhone: '+91 80563 10565',
  whatsapp: '919342472147',
  email: 'sales@indiansteel.online',
  address: 'NO 16, V.K Road, sivanandhapuram, saravanampatty, Coimbatore - 641006',
  businessHours: 'Mon - Sat: 8:30 AM - 7:30 PM | Sunday: Closed',
  gstNumber: '33AAIFJ0968J1Z6',
  defaultBasePricePerKg: 64, // INR per kg
  defaultLaserCuttingRatePerMm: 1.5,
  defaultMachineCuttingRatePerMm: 0.8,
  defaultManualCuttingRatePerMm: 0.4,
  whatsappPreFilledMessage: 'Hello Indian Steel, I would like to enquire about MS plate supply and custom cutting services.',
  materialsList: ['Mild Steel (MS IS 2062)', 'High Tensile Steel (E350/E450)', 'Carbon Steel (C45)', 'Stainless Steel (SS 304/316)', 'Chequered Plate MS'],
  thicknessOptionsMm: [3, 4, 5, 6, 8, 10, 12, 16, 20, 25, 32, 40, 50, 63, 75, 100],
  gradesList: ['IS 2062 E250 Gr A/B', 'IS 2062 E350 BR', 'SA 516 Gr 70', 'C-45', 'SS 304 Industrial'],
};

const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'MS Plate (IS 2062 E250 / E350)',
    category: 'MS Plates',
    description: 'Prime Mild Steel heavy structural plates suitable for fabrication, engineering, machine base plates, and construction.',
    applications: ['Structural Columns', 'Machine Base Plates', 'Heavy Earthmoving Parts', 'Building Girders', 'Flanges & Brackets'],
    thicknesses: ['6 mm', '8 mm', '10 mm', '12 mm', '16 mm', '20 mm', '25 mm', '32 mm', '40 mm', '50 mm', '100 mm+'],
    grades: ['IS 2062 E250 A/B', 'IS 2062 E350 BR', 'SA 516 Gr 70'],
    image: '/images/ms-plates.jpg',
    pricePerKg: 64,
    inStock: true,
  },
  {
    id: 'prod-2',
    name: 'MS Sheet (Hot Rolled / Cold Rolled)',
    category: 'MS Sheets',
    description: 'Precision-rolled mild steel sheets with uniform thickness and clean surface finish for enclosures, panels, and ducting.',
    applications: ['Control Panels', 'Electrical Enclosures', 'Automotive Panels', 'Ducting & Storage Tanks', 'Cabinet Fabrication'],
    thicknesses: ['1.2 mm', '1.6 mm', '2.0 mm', '2.5 mm', '3.0 mm', '4.0 mm', '5.0 mm'],
    grades: ['HR Commercial Grade', 'CR Deep Drawing Grade'],
    image: '/images/ms-sheets.jpg',
    pricePerKg: 68,
    inStock: true,
  },
  {
    id: 'prod-3',
    name: 'Custom Cut Flanges & Precision Blanks',
    category: 'Custom Steel Pieces',
    description: 'Custom profile cut mild steel components including circular discs, flange rings, gear blanks, gussets, and anchor base plates.',
    applications: ['Pipe Flanges', 'Gear Blanks', 'Crane Hook Parts', 'Base Gussets', 'Special Machine Parts'],
    thicknesses: ['8 mm', '12 mm', '16 mm', '25 mm', '40 mm', '60 mm', '80 mm'],
    grades: ['IS 2062 E250', 'C-45 Forging Grade'],
    image: '/images/custom-flanges.jpg',
    pricePerKg: 75,
    inStock: true,
  },
  {
    id: 'prod-4',
    name: 'Industrial Steel Chequered Plates',
    category: 'Industrial Steel Materials',
    description: 'Durable anti-skid tear-drop chequered steel plates engineered for industrial plant flooring, stair treads, and vehicle decks.',
    applications: ['Factory Flooring', 'Stair Treads', 'Truck Bed Liners', 'Scaffolding Platforms', 'Heavy Access Ramps'],
    thicknesses: ['3 mm', '4.5 mm', '6 mm', '8 mm', '10 mm'],
    grades: ['IS 2062 Structural Skid-Resistant'],
    image: '/images/chequered-plates.jpg',
    pricePerKg: 70,
    inStock: true,
  }
];

const initialQuotes: QuoteRequest[] = [
  {
    id: 'IND-QT-2026-8941',
    customerName: 'Rajesh Sharma',
    companyName: 'Apex Engineering Works',
    mobileNumber: '+91 98200 11223',
    email: 'rajesh@apexengg.com',
    materialType: 'Mild Steel (MS IS 2062)',
    grade: 'IS 2062 E250 Gr A/B',
    thickness: 16,
    length: 2400,
    width: 1200,
    quantity: 10,
    cuttingMethod: 'Laser Cutting',
    requiredShape: 'CAD Drawing Profile',
    deliveryOption: 'Standard Freight Delivery',
    additionalRequirements: 'Need smooth edge finish for robotic welding. DXF file attached.',
    drawingFileName: 'Bracket_Base_Plate_v2.dxf',
    drawingFileUrl: '#',
    status: 'Quoted',
    createdAt: '2026-08-20T14:30:00Z',
    estimatedWeightKg: 361.34,
    quotedPrice: 23125,
    quotedTax: 4162,
    quotedDeliveryFee: 1200,
    quotedTotal: 28487,
    adminNotes: 'Assigned to Laser Bench #2. Ready for client approval.',
    validUntil: '2026-08-30'
  },
  {
    id: 'IND-QT-2026-8942',
    customerName: 'Suresh Patel',
    companyName: 'Gujarat Fabricators',
    mobileNumber: '+91 94260 55443',
    email: 'suresh@gujarfatfab.in',
    materialType: 'High Tensile Steel (E350/E450)',
    grade: 'IS 2062 E350 BR',
    thickness: 25,
    length: 1500,
    width: 1500,
    quantity: 4,
    cuttingMethod: 'Machine Cutting',
    requiredShape: 'Circular Disc',
    deliveryOption: 'Pickup from Workshop',
    additionalRequirements: 'Disc OD 1500mm. Center hole 300mm diameter.',
    drawingFileName: 'Flange_Ring_Spec.pdf',
    drawingFileUrl: '#',
    status: 'Pending',
    createdAt: '2026-08-21T09:15:00Z',
    estimatedWeightKg: 1387.1,
    adminNotes: 'Checking stock availability for 25mm E350 plate.'
  }
];

const initialOrders: Order[] = [
  {
    id: 'IND-ORD-2026-4401',
    quoteId: 'IND-QT-2026-8920',
    customerName: 'Vikram Mehta',
    companyName: 'Mehta Structural Builders',
    mobileNumber: '+91 98921 77889',
    email: 'vikram@mehtastructures.com',
    materialSummary: 'MS IS 2062 Plate 20mm',
    dimensionsSummary: '2000mm x 1000mm (Qty: 6)',
    quantity: 6,
    cuttingMethod: 'Machine Cutting',
    totalAmount: 42500,
    status: 'Cutting in Progress',
    createdAt: '2026-08-19T10:00:00Z',
    assignedOperator: 'Ramesh Kumar (Machine Bay 1)',
    completionEta: '2026-08-22',
    paymentStatus: '50% Deposit Paid'
  },
  {
    id: 'IND-ORD-2026-4402',
    quoteId: 'IND-QT-2026-8915',
    customerName: 'Anil Deshmukh',
    companyName: 'Precision Tools & Dies',
    mobileNumber: '+91 97690 33441',
    email: 'anil@precisiontd.co.in',
    materialSummary: 'Carbon Steel C45 Plate 12mm',
    dimensionsSummary: 'Custom Profile Laser Cut (Qty: 50)',
    quantity: 50,
    cuttingMethod: 'Laser Cutting',
    totalAmount: 68400,
    status: 'Ready for Dispatch',
    createdAt: '2026-08-18T16:20:00Z',
    assignedOperator: 'Deepak Verma (CNC Fiber Laser 6kW)',
    completionEta: '2026-08-21',
    paymentStatus: 'Fully Paid'
  }
];

const initialCuttingJobs: CuttingJob[] = [
  {
    id: 'JOB-2026-101',
    orderId: 'IND-ORD-2026-4401',
    customerName: 'Mehta Structural Builders',
    material: 'MS Plate 20mm',
    thicknessMm: 20,
    dimensions: '2000mm x 1000mm',
    quantity: 6,
    cuttingMethod: 'Machine Cutting',
    assignedOperator: 'Ramesh Kumar',
    status: 'In Progress',
    targetDate: '2026-08-22'
  },
  {
    id: 'JOB-2026-102',
    orderId: 'IND-ORD-2026-4402',
    customerName: 'Precision Tools & Dies',
    material: 'C45 Steel 12mm',
    thicknessMm: 12,
    dimensions: 'Laser Contour Profile',
    quantity: 50,
    cuttingMethod: 'Laser Cutting',
    assignedOperator: 'Deepak Verma',
    status: 'QC Inspection',
    targetDate: '2026-08-21'
  }
];

const initialCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Rajesh Sharma',
    company: 'Apex Engineering Works',
    phone: '+91 98200 11223',
    email: 'rajesh@apexengg.com',
    city: 'Mumbai',
    totalOrders: 4,
    totalSpent: 185000,
    registeredDate: '2025-11-12'
  },
  {
    id: 'CUST-002',
    name: 'Vikram Mehta',
    company: 'Mehta Structural Builders',
    phone: '+91 98921 77889',
    email: 'vikram@mehtastructures.com',
    city: 'Pune',
    totalOrders: 7,
    totalSpent: 420000,
    registeredDate: '2025-08-04'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [userRole, setUserRole] = useState<UserRole>('visitor');
  
  // Theme Setup (Light, Dark, System)
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('indian_steel_theme');
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        return saved as ThemeMode;
      }
    } catch (e) {}
    return 'system';
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: 'light' | 'dark' = themeMode === 'system' 
    ? (systemIsDark ? 'dark' : 'light') 
    : themeMode;

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem('indian_steel_theme', mode);
    } catch (e) {}
  };

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    }
  }, [resolvedTheme]);

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalPrefill, setQuoteModalPrefill] = useState<Partial<QuoteRequest> | null>(null);

  // Load state from localStorage or initial fallback
  const [settings, setSettings] = useState<SiteSettings>(() => {
    // Purge outdated legacy cached settings if existing
    try {
      localStorage.removeItem('indian_steel_settings');
      localStorage.removeItem('indian_steel_settings_v1');
      localStorage.removeItem('indian_steel_settings_v2');
      localStorage.removeItem('indian_steel_settings_v3');
      const saved = localStorage.getItem('indian_steel_settings_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultSettings, ...parsed, phone: parsed.phone || defaultSettings.phone, secondaryPhone: parsed.secondaryPhone || defaultSettings.secondaryPhone, whatsapp: parsed.whatsapp || defaultSettings.whatsapp };
      }
    } catch (e) {
      console.warn('Storage read warning', e);
    }
    return defaultSettings;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      localStorage.removeItem('indian_steel_products');
      localStorage.removeItem('indian_steel_products_v2');
      const saved = localStorage.getItem('indian_steel_products_v3');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(() => {
    const saved = localStorage.getItem('indian_steel_quotes_v2');
    return saved ? JSON.parse(saved) : initialQuotes;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('indian_steel_orders_v2');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [cuttingJobs, setCuttingJobs] = useState<CuttingJob[]>(() => {
    const saved = localStorage.getItem('indian_steel_jobs_v2');
    return saved ? JSON.parse(saved) : initialCuttingJobs;
  });

  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('indian_steel_settings_v5', JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('indian_steel_products_v3', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    localStorage.setItem('indian_steel_quotes', JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  useEffect(() => {
    localStorage.setItem('indian_steel_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('indian_steel_jobs', JSON.stringify(cuttingJobs));
  }, [cuttingJobs]);

  const openQuoteModal = (prefill?: Partial<QuoteRequest>) => {
    if (prefill) {
      setQuoteModalPrefill(prefill);
    } else {
      setQuoteModalPrefill(null);
    }
    setIsQuoteModalOpen(true);
  };

  const closeQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setQuoteModalPrefill(null);
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addQuoteRequest = (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): string => {
    const quoteId = `IND-QT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: quoteId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setQuoteRequests(prev => [newQuote, ...prev]);

    // Also auto-add/update customer record if available
    if (quoteData.customerName) {
      setCustomers(prev => {
        const existing = prev.find(c => c.email.toLowerCase() === quoteData.email.toLowerCase());
        if (existing) return prev;
        return [
          {
            id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
            name: quoteData.customerName,
            company: quoteData.companyName || 'Individual / Contractor',
            phone: quoteData.mobileNumber,
            email: quoteData.email,
            city: 'India',
            totalOrders: 0,
            totalSpent: 0,
            registeredDate: new Date().toISOString().split('T')[0]
          },
          ...prev
        ];
      });
    }

    return quoteId;
  };

  const updateQuoteStatus = (
    id: string, 
    status: QuoteRequest['status'], 
    pricing?: { quotedPrice?: number; quotedTax?: number; quotedDeliveryFee?: number; adminNotes?: string }
  ) => {
    setQuoteRequests(prev => prev.map(q => {
      if (q.id === id) {
        const updated = { ...q, status };
        if (pricing) {
          if (pricing.quotedPrice !== undefined) updated.quotedPrice = pricing.quotedPrice;
          if (pricing.quotedTax !== undefined) updated.quotedTax = pricing.quotedTax;
          if (pricing.quotedDeliveryFee !== undefined) updated.quotedDeliveryFee = pricing.quotedDeliveryFee;
          if (pricing.adminNotes !== undefined) updated.adminNotes = pricing.adminNotes;
          
          const subtotal = updated.quotedPrice || 0;
          const tax = updated.quotedTax || (subtotal * 0.18);
          const delivery = updated.quotedDeliveryFee || 0;
          updated.quotedTotal = subtotal + tax + delivery;
        }
        return updated;
      }
      return q;
    }));
  };

  const updateOrderStatus = (id: string, status: Order['status'], operator?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        return { 
          ...o, 
          status, 
          assignedOperator: operator || o.assignedOperator 
        };
      }
      return o;
    }));
  };

  const updateCuttingJobStatus = (id: string, status: CuttingJob['status'], operator?: string) => {
    setCuttingJobs(prev => prev.map(j => {
      if (j.id === id) {
        return {
          ...j,
          status,
          assignedOperator: operator || j.assignedOperator
        };
      }
      return j;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        userRole,
        setUserRole,
        themeMode,
        setThemeMode,
        resolvedTheme,
        isQuoteModalOpen,
        openQuoteModal,
        closeQuoteModal,
        quoteModalPrefill,
        settings,
        updateSettings,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        quoteRequests,
        addQuoteRequest,
        updateQuoteStatus,
        orders,
        updateOrderStatus,
        cuttingJobs,
        updateCuttingJobStatus,
        customers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
