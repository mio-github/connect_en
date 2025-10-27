import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BarChart3,
  Building,
  Calendar,
  ChevronDown,
  CreditCard,
  FileText,
  GraduationCap,
  Home,
  LineChart,
  LogIn,
  Megaphone,
  PieChart,
  QrCode,
  Settings,
  Shield,
  Shuffle,
  Star,
  Store,
  TrendingUp,
  Users,
  UserCheck,
  BookOpen
} from 'lucide-react';
import { PhaseBadge } from '../UI/PhaseBadge';

interface MenuSubItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  phase?: 1 | 2;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  subItems?: MenuSubItem[];
  phase?: 1 | 2;
}

interface SidebarProps {
  activeMenuItem?: string;
  onMenuItemClick?: (itemId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeMenuItem = 'members', onMenuItemClick }) => {
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'ダッシュボード', icon: BarChart3, path: '/', phase: 1 },

    // 核心機能（優先度：最高 - Phase 1）
    { id: 'members', label: '生徒管理', icon: Users, path: '/members', phase: 1 },
    { id: 'attendance', label: '出席管理', icon: UserCheck, path: '/attendance', phase: 1 },
    { id: 'lessons', label: 'レッスン管理', icon: Calendar, path: '/lessons', phase: 1 },
    { id: 'payments', label: '支払い管理', icon: CreditCard, path: '/payments', phase: 1 },
    { id: 'instructors', label: '講師管理', icon: GraduationCap, path: '/instructors', phase: 1 },
    { id: 'qr-reception', label: 'QR受付', icon: QrCode, path: '/qr-reception', phase: 1 },

    // その他機能 (Phase 2)
    { id: 'staff', label: 'スタッフ管理', icon: Shield, path: '/staff', phase: 2 },
    { id: 'member-booking', label: '会員予約', icon: BookOpen, path: '/member-booking', phase: 1 },
    { id: 'member-login', label: '会員ログイン', icon: LogIn, path: '/member-login', phase: 1 },

    // マーケットプレイス機能（優先度：低 - Phase 2）
    {
      id: 'marketplace',
      label: 'マーケットプレイス',
      icon: Store,
      path: '/marketplace',
      phase: 2,
      subItems: [
        { id: 'marketplace-home', label: 'プラットフォーム', icon: Home, path: '/marketplace/home', phase: 2 },
        { id: 'studio-listing', label: 'スタジオ掲載', icon: Building, path: '/marketplace/studio-listing', phase: 2 },
        { id: 'marketplace-bookings', label: '予約管理', icon: Calendar, path: '/marketplace/bookings', phase: 2 },
        { id: 'marketplace-analytics', label: '分析', icon: TrendingUp, path: '/marketplace/analytics', phase: 2 },
        { id: 'promotion-management', label: 'プロモーション', icon: Megaphone, path: '/marketplace/promotions', phase: 2 },
        { id: 'review-management', label: 'レビュー管理', icon: Star, path: '/marketplace/reviews', phase: 2 }
      ]
    },

    { id: 'reports', label: 'レポート', icon: FileText, path: '/reports', phase: 1 },
    {
      id: 'insights',
      label: 'インサイト / 分析',
      icon: TrendingUp,
      path: '/insights',
      phase: 1,
      subItems: [
        { id: 'sales-summary', label: '売上集計', icon: BarChart3, path: '/insights/sales-summary', phase: 1 },
        { id: 'studio-summary', label: 'スタジオ集計', icon: Building, path: '/insights/studio-summary', phase: 1 },
        { id: 'studio-transition', label: 'スタジオ遷移', icon: Shuffle, path: '/insights/studio-transition', phase: 1 },
        { id: 'sales-forecast', label: '売上予測', icon: LineChart, path: '/insights/sales-forecast', phase: 1 },
        { id: 'analytics-overview', label: '分析概要', icon: PieChart, path: '/insights/overview', phase: 2 },
        { id: 'sales-analytics', label: 'セールス分析', icon: Activity, path: '/insights/sales-analytics', phase: 2 },
        { id: 'marketing-management', label: 'マーケティング管理', icon: Megaphone, path: '/insights/marketing', phase: 2 },
        { id: 'lead-management', label: 'リード管理', icon: Users, path: '/insights/leads', phase: 2 }
      ]
    },
    { id: 'settings', label: '設定', icon: Settings, path: '/settings', phase: 1 },
  ];

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <motion.aside
      className="w-64 bg-white shadow-lg border-r border-gray-100 h-full overflow-y-auto"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-teal-600 rounded-xl flex items-center justify-center">
            <Building className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">ConnectEn</h2>
            <p className="text-sm text-gray-500">Dance Studio</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.id}>
            <motion.button
              onClick={() => {
                if (item.subItems) {
                  toggleExpanded(item.id);
                } else {
                  onMenuItemClick?.(item.id);
                }
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all group ${
                activeMenuItem === item.id
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-teal-600'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 ${
                  activeMenuItem === item.id
                    ? 'text-white'
                    : 'text-gray-500 group-hover:text-teal-600'
                }`} />
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.phase && <PhaseBadge phase={item.phase} compact />}
                </span>
              </div>
              {item.subItems && (
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  expandedItems.includes(item.id) ? 'rotate-180' : ''
                }`} />
              )}
            </motion.button>

            {/* Sub Items */}
            {item.subItems && expandedItems.includes(item.id) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="ml-6 mt-2 space-y-1"
              >
                {item.subItems.map((subItem) => (
                  <button
                    key={subItem.id}
                    onClick={() => onMenuItemClick?.(subItem.id)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeMenuItem === subItem.id
                        ? 'bg-teal-50 text-teal-700 border-l-2 border-teal-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-teal-600'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <subItem.icon className="h-4 w-4" />
                      {subItem.label}
                    </span>
                    {subItem.phase && <PhaseBadge phase={subItem.phase} compact />}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-100 bg-white">
        <div className="bg-teal-50 rounded-xl p-4">
          <h3 className="font-semibold text-teal-900 mb-2">システムサポート</h3>
          <p className="text-sm text-teal-700 mb-3">
            ヘルプとドキュメント
          </p>
          <button className="w-full bg-teal-600 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-teal-700 transition-colors">
            ヘルプを見る
          </button>
        </div>
      </div>
    </motion.aside>
  );
};
