import { DASHBOARD_CONSTANTS } from '../../constants/dashboard-constants';
import './error-state.css';

export function ErrorState() {
  return (
    <div className='error-state' role='alert' aria-live='assertive'>
      <p className='error-message'>{DASHBOARD_CONSTANTS.errorMessage}</p>
    </div>
  );
}
