import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Filter,
  Maximize2,
} from 'lucide-react';
import { INITIAL_GALLERY } from '../data/initialData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Lightbox } from '../components/common/Lightbox';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Facilities',
    'Accommodation',
    'Catering',
    'Catholic Ministry',
    'Events',
    'Grounds',
  ];

  const filteredImages = INITIAL_GALLERY.filter((img) =>
    selectedCategory === 'All' ? true : img.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      <SectionHeader
        badge="Visual Gallery"
        title="Centre Grounds, Facilities & Sacred Spaces"
        subtitle="Explore authentic photography of our three conference halls, peaceful chapel, accommodation quarters, catering, and landscaped gardens in Ngong."
      />

      {/* Category Pills */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sky-700 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setActiveLightboxIndex(idx)}
            className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xs border border-stone-200 bg-stone-100"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider">
                  {img.category}
                </span>
                <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <h4 className="font-serif font-bold text-lg text-white mt-1 leading-snug">
                {img.title}
              </h4>
              <p className="text-xs text-stone-300 line-clamp-1 mt-0.5">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        currentIndex={activeLightboxIndex}
        onClose={() => setActiveLightboxIndex(null)}
        onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
      />
    </div>
  );
};
