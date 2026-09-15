import React, { useState } from 'react';
import {
  ShoppingBag,
  Filter,
  Search,
  BookOpen,
  Eye,
  Info,
  CheckCircle2,
  Phone,
  Mail,
  X,
} from 'lucide-react';
import { ProductCategory, Product } from '../types';
import { INITIAL_PRODUCTS, INSTITUTION_INFO } from '../data/initialData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Modal } from '../components/common/Modal';

interface ProductsPageProps {
  onOpenInquiry: (defaultType?: string, prefill?: Record<string, string | number>) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: string[] = [
    'All',
    'Religious Books',
    'Prayer Materials',
    'Gift Shop Items',
    'Devotional Items',
  ];

  const filteredProducts = INITIAL_PRODUCTS.filter((prod) => {
    const matchesCategory =
      selectedCategory === 'All' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SectionHeader
        badge="Products Catalogue"
        title="Catholic Books, Devotional & Gift Items"
        subtitle="Browse our curated collection of liturgical books, Bibles, prayer companions, rosaries, and sacramental gifts. Inquire or purchase directly at our Ngong centre."
      />

      {/* Notice Banner: Catalogue-Only Offline Model */}
      <div className="bg-[#FAF8F5] border border-[#E3DAC9] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-stone-700">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-stone-900 block text-sm">
              Catalogue & Offline Inquiry Notice
            </span>
            <span>
              This is a view-only catalogue. Inquiries and purchases are fulfilled directly at our office in Ngong or arranged via phone/email with our resource coordinator, Naiterra Lanoi Winnie.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${INSTITUTION_INFO.phone}`}
            className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 font-semibold text-stone-800 text-xs inline-flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-sky-700" />
            <span>{INSTITUTION_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Category Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Bibles, rosaries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
          <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h4 className="font-serif text-lg font-bold text-stone-800">
            No products found in this category
          </h4>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switch back to "All" to browse the full catalogue.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-stone-800 text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-stone-100 group">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                    {prod.category}
                  </div>
                  {prod.priceFormatted && (
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-sky-900 font-bold px-2.5 py-1 rounded-lg text-xs shadow-xs">
                      {prod.priceFormatted}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {prod.itemCode && (
                    <span className="text-[10px] font-mono text-stone-400 block mb-1">
                      SKU: {prod.itemCode}
                    </span>
                  )}
                  <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug mb-2 line-clamp-2">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => setSelectedProduct(prod)}
                  className="w-full py-2 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() =>
                    onOpenInquiry('product', {
                      productName: prod.name,
                      quantity: 1,
                    })
                  }
                  className="w-full py-2 px-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold transition-colors shadow-2xs text-center"
                >
                  Make an Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Modal
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          title={selectedProduct.name}
          maxWidth="lg"
        >
          <div className="space-y-4">
            <div className="h-64 w-full rounded-xl overflow-hidden bg-stone-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-100 px-2.5 py-1 rounded">
                {selectedProduct.category}
              </span>
              <span className="font-serif text-2xl font-bold text-stone-900 text-sky-950">
                {selectedProduct.priceFormatted || 'Price on inquiry'}
              </span>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed">
              {selectedProduct.description}
            </p>

            {selectedProduct.itemCode && (
              <div className="text-xs text-stone-500">
                Product Code / Reference: <strong>{selectedProduct.itemCode}</strong>
              </div>
            )}

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="font-semibold text-stone-800">How to purchase:</div>
              <p>
                Submit an inquiry below or contact Naiterra Lanoi Winnie (Products Catalogue Editor) at <strong>{INSTITUTION_INFO.phone}</strong> or <strong>{INSTITUTION_INFO.email}</strong>.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  const prod = selectedProduct;
                  setSelectedProduct(null);
                  onOpenInquiry('product', {
                    productName: prod.name,
                    quantity: 1,
                  });
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs shadow-xs text-center"
              >
                Inquire for {selectedProduct.name}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
