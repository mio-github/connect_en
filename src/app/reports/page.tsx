'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const REPORT_TABS = [
  { label: '売上', value: 'sales' },
  { label: '会員', value: 'members' },
  { label: 'レッスン', value: 'lessons' },
  { label: 'スタッフ', value: 'staff' },
  { label: 'スタジオ利用', value: 'studios' },
];

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
  { name: 'ヒップホップ（初級）', count: 156, attendance: 92 },
  { name: 'ジャズダンス', count: 124, attendance: 88 },
  { name: 'バレエ', count: 98, attendance: 95 },
  { name: 'ロックダンス', count: 76, attendance: 90 },
  { name: 'ヒップホップ（中級）', count: 112, attendance: 86 },
];

// レッスン名マッピング
const lessonNameMap: {[key: string]: string} = {
  '1': 'ヒップホップ（初級）',
  '2': 'ジャズダンス',
  '3': 'バレエ',
  '4': 'ロックダンス',
  '5': 'ヒップホップ（中級）',
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState({ start: '2023-05-01', end: '2023-05-31' });
  const [startDate, setStartDate] = useState('2023-01-01');
  const [endDate, setEndDate] = useState('2023-06-30');
  const [reportType, setReportType] = useState('all');
  
  const [salesData, setSalesData] = useState(initialSalesData);
  const [memberData, setMemberData] = useState(initialMemberData);
  const [lessonData, setLessonData] = useState(initialLessonData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // レポート出力処理（仮実装）
  const generateReport = () => {
    alert(`${startDate}から${endDate}までの${reportType}レポートを出力します`);
  };

  // データベースからデータを取得（オプショナル - APIが存在する場合のみ実行）
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // APIエンドポイントが存在するか確認
        const response = await fetch('/api/init-data');
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.success) {
            // 売上データの整形
            const formattedSalesData = data.data.salesData?.map((item: any) => ({
              month: item.month,
              revenue: item.revenue
            })) || initialSalesData;
            
            // 会員データの整形
            const formattedMemberData = data.data.memberData?.map((item: any) => ({
              month: item.month,
              new: item.newMembers,
              total: item.totalMembers
            })) || initialMemberData;
            
            // レッスンデータの整形
            const formattedLessonData = data.data.lessonData?.map((item: any) => ({
              name: lessonNameMap[item.lessonId] || `レッスン ${item.lessonId}`,
              count: item.reservations,
              attendance: item.attendance
            })) || initialLessonData;
            
            setSalesData(formattedSalesData);
            setMemberData(formattedMemberData);
            setLessonData(formattedLessonData);
          }
        }
      } catch (err) {
        // APIが存在しない場合は初期データを使用
        console.log('Using initial data');
      } finally {
        setIsLoading(false);
      }
    };

    // APIの存在確認をしてからデータ取得
    fetchData();
  }, []);

  const getTableContent = () => {
    switch (activeTab) {
      case 'sales':
        return (
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
        );
      case 'members':
        return (
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
        );
      case 'lessons':
        return (
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
        );
      case 'staff':
        return (
          <div className="text-center py-8 text-gray-500">
            スタッフレポートは準備中です
          </div>
        );
      case 'studios':
        return (
          <div className="text-center py-8 text-gray-500">
            スタジオ利用レポートは準備中です
          </div>
        );
      default:
        return null;
    }
  };

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

      {/* タブ */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {REPORT_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`
                  py-2 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.value
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* レポートテーブル */}
      <Card title={`${REPORT_TABS.find(t => t.value === activeTab)?.label}レポート`}>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">データを読み込み中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          getTableContent()
        )}
      </Card>
    </Layout>
  );
}