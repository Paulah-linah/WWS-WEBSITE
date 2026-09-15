import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ExternalLink,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../../data/initialData';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (route: string) => {
    onNavigate(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 border-t border-stone-800">
      {/* Top Banner / Diocese Affiliation */}
      <div className="bg-[#141211] border-b border-stone-800 py-4 px-4 sm:px-6 lg:px-8 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            An Institution of the{' '}
            <span className="text-sky-400 font-medium">Catholic Diocese of Ngong</span>{' '}
            — {INSTITUTION_INFO.dioceseScope}.
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="inline-flex items-center gap-1.5 text-amber-300/90 font-medium">
              <Clock className="w-3.5 h-3.5" /> Daily Mass 7:00 AM
            </span>
            <span>•</span>
            <span>Established 1 November 1986</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand & Institutional Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-700 flex items-center justify-center text-amber-200 font-serif font-bold text-lg ring-1 ring-sky-500">
                <div className="relative flex flex-col items-center">
                  <div className="w-0.5 h-5 bg-amber-200"></div>
                  <div className="w-3.5 h-0.5 bg-amber-200 absolute top-1.5"></div>
                </div>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  WATAKATIFU WOTE SENTA
                </h3>
                <p className="text-xs text-sky-400 tracking-wider uppercase font-medium">
                  All Saints Conference Centre — Ngong
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed pr-4">
              Officially opened on 1 November 1986 on the Feast of All Saints. A serene sanctuary for hospitality, diocesan formation, spiritual contemplation, and professional conferences in Ngong, Kenya.
            </p>

            <div className="bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 text-xs text-stone-400 space-y-1">
              <div className="text-amber-300 font-semibold font-serif text-sm">Our Vision</div>
              <p className="italic text-stone-300">"{INSTITUTION_INFO.vision}"</p>
            </div>
          </div>

          {/* Col 3: Hospitality & Facilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Hospitality & Services
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('/hospitality/conference')}
                  className="hover:text-white transition-colors"
                >
                  Conference Facilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/hospitality/accommodation')}
                  className="hover:text-white transition-colors"
                >
                  Accommodation & Guest House
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/hospitality/catering')}
                  className="hover:text-white transition-colors"
                >
                  Catering & Dining
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/hospitality/laundry')}
                  className="hover:text-white transition-colors"
                >
                  Laundry Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/hospitality/water')}
                  className="hover:text-white transition-colors"
                >
                  Water Hospitality Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/hospitality')}
                  className="hover:text-white transition-colors text-xs text-sky-300 font-medium"
                >
                  View Live Availability →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Catholic Ministry & Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Ministry & Resources
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <button
                  onClick={() => handleNav('/ministry/mass')}
                  className="hover:text-white transition-colors"
                >
                  Daily Mass (7:00 AM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/ministry/retreats')}
                  className="hover:text-white transition-colors"
                >
                  Spiritual Retreats
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/ministry/formation')}
                  className="hover:text-white transition-colors"
                >
                  Formation & Seminars
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/ministry/prayer')}
                  className="hover:text-white transition-colors"
                >
                  Chapel & Reflection Grounds
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/products')}
                  className="hover:text-white transition-colors"
                >
                  Religious Books & Articles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/events')}
                  className="hover:text-white transition-colors"
                >
                  Upcoming Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/gallery')}
                  className="hover:text-white transition-colors"
                >
                  Campus Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400">
              Contact & Inquiries
            </h4>
            <div className="space-y-2.5 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{INSTITUTION_INFO.location}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`tel:${INSTITUTION_INFO.phone}`}
                  className="hover:text-white transition-colors font-medium text-stone-200"
                >
                  {INSTITUTION_INFO.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${INSTITUTION_INFO.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {INSTITUTION_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={INSTITUTION_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Chat on WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => handleNav('/inquiry')}
                  className="w-full py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 text-center transition-colors"
                >
                  Submit Booking Request
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} Watakatifu Wote Senta / All Saints Conference Centre. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNav('/about')}
              className="hover:text-stone-400 transition-colors"
            >
              Institutional Overview
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('/contact')}
              className="hover:text-stone-400 transition-colors"
            >
              Contact Us
            </button>
            <span>•</span>
            <button
              onClick={() => handleNav('/admin')}
              className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Operational Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
