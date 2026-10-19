'use client';

import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { sound } from '../utils/audio';

interface AboutStatsMatrixProps {
  setCurrentPage?: (page: Page) => void;
}

export const AboutStatsMatrix: React.FC<AboutStatsMatrixProps> = ({ setCurrentPage }) => {
  // 12 Curated deployments distribution across real categories (tones from the site palette)
  const categoryBreakdown = [
    { name: 'UI Templates', count: 3, pct: 25, color: '#1740A9' },
    { name: 'Full-Stack Apps', count: 3, pct: 25, color: '#44C5AB' },
    { name: 'Animated Sites', count: 3, pct: 25, color: '#FF6B4C' },
    { name: 'SaaS Dashboards', count: 3, pct: 25, color: '#181818' },
  ];

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format UTC+5 time for live response availability
  const utc5Time = new Date(time.getTime() + time.getTimezoneOffset() * 60000 + 5 * 3600000);
  const currentHour = utc5Time.getHours();
  const currentMinute = utc5Time.getMinutes();
  const currentSeconds = utc5Time.getSeconds();
  const formattedUtc5 = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;

  const secondAngle = currentSeconds * 6;
  const minuteAngle = currentMinute * 6 + currentSeconds * 0.1;
  const hourAngle = (currentHour % 12) * 30 + currentMinute * 0.5;

  const meters = [
    { label: 'Code Quality & Architecture', value: '100% Passed', pct: 1 },
    { label: 'GPU 60 FPS Framerate Stability', value: '99.8% Stable', pct: 0.998 },
    { label: 'On-Time Milestone Delivery', value: '100% Rate', pct: 1 },
  ];

  return (
    <div className="ah-matrix">
      {/* 1. CURATED DEPLOYMENTS */}
      <div className="ah-mx" data-r="">
        <div className="ah-mx-head">
          <div>
            <span className="ah-label" style={{ color: 'rgba(31,31,31,.6)' }}>Curated Systems</span>
            <h3 className="ah-mx-big">12+ <small>Deployments</small></h3>
          </div>
          <span className="ah-pill"><span className="ah-pill-dot" />Open-Source Tools</span>
        </div>
        <p>Curated Deployments & Open-Source Tools built with production-grade Next.js, WebGL shaders, and clean React code.</p>
        <div className="ah-mx-row">
          <div className="ah-label" style={{ color: 'rgba(31,31,31,.6)', display: 'flex', justifyContent: 'space-between' }}>
            <span>SHOWCASE ARCHITECTURE</span>
            <b style={{ color: '#181818', fontWeight: 500 }}>4 Categories</b>
          </div>
          <div className="ah-bar" style={{ height: 8 }}>
            {categoryBreakdown.map((cat, idx) => (
              <span
                key={cat.name}
                onMouseEnter={() => setActiveCategory(cat.name)}
                onMouseLeave={() => setActiveCategory(null)}
                style={{
                  width: `${cat.pct}%`,
                  background: cat.color,
                  transitionDelay: `${0.15 + idx * 0.1}s`,
                  opacity: activeCategory && activeCategory !== cat.name ? 0.3 : 1,
                }}
              />
            ))}
          </div>
        </div>
        <div className="ah-mx-cats">
          {categoryBreakdown.map((cat) => (
            <div
              key={cat.name}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setActiveCategory(cat.name)}
              onMouseLeave={() => setActiveCategory(null)}
              onClick={() => {
                sound.playClick();
                if (setCurrentPage) {
                  setCurrentPage('deployments');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && setCurrentPage) setCurrentPage('deployments');
              }}
              className={`ah-mx-cat ${activeCategory === cat.name ? 'is-on' : ''}`}
            >
              <span><i style={{ background: cat.color }} />{cat.name}</span>
              <b style={{ fontWeight: 500 }}>{cat.count}</b>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CLIENT SATISFACTION */}
      <div className="ah-mx" data-r="" style={{ ['--d' as string]: '0.08s' } as React.CSSProperties}>
        <div className="ah-mx-head">
          <div>
            <span className="ah-label" style={{ color: 'rgba(31,31,31,.6)' }}>Client Satisfaction</span>
            <h3 className="ah-mx-big">99.9% <small>5.0 ★</small></h3>
          </div>
          <span className="ah-pill">Top Rated</span>
        </div>
        <p>Excellence across custom engineering, smooth 60 FPS GPU rendering, on-time delivery, and clean production handovers.</p>
        <div className="ah-mx-rows">
          {meters.map((m, i) => (
            <div key={m.label} className="ah-mx-row">
              <div>
                <span>{m.label}</span>
                <b>{m.value}</b>
              </div>
              <div className="ah-bar">
                <span style={{ width: `${m.pct * 100}%`, transitionDelay: `${0.2 + i * 0.1}s`, background: i === 1 ? '#1740A9' : '#181818' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="ah-mx-foot">
          <span>VERIFIED CLIENT RATINGS</span>
          <b>5.0 / 5.0 Global Score</b>
        </div>
      </div>

      {/* 3. AVERAGE RESPONSE TIME WITH LIVE CLOCK */}
      <div className="ah-mx" data-r="" style={{ ['--d' as string]: '0.12s' } as React.CSSProperties}>
        <div className="ah-mx-head">
          <div>
            <span className="ah-label" style={{ color: 'rgba(31,31,31,.6)' }}>Direct Communication</span>
            <h3 className="ah-mx-big">&lt; 1-2 Hours</h3>
          </div>
          <span className="ah-pill"><span className="ah-pill-dot" />Active Daily</span>
        </div>
        <p>Average Response Time (Active Daily). You communicate directly with the engineer building your product — no account managers or agency middlemen.</p>
        <div className="ah-mx-inset">
          <svg width="54" height="54" viewBox="0 0 48 48" aria-hidden="true" style={{ flex: 'none' }}>
            <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(24,24,24,0.16)" strokeWidth="1.5" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line key={deg} x1="24" y1="5" x2="24" y2={deg % 90 === 0 ? 8 : 7} stroke="#181818" strokeOpacity={deg % 90 === 0 ? 0.8 : 0.3} strokeWidth="1" transform={`rotate(${deg} 24 24)`} />
            ))}
            <line x1="24" y1="24" x2="24" y2="14" stroke="#181818" strokeWidth="2" strokeLinecap="round" transform={`rotate(${hourAngle} 24 24)`} />
            <line x1="24" y1="24" x2="24" y2="10" stroke="#181818" strokeWidth="1.4" strokeLinecap="round" transform={`rotate(${minuteAngle} 24 24)`} />
            <line x1="24" y1="26" x2="24" y2="7" stroke="#FF4949" strokeWidth="1" strokeLinecap="round" transform={`rotate(${secondAngle} 24 24)`} />
            <circle cx="24" cy="24" r="2" fill="#FF4949" />
          </svg>
          <div style={{ minWidth: 0 }}>
            <span className="ah-label" style={{ color: 'rgba(31,31,31,.6)' }}>Timezone: UTC+5 (Live)</span>
            <div className="ah-mx-time" suppressHydrationWarning>{formattedUtc5}</div>
            <span style={{ fontSize: 12, color: 'rgba(31,31,31,.6)' }}>Online • Average SLA &lt;2h</span>
          </div>
        </div>
        <div className="ah-mx-chan">
          <div>Email & WhatsApp</div>
          <div style={{ fontWeight: 500 }}>Daily Async Updates</div>
        </div>
      </div>

      {/* 4. SOURCE CODE OWNERSHIP & ESCROW */}
      <div className="ah-mx" data-r="" style={{ ['--d' as string]: '0.16s' } as React.CSSProperties}>
        <div className="ah-mx-head">
          <div>
            <span className="ah-label" style={{ color: 'rgba(31,31,31,.6)' }}>Client Rights & Escrow</span>
            <h3 className="ah-mx-big">100% <small>IP Transfer</small></h3>
          </div>
          <span className="ah-pill">Escrow Protected</span>
        </div>
        <p>Source Code Ownership & Escrow Protected. Full intellectual property transfer upon project sign-off via verified milestone escrow.</p>
        <div className="ah-mx-inset">
          <svg width="54" height="54" viewBox="0 0 48 48" aria-hidden="true" style={{ flex: 'none', transform: 'rotate(-90deg)' }}>
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(24,24,24,0.12)" strokeWidth="3" />
            <circle className="ah-ring" cx="24" cy="24" r="20" fill="none" stroke="#1740A9" strokeWidth="3" strokeLinecap="round" strokeDasharray="125.6" />
            <text x="24" y="27.5" textAnchor="middle" fontSize="9" fontWeight="600" fill="#181818" transform="rotate(90 24 24)">100%</text>
          </svg>
          <div style={{ flex: 1, minWidth: 0, display: 'grid', gap: 6, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ color: 'rgba(31,31,31,.64)' }}>GitHub Repo Transfer:</span>
              <b style={{ fontWeight: 500 }}>✓ Full IP</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ color: 'rgba(31,31,31,.64)' }}>Milestone Escrow:</span>
              <b style={{ fontWeight: 500 }}>Fiverr Pro</b>
            </div>
          </div>
        </div>
        <div className="ah-mx-foot">
          <span>COMMERCIAL LICENSE</span>
          <b>0 Royalty Fees</b>
        </div>
      </div>
    </div>
  );
};
