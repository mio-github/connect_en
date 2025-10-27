import React, { useMemo, useState } from 'react';
import { Button } from '../components/UI/Button';

type ScenarioKey = 'optimistic' | 'baseline' | 'pessimistic';

interface Scenario {
  key: ScenarioKey;
  label: string;
  description: string;
  growth: number;
  color: string;
}

interface ForecastPoint {
  month: string;
  baseline: number;
  optimistic: number;
  pessimistic: number;
}

const scenarios: Scenario[] = [
  {
    key: 'optimistic',
    label: '楽観シナリオ',
    description: 'マーケット獲得 +キャンペーン強化',
    growth: 14.8,
    color: 'text-emerald-500'
  },
  {
    key: 'baseline',
    label: '標準シナリオ',
    description: '現行施策継続、季節調整のみ',
    growth: 8.4,
    color: 'text-blue-600'
  },
  {
    key: 'pessimistic',
    label: '慎重シナリオ',
    description: '退会率増、獲得遅延',
    growth: 3.1,
    color: 'text-amber-500'
  }
];

const baseForecast: ForecastPoint[] = [
  { month: '7月', baseline: 4_820_000, optimistic: 5_120_000, pessimistic: 4_520_000 },
  { month: '8月', baseline: 5_060_000, optimistic: 5_430_000, pessimistic: 4_730_000 },
  { month: '9月', baseline: 5_280_000, optimistic: 5_740_000, pessimistic: 4_910_000 },
  { month: '10月', baseline: 5_460_000, optimistic: 5_980_000, pessimistic: 5_060_000 },
  { month: '11月', baseline: 5_520_000, optimistic: 6_040_000, pessimistic: 5_120_000 },
  { month: '12月', baseline: 5_640_000, optimistic: 6_180_000, pessimistic: 5_220_000 }
];

const LineChart: React.FC<{
  data: ForecastPoint[];
  activeScenario: ScenarioKey;
}> = ({ data, activeScenario }) => {
  const max = Math.max(
    ...data.flatMap((point) => [point.baseline, point.optimistic, point.pessimistic])
  );
  const min = Math.min(
    ...data.flatMap((point) => [point.baseline, point.optimistic, point.pessimistic])
  );

  const scenarioKey = activeScenario === 'baseline' ? 'baseline' : activeScenario;
  const color =
    activeScenario === 'optimistic'
      ? '#10b981'
      : activeScenario === 'pessimistic'
      ? '#f97316'
      : '#2563eb';

  const points = data
    .map((point, index) => {
      const value = point[scenarioKey as keyof ForecastPoint] as number;
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((value - min) / (max - min)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-56 w-full">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      {data.map((point, index) => {
        const value = point[scenarioKey as keyof ForecastPoint] as number;
        const cx = (index / (data.length - 1)) * 100;
        const cy = 100 - ((value - min) / (max - min)) * 100;
        return <circle key={point.month} cx={cx} cy={cy} r={2} fill={color} />;
      })}
    </svg>
  );
};

