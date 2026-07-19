'use client'

import { useEffect, useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Pagination } from '@/components/ui/pagination'
import { getInventoryItems, type InventoryItem } from '@/lib/mock/inventory'

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('all')
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 5

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = filteredItems.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    const loadItems = async () => {
      const response = await getInventoryItems()
      if (response.data) {
        setItems(response.data)
      }
      setLoading(false)
    }
    loadItems()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"><CheckCircle className="w-3 h-3" /> In Stock</span>
      case 'low-stock':
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"><AlertCircle className="w-3 h-3" /> Low Stock</span>
      case 'out-of-stock':
        return <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"><AlertCircle className="w-3 h-3" /> Out of Stock</span>
      default:
        return null
    }
  }

  const getStockIndicator = (stock: number, minStock: number, maxStock: number) => {
    const percentage = Math.min(100, (stock / maxStock) * 100)
    const color = stock === 0 ? 'bg-red-500' : stock < minStock ? 'bg-amber-500' : 'bg-emerald-500'
    return { percentage, color }
  }

  // Stats
  const totalItems = items.length
  const totalStock = items.reduce((sum, item) => sum + item.stock, 0)
  const lowStockCount = items.filter(item => item.status === 'low-stock').length
  const outOfStockCount = items.filter(item => item.status === 'out-of-stock').length
  const totalValue = items.reduce((sum, item) => sum + (item.stock * item.price), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Inventory Management</h1>
          <p className="text-sm text-gray-500">Track and manage stock levels</p>
        </div>
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">Total Items</span>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalItems}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">Total Stock</span>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalStock}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Low Stock</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-1">{lowStockCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Out of Stock</span>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1">{outOfStockCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-[#E9CC2F] mt-1">${totalValue.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, SKU, category or supplier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Product</TableHead>
              <TableHead className="w-[10%] hidden sm:table-cell">SKU</TableHead>
              <TableHead className="w-[12%] hidden md:table-cell">Category</TableHead>
              <TableHead className="w-[15%]">Stock</TableHead>
              <TableHead className="w-[10%] hidden lg:table-cell">Price</TableHead>
              <TableHead className="w-[12%]">Status</TableHead>
              <TableHead className="w-[10%] hidden xl:table-cell">Location</TableHead>
              <TableHead className="w-[11%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((item) => {
              const { percentage, color } = getStockIndicator(item.stock, item.minStock, item.maxStock)
              return (
                <TableRow key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-semibold text-[#1A1A1A] text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">Supplier: {item.supplier}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm font-mono text-gray-600">{item.sku}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-gray-600">{item.category}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${item.stock === 0 ? 'text-red-600' : item.stock < item.minStock ? 'text-amber-600' : 'text-emerald-600'}`}>
                          {item.stock}
                        </span>
                        <span className="text-xs text-gray-400">{Math.round(percentage)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${color}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                        <span>Min: {item.minStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="font-medium text-[#1A1A1A]">${item.price.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    <span className="text-sm text-gray-600">{item.location}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No inventory items found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-[#F8FAFC]">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} items
            </p>
            <Pagination
              current={currentPage}
              total={totalPages}
              hrefBuilder={(page) => `#page-${page}`}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}