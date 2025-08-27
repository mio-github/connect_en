'use client';

import React from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';

export default function MemberTopPage() {
  // Mock user data for demonstration
  const userData = {
    name: '田中 花子',
    points: 2500,
    nextLesson: {
      name: 'ヒップホップ 中級',
      date: '2025年5月16日（金）',
      time: '19:00 - 20:30',
      instructor: '山田 太郎',
      studio: 'スタジオA'
    },
    notifications: [
      { id: 1, title: '月謝引き落としのお知らせ', date: '2025年5月10日', isNew: true },
      { id: 2, title: '夏季特別レッスンのご案内', date: '2025年5月5日', isNew: true },
      { id: 3, title: 'スタジオ利用規約改定のお知らせ', date: '2025年4月28日', isNew: false }
    ],
    tickets: {
      lesson: 5,
      rental: 2
    }
  };

  const quickLinks = [
    { name: 'レッスン予約', icon: '📅', href: '/user/lessons' },
    { name: 'オンラインレッスン', icon: '🖥️', href: '/user/lessons/online' },
    { name: 'スタジオレンタル', icon: '🏢', href: '/user/rental' },
    { name: 'チケット購入', icon: '🎟️', href: '/user/tickets' },
    { name: 'ポイント確認', icon: '💰', href: '/user/points' },
    { name: 'マイQR', icon: '📱', href: '/user/my-qr' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}さん、こんにちは！</h1>
            <p className="text-gray-600">EnDanceStudioへようこそ</p>
          </div>
          <div className="flex items-center bg-primary-light px-4 py-2 rounded-lg">
            <div className="mr-3">
              <p className="text-sm font-medium text-gray-600">Enポイント</p>
              <p className="text-xl font-bold text-primary">{userData.points.toLocaleString()} pts</p>
            </div>
            <Link href="/user/points" className="text-primary hover:text-primary-dark">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold mb-4">クイックアクセス</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {quickLinks.map((link, index) => (
            <Link href={link.href} key={index} className="block">
              <div className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-gray-50 transition-colors">
                <div className="text-3xl mb-2">{link.icon}</div>
                <p className="text-sm font-medium">{link.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Lesson Card */}
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">次回のレッスン</h2>
              <Link href="/user/reservations" className="text-sm text-primary hover:underline">
                すべての予約を見る
              </Link>
            </div>
            {userData.nextLesson ? (
              <div className="space-y-3">
                <div className="bg-primary-light rounded-md p-4">
                  <h3 className="font-bold">{userData.nextLesson.name}</h3>
                  <p className="text-gray-700">{userData.nextLesson.date}</p>
                  <p className="text-gray-700">{userData.nextLesson.time}</p>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <p>講師: {userData.nextLesson.instructor}</p>
                    <p>場所: {userData.nextLesson.studio}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Link href={`/user/lessons/detail`} className="text-primary hover:underline text-sm">
                    レッスン詳細
                  </Link>
                  <button className="text-red-600 hover:text-red-700 text-sm">
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>予約中のレッスンはありません</p>
                <Link href="/user/lessons" className="block mt-2 text-primary hover:underline">
                  レッスンを予約する
                </Link>
              </div>
            )}
          </div>
        </Card>

        {/* Notification Card */}
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">お知らせ</h2>
              <Link href="/user/notifications" className="text-sm text-primary hover:underline">
                すべてのお知らせを見る
              </Link>
            </div>
            <div className="space-y-4">
              {userData.notifications.map(notification => (
                <div key={notification.id} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium flex items-center">
                      {notification.title}
                      {notification.isNew && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500">{notification.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Tickets & Monthly Payment Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tickets */}
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">チケット残数</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>レッスンチケット</span>
                <span className="font-bold text-lg">{userData.tickets.lesson} 枚</span>
              </div>
              <div className="flex justify-between items-center">
                <span>レンタルチケット</span>
                <span className="font-bold text-lg">{userData.tickets.rental} 枚</span>
              </div>
              <div className="pt-4 text-center">
                <Link href="/user/tickets" className="text-primary hover:underline">
                  チケットを購入する
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Monthly Payment Status */}
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">月謝支払い状況</h2>
            <div className="bg-green-50 p-3 rounded-md mb-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">今月の月謝は支払い済みです</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">次回引き落とし: 2025年6月1日</p>
            </div>
            <div className="text-center">
              <Link href="/user/payments" className="text-primary hover:underline">
                支払い履歴を見る
              </Link>
            </div>
          </div>
        </Card>

        {/* Friend Referral */}
        <Card>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">友達紹介</h2>
            <p className="text-sm text-gray-600 mb-4">
              友達を紹介して、お互いにEnポイントをゲットしよう！
            </p>
            <div className="text-center">
              <Link href="/user/referral">
                <button className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded">
                  友達を招待する
                </button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
