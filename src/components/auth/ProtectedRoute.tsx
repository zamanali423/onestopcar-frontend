// src/components/auth/ProtectedRoute.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProtectedRouteProps {
    children: React.ReactNode
    allowedRoles?: ('admin' | 'customer' | 'guest')[]
    requireAuth?: boolean
}

export function ProtectedRoute({
    children,
    allowedRoles = [],
    requireAuth = true
}: ProtectedRouteProps) {
    const { user, isLoading, isAuthenticated, isGuest } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading) {
            // If authentication is required and user is not authenticated
            if (requireAuth && !isAuthenticated && !isGuest) {
                router.push('/auth/login')
                return
            }

            // If roles are specified and user doesn't have access
            if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
                router.push('/unauthorized')
                return
            }
        }
    }, [isLoading, isAuthenticated, isGuest, user, router, requireAuth, allowedRoles])

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E9CC2F]" />
            </div>
        )
    }

    // If authentication is required and user is not authenticated, don't render
    if (requireAuth && !isAuthenticated && !isGuest) {
        return null
    }

    // If roles are specified and user doesn't have access, don't render
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        return null
    }

    return <>{children}</>
}