import React from 'react';
import {
  Home,
  BarChart3,
  FolderOpen,
  CheckSquare,
  FileText,
  Users,
  Settings,
  HelpCircle,
  X,
  Search,
  LogOut
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { NavigationItem } from '@/types';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

/**
 * Sidebar navigation component
 */
export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen = true, 
  onClose,
  className 
}) => {
  const navigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', icon: 'Home' },
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', count: 10 },
    { id: 'projects', label: 'Projects', icon: 'FolderOpen' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'reporting', label: 'Reporting', icon: 'FileText' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'support', label: 'Support', icon: 'HelpCircle' },
    { id: 'settings', label: 'Settings', icon: 'Settings', isActive: true },
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      Home,
      BarChart3,
      FolderOpen,
      CheckSquare,
      FileText,
      Users,
      Settings,
      HelpCircle
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto shadow-lg lg:shadow-none flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
        style={{ width: '280px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src="/Logo.png"
              alt="Untitled UI"
              className="h-8 w-auto object-contain"
            />
          </div>
          
          {/* Mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X size={20} className="text-gray-500" />
            </button>
          )}
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Olivia Rhye"
              className="w-full pl-12 pr-4 py-3 border-2 border-[#D6BBFB] rounded-2xl text-base focus:outline-none focus:ring-0 focus:border-[#7F56D9] transition-colors bg-white text-gray-900 placeholder-gray-500"
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px'
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 pb-4">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className={cn(
                    'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    item.isActive
                      ? 'text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                  style={item.isActive ? { background: '#F9FAFB' } : {}}
                >
                  <div className="flex items-center space-x-3">
                    {getIcon(item.icon || '')}
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* New features section */}
        <div className="px-4 py-4 border-t border-gray-200 mt-auto">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 text-sm mb-2">New features available!</h3>
            <p className="text-gray-600 text-xs mb-3">Check out the new dashboard view. Pages now load faster.</p>
            <div className="mb-3">
              {/* New features preview image */}
              <img
                src="/Image wrap.png"
                alt="Feature preview"
                className="w-full h-20 object-cover rounded-md"
                onError={(e) => {
                  // Fallback to placeholder if image not found
                  e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=100&fit=crop&crop=face";
                }}
              />
            </div>
            <div className="flex space-x-2 text-xs">
              <button className="text-gray-500 hover:text-gray-700">Dismiss</button>
              <button className="text-purple-600 hover:text-purple-700">What's new?</button>
            </div>
          </div>
        </div>

        {/* User profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/Avatar.png"
                alt="Olivia Rhye"
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image not found
                  e.currentTarget.src = "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Olivia Rhye</p>
                <p className="text-xs text-gray-500 truncate">olivia@untitledui.com</p>
              </div>
            </div>
            <button className="p-1 rounded-md hover:bg-gray-100 transition-colors">
              <LogOut size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
