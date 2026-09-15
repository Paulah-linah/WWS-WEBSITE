import {
  AdminUser,
  ConferenceFacility,
  AvailabilityEntry,
  AccommodationOption,
  CateringService,
  LaundryServiceInfo,
  MassSchedule,
  RetreatItem,
  FormationProgram,
  Product,
  EventItem,
  GalleryImage,
  InquiryItem,
  InquiryStatus,
  AvailabilityStatus,
} from '../types';
import {
  INITIAL_STAFF_USERS,
  INITIAL_FACILITIES,
  INITIAL_AVAILABILITY,
  INITIAL_ACCOMMODATION,
  INITIAL_CATERING,
  INITIAL_LAUNDRY,
  INITIAL_MASS_SCHEDULE,
  INITIAL_RETREATS,
  INITIAL_FORMATION,
  INITIAL_PRODUCTS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_INQUIRIES,
} from '../data/initialData';

const STORAGE_KEYS = {
  STAFF_USERS: 'wws_staff_users',
  ACTIVE_USER: 'wws_active_admin_user',
  FACILITIES: 'wws_facilities',
  AVAILABILITY: 'wws_availability',
  ACCOMMODATION: 'wws_accommodation',
  CATERING: 'wws_catering',
  LAUNDRY: 'wws_laundry',
  MASS_SCHEDULE: 'wws_mass_schedule',
  RETREATS: 'wws_retreats',
  FORMATION: 'wws_formation',
  PRODUCTS: 'wws_products',
  EVENTS: 'wws_events',
  GALLERY: 'wws_gallery',
  INQUIRIES: 'wws_inquiries',
};

const SYNC_EVENT = 'wws_data_updated';

function notifyChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  }
}

