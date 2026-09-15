import React, { useState } from 'react';
import {
  History,
  Compass,
  Heart,
  ShieldCheck,
  TreePine,
  CheckCircle,
  Building,
  Users,
  MapPin,
  Calendar,
} from 'lucide-react';
import { INSTITUTION_INFO } from '../data/initialData';
import { SectionHeader } from '../components/common/SectionHeader';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'vision' | 'philosophy' | 'values'>('story');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <SectionHeader
        badge="About Watakatifu Wote Senta"
        title="Our Institutional Identity & Catholic Heritage"
        subtitle="Serving the Diocese of Ngong and the broader community with pastoral dedication, peace, and professional hospitality since 1986."
      />

      {/* Tabs Navigation */}
      <div className="flex items-center justify-center border-b border-stone-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('story')}
            className={`py-3 px-4 sm:px-6 text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'story'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Our Story (1986)</span>
          </button>

          <button
            onClick={() => setActiveTab('vision')}
            className={`py-3 px-4 sm:px-6 text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'vision'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Mission & Vision</span>
          </button>

          <button
            onClick={() => setActiveTab('philosophy')}
            className={`py-3 px-4 sm:px-6 text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'philosophy'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Philosophy</span>
          </button>

          <button
            onClick={() => setActiveTab('values')}
            className={`py-3 px-4 sm:px-6 text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
              activeTab === 'values'
                ? 'border-sky-700 text-sky-900 bg-sky-50/50'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Core Values</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Our Story */}
      {activeTab === 'story' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-10 border border-[#E3DAC9] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded">
                <Calendar className="w-3.5 h-3.5" />
                <span>Founded 1 November 1986</span>
              </div>
              <h3 className="font-serif text-3xl font-bold text-stone-900">
                Four Decades of Grace, Community & Hospitality
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Watakatifu Wote Senta (Swahili for <em>All Saints Centre</em>) was officially opened on <strong>1 November 1986</strong>, on the liturgical Feast of All Saints, as a spiritual and hospitality facility under the Catholic Diocese of Ngong.
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Established to serve both Diocesan and non-Diocesan groups, the centre has welcomed Catholic parish councils, clergy, religious congregations, non-Catholic Christian communities, civil society organizations, and government delegations across Kenya.
              </p>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                Our peaceful campus along Kahara Road in Ngong features three main conference facilities (St. Bakhita, St. Julian, St. Bernard), residential wings with historical capacity reaching 62 beds, six self-contained guest apartments, an outdoor amphitheatre, and a consecrated daily Mass chapel.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-md border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80"
                  alt="Watakatifu Wote Chapel and grounds"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Diocese Context Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200">
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-sky-800 mb-2">
              <Building className="w-4 h-4" />
              <span>Catholic Diocese of Ngong Context</span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-stone-900 mb-3">
              Serving Kajiado and Narok Counties
            </h4>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              The Catholic Diocese of Ngong encompasses extensive pastoral territory across both <strong>Kajiado and Narok Counties</strong>, comprising <strong>44 parishes structured across seven distinct deaneries</strong>. Watakatifu Wote Senta acts as a central spiritual heart and logistical hub for diocesan synods, ongoing clergy formation, catechist certification, and parish leadership gatherings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="font-serif text-2xl font-bold text-sky-800">44 Parishes</div>
                <div className="text-xs text-stone-500 mt-1">Active communities of faith</div>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="font-serif text-2xl font-bold text-sky-800">7 Deaneries</div>
                <div className="text-xs text-stone-500 mt-1">Pastoral administrative zones</div>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="font-serif text-2xl font-bold text-sky-800">2 Counties</div>
                <div className="text-xs text-stone-500 mt-1">Kajiado & Narok counties</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Mission & Vision */}
      {activeTab === 'vision' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Our Shared Destination
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-900">
                Vision Statement
              </h3>
              <blockquote className="font-serif text-2xl text-stone-800 italic border-l-4 border-sky-600 pl-4 py-2 leading-relaxed">
                "{INSTITUTION_INFO.vision}"
              </blockquote>
              <p className="text-sm text-stone-600 leading-relaxed">
                We envision an all-inclusive human and spiritual communion where individuals, families, religious, and institutional visitors experience spiritual peace and human fulfillment in Christ.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Our Purpose in Action
              </span>
              <h3 className="font-serif text-3xl font-bold text-stone-900">
                Mission Statement
              </h3>
              <blockquote className="font-serif text-2xl text-stone-800 italic border-l-4 border-amber-500 pl-4 py-2 leading-relaxed">
                "{INSTITUTION_INFO.mission}"
              </blockquote>
              <p className="text-sm text-stone-600 leading-relaxed">
                Realized through the proclamation of the Gospel, diligent pastoral accompaniment, professional conference hospitality, and sustainable socio-economic development initiatives.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Philosophy */}
      {activeTab === 'philosophy' && (
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#E3DAC9] animate-in fade-in duration-200">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded">
              Ecclesial Foundation
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Philosophy of Service & Creation
            </h3>
            <p className="font-serif text-xl sm:text-2xl text-stone-800 italic border-l-4 border-emerald-600 pl-4 py-2">
              "{INSTITUTION_INFO.philosophy}"
            </p>
            <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed pt-2">
              <p>
                At Watakatifu Wote Senta, our operational work is fundamentally viewed through the lens of Catholic stewardship. We believe that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Sanctity of Human Life:</strong> Every visitor, delegate, and retreatant is received as a person made in the image and likeness of God, entitled to dignity, comfort, and restorative quiet.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Care for Creation (Laudato Si’):</strong> Our landscaped gardens and grounds in Ngong are maintained as an eco-sanctuary supporting reflection, fresh air, and biodiversity.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Service to Humanity as Service to God:</strong> Hospitality is not treated merely as a commercial transaction, but as a Gospel calling of welcoming the stranger.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Core Values */}
      {activeTab === 'values' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INSTITUTION_INFO.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs hover:shadow-sm transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-bold flex items-center justify-center mb-3">
                  {idx + 1}
                </div>
                <h4 className="font-serif text-xl font-bold text-stone-900 mb-2">
                  {val.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Management Responsibility Note */}
      <div className="p-4 rounded-xl bg-stone-100 border border-stone-300/80 text-xs text-stone-500 text-center">
        General institutional historical content, mission, vision, and diocese leadership records are maintained in partnership with <strong>PN Innovations</strong>.
      </div>
    </div>
  );
};
