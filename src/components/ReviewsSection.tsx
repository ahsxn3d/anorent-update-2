'use client';

import React, { useState } from 'react';

import { Star, Check, Send } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewsDisplayProps {
  reviews: ReviewItem[];
}

export const ReviewsDisplay: React.FC<ReviewsDisplayProps> = ({ reviews }) => {
  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  // Helper card renderer for marquee rows - Clean minimalist border-white/10 design
  const renderReviewCard = (rev: ReviewItem, keyIdx: number) => (
    <div
      key={`${rev.id}-${keyIdx}`}
      className="w-60 sm:w-80 md:w-96 shrink-0 bg-[#0c0919]/90 backdrop-blur-xl border border-white/10 rounded-xl p-3 sm:p-4 hover:border-white/20 transition-all flex flex-col justify-between space-y-2.5 sm:space-y-3 cursor-pointer"
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

      <div className="flex items-center gap-2 sm:gap-2.5 pt-2 border-t border-white/10">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-200 flex items-center justify-center text-[8px] sm:text-[10px] font-bold font-mono shrink-0">
          {rev.name.charAt(0)}
        </div>
        <div className="truncate">
          <h4 className="font-bold text-[10px] sm:text-xs text-white truncate">{rev.name}</h4>
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 border-b border-white/10 pb-3 sm:pb-4 px-1">
        <div>
          <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
            02 // VERIFIED FEEDBACK
          </span>
          <h2 className="font-display text-lg sm:text-2xl md:text-3xl font-extrabold text-white">
            Client Reviews
          </h2>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 bg-white/5 text-white rounded-full text-[10px] sm:text-xs font-mono font-bold border border-white/10 w-fit">
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
        <div className="absolute inset-y-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

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
    <div className="ah-grid ah-rf-wrap" style={{ rowGap: 48 }}>
      {/* HEADER */}
      <div className="ah-ct-brief-head">
        <span className="ah-label">Feedback Channel</span>
        <h2 className="ah-d2">
          Add Review <span className="ah-serif">or Rating</span>
        </h2>
        <p className="ah-body" style={{ margin: 0 }}>
          Share your experience working directly with Ahsan on your build.
        </p>
      </div>

      {submitted ? (
        <div className="ah-ct-form ah-success">
          <span className="ah-pill" style={{ justifySelf: 'start' }}><span className="ah-pill-dot" /><Check className="w-3 h-3" /></span>
          <h3 className="ah-d3">Review Published!</h3>
          <p className="ah-lede">Thank you for your feedback. It has been added to the showcase.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="ah-ct-form">
          <div className="ah-ct-2">
            <label className="ah-field">
              <span className="ah-field-label">Your Full Name *</span>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="ah-input"
              />
            </label>

            <label className="ah-field">
              <span className="ah-field-label">Your Email Address *</span>
              <input
                type="email"
                required
                placeholder="e.g. sarah@techcorp.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="ah-input"
              />
            </label>
          </div>

          {/* STAR RATING SELECTOR */}
          <div className="ah-field">
            <span className="ah-field-label">Rating Stars (1 to 5) *</span>
            <div className="ah-stars-pick">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`ah-star-btn ${rating >= star ? 'is-on' : ''}`}
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                >
                  <Star className="w-4 h-4" fill={rating >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
              <span className="ah-field-label" style={{ marginLeft: 8, color: 'var(--ah-text)' }}>
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* REVIEW TEXTAREA */}
          <label className="ah-field">
            <span className="ah-field-label">Your Review / Feedback *</span>
            <textarea
              rows={3}
              required
              placeholder="Tell us about the project quality, performance metrics, design aesthetics, or delivery time..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="ah-input"
            />
          </label>

          <button type="submit" id="post-review-btn" className="ah-btn ah-btn-primary ah-btn-block" style={{ height: 58 }}>
            <span>Post Review</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};
