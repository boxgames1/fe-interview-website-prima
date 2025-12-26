import { useEffect, useReducer, useCallback } from 'react';
import { userDashboardReducer, type UserDashboardState } from '../stores/user-dashboard-store';
import { fetchUsers, filterUsers } from '../services/user-service';
import { type UserRole } from '../../../infrastructure/models/user-model';

export function useUserDashboard() {
  const [state, dispatch] = useReducer(userDashboardReducer, {
    users: [],
    filteredUsers: [],
    searchQuery: '',
    selectedRole: null,
    isLoading: false,
    error: null,
    selectedUser: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const users = await fetchUsers();
        if (!cancelled) {
          dispatch({ type: 'SET_USERS', payload: users });
          dispatch({ type: 'SET_FILTERED_USERS', payload: users });
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        if (!cancelled) {
          dispatch({ type: 'SET_ERROR', payload: 'Failed to load users' });
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    }

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const filtered = filterUsers(state.users, state.searchQuery, state.selectedRole);
    dispatch({ type: 'SET_FILTERED_USERS', payload: filtered });
  }, [state.users, state.searchQuery, state.selectedRole]);

  const handleSearchChange = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const handleRoleFilter = useCallback((role: UserRole | null) => {
    dispatch({ type: 'SET_SELECTED_ROLE', payload: role });
  }, []);

  const handleUserSelect = useCallback((user: UserDashboardState['selectedUser']) => {
    dispatch({ type: 'SET_SELECTED_USER', payload: user });
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_USER', payload: null });
  }, []);

  return {
    ...state,
    handleSearchChange,
    handleRoleFilter,
    handleUserSelect,
    handleCloseModal,
  };
}

