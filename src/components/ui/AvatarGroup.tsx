import React from 'react';
import { cn } from '@/utils/cn';

export interface AvatarGroupProps {
  avatars: string[];
  maxVisible?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}


export const AvatarGroup: React.FC<AvatarGroupProps> = ({ 
  avatars, 
  maxVisible = 4, 
  size = 'sm',
  className 
}) => {
  const visibleAvatars = avatars.slice(0, maxVisible);
  const remainingCount = avatars.length - maxVisible;

  const spacingClasses = {
    xs: '-space-x-1',
    sm: '-space-x-1.5',
    md: '-space-x-2',
    lg: '-space-x-2.5',
    xl: '-space-x-3'
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  return (
    <div className={cn('flex items-center', spacingClasses[size], className)}>
      {visibleAvatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`User ${index + 1}`}
          className={cn(
            'rounded-full object-cover ring-2 ring-white',
            sizeClasses[size]
          )}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face";
          }}
        />
      ))}
      
      {remainingCount > 0 && (
        <div 
          className={cn(
            'rounded-full bg-gray-100 flex items-center justify-center font-medium text-gray-600 ring-2 ring-white',
            size === 'xs' && 'w-6 h-6 text-xs',
            size === 'sm' && 'w-8 h-8 text-xs',
            size === 'md' && 'w-10 h-10 text-sm',
            size === 'lg' && 'w-12 h-12 text-sm',
            size === 'xl' && 'w-16 h-16 text-base'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
