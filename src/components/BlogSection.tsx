"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import {useRouter} from "next/navigation"

const blogPosts = [
  {
    id: 1,
    title: "Lahore Driving Licence Registration Fees Updated 2025",
    excerpt:
      "Complete guide to Lahore driving licence registration fees and process. Updated for 2025 with all the latest information.",
    category: "Guides",
    date: "July 2025",
    readTime: "5 min",
    image: "https://images.pexels.com/photos/14615260/pexels-photo-14615260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
    tag: "Guide",
    tagColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "Petrol Price in Pakistan Today – Latest Update July 2025",
    excerpt:
      "Stay updated with today's petrol and diesel prices in Pakistan. We update these prices every two weeks as OGRA announces new prices.",
    category: "News",
    date: "July 2025",
    readTime: "3 min",
    image: "https://images.pexels.com/photos/14615261/pexels-photo-14615261.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
    tag: "News",
    tagColor: "bg-[#E9CC2F] text-[#1A1A1A]",
  },
  {
    id: 3,
    title: "How to Apply Ceramic Coating at Home – Complete Guide",
    excerpt:
      "Step-by-step guide to applying ceramic coating on your car at home. Save money while protecting your car's paint effectively.",
    category: "DIY Tips",
    date: "June 2025",
    readTime: "8 min",
    image: "https://images.pexels.com/photos/14615262/pexels-photo-14615262.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500",
    tag: "DIY",
    tagColor: "bg-green-500",
  },
];

export default function BlogSection() {
  const router=useRouter()
   return (
    <section id="blog" className="py-16 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4"
        >
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={18} className="text-[#E9CC2F]" />
              <span className="text-[#B69E24] font-bold text-sm uppercase tracking-widest">
                Knowledge Hub
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
              Car Care Guides &{" "}
              <span className="text-[#E9CC2F]">Automotive Tips</span>
            </h2>
          </div>
          <button className="btn-dark text-sm py-2.5 px-5 whitespace-nowrap" onClick={()=> router.push("/blog")}>
            All Articles <ArrowRight size={15} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#E9CC2F]/30 transition-all w-full"
            >
              <div className="relative overflow-hidden h-44">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-md text-white ${post.tagColor}`}
                  >
                    {post.tag}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3 text-[10px] text-gray-400 font-medium mb-2.5">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Calendar size={11} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Clock size={11} /> {post.readTime} read
                  </span>
                  <span className="text-[#E9CC2F] font-bold whitespace-nowrap">{post.category}</span>
                </div>
                <h3 className="font-black text-[#1A1A1A] text-sm leading-snug mb-2.5 line-clamp-2 group-hover:text-[#B69E24] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-[#E9CC2F] font-bold text-xs group-hover:gap-2 transition-all">
                  Read More <ArrowRight size={13} className="ml-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}