import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
}

/**
 * Skeleton component for loading states
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = 'md',
  variant = 'default'
}) => {
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const variantClasses = {
    default: 'bg-gray-200',
    text: 'bg-gray-200 h-4',
    circular: 'bg-gray-200 rounded-full',
    rectangular: 'bg-gray-200 rounded-md'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'animate-pulse',
        variantClasses[variant],
        variant !== 'circular' && roundedClasses[rounded],
        className
      )}
      style={style}
    />
  );
};

// Predefined skeleton components for common use cases
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className 
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        className={i === lines - 1 ? 'w-3/4' : 'w-full'}
      />
    ))}
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
    />
  );
};

export const SkeletonButton: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton
    className={cn('h-10 w-24', className)}
    rounded="lg"
  />
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-4 border border-gray-200 rounded-lg space-y-3', className)}>
    <Skeleton className="h-4 w-3/4" />
    <SkeletonText lines={2} />
    <div className="flex justify-between items-center">
      <Skeleton className="h-6 w-16" />
      <SkeletonButton />
    </div>
  </div>
);
