'use client'

import { Bell, User, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from "@/contexts/AuthContext"

interface AdminHeaderProps {
  title: string
  description: string
  onMenuClick: () => void
}

export function AdminHeader({ title, description, onMenuClick }: AdminHeaderProps) {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="dashboard-header flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-[#1A1A1A]">{title}</h1>
          <p className="text-xs md:text-sm text-gray-500 hidden sm:block">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative p-2 hover:bg-gray-100 rounded-lg"
        >
          <Bell className="w-4 h-4 md:w-5 md:h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
            >
              <span className="text-xs md:text-sm font-bold">AD</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 md:w-56">
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm">
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 text-sm">
              <Bell className="w-4 h-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}