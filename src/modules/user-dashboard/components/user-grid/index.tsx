import { type User } from '../../../../infrastructure/models/user-model';
import { UserCard } from '../user-card';
import { EmptyState } from '../empty-state';
import './user-grid.css';

interface UserGridProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

export function UserGrid({ users, onUserSelect }: UserGridProps) {
  if (users.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className='user-grid' role='list' aria-label='User list'>
      {users.map((user) => (
        <div key={user.id} role='listitem'>
          <UserCard user={user} onViewDetails={onUserSelect} />
        </div>
      ))}
    </div>
  );
}
