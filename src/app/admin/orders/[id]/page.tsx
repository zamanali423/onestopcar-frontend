'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, User, Truck, CreditCard, Calendar, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getOrderById, STATUS_META, type MockOrder } from '@/lib/mock/orders'

export default function OrderDetailPage() {
    const params = useParams()
    const orderId = params.id as string
    const [order, setOrder] = useState<MockOrder | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await getOrderById(orderId)
            if (response.data) {
                setOrder(response.data)
            }
            setLoading(false)
        }
        fetchOrder()
    }, [orderId])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E9CC2F]"></div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="space-y-6">
                <Link href="/admin/orders">
                    <Button variant="outline" className="mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Orders
                    </Button>
                </Link>
                <div className="text-center p-12 rounded-xl border border-gray-200 bg-white">
                    <p className="text-gray-500">Order not found</p>
                </div>
            </div>
        )
    }

    const statusMeta = STATUS_META[order.status]
    const totalItems = order.products.reduce((sum, p) => sum + p.quantity, 0)

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Link href="/admin/orders">
                <Button variant="outline" className="mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Orders
                </Button>
            </Link>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
                        Order {order.orderNumber}
                    </h1>
                    <p className="text-sm text-gray-500">Placed on {order.dates.placed}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${statusMeta.bg} ${statusMeta.color} ${statusMeta.border} border`}>
                        {statusMeta.label}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold ${order.payment.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                        {order.payment.status}
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Items', value: totalItems, icon: Package, color: 'text-blue-600' },
                    { label: 'Total Amount', value: `Rs ${order.pricing.grandTotal.toLocaleString()}`, icon: CreditCard, color: 'text-[#E9CC2F]' },
                    { label: 'Payment Method', value: order.payment.method, icon: CreditCard, color: 'text-purple-600' },
                    { label: 'Expected Delivery', value: order.dates.expectedDelivery, icon: Calendar, color: 'text-emerald-600' },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <stat.icon className={`w-4 h-4 ${stat.color}`} />
                            <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                        <p className="mt-1 text-lg font-bold text-[#1A1A1A]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-[#E9CC2F]" />
                        Order Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Order Number</span>
                            <span className="font-mono font-bold text-[#1A1A1A]">{order.orderNumber}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Placed On</span>
                            <span className="font-medium text-[#1A1A1A]">{order.dates.placed}</span>
                        </div>
                        {order.dates.confirmed && (
                            <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                                <span className="text-sm text-gray-500">Confirmed On</span>
                                <span className="font-medium text-[#1A1A1A]">{order.dates.confirmed}</span>
                            </div>
                        )}
                        {order.dates.shipped && (
                            <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                                <span className="text-sm text-gray-500">Shipped On</span>
                                <span className="font-medium text-[#1A1A1A]">{order.dates.shipped}</span>
                            </div>
                        )}
                        {order.dates.delivered && (
                            <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                                <span className="text-sm text-gray-500">Delivered On</span>
                                <span className="font-medium text-emerald-600">{order.dates.delivered}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Expected Delivery</span>
                            <span className="font-medium text-[#1A1A1A]">{order.dates.expectedDelivery}</span>
                        </div>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#E9CC2F]" />
                        Customer Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Name</span>
                            <span className="font-medium text-[#1A1A1A]">{order.customer.name}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Email</span>
                            <span className="font-medium text-[#1A1A1A]">{order.customer.email}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Phone</span>
                            <span className="font-medium text-[#1A1A1A]">{order.customer.phone}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Payment Method</span>
                            <span className="font-medium text-[#1A1A1A]">{order.payment.method}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Payment Status</span>
                            <span className={`font-medium ${order.payment.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {order.payment.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Information */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#E9CC2F]" />
                    Shipping Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Courier</span>
                            <span className="font-medium text-[#1A1A1A]">{order.courier.name}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Tracking ID</span>
                            <span className="font-mono font-bold text-[#E9CC2F]">{order.courier.trackingId}</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-[#F8FAFC] rounded-lg">
                            <span className="text-sm text-gray-500">Shipping Address</span>
                            <span className="font-medium text-[#1A1A1A] text-right">
                                {order.address.street}<br />
                                {order.address.city}, {order.address.province}<br />
                                {order.address.postalCode}, {order.address.country}
                            </span>
                        </div>
                        {order.address.instructions && (
                            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                                <span className="text-sm text-amber-600">Delivery Instructions</span>
                                <span className="font-medium text-amber-700">{order.address.instructions}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 bg-[#F8FAFC]">
                    <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#E9CC2F]" />
                        Products ({totalItems} items)
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F8FAFC] border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Category</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Qty</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {order.products.map((product) => (
                                <tr key={product.id} className="hover:bg-[#F8FAFC] transition-colors">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-semibold text-[#1A1A1A] text-sm">{product.name}</p>
                                            <p className="text-xs text-gray-400">SKU: {product.id}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">{product.category}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">{product.quantity}</td>
                                    <td className="px-4 py-3 text-sm text-gray-600">Rs {product.price.toLocaleString()}</td>
                                    <td className="px-4 py-3 text-right font-bold text-[#1A1A1A]">
                                        Rs {(product.price * product.quantity).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="border-t border-gray-200 bg-[#F8FAFC]">
                            <tr>
                                <td colSpan={4} className="px-4 py-3 text-right font-semibold text-gray-600">Subtotal</td>
                                <td className="px-4 py-3 text-right font-bold text-[#1A1A1A]">Rs {order.pricing.subtotal.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="px-4 py-3 text-right font-semibold text-gray-600">Shipping</td>
                                <td className="px-4 py-3 text-right font-bold text-[#1A1A1A]">
                                    {order.pricing.shipping === 0 ? 'Free' : `Rs ${order.pricing.shipping.toLocaleString()}`}
                                </td>
                            </tr>
                            {order.pricing.discount > 0 && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-3 text-right font-semibold text-emerald-600">Discount</td>
                                    <td className="px-4 py-3 text-right font-bold text-emerald-600">-Rs {order.pricing.discount.toLocaleString()}</td>
                                </tr>
                            )}
                            <tr className="border-t border-gray-300">
                                <td colSpan={4} className="px-4 py-3 text-right font-bold text-[#1A1A1A] text-lg">Grand Total</td>
                                <td className="px-4 py-3 text-right font-bold text-[#E9CC2F] text-lg">
                                    Rs {order.pricing.grandTotal.toLocaleString()}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
                <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
                    Update Status
                </Button>
                <Button variant="outline" className="border-gray-200">
                    <Truck className="w-4 h-4 mr-2" />
                    Track Order
                </Button>
                <Button variant="outline" className="border-gray-200">
                    Print Invoice
                </Button>
            </div>
        </div>
    )
}