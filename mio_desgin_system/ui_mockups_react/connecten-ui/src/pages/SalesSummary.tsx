import React, { useMemo, useState } from 'react';
import { Button } from '../components/UI/Button';

type PeriodKey = 'day' | 'week' | 'month' | 'year';

interface TimelinePoint {
  label: string;
  revenue: number;
  bookings: number;
}

interface TableRow {
  segment: string;
  revenue: number;
  diff: number;
  bookings: number;
  arpu: number;
}

interface CategoryStat {
  name: string;
  revenue: number;
  growth: number;
  share: number;
}

const periodLabels: Record<PeriodKey, string> = {
  day: '日次',
  week: '週次',
  month: '月次',
  year: '年次'
};

const salesTimeline: Record<PeriodKey, TimelinePoint[]> = {
  day: [
    { label: '09:00', revenue: 82000, bookings: 18 },
    { label: '12:00', revenue: 104000, bookings: 25 },
    { label: '15:00', revenue: 126000, bookings: 28 },
    { label: '18:00', revenue: 158000, bookings: 35 },
    { label: '21:00', revenue: 96000, bookings: 20 }
  ],
  week: [
    { label: 'Mon', revenue: 420000, bookings: 96 },
    { label: 'Tue', revenue: 398000, bookings: 86 },
    { label: 'Wed', revenue: 452000, bookings: 101 },
    { label: 'Thu', revenue: 438000, bookings: 98 },
    { label: 'Fri', revenue: 508000, bookings: 112 },
    { label: 'Sat', revenue: 562000, bookings: 131 },
    { label: 'Sun', revenue: 488000, bookings: 108 }
  ],
  month: [
    { label: 'W1', revenue: 1580000, bookings: 408 },
    { label: 'W2', revenue: 1685000, bookings: 425 },
    { label: 'W3', revenue: 1728000, bookings: 439 },
    { label: 'W4', revenue: 1813000, bookings: 462 }
  ],
  year: [
    { label: 'Q1', revenue: 4750000, bookings: 1180 },
    { label: 'Q2', revenue: 4980000, bookings: 1234 },
    { label: 'Q3', revenue: 5260000, bookings: 1310 },
    { label: 'Q4', revenue: 5530000, bookings: 1387 }
  ]
};

const tableData: Record<PeriodKey, TableRow[]> = {
  day: [
    { segment: 'オンライン決済', revenue: 312000, diff: 11.4, bookings: 72, arpu: 6200 },
    { segment: '受付決済', revenue: 188000, diff: 5.2, bookings: 44, arpu: 5700 },
    { segment: 'マーケットプレイス', revenue: 146000, diff: 18.3, bookings: 36, arpu: 6400 }
  ],
  week: [
    { segment: '月謝', revenue: 1684000, diff: 8.6, bookings: 402, arpu: 6800 },
    { segment: 'チケット', revenue: 924000, diff: 4.5, bookings: 238, arpu: 5200 },
    { segment: '物販', revenue: 312000, diff: -2.4, bookings: 154, arpu: 3200 }
  ],
  month: [
    { segment: '会員プラン', revenue: 4825000, diff: 9.8, bookings: 986, arpu: 7200 },
    { segment: 'ドロップイン', revenue: 1832000, diff: 6.1, bookings: 412, arpu: 5400 },
    { segment: 'マーケット予約', revenue: 896000, diff: 24.7, bookings: 186, arpu: 6100 }
  ],
  year: [
    { segment: 'Studioパス', revenue: 19482000, diff: 7.2, bookings: 4012, arpu: 7800 },
    { segment: 'イベント/WS', revenue: 6240000, diff: 12.8, bookings: 1388, arpu: 4500 },
    { segment: '法人契約', revenue: 4720000, diff: 18.5, bookings: 312, arpu: 15100 }
  ]
};

const categoryBreakdown: CategoryStat[] = [
  { name: '会員サブスク', revenue: 3260000, growth: 12.4, share: 52 },
  { name: 'チケット/ドロップイン', revenue: 1480000, growth: 6.3, share: 24 },
  { name: 'マーケット予約', revenue: 896000, growth: 18.7, share: 14 },
  { name: '物販/EC', revenue: 302000, growth: 3.1, share: 5 },
  { name: 'イベント/WS', revenue: 226000, growth: -4.2, share: 5 }
];

