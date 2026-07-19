'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { contactSchema } from '@/lib/validations'
import { ContactFormData } from '@/lib/validations'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa6";


export default function ContactPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary text-primary-foreground py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">Contact</h1>
            <nav className="flex gap-2 text-sm mt-2">
              <a href="/" className="hover:underline">
                Home
              </a>
              <span>/</span>
              <span>Contact</span>
            </nav>
          </div>
        </section>

        {/* Contact Content */}
        <div className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in touch</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have questions? We&apos;d love to hear from you. Get in touch with our team.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  {submitSuccess && (
                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                      Thank you for your message. We&apos;ll be in touch soon!
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Name *</label>
                        <Input
                          {...register('name')}
                          placeholder="Name"
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Email *</label>
                        <Input
                          {...register('email')}
                          type="email"
                          placeholder="Email"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone *</label>
                        <Input
                          {...register('phone')}
                          placeholder="Phone number"
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Comment *</label>
                      <textarea
                        {...register('message')}
                        placeholder="Comment"
                        rows={5}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-secondary text-primary-foreground"
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Phone */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Phone</h3>
                      <p className="text-muted-foreground">0300-0532034</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Email</h3>
                      <p className="text-muted-foreground">shahid.afzal423@gmail.com</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Address</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Leopard Head Office, Near GT Rd, Main Entrance, G Mangolia Park, Gujranwala
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Follow us</h3>

                  <div className="flex items-center gap-3">
                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/OneStopCar92/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-10 h-10 bg-foreground text-[#E9CC2F] rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                    >
                      <FaFacebookF size={18} />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/one_stop_car_"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-10 h-10 bg-foreground text-[#E9CC2F] rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all duration-300"
                    >
                      <FaInstagram size={18} />
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com/@onestopcar92?feature=shared"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="w-10 h-10 bg-foreground text-[#E9CC2F] rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-300"
                    >
                      <FaYoutube size={18} />
                    </a>

                    {/* TikTok */}
                    <a
                      href="https://www.tiktok.com/@onestopcar92?_t=8mGVdakbDQF&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="w-10 h-10 bg-foreground text-[#E9CC2F] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <FaTiktok size={18} />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-10 h-10 bg-foreground text-[#E9CC2F] rounded-full flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map Section */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.7748247000504!2d74.19894087393119!3d32.10237091816054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xac4eae174466d39d%3A0x10cd13bc522f26cc!2sONE%20STOP%20CAR%20LED!5e0!3m2!1sen!2s!4v1784113429863!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-bold text-lg mb-2">Find Our Store</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Address</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Leopard Head Office, Near GT Rd, Main Entrance, G Mangolia Park, Gujranwala
                    </p>
                    <h4 className="font-semibold mb-2">Opening hours</h4>
                    <p className="text-sm text-muted-foreground">Mon - Sun, 9am - 10pm</p>
                  </div>
                  <Button className="bg-primary hover:bg-secondary text-primary-foreground h-fit">
                    GET DIRECTION
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

    </div>
  )
}
