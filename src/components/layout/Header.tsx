import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = 'ユーザー' }: HeaderProps) {
  return (
    <header className="bg-white h-16 shadow-sm fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="text-xl font-medium">ConnectEn</div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                {userName.charAt(0)}
              </div>
              <span>{userName}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                プロフィール
              </Link>
              <Link href="/settings/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                アカウント設定
              </Link>
              <hr className="my-1" />
              <Link href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                ログアウト
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 