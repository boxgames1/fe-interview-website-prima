import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserSearch } from './use-user-search';
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

describe('useUserSearch', () => {
  it('filters users by name', () => {
    const onFilterChange = vi.fn();
    const { result } = renderHook(() => useUserSearch({ users: mockUsers, onFilterChange }));

    act(() => {
      result.current.handleSearch('John');
    });

    expect(onFilterChange).toHaveBeenCalledWith([mockUsers[0]]);
  });

  it('returns all users when query is empty', () => {
    const onFilterChange = vi.fn();
    const { result } = renderHook(() => useUserSearch({ users: mockUsers, onFilterChange }));

    act(() => {
      result.current.handleSearch('');
    });

    expect(onFilterChange).toHaveBeenCalledWith(mockUsers);
  });

  it('performs case-insensitive search', () => {
    const onFilterChange = vi.fn();
    const { result } = renderHook(() => useUserSearch({ users: mockUsers, onFilterChange }));

    act(() => {
      result.current.handleSearch('jane');
    });

    expect(onFilterChange).toHaveBeenCalledWith([mockUsers[1]]);
  });
});
