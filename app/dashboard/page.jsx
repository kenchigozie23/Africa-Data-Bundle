'use client'
import React, { useState } from 'react';
import {
  Home,
  Phone,
  Wifi,
  CreditCard,
  History,
  Settings,
  User,
  BarChart3,
  Cable,
  LogOut
} from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md px-4 py-3 fixed top-0 w-full z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-600">Bundle4Africa</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex items-center space-x-2 cursor-pointer bg-gray-100 rounded-full px-4 py-2">
                {/* <User className="h-5 w-5 text-gray-600" /> */}
                <span className="hidden sm:block text-sm font-medium"><UserButton/></span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Balance</p>
                  <h3 className="text-2xl font-bold text-gray-900">GHC 1,000</h3>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Today's Sales</p>
                  <h3 className="text-2xl font-bold text-gray-900">GHC 2700</h3>
                </div>
                <CreditCard className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Transactions</p>
                  <h3 className="text-2xl font-bold text-gray-900">234</h3>
                </div>
                <History className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Active Users</p>
                  <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
                </div>
                <User className="h-8 w-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
              <Phone className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm text-gray-700"><Link href={'/topup'}>Airtime</Link></span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
              <Wifi className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm text-gray-700"><Link href={'/data'}>Data</Link></span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
              <Cable className="h-8 w-8 text-purple-500 mb-2" />
              <span className="text-sm text-gray-700"><Link href={'/coming'}>Cable TV</Link></span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
              <CreditCard className="h-8 w-8 text-orange-500 mb-2" />
              <span className="text-sm text-gray-700">Bills</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
              <History className="h-8 w-8 text-red-500 mb-2" />
              <span className="text-sm text-gray-700"><Link href={'/coming'}>History</Link></span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors">
              <Settings className="h-8 w-8 text-gray-500 mb-2" />
              <span className="text-sm text-gray-700"><Link href={'/coming'}>Setting</Link></span>
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-t">
                    <td className="py-4">Airtime Purchase</td>
                    <td className="py-4">GHC 20</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                    <td className="py-4">Today, 2:30 PM</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-4">Data Bundle</td>
                    <td className="py-4">GHC 30</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span></td>
                    <td className="py-4">Today, 1:15 PM</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-4">Cable TV</td>
                    <td className="py-4">GHC 250</td>
                    <td className="py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span></td>
                    <td className="py-4">Today, 11:30 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white fixed bottom-0 w-full border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center p-4 ${
                activeTab === 'home' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1"><Link href={'/'}>Home</Link></span>
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`flex flex-col items-center p-4 ${
                activeTab === 'services' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <CreditCard className="h-6 w-6" />
              <span className="text-xs mt-1"><Link href={'/services'}>Services</Link></span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center p-4 ${
                activeTab === 'history' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <History className="h-6 w-6" />
              <span className="text-xs mt-1">History</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center p-4 ${
                activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              {/* <User className="h-6 w-6" /> */}
              <span className="text-xs mt-1"><UserButton/></span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;