import React, { useState, useEffect, useMemo } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { AvatarGroup } from '@/components/ui/AvatarGroup';
import { Skeleton, SkeletonAvatar, SkeletonButton } from '@/components/ui/Skeleton';
import { UserRole } from '@/types';
import { cn } from '@/utils/cn';

const CloudDownloadIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = ""
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    <polyline points="12,13 12,19"/>
    <polyline points="9,16 12,19 15,16"/>
  </svg>
);

interface UserRolesTableProps {
  roles: UserRole[];
  isLoading?: boolean;
  className?: string;
}


export const UserRolesTable: React.FC<UserRolesTableProps> = ({
  roles,
  isLoading = false,
  className
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(roles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRoles = useMemo(() => roles.slice(startIndex, endIndex), [roles, startIndex, endIndex]);

  useEffect(() => {
    if (currentRoles.length > 0) {
      setSelectAll(selectedRows.length === currentRoles.length && currentRoles.every(role => selectedRows.includes(role.id)));
    }
  }, [selectedRows, currentRoles]);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(prev => prev.filter(id => !currentRoles.some(role => role.id === id)));
    } else {
      setSelectedRows(prev => [...prev, ...currentRoles.map(role => role.id).filter(id => !prev.includes(id))]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowSelect = (roleId: number) => {
    setSelectedRows(prev =>
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };
  if (isLoading) {
    return (
      <div className={cn('space-y-6 px-2 py-6 md:p-6', className)}>
        {/* Header Skeleton - Desktop */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <Skeleton className="h-7 w-32" />
          <SkeletonButton className="w-36 h-10" />
        </div>

        {/* Mobile Header Skeleton */}
        <div className="md:hidden flex justify-between items-center mb-6">
          <Skeleton className="h-7 w-32" />
          <SkeletonButton className="w-28 h-10" />
        </div>

        {/* Desktop Table Skeleton */}
        <div className="hidden md:block overflow-hidden rounded-xl bg-white border border-gray-200"
             style={{
               border: '1px solid #EAECF0',
               boxShadow: '0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A'
             }}>
          <table className="min-w-full">
            <thead className="bg-gray-50" style={{ borderBottom: '1px solid #EAECF0' }}>
              <tr>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="w-5 h-5" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-12" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="px-6 py-3 text-left">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="relative px-6 py-3">
                  <Skeleton className="w-5 h-5" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[...Array(5)].map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #EAECF0' }}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="w-5 h-5" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <SkeletonAvatar size="sm" />
                      <SkeletonAvatar size="sm" />
                      <SkeletonAvatar size="sm" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Skeleton className="w-5 h-5" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List Skeleton */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-3 border-b border-gray-200 mb-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center space-x-2">
            <SkeletonButton className="w-20 h-10" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <Skeleton className="w-8 h-8" />
            <SkeletonButton className="w-16 h-10" />
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    return status === 'Active' ? (
      <span
        className="inline-flex items-center justify-center rounded-full text-xs font-medium gap-1"
        style={{
          backgroundColor: '#ECFDF3',
          width: '66px',
          height: '22px',
          color: '#027A48'
        }}
      >
        <Check size={12} />
        Active
      </span>
    ) : (
      <span
        className="inline-flex items-center justify-center rounded-full text-xs font-medium text-white"
        style={{
          backgroundColor: '#F2994A',
          width: '66px',
          height: '22px',
          mixBlendMode: 'multiply'
        }}
      >
        In Active
      </span>
    );
  };

  const getTypeText = (type: string) => {
    return (
      <span
        className="text-[#667085]"
        style={{
          fontFamily: 'Inter',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0%'
        }}
      >
        {type}
      </span>
    );
  };

  const formatRoleName = (name: string) => {
    return name.replace(/\s+\d+$/, '');
  };





  return (
    <div className={cn('space-y-6 px-2 py-6 md:p-6', className)}>
      <div className="hidden md:flex justify-between items-center mb-6">
        <div>
          <h2 className="text-gray-900" style={{fontFamily: 'Inter', fontWeight: 500, fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>User Roles</h2>
        </div>
        <button
          className="inline-flex items-center justify-center figma-small-text text-gray-700 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
          style={{
            width: '146px',
            height: '40px',
            gap: '12px'
          }}
        >
          <CloudDownloadIcon size={16} />
          Download all
        </button>
      </div>

      <div className="hidden md:block overflow-hidden rounded-xl bg-white"
           style={{
             border: '1px solid #EAECF0',
             boxShadow: '0px 2px 4px -2px #1018280F, 0px 4px 8px -2px #1018281A'
           }}>
        <table className="min-w-full">
          <thead className="bg-gray-50" style={{ borderBottom: '1px solid #EAECF0' }}>
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-5 h-5 rounded border-2 border-gray-300 text-[#7F56D9] focus:ring-[#7F56D9] focus:ring-2 focus:ring-offset-0"
                  style={{
                    accentColor: '#7F56D9'
                  }}
                />
              </th>
              <th className="px-6 py-3 text-left figma-small-text text-gray-500">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                  <span>Name</span>
                  <ChevronDown size={14} />
                </div>
              </th>
              <th className="px-6 py-3 text-left figma-small-text text-gray-500">
                Type
              </th>
              <th className="px-6 py-3 text-left figma-small-text text-gray-500">
                Date created
              </th>
              <th className="px-6 py-3 text-left figma-small-text text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left figma-small-text text-gray-500">
                Role users
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentRoles.map((role) => (
              <tr
                key={role.id}
                className={cn(
                  "transition-colors",
                  selectedRows.includes(role.id)
                    ? "bg-[#F9F5FF] hover:bg-[#F4EBFF]"
                    : "hover:bg-gray-50"
                )}
                style={{ borderBottom: '1px solid #EAECF0' }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(role.id)}
                    onChange={() => handleRowSelect(role.id)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-[#7F56D9] focus:ring-[#7F56D9] focus:ring-2 focus:ring-offset-0"
                    style={{
                      accentColor: '#7F56D9'
                    }}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="figma-label-text text-gray-900">{formatRoleName(role.name)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeText(role.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    style={{
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0%',
                      color: '#667085'
                    }}
                  >
                    {role.date}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(role.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <AvatarGroup avatars={role.users} maxVisible={4} size="sm" />
                    {role.totalUser > 0 && (
                      <span className="figma-small-text text-gray-500">+{role.totalUser}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    title="Download"
                  >
                    <CloudDownloadIcon size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900" style={{fontFamily: 'Inter', fontWeight: 500, fontSize: '18px', lineHeight: '28px', letterSpacing: '0%'}}>User Roles</h2>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <CloudDownloadIcon size={16} />
            <span>Download all</span>
          </button>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-200 mb-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded border border-gray-300 text-[#7F56D9] focus:ring-[#7F56D9] focus:ring-1"
              style={{
                accentColor: '#7F56D9'
              }}
            />
            <span className="text-sm font-medium text-gray-900 flex items-center space-x-1">
              <span>Name</span>
              <ChevronDown size={14} className="text-gray-400" />
            </span>
          </div>
          <span className="text-sm font-medium text-gray-900">Date Created</span>
        </div>

        <div className="space-y-0">
          {currentRoles.map((role, index) => (
            <div
              key={role.id}
              className={cn(
                "flex items-center justify-between py-4",
                index !== roles.length - 1 && "border-b border-gray-100"
              )}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(role.id)}
                  onChange={() => handleRowSelect(role.id)}
                  className="w-4 h-4 rounded border border-gray-300 text-[#7F56D9] focus:ring-[#7F56D9] focus:ring-1"
                  style={{
                    accentColor: '#7F56D9'
                  }}
                />
                <span className="text-sm font-medium text-gray-900">
                  {formatRoleName(role.name)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {role.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="border-t border-gray-200 bg-white">
          <div className="hidden md:flex items-center justify-between px-6 py-4">
            <div className="flex items-center text-sm text-gray-700">
              <span>
                Showing {startIndex + 1} to {Math.min(endIndex, roles.length)} of {roles.length} results
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors",
                  currentPage === 1
                    ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                )}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      page === currentPage
                        ? "bg-[#7F56D9] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors",
                  currentPage === totalPages
                    ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
                )}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          <div className="md:hidden px-3 py-4 space-y-3">
            <div className="text-center text-sm text-gray-700">
              Page {currentPage} of {totalPages} ({roles.length} total)
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                  "flex items-center px-4 py-3 mr-1 text-sm font-medium rounded-lg border transition-colors min-w-[100px] justify-center",
                  currentPage === 1
                    ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                )}
              >
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>

              <div className="flex items-center space-x-1">
                {totalPages <= 5 ? (
                  Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "w-10 h-10 text-sm font-medium rounded-lg transition-colors",
                        page === currentPage
                          ? "bg-[#7F56D9] text-white"
                          : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                      )}
                    >
                      {page}
                    </button>
                  ))
                ) : (
                  <>
                    {currentPage > 2 && (
                      <>
                        <button
                          onClick={() => handlePageChange(1)}
                          className="w-10 h-10 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                        >
                          1
                        </button>
                        {currentPage > 3 && <span className="text-gray-400">...</span>}
                      </>
                    )}

                    {[currentPage - 1, currentPage, currentPage + 1]
                      .filter(page => page >= 1 && page <= totalPages)
                      .map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={cn(
                            "w-10 h-10 text-sm font-medium rounded-lg transition-colors",
                            page === currentPage
                              ? "bg-[#7F56D9] text-white"
                              : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                          )}
                        >
                          {page}
                        </button>
                      ))}

                    {currentPage < totalPages - 1 && (
                      <>
                        {currentPage < totalPages - 2 && <span className="text-gray-400">...</span>}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className="w-10 h-10 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                  "flex items-center px-4 py-3 text-sm ml-1 font-medium rounded-lg border transition-colors min-w-[100px] justify-center",
                  currentPage === totalPages
                    ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                )}
              >
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
