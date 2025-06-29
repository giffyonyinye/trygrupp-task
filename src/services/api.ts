import { UserRole } from '@/types';

const API_BASE_URL = 'https://gamma-api.vercel.app/api';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Generic API request handler with error handling
 */
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        response.statusText
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors or other fetch failures
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

/**
 * Fetch all user roles from the API
 */
export async function fetchUserRoles(): Promise<UserRole[]> {
  return apiRequest<UserRole[]>('/roles');
}

/**
 * Simulated API calls for other operations (since we only have roles endpoint)
 */
export async function updateUserRole(roleId: number, updates: Partial<UserRole>): Promise<UserRole> {
  // Simulate API call - in real app this would make actual HTTP request
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock updated role
  return {
    id: roleId,
    name: updates.name || 'Updated Role',
    type: updates.type || 'CUSTOM',
    date: new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }),
    status: updates.status || 'Active',
    users: updates.users || [],
    totalUser: updates.totalUser || 0
  };
}

/**
 * Simulated API call to add a new role
 */
export async function addUserRole(role: Omit<UserRole, 'id'>): Promise<UserRole> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...role,
    id: Math.floor(Math.random() * 1000) + 1000 // Generate random ID
  };
}
