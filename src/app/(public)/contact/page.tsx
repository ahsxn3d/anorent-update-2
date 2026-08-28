'use client';

import React from 'react';
import { ContactPage } from '@/views/ContactPage';
import { submitContactBrief, submitReview } from '@/lib/actions';

export default function PublicContactRoute() {
  const handleContactSubmit = async (submission: any) => {
    await submitContactBrief(submission);
  };

  const handleAddReview = async (review: any) => {
    await submitReview(review);
  };

  return (
    <ContactPage
      onContactSubmit={handleContactSubmit}
      onAddReview={handleAddReview}
    />
  );
}

