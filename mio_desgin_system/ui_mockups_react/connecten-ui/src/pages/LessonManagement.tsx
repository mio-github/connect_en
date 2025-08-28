import React, { useState } from 'react';
import { Button } from '../components/UI/Button';

interface Lesson {
  id: string;
  name: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  studio: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  maxCapacity: number;
  currentBookings: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

interface LessonSchedule {
  date: string;
  lessons: Lesson[];
}

export const LessonManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'templates' | 'instructors' | 'analysis'>('schedule');
  const [viewType, setViewType] = useState<'calendar' | 'list'>('calendar');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const sampleLessons: Lesson[] = [
    {
      id: '1',
      name: '初級バレエ',
      instructor: '山田花子',
      date: '2025-01-27',
      time: '10:00',
      duration: 90,
      studio: 'Studio A',
      category: 'バレエ',
      level: 'beginner',
      price: 3500,
      maxCapacity: 20,
      currentBookings: 18,
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'ヒップホップ中級',
      instructor: '佐藤健太',
      date: '2025-01-27',
      time: '14:00',
      duration: 60,
      studio: 'Studio B',
      category: 'ヒップホップ',
      level: 'intermediate',
      price: 4000,
      maxCapacity: 15,
      currentBookings: 12,
      status: 'scheduled'
    },
    {
      id: '3',
      name: 'ジャズダンス上級',
      instructor: '高橋真一',
      date: '2025-01-28',
      time: '19:00',
      duration: 90,
      studio: 'Studio A',
      category: 'ジャズ',
      level: 'advanced',
      price: 4500,
      maxCapacity: 18,
      currentBookings: 16,
      status: 'scheduled'
    },
    {
      id: '4',
      name: 'ヨガ&ストレッチ',
      instructor: '鈴木美咲',
      date: '2025-01-29',
      time: '09:00',
      duration: 60,
      studio: 'Studio C',
      category: 'ヨガ',
      level: 'beginner',
      price: 3000,
      maxCapacity: 12,
      currentBookings: 8,
      status: 'scheduled'
    },
    {
      id: '5',
      name: 'K-POPダンス',
      instructor: '田中優子',
      date: '2025-01-30',
      time: '16:00',
      duration: 75,
      studio: 'Studio B',
      category: 'K-POP',
      level: 'intermediate',
      price: 3800,
      maxCapacity: 16,
      currentBookings: 14,
      status: 'scheduled'
    },
    {
      id: '6',
      name: 'キッズバレエ',
      instructor: '山田花子',
      date: '2025-01-31',
      time: '15:00',
      duration: 45,
      studio: 'Studio A',
      category: 'バレエ',
      level: 'beginner',
      price: 2500,
      maxCapacity: 10,
      currentBookings: 9,
      status: 'scheduled'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      scheduled: { label: '予定', className: 'bg-blue-100 text-blue-800' },
      ongoing: { label: '進行中', className: 'bg-green-100 text-green-800' },
      completed: { label: '完了', className: 'bg-gray-100 text-gray-800' },
      cancelled: { label: 'キャンセル', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      beginner: { label: '初級', className: 'bg-green-100 text-green-800' },
      intermediate: { label: '中級', className: 'bg-yellow-100 text-yellow-800' },
      advanced: { label: '上級', className: 'bg-red-100 text-red-800' }
    };
    
    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.beginner;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const getCapacityStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  // カレンダー関連の関数
  const getWeekDays = (startDate: Date) => {
    const days = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // 週の始まり（日曜日）に設定
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getLessonsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return sampleLessons.filter(lesson => lesson.date === dateString);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' });
  };

  const formatWeekDay = (date: Date) => {
    return date.toLocaleDateString('ja-JP', { weekday: 'short' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() - 7);
    setCurrentWeek(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + 7);
    setCurrentWeek(newWeek);
  };

  const weekDays = getWeekDays(currentWeek);

  return (
    <div className="lesson-management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">レッスン管理</h1>
          <p className="text-gray-600 mt-1">スケジュール・講師・クラスの総合管理</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewType('calendar')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'calendar'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              カレンダー
            </button>
            <button
              onClick={() => setViewType('list')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewType === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              リスト
            </button>
          </div>
          <Button variant="secondary">
            <i className="fas fa-download mr-2"></i>
            スケジュール出力
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus mr-2"></i>
            新規レッスン作成
          </Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { key: 'schedule', label: 'スケジュール管理', icon: 'fas fa-calendar-alt' },
            { key: 'templates', label: 'レッスンテンプレート', icon: 'fas fa-copy' },
            { key: 'instructors', label: '講師割り当て', icon: 'fas fa-user-tie' },
            { key: 'analysis', label: '稼働分析', icon: 'fas fa-chart-line' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* スケジュール管理タブ */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {viewType === 'calendar' ? (
            // カレンダービュー
            <div className="space-y-4">
              {/* 週間ナビゲーション */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={goToPreviousWeek}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {currentWeek.getFullYear()}年 {currentWeek.getMonth() + 1}月
                    </h3>
                    <button
                      onClick={goToNextWeek}
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">全カテゴリ</option>
                      <option value="ballet">バレエ</option>
                      <option value="jazz">ジャズ</option>
                      <option value="hiphop">ヒップホップ</option>
                      <option value="yoga">ヨガ</option>
                    </select>
                  </div>
                </div>

                {/* 週間カレンダー */}
                <div className="grid grid-cols-7 gap-1">
                  {weekDays.map((day, index) => (
                    <div key={index} className="min-h-[200px]">
                      {/* 日付ヘッダー */}
                      <div className={`p-2 text-center border-b ${
                        isToday(day) 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="text-xs text-gray-500 font-medium">
                          {formatWeekDay(day)}
                        </div>
                        <div className={`text-sm font-semibold ${
                          isToday(day) ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {formatDate(day)}
                        </div>
                      </div>

                      {/* レッスン一覧 */}
                      <div className="p-1 space-y-1 bg-gray-50 min-h-[160px]">
                        {getLessonsForDate(day).map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                              lesson.category === 'バレエ' ? 'bg-pink-100 border border-pink-200 hover:bg-pink-150' :
                              lesson.category === 'ジャズ' ? 'bg-purple-100 border border-purple-200 hover:bg-purple-150' :
                              lesson.category === 'ヒップホップ' ? 'bg-orange-100 border border-orange-200 hover:bg-orange-150' :
                              lesson.category === 'K-POP' ? 'bg-red-100 border border-red-200 hover:bg-red-150' :
                              lesson.category === 'ヨガ' ? 'bg-green-100 border border-green-200 hover:bg-green-150' :
                              'bg-blue-100 border border-blue-200 hover:bg-blue-150'
                            }`}
                            onClick={() => {/* レッスン詳細を開く */}}
                          >
                            <div className="font-medium text-gray-900 truncate">
                              {lesson.name}
                            </div>
                            <div className="text-gray-600 mt-1">
                              {lesson.time} ({lesson.duration}分)
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-gray-500 text-xs">{lesson.instructor}</span>
                              <span className={`text-xs font-medium ${getCapacityStatus(lesson.currentBookings, lesson.maxCapacity)}`}>
                                {lesson.currentBookings}/{lesson.maxCapacity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // リストビュー
            <div className="space-y-6">
              {/* 日付選択とフィルター */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">日付選択</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">全て</option>
                      <option value="ballet">バレエ</option>
                      <option value="jazz">ジャズ</option>
                      <option value="hiphop">ヒップホップ</option>
                      <option value="yoga">ヨガ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">講師</label>
                    <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">全て</option>
                      <option value="yamada">山田花子</option>
                      <option value="sato">佐藤健太</option>
                      <option value="takahashi">高橋真一</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* レッスンカード */}
              <div className="grid gap-4">
                {sampleLessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{lesson.name}</h3>
                          {getLevelBadge(lesson.level)}
                          {getStatusBadge(lesson.status)}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <i className="fas fa-clock"></i>
                            {lesson.time} ({lesson.duration}分)
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-user-tie"></i>
                            {lesson.instructor}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-map-marker-alt"></i>
                            {lesson.studio}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="fas fa-tag"></i>
                            {lesson.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getCapacityStatus(lesson.currentBookings, lesson.maxCapacity)}`}>
                            {lesson.currentBookings}/{lesson.maxCapacity}名
                          </div>
                          <div className="text-xs text-gray-500">
                            稼働率 {Math.round((lesson.currentBookings / lesson.maxCapacity) * 100)}%
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button variant="secondary" size="sm">
                            <i className="fas fa-users"></i>
                          </Button>
                          <Button variant="secondary" size="sm">
                            <i className="fas fa-copy"></i>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* 予約状況バー */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>予約状況</span>
                        <span>{lesson.currentBookings}/{lesson.maxCapacity}名</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (lesson.currentBookings / lesson.maxCapacity) * 100 >= 90
                              ? 'bg-red-500'
                              : (lesson.currentBookings / lesson.maxCapacity) * 100 >= 70
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${(lesson.currentBookings / lesson.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 他のタブのプレースホルダー */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-copy text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">レッスンテンプレート管理</h3>
          <p className="text-gray-600">レッスンテンプレートの作成・編集機能を実装予定</p>
        </div>
      )}

      {activeTab === 'instructors' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-user-tie text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">講師割り当て管理</h3>
          <p className="text-gray-600">講師のスケジュール管理と割り当て機能を実装予定</p>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-chart-line text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">稼働分析</h3>
          <p className="text-gray-600">レッスン稼働率とパフォーマンス分析機能を実装予定</p>
        </div>
      )}

      {/* 新規レッスン作成モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">新規レッスン作成</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">レッスン名</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="レッスン名を入力"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">カテゴリ</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">選択してください</option>
                      <option value="ballet">バレエ</option>
                      <option value="jazz">ジャズ</option>
                      <option value="hiphop">ヒップホップ</option>
                      <option value="yoga">ヨガ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">レベル</label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">選択してください</option>
                      <option value="beginner">初級</option>
                      <option value="intermediate">中級</option>
                      <option value="advanced">上級</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                キャンセル
              </Button>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                レッスンを作成
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};