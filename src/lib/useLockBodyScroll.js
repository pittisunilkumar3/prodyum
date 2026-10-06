import { useEffect } from 'react';

/**
 * Locks page scrolling while `locked` is true (e.g. a modal is open).
 * - Restores the previous overflow automatically on close/unmount
 * - Compensates for the disappearing scrollbar (padding-right) so the
 *   layout doesn't jump when the custom scrollbar disappears
 *
 * Usage: useLockBodyScroll(isOpen);
 */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
