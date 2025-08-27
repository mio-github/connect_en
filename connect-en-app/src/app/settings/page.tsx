'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const SETTINGS_TABS = [
  { label: 'アカウント', value: 'account' },
  { label: 'パスワード', value: 'password' },
  { label: '通知', value: 'notification' },
  { label: 'システム', value: 'system' },
  { label: '権限管理', value: 'roles' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [account, setAccount] = useState({ name: '管理者', email: 'admin@example.com' });
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [notification, setNotification] = useState({ email: true, sms: false });
  const [system, setSystem] = useState({ theme: 'light', language: 'ja' });
  const [roles, setRoles] = useState([
    { id: 1, name: '管理者', description: '全ての権限', active: true },
    { id: 2, name: '講師', description: 'レッスン管理・会員管理', active: true },
    { id: 3, name: '事務', description: '会員管理・請求管理', active: false },
  ]);

  // 保存処理（ダミー）
  const handleSave = () => {
    alert('設定を保存しました（ダミー）');
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">設定</h1>
          <p className="text-gray-600">アカウントやシステムの各種設定ができます。</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="primary" onClick={handleSave}>保存</Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          {SETTINGS_TABS.map(tab => (
            <button
              key={tab.value}
              className={`py-4 px-1 font-medium text-sm focus:outline-none ${
                activeTab === tab.value
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* アカウント設定 */}
      {activeTab === 'account' && (
        <Card title="アカウント情報" className="mb-6">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">氏名</label>
              <Input
                type="text"
                value={account.name}
                onChange={e => setAccount({ ...account, name: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <Input
                type="email"
                value={account.email}
                onChange={e => setAccount({ ...account, email: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
        </Card>
      )}

      {/* パスワード変更 */}
      {activeTab === 'password' && (
        <Card title="パスワード変更" className="mb-6">
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">現在のパスワード</label>
              <Input
                type="password"
                value={password.current}
                onChange={e => setPassword({ ...password, current: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">新しいパスワード</label>
              <Input
                type="password"
                value={password.new}
                onChange={e => setPassword({ ...password, new: e.target.value })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">新しいパスワード（確認）</label>
              <Input
                type="password"
                value={password.confirm}
                onChange={e => setPassword({ ...password, confirm: e.target.value })}
                className="w-full"
              />
            </div>
          </div>
        </Card>
      )}

      {/* 通知設定 */}
      {activeTab === 'notification' && (
        <Card title="通知設定" className="mb-6">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={notification.email}
                onChange={e => setNotification({ ...notification, email: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm">メール通知を受け取る</span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={notification.sms}
                onChange={e => setNotification({ ...notification, sms: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm">SMS通知を受け取る</span>
            </div>
          </div>
        </Card>
      )}

      {/* システム設定 */}
      {activeTab === 'system' && (
        <Card title="システム設定" className="mb-6">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">テーマ</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                value={system.theme}
                onChange={e => setSystem({ ...system, theme: e.target.value })}
              >
                <option value="light">ライト</option>
                <option value="dark">ダーク</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">言語</label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                value={system.language}
                onChange={e => setSystem({ ...system, language: e.target.value })}
              >
                <option value="ja">日本語</option>
                <option value="en">英語</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      {/* 権限管理 */}
      {activeTab === 'roles' && (
        <Card title="権限管理" className="mb-6">
          <div className="p-4">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ロール名</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">説明</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">有効</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roles.map(role => (
                  <tr key={role.id}>
                    <td className="px-4 py-3 text-sm">{role.name}</td>
                    <td className="px-4 py-3 text-sm">{role.description}</td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={role.active}
                        onChange={e => setRoles(roles.map(r => r.id === role.id ? { ...r, active: e.target.checked } : r))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </Layout>
  );
} 