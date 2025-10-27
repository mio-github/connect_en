import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';

interface SalesRecord {
  id: string;
  date: string;
  time: string;
  item: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMethod: string;
  customerName?: string;
  receiptNumber: string;
  status: 'completed' | 'refunded' | 'exchanged';
}

const mockSalesData: SalesRecord[] = [
  {
    id: '1',
    date: '2025-10-27',
    time: '14:32:15',
    item: 'レッスンチケット (10回)',
    category: 'チケット',
    quantity: 1,
    unitPrice: 50000,
    totalAmount: 50000,
    paymentMethod: 'クレジットカード',
    customerName: '田中花子',
    receiptNumber: 'RCP-20251027-001',
    status: 'completed'
  },
  {
    id: '2',
    date: '2025-10-27',
    time: '13:15:42',
    item: 'ダンスシューズ (Size 24)',
    category: '用品',
    quantity: 1,
    unitPrice: 8000,
    totalAmount: 8000,
    paymentMethod: '現金',
    customerName: '佐藤美咲',
    receiptNumber: 'RCP-20251027-002',
    status: 'completed'
  },
  {
    id: '3',
    date: '2025-10-26',
    time: '18:45:30',
    item: 'トレーニングウェア',
    category: 'ウェア',
    quantity: 2,
    unitPrice: 4500,
    totalAmount: 9000,
    paymentMethod: '電子マネー',
    customerName: '鈴木健太',
    receiptNumber: 'RCP-20251026-015',
    status: 'completed'
  },
  {
    id: '4',
    date: '2025-10-26',
    time: '16:20:10',
    item: 'プライベートレッスン',
    category: 'レッスン',
    quantity: 1,
    unitPrice: 15000,
    totalAmount: 15000,
    paymentMethod: 'クレジットカード',
    customerName: '高橋真一',
    receiptNumber: 'RCP-20251026-012',
    status: 'completed'
  },
  {
    id: '5',
    date: '2025-10-25',
    time: '12:05:55',
    item: 'スポーツタオル',
    category: '用品',
    quantity: 3,
    unitPrice: 1200,
    totalAmount: 3600,
    paymentMethod: '現金',
    receiptNumber: 'RCP-20251025-008',
    status: 'refunded'
  }
];

