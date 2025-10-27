import React from 'react';
import { Button } from '../components/UI/Button';
import { PhaseBadge } from '../components/UI/PhaseBadge';

interface Lead {
  id: string;
  name: string;
  email: string;
  channel: string;
  score: number;
  stage: string;
  owner: string;
  lastAction: string;
}

interface PipelineStage {
  name: string;
  count: number;
  conversion: string;
  color: string;
}

interface Task {
  title: string;
  lead: string;
  due: string;
  type: 'call' | 'mail' | 'meeting';
}

const leads: Lead[] = [
  {
    id: 'LD-5001',
    name: '田中 美咲',
    email: 'tanaka@example.com',
    channel: 'マーケット体験',
    score: 86,
    stage: '商談中',
    owner: 'Sales A',
    lastAction: '1日前'
  },
  {
    id: 'LD-5002',
    name: '佐藤 健',
    email: 'sato@example.com',
    channel: 'Instagram DM',
    score: 74,
    stage: '提案済み',
    owner: 'Sales B',
    lastAction: '3日前'
  },
  {
    id: 'LD-5003',
    name: '株式会社GlowFit',
    email: 'hr@glowfit.co.jp',
    channel: '法人紹介',
    score: 92,
    stage: '契約準備',
    owner: 'Enterprise',
    lastAction: '当日'
  },
  {
    id: 'LD-5004',
    name: '高橋 すみれ',
    email: 'takahashi@example.com',
    channel: 'WEB資料DL',
    score: 58,
    stage: 'フォロー待ち',
    owner: 'Sales C',
    lastAction: '5日前'
  }
];

const pipeline: PipelineStage[] = [
  { name: '新規リード', count: 248, conversion: '基準', color: 'bg-blue-200' },
  { name: '接触済み', count: 174, conversion: '70%', color: 'bg-blue-300' },
  { name: '商談中', count: 92, conversion: '53%', color: 'bg-blue-400' },
  { name: '提案済み', count: 48, conversion: '26%', color: 'bg-blue-500' },
  { name: '契約', count: 26, conversion: '11%', color: 'bg-blue-600' }
];

const tasks: Task[] = [
  { title: '体験後ヒアリング', lead: '田中 美咲', due: '本日 14:00', type: 'call' },
  { title: '法人提案書アップロード', lead: '株式会社GlowFit', due: '今日 17:00', type: 'mail' },
  { title: '休眠リード再接触', lead: '高橋 すみれ', due: '明日 10:00', type: 'call' }
];

export const LeadManagement: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-500">
            Lead Operations
          </p>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-900">リード管理</h1>
            <PhaseBadge phase={2} />
          </div>
          <p className="text-gray-500">
            リード一覧、スコア、フォローアップ、パイプラインを集中管理し、コンバージョンを最大化します。
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" icon="fas fa-upload">
            CSVインポート
          </Button>
          <Button variant="primary" icon="fas fa-user-plus">
            新規リード追加
          </Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">見込み客一覧</p>
              <p className="text-xl font-semibold text-gray-900">Lead Table</p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="sm" icon="fas fa-filter" />
              <Button variant="ghost" size="sm" icon="fas fa-download" />
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="pb-2">リード</th>
                  <th className="pb-2">チャネル</th>
                  <th className="pb-2">スコア</th>
                  <th className="pb-2">ステージ</th>
                  <th className="pb-2">担当</th>
                  <th className="pb-2">最終アクション</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-t border-gray-100">
                    <td className="py-3">
                      <p className="font-semibold text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.email}</p>
                    </td>
                    <td className="py-3 text-gray-700">{lead.channel}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-gray-700">{lead.score}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-700">{lead.stage}</td>
                    <td className="py-3 text-gray-700">{lead.owner}</td>
                    <td className="py-3 text-gray-500">{lead.lastAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">フォローアップタスク</h3>
            <Button variant="ghost" size="sm" icon="fas fa-plus" />
          </div>
          <div className="mt-4 space-y-4">
            {tasks.map((task) => (
              <div key={task.title} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span
                    className={`rounded-full px-2 py-0.5 ${
                      task.type === 'call'
                        ? 'bg-emerald-100 text-emerald-700'
                        : task.type === 'mail'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {task.type}
                  </span>
                  <span>{task.due}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-900">{task.title}</p>
                <p className="text-sm text-gray-500">{task.lead}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">コンバージョン分析</h3>
          <Button variant="ghost" size="sm" icon="fas fa-chart-column" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { label: 'リード獲得', value: '248件', detail: '前週比 +12%' },
            { label: '商談化率', value: '37%', detail: '+4pt' },
            { label: '提案平均日数', value: '4.2日', detail: '-0.6日' },
            { label: '契約率', value: '11%', detail: '目標 15%' }
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-gray-100 p-4">
              <p className="text-xs uppercase text-gray-500">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500">{card.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">ステージ管理（パイプライン）</h3>
          <Button variant="ghost" size="sm" icon="fas fa-diagram-next" />
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {pipeline.map((stage) => (
            <div key={stage.name} className="rounded-xl border border-gray-100 p-4 text-sm">
              <p className="font-semibold text-gray-900">{stage.name}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stage.count}</p>
              <p className="text-xs text-gray-500">{stage.conversion}</p>
              <div className="mt-3 h-2 rounded-full bg-gray-100">
                <div className={`h-full rounded-full ${stage.color}`} style={{ width: '90%' }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
