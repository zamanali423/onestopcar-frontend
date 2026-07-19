'use client'

import { useState } from 'react'
import {
  Calendar,
  Download,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  File,
  Eye
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

const mockReports = [
  {
    id: 1,
    name: 'Sales Report',
    description: 'Monthly sales and revenue analysis',
    format: 'PDF',
    size: '2.4 MB',
    date: '2024-01-15',
    generatedBy: 'Admin',
    downloads: 45,
  },
  {
    id: 2,
    name: 'Customer Report',
    description: 'Customer demographics and behavior',
    format: 'PDF',
    size: '1.8 MB',
    date: '2024-01-14',
    generatedBy: 'Admin',
    downloads: 32,
  },
  {
    id: 3,
    name: 'Inventory Report',
    description: 'Stock levels and product analysis',
    format: 'Excel',
    size: '3.1 MB',
    date: '2024-01-13',
    generatedBy: 'Manager',
    downloads: 28,
  },
  {
    id: 4,
    name: 'Performance Report',
    description: 'Dashboard performance metrics',
    format: 'PDF',
    size: '0.9 MB',
    date: '2024-01-12',
    generatedBy: 'Admin',
    downloads: 56,
  },
  {
    id: 5,
    name: 'Revenue Analysis',
    description: 'Quarterly revenue breakdown by product',
    format: 'Excel',
    size: '4.2 MB',
    date: '2024-01-11',
    generatedBy: 'Manager',
    downloads: 23,
  },
  {
    id: 6,
    name: 'Customer Feedback Report',
    description: 'Customer satisfaction and feedback analysis',
    format: 'PDF',
    size: '1.2 MB',
    date: '2024-01-10',
    generatedBy: 'Admin',
    downloads: 67,
  },
  {
    id: 7,
    name: 'Inventory Turnover Report',
    description: 'Inventory turnover and stock movement analysis',
    format: 'Excel',
    size: '2.8 MB',
    date: '2024-01-09',
    generatedBy: 'Manager',
    downloads: 19,
  },
]

const formatIcons: Record<string, React.ReactNode> = {
  PDF: <FileText className="w-4 h-4" />,
  Excel: <FileSpreadsheet className="w-4 h-4" />,
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterFormat, setFilterFormat] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredReports = mockReports.filter(report => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.generatedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFormat = filterFormat === 'all' || report.format === filterFormat

    return matchesSearch && matchesFormat
  })

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReports = filteredReports.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Stats
  const totalReports = mockReports.length
  const pdfCount = mockReports.filter(r => r.format === 'PDF').length
  const excelCount = mockReports.filter(r => r.format === 'Excel').length
  const totalDownloads = mockReports.reduce((sum, r) => sum + r.downloads, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Reports</h1>
          <p className="text-sm text-gray-500">Access business reports and analytics</p>
        </div>
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <Calendar className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">Total Reports</span>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalReports}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">PDF</span>
            <FileText className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1">{pdfCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Excel</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{excelCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Downloads</span>
          </div>
          <p className="text-2xl font-bold text-[#E9CC2F] mt-1">{totalDownloads.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports by name, description or generated by..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
          >
            <option value="all">All Formats</option>
            <option value="PDF">PDF</option>
            <option value="Excel">Excel</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Report Name</TableHead>
              <TableHead className="w-[25%] hidden md:table-cell">Description</TableHead>
              <TableHead className="w-[10%] hidden sm:table-cell">Format</TableHead>
              <TableHead className="w-[10%] hidden lg:table-cell">Date</TableHead>
              <TableHead className="w-[12%] hidden xl:table-cell">Generated By</TableHead>
              <TableHead className="w-[10%]">Downloads</TableHead>
              <TableHead className="w-[13%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow key={report.id} className="hover:bg-[#F8FAFC] transition-colors">
                <TableCell>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">{report.name}</p>
                    <p className="text-xs text-gray-400">{report.size}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <p className="text-sm text-gray-500">{report.description}</p>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${report.format === 'PDF'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-emerald-100 text-emerald-700'
                    }`}>
                    {formatIcons[report.format]}
                    {report.format}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm text-gray-500">{report.date}</span>
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  <span className="text-sm text-gray-600">{report.generatedBy}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-[#1A1A1A]">{report.downloads}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <File className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No reports found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredReports.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-[#F8FAFC]">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredReports.length)} of {filteredReports.length} reports
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