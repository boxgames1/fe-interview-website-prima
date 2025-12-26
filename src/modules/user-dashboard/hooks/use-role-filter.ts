import { useCallback } from 'react';
import { type UserRole } from '../../../infrastructure/models/user-model';
import { filterUsersByRole } from '../services/user-service';
import { type User } from '../../../infrastructure/models/user-model';

interface UseRoleFilterProps {
  users: User[];
  onFilterChange: (filteredUsers: User[]) => void;
}

export function useRoleFilter({ users, onFilterChange }: UseRoleFilterProps) {
  const handleRoleFilter = useCallback(
    (role: UserRole | null) => {
      const filtered = filterUsersByRole(users, role);
      onFilterChange(filtered);
    },
    [users, onFilterChange],
  );

  return {
    handleRoleFilter,
  };
}
