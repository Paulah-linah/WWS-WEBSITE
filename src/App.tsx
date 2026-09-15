import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Modal } from './components/common/Modal';
import { InquiryForm } from './components/inquiry/InquiryForm';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HospitalityPage } from './pages/HospitalityPage';
import { CatholicMinistryPage } from './pages/CatholicMinistryPage';
import { ProductsPage } from './pages/ProductsPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { InquiryPage } from './pages/InquiryPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { InquiryType } from './types';
import { INSTITUTION_INFO } from './data/initialData';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  // Current Route tracking
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Universal Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryModalType, setInquiryModalType] = useState<InquiryType>('conference');
  const [inquiryPrefill, setInquiryPrefill] = useState<Record<string, string | number>>({});

  // Scroll to top on route change
  const navigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back / forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openInquiryModal = (
    defaultType: string = 'conference',
    prefill: Record<string, string | number> = {}
  ) => {
    setInquiryModalType(defaultType as InquiryType);
    setInquiryPrefill(prefill);
    setIsInquiryModalOpen(true);
  };

  // Route Renderer
  const renderView = () => {
    if (currentRoute === '/' || currentRoute === '') {
      return (
        <HomePage
          onNavigate={navigate}
          onOpenInquiry={openInquiryModal}
        />
      );
    }

    if (currentRoute.startsWith('/about')) {
      return <AboutPage />;
    }

    if (currentRoute.startsWith('/hospitality')) {
      let sub = 'conference';
      if (currentRoute.includes('accommodation')) sub = 'accommodation';
      else if (currentRoute.includes('catering')) sub = 'catering';
      else if (currentRoute.includes('laundry')) sub = 'laundry';
      else if (currentRoute.includes('water')) sub = 'water';

      return (
        <HospitalityPage
          subSection={sub}
          onOpenInquiry={openInquiryModal}
        />
      );
    }

    if (currentRoute.startsWith('/ministry')) {
      let sub = 'mass';
      if (currentRoute.includes('retreats')) sub = 'retreats';
      else if (currentRoute.includes('formation')) sub = 'formation';
      else if (currentRoute.includes('prayer')) sub = 'prayer';

      return (
        <CatholicMinistryPage
          subSection={sub}
          onOpenInquiry={openInquiryModal}
        />
      );
    }

    if (currentRoute.startsWith('/products')) {
      return <ProductsPage onOpenInquiry={openInquiryModal} />;
    }

    if (currentRoute.startsWith('/events')) {
      return <EventsPage onOpenInquiry={openInquiryModal} />;
    }

    if (currentRoute.startsWith('/gallery')) {
      return <GalleryPage />;
    }

    if (currentRoute.startsWith('/contact')) {
      return <ContactPage onOpenInquiry={openInquiryModal} />;
    }

    if (currentRoute.startsWith('/inquiry')) {
      return <InquiryPage initialType="conference" />;
    }

    if (currentRoute.startsWith('/admin')) {
      return <AdminDashboard />;
    }

    // Default Fallback to Home
    return (
      <HomePage
        onNavigate={navigate}
        onOpenInquiry={openInquiryModal}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-stone-900 font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Institutional Top Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenInquiry={() => openInquiryModal('conference')}
      />

      {/* Main Page Content */}
      <main className="flex-grow">{renderView()}</main>

      {/* Institutional Diocesan Footer */}
      <Footer onNavigate={navigate} />

      {/* Floating Quick Action Buttons (WhatsApp & Quick Call) */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={INSTITUTION_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:px-4 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:shadow-emerald-600/30 transition-all flex items-center gap-2 group active:scale-95"
          title="Chat on WhatsApp"
          aria-label="WhatsApp Watakatifu Wote Senta"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline-block">
            WhatsApp Us
          </span>
        </a>

        <a
          href={`tel:${INSTITUTION_INFO.phone}`}
          className="p-3 rounded-full bg-sky-800 hover:bg-sky-700 text-white shadow-lg transition-all active:scale-95 sm:hidden"
          title="Call Direct"
          aria-label="Call Watakatifu Wote Senta"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Universal Inquiry Modal */}
      {isInquiryModalOpen && (
        <Modal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          title={`Booking & Inquiry - ${inquiryModalType.toUpperCase()}`}
          maxWidth="2xl"
        >
          <InquiryForm
            initialType={inquiryModalType}
            prefillData={inquiryPrefill}
            onSuccess={() => {
              // auto close modal on success after brief moment
              setTimeout(() => {
                setIsInquiryModalOpen(false);
              }, 2500);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
