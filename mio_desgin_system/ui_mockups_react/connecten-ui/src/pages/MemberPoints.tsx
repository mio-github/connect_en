import React, { useState } from 'react';
import { 
  Gift, 
  ShoppingCart, 
  Calendar, 
  TrendingUp, 
  Plus,
  Star,
  Clock,
  Award,
  CreditCard
} from 'lucide-react';

interface PointTransaction {
  id: string;
  date: string;
  type: 'earn' | 'spend' | 'expire';
  amount: number;
  description: string;
  category: string;
}

interface PointPackage {
  id: string;
  points: number;
  price: number;
  bonus: number;
  popular?: boolean;
}

const mockTransactions: PointTransaction[] = [
  { id: '1', date: '2024-11-28', type: 'earn', amount: 100, description: 'ヒップホップ初級レッスン出席', category: 'lesson' },
  { id: '2', date: '2024-11-27', type: 'earn', amount: 50, description: '毎日チェックインボーナス', category: 'bonus' },
  { id: '3', date: '2024-11-25', type: 'spend', amount: 500, description: 'スタジオドリンク購入', category: 'purchase' },
  { id: '4', date: '2024-11-24', type: 'earn', amount: 200, description: '友達紹介ボーナス', category: 'referral' },
  { id: '5', date: '2024-11-20', type: 'spend', amount: 1000, description: 'プライベートレッスン予約', category: 'lesson' },
  { id: '6', date: '2024-11-15', type: 'expire', amount: 50, description: 'ポイント有効期限切れ', category: 'system' }
];

const pointPackages: PointPackage[] = [
  { id: '1', points: 1000, price: 1000, bonus: 0 },
  { id: '2', points: 3000, price: 2800, bonus: 200, popular: true },
  { id: '3', points: 5000, price: 4500, bonus: 500 },
  { id: '4', points: 10000, price: 8500, bonus: 1500 }
];

export const MemberPoints: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const currentPoints = 1250;
  const pointsThisMonth = 350;
  const pointsExpiringSoon = 150;

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="bg-emerald-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Enポイント</h1>
        <p className="text-emerald-100">En Points Management</p>
      </div>

      {/* ポイント概要 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">現在のポイント</h3>
              <div className="text-3xl font-bold text-emerald-600 mt-2">{currentPoints}</div>
              <div className="text-sm text-gray-500">En Points</div>
            </div>
            <Gift className="h-12 w-12 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">今月の獲得</h3>
              <div className="text-3xl font-bold text-blue-600 mt-2">+{pointsThisMonth}</div>
              <div className="text-sm text-gray-500">Points Earned</div>
            </div>
            <TrendingUp className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">期限間近</h3>
              <div className="text-3xl font-bold text-orange-600 mt-2">{pointsExpiringSoon}</div>
              <div className="text-sm text-gray-500">Expiring Soon</div>
            </div>
            <Clock className="h-12 w-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'ポイント利用', labelEn: 'Use Points' },
              { id: 'purchase', label: 'ポイント購入', labelEn: 'Buy Points' },
              { id: 'history', label: 'ポイント履歴', labelEn: 'Point History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div>{tab.label}</div>
                <div className="text-xs text-gray-400">{tab.labelEn}</div>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* ポイント利用タブ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">ポイント利用メニュー</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'レッスン予約', description: '500pt〜', icon: Calendar, color: 'purple' },
                  { title: 'プライベートレッスン', description: '2000pt〜', icon: Star, color: 'pink' },
                  { title: 'スタジオグッズ', description: '100pt〜', icon: ShoppingCart, color: 'blue' },
                  { title: 'ドリンク・軽食', description: '50pt〜', icon: Gift, color: 'green' }
                ].map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-${item.color}-100`}>
                        <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ポイント購入タブ */}
          {activeTab === 'purchase' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">ポイントパッケージ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pointPackages.map((pkg) => (
                  <div key={pkg.id} className={`relative border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
                    pkg.popular ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'
                  }`}>
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          人気
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{pkg.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-500 mb-2">ポイント</div>
                      {pkg.bonus > 0 && (
                        <div className="text-emerald-600 text-sm font-medium mb-3">
                          +{pkg.bonus}pt ボーナス!
                        </div>
                      )}
                      <div className="text-xl font-bold text-purple-600 mb-4">¥{pkg.price.toLocaleString()}</div>
                      <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        pkg.popular 
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                        購入する
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ポイント履歴タブ */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">ポイント履歴</h3>
              <div className="space-y-3">
                {mockTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.type === 'earn' ? 'bg-green-100' :
                        transaction.type === 'spend' ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        {transaction.type === 'earn' && <Plus className="h-4 w-4 text-green-600" />}
                        {transaction.type === 'spend' && <ShoppingCart className="h-4 w-4 text-red-600" />}
                        {transaction.type === 'expire' && <Clock className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                      </div>
                    </div>
                    <div className={`font-bold text-lg ${
                      transaction.type === 'earn' ? 'text-green-600' : 
                      transaction.type === 'spend' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {transaction.type === 'earn' ? '+' : transaction.type === 'spend' ? '-' : '-'}
                      {transaction.amount}pt
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};