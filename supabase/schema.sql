-- ========================================================
-- INDIAN STEEL DATABASE SCHEMA (Supabase / PostgreSQL)
-- ========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS TABLE (Dynamic Business Rules)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'Indian Steel',
  tagline TEXT DEFAULT 'Steel Retail & Custom Metal Cutting Service',
  phone TEXT NOT NULL DEFAULT '+91 98765 43210',
  whatsapp TEXT NOT NULL DEFAULT '919876543210',
  email TEXT NOT NULL DEFAULT 'sales@indiansteel.in',
  address TEXT NOT NULL,
  business_hours TEXT DEFAULT 'Mon - Sat: 8:30 AM - 7:30 PM',
  gst_number TEXT,
  default_base_price_per_kg NUMERIC(10,2) DEFAULT 64.00,
  default_laser_rate NUMERIC(10,2) DEFAULT 1.50,
  default_machine_rate NUMERIC(10,2) DEFAULT 0.80,
  default_manual_rate NUMERIC(10,2) DEFAULT 0.40,
  whatsapp_prefilled_msg TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  company_name TEXT,
  mobile_number TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  city TEXT DEFAULT 'Mumbai',
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PRODUCT CATEGORIES & PRODUCTS
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES product_categories(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  description TEXT,
  applications TEXT[],
  thicknesses TEXT[],
  grades TEXT[],
  image_url TEXT,
  price_per_kg NUMERIC(10,2),
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SERVICES TABLE
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  cutting_method TEXT NOT NULL, -- Manual, Machine, Laser, Saw
  description TEXT,
  min_thickness_mm NUMERIC(5,2),
  max_thickness_mm NUMERIC(5,2),
  tolerance_mm TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- 5. QUOTE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY, -- e.g. IND-QT-2026-8941
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL,
  material_type TEXT NOT NULL,
  grade TEXT NOT NULL,
  thickness_mm NUMERIC(6,2) NOT NULL,
  length_mm NUMERIC(8,2) NOT NULL,
  width_mm NUMERIC(8,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  cutting_method TEXT NOT NULL,
  required_shape TEXT NOT NULL,
  delivery_option TEXT NOT NULL,
  additional_requirements TEXT,
  drawing_file_name TEXT,
  drawing_file_url TEXT,
  status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Reviewing, Quoted, Approved, Rejected
  estimated_weight_kg NUMERIC(10,2),
  quoted_price NUMERIC(12,2),
  quoted_tax NUMERIC(12,2),
  quoted_delivery_fee NUMERIC(12,2),
  quoted_total NUMERIC(12,2),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ORDERS & ORDER ITEMS
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, -- e.g. IND-ORD-2026-4401
  quote_id TEXT REFERENCES quote_requests(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  mobile_number TEXT NOT NULL,
  email TEXT NOT NULL,
  material_summary TEXT NOT NULL,
  dimensions_summary TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  cutting_method TEXT NOT NULL,
  total_amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'Order Placed', -- Order Placed, Material Allocated, Cutting in Progress, Quality Checked, Ready for Dispatch, Completed
  assigned_operator TEXT,
  completion_eta DATE,
  payment_status TEXT DEFAULT 'Pending Deposit',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. CUTTING JOBS TABLE (Shop Floor Management)
CREATE TABLE IF NOT EXISTS cutting_jobs (
  id TEXT PRIMARY KEY, -- e.g. JOB-2026-101
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  material TEXT NOT NULL,
  thickness_mm NUMERIC(6,2) NOT NULL,
  dimensions TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  cutting_method TEXT NOT NULL,
  assigned_operator TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Queued', -- Queued, Machine Setup, In Progress, QC Inspection, Done
  target_date DATE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 8. UPLOADED DRAWINGS STORAGE TRACKER
CREATE TABLE IF NOT EXISTS uploaded_drawings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id TEXT REFERENCES quote_requests(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size_bytes BIGINT,
  storage_path TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY, -- e.g. INV-2026-901
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  subtotal_amount NUMERIC(12,2) NOT NULL,
  gst_amount NUMERIC(12,2) NOT NULL,
  delivery_amount NUMERIC(12,2) NOT NULL,
  grand_total NUMERIC(12,2) NOT NULL,
  pdf_url TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_quote_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_order_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON cutting_jobs(status);
CREATE INDEX IF NOT EXISTS idx_quote_email ON quote_requests(email);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Public can insert quote requests
CREATE POLICY "Public quote request creation" ON quote_requests FOR INSERT WITH CHECK (true);
-- Customers can view their own quotes
CREATE POLICY "Customer quote view" ON quote_requests FOR SELECT USING (true);
-- Public can view active settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public site settings view" ON site_settings FOR SELECT USING (true);
