'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ChevronRight, Calendar, User } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: 'Lahore Driving Licence Suspension Rules Explained (2026)',
    excerpt:
      'Understanding the new driving license suspension rules in Lahore and how to comply with regulations.',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog_page-RawOUR2ubpLX874wKrNnz2KQilvwFL.png',
    date: 'JULY 13, 2026',
    author: 'Muhammad Usman',
    category: 'Driving License',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Petrol Price in Pakistan Today - Latest Update July 2026',
    excerpt:
      "What's changed in the latest petrol price update? The Government of Pakistan has announced a...",
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog_page-RawOUR2ubpLX874wKrNnz2KQilvwFL.png',
    date: 'JULY 11, 2026',
    author: 'Muhammad Usman',
    category: 'Fuel Prices',
    readTime: '4 min read',
  },
  {
    id: 3,
    title: 'Petrol Price Pak: Latest Fuel Rates & OGRA Updates in Pakistan',
    excerpt:
      'OGRA Official Update — June 2026 Petrol Price Pak: Latest Fuel Rates & OGRA Updates in Pakistan',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog_page-RawOUR2ubpLX874wKrNnz2KQilvwFL.png',
    date: 'JUNE 13, 2026',
    author: 'Muhammad Usman',
    category: 'Fuel Prices',
    readTime: '3 min read',
  },
  {
    id: 4,
    title: 'Ex-Factory vs On-Road Car Price in Pakistan 2026 — Complete Buyer\'s Guide',
    excerpt:
      "You've been saving for months. The brochure says Rs. 27 lakh for a Suzuki Cultus....",
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog_page-RawOUR2ubpLX874wKrNnz2KQilvwFL.png',
    date: 'JUNE 11, 2026',
    author: 'Muhammad Usman',
    category: 'Car Prices',
    readTime: '7 min read',
  },
  {
    id: 5,
    title: 'Suzuki Fronx Trade-In Program Pakistan 2026: Complete Guide, Eligibility, Prices & Benefits',
    excerpt:
      'Why the Suzuki Fronx Trade-in Program is a Smarter Way to Upgrade Your Suzuki Motor...',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog_page-RawOUR2ubpLX874wKrNnz2KQilvwFL.png',
    date: 'JUNE 9, 2026',
    author: 'Muhammad Usman',
    category: 'Trade-in',
    readTime: '6 min read',
  },
  {
    id: 6,
    title: 'Deepal S05 REEV vs JAECOO J7 PHEV Pakistan 2026: Complete Buying Guide',
    excerpt:
      'Why This Comparison Matters in Pakistan. Two years ago...',
    image:
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog_page-RawOUR2ubpLX874wKrNnz2KQilvwFL.png',
    date: 'JUNE 8, 2026',
    author: 'Muhammad Usman',
    category: 'Car Comparison',
    readTime: '8 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="relative w-full h-64 md:h-80 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: 'url(https://t4.ftcdn.net/jpg/07/45/18/87/360_F_745188744_KMNjnw02jUJVS2vCD3VRkDiIiiug3s64.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome to Our Blog
            </motion.h1>
            <motion.p
              className="text-lg max-w-2xl mx-auto px-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Discover the latest updates and insights in automotive trends, accessories, and
              premium upgrades from One Stop Car.
            </motion.p>
          </div>
        </motion.section>

        {/* Blog Posts */}
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Featured Post */}
            {blogPosts.length > 0 && (
              <motion.div
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${blogPosts[0].id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                      <img
                        src={blogPosts[0].image}
                        alt={blogPosts[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-semibold mb-2">
                          Featured
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold">{blogPosts[0].title}</h2>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{blogPosts[0].excerpt}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {blogPosts[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={16} />
                        {blogPosts[0].author}
                      </span>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Posts Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {blogPosts.slice(1).map((post, idx) => (
                <motion.div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative aspect-video bg-gray-200 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span className="group-hover:text-primary transition-colors flex items-center gap-1">
                          Read More <ChevronRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            <motion.div
              className="flex items-center justify-center gap-2 mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button className="bg-primary hover:bg-secondary text-primary-foreground">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <span className="text-muted-foreground">...</span>
              <Button variant="outline">7</Button>
              <Button variant="outline">Next</Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
