export type UserRole = 'primary_admin' | 'hospitality_editor' | 'ministry_editor' | 'products_editor';

export interface AdminUser {
  id: string;
  name: string;
  title: string;
  role: UserRole;
  email: string;
  avatar?: string;
  permissions: {
    hospitality: boolean;
    ministry: boolean;
    products: boolean;
    inquiries: boolean;
    systemAdmin: boolean;
  };
}

export type AvailabilityStatus = 'AVAILABLE' | 'PENDING' | 'BOOKED' | 'BLOCKED';

export interface ConferenceFacility {
  id: string;
  name: string;
  capacityMin: number;
  capacityMax: number;
  priceKes: number;
  priceNote?: string;
  description: string;
  features: string[];
  seatingStyles: ('Classroom' | 'Boardroom' | 'U-Shape' | 'Theater')[];
  image: string;
  isActive: boolean;
}

export interface AvailabilityEntry {
  id: string;
  facilityId: string;
  facilityName: string;
  date: string; // YYYY-MM-DD
  timeSlot?: 'FULL_DAY' | 'MORNING' | 'AFTERNOON' | 'EVENING';
  status: AvailabilityStatus;
  notes?: string;
  bookedBy?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface AccommodationOption {
  id: string;
  name: string;
  category: string;
  capacityDesc: string;
  roomsCount?: number;
  priceEstimate?: string;
  description: string;
  amenities: string[];
  image: string;
  isAvailable: boolean;
  isPlaceholder?: boolean;
}

export interface CateringService {
  id: string;
  title: string;
  description: string;
  idealFor: string;
  image: string;
  includes: string[];
}

export interface LaundryServiceInfo {
  id: string;
  title: string;
  description: string;
  turnaroundTime: string;
  notes: string;
  isAvailable: boolean;
}

export interface MassSchedule {
  id: string;
  day: string;
  time: string;
  description: string;
  celebrationType: string;
  location: string;
  isSpecial?: boolean;
}

export interface RetreatItem {
  id: string;
  title: string;
  category: 'individual' | 'group' | 'seminar' | 'youth' | 'clergy';
  targetAudience: string;
  description: string;
  startDate?: string;
  endDate?: string;
  duration: string;
  requirements: string[];
  feeKes?: number;
  feeNote?: string;
  image: string;
  isPublished: boolean;
}

export interface FormationProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  schedule?: string;
  requirements: string[];
  feeKes?: number;
  feeNote?: string;
  image: string;
  isPublished: boolean;
}

export type ProductCategory = 'Religious Books' | 'Prayer Materials' | 'Gift Shop Items' | 'Devotional Items';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  priceKes?: number;
  priceFormatted?: string;
  image: string;
  isAvailable: boolean;
  itemCode?: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  image: string;
  isPast?: boolean;
  registrationOpen: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Facilities' | 'Accommodation' | 'Catering' | 'Catholic Ministry' | 'Events' | 'Grounds';
  url: string;
  caption: string;
}

export type InquiryType =
  | 'conference'
  | 'accommodation'
  | 'catering'
  | 'retreat'
  | 'product'
  | 'general';

export type InquiryStatus = 'New' | 'In Progress' | 'Responded' | 'Completed' | 'Cancelled';

export interface InquiryItem {
  id: string;
  type: InquiryType;
  status: InquiryStatus;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  organization?: string;
  message: string;
  adminNotes?: string;

  // Specific optional fields
  facilityName?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  attendeesCount?: number;
  seatingArrangement?: string;
  additionalRequirements?: string;

  checkInDate?: string;
  checkOutDate?: string;
  guestsCount?: number;
  accommodationType?: string;

  cateringType?: string;
  eventType?: string;

  retreatTitle?: string;
  retreatType?: 'Individual' | 'Group';
  preferredDate?: string;
  participantsCount?: number;

  productName?: string;
  productQuantity?: number;

  subject?: string;
}
