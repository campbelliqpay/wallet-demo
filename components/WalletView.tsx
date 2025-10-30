'use client';

import React, { useState } from 'react';
import CheckoutInstructions from './CheckoutInstructions';
import QRScanner from './QRScanner';

export default function WalletView() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [productFilter, setProductFilter] = useState<'active' | 'expired' | 'future'>('active');
  const [currentView, setCurrentView] = useState<'offers' | 'program' | 'help'>('offers');

  const stores = [
    { name: 'Acme Markets', logo: 'ACME' },
    { name: 'Giant Food', logo: 'GIANT' },
    { name: 'Safeway', logo: 'SAFEWAY' },
    { name: 'Kroger', logo: 'KROGER' },
  ];

  const productsData = {
    active: [
      {
        id: 1,
        title: '$50 Nutrition Essentials',
        description: 'This offer is good towards the purchase of Nutrition Essentials, up to $50 value.',
        balance: 50,
        expires: 'Dec 31, 2025',
        icon: 'image'
      },
      {
        id: 2,
        title: '$100 Grocery Support',
        description: 'This offer is good towards the purchase of groceries and essential household items, up to $100 value.',
        balance: 100,
        expires: 'Mar 15, 2026',
        icon: 'cart'
      }
    ],
    expired: [
      {
        id: 3,
        title: '$25 Health & Wellness',
        description: 'This offer was good towards health and wellness products.',
        balance: 0,
        expires: 'Sep 30, 2024',
        icon: 'image'
      }
    ],
    future: [
      {
        id: 4,
        title: '$75 Holiday Bonus',
        description: 'This offer will be available for holiday shopping starting November 2025.',
        balance: 75,
        expires: 'Starts: Nov 1, 2025',
        icon: 'cart'
      }
    ]
  };

  const currentProducts = productsData[productFilter];

  const handleStoreSelect = (store: string) => {
    setSelectedStore(store);
    setShowStoreDropdown(false);
    setShowCheckout(true);
  };

  return (
    <>
      <div className="relative w-full h-full bg-white flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 pt-12 pb-3 flex items-center justify-between sticky top-0 z-10">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
            iQpay
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 border-2 border-gray-300 rounded-full text-gray-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            <span className="text-sm font-medium">English</span>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Card Display */}
        <div className="px-6 py-4">
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 rounded-2xl p-5 shadow-xl">
            <div className="text-white text-lg font-bold mb-4">iQpay</div>
            <div className="text-white text-lg font-mono tracking-wider mb-5">
              6103 8040 0273 7944 587
            </div>
            <div className="flex items-end justify-between">
              <div className="text-white text-base font-semibold">Abby Selbeck</div>
              <div className="bg-[#e87722] text-white px-3 py-1 rounded-md">
                <span className="text-xs font-semibold">Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Where are you shopping */}
        <div className="px-6 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">Where are you shopping?</span>
          </div>
          <button
            onClick={() => setShowStoreDropdown(true)}
            className="w-full bg-white border-2 border-gray-300 rounded-full px-4 py-3 flex items-center gap-2 text-left hover:border-blue-500 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="flex-1 text-sm text-gray-500">53 Stores available. Search here...</span>
            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Products Section */}
        <div className="flex-1 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">Products</h2>
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{currentProducts.length}</span>
            </div>
            <div className="flex items-center gap-1 bg-gray-200 rounded-full p-1">
              <button
                onClick={() => setProductFilter('active')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  productFilter === 'active' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setProductFilter('expired')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  productFilter === 'expired' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Expired
              </button>
              <button
                onClick={() => setProductFilter('future')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  productFilter === 'future' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Future
              </button>
            </div>
          </div>

          {/* Product Cards */}
          {currentProducts.map((product, index) => (
            <div key={product.id} className={`bg-white rounded-xl overflow-hidden shadow-md ${index > 0 ? 'mt-3' : ''}`}>
              {/* Balance Bar */}
              <div className={`${productFilter === 'expired' ? 'bg-red-50 border-red-500' : productFilter === 'future' ? 'bg-blue-50 border-blue-500' : 'bg-green-50 border-green-500'} border-t-2 border-b-2 px-4 py-2 flex items-center justify-between`}>
                <div className={`flex items-center gap-2 ${productFilter === 'expired' ? 'text-red-700' : productFilter === 'future' ? 'text-blue-700' : 'text-green-700'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-semibold">{productFilter === 'expired' ? 'Expired Balance' : productFilter === 'future' ? 'Scheduled Balance' : 'Available Balance'}</span>
                </div>
                <span className={`${productFilter === 'expired' ? 'text-red-700' : productFilter === 'future' ? 'text-blue-700' : 'text-green-700'} font-bold text-lg`}>${product.balance.toFixed(2)}</span>
              </div>

              <div className="p-4 flex gap-3">
                {/* Product Image */}
                <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {product.icon === 'cart' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    )}
                  </svg>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-0.5">{product.title}</h3>
                  <p className={`text-xs font-medium mb-1 ${productFilter === 'expired' ? 'text-red-600' : productFilter === 'future' ? 'text-blue-600' : 'text-orange-600'}`}>
                    {productFilter === 'expired' ? 'Expired: ' : ''}{product.expires}
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-around sticky bottom-0 z-20">
          <button
            onClick={() => setCurrentView('offers')}
            className={`flex flex-col items-center gap-1 ${currentView === 'offers' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            <span className={`text-xs ${currentView === 'offers' ? 'font-bold' : 'font-semibold'}`}>MY OFFERS</span>
          </button>
          <button
            onClick={() => setCurrentView('program')}
            className={`flex flex-col items-center gap-1 ${currentView === 'program' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className={`text-xs ${currentView === 'program' ? 'font-bold' : 'font-semibold'}`}>MY PROGRAM</span>
          </button>
          <button
            onClick={() => setCurrentView('help')}
            className={`flex flex-col items-center gap-1 ${currentView === 'help' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-xs ${currentView === 'help' ? 'font-bold' : 'font-semibold'}`}>HELP</span>
          </button>
          <button
            onClick={() => setShowScanner(true)}
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-semibold">SCANNER</span>
          </button>
        </div>

        {/* Store Dropdown */}
        {showStoreDropdown && (
          <div className="absolute inset-0 bg-black/50 z-30" onClick={() => setShowStoreDropdown(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 transform transition-transform duration-300 max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-base font-bold mb-3">Select Store</h3>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Search stores..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                />
              </div>
              <div className="space-y-2">
                {stores.map((store) => (
                  <button
                    key={store.name}
                    onClick={() => handleStoreSelect(store.name)}
                    className="w-full bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-500 rounded-xl p-3 text-left transition-all"
                  >
                    <div className="font-semibold text-gray-900 text-sm">{store.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Checkout Instructions */}
        {showCheckout && (
          <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShowCheckout(false)}>
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckoutInstructions
                isOpen={showCheckout}
                onClose={() => setShowCheckout(false)}
                onScanClick={() => setShowScanner(true)}
                storeName={selectedStore}
              />
            </div>
          </div>
        )}

        {/* QR Scanner */}
        {showScanner && (
          <div className="absolute inset-0 z-50">
            <QRScanner
              isOpen={showScanner}
              onClose={() => setShowScanner(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}
