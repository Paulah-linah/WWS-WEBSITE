import React, { useState } from 'react';
import {
  Send,
  CheckCircle,
  Building2,
  Bed,
  Utensils,
  BookOpen,
  ShoppingBag,
  HelpCircle,
  Phone,
  Mail,
  Calendar,
  Clock,
  Users,
} from 'lucide-react';
import { InquiryType } from '../../types';
import { StorageService } from '../../services/storageService';
import { INSTITUTION_INFO } from '../../data/initialData';

interface InquiryFormProps {
  initialType?: InquiryType;
  prefillData?: Record<string, any>;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialType = 'conference',
  prefillData = {},
  onSuccess,
  onCancel,
}) => {
  const pData = prefillData as Record<string, any>;
  const [selectedType, setSelectedType] = useState<InquiryType>(initialType);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Common Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');

  // Conference specific
  const [facilityName, setFacilityName] = useState(
    (pData.facilityName as string) || 'St. Julian Conference Hall'
  );
  const [eventDate, setEventDate] = useState(
    (pData.date as string) || (pData.eventDate as string) || ''
  );
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('16:30');
  const [attendeesCount, setAttendeesCount] = useState<number | ''>(
    (pData.attendeesCount as number) || 40
  );
  const [seatingArrangement, setSeatingArrangement] = useState('Classroom');
  const [additionalRequirements, setAdditionalRequirements] = useState(
    'Wi-Fi, Projector, and Water Dispenser'
  );

  // Accommodation specific
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestsCount, setGuestsCount] = useState<number | ''>(1);
  const [accommodationType, setAccommodationType] = useState(
    (pData.accommodationType as string) || 'All Saints Guest House Apartments'
  );

  // Catering specific
  const [cateringType, setCateringType] = useState('Conference Catering & Tea Breaks');
  const [eventType, setEventType] = useState('Conference / Workshop');
  const [cateringDate, setCateringDate] = useState('');
  const [cateringPeople, setCateringPeople] = useState<number | ''>(30);

  // Retreat specific
  const [retreatTitle, setRetreatTitle] = useState(
    (pData.retreatTitle as string) || 'Weekend of Silent Discernment & Contemplation'
  );
  const [retreatType, setRetreatType] = useState<'Individual' | 'Group'>('Individual');
  const [preferredDate, setPreferredDate] = useState('');
  const [participantsCount, setParticipantsCount] = useState<number | ''>(1);

  // Product specific
  const [productName, setProductName] = useState(
    (pData.productName as string) || 'The African Bible'
  );
  const [productQuantity, setProductQuantity] = useState<number | ''>(1);

  // General specific
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      StorageService.addInquiry({
        type: selectedType,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        organization: organization.trim() || undefined,
        message: message.trim(),

        // Module details
        ...(selectedType === 'conference' && {
          facilityName,
          eventDate,
          startTime,
          endTime,
          attendeesCount: Number(attendeesCount) || 1,
          seatingArrangement,
          additionalRequirements,
        }),

        ...(selectedType === 'accommodation' && {
          checkInDate,
          checkOutDate,
          guestsCount: Number(guestsCount) || 1,
          accommodationType,
        }),

        ...(selectedType === 'catering' && {
          cateringType,
          eventType,
          eventDate: cateringDate,
          attendeesCount: Number(cateringPeople) || 1,
        }),

        ...(selectedType === 'retreat' && {
          retreatTitle,
          retreatType,
          preferredDate,
          participantsCount: Number(participantsCount) || 1,
        }),

        ...(selectedType === 'product' && {
          productName,
          productQuantity: Number(productQuantity) || 1,
        }),

        ...(selectedType === 'general' && {
          subject: subject.trim() || 'General Inquiry',
        }),
      });

      setSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Submission failed', err);
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setOrganization('');
    setMessage('');
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle className="w-9 h-9" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
          Inquiry Received Successfully
        </h3>
        <p className="text-sm text-stone-600 mb-6 leading-relaxed">
          Thank you, <strong>{fullName || 'esteemed visitor'}</strong>. Your inquiry has been logged into our administration system. Our team at Watakatifu Wote Senta will review your requirements and contact you shortly via phone or email.
        </p>

        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-left text-xs text-stone-600 mb-6 space-y-1.5">
          <div className="font-semibold text-stone-800 text-sm">Need immediate assistance?</div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-sky-700" />
            <span>Direct office: <strong>{INSTITUTION_INFO.phone}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-sky-700" />
            <span>Email: <strong>{INSTITUTION_INFO.email}</strong></span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-700 hover:bg-sky-800 text-white transition-colors"
          >
            Submit Another Inquiry
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  const typesConfig: { type: InquiryType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { type: 'conference', label: 'Conference Facility', icon: Building2 },
    { type: 'accommodation', label: 'Accommodation', icon: Bed },
    { type: 'catering', label: 'Catering Services', icon: Utensils },
    { type: 'retreat', label: 'Retreat / Ministry', icon: BookOpen },
    { type: 'product', label: 'Product Inquiry', icon: ShoppingBag },
    { type: 'general', label: 'General Inquiry', icon: HelpCircle },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-stone-200 overflow-hidden">
      {/* Type Selector Tabs */}
      <div className="bg-stone-50/80 border-b border-stone-200 p-2 sm:p-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 px-1">
          Select Inquiry or Service Type:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5">
          {typesConfig.map(({ type, label, icon: Icon }) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-center ${
                  isSelected
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-sky-200' : 'text-stone-400'}`} />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
        {/* Dynamic Fields Based on Type */}
        {selectedType === 'conference' && (
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-4">
            <h4 className="font-serif font-bold text-sky-900 text-base flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-700" />
              <span>Conference Facility Details</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Conference Facility <span className="text-rose-500">*</span>
                </label>
                <select
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                  required
                >
                  <option value="St. Bakhita Conference Hall">St. Bakhita (8–10 Pax - KES 4,000)</option>
                  <option value="St. Julian Conference Hall">St. Julian (40–55 Pax - KES 8,000)</option>
                  <option value="St. Bernard Main Hall">St. Bernard (55–100 Pax - KES 15,000 PA incl)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Event Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={eventDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Time Slot (Start to End)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                  />
                  <span className="text-stone-400">to</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Expected Attendees
                </label>
                <input
                  type="number"
                  min="1"
                  max="155"
                  value={attendeesCount}
                  onChange={(e) => setAttendeesCount(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 45"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Seating Arrangement Style
                </label>
                <select
                  value={seatingArrangement}
                  onChange={(e) => setSeatingArrangement(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Classroom">Classroom Style</option>
                  <option value="Boardroom">Boardroom Style</option>
                  <option value="Theater">Theater / Assembly Style</option>
                  <option value="U-Shape">U-Shape Discussion Style</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Equipment / Additional Needs
                </label>
                <input
                  type="text"
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Projector, PA system, tea catering..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {selectedType === 'accommodation' && (
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-4">
            <h4 className="font-serif font-bold text-amber-900 text-base flex items-center gap-2">
              <Bed className="w-4 h-4 text-amber-700" />
              <span>Accommodation Requirements</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Check-in Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Check-out Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="62"
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 2"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Accommodation Preference
                </label>
                <select
                  value={accommodationType}
                  onChange={(e) => setAccommodationType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Guest House Self-Contained Apartment">All Saints Guest House Apartment (6 self-contained units)</option>
                  <option value="Centre Main Residential Wing">Centre Main Residential Wing (Up to 62 beds)</option>
                  <option value="Visiting Clergy / Facilitator Quarters">Visiting Clergy / Retreat Director Quarters</option>
                  <option value="Not Sure / Please Advise">Not Sure / Please Advise</option>
                </select>
              </div>
            </div>
            <p className="text-[11px] text-amber-800 italic">
              Note: Accommodation bookings are inquiry-based. Specific room inventory and rates are confirmed by the hospitality office.
            </p>
          </div>
        )}

        {selectedType === 'catering' && (
          <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 space-y-4">
            <h4 className="font-serif font-bold text-orange-900 text-base flex items-center gap-2">
              <Utensils className="w-4 h-4 text-orange-700" />
              <span>Catering Service Inquiry</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Service Category
                </label>
                <select
                  value={cateringType}
                  onChange={(e) => setCateringType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                >
                  <option value="Conference Catering & Tea Breaks">Conference Catering & Tea Breaks</option>
                  <option value="Retreatant & Spiritual Fasting Hospitality">Retreatant & Spiritual Fasting Hospitality</option>
                  <option value="Event & Parish Feast Celebrations">Event & Parish Feast Celebrations</option>
                  <option value="Private Group & Committee Dining">Private Group & Committee Dining</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Event / Function Date
                </label>
                <input
                  type="date"
                  value={cateringDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setCateringDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Estimated Number of People
                </label>
                <input
                  type="number"
                  min="5"
                  value={cateringPeople}
                  onChange={(e) => setCateringPeople(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 50"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Event Nature
                </label>
                <input
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="e.g. Diocesan meeting, wedding reception, seminar"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {selectedType === 'retreat' && (
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-4">
            <h4 className="font-serif font-bold text-sky-900 text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-700" />
              <span>Retreat or Formation Registration</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Retreat / Seminar Program
                </label>
                <select
                  value={retreatTitle}
                  onChange={(e) => setRetreatTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                >
                  <option value="Weekend of Silent Discernment & Contemplation">Weekend of Silent Discernment & Contemplation</option>
                  <option value="Parish Pastoral Council & Ministry Leadership Retreat">Parish Pastoral Council Leadership Retreat</option>
                  <option value="Annual Clergy Recollection & Spiritual Renewal">Annual Clergy Recollection</option>
                  <option value="Certificate in Catechetics & Pastoral Evangelization">Certificate in Catechetics</option>
                  <option value="Catholic Family Life & Marriage Enrichment Seminars">Catholic Family Life Seminars</option>
                  <option value="Custom Private Group Retreat">Custom Private Group Retreat (According to our plans)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Retreat Format
                </label>
                <select
                  value={retreatType}
                  onChange={(e) => setRetreatType(e.target.value as 'Individual' | 'Group')}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                >
                  <option value="Individual">Individual Retreatant</option>
                  <option value="Group">Parish / Group Retreat</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Number of Participants
                </label>
                <input
                  type="number"
                  min="1"
                  value={participantsCount}
                  onChange={(e) => setParticipantsCount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {selectedType === 'product' && (
          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-4">
            <h4 className="font-serif font-bold text-purple-900 text-base flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-700" />
              <span>Products Catalogue Inquiry</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Product Name / Title
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. African Bible, Rosary, Daily Missal"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Quantity Required
                </label>
                <input
                  type="number"
                  min="1"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                />
              </div>
            </div>
            <p className="text-[11px] text-purple-800 italic">
              Purchases are fulfilled directly at our Ngong centre or arranged offline via phone/email with our resource coordinator, Naiterra Lanoi Winnie.
            </p>
          </div>
        )}

        {selectedType === 'general' && (
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
            <h4 className="font-serif font-bold text-stone-900 text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-stone-700" />
              <span>General Inquiry</span>
            </h4>
            <div className="text-xs">
              <label className="block font-semibold text-stone-700 mb-1">
                Subject <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What would you like to inquire about?"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs"
                required
              />
            </div>
          </div>
        )}

        {/* Contact Info (Always Required) */}
        <div className="space-y-4 pt-2 border-t border-stone-200">
          <h4 className="font-serif font-bold text-stone-900 text-base">
            Your Contact Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Mwangi or Sr. Mary"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Phone Number (Kenyan or Intl) <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Organization / Parish / Congregation (Optional)
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. St. Joseph Parish, Caritas, NGO"
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 text-xs">
              Additional Notes or Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us any particular requirements or questions regarding your visit or inquiry..."
              className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-800 text-xs focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-stone-500">
            Submissions are routed directly to Fr Charles Ndemange and David Inoti.
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors w-1/2 sm:w-auto text-center"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-all shadow-sm w-full sm:w-auto disabled:opacity-50 active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
