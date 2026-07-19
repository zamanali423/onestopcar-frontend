'use client'

import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Users,
  Shield,
  Lock,
  ChevronLeft,
  ChevronRight,
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

const mockRoles = [
  {
    id: 1,
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: 12,
    users: 2,
    usersList: ['Muhammad Abiid', 'Muhammad Abiid (Accountant)'],
    color: 'bg-red-100 text-red-700 border-red-200',
  },
  {
    id: 2,
    name: 'CEO',
    description: 'Executive level access with strategic permissions',
    permissions: 10,
    users: 1,
    usersList: ['Zaman Ali'],
    color: 'bg-purple-100 text-purple-700 border-purple-200',
  },
  {
    id: 3,
    name: 'Manager',
    description: 'Team management and operational permissions',
    permissions: 8,
    users: 2,
    usersList: ['Muhammad Shahid'],
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    id: 4,
    name: 'Accountant',
    description: 'Financial and accounting access',
    permissions: 6,
    users: 1,
    usersList: ['Muhammad Abiid'],
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  {
    id: 5,
    name: 'Editor',
    description: 'Content creation and management',
    permissions: 5,
    users: 8,
    usersList: ['Sarah Khan', 'Ahmed Raza', 'Fatima Ali', 'Usman Malik', 'Ayesha Noor'],
    color: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  {
    id: 6,
    name: 'Viewer',
    description: 'Read-only access to reports and data',
    permissions: 2,
    users: 15,
    usersList: ['Guest User 1', 'Guest User 2', 'Guest User 3'],
    color: 'bg-gray-100 text-gray-700 border-gray-200',
  },
]

export default function RolesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredRoles = mockRoles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.usersList.some(user => user.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Pagination
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedRoles = filteredRoles.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Stats
  const totalRoles = mockRoles.length
  const totalUsers = mockRoles.reduce((sum, role) => sum + role.users, 0)
  const totalPermissions = mockRoles.reduce((sum, role) => sum + role.permissions, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">Roles & Permissions</h1>
          <p className="text-sm text-gray-500">Manage user roles and access levels</p>
        </div>
        <Button className="bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]">
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <span className="text-sm text-gray-500">Total Roles</span>
          <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{totalRoles}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Users</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{totalUsers}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Permissions</span>
            <Shield className="w-4 h-4 text-[#E9CC2F]" />
          </div>
          <p className="text-2xl font-bold text-[#E9CC2F] mt-1">{totalPermissions}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search roles by name, description or users..."
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

      {/* Roles Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20%]">Role Name</TableHead>
              <TableHead className="w-[25%] hidden md:table-cell">Description</TableHead>
              <TableHead className="w-[15%]">Permissions</TableHead>
              <TableHead className="w-[15%]">Users</TableHead>
              <TableHead className="w-[15%] hidden lg:table-cell">Assigned Users</TableHead>
              <TableHead className="w-[10%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRoles.map((role) => (
              <TableRow key={role.id} className="hover:bg-[#F8FAFC] transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${role.color.split(' ')[0]}`} />
                    <span className="font-semibold text-[#1A1A1A] text-sm">{role.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span className="text-sm text-gray-500">{role.description}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-gray-400" />
                    <span className="font-medium text-[#1A1A1A]">{role.permissions}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="font-medium text-[#1A1A1A]">{role.users}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {role.usersList.slice(0, 3).map((user, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                        {user}
                      </span>
                    ))}
                    {role.usersList.length > 3 && (
                      <span className="text-xs text-gray-400">+{role.usersList.length - 3} more</span>
                    )}
                  </div>
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
            ))}
          </TableBody>
        </Table>

        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No roles found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredRoles.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-[#F8FAFC]">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredRoles.length)} of {filteredRoles.length} roles
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