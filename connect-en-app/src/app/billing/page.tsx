'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

// 仮データ - 請求データ
const INVOICE_DATA = [
  { id: 1, invoiceNumber: 'INV-2023-001', date: '2023-05-01', dueDate: '2023-05-15', member: '田中 花子', amount: 15000, paid: 15000, status: '支払済', method: 'クレジットカード' },
  { id: 2, invoiceNumber: 'INV-2023-002', date: '2023-05-05', dueDate: '2023-05-20', member: '佐藤 健太', amount: 10000, paid: 10000, status: '支払済', method: '銀行振込' },
  { id: 3, invoiceNumber: 'INV-2023-003', date: '2023-05-10', dueDate: '2023-05-25', member: '鈴木 美咲', amount: 8500, paid: 0, status: '未払い', method: '未定' },
  { id: 4, invoiceNumber: 'INV-2023-004', date: '2023-05-15', dueDate: '2023-05-30', member: '高橋 涼子', amount: 12000, paid: 5000, status: '一部支払い', method: 'クレジットカード' },
  { id: 5, invoiceNumber: 'INV-2023-005', date: '2023-05-20', dueDate: '2023-06-05', member: '伊藤 大輔', amount: 20000, paid: 0, status: '未払い', method: '未定' },
  { id: 6, invoiceNumber: 'INV-2023-006', date: '2023-05-25', dueDate: '2023-06-10', member: '山本 真司', amount: 15000, paid: 15000, status: '支払済', method: 'クレジットカード' },
  { id: 7, invoiceNumber: 'INV-2023-007', date: '2023-06-01', dueDate: '2023-06-15', member: '中村 瞳', amount: 9000, paid: 9000, status: '支払済', method: '現金' },
  { id: 8, invoiceNumber: 'INV-2023-008', date: '2023-06-05', dueDate: '2023-06-20', member: '小林 健太', amount: 7500, paid: 0, status: '未払い', method: '未定' },
  { id: 9, invoiceNumber: 'INV-2023-009', date: '2023-06-10', dueDate: '2023-06-25', member: '加藤 美咲', amount: 13000, paid: 5000, status: '一部支払い', method: 'クレジットカード' },
  { id: 10, invoiceNumber: 'INV-2023-010', date: '2023-06-15', dueDate: '2023-06-30', member: '吉田 拓也', amount: 18000, paid: 0, status: '未払い', method: '未定' },
];

// 期間オプション
const PERIOD_OPTIONS = [
  { label: '全期間', value: 'all' },
  { label: '今月', value: 'this-month' },
  { label: '先月', value: 'last-month' },
  { label: '今四半期', value: 'this-quarter' },
  { label: '未払いのみ', value: 'unpaid' },
  { label: '期限超過', value: 'overdue' },
  { label: 'カスタム', value: 'custom' },
];

// 請求ステータスオプション
const INVOICE_STATUS = [
  { label: 'すべて', value: 'all' },
  { label: '支払済', value: 'paid' },
  { label: '一部支払い', value: 'partial' },
  { label: '未払い', value: 'unpaid' },
  { label: '期限超過', value: 'overdue' },
];

// 支払い方法オプション
const PAYMENT_METHODS = [
  { label: 'すべて', value: 'all' },
  { label: 'クレジットカード', value: 'credit-card' },
  { label: '銀行振込', value: 'bank-transfer' },
  { label: '現金', value: 'cash' },
  { label: '未定', value: 'pending' },
];

