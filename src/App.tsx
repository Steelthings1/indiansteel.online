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
    <div className="min-h-screen flex flex-col bg-[#0F1115]">
      <Navbar />
      <main className="flex-grow">
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
