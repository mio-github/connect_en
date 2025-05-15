'use client';

import React, { useState } from 'react';
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

// 仮データ
const SALES_DATA = [
  { date: '2023-05-01', amount: 120000 },
  { date: '2023-05-02', amount: 90000 },
  { date: '2023-05-03', amount: 150000 },
  { date: '2023-05-04', amount: 110000 },
  { date: '2023-05-05', amount: 130000 },
];
const MEMBER_DATA = [
  { date: '2023-05-01', new: 3, leave: 1, total: 120 },
  { date: '2023-05-02', new: 2, leave: 0, total: 122 },
  { date: '2023-05-03', new: 1, leave: 2, total: 121 },
  { date: '2023-05-04', new: 4, leave: 1, total: 124 },
  { date: '2023-05-05', new: 2, leave: 0, total: 126 },
];
const LESSON_DATA = [
  { date: '2023-05-01', count: 8, attendance: 60 },
  { date: '2023-05-02', count: 7, attendance: 55 },
  { date: '2023-05-03', count: 9, attendance: 70 },
  { date: '2023-05-04', count: 6, attendance: 48 },
  { date: '2023-05-05', count: 8, attendance: 62 },
];
const STAFF_DATA = [
  { date: '2023-05-01', working: 5, absent: 1 },
  { date: '2023-05-02', working: 6, absent: 0 },
  { date: '2023-05-03', working: 5, absent: 1 },
  { date: '2023-05-04', working: 6, absent: 0 },
  { date: '2023-05-05', working: 5, absent: 1 },
];
const STUDIO_DATA = [
  { date: '2023-05-01', usage: 7, available: 1 },
  { date: '2023-05-02', usage: 6, available: 2 },
  { date: '2023-05-03', usage: 8, available: 0 },
  { date: '2023-05-04', usage: 7, available: 1 },
  { date: '2023-05-05', usage: 7, available: 1 },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateFrom, setDateFrom] = useState('2023-05-01');
  const [dateTo, setDateTo] = useState('2023-05-05');

  // データ取得
  let data: any[] = [];
  switch (activeTab) {
    case 'sales':
      data = SALES_DATA;
      break;
    case 'members':
      data = MEMBER_DATA;
      break;
    case 'lessons':
      data = LESSON_DATA;
      break;
    case 'staff':
      data = STAFF_DATA;
      break;
    case 'studios':
      data = STUDIO_DATA;
      break;
    default:
      data = [];
  }

  // 表ヘッダー・内容
  const getTable = () => {
    switch (activeTab) {
      case 'sales':
        return (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">日付</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">売上金額</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data as typeof SALES_DATA).map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm">{row.date}</td>
                  <td className="px-4 py-3 text-right text-sm">¥{row.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'members':
        return (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">日付</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">新規入会</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">退会</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">会員数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data as typeof MEMBER_DATA).map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm">{row.date}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.new}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.leave}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'lessons':
        return (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">日付</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">レッスン数</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">受講者数</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data as typeof LESSON_DATA).map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm">{row.date}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.count}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.attendance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'staff':
        return (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">日付</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">出勤</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">欠勤</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data as typeof STAFF_DATA).map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm">{row.date}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.working}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.absent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case 'studios':
        return (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">日付</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">利用回数</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">空き</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data as typeof STUDIO_DATA).map((row, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm">{row.date}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.usage}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.available}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  // エクスポート処理（ダミー）
  const handleExport = () => {
    alert('CSVエクスポート機能（ダミー）');
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">レポート</h1>
          <p className="text-gray-600">各種データのレポートを閲覧・出力できます。</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="primary" onClick={handleExport}>CSVエクスポート</Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {REPORT_TABS.map(tab => (
            <button
              key={tab.value}
              className={`py-4 px-1 font-medium text-sm focus:outline-none ${
                activeTab === tab.value
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* フィルター */}
      <Card className="mb-6">
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">期間（開始）</label>
            <input
              type="date"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">期間（終了）</label>
            <input
              type="date"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">キーワード検索</label>
            <Input
              type="text"
              placeholder="会員名、レッスン名など"
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* レポートテーブル */}
      <Card title="レポートデータ">
        <div className="overflow-x-auto">
          {getTable()}
        </div>
      </Card>
    </Layout>
  );
} 