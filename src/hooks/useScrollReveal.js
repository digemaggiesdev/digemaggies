import { useEffect } from 'react';

// Fades/slides elements marked with the "reveal" class into view as they scroll into the viewport.
export function useScrollReveal(containerRef) {
  useEffect(() => {
    const root = containerRef?.current;
    if (!root) return;

    const revealEls = root.querySelectorAll('.reveal');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealEls.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}
