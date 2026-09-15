import React from 'react';
import {
  ArrowRight,
  CalendarCheck,
  Building2,
  Bed,
  Utensils,
  BookOpen,
  ShoppingBag,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  ChevronDown,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Image as ImageIcon,
} from 'lucide-react';
import { INSTITUTION_INFO, INITIAL_FACILITIES, INITIAL_RETREATS, INITIAL_EVENTS, INITIAL_GALLERY } from '../data/initialData';
import { AvailabilityMatrix } from '../components/availability/AvailabilityMatrix';
import { SectionHeader } from '../components/common/SectionHeader';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenInquiry: (defaultType?: string, prefill?: Record<string, string | number>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1C1917] text-white">
        {/* Background authentic high-res landscape image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=2000&q=85"
            alt="Watakatifu Wote Senta grounds and reflection environment"
            className="w-full h-full object-cover object-center opacity-40 filter brightness-90"
          />
          {/* Subtle gradient overlay to enhance typography contrast */}
          <div className="absolute inset-0 bg-linear-to-b from-[#141211]/80 via-[#1C1917]/60 to-[#1C1917]/95"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Diocese & Established Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-sky-200 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span>{INSTITUTION_INFO.diocese}</span>
            <span className="text-white/40">•</span>
            <span>Est. 1 November 1986 (All Saints)</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            Hospitality, Faith & Community
          </h1>

          <p className="mt-6 text-lg sm:text-xl md:text-2xl text-stone-200 font-light max-w-3xl mx-auto leading-relaxed">
            Welcome to Watakatifu Wote Senta — a peaceful Catholic conference, retreat, and hospitality sanctuary nestled along Kahara Road in Ngong, Kenya.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('/hospitality')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-base transition-all shadow-lg hover:shadow-sky-500/25 active:scale-98"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenInquiry('conference')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-base transition-all backdrop-blur-md border border-white/30 active:scale-98"
            >
              <CalendarCheck className="w-5 h-5 text-sky-300" />
              <span>Make an Inquiry</span>
            </button>
          </div>

          {/* Key highlights bar */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-200">7:00 AM</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">Daily Morning Mass</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-200">3 Halls</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">8 to 100 Capacity</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-200">62 Beds</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">& 6 Guest Apartments</div>
            </div>
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-serif font-bold text-amber-200">44 Parishes</div>
              <div className="text-xs text-stone-300 font-medium mt-0.5">Diocese of Ngong Hub</div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="mt-10 flex justify-center text-stone-400">
            <button
              onClick={() => {
                const el = document.getElementById('quick-services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors"
              aria-label="Scroll down to services"
            >
              <span>Discover More</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICES SECTION */}
      <section id="quick-services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="What We Offer"
          title="Hospitality, Ministry & Professional Services"
          subtitle="Discover our purpose-built conference spaces, retreat facilities, catering, and Catholic spiritual programs."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Card 1: Conference */}
          <div className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Conference Facilities
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Three fully equipped halls (St. Bakhita, St. Julian, St. Bernard) for 8 to 100 participants with Wi-Fi, projector, and sound system.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/hospitality/conference')}
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-800 group-hover:text-sky-950 transition-colors pt-2 border-t border-stone-100"
            >
              <span>View Facilities & Rates</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Accommodation */}
          <div className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Bed className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Accommodation
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Peaceful residential wings with up to 62 beds plus 6 self-contained guest house apartments for visiting facilitators and retreatants.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/hospitality/accommodation')}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 group-hover:text-amber-950 transition-colors pt-2 border-t border-stone-100"
            >
              <span>Explore Stay Options</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Catering */}
          <div className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Catering & Dining
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Fresh Kenyan tea, savory snacks, wholesome buffet lunches, and special feast banquets tailored for conferences and spiritual groups.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/hospitality/catering')}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-800 group-hover:text-orange-950 transition-colors pt-2 border-t border-stone-100"
            >
              <span>Catering Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 4: Catholic Ministry */}
          <div className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Catholic Ministry
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Daily 7:00 AM Mass in our chapel, individual & group spiritual retreats, pastoral seminars, and peaceful prayer gardens.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/ministry')}
              className="inline-flex items-center gap-1 text-xs font-bold text-sky-800 group-hover:text-sky-950 transition-colors pt-2 border-t border-stone-100"
            >
              <span>Mass & Retreats</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 5: Products Catalogue */}
          <div className="group bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Products Catalogue
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                Catholic literature, African Bibles, Daily Missals, olive wood rosaries, and liturgical devotional gifts available offline.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/products')}
              className="inline-flex items-center gap-1 text-xs font-bold text-purple-800 group-hover:text-purple-950 transition-colors pt-2 border-t border-stone-100"
            >
              <span>Browse Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. ABOUT PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl border border-[#E3DAC9] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-900 bg-sky-100 px-3 py-1 rounded-md">
              <span>About Watakatifu Wote Senta</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-snug">
              Serving the Diocese of Ngong & Groups Across Kenya Since 1986
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Officially opened on <strong>1 November 1986</strong>, on the Solemnity of All Saints, Watakatifu Wote Senta is an esteemed institution under the Catholic Diocese of Ngong. Across nearly four decades, the centre has welcomed both Diocesan and non-Diocesan groups — including Catholic parishes, ecumenical partners, corporate institutions, and government training delegations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <div className="font-serif font-bold text-stone-900 text-sm mb-1 text-sky-900">
                  Our Mission
                </div>
                <p className="text-xs text-stone-600 italic">
                  "{INSTITUTION_INFO.mission}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200">
                <div className="font-serif font-bold text-stone-900 text-sm mb-1 text-sky-900">
                  Our Philosophy
                </div>
                <p className="text-xs text-stone-600">
                  {INSTITUTION_INFO.philosophy}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/about')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs transition-colors shadow-xs"
              >
                <span>Learn More About Our History & Leadership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                alt="Chapel and grounds at Watakatifu Wote Senta"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-sky-800 text-white p-4 rounded-xl shadow-lg text-xs max-w-[240px] border border-sky-600 hidden sm:block">
              <div className="font-bold text-amber-200 font-serif text-sm">Feast of All Saints</div>
              <div className="mt-1 text-stone-200">Opened November 1, 1986 on Kahara Road, Ngong.</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONFERENCE FACILITIES HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
              Hospitality & Business Services
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Conference Facilities in Ngong
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Professional meeting rooms with 155 tables and chairs campus inventory, Wi-Fi, projector, sound system, and fresh water dispensers.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/hospitality/conference')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 transition-colors self-start md:self-auto"
          >
            <span>View Full Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-bold">
                    KES {facility.priceKes.toLocaleString()}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="font-medium inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-sky-700" />
                      Capacity: <strong>{facility.capacityMin}–{facility.capacityMax} Pax</strong>
                    </span>
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-[11px] font-semibold text-stone-700">
                      {facility.seatingStyles.join(' / ')}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">
                    {facility.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {facility.description}
                  </p>

                  <div className="space-y-1.5 pb-2">
                    {facility.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenInquiry('conference', { facilityName: facility.name })}
                  className="w-full py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold text-center transition-colors shadow-2xs"
                >
                  Request {facility.name.replace(' Conference Hall', '').replace(' Main Hall', '')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LIVE AVAILABILITY MATRIX PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AvailabilityMatrix
          onSelectDateAndFacility={(facilityName, date) => {
            onOpenInquiry('conference', { facilityName, date });
          }}
        />
      </section>

      {/* 6. ACCOMMODATION & CATERING TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Accommodation Teaser */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E3DAC9] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded">
                <Bed className="w-3.5 h-3.5" />
                <span>Restful Stay</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Accommodation & Guest House
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Quiet residential wings accommodating up to 62 beds historically, alongside our <strong>6 self-contained Guest House apartments</strong>. Perfect for individual retreatants, visiting priests, pastoral workshop participants, and conference delegates.
              </p>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="font-semibold text-stone-800">Inquiry-Based Booking</div>
                <p>Specific room categories, amenities, and quotes are customized for your group size and duration.</p>
              </div>
            </div>
            <div className="pt-6 flex items-center gap-3">
              <button
                onClick={() => onOpenInquiry('accommodation')}
                className="px-4 py-2.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors"
              >
                Request Accommodation
              </button>
              <button
                onClick={() => onNavigate('/hospitality/accommodation')}
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Catering Teaser */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-[#E3DAC9] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded">
                <Utensils className="w-3.5 h-3.5" />
                <span>Wholesome Dining</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Hospitality Catering Services
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Delicious and nourishing conference teas, traditional Kenyan snacks, fresh buffet meals, and special banquet coordination for retreatants and celebratory milestone gatherings.
              </p>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                <div className="font-semibold text-stone-800">Supportive Water Services</div>
                <p>Purified bottled water dispensers provided inside all conference halls and dining lounges.</p>
              </div>
            </div>
            <div className="pt-6 flex items-center gap-3">
              <button
                onClick={() => onOpenInquiry('catering')}
                className="px-4 py-2.5 rounded-lg bg-orange-700 hover:bg-orange-800 text-white text-xs font-bold transition-colors"
              >
                Make Catering Inquiry
              </button>
              <button
                onClick={() => onNavigate('/hospitality/catering')}
                className="px-4 py-2.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200"
              >
                View Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CATHOLIC MINISTRY & RETREATS HIGHLIGHT */}
      <section className="bg-[#1C1917] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-900/50 px-3 py-1 rounded-full border border-amber-800/60">
                Spiritual Life & Formation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                Catholic Ministry at Watakatifu Wote
              </h2>
              <p className="text-sm text-stone-300 mt-1 max-w-2xl">
                A sacred space dedicated to evangelization, sacramental life, silent contemplation, and pastoral enrichment in the Diocese of Ngong.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/ministry')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors self-start md:self-auto"
            >
              <span>Explore All Ministry Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Daily Mass Highlight Card */}
            <div className="bg-stone-900/90 rounded-2xl p-6 border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  Chapel Schedule
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1 mb-2">
                  Daily Morning Mass
                </h3>
                <div className="text-3xl font-serif font-bold text-amber-200 mb-3">
                  7:00 AM Daily
                </div>
                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  Celebrated every morning in the Watakatifu Wote Senta Chapel. Open to resident retreatants, visiting conference groups, and local parishioners.
                </p>
              </div>

              <button
                onClick={() => onNavigate('/ministry/mass')}
                className="w-full py-2 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-semibold border border-stone-700 text-center transition-colors"
              >
                View Mass & Liturgical Information
              </button>
            </div>

            {/* Retreats Highlight */}
            {INITIAL_RETREATS.slice(0, 2).map((ret) => (
              <div
                key={ret.id}
                className="bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800 flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden relative">
                    <img
                      src={ret.image}
                      alt={ret.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-stone-950/80 text-sky-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {ret.category} retreat
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-bold text-white mb-2 line-clamp-1">
                      {ret.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-2 mb-3">
                      {ret.description}
                    </p>
                    <div className="text-xs text-stone-300 font-medium">
                      Duration: <strong>{ret.duration}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenInquiry('retreat', { retreatTitle: ret.title })}
                    className="w-full py-2 px-3 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold transition-colors"
                  >
                    Register / Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded-full">
              Visual Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-2">
              Our Facilities & Peaceful Grounds
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/gallery')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 hover:text-sky-950 transition-colors"
          >
            <span>View Complete Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INITIAL_GALLERY.slice(0, 4).map((img) => (
            <div
              key={img.id}
              onClick={() => onNavigate('/gallery')}
              className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-stone-200"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">
                  {img.category}
                </span>
                <span className="font-serif font-bold text-sm text-stone-100 leading-tight mt-0.5">
                  {img.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CONTACT CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-br from-sky-900 to-sky-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-800 text-sky-200 text-xs font-bold uppercase tracking-wider">
              Planning a Conference, Retreat or Event?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Experience Catholic Hospitality on Kahara Road, Ngong
            </h2>
            <p className="text-sm sm:text-base text-sky-100 leading-relaxed">
              Whether you are organizing a parish pastoral retreat, a high-level NGO seminar, an annual clergy gathering, or an executive board meeting, our staff is ready to assist you.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenInquiry('conference')}
                className="px-6 py-3 rounded-xl bg-white text-sky-950 font-bold text-sm shadow-md hover:bg-stone-100 transition-colors"
              >
                Request a Facility Booking
              </button>
              <a
                href={`tel:${INSTITUTION_INFO.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-800/80 hover:bg-sky-800 text-white font-semibold text-sm border border-sky-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call {INSTITUTION_INFO.phone}</span>
              </a>
              <a
                href={INSTITUTION_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
