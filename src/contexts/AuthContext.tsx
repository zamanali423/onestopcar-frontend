// src/contexts/AuthContext.tsx
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/lib/auth/types'
import { toast } from '@/lib/toast'

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    isAdmin: boolean
    isCustomer: boolean
    isGuest: boolean
    login: (credentials: LoginCredentials) => Promise<void>
    register: (data: RegisterData) => Promise<void>
    logout: () => void
    switchToGuest: () => void
    updateUser: (data: Partial<User>) => Promise<void>
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo with passwords
const mockUsers: User[] = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@onestopcar.com',
        password: 'Admin@2024', // Added password
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: true,
        preferences: {
            notifications: true,
            newsletter: true,
            language: 'en',
            currency: 'PKR',
        },
    },
    {
        id: '2',
        name: 'Muhammad Abiid',
        email: 'abiid@onestopcar.com',
        password: 'Abiid@123', // Added password
        role: 'customer',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: true,
        phone: '+92 300 1234567',
        preferences: {
            notifications: true,
            newsletter: true,
            language: 'en',
            currency: 'PKR',
        },
    },
    {
        id: '3',
        name: 'Zaman Ali',
        email: 'zaman@onestopcar.com',
        password: 'Zaman@123', // Added password
        role: 'customer',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: false,
        phone: '+92 300 7654321',
        preferences: {
            notifications: false,
            newsletter: true,
            language: 'en',
            currency: 'PKR',
        },
    },
    // Add more users as needed
    {
        id: '4',
        name: 'Muhammad Shahid',
        email: 'shahid@onestopcar.com',
        password: 'Shahid@123', // Added password
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        emailVerified: true,
        phone: '+92 300 9876543',
        preferences: {
            notifications: true,
            newsletter: true,
            language: 'en',
            currency: 'PKR',
        },
    },
]

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Check for stored session
        const storedUser = localStorage.getItem('auth_user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch {
                localStorage.removeItem('auth_user')
            }
        }
        setIsLoading(false)
    }, [])

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            const foundUser = mockUsers.find(
                u => u.email === credentials.email && u.password === credentials.password
            )

            if (!foundUser) {
                toast('Invalid email or password')
                throw new Error('Invalid credentials')
            }

            if (foundUser.status === 'suspended') {
                toast('Your account has been suspended')
                throw new Error('Account suspended')
            }

            setUser(foundUser)
            localStorage.setItem('auth_user', JSON.stringify(foundUser))
            toast(`Welcome back, ${foundUser.name}!`)

            // Redirect based on role
            if (foundUser.role === 'admin') {
                router.push('/admin')
            } else {
                router.push('/dashboard')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (data: RegisterData) => {
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const existingUser = mockUsers.find(u => u.email === data.email)
            if (existingUser) {
                toast('Email already registered')
                throw new Error('Email already registered')
            }

            const newUser: User = {
                id: `user_${Date.now()}`,
                name: data.name,
                email: data.email,
                password: data.password,
                role: 'customer',
                status: 'active',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                emailVerified: false,
                phone: data.phone,
                preferences: {
                    notifications: true,
                    newsletter: true,
                    language: 'en',
                    currency: 'PKR',
                },
            }

            mockUsers.push(newUser)
            setUser(newUser)
            localStorage.setItem('auth_user', JSON.stringify(newUser))
            toast('Account created successfully! Please verify your email.')
            router.push('/dashboard')
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('auth_user')
        toast('Logged out successfully')
        router.push('/')
    }

    const switchToGuest = () => {
        const guestUser: User = {
            id: `guest_${Date.now()}`,
            name: 'Guest User',
            email: `guest_${Date.now()}@onestopcar.com`,
            password: '',
            role: 'guest',
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            emailVerified: false,
            preferences: {
                notifications: false,
                newsletter: false,
                language: 'en',
                currency: 'PKR',
            },
        }
        setUser(guestUser)
        localStorage.setItem('auth_user', JSON.stringify(guestUser))
        toast('Continue as guest')
        router.push('/')
    }

    const updateUser = async (data: Partial<User>) => {
        if (!user) return
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 500))
            const updatedUser = { ...user, ...data, updatedAt: new Date().toISOString() }
            setUser(updatedUser)
            localStorage.setItem('auth_user', JSON.stringify(updatedUser))
            toast('Profile updated successfully')
        } finally {
            setIsLoading(false)
        }
    }

    const changePassword = async (oldPassword: string, newPassword: string) => {
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 800))
            // In a real app, you would verify the old password and update it
            if (user) {
                // Check if old password matches
                const foundUser = mockUsers.find(u => u.id === user.id)
                if (foundUser && foundUser.password === oldPassword) {
                    foundUser.password = newPassword
                    toast('Password changed successfully')
                } else {
                    toast('Current password is incorrect')
                    throw new Error('Current password is incorrect')
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user && user.role !== 'guest',
                isAdmin: user?.role === 'admin',
                isCustomer: user?.role === 'customer',
                isGuest: user?.role === 'guest',
                login,
                register,
                logout,
                switchToGuest,
                updateUser,
                changePassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}