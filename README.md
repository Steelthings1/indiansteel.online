# Indian Steel — `indiansteel.online`

[![Website](https://img.shields.io/badge/Website-indiansteel.online-FF5500?style=for-the-badge&logo=google-chrome&logoColor=white)](https://indiansteel.online)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Database-PostgreSQL_/_Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

> **Official Website:** [https://indiansteel.online](https://indiansteel.online)  
> **Business Tagline:** *Strong Materials. Precise Cutting. Reliable Service.*

---

## 🏗️ About Indian Steel (`indiansteel.online`)

**Indian Steel** is an industrial-grade B2B steel retail and precision metal cutting service provider. We specialize in prime Mild Steel (MS IS 2062) plate sales, manual cutting, motorized machine cutting, and high-precision CNC fiber laser cutting for fabrication units, engineering workshops, structural builders, and industrial manufacturers across India.

---

## ✨ Core Features & Modules

### 1. ⚙️ Interactive Steel Weight Calculator
- Theoretical weight calculation for **Rectangular Plates**, **Circular Discs**, and **Rings / Pipe Flanges**.
- Supports material density presets:
  - Mild Steel (MS IS 2062): $7.85\text{ g/cm}^3$
  - Stainless Steel (SS 304/316): $7.93\text{ g/cm}^3$
  - Carbon Steel (C45): $7.85\text{ g/cm}^3$
  - Aluminium Alloy: $2.70\text{ g/cm}^3$
  - Brass / Copper: $8.50\text{ g/cm}^3$
- **1-Click "Send to Quote Request"** transfers calculated dimensions and estimated weight straight into the quote engine.

### 2. 📋 Precision Quote Request System & CAD Upload
- Multi-step inquiry form for custom length, width, thickness (6mm – 100mm+), quantity, and grade selection.
- **CAD File Upload Dropzone**: Supports `.dxf`, `.dwg`, `.pdf`, `.jpg`, and `.png` drawings with live file validation.
- Instant reference tracking ID generation (e.g., `IND-QT-2026-8941`).
- Direct **WhatsApp Fast Quote** integration pre-populated with inquiry specs.

### 3. 🔬 Dedicated Service & Technology Pages
- **CNC Laser Cutting**: Intricate profiles, prototype-to-volume production, and CAD vector nesting.
- **MS Plate Sizing**: Heavy-gauge plate supply across IS 2062 E250 / E350 certified grades.
- **Technology Comparison Matrix**: Side-by-side analysis of Manual Oxy-Fuel vs. Machine Profiling vs. Fiber Laser Cutting.

### 4. 🎛️ Admin Control Dashboard
- **Live Metrics**: Pending quotes, active cutting jobs, completed orders, and revenue tracking.
- **Quote Processing Workspace**: Calculate material subtotal, GST (18%), and delivery fee to issue quotations directly to client portals or WhatsApp.
- **Shop Floor Management**: Assign operators (e.g. *Laser Operator #1*, *Machine Bay 1*) and update cutting statuses.
- **Dynamic Business Settings**: Edit Company Name, Phone, WhatsApp number, Email (`sales@indiansteel.online`), Address, GSTIN, and base steel rates live without code changes.

### 5. 👤 Customer Workspace Portal
- Quote status tracking pipeline (*Pending → Quoted → Approved → In Production*).
- Live order progress tracker (*Order Placed → Material Allocated → Cutting → QC → Dispatch*).
- Uploaded CAD drawings library and quotation downloads.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Lucide Icons |
| **Build Tool** | Vite 5 |
| **State & Persistence** | React Context API with LocalStorage fallback & reactive models |
| **Database** | PostgreSQL / Supabase (Schema provided in `supabase/schema.sql`) |
| **Domain** | `indiansteel.online` (CNAME configured) |
| **CI/CD** | GitHub Actions (`.github/workflows/deploy.yml`) |

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/indian-steel.git
cd indian-steel
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🗄️ Database Setup (Supabase / PostgreSQL)

1. Create a project on [Supabase](https://supabase.com/).
2. Open the **SQL Editor** tab in your Supabase dashboard.
3. Paste the contents of [`supabase/schema.sql`](supabase/schema.sql) and execute.
4. Tables created:
   - `site_settings` (Dynamic configuration)
   - `quote_requests` (Customer inquiries & CAD file links)
   - `orders` & `cutting_jobs` (Shop floor execution)
   - `products` & `customers`

---

## 🌐 Deploying to GitHub & Custom Domain (`indiansteel.online`)

### Connecting to your GitHub Repository:
```bash
git init
git add .
git commit -m "feat: Indian Steel web application (indiansteel.online)"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Deploying to Vercel / Netlify:
1. Import your GitHub repository in **Vercel** or **Netlify**.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Under **Domain Settings**, add your custom domain: **`indiansteel.online`**.

---

## 📞 Contact Information

- **Website:** [https://indiansteel.online](https://indiansteel.online)
- **Email:** `sales@indiansteel.online`
- **Phone:** `+91 98765 43210`
- **Address:** Plot 45, Industrial Area Phase II, Steel Yard Complex, Mumbai - 400072, India
- **GSTIN:** `27AAAAA0000A1Z5`

---

© 2026 **Indian Steel** (`indiansteel.online`). All Rights Reserved.
