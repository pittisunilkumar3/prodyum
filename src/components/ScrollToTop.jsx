import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // pathname only as a dependency: in-page hash clicks are handled natively
  // (via scroll-behavior: smooth). This effect handles route-entry cases —
  // arriving at /it#section via a redirect or a direct deep link.
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      };
      // Give the page a tick to mount before scrolling to the target section.
      const t = setTimeout(scrollToHash, 80);
      return () => clearTimeout(t);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
