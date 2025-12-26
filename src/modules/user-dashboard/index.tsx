import { useUserDashboard } from "./hooks/use-user-dashboard";
import { DashboardHeader } from "./components/dashboard-header";
import { SearchInput } from "./components/search-input";
import { RoleFilter } from "./components/role-filter";
import { UserGrid } from "./components/user-grid";
import { UserDetailModal } from "./components/user-detail-modal";
import { LoadingState } from "./components/loading-state";
import { ErrorState } from "./components/error-state";
import "./dashboard.css";

export function UserDashboard() {
  const {
    filteredUsers,
    searchQuery,
    selectedRole,
    isLoading,
    error,
    selectedUser,
    handleSearchChange,
    handleRoleFilter,
    handleUserSelect,
    handleCloseModal,
  } = useUserDashboard();

  const handleSearch = () => {
    handleSearchChange(searchQuery);
  };

  if (error) {
    return (
      <div className="dashboard-container">
        <DashboardHeader />
        <ErrorState />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        onSearch={handleSearch}
      />
      <RoleFilter selectedRole={selectedRole} onRoleSelect={handleRoleFilter} />
      <div className="dashboard-divider" aria-hidden="true"></div>
      {isLoading ? (
        <LoadingState />
      ) : (
        <UserGrid users={filteredUsers} onUserSelect={handleUserSelect} />
      )}
      <UserDetailModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
      />
    </div>
  );
}
