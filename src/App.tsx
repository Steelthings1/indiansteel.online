import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Hero } from './components/home/Hero';
import { QuickServiceCards } from './components/home/QuickServiceCards';
import { AboutSection } from './components/home/AboutSection';
import { ProductsCatalogue } from './components/home/ProductsCatalogue';
import { MSPlateCuttingSection } from './components/home/MSPlateCuttingSection';
import { CuttingMethodsComparison } from './components/home/CuttingMethodsComparison';
import { HowItWorksTimeline } from './components/home/HowItWorksTimeline';
import { IndustriesWeServe } from './components/home/IndustriesWeServe';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { ContactSection } from './components/home/ContactSection';
import { SteelCalculator } from './components/tools/SteelCalculator';
import { QuoteRequestModal } from './components/quote/QuoteRequestModal';
import { LaserCuttingPage } from './components/pages/LaserCuttingPage';
import { MSPlateCuttingPage } from './components/pages/MSPlateCuttingPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CustomerDashboard } from './components/customer/CustomerDashboard';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <Hero />
            <QuickServiceCards />
            <AboutSection />
            <ProductsCatalogue />
            <MSPlateCuttingSection />
            <CuttingMethodsComparison />
            <HowItWorksTimeline />
            <SteelCalculator />
            <IndustriesWeServe />
            <WhyChooseUs />
            <ContactSection />
          </>
        );
      case 'about':
        return (
          <>
            <AboutSection />
            <WhyChooseUs />
            <ContactSection />
          </>
        );
      case 'products':
        return (
          <>
            <ProductsCatalogue />
            <SteelCalculator />
          </>
        );
      case 'services':
        return (
          <>
            <QuickServiceCards />
            <MSPlateCuttingSection />
            <CuttingMethodsComparison />
            <HowItWorksTimeline />
          </>
        );
      case 'ms-plate-cutting':
        return (
          <>
            <MSPlateCuttingPage />
            <CuttingMethodsComparison />
            <SteelCalculator />
          </>
        );
      case 'laser-cutting':
        return (
          <>
            <LaserCuttingPage />
            <SteelCalculator />
          </>
        );
      case 'industries':
        return (
          <>
            <IndustriesWeServe />
            <ProductsCatalogue />
          </>
        );
      case 'calculator':
        return (
          <>
            <SteelCalculator />
          </>
        );
      case 'contact':
        return (
          <>
            <ContactSection />
          </>
        );
      case 'customer-portal':
        return <CustomerDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col luxury-industrial-bg relative overflow-x-hidden">
      {/* Dynamic Ambient Background Glow Elements */}
      <div className="ambient-laser-spotlight top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="ambient-blue-spotlight top-1/3 right-0 translate-x-1/3" />
      <div className="ambient-laser-spotlight top-2/3 left-0 -translate-x-1/3" />
      <div className="ambient-blue-spotlight bottom-0 right-1/4 translate-y-1/3" />

      <Navbar />
      <main className="flex-grow relative z-10">
        {renderPage()}
      </main>
      <Footer />
      <QuoteRequestModal />
      <FloatingWhatsApp />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
