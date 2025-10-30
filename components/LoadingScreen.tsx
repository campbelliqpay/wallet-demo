'use client';

import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-8">
      {/* Logo Icon */}
      <div className="mb-8">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-xl flex items-center justify-center">
          {/* Card Icon */}
          <svg
            className="w-16 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" strokeWidth="2" strokeLinecap="round"/>
            <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2"/>
            <line x1="6" y1="14" x2="10" y2="14" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
        iQpay
      </h1>

      {/* Progress Bar */}
      <div className="w-full max-w-md mb-4">
        <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Text */}
      <p className="text-gray-600 text-lg mb-12">
        {progress}% Complete
      </p>

      {/* Status Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Connecting to secure servers...
      </h2>

      {/* Loading Dots */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="text-gray-600 ml-2">Please stay on this page</span>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 text-sm">
        <p>We&apos;re setting up your personalized experience.</p>
        <p>This usually takes just a few moments.</p>
      </div>
    </div>
  );
}
