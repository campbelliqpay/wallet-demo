'use client';

import React, { useState, useRef } from 'react';

interface ReportMissingProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportMissingProduct({ isOpen, onClose }: ReportMissingProductProps) {
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCatalog, setSelectedCatalog] = useState('');
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

  const catalogs = [
    'OTC Network',
    'Healthy Foods',
    'Transportation',
    'Home & Community'
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
    if (!selectedStore || !selectedCatalog || !reportType || !uploadedPhoto) {
      alert('Please fill in all fields before submitting');
      return;
    }

    // Show success message
    setShowSuccess(true);

    // Reset form after 2 seconds and close
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedStore('');
      setSelectedCatalog('');
      setReportType('');
      setUploadedPhoto(null);
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    setSelectedStore('');
    setSelectedCatalog('');
    setReportType('');
    setUploadedPhoto(null);
    setShowSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 z-[60]" onClick={handleClose} />

      {/* Modal sliding from bottom */}
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl border-t border-gray-200 z-[61] max-h-[85vh] overflow-y-auto">
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
            <div className="relative p-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 pr-8">Report Missing Product</h2>
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-4">
              {/* Select Store */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Store
                </label>
                <select
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-900 bg-white"
                >
                  <option value="">Choose a store...</option>
                  {stores.map((store) => (
                    <option key={store} value={store}>
                      {store}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Catalog */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Catalog
                </label>
                <select
                  value={selectedCatalog}
                  onChange={(e) => setSelectedCatalog(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-900 bg-white"
                >
                  <option value="">Choose a catalog...</option>
                  {catalogs.map((catalog) => (
                    <option key={catalog} value={catalog}>
                      {catalog}
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Type of Report */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Type of Report
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-900 bg-white"
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
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Identify Product - Upload Photo
                </label>

                {uploadedPhoto ? (
                  // Photo Preview
                  <div className="relative">
                    <img
                      src={uploadedPhoto}
                      alt="Uploaded product"
                      className="w-full h-48 object-cover rounded-xl border border-gray-300"
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
                      className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition text-blue-600 font-medium"
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
                      className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition text-gray-700 font-medium"
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
            <div className="px-6 pb-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-base hover:bg-blue-700 transition"
              >
                Submit Report
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
