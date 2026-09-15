import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ExternalLink,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/initialData';
import { SectionHeader } from '../components/common/SectionHeader';
import { InquiryForm } from '../components/inquiry/InquiryForm';

interface ContactPageProps {
  onOpenInquiry: (defaultType?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SectionHeader
        badge="Connect With Us"
        title="Contact Watakatifu Wote Senta"
        subtitle="Located along Kahara Road in Ngong. We welcome your calls, WhatsApp messages, emails, and online inquiries."
      />

      {/* 4 Direct Channels Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Phone */}
        <a
          href={`tel:${INSTITUTION_INFO.phone}`}
          className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Direct Telephone
            </span>
            <h4 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">
              {INSTITUTION_INFO.phoneFormatted}
            </h4>
            <p className="text-xs text-stone-500">
              Office hours (8:00 AM – 5:00 PM) for bookings and urgent requests.
            </p>
          </div>
          <div className="text-xs font-bold text-sky-700 mt-4 pt-2 border-t border-stone-100 flex items-center gap-1">
            <span>Call Now</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={INSTITUTION_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Instant Messaging
            </span>
            <h4 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">
              WhatsApp Chat
            </h4>
            <p className="text-xs text-stone-500">
              Fast, convenient questions regarding dates, catering, and products.
            </p>
          </div>
          <div className="text-xs font-bold text-emerald-700 mt-4 pt-2 border-t border-stone-100 flex items-center gap-1">
            <span>Open WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Corporate Email */}
        <a
          href={`mailto:${INSTITUTION_INFO.email}`}
          className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Corporate Email
            </span>
            <h4 className="font-serif text-lg font-bold text-stone-900 mt-1 mb-2 break-all">
              {INSTITUTION_INFO.email}
            </h4>
            <p className="text-xs text-stone-500">
              Send official institutional booking letters and event proposals.
            </p>
          </div>
          <div className="text-xs font-bold text-sky-700 mt-4 pt-2 border-t border-stone-100 flex items-center gap-1">
            <span>Send Email</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </a>

        {/* Location & Diocese */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Physical Location
            </span>
            <h4 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">
              Ngong, Kahara Road
            </h4>
            <p className="text-xs text-stone-500">
              Catholic Diocese of Ngong, Kajiado County, Kenya.
            </p>
          </div>
          <div className="text-xs font-bold text-amber-800 mt-4 pt-2 border-t border-stone-100 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Daily Mass: 7:00 AM</span>
          </div>
        </div>
      </div>

      {/* Grid: Google Map Section & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map & Location Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Visit Watakatifu Wote Senta
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our centre is situated along Kahara Road in Ngong, easily accessible from Nairobi, Karen, Kiserian, and the wider Kajiado and Narok deaneries.
            </p>

            {/* Visual Map Representation */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
              {/* Map background illustration */}
              <iframe
                title="Watakatifu Wote Senta Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.795115277864!2d36.6450!3d-1.3650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05b1c8f411b9%3A0x6b4f74d9e5b22cf3!2sNgong%2C%20Kenya!5e0!3m2!1sen!2ske!4v1690000000000!5m2!1sen!2ske"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-2">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
                <span>Kahara Road, Ngong Town</span>
              </div>
              <p>
                From Ngong Town roundabout, follow directions along Kahara Road towards the Catholic Centre. Ample, secure parking is available within our gated perimeter.
              </p>
              <a
                href="https://maps.google.com/?q=Ngong+Kahara+Road+Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:text-sky-900 pt-1"
              >
                <span>Open in Google Maps Application</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Central Contact / Inquiry Form */}
        <div className="lg:col-span-7">
          <InquiryForm initialType="general" />
        </div>
      </div>
    </div>
  );
};
