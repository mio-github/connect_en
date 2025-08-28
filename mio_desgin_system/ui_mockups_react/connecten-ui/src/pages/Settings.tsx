import React, { useState } from 'react';
import { Button } from '../components/UI/Button';

interface SystemSettings {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  timezone: string;
  currency: string;
  language: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  reservationReminders: boolean;
  paymentReminders: boolean;
  promotionalEmails: boolean;
  systemUpdates: boolean;
}

interface SecuritySettings {
  passwordRequirements: {
    minLength: number;
    requireUppercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  sessionTimeout: number;
  twoFactorAuth: boolean;
  loginAttempts: number;
}

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'integrations' | 'billing'>('general');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'password' | 'backup' | null>(null);

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    companyName: 'En Dance Studio',
    address: '東京都渋谷区道玄坂1-12-1',
    phone: '03-1234-5678',
    email: 'info@endance.studio',
    website: 'https://www.endance.studio',
    timezone: 'Asia/Tokyo',
    currency: 'JPY',
    language: 'ja'
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    reservationReminders: true,
    paymentReminders: true,
    promotionalEmails: false,
    systemUpdates: true
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    passwordRequirements: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: false
    },
    sessionTimeout: 30,
    twoFactorAuth: false,
    loginAttempts: 5
  });

  const handleSaveSettings = (type: string) => {
    console.log(`${type}設定を保存しました`);
    // 実際の実装では、APIを呼び出して設定を保存
  };

  const handleExportData = () => {
    console.log('データをエクスポートしています...');
    // 実際の実装では、データエクスポート処理
  };

  const handleBackup = () => {
    setModalType('backup');
    setShowModal(true);
  };

  return (
    <div className="settings">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">システム設定</h1>
          <p className="text-gray-600 mt-1">アプリケーションの基本設定と管理</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={handleExportData}>
            <i className="fas fa-download mr-2"></i>
            データエクスポート
          </Button>
          <Button variant="secondary" onClick={handleBackup}>
            <i className="fas fa-database mr-2"></i>
            バックアップ
          </Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { key: 'general', label: '基本設定', icon: 'fas fa-cog' },
            { key: 'notifications', label: '通知設定', icon: 'fas fa-bell' },
            { key: 'security', label: 'セキュリティ', icon: 'fas fa-shield-alt' },
            { key: 'integrations', label: '外部連携', icon: 'fas fa-plug' },
            { key: 'billing', label: '請求・支払い', icon: 'fas fa-credit-card' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 基本設定タブ */}
      {activeTab === 'general' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">会社情報</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">会社名</label>
                <input
                  type="text"
                  value={systemSettings.companyName}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                <input
                  type="tel"
                  value={systemSettings.phone}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">住所</label>
                <input
                  type="text"
                  value={systemSettings.address}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                <input
                  type="email"
                  value={systemSettings.email}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ウェブサイト</label>
                <input
                  type="url"
                  value={systemSettings.website}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" onClick={() => handleSaveSettings('会社情報')}>
                保存
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">システム設定</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">タイムゾーン</label>
                <select
                  value={systemSettings.timezone}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">通貨</label>
                <select
                  value={systemSettings.currency}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="JPY">日本円 (¥)</option>
                  <option value="USD">米ドル ($)</option>
                  <option value="EUR">ユーロ (€)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">言語</label>
                <select
                  value={systemSettings.language}
                  onChange={(e) => setSystemSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" onClick={() => handleSaveSettings('システム')}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 通知設定タブ */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">通知設定</h3>
            <div className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'メール通知を有効にする', description: '重要な更新やアラートをメールで受信' },
                { key: 'smsNotifications', label: 'SMS通知を有効にする', description: '緊急時やリマインダーをSMSで受信' },
                { key: 'reservationReminders', label: '予約リマインダー', description: 'レッスン前日と当日にリマインダーを送信' },
                { key: 'paymentReminders', label: '支払いリマインダー', description: '支払期限前と延滞時にリマインダーを送信' },
                { key: 'promotionalEmails', label: 'プロモーションメール', description: 'キャンペーンや特別オファーの案内を受信' },
                { key: 'systemUpdates', label: 'システム更新通知', description: 'システムの更新やメンテナンス情報を受信' }
              ].map((setting) => (
                <div key={setting.key} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{setting.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{setting.description}</div>
                  </div>
                  <button
                    onClick={() => setNotificationSettings(prev => ({ 
                      ...prev, 
                      [setting.key]: !prev[setting.key as keyof NotificationSettings] 
                    }))}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      notificationSettings[setting.key as keyof NotificationSettings] 
                        ? 'bg-blue-600' 
                        : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notificationSettings[setting.key as keyof NotificationSettings] 
                          ? 'translate-x-5' 
                          : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" onClick={() => handleSaveSettings('通知')}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* セキュリティタブ */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">パスワード要件</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">最小文字数</label>
                <select
                  value={securitySettings.passwordRequirements.minLength}
                  onChange={(e) => setSecuritySettings(prev => ({ 
                    ...prev, 
                    passwordRequirements: { 
                      ...prev.passwordRequirements, 
                      minLength: parseInt(e.target.value) 
                    } 
                  }))}
                  className="w-full md:w-32 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[6, 8, 10, 12].map(num => (
                    <option key={num} value={num}>{num}文字以上</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-3">
                {[
                  { key: 'requireUppercase', label: '大文字を含む', description: 'A-Zの大文字を1文字以上含む' },
                  { key: 'requireNumbers', label: '数字を含む', description: '0-9の数字を1文字以上含む' },
                  { key: 'requireSpecialChars', label: '特殊文字を含む', description: '記号を1文字以上含む' }
                ].map((requirement) => (
                  <div key={requirement.key} className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{requirement.label}</div>
                      <div className="text-xs text-gray-500 mt-1">{requirement.description}</div>
                    </div>
                    <button
                      onClick={() => setSecuritySettings(prev => ({ 
                        ...prev, 
                        passwordRequirements: {
                          ...prev.passwordRequirements,
                          [requirement.key]: !prev.passwordRequirements[requirement.key as keyof typeof prev.passwordRequirements]
                        }
                      }))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        securitySettings.passwordRequirements[requirement.key as keyof typeof securitySettings.passwordRequirements]
                          ? 'bg-blue-600' 
                          : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          securitySettings.passwordRequirements[requirement.key as keyof typeof securitySettings.passwordRequirements]
                            ? 'translate-x-5' 
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">ログイン設定</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">セッションタイムアウト（分）</label>
                <select
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                  className="w-full md:w-48 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[15, 30, 60, 120, 240].map(min => (
                    <option key={min} value={min}>{min}分</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">最大ログイン試行回数</label>
                <select
                  value={securitySettings.loginAttempts}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, loginAttempts: parseInt(e.target.value) }))}
                  className="w-full md:w-32 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[3, 5, 10].map(num => (
                    <option key={num} value={num}>{num}回</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">二段階認証</div>
                  <div className="text-xs text-gray-500 mt-1">ログイン時にSMSまたは認証アプリでの確認を必要とする</div>
                </div>
                <button
                  onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    securitySettings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      securitySettings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="primary" onClick={() => handleSaveSettings('セキュリティ')}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 他のタブのプレースホルダー */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-plug text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">外部連携</h3>
          <p className="text-gray-600">Google Calendar、Zoom、決済システムなどとの連携機能を実装予定</p>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-credit-card text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">請求・支払い設定</h3>
          <p className="text-gray-600">自動請求、支払い方法、料金プランの設定機能を実装予定</p>
        </div>
      )}

      {/* バックアップモーダル */}
      {showModal && modalType === 'backup' && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">データバックアップ</h2>
              <button
                onClick={() => { setShowModal(false); setModalType(null); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <i className="fas fa-database text-2xl text-blue-600"></i>
                  <div>
                    <div className="text-sm font-medium text-gray-900">フルバックアップ</div>
                    <div className="text-xs text-gray-500">全データを含む完全なバックアップ</div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                  <div className="flex items-start gap-2">
                    <i className="fas fa-exclamation-triangle text-yellow-600 mt-0.5"></i>
                    <div className="text-sm text-yellow-800">
                      バックアップ処理中はシステムの一部機能が制限される場合があります。
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div>• 会員データ</div>
                  <div>• レッスンデータ</div>
                  <div>• 予約・支払い履歴</div>
                  <div>• システム設定</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={() => { setShowModal(false); setModalType(null); }}>
                キャンセル
              </Button>
              <Button variant="primary" onClick={() => { setShowModal(false); setModalType(null); }}>
                バックアップを開始
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};