export const SalesForecast: React.FC = () => {
  const [seasonality, setSeasonality] = useState(4);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('baseline');

  const adjustedForecast = useMemo(() => {
    const adjustment = 1 + seasonality / 100;
    return baseForecast.map((point) => ({
      month: point.month,
      baseline: Math.round(point.baseline * adjustment),
      optimistic: Math.round(point.optimistic * adjustment * 1.02),
      pessimistic: Math.round(point.pessimistic * (adjustment - 0.01))
    }));
  }, [seasonality]);

  const accuracyScore = 92.4;
  const mape = 4.6;

  const handleGenerateReport = () => {
    console.log('Generating forecast report...');
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
            Forecast Lab
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">売上予測</h1>
          <p className="text-gray-500">
            シナリオ比較、季節性補正、AI推奨アクションを一元管理します。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="fas fa-bell">
            目標アラート
          </Button>
          <Button variant="primary" icon="fas fa-file-export" onClick={handleGenerateReport}>
            予測レポート生成
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {scenarios.map((scenario) => (
          <button
            key={scenario.key}
            onClick={() => setActiveScenario(scenario.key)}
            className={`rounded-2xl border p-5 text-left shadow-sm transition ${
              activeScenario === scenario.key
                ? 'border-indigo-500 bg-indigo-50/60'
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            <p className="text-xs uppercase text-gray-500">{scenario.label}</p>
            <p className={`mt-2 text-3xl font-semibold ${scenario.color}`}>{scenario.growth}%</p>
            <p className="text-sm text-gray-500">{scenario.description}</p>
          </button>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">売上予測モデル表示</p>
              <p className="text-xl font-semibold text-gray-900">
                {scenarios.find((s) => s.key === activeScenario)?.label}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>季節要因調整</span>
              <input
                type="range"
                min="0"
                max="10"
                value={seasonality}
                onChange={(event) => setSeasonality(Number(event.target.value))}
                className="h-1 w-40 cursor-pointer rounded-full bg-gray-200 accent-indigo-500"
              />
              <span className="font-semibold text-indigo-600">{seasonality}%</span>
            </div>
          </div>
          <div className="mt-6">
            <LineChart data={adjustedForecast} activeScenario={activeScenario} />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {['optimistic', 'baseline', 'pessimistic'].map((key) => {
                const label = scenarios.find((scenario) => scenario.key === key)?.label ?? key;
                const highlight = adjustedForecast[adjustedForecast.length - 1][
                  (key === 'baseline' ? 'baseline' : key) as keyof ForecastPoint
                ] as number;
                return (
                  <div
                    key={key}
                    className={`rounded-xl border p-4 ${
                      activeScenario === key ? 'border-indigo-400 bg-indigo-50/70' : 'border-gray-100'
                    }`}
                  >
                    <p className="text-xs uppercase text-gray-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      ¥{(highlight / 1_000_000).toFixed(2)}M
                    </p>
                    <p className="text-xs text-gray-500">12月予測値</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">予測精度</p>
          <p className="text-4xl font-semibold text-gray-900">{accuracyScore}%</p>
          <p className="text-sm text-gray-500">MAPE {mape}% / モデル v2.4</p>
          <div className="mt-6 space-y-4 text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>利用データ</span>
              <span>売上 + 予約履歴 + NPS</span>
            </div>
            <div className="flex items-center justify-between">
              <span>外部変数</span>
              <span>気温 / イベントカレンダー</span>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-xs uppercase text-gray-500">次回再学習</p>
              <p className="text-2xl font-semibold text-gray-900">11月 01日</p>
            </div>
            <Button className="w-full" variant="success" icon="fas fa-brain">
              モデル再学習を開始
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">シナリオ比較テーブル</h2>
            <p className="text-sm text-gray-500">月次売上と成長率</p>
          </div>
          <Button variant="ghost" size="sm" icon="fas fa-table" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="pb-2">月</th>
                <th className="pb-2">楽観</th>
                <th className="pb-2">標準</th>
                <th className="pb-2">慎重</th>
                <th className="pb-2">ギャップ</th>
              </tr>
            </thead>
            <tbody>
              {adjustedForecast.map((point) => (
                <tr key={point.month} className="border-t border-gray-100">
                  <td className="py-3 font-semibold text-gray-900">{point.month}</td>
                  <td className="py-3 text-emerald-600">¥{point.optimistic.toLocaleString()}</td>
                  <td className="py-3 text-gray-700">¥{point.baseline.toLocaleString()}</td>
                  <td className="py-3 text-amber-600">¥{point.pessimistic.toLocaleString()}</td>
                  <td className="py-3 text-gray-500">
                    {Math.round(point.optimistic - point.pessimistic).toLocaleString()}差
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'シナリオ分析',
              detail: 'K-POP体験枠強化で売上 +12.4%',
              action: 'キャンペーン自動生成'
            },
            {
              title: '季節要因調整',
              detail: '12月ボーナス需要で購買意欲指数 +1.8pt',
              action: '価格最適化プラン'
            },
            {
              title: '予測レポート',
              detail: '拠点別の売上推移と在庫補充提案をメール送信',
              action: 'Slack共有'
            }
          ].map((card) => (
            <div key={card.title} className="rounded-2xl border border-gray-100 p-4">
              <p className="text-sm font-semibold text-gray-900">{card.title}</p>
              <p className="mt-2 text-sm text-gray-500">{card.detail}</p>
              <Button className="mt-4 w-full" variant="secondary" icon="fas fa-share">
                {card.action}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
