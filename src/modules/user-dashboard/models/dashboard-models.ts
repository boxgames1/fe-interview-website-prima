import { type User } from '../../../infrastructure/models/user-model';

export interface DashboardFilters {
  searchQuery: string;
  selectedRole: string | null;
}

export interface DashboardState {
  users: User[];
  filteredUsers: User[];
  isLoading: boolean;
  error: string | null;
}
