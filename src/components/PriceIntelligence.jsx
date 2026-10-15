import React, { useState } from 'react';

const COMPARISON_PRODUCTS = [
  {
    id: 'jacket',
    label: 'ARCHIVAL JACKET',
    name: 'Distressed Moto Leather Jacket',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
    stores: [
      { store: 'Global Retail Flagship', price: '₹7,999', note: 'Standard full retail markup', type: 'RETAIL' },
      { store: 'Luxury Multi-Brand Portal', price: '₹6,499', note: 'Mid-season discount', type: 'ONLINE' },
      { store: 'Direct Brand Stockist', price: '₹5,199', note: 'Brand member price', type: 'D2C' },
      { store: 'Curated Pre-Loved Archive', price: '₹3,499', note: 'Verified Grade A condition', type: 'CURATED THRIFT' },
    ],
    bestPrice: '₹3,499',
    highestPrice: '₹7,999',
    savings: 'SAVE ₹4,500 (56%)',
  },
  {
    id: 'sneaker',
    label: 'SNEAKERS',
    name: 'Retro Platform Chunky Low',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=80',
    stores: [
      { store: 'Flagship Sneaker Boutique', price: '₹9,499', note: 'Original drop pricing', type: 'RETAIL' },
      { store: 'Major Ecommerce Portal', price: '₹7,999', note: 'Standard listing', type: 'ONLINE' },
      { store: 'Homegrown Resale Platform', price: '₹5,499', note: 'Deadstock condition', type: 'RESALE' },
      { store: 'Verified Pre-Loved Seller', price: '₹3,999', note: 'Condition 9.5/10 with box', type: 'CURATED THRIFT' },
    ],
    bestPrice: '₹3,999',
    highestPrice: '₹9,499',
    savings: 'SAVE ₹5,500 (58%)',
  },
  {
    id: 'bag',
    label: 'HANDBAG',
    name: 'Minimalist Calfskin Baguette',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=700&q=80',
    stores: [
      { store: 'Department Store Luxury', price: '₹8,990', note: 'Full MSRP sticker', type: 'RETAIL' },
      { store: 'Fashion Marketplace', price: '₹6,990', note: 'End of season tag', type: 'ONLINE' },
      { store: 'Artisanal Studio Partner', price: '₹4,990', note: 'Direct factory batch', type: 'D2C' },
      { store: 'Pre-Loved Vintage Hub', price: '₹2,899', note: 'Pristine vintage leather', type: 'CURATED THRIFT' },
    ],
    bestPrice: '₹2,899',
    highestPrice: '₹8,990',
    savings: 'SAVE ₹6,091 (68%)',
  },
  {
    id: 'hoodie',
    label: 'STREETWEAR',
    name: '500 GSM Heavyweight Boxy Hoodie',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80',
    stores: [
      { store: 'Imported Streetwear Importer', price: '₹5,499', note: 'High import surcharge', type: 'RETAIL' },
      { store: 'Multi-Brand Street Store', price: '₹4,299', note: 'Warehouse stock', type: 'ONLINE' },
      { store: 'Verified Direct Label', price: '₹3,299', note: 'Domestic production price', type: 'D2C' },
      { store: 'Curated Thrift Drop', price: '₹2,199', note: 'Single piece archive', type: 'CURATED THRIFT' },
    ],
    bestPrice: '₹2,199',
    highestPrice: '₹5,499',
    savings: 'SAVE ₹3,300 (60%)',
  }
];

export default function PriceIntelligence() {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const product = COMPARISON_PRODUCTS[selectedProductIndex];

  return (
    <section id="price" className="py-24 md:py-36 px-6 bg-theme-bg text-theme-text border-t border-theme-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
              <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
                06 — NEVER PAY RETAIL
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-[0.95]">
              NEVER PAY<br />
              <span className="text-[#FF6B02]">RETAIL.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-lg font-display font-bold text-theme-text">
              &ldquo;Same drip, less cash.&rdquo;
            </p>
            <p className="text-sm text-theme-muted font-normal leading-relaxed">
              Why pay {product.highestPrice} if NAVAYR helps you discover it for {product.bestPrice}? We search across retail, D2C brands, and verified pre-loved archives to reveal lower available prices.
            </p>
          </div>
        </div>

        {/* Product Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 justify-start">
          {COMPARISON_PRODUCTS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedProductIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                selectedProductIndex === idx
                  ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/25'
                  : 'bg-theme-card text-theme-muted hover:text-theme-text border border-theme-border'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Multi-Store Price Comparison Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
          
          {/* Left: Product Visual with Price Tag */}
          <div className="lg:col-span-5 relative aspect-[3/4] rounded-3xl overflow-hidden border border-theme-border bg-theme-surface shadow-2xl group">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[5%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-90 pointer-events-none"></div>

            {/* Savings Pill */}
            <div className="absolute top-4 right-4">
              <span className="text-xs font-mono font-black uppercase px-3 py-1.5 rounded-full bg-[#FF6B02] text-[#020108] shadow-lg shadow-[#FF6B02]/30">
                {product.savings}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-[10px] font-mono text-[#FF6B02] uppercase tracking-widest font-bold block">
                ONE PRODUCT • MULTIPLE SOURCES
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-theme-text">
                {product.name}
              </h3>
              <p className="text-xs font-mono text-theme-muted">
                Demo Price Intelligence Comparison
              </p>
            </div>
          </div>

          {/* Right: Multi-Store Price Ladder */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-theme-border">
              <span className="text-xs font-mono uppercase tracking-widest text-theme-muted">
                AVAILABLE OPTIONS DISCOVERED
              </span>
              <span className="text-[11px] font-mono text-[#FF6B02] font-bold">
                SORTED BY PRICE
              </span>
            </div>

            {product.stores.map((storeOption, idx) => {
              const isBest = storeOption.price === product.bestPrice;
              return (
                <div
                  key={storeOption.store}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    isBest
                      ? 'border-[#FF6B02] bg-[#FF6B02]/10 shadow-xl shadow-[#FF6B02]/10 ring-1 ring-[#FF6B02]/30 scale-[1.01]'
                      : 'border-theme-border bg-theme-card hover:border-theme-border-strong'
                  }`}
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded font-bold ${
                        isBest ? 'bg-[#FF6B02] text-[#020108]' : 'bg-theme-surface text-theme-muted'
                      }`}>
                        {storeOption.type}
                      </span>
                      <span className="text-xs sm:text-sm font-display font-bold text-theme-text">
                        {storeOption.store}
                      </span>
                    </div>
                    <p className="text-xs text-theme-muted font-normal">
                      {storeOption.note}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-xl sm:text-2xl font-display font-black block ${
                      isBest ? 'text-[#FF6B02]' : 'text-theme-text'
                    }`}>
                      {storeOption.price}
                    </span>
                    {isBest && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#FF6B02] font-bold">
                        ★ NAVAYR LOWER PICK
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Bottom Insight Card */}
            <div className="p-4 rounded-2xl bg-theme-surface border border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
              <span>DEMO COMPARISON ENGINE</span>
              <span className="text-theme-text font-bold">
                Potential Savings: {product.savings}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
