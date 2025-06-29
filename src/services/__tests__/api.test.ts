import { fetchUserRoles, ApiError, updateUserRole, addUserRole } from '../api';

global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUserRoles', () => {
    it('fetches user roles successfully', async () => {
      const mockRoles = [
        {
          id: 1,
          name: 'Admin',
          type: 'DEFAULT',
          date: 'Jan 1, 2023',
          status: 'Active',
          users: [],
          totalUser: 0
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockRoles
      });

      const result = await fetchUserRoles();
      
      expect(fetch).toHaveBeenCalledWith('https://gamma-api.vercel.app/api/roles');
      expect(result).toEqual(mockRoles);
    });

    it('throws ApiError when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(fetchUserRoles()).rejects.toThrow(ApiError);
      await expect(fetchUserRoles()).rejects.toThrow('API request failed: Not Found');
    });

    it('throws ApiError when network error occurs', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchUserRoles()).rejects.toThrow(ApiError);
      await expect(fetchUserRoles()).rejects.toThrow('Network error');
    });

    it('handles JSON parsing errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        }
      });

      await expect(fetchUserRoles()).rejects.toThrow(ApiError);
    });
  });

  describe('updateUserRole', () => {
    it('updates user role successfully', async () => {
      const roleId = 1;
      const updates = { name: 'Updated Role' };
      
      const result = await updateUserRole(roleId, updates);
      
      expect(result).toMatchObject({
        id: roleId,
        name: 'Updated Role'
      });
      expect(result.date).toBeDefined();
    });

    it('simulates API delay', async () => {
      const startTime = Date.now();
      await updateUserRole(1, { name: 'Test' });
      const endTime = Date.now();
      
      // Should take at least 500ms due to simulated delay
      expect(endTime - startTime).toBeGreaterThanOrEqual(500);
    });
  });

  describe('addUserRole', () => {
    it('adds new user role successfully', async () => {
      const newRole = {
        name: 'New Role',
        type: 'CUSTOM' as const,
        date: 'Jan 1, 2023',
        status: 'Active' as const,
        users: [],
        totalUser: 0
      };
      
      const result = await addUserRole(newRole);
      
      expect(result).toMatchObject(newRole);
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('number');
    });

    it('generates unique IDs for new roles', async () => {
      const newRole = {
        name: 'Test Role',
        type: 'CUSTOM' as const,
        date: 'Jan 1, 2023',
        status: 'Active' as const,
        users: [],
        totalUser: 0
      };
      
      const result1 = await addUserRole(newRole);
      const result2 = await addUserRole(newRole);
      
      expect(result1.id).not.toBe(result2.id);
    });
  });

  describe('ApiError', () => {
    it('creates ApiError with message only', () => {
      const error = new ApiError('Test error');
      
      expect(error.message).toBe('Test error');
      expect(error.name).toBe('ApiError');
      expect(error.status).toBeUndefined();
      expect(error.statusText).toBeUndefined();
    });

    it('creates ApiError with status and statusText', () => {
      const error = new ApiError('Test error', 404, 'Not Found');
      
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(404);
      expect(error.statusText).toBe('Not Found');
    });
  });
});