function getItem<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key}:`, err);
    return defaultVal;
  }
}

function setItem<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    notifyChange();
  } catch (err) {
    console.error(`Error writing ${key}:`, err);
  }
}

export const StorageService = {
  // Sync Listener
  subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener(SYNC_EVENT, callback);
    return () => window.removeEventListener(SYNC_EVENT, callback);
  },

  // Staff & Auth
  getStaffUsers(): AdminUser[] {
    return getItem(STORAGE_KEYS.STAFF_USERS, INITIAL_STAFF_USERS);
  },

  getActiveUser(): AdminUser {
    const users = this.getStaffUsers();
    const savedId = getItem<string | null>(STORAGE_KEYS.ACTIVE_USER, null);
    if (savedId) {
      const match = users.find((u) => u.id === savedId);
      if (match) return match;
    }
    return users[0]; // Default to Fr Charles Ndemange
  },

  setActiveUser(userId: string): void {
    setItem(STORAGE_KEYS.ACTIVE_USER, userId);
  },

  // Facilities
  getFacilities(): ConferenceFacility[] {
    return getItem(STORAGE_KEYS.FACILITIES, INITIAL_FACILITIES);
  },

  saveFacilities(items: ConferenceFacility[]): void {
    setItem(STORAGE_KEYS.FACILITIES, items);
  },

  updateFacility(updated: ConferenceFacility): void {
    const current = this.getFacilities();
    const next = current.map((f) => (f.id === updated.id ? updated : f));
    this.saveFacilities(next);
  },

  // Availability Matrix
  getAvailability(): AvailabilityEntry[] {
    return getItem(STORAGE_KEYS.AVAILABILITY, INITIAL_AVAILABILITY);
  },

  saveAvailability(entries: AvailabilityEntry[]): void {
    setItem(STORAGE_KEYS.AVAILABILITY, entries);
  },

  setFacilityAvailability(
    facilityId: string,
    facilityName: string,
    date: string,
    status: AvailabilityStatus,
    notes?: string
  ): void {
    const current = this.getAvailability();
    const existingIndex = current.findIndex(
      (a) => a.facilityId === facilityId && a.date === date
    );

    if (existingIndex >= 0) {
      current[existingIndex] = {
        ...current[existingIndex],
        status,
        notes: notes !== undefined ? notes : current[existingIndex].notes,
      };
      this.saveAvailability([...current]);
    } else {
      const newEntry: AvailabilityEntry = {
        id: `av-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        facilityId,
        facilityName,
        date,
        status,
        notes,
      };
      this.saveAvailability([newEntry, ...current]);
    }
  },

  // Accommodation
  getAccommodation(): AccommodationOption[] {
    return getItem(STORAGE_KEYS.ACCOMMODATION, INITIAL_ACCOMMODATION);
  },

  saveAccommodation(items: AccommodationOption[]): void {
    setItem(STORAGE_KEYS.ACCOMMODATION, items);
  },

  // Catering & Laundry
  getCatering(): CateringService[] {
    return getItem(STORAGE_KEYS.CATERING, INITIAL_CATERING);
  },

  getLaundry(): LaundryServiceInfo[] {
    return getItem(STORAGE_KEYS.LAUNDRY, INITIAL_LAUNDRY);
  },

  // Catholic Ministry (Mass, Retreats, Formation)
  getMassSchedule(): MassSchedule[] {
    return getItem(STORAGE_KEYS.MASS_SCHEDULE, INITIAL_MASS_SCHEDULE);
  },

  saveMassSchedule(items: MassSchedule[]): void {
    setItem(STORAGE_KEYS.MASS_SCHEDULE, items);
  },

  getRetreats(): RetreatItem[] {
    return getItem(STORAGE_KEYS.RETREATS, INITIAL_RETREATS);
  },

  saveRetreats(items: RetreatItem[]): void {
    setItem(STORAGE_KEYS.RETREATS, items);
  },

  saveRetreat(item: RetreatItem): void {
    const current = this.getRetreats();
    const index = current.findIndex((r) => r.id === item.id);
    if (index >= 0) {
      current[index] = item;
      this.saveRetreats([...current]);
    } else {
      this.saveRetreats([item, ...current]);
    }
  },

  deleteRetreat(id: string): void {
    const current = this.getRetreats();
    this.saveRetreats(current.filter((r) => r.id !== id));
  },

  getFormation(): FormationProgram[] {
    return getItem(STORAGE_KEYS.FORMATION, INITIAL_FORMATION);
  },

  saveFormation(items: FormationProgram[]): void {
    setItem(STORAGE_KEYS.FORMATION, items);
  },

  // Products
  getProducts(): Product[] {
    return getItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  saveProducts(items: Product[]): void {
    setItem(STORAGE_KEYS.PRODUCTS, items);
  },

  saveProduct(item: Product): void {
    const current = this.getProducts();
    const index = current.findIndex((p) => p.id === item.id);
    if (index >= 0) {
      current[index] = item;
      this.saveProducts([...current]);
    } else {
      this.saveProducts([item, ...current]);
    }
  },

  deleteProduct(id: string): void {
    const current = this.getProducts();
    this.saveProducts(current.filter((p) => p.id !== id));
  },

  // Events
  getEvents(): EventItem[] {
    return getItem(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },

  saveEvents(items: EventItem[]): void {
    setItem(STORAGE_KEYS.EVENTS, items);
  },

  saveEvent(item: EventItem): void {
    const current = this.getEvents();
    const index = current.findIndex((e) => e.id === item.id);
    if (index >= 0) {
      current[index] = item;
      this.saveEvents([...current]);
    } else {
      this.saveEvents([item, ...current]);
    }
  },

  deleteEvent(id: string): void {
    const current = this.getEvents();
    this.saveEvents(current.filter((e) => e.id !== id));
  },

  // Gallery
  getGallery(): GalleryImage[] {
    return getItem(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  },

  // Inquiries
  getInquiries(): InquiryItem[] {
    return getItem(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  },

  saveInquiries(items: InquiryItem[]): void {
    setItem(STORAGE_KEYS.INQUIRIES, items);
  },

  addInquiry(inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>): InquiryItem {
    const newInquiry: InquiryItem = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    const current = this.getInquiries();
    this.saveInquiries([newInquiry, ...current]);
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: InquiryStatus, adminNotes?: string): void {
    const current = this.getInquiries();
    const updated = current.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          adminNotes: adminNotes !== undefined ? adminNotes : item.adminNotes,
        };
      }
      return item;
    });
    this.saveInquiries(updated);
  },

  // Reset demo data helper
  resetToDefaults(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.FACILITIES);
    localStorage.removeItem(STORAGE_KEYS.AVAILABILITY);
    localStorage.removeItem(STORAGE_KEYS.ACCOMMODATION);
    localStorage.removeItem(STORAGE_KEYS.CATERING);
    localStorage.removeItem(STORAGE_KEYS.LAUNDRY);
    localStorage.removeItem(STORAGE_KEYS.MASS_SCHEDULE);
    localStorage.removeItem(STORAGE_KEYS.RETREATS);
    localStorage.removeItem(STORAGE_KEYS.FORMATION);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.STAFF_USERS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
    notifyChange();
  },
};
