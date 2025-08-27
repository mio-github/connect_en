'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function PointsPage() {
  const [activeTab, setActiveTab] = useState('earning'); // 'earning', 'usage', 'purchase', 'expiry'
  
  // Mock user points data
  const pointsData = {
    balance: 2500,
    nextExpiry: {
      date: '2025-06-30',
      points: 300,
    },
  };
  
  // Mock point transactions data
  const transactions = {
    earning: [
      {
        id: 1,
        date: '2025-05-10',
        description: 'レッスン参加 - ヒップホップ入門',
        points: 150,
      },
      {
        id: 2,
        date: '2025-05-05',
        description: 'レッスン参加 - ジャズダンス中級',
        points: 180,
      },
      {
        id: 3,
        date: '2025-05-01',
        description: '友達紹介ボーナス',
        points: 500,
      },
      {
        id: 4,
        date: '2025-04-25',
        description: 'レッスン参加 - バレエ基礎',
        points: 200,
      },
    ],
    usage: [
      {
        id: 1,
        date: '2025-05-08',
        description: 'レッスン予約 - K-POP振付け',
        points: -1800,
      },
      {
        id: 2,
        date: '2025-04-20',
        description: 'オンラインレッスン購入',
        points: -1500,
      },
    ],
    purchase: [
      {
        id: 1,
        date: '2025-04-15',
        description: 'ポイント購入',
        points: 3000,
        price: 3000,
      },
      {
        id: 2,
        date: '2025-03-01',
        description: 'ポイント購入',
        points: 5000,
        price: 5000,
      },
    ],
    expiry: [
      {
        id: 1,
        date: '2025-06-30',
        description: '獲得ポイントの有効期限',
        points: 300,
      },
      {
        id: 2,
        date: '2025-09-30',
        description: '獲得ポイントの有効期限',
        points: 500,
      },
      {
        id: 3,
        date: '2025-12-31',
        description: '獲得ポイントの有効期限',
        points: 1000,
      },
    ],
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${year}年${month}月${day}日`;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Enポイント</h1>
      
      {/* Points balance card */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-lg font-medium text-gray-700">現在のポイント残高</h2>
              <div className="text-3xl font-bold text-primary mt-2">
                {pointsData.balance.toLocaleString()} pts
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-medium">まもなく有効期限が切れるポイントがあります</p>
                    <p className="mt-1">{formatDate(pointsData.nextExpiry.date)}に{pointsData.nextExpiry.points.toLocaleString()}ポイントが失効します</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <Link href="/user/points/purchase">
              <Button className="w-full">
                ポイントを購入する
              </Button>
            </Link>
            
            <Link href="/user/referral">
              <Button variant="outline" className="w-full">
                友達を紹介してポイントGET
              </Button>
            </Link>
          </div>
        </div>
      </Card>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('earning')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'earning'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            獲得履歴
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'usage'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            利用履歴
          </button>
          <button
            onClick={() => setActiveTab('purchase')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'purchase'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            購入履歴
          </button>
          <button
            onClick={() => setActiveTab('expiry')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'expiry'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            有効期限
          </button>
        </nav>
      </div>
      
      {/* Transactions list */}
      <div>
        {activeTab === 'earning' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">ポイント獲得履歴</h2>
            {transactions.earning.length > 0 ? (
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {transactions.earning.map((transaction) => (
                    <li key={transaction.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium text-gray-900">{transaction.description}</p>
                          <div className="ml-2 flex flex-shrink-0">
                            <p className="inline-flex rounded-md bg-green-50 px-2 text-xs font-semibold leading-5 text-green-700">
                              +{transaction.points} pts
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">ポイント獲得履歴はありません</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'usage' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">ポイント利用履歴</h2>
            {transactions.usage.length > 0 ? (
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {transactions.usage.map((transaction) => (
                    <li key={transaction.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium text-gray-900">{transaction.description}</p>
                          <div className="ml-2 flex flex-shrink-0">
                            <p className="inline-flex rounded-md bg-red-50 px-2 text-xs font-semibold leading-5 text-red-700">
                              {transaction.points} pts
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">ポイント利用履歴はありません</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'purchase' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">ポイント購入履歴</h2>
            {transactions.purchase.length > 0 ? (
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {transactions.purchase.map((transaction) => (
                    <li key={transaction.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium text-gray-900">{transaction.description}</p>
                          <div className="ml-2 flex flex-shrink-0">
                            <p className="inline-flex rounded-md bg-blue-50 px-2 text-xs font-semibold leading-5 text-blue-700">
                              +{transaction.points} pts
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              {formatDate(transaction.date)}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <p>{transaction.price.toLocaleString()}円</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">ポイント購入履歴はありません</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'expiry' && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">ポイント有効期限</h2>
            {transactions.expiry.length > 0 ? (
              <div className="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {transactions.expiry.map((transaction) => (
                    <li key={transaction.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="truncate text-sm font-medium text-gray-900">{transaction.description}</p>
                          <div className="ml-2 flex flex-shrink-0">
                            <p className="inline-flex rounded-md bg-yellow-50 px-2 text-xs font-semibold leading-5 text-yellow-700">
                              {transaction.points} pts
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              有効期限: {formatDate(transaction.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-500">現在、有効期限が設定されているポイントはありません</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Points information */}
      <Card>
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">ポイントについて</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm">ポイントの獲得方法</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                <li>・レッスンに参加する（参加費の10%相当）</li>
                <li>・友達紹介（1人につき500ポイント）</li>
                <li>・キャンペーン参加</li>
                <li>・ポイントを購入する（1円=1ポイント）</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">ポイントの利用方法</h3>
              <ul className="mt-2 text-sm text-gray-600 space-y-2">
                <li>・レッスン予約（1ポイント=1円相当）</li>
                <li>・オンラインレッスン購入</li>
                <li>・グッズ購入</li>
                <li>・イベントチケット購入</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-sm">ポイントの有効期限</h3>
              <p className="mt-2 text-sm text-gray-600">獲得日から1年間有効です。購入したポイントに有効期限はありません。</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
