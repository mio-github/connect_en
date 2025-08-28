import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import '../styles/ReportsAnalytics.css';

interface MetricData {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  comparison: string;
}

interface ChartData {
  labels: string[];
  data: number[];
  type: 'bar' | 'line';
}

interface RankingItem {
  rank: number;
  name: string;
  detail: string;
  value: string;
}

export const ReportsAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [chartType, setChartType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const metrics: MetricData[] = [
    {
      title: 'アクティブ会員数',
      value: 842,
      change: 5.2,
      trend: 'up',
      comparison: '前月比 +42名'
    },
    {
      title: 'レッスン稼働率',
      value: '78.5%',
      change: -2.1,
      trend: 'down',
      comparison: '前月比 -2.1ポイント'
    },
    {
      title: '今月のレッスン数',
      value: 280,
      change: 12.5,
      trend: 'up',
      comparison: '前月比 +31レッスン'
    },
    {
      title: '平均参加率',
      value: '85.3%',
      change: 8.3,
      trend: 'up',
      comparison: '前月比 +3.2ポイント'
    }
  ];

  const lessonRankings: RankingItem[] = [
    { rank: 1, name: '初級バレエ - 月曜19:00', detail: '講師: 山田花子 | Studio A', value: '92%' },
    { rank: 2, name: 'K-POP ダンス - 土曜15:00', detail: '講師: 佐藤健太 | Studio B', value: '88%' },
    { rank: 3, name: 'ヨガ&ストレッチ - 水曜10:00', detail: '講師: 鈴木美咲 | Studio C', value: '85%' },
    { rank: 4, name: 'ジャズダンス中級 - 火曜20:00', detail: '講師: 高橋真一 | Studio A', value: '82%' },
    { rank: 5, name: 'キッズヒップホップ - 日曜11:00', detail: '講師: 田中優子 | Studio B', value: '78%' }
  ];

  const activityComposition = [
    { label: '個人レッスン', percentage: 40, color: '#2563eb' },
    { label: 'グループレッスン', percentage: 30, color: '#10b981' },
    { label: '体験レッスン', percentage: 15, color: '#f59e0b' },
    { label: 'イベント', percentage: 10, color: '#8b5cf6' },
    { label: 'その他', percentage: 5, color: '#6b7280' }
  ];

  const locationPerformance = [
    {
      name: '渋谷本校',
      change: 15.2,
      members: 412,
      lessons: 156,
      occupancy: 82.3,
      satisfaction: 4.8
    },
    {
      name: '新宿校',
      change: 8.7,
      members: 298,
      lessons: 124,
      occupancy: 76.8,
      satisfaction: 4.6
    },
    {
      name: '横浜校',
      change: -12.3,
      members: 132,
      lessons: 48,
      occupancy: 65.2,
      satisfaction: 4.2
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '→';
    }
  };

  const getTrendClass = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'trend-up';
      case 'down':
        return 'trend-down';
      default:
        return 'trend-stable';
    }
  };

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
    // 実装: データの再取得
  };

  const handleExportReport = () => {
    console.log('レポートを出力中...');
    // 実装: レポート出力処理
  };

  const handleRefreshData = () => {
    console.log('データを更新中...');
    // 実装: データ更新処理
  };

  // 簡易的なチャート描画（実際の実装ではChart.jsなどを使用）
  const renderBarChart = (data: number[], labels: string[]) => {
    const maxValue = Math.max(...data);
    
    return (
      <div className="chart-area">
        <div className="chart-bars">
          {data.map((value, index) => (
            <div key={index} className="chart-bar-container">
              <div 
                className="chart-bar" 
                style={{ height: `${(value / maxValue) * 100}%` }}
                title={`${labels[index]}: ${value}%`}
              />
              <span className="chart-label">{labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="reports-analytics">
        <div className="page-header">
          <div className="page-title-section">
            <h1 className="page-title">レポート・分析</h1>
            <p className="page-subtitle">ビジネスインサイトとパフォーマンス分析</p>
          </div>
          <div className="page-actions">
            <Button variant="secondary" onClick={handleExportReport}>
              📥 レポート出力
            </Button>
            <Button variant="primary" onClick={handleRefreshData}>
              🔄 データ更新
            </Button>
          </div>
        </div>

        {/* 期間選択 */}
        <div className="period-selector">
          <div className="period-buttons">
            {[
              { key: 'today', label: '今日' },
              { key: 'week', label: '今週' },
              { key: 'month', label: '今月' },
              { key: 'quarter', label: '四半期' },
              { key: 'year', label: '年度' }
            ].map((period) => (
              <button
                key={period.key}
                className={`period-btn ${selectedPeriod === period.key ? 'active' : ''}`}
                onClick={() => handlePeriodChange(period.key as typeof selectedPeriod)}
              >
                {period.label}
              </button>
            ))}
          </div>
          <div className="custom-period">
            <input type="date" className="date-input" defaultValue="2025-01-01" />
            <span>〜</span>
            <input type="date" className="date-input" defaultValue="2025-01-31" />
            <Button variant="primary" size="sm">適用</Button>
          </div>
        </div>

        {/* メトリクス */}
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <span className="metric-title">{metric.title}</span>
                <span className={`metric-trend ${getTrendClass(metric.trend)}`}>
                  <span className="trend-icon">{getTrendIcon(metric.trend)}</span>
                  <span className="trend-value">{Math.abs(metric.change)}%</span>
                </span>
              </div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-comparison">{metric.comparison}</div>
            </div>
          ))}
        </div>

        {/* チャートセクション */}
        <div className="charts-grid">
          {/* 売上推移 */}
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">売上推移</h3>
              <div className="chart-controls">
                <button 
                  className={`chart-btn ${chartType === 'daily' ? 'active' : ''}`}
                  onClick={() => setChartType('daily')}
                >
                  日別
                </button>
                <button 
                  className={`chart-btn ${chartType === 'weekly' ? 'active' : ''}`}
                  onClick={() => setChartType('weekly')}
                >
                  週別
                </button>
                <button 
                  className={`chart-btn ${chartType === 'monthly' ? 'active' : ''}`}
                  onClick={() => setChartType('monthly')}
                >
                  月別
                </button>
              </div>
            </div>
            {renderBarChart([60, 75, 85, 70, 90, 80, 95], ['1日', '5日', '10日', '15日', '20日', '25日', '30日'])}
          </div>

          {/* 会員数推移 */}
          <div className="chart-container">
            <div className="chart-header">
              <h3 className="chart-title">会員数推移</h3>
              <div className="chart-controls">
                <button className="chart-btn">新規</button>
                <button className="chart-btn active">累計</button>
                <button className="chart-btn">退会</button>
              </div>
            </div>
            <div className="chart-area">
              <div className="line-chart">
                <div className="line-path"></div>
                <div className="line-points">
                  {[60, 50, 45, 35, 30, 25].map((top, index) => (
                    <div
                      key={index}
                      className="line-point"
                      style={{ left: `${10 + index * 15}%`, top: `${top}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 詳細レポート */}
        <div className="reports-grid">
          {/* 人気レッスンランキング */}
          <div className="report-card">
            <div className="report-header">
              <h3 className="report-title">人気レッスンランキング</h3>
              <Button variant="secondary" size="sm">詳細</Button>
            </div>
            <div className="ranking-list">
              {lessonRankings.map((item) => (
                <div key={item.rank} className="ranking-item">
                  <span className={`ranking-number ${item.rank <= 3 ? 'top-rank' : ''}`}>
                    {item.rank}
                  </span>
                  <div className="ranking-info">
                    <div className="ranking-name">{item.name}</div>
                    <div className="ranking-detail">{item.detail}</div>
                  </div>
                  <div className="ranking-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 売上構成 */}
          <div className="report-card">
            <div className="report-header">
              <h3 className="report-title">売上構成分析</h3>
              <Button variant="secondary" size="sm">詳細</Button>
            </div>
            <div className="composition-chart">
              {revenueComposition.map((item, index) => (
                <div key={index} className="composition-item">
                  <div className="composition-bar">
                    <div
                      className="composition-fill"
                      style={{
                        width: `${item.percentage * 0.8}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <span className="composition-label">
                    {item.label}: {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 拠点別パフォーマンステーブル */}
        <div className="performance-table">
          <div className="table-header">
            <h3 className="table-title">拠点別パフォーマンス</h3>
            <div className="table-actions">
              <Button variant="secondary" size="sm">CSV出力</Button>
              <Button variant="secondary" size="sm">印刷</Button>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>拠点名</th>
                  <th>売上</th>
                  <th>前月比</th>
                  <th>会員数</th>
                  <th>レッスン数</th>
                  <th>稼働率</th>
                  <th>客単価</th>
                </tr>
              </thead>
              <tbody>
                {locationPerformance.map((location, index) => (
                  <tr key={index}>
                    <td className="location-name">{location.name}</td>
                    <td className="revenue">{location.revenue}</td>
                    <td className={`change ${location.change > 0 ? 'positive' : 'negative'}`}>
                      {location.change > 0 ? '+' : ''}{location.change}%
                    </td>
                    <td>{location.members}</td>
                    <td>{location.lessons}</td>
                    <td>{location.occupancy}%</td>
                    <td>{location.avgSpend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};