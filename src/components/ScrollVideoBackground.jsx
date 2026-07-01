import { useRef } from 'react';
import useScrollVideo from '../hooks/useScrollVideo';
import './ScrollVideoBackground.css';

/**
 * ScrollVideoBackground
 * ---------------------
 * A full-viewport background video pinned behind page content.
 *
 * It is `position: fixed` and sits at z-0, so as the rest of the page scrolls
 * the video stays put while its `currentTime` is scrubbed by `useScrollVideo`.
 * Page content should be wrapped in a `relative z-10` container so it renders
 * above the video.
 *
 * Sources: pass a `sources` array (preferred format first; browser takes the
 * first one it can play) to enable multi-format delivery, e.g. a WebM/VP9
 * render for Chrome/Edge/Firefox with an MP4/H.264 fallback for Safari. If you
 * only have one file, pass `src` instead and it is used directly.
 *
 * Props:
 *  - src:     single video URL (used when `sources` is not provided)
 *  - sources: [{ src, type }] — ordered list; first playable source wins
 *  - poster:  fallback image shown before load / under reduced-motion
 *  - scrim:   'light' | 'medium' | 'strong'  (darkens the video for legibility)
 *  - mode:    'scrub' (scroll-linked) | 'autoplay' (looping background)
 */
const SCRIM_CLASS = {
  light: 'scroll-video-bg__scrim--light',
  medium: 'scroll-video-bg__scrim--medium',
  strong: 'scroll-video-bg__scrim--strong',
};

export default function ScrollVideoBackground({
  src,
  sources,
  poster,
  scrim = 'medium',
  mode = 'scrub',
}) {
  const videoRef = useRef(null);
  const hasSources = Array.isArray(sources) && sources.length > 0;
  useScrollVideo(videoRef, { mode });

  return (
    <div className="scroll-video-bg" aria-hidden="true">
      <video
        ref={videoRef}
        className="scroll-video-bg__video"
        poster={poster}
        muted
        playsInline
        preload="auto"
        // No controls / no autoPlay: currentTime is driven by scroll (useScrollVideo).
        tabIndex="-1"
        // Use either <source> children (multi-format) or a single `src`, not both.
        {...(hasSources ? {} : { src })}
      >
        {hasSources
          ? sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))
          : null}
      </video>
      <div
        className={`scroll-video-bg__scrim ${
          SCRIM_CLASS[scrim] || SCRIM_CLASS.medium
        }`}
      />
      <div className="scroll-video-bg__vignette" />
    </div>
  );
}
