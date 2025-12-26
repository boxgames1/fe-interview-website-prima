import { type UserRole } from '../../../../infrastructure/models/user-model';
import { USER_ROLES, getRoleColor, getRoleTextColor } from '../../constants/user-roles';
import { DASHBOARD_CONSTANTS } from '../../constants/dashboard-constants';
import './role-filter.css';

interface RoleFilterProps {
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole | null) => void;
}

export function RoleFilter({ selectedRole, onRoleSelect }: RoleFilterProps) {
  const handleRoleClick = (role: UserRole) => {
    if (selectedRole === role) {
      onRoleSelect(null);
    } else {
      onRoleSelect(role);
    }
  };

  return (
    <div className="role-filter-container">
      <span className="role-filter-label">{DASHBOARD_CONSTANTS.filterLabel}</span>
      <div className="role-filter-buttons" role="group" aria-label="Filter users by role">
        {USER_ROLES.map((role) => {
          const isActive = selectedRole === role;
          const backgroundColor = isActive ? getRoleColor(role) : '#FFFFFF';
          const textColor = isActive ? getRoleTextColor(role) : '#222222';
          const borderColor = isActive ? getRoleColor(role) : '#E5E5E5';

          return (
            <button
              key={role}
              type="button"
              className="role-filter-button"
              onClick={() => handleRoleClick(role)}
              aria-pressed={isActive}
              aria-label={`Filter by ${role} role`}
              style={{
                backgroundColor,
                color: textColor,
                borderColor,
              }}
            >
              {role}
            </button>
          );
        })}
      </div>
    </div>
  );
}

