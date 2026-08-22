'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import styles from './SlideDeck.module.css';

/**
 * Self-contained slide presenter. The deck is 84 fixed 16:9 JPEGs on our
 * own Blob storage, so presenting never leaves this page and never
 * depends on Google being reachable.
 */
const BASE = 'https://ic5hghfat7q3aql8.public.blob.vercel-storage.com/presentations/truth-about-drugs';
const TOTAL = 84;

const slideUrl = (n: number) => `${BASE}/slide-${String(n).padStart(2, '0')}.jpg`;

export default function SlideDeck() {
  const [index, setIndex] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // iOS Safari does not implement the Fullscreen API for ordinary
  // elements (only <video>), so requestFullscreen() rejects on an iPhone
  // and the present button would simply do nothing. When the real API is
  // unavailable or refuses, fall back to pinning the stage over the
  // viewport with CSS, which behaves the same for the audience.
  const [isFaux, setIsFaux] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const presenting = isFullscreen || isFaux;

  const go = useCallback((n: number) => {
    setIndex(Math.min(TOTAL, Math.max(1, n)));
  }, []);

  // Warm the neighbouring slides so advancing mid-sentence is instant
  // rather than showing a half-loaded image to a room of people.
  useEffect(() => {
    [index + 1, index + 2, index - 1].forEach((n) => {
      if (n >= 1 && n <= TOTAL) {
        const img = new window.Image();
        img.src = slideUrl(n);
      }
    });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          setIndex((i) => Math.min(TOTAL, i + 1));
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          setIndex((i) => Math.max(1, i - 1));
          break;
        case 'Home':
          e.preventDefault();
          setIndex(1);
          break;
        case 'End':
          e.preventDefault();
          setIndex(TOTAL);
          break;
        case 'Escape':
          // Native fullscreen already exits on Esc by itself; this is for
          // the CSS fallback, which the browser knows nothing about.
          setIsFaux(false);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Presenting should not leave the page scrollable underneath.
  useEffect(() => {
    if (!isFaux) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isFaux]);

  // Track fullscreen from the browser rather than our own click handler,
  // so pressing Esc (which we never see as a click) still syncs the icon.
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen?.().catch(() => {});
      return;
    }
    if (isFaux) {
      setIsFaux(false);
      return;
    }
    try {
      const el = stageRef.current;
      if (!el?.requestFullscreen) throw new Error('unsupported');
      await el.requestFullscreen();
    } catch {
      // Rejected or unsupported (iOS, or a permissions policy that
      // disallows fullscreen). Present with the CSS fallback instead of
      // leaving the button looking broken.
      setIsFaux(true);
    }
  }, [isFaux]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const scrubTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    go(Math.round(ratio * (TOTAL - 1)) + 1);
  };

  return (
    <div className={styles.bleed}>
      <div
        ref={stageRef}
        className={`${styles.stage} ${isFaux ? styles.faux : ''}`}
        tabIndex={0}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Deliberately a plain <img>: these are pre-sized 16:9 JPEGs and
            this component does its own neighbour preloading, so slide
            changes are instant. Routing them through next/image would add
            an optimisation round-trip on first view of each slide, which
            is the one thing you cannot afford live in front of a room. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={index}
          src={slideUrl(index)}
          alt={`Slide ${index} of ${TOTAL}`}
          className={styles.slide}
          draggable={false}
        />

        <button
          type="button"
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => go(index - 1)}
          disabled={index === 1}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          type="button"
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => go(index + 1)}
          disabled={index === TOTAL}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        <div className={styles.counter}>
          {index} / {TOTAL}
        </div>

        <button
          type="button"
          className={styles.fsBtn}
          onClick={toggleFullscreen}
          aria-label={presenting ? 'Exit fullscreen' : 'Present fullscreen'}
        >
          {presenting ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>

        <div
          className={styles.progressTrack}
          onClick={scrubTo}
          role="presentation"
          aria-hidden="true"
        >
          <div
            className={styles.progressFill}
            style={{ width: `${((index - 1) / (TOTAL - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
