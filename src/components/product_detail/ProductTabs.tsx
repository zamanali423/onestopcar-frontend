"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, User, Mail, MessageSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/mock/products";

interface ProductTabsProps {
  product: Product;
}

const TABS = ["Description", "Product Reviews", "Privacy policy"] as const;

// Review type
interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Description");
  
  // Review form state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      name: "Ahmed Raza",
      email: "ahmed@example.com",
      rating: 5,
      comment: "Excellent product! The quality is outstanding and it fits perfectly.",
      date: "2024-01-15",
    },
    {
      id: "2",
      name: "Sara Khan",
      email: "sara@example.com",
      rating: 4,
      comment: "Good quality but shipping took a bit longer than expected.",
      date: "2024-01-10",
    },
  ]);
  
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });
  
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleRatingClick = (rating: number) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        name: reviewForm.name,
        email: reviewForm.email,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: new Date().toISOString().split('T')[0],
      };
      
      setReviews([newReview, ...reviews]);
      setReviewForm({ name: "", email: "", rating: 0, comment: "" });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1000);
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) 
    : product.rating;

  return (
    <section className="bg-light mt-8">
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="flex items-center gap-6 border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "pb-3 text-sm font-semibold whitespace-nowrap relative transition",
                tab === t ? "text-dark" : "text-gray-500 hover:text-dark"
              )}
            >
              {t}
              {tab === t && (
                <motion.span layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-dark" />
              )}
            </button>
          ))}
        </div>

        {tab === "Description" && (
          <div>
            <h3 className="text-lg font-bold mb-4">Product Description</h3>
            <p className="mb-4">
              Elevate your driving comfort with <strong>{product.name}</strong> for the{" "}
              <strong>{product.model}</strong>.
            </p>
            <p className="mb-6 text-gray-700">
              {product.description}
            </p>
            <h4 className="font-semibold mb-2">⭐ Key Features:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-800">
              <li>Custom-fit for {product.model}</li>
              <li>Premium quality materials</li>
              <li>UV-blocking fabric for maximum protection</li>
              <li>Keeps interior cooler and more comfortable</li>
              <li>Enhances privacy and reduces glare</li>
              <li>Easy installation - no tools required</li>
            </ul>
          </div>
        )}

        {tab === "Product Reviews" && (
          <div>
            {/* Review Summary */}
            <div className="flex items-center gap-6 mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <div className="text-center">
                <span className="text-4xl font-bold text-dark">{averageRating.toFixed(1)}</span>
                <div className="flex justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= Math.round(averageRating) ? "fill-[#E9CC2F] text-[#E9CC2F]" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
              </div>
              <div className="flex-1">
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(r => r.rating === rating).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-xs text-gray-600 w-4">{rating}</span>
                        <Star size={12} className="fill-[#E9CC2F] text-[#E9CC2F]" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#E9CC2F] rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-xs text-gray-400 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Review Form */}
            <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
              <h4 className="text-base font-bold mb-4">Write a Review</h4>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={reviewForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9CC2F] focus:border-[#E9CC2F] outline-none transition"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={reviewForm.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9CC2F] focus:border-[#E9CC2F] outline-none transition"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          size={28}
                          className={cn(
                            "transition-colors",
                            (hoverRating >= star || reviewForm.rating >= star)
                              ? "fill-[#E9CC2F] text-[#E9CC2F]"
                              : "text-gray-300"
                          )}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {reviewForm.rating > 0 ? `${reviewForm.rating} stars` : "Select rating"}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review *
                  </label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      id="comment"
                      name="comment"
                      value={reviewForm.comment}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E9CC2F] focus:border-[#E9CC2F] outline-none transition resize-none"
                      placeholder="Share your experience with this product..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !reviewForm.rating || !reviewForm.comment}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all",
                    (isSubmitting || !reviewForm.rating || !reviewForm.comment)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#d4b828] active:scale-95"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Review
                    </>
                  )}
                </button>

                {submitSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 font-medium"
                  >
                    ✓ Review submitted successfully!
                  </motion.p>
                )}
              </form>
            </div>

            {/* Reviews List */}
            {reviews.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-base font-bold">Customer Reviews</h4>
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#E9CC2F]/20 flex items-center justify-center">
                          <User size={18} className="text-[#B69E24]" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={star <= review.rating ? "fill-[#E9CC2F] text-[#E9CC2F]" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        )}

        {tab === "Privacy policy" && (
          <div className="text-sm text-gray-700 space-y-2">
            <p>We respect your privacy. Your personal data is used only to process your order and improve your experience.</p>
            <p>For full details, please contact support@asadautos.com.</p>
          </div>
        )}
      </div>
    </section>
  );
}