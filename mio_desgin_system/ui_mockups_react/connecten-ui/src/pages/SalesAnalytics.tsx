import React from 'react';
import { Button } from '../components/UI/Button';
import { PhaseBadge } from '../components/UI/PhaseBadge';

interface Pattern {
  title: string;
  detail: string;
  lift: string;
  icon: string;
}

interface Segment {
  name: string;
  ratio: number;
  color: string;
  insight: string;
}

interface Opportunity {
  id: string;
  product: string;
  audience: string;
  expectedLift: string;
  status: 'pending' | 'launched';
}

interface FunnelStep {
  label: string;
  value: number;
  conversion: string;
}

interface AbTest {
  name: string;
  variantA: string;
  variantB: string;
  result: string;
  winner: 'A' | 'B';
}

const patterns: Pattern[] = [
  {
    title: '週末夜枠の高単価率',
    detail: '金土20:00以降の平均客単価 ¥8,420（全体+18%）',
    lift: '客単価 +18%',
    icon: 'fas fa-moon'
  },
  {
    title: '体験→月謝化の成功導線',
    detail: '体験後48時間以内のフォローでCVR 32%',
    lift: 'CVR +9.4pt',
    icon: 'fas fa-route'
  },
  {
    title: 'キャンセル再予約のハイタッチ効果',
    detail: 'キャンセル発生後のLINE案内で48件復活',
    lift: '+¥280K',
    icon: 'fas fa-comments'
  }
];

const segments: Segment[] = [
  { name: 'コア会員', ratio: 42, color: 'bg-blue-600', insight: 'LTV ¥128,000' },
  { name: 'ライト会員', ratio: 28, color: 'bg-blue-400', insight: 'アップセル候補 310名' },
  { name: 'マーケット経由', ratio: 18, color: 'bg-emerald-400', insight: '継続率 64%' },
  { name: '法人福利厚生', ratio: 12, color: 'bg-amber-400', insight: '契約更新月 3社' }
];

const opportunities: Opportunity[] = [
  {
    id: 'OP-231',
    product: 'K-POP 初級サマーPASS',
    audience: '10代女性 + マーケット新規',
    expectedLift: '+¥620K',
    status: 'launched'
  },
  {
    id: 'OP-232',
    product: '法人ウェルネス90',
    audience: 'IT企業 / 健康経費枠',
    expectedLift: '+¥1.2M',
    status: 'pending'
  },
  {
    id: 'OP-233',
    product: 'VIP Studio Unlimited',
    audience: 'ハイエンド会員',
    expectedLift: '+¥420K',
    status: 'pending'
  }
];

const funnel: FunnelStep[] = [
  { label: 'サイト訪問', value: 18420, conversion: '基準' },
  { label: '体験予約', value: 1258, conversion: '6.8%' },
  { label: '来店', value: 1014, conversion: '80.6%' },
  { label: '本入会', value: 486, conversion: '48.0%' }
];

const abTests: AbTest[] = [
  {
    name: 'ランディングページ CTA',
    variantA: 'レッスン検索 + CTA',
    variantB: '「体験する」固定ボタン',
    result: 'CVR +6.2pt',
    winner: 'B'
  },
  {
    name: '価格表示方法',
    variantA: '税込一括表記',
    variantB: '月額換算表示',
    result: '平均滞在 +38秒',
    winner: 'A'
  }
];

export const SalesAnalytics: React.FC = () => {
  const totalSegments = segments.reduce((sum, segment) => sum + segment.ratio, 0);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">
            Sales Intelligence
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-900">セールス分析</h1>
            <PhaseBadge phase={2} />
          </div>
          <p className="text-gray-500">
            販売パターン、顧客セグメント、ファネル、A/Bテスト結果を統合管理します。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="fas fa-paper-plane">
            提案送付
          </Button>
          <Button variant="primary" icon="fas fa-diagram-project">
            セールスオートメーション
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {patterns.map((pattern) => (
          <div key={pattern.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">{pattern.title}</p>
              <i className={`${pattern.icon} text-gray-400`} />
            </div>
            <p className="mt-2 text-sm text-gray-500">{pattern.detail}</p>
            <p className="mt-3 text-xs font-semibold text-blue-600">{pattern.lift}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">顧客セグメント評価</p>
              <p className="text-xl font-semibold text-gray-900">Segment Heatmap</p>
            </div>
            <Button variant="ghost" size="sm" icon="fas fa-chart-pie" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {segments.map((segment) => (
              <div key={segment.name} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">{segment.name}</p>
                  <span className={`h-3 w-3 rounded-full ${segment.color}`} />
                </div>
                <div className="mt-3 h-2 rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${segment.color}`}
                    style={{ width: `${(segment.ratio / totalSegments) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">{segment.insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">販売機会</h3>
            <Button variant="ghost" size="sm" icon="fas fa-plus" />
          </div>
          <div className="mt-4 space-y-4">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">{opportunity.product}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      opportunity.status === 'launched'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {opportunity.status === 'launched' ? '実施中' : '準備中'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{opportunity.audience}</p>
                <p className="mt-2 text-sm font-semibold text-blue-600">{opportunity.expectedLift}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">コンバージョンファネル</h3>
          <Button variant="ghost" size="sm" icon="fas fa-bolt" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {funnel.map((step, index) => (
            <div key={step.label} className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs uppercase text-gray-500">{step.label}</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {step.value.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{index === 0 ? '—' : `CVR ${step.conversion}`}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">A/Bテスト結果</h3>
          <Button variant="ghost" size="sm" icon="fas fa-flask" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {abTests.map((test) => (
            <div key={test.name} className="rounded-xl border border-gray-100 p-4">
              <p className="text-sm font-semibold text-gray-900">{test.name}</p>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-100 p-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Variant A</p>
                  <p className="font-semibold text-gray-900">{test.variantA}</p>
                </div>
                <div className="text-center text-xs text-gray-400">vs</div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Variant B</p>
                  <p className="font-semibold text-gray-900">{test.variantB}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-gray-500">{test.result}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    test.winner === 'A' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  Winner: {test.winner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
