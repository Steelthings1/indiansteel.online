export type UserRole = 'visitor' | 'customer' | 'admin';

export type ActivePage = 
  | 'home' 
  | 'about' 
  | 'products' 
  | 'services' 
  | 'ms-plate-cutting' 
  | 'laser-cutting' 
  | 'industries' 
  | 'calculator' 
  | 'contact' 
  | 'customer-portal' 
  | 'admin-dashboard';

export type CuttingMethod = 'Manual Cutting' | 'Machine Cutting' | 'Laser Cutting' | 'Saw Cutting';
export type PlateShape = 'Rectangular Plate' | 'Circular Disc' | 'Ring / Flange' | 'L-Angle / Custom Profile' | 'CAD Drawing Profile';
export type DeliveryOption = 'Pickup from Workshop' | 'Standard Freight Delivery' | 'Express Site Delivery';
export type QuoteStatus = 'Pending' | 'Reviewing' | 'Quoted' | 'Approved' | 'Rejected' | 'In Production' | 'Completed';
export type OrderStatus = 'Order Placed' | 'Material Allocated' | 'Cutting in Progress' | 'Quality Checked' | 'Ready for Dispatch' | 'Completed';

export interface Product {
  id: string;
  name: string;
  category: 'MS Plates' | 'MS Sheets' | 'Custom Steel Pieces' | 'Industrial Steel Materials';
  description: string;
  applications: string[];
  thicknesses: string[];
  grades: string[];
  image: string;
  pricePerKg?: number;
  inStock: boolean;
}

export interface QuoteRequest {
  id: string;
  customerName: string;
  companyName: string;
  mobileNumber: string;
  email: string;
  materialType: string;
  grade: string;
  thickness: number; // in mm
  length: number; // in mm
  width: number; // in mm
  quantity: number;
  cuttingMethod: CuttingMethod;
  requiredShape: PlateShape;
  deliveryOption: DeliveryOption;
  additionalRequirements?: string;
  drawingFileName?: string;
  drawingFileUrl?: string;
  status: QuoteStatus;
  createdAt: string;
  estimatedWeightKg: number;
  quotedPrice?: number;
  quotedTax?: number;
  quotedDeliveryFee?: number;
  quotedTotal?: number;
  adminNotes?: string;
  validUntil?: string;
}

export interface Order {
  id: string;
  quoteId: string;
  customerName: string;
  companyName: string;
  mobileNumber: string;
  email: string;
  materialSummary: string;
  dimensionsSummary: string;
  quantity: number;
  cuttingMethod: CuttingMethod;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  assignedOperator: string;
  completionEta: string;
  paymentStatus: 'Pending Deposit' | '50% Deposit Paid' | 'Fully Paid';
}

export interface CuttingJob {
  id: string;
  orderId: string;
  customerName: string;
  material: string;
  thicknessMm: number;
  dimensions: string;
  quantity: number;
  cuttingMethod: CuttingMethod;
  assignedOperator: string;
  status: 'Queued' | 'Machine Setup' | 'In Progress' | 'QC Inspection' | 'Done';
  startedAt?: string;
  targetDate: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  registeredDate: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  businessHours: string;
  gstNumber: string;
  defaultBasePricePerKg: number;
  defaultLaserCuttingRatePerMm: number;
  defaultMachineCuttingRatePerMm: number;
  defaultManualCuttingRatePerMm: number;
  whatsappPreFilledMessage: string;
  materialsList: string[];
  thicknessOptionsMm: number[];
  gradesList: string[];
}
