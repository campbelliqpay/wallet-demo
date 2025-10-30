'use client';

import React, { useState, useEffect } from 'react';
import ReportMissingProduct from './ReportMissingProduct';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onStepChange?: (step: string) => void;
}

export default function QRScanner({ isOpen, onClose, onStepChange }: QRScannerProps) {
  const [showReportModal, setShowReportModal] = useState(false);

  // Update step based on modal state
  useEffect(() => {
    if (!isOpen || !onStepChange) return;

    if (showReportModal) {
      onStepChange('Report Missing Product');
    } else {
      onStepChange('Scanner');
    }
  }, [isOpen, showReportModal, onStepChange]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold">Scan QR Code</h2>
        <div className="w-10"></div>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Scanning Frame */}
        <div className="relative w-64 h-64">
          {/* Corner Borders */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-blue-500"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-blue-500"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-blue-500"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-blue-500"></div>

          {/* Scanning Line Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-1 bg-blue-500 animate-pulse"></div>
          </div>

          {/* QR Code Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm-2 14h8v-8H3v8zm2-6h4v4H5v-4zm8-10v8h8V3h-8zm6 6h-4V5h4v4zm-6 4h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0-4h2v2h-2v-2zm-4 0h2v2h-2v-2z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-900/90 text-white p-6 text-center">
        <p className="text-lg mb-2">Position QR code within frame</p>
        <p className="text-sm text-gray-400">The scanner will automatically detect the code</p>
      </div>

      {/* Bottom Actions */}
      <div className="bg-gray-900/90 p-4 space-y-3">
        <button
          onClick={() => setShowReportModal(true)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition"
        >
          Report Missing Product
        </button>
        <button
          onClick={onClose}
          className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold"
        >
          Cancel
        </button>
      </div>

      {/* Report Missing Product Modal */}
      <ReportMissingProduct
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </div>
  );
}
