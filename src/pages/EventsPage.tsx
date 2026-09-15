import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Filter,
  CalendarCheck,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_EVENTS } from '../data/initialData';
import { SectionHeader } from '../components/common/SectionHeader';

interface EventsPageProps {
  onOpenInquiry: (defaultType?: string, prefill?: Record<string, string | number>) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');

  const filteredEvents = INITIAL_EVENTS.filter((evt) => {
    if (filter === 'upcoming') return !evt.isPast;
    if (filter === 'past') return evt.isPast;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SectionHeader
        badge="Liturgical & Institutional Calendar"
        title="Events & Diocesan Gatherings"
        subtitle="Key celebrations, youth formation rallies, jubilee milestones, and pastoral symposiums hosted at Watakatifu Wote Senta."
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-1 rounded-xl border border-stone-200 shadow-2xs flex items-center gap-1">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'upcoming'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'past'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Past Events
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Events
          </button>
        </div>
      </div>

      {/* Events Listing */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-lg mx-auto">
          <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h4 className="font-serif text-lg font-bold text-stone-800">
            Upcoming events will be published here
          </h4>
          <p className="text-xs text-stone-500 mt-1">
            Check back soon or contact our administration for upcoming parish dates and diocesan programs.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-56 w-full overflow-hidden bg-stone-100 relative">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-xs text-white px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>
                      {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  {event.isPast && (
                    <div className="absolute top-4 right-4 bg-stone-800 text-stone-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                      Completed
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mb-3">
                    <span className="flex items-center gap-1 font-medium text-stone-700">
                      <Clock className="w-3.5 h-3.5 text-sky-700" />
                      {event.time}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                {event.registrationOpen ? (
                  <button
                    onClick={() =>
                      onOpenInquiry('general', {
                        subject: `Event Registration: ${event.title}`,
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-colors shadow-2xs text-center flex items-center justify-center gap-1.5"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Register / Inquire for Event</span>
                  </button>
                ) : (
                  <div className="text-xs text-stone-400 italic text-center py-2">
                    Event completed. For archive or future dates, contact the office.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
