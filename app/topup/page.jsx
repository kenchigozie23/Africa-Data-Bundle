'use client';

import { useState } from 'react';
import { AlertCircle, Check, Loader2 } from 'lucide-react';

const ManualTopupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    Receiver: '',
    Package_Type: 'AirtelTigo',
    amount: '',
    Reference: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const validateAmount = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 1) {
      return 'Amount must be at least GHS 1';
    }
    if (numValue > 1000) {
      return 'Maximum top-up amount is GHS 1000';
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'amount') {
      // Only allow numbers and decimals
      if (value && !/^\d*\.?\d{0,2}$/.test(value)) return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    setStatus(prev => ({ ...prev, error: null }));
  };

  const generateReference = () => {
    return `TOPUP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate amount
    const amountError = validateAmount(formData.amount);
    if (amountError) {
      setStatus({ loading: false, error: amountError, success: false });
      return;
    }

    // Validate phone number
    if (!/^\d{10}$/.test(formData.Receiver)) {
      setStatus({ loading: false, error: 'Please enter a valid 10-digit phone number', success: false });
      return;
    }

    setStatus({ loading: true, error: null, success: false });

    try {
      const paymentResponse = await fetch('/api/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          Reference: generateReference()
        })
      });

      const paymentData = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentData.message || 'Payment initialization failed');
      }

      window.location.href = paymentData.data.authorization_url;

    } catch (error) {
      setStatus({ loading: false, error: error.message, success: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-indigo-600">
            <h2 className="text-xl font-bold text-white text-center">
              Manual Top-up
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            {status.error && (
              <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">{status.error}</span>
              </div>
            )}

            {status.success && (
              <div className="bg-green-50 text-green-500 px-4 py-2 rounded-md flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span className="text-sm">Transaction successful!</span>
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

            {/* Network Provider Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Network Provider
              </label>
              <select
                name="Package_Type"
                value={formData.Package_Type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="AirtelTigo">AirtelTigo</option>
                <option value="MTN">MTN</option>
                <option value="Telecel">Telecel</option>
              </select>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (GHS)
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter amount"
                  required
                />
                <div className="absolute right-3 top-2 text-sm text-gray-500">
                  GHS
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Min: GHS 1 | Max: GHS 1,000
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading || !formData.amount}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                status.loading || !formData.amount ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Top-up Now'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManualTopupForm;