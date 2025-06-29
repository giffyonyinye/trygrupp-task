import { renderHook, act } from '@testing-library/react';
import { useResponsive } from '../useResponsive';

// Mock window.innerWidth and window.innerHeight
const mockWindowSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
};

// Mock window.addEventListener and removeEventListener
const mockEventListener = () => {
  const listeners: { [key: string]: EventListener[] } = {};

  window.addEventListener = jest.fn((event: string, listener: any) => {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(listener);
  }) as any;

  window.removeEventListener = jest.fn((event: string, listener: any) => {
    if (listeners[event]) {
      const index = listeners[event].indexOf(listener);
      if (index > -1) listeners[event].splice(index, 1);
    }
  }) as any;

  return {
    triggerEvent: (event: string) => {
      if (listeners[event]) {
        listeners[event].forEach(listener => listener(new Event(event)));
      }
    }
  };
};

describe('useResponsive Hook', () => {
  let eventMock: ReturnType<typeof mockEventListener>;

  beforeEach(() => {
    eventMock = mockEventListener();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with current window size', () => {
    mockWindowSize(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.windowSize).toEqual({
      width: 1024,
      height: 768
    });
  });

  it('updates window size on resize', () => {
    mockWindowSize(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.windowSize.width).toBe(1024);
    
    // Change window size and trigger resize
    act(() => {
      mockWindowSize(1280, 800);
      eventMock.triggerEvent('resize');
    });
    
    expect(result.current.windowSize).toEqual({
      width: 1280,
      height: 800
    });
  });

  it('correctly identifies mobile breakpoint', () => {
    mockWindowSize(640, 480); // Below md (768px)
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
  });

  it('correctly identifies tablet breakpoint', () => {
    mockWindowSize(800, 600); // Between md (768px) and lg (1024px)
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
  });

  it('correctly identifies desktop breakpoint', () => {
    mockWindowSize(1200, 800); // Above lg (1024px)
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });

  it('correctly identifies large desktop breakpoint', () => {
    mockWindowSize(1600, 900); // Above xl (1280px)
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isLargeDesktop).toBe(true);
    expect(result.current.isDesktop).toBe(true);
  });

  it('isAbove function works correctly', () => {
    mockWindowSize(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isAbove('md')).toBe(true);
    expect(result.current.isAbove('lg')).toBe(true);
    expect(result.current.isAbove('xl')).toBe(false);
  });

  it('isBelow function works correctly', () => {
    mockWindowSize(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isBelow('sm')).toBe(false);
    expect(result.current.isBelow('xl')).toBe(true);
    expect(result.current.isBelow('2xl')).toBe(true);
  });

  it('isBetween function works correctly', () => {
    mockWindowSize(1024, 768);
    
    const { result } = renderHook(() => useResponsive());
    
    expect(result.current.isBetween('md', 'xl')).toBe(true);
    expect(result.current.isBetween('sm', 'md')).toBe(false);
    expect(result.current.isBetween('xl', '2xl')).toBe(false);
  });

  it('cleans up event listener on unmount', () => {
    const { unmount } = renderHook(() => useResponsive());
    
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    
    unmount();
    
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
