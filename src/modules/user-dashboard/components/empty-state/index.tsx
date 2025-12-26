import { DASHBOARD_CONSTANTS } from '../../constants/dashboard-constants';
import './empty-state.css';

export function EmptyState() {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <p className="empty-message">{DASHBOARD_CONSTANTS.emptyStateMessage}</p>
    </div>
  );
}

