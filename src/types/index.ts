/**
 * User role interface based on API response structure
 */
export interface UserRole {
  id: number;
  name: string;
  type: 'DEFAULT' | 'CUSTOM' | 'SYSTEM-CUSTOM';
  date: string;
  status: 'Active' | 'In Active';
  users: string[]; // Array of avatar URLs
  totalUser: number;
}

/**
 * API response wrapper for roles
 */
export interface RolesApiResponse {
  data: UserRole[];
  error?: string;
}

/**
 * Loading state for async operations
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Navigation item interface
 */
export interface NavigationItem {
  id: string;
  label: string;
  icon?: string | null;
  isActive?: boolean;
  count?: number;
  isText?: boolean;
}

/**
 * User profile interface
 */
export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}



/**
 * Active role interface for user role management
 */
export interface ActiveRole {
  id: number;
  name: string;
  lastActive: string;
  isDefault?: boolean;
}
