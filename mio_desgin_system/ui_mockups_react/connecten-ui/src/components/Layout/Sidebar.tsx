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
  { id: 'reports', icon: 'fas fa-chart-bar', label: 'レポート' },
  { id: 'settings', icon: 'fas fa-cog', label: '設定' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeMenuItem = 'members', onMenuItemClick }) => {
  return (
    <motion.aside 
      className="w-64 bg-white shadow-md border-r border-gray-200 h-full overflow-y-auto"
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
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className={`${item.icon} w-5 text-center`} />
                <span className="font-medium flex-1">{item.label}</span>
                {item.badge && (
                  <motion.span 
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center"
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