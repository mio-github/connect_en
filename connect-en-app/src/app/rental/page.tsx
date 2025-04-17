'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

// 仮データ - スタジオ情報
const STUDIO_DATA = [
  { 
    id: 1, 
    name: 'スタジオA', 
    area: 80, 
    capacity: 20, 
    hourlyRate: 3000, 
    equipment: ['鏡', '音響設備', 'バレエバー', '更衣室'],
    description: '明るく広々としたスタジオ。バレエやダンスの練習に最適です。',
    image: '/images/studio-a.jpg',
    status: '利用可能',
    booked: [
      { date: '2023-05-10', timeSlots: ['10:00-12:00', '15:00-17:00'] },
      { date: '2023-05-12', timeSlots: ['13:00-15:00'] },
      { date: '2023-05-15', timeSlots: ['18:00-20:00'] },
    ]
  },
  { 
    id: 2, 
    name: 'スタジオB', 
    area: 60, 
    capacity: 15, 
    hourlyRate: 2500, 
    equipment: ['鏡', '音響設備', '更衣室'],
    description: 'コンパクトで使いやすいスタジオ。少人数での練習に最適です。',
    image: '/images/studio-b.jpg',
    status: '利用可能',
    booked: [
      { date: '2023-05-11', timeSlots: ['09:00-11:00', '14:00-16:00'] },
      { date: '2023-05-13', timeSlots: ['16:00-18:00'] },
      { date: '2023-05-16', timeSlots: ['19:00-21:00'] },
    ]
  },
  { 
    id: 3, 
    name: 'スタジオC', 
    area: 100, 
    capacity: 30, 
    hourlyRate: 4000, 
    equipment: ['鏡', '音響設備', 'バレエバー', '更衣室', 'シャワールーム'],
    description: '最大規模のスタジオ。発表会の練習やワークショップに最適です。',
    image: '/images/studio-c.jpg',
    status: 'メンテナンス中',
    booked: []
  },
  { 
    id: 4, 
    name: 'プライベートスタジオ', 
    area: 40, 
    capacity: 5, 
    hourlyRate: 2000, 
    equipment: ['鏡', '音響設備', 'ヨガマット'],
    description: 'プライベートレッスンや個人練習に最適な小規模スタジオです。',
    image: '/images/studio-private.jpg',
    status: '利用可能',
    booked: [
      { date: '2023-05-10', timeSlots: ['12:00-14:00'] },
      { date: '2023-05-14', timeSlots: ['10:00-12:00', '17:00-19:00'] },
    ]
  },
];

// 予約情報
const BOOKING_DATA = [
  { id: 1, studioId: 1, studio: 'スタジオA', member: '田中 花子', date: '2023-05-10', timeSlot: '10:00-12:00', purpose: 'バレエ練習', attendees: 8, status: '確定' },
  { id: 2, studioId: 2, studio: 'スタジオB', member: '佐藤 健太', date: '2023-05-11', timeSlot: '14:00-16:00', purpose: 'ダンス練習', attendees: 6, status: '確定' },
  { id: 3, studioId: 1, studio: 'スタジオA', member: '鈴木 美咲', date: '2023-05-12', timeSlot: '13:00-15:00', purpose: 'ワークショップ', attendees: 15, status: '仮予約' },
  { id: 4, studioId: 4, studio: 'プライベートスタジオ', member: '山田 太郎', date: '2023-05-14', timeSlot: '10:00-12:00', purpose: 'プライベートレッスン', attendees: 2, status: '確定' },
  { id: 5, studioId: 1, studio: 'スタジオA', member: '伊藤 大輔', date: '2023-05-15', timeSlot: '18:00-20:00', purpose: 'コンテンポラリー練習', attendees: 10, status: '確定' },
  { id: 6, studioId: 2, studio: 'スタジオB', member: '小林 涼子', date: '2023-05-16', timeSlot: '19:00-21:00', purpose: 'ヒップホップ練習', attendees: 8, status: '仮予約' },
];

// 時間帯リスト
const TIME_SLOTS = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00',
  '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00',
  '19:00-20:00', '20:00-21:00', '21:00-22:00'
];

// 予約状態オプション
const BOOKING_STATUS = [
  { label: 'すべて', value: 'all' },
  { label: '確定', value: 'confirmed' },
  { label: '仮予約', value: 'pending' },
  { label: 'キャンセル', value: 'cancelled' },
];

