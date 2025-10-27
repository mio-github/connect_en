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

interface SchoolData {
  id: string;
  name: string;
  activeMembers: number;
  attendanceRate: number;
  revenue: number;
  revenueGoal: number;
  studioUtilization: number;
}

interface SalesGoal {
  month: string;
  goal: number;
  actual: number;
  achievementRate: number;
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
  const [selectedSchool, setSelectedSchool] = useState<string>('all');

  // リアルタイム時刻更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // スクール別データ (実際のEnDanceスクール)
  const schoolsData: SchoolData[] = [
    {
      id: 'shibuya',
      name: 'SHIBUYA',
      activeMembers: 342,
      attendanceRate: 89.5,
      revenue: 1260500,
      revenueGoal: 1500000,
      studioUtilization: 85.2
    },
    {
      id: 'scramble',
      name: 'SCRAMBLE',
      activeMembers: 228,
      attendanceRate: 86.4,
      revenue: 854000,
      revenueGoal: 1000000,
      studioUtilization: 81.7
    },
    {
      id: 'yokohama',
      name: 'YOKOHAMA',
      activeMembers: 195,
      attendanceRate: 84.2,
      revenue: 725000,
      revenueGoal: 900000,
      studioUtilization: 78.5
    },
    {
      id: 'yokohama2',
      name: 'YOKOHAMA2',
      activeMembers: 156,
      attendanceRate: 82.8,
      revenue: 585000,
      revenueGoal: 700000,
      studioUtilization: 75.3
    },
    {
      id: 'ashikaga',
      name: 'ASHIKAGA',
      activeMembers: 118,
      attendanceRate: 85.7,
      revenue: 425000,
      revenueGoal: 600000,
      studioUtilization: 73.8
    },
    {
      id: 'isesaki',
      name: 'ISESAKI',
      activeMembers: 95,
      attendanceRate: 83.2,
      revenue: 348000,
      revenueGoal: 500000,
      studioUtilization: 71.5
    }
  ];

  // 売上目標データ
  const currentMonthGoal: SalesGoal = {
    month: '2025年1月',
    goal: 5200000,
    actual: 4197500,
    achievementRate: 80.7
  };

  // メイン運営KPI - スタジオ運営で最も重要な指標
  const coreKpiData: KPICard[] = [
    {
      title: 'アクティブ生徒数',
      value: 1134,
      change: 8.1,
      trend: 'up',
      icon: 'fas fa-users'
    },
    {
      title: '今日の出席率',
      value: '85.3%',
      change: 5.2,
      trend: 'up',
      icon: 'fas fa-user-check'
    },
    {
      title: '支払い滞納者',
      value: 18,
      change: -3.4,
      trend: 'down',
      icon: 'fas fa-exclamation-triangle'
    },
    {
      title: '今月の売上',
      value: '¥4,197,500',
      change: 12.3,
      trend: 'up',
      icon: 'fas fa-yen-sign'
    },
    {
      title: 'スタジオ稼働率',
      value: '79.2%',
      change: 4.7,
      trend: 'up',
      icon: 'fas fa-chart-line'
    },
    {
      title: '講師配置状況',
      value: '94.8%',
      change: 2.1,
      trend: 'up',
      icon: 'fas fa-chalkboard-teacher'
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

        {/* スクール選択 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              表示スクール:
            </label>
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">全スクール</option>
              {schoolsData.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 売上目標達成率 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <i className="fas fa-bullseye text-primary-500" />
              {currentMonthGoal.month} 売上目標達成率
            </h3>
            <Button variant="secondary" size="sm" onClick={() => handleQuickAction('goal-settings')}>
              <i className="fas fa-cog"></i> 目標設定
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">目標金額</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ¥{currentMonthGoal.goal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">実績金額</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ¥{currentMonthGoal.actual.toLocaleString()}
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">進捗率</span>
                <span className={`text-lg font-bold ${currentMonthGoal.achievementRate >= 100 ? 'text-green-600' : currentMonthGoal.achievementRate >= 70 ? 'text-blue-600' : 'text-orange-600'}`}>
                  {currentMonthGoal.achievementRate}%
                </span>
              </div>
              <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  style={{ width: `${Math.min(currentMonthGoal.achievementRate, 100)}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    currentMonthGoal.achievementRate >= 100 ? 'bg-green-500' :
                    currentMonthGoal.achievementRate >= 70 ? 'bg-blue-500' : 'bg-orange-500'
                  } transition-all duration-500`}
                />
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              残り: ¥{(currentMonthGoal.goal - currentMonthGoal.actual).toLocaleString()}
            </div>
          </div>
        </div>

        {/* スクール別データ比較 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-chart-bar text-primary-500" />
            スクール別パフォーマンス比較
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    スクール名
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    会員数
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    出席率
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    売上実績
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    目標達成率
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    稼働率
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {schoolsData
                  .filter((school) => selectedSchool === 'all' || school.id === selectedSchool)
                  .map((school) => {
                    const achievementRate = (school.revenue / school.revenueGoal) * 100;
                    return (
                      <tr key={school.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {school.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {school.activeMembers}名
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <span>{school.attendanceRate}%</span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${school.attendanceRate}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          ¥{school.revenue.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            achievementRate >= 100 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            achievementRate >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                          }`}>
                            {achievementRate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <span>{school.studioUtilization}%</span>
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-purple-500 h-2 rounded-full"
                                style={{ width: `${school.studioUtilization}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>

        {/* メイン運営KPI Cards */}
        <div className="kpi-grid">
          {coreKpiData.map((kpi, index) => (
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

        {/* マーケットプレイス【補助機能】はサイドバーメニューのみで提供 */}

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