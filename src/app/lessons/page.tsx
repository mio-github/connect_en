'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/common/Button';

// 仮データ
const LESSONS = [
  { id: 1, name: 'バレエ入門', teacher: '山田先生', day: '月', time: '10:00-11:00', capacity: 20, status: '公開' },
  { id: 2, name: 'ジャズダンス中級', teacher: '鈴木先生', day: '水', time: '13:00-14:30', capacity: 15, status: '非公開' },
  { id: 3, name: 'ヒップホップ初級', teacher: '佐藤先生', day: '金', time: '18:00-19:00', capacity: 25, status: '公開' },
];

export default function LessonsPage() {
  const [search, setSearch] = useState('');
  const [lessons, setLessons] = useState(LESSONS);

  // 検索フィルター
  const filtered = lessons.filter(l =>
    l.name.includes(search) || l.teacher.includes(search)
  );

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">レッスン管理</h1>
          <p className="text-gray-600">レッスンの一覧・登録・編集・削除ができます。</p>
        </div>
        <Button className="btn-primary" onClick={() => alert('新規作成ダイアログ')}>＋ 新規レッスン作成</Button>
      </div>
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
        <input
          type="text"
          className="input w-full md:w-64"
          placeholder="レッスン名・講師で検索"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">レッスン名</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">講師</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">曜日</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">時間</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">定員</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ステータス</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">アクション</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">該当するレッスンがありません</td>
              </tr>
            ) : (
              filtered.map(lesson => (
                <tr key={lesson.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{lesson.name}</td>
                  <td className="px-4 py-3 text-sm">{lesson.teacher}</td>
                  <td className="px-4 py-3 text-sm">{lesson.day}</td>
                  <td className="px-4 py-3 text-sm">{lesson.time}</td>
                  <td className="px-4 py-3 text-sm">{lesson.capacity}</td>
                  <td className="px-4 py-3 text-sm">{lesson.status}</td>
                  <td className="px-4 py-3 text-right text-sm flex gap-2 justify-end">
                    <Button size="sm" className="btn-secondary" onClick={() => alert('編集')}>編集</Button>
                    <Button size="sm" variant="outline" onClick={() => alert('削除')}>削除</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* ページネーション（ダミー） */}
      <div className="mt-4 flex justify-end">
        <Button size="sm" variant="outline" className="mr-2">前へ</Button>
        <span className="text-sm text-gray-600 px-2">1 / 1</span>
        <Button size="sm" variant="outline">次へ</Button>
      </div>
    </Layout>
  );
} 