'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function OnlineLessonsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  // Mock data for lesson categories
  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'hiphop', name: 'ヒップホップ' },
    { id: 'jazz', name: 'ジャズ' },
    { id: 'ballet', name: 'バレエ' },
    { id: 'contemporary', name: 'コンテンポラリー' },
    { id: 'kpop', name: 'K-POP' },
  ];
  
  // Mock data for lesson levels
  const levels = [
    { id: 'all', name: 'すべて' },
    { id: 'beginner', name: '初心者' },
    { id: 'intermediate', name: '中級者' },
    { id: 'advanced', name: '上級者' },
    { id: 'all-levels', name: 'オールレベル' },
  ];
  
  // Mock data for online lessons
  const onlineLessons = [
    {
      id: 101,
      title: 'ヒップホップ基礎講座',
      instructor: '山田 太郎',
      category: 'hiphop',
      level: 'beginner',
      thumbnail: '/thumbnails/hiphop-basics.jpg',
      duration: 60,
      price: 2000,
      points: 200,
      description: 'ヒップホップの基本的なステップやリズムの取り方を学べるオンラインレッスン。初心者の方でも安心して参加できます。',
      isLive: false,
      videoCount: 8,
      releaseDate: '2025-04-15',
      isNew: false,
    },
    {
      id: 102,
      title: 'K-POPダンスチャレンジ',
      instructor: '高橋 健太',
      category: 'kpop',
      level: 'all-levels',
      thumbnail: '/thumbnails/kpop-challenge.jpg',
      duration: 45,
      price: 1800,
      points: 180,
      description: '人気K-POPグループの振付を学べるオンラインレッスン。短い時間で効率的に学習できます。',
      isLive: false,
      videoCount: 5,
      releaseDate: '2025-05-10',
      isNew: true,
    },
    {
      id: 103,
      title: 'バレエストレッチ',
      instructor: '鈴木 美咲',
      category: 'ballet',
      level: 'all-levels',
      thumbnail: '/thumbnails/ballet-stretch.jpg',
      duration: 30,
      price: 1500,
      points: 150,
      description: 'バレエダンサーが行うストレッチ方法を学べるオンラインレッスン。柔軟性向上に効果的です。',
      isLive: false,
      videoCount: 3,
      releaseDate: '2025-03-20',
      isNew: false,
    },
    {
      id: 104,
      title: 'ライブ：ジャズダンスワークショップ',
      instructor: '佐藤 花子',
      category: 'jazz',
      level: 'intermediate',
      thumbnail: '/thumbnails/jazz-workshop.jpg',
      duration: 90,
      price: 3000,
      points: 300,
      description: '即興性を高めるためのジャズダンスワークショップ。ライブ配信で質問にもリアルタイムで回答します。',
      isLive: true,
      liveDate: '2025-05-20',
      liveTime: '19:00-20:30',
      isNew: true,
    },
    {
      id: 105,
      title: 'コンテンポラリーマスタークラス',
      instructor: '中村 愛',
      category: 'contemporary',
      level: 'advanced',
      thumbnail: '/thumbnails/contemporary-master.jpg',
      duration: 75,
      price: 2500,
      points: 250,
      description: '表現力を高めるためのコンテンポラリーダンスのマスタークラス。経験者向けの高度な技術を学べます。',
      isLive: false,
      videoCount: 6,
      releaseDate: '2025-04-01',
      isNew: false,
    },
  ];
  
  // Filter lessons based on selected category and level
  const filteredLessons = onlineLessons.filter(lesson => {
    if (selectedCategory !== 'all' && lesson.category !== selectedCategory) {
      return false;
    }
    
    if (selectedLevel !== 'all' && lesson.level !== selectedLevel) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">オンラインレッスン</h1>
      
      <div className="bg-primary/5 p-5 rounded-lg">
        <p className="text-center mb-6">
          いつでもどこでも、あなたのペースで学べるオンラインレッスン
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">カテゴリー</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">レベル</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    selectedLevel === level.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured live lessons */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">ライブレッスン</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons
            .filter(lesson => lesson.isLive)
            .map(lesson => (
              <Card key={lesson.id}>
                <div className="relative h-40 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {lesson.title}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      LIVE
                    </span>
                  </div>
                  {lesson.isNew && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        NEW
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    講師: {lesson.instructor}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">
                      {lesson.liveDate} {lesson.liveTime}
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        {categories.find(c => c.id === lesson.category)?.name}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {levels.find(l => l.id === lesson.level)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">{lesson.price.toLocaleString()}円</div>
                      <div className="text-xs text-primary">{lesson.points} pts 獲得</div>
                    </div>
                    <Link href={`/user/lessons/online/${lesson.id}`}>
                      <Button size="sm">
                        予約する
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
        </div>
        
        {filteredLessons.filter(lesson => lesson.isLive).length === 0 && (
          <div className="bg-white p-8 text-center rounded-lg shadow">
            <p className="text-gray-500">条件に一致するライブレッスンはありません</p>
          </div>
        )}
      </div>
      
      {/* Recorded video lessons */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">オンデマンドレッスン</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLessons
            .filter(lesson => !lesson.isLive)
            .map(lesson => (
              <Card key={lesson.id}>
                <div className="relative h-40 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">
                      {lesson.title}
                    </span>
                  </div>
                  {lesson.isNew && (
                    <div className="absolute top-2 right-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        NEW
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    講師: {lesson.instructor}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-gray-500">
                      {lesson.videoCount}本 • 計{lesson.duration}分
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                        {categories.find(c => c.id === lesson.category)?.name}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {levels.find(l => l.id === lesson.level)?.name}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">{lesson.price.toLocaleString()}円</div>
                      <div className="text-xs text-primary">{lesson.points} pts 獲得</div>
                    </div>
                    <Link href={`/user/lessons/online/${lesson.id}`}>
                      <Button size="sm">
                        購入する
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
        </div>
        
        {filteredLessons.filter(lesson => !lesson.isLive).length === 0 && (
          <div className="bg-white p-8 text-center rounded-lg shadow">
            <p className="text-gray-500">条件に一致するオンデマンドレッスンはありません</p>
          </div>
        )}
      </div>
      
      {/* How it works section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">オンラインレッスンの利用方法</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center text-primary text-xl font-bold mb-3">
              1
            </div>
            <h3 className="font-medium mb-2">レッスンを選ぶ</h3>
            <p className="text-sm text-gray-600">
              ジャンルやレベルに合わせてお好みのレッスンを選択します。
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center text-primary text-xl font-bold mb-3">
              2
            </div>
            <h3 className="font-medium mb-2">購入する</h3>
            <p className="text-sm text-gray-600">
              Enポイントまたはクレジットカードでレッスンを購入します。
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary-light flex items-center justify-center text-primary text-xl font-bold mb-3">
              3
            </div>
            <h3 className="font-medium mb-2">レッスンを受ける</h3>
            <p className="text-sm text-gray-600">
              お手持ちのデバイスからいつでもどこでもレッスンが受けられます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
