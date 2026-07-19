'use client'

import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Sample data
const revenueData = [
  { month: 'Jan', revenue: 4000, orders: 240 },
  { month: 'Feb', revenue: 3000, orders: 221 },
  { month: 'Mar', revenue: 2000, orders: 229 },
  { month: 'Apr', revenue: 2780, orders: 200 },
  { month: 'May', revenue: 1890, orders: 250 },
  { month: 'Jun', revenue: 2390, orders: 340 },
  { month: 'Jul', revenue: 3490, orders: 430 },
]

const categoryData = [
  { name: 'Engine Parts', value: 38 },
  { name: 'Accessories', value: 28 },
  { name: 'Lighting', value: 20 },
  { name: 'Other', value: 14 },
]

const COLORS = ['#E9CC2F', '#3B82F6', '#10B981', '#F59E0B']

export function DashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <div className="chart-container">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground">Revenue Trend</h2>
          <p className="text-sm text-muted-foreground">Monthly revenue and orders</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution */}
      <div className="chart-container">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground">Category Distribution</h2>
          <p className="text-sm text-muted-foreground">Products by category</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: '1px solid var(--color-border)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
