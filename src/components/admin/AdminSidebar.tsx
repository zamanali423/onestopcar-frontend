'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Zap,
  Car,
  FileText,
  Headphones,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: <Package className="w-5 h-5" />,
    children: [
      { label: 'All Products', href: '/admin/products', icon: <Package className="w-4 h-4" /> },
      { label: 'Categories', href: '/admin/categories', icon: <Package className="w-4 h-4" /> },
      { label: 'Brands', href: '/admin/brands', icon: <Package className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Vehicles',
    href: '/admin/vehicles',
    icon: <Car className="w-5 h-5" />,
    children: [
      { label: 'Vehicle Database', href: '/admin/vehicles', icon: <Car className="w-4 h-4" /> },
      { label: 'LED Compatibility', href: '/admin/led-compatibility', icon: <Car className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    label: 'Customers',
    href: '/admin/customers',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Reviews',
    href: '/admin/reviews',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: 'Content',
    href: '/admin/blog',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: 'Blog Posts', href: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
      { label: 'Homepage', href: '/admin/homepage', icon: <FileText className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Inventory',
    href: '/admin/inventory',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    label: 'Refferals',
    href: '/admin/referral',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Support',
    href: '/admin/support',
    icon: <Headphones className="w-5 h-5" />,
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    label: 'Roles',
    href: '/admin/roles',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: <Settings className="w-5 h-5" />,
  },
]

interface AdminSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (value: boolean) => void
}

export function AdminSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: AdminSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Products', 'Vehicles', 'Content'])
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  if (!mounted) return null

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'dashboard-sidebar fixed inset-y-0 left-0 z-40 overflow-y-auto transition-[width,transform] duration-300 ease-in-out scrollbar-hide',
          'bg-[#1A1A1A] border-r border-white/5',
          isCollapsed ? 'md:w-20' : 'md:w-64',
          'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className={cn(
          'flex min-h-full flex-col transition-all duration-300 ease-in-out',
          isCollapsed ? 'p-2' : 'p-4'
        )}>
          {/* Logo */}
          <div
            className={cn(
              'mb-8 flex items-center transition-all duration-300 ease-in-out',
              isCollapsed ? 'justify-center px-0' : 'justify-between px-2',
              isCollapsed ? 'gap-0' : 'gap-3'
            )}
          >
            <div className={`flex items-center ${isCollapsed ? 'gap-0' : 'gap-3'}`}>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#E9CC2F] flex items-center justify-center text-[#1A1A1A] font-bold shrink-0">
                OS
              </div>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  isCollapsed ? 'w-0 opacity-0 -translate-x-2' : 'w-auto opacity-100 translate-x-0'
                )}
              >
                <span className="font-bold text-base md:text-lg text-white whitespace-nowrap">
                  OneStopCar
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                'hidden md:inline-flex h-8 w-8 shrink-0 p-0 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 ease-in-out',
                isCollapsed ? 'ml-0' : 'ml-auto'
              )}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const hasChildren = !!item.children
              const showChildren = hasChildren && !isCollapsed && expandedItems.includes(item.label)

              return (
                <div key={item.label}>
                  <div className={cn('flex items-center', isCollapsed && 'justify-center w-full')}>
                    <Link
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={cn(
                        'flex items-center px-3 py-2.5 rounded-lg transition-all duration-300 ease-in-out text-sm font-medium',
                        isCollapsed ? 'w-12 h-12 justify-center px-0' : 'flex-1 gap-3',
                        isActive(item.href)
                          ? 'bg-[#E9CC2F]/10 text-[#E9CC2F]'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      <span
                        className={cn(
                          'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
                          isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>

                    {hasChildren && !isCollapsed && (
                      <button
                        type="button"
                        onClick={() => toggleExpanded(item.label)}
                        className={cn(
                          'p-1 hover:bg-white/5 rounded transition-all duration-300 ease-in-out text-gray-400',
                          expandedItems.includes(item.label) && 'rotate-180'
                        )}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Submenu */}
                  {showChildren && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-3">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out text-sm',
                            isActive(child.href)
                              ? 'bg-[#E9CC2F]/10 text-[#E9CC2F]'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                          <span className="hidden sm:inline">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Footer */}
          <div
            className={cn(
              'pt-4 border-t border-white/10 text-xs text-gray-500 transition-all duration-300 ease-in-out',
              isCollapsed ? 'space-y-0' : 'space-y-2'
            )}
          >
            <p className={cn('overflow-hidden transition-all duration-300 ease-in-out', isCollapsed ? 'max-h-0 opacity-0' : 'max-h-6 opacity-100')}>
              OneStopCar Admin
            </p>
            <p className={cn('overflow-hidden transition-all duration-300 ease-in-out', isCollapsed ? 'max-h-0 opacity-0' : 'max-h-6 opacity-100')}>
              v1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}