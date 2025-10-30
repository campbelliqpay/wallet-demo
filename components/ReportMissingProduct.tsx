'use client';

import React, { useState, useRef } from 'react';

interface ReportMissingProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportMissingProduct({ isOpen, onClose }: ReportMissingProductProps) {
  const [selectedStore, setSelectedStore] = useState('');
  const [reportType, setReportType] = useState('');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stores = [
    'Walmart',
    'Target',
    'Kroger',
    'CVS',
    'Walgreens',
    'Safeway',
    'Whole Foods',
    'Other'
  ];

  const reportTypes = [
    'Missing Product',
    'Product Not Scanning'
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Validate all fields are filled
    if (!selectedStore || !reportType || !uploadedPhoto) {
      alert('Please fill in all fields before submitting');
      return;
    }

    // Show success message
    setShowSuccess(true);

    // Reset form after 2 seconds and close
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedStore('');
      setReportType('');
      setUploadedPhoto(null);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setSelectedStore('');
    setReportType('');
    setUploadedPhoto(null);
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {showSuccess ? (
          // Success Screen
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted!</h2>
            <p className="text-gray-600">Thank you for helping us improve your experience.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold">Report Missing Product</h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-white/20 rounded-full transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-5">
              {/* Select Store */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Store
                </label>
                <select
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                >
                  <option value="">Choose a store...</option>
                  {stores.map((store) => (
                    <option key={store} value={store}>
                      {store}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Type of Report */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Type of Report
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-900"
                >
                  <option value="">Choose report type...</option>
                  {reportTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Photo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Identify Product - Upload Photo
                </label>

                {uploadedPhoto ? (
                  // Photo Preview
                  <div className="relative">
                    <img
                      src={uploadedPhoto}
                      alt="Uploaded product"
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
                    />
                    <button
                      onClick={() => setUploadedPhoto(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  // Upload Options
                  <div className="space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />

                    {/* Take Photo Button */}
                    <button
                      onClick={() => {
                        if (fileInputRef.current) {
                          fileInputRef.current.setAttribute('capture', 'environment');
                          fileInputRef.current.click();
                        }
                      }}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-50 border-2 border-blue-300 rounded-lg hover:bg-blue-100 transition text-blue-700 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Take Photo
                    </button>

                    {/* Select from Phone Button */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition text-gray-700 font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Select from Phone
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-6 pt-0">
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-600 transition shadow-lg"
              >
                Submit Report
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
