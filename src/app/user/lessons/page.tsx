'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function LessonReservationPage() {
  // State for the search and filter options
  const [searchTab, setSearchTab] = useState('studio'); // 'studio' or 'date'
  const [selectedStudio, setSelectedStudio] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  
  // Mock data for studios
  const studios = [
    { id: 'studio-a', name: 'スタジオA' },
    { id: 'studio-b', name: 'スタジオB' },
    { id: 'studio-c', name: 'スタジオC' },
  ];
  
  // Mock data for genres
  const genres = [
    { id: 'hiphop', name: 'ヒップホップ' },
    { id: 'jazz', name: 'ジャズ' },
    { id: 'ballet', name: 'バレエ' },
    { id: 'contemporary', name: 'コンテンポラリー' },
    { id: 'kpop', name: 'K-POP' },
  ];
  
  // Mock data for levels
  const levels = [
    { id: 'beginner', name: '初心者' },
    { id: 'intermediate', name: '中級者' },
    { id: 'advanced', name: '上級者' },
    { id: 'all-levels', name: 'オールレベル' },
  ];
  
  // Mock data for lessons
  const lessons = [
    {
      id: 1,
      name: 'ヒップホップ入門',
      instructor: '山田 太郎',
      studio: 'スタジオA',
      date: '2025-05-16',
      startTime: '19:00',
      endTime: '20:30',
      genre: 'hiphop',
      level: 'beginner',
      capacity: 20,
      remaining: 8,
      price: 1500,
      points: 150,
    },
    {
      id: 2,
      name: 'ジャズダンス中級',
      instructor: '佐藤 花子',
      studio: 'スタジオB',
      date: '2025-05-16',
      startTime: '18:00',
      endTime: '19:30',
      genre: 'jazz',
      level: 'intermediate',
      capacity: 15,
      remaining: 2,
      price: 1800,
      points: 180,
    },
    {
      id: 3,
      name: 'バレエ基礎',
      instructor: '鈴木 美咲',
      studio: 'スタジオC',
      date: '2025-05-17',
      startTime: '10:00',
      endTime: '11:30',
      genre: 'ballet',
      level: 'beginner',
      capacity: 10,
      remaining: 4,
      price: 2000,
      points: 200,
    },
    {
      id: 4,
      name: 'K-POP振付け',
      instructor: '高橋 健太',
      studio: 'スタジオA',
      date: '2025-05-17',
      startTime: '14:00',
      endTime: '15:30',
      genre: 'kpop',
      level: 'all-levels',
      capacity: 25,
      remaining: 15,
      price: 1800,
      points: 180,
    },
  ];

  // Filter lessons based on selected options
  const filteredLessons = lessons.filter(lesson => {
    if (searchTab === 'studio') {
      if (selectedStudio !== 'all' && lesson.studio !== studios.find(s => s.id === selectedStudio)?.name) {
        return false;
      }
    } else if (searchTab === 'date') {
      if (selectedDate && lesson.date !== selectedDate) {
        return false;
      }
    }
    
    if (selectedGenre !== 'all' && lesson.genre !== selectedGenre) {
      return false;
    }
    
    if (selectedLevel !== 'all' && lesson.level !== selectedLevel) {
      return false;
    }
    
    return true;
  });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
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
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">レッスン予約</h1>

      {/* Search tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSearchTab('studio')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              searchTab === 'studio'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            スタジオから探す
          </button>
          <button
            onClick={() => setSearchTab('date')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              searchTab === 'date'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            日付から探す
          </button>
        </nav>
      </div>

      {/* Search filters */}
      <Card>
        <div className="p-4 space-y-4">
          {searchTab === 'studio' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">スタジオを選択</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedStudio('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedStudio === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  すべて
                </button>
                {studios.map(studio => (
                  <button
                    key={studio.id}
                    onClick={() => setSelectedStudio(studio.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      selectedStudio === studio.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {studio.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">日付を選択</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ジャンル</label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="all">すべて</option>
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">レベル</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="all">すべて</option>
                {levels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Lesson list */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">レッスン一覧</h2>
          <p className="text-sm text-gray-500">{filteredLessons.length}件のレッスンが見つかりました</p>
        </div>
        
        {filteredLessons.length > 0 ? (
          <div className="space-y-4">
            {filteredLessons.map(lesson => (
              <Card key={lesson.id}>
                <div className="p-4">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="md:w-2/3">
                      <div className="flex items-center mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-blue-100 text-blue-800 mr-2">
                          {genres.find(g => g.id === lesson.genre)?.name}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                          {levels.find(l => l.id === lesson.level)?.name}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium">{lesson.name}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        <p>{lesson.instructor} 講師</p>
                        <p>{formatDate(lesson.date)} {lesson.startTime} - {lesson.endTime}</p>
                        <p>{lesson.studio}</p>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 mt-4 md:mt-0 md:flex md:flex-col md:items-end md:justify-between">
                      <div className="text-right">
                        <p className="text-lg font-bold">{lesson.price.toLocaleString()}円</p>
                        <p className="text-sm text-primary">{lesson.points} pts 獲得</p>
                      </div>
                      
                      <div className="mt-3 md:mt-0">
                        <p className="text-sm text-gray-500 mb-2">
                          残り{lesson.remaining}席 / 定員{lesson.capacity}名
                        </p>
                        <Link href={`/user/lessons/${lesson.id}`}>
                          <Button 
                            className="w-full md:w-auto" 
                            disabled={lesson.remaining <= 0}
                          >
                            {lesson.remaining > 0 ? '予約する' : '満席'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">条件に一致するレッスンが見つかりませんでした。</p>
            <p className="text-gray-500 mt-2">検索条件を変更してお試しください。</p>
          </div>
        )}
      </div>
    </div>
  );
}
