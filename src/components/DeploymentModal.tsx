'use client';

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Smartphone, Tablet, Monitor, CheckCircle, ShieldCheck, Zap, Activity, Code2, Copy, Check, Sparkles, Layers } from 'lucide-react';
import { DeploymentProduct } from '../types';
import { ButterButton } from './ButterButton';
import { sound } from '../utils/audio';

interface DeploymentModalProps {
  product: DeploymentProduct | null;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ product, onClose }) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'specs' | 'telemetry'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    if (product) {
      sound.playChime();
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const mockCodeSnippet = `// Production Blueprint: ${product.title}
import React from 'react';
import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';

export const DeploymentSystem = () => {
  return (
    <div className="min-h-screen bg-[#0A0B14] text-white p-8">
      {/* Category: ${product.category} */}
      <h1 className="text-4xl font-extrabold text-gradient-purple">
        ${product.title}
      </h1>
      <p className="text-slate-300 max-w-2xl mt-4">
        ${product.shortDescription}
      </p>
      {/* Tech Stack: ${product.techStack.join(', ')} */}
      <div className="flex gap-2 mt-6">
        ${product.techStack.map((tech) => `<span className="px-3 py-1 bg-purple-900/40 rounded-full">${tech}</span>`).join('\n        ')}
      </div>
    </div>
  );
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(mockCodeSnippet);
    setCopiedCode(true);
    sound.playChime();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto">
        {/* Dark Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-[#06030c]/85 backdrop-blur-2xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 26 }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#130722]/95 border border-purple-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(139,0,238,0.4)] overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Specular Rim */}
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-300 to-transparent z-20" />

          {/* Modal Header Bar */}
          <div className="p-4 sm:p-6 border-b border-purple-500/25 flex items-center justify-between gap-4 bg-[#18092c]/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-900/40 border border-purple-400/40 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#C084FC]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C084FC] px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30">
                    {product.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {product.id}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mt-0.5">
                  {product.title}
                </h2>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-purple-950/60 border border-purple-400/40 text-slate-300 hover:text-white hover:bg-purple-800/50 hover:shadow-[0_0_15px_#A855F7] transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation & Device Switcher */}
          <div className="px-4 sm:px-6 py-3 border-b border-purple-500/20 bg-[#10051e]/80 flex flex-wrap items-center justify-between gap-3">
            {/* View Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1c0c32] border border-purple-500/30">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('preview');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-gradient-to-r from-[#8B00EE] to-[#A855F7] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                Live Showcase
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('specs');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'bg-gradient-to-r from-[#8B00EE] to-[#A855F7] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Code Specs
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('telemetry');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'telemetry'
                    ? 'bg-gradient-to-r from-[#8B00EE] to-[#A855F7] text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Lighthouse 100%
              </button>
            </div>

            {/* Device Viewport Simulation Toggle (only on preview) */}
            {activeTab === 'preview' && (
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[#1c0c32] border border-purple-500/30">
                <button
                  onClick={() => {
                    sound.playClick();
                    setDeviceView('desktop');
                  }}
                  className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    deviceView === 'desktop' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setDeviceView('tablet');
                  }}
                  className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    deviceView === 'tablet' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setDeviceView('mobile');
                  }}
                  className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                    deviceView === 'mobile' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Modal Body Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'preview' && (
              <div className="space-y-6">
                {/* Device Frame Simulation */}
                <div className="flex justify-center w-full">
                  <div
                    className={`relative rounded-2xl border border-purple-500/40 bg-[#080210] p-2 shadow-2xl transition-all duration-500 overflow-hidden ${
                      deviceView === 'mobile'
                        ? 'w-full max-w-[340px] aspect-[9/16]'
                        : deviceView === 'tablet'
                        ? 'w-full max-w-[620px] aspect-[4/3]'
                        : 'w-full max-w-full aspect-[16/9]'
                    }`}
                  >
                    <img
                      src={product.thumbnailUrl}
                      alt={product.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none rounded-xl" />

                    {/* Interactive Frame Watermark */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs pointer-events-none">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="font-mono font-bold tracking-wider">LIVE 60FPS SHADER ENGINE</span>
                      </div>
                      <span className="font-mono text-purple-300">HTTPS://ANORIX.STUDIO</span>
                    </div>
                  </div>
                </div>

                {/* Description & Tech Stack Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#160828]/80 p-5 rounded-2xl border border-purple-500/30">
                  <div className="md:col-span-8 space-y-3">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#C084FC] font-mono">
                      System Architecture Overview
                    </h3>
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {product.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {product.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#240d3e] border border-purple-400/40 text-purple-200 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col justify-between space-y-4 border-t md:border-t-0 md:border-l border-purple-500/30 pt-4 md:pt-0 md:pl-6">
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-slate-400 uppercase">Verification Status</div>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        Awwwards Certified Architecture
                      </div>
                    </div>

                    <ButterButton
                      variant="primary"
                      size="md"
                      onClick={() => {
                        window.open(product.demoUrl, '_blank');
                      }}
                      icon={<ExternalLink className="w-4 h-4" />}
                      iconPosition="right"
                      className="w-full uppercase tracking-wider font-extrabold shadow-[0_0_25px_rgba(139,0,238,0.7)]"
                    >
                      Launch Live WebGL Demo
                    </ButterButton>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-purple-300">TYPESCRIPT / TAILWIND PRODUCTION COMPONENT</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-800/40 border border-purple-400/40 text-xs font-bold text-white hover:bg-purple-700/50 transition cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode ? 'Copied to Clipboard!' : 'Copy Code'}
                  </button>
                </div>

                <div className="relative rounded-2xl bg-[#080210] border border-purple-500/40 p-4 font-mono text-xs text-purple-200 overflow-x-auto shadow-inner">
                  <pre>{mockCodeSnippet}</pre>
                </div>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-[#1a0c32] border border-purple-500/30 text-center space-y-1">
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">100</div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Performance</div>
                  <div className="text-[10px] text-slate-400 font-mono">0.18s FCP</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#1a0c32] border border-purple-500/30 text-center space-y-1">
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">100</div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Accessibility</div>
                  <div className="text-[10px] text-slate-400 font-mono">WCAG AAA</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#1a0c32] border border-purple-500/30 text-center space-y-1">
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">100</div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Best Practices</div>
                  <div className="text-[10px] text-slate-400 font-mono">Zero Vuln</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#1a0c32] border border-purple-500/30 text-center space-y-1">
                  <div className="text-3xl font-extrabold text-emerald-400 font-mono">100</div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">SEO Audit</div>
                  <div className="text-[10px] text-slate-400 font-mono">Structured Schema</div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
