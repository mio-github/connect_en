import React from 'react';
import { Button } from '../components/UI/Button';
import { PhaseBadge } from '../components/UI/PhaseBadge';

interface Campaign {
  id: string;
  name: string;
  period: string;
  status: 'draft' | 'running' | 'completed';
  budget: number;
  roi: number;
  channel: string;
}

interface TargetingOption {
  label: string;
  description: string;
  active: boolean;
}

interface RoiScenario {
  name: string;
  spend: number;
  expectedRevenue: number;
  roi: number;
}

const campaigns: Campaign[] = [
  {
    id: 'CMP-401',
    name: 'K-POP Glow Week',
    period: '7/1 - 7/14',
    status: 'running',
    budget: 320000,
    roi: 162,
    channel: 'Instagram | TikTok'
  },
  {
    id: 'CMP-402',
    name: '法人ウェルネスDay',
    period: '7/20 - 7/28',
    status: 'draft',
    budget: 280000,
    roi: 0,
    channel: 'LinkedIn | メール'
  },
  {
    id: 'CMP-399',
    name: 'Summer Experience Pass',
    period: '6/1 - 6/30',
    status: 'completed',
    budget: 450000,
    roi: 214,
    channel: 'ホットペッパー | LINE'
  }
];

const targetingOptions: TargetingOption[] = [
  { label: '10代女性 / 学割', description: 'SNSフォロー済み + 都内在住', active: true },
  { label: '法人福利厚生', description: '従業員300名以上 / IT・広告', active: false },
  { label: 'マーケット未転換リード', description: '体験済み / 未入会 / 30日以内', active: true },
  { label: '休眠会員', description: '訪問0 / 60日 / 会費停止中', active: false }
];

const roiScenarios: RoiScenario[] = [
  { name: 'ベースライン', spend: 300000, expectedRevenue: 760000, roi: 153 },
  { name: 'インフルエンサー強化', spend: 380000, expectedRevenue: 980000, roi: 158 },
  { name: '法人連携', spend: 420000, expectedRevenue: 1_200_000, roi: 186 }
];

export const MarketingManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-500">
            Marketing Control Tower
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-900">マーケティング管理</h1>
            <PhaseBadge phase={2} />
          </div>
          <p className="text-gray-500">
            キャンペーン、ターゲティング、ROI計測を一元管理し、施策を即座に改善します。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="fas fa-plus">
            新規キャンペーン
          </Button>
          <Button variant="primary" icon="fas fa-rocket">
            自動配信開始
          </Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">キャンペーン一覧</p>
              <p className="text-xl font-semibold text-gray-900">Campaign Monitor</p>
            </div>
            <Button variant="ghost" size="sm" icon="fas fa-filter" />
          </div>
          <div className="mt-4 space-y-4">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{campaign.name}</p>
                    <p className="text-xs text-gray-500">
                      {campaign.period} | {campaign.channel}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      campaign.status === 'running'
                        ? 'bg-emerald-100 text-emerald-700'
                        : campaign.status === 'draft'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {campaign.status === 'running'
                      ? '配信中'
                      : campaign.status === 'draft'
                      ? '下書き'
                      : '完了'}
                  </span>
                </div>
                <div className="mt-3 grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-gray-500">予算</p>
                    <p className="font-semibold text-gray-900">¥{campaign.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="font-semibold text-blue-600">
                      {campaign.roi ? `${campaign.roi}%` : '—'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">主要KPI</p>
                    <p className="font-semibold text-gray-900">{campaign.status === 'running' ? 'CVR 4.1%' : 'CPL ¥820'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">キャンペーン作成フォーム</h3>
          <form className="mt-4 space-y-4 text-sm">
            <div>
              <label className="text-gray-500">キャンペーン名</label>
              <input
                type="text"
                placeholder="例: Autumn Trial Boost"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-500">期間</label>
              <input
                type="text"
                placeholder="2025/08/01 - 2025/08/14"
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-blue-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-gray-500">ターゲット</label>
              <select className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-blue-400 focus:outline-none">
                <option>マーケット新規リード</option>
                <option>休眠会員</option>
                <option>法人向け</option>
              </select>
            </div>
            <Button className="w-full" variant="primary" icon="fas fa-save">
              下書きを保存
            </Button>
          </form>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">マーケティング効果測定</h3>
            <p className="text-sm text-gray-500">チャネル別パフォーマンス</p>
          </div>
          <Button variant="ghost" size="sm" icon="fas fa-sync" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Instagram', value: 'CPR ¥420', change: '-12%' },
            { label: 'TikTok', value: 'CPV ¥28', change: '+4%' },
            { label: 'LINE', value: 'CVR 6.4%', change: '+0.8pt' },
            { label: 'Email', value: 'OR 42%', change: '+5%' }
          ].map((channel) => (
            <div key={channel.label} className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs uppercase text-gray-500">{channel.label}</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{channel.value}</p>
              <p className="text-xs text-emerald-600">{channel.change}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">ターゲティング設定</h3>
            <Button variant="ghost" size="sm" icon="fas fa-sliders-h" />
          </div>
          <div className="mt-4 space-y-4">
            {targetingOptions.map((option) => (
              <label key={option.label} className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 p-4">
                <input
                  type="checkbox"
                  checked={option.active}
                  readOnly
                  className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{option.label}</p>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">ROI計算</h3>
            <Button variant="ghost" size="sm" icon="fas fa-calculator" />
          </div>
          <div className="mt-4 space-y-4">
            {roiScenarios.map((scenario) => (
              <div key={scenario.name} className="rounded-xl border border-gray-100 p-4">
                <p className="text-sm font-semibold text-gray-900">{scenario.name}</p>
                <div className="mt-2 grid grid-cols-2 text-sm text-gray-600">
                  <div>
                    <p className="text-xs text-gray-500">費用</p>
                    <p className="font-semibold text-gray-900">¥{scenario.spend.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">売上見込み</p>
                    <p className="font-semibold text-gray-900">
                      ¥{scenario.expectedRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs font-semibold text-amber-500">ROI {scenario.roi}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
