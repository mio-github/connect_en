'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function ReservationConfirmationPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('points'); // 'points', 'ticket', 'cash'
  
  // Mock lesson data based on the ID
  const lesson = {
    id: parseInt(params.id),
    name: 'ヒップホップ入門',
    instructor: '山田 太郎',
    studio: 'スタジオA',
    date: '2025-05-16',
    startTime: '19:00',
    endTime: '20:30',
    genre: 'ヒップホップ',
    level: '初心者',
    capacity: 20,
    remaining: 8,
    price: 1500,
    points: 150,
  };
  
  // Mock user data
  const userData = {
    points: 2500,
    tickets: 5
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

  const handleConfirmReservation = async () => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to the completion page
      router.push(`/user/lessons/${params.id}/complete`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">予約確認</h1>
      
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">レッスン情報</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
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
            
            <div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">ジャンル</span>
                  <span className="font-medium">{lesson.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">レベル</span>
                  <span className="font-medium">{lesson.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">料金</span>
                  <span className="font-medium">{lesson.price.toLocaleString()}円</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">獲得ポイント</span>
                  <span className="font-medium text-primary">{lesson.points} pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">お支払い方法を選択</h2>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                id="payment-points"
                name="payment-method"
                type="radio"
                checked={paymentMethod === 'points'}
                onChange={() => setPaymentMethod('points')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="payment-points" className="ml-3 block">
                <span className="font-medium text-gray-900">Enポイントで支払う</span>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-500">利用可能ポイント: {userData.points.toLocaleString()} pts</span>
                  {paymentMethod === 'points' && (
                    <span className="ml-3 text-sm text-primary">
                      支払い後残高: {(userData.points - lesson.price).toLocaleString()} pts
                    </span>
                  )}
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="payment-ticket"
                name="payment-method"
                type="radio"
                checked={paymentMethod === 'ticket'}
                onChange={() => setPaymentMethod('ticket')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="payment-ticket" className="ml-3 block">
                <span className="font-medium text-gray-900">レッスンチケットを使用</span>
                <div className="mt-1 flex items-center">
                  <span className="text-sm text-gray-500">保有チケット: {userData.tickets} 枚</span>
                  {paymentMethod === 'ticket' && (
                    <span className="ml-3 text-sm text-primary">
                      使用後残高: {userData.tickets - 1} 枚
                    </span>
                  )}
                </div>
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="payment-cash"
                name="payment-method"
                type="radio"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <label htmlFor="payment-cash" className="ml-3">
                <span className="font-medium text-gray-900">当日現金払い</span>
                <p className="text-sm text-gray-500 mt-1">
                  レッスン当日に受付でお支払いください
                </p>
              </label>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-medium mb-3">注意事項</h3>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>レッスン開始1時間前までキャンセル可能です。</li>
              <li>レッスン開始1時間前を過ぎた場合、キャンセル料が発生します。</li>
              <li>当日欠席の場合は、全額のキャンセル料が発生します。</li>
            </ul>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between">
        <Link href={`/user/lessons`}>
          <Button variant="outline">
            戻る
          </Button>
        </Link>
        
        <Button 
          onClick={handleConfirmReservation}
          disabled={loading}
        >
          {loading ? '処理中...' : '予約を確定する'}
        </Button>
      </div>
    </div>
  );
}
