'use client'

import { useState } from 'react'
import { Save, Globe, Mail, Phone, Bell, Shield, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    storeName: 'OneStopCar',
    email: 'admin@onestopcar.com',
    phone: '+1 (555) 000-0000',
    address: '123 Auto Avenue, Detroit, MI 48201',
    currency: 'USD',
    timezone: 'America/New_York',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Settings</h1>
        <p className="text-sm text-gray-500">Manage admin dashboard settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Store Settings */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#E9CC2F]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">Store Information</h2>
                <p className="text-sm text-gray-500">Update your store details</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PKR">PKR (Rs)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Asia/Karachi">Pakistan Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Bell className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">Notifications</h2>
                <p className="text-sm text-gray-500">Configure notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'New Orders', defaultChecked: true, description: 'Get notified when a new order is placed' },
                { label: 'Low Stock Alerts', defaultChecked: true, description: 'Get notified when stock is running low' },
                { label: 'Customer Messages', defaultChecked: true, description: 'Get notified when a customer sends a message' },
                { label: 'Product Reviews', defaultChecked: false, description: 'Get notified when a product review is submitted' },
                { label: 'System Updates', defaultChecked: true, description: 'Get notified about system updates and maintenance' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={item.defaultChecked}
                    className="w-5 h-5 rounded border-gray-300 text-[#E9CC2F] focus:ring-[#E9CC2F]/50 focus:ring-offset-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Theme Settings */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Palette className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">Theme</h2>
                <p className="text-sm text-gray-500">Customize dashboard appearance</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-3 rounded-xl border-2 border-[#E9CC2F] bg-[#E9CC2F]/5 text-left transition-colors">
                <p className="text-sm font-semibold text-[#1A1A1A]">Light Mode</p>
                <p className="text-xs text-gray-500">Default light theme</p>
              </button>
              <button className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E9CC2F] text-left transition-colors">
                <p className="text-sm font-semibold text-[#1A1A1A]">Dark Mode</p>
                <p className="text-xs text-gray-500">Dark theme for night</p>
              </button>
              <button className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E9CC2F] text-left transition-colors">
                <p className="text-sm font-semibold text-[#1A1A1A]">System Default</p>
                <p className="text-xs text-gray-500">Follow system preference</p>
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">Security</h2>
                <p className="text-sm text-gray-500">Manage security settings</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E9CC2F] text-left transition-colors">
                <p className="text-sm font-semibold text-[#1A1A1A]">Change Password</p>
                <p className="text-xs text-gray-500">Update your password</p>
              </button>
              <button className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E9CC2F] text-left transition-colors">
                <p className="text-sm font-semibold text-[#1A1A1A]">Two-Factor Authentication</p>
                <p className="text-xs text-gray-500">Enable 2FA for extra security</p>
              </button>
              <button className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#E9CC2F] text-left transition-colors">
                <p className="text-sm font-semibold text-[#1A1A1A]">Sessions</p>
                <p className="text-xs text-gray-500">Manage active sessions</p>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <Button className="w-full bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24] py-3">
            <Save className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  )
}