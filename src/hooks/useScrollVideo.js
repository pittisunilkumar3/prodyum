import { useEffect, useRef } from 'react';

/**
 * useScrollVideo
 * --------------
 * Drives a background <video> from the page's scroll position.
 *
 * As the user scrolls the page, the video's `currentTime` is scrubbed from
 * 0 -> duration (the video is never "played"; it is seeked frame-by-frame,
 * exactly like the reference project). A light easing is applied so the
 * motion stays smooth instead of snapping to each scroll tick.
 *
 * @param {React.RefObject<HTMLVideoElement>} videoRef - ref attached to the <video>
 * @param {Object}   [options]
 * @param {'scrub'|'autoplay'} [options.mode='scrub']      - 'scrub' ties playback to scroll; 'autoplay' just loops.
 * @param {number}   [options.smoothing=0.12]              - 0..1 lerp toward the scroll-derived target time.
 * @param {number}   [options.epsilon=0.0005]              - min change (as a fraction of duration) before we seek.
 */
export default function useScrollVideo(videoRef, options = {}) {
  const { mode = 'scrub', smoothing = 0.12, epsilon = 0.0005 } = options;

  // Mutable loop state kept in refs so we never re-trigger the effect.
  const targetProgressRef = useRef(0);   // where scroll says we should be (0..1)
  const currentProgressRef = useRef(0);  // where the eased time currently is (0..1)

  useEffect(() => {
    const video = videoRef && videoRef.current;
    if (!video) return undefined;

    // Respect reduced-motion: leave the poster / first frame in place, do nothing.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let rafId = null;
    let onScroll = null;
    let onResize = null;

    const computeProgress = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      targetProgressRef.current =
        scrollable > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollable))
          : 0;
    };

    // 'autoplay' mode: just play (muted + playsInline set on the element).
    const startAutoplay = () => {
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => {
          /* autoplay can be rejected (e.g. no user gesture); ignore */
        });
      }
    };

    // 'scrub' mode: ease currentTime toward the scroll-derived target every frame.
    const startScrub = () => {
      const tick = () => {
        const target = targetProgressRef.current;
        const diff = target - currentProgressRef.current;

        // Ease toward the target; snap when we're close enough to settle.
        currentProgressRef.current =
          Math.abs(diff) > 0.0005
            ? currentProgressRef.current + diff * smoothing
            : target;

        const duration = video.duration;
        if (duration && Number.isFinite(duration)) {
          const nextTime = currentProgressRef.current * duration;
          // Only seek when the change is meaningful — avoids spamming the
          // media element on every animation frame and keeps things smooth.
          if (Math.abs(nextTime - video.currentTime) > epsilon * duration) {
            video.currentTime = nextTime;
          }
        }
        rafId = requestAnimationFrame(tick);
      };

      onScroll = computeProgress;
      onResize = computeProgress;
      computeProgress();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (mode === 'autoplay') startAutoplay();
      else startScrub();
    };

    // We need metadata (duration) before scrubbing makes sense.
    const onLoadedMetadata = () => start();

    if (
      video.readyState >= 1 &&
      video.duration &&
      Number.isFinite(video.duration)
    ) {
      start();
    } else {
      video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
    }

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      if (onScroll) window.removeEventListener('scroll', onScroll);
      if (onResize) window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [videoRef, mode, smoothing, epsilon]);
}
