import { useCallback } from 'react';
import { filterUsersByName } from '../services/user-service';
import { type User } from '../../../infrastructure/models/user-model';

interface UseUserSearchProps {
  users: User[];
  onFilterChange: (filteredUsers: User[]) => void;
}

export function useUserSearch({ users, onFilterChange }: UseUserSearchProps) {
  const handleSearch = useCallback(
    (query: string) => {
      const filtered = filterUsersByName(users, query);
      onFilterChange(filtered);
    },
    [users, onFilterChange]
  );

  return {
    handleSearch,
  };
}