export default function BillingPage() {
  const [period, setPeriod] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [invoiceStatus, setInvoiceStatus] = useState<string>('all');
  const [paymentMethod, setPaymentMethod] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 検索とフィルタリングの適用
  const filteredInvoices = INVOICE_DATA
    .filter(invoice => {
      // ステータスフィルター
      if (invoiceStatus !== 'all') {
        const statusMap: { [key: string]: string } = {
          'paid': '支払済',
          'partial': '一部支払い',
          'unpaid': '未払い',
          'overdue': '期限超過'
        };
        if (invoice.status !== statusMap[invoiceStatus]) return false;
      }

      // 支払い方法フィルター
      if (paymentMethod !== 'all') {
        const methodMap: { [key: string]: string } = {
          'credit-card': 'クレジットカード',
          'bank-transfer': '銀行振込',
          'cash': '現金',
          'pending': '未定'
        };
        if (invoice.method !== methodMap[paymentMethod]) return false;
      }

      // 検索クエリ
      if (searchTerm) {
        return (
          invoice.invoiceNumber.includes(searchTerm) ||
          invoice.member.includes(searchTerm) ||
          invoice.amount.toString().includes(searchTerm)
        );
      }

      return true;
    });
  
  // 合計金額と支払い状況を集計
  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = filteredInvoices.reduce((sum, invoice) => sum + invoice.paid, 0);
  const totalUnpaid = totalAmount - totalPaid;

  // ステータス別集計
  const statusCounts = filteredInvoices.reduce((acc: { [key: string]: number }, invoice) => {
    if (!acc[invoice.status]) {
      acc[invoice.status] = 0;
    }
    acc[invoice.status]++;
    return acc;
  }, {});

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">請求・支払い管理</h1>
          <p className="text-gray-600">請求書や支払い状況の管理ができます。</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="primary">新規請求書作成</Button>
          <Button variant="outline">一括支払い確認</Button>
        </div>
      </div>

      {/* フィルターセクション */}
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
              placeholder="請求番号、会員名など"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">請求ステータス</label>
            <select
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
              value={invoiceStatus}
              onChange={(e) => setInvoiceStatus(e.target.value)}
            >
              {INVOICE_STATUS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

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
        </div>
      </Card>

      {/* サマリーセクション */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-white">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">請求総額</div>
            <div className="text-3xl font-extrabold text-[#ff9800]">¥{totalAmount.toLocaleString()}</div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">支払済金額</div>
            <div className="text-3xl font-extrabold text-green-600">¥{totalPaid.toLocaleString()}</div>
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-1">未回収金額</div>
            <div className="text-3xl font-extrabold text-red-500">¥{totalUnpaid.toLocaleString()}</div>
          </div>
        </Card>
      </div>

      {/* 請求ステータスと支払い進捗 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card title="ステータス別請求書" className="md:col-span-2">
          <div className="space-y-4 p-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    支払済
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {Math.round((statusCounts['支払済'] || 0) / filteredInvoices.length * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div style={{ width: `${Math.round((statusCounts['支払済'] || 0) / filteredInvoices.length * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                    一部支払い
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-yellow-600">
                    {Math.round((statusCounts['一部支払い'] || 0) / filteredInvoices.length * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                <div style={{ width: `${Math.round((statusCounts['一部支払い'] || 0) / filteredInvoices.length * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                    未払い
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-red-600">
                    {Math.round((statusCounts['未払い'] || 0) / filteredInvoices.length * 100)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                <div style={{ width: `${Math.round((statusCounts['未払い'] || 0) / filteredInvoices.length * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"></div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="支払い回収進捗">
          <div className="p-4">
            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-1">全体の回収率</div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-4 mb-1 text-xs flex rounded bg-gray-200">
                  <div style={{ width: `${Math.round(totalPaid / totalAmount * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500">
                    {Math.round(totalPaid / totalAmount * 100)}%
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>¥{totalPaid.toLocaleString()}</span>
                  <span>¥{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <div className="text-4xl font-bold text-blue-500">
                {Math.round(totalPaid / totalAmount * 100)}%
              </div>
              <div className="text-sm text-gray-500">支払い完了率</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 請求リスト */}
      <Card title="請求一覧" className="mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">請求番号</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">発行日</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">支払期限</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">会員名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">請求額</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">支払済金額</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ステータス</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">アクション</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-gray-400">該当する請求データがありません</td>
                </tr>
              ) : (
                filteredInvoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{invoice.invoiceNumber}</td>
                    <td className="px-4 py-3 text-sm">{invoice.date}</td>
                    <td className="px-4 py-3 text-sm">{invoice.dueDate}</td>
                    <td className="px-4 py-3 text-sm">{invoice.member}</td>
                    <td className="px-4 py-3 text-sm font-medium">¥{invoice.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">¥{invoice.paid.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === '支払済' ? 'bg-green-100 text-green-800' : 
                        invoice.status === '一部支払い' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm flex gap-2 justify-end">
                      <Button size="sm" variant="outline" onClick={() => alert('詳細')}>詳細</Button>
                      {invoice.status !== '支払済' && (
                        <Button size="sm" className="btn-primary" onClick={() => alert('支払い登録')}>支払い登録</Button>
                      )}
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