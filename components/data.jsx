'use client';

import { useState } from 'react';
import { AlertCircle, Check, Loader2 } from 'lucide-react';

const DataPurchaseForm = () => {
  // Data plans configuration remains the same
  const dataPlans = {
    AirtelTigo: [
      { id: 1, name: '1GB Daily', validity: '1 Day', price: 3, value: '1000' },
      { id: 2, name: '2GB Weekly', validity: '7 Days', price: 10, value: '2000' },
      { id: 3, name: '5GB Monthly', validity: '30 Days', price: 25, value: '5000' },
      { id: 4, name: '10GB Monthly', validity: '30 Days', price: 45, value: '10000' }
    ],
    MTN: [
      { id: 5, name: '1GB Daily', validity: '1 Day', price: 3, value: '1000' },
      { id: 6, name: '3GB Weekly', validity: '7 Days', price: 15, value: '3000' },
      { id: 7, name: '6GB Monthly', validity: '30 Days', price: 30, value: '6000' },
      { id: 8, name: '12GB Monthly', validity: '30 Days', price: 50, value: '12000' }
    ],
    Telecel: [
      { id: 9, name: '1GB Daily', validity: '1 Day', price: 2.5, value: '1000' },
      { id: 10, name: '2GB Weekly', validity: '7 Days', price: 8, value: '2000' },
      { id: 11, name: '4GB Monthly', validity: '30 Days', price: 20, value: '4000' },
      { id: 12, name: '8GB Monthly', validity: '30 Days', price: 35, value: '8000' }
    ]
  };

  const [formData, setFormData] = useState({
    Receiver: '',
    Package_Type: 'AirtelTigo',
    data_plan: '',
    email: '',
    Reference: '',
    amount: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  // Handlers remain the same
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'Package_Type') {
        return { ...prev, [name]: value, data_plan: '' };
      }
      if (name === 'data_plan') {
        const selectedPlan = dataPlans[formData.Package_Type].find(
          plan => plan.value === value
        );
        return {
          ...prev,
          [name]: value,
          amount: selectedPlan ? selectedPlan.price.toString() : ''
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const generateReference = () => {
    return `DATA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const paymentResponse = await fetch('/api/data', {
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
              Purchase Data Bundle
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

            {/* Data Plan Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Plan
              </label>
              <select
                name="data_plan"
                value={formData.data_plan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select a data plan</option>
                {dataPlans[formData.Package_Type].map(plan => (
                  <option key={plan.id} value={plan.value}>
                    {plan.name} - {plan.validity} - GHS {plan.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Display */}
            {formData.amount && (
              <div className="bg-gray-50 text-gray-800 px-4 py-3 rounded-md shadow-sm">
                <p className="text-sm font-medium">
                  Total Amount: GHS {formData.amount}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.loading || !formData.data_plan}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                status.loading || !formData.data_plan ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {status.loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Purchase Data Bundle'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DataPurchaseForm;