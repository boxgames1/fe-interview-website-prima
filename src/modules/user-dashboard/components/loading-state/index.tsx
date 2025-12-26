import { DASHBOARD_CONSTANTS } from '../../constants/dashboard-constants';
import './loading-state.css';

export function LoadingState() {
  return (
    <div className='loading-state' role='status' aria-live='polite'>
      <div className='loading-spinner' aria-hidden='true'></div>
      <p className='loading-message'>{DASHBOARD_CONSTANTS.loadingMessage}</p>
    </div>
  );
}
