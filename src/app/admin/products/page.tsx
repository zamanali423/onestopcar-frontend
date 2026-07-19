'use client'

import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductsTable } from '@/components/admin/products/products-table'
import { ProductDialog } from '@/components/admin/products/product-dialog'
import Link from 'next/link'

export default function ProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Products</h1>
          <p className="text-sm text-gray-500">Manage your automotive products inventory</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
          <Link href="/admin/products/new">
            <Button className="bg-[#1A1A1A] text-white hover:bg-[#2d2d2d]">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name, SKU or category..."
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

      {/* Products Table */}
      <ProductsTable searchQuery={searchQuery} />

      {/* Product Dialog */}
      <ProductDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}