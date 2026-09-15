import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { InquiryForm } from '../components/inquiry/InquiryForm';
import { InquiryType } from '../types';
import { Phone, Mail, MessageSquare, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { INSTITUTION_INFO } from '../data/initialData';

interface InquiryPageProps {
  initialType?: InquiryType;
  prefillData?: Record<string, string | number>;
}

export const InquiryPage: React.FC<InquiryPageProps> = ({
  initialType = 'conference',
  prefillData = {},
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SectionHeader
        badge="Direct Service Booking & Inquiries"
        title="Request a Facility, Retreat or Institutional Service"
        subtitle="Select your inquiry type below to submit your dates, group requirements, or questions directly to our administration team in Ngong."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Form */}
        <div className="lg:col-span-8">
          <InquiryForm initialType={initialType} prefillData={prefillData} />
        </div>

        {/* Supporting Context & Fast Contacts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 border border-[#E3DAC9] space-y-4">
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Inquiry Review Process
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every submission is logged into our administrative system and assigned to the relevant department editor:
            </p>

            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Conferences & Accommodation:</strong> Handled by David Inoti (Hospitality Services).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Retreats & Formation:</strong> Reviewed by Fr Charles Ndemange (Primary Administrator).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Literature & Devotional Items:</strong> Coordinated by Naiterra Lanoi Winnie.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-3">
            <h4 className="font-serif text-base font-bold text-stone-900">
              Direct Inquiries
            </h4>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <a href={`tel:${INSTITUTION_INFO.phone}`} className="font-semibold text-sky-800">
                  {INSTITUTION_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <a href={`mailto:${INSTITUTION_INFO.email}`} className="text-stone-700 break-all">
                  {INSTITUTION_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <a href={INSTITUTION_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold">
                  WhatsApp Support
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{INSTITUTION_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
