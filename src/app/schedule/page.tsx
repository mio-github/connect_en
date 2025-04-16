'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';

// 仮データ - lessons.pageからコピー
const LESSONS = [
  { id: 1, name: 'バレエ入門', teacher: '山田先生', day: '月', time: '10:00-11:00', capacity: 20, status: '公開', studio: 'スタジオA' },
  { id: 2, name: 'ジャズダンス中級', teacher: '鈴木先生', day: '水', time: '13:00-14:30', capacity: 15, status: '非公開', studio: 'スタジオB' },
  { id: 3, name: 'ヒップホップ初級', teacher: '佐藤先生', day: '金', time: '18:00-19:00', capacity: 25, status: '公開', studio: 'スタジオA' },
  { id: 4, name: 'コンテンポラリー', teacher: '田中先生', day: '火', time: '15:30-17:00', capacity: 18, status: '公開', studio: 'スタジオB' },
  { id: 5, name: 'バレエ中級', teacher: '山田先生', day: '木', time: '10:00-11:30', capacity: 15, status: '公開', studio: 'スタジオA' },
  { id: 6, name: 'ブレイクダンス', teacher: '高橋先生', day: '土', time: '14:00-15:30', capacity: 20, status: '公開', studio: 'スタジオB' },
  { id: 7, name: 'ストリートダンス', teacher: '伊藤先生', day: '日', time: '13:00-14:00', capacity: 22, status: '公開', studio: 'スタジオA' },
];

// 曜日の配列
const DAYS_OF_WEEK = ['月', '火', '水', '木', '金', '土', '日'];

// 時間帯の配列（表示用）
const TIME_SLOTS = [
  '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');
  const [selectedDay, setSelectedDay] = useState<string>('月');
  const [currentWeek, setCurrentWeek] = useState<number>(0); // 0 = 今週, 1 = 来週, -1 = 先週

  // 選択された曜日またはすべての曜日のレッスンをフィルタリング
  const filteredLessons = viewMode === 'day' 
    ? LESSONS.filter(lesson => lesson.day === selectedDay)
    : LESSONS;

  // レッスンの時間から開始時間を取得する関数
  const getStartTime = (timeRange: string): string => {
    return timeRange.split('-')[0];
  };

  // 曜日に基づいてレッスンをグループ化
  const getLessonsByDay = (day: string) => {
    return LESSONS.filter(lesson => lesson.day === day);
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">スケジュール</h1>
          <p className="text-gray-600">レッスンやイベントのスケジュールを管理します。</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'day' ? 'primary' : 'outline'} 
            onClick={() => setViewMode('day')}
          >
            日別
          </Button>
          <Button 
            variant={viewMode === 'week' ? 'primary' : 'outline'} 
            onClick={() => setViewMode('week')}
          >
            週別
          </Button>
        </div>
      </div>

      {/* 日付/週セレクター */}
      <Card className="mb-6">
        <div className="flex justify-between items-center p-2">
          <Button variant="outline" onClick={() => viewMode === 'week' ? setCurrentWeek(prev => prev - 1) : setSelectedDay(prev => {
            const currentIndex = DAYS_OF_WEEK.indexOf(prev);
            return currentIndex > 0 ? DAYS_OF_WEEK[currentIndex - 1] : DAYS_OF_WEEK[DAYS_OF_WEEK.length - 1];
          })}>
            ＜ 前へ
          </Button>
          
          <div className="font-medium text-lg">
            {viewMode === 'week' ? 
              `${currentWeek === 0 ? '今週' : currentWeek === 1 ? '来週' : '先週'}のスケジュール` : 
              `${selectedDay}曜日のスケジュール`
            }
          </div>
          
          <Button variant="outline" onClick={() => viewMode === 'week' ? setCurrentWeek(prev => prev + 1) : setSelectedDay(prev => {
            const currentIndex = DAYS_OF_WEEK.indexOf(prev);
            return currentIndex < DAYS_OF_WEEK.length - 1 ? DAYS_OF_WEEK[currentIndex + 1] : DAYS_OF_WEEK[0];
          })}>
            次へ ＞
          </Button>
        </div>

        {viewMode === 'day' && (
          <div className="flex justify-center mt-2 space-x-1">
            {DAYS_OF_WEEK.map(day => (
              <Button 
                key={day}
                size="sm"
                variant={day === selectedDay ? 'primary' : 'outline'}
                onClick={() => setSelectedDay(day)}
                className="min-w-10"
              >
                {day}
              </Button>
            ))}
          </div>
        )}
      </Card>

      {/* 日別表示 */}
      {viewMode === 'day' && (
        <div className="space-y-4">
          {TIME_SLOTS.map(timeSlot => {
            const lessonsAtTime = filteredLessons.filter(lesson => getStartTime(lesson.time) === timeSlot);
            
            if (lessonsAtTime.length === 0) {
              return (
                <div key={timeSlot} className="flex items-center p-2 hover:bg-gray-50 rounded border border-gray-100">
                  <div className="w-16 text-center">
                    <div className="text-sm font-medium">{timeSlot}</div>
                  </div>
                  <div className="flex-1 ml-4 p-2 text-gray-400 text-sm">
                    予定なし
                  </div>
                </div>
              );
            }
            
            return lessonsAtTime.map(lesson => (
              <div key={`${timeSlot}-${lesson.id}`} className="flex items-center p-2 hover:bg-gray-50 rounded border border-gray-100">
                <div className="w-16 text-center">
                  <div className="text-sm font-medium">{timeSlot}</div>
                </div>
                <div className={`flex-1 ml-4 p-2 rounded ${lesson.studio === 'スタジオA' ? 'bg-primary-light' : 'bg-secondary-light'}`}>
                  <div className="font-medium">{lesson.name}</div>
                  <div className="text-sm text-gray-600">{lesson.studio} - {lesson.teacher}</div>
                  <div className="text-xs text-gray-500">{lesson.time} · 定員: {lesson.capacity}名</div>
                </div>
                <div className="ml-2">
                  <Button size="sm" variant="outline" className="ml-2">詳細</Button>
                </div>
              </div>
            ));
          })}
        </div>
      )}

      {/* 週別表示 */}
      {viewMode === 'week' && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-left text-sm font-medium text-gray-600 w-20">時間</th>
                {DAYS_OF_WEEK.map(day => (
                  <th key={day} className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                    {day}曜日
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {TIME_SLOTS.map(timeSlot => (
                <tr key={timeSlot} className="hover:bg-gray-50">
                  <td className="px-2 py-3 text-sm font-medium text-gray-500 text-center border-r border-gray-100">
                    {timeSlot}
                  </td>
                  {DAYS_OF_WEEK.map(day => {
                    const dayLessons = getLessonsByDay(day).filter(lesson => getStartTime(lesson.time) === timeSlot);
                    
                    return (
                      <td key={`${day}-${timeSlot}`} className="px-2 py-2 text-sm border border-gray-100">
                        {dayLessons.length > 0 ? (
                          dayLessons.map(lesson => (
                            <div key={lesson.id} className={`p-1 rounded my-1 ${lesson.studio === 'スタジオA' ? 'bg-primary-light' : 'bg-secondary-light'}`}>
                              <div className="font-medium text-xs">{lesson.name}</div>
                              <div className="text-xs">{lesson.studio}</div>
                              <div className="text-[10px] text-gray-500">{lesson.teacher}</div>
                            </div>
                          ))
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
} 