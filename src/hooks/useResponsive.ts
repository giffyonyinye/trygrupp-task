import { useState, useEffect } from 'react';

/**
 * Breakpoint constants matching Tailwind CSS defaults
 */
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Custom hook for responsive design utilities
 */
export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Check if current screen size is above given breakpoint
   */
  const isAbove = (breakpoint: Breakpoint): boolean => {
    return windowSize.width >= BREAKPOINTS[breakpoint];
  };

  /**
   * Check if current screen size is below given breakpoint
   */
  const isBelow = (breakpoint: Breakpoint): boolean => {
    return windowSize.width < BREAKPOINTS[breakpoint];
  };

  /**
   * Check if current screen size is between two breakpoints
   */
  const isBetween = (min: Breakpoint, max: Breakpoint): boolean => {
    return windowSize.width >= BREAKPOINTS[min] && windowSize.width < BREAKPOINTS[max];
  };

  // Convenience getters for common breakpoints
  const isMobile = isBelow('md');
  const isTablet = isBetween('md', 'lg');
  const isDesktop = isAbove('lg');
  const isLargeDesktop = isAbove('xl');

  return {
    windowSize,
    isAbove,
    isBelow,
    isBetween,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  };
}
