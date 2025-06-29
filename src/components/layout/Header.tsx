import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onMenuClick?: () => void;
}

/**
 * Header component with logo, navigation tabs, and mobile menu
 */
export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [activeTab, setActiveTab] = useState('Roles');

  const tabs = [
    'My details',
    'Profile',
    'Password',
    'Team',
    'Plan',
    'Roles',
    'Notifications',
    'Integrations',
    'API'
  ];

  return (
    <div className="bg-white">
      {/* Top Header with Logo and Menu */}
      <header className="border-b border-gray-200 px-4 py-4 lg:px-6 lg:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#7F56D9] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-lg font-semibold text-gray-900">Untitled UI</span>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu size={20} />
          </Button>
        </div>
      </header>

      {/* Settings Section */}
      <div className="px-4 py-6 lg:px-6" style={{background: '#F9FAFB'}}>
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your team and preferences here.</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-0 overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap px-4 py-2 text-sm font-medium border transition-colors
                ${index === 0 ? 'rounded-l-lg' : ''}
                ${index === tabs.length - 1 ? 'rounded-r-lg' : ''}
                ${index > 0 ? 'border-l-0' : ''}
                ${activeTab === tab
                  ? 'bg-[#F9FAFB] text-[#7F56D9] border-gray-300'
                  : 'bg-white text-gray-500 border-gray-200 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
              style={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0%'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* User Roles Section Header */}
      <div className="px-4 py-6 lg:px-6 border-b border-gray-200" style={{background: '#F9FAFB'}}>
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-1">User Roles</h2>
          <p className="text-sm text-gray-600">Update your roles details and information.</p>
        </div>
      </div>
    </div>
  );
};
