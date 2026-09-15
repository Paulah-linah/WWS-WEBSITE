import React, { useState } from 'react';
import {
  Building2,
  Bed,
  Utensils,
  Shirt,
  Droplet,
  Users,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';
import {
  INITIAL_FACILITIES,
  INITIAL_ACCOMMODATION,
  INITIAL_CATERING,
  INITIAL_LAUNDRY,
  INSTITUTION_INFO,
} from '../data/initialData';
import { SectionHeader } from '../components/common/SectionHeader';
import { AvailabilityMatrix } from '../components/availability/AvailabilityMatrix';

interface HospitalityPageProps {
  subSection?: string;
  onOpenInquiry: (defaultType?: string, prefill?: Record<string, string | number>) => void;
}

export const HospitalityPage: React.FC<HospitalityPageProps> = ({
  subSection = 'conference',
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<
    'conference' | 'accommodation' | 'catering' | 'laundry' | 'water'
  >((subSection as any) || 'conference');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SectionHeader
        badge="Hospitality & Business Services"
        title="Conference, Accommodation & Campus Services"
        subtitle="Designed to host productive workshops, executive retreats, ecclesial assemblies, and serene residential stays in Ngong."
      />

      {/* Sub-navigation Tabs */}
      <div className="flex items-center justify-center border-b border-stone-200">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('conference')}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'conference'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Conference Facilities</span>
          </button>

          <button
            onClick={() => setActiveTab('accommodation')}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'accommodation'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bed className="w-4 h-4" />
            <span>Accommodation</span>
          </button>

          <button
            onClick={() => setActiveTab('catering')}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'catering'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Catering & Dining</span>
          </button>

          <button
            onClick={() => setActiveTab('laundry')}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'laundry'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shirt className="w-4 h-4" />
            <span>Laundry</span>
          </button>

          <button
            onClick={() => setActiveTab('water')}
            className={`py-3 px-3 sm:px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'water'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Droplet className="w-4 h-4" />
            <span>Water Support</span>
          </button>
        </div>
      </div>

      {/* 1. CONFERENCE FACILITIES TAB */}
      {activeTab === 'conference' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          {/* Equipment Inventory Summary Banner */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E3DAC9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2 border-r border-stone-200/80 last:border-none">
              <div className="font-serif text-2xl font-bold text-sky-900">155</div>
              <div className="text-xs text-stone-600 mt-0.5">Chairs & Tables Available</div>
            </div>
            <div className="p-2 border-r border-stone-200/80 last:border-none">
              <div className="font-serif text-2xl font-bold text-sky-900">1 Projector</div>
              <div className="text-xs text-stone-600 mt-0.5">Serving Conference Halls</div>
            </div>
            <div className="p-2 border-r border-stone-200/80 last:border-none">
              <div className="font-serif text-2xl font-bold text-sky-900">1 Sound System</div>
              <div className="text-xs text-stone-600 mt-0.5">High-Fidelity Audio Setup</div>
            </div>
            <div className="p-2">
              <div className="font-serif text-2xl font-bold text-sky-900">Purified Water</div>
              <div className="text-xs text-stone-600 mt-0.5">Dispensers in All Rooms</div>
            </div>
          </div>

          {/* 3 Main Halls */}
          <div className="space-y-8">
            <div className="text-left">
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Our Three Dedicated Conference Spaces
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Rates, capacities, and layout styles confirmed by Watakatifu Wote Senta.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {INITIAL_FACILITIES.map((facility) => (
                <div
                  key={facility.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                      <img
                        src={facility.image}
                        alt={facility.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-stone-900/90 backdrop-blur-xs text-amber-200 font-bold px-3 py-1.5 rounded-xl text-xs shadow-md">
                        KES {facility.priceKes.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                        <span className="inline-flex items-center gap-1 font-semibold text-stone-700">
                          <Users className="w-3.5 h-3.5 text-sky-700" />
                          {facility.capacityMin}–{facility.capacityMax} Attendees
                        </span>
                        <span className="text-[11px] bg-sky-50 text-sky-800 px-2 py-0.5 rounded font-medium">
                          {facility.seatingStyles.join(' • ')}
                        </span>
                      </div>

                      <h4 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                        {facility.name}
                      </h4>

                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">
                        {facility.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-stone-100">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                          Included Amenities:
                        </span>
                        {facility.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() =>
                        onOpenInquiry('conference', {
                          facilityName: facility.name,
                          attendeesCount: facility.capacityMax,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-colors shadow-xs text-center flex items-center justify-center gap-1.5"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>Request Booking for {facility.name.split(' ')[1]}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Availability Matrix Embedded */}
          <div className="pt-6">
            <AvailabilityMatrix
              onSelectDateAndFacility={(facilityName, date) => {
                onOpenInquiry('conference', { facilityName, date });
              }}
            />
          </div>
        </div>
      )}

      {/* 2. ACCOMMODATION TAB */}
      {activeTab === 'accommodation' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded">
              Rest & Contemplation in Ngong
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Campus Accommodation & Guest House
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Watakatifu Wote Senta provides restful, secure residential spaces supporting retreatants, visiting clergy, conference groups, and researchers. Historical capacity reached up to <strong>62 beds</strong> across our residential wings, supplemented by <strong>six (6) self-contained apartments</strong> in the All Saints Guest House.
            </p>
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2 max-w-3xl">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Inquiry-Based Booking:</strong> Individual room inventory and rates are tailored per reservation based on group size, duration, and full-board catering requirements.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_ACCOMMODATION.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-stone-900 mt-2 mb-1">
                      {item.name}
                    </h4>
                    <div className="text-xs font-semibold text-sky-800 mb-3">
                      {item.capacityDesc}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 pb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Features:
                      </span>
                      {item.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() =>
                      onOpenInquiry('accommodation', {
                        accommodationType: item.name,
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors shadow-2xs text-center"
                  >
                    Request Accommodation Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CATERING TAB */}
      {activeTab === 'catering' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-800 bg-orange-100 px-3 py-1 rounded">
              Wholesome Dining
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Hospitality Catering Services
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Our kitchen prepares fresh, wholesome meals for conference delegates, retreatants, parish banquets, and private committees. We focus on nourishing Kenyan dishes, fresh tea and coffee breaks, and accommodating special dietary preferences upon prior arrangement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_CATERING.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 w-full overflow-hidden bg-stone-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-orange-700 font-semibold mb-1">
                      Ideal for: {service.idealFor}
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                      {service.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <div className="space-y-1.5 pb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                        Includes:
                      </span>
                      {service.includes.map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      onOpenInquiry('catering', {
                        cateringType: service.title,
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-orange-700 hover:bg-orange-800 text-white text-xs font-bold transition-colors shadow-2xs text-center"
                  >
                    Make a Catering Inquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. LAUNDRY TAB */}
      {activeTab === 'laundry' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded">
              Care & Comfort
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Campus Laundry Services
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Watakatifu Wote Senta maintains dedicated laundry facilities to support overnight retreatants, long-term residential guests, visiting priests celebrating liturgies, and ongoing conference linen cleanliness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_LAUNDRY.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                    <Shirt className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-stone-900">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                    <div>
                      <strong>Turnaround:</strong> {item.turnaroundTime}
                    </div>
                    <div className="text-stone-500 italic">{item.notes}</div>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() =>
                      onOpenInquiry('general', {
                        subject: `Laundry Inquiry: ${item.title}`,
                      })
                    }
                    className="w-full py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold transition-colors"
                  >
                    Ask About Laundry Services
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. WATER SERVICES TAB */}
      {activeTab === 'water' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded">
              Hospitality Support
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Clean Water Hospitality Services
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Watakatifu Wote Senta provides clean, safe bottled drinking water and water dispensers across all conference facilities, meeting rooms, dining halls, and residential lounges to ensure comfortable, refreshed guests throughout their events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Conference Hall Water Dispensers
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Purified water dispensers with clean paper cups are stationed inside St. Bakhita, St. Julian, and St. Bernard halls as part of the conference package.
              </p>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold pt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Complimentary with every conference hall booking</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Retreatant & Residential Water Provisions
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Drinking water access points and dining refreshment service available for residential retreat participants throughout their stay in Ngong.
              </p>
              <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold pt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Managed by the hospitality and kitchen team</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
