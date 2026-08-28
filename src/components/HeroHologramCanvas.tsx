'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

import { Sparkles, Orbit, Cpu, Zap, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

type HologramMode = 'quantum' | 'orbital' | 'matrix';

interface Node3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: string;
  glowColor: string;
  pulse: number;
  speed: number;
  satellite?: boolean;
}

export const HeroHologramCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeMode, setActiveMode] = useState<HologramMode>('quantum');
  const [fps, setFps] = useState(60);
  const [coherence, setCoherence] = useState(99.4);
  const [isInteracting, setIsInteracting] = useState(false);

  // Interaction physics state
  const isDragging = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const pointerVelocity = useRef({ rx: 0, ry: 0 });
  const rotation = useRef({ rx: 0.35, ry: 0.2, rz: 0 });
  const hoverPos = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const rippleWaves = useRef<Array<{ x: number; y: number; z: number; radius: number; maxRadius: number; strength: number }>>([]);
  const animFrameId = useRef<number>(0);

  // Pulse / Shockwave trigger
  const triggerQuantumShockwave = useCallback((originX?: number, originY?: number) => {
    sound.playHover();
    const canvas = canvasRef.current;
    const rect = canvas ? canvas.getBoundingClientRect() : { width: 380, height: 380 };
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    rippleWaves.current.push({
      x: originX !== undefined ? originX - cx : 0,
      y: originY !== undefined ? originY - cy : 0,
      z: 0,
      radius: 5,
      maxRadius: Math.min(rect.width, rect.height) * 0.48,
      strength: 1.0,
    });

    // Momentarily fluctuate coherence for cybernetic realism
    setCoherence((prev) => +(Math.max(92, Math.min(100, prev + (Math.random() * 0.8 - 0.3)))).toFixed(1));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = container.clientWidth || 380;
    let height = container.clientHeight || 380;

    // Synchronize canvas buffer with CSS pixels strictly and correctly
    const syncCanvasSize = () => {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const newWidth = Math.max(Math.round(rect.width), 260);
      const newHeight = Math.max(Math.round(rect.height), 260);
      const newDpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetCanvasW = Math.round(newWidth * newDpr);
      const targetCanvasH = Math.round(newHeight * newDpr);

      if (canvas.width !== targetCanvasW || canvas.height !== targetCanvasH) {
        width = newWidth;
        height = newHeight;
        dpr = newDpr;
        canvas.width = targetCanvasW;
        canvas.height = targetCanvasH;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    syncCanvasSize();

    // Debounce ResizeObserver execution with requestAnimationFrame to prevent loop notification
    let resizeRafId: number | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      resizeRafId = requestAnimationFrame(() => {
        syncCanvasSize();
      });
    });
    resizeObserver.observe(container);

    // Build 3D nodes based on selected mode
    const nodeCount = activeMode === 'matrix' ? 144 : activeMode === 'orbital' ? 120 : 100;
    const nodes: Node3D[] = [];
    const baseSphereRadius = 110; // normalized base radius

    for (let i = 0; i < nodeCount; i++) {
      let nx = 0;
      let ny = 0;
      let nz = 0;
      let isSatellite = false;

      if (activeMode === 'orbital') {
        // Triple intersecting gimbal rings with Keplerian orbital distribution
        const ring = i % 3;
        const ringNodes = nodeCount / 3;
        const angle = (Math.floor(i / 3) / ringNodes) * Math.PI * 2;
        const ringR = baseSphereRadius * (0.85 + (i % 4) * 0.05);

        if (ring === 0) {
          nx = Math.cos(angle) * ringR;
          ny = Math.sin(angle) * ringR;
          nz = Math.sin(angle * 3) * 12;
        } else if (ring === 1) {
          nx = Math.cos(angle) * ringR;
          nz = Math.sin(angle) * ringR;
          ny = Math.cos(angle * 2) * 14;
        } else {
          ny = Math.cos(angle) * ringR;
          nz = Math.sin(angle) * ringR;
          nx = Math.sin(angle * 4) * 16;
        }
      } else if (activeMode === 'matrix') {
        // Geodesic Fibonacci sphere distribution for perfect mathematical alignment
        const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        nx = baseSphereRadius * Math.sin(phi) * Math.cos(theta);
        ny = baseSphereRadius * Math.sin(phi) * Math.sin(theta);
        nz = baseSphereRadius * Math.cos(phi);
      } else {
        // Quantum Cloud with probability density and floating orbital satellites
        const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        isSatellite = i % 8 === 0;
        const rMult = isSatellite ? 1.25 : 0.88 + Math.sin(i * 1.5) * 0.12;
        const currentR = baseSphereRadius * rMult;

        nx = currentR * Math.sin(phi) * Math.cos(theta);
        ny = currentR * Math.sin(phi) * Math.sin(theta);
        nz = currentR * Math.cos(phi);
      }

      const palette =
        activeMode === 'orbital'
          ? [
              { c: '#00F0FF', g: 'rgba(0,240,255,0.7)' },
              { c: '#38BDF8', g: 'rgba(56,189,248,0.7)' },
              { c: '#C084FC', g: 'rgba(192,132,252,0.7)' },
              { c: '#FFFFFF', g: 'rgba(255,255,255,0.9)' },
            ]
          : activeMode === 'matrix'
          ? [
              { c: '#00FF9D', g: 'rgba(0,255,157,0.7)' },
              { c: '#10B981', g: 'rgba(16,185,129,0.7)' },
              { c: '#38BDF8', g: 'rgba(56,189,248,0.7)' },
              { c: '#A855F7', g: 'rgba(168,85,247,0.7)' },
            ]
          : [
              { c: '#C084FC', g: 'rgba(192,132,252,0.8)' },
              { c: '#8B00EE', g: 'rgba(139,0,238,0.8)' },
              { c: '#00F0FF', g: 'rgba(0,240,255,0.8)' },
              { c: '#E879F9', g: 'rgba(232,121,249,0.8)' },
              { c: '#FFFFFF', g: 'rgba(255,255,255,0.95)' },
            ];

      const chosen = palette[i % palette.length];

      nodes.push({
        baseX: nx,
        baseY: ny,
        baseZ: nz,
        x: nx,
        y: ny,
        z: nz,
        vx: 0,
        vy: 0,
        vz: 0,
        size: isSatellite ? 2.8 : 1.6 + (i % 3) * 0.6,
        color: chosen.c,
        glowColor: chosen.g,
        pulse: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        satellite: isSatellite,
      });
    }

    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = performance.now();

    // RENDER LOOP
    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // FPS tracking
      frameCount++;
      if (time - lastFpsTime >= 500) {
        setFps(Math.round((frameCount * 1000) / (time - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = time;
      }

      // Always reset context transform to prevent any scaling drifts or misalignments
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Exact mathematical center of the container
      const cx = width / 2;
      const cy = height / 2;

      // Dynamic scale factor relative to container dimensions (ensures perfect centering)
      const maxAllowedRadius = Math.min(width, height) * 0.36;
      const sphereScale = maxAllowedRadius / baseSphereRadius;

      // Rotation momentum physics
      if (!isDragging.current) {
        // Continuous organic rotation + inertial dampening
        rotation.current.ry += pointerVelocity.current.ry + 0.32 * dt;
        rotation.current.rx += pointerVelocity.current.rx + 0.12 * dt;
        pointerVelocity.current.rx *= 0.94;
        pointerVelocity.current.ry *= 0.94;
      }

      const cosY = Math.cos(rotation.current.ry);
      const sinY = Math.sin(rotation.current.ry);
      const cosX = Math.cos(rotation.current.rx);
      const sinX = Math.sin(rotation.current.rx);

      // 1. Draw Multi-Layered Singularity Core Glow (Anchored to exact center)
      const coreR = maxAllowedRadius * 0.85;
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, coreR);
      coreGrad.addColorStop(0, 'rgba(192, 132, 252, 0.40)');
      coreGrad.addColorStop(0.25, 'rgba(139, 0, 238, 0.22)');
      coreGrad.addColorStop(0.6, 'rgba(0, 240, 255, 0.08)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // 2. Update Shockwave Ripple Physics
      for (let w = rippleWaves.current.length - 1; w >= 0; w--) {
        const wave = rippleWaves.current[w];
        wave.radius += 140 * dt;
        wave.strength -= 1.2 * dt;

        if (wave.strength <= 0 || wave.radius >= wave.maxRadius) {
          rippleWaves.current.splice(w, 1);
        } else {
          // Draw expanding cyber shockwave ring
          ctx.save();
          ctx.beginPath();
          ctx.arc(cx + wave.x, cy + wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${wave.strength * 0.65})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 3. Transform & Project 3D Nodes
      interface ProjectedNode {
        px: number;
        py: number;
        z: number;
        scale: number;
        node: Node3D;
      }

      const projected: ProjectedNode[] = [];
      const fov = 380;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulse += node.speed;

        // Interactive elastic repulsion from cursor
        if (hoverPos.current.active) {
          const dx = node.x * sphereScale - (hoverPos.current.x - cx);
          const dy = node.y * sphereScale - (hoverPos.current.y - cy);
          const dist2D = Math.sqrt(dx * dx + dy * dy);

          if (dist2D < 60 && dist2D > 0) {
            const force = (1 - dist2D / 60) * 22;
            node.vx += (dx / dist2D) * force * dt;
            node.vy += (dy / dist2D) * force * dt;
          }
        }

        // Ripple pulse displacement
        for (const wave of rippleWaves.current) {
          const wdx = node.x * sphereScale - wave.x;
          const wdy = node.y * sphereScale - wave.y;
          const wdist = Math.sqrt(wdx * wdx + wdy * wdy);
          const diff = Math.abs(wdist - wave.radius);
          if (diff < 25) {
            const wforce = (1 - diff / 25) * wave.strength * 28;
            node.vz += wforce * dt;
          }
        }

        // Spring physics back to base 3D coordinates
        node.vx += (node.baseX - node.x) * 4.5 * dt;
        node.vy += (node.baseY - node.y) * 4.5 * dt;
        node.vz += (node.baseZ - node.z) * 4.5 * dt;

        node.vx *= 0.92;
        node.vy *= 0.92;
        node.vz *= 0.92;

        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // 3D rotation matrix calculation
        const x1 = node.x * sphereScale * cosY - node.z * sphereScale * sinY;
        const z1 = node.z * sphereScale * cosY + node.x * sphereScale * sinY;

        const y2 = node.y * sphereScale * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sphereScale * sinX;

        const perspective = fov / (fov + z2);
        const px = cx + x1 * perspective;
        const py = cy + y2 * perspective;

        projected.push({
          px,
          py,
          z: z2,
          scale: perspective,
          node,
        });
      }

      // Sort by Z for true 3D depth rendering
      projected.sort((a, b) => b.z - a.z);

      // 4. Draw 3D Geodesic Lattice Connections
      ctx.lineWidth = 0.8;
      const maxConnectDist = 48 * (sphereScale / 1.0);

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.scale < 0.65) continue;

        let connections = 0;
        const maxConn = activeMode === 'matrix' ? 3 : 2;

        for (let j = i + 1; j < projected.length; j++) {
          if (connections >= maxConn) break;
          const p2 = projected[j];

          // 2D distance check
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const alpha = (1 - dist / maxConnectDist) * 0.38 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
            connections++;
          }
        }
      }

      // 5. Draw Dual Holographic Orbital Gimbal Rings
      ctx.save();
      ctx.translate(cx, cy);

      // Outer Tilted Cyan Ring
      ctx.rotate(time * 0.00025);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.ellipse(0, 0, maxAllowedRadius * 1.12, maxAllowedRadius * 0.42, Math.PI / 5, 0, Math.PI * 2);
      ctx.stroke();

      // Traveling Photon Packet on Ring 1
      const pAngle1 = time * 0.0018;
      const p1x = Math.cos(pAngle1) * maxAllowedRadius * 1.12;
      const p1y = Math.sin(pAngle1) * maxAllowedRadius * 0.42;
      const p1RotX = p1x * Math.cos(Math.PI / 5) - p1y * Math.sin(Math.PI / 5);
      const p1RotY = p1x * Math.sin(Math.PI / 5) + p1y * Math.cos(Math.PI / 5);

      ctx.fillStyle = '#00F0FF';
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p1RotX, p1RotY, 2.4, 0, Math.PI * 2);
      ctx.fill();

      // Secondary Purple Polar Ring
      ctx.rotate(-time * 0.0004);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.16)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(0, 0, maxAllowedRadius * 1.22, maxAllowedRadius * 0.32, -Math.PI / 3.5, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // 6. Draw 3D Nodes with Depth Shading & Bloom
      for (const p of projected) {
        const pulse = 0.85 + Math.sin(p.node.pulse) * 0.25;
        const radius = Math.max(0.6, p.node.size * p.scale * pulse);
        const depthAlpha = Math.max(0.18, Math.min(1.0, (p.scale - 0.4) * 1.4));

        ctx.save();
        ctx.globalAlpha = depthAlpha;

        // Node Glow Halo for front facing nodes
        if (p.z < 0 && p.scale > 0.85) {
          ctx.fillStyle = p.node.glowColor;
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main Node Sphere
        ctx.fillStyle = p.node.color;
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();

        // Hot Specular Highlight on foreground elements
        if (p.z < -20 && p.scale > 0.95) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(p.px - radius * 0.3, p.py - radius * 0.3, radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    // POINTER & TOUCH GESTURE LISTENERS
    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      setIsInteracting(true);
      pointerStart.current = { x: e.clientX, y: e.clientY };
      pointerVelocity.current = { rx: 0, ry: 0 };
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };

      if (isDragging.current) {
        const dx = e.clientX - pointerStart.current.x;
        const dy = e.clientY - pointerStart.current.y;

        const sensitivity = 0.007;
        rotation.current.ry += dx * sensitivity;
        rotation.current.rx += dy * sensitivity;

        pointerVelocity.current = {
          ry: dx * sensitivity * 0.5,
          rx: dy * sensitivity * 0.5,
        };

        pointerStart.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      setIsInteracting(false);
    };

    const handlePointerLeave = () => {
      isDragging.current = false;
      setIsInteracting(false);
      hoverPos.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      triggerQuantumShockwave(e.clientX - rect.left, e.clientY - rect.top);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      if (resizeRafId !== null) {
        cancelAnimationFrame(resizeRafId);
      }
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, [activeMode, triggerQuantumShockwave]);

  return (
    <div
      ref={containerRef}
      id="hero-quantum-hologram-vessel"
      className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-square flex flex-col items-center justify-center select-none"
    >
      {/* 
        PRECISE CIRCULAR PROJECTION VESSEL
        Anchors with balanced padding and a clean cyber halo
      */}
      <div className="absolute inset-0 rounded-full border border-purple-500/30 shadow-[0_0_50px_rgba(139,0,238,0.22),inset_0_0_40px_rgba(168,85,247,0.12)] backdrop-blur-md bg-gradient-to-b from-[#160728]/70 via-[#0d031a]/50 to-[#160728]/80 pointer-events-none" />

      {/* Cyber Corner HUD Telemetry */}
      <div className="absolute top-3.5 left-4 z-20 text-[#C084FC]/90 text-[10px] font-mono tracking-widest flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C084FC] animate-ping" />
        [QUANTUM-CORE]
      </div>

      <div className="absolute top-3.5 right-4 z-20 text-emerald-400/90 text-[10px] font-mono tracking-widest flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        {fps} FPS // {coherence}%
      </div>

      <div className="absolute bottom-12 left-4 z-20 text-slate-400/70 text-[9px] font-mono pointer-events-none hidden sm:block">
        DRAG: 3D ROTATE
      </div>

      <div className="absolute bottom-12 right-4 z-20 text-purple-300/70 text-[9px] font-mono pointer-events-none hidden sm:block">
        CLICK: RESONANCE
      </div>

      {/* Primary Interactive 3D Canvas */}
      <canvas
        ref={canvasRef}
        className={`relative z-10 w-full h-full touch-none ${
          isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />

      {/* Interactive Cyber Mode Switcher HUD */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-[#18092c]/95 backdrop-blur-2xl border border-purple-400/35 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(139,0,238,0.35)] whitespace-nowrap">
        <button
          onClick={() => {
            sound.playClick();
            setActiveMode('quantum');
            triggerQuantumShockwave();
          }}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeMode === 'quantum'
              ? 'bg-gradient-to-r from-[#8B00EE] to-[#A855F7] text-white shadow-[0_0_12px_#A855F7]'
              : 'text-slate-300 hover:text-white hover:bg-purple-500/20'
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          Quantum
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveMode('orbital');
            triggerQuantumShockwave();
          }}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeMode === 'orbital'
              ? 'bg-gradient-to-r from-[#0284C7] to-[#00F0FF] text-black shadow-[0_0_12px_#00F0FF]'
              : 'text-slate-300 hover:text-white hover:bg-purple-500/20'
          }`}
        >
          <Orbit className="w-3 h-3 text-cyan-300" />
          Orbital
        </button>

        <button
          onClick={() => {
            sound.playClick();
            setActiveMode('matrix');
            triggerQuantumShockwave();
          }}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            activeMode === 'matrix'
              ? 'bg-gradient-to-r from-[#059669] to-[#00FF9D] text-black shadow-[0_0_12px_#00FF9D]'
              : 'text-slate-300 hover:text-white hover:bg-purple-500/20'
          }`}
        >
          <Cpu className="w-3 h-3 text-emerald-300" />
          Matrix
        </button>

        {/* Quick Spin Pulse Action */}
        <button
          onClick={() => {
            pointerVelocity.current.ry += 2.2;
            triggerQuantumShockwave();
          }}
          title="Pulse Spin"
          className="p-1 rounded-full text-purple-300 hover:text-white hover:bg-purple-500/30 transition-all cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};

export default HeroHologramCanvas;
