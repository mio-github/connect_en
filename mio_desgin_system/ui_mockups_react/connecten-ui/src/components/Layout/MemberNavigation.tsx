import React from 'react';
import { 
  Calendar, 
  User, 
  CreditCard, 
  Clock, 
  Gift,
  QrCode,
  Bell,
  Settings,
  MapPin,
  Users
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  labelEn: string;
  icon: React.ComponentType<any>;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'lesson-booking', label: 'レッスン予約', labelEn: 'Book Lesson', icon: Calendar },
  { id: 'my-reservations', label: '予約確認', labelEn: 'My Reservations', icon: Clock },
  { id: 'mypage', label: 'マイページ', labelEn: 'My Page', icon: User },
  { id: 'points', label: 'Enポイント', labelEn: 'En Points', icon: Gift, badge: '1,250pt' },
  { id: 'payment-history', label: '支払い履歴', labelEn: 'Payment History', icon: CreditCard },
  { id: 'my-qr', label: 'マイQR', labelEn: 'My QR', icon: QrCode },
  { id: 'notifications', label: '通知', labelEn: 'Notifications', icon: Bell, badge: '3' },
  { id: 'studio-info', label: 'スタジオ案内', labelEn: 'Studio Info', icon: MapPin },
  { id: 'friend-referral', label: '友達紹介', labelEn: 'Refer Friends', icon: Users },
];

interface MemberNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const MemberNavigation: React.FC<MemberNavigationProps> = ({
  currentPage,
  onPageChange
}) => {
  return (
    <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-purple-100 text-purple-700 border-l-4 border-purple-500' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-purple-600'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.labelEn}</div>
                  </div>
                </div>
                
                {item.badge && (
                  <span className={`
                    px-2 py-1 text-xs rounded-full
                    ${isActive 
                      ? 'bg-purple-200 text-purple-800' 
                      : 'bg-pink-100 text-pink-700'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* クイックアクション */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            クイックアクション / Quick Actions
          </h3>
          <div className="space-y-2">
            <button 
              onClick={() => onPageChange('emergency-lesson')}
              className="w-full px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              今すぐ予約 / Book Now
            </button>
            <button 
              onClick={() => onPageChange('studio-status')}
              className="w-full px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              スタジオ空き状況 / Studio Availability
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};