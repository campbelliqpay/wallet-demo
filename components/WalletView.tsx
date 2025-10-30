'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import careSourceLogo from '@/images/caresource.png';
import CheckoutInstructions from './CheckoutInstructions';
import QRScanner from './QRScanner';

interface WalletViewProps {
  onStepChange?: (step: string) => void;
}

export default function WalletView({ onStepChange }: WalletViewProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [dobInput, setDobInput] = useState({ month: '', day: '', year: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [selectedStore, setSelectedStore] = useState('');
  const [productFilter, setProductFilter] = useState<'active' | 'expired' | 'future'>('active');
  const [actionFilter, setActionFilter] = useState<'rewards' | 'visits' | 'completed'>('rewards');
  const [currentView, setCurrentView] = useState<'cards' | 'offers' | 'program' | 'help' | 'scanner'>('cards');
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [isCardDetailView, setIsCardDetailView] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Check for stored authentication on mount
  useEffect(() => {
    const authData = localStorage.getItem('wallet_auth');
    if (authData) {
      const { expiry } = JSON.parse(authData);
      if (new Date().getTime() < expiry) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('wallet_auth');
      }
    }
  }, []);

  // Report current step to parent for UX map
  useEffect(() => {
    if (!onStepChange) return;

    if (!isAuthenticated) {
      onStepChange('Auth');
      return;
    }

    if (showScanner) {
      // Keep 'Scanner' as parent level when overlay open
      onStepChange('Scanner');
      return;
    }

    if (showInstructions) {
      onStepChange('Checkout Instructions');
      return;
    }

    if (selectedAction) {
      onStepChange(`Action Detail: ${selectedAction}`);
      return;
    }

    if (currentView === 'scanner') {
      onStepChange('Scanner');
      return;
    }

    if (currentView === 'offers') {
      onStepChange('My Actions');
      return;
    }
    if (currentView === 'program') {
      onStepChange('My Program');
      return;
    }
    if (currentView === 'help') {
      onStepChange('Help');
      return;
    }

    // Cards: list view -> My Cards; detail view -> specific card
    if (currentView === 'cards') {
      if (!isCardDetailView) {
        onStepChange('My Cards');
        return;
      }
      const cardStepMap: Record<number, string> = {
        1: 'OTC Card',
        2: 'Uber Card',
        3: 'Discover Card',
        4: 'Walmart Card'
      };
      onStepChange(cardStepMap[currentCard.id] || 'My Cards');
      return;
    }

    // Fallback
    onStepChange('My Cards');
  }, [onStepChange, isAuthenticated, currentView, isCardDetailView, showInstructions, showScanner, selectedAction]);

  const stores = [
    { name: 'Acme Markets', logo: 'ACME' },
    { name: 'Giant Food', logo: 'GIANT' },
    { name: 'Safeway', logo: 'SAFEWAY' },
    { name: 'Kroger', logo: 'KROGER' },
  ];

  const cards = [
    {
      id: 1,
      holderName: 'Abby Selbeck',
      cardNumber: '6103 8040 0273 7944 587',
      programName: 'Diaper Reward',
      gradient: 'from-purple-500 via-violet-400 to-purple-300',
      logo: '/images/otc badge.png'
    },
    {
      id: 2,
      holderName: 'Abby Selbeck',
      cardNumber: '5421 9876 5432 1098 234',
      programName: 'Transportation Assistance',
      gradient: 'from-gray-900 via-gray-800 to-black',
      logo: '/images/uber logo.svg'
    },
    {
      id: 3,
      holderName: 'Abby Selbeck',
      cardNumber: '4532 1122 3344 5566 778',
      programName: 'Rent Support',
      gradient: 'from-orange-600 via-orange-500 to-orange-400',
      logo: '/images/discover logo.jpg'
    },
    {
      id: 4,
      holderName: 'Abby Selbeck',
      cardNumber: '6011 2233 4455 6677 889',
      programName: 'Grocery Card',
      gradient: 'from-purple-700 via-violet-600 to-purple-500',
      logo: '/images/walmart logo.png'
    }
  ];

  const allProductsData = {
    1: {
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
    },
    2: {
      active: [
        {
          id: 5,
          title: '$150 Uber Rides',
          description: 'This benefit covers Uber and Uber Eats rides for commuting and meal delivery.',
          balance: 150,
          expires: 'Dec 31, 2025',
          icon: 'cart'
        }
      ],
      expired: [
        {
          id: 9,
          title: '$100 Uber Rides',
          description: 'This benefit was for Uber transportation services.',
          balance: 0,
          expires: 'Nov 30, 2024',
          icon: 'cart'
        }
      ],
      future: [
        {
          id: 6,
          title: '$200 Uber Rides',
          description: 'This benefit will be available for Uber transportation starting in Q1.',
          balance: 200,
          expires: 'Starts: Jan 1, 2026',
          icon: 'cart'
        }
      ]
    },
    3: {
      active: [
        {
          id: 7,
          title: '$1,500 Rent Assistance',
          description: 'This benefit covers monthly rent payments through Discover.',
          balance: 1500,
          expires: 'Dec 31, 2025',
          icon: 'image'
        },
        {
          id: 8,
          title: '$500 Utilities Support',
          description: 'This benefit is for utility bills including electric, water, and gas.',
          balance: 500,
          expires: 'Mar 31, 2026',
          icon: 'image'
        }
      ],
      expired: [],
      future: [
        {
          id: 10,
          title: '$1,800 Rent Assistance',
          description: 'This enhanced rent assistance will be available starting next year.',
          balance: 1800,
          expires: 'Starts: Jan 1, 2026',
          icon: 'image'
        }
      ]
    },
    4: {
      active: [
        {
          id: 11,
          title: '$200 Walmart Shopping',
          description: 'This benefit covers purchases at Walmart stores and Walmart.com.',
          balance: 200,
          expires: 'Dec 31, 2025',
          icon: 'cart'
        }
      ],
      expired: [],
      future: []
    }
  };

  const currentCard = cards[selectedCardIndex];
  const currentProducts = (allProductsData as any)[currentCard.id][productFilter];

  const handleStoreSelect = (store: string) => {
    setSelectedStore(store);
    setShowStoreDropdown(false);
  };

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    setIsCardDetailView(true);
  };

  const handleBackToWallet = () => {
    setIsCardDetailView(false);
  };

  const handleAuth = () => {
    // Validate contact info
    if (!contactInfo.trim()) {
      setAuthError('Please enter your phone number or email address');
      return;
    }

    // Basic validation for email or phone format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!emailRegex.test(contactInfo) && !phoneRegex.test(contactInfo.replace(/\D/g, ''))) {
      setAuthError('Please enter a valid email address or 10-digit phone number');
      return;
    }

    // For demo purposes, accepting any valid date format
    // In production, this would verify against actual DOB
    const { month, day, year } = dobInput;

    if (!month || !day || !year) {
      setAuthError('Please enter your complete date of birth');
      return;
    }

    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const yearNum = parseInt(year);

    if (monthNum < 1 || monthNum > 12) {
      setAuthError('Please enter a valid month (1-12)');
      return;
    }

    if (dayNum < 1 || dayNum > 31) {
      setAuthError('Please enter a valid day (1-31)');
      return;
    }

    if (yearNum < 1900 || yearNum > new Date().getFullYear()) {
      setAuthError('Please enter a valid year');
      return;
    }

    // Authentication successful
    setIsAuthenticated(true);
    setAuthError('');

    // Store authentication if remember me is checked
    if (rememberMe) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // 30 days from now
      localStorage.setItem('wallet_auth', JSON.stringify({
        expiry: expiryDate.getTime()
      }));
    }
  };

  // Security Check Screen
  if (!isAuthenticated) {
    return (
      <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-blue-500 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100 text-sm">
              Verify your identity to access your wallet
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Verify Your Identity</h2>
            <p className="text-sm text-gray-600 mb-6">
              Please enter your contact information and date of birth to continue
            </p>

            {/* Contact Info Input */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number or Email Address
              </label>
              <input
                type="text"
                placeholder="(555) 123-4567 or email@example.com"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base"
              />
            </div>

            {/* DOB Input Fields */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 mb-2">Date of Birth</label>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Month</label>
                <input
                  type="number"
                  placeholder="MM"
                  min="1"
                  max="12"
                  value={dobInput.month}
                  onChange={(e) => setDobInput({ ...dobInput, month: e.target.value })}
                  className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Day</label>
                <input
                  type="number"
                  placeholder="DD"
                  min="1"
                  max="31"
                  value={dobInput.day}
                  onChange={(e) => setDobInput({ ...dobInput, day: e.target.value })}
                  className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Year</label>
                <input
                  type="number"
                  placeholder="YYYY"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={dobInput.year}
                  onChange={(e) => setDobInput({ ...dobInput, year: e.target.value })}
                  className="w-full px-3 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center text-lg font-semibold"
                />
              </div>
            </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {authError}
                </p>
              </div>
            )}

            {/* Remember Me Checkbox */}
            <label className="flex items-center gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                Remember me for 30 days
              </span>
            </label>

            {/* Submit Button */}
            <button
              onClick={handleAuth}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md"
            >
              Access Wallet
            </button>

            {/* Security Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs font-semibold text-gray-900 mb-1">Your Security Matters</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    We use your date of birth to verify your identity and protect your account from unauthorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-full bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-6 pt-12 pb-4 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Image src={careSourceLogo} alt="CareSource" width={96} height={96} />
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

          {/* View Toggle - Only show on My Cards and My Actions pages */}
          {(currentView === 'cards' || currentView === 'offers') && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentView('cards');
                  setIsCardDetailView(false);
                }}
                className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
                  currentView === 'cards'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                My Cards
              </button>
              <button
                onClick={() => setCurrentView('offers')}
                className={`flex-1 py-2.5 rounded-lg font-semibold transition-colors ${
                  currentView === 'offers'
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                My Actions
              </button>
            </div>
          )}
        </div>

        {currentView === 'cards' && !isCardDetailView ? (
          /* Card List View */
          <>
            <div className="flex-1 px-6 py-4 overflow-y-auto">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`bg-gradient-to-br ${card.gradient} rounded-2xl shadow-xl cursor-pointer transition-transform duration-300 hover:-translate-y-1 relative`}
                  style={{
                    marginTop: index === 0 ? 0 : -80,
                    zIndex: (index + 1) + (hoveredIndex === index ? 100 : 0),
                    padding: '20px',
                    height: '200px' // standard card size
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-white text-sm font-semibold opacity-95">{card.programName}</div>
                    {card.logo ? (
                      <div className="bg-white rounded-lg p-2 flex items-center justify-center" style={{ width: '60px', height: '40px' }}>
                        <Image
                          src={card.logo}
                          alt={`${card.programName} logo`}
                          width={50}
                          height={30}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="text-white text-base font-semibold mb-1">{card.holderName}</div>
                  <div className="text-white text-base font-mono tracking-wider mb-5 drop-shadow-md">
                    {card.cardNumber}
                  </div>
                  {!card.logo && (
                    <div className="bg-[#e87722] text-white px-3 py-1 rounded-md inline-block">
                      <span className="text-xs font-semibold">Network</span>
                    </div>
                  )}
                </div>
              ))}
              <div className="h-24" />
            </div>
          </>
        ) : currentView === 'cards' && isCardDetailView ? (
          /* Card Detail View */
          <>
            {/* Back Button */}
            <div className="px-6 pt-4 pb-2">
              <button
                onClick={handleBackToWallet}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-semibold">Back to Wallet</span>
              </button>
            </div>

            {/* Selected Card */}
            <div className="px-6 py-4">
              <div className={`bg-gradient-to-br ${currentCard.gradient} rounded-2xl p-5 shadow-xl`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="text-white text-sm font-semibold opacity-95">{currentCard.programName}</div>
                  {currentCard.logo ? (
                    <div className="bg-white rounded-lg p-2 flex items-center justify-center" style={{ width: '60px', height: '40px' }}>
                      <Image
                        src={currentCard.logo}
                        alt={`${currentCard.programName} logo`}
                        width={50}
                        height={30}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="text-white text-base font-semibold mt-1 mb-1">{currentCard.holderName}</div>
                <div className="text-white text-base font-mono tracking-wider mt-1 mb-5">
                  {currentCard.cardNumber}
                </div>
                {!currentCard.logo && (
                  <div className="bg-[#e87722] text-white px-3 py-1 rounded-md inline-block">
                    <span className="text-xs font-semibold">Network</span>
                  </div>
                )}
              </div>
            </div>

            {/* Conditional Content: Shopping Selection and Action Buttons */}
            {currentCard.id === 1 ? (
              /* Employee Food Card - Shopping Selection */
              <div className="px-6 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Where are you shopping?</span>
                </div>
                <button
                  onClick={() => setShowStoreDropdown(true)}
                  className="w-full bg-white border-2 border-gray-300 rounded-full px-4 py-3 flex items-center gap-2 text-left hover:border-blue-500 transition-colors mb-4"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="flex-1 text-sm text-gray-500">
                    {selectedStore || '53 Stores available. Search here...'}
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Show Pay with Barcode button after store selection */}
                {selectedStore && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border-2 border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">🏪</div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Pay with this card at -</p>
                        <h3 className="text-lg font-bold text-blue-900">{selectedStore}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowInstructions(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      <span className="font-semibold">Show Checkout Instructions And Barcode</span>
                    </button>
                  </div>
                )}
              </div>
            ) : currentCard.id === 2 ? (
              /* Uber Card - Collapsed Button */
              <div className="px-6 mb-4">
                <button
                  onClick={() => setShowInstructions(true)}
                  className="w-full bg-black hover:bg-gray-900 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="font-semibold text-lg">Use Uber Payment</span>
                </button>
              </div>
            ) : currentCard.id === 3 ? (
              /* Discover Card - Collapsed Button */
              <div className="px-6 mb-4">
                <button
                  onClick={() => setShowInstructions(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="font-semibold text-lg">Use Discover Card</span>
                </button>
              </div>
            ) : (
              /* Walmart Card - Collapsed Button */
              <div className="px-6 mb-4">
                <button
                  onClick={() => setShowInstructions(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <span className="font-semibold text-lg">Pay with Barcode</span>
                </button>
              </div>
            )}

            {/* Products Section - Different for each card type */}
            {currentCard.id === 1 ? (
              /* Full Products Section for Employee Food Card */
              <div className="flex-1 bg-gray-50 px-6 py-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900">Products</h2>
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
                {currentProducts.map((product: any, index: number) => (
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
            ) : (
              /* Simple Balance Tile for Uber and Discover Cards */
              <div className="flex-1 bg-gray-50 px-6 py-4 overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Product</h2>
                <div className="bg-white rounded-xl overflow-hidden shadow-md">
                  {/* Balance Bar */}
                  <div className="bg-green-50 border-green-500 border-t-2 border-b-2 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-semibold">Available Balance</span>
                    </div>
                    <span className="text-green-700 font-bold text-lg">
                      ${currentProducts.reduce((sum: number, product: any) => sum + product.balance, 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {currentCard.id === 2 ? 'Uber Benefits' : currentCard.id === 3 ? 'Rent & Utilities Support' : 'Grocery Card'}
                    </h3>
                    <p className="text-xs text-orange-600 font-medium mb-2">
                      Expires: Dec 31, 2025
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {currentCard.id === 2
                        ? 'This benefit covers Uber and Uber Eats rides for commuting and meal delivery.'
                        : currentCard.id === 3
                        ? 'This benefit covers monthly rent payments and utility bills including electric, water, and gas.'
                        : 'This benefit covers purchases at participating grocery retailers for everyday essentials.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : currentView === 'offers' ? (
          /* My Actions Page */
          <div className="flex-1 px-6 py-6 overflow-y-auto">
            <div className="mb-4">
              <div className="flex bg-purple-100 rounded-full p-1 w-full">
                <button
                  onClick={() => setActionFilter('rewards')}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-colors ${
                    actionFilter === 'rewards' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Immediate Rewards
                </button>
                <button
                  onClick={() => setActionFilter('visits')}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-colors ${
                    actionFilter === 'visits' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Health Visits
                </button>
                <button
                  onClick={() => setActionFilter('completed')}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-full transition-colors ${
                    actionFilter === 'completed' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              {actionFilter === 'completed' ? 'Actions you have already completed' : 'Complete these health actions to earn rewards'}
            </p>

            {/* Action Items */}
            <div className="space-y-4">{actionFilter !== 'completed' ? (
              <>
              {/* Rewards tab */}
              {actionFilter === 'rewards' && (
              <>
              <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Report flu and COVID vaccines</h3>
                      <p className="text-sm text-gray-600">Report an eligible vaccine to earn your incentive.</p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">$15 towards groceries</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAction('immunizations')}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Report Immunization
                  </button>
                </div>
              </div>
              {/* Report Pregnancy */}

              {/* Report Pregnancy */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Report pregnancy</h3>
                      <p className="text-sm text-gray-600">Let us know about a pregnancy to unlock benefits.</p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">$10 towards diapers</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAction('pregnancy')}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Report Pregnancy
                  </button>
                </div>
              </div>

              {/* Health Survey */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">Take Health Survey</h3>
                      <p className="text-sm text-gray-600">Complete a short survey to receive a reward.</p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">$20 gym card</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAction('health-survey')}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Start Survey
                  </button>
                </div>
              </div>
              </>
              )}

              {/* Health Visits tab */}
              {actionFilter === 'visits' && (
              <>
                <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Annual Health Risk Assessment</h3>
                        <p className="text-sm text-gray-600">Complete your yearly assessment to identify risks and earn rewards.</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">$20</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAction('health-assessment')}
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Start Assessment
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-colors">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Schedule with your PCP</h3>
                        <p className="text-sm text-gray-600">Book and complete an annual checkup with your primary care physician.</p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">$50</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedAction('pcp-appointment')}
                      className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      Schedule Appointment
                    </button>
                  </div>
                </div>
              </>
              )}
              </>
            ) : (
              <>
              {/* Completed Actions */}
              {/* Completed: Get Flu Shot */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-green-200">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold text-green-600 uppercase">Completed</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Get Flu Shot
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Received annual flu vaccination
                      </p>
                      <p className="text-xs text-gray-500">
                        Completed: October 15, 2024
                      </p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
                        $15
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Completed: Blood Pressure Screening */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-green-200">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-semibold text-green-600 uppercase">Completed</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        Blood Pressure Screening
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Completed annual blood pressure check
                      </p>
                      <p className="text-xs text-gray-500">
                        Completed: September 8, 2024
                      </p>
                    </div>
                    <div className="ml-3 flex-shrink-0">
                      <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">
                        $10
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
            )}
            </div>

            {/* Info Footer */}
            <div className="bg-gray-50 rounded-xl p-4 mt-6">
              <p className="text-xs text-gray-500 text-center">
                Complete health actions to earn rewards that will be added to your benefit cards. Actions refresh annually.
              </p>
            </div>
          </div>
        ) : currentView === 'program' ? (
          /* My Program Page (CareSource Plan Information style) */
          <div className="flex-1 px-6 py-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Information</h2>

            {/* Hero */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-2xl p-5 shadow-sm mb-5">
              <h3 className="text-lg font-bold mb-1">CareSource Medicaid</h3>
              <p className="text-sm opacity-90">Cover what matters with extra benefits, rewards and tools for your family.</p>
            </div>

            {/* Tiles */}
            <div className="grid grid-cols-1 gap-4 mb-5">
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Rewards</h4>
                <p className="text-sm text-gray-600 mb-3">Get rewarded for healthy actions like vaccines, health surveys and checkups. Redeem instantly.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">Immediate rewards</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-semibold">Gift cards</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-semibold">Online shopping</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Benefits & Services</h4>
                <p className="text-sm text-gray-600 mb-3">Extra benefits beyond medical care, including dental, vision, pregnancy support and programs for moms & kids.</p>
                <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li>Diaper Reward and Grocery Card incentives</li>
                  <li>Dental, vision and pharmacy coverage</li>
                  <li>CareSource Life Services and job help</li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h4 className="text-sm font-bold text-gray-900 mb-1">Tools & Resources</h4>
                <p className="text-sm text-gray-600">Find a doctor, view prescriptions and manage your plan with CareSource MyLife.</p>
              </div>
            </div>

            {/* How to Enroll */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h4 className="text-sm font-bold text-gray-900 mb-3">How to Enroll</h4>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>Apply via Georgia Gateway to check Medicaid or PeachCare for Kids eligibility.</li>
                <li>Call 1-855-202-0729 (TTY: 1-800-255-0056 or 711) to learn about CareSource benefits.</li>
                <li>Enroll in Georgia Families and choose CareSource as your health plan.</li>
              </ol>
            </div>
          </div>
        ) : currentView === 'help' ? (
          /* Help Page */
          <div className="flex-1 px-6 py-6 overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Help & Support</h2>

            <div className="bg-white rounded-xl p-6 shadow-md mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">How do I use my benefits?</h4>
                  <p className="text-sm text-gray-600">Select your card, choose your retailer, and follow the checkout instructions to use your benefits.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Where can I shop?</h4>
                  <p className="text-sm text-gray-600">You can use your benefits at any participating retailer. Use the store selector to find locations near you.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">When does my balance expire?</h4>
                  <p className="text-sm text-gray-600">Each product shows its expiration date. Check your cards regularly to ensure you use your benefits before they expire.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Need More Help?</h3>
              <p className="text-sm text-gray-700 mb-3">
                Contact our support team for assistance with your account or benefits.
              </p>
              <p className="text-sm text-gray-700">
                Email: <a href="mailto:support@iqpay.com" className="text-blue-600 underline">support@iqpay.com</a><br />
                Phone: 1-800-XXX-XXXX
              </p>
            </div>
          </div>
        ) : currentView === 'scanner' ? (
          /* Scanner Page */
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
            <div className="w-full max-w-sm space-y-4">
              {/* Scanner Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-8">
                  <svg className="w-24 h-24 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Scanner</h2>
              <p className="text-center text-gray-600 text-sm mb-8">
                Scan QR codes to redeem your benefits or report missing products.
              </p>

              {/* Launch Scanner Button */}
              <button
                onClick={() => {
                  onStepChange && onStepChange('Launch Scanner');
                  setShowScanner(true);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-3 transition-colors shadow-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-semibold text-lg">Launch Scanner</span>
              </button>

              {/* Report Missing Product Button */}
              <button
                onClick={() => {
                  onStepChange && onStepChange('Report Missing Product');
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-3 transition-colors shadow-md"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-semibold text-lg">Report Missing Product</span>
              </button>

              {/* Info Text */}
              <div className="bg-gray-50 rounded-xl p-4 mt-6">
                <p className="text-xs text-gray-500 text-center">
                  Use the scanner to redeem benefits at checkout or report products that are missing from your account.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-around sticky bottom-0 z-20">
          <button
            onClick={() => {
              setCurrentView('cards');
              setIsCardDetailView(false);
            }}
            className={`flex flex-col items-center gap-1 ${currentView === 'cards' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className={`text-xs ${currentView === 'cards' ? 'font-bold' : 'font-semibold'}`}>MY CARDS</span>
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
            onClick={() => setCurrentView('scanner')}
            className={`flex flex-col items-center gap-1 ${currentView === 'scanner' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={`text-xs ${currentView === 'scanner' ? 'font-bold' : 'font-semibold'}`}>SCANNER</span>
          </button>
        </div>

        {/* Store Dropdown */}
        {showStoreDropdown && (
            <div className="absolute inset-0 bg-black/40 z-30" onClick={() => setShowStoreDropdown(false)}>
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

        {/* Instructions Modal - Different for each card type */}
        {showInstructions && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 z-40 transition-opacity duration-300"
              onClick={() => setShowInstructions(false)}
            />

            {/* Modal Content */}
            <div className="absolute inset-x-0 bottom-0 z-50 transform transition-transform duration-500 ease-out translate-y-0">
              <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setShowInstructions(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="px-6 py-8">
                  {currentCard.id === 1 ? (
                    /* OTC/Food Card Instructions */
                    <CheckoutInstructions
                      isOpen={showInstructions}
                      onClose={() => setShowInstructions(false)}
                      onScanClick={() => {
                        setShowInstructions(false);
                        setShowScanner(true);
                      }}
                      storeName={selectedStore}
                    />
                  ) : currentCard.id === 2 ? (
                    /* Uber Instructions */
                    <>
                      <h2 className="text-2xl font-bold text-center mb-6">How to Use Your Uber Benefits</h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                            1
                          </div>
                          <p className="text-gray-700 pt-1">
                            Import your payment method to the Uber app
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                            2
                          </div>
                          <p className="text-gray-700 pt-1">
                            Use your benefits for Uber rides and Uber Eats orders
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                            3
                          </div>
                          <p className="text-gray-700 pt-1">
                            Funds are automatically deducted from your available balance
                          </p>
                        </div>
                      </div>
                      <button className="w-full bg-black hover:bg-gray-900 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-2 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <span className="font-semibold">Import Payment to Uber App</span>
                      </button>
                    </>
                  ) : currentCard.id === 3 ? (
                    /* Discover Instructions */
                    <>
                      <h2 className="text-2xl font-bold text-center mb-6">How to Use Your Discover Card</h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                            1
                          </div>
                          <p className="text-gray-700 pt-1">
                            Add your Discover card to Apple Wallet for easy access
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                            2
                          </div>
                          <p className="text-gray-700 pt-1">
                            Use your card for rent payments and utility bills
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                            3
                          </div>
                          <p className="text-gray-700 pt-1">
                            Funds are automatically applied to eligible expenses
                          </p>
                        </div>
                      </div>
                      <button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-2 transition-colors">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        <span className="font-semibold">Add to Apple Wallet</span>
                      </button>
                    </>
                  ) : currentCard.id === 4 ? (
                    /* Walmart Instructions */
                    <>
                      <h2 className="text-2xl font-bold text-center mb-6">How to Pay at Walmart</h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            1
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Shop in-store or online</p>
                            <p className="text-xs text-gray-600">Select your items at any Walmart location or Walmart.com</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            2
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Show your barcode at checkout</p>
                            <p className="text-xs text-gray-600">Present your payment barcode to the cashier or scan at self-checkout</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            3
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Payment processed instantly</p>
                            <p className="text-xs text-gray-600">Your purchase amount is automatically deducted from your available balance</p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setShowInstructions(false);
                          setShowScanner(true);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 px-4 flex items-center justify-center gap-2 transition-colors mb-3"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <span className="font-semibold">Show Payment Barcode</span>
                      </button>
                      <button
                        onClick={() => setShowInstructions(false)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-4 px-4 font-semibold transition-colors"
                      >
                        Close
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </>
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

        {/* Action Detail Modal */}
        {selectedAction && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 z-40 transition-opacity duration-300"
              onClick={() => setSelectedAction(null)}
            />

            {/* Modal Content */}
            <div className="absolute inset-x-0 bottom-0 z-50 transform transition-transform duration-500 ease-out translate-y-0">
              <div className="bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedAction(null)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="px-6 py-8">
                  {selectedAction === 'health-assessment' && (
                    <>
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Annual Health Risk Assessment</h2>
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
                          Earn $20
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-blue-900 mb-2">What You'll Need</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>15-20 minutes to complete</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Current health information</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>List of current medications</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">How It Works</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              1
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Complete the online assessment</p>
                              <p className="text-xs text-gray-600">Answer questions about your health history and lifestyle</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              2
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Review your personalized results</p>
                              <p className="text-xs text-gray-600">Get insights about your health risks and recommendations</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              3
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Receive your reward</p>
                              <p className="text-xs text-gray-600">$20 will be added to your benefit card within 3-5 business days</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-4 px-4 font-semibold transition-colors mb-3">
                        Begin Assessment
                      </button>
                      <button
                        onClick={() => setSelectedAction(null)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-4 px-4 font-semibold transition-colors"
                      >
                        Maybe Later
                      </button>
                    </>
                  )}

                  {selectedAction === 'pcp-appointment' && (
                    <>
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule with Your PCP</h2>
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
                          Earn $50
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-blue-900 mb-2">Requirements</h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Schedule and complete annual checkup</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Must be with your Primary Care Physician</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Submit proof of visit within 30 days</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">How to Complete</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              1
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Contact your PCP</p>
                              <p className="text-xs text-gray-600">Call your doctor's office to schedule your annual checkup</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              2
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Attend your appointment</p>
                              <p className="text-xs text-gray-600">Complete your wellness visit and request documentation</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              3
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Submit proof of visit</p>
                              <p className="text-xs text-gray-600">Upload your visit summary or receipt to claim your reward</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-4 px-4 font-semibold transition-colors mb-3">
                        Upload Proof of Visit
                      </button>
                      <button
                        onClick={() => setSelectedAction(null)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-4 px-4 font-semibold transition-colors"
                      >
                        Close
                      </button>
                    </>
                  )}

                  {selectedAction === 'immunizations' && (
                    <>
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Childhood Immunizations</h2>
                        <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                          Earn $10 Diapers
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4 mb-6">
                        <h3 className="font-bold text-blue-900 mb-2">Recommended Vaccines</h3>
                        <div className="space-y-2 text-sm text-gray-700">
                          <div className="bg-white rounded-lg p-3">
                            <p className="font-semibold">DTaP (Diphtheria, Tetanus, Pertussis)</p>
                            <p className="text-xs text-gray-600">Ages: 2, 4, 6, 15-18 months</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="font-semibold">MMR (Measles, Mumps, Rubella)</p>
                            <p className="text-xs text-gray-600">Ages: 12-15 months, 4-6 years</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="font-semibold">Polio (IPV)</p>
                            <p className="text-xs text-gray-600">Ages: 2, 4, 6-18 months, 4-6 years</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="font-semibold">Hepatitis B</p>
                            <p className="text-xs text-gray-600">Birth, 1-2 months, 6-18 months</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">How to Claim Reward</h3>
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              1
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Visit your pediatrician</p>
                              <p className="text-xs text-gray-600">Get your child's recommended vaccinations</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              2
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Get immunization record</p>
                              <p className="text-xs text-gray-600">Request a copy of the vaccination record from your provider</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                              3
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900">Submit documentation</p>
                              <p className="text-xs text-gray-600">Upload proof to receive $10 diaper credit</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-4 px-4 font-semibold transition-colors mb-3">
                        Upload Immunization Record
                      </button>
                      <button
                        onClick={() => setSelectedAction(null)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl py-4 px-4 font-semibold transition-colors"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
