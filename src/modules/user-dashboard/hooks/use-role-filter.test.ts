import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRoleFilter } from './use-role-filter';
import { type User } from '../../../infrastructure/models/user-model';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
    title: 'Engineer',
    team: 'Engineering',
    otherDetails: 'Details',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'EDITOR',
    title: 'Manager',
    team: 'Product',
    otherDetails: 'Details',
  },
];

describe('useRoleFilter', () => {
  it('filters users by role', () => {
    const onFilterChange = vi.fn();
    const { result } = renderHook(() => useRoleFilter({ users: mockUsers, onFilterChange }));

    act(() => {
      result.current.handleRoleFilter('ADMIN');
    });

    expect(onFilterChange).toHaveBeenCalledWith([mockUsers[0]]);
  });

  it('returns all users when role is null', () => {
    const onFilterChange = vi.fn();
    const { result } = renderHook(() => useRoleFilter({ users: mockUsers, onFilterChange }));

    act(() => {
      result.current.handleRoleFilter(null);
    });

    expect(onFilterChange).toHaveBeenCalledWith(mockUsers);
  });
});