export const POSSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    startDate: '2025-10-25',
    endDate: '2025-10-27',
    item: '',
    minAmount: '',
    maxAmount: '',
    paymentMethod: 'all',
    status: 'all'
  });
  const [salesData, setSalesData] = useState<SalesRecord[]>(mockSalesData);
  const [selectedRecord, setSelectedRecord] = useState<SalesRecord | null>(null);
  const [showModal, setShowModal] = useState<'receipt' | 'refund' | 'exchange' | null>(null);

  const handleSearch = () => {
    // 検索ロジックをここに実装
    console.log('Searching with params:', searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      startDate: '',
      endDate: '',
      item: '',
      minAmount: '',
      maxAmount: '',
      paymentMethod: 'all',
      status: 'all'
    });
  };

  const handleExport = () => {
    console.log('Exporting sales data...');
  };

  const handleReceiptReissue = (record: SalesRecord) => {
    setSelectedRecord(record);
    setShowModal('receipt');
  };

  const handleRefund = (record: SalesRecord) => {
    setSelectedRecord(record);
    setShowModal('refund');
  };

  const handleExchange = (record: SalesRecord) => {
    setSelectedRecord(record);
    setShowModal('exchange');
  };

  const handleModalClose = () => {
    setShowModal(null);
    setSelectedRecord(null);
  };

  const handleRefundConfirm = () => {
    if (selectedRecord) {
      setSalesData(prev =>
        prev.map(record =>
          record.id === selectedRecord.id
            ? { ...record, status: 'refunded' }
            : record
        )
      );
      handleModalClose();
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: '完了', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      refunded: { label: '返品', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      exchanged: { label: '交換', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.completed;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const totalAmount = salesData.reduce((sum, record) => sum + record.totalAmount, 0);
  const totalRecords = salesData.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">POS検索</h1>
        <p className="text-neutral-500 dark:text-gray-400">販売履歴の検索・確認・レシート再発行を行えます</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <i className="fas fa-receipt text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">総売上件数</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{totalRecords}件</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <i className="fas fa-yen-sign text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">総売上金額</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">¥{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <i className="fas fa-chart-line text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">平均単価</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{totalRecords > 0 ? Math.round(totalAmount / totalRecords).toLocaleString() : 0}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search Form */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-search text-primary-500" />
          検索条件
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              開始日
            </label>
            <input
              type="date"
              value={searchParams.startDate}
              onChange={(e) => setSearchParams({ ...searchParams, startDate: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              終了日
            </label>
            <input
              type="date"
              value={searchParams.endDate}
              onChange={(e) => setSearchParams({ ...searchParams, endDate: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              商品名
            </label>
            <input
              type="text"
              placeholder="商品名を入力"
              value={searchParams.item}
              onChange={(e) => setSearchParams({ ...searchParams, item: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              最小金額
            </label>
            <input
              type="number"
              placeholder="0"
              value={searchParams.minAmount}
              onChange={(e) => setSearchParams({ ...searchParams, minAmount: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              最大金額
            </label>
            <input
              type="number"
              placeholder="999999"
              value={searchParams.maxAmount}
              onChange={(e) => setSearchParams({ ...searchParams, maxAmount: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              支払い方法
            </label>
            <select
              value={searchParams.paymentMethod}
              onChange={(e) => setSearchParams({ ...searchParams, paymentMethod: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            >
              <option value="all">すべて</option>
              <option value="現金">現金</option>
              <option value="クレジットカード">クレジットカード</option>
              <option value="電子マネー">電子マネー</option>
              <option value="QRコード">QRコード決済</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="secondary" onClick={handleReset}>
            <i className="fas fa-undo" />
            リセット
          </Button>
          <Button variant="primary" onClick={handleSearch}>
            <i className="fas fa-search" />
            検索
          </Button>
          <Button variant="secondary" onClick={handleExport}>
            <i className="fas fa-download" />
            エクスポート
          </Button>
        </div>
      </motion.div>

      {/* Sales Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  レシート番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  商品名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  顧客名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  数量
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  支払方法
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  状態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {salesData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    <div>{record.date}</div>
                    <div className="text-xs text-gray-400">{record.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {record.receiptNumber}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{record.item}</div>
                    <div className="text-xs text-gray-500">{record.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {record.customerName || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {record.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    ¥{record.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    {record.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReceiptReissue(record)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        title="レシート再発行"
                      >
                        <i className="fas fa-receipt" />
                      </button>
                      {record.status === 'completed' && (
                        <>
                          <button
                            onClick={() => handleRefund(record)}
                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            title="返品"
                          >
                            <i className="fas fa-undo" />
                          </button>
                          <button
                            onClick={() => handleExchange(record)}
                            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                            title="交換"
                          >
                            <i className="fas fa-exchange-alt" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Receipt Reissue Modal */}
      {showModal === 'receipt' && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white">レシート再発行</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">レシート番号:</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">日時:</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.date} {selectedRecord.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">商品:</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">金額:</span>
                <span className="font-medium text-gray-900 dark:text-white">¥{selectedRecord.totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="secondary" onClick={handleModalClose} fullWidth>
                キャンセル
              </Button>
              <Button variant="primary" onClick={handleModalClose} fullWidth>
                <i className="fas fa-print" />
                印刷
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Refund Modal */}
      {showModal === 'refund' && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white">返品処理</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              以下の商品を返品処理します。よろしいですか?
            </p>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">商品:</span>
                <span className="font-medium text-gray-900 dark:text-white">{selectedRecord.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">返金額:</span>
                <span className="font-medium text-red-600 dark:text-red-400">¥{selectedRecord.totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={handleModalClose} fullWidth>
                キャンセル
              </Button>
              <Button variant="danger" onClick={handleRefundConfirm} fullWidth>
                返品確定
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Exchange Modal */}
      {showModal === 'exchange' && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white">交換処理</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              交換処理機能は開発中です
            </p>
            <Button variant="primary" onClick={handleModalClose} fullWidth>
              閉じる
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
