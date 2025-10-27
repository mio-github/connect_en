import React, { useState } from 'react';
import { Layout } from './components/Layout/Layout';
import { MemberLayout } from './components/Layout/MemberLayout';
import { Dashboard } from './pages/Dashboard';
import { MemberManagement } from './pages/MemberManagement';
import { SchoolManagement } from './pages/SchoolManagement';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { LessonManagement } from './pages/LessonManagement';
import { StaffManagement } from './pages/StaffManagement';
import { ReservationManagement } from './pages/ReservationManagement';
import { PaymentManagement } from './pages/PaymentManagement';
import { Settings } from './pages/Settings';
import { MemberLogin } from './pages/MemberLogin';
import { MemberLessonBooking } from './pages/MemberLessonBooking';
import { MemberMyPage } from './pages/MemberMyPage';
import { MemberPoints } from './pages/MemberPoints';
import { MemberQR } from './pages/MemberQR';
import { SalesSummary } from './pages/SalesSummary';
import { StudioSummary } from './pages/StudioSummary';
import { StudioTransition } from './pages/StudioTransition';
import { SalesForecast } from './pages/SalesForecast';
import { AnalyticsOverview } from './pages/AnalyticsOverview';
import { SalesAnalytics } from './pages/SalesAnalytics';
import { MarketingManagement } from './pages/MarketingManagement';
import { LeadManagement } from './pages/LeadManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import InstructorManagement from './pages/InstructorManagement';
import './index.css';

type AdminPageType =
  | 'dashboard'
  | 'members'
  | 'attendance'
  | 'instructors'
  | 'lessons'
  | 'staff'
  | 'reservations'
  | 'payments'
  | 'reports'
  | 'settings'
  | 'sales-summary'
  | 'studio-summary'
  | 'studio-transition'
  | 'sales-forecast'
  | 'analytics-overview'
  | 'sales-analytics'
  | 'marketing-management'
  | 'lead-management';
type MemberPageType = 'lesson-booking' | 'my-reservations' | 'mypage' | 'points' | 'my-qr' | 'notifications';
type AppMode = 'admin' | 'member';

function App() {
  const [appMode, setAppMode] = useState<AppMode>('admin');
  const [currentAdminPage, setCurrentAdminPage] = useState<AdminPageType>('dashboard');
  const [currentMemberPage, setCurrentMemberPage] = useState<MemberPageType>('lesson-booking');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const renderAdminPage = () => {
    switch (currentAdminPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'members':
        return <MemberManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'instructors':
        return <InstructorManagement />;
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
      case 'sales-summary':
        return <SalesSummary />;
      case 'studio-summary':
        return <StudioSummary />;
      case 'studio-transition':
        return <StudioTransition />;
      case 'sales-forecast':
        return <SalesForecast />;
      case 'analytics-overview':
        return <AnalyticsOverview />;
      case 'sales-analytics':
        return <SalesAnalytics />;
      case 'marketing-management':
        return <MarketingManagement />;
      case 'lead-management':
        return <LeadManagement />;
      default:
        return <Dashboard />;
    }
  };

  const renderMemberPage = () => {
    switch (currentMemberPage) {
      case 'lesson-booking':
        return <MemberLessonBooking />;
      case 'mypage':
        return <MemberMyPage />;
      case 'points':
        return <MemberPoints />;
      case 'my-qr':
        return <MemberQR />;
      default:
        return <MemberLessonBooking />;
    }
  };

  const handleAdminMenuClick = (itemId: string) => {
    setCurrentAdminPage(itemId as AdminPageType);
  };

  const handleMemberPageChange = (page: string) => {
    if (page === 'admin') {
      setAppMode('admin');
      return;
    }
    setCurrentMemberPage(page as MemberPageType);
  };

  // 会員側でログインしていない場合
  if (appMode === 'member' && !isLoggedIn) {
    return <MemberLogin />;
  }

  return (
    <div className="App">
      {/* モード切り替えボタン */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        <button
          onClick={() => setAppMode('admin')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            appMode === 'admin' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          管理画面
        </button>
        <button
          onClick={() => setAppMode('member')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            appMode === 'member' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          会員画面
        </button>
      </div>

      {appMode === 'admin' ? (
        <Layout 
          activeMenuItem={currentAdminPage}
          tenantName="En Dance Studio"
          onMenuItemClick={handleAdminMenuClick}
        >
          {renderAdminPage()}
        </Layout>
      ) : (
        <MemberLayout
          currentPage={currentMemberPage}
          onPageChange={handleMemberPageChange}
          memberName="田中 花子"
        >
          {renderMemberPage()}
        </MemberLayout>
      )}
    </div>
  );
}

export default App;
