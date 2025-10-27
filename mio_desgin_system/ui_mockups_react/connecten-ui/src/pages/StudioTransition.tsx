import React, { useMemo, useState } from 'react';
import { Button } from '../components/UI/Button';

type Interval = '3m' | '6m' | '12m';

interface TransitionPoint {
  month: string;
  inbound: number;
  outbound: number;
  crossBooking: number;
}

interface Flow {
  from: string;
  to: string;
  percentage: number;
  intent: 'upgrade' | 'downgrade' | 'trial';
}

interface HeatmapCell {
  day: string;
  slot: string;
  value: number;
}

const transitionTimeline: TransitionPoint[] = [
  { month: '1月', inbound: 182, outbound: 134, crossBooking: 96 },
  { month: '2月', inbound: 198, outbound: 142, crossBooking: 104 },
  { month: '3月', inbound: 224, outbound: 156, crossBooking: 118 },
  { month: '4月', inbound: 248, outbound: 168, crossBooking: 132 },
  { month: '5月', inbound: 236, outbound: 152, crossBooking: 126 },
  { month: '6月', inbound: 252, outbound: 171, crossBooking: 138 }
];

const flows: Flow[] = [
  { from: 'SHIBUYA', to: 'SCRAMBLE', percentage: 18, intent: 'upgrade' },
  { from: 'SCRAMBLE', to: 'SHIBUYA', percentage: 14, intent: 'upgrade' },
  { from: 'YOKOHAMA', to: 'SHIBUYA', percentage: 11, intent: 'trial' },
  { from: 'SHIBUYA', to: 'YOKOHAMA', percentage: 7, intent: 'downgrade' },
  { from: 'ASHIKAGA', to: 'SCRAMBLE', percentage: 6, intent: 'trial' }
];

