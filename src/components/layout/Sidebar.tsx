import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
}

const mainMenuItems: SidebarItem[] = [
  { name: 'ダッシュボード', path: '/dashboard' },
  { 
    name: '会員管理', 
    path: '/members',
    children: [
      { name: '会員検索/一覧', path: '/members' },
      { name: '会員詳細/編集', path: '/members/detail' },
      { name: '会員カード発行', path: '/members/card' },
      { name: '出席履歴', path: '/members/attendance' },
    ]
  },
  { 
    name: 'スケジュール管理', 
    path: '/schedule',
    children: [
      { name: 'レッスン一覧', path: '/schedule/lessons' },
      { name: 'スタジオ予約', path: '/schedule/studio' },
      { name: 'インストラクター', path: '/schedule/instructors' },
      { name: '代行情報', path: '/schedule/substitutes' },
    ]
  },
  { 
    name: '決済・会計', 
    path: '/payments',
    children: [
      { name: '会費請求管理', path: '/payments/billing' },
      { name: 'POS操作', path: '/payments/pos' },
      { name: '金種表', path: '/payments/cash' },
      { name: '売上集計', path: '/payments/sales' },
    ]
  },
  { 
    name: 'マーケティング', 
    path: '/marketing',
    children: [
      { name: 'メール配信', path: '/marketing/email' },
      { name: 'お知らせ管理', path: '/marketing/announcements' },
      { name: 'キャンペーン管理', path: '/marketing/campaigns' },
      { name: 'SNS連携', path: '/marketing/social' },
    ]
  },
  { 
    name: 'レポート・分析', 
    path: '/reports',
    children: [
      { name: '売上分析', path: '/reports/sales' },
      { name: 'スタジオ稼働分析', path: '/reports/studio' },
      { name: '会員動向分析', path: '/reports/members' },
      { name: '売上予測', path: '/reports/forecast' },
    ]
  },
  { 
    name: '物品・在庫管理', 
    path: '/inventory',
    children: [
      { name: '物品管理', path: '/inventory/items' },
      { name: '発注管理', path: '/inventory/orders' },
      { name: '在庫確認', path: '/inventory/stock' },
    ]
  },
  { 
    name: 'システム設定', 
    path: '/settings',
    children: [
      { name: 'ユーザー権限管理', path: '/settings/users' },
      { name: 'マスタ設定', path: '/settings/master' },
      { name: '連携サービス設定', path: '/settings/integrations' },
    ]
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  
  const toggleExpand = (path: string) => {
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(item => item !== path) 
        : [...prev, path]
    );
  };
  
  return (
    <aside className="bg-white w-64 h-screen shadow-md fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-primary">ConnectEn</h1>
      </div>
      
      <nav className="p-2">
        <ul>
          {mainMenuItems.map((item) => {
            const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
            const isExpanded = expandedItems.includes(item.path);
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <li key={item.path} className="mb-1">
                <div className="flex items-center">
                  <Link 
                    href={item.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex-grow ${
                      isActive ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                  
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(item.path)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      {isExpanded ? '▼' : '▶'}
                    </button>
                  )}
                </div>
                
                {hasChildren && isExpanded && (
                  <ul className="pl-4 mt-1">
                    {item.children?.map((child) => {
                      const isChildActive = pathname === child.path;
                      
                      return (
                        <li key={child.path} className="mb-1">
                          <Link 
                            href={child.path}
                            className={`px-4 py-2 rounded-md text-sm font-medium block ${
                              isChildActive ? 'bg-primary-light text-primary' : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {child.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
} 