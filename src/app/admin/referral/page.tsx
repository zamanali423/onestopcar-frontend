'use client'

import { useState } from 'react'
import {
  Users,
  Gift,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  UserPlus,
  Award,
  Clock,
  CheckCircle,
  XCircle
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

// Mock data
const referralStats = [
  { label: "Total Referrals", value: "1,234", icon: Users, color: "text-[#F97316]", bgColor: "bg-orange-100" },
  { label: "Active Referrers", value: "456", icon: Gift, color: "text-green-600", bgColor: "bg-green-100" },
  { label: "Conversion Rate", value: "32%", icon: TrendingUp, color: "text-blue-600", bgColor: "bg-blue-100" },
  { label: "Total Rewards", value: "Rs 18,450", icon: DollarSign, color: "text-purple-600", bgColor: "bg-purple-100" },
]

const recentReferrals = [
  { id: 1, referrer: "John Smith", referred: "Sarah Johnson", date: "Jan 12, 2024", status: "Completed", reward: "Rs 15.00" },
  { id: 2, referrer: "Mike Davis", referred: "Emily Brown", date: "Jan 10, 2024", status: "Pending", reward: "Rs 15.00" },
  { id: 3, referrer: "Chris Wilson", referred: "Alex Turner", date: "Jan 8, 2024", status: "Completed", reward: "Rs 15.00" },
  { id: 4, referrer: "Lisa Anderson", referred: "Tom Harris", date: "Jan 5, 2024", status: "Completed", reward: "Rs 15.00" },
  { id: 5, referrer: "Robert Chen", referred: "Emma Davis", date: "Jan 3, 2024", status: "Pending", reward: "Rs 15.00" },
  { id: 6, referrer: "Maria Garcia", referred: "James Wilson", date: "Jan 1, 2024", status: "Completed", reward: "Rs 15.00" },
  { id: 7, referrer: "David Kim", referred: "Sophia Lee", date: "Dec 30, 2023", status: "Completed", reward: "Rs 15.00" },
]

const topReferrers = [
  { id: 1, name: "John Smith", referrals: 45, earnings: "Rs 675.00", avatar: "JS", color: "from-[#F97316] to-[#DC2626]" },
  { id: 2, name: "Sarah Johnson", referrals: 38, earnings: "Rs 570.00", avatar: "SJ", color: "from-[#8B5CF6] to-[#6D28D9]" },
  { id: 3, name: "Mike Davis", referrals: 32, earnings: "Rs 480.00", avatar: "MD", color: "from-[#3B82F6] to-[#1D4ED8]" },
  { id: 4, name: "Emily Brown", referrals: 28, earnings: "Rs 420.00", avatar: "EB", color: "from-[#10B981] to-[#047857]" },
  { id: 5, name: "Chris Wilson", referrals: 25, earnings: "Rs 375.00", avatar: "CW", color: "from-[#F59E0B] to-[#B45309]" },
]

export default function AdminReferralPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredReferrals = recentReferrals.filter(referral => {
    const matchesSearch =
      referral.referrer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referral.referred.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = filterStatus === 'all' || referral.status.toLowerCase() === filterStatus

    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredReferrals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReferrals = filteredReferrals.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"><CheckCircle className="w-3 h-3" /> Completed</span>
    } else {
      return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700"><Clock className="w-3 h-3" /> Pending</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Referral Program Overview</h1>
          <p className="text-sm text-gray-500">Track and manage customer referral performance</p>
        </div>
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Referral
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {referralStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className={`rounded-full ${stat.bgColor} p-3 w-fit`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">{stat.label}</p>
            <h3 className="mt-1 text-2xl font-bold text-[#1A1A1A]">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search referrals by referrer or referred..."
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <Button variant="outline" className="flex items-center gap-2 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-gray-200 bg-[#F8FAFC] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#1A1A1A] flex items-center gap-2">
            <Gift className="w-4 h-4 text-[#E9CC2F]" />
            Recent Referrals
          </h2>
          <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
            View All
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Referrer</TableHead>
              <TableHead className="w-[25%] hidden sm:table-cell">Referred</TableHead>
              <TableHead className="w-[15%] hidden md:table-cell">Date</TableHead>
              <TableHead className="w-[15%]">Status</TableHead>
              <TableHead className="w-[15%]">Reward</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReferrals.map((referral) => (
              <TableRow key={referral.id} className="hover:bg-[#F8FAFC] transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E9CC2F] to-[#B69E24] flex items-center justify-center text-white font-bold text-xs">
                      {referral.referrer.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-[#1A1A1A] text-sm">{referral.referrer}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="text-sm text-gray-600">{referral.referred}</span>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-gray-500">{referral.date}</span>
                </TableCell>
                <TableCell>
                  {getStatusBadge(referral.status)}
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-[#E9CC2F]">{referral.reward}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredReferrals.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No referrals found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredReferrals.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-[#F8FAFC]">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredReferrals.length)} of {filteredReferrals.length} referrals
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

      {/* Top Referrers & Performance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Referrers */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#E9CC2F]" />
              Top Referrers
            </h2>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50">
              View All
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {topReferrers.map((referrer) => (
              <div key={referrer.id} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-3 hover:border-[#E9CC2F] transition-all">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${referrer.color} flex items-center justify-center text-white font-semibold text-sm`}>
                    {referrer.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A] text-sm">{referrer.name}</p>
                    <p className="text-xs text-gray-500">{referrer.referrals} referrals</p>
                  </div>
                </div>
                <p className="font-bold text-[#E9CC2F]">{referrer.earnings}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Program Performance */}
        <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#1A1A1A] to-[#2d2d2d] p-6 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#E9CC2F]" />
            Program Performance
          </h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-sm text-gray-300">This Month</span>
              <span className="font-semibold text-emerald-400">+18%</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-sm text-gray-300">Conversion Rate</span>
              <span className="font-semibold">32%</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-sm text-gray-300">Avg. Time to Convert</span>
              <span className="font-semibold">5.2 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Reward Payout Rate</span>
              <span className="font-semibold text-emerald-400">94%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#E9CC2F]" />
          Quick Actions
        </h2>
        <div className="mt-4 grid gap-3 grid-cols-2 md:grid-cols-4">
          <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#E9CC2F]">
            <Users className="mr-2 h-4 w-4" />
            Manage Referrers
          </Button>
          <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#E9CC2F]">
            <Gift className="mr-2 h-4 w-4" />
            Configure Rewards
          </Button>
          <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#E9CC2F]">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button variant="outline" className="w-full justify-start border-gray-200 hover:border-[#E9CC2F]">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Payouts
          </Button>
        </div>
      </div>
    </div>
  )
}