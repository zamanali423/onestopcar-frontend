// src/app/auth/register/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { useFormWithZod } from '@/lib/hooks/useFormWithZod'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    CheckCircle,
    Shield,
    Sparkles,
    ArrowRight,
    Car
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

export default function RegisterPage() {
    const { register: registerUser } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useFormWithZod(registerSchema, {
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            acceptTerms: false,
        },
    })

    const onSubmit = async (data: RegisterInput) => {
        setIsLoading(true)
        try {
            await registerUser(data)
        } finally {
            setIsLoading(false)
        }
    }

    const password = watch('password')
    const hasMinLength = password?.length >= 8
    const hasUpperCase = /[A-Z]/.test(password || '')
    const hasLowerCase = /[a-z]/.test(password || '')
    const hasNumber = /[0-9]/.test(password || '')

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] via-white to-[#F8FAFC] p-4 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E9CC2F]/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E9CC2F]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E9CC2F]/[0.02] rounded-full blur-3xl" />

                {/* Floating shapes */}
                <motion.div
                    animate={{ y: [-20, 20, -20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-4 h-4 bg-[#E9CC2F]/20 rounded-full"
                />
                <motion.div
                    animate={{ y: [20, -20, 20] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-32 left-20 w-3 h-3 bg-[#E9CC2F]/20 rounded-full"
                />
                <motion.div
                    animate={{ x: [-20, 20, -20] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-32 w-5 h-5 border-2 border-[#E9CC2F]/10 rounded-full"
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
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-500">
                        Join the OneStopCar community and get exclusive offers
                    </p>
                </motion.div>

                {/* Register Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-6 md:p-8"
                >
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-[#E9CC2F]" />
                            <div className="w-12 h-0.5 bg-[#E9CC2F]" />
                            <div className="w-2 h-2 rounded-full bg-[#E9CC2F]" />
                            <div className="w-12 h-0.5 bg-gray-200" />
                            <div className="w-2 h-2 rounded-full bg-gray-200" />
                        </div>
                        <span className="text-xs font-semibold text-[#E9CC2F]">Step 1 of 2</span>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E9CC2F] transition-colors">
                                    <User size={18} />
                                </div>
                                <Input
                                    type="text"
                                    {...register('name')}
                                    placeholder="Muhammad Abiid"
                                    className={`pl-10 py-3 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20 transition-all ${errors.name ? 'border-red-500 focus:ring-red-500' : ''
                                        }`}
                                />
                            </div>
                            {errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-red-500 mt-1.5 flex items-center gap-1"
                                >
                                    <span className="w-1 h-1 rounded-full bg-red-500" />
                                    {errors.name.message}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
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
                                    placeholder="abiid@onestopcar.com"
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
                            transition={{ delay: 0.3 }}
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
                                    placeholder="Create a strong password"
                                    className={`pl-10 pr-12 py-3 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20 transition-all ${errors.password ? 'border-red-500 focus:ring-red-500' : ''
                                        }`}
                                    onFocus={() => setIsPasswordFocused(true)}
                                    onBlur={() => setIsPasswordFocused(false)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Password Strength Indicator */}
                            {password && password.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="mt-2 space-y-1.5"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-500 ${hasMinLength && hasUpperCase && hasLowerCase && hasNumber
                                                        ? 'bg-emerald-500 w-full'
                                                        : hasMinLength || hasUpperCase || hasLowerCase || hasNumber
                                                            ? 'bg-amber-500 w-3/4'
                                                            : 'bg-red-500 w-1/2'
                                                    }`}
                                            />
                                        </div>
                                        <span className={`text-[10px] font-semibold ${hasMinLength && hasUpperCase && hasLowerCase && hasNumber
                                                ? 'text-emerald-600'
                                                : hasMinLength || hasUpperCase || hasLowerCase || hasNumber
                                                    ? 'text-amber-600'
                                                    : 'text-red-500'
                                            }`}>
                                            {hasMinLength && hasUpperCase && hasLowerCase && hasNumber
                                                ? 'Strong'
                                                : hasMinLength || hasUpperCase || hasLowerCase || hasNumber
                                                    ? 'Medium'
                                                    : 'Weak'}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                                        <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <CheckCircle size={10} className={hasMinLength ? 'fill-emerald-500' : ''} />
                                            Min 8 characters
                                        </div>
                                        <div className={`flex items-center gap-1 ${hasUpperCase ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <CheckCircle size={10} className={hasUpperCase ? 'fill-emerald-500' : ''} />
                                            Uppercase
                                        </div>
                                        <div className={`flex items-center gap-1 ${hasLowerCase ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <CheckCircle size={10} className={hasLowerCase ? 'fill-emerald-500' : ''} />
                                            Lowercase
                                        </div>
                                        <div className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            <CheckCircle size={10} className={hasNumber ? 'fill-emerald-500' : ''} />
                                            Number
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-1.5">{errors.password.message}</p>
                            )}
                        </motion.div>

                        {/* Confirm Password */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E9CC2F] transition-colors">
                                    <Shield size={18} />
                                </div>
                                <Input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    placeholder="Confirm your password"
                                    className={`pl-10 pr-12 py-3 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20 transition-all ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-1.5">{errors.confirmPassword.message}</p>
                            )}
                        </motion.div>

                        {/* Phone */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative group">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E9CC2F] transition-colors">
                                    <Phone size={18} />
                                </div>
                                <Input
                                    type="tel"
                                    {...register('phone')}
                                    placeholder="+92 300 1234567"
                                    className={`pl-10 py-3 border-gray-200 focus:border-[#E9CC2F] focus:ring-[#E9CC2F]/20 transition-all ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''
                                        }`}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-xs text-red-500 mt-1.5">{errors.phone.message}</p>
                            )}
                        </motion.div>

                        {/* Terms */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                            className="flex items-start gap-3 p-3 bg-gray-50/80 rounded-xl border border-gray-100/80"
                        >
                            <input
                                type="checkbox"
                                {...register('acceptTerms')}
                                className="w-4 h-4 rounded border-gray-300 text-[#E9CC2F] focus:ring-[#E9CC2F]/50 mt-0.5 flex-shrink-0"
                            />
                            <label className="text-xs text-gray-600 leading-relaxed">
                                I agree to the{' '}
                                <Link href="/terms" className="text-[#E9CC2F] font-medium hover:underline">
                                    Terms of Service
                                </Link>
                                {' '}and{' '}
                                <Link href="/privacy" className="text-[#E9CC2F] font-medium hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </motion.div>
                        {errors.acceptTerms && (
                            <p className="text-xs text-red-500 mt-1">{errors.acceptTerms.message}</p>
                        )}

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
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
                                        Creating account...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Create Account
                                        <Sparkles size={18} />
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
                            <span className="bg-white px-4 text-xs text-gray-400">Already a member?</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <Link href="/auth/login">
                        <Button
                            variant="outline"
                            className="w-full border-2 border-gray-200 text-gray-600 hover:border-[#E9CC2F] hover:text-[#E9CC2F] hover:bg-[#E9CC2F]/5 transition-all py-3.5 rounded-xl"
                        >
                            Sign In Instead
                            <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-xs text-gray-400 mt-6"
                >
                    By creating an account, you agree to our{' '}
                    <Link href="/terms" className="text-[#E9CC2F] hover:underline">
                        Terms
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-[#E9CC2F] hover:underline">
                        Privacy Policy
                    </Link>
                </motion.p>
            </div>
        </div>
    )
}