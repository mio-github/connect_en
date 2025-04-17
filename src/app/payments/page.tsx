'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

// 仮データ - 売上データ
const PAYMENT_DATA = [
  { id: 1, date: '2023-05-01', type: 'レッスン料', member: '田中 花子', amount: 5000, method: 'クレジットカード', status: '完了' },
  { id: 2, date: '2023-05-01', type: '会員費', member: '佐藤 健太', amount: 10000, method: '銀行振込', status: '完了' },
  { id: 3, date: '2023-05-02', type: '物販', member: '鈴木 美咲', amount: 3500, method: '現金', status: '完了' },
  { id: 4, date: '2023-05-03', type: 'レッスン料', member: '高橋 涼子', amount: 5000, method: 'クレジットカード', status: '完了' },
  { id: 5, date: '2023-05-04', type: '会員費', member: '伊藤 大輔', amount: 10000, method: '銀行振込', status: '未払い' },
  { id: 6, date: '2023-05-05', type: 'イベント参加費', member: '山本 真司', amount: 15000, method: 'クレジットカード', status: '完了' },
  { id: 7, date: '2023-05-06', type: 'レッスン料', member: '中村 瞳', amount: 5000, method: '現金', status: '完了' },
  { id: 8, date: '2023-05-07', type: '物販', member: '小林 健太', amount: 2500, method: 'クレジットカード', status: '完了' },
  { id: 9, date: '2023-05-08', type: 'レッスン料', member: '加藤 美咲', amount: 5000, method: 'クレジットカード', status: '完了' },
  { id: 10, date: '2023-05-09', type: '会員費', member: '吉田 拓也', amount: 10000, method: '銀行振込', status: '未払い' },
];

// 期間オプション
const PERIOD_OPTIONS = [
  { label: '今日', value: 'today' },
  { label: '昨日', value: 'yesterday' },
  { label: '今週', value: 'this-week' },
  { label: '先週', value: 'last-week' },
  { label: '今月', value: 'this-month' },
  { label: '先月', value: 'last-month' },
  { label: 'カスタム', value: 'custom' },
];

// 支払い方法オプション
const PAYMENT_METHODS = [
  { label: 'すべて', value: 'all' },
  { label: 'クレジットカード', value: 'credit-card' },
  { label: '銀行振込', value: 'bank-transfer' },
  { label: '現金', value: 'cash' },
];

// 支払い状態オプション
const PAYMENT_STATUS = [
  { label: 'すべて', value: 'all' },
  { label: '完了', value: 'completed' },
  { label: '未払い', value: 'unpaid' },
];

// 売上カテゴリオプション
const REVENUE_CATEGORIES = [
  { label: 'すべて', value: 'all' },
  { label: 'レッスン料', value: 'lesson' },
  { label: '会員費', value: 'membership' },
  { label: '物販', value: 'goods' },
  { label: 'イベント参加費', value: 'event' },
];

