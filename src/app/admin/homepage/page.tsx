'use client'

import { useState } from 'react'
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
import {
  Edit,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react'

const sections = [
  {
    id: 1,
    name: 'Hero Section',
    status: 'published',
    lastModified: '2024-01-10',
    description: 'Main hero banner with call-to-action',
    order: 1,
  },
  {
    id: 2,
    name: 'Featured Products',
    status: 'published',
    lastModified: '2024-01-09',
    description: 'Showcase featured products',
    order: 2,
  },
  {
    id: 3,
    name: 'Categories Showcase',
    status: 'published',
    lastModified: '2024-01-08',
    description: 'Display product categories',
    order: 3,
  },
  {
    id: 4,
    name: 'Customer Testimonials',
    status: 'draft',
    lastModified: '2024-01-12',
    description: 'Customer reviews and testimonials',
    order: 4,
  },
  {
    id: 5,
    name: 'Newsletter Signup',
    status: 'published',
    lastModified: '2024-01-07',
    description: 'Email newsletter subscription form',
    order: 5,
  },
  {
    id: 6,
    name: 'Blog Section',
    status: 'draft',
    lastModified: '2024-01-11',
    description: 'Latest blog posts feed',
    order: 6,
  },
  {
    id: 7,
    name: 'Brand Showcase',
    status: 'published',
    lastModified: '2024-01-06',
    description: 'Featured brands and partners',
    order: 7,
  },
]

export default function HomepagePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredSections = sections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredSections.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedSections = filteredSections.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"><CheckCircle className="w-3 h-3" /> Published</span>
      case 'draft':
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"><AlertCircle className="w-3 h-3" /> Draft</span>
      default:
        return null
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Stats
  const totalSections = sections.length
  const publishedCount = sections.filter(s => s.status === 'published').length
  const draftCount = sections.filter(s => s.status === 'draft').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Homepage Management</h1>
          <p className="text-sm text-gray-500">Manage your store's homepage sections</p>
        </div>
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reorder Sections
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">Total Sections</span>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalSections}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Published</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{publishedCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Drafts</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-1">{draftCount}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sections by name or description..."
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

      {/* Sections Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[5%]">#</TableHead>
              <TableHead className="w-[25%]">Section Name</TableHead>
              <TableHead className="w-[30%] hidden md:table-cell">Description</TableHead>
              <TableHead className="w-[15%] hidden sm:table-cell">Last Modified</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[10%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSections.map((section) => (
              <TableRow key={section.id} className="hover:bg-[#F8FAFC] transition-colors">
                <TableCell>
                  <span className="text-sm font-medium text-gray-400">{section.order}</span>
                </TableCell>
                <TableCell>
                  <p className="font-semibold text-[#1A1A1A] text-sm">{section.name}</p>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <p className="text-sm text-gray-500">{section.description}</p>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-500">{section.lastModified}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(section.status)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No sections found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredSections.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-[#F8FAFC]">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredSections.length)} of {filteredSections.length} sections
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