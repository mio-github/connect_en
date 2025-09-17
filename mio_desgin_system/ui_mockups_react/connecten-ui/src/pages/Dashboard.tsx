import React, { useState, useEffect } from 'react';
import { Button } from '../components/UI/Button';
import '../styles/Dashboard.css';

interface KPICard {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

interface RecentActivity {
  id: string;
  type: 'member' | 'lesson' | 'payment' | 'booking';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

interface TodayLesson {
  id: string;
  name: string;
  time: string;
  instructor: string;
  studio: string;
  capacity: number;
  booked: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // リアルタイム時刻更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const kpiData: KPICard[] = [
    {
      title: 'アクティブ会員',
      value: 847,
      change: 8.1,
      trend: 'up',
      icon: 'fas fa-users'
    },
    {
      title: '今日の予約',
      value: 32,
      change: -2.3,
      trend: 'down',
      icon: 'fas fa-calendar-check'
    },
    {
      title: 'スタジオ稼働率',
      value: '82.4%',
      change: 4.7,
      trend: 'up',
      icon: 'fas fa-chart-line'
    },
    {
      title: '今月のレッスン数',
      value: 156,
      change: 12.3,
      trend: 'up',
      icon: 'fas fa-graduation-cap'
    }
  ];

  // マーケットプレイス【ホットペッパー型】KPI
  const marketplaceKpiData: KPICard[] = [
    {
      title: 'マーケット予約数',
      value: 342,
      change: 28.5,
      trend: 'up',
      icon: 'fas fa-store'
    },
    {
      title: '平均評価',
      value: '4.7⭐',
      change: 0.2,
      trend: 'up',
      icon: 'fas fa-star'
    },
    {
      title: 'マーケット売上',
      value: '¥124,800',
      change: 15.3,
      trend: 'up',
      icon: 'fas fa-chart-line'
    },
    {
      title: '体験予約数',
      value: 67,
      change: 22.1,
      trend: 'up',
      icon: 'fas fa-user-plus'
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'member',
      title: '新規会員登録',
      description: '田中美咲さんが初級バレエコースに入会',
      timestamp: '5分前',
      status: 'success'
    },
    {
      id: '2',
      type: 'lesson',
      title: 'レッスン開始',
      description: 'K-POP ダンス (Studio B) - 15名参加',
      timestamp: '12分前',
      status: 'success'
    },
    {
      id: '3',
      type: 'payment',
      title: '月謝支払い',
      description: '佐藤健太さん - 1月分月謝支払い完了',
      timestamp: '18分前',
      status: 'success'
    },
    {
      id: '4',
      type: 'booking',
      title: 'レッスン予約',
      description: '山田花子さん - ヨガ&ストレッチ (1/30)',
      timestamp: '25分前',
      status: 'pending'
    },
    {
      id: '5',
      type: 'member',
      title: '退会処理',
      description: '鈴木次郎さんの退会手続き完了',
      timestamp: '1時間前',
      status: 'error'
    }
  ];

  const todayLessons: TodayLesson[] = [
    {
      id: '1',
      name: '初級バレエ',
      time: '10:00-11:30',
      instructor: '山田花子',
      studio: 'Studio A',
      capacity: 20,
      booked: 18,
      status: 'upcoming'
    },
    {
      id: '2',
      name: 'ヒップホップ入門',
      time: '14:00-15:00',
      instructor: '佐藤健太',
      studio: 'Studio B',
      capacity: 15,
      booked: 12,
      status: 'ongoing'
    },
    {
      id: '3',
      name: 'ジャズダンス中級',
      time: '19:00-20:30',
      instructor: '高橋真一',
      studio: 'Studio A',
      capacity: 18,
      booked: 16,
      status: 'upcoming'
    },
    {
      id: '4',
      name: 'ヨガ&ストレッチ',
      time: '20:45-21:45',
      instructor: '鈴木美咲',
      studio: 'Studio C',
      capacity: 12,
      booked: 8,
      status: 'upcoming'
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'fas fa-arrow-up';
      case 'down':
        return 'fas fa-arrow-down';
      default:
        return 'fas fa-minus';
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'member':
        return 'fas fa-user-plus';
      case 'lesson':
        return 'fas fa-play';
      case 'payment':
        return 'fas fa-credit-card';
      case 'booking':
        return 'fas fa-calendar-plus';
      default:
        return 'fas fa-info';
    }
  };

  const getActivityStatusClass = (status: string) => {
    switch (status) {
      case 'success':
        return 'activity-success';
      case 'pending':
        return 'activity-pending';
      case 'error':
        return 'activity-error';
      default:
        return '';
    }
  };

  const getLessonStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { label: '開始前', className: 'status-upcoming' },
      ongoing: { label: '進行中', className: 'status-ongoing' },
      completed: { label: '終了', className: 'status-completed' },
      cancelled: { label: 'キャンセル', className: 'status-cancelled' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;
    return <span className={`lesson-status ${config.className}`}>{config.label}</span>;
  };

