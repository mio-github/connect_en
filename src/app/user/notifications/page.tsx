'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', 'system', 'lessons'
  
  // Mock notification data
  const allNotifications = [
    {
      id: 1,
      type: 'system',
      title: '月謝引き落としのお知らせ',
      content: '2025年5月分の月謝（8,000円）が正常に引き落とされました。',
      date: '2025-05-10',
      isRead: false,
    },
    {
      id: 2,
      type: 'event',
      title: '夏季特別レッスンのご案内',
      content: '2025年7月に夏季特別レッスンを開催します。ゲスト講師をお招きした特別なレッスンをお見逃しなく！',
      date: '2025-05-05',
      isRead: false,
    },
    {
      id: 3,
      type: 'system',
      title: 'スタジオ利用規約改定のお知らせ',
      content: '2025年6月1日より、スタジオ利用規約を改定いたします。主な変更点は...',
      date: '2025-04-28',
      isRead: true,
    },
    {
      id: 4,
      type: 'lesson',
      title: 'レッスン中止のお知らせ',
      content: '5月20日（火）19:00〜のヒップホップ中級クラスは、講師の都合により中止となりました。',
      date: '2025-04-25',
      isRead: true,
    },
    {
      id: 5,
      type: 'lesson',
      title: 'レッスン予約完了',
      content: 'ジャズダンス中級クラス（5月18日 14:00〜）の予約が完了しました。',
      date: '2025-04-20',
      isRead: true,
    },
    {
      id: 6,
      type: 'system',
      title: 'ポイント付与のお知らせ',
      content: 'レッスン参加特典として、150ポイントが付与されました。',
      date: '2025-04-15',
      isRead: true,
    },
  ];
  
  // Filter notifications based on active tab
  const filteredNotifications = allNotifications.filter(notification => {
    if (activeTab === 'unread') {
      return !notification.isRead;
    } else if (activeTab === 'system') {
      return notification.type === 'system';
    } else if (activeTab === 'lessons') {
      return notification.type === 'lesson';
    } else {
      return true; // 'all' tab shows all notifications
    }
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}年${month}月${day}日`;
  };
  
  // Mark notification as read (mock function)
  const markAsRead = (id: number) => {
    // In a real app, this would make an API call to mark the notification as read
    console.log(`Marking notification ${id} as read`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">お知らせ</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'all'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'unread'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            未読
            {allNotifications.filter(n => !n.isRead).length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs">
                {allNotifications.filter(n => !n.isRead).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'system'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            システム通知
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'lessons'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            レッスン関連
          </button>
        </nav>
      </div>

      {/* Notifications list */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map(notification => (
            <Link href={`/user/notifications/${notification.id}`} key={notification.id} onClick={() => markAsRead(notification.id)}>
              <Card>
                <div className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <div className={`flex-1 ${!notification.isRead ? 'font-medium' : ''}`}>
                      <div className="flex items-center">
                        {!notification.isRead && (
                          <span className="h-2 w-2 bg-primary rounded-full mr-2"></span>
                        )}
                        <h3 className="text-lg">{notification.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                        {notification.content}
                      </p>
                    </div>
                    
                    <div className="mt-2 sm:mt-0 sm:ml-6 flex flex-col items-start sm:items-end justify-between">
                      <div>
                        <span className="text-sm text-gray-500">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                          notification.type === 'system' 
                            ? 'bg-blue-100 text-blue-800'
                            : notification.type === 'lesson'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {notification.type === 'system' 
                            ? 'システム' 
                            : notification.type === 'lesson'
                            ? 'レッスン'
                            : 'イベント'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">通知はありません</p>
        </div>
      )}
    </div>
  );
}
