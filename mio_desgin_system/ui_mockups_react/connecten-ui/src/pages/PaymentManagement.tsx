import React, { useState } from 'react';
import { Button } from '../components/UI/Button';

interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  type: 'monthly_fee' | 'lesson_fee' | 'registration_fee' | 'penalty' | 'refund';
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  method?: 'cash' | 'credit_card' | 'bank_transfer' | 'auto_debit';
  description: string;
  lessonId?: string;
  receiptNumber?: string;
}

interface Invoice {
  id: string;
  memberId: string;
  memberName: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: PaymentItem[];
}

interface PaymentItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export const PaymentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices' | 'reports' | 'settings'>('payments');
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const samplePayments: Payment[] = [
    {
      id: '1',
      memberId: 'member1',
      memberName: '田中美咲',
      type: 'monthly_fee',
      amount: 12000,
      dueDate: '2025-01-31',
      paidDate: '2025-01-25',
      status: 'paid',
      method: 'auto_debit',
      description: '1月分月謝',
      receiptNumber: 'REC-2025-001'
    },
    {
      id: '2',
      memberId: 'member2',
      memberName: '佐藤健太郎',
      type: 'lesson_fee',
      amount: 4000,
      dueDate: '2025-01-28',
      status: 'pending',
      description: 'ヒップホップ中級 単発レッスン',
      lessonId: 'lesson2'
    },
    {
      id: '3',
      memberId: 'member3',
      memberName: '高橋美由紀',
      type: 'monthly_fee',
      amount: 15000,
      dueDate: '2025-01-20',
      status: 'overdue',
      description: '1月分月謝（プレミアムコース）'
    },
    {
      id: '4',
      memberId: 'member4',
      memberName: '鈴木花子',
      type: 'registration_fee',
      amount: 5000,
      dueDate: '2025-01-15',
      paidDate: '2025-01-14',
      status: 'paid',
      method: 'credit_card',
      description: '新規入会金',
      receiptNumber: 'REC-2025-002'
    }
  ];

  const getPaymentTypeBadge = (type: string) => {
    const typeConfig = {
      monthly_fee: { label: '月謝', className: 'bg-blue-100 text-blue-800' },
      lesson_fee: { label: '単発料金', className: 'bg-green-100 text-green-800' },
      registration_fee: { label: '入会金', className: 'bg-purple-100 text-purple-800' },
      penalty: { label: '違約金', className: 'bg-red-100 text-red-800' },
      refund: { label: '返金', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.monthly_fee;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: '支払済み', className: 'bg-green-100 text-green-800' },
      pending: { label: '支払い待ち', className: 'bg-yellow-100 text-yellow-800' },
      overdue: { label: '延滞', className: 'bg-red-100 text-red-800' },
      cancelled: { label: 'キャンセル', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const getMethodBadge = (method: string) => {
    const methodConfig = {
      cash: { label: '現金', className: 'bg-green-100 text-green-800' },
      credit_card: { label: 'クレジット', className: 'bg-blue-100 text-blue-800' },
      bank_transfer: { label: '銀行振込', className: 'bg-purple-100 text-purple-800' },
      auto_debit: { label: '自動引落', className: 'bg-indigo-100 text-indigo-800' }
    };
    
    const config = methodConfig[method as keyof typeof methodConfig] || methodConfig.cash;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const handlePaymentClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const markAsPaid = () => {
    if (selectedPayment) {
      console.log(`支払い ${selectedPayment.id} を支払済みに変更`);
      setShowModal(false);
      setSelectedPayment(null);
    }
  };

  const getTotalAmount = (status?: string) => {
    const filtered = status ? samplePayments.filter(p => p.status === status) : samplePayments;
    return filtered.reduce((sum, payment) => sum + payment.amount, 0);
  };

  const getPendingCount = () => samplePayments.filter(p => p.status === 'pending').length;
  const getOverdueCount = () => samplePayments.filter(p => p.status === 'overdue').length;
  const getPaidThisMonth = () => samplePayments.filter(p => p.status === 'paid' && p.paidDate?.startsWith('2025-01')).length;

  return (
    <div className="payment-management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">支払い管理</h1>
          <p className="text-gray-600 mt-1">月謝・レッスン料の総合管理システム</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <i className="fas fa-file-export mr-2"></i>
            支払いレポート
          </Button>
          <Button variant="secondary">
            <i className="fas fa-envelope mr-2"></i>
            督促メール送信
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus mr-2"></i>
            支払い記録追加
          </Button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">支払い完了</p>
              <p className="text-2xl font-bold text-green-600">
                {getPaidThisMonth()}件
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-green-600"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">今月の処理済み</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">支払い待ち</p>
              <p className="text-2xl font-bold text-yellow-600">
                {getPendingCount()}件
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-clock text-yellow-600"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">未処理の支払い</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">要確認</p>
              <p className="text-2xl font-bold text-red-600">
                {getOverdueCount()}件
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-600"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">期限超過の支払い</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">総支払い件数</p>
              <p className="text-2xl font-bold text-gray-900">
                {samplePayments.length}件
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-list text-blue-600"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">今月の取引数</p>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { key: 'payments', label: '支払い一覧', icon: 'fas fa-list' },
            { key: 'invoices', label: '請求書管理', icon: 'fas fa-file-invoice' },
            { key: 'reports', label: '売上レポート', icon: 'fas fa-chart-line' },
            { key: 'settings', label: '支払い設定', icon: 'fas fa-cog' }
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

      {/* 支払い一覧タブ */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* 検索・フィルター */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="会員名、説明で検索"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
              </div>
              <div>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">支払い状態</option>
                  <option value="paid">支払済み</option>
                  <option value="pending">支払い待ち</option>
                  <option value="overdue">延滞</option>
                </select>
              </div>
              <div>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">支払い種別</option>
                  <option value="monthly_fee">月謝</option>
                  <option value="lesson_fee">単発料金</option>
                  <option value="registration_fee">入会金</option>
                </select>
              </div>
              <div>
                <input
                  type="month"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="2025-01"
                />
              </div>
            </div>
          </div>

          {/* 支払いリスト */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会員・内容</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">種別</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">金額</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">期限</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">支払い方法</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {samplePayments.map((payment) => (
                    <tr 
                      key={payment.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handlePaymentClick(payment)}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{payment.memberName}</div>
                          <div className="text-sm text-gray-500">{payment.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getPaymentTypeBadge(payment.type)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          ¥{payment.amount.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {new Date(payment.dueDate).toLocaleDateString('ja-JP')}
                        </div>
                        {payment.paidDate && (
                          <div className="text-xs text-gray-500">
                            支払日: {new Date(payment.paidDate).toLocaleDateString('ja-JP')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="px-6 py-4">
                        {payment.method && getMethodBadge(payment.method)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button variant="secondary" size="sm">
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button variant="secondary" size="sm">
                            <i className="fas fa-receipt"></i>
                          </Button>
                          {payment.status === 'pending' && (
                            <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); markAsPaid(); }}>
                              <i className="fas fa-check"></i>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 他のタブのプレースホルダー */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-file-invoice text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">請求書管理</h3>
          <p className="text-gray-600">請求書の作成・送信・管理機能を実装予定</p>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-chart-line text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">売上レポート</h3>
          <p className="text-gray-600">売上分析と財務レポート機能を実装予定</p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-cog text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">支払い設定</h3>
          <p className="text-gray-600">支払い方法・自動引落・料金設定機能を実装予定</p>
        </div>
      )}

      {/* 支払い詳細/追加モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedPayment ? '支払い詳細・編集' : '支払い記録追加'}
              </h2>
              <button
                onClick={() => { setShowModal(false); setSelectedPayment(null); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              {selectedPayment ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">会員:</span> {selectedPayment.memberName}</div>
                      <div><span className="text-gray-500">金額:</span> ¥{selectedPayment.amount.toLocaleString()}</div>
                      <div><span className="text-gray-500">期限:</span> {new Date(selectedPayment.dueDate).toLocaleDateString('ja-JP')}</div>
                      <div><span className="text-gray-500">状態:</span> {getStatusBadge(selectedPayment.status)}</div>
                      {selectedPayment.paidDate && (
                        <div><span className="text-gray-500">支払日:</span> {new Date(selectedPayment.paidDate).toLocaleDateString('ja-JP')}</div>
                      )}
                      {selectedPayment.method && (
                        <div><span className="text-gray-500">支払方法:</span> {getMethodBadge(selectedPayment.method)}</div>
                      )}
                    </div>
                    <div className="mt-3">
                      <div><span className="text-gray-500">内容:</span> {selectedPayment.description}</div>
                    </div>
                    {selectedPayment.receiptNumber && (
                      <div className="mt-3">
                        <span className="text-gray-500">領収書番号:</span> {selectedPayment.receiptNumber}
                      </div>
                    )}
                  </div>
                  
                  {selectedPayment.status === 'pending' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">支払い方法</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="cash">現金</option>
                        <option value="credit_card">クレジットカード</option>
                        <option value="bank_transfer">銀行振込</option>
                        <option value="auto_debit">自動引落</option>
                      </select>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">会員選択</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">会員を選択</option>
                        <option value="1">田中美咲</option>
                        <option value="2">佐藤健太郎</option>
                        <option value="3">高橋美由紀</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">支払い種別</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="monthly_fee">月謝</option>
                        <option value="lesson_fee">単発料金</option>
                        <option value="registration_fee">入会金</option>
                        <option value="penalty">違約金</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">金額</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">支払期限</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">説明</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="支払い内容を入力"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={() => { setShowModal(false); setSelectedPayment(null); }}>
                閉じる
              </Button>
              {selectedPayment && selectedPayment.status === 'pending' && (
                <Button variant="primary" onClick={markAsPaid}>
                  支払い完了
                </Button>
              )}
              {!selectedPayment && (
                <Button variant="primary">
                  支払い記録を追加
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};