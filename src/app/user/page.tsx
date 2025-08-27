'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/common/Button';

export default function UserTopPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              あなたのダンスライフをもっと豊かに
            </h1>
            <p className="text-xl mb-8">
              EnDanceStudioで最高のダンス体験を。レッスン予約から友達紹介まで、すべてをシームレスに。
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/user/login">
                <Button className="px-8 py-3 text-lg">ログイン</Button>
              </Link>
              <Link href="/user/register">
                <Button variant="outline" className="px-8 py-3 text-lg">
                  新規登録
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md h-80 bg-white rounded-lg shadow-xl flex items-center justify-center">
              <div className="text-primary text-6xl font-bold">En Dance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">EnDanceStudioの特長</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">簡単予約システム</h3>
              <p className="text-gray-600 text-center">
                レッスンやイベントをオンラインで簡単に予約。スタジオ検索や日程検索で最適なクラスが見つかります。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">ポイント制度</h3>
              <p className="text-gray-600 text-center">
                レッスン受講でEnポイントを獲得。ポイントはレッスンやグッズ購入に使えます。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">友達紹介</h3>
              <p className="text-gray-600 text-center">
                友達を紹介してお互いにポイント獲得。QRコードやSNSで簡単に共有できます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">提供サービス</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/user/lessons" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">レッスン予約</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">スタジオレッスン</h3>
                  <p className="text-gray-600 text-sm">
                    多彩なジャンルのレッスンをご用意。初心者から上級者まで対応。
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/user/lessons/online" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">オンラインレッスン</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">どこでもダンス</h3>
                  <p className="text-gray-600 text-sm">
                    自宅からでも参加できる高品質なオンラインレッスン。
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/user/events" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">イベント</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">ワークショップ＆イベント</h3>
                  <p className="text-gray-600 text-sm">
                    特別ワークショップやダンスイベントで技術向上とコミュニティ拡大。
                  </p>
                </div>
              </div>
            </Link>
            
            <Link href="/user/rental" className="block group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">スタジオレンタル</div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">練習スペース</h3>
                  <p className="text-gray-600 text-sm">
                    充実した設備のスタジオを時間単位でレンタル可能。
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">今すぐ始めましょう</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            EnDanceStudioで最高のダンス体験を。新規登録は簡単です。
          </p>
          <Link href="/user/register">
            <Button variant="outline" className="px-8 py-3 text-lg">
              無料で新規登録
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
