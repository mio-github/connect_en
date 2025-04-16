import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  userName?: string;
}

export default function Header({ userName = 'ユーザー' }: HeaderProps) {
  return (
    <header className="bg-white h-20 shadow-sm w-full border-b border-gray-200">
      <div className="h-full px-10 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button className="p-3 rounded-full hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-2xl font-extrabold tracking-tight text-[#222]">ConnectEn</div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="p-3 rounded-full hover:bg-[#fff7e6] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#ff9800]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="relative group">
            <button className="flex items-center space-x-3 p-2 rounded-full hover:bg-[#fff7e6] transition">
              <div className="w-10 h-10 bg-[#fff3e0] rounded-full flex items-center justify-center text-[#ff9800] text-lg font-bold border-2 border-[#ff9800]/30">
                {userName.charAt(0)}
              </div>
              <span className="text-[#222] font-semibold tracking-wide">{userName}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl py-2 hidden group-hover:block z-20 border border-gray-100">
              <Link href="/profile" className="block px-5 py-2 text-sm text-[#222] hover:bg-gray-50 rounded-lg transition">プロフィール</Link>
              <Link href="/settings/account" className="block px-5 py-2 text-sm text-[#222] hover:bg-gray-50 rounded-lg transition">アカウント設定</Link>
              <hr className="my-2 border-gray-100" />
              <Link href="/logout" className="block px-5 py-2 text-sm text-[#ff9800] hover:bg-orange-50 rounded-lg transition">ログアウト</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 