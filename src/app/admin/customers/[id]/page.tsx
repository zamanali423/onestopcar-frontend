'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft, Mail, Phone, ShoppingBag, DollarSign, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { allCustomers, getCustomerById } from '@/lib/mock/customers'

export default function CustomerDetailPage() {
  const params = useParams()
  const customerId = params.id as string
  const [customer, setCustomer] = useState<typeof allCustomers[0] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await getCustomerById(customerId)
      if (response.data) {
        setCustomer(response.data)
      }
      setLoading(false)
    }
    fetchCustomer()
  }, [customerId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E9CC2F]"></div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="space-y-6">
        <Link href="/admin/customers">
          <Button variant="outline" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Customers
          </Button>
        </Link>
        <div className="text-center p-12 rounded-xl border border-gray-200 bg-white">
          <p className="text-gray-500">Customer not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/customers">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Customers
        </Button>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: customer.avatarColor }}
          >
            {customer.initials}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">{customer.name}</h1>
            <p className="text-sm text-gray-500">Customer since {customer.joinDate}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
          customer.status === 'active'
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {customer.status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Orders', value: customer.orders, icon: ShoppingBag, color: 'text-blue-600' },
          { label: 'Total Spent', value: `Rs ${customer.totalSpent.toLocaleString()}`, icon: DollarSign, color: 'text-[#E9CC2F]' },
          { label: 'Email', value: customer.email, icon: Mail, color: 'text-purple-600' },
          { label: 'Phone', value: customer.phone, icon: Phone, color: 'text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
            <p className="mt-2 text-xl font-bold text-[#1A1A1A]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Customer Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-[#1A1A1A]">{customer.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-[#1A1A1A]">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium text-[#1A1A1A]">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-medium text-[#1A1A1A]">{customer.joinDate}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
              <span className="text-sm text-gray-600">Total Orders</span>
              <span className="font-bold text-[#1A1A1A]">{customer.orders}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
              <span className="text-sm text-gray-600">Total Spent</span>
              <span className="font-bold text-[#E9CC2F]">Rs {customer.totalSpent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
              <span className="text-sm text-gray-600">Average Order Value</span>
              <span className="font-bold text-[#1A1A1A]">
                Rs {customer.orders > 0 ? (customer.totalSpent / customer.orders).toLocaleString() : '0'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
              <span className="text-sm text-gray-600">Status</span>
              <span className={`font-bold ${customer.status === 'active' ? 'text-emerald-600' : 'text-gray-500'}`}>
                {customer.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </Button>
        <Button variant="outline" className="border-gray-200">
          <Phone className="w-4 h-4 mr-2" />
          Call Customer
        </Button>
        <Link href={`/admin/orders?customer=${customer.id}`}>
          <Button variant="outline" className="border-gray-200">
            <ShoppingBag className="w-4 h-4 mr-2" />
            View Orders
          </Button>
        </Link>
      </div>
    </div>
  )
}