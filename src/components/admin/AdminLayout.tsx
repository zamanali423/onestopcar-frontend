'use client'

import { useState, useEffect } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { ProtectedRoute } from '../auth/ProtectedRoute'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const pageConfig: Record<string, { title: string; description: string }> = {
    '/admin': {
      title: 'Dashboard',
      description: 'Monitor your store performance, sales, and recent activities.',
    },
    '/admin/products': {
      title: 'Product Management',
      description: 'Create, edit, organize, and manage all products in your catalog.',
    },
    '/admin/categories': {
      title: 'Category Management',
      description: 'Manage product categories and organize your inventory efficiently.',
    },
    '/admin/brands': {
      title: 'Brand Management',
      description: 'Add, edit, and manage manufacturers and product brands.',
    },
    '/admin/vehicle-database': {
      title: 'Vehicle Database',
      description: 'Manage supported vehicle makes, models, trims, and years.',
    },
    '/admin/led-compatibility': {
      title: 'LED Compatibility',
      description: 'Manage LED bulb compatibility data for different vehicles.',
    },
    '/admin/orders': {
      title: 'Order Management',
      description: 'Track, process, and manage customer orders efficiently.',
    },
    '/admin/customers': {
      title: 'Customer Management',
      description: 'View customer profiles, purchase history, and account details.',
    },
    '/admin/reviews': {
      title: 'Review Management',
      description: 'Moderate customer reviews and maintain product quality feedback.',
    },
    '/admin/referral-system': {
      title: 'Referral System',
      description: 'Manage referral campaigns, rewards, and customer invitations.',
    },
    '/admin/inventory': {
      title: 'Inventory Management',
      description: 'Monitor stock levels, warehouse inventory, and product availability.',
    },
    '/admin/support': {
      title: 'Support Center',
      description: 'Manage customer inquiries, tickets, and support requests.',
    },
    '/admin/reports': {
      title: 'Reports & Analytics',
      description: 'Analyze sales, revenue, customer insights, and business performance.',
    },
    '/admin/settings': {
      title: 'System Settings',
      description: 'Configure store settings, preferences, and integrations.',
    },
    '/admin/roles-permissions': {
      title: 'Roles & Permissions',
      description: 'Manage administrators, staff roles, and access permissions.',
    },
  }

  const currentPage = pageConfig[pathname] || {
    title: 'Admin Dashboard',
    description: 'Manage your store operations from a centralized dashboard.',
  }

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-[#F8FAFC]">
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        <div
          className={cn(
            "min-h-screen transition-all duration-300 ease-in-out",
            isCollapsed ? "md:ml-20" : "md:ml-64",
            "ml-0"
          )}
        >
          <AdminHeader
            title={currentPage.title}
            description={currentPage.description}
            onMenuClick={() => setIsMobileOpen(!isMobileOpen)}
          />

          <main className="p-4 md:p-6" role="main">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}