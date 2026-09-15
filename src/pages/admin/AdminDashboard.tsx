import React, { useState, useEffect } from 'react';
import {
  Shield,
  Users,
  CalendarCheck,
  Building2,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Filter,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ChevronRight,
  LogOut,
  Save,
  MessageSquare,
  Lock,
  Search,
} from 'lucide-react';
import { StorageService } from '../../services/storageService';
import {
  AdminUser,
  InquiryItem,
  InquiryStatus,
  Product,
  AvailabilityEntry,
  AvailabilityStatus,
  ProductCategory,
} from '../../types';
import { Modal } from '../../components/common/Modal';

export const AdminDashboard: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser>(StorageService.getActiveUser());
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(StorageService.getStaffUsers());
  const [activeTab, setActiveTab] = useState<'inquiries' | 'availability' | 'products' | 'staff'>('inquiries');

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryItem[]>(StorageService.getInquiries());
  const [inquiryFilterType, setInquiryFilterType] = useState<string>('all');
  const [inquiryFilterStatus, setInquiryFilterStatus] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  // Availability / Booking Blocks State
  const [availabilityList, setAvailabilityList] = useState<AvailabilityEntry[]>(StorageService.getAvailability());
  const [newBookingDate, setNewBookingDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newBookingHall, setNewBookingHall] = useState<string>('St. Bakhita Conference Hall');
  const [newBookingGroup, setNewBookingGroup] = useState<string>('');
  const [newBookingStatus, setNewBookingStatus] = useState<AvailabilityStatus>('BOOKED');

  // Products State
  const [products, setProducts] = useState<Product[]>(StorageService.getProducts());
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Subscribe to changes
  useEffect(() => {
    const handleStorageChange = () => {
      setInquiries(StorageService.getInquiries());
      setAvailabilityList(StorageService.getAvailability());
      setProducts(StorageService.getProducts());
      setAdminUsers(StorageService.getStaffUsers());
      setCurrentUser(StorageService.getActiveUser());
    };

    window.addEventListener('wws_data_updated', handleStorageChange);
    return () => window.removeEventListener('wws_data_updated', handleStorageChange);
  }, []);

  const handleSwitchUser = (user: AdminUser) => {
    StorageService.setActiveUser(user.id);
    setCurrentUser(user);
  };

  // Inquiry Status Handler
  const handleUpdateInquiryStatus = (id: string, status: InquiryStatus, note?: string) => {
    StorageService.updateInquiryStatus(id, status, note);
    setInquiries(StorageService.getInquiries());
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status, adminNotes: note || selectedInquiry.adminNotes });
    }
  };

  // Add Facility Availability / Booking Block
  const handleAddBookingBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBookingDate || !newBookingHall || !newBookingGroup) return;

    const facilityId =
      newBookingHall.includes('Bakhita')
        ? 'st-bakhita'
        : newBookingHall.includes('Julian')
        ? 'st-julian'
        : 'st-bernard';

    StorageService.setFacilityAvailability(
      facilityId,
      newBookingHall,
      newBookingDate,
      newBookingStatus,
      `Reserved for ${newBookingGroup} (by ${currentUser?.name || 'Admin'})`
    );

    setAvailabilityList(StorageService.getAvailability());
    setNewBookingGroup('');
  };

  // Release booking block (set to AVAILABLE)
  const handleReleaseBooking = (entry: AvailabilityEntry) => {
    if (window.confirm(`Release reservation for ${entry.facilityName} on ${entry.date}?`)) {
      StorageService.setFacilityAvailability(
        entry.facilityId,
        entry.facilityName,
        entry.date,
        'AVAILABLE',
        'Released by administrator'
      );
      setAvailabilityList(StorageService.getAvailability());
    }
  };

  // Product Save
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.category) return;

    const prodToSave: Product = {
      id: editingProduct.id || `prod-${Date.now()}`,
      name: editingProduct.name,
      category: editingProduct.category as ProductCategory,
      priceKes: Number(editingProduct.priceKes) || 0,
      priceFormatted: editingProduct.priceKes
        ? `KES ${Number(editingProduct.priceKes).toLocaleString()}`
        : 'Price on inquiry',
      description: editingProduct.description || '',
      image:
        editingProduct.image ||
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      isAvailable: editingProduct.isAvailable ?? true,
      itemCode: editingProduct.itemCode || `WWS-${Math.floor(100 + Math.random() * 900)}`,
    };

    StorageService.saveProduct(prodToSave);
    setProducts(StorageService.getProducts());
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Delete this product from catalogue?')) {
      StorageService.deleteProduct(id);
      setProducts(StorageService.getProducts());
    }
  };

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesType = inquiryFilterType === 'all' || inq.type === inquiryFilterType;
    const matchesStatus = inquiryFilterStatus === 'all' || inq.status === inquiryFilterStatus;
    return matchesType && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header & Role Switcher */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            <Shield className="w-4 h-4" />
            <span>Watakatifu Wote Senta Administration</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Staff Management Portal
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Managing inquiries, facility calendar availability, and products for the Catholic Diocese of Ngong.
          </p>
        </div>

        {/* Current Active Staff User Box */}
        <div className="bg-stone-800/90 rounded-2xl p-4 border border-stone-700/80 shrink-0">
          <div className="text-[11px] uppercase font-bold text-stone-400 mb-1.5 flex items-center justify-between gap-4">
            <span>Signed In As:</span>
            <span className="text-sky-300 text-[10px] bg-sky-950 px-2 py-0.5 rounded border border-sky-800">
              {currentUser?.role.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="font-serif font-bold text-white text-base">
            {currentUser?.name}
          </div>
          <div className="text-xs text-stone-300">{currentUser?.title}</div>

          {/* Quick Role Switcher */}
          <div className="mt-3 pt-3 border-t border-stone-700">
            <label className="text-[10px] text-stone-400 block mb-1">Switch Staff Profile:</label>
            <select
              value={currentUser?.id}
              onChange={(e) => {
                const found = adminUsers.find((u) => u.id === e.target.value);
                if (found) handleSwitchUser(found);
              }}
              className="w-full text-xs bg-stone-900 border border-stone-600 rounded-lg px-2.5 py-1.5 text-stone-200 focus:ring-1 focus:ring-amber-400 focus:outline-hidden"
            >
              {adminUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.title})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center justify-start border-b border-stone-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
            activeTab === 'inquiries'
              ? 'border-sky-700 text-sky-900 bg-sky-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Inquiries Inbox ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('availability')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
            activeTab === 'availability'
              ? 'border-sky-700 text-sky-900 bg-sky-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Facility Calendar & Blocks ({availabilityList.filter(a => a.status === 'BOOKED').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-sky-700 text-sky-900 bg-sky-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Products Catalogue ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`py-3 px-5 text-xs sm:text-sm font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-2 ${
            activeTab === 'staff'
              ? 'border-sky-700 text-sky-900 bg-sky-50/50'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Directory</span>
        </button>
      </div>

      {/* TAB 1: INQUIRIES MANAGEMENT */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>

              <select
                value={inquiryFilterType}
                onChange={(e) => setInquiryFilterType(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-700"
              >
                <option value="all">All Types</option>
                <option value="conference">Conference</option>
                <option value="accommodation">Accommodation</option>
                <option value="catering">Catering</option>
                <option value="retreat">Retreat & Formation</option>
                <option value="product">Product</option>
                <option value="general">General</option>
              </select>

              <select
                value={inquiryFilterStatus}
                onChange={(e) => setInquiryFilterStatus(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-700"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Responded">Responded</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="text-xs text-stone-500 font-medium">
              Showing {filteredInquiries.length} of {inquiries.length} inquiries
            </div>
          </div>

          {/* Inquiries Table / Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredInquiries.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-stone-200 text-stone-400">
                No inquiries match your selected filters.
              </div>
            ) : (
              filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`bg-white rounded-2xl p-5 border transition-all shadow-2xs hover:shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    inq.status === 'New'
                      ? 'border-amber-300 bg-amber-50/20'
                      : inq.status === 'Completed'
                      ? 'border-emerald-300'
                      : 'border-stone-200'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          inq.status === 'New'
                            ? 'bg-amber-100 text-amber-800'
                            : inq.status === 'In Progress'
                            ? 'bg-sky-100 text-sky-800'
                            : inq.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inq.status === 'Responded'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {inq.status}
                      </span>

                      <span className="text-[10px] font-semibold text-stone-500 uppercase bg-stone-100 px-2 py-0.5 rounded">
                        {inq.type}
                      </span>

                      <span className="text-xs text-stone-400">
                        {new Date(inq.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-serif text-lg font-bold text-stone-900">
                        {inq.fullName}
                      </h4>
                      {inq.organization && (
                        <span className="text-xs text-stone-500 font-medium">
                          ({inq.organization})
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-stone-600 line-clamp-2 max-w-2xl">
                      {inq.facilityName && (
                        <span className="font-semibold text-sky-800 mr-2">
                          Facility: {inq.facilityName}
                        </span>
                      )}
                      {inq.eventDate && (
                        <span className="font-semibold text-stone-700 mr-2">
                          Date: {inq.eventDate}
                        </span>
                      )}
                      {inq.retreatTitle && (
                        <span className="font-semibold text-amber-800 mr-2">
                          Retreat: {inq.retreatTitle}
                        </span>
                      )}
                      {inq.productName && (
                        <span className="font-semibold text-purple-800 mr-2">
                          Product: {inq.productName}
                        </span>
                      )}
                      {inq.message || inq.additionalRequirements || 'No additional message.'}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                      <a
                        href={`tel:${inq.phone}`}
                        className="inline-flex items-center gap-1 text-sky-800 hover:underline font-semibold"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{inq.phone}</span>
                      </a>
                      <a
                        href={`mailto:${inq.email}`}
                        className="inline-flex items-center gap-1 text-stone-600 hover:underline"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{inq.email}</span>
                      </a>
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-700 hover:underline font-medium"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp Lead</span>
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
                    >
                      View Details
                    </button>

                    <select
                      value={inq.status}
                      onChange={(e) =>
                        handleUpdateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                      }
                      className="text-xs bg-white border border-stone-300 rounded-xl px-2.5 py-2 text-stone-700 font-medium"
                    >
                      <option value="New">Mark New</option>
                      <option value="In Progress">Mark In Progress</option>
                      <option value="Responded">Mark Responded</option>
                      <option value="Completed">Mark Completed</option>
                      <option value="Cancelled">Mark Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FACILITY CALENDAR & BOOKINGS */}
      {activeTab === 'availability' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Add Booking Block Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Manage Hall Availability Block
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Reserving a hall immediately updates the public Availability Matrix so potential clients see real-time booked dates for St. Bakhita, St. Julian, and St. Bernard.
            </p>

            <form onSubmit={handleAddBookingBlock} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Conference Hall:
                </label>
                <select
                  value={newBookingHall}
                  onChange={(e) => setNewBookingHall(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
                >
                  <option value="St. Bakhita Conference Hall">St. Bakhita (8–10 Pax)</option>
                  <option value="St. Julian Conference Hall">St. Julian (40–55 Pax)</option>
                  <option value="St. Bernard Main Hall">St. Bernard (55–100 Pax)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Booking Date:
                </label>
                <input
                  type="date"
                  value={newBookingDate}
                  onChange={(e) => setNewBookingDate(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Group / Client Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. St. Joseph Parish Council"
                  value={newBookingGroup}
                  onChange={(e) => setNewBookingGroup(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Calendar Status:
                </label>
                <select
                  value={newBookingStatus}
                  onChange={(e) => setNewBookingStatus(e.target.value as AvailabilityStatus)}
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
                >
                  <option value="BOOKED">BOOKED (Confirmed reservation)</option>
                  <option value="PENDING">PENDING (Tentative hold)</option>
                  <option value="BLOCKED">BLOCKED (Maintenance / Closed)</option>
                  <option value="AVAILABLE">AVAILABLE (Open for bookings)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Save Hall Booking Block</span>
              </button>
            </form>
          </div>

          {/* List of Existing Bookings */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Active Calendar Blocks ({availabilityList.filter(a => a.status !== 'AVAILABLE').length})
            </h3>

            <div className="space-y-3">
              {availabilityList
                .filter((a) => a.status !== 'AVAILABLE')
                .map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-sky-900">
                          {b.facilityName}
                        </span>
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-mono">
                          {b.date}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            b.status === 'BOOKED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                      {b.notes && (
                        <div className="text-xs text-stone-700 font-medium">
                          {b.notes}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleReleaseBooking(b)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-stone-200"
                      title="Release booking"
                    >
                      Release Block
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCTS CATALOGUE EDITOR */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Products Catalogue Inventory
              </h3>
              <p className="text-xs text-stone-600">
                Managed primarily by Naiterra Lanoi Winnie (Products Catalogue Editor).
              </p>
            </div>

            <button
              onClick={() => {
                setEditingProduct({
                  name: '',
                  category: 'Religious Books',
                  priceKes: 1000,
                  description: '',
                  isAvailable: true,
                  image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
                });
                setIsProductModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden bg-stone-100 relative">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {prod.category}
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <div className="text-xs text-stone-400 font-mono">
                      {prod.itemCode || 'SKU'}
                    </div>
                    <h4 className="font-serif font-bold text-base text-stone-900 line-clamp-1">
                      {prod.name}
                    </h4>
                    <div className="text-xs font-bold text-sky-800">
                      {prod.priceFormatted}
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-2 pt-1">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-stone-100">
                  <span
                    className={`text-[11px] font-semibold ${
                      prod.isAvailable ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {prod.isAvailable ? 'In Stock' : 'Out of Stock'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(prod);
                        setIsProductModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 hover:text-sky-700 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 rounded-lg text-stone-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STAFF DIRECTORY */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#E3DAC9] space-y-2">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Institutional Leadership & Content Roles
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-3xl">
              Watakatifu Wote Senta functions under specific administrative custodianship, with designated staff members responsible for spiritual administration, hospitality facilities, and promotional catalogue services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminUsers.map((member) => (
              <div
                key={member.id}
                className={`bg-white rounded-3xl p-6 border shadow-xs flex flex-col justify-between ${
                  currentUser?.id === member.id
                    ? 'border-sky-500 ring-2 ring-sky-200'
                    : 'border-stone-200'
                }`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-serif text-xl font-bold">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                      {member.role.replace('_', ' ')}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-stone-900 mt-1.5">
                      {member.name}
                    </h4>
                    <div className="text-xs font-semibold text-stone-600 mt-0.5">
                      {member.title}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-stone-400" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  {currentUser?.id === member.id ? (
                    <div className="text-xs font-bold text-sky-700 bg-sky-50 py-2 rounded-xl text-center">
                      Currently Active Profile
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSwitchUser(member)}
                      className="w-full py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors"
                    >
                      Switch to this Profile
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry Details - ${selectedInquiry.fullName}`}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-stone-400 block font-semibold">Service Type:</span>
                <span className="font-bold text-stone-900 uppercase">
                  {selectedInquiry.type}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-semibold">Status:</span>
                <span className="font-bold text-sky-800 uppercase">
                  {selectedInquiry.status}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block font-semibold">Contact Phone:</span>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="font-bold text-sky-700 hover:underline"
                >
                  {selectedInquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-stone-400 block font-semibold">Email:</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="font-bold text-sky-700 hover:underline break-all"
                >
                  {selectedInquiry.email}
                </a>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="font-bold text-stone-800 uppercase text-[11px]">
                Specific Requirements
              </div>
              {selectedInquiry.facilityName && (
                <div>Facility Requested: <strong>{selectedInquiry.facilityName}</strong></div>
              )}
              {selectedInquiry.eventDate && (
                <div>Preferred Date: <strong>{selectedInquiry.eventDate}</strong></div>
              )}
              {selectedInquiry.attendeesCount && (
                <div>Estimated Attendees: <strong>{selectedInquiry.attendeesCount} pax</strong></div>
              )}
              {selectedInquiry.retreatTitle && (
                <div>Retreat Program: <strong>{selectedInquiry.retreatTitle}</strong></div>
              )}
              {selectedInquiry.productName && (
                <div>Product Item: <strong>{selectedInquiry.productName}</strong></div>
              )}
            </div>

            <div>
              <div className="text-xs font-semibold text-stone-700 mb-1">
                Client Message:
              </div>
              <p className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
                {selectedInquiry.message || selectedInquiry.additionalRequirements || 'No additional message.'}
              </p>
            </div>

            {/* Admin Notes */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Internal Follow-Up Notes:
              </label>
              <textarea
                defaultValue={selectedInquiry.adminNotes || ''}
                onBlur={(e) =>
                  handleUpdateInquiryStatus(
                    selectedInquiry.id,
                    selectedInquiry.status,
                    e.target.value
                  )
                }
                placeholder="Add note on quote sent, deposit received, or priest confirmation..."
                className="w-full text-xs bg-white border border-stone-300 rounded-xl p-3 focus:ring-1 focus:ring-sky-500"
                rows={3}
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="px-3 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Client</span>
                </a>
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 rounded-xl bg-stone-200 text-stone-800 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Product Edit / Add Modal */}
      {isProductModalOpen && editingProduct && (
        <Modal
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          title={editingProduct.id ? 'Edit Product Catalogue Item' : 'Add New Catalogue Item'}
          maxWidth="md"
        >
          <form onSubmit={handleSaveProduct} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Item Title:
              </label>
              <input
                type="text"
                value={editingProduct.name || ''}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Category:
                </label>
                <select
                  value={editingProduct.category || 'Religious Books'}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value as ProductCategory,
                    })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
                >
                  <option value="Religious Books">Religious Books</option>
                  <option value="Prayer Materials">Prayer Materials</option>
                  <option value="Gift Shop Items">Gift Shop Items</option>
                  <option value="Devotional Items">Devotional Items</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Price (KES):
                </label>
                <input
                  type="number"
                  value={editingProduct.priceKes || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      priceKes: Number(e.target.value),
                    })
                  }
                  className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Description:
              </label>
              <textarea
                value={editingProduct.description || ''}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                rows={3}
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Image URL:
              </label>
              <input
                type="text"
                value={editingProduct.image || ''}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, image: e.target.value })
                }
                className="w-full text-xs bg-stone-50 border border-stone-300 rounded-xl p-2.5"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="inStockCheck"
                checked={editingProduct.isAvailable ?? true}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, isAvailable: e.target.checked })
                }
                className="rounded border-stone-300 text-sky-700"
              />
              <label htmlFor="inStockCheck" className="text-xs text-stone-700 font-medium">
                Mark as Available in Inventory
              </label>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={() => {
                  setIsProductModalOpen(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold shadow-xs"
              >
                Save Product
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
