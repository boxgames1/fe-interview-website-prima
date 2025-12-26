import './dashboard-header.css';

export function DashboardHeader() {
  return (
    <header className='dashboard-header'>
      <h1 className='dashboard-title'>
        <span className='dashboard-title-user'>User</span>{' '}
        <span className='dashboard-title-dashboard'>Dashboard</span>
      </h1>
    </header>
  );
}
