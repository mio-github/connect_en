'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

// 初期状態
const initialSalesData = [
  { month: '1月', revenue: 1250000 },
  { month: '2月', revenue: 1380000 },
  { month: '3月', revenue: 1420000 },
  { month: '4月', revenue: 1320000 },
  { month: '5月', revenue: 1480000 },
  { month: '6月', revenue: 1520000 },
];

const initialMemberData = [
  { month: '1月', new: 24, total: 320 },
  { month: '2月', new: 18, total: 335 },
  { month: '3月', new: 22, total: 354 },
  { month: '4月', new: 16, total: 368 },
  { month: '5月', new: 20, total: 385 },
  { month: '6月', new: 25, total: 406 },
];

const initialLessonData = [
  { name: '日常英会話（初級）', count: 156, attendance: 92 },
  { name: 'ビジネス英語', count: 124, attendance: 88 },
  { name: 'TOEIC対策', count: 98, attendance: 95 },
  { name: '英検対策', count: 76, attendance: 90 },
  { name: '日常英会話（中級）', count: 112, attendance: 86 },
];

// レッスン名マッピング
const lessonNameMap: {[key: string]: string} = {
  '1': '日常英会話（初級）',
  '2': 'ビジネス英語',
  '3': 'TOEIC対策',
  '4': '英検対策',
  '5': '日常英会話（中級）',
};

export default function ReportsPage() {
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-06-30');
  const [reportType, setReportType] = useState('all');
  
  const [salesData, setSalesData] = useState(initialSalesData);
  const [memberData, setMemberData] = useState(initialMemberData);
  const [lessonData, setLessonData] = useState(initialLessonData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // レポート出力処理（仮実装）
  const generateReport = () => {
    alert(`${startDate}から${endDate}までの${reportType}レポートを出力します`);
  };

  // データベースからデータを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // まずサンプルデータ初期化APIを呼び出し
        const response = await fetch('/api/init-data');
        
        if (!response.ok) {
          throw new Error('データの初期化に失敗しました');
        }
        
        const data = await response.json();
        
        if (data.success) {
          // 売上データの整形
          const formattedSalesData = data.data.salesData.map((item: any) => ({
            month: item.month,
            revenue: item.revenue
          }));
          
          // 会員データの整形
          const formattedMemberData = data.data.memberData.map((item: any) => ({
            month: item.month,
            new: item.newMembers,
            total: item.totalMembers
          }));
          
          // レッスンデータの整形
          const formattedLessonData = data.data.lessonData.map((item: any) => ({
            name: lessonNameMap[item.lessonId] || `レッスン ${item.lessonId}`,
            count: item.reservations,
            attendance: item.attendance
          }));
          
          setSalesData(formattedSalesData);
          setMemberData(formattedMemberData);
          setLessonData(formattedLessonData);
        } else {
          // 初期化に失敗した場合は初期データを使用
          setSalesData(initialSalesData);
          setMemberData(initialMemberData);
          setLessonData(initialLessonData);
          console.warn('データベースからのデータ取得に失敗しました。初期データを使用します。');
        }
      } catch (err) {
        setError('データの読み込みに失敗しました');
        console.error('データ取得エラー:', err);
        // エラー時は初期データを使用
        setSalesData(initialSalesData);
        setMemberData(initialMemberData);
        setLessonData(initialLessonData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">レポート</h1>
          <p className="text-gray-600">各種データのレポートを閲覧・出力できます。</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">共有</Button>
          <Button variant="primary" size="sm" onClick={generateReport}>レポート出力</Button>
        </div>
      </div>

      {/* 期間選択 */}
      <Card className="mb-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              type="date"
              label="期間（開始）"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input
              type="date"
              label="期間（終了）"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              レポートタイプ
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="all">すべて</option>
              <option value="sales">売上</option>
              <option value="members">会員動向</option>
              <option value="lessons">レッスン利用状況</option>
            </select>
          </div>
          <Button onClick={generateReport}>検索</Button>
        </div>
      </Card>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">データを読み込み中...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 売上レポート */}
            <Card title="売上レポート">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">月間売上推移</h4>
                <p className="text-sm text-gray-500">過去6ヶ月の売上データ</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">月</th>
                      <th className="px-4 py-2 text-right">売上</th>
                      <th className="px-4 py-2 text-right">前月比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((item, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="px-4 py-2">{item.month}</td>
                        <td className="px-4 py-2 text-right">¥{item.revenue.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right">
                          {index > 0 ? (
                            <span className={`${item.revenue > salesData[index - 1].revenue ? 'text-green-600' : 'text-red-600'}`}>
                              {Math.round((item.revenue / salesData[index - 1].revenue - 1) * 100)}%
                            </span>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* 会員動向レポート */}
            <Card title="会員動向">
              <div className="mb-4">
                <h4 className="text-lg font-semibold text-gray-800">会員数推移</h4>
                <p className="text-sm text-gray-500">過去6ヶ月の会員数および新規会員</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">月</th>
                      <th className="px-4 py-2 text-right">新規会員</th>
                      <th className="px-4 py-2 text-right">会員総数</th>
                      <th className="px-4 py-2 text-right">増減率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberData.map((item, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="px-4 py-2">{item.month}</td>
                        <td className="px-4 py-2 text-right">{item.new}人</td>
                        <td className="px-4 py-2 text-right">{item.total}人</td>
                        <td className="px-4 py-2 text-right">
                          {index > 0 ? (
                            <span className={`${item.total > memberData[index - 1].total ? 'text-green-600' : 'text-red-600'}`}>
                              {Math.round((item.total / memberData[index - 1].total - 1) * 100)}%
                            </span>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* レッスン利用状況 */}
          <Card title="レッスン利用状況">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-gray-800">レッスン別利用状況</h4>
              <p className="text-sm text-gray-500">最近6ヶ月のレッスン予約・出席状況</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">レッスン名</th>
                    <th className="px-4 py-2 text-right">予約数</th>
                    <th className="px-4 py-2 text-right">出席率</th>
                    <th className="px-4 py-2 text-right">人気度</th>
                  </tr>
                </thead>
                <tbody>
                  {lessonData.map((item, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2 text-right">{item.count}回</td>
                      <td className="px-4 py-2 text-right">{item.attendance}%</td>
                      <td className="px-4 py-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${(item.count / Math.max(...lessonData.map(d => d.count))) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </Layout>
  );
} 