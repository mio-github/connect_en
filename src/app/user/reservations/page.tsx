'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function ReservationsPage() {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming', 'past', 'canceled'
  
  // Mock reservation data
  const reservations = {
    upcoming: [
      {
        id: 101,
        reservationNumber: 'EN123456',
        lessonName: 'ヒップホップ入門',
        instructor: '山田 太郎',
        studio: 'スタジオA',
        date: '2025-05-16',
        startTime: '19:00',
        endTime: '20:30',
        price: 1500,
        paymentStatus: '支払い済み',
        paymentMethod: 'Enポイント',
      },
      {
        id: 102,
        reservationNumber: 'EN789012',
        lessonName: 'ジャズダンス中級',
        instructor: '佐藤 花子',
        studio: 'スタジオB',
        date: '2025-05-18',
        startTime: '14:00',
        endTime: '15:30',
        price: 1800,
        paymentStatus: '支払い済み',
        paymentMethod: 'レッスンチケット',
      },
    ],
    past: [
      {
        id: 201,
        reservationNumber: 'EN654321',
        lessonName: 'バレエ基礎',
        instructor: '鈴木 美咲',
        studio: 'スタジオC',
        date: '2025-05-10',
        startTime: '10:00',
        endTime: '11:30',
        price: 2000,
        paymentStatus: '支払い済み',
        paymentMethod: '当日現金',
        attended: true,
      },
      {
        id: 202,
        reservationNumber: 'EN098765',
        lessonName: 'K-POP振付け',
        instructor: '高橋 健太',
        studio: 'スタジオA',
        date: '2025-05-08',
        startTime: '18:00',
        endTime: '19:30',
        price: 1800,
        paymentStatus: '支払い済み',
        paymentMethod: 'Enポイント',
        attended: true,
      },
      {
        id: 203,
        reservationNumber: 'EN543210',
        lessonName: 'コンテンポラリー',
        instructor: '中村 愛',
        studio: 'スタジオB',
        date: '2025-05-05',
        startTime: '17:00',
        endTime: '18:30',
        price: 2000,
        paymentStatus: '支払い済み',
        paymentMethod: 'Enポイント',
        attended: false,
      },
    ],
    canceled: [
      {
        id: 301,
        reservationNumber: 'EN135790',
        lessonName: 'ブレイクダンス入門',
        instructor: '木村 誠',
        studio: 'スタジオA',
        date: '2025-05-07',
        startTime: '20:00',
        endTime: '21:30',
        price: 1800,
        cancelDate: '2025-05-06',
        cancelFee: 0,
      },
    ],
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = dayNames[date.getDay()];
    
    return `${month}月${day}日(${dayOfWeek})`;
  };
  
  // Check if a date is past the current date
  const isPastDate = (dateString: string) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const targetDate = new Date(dateString);
    return targetDate < currentDate;
  };

  // Handle cancellation (mock function)
  const handleCancelReservation = (reservationId: number) => {
    if (confirm('予約をキャンセルしますか？\nキャンセル規定に基づき、キャンセル料が発生する場合があります。')) {
      alert('予約をキャンセルしました。');
      // In a real app, this would make an API call to cancel the reservation
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">予約・履歴管理</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            予約中
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'past'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            受講履歴
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'canceled'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            キャンセル履歴
          </button>
        </nav>
      </div>

      {/* Reservation lists */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">予約中のレッスン</h2>
          
          {reservations.upcoming.length > 0 ? (
            <div className="space-y-4">
              {reservations.upcoming.map(reservation => (
                <Card key={reservation.id}>
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500 mr-3">予約番号: {reservation.reservationNumber}</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
                            {reservation.paymentStatus}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium">{reservation.lessonName}</h3>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p>{formatDate(reservation.date)} {reservation.startTime} - {reservation.endTime}</p>
                          <p>講師: {reservation.instructor}</p>
                          <p>場所: {reservation.studio}</p>
                          <p>支払方法: {reservation.paymentMethod}</p>
                        </div>
                      </div>
                      
                      <div className="md:w-1/4 mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <div className="text-lg font-bold mb-4">
                          {reservation.price.toLocaleString()}円
                        </div>
                        
                        <div className="space-y-2 w-full md:w-auto">
                          <Link href={`/user/reservations/${reservation.id}`}>
                            <Button variant="outline" className="w-full md:w-auto">
                              詳細を見る
                            </Button>
                          </Link>
                          
                          <button
                            onClick={() => handleCancelReservation(reservation.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium block w-full text-center mt-2"
                          >
                            キャンセル
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">予約中のレッスンはありません</p>
              <Link href="/user/lessons" className="text-primary hover:underline mt-2 inline-block">
                レッスンを予約する
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'past' && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">レッスン受講履歴</h2>
          
          {reservations.past.length > 0 ? (
            <div className="space-y-4">
              {reservations.past.map(reservation => (
                <Card key={reservation.id}>
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500 mr-3">予約番号: {reservation.reservationNumber}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                            reservation.attended 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {reservation.attended ? '受講済み' : '欠席'}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium">{reservation.lessonName}</h3>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p>{formatDate(reservation.date)} {reservation.startTime} - {reservation.endTime}</p>
                          <p>講師: {reservation.instructor}</p>
                          <p>場所: {reservation.studio}</p>
                        </div>
                      </div>
                      
                      <div className="md:w-1/4 mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <div className="text-lg font-bold mb-4">
                          {reservation.price.toLocaleString()}円
                        </div>
                        
                        <Link href={`/user/reservations/${reservation.id}`}>
                          <Button variant="outline" className="w-full md:w-auto">
                            詳細を見る
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">レッスン受講履歴はありません</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'canceled' && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">キャンセル履歴</h2>
          
          {reservations.canceled.length > 0 ? (
            <div className="space-y-4">
              {reservations.canceled.map(reservation => (
                <Card key={reservation.id}>
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="md:w-3/4">
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500 mr-3">予約番号: {reservation.reservationNumber}</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                            キャンセル済み
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-medium">{reservation.lessonName}</h3>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                          <p>{formatDate(reservation.date)} {reservation.startTime} - {reservation.endTime}</p>
                          <p>講師: {reservation.instructor}</p>
                          <p>場所: {reservation.studio}</p>
                          <p>キャンセル日: {formatDate(reservation.cancelDate)}</p>
                          <p>キャンセル料: {reservation.cancelFee.toLocaleString()}円</p>
                        </div>
                      </div>
                      
                      <div className="md:w-1/4 mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <div className="text-lg font-bold mb-4">
                          {reservation.price.toLocaleString()}円
                        </div>
                        
                        <Link href={`/user/reservations/${reservation.id}`}>
                          <Button variant="outline" className="w-full md:w-auto">
                            詳細を見る
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">キャンセル履歴はありません</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
