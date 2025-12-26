import { type User, type UserRole } from '../../../infrastructure/models/user-model';
import { matchesSearch } from '../../../shared/utils/string-utils';

export async function fetchUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { MOCK_USERS } = await import('../data/mock-users');
  return MOCK_USERS;
}

export function filterUsersByName(users: User[], query: string): User[] {
  if (!query.trim()) {
    return users;
  }
  return users.filter((user) => matchesSearch(query, user.name));
}

export function filterUsersByRole(users: User[], role: UserRole | null): User[] {
  if (!role) {
    return users;
  }
  return users.filter((user) => user.role === role);
}

export function filterUsers(users: User[], nameQuery: string, role: UserRole | null): User[] {
  let filtered = users;
  filtered = filterUsersByName(filtered, nameQuery);
  filtered = filterUsersByRole(filtered, role);
  return filtered;
}

