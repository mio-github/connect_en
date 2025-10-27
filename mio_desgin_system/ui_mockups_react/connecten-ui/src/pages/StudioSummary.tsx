import React, { useMemo } from 'react';
import { Button } from '../components/UI/Button';

interface StudioMetric {
  id: string;
  name: string;
  revenue: number;
  utilization: number;
  profitability: number;
  lessons: number;
  participants: number;
  satisfaction: number;
}

interface OccupancyPoint {
  week: string;
  shibuya: number;
  scramble: number;
  yokohama: number;
}

const studios: StudioMetric[] = [
  {
    id: 'shibuya',
    name: 'SHIBUYA',
    revenue: 1850000,
    utilization: 86,
    profitability: 34,
    lessons: 168,
    participants: 2412,
    satisfaction: 4.8
  },
  {
    id: 'scramble',
    name: 'SCRAMBLE',
    revenue: 1420000,
    utilization: 81,
    profitability: 32,
    lessons: 132,
    participants: 1860,
    satisfaction: 4.6
  },
  {
    id: 'yokohama',
    name: 'YOKOHAMA',
    revenue: 1180000,
    utilization: 77,
    profitability: 28,
    lessons: 124,
    participants: 1654,
    satisfaction: 4.5
  },
  {
    id: 'ashikaga',
    name: 'ASHIKAGA',
    revenue: 820000,
    utilization: 72,
    profitability: 22,
    lessons: 96,
    participants: 1182,
    satisfaction: 4.4
  },
  {
    id: 'isesaki',
    name: 'ISESAKI',
    revenue: 640000,
    utilization: 68,
    profitability: 17,
    lessons: 78,
    participants: 924,
    satisfaction: 4.3
  }
];

const occupancyTrend: OccupancyPoint[] = [
  { week: 'W1', shibuya: 82, scramble: 75, yokohama: 70 },
  { week: 'W2', shibuya: 85, scramble: 78, yokohama: 74 },
  { week: 'W3', shibuya: 86, scramble: 80, yokohama: 76 },
  { week: 'W4', shibuya: 88, scramble: 82, yokohama: 77 }
];

const Sparkline: React.FC<{ points: number[]; color: string }> = ({ points, color }) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const normalized = points.map((value, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = max === min ? 50 : 100 - ((value - min) / (max - min)) * 100;
    return `${x},${y}`;
  });

  return (
    <svg viewBox="0 0 100 50" className="h-12 w-full">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={normalized.join(' ')}
      />
    </svg>
  );
};

export const StudioSummary: React.FC = () => {
  const totals = useMemo(() => {
    const totalRevenue = studios.reduce((sum, studio) => sum + studio.revenue, 0);
    const totalParticipants = studios.reduce((sum, studio) => sum + studio.participants, 0);
    const avgUtilization = studios.reduce((sum, studio) => sum + studio.utilization, 0) / studios.length;
    return { totalRevenue, totalParticipants, avgUtilization };
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-500">Studio Intelligence</p>
          <h1 className="text-3xl font-semibold text-gray-900">スタジオ集計</h1>
          <p className="text-gray-500">
            各拠点の稼働率、収益性、レッスン構成を一括で可視化し意思決定を支援します。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="fas fa-sliders">
            フィルター
          </Button>
          <Button variant="primary" icon="fas fa-download">
            PDFレポート
          </Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase text-gray-500">総売上（今月）</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            ¥{totals.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-green-600">前月比 +11.3%</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase text-gray-500">参加者数</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {totals.totalParticipants.toLocaleString()}名
          </p>
          <p className="text-sm text-blue-600">マーケット経由 18%</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase text-gray-500">平均稼働率</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {totals.avgUtilization.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-500">目標 80% / Stretch 90%</p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">スタジオ別パフォーマンス比較</h2>
            <p className="text-sm text-gray-500">稼働率・収益性・顧客指標を統合表示</p>
          </div>
          <Button variant="ghost" size="sm" icon="fas fa-sync" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="pb-2">スタジオ</th>
                <th className="pb-2">売上</th>
                <th className="pb-2">稼働率</th>
                <th className="pb-2">収益性指数</th>
                <th className="pb-2">レッスン数</th>
                <th className="pb-2">参加者数</th>
                <th className="pb-2">満足度</th>
              </tr>
            </thead>
            <tbody>
              {studios.map((studio) => (
                <tr key={studio.id} className="border-t border-gray-100">
                  <td className="py-3 font-semibold text-gray-900">{studio.name}</td>
                  <td className="py-3 text-gray-700">¥{studio.revenue.toLocaleString()}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-28 rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${studio.utilization}%` }}
                        />
                      </div>
                      <span className="text-gray-700">{studio.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-700">{studio.profitability}pt</td>
                  <td className="py-3 text-gray-700">{studio.lessons}</td>
                  <td className="py-3 text-gray-700">{studio.participants.toLocaleString()}</td>
                  <td className="py-3 text-gray-700">{studio.satisfaction.toFixed(1)}⭐</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">稼働率トレンド</h3>
            <span className="text-xs font-semibold uppercase tracking-wide text-purple-500">
              週次 / 直近4週間
            </span>
          </div>
          <div className="mt-6 space-y-4">
            {['shibuya', 'scramble', 'yokohama'].map((studioId) => {
              const dataset = occupancyTrend.map((point) => point[studioId as keyof OccupancyPoint]);
              const color =
                studioId === 'shibuya' ? '#2563eb' : studioId === 'scramble' ? '#10b981' : '#f97316';
              const label = studios.find((studio) => studio.id === studioId)?.name ?? studioId;
              return (
                <div key={studioId} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">{label}</p>
                    <p className="text-sm text-gray-500">
                      {dataset[dataset.length - 1]}% <span className="text-green-600">+2.4%</span>
                    </p>
                  </div>
                  <Sparkline points={dataset as number[]} color={color} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">収益性評価 / KPI達成率</h3>
            <Button variant="ghost" size="sm" icon="fas fa-chart-pie">
              詳細
            </Button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {studios.slice(0, 4).map((studio) => (
              <div key={studio.id} className="rounded-xl border border-gray-100 p-4">
                <p className="text-sm font-semibold text-gray-900">{studio.name}</p>
                <p className="text-xs text-gray-500">EBITDA Margin {studio.profitability}%</p>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>売上</span>
                    <span>¥{studio.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>参加者</span>
                    <span>{studio.participants.toLocaleString()}名</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>満足度</span>
                    <span>{studio.satisfaction.toFixed(1)}⭐</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">ランキング & レッスン統計</h3>
          <Button variant="ghost" size="sm" icon="fas fa-arrow-trend-up">
            トレンドを見る
          </Button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-gray-500">スタジオランキング</p>
            <ul className="mt-2 space-y-3">
              {studios.slice(0, 3).map((studio, index) => (
                <li key={studio.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-4">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-semibold text-gray-300">#{index + 1}</span>
                    <div>
                      <p className="font-semibold text-gray-900">{studio.name}</p>
                      <p className="text-xs text-gray-500">
                        利益率 {studio.profitability}% / 稼働 {studio.utilization}%
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    ¥{(studio.revenue / 10000).toFixed(1)}万
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">レッスン数・参加者数統計</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                { label: 'レッスン数', value: '598本', detail: '月間 +42本' },
                { label: '平均参加者', value: '18.6名', detail: '前年比 +1.2名' },
                { label: '満席率', value: '74.2%', detail: '目標 80%' },
                { label: '講師稼働', value: '92.4%', detail: '代講率 4.1%' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-gray-100 p-4">
                  <p className="text-xs uppercase text-gray-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
