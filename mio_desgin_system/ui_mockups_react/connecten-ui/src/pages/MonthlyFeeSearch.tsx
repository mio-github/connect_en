import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';

interface MonthlyFee {
  id: string;
  memberName: string;
  memberId: string;
  course: string;
  month: string;
  baseFee: number;
  adjustments: number;
  totalFee: number;
  paymentStatus: 'paid' | 'unpaid' | 'partial';
  paymentDate?: string;
  paymentMethod?: string;
  dueDate: string;
  notes: string;
}

const mockMonthlyFees: MonthlyFee[] = [
  {
    id: '1',
    memberName: '田中花子',
    memberId: 'M001',
    course: 'ヒップホップ初級',
    month: '2025-11',
    baseFee: 8000,
    adjustments: 0,
    totalFee: 8000,
    paymentStatus: 'paid',
    paymentDate: '2025-10-25',
    paymentMethod: 'クレジットカード',
    dueDate: '2025-11-05',
    notes: ''
  },
  {
    id: '2',
    memberName: '佐藤太郎',
    memberId: 'M002',
    course: 'バレエ中級',
    month: '2025-11',
    baseFee: 12000,
    adjustments: -2000,
    totalFee: 10000,
    paymentStatus: 'paid',
    paymentDate: '2025-10-28',
    paymentMethod: '銀行振込',
    dueDate: '2025-11-05',
    notes: '新規会員割引適用'
  },
  {
    id: '3',
    memberName: '鈴木美咲',
    memberId: 'M003',
    course: 'ジャズダンス上級',
    month: '2025-11',
    baseFee: 10000,
    adjustments: 0,
    totalFee: 10000,
    paymentStatus: 'unpaid',
    dueDate: '2025-11-05',
    notes: ''
  },
  {
    id: '4',
    memberName: '高橋健一',
    memberId: 'M004',
    course: 'K-POP ダンス',
    month: '2025-11',
    baseFee: 9000,
    adjustments: 500,
    totalFee: 9500,
    paymentStatus: 'partial',
    paymentDate: '2025-10-30',
    paymentMethod: '現金',
    dueDate: '2025-11-05',
    notes: '追加レッスン料'
  },
  {
    id: '5',
    memberName: '伊藤さくら',
    memberId: 'M005',
    course: 'キッズダンス',
    month: '2025-11',
    baseFee: 6000,
    adjustments: 0,
    totalFee: 6000,
    paymentStatus: 'unpaid',
    dueDate: '2025-11-05',
    notes: ''
  },
  {
    id: '6',
    memberName: '山田次郎',
    memberId: 'M006',
    course: 'ヒップホップ初級',
    month: '2025-10',
    baseFee: 8000,
    adjustments: 0,
    totalFee: 8000,
    paymentStatus: 'unpaid',
    dueDate: '2025-10-05',
    notes: '滞納'
  }
];

