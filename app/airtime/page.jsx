'use client';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const VOLUME_PACKAGES = {
  MTN: [
    { value: '345MIN_364MB', label: '345 Mins + 364 MB (₵19.98)' },
    { value: '513MIN_465MB', label: '513.28 Mins + 465.2 MB (₵29.98)' },
  ],
  AirtelTigo: [
    { value: '300MIN', label: '300 Minutes (₵15)' },
    { value: '600MIN', label: '600 Minutes (₵30)' },
    { value: '900MIN', label: '900 Minutes (₵45)' },
    { value: '1200MIN', label: '1200 Minutes (₵59)' },
  ],
  Telecel: [
    { value: '2000', label: '2000 Minutes (₵20)' },
    { value: '3000', label: '3000 Minutes (₵30)' },
  ],
};

const AirtimePurchaseForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    Receiver: '',
    Volume: '',
    Package_Type: '',
  });
  const [currentVolumeOptions, setCurrentVolumeOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');

    // Dynamically update volume options when package type changes
    if (name === 'Package_Type') {
      setCurrentVolumeOptions(VOLUME_PACKAGES[value] || []);
      setFormData((prev) => ({ ...prev, Volume: '' })); // Reset the Volume selection
    }
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.Receiver || !/^\d{10}$/.test(formData.Receiver)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }

    if (!formData.Volume) {
      setError('Please select an airtime volume');
      return false;
    }

    if (!formData.Package_Type) {
      setError('Please select a package type');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/airtime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: (parseInt(formData.Volume) / 100).toString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment initialization failed');
      }

      window.location.href = data.data.authorization_url;
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-indigo-600">
            <h2 className="text-xl font-bold text-white text-center">
              Purchase Airtime
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="Receiver"
                value={formData.Receiver}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter 10-digit number"
                required
              />
            </div>

            {/* Package Type Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Package Type
              </label>
              <select
                name="Package_Type"
                value={formData.Package_Type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select package type</option>
                {Object.keys(VOLUME_PACKAGES).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>

            {/* Volume Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Volume
              </label>
              <select
                name="Volume"
                value={formData.Volume}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                required
                disabled={!currentVolumeOptions.length}
              >
                <option value="">Select volume</option>
                {currentVolumeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₵${(parseInt(formData.Volume || 0) / 100).toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AirtimePurchaseForm;
