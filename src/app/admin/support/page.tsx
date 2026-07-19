'use client'

import { useState } from 'react'
import {
  Search,
  Plus,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
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

const mockTickets = [
  {
    id: 'TKT-001',
    subject: 'Product compatibility issue',
    customer: 'John Davis',
    status: 'open',
    priority: 'high',
    date: '2024-01-15',
    message: 'The LED headlight kit is not compatible with my vehicle...',
  },
  {
    id: 'TKT-002',
    subject: 'Shipping delay inquiry',
    customer: 'Sarah Martinez',
    status: 'in-progress',
    priority: 'medium',
    date: '2024-01-14',
    message: 'My order was supposed to arrive yesterday but still not here...',
  },
  {
    id: 'TKT-003',
    subject: 'Refund request',
    customer: 'Michael Chen',
    status: 'closed',
    priority: 'high',
    date: '2024-01-13',
    message: 'I would like to request a refund for my recent purchase...',
  },
  {
    id: 'TKT-004',
    subject: 'Technical support needed',
    customer: 'Emma Wilson',
    status: 'open',
    priority: 'low',
    date: '2024-01-12',
    message: 'I need help with installing the brake pads...',
  },
  {
    id: 'TKT-005',
    subject: 'Order cancellation request',
    customer: 'Robert Johnson',
    status: 'in-progress',
    priority: 'medium',
    date: '2024-01-11',
    message: 'I need to cancel my order #ORD-2024-015...',
  },
  {
    id: 'TKT-006',
    subject: 'Product damaged on arrival',
    customer: 'Lisa Anderson',
    status: 'open',
    priority: 'high',
    date: '2024-01-10',
    message: 'The product arrived damaged and I need a replacement...',
  },
  {
    id: 'TKT-007',
    subject: 'Tracking information not updating',
    customer: 'Mark Thompson',
    status: 'closed',
    priority: 'low',
    date: '2024-01-09',
    message: 'The tracking number shows no updates for 3 days...',
  },
]

const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  open: { bg: 'bg-red-100', text: 'text-red-700', icon: <XCircle className="w-3 h-3" /> },
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', icon: <Clock className="w-3 h-3" /> },
  closed: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: <CheckCircle className="w-3 h-3" /> },
}

const priorityColors: Record<string, string> = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-amber-600 bg-amber-50 border-amber-200',
  low: 'text-emerald-600 bg-emerald-50 border-emerald-200',
}

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Stats
  const totalTickets = mockTickets.length
  const openCount = mockTickets.filter(t => t.status === 'open').length
  const inProgressCount = mockTickets.filter(t => t.status === 'in-progress').length
  const closedCount = mockTickets.filter(t => t.status === 'closed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Support Tickets</h1>
          <p className="text-sm text-gray-500">Manage customer support requests</p>
        </div>
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">Total Tickets</span>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalTickets}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Open</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1">{openCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">In Progress</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{inProgressCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Closed</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{closedCount}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets by ID, subject or customer..."
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
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/50 focus:border-[#E9CC2F]"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%]">Ticket ID</TableHead>
              <TableHead className="w-[25%]">Subject</TableHead>
              <TableHead className="w-[15%] hidden sm:table-cell">Customer</TableHead>
              <TableHead className="w-[12%] hidden md:table-cell">Priority</TableHead>
              <TableHead className="w-[13%]">Status</TableHead>
              <TableHead className="w-[10%] hidden lg:table-cell">Date</TableHead>
              <TableHead className="w-[15%] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTickets.map((ticket) => (
              <TableRow key={ticket.id} className="hover:bg-[#F8FAFC] transition-colors">
                <TableCell>
                  <span className="font-mono text-sm font-semibold text-[#E9CC2F]">{ticket.id}</span>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">{ticket.subject}</p>
                    <p className="text-xs text-gray-400 truncate max-w-[150px]">{ticket.message}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-sm text-gray-600">{ticket.customer}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${priorityColors[ticket.priority]}`}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${statusColors[ticket.status].bg} ${statusColors[ticket.status].text}`}>
                    {statusColors[ticket.status].icon}
                    {ticket.status === 'in-progress' ? 'In Progress' : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="text-sm text-gray-500">{ticket.date}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[#E9CC2F]/10 hover:text-[#E9CC2F]">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tickets found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredTickets.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-[#F8FAFC]">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length} tickets
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