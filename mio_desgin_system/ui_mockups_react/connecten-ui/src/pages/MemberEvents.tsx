import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign, Star, X, Check, Tag } from 'lucide-react';
import { MemberHeader } from '../components/Layout/MemberHeader';

interface Event {
  id: string;
  name: string;
  nameEn: string;
  category: 'workshop' | 'competition' | 'showcase' | 'special';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  instructor: string;
  instructorEn: string;
  description: string;
  price: number;
  capacity: number;
  registered: number;
  level: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
}

export const MemberEvents: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const memberInfo = {
    name: '田中 花子'
  };

  // ダミーデータ
  const events: Event[] = [
    {
      id: 'EV-001',
      name: 'プロダンサー特別ワークショップ',
      nameEn: 'Professional Dancer Special Workshop',
      category: 'workshop',
      date: '2024-12-15',
      startTime: '14:00',
      endTime: '17:00',
      location: '渋谷スタジオA',
      instructor: 'TAKAHIRO',
      instructorEn: 'TAKAHIRO',
      description: '国内外で活躍するプロダンサーTAKAHIROによる特別ワークショップ。ヒップホップの基礎から応用まで、3時間の集中レッスンで技術を磨きます。初心者から上級者まで参加可能です。',
      price: 5000,
      capacity: 30,
      registered: 22,
      level: '全レベル',
      tags: ['ヒップホップ', 'ワークショップ', '人気'],
      imageUrl: '',
      featured: true
    },
    {
      id: 'EV-002',
      name: '年末ダンスコンペティション',
      nameEn: 'Year-End Dance Competition',
      category: 'competition',
      date: '2024-12-28',
      startTime: '13:00',
      endTime: '18:00',
      location: '横浜アリーナ',
      instructor: '審査員団',
      instructorEn: 'Jury Panel',
      description: '1年の締めくくりを飾る大規模ダンスコンペティション。ソロ、デュオ、グループの各部門で競い合います。優勝者には賞金と次年度の無料レッスンチケットを進呈。',
      price: 3000,
      capacity: 100,
      registered: 45,
      level: '中級〜上級',
      tags: ['コンペティション', 'イベント'],
      imageUrl: '',
      featured: true
    },
    {
      id: 'EV-003',
      name: 'クリスマスダンスショーケース',
      nameEn: 'Christmas Dance Showcase',
      category: 'showcase',
      date: '2024-12-24',
      startTime: '19:00',
      endTime: '21:00',
      location: '新宿スタジオ メインホール',
      instructor: '各インストラクター',
      instructorEn: 'All Instructors',
      description: 'En Dance Studio主催のクリスマス特別ショーケース。各クラスの生徒が日頃の成果を発表します。観覧無料、ご家族・ご友人もお誘いください。',
      price: 0,
      capacity: 200,
      registered: 156,
      level: '全レベル',
      tags: ['ショーケース', 'クリスマス', '無料'],
      imageUrl: '',
      featured: false
    },
    {
      id: 'EV-004',
      name: 'K-POPダンスマスタークラス',
      nameEn: 'K-POP Dance Master Class',
      category: 'workshop',
      date: '2024-12-10',
      startTime: '16:00',
      endTime: '18:00',
      location: '渋谷スタジオB',
      instructor: 'MIN-JI',
      instructorEn: 'MIN-JI',
      description: '韓国からゲストインストラクターを招いてのK-POPダンス特別レッスン。最新のK-POPヒット曲の振り付けを学びます。初心者大歓迎！',
      price: 4000,
      capacity: 40,
      registered: 38,
      level: '初級〜中級',
      tags: ['K-POP', 'ワークショップ', '残りわずか'],
      imageUrl: '',
      featured: true
    },
    {
      id: 'EV-005',
      name: 'ストリートダンスバトル',
      nameEn: 'Street Dance Battle',
      category: 'competition',
      date: '2024-12-20',
      startTime: '18:00',
      endTime: '22:00',
      location: '渋谷スタジオA',
      instructor: 'MC & DJ',
      instructorEn: 'MC & DJ',
      description: 'フリースタイルのダンスバトルイベント。即興で技を競い合います。観戦のみの参加も歓迎。熱いバトルをお楽しみください！',
      price: 2000,
      capacity: 50,
      registered: 28,
      level: '中級〜上級',
      tags: ['バトル', 'ストリート'],
      imageUrl: '',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', label: 'すべて', labelEn: 'All' },
    { id: 'workshop', label: 'ワークショップ', labelEn: 'Workshop' },
    { id: 'competition', label: 'コンペティション', labelEn: 'Competition' },
    { id: 'showcase', label: 'ショーケース', labelEn: 'Showcase' },
    { id: 'special', label: '特別イベント', labelEn: 'Special Event' }
  ];

  const filteredEvents = filterCategory === 'all'
    ? events
    : events.filter(event => event.category === filterCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'workshop': return 'bg-blue-100 text-blue-800';
      case 'competition': return 'bg-red-100 text-red-800';
      case 'showcase': return 'bg-blue-100 text-blue-800';
      case 'special': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.label : category;
  };

  const handleApply = (event: Event) => {
    console.log('Applying for event:', event);
    // 申込処理
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberHeader
        memberName={memberInfo.name}
        onPageChange={(page) => console.log('Navigate to:', page)}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* フェーズバッジ */}
        <div className="flex justify-end mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border-2 border-green-300">
            Phase 2
          </span>
        </div>

        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
            イベント・ワークショップ
          </h1>
          <p className="text-gray-600 mt-2">Events & Workshops</p>
        </div>

        {/* カテゴリフィルター */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilterCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm">{category.label}</div>
                <div className="text-xs opacity-75">{category.labelEn}</div>
              </button>
            ))}
          </div>
        </div>

        {/* イベント一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {/* イベント画像（ダミー） */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                {event.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      注目
                    </span>
                  </div>
                )}
                <div className="text-white text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-2 opacity-80" />
                  <div className="text-sm font-medium">{event.name}</div>
                </div>
              </div>

              {/* イベント情報 */}
              <div className="p-5">
                <div className="mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {getCategoryLabel(event.category)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1">{event.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{event.nameEn}</p>

                <div className="space-y-2 text-sm text-gray-700 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{event.registered} / {event.capacity}名</span>
                  </div>
                </div>

                {/* タグ */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 料金と定員状況 */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="text-xl font-bold text-blue-600">
                      {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
                    </span>
                  </div>
                  <div>
                    {event.registered >= event.capacity ? (
                      <span className="text-xs text-red-600 font-bold">満員</span>
                    ) : event.registered >= event.capacity * 0.9 ? (
                      <span className="text-xs text-amber-600 font-bold">残りわずか</span>
                    ) : (
                      <span className="text-xs text-green-600 font-bold">空きあり</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* イベント詳細モーダル */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              {/* モーダルヘッダー */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedEvent.category)}`}>
                      {getCategoryLabel(selectedEvent.category)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedEvent.name}</h2>
                  <p className="text-gray-600">{selectedEvent.nameEn}</p>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 hover:text-gray-600 ml-4"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* モーダルコンテンツ */}
              <div className="p-6">
                {/* イベント画像（ダミー） */}
                <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="h-24 w-24 text-white opacity-80" />
                </div>

                {/* イベント詳細情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-700 mb-1">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">日程</span>
                    </div>
                    <div className="font-semibold">{selectedEvent.date}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-700 mb-1">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">時間</span>
                    </div>
                    <div className="font-semibold">{selectedEvent.startTime} - {selectedEvent.endTime}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-700 mb-1">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">場所</span>
                    </div>
                    <div className="font-semibold">{selectedEvent.location}</div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-700 mb-1">
                      <Users className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">定員</span>
                    </div>
                    <div className="font-semibold">{selectedEvent.registered} / {selectedEvent.capacity}名</div>
                  </div>
                </div>

                {/* インストラクター */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="text-sm text-blue-800 mb-1">インストラクター / Instructor</div>
                  <div className="font-bold text-blue-900 text-lg">{selectedEvent.instructor}</div>
                  <div className="text-blue-700">{selectedEvent.instructorEn}</div>
                </div>

                {/* 説明 */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">イベント詳細</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                </div>

                {/* レベル・タグ */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-3">
                    <div>
                      <span className="text-sm text-gray-600">対象レベル：</span>
                      <span className="font-semibold text-gray-900">{selectedEvent.level}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 料金 */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">参加費</div>
                      <div className="text-3xl font-bold text-blue-600">
                        {selectedEvent.price === 0 ? '無料' : `¥${selectedEvent.price.toLocaleString()}`}
                      </div>
                    </div>
                    {selectedEvent.price > 0 && (
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">獲得ポイント</div>
                        <div className="text-xl font-bold text-green-600">
                          +{Math.floor(selectedEvent.price * 0.05)}pt
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 申込ボタン */}
                <div className="flex space-x-4">
                  {selectedEvent.registered >= selectedEvent.capacity ? (
                    <button
                      disabled
                      className="flex-1 bg-gray-300 text-gray-600 py-4 px-6 rounded-lg font-bold cursor-not-allowed"
                    >
                      満員のため受付終了
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(selectedEvent)}
                      className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Check className="h-5 w-5" />
                      <span>このイベントに申し込む / Apply</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="bg-gray-200 text-gray-700 py-4 px-6 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
