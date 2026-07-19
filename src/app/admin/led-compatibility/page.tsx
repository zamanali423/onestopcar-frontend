'use client'

import { useState } from 'react'
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  TrendingUp,
  Package,
  Car,
  Zap,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockVehicles } from '@/lib/mock/vehicles'

// LED Compatibility Data
interface LEDProduct {
  productId: string
  productName: string
  compatibility: number
  compatibleVehicles: string[]
}

const ledProducts: LEDProduct[] = [
  {
    productId: 'LED-001',
    productName: 'LED Headlight Conversion Kit',
    compatibility: 85,
    compatibleVehicles: [
      'toyota-corolla-2020',
      'toyota-corolla-2021',
      'honda-civic-2022',
      'honda-civic-2023',
      'suzuki-cultus-2020',
      'suzuki-cultus-2023',
      'kia-sportage-2020',
      'kia-sportage-2023',
      'hyundai-elantra-2022',
      'hyundai-elantra-2023',
    ],
  },
  {
    productId: 'LED-002',
    productName: 'LED Fog Light Kit',
    compatibility: 75,
    compatibleVehicles: [
      'toyota-corolla-2020',
      'toyota-corolla-2021',
      'toyota-yaris-2022',
      'honda-civic-2022',
      'honda-civic-2023',
      'honda-city-2021',
      'suzuki-swift-2023',
      'kia-sportage-2020',
      'kia-sportage-2023',
      'hyundai-elantra-2022',
    ],
  },
  {
    productId: 'LED-003',
    productName: 'LED Interior Light Kit',
    compatibility: 90,
    compatibleVehicles: [
      'toyota-corolla-2020',
      'toyota-corolla-2021',
      'toyota-yaris-2022',
      'toyota-fortuner-2023',
      'honda-civic-2022',
      'honda-civic-2023',
      'honda-accord-2023',
      'suzuki-cultus-2020',
      'suzuki-cultus-2023',
      'suzuki-swift-2023',
      'kia-sportage-2020',
      'kia-sportage-2023',
      'kia-sorento-2023',
      'hyundai-elantra-2022',
      'hyundai-tucson-2023',
    ],
  },
  {
    productId: 'LED-004',
    productName: 'LED Tail Light Kit',
    compatibility: 70,
    compatibleVehicles: [
      'toyota-corolla-2021',
      'honda-civic-2022',
      'honda-civic-2023',
      'honda-accord-2023',
      'suzuki-cultus-2023',
      'kia-sportage-2020',
      'kia-sportage-2023',
      'kia-sorento-2023',
      'hyundai-elantra-2022',
    ],
  },
  {
    productId: 'LED-005',
    productName: 'LED DRL (Daytime Running Light)',
    compatibility: 80,
    compatibleVehicles: [
      'toyota-corolla-2020',
      'toyota-corolla-2021',
      'toyota-yaris-2022',
      'honda-civic-2022',
      'honda-civic-2023',
      'honda-city-2021',
      'suzuki-cultus-2020',
      'suzuki-cultus-2023',
      'suzuki-swift-2023',
      'kia-sportage-2020',
      'kia-sportage-2023',
      'hyundai-elantra-2022',
      'hyundai-tucson-2023',
    ],
  },
  {
    productId: 'LED-006',
    productName: 'LED Turn Signal Kit',
    compatibility: 65,
    compatibleVehicles: [
      'toyota-corolla-2020',
      'toyota-corolla-2021',
      'honda-civic-2022',
      'honda-civic-2023',
      'suzuki-cultus-2020',
      'suzuki-cultus-2023',
      'kia-sportage-2020',
      'kia-sportage-2023',
      'hyundai-elantra-2022',
    ],
  },
]

