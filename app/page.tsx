'use client';

import { useState, useEffect } from 'react';
import IPhoneFrame from '@/components/IPhoneFrame';
import LoadingScreen from '@/components/LoadingScreen';
import WalletView from '@/components/WalletView';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Transition to wallet after loading completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <IPhoneFrame>
        {isLoading ? <LoadingScreen /> : <WalletView />}
      </IPhoneFrame>
    </main>
  );
}
