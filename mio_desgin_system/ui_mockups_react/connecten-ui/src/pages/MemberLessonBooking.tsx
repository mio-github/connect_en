import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star, ChevronRight, Filter, Search } from 'lucide-react';

interface Lesson {
  id: string;
  name: string;
  nameEn: string;
  instructor: string;
  studio: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  level: string;
  price: number;
  isOnline: boolean;
  rating: number;
}

const mockLessons: Lesson[] = [
  {
    id: '1',
    name: 'ヒップホップ初級',
    nameEn: 'Hip Hop Beginner',
    instructor: '佐藤先生',
    studio: '渋谷スタジオA',
    time: '19:00-20:00',
    duration: 60,
    capacity: 15,
    enrolled: 12,
    level: '初級',
    price: 2500,
    isOnline: false,
    rating: 4.8
  },
  {
    id: '2',
    name: 'ジャズダンス中級',
    nameEn: 'Jazz Dance Intermediate',
    instructor: '田中先生',
    studio: '横浜スタジオB',
    time: '20:15-21:30',
    duration: 75,
    capacity: 12,
    enrolled: 8,
    level: '中級',
    price: 3000,
    isOnline: false,
    rating: 4.9
  },
  {
    id: '3',
    name: 'オンライン バレエ基礎',
    nameEn: 'Online Ballet Basics',
    instructor: '鈴木先生',
    studio: 'オンライン',
    time: '18:30-19:30',
    duration: 60,
    capacity: 20,
    enrolled: 15,
    level: '初級',
    price: 2000,
    isOnline: true,
    rating: 4.7
  }
];

export const MemberLessonBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStudio, setSelectedStudio] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLessons = mockLessons.filter(lesson => {
    if (selectedStudio !== 'all' && !lesson.studio.includes(selectedStudio)) return false;
    if (selectedLevel !== 'all' && lesson.level !== selectedLevel) return false;
    if (searchTerm && !lesson.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !lesson.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="bg-pink-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">レッスン予約</h1>
        <p className="text-pink-100">Lesson Booking</p>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* 日付選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日付 / Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* スタジオ選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              スタジオ / Studio
            </label>
            <select
              value={selectedStudio}
              onChange={(e) => setSelectedStudio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">全てのスタジオ</option>
              <option value="渋谷">渋谷スタジオ</option>
              <option value="横浜">横浜スタジオ</option>
              <option value="オンライン">オンライン</option>
            </select>
          </div>

          {/* レベル選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              レベル / Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">全レベル</option>
              <option value="初級">初級</option>
              <option value="中級">中級</option>
              <option value="上級">上級</option>
            </select>
          </div>

          {/* 検索 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              検索 / Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="レッスン名で検索"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* レッスン一覧 */}
      <div className="grid gap-4">
        {filteredLessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{lesson.name}</h3>
                    <span className="text-sm text-gray-500">{lesson.nameEn}</span>
                    {lesson.isOnline && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        オンライン
                      </span>
                    )}
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {lesson.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>{lesson.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span>{lesson.studio}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>{lesson.enrolled}/{lesson.capacity}名</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{lesson.rating}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      講師: <span className="font-medium text-gray-900">{lesson.instructor}</span>
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      ¥{lesson.price.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex flex-col space-y-2">
                  <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center space-x-2">
                    <span>予約する</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  
                  <div className="text-center">
                    {lesson.capacity - lesson.enrolled > 0 ? (
                      <span className="text-xs text-green-600">
                        残り{lesson.capacity - lesson.enrolled}枠
                      </span>
                    ) : (
                      <span className="text-xs text-red-600">
                        キャンセル待ち
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* レッスンがない場合 */}
      {filteredLessons.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <Calendar className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            該当するレッスンが見つかりません
          </h3>
          <p className="text-gray-600 mb-4">
            検索条件を変更してお試しください
          </p>
          <button
            onClick={() => {
              setSelectedStudio('all');
              setSelectedLevel('all');
              setSearchTerm('');
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            フィルターをリセット
          </button>
        </div>
      )}
    </div>
  );
};