export const MonthlyFeeSearch: React.FC = () => {
  const [fees, setFees] = useState<MonthlyFee[]>(mockMonthlyFees);
  const [searchParams, setSearchParams] = useState({
    memberName: '',
    month: '2025-11',
    status: 'all'
  });
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState<MonthlyFee | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState<number>(0);
  const [adjustmentReason, setAdjustmentReason] = useState<string>('');

  const filteredFees = fees.filter(fee => {
    const matchName = fee.memberName.toLowerCase().includes(searchParams.memberName.toLowerCase());
    const matchMonth = searchParams.month === 'all' || fee.month === searchParams.month;
    const matchStatus = searchParams.status === 'all' || fee.paymentStatus === searchParams.status;
    return matchName && matchMonth && matchStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'paid': { label: '支払済', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'unpaid': { label: '未払い', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      'partial': { label: '一部支払', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['unpaid'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const handleSearch = () => {
    console.log('Searching with params:', searchParams);
  };

  const handleReset = () => {
    setSearchParams({
      memberName: '',
      month: 'all',
      status: 'all'
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedFees(filteredFees.map(f => f.id));
    } else {
      setSelectedFees([]);
    }
  };

  const handleSelectFee = (feeId: string) => {
    setSelectedFees(prev =>
      prev.includes(feeId)
        ? prev.filter(id => id !== feeId)
        : [...prev, feeId]
    );
  };

  const handleAdjustment = (fee: MonthlyFee) => {
    setSelectedFee(fee);
    setAdjustmentAmount(0);
    setAdjustmentReason('');
    setShowAdjustmentModal(true);
  };

  const handleAdjustmentConfirm = () => {
    if (selectedFee) {
      setFees(prev =>
        prev.map(fee =>
          fee.id === selectedFee.id
            ? {
                ...fee,
                adjustments: fee.adjustments + adjustmentAmount,
                totalFee: fee.baseFee + fee.adjustments + adjustmentAmount,
                notes: adjustmentReason
              }
            : fee
        )
      );
      setShowAdjustmentModal(false);
      setSelectedFee(null);
    }
  };

  const handleBulkPayment = () => {
    if (selectedFees.length === 0) {
      alert('支払い処理する月謝を選択してください');
      return;
    }
    if (confirm(`${selectedFees.length}件の月謝を一括支払い処理しますか？`)) {
      setFees(prev =>
        prev.map(fee =>
          selectedFees.includes(fee.id)
            ? {
                ...fee,
                paymentStatus: 'paid' as const,
                paymentDate: new Date().toISOString().split('T')[0],
                paymentMethod: '一括処理'
              }
            : fee
        )
      );
      setSelectedFees([]);
    }
  };

  const handleExport = () => {
    console.log('Exporting monthly fees...');
  };

  const totalAmount = filteredFees.reduce((sum, fee) => sum + fee.totalFee, 0);
  const paidAmount = filteredFees
    .filter(f => f.paymentStatus === 'paid')
    .reduce((sum, fee) => sum + fee.totalFee, 0);
  const unpaidAmount = filteredFees
    .filter(f => f.paymentStatus === 'unpaid')
    .reduce((sum, fee) => sum + fee.totalFee, 0);
  const unpaidCount = filteredFees.filter(f => f.paymentStatus === 'unpaid').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">月謝検索</h1>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold rounded-full">
            Phase 2
          </span>
        </div>
        <p className="text-neutral-500 dark:text-gray-400">
          月謝の検索・支払状況確認・料金調整を行えます
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <i className="fas fa-yen-sign text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">総額</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <i className="fas fa-check-circle text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">支払済</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{paidAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <i className="fas fa-exclamation-circle text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">未払い</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{unpaidAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
              <i className="fas fa-users text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">未払者数</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{unpaidCount}名</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              会員名
            </label>
            <input
              type="text"
              placeholder="会員名を入力"
              value={searchParams.memberName}
              onChange={(e) => setSearchParams({ ...searchParams, memberName: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              対象月
            </label>
            <input
              type="month"
              value={searchParams.month}
              onChange={(e) => setSearchParams({ ...searchParams, month: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              支払状況
            </label>
            <select
              value={searchParams.status}
              onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            >
              <option value="all">すべて</option>
              <option value="paid">支払済</option>
              <option value="unpaid">未払い</option>
              <option value="partial">一部支払</option>
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
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Button
          variant="primary"
          onClick={handleBulkPayment}
          disabled={selectedFees.length === 0}
        >
          <i className="fas fa-check" />
          一括支払い処理 ({selectedFees.length})
        </Button>
        <Button variant="secondary" onClick={handleExport}>
          <i className="fas fa-download" />
          エクスポート
        </Button>
      </motion.div>

      {/* Fees Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedFees.length === filteredFees.length && filteredFees.length > 0}
                    onChange={handleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  会員名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  コース
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  対象月
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  基本料金
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  調整額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  合計金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  支払期限
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  状態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedFees.includes(fee.id)}
                      onChange={() => handleSelectFee(fee.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    <div>{fee.memberName}</div>
                    <div className="text-xs text-gray-500">{fee.memberId}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {fee.course}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {fee.month}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    ¥{fee.baseFee.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={fee.adjustments !== 0 ? (fee.adjustments > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400') : 'text-gray-600 dark:text-gray-300'}>
                      {fee.adjustments !== 0 && (fee.adjustments > 0 ? '+' : '')}
                      ¥{fee.adjustments.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    ¥{fee.totalFee.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {fee.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(fee.paymentStatus)}
                    {fee.paymentDate && (
                      <div className="text-xs text-gray-500 mt-1">
                        {fee.paymentDate} ({fee.paymentMethod})
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleAdjustment(fee)}
                    >
                      <i className="fas fa-edit" />
                      調整
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Adjustment Modal */}
      {showAdjustmentModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white">
              料金調整
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">会員名</p>
                <p className="font-medium text-neutral-800 dark:text-white">
                  {selectedFee.memberName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">現在の金額</p>
                <p className="font-medium text-neutral-800 dark:text-white">
                  ¥{selectedFee.totalFee.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  調整額（プラス/マイナス）
                </label>
                <input
                  type="number"
                  value={adjustmentAmount || ''}
                  onChange={(e) => setAdjustmentAmount(parseInt(e.target.value) || 0)}
                  placeholder="例: -1000, +500"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  調整理由
                </label>
                <textarea
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  placeholder="調整理由を入力してください"
                  rows={3}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                />
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">調整後の金額</p>
                <p className="text-xl font-bold text-neutral-800 dark:text-white">
                  ¥{(selectedFee.totalFee + adjustmentAmount).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowAdjustmentModal(false)}
                fullWidth
              >
                キャンセル
              </Button>
              <Button variant="primary" onClick={handleAdjustmentConfirm} fullWidth>
                確定
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
