import React, { useState } from 'react';
import { Button } from '../components/UI/Button';

interface MarketplaceMetrics {
  totalBookings: number;
  averageRating: number;
  monthlyRevenue: number;
  trialBookings: number;
  conversionRate: number;
  reviewCount: number;
}

interface MarketplaceActivity {
  id: string;
  type: 'booking' | 'review' | 'promotion' | 'inquiry';
  title: string;
  description: string;
  timestamp: string;
  status: 'new' | 'processing' | 'completed';
}

export const MarketplaceDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const metrics: MarketplaceMetrics = {
    totalBookings: 342,
    averageRating: 4.7,
    monthlyRevenue: 124800,
    trialBookings: 67,
    conversionRate: 68.5,
    reviewCount: 89
  };

  const recentActivities: MarketplaceActivity[] = [
    {
      id: '1',
      type: 'booking',
      title: '体験レッスン予約',
      description: '田中美咲さん - ヒップホップ初級クラス',
      timestamp: '5分前',
      status: 'new'
    },
    {
      id: '2',
      type: 'review',
      title: '新しいレビュー',
      description: '山田太郎さん - ★★★★★ "とても良いスタジオです"',
      timestamp: '12分前',
      status: 'new'
    },
    {
      id: '3',
      type: 'booking',
      title: 'マーケット経由予約',
      description: '佐藤花子さん - ジャズダンス中級クラス',
      timestamp: '18分前',
      status: 'completed'
    },
    {
      id: '4',
      type: 'inquiry',
      title: 'お問い合わせ',
      description: 'レッスン料金について - 鈴木一郎さん',
      timestamp: '25分前',
      status: 'processing'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return 'fas fa-calendar-plus';
      case 'review':
        return 'fas fa-star';
      case 'promotion':
        return 'fas fa-tags';
      case 'inquiry':
        return 'fas fa-question-circle';
      default:
        return 'fas fa-info';
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: '新規', className: 'status-new' },
      processing: { label: '処理中', className: 'status-processing' },
      completed: { label: '完了', className: 'status-completed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  return (
    <div className="marketplace-dashboard">
      <div className="marketplace-header">
        <div className="header-content">
          <div className="header-title">
            <h1>
              <i className="fas fa-store text-orange-500"></i>
              マーケットプレイス【ホットペッパー型】
            </h1>
            <p className="header-subtitle">
              新規顧客獲得と予約管理の統合ダッシュボード
            </p>
          </div>
          <div className="header-actions">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-selector"
            >
              <option value="week">今週</option>
              <option value="month">今月</option>
              <option value="quarter">四半期</option>
            </select>
            <Button variant="primary">
              <i className="fas fa-edit"></i> スタジオページ編集
            </Button>
          </div>
        </div>
      </div>

      {/* メトリクスカード */}
      <div className="metrics-grid">
        <div className="metric-card highlight">
          <div className="metric-header">
            <i className="fas fa-calendar-check text-orange-500"></i>
            <span className="metric-change positive">+28.5%</span>
          </div>
          <div className="metric-value">{metrics.totalBookings}</div>
          <div className="metric-label">マーケット予約数</div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-header">
            <i className="fas fa-star text-yellow-500"></i>
            <span className="metric-change positive">+0.2</span>
          </div>
          <div className="metric-value">{metrics.averageRating}⭐</div>
          <div className="metric-label">平均評価 ({metrics.reviewCount}件)</div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-header">
            <i className="fas fa-yen-sign text-green-500"></i>
            <span className="metric-change positive">+15.3%</span>
          </div>
          <div className="metric-value">¥{metrics.monthlyRevenue.toLocaleString()}</div>
          <div className="metric-label">マーケット売上</div>
        </div>

        <div className="metric-card highlight">
          <div className="metric-header">
            <i className="fas fa-user-plus text-blue-500"></i>
            <span className="metric-change positive">+22.1%</span>
          </div>
          <div className="metric-value">{metrics.trialBookings}</div>
          <div className="metric-label">体験予約数</div>
        </div>
      </div>

      {/* メインコンテンツエリア */}
      <div className="marketplace-content">
        <div className="content-section">
          <div className="section-card">
            <div className="section-header">
              <h3>
                <i className="fas fa-chart-line"></i>
                パフォーマンス概要
              </h3>
            </div>
            <div className="performance-stats">
              <div className="stat-item">
                <div className="stat-label">コンバージョン率</div>
                <div className="stat-value">{metrics.conversionRate}%</div>
                <div className="stat-description">体験 → 入会</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">リピート率</div>
                <div className="stat-value">73.2%</div>
                <div className="stat-description">2回目以降予約</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">キャンセル率</div>
                <div className="stat-value">8.7%</div>
                <div className="stat-description">予約キャンセル</div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-section">
          <div className="section-card">
            <div className="section-header">
              <h3>
                <i className="fas fa-bell"></i>
                最近のアクティビティ
              </h3>
              <Button variant="secondary" size="sm">
                すべて表示
              </Button>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <i className={getActivityIcon(activity.type)}></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-description">{activity.description}</div>
                    <div className="activity-meta">
                      <span className="activity-time">{activity.timestamp}</span>
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* クイックアクション */}
      <div className="quick-actions">
        <h3>クイックアクション</h3>
        <div className="actions-grid">
          <Button variant="outline" className="action-btn">
            <i className="fas fa-edit"></i>
            <div>
              <div className="action-title">スタジオページ編集</div>
              <div className="action-desc">基本情報・写真の更新</div>
            </div>
          </Button>
          <Button variant="outline" className="action-btn">
            <i className="fas fa-tags"></i>
            <div>
              <div className="action-title">プロモーション作成</div>
              <div className="action-desc">クーポン・キャンペーン</div>
            </div>
          </Button>
          <Button variant="outline" className="action-btn">
            <i className="fas fa-chart-bar"></i>
            <div>
              <div className="action-title">詳細分析</div>
              <div className="action-desc">売上・予約データ分析</div>
            </div>
          </Button>
          <Button variant="outline" className="action-btn">
            <i className="fas fa-star"></i>
            <div>
              <div className="action-title">レビュー管理</div>
              <div className="action-desc">口コミ返信・管理</div>
            </div>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .marketplace-dashboard {
          padding: 24px;
          background: #fafafa;
          min-height: 100vh;
        }

        .marketplace-header {
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
          align-items: center;
        }

        .period-selector {
          padding: 8px 16px;
          border: 2px solid #ff9800;
          border-radius: 8px;
          background: white;
          color: #e65100;
          font-weight: 600;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 32px;
        }

        .metric-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }

        .metric-card.highlight {
          background: linear-gradient(135deg, #ffffff, #fff8f0);
          border: 2px solid #ffcc80;
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
        }

        .metric-card.highlight:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(255, 152, 0, 0.25);
        }

        .metric-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .metric-change {
          font-size: 14px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .metric-change.positive {
          background: #dcfce7;
          color: #15803d;
        }

        .metric-value {
          font-size: 32px;
          font-weight: 700;
          color: #e65100;
          margin-bottom: 8px;
        }

        .metric-label {
          font-size: 14px;
          color: #bf360c;
          font-weight: 600;
        }

        .marketplace-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .section-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 2px solid #f3f4f6;
        }

        .section-header h3 {
          font-size: 18px;
          font-weight: 600;
          color: #0d1117;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .performance-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat-item {
          text-align: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .stat-label {
          font-size: 12px;
          color: #6b7785;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #0d1117;
          margin-bottom: 4px;
        }

        .stat-description {
          font-size: 11px;
          color: #9ca3af;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #ff9800;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-title {
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 4px;
        }

        .activity-description {
          font-size: 14px;
          color: #6b7785;
          margin-bottom: 8px;
        }

        .activity-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .activity-time {
          font-size: 12px;
          color: #9ca3af;
        }

        .status-badge {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        .status-badge.status-new {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.status-processing {
          background: #dbeafe;
          color: #2563eb;
        }

        .status-badge.status-completed {
          background: #dcfce7;
          color: #15803d;
        }

        .quick-actions {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .quick-actions h3 {
          font-size: 20px;
          font-weight: 600;
          color: #0d1117;
          margin: 0 0 20px 0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px 16px;
          text-align: center;
          height: auto;
        }

        .action-title {
          font-weight: 600;
          color: #0d1117;
        }

        .action-desc {
          font-size: 12px;
          color: #6b7785;
        }

        @media (max-width: 1024px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .marketplace-content {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .marketplace-dashboard {
            padding: 16px;
          }

          .header-content {
            flex-direction: column;
            gap: 16px;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .performance-stats {
            grid-template-columns: 1fr;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};