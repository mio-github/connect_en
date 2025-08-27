'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // For mockup purposes, check if we're on a path that requires login
  useEffect(() => {
    // Pages that require login start with /user/ and are not the login or registration pages
    const requiresLogin = pathname.startsWith('/user/') && 
                         !pathname.includes('/login') && 
                         !pathname.includes('/register');
    
    // For demonstration, we'll consider the user logged in if they're on a page that requires login
    // In a real app, this would be handled by checking authentication state
    setIsLoggedIn(requiresLogin);
  }, [pathname]);

  // If this is a non-login public page (top page, etc.), don't show the header/footer
  if (pathname === '/user' || pathname === '/user/login' || pathname === '/user/register') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <Link href="/user" className="text-xl font-bold">
            EnDanceStudio
          </Link>
          
          {isLoggedIn ? (
            <nav className="flex items-center space-x-4">
              <Link href="/user/mypage" className="hover:underline">
                マイページ
              </Link>
              <Link href="/user/reservations" className="hover:underline">
                予約
              </Link>
              <Link href="/user/notifications" className="hover:underline">
                お知らせ
              </Link>
              <Link href="/user/settings" className="hover:underline">
                設定
              </Link>
            </nav>
          ) : (
            <nav className="flex items-center space-x-4">
              <Link href="/user/login" className="hover:underline">
                ログイン
              </Link>
              <Link href="/user/register" className="hover:underline">
                新規登録
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto py-8 px-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">EnDanceStudio</h3>
              <p className="text-gray-600 text-sm">ダンスを通じて、あなたの可能性を広げます</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2">レッスン</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><Link href="/user/lessons" className="hover:text-primary">スケジュール</Link></li>
                  <li><Link href="/user/lessons/online" className="hover:text-primary">オンラインレッスン</Link></li>
                  <li><Link href="/user/events" className="hover:text-primary">イベント</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">サービス</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><Link href="/user/rental" className="hover:text-primary">スタジオレンタル</Link></li>
                  <li><Link href="/user/tickets" className="hover:text-primary">チケット購入</Link></li>
                  <li><Link href="/user/points" className="hover:text-primary">ポイント</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">情報</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><Link href="/user/terms" className="hover:text-primary">利用規約</Link></li>
                  <li><Link href="/user/privacy" className="hover:text-primary">プライバシーポリシー</Link></li>
                  <li><Link href="/user/contact" className="hover:text-primary">お問い合わせ</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} EnDanceStudio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
