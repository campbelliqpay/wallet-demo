'use client';

import { useState, useEffect } from 'react';
import IPhoneFrame from '@/components/IPhoneFrame';
import LoadingScreen from '@/components/LoadingScreen';
import WalletView from '@/components/WalletView';
import UXMap from '@/components/UXMap';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState('Loading');

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

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center md:items-start justify-center gap-8 bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <IPhoneFrame>
        {isLoading ? <LoadingScreen /> : <WalletView onStepChange={setCurrentStep} />}
      </IPhoneFrame>
      <UXMap currentStep={currentStep} />
    </main>
  );
}
