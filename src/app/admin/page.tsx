'use client'

import { DashboardCards } from '@/components/admin/dashboard-cards'
import { RevenueChart } from '@/components/admin/charts/RevenueChart'
import { OrdersChart } from '@/components/admin/charts/OrdersChart'
import { CategoryChart } from '@/components/admin/charts/CategoryChart'
import { DashboardRecentActivity } from '@/components/admin/dashboard-recent-activity'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor your store performance, sales, and recent activities.</p>
        </div>

        <DashboardCards />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#1A1A1A]">Revenue Trend</h2>
              <p className="text-sm text-gray-500">Monthly revenue and orders</p>
            </div>
            <RevenueChart />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#1A1A1A]">Order Statistics</h2>
              <p className="text-sm text-gray-500">Monthly order volume</p>
            </div>
            <OrdersChart />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <DashboardRecentActivity />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#1A1A1A]">Category Distribution</h2>
              <p className="text-sm text-gray-500">Products by category</p>
            </div>
            <CategoryChart />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}