export default function RentalPage() {
  const [activeTab, setActiveTab] = useState<'studios' | 'bookings' | 'calendar'>('studios');
  const [selectedStudio, setSelectedStudio] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  // スタジオ詳細を表示
  const handleStudioSelect = (studioId: number) => {
    setSelectedStudio(studioId);
  };

  // スタジオ詳細から戻る
  const handleBackToList = () => {
    setSelectedStudio(null);
  };

  // 選択したスタジオの情報を取得
  const selectedStudioData = selectedStudio !== null
    ? STUDIO_DATA.find(studio => studio.id === selectedStudio)
    : null;

  // 検索とフィルタリングの適用 - 予約
  const filteredBookings = BOOKING_DATA
    .filter(booking => {
      // ステータスフィルター
      if (bookingStatus !== 'all') {
        const statusMap: { [key: string]: string } = {
          'confirmed': '確定',
          'pending': '仮予約',
          'cancelled': 'キャンセル'
        };
        if (booking.status !== statusMap[bookingStatus]) return false;
      }

      // 日付フィルター
      if (selectedDate && booking.date !== selectedDate) return false;

      // 検索クエリ
      if (searchTerm) {
        return (
          booking.member.includes(searchTerm) ||
          booking.studio.includes(searchTerm) ||
          booking.purpose.includes(searchTerm)
        );
      }

      return true;
    });

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">貸しスタジオ</h1>
          <p className="text-gray-600">スタジオのレンタル予約・管理ができます。</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="primary">新規予約</Button>
          <Button variant="outline">設定</Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={`py-4 px-1 font-medium text-sm focus:outline-none ${
              activeTab === 'studios'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('studios')}
          >
            スタジオ一覧
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm focus:outline-none ${
              activeTab === 'bookings'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            予約管理
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm focus:outline-none ${
              activeTab === 'calendar'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            予約カレンダー
          </button>
        </div>
      </div>

      {/* スタジオ一覧表示 */}
      {activeTab === 'studios' && !selectedStudio && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIO_DATA.map(studio => (
            <Card key={studio.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-gray-200">
                {/* スタジオ画像があればここに表示 */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  スタジオ画像
                </div>
                <div 
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                    studio.status === '利用可能' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {studio.status}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{studio.name}</h3>
                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>広さ: {studio.area}㎡</p>
                  <p>定員: 最大{studio.capacity}名</p>
                  <p>料金: ¥{studio.hourlyRate.toLocaleString()}/時間</p>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{studio.description}</p>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleStudioSelect(studio.id)}
                >
                  詳細を見る
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* スタジオ詳細表示 */}
      {activeTab === 'studios' && selectedStudio && selectedStudioData && (
        <div>
          <button 
            className="flex items-center text-sm text-blue-600 mb-4"
            onClick={handleBackToList}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            一覧に戻る
          </button>
          
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                スタジオ画像
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold mb-4">{selectedStudioData.name}</h2>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedStudioData.status === '利用可能' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedStudioData.status}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">基本情報</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">広さ</p>
                        <p className="font-medium">{selectedStudioData.area}㎡</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">定員</p>
                        <p className="font-medium">最大{selectedStudioData.capacity}名</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">料金</p>
                        <p className="font-medium">¥{selectedStudioData.hourlyRate.toLocaleString()}/時間</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">設備</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedStudioData.equipment.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-md text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">説明</h3>
                    <p className="mt-1 text-sm text-gray-600">{selectedStudioData.description}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <Button variant="primary">予約する</Button>
                  <Button variant="outline">空き状況確認</Button>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">直近の予約状況</h3>
              {selectedStudioData.booked.length > 0 ? (
                <div className="space-y-4">
                  {selectedStudioData.booked.map((booking, index) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <div className="w-24 text-sm font-medium">{booking.date}</div>
                      <div className="flex-1 flex flex-wrap gap-2">
                        {booking.timeSlots.map((slot, slotIndex) => (
                          <span key={slotIndex} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">現在予約はありません</p>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* 予約管理 */}
      {activeTab === 'bookings' && (
        <div>
          {/* フィルターセクション */}
          <Card className="mb-6">
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                <input
                  type="date"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">予約状態</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                >
                  {BOOKING_STATUS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">検索</label>
                <Input
                  type="text"
                  placeholder="会員名、目的など"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* 予約リスト */}
          <Card title="予約一覧" className="mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">日付</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">時間</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">スタジオ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">利用者</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">利用目的</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">人数</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ステータス</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">アクション</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-400">該当する予約データがありません</td>
                    </tr>
                  ) : (
                    filteredBookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{booking.date}</td>
                        <td className="px-4 py-3 text-sm">{booking.timeSlot}</td>
                        <td className="px-4 py-3 text-sm">{booking.studio}</td>
                        <td className="px-4 py-3 text-sm">{booking.member}</td>
                        <td className="px-4 py-3 text-sm">{booking.purpose}</td>
                        <td className="px-4 py-3 text-sm">{booking.attendees}名</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === '確定' ? 'bg-green-100 text-green-800' : 
                            booking.status === '仮予約' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-sm flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => alert('詳細')}>詳細</Button>
                          <Button size="sm" className="btn-secondary" onClick={() => alert('編集')}>編集</Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* 予約カレンダー */}
      {activeTab === 'calendar' && (
        <div>
          <Card className="mb-6">
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">スタジオ予約カレンダー</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">今日</Button>
                <Button size="sm" variant="outline">前の週</Button>
                <Button size="sm" variant="outline">次の週</Button>
              </div>
            </div>
            
            <div className="p-2">
              <div className="border rounded overflow-hidden">
                {/* 曜日ヘッダー */}
                <div className="grid grid-cols-8 border-b">
                  <div className="p-2 border-r"></div>
                  {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => (
                    <div key={index} className="p-2 font-medium text-center text-sm border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* スタジオごとの行 */}
                {STUDIO_DATA.map(studio => (
                  <div key={studio.id} className="grid grid-cols-8 border-b last:border-b-0">
                    <div className="p-2 font-medium text-sm border-r bg-gray-50">
                      {studio.name}
                    </div>
                    {/* 曜日ごとのセル */}
                    {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
                      <div key={dayIndex} className="p-1 border-r last:border-r-0 text-center text-xs">
                        <div className="h-12 flex flex-col justify-center items-center">
                          {dayIndex === 0 && (
                            <div className="p-1 bg-blue-100 text-blue-800 rounded w-full">
                              予約あり
                            </div>
                          )}
                          {dayIndex === 3 && (
                            <div className="p-1 bg-green-100 text-green-800 rounded w-full">
                              空き
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          <p className="text-sm text-gray-500 text-center">
            ※ このカレンダーは概要表示です。詳細な空き状況は各スタジオページでご確認ください。
          </p>
        </div>
      )}
    </Layout>
  );
} 