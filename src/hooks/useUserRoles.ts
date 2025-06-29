import { useState, useEffect, useCallback } from 'react';
import { UserRole, LoadingState } from '@/types';
import { fetchUserRoles, ApiError } from '@/services/api';

/**
 * Custom hook for managing user roles data
 */
export function useUserRoles() {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null
  });

  /**
   * Fetch roles from API
   */
  const fetchRoles = useCallback(async () => {
    try {
      setLoadingState({ isLoading: true, error: null });
      const rolesData = await fetchUserRoles();
      setRoles(rolesData);
      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to fetch user roles';
      
      setLoadingState({ isLoading: false, error: errorMessage });
      console.error('Error fetching user roles:', error);
    }
  }, []);

  /**
   * Retry fetching roles
   */
  const retryFetch = useCallback(() => {
    fetchRoles();
  }, [fetchRoles]);

  /**
   * Filter roles by status
   */
  const getActiveRoles = useCallback(() => {
    return roles.filter(role => role.status === 'Active');
  }, [roles]);

  /**
   * Filter roles by type
   */
  const getRolesByType = useCallback((type: UserRole['type']) => {
    return roles.filter(role => role.type === type);
  }, [roles]);

  /**
   * Get role by ID
   */
  const getRoleById = useCallback((id: number) => {
    return roles.find(role => role.id === id);
  }, [roles]);

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    isLoading: loadingState.isLoading,
    error: loadingState.error,
    refetch: fetchRoles,
    retry: retryFetch,
    getActiveRoles,
    getRolesByType,
    getRoleById
  };
}
