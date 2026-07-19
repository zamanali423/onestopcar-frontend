'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockBrands } from '@/lib/mock/brands'

export default function BrandsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Brands</h1>
          <p className="text-sm text-gray-500">Manage automotive brands</p>
        </div>
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <Plus className="w-4 h-4 mr-2" />
          Add Brand
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockBrands.map((brand) => (
          <div
            key={brand.id}
            className="group p-5 rounded-xl border border-gray-200 bg-white hover:border-[#E9CC2F] hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                style={{ backgroundColor: brand.color }}
              >
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#1A1A1A] group-hover:text-[#B69E24] transition-colors truncate">
                  {brand.name}
                </h3>
                <p className="text-sm text-gray-500">{brand.products} products</p>
                <p className="text-xs text-gray-400">{brand.country}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Active</span>
              <span className="text-xs text-[#E9CC2F] font-semibold group-hover:underline">Manage →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}