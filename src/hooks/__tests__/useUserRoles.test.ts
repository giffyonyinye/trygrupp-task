import { renderHook, waitFor } from '@testing-library/react';
import { useUserRoles } from '../useUserRoles';
import * as api from '@/services/api';

// Mock the API module
jest.mock('@/services/api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockRoles = [
  {
    id: 1,
    name: 'Admin',
    type: 'DEFAULT' as const,
    date: 'Jan 1, 2023',
    status: 'Active' as const,
    users: [],
    totalUser: 0
  },
  {
    id: 2,
    name: 'User',
    type: 'CUSTOM' as const,
    date: 'Feb 1, 2023',
    status: 'In Active' as const,
    users: [],
    totalUser: 0
  }
];

describe('useUserRoles Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches roles successfully on mount', async () => {
    mockedApi.fetchUserRoles.mockResolvedValueOnce(mockRoles);

    const { result } = renderHook(() => useUserRoles());

    // Initially loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.roles).toEqual([]);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.roles).toEqual(mockRoles);
    expect(result.current.error).toBe(null);
    expect(mockedApi.fetchUserRoles).toHaveBeenCalledTimes(1);
  });

  it('handles fetch errors correctly', async () => {
    const errorMessage = 'Failed to fetch roles';
    mockedApi.fetchUserRoles.mockRejectedValueOnce(new api.ApiError(errorMessage));

    const { result } = renderHook(() => useUserRoles());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.roles).toEqual([]);
  });

  it('provides retry functionality', async () => {
    mockedApi.fetchUserRoles
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(mockRoles);

    const { result } = renderHook(() => useUserRoles());

    // Wait for initial error
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    // Retry the fetch
    result.current.retry();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.roles).toEqual(mockRoles);
    expect(result.current.error).toBe(null);
    expect(mockedApi.fetchUserRoles).toHaveBeenCalledTimes(2);
  });

  it('filters active roles correctly', async () => {
    mockedApi.fetchUserRoles.mockResolvedValueOnce(mockRoles);

    const { result } = renderHook(() => useUserRoles());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const activeRoles = result.current.getActiveRoles();
    expect(activeRoles).toHaveLength(1);
    expect(activeRoles[0].status).toBe('Active');
  });

  it('filters roles by type correctly', async () => {
    mockedApi.fetchUserRoles.mockResolvedValueOnce(mockRoles);

    const { result } = renderHook(() => useUserRoles());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const defaultRoles = result.current.getRolesByType('DEFAULT');
    const customRoles = result.current.getRolesByType('CUSTOM');

    expect(defaultRoles).toHaveLength(1);
    expect(customRoles).toHaveLength(1);
    expect(defaultRoles[0].type).toBe('DEFAULT');
    expect(customRoles[0].type).toBe('CUSTOM');
  });

  it('finds role by ID correctly', async () => {
    mockedApi.fetchUserRoles.mockResolvedValueOnce(mockRoles);

    const { result } = renderHook(() => useUserRoles());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const role = result.current.getRoleById(1);
    expect(role).toEqual(mockRoles[0]);

    const nonExistentRole = result.current.getRoleById(999);
    expect(nonExistentRole).toBeUndefined();
  });

  it('refetches data when refetch is called', async () => {
    mockedApi.fetchUserRoles.mockResolvedValue(mockRoles);

    const { result } = renderHook(() => useUserRoles());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Call refetch
    result.current.refetch();

    expect(mockedApi.fetchUserRoles).toHaveBeenCalledTimes(2);
  });
});
