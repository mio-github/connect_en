import React, { useState } from 'react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Modal } from '../components/UI/Modal';

interface MarketplaceBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  lessonType: string;
  lessonDate: string;
  lessonTime: string;
  instructor: string;
  studio: string;
  bookingDate: string;
  source: 'marketplace' | 'direct';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'no-show';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  amount: number;
  couponUsed?: string;
  isFirstTime: boolean;
  rating?: number;
  review?: string;
  notes?: string;
}

export const MarketplaceBookings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<MarketplaceBooking | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const bookings: MarketplaceBooking[] = [
    {
      id: 'MB001',
      customerName: '田中美咲',
      customerEmail: 'tanaka@email.com',
      customerPhone: '090-1234-5678',
      lessonType: 'ヒップホップ初級（体験）',
      lessonDate: '2024-11-28',
      lessonTime: '14:00-15:30',
      instructor: '山田太郎',
      studio: 'Studio A',
      bookingDate: '2024-11-25',
      source: 'marketplace',
      status: 'confirmed',
      paymentStatus: 'paid',
      amount: 2100,
      couponUsed: '新規体験30%OFF',
      isFirstTime: true,
      notes: 'マーケットプレイス経由での初回体験予約'
    },
    {
      id: 'MB002',
      customerName: '佐藤健太',
      customerEmail: 'sato@email.com',
      customerPhone: '080-5678-9012',
      lessonType: 'ジャズダンス中級',
      lessonDate: '2024-11-27',
      lessonTime: '19:00-20:30',
      instructor: '鈴木花子',
      studio: 'Studio B',
      bookingDate: '2024-11-20',
      source: 'marketplace',
      status: 'completed',
      paymentStatus: 'paid',
      amount: 4500,
      isFirstTime: false,
      rating: 5,
      review: 'とても楽しいレッスンでした！',
      notes: 'リピート顧客'
    },
    {
      id: 'MB003',
      customerName: '高橋さくら',
      customerEmail: 'takahashi@email.com',
      customerPhone: '070-2345-6789',
      lessonType: 'バレエ基礎（体験）',
      lessonDate: '2024-11-29',
      lessonTime: '10:00-11:30',
      instructor: '田中恵美',
      studio: 'Studio C',
      bookingDate: '2024-11-26',
      source: 'marketplace',
      status: 'pending',
      paymentStatus: 'pending',
      amount: 2800,
      isFirstTime: true,
      notes: '支払い待ち'
    },
    {
      id: 'MB004',
      customerName: '中村大輔',
      customerEmail: 'nakamura@email.com',
      customerPhone: '090-3456-7890',
      lessonType: 'K-POP ダンス',
      lessonDate: '2024-11-26',
      lessonTime: '18:00-19:30',
      instructor: '金田ユキ',
      studio: 'Studio A',
      bookingDate: '2024-11-22',
      source: 'marketplace',
      status: 'no-show',
      paymentStatus: 'paid',
      amount: 4000,
      isFirstTime: false,
      notes: '無断欠席'
    }
  ];

  const tabs = [
    { id: 'all', label: 'すべて', count: bookings.length },
    { id: 'confirmed', label: '確定済み', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'pending', label: '保留中', count: bookings.filter(b => b.status === 'pending').length },
    { id: 'completed', label: '完了', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'キャンセル', count: bookings.filter(b => b.status === 'cancelled').length }
  ];

  const getFilteredBookings = () => {
    let filtered = selectedTab === 'all' ? bookings : bookings.filter(b => b.status === selectedTab);

    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.customerName.includes(searchTerm) ||
        b.customerEmail.includes(searchTerm) ||
        b.lessonType.includes(searchTerm)
      );
    }

    if (filterDate) {
      filtered = filtered.filter(b => b.lessonDate === filterDate);
    }

    return filtered;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: '確定済み', className: 'status-confirmed' },
      pending: { label: '保留中', className: 'status-pending' },
      cancelled: { label: 'キャンセル', className: 'status-cancelled' },
      completed: { label: '完了', className: 'status-completed' },
      'no-show': { label: '無断欠席', className: 'status-no-show' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: '支払済み', className: 'payment-paid' },
      pending: { label: '支払待ち', className: 'payment-pending' },
      failed: { label: '支払失敗', className: 'payment-failed' },
      refunded: { label: '返金済み', className: 'payment-refunded' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={`payment-badge ${config.className}`}>{config.label}</span>;
  };

  const getSourceBadge = (source: string) => {
    const sourceConfig = {
      marketplace: { label: 'マーケットプレイス', className: 'source-marketplace', icon: 'fas fa-store' },
      direct: { label: '直接予約', className: 'source-direct', icon: 'fas fa-phone' }
    };

    const config = sourceConfig[source as keyof typeof sourceConfig] || sourceConfig.marketplace;
    return (
      <span className={`source-badge ${config.className}`}>
        <i className={config.icon}></i>
        {config.label}
      </span>
    );
  };

  const handleViewDetails = (booking: MarketplaceBooking) => {
    setSelectedBooking(booking);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    console.log('ステータス変更:', bookingId, newStatus);
  };

  const handleSendMessage = (booking: MarketplaceBooking) => {
    console.log('メッセージ送信:', booking.customerEmail);
  };

  const renderRatingStars = (rating?: number) => {
    if (!rating) return <span className="text-gray-400">未評価</span>;

    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <div className="marketplace-bookings">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <i className="fas fa-calendar-check text-orange-500"></i>
              マーケットプレイス予約管理
            </h1>
            <p className="header-subtitle">
              マーケットプレイス経由の予約を一元管理
            </p>
          </div>
          <div className="header-actions">
            <Button variant="secondary">
              <i className="fas fa-download"></i> CSVエクスポート
            </Button>
            <Button variant="primary">
              <i className="fas fa-plus"></i> 手動予約追加
            </Button>
          </div>
        </div>
      </div>

      {/* 統計カード */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-plus text-blue-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">156</div>
            <div className="stat-label">今月の予約数</div>
          </div>
          <div className="stat-change positive">+22.1%</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users text-green-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">89</div>
            <div className="stat-label">新規顧客</div>
          </div>
          <div className="stat-change positive">+35.2%</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-yen-sign text-purple-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">¥342,000</div>
            <div className="stat-label">今月の売上</div>
          </div>
          <div className="stat-change positive">+18.7%</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-star text-yellow-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">4.7</div>
            <div className="stat-label">平均評価</div>
          </div>
          <div className="stat-change positive">+0.2</div>
        </div>
      </div>

      {/* フィルター */}
      <div className="filters-section">
        <div className="filters-row">
          <div className="search-box">
            <Input
              placeholder="顧客名、メール、レッスン名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            placeholder="日付でフィルター"
          />
          <Button variant="outline">
            <i className="fas fa-filter"></i> 詳細フィルター
          </Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="booking-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${selectedTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
            <span className="tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* 予約一覧 */}
      <div className="bookings-list">
        {getFilteredBookings().map((booking) => (
          <div key={booking.id} className="booking-card">
            <div className="booking-header">
              <div className="booking-id">#{booking.id}</div>
              <div className="booking-badges">
                {getSourceBadge(booking.source)}
                {getStatusBadge(booking.status)}
                {getPaymentStatusBadge(booking.paymentStatus)}
                {booking.isFirstTime && (
                  <span className="first-time-badge">
                    <i className="fas fa-star"></i> 初回
                  </span>
                )}
              </div>
            </div>

            <div className="booking-content">
              <div className="customer-info">
                <h3>{booking.customerName}</h3>
                <div className="customer-details">
                  <span>
                    <i className="fas fa-envelope"></i> {booking.customerEmail}
                  </span>
                  <span>
                    <i className="fas fa-phone"></i> {booking.customerPhone}
                  </span>
                </div>
              </div>

              <div className="lesson-info">
                <h4>{booking.lessonType}</h4>
                <div className="lesson-details">
                  <div className="detail-row">
                    <i className="fas fa-calendar"></i>
                    <span>{booking.lessonDate} {booking.lessonTime}</span>
                  </div>
                  <div className="detail-row">
                    <i className="fas fa-user-tie"></i>
                    <span>{booking.instructor}</span>
                  </div>
                  <div className="detail-row">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{booking.studio}</span>
                  </div>
                </div>
              </div>

              <div className="booking-meta">
                <div className="amount">¥{booking.amount.toLocaleString()}</div>
                {booking.couponUsed && (
                  <div className="coupon-used">
                    <i className="fas fa-tag"></i> {booking.couponUsed}
                  </div>
                )}
                <div className="booking-date">
                  予約日: {booking.bookingDate}
                </div>
              </div>
            </div>

            {booking.status === 'completed' && booking.rating && (
              <div className="review-section">
                <div className="review-header">
                  <span>お客様評価</span>
                  {renderRatingStars(booking.rating)}
                </div>
                {booking.review && (
                  <div className="review-text">"{booking.review}"</div>
                )}
              </div>
            )}

            <div className="booking-actions">
              <Button variant="outline" size="sm" onClick={() => handleViewDetails(booking)}>
                <i className="fas fa-eye"></i> 詳細
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleSendMessage(booking)}>
                <i className="fas fa-envelope"></i> 連絡
              </Button>
              <div className="status-dropdown">
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">保留中</option>
                  <option value="confirmed">確定済み</option>
                  <option value="completed">完了</option>
                  <option value="cancelled">キャンセル</option>
                  <option value="no-show">無断欠席</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="予約詳細"
      >
        {selectedBooking && (
          <div className="booking-details-modal">
            <div className="details-section">
              <h4>顧客情報</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <label>氏名</label>
                  <span>{selectedBooking.customerName}</span>
                </div>
                <div className="detail-item">
                  <label>メールアドレス</label>
                  <span>{selectedBooking.customerEmail}</span>
                </div>
                <div className="detail-item">
                  <label>電話番号</label>
                  <span>{selectedBooking.customerPhone}</span>
                </div>
                <div className="detail-item">
                  <label>顧客区分</label>
                  <span>{selectedBooking.isFirstTime ? '新規顧客' : 'リピート顧客'}</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h4>レッスン情報</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <label>レッスン</label>
                  <span>{selectedBooking.lessonType}</span>
                </div>
                <div className="detail-item">
                  <label>日時</label>
                  <span>{selectedBooking.lessonDate} {selectedBooking.lessonTime}</span>
                </div>
                <div className="detail-item">
                  <label>インストラクター</label>
                  <span>{selectedBooking.instructor}</span>
                </div>
                <div className="detail-item">
                  <label>スタジオ</label>
                  <span>{selectedBooking.studio}</span>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h4>予約・支払い情報</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <label>予約日時</label>
                  <span>{selectedBooking.bookingDate}</span>
                </div>
                <div className="detail-item">
                  <label>予約経路</label>
                  <span>{getSourceBadge(selectedBooking.source)}</span>
                </div>
                <div className="detail-item">
                  <label>料金</label>
                  <span>¥{selectedBooking.amount.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <label>支払い状況</label>
                  <span>{getPaymentStatusBadge(selectedBooking.paymentStatus)}</span>
                </div>
                {selectedBooking.couponUsed && (
                  <div className="detail-item">
                    <label>使用クーポン</label>
                    <span>{selectedBooking.couponUsed}</span>
                  </div>
                )}
              </div>
            </div>

            {selectedBooking.rating && (
              <div className="details-section">
                <h4>お客様評価</h4>
                <div className="rating-display">
                  {renderRatingStars(selectedBooking.rating)}
                  <span className="rating-value">({selectedBooking.rating}/5)</span>
                </div>
                {selectedBooking.review && (
                  <div className="review-display">
                    <label>コメント</label>
                    <div className="review-content">"{selectedBooking.review}"</div>
                  </div>
                )}
              </div>
            )}

            {selectedBooking.notes && (
              <div className="details-section">
                <h4>備考</h4>
                <div className="notes-display">{selectedBooking.notes}</div>
              </div>
            )}

            <div className="modal-actions">
              <Button variant="secondary" onClick={() => setIsDetailsModalOpen(false)}>
                閉じる
              </Button>
              <Button variant="primary">
                <i className="fas fa-edit"></i> 編集
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <style jsx>{`
        .marketplace-bookings {
          padding: 24px;
          background: #fafafa;
          min-height: 100vh;
        }

        .page-header {
          background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
          border: 2px solid #ff9800;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 4px 20px rgba(255, 152, 0, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .header-title h1 {
          font-size: 32px;
          font-weight: 700;
          color: #e65100;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-subtitle {
          font-size: 16px;
          color: #bf360c;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 16px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #6b7785;
        }

        .stat-change {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .stat-change.positive {
          background: #dcfce7;
          color: #15803d;
        }

        .filters-section {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .filters-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .search-box {
          position: relative;
          flex: 1;
        }

        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7785;
        }

        .booking-tabs {
          display: flex;
          background: white;
          border-radius: 12px;
          padding: 8px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .tab-button {
          flex: 1;
          padding: 12px 16px;
          border: none;
          background: none;
          color: #6b7785;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .tab-button.active {
          background: #ff9800;
          color: white;
        }

        .tab-button:hover:not(.active) {
          background: #f8f9fa;
        }

        .tab-count {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .tab-button.active .tab-count {
          background: rgba(255, 255, 255, 0.3);
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .booking-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }

        .booking-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .booking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .booking-id {
          font-family: monospace;
          font-weight: 600;
          color: #6b7785;
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .booking-badges {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.status-confirmed {
          background: #dcfce7;
          color: #15803d;
        }

        .status-badge.status-pending {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.status-cancelled {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-badge.status-completed {
          background: #dbeafe;
          color: #2563eb;
        }

        .status-badge.status-no-show {
          background: #f3f4f6;
          color: #6b7280;
        }

        .payment-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .payment-badge.payment-paid {
          background: #dcfce7;
          color: #15803d;
        }

        .payment-badge.payment-pending {
          background: #fef3c7;
          color: #d97706;
        }

        .payment-badge.payment-failed {
          background: #fee2e2;
          color: #dc2626;
        }

        .payment-badge.payment-refunded {
          background: #e0e7ff;
          color: #3730a3;
        }

        .source-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .source-badge.source-marketplace {
          background: #fff3e0;
          color: #ff9800;
          border: 1px solid #ffcc80;
        }

        .source-badge.source-direct {
          background: #f3f4f6;
          color: #6b7280;
        }

        .first-time-badge {
          background: #fef3c7;
          color: #d97706;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .booking-content {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          margin-bottom: 16px;
        }

        .customer-info h3 {
          font-size: 18px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 8px 0;
        }

        .customer-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
          color: #6b7785;
        }

        .lesson-info h4 {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 8px 0;
        }

        .lesson-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7785;
        }

        .detail-row i {
          width: 16px;
          color: #9ca3af;
        }

        .booking-meta {
          text-align: right;
        }

        .amount {
          font-size: 20px;
          font-weight: 700;
          color: #ff9800;
          margin-bottom: 4px;
        }

        .coupon-used {
          font-size: 12px;
          color: #15803d;
          background: #dcfce7;
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 4px;
        }

        .booking-date {
          font-size: 12px;
          color: #6b7785;
        }

        .review-section {
          border-top: 1px solid #f3f4f6;
          padding-top: 16px;
          margin-bottom: 16px;
        }

        .review-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .rating-stars {
          display: flex;
          gap: 2px;
        }

        .review-text {
          font-style: italic;
          color: #6b7785;
          background: #f8f9fa;
          padding: 8px 12px;
          border-radius: 6px;
          border-left: 3px solid #ff9800;
        }

        .booking-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          align-items: center;
        }

        .status-select {
          padding: 6px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          background: white;
          font-size: 12px;
          cursor: pointer;
        }

        .booking-details-modal {
          width: 700px;
          max-width: 90vw;
        }

        .details-section {
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f3f4f6;
        }

        .details-section:last-child {
          border-bottom: none;
        }

        .details-section h4 {
          font-size: 18px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 16px 0;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-item label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7785;
          text-transform: uppercase;
        }

        .detail-item span {
          font-size: 14px;
          color: #0d1117;
        }

        .rating-display {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .rating-value {
          font-size: 14px;
          color: #6b7785;
        }

        .review-display label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #6b7785;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .review-content {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 6px;
          border-left: 3px solid #ff9800;
          font-style: italic;
        }

        .notes-display {
          background: #f8f9fa;
          padding: 12px;
          border-radius: 6px;
          color: #6b7785;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #f3f4f6;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .booking-content {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .filters-row {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .marketplace-bookings {
            padding: 16px;
          }

          .header-content {
            flex-direction: column;
            gap: 16px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .booking-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .booking-actions {
            flex-wrap: wrap;
          }

          .details-grid {
            grid-template-columns: 1fr;
          }

          .booking-details-modal {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};