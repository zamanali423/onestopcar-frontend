'use client'

import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change: number
  changeText: string
  icon: React.ReactNode
  color: 'primary' | 'green' | 'blue' | 'orange'
}

function StatCard({
  title,
  value,
  change,
  changeText,
  icon,
  color,
}: StatCardProps) {
  const isPositive = change > 0
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  }

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-foreground mb-3">{value}</h3>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
            )}
            <span
              className={
                isPositive
                  ? 'text-sm text-green-600 dark:text-green-400'
                  : 'text-sm text-red-600 dark:text-red-400'
              }
            >
              {isPositive ? '+' : ''}{change}% {changeText}
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export function DashboardCards() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$48,290',
      change: 12.5,
      changeText: 'from last month',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'primary' as const,
    },
    {
      title: 'Total Products',
      value: '1,234',
      change: 8.2,
      changeText: 'added this month',
      icon: <Package className="w-6 h-6" />,
      color: 'blue' as const,
    },
    {
      title: 'Total Orders',
      value: '567',
      change: 23.1,
      changeText: 'from last month',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'green' as const,
    },
    {
      title: 'Total Customers',
      value: '2,847',
      change: 5.4,
      changeText: 'from last month',
      icon: <Users className="w-6 h-6" />,
      color: 'orange' as const,
    },
  ]

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
