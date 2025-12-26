import { type UserRole } from '../../../infrastructure/models/user-model';
import { theme } from '../../../infrastructure/theme/theme-config';

export const USER_ROLES: UserRole[] = ['ADMIN', 'EDITOR', 'VIEWER', 'GUEST', 'OWNER', 'INACTIVE'];

export function getRoleColor(role: UserRole): string {
  return theme.colors.roles[role];
}

export function getRoleTextColor(role: UserRole): string {
  if (role === 'OWNER' || role === 'INACTIVE') {
    return theme.colors.roleText[role];
  }
  return '#FFFFFF';
}

