import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge class names conditionally
 * This is a simplified version - in a real project you might use clsx + tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
