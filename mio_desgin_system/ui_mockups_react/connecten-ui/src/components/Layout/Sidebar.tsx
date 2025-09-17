import React from 'react';
import { motion } from 'framer-motion';

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
  badge?: number;
}

interface SidebarProps {
  activeMenuItem?: string;
  onMenuItemClick?: (itemId: string) => void;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'ダッシュボード' },
  { id: 'members', icon: 'fas fa-users', label: '会員管理', active: true },
  { id: 'lessons', icon: 'fas fa-calendar', label: 'レッスン管理' },
  { id: 'staff', icon: 'fas fa-user-tie', label: 'スタッフ管理' },
  { id: 'reservations', icon: 'fas fa-book-open', label: '予約管理', badge: 3 },
  { id: 'payments', icon: 'fas fa-credit-card', label: '支払い管理' },

  // マーケットプレイス【ホットペッパー型】セクション
  { id: 'marketplace', icon: 'fas fa-store', label: 'マーケットプレイス【HP型】', badge: 12 },
  { id: 'marketplace-listing', icon: 'fas fa-edit', label: 'スタジオページ管理' },
  { id: 'marketplace-promotions', icon: 'fas fa-tags', label: 'プロモーション管理' },
  { id: 'marketplace-bookings', icon: 'fas fa-calendar-check', label: 'マーケット予約管理', badge: 5 },
  { id: 'marketplace-analytics', icon: 'fas fa-chart-line', label: 'マーケット分析' },
  { id: 'marketplace-reviews', icon: 'fas fa-star', label: 'レビュー管理' },

  { id: 'reports', icon: 'fas fa-chart-bar', label: 'レポート' },
  { id: 'settings', icon: 'fas fa-cog', label: '設定' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeMenuItem = 'members', onMenuItemClick }) => {
  return (
    <motion.aside 
      className="w-64 bg-gradient-to-b from-sage-50 to-lavender-50 shadow-md border-r border-neutral-200 h-full overflow-y-auto backdrop-blur-sm"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <motion.li 
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <motion.button
                onClick={() => onMenuItemClick?.(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeMenuItem === item.id || item.active
                    ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 border-l-4 border-primary-400 shadow-sm'
                    : 'text-neutral-600 hover:bg-gradient-to-r hover:from-lavender-50 hover:to-rose-50 hover:text-neutral-800'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className={`${item.icon} w-5 text-center`} />
                <span className="font-medium flex-1">{item.label}</span>
                {item.badge && (
                  <motion.span 
                    className="bg-rose-400 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center shadow-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};