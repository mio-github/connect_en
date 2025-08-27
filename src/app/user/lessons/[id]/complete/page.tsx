'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function ReservationCompletePage({ params }: { params: { id: string } }) {
  // Mock lesson data based on the ID
  const lesson = {
    id: parseInt(params.id),
    name: 'ヒップホップ入門',
    instructor: '山田 太郎',
    studio: 'スタジオA',
    date: '2025-05-16',
    startTime: '19:00',
    endTime: '20:30',
    reservationNumber: 'EN' + Math.floor(100000 + Math.random() * 900000)
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            予約完了
          </h2>
          <p className="mt-2 text-center text-gray-600">
            レッスンの予約が完了しました！
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 p-6 rounded-md">
            <h3 className="font-semibold mb-4 text-center">予約情報</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">予約番号</span>
                <span className="font-medium">{lesson.reservationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">レッスン名</span>
                <span className="font-medium">{lesson.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">講師</span>
                <span className="font-medium">{lesson.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">日時</span>
                <span className="font-medium">{formatDate(lesson.date)} {lesson.startTime} - {lesson.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">場所</span>
                <span className="font-medium">{lesson.studio}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              レッスン予約確認のメールを登録アドレスに送信しました。
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <Link href={`/user/reservations`}>
              <Button className="w-full">
                予約一覧を見る
              </Button>
            </Link>
            
            <Link href="/user/mypage">
              <Button variant="outline" className="w-full">
                マイページに戻る
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-6 border-t pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              レッスン当日のご案内
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>・レッスン開始10分前までにスタジオへお越しください</li>
              <li>・受付でお名前と予約番号をお伝えください</li>
              <li>・動きやすい服装でお越しください</li>
              <li>・飲み物をご持参ください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
