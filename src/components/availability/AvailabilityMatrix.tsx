import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MinusCircle,
  ArrowRight,
  Filter,
  Users,
  Info,
  CalendarDays,
} from 'lucide-react';
import { AvailabilityEntry, ConferenceFacility, AvailabilityStatus } from '../../types';
import { StorageService } from '../../services/storageService';

interface AvailabilityMatrixProps {
  onSelectDateAndFacility?: (facilityName: string, date: string) => void;
  compact?: boolean;
}

export const AvailabilityMatrix: React.FC<AvailabilityMatrixProps> = ({
  onSelectDateAndFacility,
  compact = false,
}) => {
  const [facilities, setFacilities] = useState<ConferenceFacility[]>([]);
  const [availability, setAvailability] = useState<AvailabilityEntry[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  useEffect(() => {
    const load = () => {
      setFacilities(StorageService.getFacilities());
      setAvailability(StorageService.getAvailability());
    };
    load();
    return StorageService.subscribe(load);
  }, []);

  // Generate next 7 days for quick tab viewing
  const dateRange = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const getStatusForFacilityAndDate = (
    facilityId: string,
    dateStr: string
  ): { status: AvailabilityStatus; notes?: string } => {
    const entry = availability.find(
      (a) => a.facilityId === facilityId && a.date === dateStr
    );
    if (entry) {
      return { status: entry.status, notes: entry.notes };
    }
    // Default to AVAILABLE if not explicitly flagged
    return { status: 'AVAILABLE' };
  };

  const renderStatusBadge = (status: AvailabilityStatus) => {
    switch (status) {
      case 'AVAILABLE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            AVAILABLE
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            PENDING
          </span>
        );
      case 'BOOKED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            BOOKED
          </span>
        );
      case 'BLOCKED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-200 text-stone-700 border border-stone-300">
            <MinusCircle className="w-3.5 h-3.5 text-stone-500" />
            BLOCKED
          </span>
        );
      default:
        return null;
    }
  };

  const filteredFacilities =
    selectedFacilityId === 'all'
      ? facilities
      : facilities.filter((f) => f.id === selectedFacilityId);

  return (
    <div className="bg-[#FAF8F5] rounded-2xl border border-[#E3DAC9] p-5 sm:p-7 shadow-xs">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100/70 px-2.5 py-1 rounded-md mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Live Availability Matrix</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Conference Facility Availability
          </h3>
          <p className="text-sm text-stone-600 mt-1">
            Check real-time status across our three conference spaces in Ngong. Updated regularly by the administration.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 flex-wrap bg-white px-3.5 py-2 rounded-xl border border-stone-200 text-xs text-stone-600 shadow-2xs">
          <span className="font-medium text-stone-800 mr-1">Status:</span>
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available
          </span>
          <span className="flex items-center gap-1 text-amber-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Pending
          </span>
          <span className="flex items-center gap-1 text-rose-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Booked
          </span>
          <span className="flex items-center gap-1 text-stone-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-stone-400"></span> Blocked
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        {/* Facility Filter Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Room:
          </span>
          <button
            onClick={() => setSelectedFacilityId('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
              selectedFacilityId === 'all'
                ? 'bg-sky-700 text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All 3 Halls
          </button>
          {facilities.map((fac) => (
            <button
              key={fac.id}
              onClick={() => setSelectedFacilityId(fac.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                selectedFacilityId === fac.id
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {fac.name.replace(' Conference Hall', '').replace(' Main Hall', '')}
            </button>
          ))}
        </div>

        {/* Date Selector input */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-stone-600 shrink-0 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            Pick Date:
          </span>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white text-stone-800 font-medium shadow-2xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* 7-Day Quick Strip */}
      <div className="grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-7 gap-2 mb-5">
        {dateRange.map((dateStr) => {
          const d = new Date(dateStr + 'T00:00:00');
          const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
          const dayNum = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(dateStr)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-sky-700 text-white border-sky-800 shadow-sm ring-2 ring-sky-300/40'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <div className={`text-[11px] font-medium uppercase ${isSelected ? 'text-sky-200' : 'text-stone-400'}`}>
                {dayName}
              </div>
              <div className="text-sm font-bold mt-0.5">{dayNum}</div>
            </button>
          );
        })}
      </div>

      {/* Facilities Availability Grid for Selected Date */}
      <div className="space-y-3.5">
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center justify-between">
          <span>
            Status for{' '}
            <strong className="text-stone-800">
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </strong>
          </span>
          <span className="text-[11px] text-stone-400">
            {filteredFacilities.length} {filteredFacilities.length === 1 ? 'room' : 'rooms'} listed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredFacilities.map((facility) => {
            const { status, notes } = getStatusForFacilityAndDate(
              facility.id,
              selectedDate
            );

            return (
              <div
                key={facility.id}
                className="bg-white rounded-xl border border-stone-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      {facility.name}
                    </h4>
                    {renderStatusBadge(status)}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-stone-600 mb-3 pb-2 border-b border-stone-100">
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      {facility.capacityMin}–{facility.capacityMax} Pax
                    </span>
                    <span>•</span>
                    <span className="font-bold text-sky-800">
                      KES {facility.priceKes.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 mb-3">
                    {facility.description}
                  </p>

                  {notes && (
                    <div className="mb-3 p-2 rounded-lg bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>{notes}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  {status === 'AVAILABLE' ? (
                    <button
                      onClick={() =>
                        onSelectDateAndFacility &&
                        onSelectDateAndFacility(facility.name, selectedDate)
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <span>Request This Room</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : status === 'PENDING' ? (
                    <button
                      onClick={() =>
                        onSelectDateAndFacility &&
                        onSelectDateAndFacility(facility.name, selectedDate)
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors shadow-2xs"
                    >
                      <span>Inquire for Alternate Slot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        onSelectDateAndFacility &&
                        onSelectDateAndFacility(facility.name, selectedDate)
                      }
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors border border-stone-200"
                    >
                      <span>Inquire Other Dates</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer reassurance note */}
      <div className="mt-5 pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
        <p className="flex items-center gap-1.5">
          <Info className="w-4 h-4 text-sky-700 shrink-0" />
          <span>
            Equipped with 1 projector, 1 PA sound system, Wi-Fi, 155 chairs & tables, and clean water dispensers.
          </span>
        </p>
        <span className="text-[11px] text-stone-400">
          Booking inquiries undergo review by David Inoti (Hospitality Services).
        </span>
      </div>
    </div>
  );
};
