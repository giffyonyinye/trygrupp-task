import React from 'react';
import { UserRolesSection } from './UserRolesSection';
import { UserRolesTable } from './UserRolesTable';
import { UserRole } from '@/types';

interface SettingsPageProps {
  roles: UserRole[];
  isLoading: boolean;
  error: string | null;
  retry: () => void;
}

/**
 * Main Settings page component
 */
export const SettingsPage: React.FC<SettingsPageProps> = ({ roles, isLoading, error, retry }) => {

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load roles</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={retry}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto" style={{background: '#F9FAFB'}}>
      <div className="w-full">
        <div className="p-4 md:p-6 space-y-8">
          <UserRolesSection isLoading={isLoading} />

          <UserRolesTable
            roles={roles}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
