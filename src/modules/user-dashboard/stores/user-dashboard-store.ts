import { type User, type UserRole } from '../../../infrastructure/models/user-model';

interface UserDashboardState {
  users: User[];
  filteredUsers: User[];
  searchQuery: string;
  selectedRole: UserRole | null;
  isLoading: boolean;
  error: string | null;
  selectedUser: User | null;
}

type UserDashboardAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_ROLE'; payload: UserRole | null }
  | { type: 'SET_FILTERED_USERS'; payload: User[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_USER'; payload: User | null }
  | { type: 'RESET' };

const initialState: UserDashboardState = {
  users: [],
  filteredUsers: [],
  searchQuery: '',
  selectedRole: null,
  isLoading: false,
  error: null,
  selectedUser: null,
};

export function userDashboardReducer(
  state: UserDashboardState,
  action: UserDashboardAction,
): UserDashboardState {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_ROLE':
      return { ...state, selectedRole: action.payload };
    case 'SET_FILTERED_USERS':
      return { ...state, filteredUsers: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export type { UserDashboardState, UserDashboardAction };
