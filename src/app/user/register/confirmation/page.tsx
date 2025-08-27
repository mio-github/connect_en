'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/common/Button';

export default function RegistrationConfirmationPage() {
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
            登録完了
          </h2>
          <p className="mt-2 text-center text-gray-600">
            EnDanceStudioの会員登録が完了しました！
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-700">
              ご登録いただいたメールアドレスに確認メールをお送りしました。<br />
              メール内のリンクをクリックして、アカウントを有効化してください。
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              アカウント有効化後、以下のリンクからマイページにログインできます。
            </p>
            
            <Link href="/user/login">
              <Button className="w-full">
                ログインページへ
              </Button>
            </Link>
            
            <Link href="/user">
              <Button variant="outline" className="w-full">
                トップページに戻る
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-6 border-t pt-6">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              今すぐできること
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>・レッスン予約</li>
              <li>・オンラインレッスンへの参加</li>
              <li>・イベント＆ワークショップの閲覧</li>
              <li>・スタジオレンタル</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
