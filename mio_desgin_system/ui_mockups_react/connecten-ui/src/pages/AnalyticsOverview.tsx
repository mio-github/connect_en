import React, { useMemo } from 'react';
import { Button } from '../components/UI/Button';
import { PhaseBadge } from '../components/UI/PhaseBadge';

interface Insight {
  title: string;
  description: string;
  impact: string;
  status: 'new' | 'in-progress' | 'done';
}

interface Kpi {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

interface TrendPoint {
  label: string;
  revenue: number;
  bookings: number;
  churn: number;
}

const statusBadge: Record<Insight['status'], string> = {
  new: 'bg-blue-100 text-blue-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  done: 'bg-emerald-100 text-emerald-700'
};

const kpis: Kpi[] = [
  { label: 'MRR', value: '¥5.62M', change: 11.2, trend: 'up' },
  { label: 'LTV / CAC', value: '4.8x', change: 0.6, trend: 'up' },
  { label: 'チャーン率', value: '2.1%', change: -0.4, trend: 'up' },
  { label: '回遊率', value: '36%', change: 5.2, trend: 'up' }
];

const insights: Insight[] = [
  {
    title: '平日昼の稼働率改善余地',
    description: '12-15時の稼働率 48% → 目標 65%。法人トライアルパック提案を推奨。',
    impact: '+¥420,000 期待収益',
    status: 'new'
  },
  {
    title: 'SCRAMBLEのアップセル成功',
    description: 'VIPプラン移行率が 18%→26% に上昇。成功施策を他拠点に共有。',
    impact: 'LTV +9.2%',
    status: 'done'
  },
  {
    title: '退会予兆セグメント',
    description: '出席0回/30日かつ未決済1件の会員23名。NPSヒアリング推奨。',
    impact: 'チャーン -0.8pt',
    status: 'in-progress'
  }
];

const trendData: TrendPoint[] = [
  { label: 'Week 1', revenue: 1.48, bookings: 420, churn: 2.6 },
  { label: 'Week 2', revenue: 1.52, bookings: 436, churn: 2.4 },
  { label: 'Week 3', revenue: 1.56, bookings: 448, churn: 2.2 },
  { label: 'Week 4', revenue: 1.64, bookings: 470, churn: 2.1 }
];

const TrendLines: React.FC = () => {
  const maxRevenue = Math.max(...trendData.map((point) => point.revenue));
  const minRevenue = Math.min(...trendData.map((point) => point.revenue));
  const revenuePoints = trendData
    .map((point, index) => {
      const x = (index / (trendData.length - 1)) * 100;
      const y = 100 - ((point.revenue - minRevenue) / (maxRevenue - minRevenue)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-40 w-full">
      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={revenuePoints}
      />
      {trendData.map((point, index) => {
        const x = (index / (trendData.length - 1)) * 100;
        const y = 100 - ((point.revenue - minRevenue) / (maxRevenue - minRevenue)) * 100;
        return <circle key={point.label} cx={x} cy={y} r={2.5} fill="#2563eb" />;
      })}
    </svg>
  );
};

export const AnalyticsOverview: React.FC = () => {
  const totalBookings = useMemo(
    () => trendData.reduce((sum, point) => sum + point.bookings, 0),
    []
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Analytics Hub
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-900">分析概要</h1>
            <PhaseBadge phase={2} />
          </div>
          <p className="text-gray-500">
            KPI、トレンド、アクションアイテムをワンビューで把握し、迅速な意思決定を支援します。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="fas fa-lightbulb">
            インサイト共有
          </Button>
          <Button variant="primary" icon="fas fa-chart-line">
            レポート作成
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="text-xs uppercase text-gray-500">{kpi.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{kpi.value}</p>
            <p className={`text-sm ${kpi.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}%
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">トレンド分析グラフ</p>
              <p className="text-xl font-semibold text-gray-900">売上 / 予約 / チャーン</p>
            </div>
            <Button variant="ghost" size="sm" icon="fas fa-sync" />
          </div>
          <div className="mt-6">
            <TrendLines />
            <div className="mt-4 grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs uppercase text-gray-500">総予約数</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">{totalBookings}件</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs uppercase text-gray-500">平均チャーン</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                  {trendData.reduce((sum, point) => sum + point.churn, 0) /
                    trendData.length}
                  %
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs uppercase text-gray-500">ARR予測</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">¥62.4M</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">ビジネスインサイト</h3>
            <Button variant="ghost" size="sm" icon="fas fa-plus" />
          </div>
          <div className="mt-4 space-y-4">
            {insights.map((insight) => (
              <div key={insight.title} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>{insight.impact}</span>
                  <span className={`rounded-full px-2 py-0.5 ${statusBadge[insight.status]}`}>
                    {insight.status === 'new'
                      ? 'New'
                      : insight.status === 'in-progress'
                      ? '進行中'
                      : '完了'}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-900">{insight.title}</p>
                <p className="text-sm text-gray-500">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">データ可視化</h3>
            <p className="text-sm text-gray-500">KPIカード + アクション提案</p>
          </div>
          <Button variant="ghost" size="sm" icon="fas fa-arrow-trend-up" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { label: '顧客セグメント', value: '12', detail: 'AI推奨 3件' },
            { label: '推奨アクション', value: '7', detail: '未着手 2件' },
            { label: 'ROIアラート', value: '3', detail: 'キャンペーン監視' },
            { label: 'データ品質', value: '98%', detail: '自動補完済み' }
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs uppercase text-gray-500">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
