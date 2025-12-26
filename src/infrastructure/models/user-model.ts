export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER' | 'GUEST' | 'OWNER' | 'INACTIVE';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  team: string;
  otherDetails: string;
}

