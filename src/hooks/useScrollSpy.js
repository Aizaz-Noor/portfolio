import { useState, useEffect } from 'react';

/**
 * Custom hook to track which section is currently active in the viewport.
 * @param {string[]} sectionIds - Array of HTML IDs to observe.
 * @param {Object} options - IntersectionObserver options.
 * @returns {string} The ID of the currently active section.
 */
const defaultOptions = { rootMargin: '-20% 0px -40% 0px' };

export function useScrollSpy(sectionIds, options = defaultOptions) {
  const [activeId, setActiveId] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    const observed = new Set();

    const tryObserve = () => {
      sectionIds.forEach((id) => {
        if (!observed.has(id)) {
          const element = document.getElementById(id);
          if (element) {
            observer.observe(element);
            observed.add(id);
          }
        }
      });
      return observed.size === sectionIds.length;
    };

    // Try immediately
    if (!tryObserve()) {
      // If some elements are lazy-loaded, retry periodically
      const interval = setInterval(() => {
        if (tryObserve()) {
          clearInterval(interval);
        }
      }, 500);

      return () => {
        clearInterval(interval);
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeId;
}
