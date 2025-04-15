'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <p className="text-gray-600">本日の概要と重要なデータを確認できます。</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary-light border-l-4 border-primary">
          <div className="flex items-center">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">本日の来場者数</div>
              <div className="text-2xl font-bold">142</div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-secondary-light border-l-4 border-secondary">
          <div className="flex items-center">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">本日のレッスン数</div>
              <div className="text-2xl font-bold">24</div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-accent-light border-l-4 border-accent">
          <div className="flex items-center">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">本日の売上</div>
              <div className="text-2xl font-bold">¥87,500</div>
            </div>
          </div>
        </Card>
        
        <Card className="bg-red-100 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">対応待ち件数</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card title="レッスンスケジュール">
          <div className="space-y-4">
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-16 text-center">
                <div className="text-sm font-medium">10:00</div>
              </div>
              <div className="flex-1 ml-4 p-2 bg-primary-light rounded">
                <div className="font-medium">バレエ入門</div>
                <div className="text-sm text-gray-600">スタジオA - 山田先生</div>
              </div>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-16 text-center">
                <div className="text-sm font-medium">13:00</div>
              </div>
              <div className="flex-1 ml-4 p-2 bg-secondary-light rounded">
                <div className="font-medium">ジャズダンス中級</div>
                <div className="text-sm text-gray-600">スタジオB - 鈴木先生</div>
              </div>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-16 text-center">
                <div className="text-sm font-medium">15:30</div>
              </div>
              <div className="flex-1 ml-4 p-2 bg-accent-light rounded">
                <div className="font-medium">ヒップホップ初級</div>
                <div className="text-sm text-gray-600">スタジオA - 佐藤先生</div>
              </div>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-16 text-center">
                <div className="text-sm font-medium">18:00</div>
              </div>
              <div className="flex-1 ml-4 p-2 bg-purple-100 rounded">
                <div className="font-medium">コンテンポラリー</div>
                <div className="text-sm text-gray-600">スタジオB - 高橋先生</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="text">すべてのスケジュールを表示</Button>
          </div>
        </Card>
        
        <Card title="対応待ち案件">
          <div className="space-y-4">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">会員カード再発行希望</div>
                  <div className="text-sm text-gray-600">田中 花子 - 10分前</div>
                </div>
                <div className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                  至急
                </div>
              </div>
              <p className="text-sm mt-1">会員カードを紛失したため、再発行を希望されています。</p>
              <div className="mt-2 flex">
                <Button size="sm" className="mr-2">対応する</Button>
                <Button variant="outline" size="sm">詳細</Button>
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">レッスン振替希望</div>
                  <div className="text-sm text-gray-600">佐々木 健太 - 30分前</div>
                </div>
                <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                  通常
                </div>
              </div>
              <p className="text-sm mt-1">今週水曜日のバレエ入門から来週への振替を希望されています。</p>
              <div className="mt-2 flex">
                <Button size="sm" className="mr-2">対応する</Button>
                <Button variant="outline" size="sm">詳細</Button>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">体験レッスン問い合わせ</div>
                  <div className="text-sm text-gray-600">Web問い合わせ - 2時間前</div>
                </div>
                <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  問い合わせ
                </div>
              </div>
              <p className="text-sm mt-1">ヒップホップ初級の体験レッスンについて問い合わせがありました。</p>
              <div className="mt-2 flex">
                <Button size="sm" className="mr-2">対応する</Button>
                <Button variant="outline" size="sm">詳細</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="会員アクティビティ">
          <div className="space-y-2">
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                K
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">加藤 美咲さんがチェックインしました</div>
                <div className="text-xs text-gray-500">2分前</div>
              </div>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                Y
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">山本 太郎さんが予約を変更しました</div>
                <div className="text-xs text-gray-500">15分前</div>
              </div>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                N
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">中村 瞳さんが会費を支払いました</div>
                <div className="text-xs text-gray-500">1時間前</div>
              </div>
            </div>
            
            <div className="flex items-center p-2 hover:bg-gray-50 rounded">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-medium">
                S
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium">斎藤 健さんが新規入会しました</div>
                <div className="text-xs text-gray-500">3時間前</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card title="本日の売上内訳">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">レッスン料</div>
              <div className="font-medium">¥52,500</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">会員費</div>
              <div className="font-medium">¥25,000</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">物販</div>
              <div className="font-medium">¥10,000</div>
            </div>
            <div className="border-t pt-2 flex justify-between items-center">
              <div className="font-medium">合計</div>
              <div className="font-bold text-lg">¥87,500</div>
            </div>
          </div>
        </Card>
        
        <Card title="物品在庫状況">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">レオタード (S)</div>
              <div className="font-medium text-green-600">在庫あり (12)</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">レオタード (M)</div>
              <div className="font-medium text-red-600">在庫なし</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">バレエシューズ</div>
              <div className="font-medium text-yellow-600">残りわずか (3)</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">タオル</div>
              <div className="font-medium text-green-600">在庫あり (24)</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">水筒</div>
              <div className="font-medium text-green-600">在庫あり (18)</div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
} 