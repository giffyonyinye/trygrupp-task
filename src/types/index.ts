
export interface UserRole {
  id: number;
  name: string;
  type: 'DEFAULT' | 'CUSTOM' | 'SYSTEM-CUSTOM';
  date: string;
  status: 'Active' | 'In Active';
  users: string[]; // Array of avatar URLs
  totalUser: number;
}

export interface RolesApiResponse {
  data: UserRole[];
  error?: string;
}


export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}


export interface NavigationItem {
  id: string;
  label: string;
  icon?: string | null;
  isActive?: boolean;
  count?: number;
  isText?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}



export interface ActiveRole {
  id: number;
  name: string;
  lastActive: string;
  isDefault?: boolean;
}
