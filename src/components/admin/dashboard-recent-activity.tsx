'use client'

import { ShoppingCart, Package, MessageSquare, Star } from 'lucide-react'

interface Activity {
  id: string
  type: 'order' | 'product' | 'review' | 'message'
  title: string
  description: string
  timestamp: string
  icon: React.ReactNode
  color: string
}

export function DashboardRecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'order',
      title: 'New Order',
      description: 'Order #2847 received - Engine Block Assembly Kit',
      timestamp: '2 hours ago',
      icon: <ShoppingCart className="w-4 h-4" />,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      id: '2',
      type: 'product',
      title: 'Product Added',
      description: '5x LED Headlight Conversion Kit added to inventory',
      timestamp: '4 hours ago',
      icon: <Package className="w-4 h-4" />,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      id: '3',
      type: 'review',
      title: 'New Review',
      description: '5-star review on Premium Brake Pads Set',
      timestamp: '5 hours ago',
      icon: <Star className="w-4 h-4" />,
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message',
      description: 'Customer inquiry about bulk ordering',
      timestamp: '6 hours ago',
      icon: <MessageSquare className="w-4 h-4" />,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    },
    {
      id: '5',
      type: 'order',
      title: 'Order Shipped',
      description: 'Order #2846 has been shipped - Tracking: FX123456',
      timestamp: '8 hours ago',
      icon: <ShoppingCart className="w-4 h-4" />,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
  ]

  return (
    <div className="chart-container">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">Latest updates from your store</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{activity.title}</p>
              <p className="text-sm text-muted-foreground truncate">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        View all activity →
      </button>
    </div>
  )
}
