'use client';

import React, { useState } from 'react';

import { Star, MessageSquare, Sparkles, Check, Send } from 'lucide-react';
import { ReviewItem } from '../types';
import { ButterButton } from './ButterButton';

interface ReviewsDisplayProps {
  reviews: ReviewItem[];
}

export const ReviewsDisplay: React.FC<ReviewsDisplayProps> = ({ reviews }) => {
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  // Helper card renderer for marquee rows - Clean minimalist border-[#EDE9E3]/10 design
  const renderReviewCard = (rev: ReviewItem, keyIdx: number) => (
    <div
      key={`${rev.id}-${keyIdx}`}
      className="w-60 sm:w-80 md:w-96 shrink-0 bg-[#0c0919]/90 backdrop-blur-xl border border-[#EDE9E3]/10 rounded-xl p-3 sm:p-4 hover:border-[#EDE9E3]/20 transition-all flex flex-col justify-between space-y-2.5 sm:space-y-3 cursor-pointer"
    >
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 sm:gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  i < rev.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-zinc-700 text-zinc-700'
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400">
            {rev.dateString}
          </span>
        </div>

        <p className="text-[11px] sm:text-xs text-zinc-200 font-medium leading-relaxed italic line-clamp-2">
          &ldquo;{rev.comment}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-2.5 pt-2 border-t border-[#EDE9E3]/10">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-200 flex items-center justify-center text-[8px] sm:text-[10px] font-bold font-mono shrink-0">
          {rev.name.charAt(0)}
        </div>
        <div className="truncate">
          <h4 className="font-bold text-[10px] sm:text-xs text-[#EDE9E3] truncate">{rev.name}</h4>
          <p className="text-[8px] sm:text-[10px] text-zinc-400 font-mono truncate">{rev.email}</p>
        </div>
      </div>
    </div>
  );

  // Create quadrupled arrays for seamless infinite looping
  const row1Items = [...reviews, ...reviews, ...reviews, ...reviews];
  const row2Items = [
    ...reviews.slice(2),
    ...reviews.slice(0, 2),
    ...reviews.slice(2),
    ...reviews.slice(0, 2),
    ...reviews.slice(2),
    ...reviews.slice(0, 2),
    ...reviews.slice(2),
    ...reviews.slice(0, 2),
  ];
  const row3Items = [
    ...reviews.slice(4),
    ...reviews.slice(0, 4),
    ...reviews.slice(4),
    ...reviews.slice(0, 4),
    ...reviews.slice(4),
    ...reviews.slice(0, 4),
    ...reviews.slice(4),
    ...reviews.slice(0, 4),
  ];

  return (
    <div className="space-y-3 sm:space-y-6 pt-3 sm:pt-6 pb-2 overflow-hidden">
      
      {/* CLEAN MINIMALIST HEADING ROW */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-[#EDE9E3]/10 pb-3 sm:pb-4 px-1">
        <div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
            02 // VERIFIED FEEDBACK
          </span>
          <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-extrabold text-[#EDE9E3]">
            Client Reviews
          </h2>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-[#EDE9E3]/5 text-[#EDE9E3] rounded-full text-[10px] sm:text-xs font-mono font-bold border border-[#EDE9E3]/10 w-fit">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{avgRating} / 5.0</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-300 font-sans text-[10px] sm:text-[11px]">
            {reviews.length} Reviews
          </span>
        </div>
      </div>

      {/* 3 MARQUEE SCROLLING LINES - CLEAN & SUBTLE */}
      <div className="space-y-2 sm:space-y-3 relative py-2 sm:py-3">

        {/* Edge Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#121110] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#121110] to-transparent z-10 pointer-events-none" />

        {/* LINE 1: Scroll Left to Right */}
        <div className="overflow-hidden py-0.5">
          <div className="animate-marquee-right flex gap-3">
            {row1Items.map((rev, idx) => renderReviewCard(rev, idx))}
          </div>
        </div>

        {/* LINE 2: Scroll Right to Left */}
        <div className="overflow-hidden opacity-100 py-0.5">
          <div className="animate-marquee-left flex gap-3">
            {row2Items.map((rev, idx) => renderReviewCard(rev, idx))}
          </div>
        </div>

        {/* LINE 3: Scroll Left to Right */}
        <div className="overflow-hidden py-0.5">
          <div className="animate-marquee-right flex gap-3">
            {row3Items.map((rev, idx) => renderReviewCard(rev, idx))}
          </div>
        </div>

      </div>

    </div>
  );
};

interface AddReviewFormProps {
  onAddReview: (review: Omit<ReviewItem, 'id' | 'dateString' | 'isVerified' | 'isApproved'>) => void;
}

export const AddReviewForm: React.FC<AddReviewFormProps> = ({ onAddReview }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) return;

    onAddReview({ name, email, rating, comment });
    setSubmitted(true);
    setName('');
    setEmail('');
    setComment('');
    setRating(5);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="bg-[#0c0919]/90 text-[#EDE9E3] rounded-2xl border border-[#EDE9E3]/10 p-4 sm:p-6 md:p-8 space-y-4 md:space-y-6 backdrop-blur-xl">
      
      {/* HEADER */}
      <div className="space-y-1.5 md:space-y-2 border-b border-[#EDE9E3]/10 pb-3 md:pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#EDE9E3]/5 border border-[#EDE9E3]/10 rounded-full text-[10px] md:text-xs font-mono font-bold text-purple-300 uppercase">
          <MessageSquare className="w-3 h-3 md:w-3.5 md:h-3.5 text-purple-400" />
          <span>Feedback Channel</span>
        </div>
        <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-extrabold text-[#EDE9E3] tracking-wide uppercase">
          Add Review or Rating
        </h2>
        <p className="text-[11px] md:text-xs text-zinc-400">
          Share your experience working directly with Ahsan on your build.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 md:p-8 text-center bg-purple-950/40 rounded-xl border border-purple-500/30 space-y-3 my-3">
          <Check className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mx-auto animate-bounce" />
          <h3 className="font-display text-lg md:text-xl font-extrabold text-[#EDE9E3] uppercase tracking-wider">
            Review Published!
          </h3>
          <p className="text-xs text-zinc-300">
            Thank you for your feedback. It has been added to the showcase.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-[10px] md:text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-[#121110]/50 border border-[#EDE9E3]/10 rounded-xl text-xs md:text-sm font-sans text-[#EDE9E3] placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] md:text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1">
                Your Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="e.g. sarah@techcorp.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-[#121110]/50 border border-[#EDE9E3]/10 rounded-xl text-xs md:text-sm font-sans text-[#EDE9E3] placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-all"
              />
            </div>
          </div>

          {/* STAR RATING SELECTOR */}
          <div>
            <label className="block text-[10px] md:text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1">
              Rating Stars (1 to 5) *
            </label>
            <div className="flex items-center gap-1.5 md:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1.5 md:p-2 rounded-lg transition-all cursor-pointer ${
                    rating >= star
                      ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40'
                      : 'bg-[#EDE9E3]/5 text-zinc-600 border border-[#EDE9E3]/10 hover:bg-[#EDE9E3]/10'
                  }`}
                >
                  <Star className={`w-4 h-4 md:w-5 md:h-5 ${rating >= star ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              ))}
              <span className="text-[11px] md:text-xs font-bold text-amber-300 ml-1.5 font-mono">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* REVIEW TEXTAREA */}
          <div>
            <label className="block text-[10px] md:text-xs font-mono text-zinc-300 uppercase tracking-wider mb-1">
              Your Review / Feedback *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tell us about the project quality, performance metrics, design aesthetics, or delivery time..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-[#121110]/50 border border-[#EDE9E3]/10 rounded-xl text-xs md:text-sm font-sans text-[#EDE9E3] placeholder-zinc-500 focus:outline-none focus:border-purple-400 transition-all"
            />
          </div>

          <ButterButton
            variant="primary"
            size="lg"
            type="submit"
            id="post-review-btn"
            icon={<Send className="w-4 h-4" />}
            iconPosition="right"
            className="w-full uppercase tracking-wider font-extrabold"
          >
            Post Review
          </ButterButton>

        </form>
      )}

    </div>
  );
};
