import React, { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { MemberManagement } from './pages/MemberManagement';
import { SchoolManagement } from './pages/SchoolManagement';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { LessonManagement } from './pages/LessonManagement';
import { StaffManagement } from './pages/StaffManagement';
import { ReservationManagement } from './pages/ReservationManagement';
import { PaymentManagement } from './pages/PaymentManagement';
import { Settings } from './pages/Settings';
import './index.css';

type PageType = 'dashboard' | 'members' | 'lessons' | 'staff' | 'reservations' | 'payments' | 'reports' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <MemberManagement />;
      case 'lessons':
        return <LessonManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'reservations':
        return <ReservationManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const handleMenuItemClick = (itemId: string) => {
    setCurrentPage(itemId as PageType);
  };

  return (
    <div className="App">
      <Layout 
        activeMenuItem={currentPage}
        tenantName="En Dance Studio"
        onMenuItemClick={handleMenuItemClick}
      >
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;