const MiniLineChart: React.FC<{ data: TimelinePoint[] }> = ({ data }) => {
  const maxRevenue = Math.max(...data.map((point) => point.revenue));
  const points = data
    .map((point, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (point.revenue / maxRevenue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-36 w-full text-blue-500">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
      {data.map((point, index) => {
        const cx = (index / (data.length - 1)) * 100;
        const cy = 100 - (point.revenue / maxRevenue) * 100;
        return <circle key={point.label} cx={cx} cy={cy} r={2} className="fill-blue-500" />;
      })}
    </svg>
  );
};

export const SalesSummary: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodKey>('month');

  const currentTimeline = salesTimeline[selectedPeriod];
  const currentTable = tableData[selectedPeriod];

  const totals = useMemo(() => {
    const revenue = currentTable.reduce((sum, row) => sum + row.revenue, 0);
    const bookings = currentTable.reduce((sum, row) => sum + row.bookings, 0);
    const avgArpu = revenue / (bookings || 1);
    return { revenue, bookings, avgArpu };
  }, [currentTable]);

  const handleExport = (format: 'csv' | 'xlsx') => {
    console.log(`Exporting ${format} for ${selectedPeriod}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            売上集計 / Revenue Console
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">Sales Summary</h1>
          <p className="text-gray-500">期間切替で売上・予約トレンドを即座に比較できます。</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="fas fa-file-csv" onClick={() => handleExport('csv')}>
            CSV出力
          </Button>
          <Button variant="primary" icon="fas fa-file-excel" onClick={() => handleExport('xlsx')}>
            Excel出力
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(periodLabels) as PeriodKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedPeriod(key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedPeriod === key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            {periodLabels[key]}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">売上推移</p>
              <p className="text-2xl font-semibold text-gray-900">
                ¥{totals.revenue.toLocaleString()} <span className="text-base text-gray-400">({periodLabels[selectedPeriod]})</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">平均客単価</p>
              <p className="text-xl font-semibold text-green-600">¥{Math.round(totals.avgArpu).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <MiniLineChart data={currentTimeline} />
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
              {currentTimeline.map((point) => (
                <div key={point.label} className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1">
                  <span className="font-semibold text-gray-900">{point.label}</span>
                  <span>¥{point.revenue.toLocaleString()}</span>
                  <span className="text-blue-500">{point.bookings}件</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50 via-white to-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-gray-500">ハイライト</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">総予約数</p>
              <p className="text-3xl font-semibold text-gray-900">{totals.bookings.toLocaleString()}件</p>
              <p className="text-sm text-green-600">前期比 +9.4%</p>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-gray-500">トップチャンネル</p>
              <p className="text-lg font-semibold text-gray-900">{currentTable[0].segment}</p>
              <p className="text-sm text-gray-500">売上 ¥{currentTable[0].revenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">マーケットシェア</p>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${categoryBreakdown[0].share}%` }}
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">{categoryBreakdown[0].share}% が会員サブスク</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">カテゴリ別売上</p>
              <p className="text-xl font-semibold text-gray-900">Channel Mix</p>
            </div>
            <span className="text-xs font-semibold text-blue-600">Live更新</span>
          </div>
          <div className="mt-4 space-y-4">
            {categoryBreakdown.map((category) => (
              <div key={category.name} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">構成比 {category.share}%</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    ¥{category.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${category.growth >= 0 ? 'bg-blue-500' : 'bg-rose-500'}`}
                    style={{ width: `${category.share}%` }}
                  />
                </div>
                <p className={`mt-2 text-sm ${category.growth >= 0 ? 'text-green-600' : 'text-rose-600'}`}>
                  {category.growth >= 0 ? '+' : ''}
                  {category.growth}% vs 前期
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">売上集計テーブル</p>
              <p className="text-xl font-semibold text-gray-900">{periodLabels[selectedPeriod]}別 チャンネル集計</p>
            </div>
            <Button variant="ghost" size="sm" icon="fas fa-sync" />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="pb-2">セグメント</th>
                  <th className="pb-2">売上</th>
                  <th className="pb-2">前期比</th>
                  <th className="pb-2">予約数</th>
                  <th className="pb-2">ARPU</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {currentTable.map((row) => (
                  <tr key={row.segment} className="border-t border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{row.segment}</td>
                    <td className="py-3 text-gray-700">¥{row.revenue.toLocaleString()}</td>
                    <td className={`py-3 ${row.diff >= 0 ? 'text-green-600' : 'text-rose-600'}`}>
                      {row.diff >= 0 ? '+' : ''}
                      {row.diff}%
                    </td>
                    <td className="py-3 text-gray-700">{row.bookings}</td>
                    <td className="py-3 text-gray-700">¥{row.arpu.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">アクションプラン</p>
            <p className="text-xl font-semibold text-gray-900">Conversion Signals</p>
          </div>
          <Button variant="success" icon="fas fa-bolt">
            インサイトを共有
          </Button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              title: '解約防止キャンペーン',
              description: '退会予兆会員20名へ期間限定クーポン送付',
              impact: '+¥280,000 期待値'
            },
            {
              title: 'マーケット広告強化',
              description: '週末のK-POP体験枠を重点配信',
              impact: '+38件 予約見込み'
            },
            {
              title: '物販セット販売',
              description: '新作アパレルxチケットのバンドル提案',
              impact: '客単価 +8.4%'
            }
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                {item.impact}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
