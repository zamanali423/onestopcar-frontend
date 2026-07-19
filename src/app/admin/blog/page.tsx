'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Star,
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
import { mockBlogPosts } from '@/lib/mock/blogs'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredPosts = mockBlogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.categories.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"><CheckCircle className="w-3 h-3" /> Published</span>
      case 'draft':
        return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"><AlertCircle className="w-3 h-3" /> Draft</span>
      case 'scheduled':
        return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700"><Calendar className="w-3 h-3" /> Scheduled</span>
      case 'archived':
        return <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700"><Clock className="w-3 h-3" /> Archived</span>
      default:
        return null
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Stats
  const totalPosts = mockBlogPosts.length
  const publishedCount = mockBlogPosts.filter(p => p.status === 'published').length
  const draftCount = mockBlogPosts.filter(p => p.status === 'draft').length
  const scheduledCount = mockBlogPosts.filter(p => p.status === 'scheduled').length
  const totalViews = mockBlogPosts.reduce((sum, p) => sum + p.views, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Blog Posts</h1>
          <p className="text-sm text-gray-500">Manage your automotive blog content</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">Total</span>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalPosts}</p>
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
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Scheduled</span>
            <Calendar className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{scheduledCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Views</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalViews.toLocaleString()}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts by title, author or category..."
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

      {/* Blog Posts Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Title</TableHead>
              <TableHead className="w-[15%] hidden sm:table-cell">Author</TableHead>
              <TableHead className="w-[15%] hidden md:table-cell">Category</TableHead>
              <TableHead className="w-[10%] hidden lg:table-cell">Views</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[15%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPosts.map((post) => (
              <TableRow key={post.id} className="hover:bg-[#F8FAFC] transition-colors">
                <TableCell>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#1A1A1A] text-sm truncate max-w-[200px] sm:max-w-none">
                        {post.title}
                      </p>
                      {post.isFeatured && (
                        <Star className="w-3 h-3 fill-[#E9CC2F] text-[#E9CC2F] flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">{post.author.name}</p>
                    <p className="text-xs text-gray-400">{post.author.role}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {post.categories.slice(0, 2).map((category) => (
                      <span key={category.id} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                        {category.name}
                      </span>
                    ))}
                    {post.categories.length > 2 && (
                      <span className="text-xs text-gray-400">+{post.categories.length - 2}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm font-medium text-[#1A1A1A]">{post.views.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {getStatusBadge(post.status)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link href={`/admin/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-[#F8FAFC]">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
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