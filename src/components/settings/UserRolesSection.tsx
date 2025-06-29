import React, { useState } from 'react';
import { Mail, Plus, Check, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Skeleton, SkeletonAvatar } from '@/components/ui/Skeleton';

interface UserRolesSectionProps {
  isLoading?: boolean;
}


export const UserRolesSection: React.FC<UserRolesSectionProps> = ({ isLoading = false }) => {
  const [selectedEmail, setSelectedEmail] = useState('my-account');
  const [selectedRole, setSelectedRole] = useState(1); // Default to Superadmin

  const activeRoles = [
    {
      id: 1,
      name: 'Superadmin',
      lastActive: '06/2023',
      isDefault: false,
      isPrimary: true
    },
    {
      id: 2,
      name: 'Developeradmin',
      lastActive: '01/2023',
      isDefault: true,
      isPrimary: false
    },
    {
      id: 3,
      name: 'Supportadmin',
      lastActive: '10/2022',
      isDefault: true,
      isPrimary: false
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8 px-2 py-6 md:px-6">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-4 md:space-y-0">
          <div className="flex-shrink-0">
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-5 w-36" />
              </div>
              <div className="pl-6">
                <Skeleton className="h-10 w-full max-w-md rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-4 md:space-y-0 pt-8 border-t border-gray-200">
          <div className="flex-shrink-0">
            <Skeleton className="h-5 w-24 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex-1">
            <div className="hidden md:block space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-lg border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <SkeletonAvatar size="md" />
                      <div className="flex flex-col justify-center">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-3 w-32 mb-2" />
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="w-6 h-6 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            <div className="md:hidden space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <SkeletonAvatar size="md" />
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-5 w-24 mb-1" />
                        <Skeleton className="h-4 w-32 mb-3" />
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="w-6 h-6 rounded-full ml-3" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Skeleton className="h-9 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-2 pb-6 md:px-6">
      <div className="px-4 pb-6 lg:px-6 border-b border-gray-200" style={{background: '#F9FAFB'}}>
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-1">User Roles</h2>
          <p className="text-sm text-gray-600">Update your roles details and information.</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-4 md:space-y-0">
        <div className="flex-shrink-0">
          <h3 className="figma-label-text text-gray-900 mb-1">Connected email</h3>
          <p className="figma-small-text text-gray-600">Select role account</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex  space-x-3">
            <input
              type="radio"
              id="my-account-email"
              name="email-option"
              value="my-account"
              checked={selectedEmail === 'my-account'}
              onChange={(e) => setSelectedEmail(e.target.value)}
              className="w-4 h-4 text-[#7F56D9] bg-white border-gray-300 mt-1 focus:ring-[#7F56D9] focus:ring-2"
              style={{
                accentColor: '#7F56D9'
              }}
            />
            <div>
              <label htmlFor="my-account-email" className="figma-label-text text-gray-900">My account email</label>
              <p className="figma-small-text text-gray-600">olivia@untitledui.com</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="alternative-email"
                name="email-option"
                value="alternative"
                checked={selectedEmail === 'alternative'}
                onChange={(e) => setSelectedEmail(e.target.value)}
                className="w-4 h-4 text-[#7F56D9] bg-white border-gray-300 focus:ring-[#7F56D9] focus:ring-2"
                style={{
                  accentColor: '#7F56D9'
                }}
              />
              <label htmlFor="alternative-email" className="figma-label-text text-gray-900">
                An alternative email
              </label>
            </div>

            <div className="pl-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value="billing@untitledui.com"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors max-w-md"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:space-x-8 space-y-4 md:space-y-0 pt-8 border-t border-gray-200">
        <div className="flex-shrink-0">
          <h3 className="figma-label-text text-gray-900 mb-1">Active Role</h3>
          <p className="figma-small-text text-gray-600">Select active role available to the user.</p>
        </div>

        <div className="flex-1">
          <div className="hidden md:block space-y-3">
          {activeRoles.map((role) => (
            <div
              key={role.id}
              className={`flex items-center justify-between rounded-lg transition-colors cursor-pointer ${
                selectedRole === role.id
                  ? 'bg-[#F9F5FF] border border-[#D6BBFB]'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedRole(role.id)}
              style={{
                height: '100px',
                borderRadius: '8px',
                borderWidth: '1px',
                padding: '16px',
                gap: '4px'
              }}
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedRole === role.id ? "bg-white border border-gray-200" : "bg-white border border-gray-200"
                }`}>
                  <Users size={20} className={selectedRole === role.id ? "text-[#7F56D9]" : "text-gray-600"} />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center space-x-2">
                    <span className={`${selectedRole === role.id ? 'text-[#7F56D9]' : 'text-gray-900'}`} style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0%'}}>{role.name}</span>
                    
                  </div>
                  <p className="text-xs text-gray-500" style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '18px', letterSpacing: '0%'}}>Last active {role.lastActive}</p>

                  <div className="flex items-center space-x-3 mt-2">
                    <button className={`transition-colors ${
                      selectedRole === role.id ? 'text-[#7F56D9] hover:text-purple-700' : 'text-gray-500 hover:text-gray-700'
                    }`} style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0%'}}>
                      Set as default
                    </button>
                    <button className="transition-colors text-[#7F56D9] hover:text-purple-700" style={{fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', letterSpacing: '0%'}}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                {selectedRole === role.id ? (
                  <div className="w-6 h-6 bg-[#7F56D9] rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                ) : (
                  <input
                    type="radio"
                    name="active-role"
                    value={role.id}
                    checked={selectedRole === role.id}
                    onChange={() => setSelectedRole(role.id)}
                    className="w-4 h-4 text-[#7F56D9] bg-white border-gray-300 focus:ring-[#7F56D9] focus:ring-2 checked:bg-[#7F56D9] checked:border-[#7F56D9]"
                  />
                )}
              </div>
            </div>
          ))}
          </div>

          <div className="md:hidden space-y-3">
            {activeRoles.map((role) => (
              <div
                key={role.id}
                className={`rounded-xl border transition-colors cursor-pointer ${
                  selectedRole === role.id
                    ? 'bg-[#F9F5FF] border-[#D6BBFB]'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedRole(role.id)}
                style={{
                  padding: '16px'
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedRole === role.id ? "bg-purple-100" : "bg-gray-100"
                    }`}>
                      <Users size={20} className={selectedRole === role.id ? "text-[#7F56D9]" : "text-gray-600"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-medium mb-1 ${
                        selectedRole === role.id ? 'text-[#7F56D9]' : 'text-gray-900'
                      }`} style={{
                        fontFamily: 'Inter',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0%'
                      }}>
                        {role.name}
                      </h3>
                      <p className="text-gray-500 mb-3" style={{
                        fontFamily: 'Inter',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        letterSpacing: '0%'
                      }}>
                        Last active {role.lastActive}
                      </p>

                      <div className="flex items-center space-x-4">
                        <button className={`transition-colors ${
                          selectedRole === role.id ? 'text-[#7F56D9] hover:text-purple-700' : 'text-gray-500 hover:text-gray-700'
                        }`} style={{
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '20px',
                          letterSpacing: '0%'
                        }}>
                          Set as default
                        </button>
                        <button className="text-[#7F56D9] hover:text-purple-700 transition-colors" style={{
                          fontFamily: 'Inter',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '20px',
                          letterSpacing: '0%'
                        }}>
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center ml-3">
                    {selectedRole === role.id ? (
                      <div className="w-6 h-6 bg-[#7F56D9] rounded-full flex items-center justify-center">
                        <Check size={16} className="text-white" />
                      </div>
                    ) : (
                      <input
                        type="radio"
                        name="active-role-mobile"
                        value={role.id}
                        checked={selectedRole === role.id}
                        onChange={() => setSelectedRole(role.id)}
                        className="w-5 h-5 text-[#7F56D9] bg-white border-gray-300 focus:ring-[#7F56D9] focus:ring-2"
                        style={{
                          accentColor: '#7F56D9'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="ghost" size="sm" leftIcon={<Plus size={16} />} className="mt-4">
            Add role to user
          </Button>
        </div>
      </div>
    </div>
  );
};
