import React, { useState } from 'react';
import {
  Clock,
  BookOpen,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  CalendarCheck,
  Heart,
  TreePine,
} from 'lucide-react';
import {
  INITIAL_MASS_SCHEDULE,
  INITIAL_RETREATS,
  INITIAL_FORMATION,
  INSTITUTION_INFO,
} from '../data/initialData';
import { SectionHeader } from '../components/common/SectionHeader';

interface CatholicMinistryPageProps {
  subSection?: string;
  onOpenInquiry: (defaultType?: string, prefill?: Record<string, string | number>) => void;
}

export const CatholicMinistryPage: React.FC<CatholicMinistryPageProps> = ({
  subSection = 'mass',
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<
    'mass' | 'retreats' | 'formation' | 'prayer'
  >((subSection as any) || 'mass');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SectionHeader
        badge="Catholic Ministry Services"
        title="Spiritual Renewal, Formation & Daily Prayer"
        subtitle="Under the pastoral care of the Catholic Diocese of Ngong, offering quiet sanctuary, Holy Mass, retreats, and catechist formation."
      />

      {/* Ministry Navigation Tabs */}
      <div className="flex items-center justify-center border-b border-stone-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('mass')}
            className={`py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'mass'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Mass Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('retreats')}
            className={`py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'retreats'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Retreats</span>
          </button>

          <button
            onClick={() => setActiveTab('formation')}
            className={`py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'formation'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Formation & Seminars</span>
          </button>

          <button
            onClick={() => setActiveTab('prayer')}
            className={`py-3 px-4 sm:px-6 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'prayer'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Chapel & Prayer Grounds</span>
          </button>
        </div>
      </div>

      {/* 1. MASS SCHEDULE TAB */}
      {activeTab === 'mass' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded">
              Liturgical Heart of the Centre
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              The Daily Eucharistic Sacrifice
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              The Eucharist is the source and summit of our communal life at Watakatifu Wote Senta. Morning Mass is celebrated every single day, bringing together retreatants, visiting priests, conference guests, and local parishioners in prayer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_MASS_SCHEDULE.map((mass) => (
              <div
                key={mass.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-1 rounded">
                      {mass.celebrationType}
                    </span>
                    {mass.isSpecial && (
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                        Annual Feast
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-stone-500 font-medium">{mass.day}</div>
                    <div className="font-serif text-4xl font-bold text-stone-900 mt-1 text-sky-950">
                      {mass.time}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {mass.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <MapPin className="w-3.5 h-3.5 text-sky-700" />
                    <span>Location: <strong>{mass.location}</strong></span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() =>
                      onOpenInquiry('general', {
                        subject: `Mass Intention or Inquiry: ${mass.celebrationType}`,
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-bold text-center transition-colors"
                  >
                    Inquire on Mass Intentions or Concelebration
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. RETREATS TAB */}
      {activeTab === 'retreats' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded">
              Spiritual Accompaniment
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Individual & Group Retreats in Ngong
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              We provide silent contemplation, guided Ignatian exercises, parish pastoral council retreats, and clergy recollections. Groups can book according to their own custom programs, or join our published diocesan retreat modules.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INITIAL_RETREATS.map((retreat) => (
              <div
                key={retreat.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full overflow-hidden bg-stone-100 relative">
                    <img
                      src={retreat.image}
                      alt={retreat.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-sky-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      {retreat.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                      {retreat.title}
                    </h4>

                    <div className="text-xs text-stone-500 mb-3 space-y-1">
                      <div>
                        <strong>Duration:</strong> {retreat.duration}
                      </div>
                      <div>
                        <strong>Audience:</strong> {retreat.targetAudience}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {retreat.description}
                    </p>

                    {retreat.requirements && (
                      <div className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                        <span className="font-bold text-[11px] text-stone-400 uppercase">
                          What to Bring:
                        </span>
                        {retreat.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-sky-700 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {retreat.feeKes && (
                      <div className="mt-4 p-2.5 rounded-lg bg-sky-50 text-sky-950 text-xs font-semibold">
                        Fee: KES {retreat.feeKes.toLocaleString()}{' '}
                        <span className="font-normal text-stone-600">({retreat.feeNote})</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      onOpenInquiry('retreat', {
                        retreatTitle: retreat.title,
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-colors shadow-2xs text-center"
                  >
                    Register / Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. FORMATION & SEMINARS TAB */}
      {activeTab === 'formation' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-3 py-1 rounded">
              Ecclesial Leadership
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Formation Programs & Pastoral Seminars
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              Conducted in communion with the Diocese of Ngong Pastoral Office to empower lay leaders, catechists, youth animators, and family life coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_FORMATION.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full overflow-hidden bg-stone-100">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                      {prog.title}
                    </h4>

                    <div className="text-xs text-stone-500 mb-3 space-y-1">
                      <div>
                        <strong>Format & Duration:</strong> {prog.duration}
                      </div>
                      {prog.schedule && (
                        <div>
                          <strong>Schedule:</strong> {prog.schedule}
                        </div>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {prog.description}
                    </p>

                    <div className="space-y-1.5 pb-2 text-xs text-stone-600">
                      <span className="font-bold text-[11px] text-stone-400 uppercase">
                        Prerequisites:
                      </span>
                      {prog.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>

                    {prog.feeKes && (
                      <div className="mt-3 p-2.5 rounded-lg bg-stone-100 text-stone-900 text-xs font-semibold">
                        Participation Cost: KES {prog.feeKes.toLocaleString()}{' '}
                        <span className="font-normal text-stone-600">({prog.feeNote})</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      onOpenInquiry('retreat', {
                        retreatTitle: prog.title,
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-colors shadow-2xs text-center"
                  >
                    Register for Seminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PRAYER & REFLECTION TAB */}
      {activeTab === 'prayer' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded">
              Contemplative Environment
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-900">
              Chapel, Adoration & Serene Reflection Grounds
            </h3>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-3xl">
              A peaceful oasis located along Kahara Road in Ngong, surrounded by clean air, native trees, and tranquil walking trails conducive to holy adoration, meditation, and spiritual renewal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                The Consecrated Chapel
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                The heart of Watakatifu Wote Senta, featuring the Blessed Sacrament reserved in the Tabernacle for private adoration and personal prayer throughout the day.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                <strong>Schedule:</strong> Daily Morning Mass at 7:00 AM; open for quiet prayer throughout the day.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <TreePine className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                Well-Maintained Prayer Grounds & Amphitheatre
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Manicured lawns, shaded outdoor benches, and an outdoor amphitheatre suitable for outdoor Stations of the Cross, group Rosaries, and open-air pastoral discussions.
              </p>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                <strong>Philosophy:</strong> Expressing "Integrity of Creation" by nurturing God’s natural environment in Ngong.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