export default function LEDCompatibilityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedProducts, setExpandedProducts] = useState<string[]>([])
  const [vehicles] = useState(mockVehicles)

  const vehicleMap = new Map(vehicles.map(v => [v.id, `${v.make} ${v.model} (${v.year})`]))

  // Filter products based on search
  const filteredProducts = ledProducts.filter(product =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.compatibleVehicles.some(id => {
      const vehicle = vehicles.find(v => v.id === id)
      return vehicle && `${vehicle.make} ${vehicle.model}`.toLowerCase().includes(searchQuery.toLowerCase())
    })
  )

  const toggleExpand = (productId: string) => {
    setExpandedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">LED Compatibility Matrix</h1>
        <p className="text-sm text-gray-500">View LED product compatibility with vehicles</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#E9CC2F]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-xl font-bold text-[#1A1A1A]">{ledProducts.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Car className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vehicles Covered</p>
              <p className="text-xl font-bold text-[#1A1A1A]">{vehicles.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Compatibility</p>
              <p className="text-xl font-bold text-[#E9CC2F]">
                {Math.round(ledProducts.reduce((acc, p) => acc + p.compatibility, 0) / ledProducts.length)}%
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Compatible</p>
              <p className="text-xl font-bold text-[#1A1A1A]">
                {ledProducts.reduce((acc, p) => acc + p.compatibleVehicles.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products or vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* LED Products Cards */}
      <div className="space-y-4">
        {filteredProducts.map((product) => {
          const isExpanded = expandedProducts.includes(product.productId)
          const compatibleCount = product.compatibleVehicles.length
          const totalVehicles = vehicles.length
          const compatibility = Math.round((compatibleCount / totalVehicles) * 100)

          return (
            <div key={product.productId} className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div
                className="p-4 md:p-6 cursor-pointer"
                onClick={() => toggleExpand(product.productId)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-base font-bold text-[#1A1A1A]">{product.productName}</h3>
                      <span className="text-xs text-gray-400 font-mono">#{product.productId}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${compatibility >= 80
                          ? 'bg-emerald-100 text-emerald-700'
                          : compatibility >= 60
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                        {compatibility >= 80 ? (
                          <CheckCircle size={10} />
                        ) : compatibility >= 60 ? (
                          <AlertCircle size={10} />
                        ) : (
                          <XCircle size={10} />
                        )}
                        {compatibility}% Compatibility
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Compatible with {compatibleCount} out of {totalVehicles} vehicles
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-2xl font-bold text-[#E9CC2F]">{compatibility}%</div>
                      <div className="text-xs text-gray-400">Match Rate</div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Compatibility Bar */}
                <div className="mt-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${compatibility >= 80
                          ? 'bg-emerald-500'
                          : compatibility >= 60
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                        }`}
                      style={{ width: `${compatibility}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Car size={16} className="text-[#E9CC2F]" />
                    Compatible Vehicles:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibleVehicles.map((vehicleId) => {
                      const vehicle = vehicles.find(v => v.id === vehicleId)
                      return vehicle ? (
                        <span
                          key={vehicleId}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                        >
                          <CheckCircle size={12} />
                          {vehicle.make} {vehicle.model} ({vehicle.year})
                        </span>
                      ) : null
                    })}
                  </div>

                  {/* Incompatible Vehicles */}
                  {compatibleCount < totalVehicles && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-400 mb-2">Not compatible with:</p>
                      <div className="flex flex-wrap gap-2">
                        {vehicles
                          .filter(v => !product.compatibleVehicles.includes(v.id))
                          .slice(0, 5)
                          .map((vehicle) => (
                            <span
                              key={vehicle.id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-400 border border-gray-200"
                            >
                              <XCircle size={12} />
                              {vehicle.make} {vehicle.model} ({vehicle.year})
                            </span>
                          ))}
                        {vehicles.filter(v => !product.compatibleVehicles.includes(v.id)).length > 5 && (
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-400 border border-gray-200">
                            +{vehicles.filter(v => !product.compatibleVehicles.includes(v.id)).length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No LED products found</p>
          </div>
        )}
      </div>

      {/* Matrix Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-gray-200 bg-[#F8FAFC] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
            <Zap size={18} className="text-[#E9CC2F]" />
            Compatibility Matrix
          </h2>
          <span className="text-xs text-gray-400">{vehicles.length} vehicles • {ledProducts.length} products</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#F8FAFC] border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky left-0 bg-[#F8FAFC]">
                  Product
                </th>
                {vehicles.slice(0, 8).map((vehicle) => (
                  <th
                    key={vehicle.id}
                    className="px-2 py-3 text-center text-xs font-semibold text-gray-600 min-w-[70px]"
                  >
                    <div className="text-[10px] leading-tight">
                      <div>{vehicle.make}</div>
                      <div>{vehicle.model}</div>
                    </div>
                  </th>
                ))}
                {vehicles.length > 8 && (
                  <th className="px-2 py-3 text-center text-xs font-semibold text-gray-400">
                    +{vehicles.length - 8} more
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.slice(0, 10).map((product) => (
                <tr key={product.productId} className="hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A] sticky left-0 bg-white whitespace-nowrap">
                    <div className="max-w-[150px] truncate">{product.productName}</div>
                  </td>
                  {vehicles.slice(0, 8).map((vehicle) => {
                    const isCompatible = product.compatibleVehicles.includes(vehicle.id)
                    return (
                      <td
                        key={`${product.productId}-${vehicle.id}`}
                        className="px-2 py-3 text-center"
                      >
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold transition-colors ${isCompatible
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-400'
                            }`}
                        >
                          {isCompatible ? '✓' : '−'}
                        </span>
                      </td>
                    )
                  })}
                  {vehicles.length > 8 && (
                    <td className="px-2 py-3 text-center text-xs text-gray-400">
                      <button className="text-[#E9CC2F] hover:underline">
                        View all
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}