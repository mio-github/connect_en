import React, { useState, useRef, useEffect } from 'react';
import {
  User,
  Calendar,
  Gift,
  Bell,
  Settings,
  Clock,
  MapPin,
  QrCode,
  Video,
  Sparkles,
  Users,
  Home,
  CheckCircle,
  ChevronRight,
  X
} from 'lucide-react';
import { PhaseBadge } from '../components/UI/PhaseBadge';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 border-2 transition-all active:scale-95 ${
      disabled
        ? 'bg-gray-100 border-gray-200 cursor-not-allowed opacity-40'
        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md active:shadow-sm'
    }`}
    style={{ minHeight: '120px' }}
  >
    <div className={disabled ? 'text-gray-400' : 'text-purple-600'}>
      {icon}
    </div>
    <div className={`text-sm font-bold text-center leading-tight ${disabled ? 'text-gray-400' : 'text-gray-800'}`}>
      {title}
    </div>
  </button>
);

export const MemberMyPage: React.FC = () => {
  const [showQR, setShowQR] = useState(false);

  const memberInfo = {
    id: 'S0005583',
    name: 'オンライン 入会',
    memberType: 'Member: En Dance Studio',
    course: '全クラス受け放題プレミアム',
    tickets: 0,
    points: 40520,
    limitedPoints: 0,
    badgeType: 'オンライン 入会様'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* QRコード全画面モーダル */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">マイQRコード</h2>
              <button
                onClick={() => setShowQR(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl mb-6">
              <div className="bg-white w-full aspect-square flex items-center justify-center rounded-xl border-4 border-purple-600 mb-4">
                <QrCode className="h-48 w-48 text-purple-600" />
              </div>
              <p className="text-center text-sm text-gray-700 font-medium">
                ID: {memberInfo.id}
              </p>
              <p className="text-center text-sm text-gray-700 font-bold mt-1">
                {memberInfo.name}
              </p>
            </div>
            <p className="text-sm text-gray-600 text-center mb-6">
              受付でこのQRコードを提示してください
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* スマホフレーム風のコンテナ */}
      <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
        {/* ヘッダー - スマホ最適化 */}
        <div className="bg-purple-600 text-white p-5 sticky top-0 z-10 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-purple-600 font-bold text-base">En</span>
              </div>
              <div>
                <span className="text-lg font-bold block">En Dance Studio</span>
                <span className="text-xs text-purple-100">エンダンススタジオ</span>
              </div>
            </div>
            <button className="p-3 hover:bg-purple-700 rounded-xl transition-colors active:scale-95">
              <Bell className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* 会員情報カード - スマホ最適化 */}
        <div className="bg-white m-4 rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
          {/* 会員バッジとID */}
          <div className="bg-purple-50 p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold inline-block mb-2">
                  {memberInfo.badgeType}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{memberInfo.name}</div>
                <div className="text-sm text-gray-600">ID: {memberInfo.id}</div>
              </div>
            </div>
          </div>

          {/* QRコードボタン - 大きく目立つ */}
          <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-400">
            <button
              onClick={() => setShowQR(true)}
              className="w-full bg-white p-6 rounded-2xl shadow-lg flex items-center justify-between active:scale-95 transition-transform"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 p-4 rounded-xl">
                  <QrCode className="h-10 w-10 text-gray-900" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-gray-900">MY QRコード</div>
                  <div className="text-sm text-gray-600">タップして表示</div>
                </div>
              </div>
              <ChevronRight className="h-8 w-8 text-gray-400" />
            </button>
          </div>

          {/* コース・チケット・ポイント */}
          <div className="p-5">
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                <div className="text-xs text-purple-600 mb-1 font-bold">CONTRACT COURSE</div>
                <div className="text-base font-bold text-gray-900">{memberInfo.course}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                <div className="text-xs text-blue-600 mb-2 font-bold">TICKET</div>
                <div className="text-3xl font-bold text-blue-600">{memberInfo.tickets}</div>
                <div className="text-xs text-gray-600 mt-1">枚</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-center">
                <div className="text-xs text-orange-600 mb-2 font-bold">POINT</div>
                <div className="text-3xl font-bold text-orange-600">{memberInfo.points.toLocaleString()}</div>
                <div className="text-xs text-gray-600 mt-1">ポイント</div>
              </div>
            </div>
          </div>
        </div>

        {/* メニューグリッド - スマホ最適化 */}
        <div className="px-4 pb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 px-2">メニュー</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <MenuItem
              icon={<Calendar className="h-8 w-8" />}
              title="レッスン予約"
            />
            <MenuItem
              icon={<CheckCircle className="h-8 w-8" />}
              title="予約履歴"
            />
            <MenuItem
              icon={<Clock className="h-8 w-8" />}
              title="受講履歴"
            />
            <MenuItem
              icon={<Gift className="h-8 w-8" />}
              title="ポイント履歴"
            />
            <MenuItem
              icon={<Video className="h-8 w-8" />}
              title="オンラインレッスン"
              disabled={true}
            />
            <MenuItem
              icon={<Sparkles className="h-8 w-8" />}
              title="イベント・ワークショップ"
              disabled={true}
            />
            <MenuItem
              icon={<Users className="h-8 w-8" />}
              title="友達紹介"
              disabled={true}
            />
            <MenuItem
              icon={<Settings className="h-8 w-8" />}
              title="設定"
            />
          </div>

          {/* お知らせセクション - スマホ最適化 */}
          <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-6 w-6 text-purple-600" />
                <h2 className="text-lg font-bold text-gray-900">お知らせ</h2>
              </div>
              <button className="text-sm text-purple-600 font-bold hover:text-purple-700 flex items-center space-x-1">
                <span>すべて見る</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left bg-red-50 p-4 rounded-xl border border-red-200 active:scale-98 transition-transform">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold mt-0.5">NEW</div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900 mb-2">【重要】年末年始の営業時間について</p>
                    <p className="text-xs text-gray-600">2024-12-15</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
              </button>
              <button className="w-full text-left bg-blue-50 p-4 rounded-xl border border-blue-200 active:scale-98 transition-transform">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold mt-0.5">INFO</div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-gray-900 mb-2">12月限定キャンペーン実施中！</p>
                    <p className="text-xs text-gray-600">2024-12-01</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            </div>
          </div>

          {/* 次回レッスン - スマホ最適化 */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-5 mb-4 shadow-lg">
            <h2 className="text-white font-bold mb-4 flex items-center text-lg">
              <Calendar className="h-6 w-6 mr-2" />
              次回のレッスン
            </h2>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="text-xl font-bold text-gray-900 mb-4">ヒップホップ初級</div>
              <div className="space-y-3 text-base">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium">2024年12月20日（金）</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium">19:00 - 20:00</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium">渋谷校 - Aスタジオ</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <User className="h-5 w-5 mr-3 text-purple-600" />
                  <span className="font-medium">講師: AIKO先生</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-gray-200 flex space-x-3">
                <button className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 active:scale-95 transition-all">
                  キャンセル
                </button>
                <button className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 active:scale-95 transition-all">
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* フッターナビゲーション - 固定 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-20">
          <div className="max-w-md mx-auto grid grid-cols-5 gap-1 px-2 py-2">
            <button className="flex flex-col items-center py-3 text-purple-600 bg-purple-50 rounded-xl transition-all active:scale-95">
              <Home className="h-6 w-6 mb-1" />
              <span className="text-xs font-bold">HOME</span>
            </button>
            <button className="flex flex-col items-center py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all active:scale-95">
              <Calendar className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">レッスン</span>
            </button>
            <button className="flex flex-col items-center py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all active:scale-95">
              <CheckCircle className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">予約</span>
            </button>
            <button className="flex flex-col items-center py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all active:scale-95">
              <Bell className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">通知</span>
            </button>
            <button className="flex flex-col items-center py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all active:scale-95">
              <User className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">設定</span>
            </button>
          </div>
        </div>
      </div>

      {/* Phase Badge */}
      <div className="fixed top-4 right-4 z-30">
        <PhaseBadge phase={1} />
      </div>

      {/* PC表示用の説明 */}
      <div className="hidden md:block fixed bottom-4 left-4 bg-white p-4 rounded-lg border border-gray-200 max-w-sm shadow-lg z-30">
        <p className="text-sm text-gray-700 mb-2 font-semibold">
          📱 スマートフォン最適化マイページ
        </p>
        <p className="text-xs text-gray-600 mb-2">
          スマホ操作を意識した改善点：
        </p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>✓ 大きなタップ領域（最小44x44px）</li>
          <li>✓ QRコード全画面モーダル表示</li>
          <li>✓ 固定フッターナビゲーション</li>
          <li>✓ active:scale-95によるタップフィードバック</li>
          <li>✓ 2カラムメニューグリッド</li>
          <li>✓ Phase 2機能のグレーアウト</li>
        </ul>
      </div>
    </div>
  );
};
