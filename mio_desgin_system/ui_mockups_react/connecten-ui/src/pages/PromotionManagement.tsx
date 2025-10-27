import React, { useState } from 'react';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { Modal } from '../components/UI/Modal';

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'coupon' | 'campaign' | 'discount';
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  conditions: string[];
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  targetAudience: string[];
  status: 'active' | 'scheduled' | 'expired' | 'disabled';
  createdAt: string;
}

export const PromotionManagement: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');
  const [newPromotion, setNewPromotion] = useState<Partial<Promotion>>({
    type: 'coupon',
    discountType: 'percentage',
    targetAudience: [],
    conditions: []
  });

  const promotions: Promotion[] = [
    {
      id: '1',
      title: '新規体験レッスン30%OFF',
      description: '初回体験レッスンが30%OFFになるお得なクーポン',
      type: 'coupon',
      discountType: 'percentage',
      discountValue: 30,
      conditions: ['初回利用者限定', '1人1回まで'],
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      usageLimit: 500,
      usedCount: 234,
      targetAudience: ['新規顧客'],
      status: 'active',
      createdAt: '2024-10-15'
    },
    {
      id: '2',
      title: '友達紹介キャンペーン',
      description: '友達を紹介すると両方に特典！紹介者・被紹介者それぞれに2,000円クーポン',
      type: 'campaign',
      discountType: 'fixed',
      discountValue: 2000,
      conditions: ['紹介者・被紹介者両方適用', '月1回まで'],
      startDate: '2024-11-15',
      endDate: '2025-01-31',
      usageLimit: 200,
      usedCount: 45,
      targetAudience: ['既存顧客', '新規顧客'],
      status: 'active',
      createdAt: '2024-11-01'
    },
    {
      id: '3',
      title: '年末年始特別割引',
      description: 'レッスン料金が15%OFFになる年末年始限定キャンペーン',
      type: 'discount',
      discountType: 'percentage',
      discountValue: 15,
      conditions: ['期間中のレッスン全て対象'],
      startDate: '2024-12-25',
      endDate: '2025-01-07',
      usageLimit: 1000,
      usedCount: 0,
      targetAudience: ['全顧客'],
      status: 'scheduled',
      createdAt: '2024-11-10'
    }
  ];

  const tabs = [
    { id: 'active', label: '有効', count: promotions.filter(p => p.status === 'active').length },
    { id: 'scheduled', label: '予約済み', count: promotions.filter(p => p.status === 'scheduled').length },
    { id: 'expired', label: '期限切れ', count: promotions.filter(p => p.status === 'expired').length },
    { id: 'all', label: 'すべて', count: promotions.length }
  ];

  const getFilteredPromotions = () => {
    if (selectedTab === 'all') return promotions;
    return promotions.filter(p => p.status === selectedTab);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: '有効', className: 'status-active' },
      scheduled: { label: '予約済み', className: 'status-scheduled' },
      expired: { label: '期限切れ', className: 'status-expired' },
      disabled: { label: '無効', className: 'status-disabled' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      coupon: { label: 'クーポン', className: 'type-coupon', icon: 'fas fa-ticket-alt' },
      campaign: { label: 'キャンペーン', className: 'type-campaign', icon: 'fas fa-bullhorn' },
      discount: { label: '割引', className: 'type-discount', icon: 'fas fa-percent' }
    };

    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.coupon;
    return (
      <span className={`type-badge ${config.className}`}>
        <i className={config.icon}></i>
        {config.label}
      </span>
    );
  };

  const formatDiscount = (promotion: Promotion) => {
    if (promotion.discountType === 'percentage') {
      return `${promotion.discountValue}%OFF`;
    } else {
      return `¥${promotion.discountValue.toLocaleString()}OFF`;
    }
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  const handleCreatePromotion = () => {
    console.log('プロモーション作成', newPromotion);
    setIsCreateModalOpen(false);
    setNewPromotion({
      type: 'coupon',
      discountType: 'percentage',
      targetAudience: [],
      conditions: []
    });
  };

  const handleToggleStatus = (id: string) => {
    console.log('ステータス切り替え', id);
  };

  const handleDuplicate = (id: string) => {
    console.log('プロモーション複製', id);
  };

  const handleDelete = (id: string) => {
    console.log('プロモーション削除', id);
  };

  return (
    <div className="promotion-management">
      <div className="page-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <i className="fas fa-tags text-orange-500"></i>
              プロモーション管理
            </h1>
            <p className="header-subtitle">
              クーポン・キャンペーンでマーケットプレイス集客を強化
            </p>
          </div>
          <div className="header-actions">
            <Button variant="secondary">
              <i className="fas fa-chart-bar"></i> 効果分析
            </Button>
            <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
              <i className="fas fa-plus"></i> 新規作成
            </Button>
          </div>
        </div>
      </div>

      {/* 統計サマリー */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-ticket-alt text-blue-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">8</div>
            <div className="stat-label">有効なプロモーション</div>
          </div>
          <div className="stat-change positive">+2 今月</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users text-green-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">1,247</div>
            <div className="stat-label">今月の利用者数</div>
          </div>
          <div className="stat-change positive">+18.5%</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-yen-sign text-purple-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">¥89,400</div>
            <div className="stat-label">割引総額</div>
          </div>
          <div className="stat-change neutral">今月</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chart-line text-orange-500"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">12.3%</div>
            <div className="stat-label">コンバージョン向上</div>
          </div>
          <div className="stat-change positive">+3.2%</div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="promotion-tabs">
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

      {/* プロモーション一覧 */}
      <div className="promotions-list">
        {getFilteredPromotions().map((promotion) => (
          <div key={promotion.id} className="promotion-card">
            <div className="promotion-header">
              <div className="promotion-title-section">
                {getTypeBadge(promotion.type)}
                <h3>{promotion.title}</h3>
                {getStatusBadge(promotion.status)}
              </div>
              <div className="promotion-discount">
                {formatDiscount(promotion)}
              </div>
            </div>

            <div className="promotion-content">
              <p className="promotion-description">{promotion.description}</p>

              <div className="promotion-details">
                <div className="detail-item">
                  <i className="fas fa-calendar"></i>
                  <span>{promotion.startDate} ～ {promotion.endDate}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-users"></i>
                  <span>{promotion.targetAudience.join(', ')}</span>
                </div>
                <div className="detail-item">
                  <i className="fas fa-list-ul"></i>
                  <span>{promotion.conditions.join(', ')}</span>
                </div>
              </div>

              <div className="usage-stats">
                <div className="usage-header">
                  <span className="usage-label">利用状況</span>
                  <span className="usage-numbers">
                    {promotion.usedCount} / {promotion.usageLimit}回
                  </span>
                </div>
                <div className="usage-bar">
                  <div
                    className="usage-fill"
                    style={{width: `${getUsagePercentage(promotion.usedCount, promotion.usageLimit)}%`}}
                  ></div>
                </div>
                <div className="usage-percentage">
                  {getUsagePercentage(promotion.usedCount, promotion.usageLimit).toFixed(1)}% 使用済み
                </div>
              </div>
            </div>

            <div className="promotion-actions">
              <Button variant="outline" size="sm" onClick={() => handleToggleStatus(promotion.id)}>
                <i className="fas fa-power-off"></i>
                {promotion.status === 'active' ? '停止' : '開始'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDuplicate(promotion.id)}>
                <i className="fas fa-copy"></i> 複製
              </Button>
              <Button variant="outline" size="sm">
                <i className="fas fa-edit"></i> 編集
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(promotion.id)}>
                <i className="fas fa-trash"></i> 削除
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* プロモーション作成モーダル */}
      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="新規プロモーション作成">
        <div className="create-modal-content">
          <div className="form-section">
            <h4>基本情報</h4>
            <div className="form-row">
              <Input
                label="プロモーション名"
                value={newPromotion.title || ''}
                onChange={(e) => setNewPromotion({...newPromotion, title: e.target.value})}
                placeholder="例：新規体験レッスン30%OFF"
              />
            </div>
            <div className="form-row">
              <label>説明</label>
              <textarea
                value={newPromotion.description || ''}
                onChange={(e) => setNewPromotion({...newPromotion, description: e.target.value})}
                placeholder="プロモーションの詳細説明を入力してください"
                rows={3}
              />
            </div>
            <div className="form-row-group">
              <div className="form-row">
                <label>プロモーションタイプ</label>
                <select
                  value={newPromotion.type || 'coupon'}
                  onChange={(e) => setNewPromotion({...newPromotion, type: e.target.value as any})}
                >
                  <option value="coupon">クーポン</option>
                  <option value="campaign">キャンペーン</option>
                  <option value="discount">割引</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>割引設定</h4>
            <div className="form-row-group">
              <div className="form-row">
                <label>割引タイプ</label>
                <select
                  value={newPromotion.discountType || 'percentage'}
                  onChange={(e) => setNewPromotion({...newPromotion, discountType: e.target.value as any})}
                >
                  <option value="percentage">パーセント割引</option>
                  <option value="fixed">固定金額割引</option>
                </select>
              </div>
              <div className="form-row">
                <Input
                  label="割引値"
                  type="number"
                  value={newPromotion.discountValue || ''}
                  onChange={(e) => setNewPromotion({...newPromotion, discountValue: parseInt(e.target.value)})}
                  placeholder={newPromotion.discountType === 'percentage' ? '30' : '2000'}
                />
                <div className="input-suffix">
                  {newPromotion.discountType === 'percentage' ? '%' : '円'}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>期間設定</h4>
            <div className="form-row-group">
              <div className="form-row">
                <Input
                  label="開始日"
                  type="date"
                  value={newPromotion.startDate || ''}
                  onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                />
              </div>
              <div className="form-row">
                <Input
                  label="終了日"
                  type="date"
                  value={newPromotion.endDate || ''}
                  onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                />
              </div>
            </div>
            <div className="form-row">
              <Input
                label="利用回数制限"
                type="number"
                value={newPromotion.usageLimit || ''}
                onChange={(e) => setNewPromotion({...newPromotion, usageLimit: parseInt(e.target.value)})}
                placeholder="500"
              />
            </div>
          </div>

          <div className="form-section">
            <h4>対象・条件設定</h4>
            <div className="form-row">
              <label>対象顧客</label>
              <div className="checkbox-group">
                {['新規顧客', '既存顧客', '全顧客', 'VIP会員'].map((audience) => (
                  <label key={audience} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={newPromotion.targetAudience?.includes(audience)}
                      onChange={(e) => {
                        const current = newPromotion.targetAudience || [];
                        if (e.target.checked) {
                          setNewPromotion({...newPromotion, targetAudience: [...current, audience]});
                        } else {
                          setNewPromotion({...newPromotion, targetAudience: current.filter(a => a !== audience)});
                        }
                      }}
                    />
                    <span>{audience}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-row">
              <label>適用条件</label>
              <textarea
                placeholder="例：初回利用者限定、1人1回まで"
                rows={2}
              />
            </div>
          </div>

          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              キャンセル
            </Button>
            <Button variant="primary" onClick={handleCreatePromotion}>
              <i className="fas fa-save"></i> 作成
            </Button>
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .promotion-management {
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

        .stat-change.neutral {
          background: #f3f4f6;
          color: #6b7280;
        }

        .promotion-tabs {
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

        .promotions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .promotion-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.2s;
        }

        .promotion-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .promotion-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .promotion-title-section {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .promotion-title-section h3 {
          font-size: 20px;
          font-weight: 600;
          color: #0d1117;
          margin: 0;
          flex: 1;
        }

        .promotion-discount {
          font-size: 24px;
          font-weight: 700;
          color: #ff9800;
          padding: 8px 16px;
          background: #fff3e0;
          border-radius: 8px;
          border: 2px solid #ffcc80;
        }

        .type-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .type-badge.type-coupon {
          background: #dbeafe;
          color: #2563eb;
        }

        .type-badge.type-campaign {
          background: #fef3c7;
          color: #d97706;
        }

        .type-badge.type-discount {
          background: #dcfce7;
          color: #15803d;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.status-active {
          background: #dcfce7;
          color: #15803d;
        }

        .status-badge.status-scheduled {
          background: #dbeafe;
          color: #2563eb;
        }

        .status-badge.status-expired {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-badge.status-disabled {
          background: #f3f4f6;
          color: #6b7280;
        }

        .promotion-description {
          color: #6b7785;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .promotion-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #6b7785;
        }

        .detail-item i {
          width: 16px;
          color: #9ca3af;
        }

        .usage-stats {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .usage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .usage-label {
          font-size: 14px;
          font-weight: 600;
          color: #0d1117;
        }

        .usage-numbers {
          font-size: 14px;
          color: #6b7785;
        }

        .usage-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .usage-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff9800, #f57c00);
          transition: width 0.3s ease;
        }

        .usage-percentage {
          font-size: 12px;
          color: #6b7785;
          text-align: right;
        }

        .promotion-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .create-modal-content {
          width: 600px;
          max-width: 90vw;
        }

        .form-section {
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid #f3f4f6;
        }

        .form-section:last-child {
          border-bottom: none;
        }

        .form-section h4 {
          font-size: 18px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 16px 0;
        }

        .form-row {
          margin-bottom: 16px;
        }

        .form-row label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #0d1117;
        }

        .form-row textarea,
        .form-row select {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-family: inherit;
        }

        .form-row-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .input-suffix {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7785;
          font-weight: 600;
        }

        .checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .checkbox-item:hover {
          background: #f8f9fa;
          border-color: #ff9800;
        }

        .checkbox-item input {
          margin: 0;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #f3f4f6;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .promotion-management {
            padding: 16px;
          }

          .header-content {
            flex-direction: column;
            gap: 16px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .promotion-header {
            flex-direction: column;
            gap: 12px;
          }

          .promotion-actions {
            flex-wrap: wrap;
          }

          .form-row-group {
            grid-template-columns: 1fr;
          }

          .create-modal-content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};