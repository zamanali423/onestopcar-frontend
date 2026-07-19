'use client'

import { useState } from 'react'
import {
  Plus,
  Car,
  Sofa,
  Smartphone,
  Sun,
  Droplets,
  Package,
  Eye,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockCategories, type CarModel } from '@/lib/mock/categories'
import { mockProducts } from '@/lib/mock/products'

// Map category IDs to Lucide icons
const categoryIcons: Record<string, React.ReactNode> = {
  exterior: <Car size={20} />,
  interior: <Sofa size={20} />,
  electronics: <Smartphone size={20} />,
  sunshades: <Sun size={20} />,
  carcare: <Droplets size={20} />,
}

// Map category IDs to colors
const categoryColors: Record<string, string> = {
  exterior: 'bg-blue-100 text-blue-600',
  interior: 'bg-purple-100 text-purple-600',
  electronics: 'bg-cyan-100 text-cyan-600',
  sunshades: 'bg-amber-100 text-amber-600',
  carcare: 'bg-emerald-100 text-emerald-600',
}

// Get product count by category
const getProductCount = (categoryId: string) => {
  return mockProducts.filter(p => p.category === categoryId).length
}

interface Category {
  id: string
  name: string
  icon?: React.ReactNode
  color?: string
  productCount?: number
}

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', icon: '📦' })
  const [categories, setCategories] = useState<Category[]>(
    mockCategories
      .filter(cat => cat.id !== 'all')
      .map(cat => ({
        ...cat,
        productCount: getProductCount(cat.id),
        icon: categoryIcons[cat.id] || <Package size={20} />,
        color: categoryColors[cat.id] || 'bg-gray-100 text-gray-600',
      }))
  )

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return

    const newId = newCategory.name.toLowerCase().replace(/\s+/g, '-')
    const newCat: Category = {
      id: newId,
      name: newCategory.name,
      productCount: 0,
      icon: <Package size={20} />,
      color: 'bg-gray-100 text-gray-600',
    }

    setCategories([...categories, newCat])
    setNewCategory({ name: '', icon: '📦' })
    setIsDialogOpen(false)
  }

  const totalProducts = categories.reduce((acc, cat) => acc + (cat.productCount || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Categories</h1>
          <p className="text-sm text-gray-500">
            {categories.length} categories • {totalProducts} total products
          </p>
        </div>
        <Button
          className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="group p-6 rounded-xl border border-gray-200 bg-white hover:border-[#E9CC2F] hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-[#B69E24] transition-colors capitalize">
                  {category.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-semibold text-[#E9CC2F]">
                    {category.productCount} products
                  </span>
                  {/* <span className="text-xs text-gray-300">•</span> */}
                  {/* <span className="text-xs text-gray-400">ID: {category.id}</span> */}
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.color || 'bg-gray-100 text-gray-600'} group-hover:scale-110 transition-transform`}>
                {category.icon || <Package size={20} />}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
              <button className="text-xs text-[#E9CC2F] font-semibold group-hover:underline flex items-center gap-1">
                View <Eye size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsDialogOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A]">Add New Category</h2>
                <p className="text-sm text-gray-500">Create a new product category</p>
              </div>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Dialog Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                  className="border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Icon
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { icon: '🚗', label: 'Car' },
                    { icon: '🛋️', label: 'Interior' },
                    { icon: '📱', label: 'Electronics' },
                    { icon: '🌞', label: 'Sun' },
                    { icon: '🧼', label: 'Clean' },
                    { icon: '📦', label: 'Box' },
                    { icon: '⭐', label: 'Star' },
                    { icon: '⚡', label: 'Zap' },
                    { icon: '🎵', label: 'Music' },
                    { icon: '🔧', label: 'Tools' },
                  ].map((item) => (
                    <button
                      key={item.icon}
                      onClick={() => setNewCategory({ ...newCategory, icon: item.icon })}
                      className={`w-10 h-10 rounded-xl border-2 transition-all ${newCategory.icon === item.icon
                          ? 'border-[#E9CC2F] bg-[#E9CC2F]/10'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
                  onClick={handleAddCategory}
                  disabled={!newCategory.name.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}