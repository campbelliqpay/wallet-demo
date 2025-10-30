'use client';

import React from 'react';

interface CheckoutInstructionsProps {
  isOpen: boolean;
  onClose: () => void;
  onScanClick?: () => void;
  storeName?: string;
}

export default function CheckoutInstructions({
  isOpen,
  onClose,
  onScanClick,
  storeName = "Acme Markets"
}: CheckoutInstructionsProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="px-6 py-8">
            {/* ACME Logo */}
            <div className="flex justify-center mb-6">
              <div className="bg-white px-8 py-4 rounded-lg shadow-md">
                <div className="text-5xl font-black text-red-600 italic tracking-tight">
                  ACME
                  <span className="text-sm align-top">®</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center mb-2">
              Redeem at {storeName}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Follow the instructions below to complete your redemption
            </p>

            {/* OTC Network Logo */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-[#1e3a5f] text-white px-6 py-2 rounded-md">
                <div className="text-2xl font-bold">OTC</div>
              </div>
              <div className="bg-[#e87722] text-white px-6 py-2 rounded-md">
                <div className="text-lg font-semibold">Network®</div>
              </div>
            </div>

            {/* Warning */}
            <div className="text-center mb-6">
              <p className="text-red-600 font-bold text-sm">
                THIS IS A DIGITAL PAYMENT NOT A COUPON
              </p>
            </div>

            {/* Self Check-Out Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-blue-500 mb-4">Self Check-Out:</h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">1.</span>
                  <span>Scan all products & select <strong>Finish and Pay</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">2.</span>
                  <span>Select <strong>Pay with Scan</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">3.</span>
                  <span className="text-blue-500">Scan the QR code using the handheld scanner</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">4.</span>
                  <span>Select <strong>Yes</strong> <span className="text-blue-500">on pin pad</span></span>
                </li>
              </ol>
            </div>

            {/* Cashier Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-blue-500 mb-4">Cashier:</h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">1.</span>
                  <span>Scan all products and select <strong>Total</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">2.</span>
                  <span>Select <strong>Tenders 1</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">3.</span>
                  <span>Select <strong>EFT Full</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">4.</span>
                  <span className="text-blue-500">Scan the QR code on the customers mobile device using the handheld scanner</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 font-semibold">5.</span>
                  <span>Select <strong>Yes</strong> <span className="text-blue-500">on pin pad</span></span>
                </li>
              </ol>
            </div>

            {/* QR Code Section */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-center mb-4">Redemption QRCode</h3>
              <button
                onClick={onScanClick}
                className="w-full bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Ready to redeem! Click here to scan QRCode</span>
                </div>
              </button>
            </div>

            {/* Bottom Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to card</span>
              </button>

              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Change Store</span>
              </button>

              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