  const getCapacityPercentage = (booked: number, capacity: number) => {
    return (booked / capacity) * 100;
  };

  const handleQuickAction = (action: string) => {
    console.log(`クイックアクション実行: ${action}`);
    // 実際の実装では対応するページや機能を呼び出し
  };

  return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-title">ダッシュボード</h1>
            <div className="current-datetime">
              <span className="current-date">
                {currentTime.toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </span>
              <span className="current-time">
                {currentTime.toLocaleTimeString('ja-JP')}
              </span>
            </div>
          </div>
          <div className="header-actions">
            <Button variant="secondary" onClick={() => handleQuickAction('export')}>
              <i className="fas fa-download"></i> データ出力
            </Button>
            <Button variant="primary" onClick={() => handleQuickAction('refresh')}>
              <i className="fas fa-sync-alt"></i> 更新
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="kpi-grid">
          {kpiData.map((kpi, index) => (
            <div key={index} className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon">
                  <i className={kpi.icon}></i>
                </div>
                <div className={`kpi-trend ${getTrendClass(kpi.trend)}`}>
                  <i className={getTrendIcon(kpi.trend)}></i>
                  <span>{Math.abs(kpi.change)}%</span>
                </div>
              </div>
              <div className="kpi-content">
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-title">{kpi.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* マーケットプレイス【ホットペッパー型】KPI */}
        <div className="marketplace-section">
          <div className="section-header">
            <h2 className="section-title">
              <i className="fas fa-store text-orange-500"></i>
              マーケットプレイス【ホットペッパー型】
            </h2>
            <div className="marketplace-badge">
              <span className="badge-text">NEW</span>
            </div>
          </div>
          <div className="kpi-grid marketplace-kpi">
            {marketplaceKpiData.map((kpi, index) => (
              <div key={index} className="kpi-card marketplace-card">
                <div className="kpi-header">
                  <div className="kpi-icon marketplace-icon">
                    <i className={kpi.icon}></i>
                  </div>
                  <div className={`kpi-trend ${getTrendClass(kpi.trend)}`}>
                    <i className={getTrendIcon(kpi.trend)}></i>
                    <span>{Math.abs(kpi.change)}%</span>
                  </div>
                </div>
                <div className="kpi-content">
                  <div className="kpi-value">{kpi.value}</div>
                  <div className="kpi-title">{kpi.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Today's Lessons */}
          <div className="dashboard-card lessons-card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-calendar-day"></i> 本日のレッスン
              </h3>
              <Button variant="secondary" size="sm" onClick={() => handleQuickAction('schedule')}>
                スケジュール
              </Button>
            </div>
            <div className="lessons-list">
              {todayLessons.map((lesson) => (
                <div key={lesson.id} className="lesson-item">
                  <div className="lesson-time">
                    <div className="time-text">{lesson.time}</div>
                    {getLessonStatusBadge(lesson.status)}
                  </div>
                  <div className="lesson-info">
                    <div className="lesson-name">{lesson.name}</div>
                    <div className="lesson-details">
                      <span className="instructor">
                        <i className="fas fa-user"></i> {lesson.instructor}
                      </span>
                      <span className="studio">
                        <i className="fas fa-map-marker-alt"></i> {lesson.studio}
                      </span>
                    </div>
                  </div>
                  <div className="lesson-capacity">
                    <div className="capacity-text">
                      {lesson.booked}/{lesson.capacity}名
                    </div>
                    <div className="capacity-bar">
                      <div 
                        className="capacity-fill"
                        style={{ width: `${getCapacityPercentage(lesson.booked, lesson.capacity)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="dashboard-card activities-card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-history"></i> 最新のアクティビティ
              </h3>
              <Button variant="secondary" size="sm" onClick={() => handleQuickAction('logs')}>
                全て表示
              </Button>
            </div>
            <div className="activities-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className={`activity-item ${getActivityStatusClass(activity.status)}`}>
                  <div className="activity-icon">
                    <i className={getActivityIcon(activity.type)}></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-description">{activity.description}</div>
                  </div>
                  <div className="activity-time">{activity.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card quick-actions-card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-bolt"></i> クイックアクション
              </h3>
            </div>
            <div className="quick-actions-grid">
              <button 
                className="quick-action-btn"
                onClick={() => handleQuickAction('new-member')}
              >
                <i className="fas fa-user-plus"></i>
                <span>新規会員登録</span>
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleQuickAction('new-lesson')}
              >
                <i className="fas fa-plus-circle"></i>
                <span>レッスン作成</span>
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleQuickAction('payment')}
              >
                <i className="fas fa-credit-card"></i>
                <span>支払い処理</span>
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleQuickAction('booking')}
              >
                <i className="fas fa-calendar-plus"></i>
                <span>予約管理</span>
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleQuickAction('reports')}
              >
                <i className="fas fa-chart-line"></i>
                <span>売上レポート</span>
              </button>
              <button 
                className="quick-action-btn"
                onClick={() => handleQuickAction('messages')}
              >
                <i className="fas fa-envelope"></i>
                <span>メール配信</span>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};