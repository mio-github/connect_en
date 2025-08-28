import React, { useState } from 'react';
import { Button } from '../components/UI/Button';

interface Reservation {
  id: string;
  lessonId: string;
  lessonName: string;
  memberName: string;
  memberEmail: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no_show';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  bookingDate: string;
  notes?: string;
  instructor: string;
  studio: string;
  price: number;
}

export const ReservationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'history' | 'waitlist'>('today');
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sampleReservations: Reservation[] = [
    {
      id: '1',
      lessonId: 'lesson1',
      lessonName: '初級バレエ',
      memberName: '田中美咲',
      memberEmail: 'misaki.tanaka@example.com',
      date: '2025-01-28',
      time: '10:00',
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2025-01-20',
      instructor: '山田花子',
      studio: 'Studio A',
      price: 3500
    },
    {
      id: '2',
      lessonId: 'lesson2',
      lessonName: 'ヒップホップ中級',
      memberName: '佐藤健太郎',
      memberEmail: 'kentaro.sato@example.com',
      date: '2025-01-28',
      time: '14:00',
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: '2025-01-27',
      instructor: '佐藤健太',
      studio: 'Studio B',
      price: 4000
    },
    {
      id: '3',
      lessonId: 'lesson3',
      lessonName: 'ジャズダンス上級',
      memberName: '高橋美由紀',
      memberEmail: 'miyuki.takahashi@example.com',
      date: '2025-01-28',
      time: '19:00',
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: '2025-01-25',
      instructor: '高橋真一',
      studio: 'Studio A',
      price: 4500,
      notes: '膝の調子が悪いため、激しい動きは控えめに'
    },
    {
      id: '4',
      lessonId: 'lesson4',
      lessonName: 'ヨガ&ストレッチ',
      memberName: '鈴木花子',
      memberEmail: 'hanako.suzuki@example.com',
      date: '2025-01-27',
      time: '20:45',
      status: 'no_show',
      paymentStatus: 'paid',
      bookingDate: '2025-01-24',
      instructor: '鈴木美咲',
      studio: 'Studio C',
      price: 3000
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: '確認済み', className: 'bg-green-100 text-green-800' },
      pending: { label: '保留中', className: 'bg-yellow-100 text-yellow-800' },
      cancelled: { label: 'キャンセル', className: 'bg-red-100 text-red-800' },
      completed: { label: '完了', className: 'bg-blue-100 text-blue-800' },
      no_show: { label: '不参加', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: '支払済み', className: 'bg-green-100 text-green-800' },
      pending: { label: '支払い待ち', className: 'bg-yellow-100 text-yellow-800' },
      overdue: { label: '延滞', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const handleReservationClick = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };

  const updateReservationStatus = (status: string) => {
    if (selectedReservation) {
      // 実際の実装では、ここでAPIを呼び出して状態を更新
      console.log(`予約 ${selectedReservation.id} の状態を ${status} に更新`);
      setShowModal(false);
      setSelectedReservation(null);
    }
  };

  const todayReservations = sampleReservations.filter(r => r.date === '2025-01-28');
  const upcomingReservations = sampleReservations.filter(r => new Date(r.date) > new Date('2025-01-28'));
  const historyReservations = sampleReservations.filter(r => new Date(r.date) < new Date('2025-01-28'));

  const getTabData = () => {
    switch (activeTab) {
      case 'today':
        return todayReservations;
      case 'upcoming':
        return upcomingReservations;
      case 'history':
        return historyReservations;
      case 'waitlist':
        return []; // キャンセル待ちの予約
      default:
        return todayReservations;
    }
  };

  return (
    <div className="reservation-management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">予約管理</h1>
          <p className="text-gray-600 mt-1">レッスン予約の総合管理システム</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <i className="fas fa-download mr-2"></i>
            予約リスト出力
          </Button>
          <Button variant="secondary">
            <i className="fas fa-envelope mr-2"></i>
            リマインダー送信
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus mr-2"></i>
            手動予約追加
          </Button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">本日の予約</p>
              <p className="text-2xl font-bold text-gray-900">{todayReservations.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-calendar-day text-blue-600"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">保留中</p>
              <p className="text-2xl font-bold text-yellow-600">
                {sampleReservations.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-clock text-yellow-600"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">キャンセル</p>
              <p className="text-2xl font-bold text-red-600">
                {sampleReservations.filter(r => r.status === 'cancelled').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-times-circle text-red-600"></i>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">支払い待ち</p>
              <p className="text-2xl font-bold text-orange-600">
                {sampleReservations.filter(r => r.paymentStatus === 'pending').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-credit-card text-orange-600"></i>
            </div>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { key: 'today', label: '本日の予約', icon: 'fas fa-calendar-day', count: todayReservations.length },
            { key: 'upcoming', label: '今後の予約', icon: 'fas fa-calendar-week', count: upcomingReservations.length },
            { key: 'history', label: '予約履歴', icon: 'fas fa-history', count: historyReservations.length },
            { key: 'waitlist', label: 'キャンセル待ち', icon: 'fas fa-list-ul', count: 0 }
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
              {tab.count > 0 && (
                <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* 検索・フィルター */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="会員名、レッスン名で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div>
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">予約状態</option>
              <option value="confirmed">確認済み</option>
              <option value="pending">保留中</option>
              <option value="cancelled">キャンセル</option>
            </select>
          </div>
          <div>
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">支払い状態</option>
              <option value="paid">支払済み</option>
              <option value="pending">支払い待ち</option>
              <option value="overdue">延滞</option>
            </select>
          </div>
        </div>
      </div>

      {/* 予約リスト */}
      <div className="space-y-4">
        {getTabData().map((reservation) => (
          <div 
            key={reservation.id} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleReservationClick(reservation)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{reservation.lessonName}</h3>
                  {getStatusBadge(reservation.status)}
                  {getPaymentStatusBadge(reservation.paymentStatus)}
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-user w-4"></i>
                    <span>{reservation.memberName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-clock w-4"></i>
                    <span>{reservation.time} ({reservation.date})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-user-tie w-4"></i>
                    <span>{reservation.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-map-marker-alt w-4"></i>
                    <span>{reservation.studio}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="text-gray-500">予約日: {new Date(reservation.bookingDate).toLocaleDateString('ja-JP')}</span>
                  {reservation.notes && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <i className="fas fa-sticky-note"></i>
                      メモあり
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 ml-4">
                <Button variant="secondary" size="sm">
                  <i className="fas fa-edit"></i>
                </Button>
                <Button variant="secondary" size="sm">
                  <i className="fas fa-envelope"></i>
                </Button>
                <Button variant="secondary" size="sm">
                  <i className="fas fa-phone"></i>
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {getTabData().length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <i className="fas fa-calendar-times text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">予約がありません</h3>
            <p className="text-gray-600">
              {activeTab === 'waitlist' 
                ? 'キャンセル待ちの予約はありません'
                : '該当する予約が見つかりません'
              }
            </p>
          </div>
        )}
      </div>

      {/* 予約詳細/編集モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedReservation ? '予約詳細・編集' : '新規予約追加'}
              </h2>
              <button
                onClick={() => { setShowModal(false); setSelectedReservation(null); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              {selectedReservation ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-3">{selectedReservation.lessonName}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-500">会員:</span> {selectedReservation.memberName}</div>
                      <div><span className="text-gray-500">日時:</span> {selectedReservation.date} {selectedReservation.time}</div>
                      <div><span className="text-gray-500">講師:</span> {selectedReservation.instructor}</div>
                      <div><span className="text-gray-500">スタジオ:</span> {selectedReservation.studio}</div>
                      <div><span className="text-gray-500">予約日:</span> {new Date(selectedReservation.bookingDate).toLocaleDateString('ja-JP')}</div>
                    </div>
                    {selectedReservation.notes && (
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">メモ:</span>
                        <p className="text-sm text-gray-700 mt-1">{selectedReservation.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">予約状態</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      defaultValue={selectedReservation.status}
                    >
                      <option value="confirmed">確認済み</option>
                      <option value="pending">保留中</option>
                      <option value="cancelled">キャンセル</option>
                      <option value="completed">完了</option>
                      <option value="no_show">不参加</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">メモ</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      defaultValue={selectedReservation.notes}
                      placeholder="メモを入力"
                    />
                  </div>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">レッスン選択</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">レッスンを選択</option>
                        <option value="1">初級バレエ</option>
                        <option value="2">ヒップホップ中級</option>
                        <option value="3">ジャズダンス上級</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">日付</label>
                      <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">時間</label>
                      <input
                        type="time"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between p-6 border-t border-gray-200">
              <div>
                {selectedReservation && (
                  <Button variant="danger" onClick={() => updateReservationStatus('cancelled')}>
                    キャンセル
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => { setShowModal(false); setSelectedReservation(null); }}>
                  閉じる
                </Button>
                <Button variant="primary" onClick={() => updateReservationStatus('confirmed')}>
                  {selectedReservation ? '更新' : '予約追加'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};