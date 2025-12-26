import { type User } from '../../../../infrastructure/models/user-model';
import { getRoleColor, getRoleTextColor } from '../../constants/user-roles';
import { DASHBOARD_CONSTANTS } from '../../constants/dashboard-constants';
import { Modal } from '../../../../shared/components/modal';
import { Button } from '../../../../shared/components/button';
import './user-detail-modal.css';

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  if (!user) return null;

  const roleColor = getRoleColor(user.role);
  const roleTextColor = getRoleTextColor(user.role);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user.name} aria-labelledby='user-detail-title'>
      <div className='user-detail-content'>
        <div className='user-detail-header'>
          <span
            className='user-detail-role'
            style={{ backgroundColor: roleColor, color: roleTextColor }}
          >
            {user.role}
          </span>
          <h3 id='user-detail-title' className='user-detail-name'>
            {user.name}
          </h3>
          <p className='user-detail-title'>{user.title}</p>
        </div>

        <div className='user-detail-body'>
          <p className='user-detail-info'>
            <span className='user-detail-label'>{DASHBOARD_CONSTANTS.teamLabel}</span> {user.team}
          </p>
          <p className='user-detail-info'>
            <span className='user-detail-label'>{DASHBOARD_CONSTANTS.contactLabel}</span>{' '}
            <a href={`mailto:${user.email}`} className='user-detail-email'>
              {user.email}
            </a>
          </p>
          <div className='user-detail-other'>
            <p className='user-detail-label'>{DASHBOARD_CONSTANTS.otherDetailsLabel}</p>
            <p className='user-detail-text'>{user.otherDetails}</p>
          </div>
        </div>

        <div className='user-detail-footer'>
          <Button onClick={onClose} variant='primary'>
            {DASHBOARD_CONSTANTS.close}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
