// src/app/auth/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Shield,
    Sparkles,
    Car,
    CheckCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useFormWithZod } from '@/lib/hooks/useFormWithZod'
import { loginSchema, type LoginInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function LoginPage() {
    const { login, switchToGuest } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useFormWithZod(loginSchema, {
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    })

    const onSubmit = async (data: LoginInput) => {
        setIsLoading(true)
        try {
            await login(data)
        } catch (error) {
            setError('root', {
                message: 'Invalid email or password',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] via-white to-[#F8FAFC] p-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E9CC2F]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#E9CC2F]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E9CC2F]/[0.02] rounded-full blur-3xl" />

                {/* Animated floating shapes */}
                <motion.div
                    animate={{ y: [-30, 30, -30] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-24 right-24 w-5 h-5 bg-[#E9CC2F]/20 rounded-full"
                />
                <motion.div
                    animate={{ y: [30, -30, 30] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-40 left-24 w-4 h-4 bg-[#E9CC2F]/15 rounded-full"
                />
                <motion.div
                    animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-20 w-6 h-6 border-2 border-[#E9CC2F]/10 rounded-full"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-32 w-3 h-3 bg-[#E9CC2F]/25 rounded-full"
                />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo & Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-500">
                        Sign in to access your account and continue shopping
                    </p>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-6 md:p-8"
                >
                    {/* Quick Access Badges */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="flex items-center gap-1">
                            <div className="flex -space-x-2">
                                {['#1', '#2', '#3'].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E9CC2F] to-[#B69E24] border-2 border-white flex items-center justify-center text-[8px] font-bold text-[#1A1A1A]"
                                    >
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs text-gray-400 ml-2">Secure Login</span>
                        </div>
                        <div className="w-px h-4 bg-gray-200" />
                        <div className="flex items-center gap-1">
                            <Shield size={12} className="text-[#E9CC2F]" />
                            <span className="text-xs text-gray-400">Encrypted</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E9CC2F] transition-colors">
                                    <Mail size={18} />
                                </div>
                                <Input
                                    type="email"
                                    {...register('email')}
                                    placeholder="admin@onestopcar.com"
                                    className={`pl-10 py-3 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : ''
                                        }`}
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                                >
                                    <span className="w-1 h-1 rounded-full bg-red-500" />
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Password */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E9CC2F] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    placeholder="Enter your password"
                                    className={`pl-10 pr-12 py-3 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20 transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : ''
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1.5">{errors.password.message}</p>
                            )}

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between mt-3">
                                <label className="flex items-center gap-2 group cursor-pointer">
                                    <input
                                        type="checkbox"
                                        {...register('rememberMe')}
                                        className="w-4 h-4 rounded border-gray-300 text-[#E9CC2F] focus:ring-[#E9CC2F]/50 transition-colors"
                                    />
                                    <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs text-[#E9CC2F] font-medium hover:underline transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </motion.div>

                        {/* Root Error */}
                        {errors.root && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-3 bg-red-50 border border-red-200 rounded-xl"
                            >
                                <p className="text-sm text-red-600 text-center flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {errors.root.message}
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-[#E9CC2F] to-[#B69E24] text-[#1A1A1A] font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#E9CC2F]/20 transition-all duration-300 text-base relative overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin">⏳</span>
                                        Signing in...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Sign In
                                        <ArrowRight size={18} />
                                    </span>
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-xs text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Guest Access */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                    >
                        <Button
                            onClick={switchToGuest}
                            variant="outline"
                            className="w-full border-2 border-gray-200 text-gray-600 hover:border-[#E9CC2F] hover:text-[#E9CC2F] hover:bg-[#E9CC2F]/5 transition-all py-3.5 rounded-xl font-semibold"
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Continue as Guest
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-6"
                >
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/auth/register" className="text-[#E9CC2F] font-semibold hover:underline transition-colors">
                            Create one
                        </Link>
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <span className="text-[10px] text-gray-400">Secure Login</span>
                        <span className="w-px h-3 bg-gray-200" />
                        <span className="text-[10px] text-gray-400">SSL Encrypted</span>
                        <span className="w-px h-3 bg-gray-200" />
                        <span className="text-[10px] text-gray-400">Privacy Protected</span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}