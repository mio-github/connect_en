import React, { useState } from 'react'

interface AnalyticsData {
  date: string
  views: number
  clicks: number
  bookings: number
  revenue: number
  conversion: number
}

interface CustomerSegment {
  segment: string
  count: number
  percentage: number
  averageBooking: number
}

interface PopularTime {
  time: string
  bookings: number
  day: string
}

interface StudioRanking {
  rank: number
  studioName: string
  views: number
  bookings: number
  revenue: number
  rating: number
}

const MarketplaceAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  // Sample analytics data
  const analyticsData: AnalyticsData[] = [
    { date: '2024-01-01', views: 1250, clicks: 189, bookings: 45, revenue: 67500, conversion: 3.6 },
    { date: '2024-01-02', views: 1380, clicks: 207, bookings: 52, revenue: 78000, conversion: 3.8 },
    { date: '2024-01-03', views: 1150, clicks: 173, bookings: 38, revenue: 57000, conversion: 3.3 },
    { date: '2024-01-04', views: 1420, clicks: 234, bookings: 61, revenue: 91500, conversion: 4.3 },
    { date: '2024-01-05', views: 1680, clicks: 294, bookings: 73, revenue: 109500, conversion: 4.3 }
  ]

  const customerSegments: CustomerSegment[] = [
    { segment: '新規顧客', count: 1240, percentage: 62, averageBooking: 1500 },
    { segment: 'リピーター', count: 580, percentage: 29, averageBooking: 2300 },
    { segment: 'VIP会員', count: 180, percentage: 9, averageBooking: 3800 }
  ]

  const popularTimes: PopularTime[] = [
    { time: '19:00-20:00', bookings: 145, day: '平日' },
    { time: '20:00-21:00', bookings: 134, day: '平日' },
    { time: '10:00-11:00', bookings: 98, day: '週末' },
    { time: '11:00-12:00', bookings: 89, day: '週末' },
    { time: '18:00-19:00', bookings: 87, day: '平日' }
  ]

  const studioRanking: StudioRanking[] = [
    { rank: 1, studioName: 'En Dance Studio 渋谷本店', views: 8450, bookings: 234, revenue: 351000, rating: 4.8 },
    { rank: 2, studioName: 'Dance Academy Tokyo', views: 7230, bookings: 189, revenue: 283500, rating: 4.6 },
    { rank: 3, studioName: 'Studio Beat Harajuku', views: 6890, bookings: 167, revenue: 250500, rating: 4.5 },
    { rank: 4, studioName: 'Rhythm Place Shibuya', views: 5670, bookings: 142, revenue: 213000, rating: 4.4 },
    { rank: 5, studioName: 'Move Studio Shinjuku', views: 4980, bookings: 128, revenue: 192000, rating: 4.3 }
  ]

  const totalMetrics = {
    totalViews: analyticsData.reduce((sum, data) => sum + data.views, 0),
    totalClicks: analyticsData.reduce((sum, data) => sum + data.clicks, 0),
    totalBookings: analyticsData.reduce((sum, data) => sum + data.bookings, 0),
    totalRevenue: analyticsData.reduce((sum, data) => sum + data.revenue, 0),
    avgConversion: analyticsData.reduce((sum, data) => sum + data.conversion, 0) / analyticsData.length
  }

  return (
    <div className="marketplace-analytics">
      {/* ヘッダー */}
      <div className="analytics-header">
        <div className="header-content">
          <h1 className="page-title">
            <i className="fas fa-chart-line"></i>
            マーケットプレイス分析【ホットペッパー型】
          </h1>
          <div className="marketplace-badge">
            <span className="badge-text">★ ホットペッパー</span>
          </div>
        </div>

        <div className="header-controls">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="7days">過去7日間</option>
            <option value="30days">過去30日間</option>
            <option value="90days">過去90日間</option>
            <option value="1year">過去1年間</option>
          </select>

          <button className="export-btn">
            <i className="fas fa-download"></i>
            レポートエクスポート
          </button>
        </div>
      </div>

      {/* サマリーKPI */}
      <div className="kpi-summary">
        <div className="kpi-card marketplace-card">
          <div className="kpi-header">
            <div className="kpi-icon marketplace-icon">
              <i className="fas fa-eye"></i>
            </div>
            <div className="kpi-trend trend-up">
              <i className="fas fa-arrow-up"></i>
              +12.5%
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-value">{totalMetrics.totalViews.toLocaleString()}</div>
            <div className="kpi-title">総ページビュー数</div>
          </div>
        </div>

        <div className="kpi-card marketplace-card">
          <div className="kpi-header">
            <div className="kpi-icon marketplace-icon">
              <i className="fas fa-mouse-pointer"></i>
            </div>
            <div className="kpi-trend trend-up">
              <i className="fas fa-arrow-up"></i>
              +8.3%
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-value">{totalMetrics.totalClicks.toLocaleString()}</div>
            <div className="kpi-title">総クリック数</div>
          </div>
        </div>

        <div className="kpi-card marketplace-card">
          <div className="kpi-header">
            <div className="kpi-icon marketplace-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="kpi-trend trend-up">
              <i className="fas fa-arrow-up"></i>
              +15.7%
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-value">{totalMetrics.totalBookings.toLocaleString()}</div>
            <div className="kpi-title">総予約数</div>
          </div>
        </div>

        <div className="kpi-card marketplace-card">
          <div className="kpi-header">
            <div className="kpi-icon marketplace-icon">
              <i className="fas fa-yen-sign"></i>
            </div>
            <div className="kpi-trend trend-up">
              <i className="fas fa-arrow-up"></i>
              +22.1%
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-value">¥{totalMetrics.totalRevenue.toLocaleString()}</div>
            <div className="kpi-title">総売上</div>
          </div>
        </div>

        <div className="kpi-card marketplace-card">
          <div className="kpi-header">
            <div className="kpi-icon marketplace-icon">
              <i className="fas fa-percentage"></i>
            </div>
            <div className="kpi-trend trend-up">
              <i className="fas fa-arrow-up"></i>
              +0.4pt
            </div>
          </div>
          <div className="kpi-content">
            <div className="kpi-value">{totalMetrics.avgConversion.toFixed(1)}%</div>
            <div className="kpi-title">平均コンバージョン率</div>
          </div>
        </div>
      </div>

      {/* メインコンテンツグリッド */}
      <div className="analytics-grid">
        {/* トレンドチャート */}
        <div className="analytics-card chart-card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-chart-line"></i>
              トレンド分析
            </h3>
            <div className="chart-controls">
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="metric-selector"
              >
                <option value="revenue">売上</option>
                <option value="bookings">予約数</option>
                <option value="views">ページビュー</option>
                <option value="conversion">コンバージョン率</option>
              </select>
            </div>
          </div>
          <div className="chart-content">
            <div className="chart-placeholder">
              <i className="fas fa-chart-area chart-icon"></i>
              <p>チャートデータ表示エリア</p>
              <p className="chart-description">
                {selectedMetric === 'revenue' && '売上推移グラフ'}
                {selectedMetric === 'bookings' && '予約数推移グラフ'}
                {selectedMetric === 'views' && 'ページビュー推移グラフ'}
                {selectedMetric === 'conversion' && 'コンバージョン率推移グラフ'}
              </p>
            </div>
          </div>
        </div>

        {/* 顧客セグメント分析 */}
        <div className="analytics-card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-users"></i>
              顧客セグメント分析
            </h3>
          </div>
          <div className="segments-list">
            {customerSegments.map((segment, index) => (
              <div key={index} className="segment-item">
                <div className="segment-info">
                  <div className="segment-name">{segment.segment}</div>
                  <div className="segment-details">
                    <span className="segment-count">{segment.count.toLocaleString()}人</span>
                    <span className="segment-percentage">({segment.percentage}%)</span>
                  </div>
                </div>
                <div className="segment-metrics">
                  <div className="avg-booking">
                    平均単価: ¥{segment.averageBooking.toLocaleString()}
                  </div>
                  <div className="segment-bar">
                    <div
                      className="segment-fill"
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 人気時間帯分析 */}
        <div className="analytics-card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-clock"></i>
              人気時間帯分析
            </h3>
          </div>
          <div className="popular-times-list">
            {popularTimes.map((time, index) => (
              <div key={index} className="time-item">
                <div className="time-rank">#{index + 1}</div>
                <div className="time-info">
                  <div className="time-slot">{time.time}</div>
                  <div className="time-day">{time.day}</div>
                </div>
                <div className="time-bookings">
                  <span className="bookings-count">{time.bookings}件</span>
                  <div className="popularity-bar">
                    <div
                      className="popularity-fill"
                      style={{ width: `${(time.bookings / popularTimes[0].bookings) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* スタジオランキング */}
        <div className="analytics-card ranking-card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-trophy"></i>
              スタジオパフォーマンスランキング
            </h3>
          </div>
          <div className="ranking-list">
            {studioRanking.map((studio) => (
              <div key={studio.rank} className="ranking-item">
                <div className="rank-badge">
                  <span className="rank-number">#{studio.rank}</span>
                </div>
                <div className="studio-info">
                  <div className="studio-name">{studio.studioName}</div>
                  <div className="studio-metrics">
                    <span className="metric">
                      <i className="fas fa-eye"></i>
                      {studio.views.toLocaleString()}
                    </span>
                    <span className="metric">
                      <i className="fas fa-calendar"></i>
                      {studio.bookings.toLocaleString()}
                    </span>
                    <span className="metric">
                      <i className="fas fa-yen-sign"></i>
                      ¥{studio.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="studio-rating">
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fas fa-star ${star <= studio.rating ? 'star-filled' : 'star-empty'}`}
                      ></i>
                    ))}
                  </div>
                  <span className="rating-value">{studio.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 地域別分析 */}
        <div className="analytics-card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-map-marker-alt"></i>
              地域別アクセス分析
            </h3>
          </div>
          <div className="region-analysis">
            <div className="region-item">
              <div className="region-name">東京都</div>
              <div className="region-metrics">
                <div className="region-bar">
                  <div className="region-fill" style={{ width: '65%' }}></div>
                </div>
                <span className="region-percentage">65%</span>
              </div>
            </div>
            <div className="region-item">
              <div className="region-name">神奈川県</div>
              <div className="region-metrics">
                <div className="region-bar">
                  <div className="region-fill" style={{ width: '18%' }}></div>
                </div>
                <span className="region-percentage">18%</span>
              </div>
            </div>
            <div className="region-item">
              <div className="region-name">埼玉県</div>
              <div className="region-metrics">
                <div className="region-bar">
                  <div className="region-fill" style={{ width: '8%' }}></div>
                </div>
                <span className="region-percentage">8%</span>
              </div>
            </div>
            <div className="region-item">
              <div className="region-name">千葉県</div>
              <div className="region-metrics">
                <div className="region-bar">
                  <div className="region-fill" style={{ width: '6%' }}></div>
                </div>
                <span className="region-percentage">6%</span>
              </div>
            </div>
            <div className="region-item">
              <div className="region-name">その他</div>
              <div className="region-metrics">
                <div className="region-bar">
                  <div className="region-fill" style={{ width: '3%' }}></div>
                </div>
                <span className="region-percentage">3%</span>
              </div>
            </div>
          </div>
        </div>

        {/* コンバージョンファネル */}
        <div className="analytics-card funnel-card">
          <div className="card-header">
            <h3 className="card-title">
              <i className="fas fa-filter"></i>
              コンバージョンファネル
            </h3>
          </div>
          <div className="funnel-chart">
            <div className="funnel-step">
              <div className="funnel-bar" style={{ width: '100%' }}>
                <span className="funnel-label">ページビュー</span>
                <span className="funnel-value">6,730</span>
              </div>
            </div>
            <div className="funnel-step">
              <div className="funnel-bar" style={{ width: '35%' }}>
                <span className="funnel-label">詳細ページ</span>
                <span className="funnel-value">2,356</span>
              </div>
            </div>
            <div className="funnel-step">
              <div className="funnel-bar" style={{ width: '18%' }}>
                <span className="funnel-label">予約フォーム</span>
                <span className="funnel-value">1,211</span>
              </div>
            </div>
            <div className="funnel-step">
              <div className="funnel-bar" style={{ width: '12%' }}>
                <span className="funnel-label">決済画面</span>
                <span className="funnel-value">808</span>
              </div>
            </div>
            <div className="funnel-step">
              <div className="funnel-bar" style={{ width: '8%' }}>
                <span className="funnel-label">予約完了</span>
                <span className="funnel-value">538</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marketplace-analytics {
          padding: 24px;
          background: #fafafa;
          min-height: 100vh;
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          background: linear-gradient(135deg, #fff3e0 0%, #ffffff 100%);
          padding: 24px;
          border-radius: 16px;
          border: 2px solid #ff9800;
          box-shadow: 0 4px 20px rgba(255, 152, 0, 0.1);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .page-title {
          font-size: 28px;
          font-weight: 700;
          color: #e65100;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .marketplace-badge {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
        }

        .header-controls {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .period-selector, .metric-selector {
          padding: 8px 16px;
          border: 2px solid #ffcc80;
          border-radius: 8px;
          background: #ffffff;
          color: #e65100;
          font-weight: 500;
          cursor: pointer;
        }

        .export-btn {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
          transition: all 0.2s ease;
        }

        .export-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.4);
        }

        .kpi-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .kpi-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .marketplace-card {
          background: linear-gradient(135deg, #ffffff, #fff8f0);
          border: 2px solid #ffcc80;
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.15);
        }

        .marketplace-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(255, 152, 0, 0.25);
          border-color: #ff9800;
        }

        .kpi-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .kpi-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 8px;
          color: #6b7280;
          font-size: 18px;
        }

        .marketplace-icon {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
        }

        .kpi-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .trend-up {
          background: #10b981;
          color: #047857;
        }

        .kpi-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .kpi-value {
          font-size: 32px;
          font-weight: 700;
          color: #e65100;
          line-height: 1;
        }

        .kpi-title {
          font-size: 13px;
          color: #bf360c;
          font-weight: 600;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
        }

        .analytics-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .chart-card {
          grid-column: span 2;
        }

        .ranking-card {
          grid-column: span 2;
        }

        .funnel-card {
          grid-column: span 2;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #eef1f5;
          background: #f9fafb;
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
          color: #0d1117;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .chart-controls {
          display: flex;
          gap: 12px;
        }

        .chart-content {
          padding: 40px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-placeholder {
          text-align: center;
          color: #6b7280;
        }

        .chart-icon {
          font-size: 48px;
          color: #d1d5db;
          margin-bottom: 16px;
        }

        .chart-description {
          color: #9ca3af;
          font-size: 14px;
        }

        .segments-list, .popular-times-list, .ranking-list {
          padding: 24px;
        }

        .segment-item, .time-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .segment-item:last-child, .time-item:last-child {
          border-bottom: none;
        }

        .segment-info, .time-info {
          flex: 1;
        }

        .segment-name, .time-slot {
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 4px;
        }

        .segment-details, .time-day {
          font-size: 12px;
          color: #6b7280;
        }

        .segment-metrics {
          text-align: right;
        }

        .avg-booking {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .segment-bar, .popularity-bar, .region-bar {
          width: 100px;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }

        .segment-fill, .popularity-fill, .region-fill {
          height: 100%;
          background: #ff9800;
          transition: width 0.3s ease;
        }

        .time-rank {
          width: 30px;
          height: 30px;
          background: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #6b7280;
          font-size: 12px;
        }

        .time-bookings {
          text-align: right;
        }

        .bookings-count {
          font-weight: 600;
          color: #0d1117;
          display: block;
          margin-bottom: 8px;
        }

        .ranking-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .ranking-item:last-child {
          border-bottom: none;
        }

        .rank-badge {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
        }

        .studio-info {
          flex: 1;
        }

        .studio-name {
          font-weight: 600;
          color: #0d1117;
          margin-bottom: 8px;
        }

        .studio-metrics {
          display: flex;
          gap: 16px;
        }

        .metric {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .studio-rating {
          text-align: right;
        }

        .rating-stars {
          margin-bottom: 4px;
        }

        .star-filled {
          color: #fbbf24;
        }

        .star-empty {
          color: #d1d5db;
        }

        .rating-value {
          font-weight: 600;
          color: #0d1117;
          font-size: 14px;
        }

        .region-analysis {
          padding: 24px;
        }

        .region-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
        }

        .region-name {
          font-weight: 500;
          color: #0d1117;
        }

        .region-metrics {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .region-percentage {
          font-weight: 600;
          color: #0d1117;
          width: 40px;
          text-align: right;
        }

        .funnel-chart {
          padding: 24px;
        }

        .funnel-step {
          margin-bottom: 16px;
        }

        .funnel-bar {
          background: linear-gradient(135deg, #ff9800, #f57c00);
          color: white;
          padding: 16px 20px;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .funnel-label {
          font-size: 14px;
        }

        .funnel-value {
          font-size: 16px;
          font-weight: 700;
        }

        @media (max-width: 1024px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }

          .chart-card, .ranking-card, .funnel-card {
            grid-column: span 1;
          }

          .analytics-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .header-controls {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .marketplace-analytics {
            padding: 16px;
          }

          .analytics-header {
            padding: 16px;
          }

          .page-title {
            font-size: 20px;
          }

          .kpi-summary {
            grid-template-columns: 1fr;
          }

          .studio-metrics {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  )
}

export default MarketplaceAnalytics