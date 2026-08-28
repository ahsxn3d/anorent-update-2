'use client';

import React, { useState } from 'react';

import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Page, DeploymentProduct, ReviewItem, HeroContent, AboutContent, ProofMetricCard, ContactSubmission } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MagneticGridBackground } from './components/MagneticGridBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll, lenisInstance } from './components/SmoothScroll';

import { HomePage } from './views/HomePage';
import { DeploymentsPage } from './views/DeploymentsPage';
import { AboutPage } from './views/AboutPage';
import { FAQPage } from './views/FAQPage';
import { ContactPage } from './views/ContactPage';
import { ProjectDetailPage } from './views/ProjectDetailPage';
import { sound } from './utils/audio';

interface AppProps {
  initialPage?: Page;
  initialSlug?: string;
}

export default function App({ initialPage = 'home', initialSlug }: AppProps = {}) {
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [previousPage, setPreviousPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<DeploymentProduct | null>(null);
  const [products] = useState<DeploymentProduct[]>([]);
  const [faqs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [heroContent] = useState<HeroContent>({});
  const [aboutContent] = useState<AboutContent>({});
  const [proofMetrics] = useState<ProofMetricCard[]>([]);
  const [isAppLoaded, setIsAppLoaded] = useState(false);



  // Smooth scroll progress bar with butter spring physics
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  const handleAddReview = (newReview: Omit<ReviewItem, 'id' | 'dateString' | 'isVerified' | 'isApproved'>) => {
    sound.playChime();
    const formattedDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
    const createdReview: ReviewItem = {
      ...newReview,
      id: `rev-${Date.now()}`,
      dateString: formattedDate,
      isVerified: true,
      isApproved: true,
    };
    setReviews((prev) => [createdReview, ...prev]);
  };

  const handleContactSubmit = async (submission: ContactSubmission) => {
    sound.playChime();
    console.log('[Contact Submission Transmitted]', submission);
  };

  const handlePageChange = (newPage: Page) => {
    sound.playPageSwitch();
    if (currentPage !== 'project-detail') {
      setPreviousPage(currentPage);
    }
    setCurrentPage(newPage);
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (product: DeploymentProduct) => {
    sound.playPageSwitch();
    setSelectedProduct(product);
    setPreviousPage(currentPage === 'project-detail' ? 'deployments' : currentPage);
    setCurrentPage('project-detail');
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen flex flex-col bg-[#0A0B14] text-white overflow-x-clip">
        {/* AWWWARDS-GRADE CUSTOM MAGNETIC CURSOR */}
        <CustomCursor />

        {/* BUTTER-SMOOTH TOP SCROLL PROGRESS BAR */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B00EE] via-[#C084FC] to-[#38BDF8] z-[200] origin-left shadow-[0_0_12px_#C084FC]"
          style={{ scaleX }}
        />

        {/* GLOBAL LOADING SCREEN */}
        <LoadingScreen onComplete={() => setIsAppLoaded(true)} />

        {/* INTERACTIVE MAGNETIC GRID & CONSTELLATION PARTICLES */}
        <MagneticGridBackground />

        {/* STICKY GLASS NAVBAR WITH AUDIO EQUALIZER & SYNCHRONIZED BOUNCING PILL */}
        <Navbar
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />

        {/* MAIN CONTAINER LAYOUT WITH BUTTER-SMOOTH GLIDE TRANSITIONS */}
        <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage === 'project-detail' && selectedProduct ? `project-${selectedProduct.id}` : currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {currentPage === 'project-detail' && selectedProduct ? (
                <ProjectDetailPage
                  product={selectedProduct}
                  onBack={() => handlePageChange(previousPage || 'deployments')}
                  setCurrentPage={handlePageChange}
                />
              ) : currentPage === 'home' ? (
                <HomePage
                  setCurrentPage={handlePageChange}
                  onSelectProduct={handleSelectProduct}
                  products={products}
                  reviews={reviews}
                  heroContent={heroContent}
                  isLoaded={isAppLoaded}
                />
              ) : currentPage === 'deployments' ? (
                <DeploymentsPage
                  products={products}
                  setCurrentPage={handlePageChange}
                  onSelectProduct={handleSelectProduct}
                />
              ) : currentPage === 'about' ? (
                <AboutPage
                  setCurrentPage={handlePageChange}
                  aboutContent={aboutContent}
                  proofMetrics={proofMetrics}
                  isSignedIn={false}
                  setIsSignedIn={() => {}}
                  openAuthModal={() => {}}
                />
              ) : currentPage === 'faq' ? (
                <FAQPage
                  faqs={faqs}
                  setCurrentPage={handlePageChange}
                />
              ) : currentPage === 'contact' ? (
                <ContactPage
                  setCurrentPage={handlePageChange}
                  onAddReview={handleAddReview}
                  onContactSubmit={handleContactSubmit}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FOOTER */}
        <Footer setCurrentPage={handlePageChange} />
      </div>
    </SmoothScroll>
  );
}