export default function PaymentsPage() {
  const [period, setPeriod] = useState<string>('this-month');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('all');
  const [paymentStatus, setPaymentStatus] = useState<string>('all');
  const [revenueCategory, setRevenueCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 検索とフィルタリングの適用
  const filteredPayments = PAYMENT_DATA
    .filter(payment => {
      // 支払い方法フィルター
      if (paymentMethod !== 'all') {
        const methodMap: { [key: string]: string } = {
          'credit-card': 'クレジットカード',
          'bank-transfer': '銀行振込',
          'cash': '現金'
        };
        if (payment.method !== methodMap[paymentMethod]) return false;
      }

      // 支払い状態フィルター
      if (paymentStatus !== 'all') {
        const statusMap: { [key: string]: string } = {
          'completed': '完了',
          'unpaid': '未払い'
        };
        if (payment.status !== statusMap[paymentStatus]) return false;
      }

      // 売上カテゴリフィルター
      if (revenueCategory !== 'all') {
        const categoryMap: { [key: string]: string } = {
          'lesson': 'レッスン料',
          'membership': '会員費',
          'goods': '物販',
          'event': 'イベント参加費'
        };
        if (payment.type !== categoryMap[revenueCategory]) return false;
      }

      // 検索クエリ
      if (searchTerm) {
        return (
          payment.member.includes(searchTerm) ||
          payment.type.includes(searchTerm) ||
          payment.amount.toString().includes(searchTerm)
        );
      }

      return true;
    });

  // 合計金額を集計
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // 種類別の金額を集計
  const revenueByType = filteredPayments.reduce((acc: { [key: string]: number }, payment) => {
    if (!acc[payment.type]) {
      acc[payment.type] = 0;
    }
    acc[payment.type] += payment.amount;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">売上管理</h1>
          <p className="text-gray-600">売上データの確認・集計・分析ができます。</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="primary">レポート出力</Button>
          <Button variant="outline">新規売上登録</Button>
        </div>
      </div>

      {/* 期間とフィルターセクション */}
      <Card className="mb-6">
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">期間</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {PERIOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {period === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">開始日</label>
                <input
                  type="date"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">終了日</label>
                <input
                  type="date"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">検索</label>
            <Input
              type="text"
              placeholder="会員名、金額など"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">支払い方法</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {PAYMENT_METHODS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">支払い状態</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              {PAYMENT_STATUS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">売上カテゴリ</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={revenueCategory}
              onChange={(e) => setRevenueCategory(e.target.value)}
            >
              {REVENUE_CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* サマリーセクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">総売上（フィルター適用済み）</div>
            <div className="text-3xl font-extrabold text-[#ff9800]">¥{totalRevenue.toLocaleString()}</div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">平均売上/日</div>
            <div className="text-3xl font-extrabold text-[#ff9800]">¥{Math.floor(totalRevenue / 7).toLocaleString()}</div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">トランザクション数</div>
            <div className="text-3xl font-extrabold text-[#ff9800]">{filteredPayments.length}</div>
          </div>
        </Card>
      </div>

      {/* カテゴリ別売上内訳 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card title="カテゴリ別売上内訳" className="md:col-span-2">
          {Object.entries(revenueByType).length > 0 ? (
            <div className="space-y-4 p-2">
              {Object.entries(revenueByType).map(([type, amount]) => (
                <div key={type} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-3.5 h-3.5 rounded-full mr-2 ${
                      type === 'レッスン料' ? 'bg-blue-500' :
                      type === '会員費' ? 'bg-green-500' :
                      type === '物販' ? 'bg-purple-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <div className="text-sm">{type}</div>
                  </div>
                  <div className="font-medium">¥{amount.toLocaleString()}</div>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between items-center">
                <div className="font-medium">合計</div>
                <div className="font-bold text-lg">¥{totalRevenue.toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              該当するデータがありません
            </div>
          )}
        </Card>

        <Card title="支払い方法別割合">
          <div className="p-4 space-y-4">
            <div className="h-40 flex items-center justify-center">
              <div className="text-center text-gray-500">
                グラフコンポーネントが必要です
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <div className="text-xs">クレジットカード</div>
                </div>
                <div className="text-xs font-medium">52%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="text-xs">銀行振込</div>
                </div>
                <div className="text-xs font-medium">30%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <div className="text-xs">現金</div>
                </div>
                <div className="text-xs font-medium">18%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 売上リスト */}
      <Card title="売上一覧" className="mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">日付</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">カテゴリ</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">会員名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">金額</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">支払方法</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">状態</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-gray-400">該当する売上データがありません</td>
                </tr>
              ) : (
                filteredPayments.map(payment => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{payment.date}</td>
                    <td className="px-4 py-3 text-sm">{payment.type}</td>
                    <td className="px-4 py-3 text-sm">{payment.member}</td>
                    <td className="px-4 py-3 text-sm font-medium">¥{payment.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{payment.method}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.status === '完了' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm flex gap-2 justify-end">
                      <Button size="sm" className="btn-secondary" onClick={() => alert('編集')}>編集</Button>
                      <Button size="sm" variant="outline" onClick={() => alert('明細')}>明細</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ページネーション */}
      <div className="mt-4 flex justify-end">
        <Button size="sm" variant="outline" className="mr-2">前へ</Button>
        <span className="text-sm text-gray-600 px-2">1 / 1</span>
        <Button size="sm" variant="outline">次へ</Button>
      </div>
    </Layout>
  );
} 