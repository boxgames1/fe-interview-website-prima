import { type User } from '../../../../infrastructure/models/user-model';
import { getRoleColor, getRoleTextColor } from '../../constants/user-roles';
import { DASHBOARD_CONSTANTS } from '../../constants/dashboard-constants';
import { Button } from '../../../../shared/components/button';
import './user-card.css';

interface UserCardProps {
  user: User;
  onViewDetails: (user: User) => void;
}

export function UserCard({ user, onViewDetails }: UserCardProps) {
  const roleColor = getRoleColor(user.role);
  const roleTextColor = getRoleTextColor(user.role);

  return (
    <article className="user-card" aria-label={`User card for ${user.name}`}>
      <div className="user-card-header">
        <span
          className="user-card-role"
          style={{ backgroundColor: roleColor, color: roleTextColor }}
        >
          {user.role}
        </span>
      </div>
      <div className="user-card-body">
        <h3 className="user-card-name">{user.name}</h3>
        <p className="user-card-title">{user.title}</p>
        <p className="user-card-team">
          {DASHBOARD_CONSTANTS.teamLabel} {user.team}
        </p>
        <p className="user-card-contact">
          {DASHBOARD_CONSTANTS.contactLabel}{' '}
          <a href={`mailto:${user.email}`} className="user-card-email">
            {user.email}
          </a>
        </p>
      </div>
      <div className="user-card-footer">
        <Button onClick={() => onViewDetails(user)} variant="primary">
          {DASHBOARD_CONSTANTS.viewDetails}
        </Button>
      </div>
    </article>
  );
}

