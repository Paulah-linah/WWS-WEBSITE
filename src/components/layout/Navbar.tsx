import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Clock,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  CalendarCheck,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../../data/initialData';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenInquiry: (defaultType?: string, prefill?: Record<string, string | number>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5EE]/95 backdrop-blur-md border-b border-[#E3DAC9] shadow-xs">
      {/* Top Notification / Institutional Bar */}
      <div className="bg-[#1C1917] text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          {/* Diocese & Identity Tag */}
          <div className="flex items-center gap-3 text-stone-300">
            <span className="inline-flex items-center gap-1 font-medium text-sky-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
              {INSTITUTION_INFO.diocese}
            </span>
            <span className="hidden sm:inline text-stone-500">•</span>
            <span className="hidden sm:inline flex items-center gap-1 text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {INSTITUTION_INFO.location}
            </span>
          </div>

          {/* Quick Contacts & Mass Schedule */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 text-amber-200/90 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              Daily Mass: 7:00 AM
            </span>
            <span className="text-stone-600 hidden sm:inline">|</span>
            <a
              href={`tel:${INSTITUTION_INFO.phone}`}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
              title="Call Watakatifu Wote Senta"
            >
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>{INSTITUTION_INFO.phone}</span>
            </a>
            <a
              href={INSTITUTION_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => handleNav('/admin')}
              className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] transition-colors border border-stone-700"
            >
              <ShieldCheck className="w-3 h-3 text-sky-400" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Emblem */}
          <div
            onClick={() => handleNav('/')}
            className="cursor-pointer flex items-center gap-3.5 group select-none"
          >
            {/* Custom Catholic Liturgical Emblem */}
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0284C7] to-[#0369A1] p-0.5 shadow-md flex items-center justify-center text-white ring-2 ring-sky-200/60 transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-[10px] bg-linear-to-b from-[#0284C7] to-[#0c4a6e] flex flex-col items-center justify-center border border-sky-300/30">
                {/* Cross Emblem */}
                <div className="relative flex flex-col items-center justify-center">
                  <div className="w-1 h-6 bg-amber-200 rounded-xs shadow-xs"></div>
                  <div className="w-4 h-1 bg-amber-200 rounded-xs absolute top-2 shadow-xs"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 leading-tight">
                WATAKATIFU WOTE SENTA
              </span>
              <span className="text-xs sm:text-sm font-medium tracking-wide text-sky-800 uppercase flex items-center gap-1.5">
                <span>All Saints Conference Centre</span>
                <span className="text-stone-400 font-normal">| Ngong</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === '/'
                  ? 'text-sky-900 bg-sky-100/70'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Home
            </button>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNav('/about')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  currentRoute.startsWith('/about')
                    ? 'text-sky-900 bg-sky-100/70'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="w-4 h-4 text-stone-500" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full left-0 w-60 py-2 bg-white rounded-xl shadow-xl border border-stone-200 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button
                    onClick={() => handleNav('/about')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900 flex items-center justify-between"
                  >
                    <span>Overview & History (1986)</span>
                  </button>
                  <button
                    onClick={() => handleNav('/about?tab=vision')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900"
                  >
                    Mission & Vision
                  </button>
                  <button
                    onClick={() => handleNav('/about?tab=philosophy')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900"
                  >
                    Philosophy & Sanctity of Life
                  </button>
                  <button
                    onClick={() => handleNav('/about?tab=values')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900"
                  >
                    Core Values
                  </button>
                </div>
              )}
            </div>

            {/* Hospitality & Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('hospitality')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNav('/hospitality')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  currentRoute.startsWith('/hospitality')
                    ? 'text-sky-900 bg-sky-100/70'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <span>Hospitality & Services</span>
                <ChevronDown className="w-4 h-4 text-stone-500" />
              </button>

              {activeDropdown === 'hospitality' && (
                <div className="absolute top-full left-0 w-72 py-2 bg-white rounded-xl shadow-xl border border-stone-200 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button
                    onClick={() => handleNav('/hospitality/conference')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900 flex flex-col"
                  >
                    <span className="font-semibold text-stone-900">Conference Facilities</span>
                    <span className="text-xs text-stone-500">St. Bakhita, St. Julian & St. Bernard</span>
                  </button>
                  <button
                    onClick={() => handleNav('/hospitality/accommodation')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900 flex flex-col"
                  >
                    <span className="font-semibold text-stone-900">Accommodation</span>
                    <span className="text-xs text-stone-500">62-bed wing & 6 guest apartments</span>
                  </button>
                  <button
                    onClick={() => handleNav('/hospitality/catering')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900 flex flex-col"
                  >
                    <span className="font-semibold text-stone-900">Catering Services</span>
                    <span className="text-xs text-stone-500">Conferences, retreats & private banquets</span>
                  </button>
                  <button
                    onClick={() => handleNav('/hospitality/laundry')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900 flex flex-col"
                  >
                    <span className="font-semibold text-stone-900">Laundry Services</span>
                    <span className="text-xs text-stone-500">Guest linens & liturgical vestments</span>
                  </button>
                  <button
                    onClick={() => handleNav('/hospitality/water')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900 flex flex-col"
                  >
                    <span className="font-semibold text-stone-900">Water Services</span>
                    <span className="text-xs text-stone-500">Hospitality purified dispensers</span>
                  </button>
                </div>
              )}
            </div>

            {/* Catholic Ministry Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('ministry')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNav('/ministry')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-1 ${
                  currentRoute.startsWith('/ministry')
                    ? 'text-sky-900 bg-sky-100/70'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <span>Catholic Ministry</span>
                <ChevronDown className="w-4 h-4 text-stone-500" />
              </button>

              {activeDropdown === 'ministry' && (
                <div className="absolute top-full left-0 w-64 py-2 bg-white rounded-xl shadow-xl border border-stone-200 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button
                    onClick={() => handleNav('/ministry/mass')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900 flex items-center justify-between"
                  >
                    <span>Daily Mass (7:00 AM)</span>
                    <span className="text-[11px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">Daily</span>
                  </button>
                  <button
                    onClick={() => handleNav('/ministry/retreats')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900"
                  >
                    Spiritual Retreats
                  </button>
                  <button
                    onClick={() => handleNav('/ministry/formation')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900"
                  >
                    Formation & Seminars
                  </button>
                  <button
                    onClick={() => handleNav('/ministry/prayer')}
                    className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-sky-900"
                  >
                    Chapel, Grounds & Prayer
                  </button>
                </div>
              )}
            </div>

            {/* Products Catalogue */}
            <button
              onClick={() => handleNav('/products')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute.startsWith('/products')
                  ? 'text-sky-900 bg-sky-100/70'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Products
            </button>

            {/* Events */}
            <button
              onClick={() => handleNav('/events')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute.startsWith('/events')
                  ? 'text-sky-900 bg-sky-100/70'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Events
            </button>

            {/* Gallery */}
            <button
              onClick={() => handleNav('/gallery')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === '/gallery'
                  ? 'text-sky-900 bg-sky-100/70'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Gallery
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNav('/contact')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === '/contact'
                  ? 'text-sky-900 bg-sky-100/70'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNav('/inquiry')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-medium text-sm shadow-sm hover:shadow-md transition-all active:scale-98"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Make an Inquiry</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav('/inquiry')}
              className="px-3 py-1.5 rounded-lg bg-sky-700 text-white text-xs font-semibold"
            >
              Inquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-200/60 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-[#F7F5EE] px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-300/70">
            <button
              onClick={() => handleNav('/')}
              className={`py-2 px-3 rounded-lg text-left text-sm font-medium ${
                currentRoute === '/' ? 'bg-sky-100 text-sky-900' : 'text-stone-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('/about')}
              className={`py-2 px-3 rounded-lg text-left text-sm font-medium ${
                currentRoute.startsWith('/about') ? 'bg-sky-100 text-sky-900' : 'text-stone-800'
              }`}
            >
              About Us
            </button>
          </div>

          {/* Hospitality Section */}
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-3 py-1">
              Hospitality & Services
            </div>
            <button
              onClick={() => handleNav('/hospitality/conference')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Conference Facilities (3 Halls)</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNav('/hospitality/accommodation')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Accommodation & Guest House</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNav('/hospitality/catering')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Catering Services</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNav('/hospitality/laundry')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Laundry Services</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNav('/hospitality/water')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Water Hospitality Support</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {/* Catholic Ministry Section */}
          <div className="space-y-1 pt-2 border-t border-stone-200">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 px-3 py-1">
              Catholic Ministry
            </div>
            <button
              onClick={() => handleNav('/ministry/mass')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Daily Mass (7:00 AM)</span>
              <span className="text-xs text-sky-800 font-semibold">Chapel</span>
            </button>
            <button
              onClick={() => handleNav('/ministry/retreats')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Spiritual Retreats</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNav('/ministry/formation')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Formation & Seminars</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
            <button
              onClick={() => handleNav('/ministry/prayer')}
              className="w-full py-2 px-3 rounded-lg text-left text-sm text-stone-800 hover:bg-stone-200/60 flex items-center justify-between"
            >
              <span>Prayer & Reflection Grounds</span>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>

          {/* Additional Links */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200">
            <button
              onClick={() => handleNav('/products')}
              className="py-2 px-3 rounded-lg text-center text-sm font-medium bg-stone-200/70 text-stone-800"
            >
              Catalogue
            </button>
            <button
              onClick={() => handleNav('/events')}
              className="py-2 px-3 rounded-lg text-center text-sm font-medium bg-stone-200/70 text-stone-800"
            >
              Events
            </button>
            <button
              onClick={() => handleNav('/gallery')}
              className="py-2 px-3 rounded-lg text-center text-sm font-medium bg-stone-200/70 text-stone-800"
            >
              Gallery
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNav('/inquiry')}
              className="w-full py-3 rounded-xl bg-sky-700 text-white font-semibold text-center text-sm shadow-md"
            >
              Submit Service or Booking Inquiry
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-600 px-1">
            <button
              onClick={() => handleNav('/admin')}
              className="inline-flex items-center gap-1 text-sky-800 font-semibold"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Staff Login</span>
            </button>
            <a href={`tel:${INSTITUTION_INFO.phone}`} className="inline-flex items-center gap-1 font-medium">
              <Phone className="w-3.5 h-3.5" />
              {INSTITUTION_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
