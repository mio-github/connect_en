import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  CreditCard, 
  Gift, 
  Bell, 
  ChevronRight,
  Edit,
  Star,
  Clock,
  MapPin,
  Award
} from 'lucide-react';

interface ReservationData {
  id: string;
  lessonName: string;
  date: string;
  time: string;
  studio: string;
  instructor: string;
  status: 'confirmed' | 'cancelled' | 'completed';
}

interface PointTransaction {
  id: string;
  date: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
}

const mockReservations: ReservationData[] = [
  {
    id: '1',
    lessonName: 'ヒップホップ初級',
    date: '2024-12-01',
    time: '19:00-20:00',
    studio: '渋谷スタジオA',
    instructor: '佐藤先生',
    status: 'confirmed'
  },
  {
    id: '2',
    lessonName: 'ジャズダンス中級',
    date: '2024-11-28',
    time: '20:15-21:30',
    studio: '横浜スタジオB',
    instructor: '田中先生',
    status: 'completed'
  }
];

const mockPointHistory: PointTransaction[] = [
  { id: '1', date: '2024-11-28', type: 'earn', amount: 100, description: 'レッスン出席' },
  { id: '2', date: '2024-11-25', type: 'spend', amount: 500, description: 'ドリンク購入' },
  { id: '3', date: '2024-11-20', type: 'earn', amount: 200, description: '友達紹介' }
];

export const MemberMyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const memberInfo = {
    name: '田中 花子',
    nameEn: 'Hanako Tanaka',
    email: 'hanako.tanaka@example.com',
    phone: '090-1234-5678',
    membershipType: 'プレミアム会員',
    joinDate: '2024-01-15',
    points: 1250,
    totalLessons: 48,
    favoriteInstructor: '佐藤先生'
  };

  const tabs = [
    { id: 'overview', label: '概要', labelEn: 'Overview' },
    { id: 'reservations', label: '予約履歴', labelEn: 'Reservations' },
    { id: 'points', label: 'ポイント', labelEn: 'Points' },
    { id: 'profile', label: 'プロフィール', labelEn: 'Profile' }
  ];

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="bg-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">マイページ</h1>
            <p className="text-purple-100">My Page</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">{memberInfo.name}</p>
            <p className="text-purple-100 text-sm">{memberInfo.membershipType}</p>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
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
          {/* 概要タブ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 統計情報 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-purple-100 rounded-lg p-4 text-center">
                  <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{memberInfo.totalLessons}</div>
                  <div className="text-sm text-purple-600">受講レッスン数</div>
                </div>
                <div className="bg-emerald-100 rounded-lg p-4 text-center">
                  <Gift className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-emerald-700">{memberInfo.points}</div>
                  <div className="text-sm text-emerald-600">Enポイント</div>
                </div>
                <div className="bg-indigo-100 rounded-lg p-4 text-center">
                  <Star className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-indigo-700">4.9</div>
                  <div className="text-sm text-indigo-600">平均評価</div>
                </div>
                <div className="bg-pink-100 rounded-lg p-4 text-center">
                  <User className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                  <div className="text-sm font-bold text-pink-700">{memberInfo.favoriteInstructor}</div>
                  <div className="text-xs text-pink-600">お気に入り講師</div>
                </div>
              </div>

              {/* 次回予約 */}
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">次回のレッスン</h3>
                {mockReservations.filter(r => r.status === 'confirmed').slice(0, 1).map(reservation => (
                  <div key={reservation.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{reservation.lessonName}</div>
                      <div className="text-sm text-gray-600 flex items-center space-x-4 mt-1">
                        <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" />{reservation.date}</span>
                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" />{reservation.time}</span>
                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" />{reservation.studio}</span>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      詳細確認
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 予約履歴タブ */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">予約履歴</h3>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  すべて表示
                </button>
              </div>
              {mockReservations.map(reservation => (
                <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{reservation.lessonName}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {reservation.date} {reservation.time} | {reservation.studio} | {reservation.instructor}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        reservation.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        reservation.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reservation.status === 'confirmed' ? '予約済み' :
                         reservation.status === 'completed' ? '受講済み' : 'キャンセル'}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ポイントタブ */}
          {activeTab === 'points' && (
            <div className="space-y-6">
              <div className="bg-purple-100 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-700">{memberInfo.points}</div>
                  <div className="text-purple-600">現在のEnポイント</div>
                  <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    ポイントを購入
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ポイント履歴</h3>
                <div className="space-y-3">
                  {mockPointHistory.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <div className="font-medium text-gray-900">{transaction.description}</div>
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                      </div>
                      <div className={`font-bold ${transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}pt
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* プロフィールタブ */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">会員情報</h3>
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium">
                  <Edit className="h-4 w-4" />
                  <span>編集</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">氏名</label>
                    <div className="text-gray-900">{memberInfo.name}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                    <div className="text-gray-900">{memberInfo.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                    <div className="text-gray-900">{memberInfo.phone}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">会員種別</label>
                    <div className="text-gray-900">{memberInfo.membershipType}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">入会日</label>
                    <div className="text-gray-900">{memberInfo.joinDate}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">会員番号</label>
                    <div className="text-gray-900">EN-2024-001234</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};