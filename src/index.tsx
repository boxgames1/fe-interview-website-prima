import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserDashboard } from './modules/user-dashboard';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <UserDashboard />
  </React.StrictMode>,
);