const timeSlots = ['朝 6-9', '午前 9-12', '午後 12-18', '夜 18-24'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const heatmap: HeatmapCell[] = days.flatMap((day) =>
  timeSlots.map((slot) => ({
    day,
    slot,
    value: Math.floor(Math.random() * 100)
  }))
);

const getIntentColor = (intent: Flow['intent']) => {
  switch (intent) {
    case 'upgrade':
      return 'bg-emerald-500';
    case 'trial':
      return 'bg-blue-500';
    default:
      return 'bg-amber-500';
  }
};

const TimelineChart: React.FC<{ data: TransitionPoint[] }> = ({ data }) => {
  const max = Math.max(...data.map((point) => Math.max(point.inbound, point.outbound)));
  return (
    <div className="h-48 w-full">
      <svg viewBox="0 0 100 40" className="h-full w-full">
        {['inbound', 'outbound', 'crossBooking'].map((key, idx) => {
          const color = idx === 0 ? '#2563eb' : idx === 1 ? '#f97316' : '#10b981';
          const points = data
            .map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const value = point[key as keyof TransitionPoint] as number;
              const y = 40 - (value / max) * 35 - idx; // slight offset
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polyline
              key={key}
              fill="none"
              stroke={color}
              strokeWidth={idx === 2 ? 1.5 : 2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const StudioTransition: React.FC = () => {
  const [interval, setInterval] = useState<Interval>('6m');

  const timeframeData = useMemo(() => {
    if (interval === '3m') {
      return transitionTimeline.slice(-3);
    }
    if (interval === '12m') {
      return [
        { month: '7月', inbound: 198, outbound: 148, crossBooking: 108 },
        { month: '8月', inbound: 212, outbound: 152, crossBooking: 116 },
        ...transitionTimeline
      ];
    }
    return transitionTimeline;
  }, [interval]);

  const totals = useMemo(() => {
    const inbound = timeframeData.reduce((sum, point) => sum + point.inbound, 0);
    const outbound = timeframeData.reduce((sum, point) => sum + point.outbound, 0);
    const crossBooking = timeframeData.reduce((sum, point) => sum + point.crossBooking, 0);
    return { inbound, outbound, crossBooking };
  }, [timeframeData]);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-500">
            Studio Transition Navigator
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">スタジオ遷移</h1>
          <p className="text-gray-500">
            会員の利用傾向、移動パターン、時間帯別ヒートマップをもとに配置最適化を支援します。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {(['3m', '6m', '12m'] as Interval[]).map((key) => (
            <button
              key={key}
              onClick={() => setInterval(key)}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                interval === key ? 'bg-sky-600 text-white shadow-sm' : 'border border-gray-200 text-gray-600'
              }`}
            >
              {key === '3m' ? '直近3か月' : key === '6m' ? '半期' : '12か月'}
            </button>
          ))}
          <Button variant="primary" icon="fas fa-route">
            ルート最適化
          </Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase text-gray-500">流入 (Inbound)</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totals.inbound}名</p>
          <p className="text-sm text-green-600">マーケット経由 +18%</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase text-gray-500">流出 (Outbound)</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totals.outbound}名</p>
          <p className="text-sm text-rose-500">退会予兆 42名</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase text-gray-500">クロス予約</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totals.crossBooking}件</p>
          <p className="text-sm text-sky-500">回遊率 36%</p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">利用傾向分析グラフ</h2>
            <p className="text-sm text-gray-500">入会/退会/クロス予約の推移</p>
          </div>
          <Button variant="ghost" size="sm" icon="fas fa-cloud-download-alt">
            データ取得
          </Button>
        </div>
        <div className="mt-6">
          <TimelineChart data={timeframeData} />
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            {[
              { label: 'Inbound', color: 'bg-blue-500' },
              { label: 'Outbound', color: 'bg-orange-500' },
              { label: 'Cross-Booking', color: 'bg-emerald-500' }
            ].map((legend) => (
              <div key={legend.label} className="flex items-center gap-2">
                <span className={`h-2 w-6 rounded-full ${legend.color}`} />
                <span>{legend.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">会員移動パターン</h3>
            <Button variant="ghost" size="sm" icon="fas fa-diagram-project" />
          </div>
          <div className="mt-6 space-y-4">
            {flows.map((flow) => (
              <div key={`${flow.from}-${flow.to}`} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {flow.from} → {flow.to}
                    </p>
                    <p className="text-xs text-gray-500">
                      {flow.intent === 'upgrade'
                        ? 'プランアップグレード'
                        : flow.intent === 'trial'
                        ? '体験・クロスユース'
                        : '料金最適化/ダウングレード'}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{flow.percentage}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${getIntentColor(flow.intent)}`}
                    style={{ width: `${flow.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">時間帯別利用状況ヒートマップ</h3>
            <span className="text-xs font-semibold uppercase tracking-wide text-sky-500">
              AI Demand Index
            </span>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full table-fixed text-xs">
              <thead>
                <tr>
                  <th className="pb-2 text-left text-gray-500">TIME</th>
                  {days.map((day) => (
                    <th key={day} className="pb-2 text-gray-500">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot}>
                    <td className="py-2 pr-2 font-semibold text-gray-700">{slot}</td>
                    {days.map((day) => {
                      const cell = heatmap.find((item) => item.slot === slot && item.day === day);
                      const intensity = cell ? cell.value : 0;
                      const bg =
                        intensity > 75
                          ? 'bg-sky-600 text-white'
                          : intensity > 50
                          ? 'bg-sky-400 text-white'
                          : intensity > 25
                          ? 'bg-sky-200 text-gray-700'
                          : 'bg-gray-100 text-gray-500';
                      return (
                        <td key={`${slot}-${day}`} className="py-2 text-center">
                          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold ${bg}`}>
                            {intensity}%
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-sky-50 via-white to-white p-5">
            <p className="text-xs uppercase text-gray-500">Sankey Flow (概念図)</p>
            <div className="mt-4 space-y-3">
              {flows.map((flow) => (
                <div key={`${flow.from}-${flow.to}-sankey`} className="text-xs text-gray-600">
                  <p className="font-semibold text-gray-900">
                    {flow.from} → {flow.to}
                  </p>
                  <div className="mt-1 h-2 rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${getIntentColor(flow.intent)}`}
                      style={{ width: `${flow.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 p-5">
            <p className="text-xs uppercase text-gray-500">トレンド予測</p>
            <ul className="mt-3 space-y-3 text-sm text-gray-600">
              <li className="flex items-center justify-between">
                <span>6週後のクロス利用率</span>
                <span className="font-semibold text-blue-600">42%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>退会リスク会員</span>
                <span className="font-semibold text-rose-600">38名</span>
              </li>
              <li className="flex items-center justify-between">
                <span>推奨テナント間施策</span>
                <span className="font-semibold text-emerald-600">4件</span>
              </li>
            </ul>
            <Button className="mt-4 w-full" icon="fas fa-lightbulb">
              AI提案を確認
            </Button>
          </div>

          <div className="rounded-2xl border border-gray-100 p-5">
            <p className="text-xs uppercase text-gray-500">アクションログ</p>
            <div className="mt-3 space-y-3 text-sm text-gray-600">
              {[
                '夜枠のYOKOHAMAへ講師シフト案',
                'SCRAMBLE → SHIBUYA 乗り換えキャンペーン',
                '朝枠稼働率40%以下の補填施策',
                '退会予兆会員へのNPSヒアリング'
              ].map((item) => (
                <div key={item} className="rounded-xl border border-gray-100 p-3">
                  <p className="font-semibold text-gray-900">{item}</p>
                  <p className="text-xs text-gray-500">担当: Insights Team</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
