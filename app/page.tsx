'use client';

import { useState, useEffect } from 'react';
import IPhoneFrame from '@/components/IPhoneFrame';
import LoadingScreen from '@/components/LoadingScreen';
import WalletView from '@/components/WalletView';
import UXMap from '@/components/UXMap';
import EligibilityEngineView from '@/components/EligibilityEngineView';
import EligibilityUXMap from '@/components/EligibilityUXMap';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState('Loading');
  const [eligibilityStep, setEligibilityStep] = useState('Welcome');
  const [currentTab, setCurrentTab] = useState<'eligibility' | 'payment'>('eligibility');

  useEffect(() => {
    // Transition to wallet after loading completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentStep(isLoading ? 'Loading' : 'Cards');
  }, [isLoading]);

  const isEligibility = currentTab === 'eligibility';

  return (
    <main className="min-h-screen flex flex-col items-center justify-start gap-6 bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      {/* Top Segmented Toggle */}
      <div className="w-full max-w-6xl flex justify-center">
        <div className="relative inline-flex items-center rounded-full bg-gray-200/70 shadow-inner p-1 select-none">
          {/* Sliding indicator */}
          <span
            className={`absolute top-1 bottom-1 w-40 rounded-full bg-white shadow transition-transform duration-200 ease-out ${
              isEligibility ? 'translate-x-1' : 'translate-x-[10.25rem]'
            }`}
            aria-hidden
          />
          {/* Buttons */}
          <button
            className={`relative z-10 w-40 px-4 py-2 text-xs font-extrabold tracking-wide rounded-full ${
              isEligibility ? 'text-gray-900' : 'text-gray-600'
            }`}
            onClick={() => setCurrentTab('eligibility')}
          >
            Eligibility
          </button>
          <button
            className={`relative z-10 w-40 px-4 py-2 text-xs font-extrabold tracking-wide rounded-full ${
              !isEligibility ? 'text-gray-900' : 'text-gray-600'
            }`}
            onClick={() => setCurrentTab('payment')}
          >
            Payment
          </button>
        </div>
      </div>

      {/* Centered White Container with rounded edges */}
      <div className="w-full max-w-6xl">
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl rounded-3xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <IPhoneFrame>
              {currentTab === 'payment' ? (
                isLoading ? <LoadingScreen /> : <WalletView onStepChange={setCurrentStep} />
              ) : (
                <EligibilityEngineView onStepChange={setEligibilityStep} />
              )}
            </IPhoneFrame>

            {currentTab === 'payment' ? (
              <UXMap currentStep={currentStep} />
            ) : (
              <EligibilityUXMap currentStep={eligibilityStep} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
