import React from 'react';
import { Calendar, Clock, MapPin, User, DollarSign, ArrowLeft, Check } from 'lucide-react';
import { MemberHeader } from '../components/Layout/MemberHeader';

interface LessonDetails {
  id: string;
  name: string;
  nameEn: string;
  date: string;
  dayOfWeek: string;
  time: string;
  duration: string;
  studio: string;
  room: string;
  instructor: string;
  instructorEn: string;
  level: string;
  price: number;
  points: number;
  capacity: number;
  remaining: number;
}

export const MemberLessonBookingConfirm: React.FC = () => {
  // ダミーデータ
  const lessonDetails: LessonDetails = {
    id: 'LESSON-001',
    name: 'ヒップホップ初級',
    nameEn: 'Hip Hop Beginner',
    date: '2024-12-15',
    dayOfWeek: '金曜日',
    time: '19:00',
    duration: '60分',
    studio: '渋谷スタジオ',
    room: 'スタジオA',
    instructor: '佐藤 健太',
    instructorEn: 'Kenta Sato',
    level: '初級',
    price: 3000,
    points: 100,
    capacity: 20,
    remaining: 5
  };

  const memberInfo = {
    name: '田中 花子',
    availablePoints: 1250,
    paymentMethod: 'クレジットカード ****1234'
  };

  const handleConfirm = () => {
    // 予約確定処理
    console.log('Booking confirmed', lessonDetails);
    // MemberLessonBookingCompleteへ遷移
  };

  const handleBack = () => {
    // 前の画面に戻る
    console.log('Going back');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberHeader
        memberName={memberInfo.name}
        onPageChange={(page) => console.log('Navigate to:', page)}
      />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* フェーズバッジ */}
        <div className="flex justify-end mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border-2 border-green-300">
            Phase 2
          </span>
        </div>

        {/* ページヘッダー */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>戻る / Back</span>
          </button>

          <h1 className="text-3xl font-bold text-gray-900">予約確認</h1>
          <p className="text-gray-600 mt-1">Booking Confirmation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* レッスン情報カード */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                レッスン情報
              </h2>

              <div className="space-y-4">
                {/* レッスン名 */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">{lessonDetails.name}</div>
                  <div className="text-gray-600">{lessonDetails.nameEn}</div>
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {lessonDetails.level}
                  </span>
                </div>

                {/* 日時 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">日付</div>
                      <div className="font-semibold text-gray-900">
                        {lessonDetails.date} ({lessonDetails.dayOfWeek})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">時間</div>
                      <div className="font-semibold text-gray-900">
                        {lessonDetails.time} ({lessonDetails.duration})
                      </div>
                    </div>
                  </div>
                </div>

                {/* スタジオ・インストラクター */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">スタジオ</div>
                      <div className="font-semibold text-gray-900">{lessonDetails.studio}</div>
                      <div className="text-sm text-gray-600">{lessonDetails.room}</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600">インストラクター</div>
                      <div className="font-semibold text-gray-900">{lessonDetails.instructor}</div>
                      <div className="text-sm text-gray-600">{lessonDetails.instructorEn}</div>
                    </div>
                  </div>
                </div>

                {/* 定員情報 */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-amber-800 font-medium">定員状況</div>
                      <div className="text-xs text-amber-600 mt-1">
                        {lessonDetails.capacity}名中 残り{lessonDetails.remaining}名
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-amber-700">
                      {lessonDetails.remaining}/{lessonDetails.capacity}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-amber-200 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${((lessonDetails.capacity - lessonDetails.remaining) / lessonDetails.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* キャンセルポリシー */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-bold text-red-900 mb-3">キャンセルポリシー</h3>
              <ul className="space-y-2 text-sm text-red-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>24時間前まで：無料でキャンセル可能</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>24時間以内：キャンセル料50%</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>当日キャンセル：キャンセル料100%</span>
                </li>
              </ul>
            </div>
          </div>

          {/* サイドバー - 料金情報と確認ボタン */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                料金詳細
              </h2>

              <div className="space-y-4">
                {/* 料金 */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">レッスン料金</span>
                  <span className="font-semibold text-gray-900">¥{lessonDetails.price.toLocaleString()}</span>
                </div>

                {/* 獲得ポイント */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600">獲得ポイント</span>
                  <span className="font-semibold text-green-600">+{lessonDetails.points}pt</span>
                </div>

                {/* 合計 */}
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-gray-900">合計</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ¥{lessonDetails.price.toLocaleString()}
                  </span>
                </div>

                {/* 支払い方法 */}
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <div className="text-sm text-gray-600 mb-1">支払い方法</div>
                  <div className="font-medium text-gray-900">{memberInfo.paymentMethod}</div>
                </div>

                {/* 利用可能ポイント */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-800 mb-1">利用可能ポイント</div>
                  <div className="font-bold text-blue-600">{memberInfo.availablePoints.toLocaleString()}pt</div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 underline mt-1">
                    ポイントを使用する
                  </button>
                </div>

                {/* 確認ボタン */}
                <button
                  onClick={handleConfirm}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 mt-6"
                >
                  <Check className="h-5 w-5" />
                  <span>予約を確定する / Confirm Booking</span>
                </button>

                {/* 戻るボタン */}
                <button
                  onClick={handleBack}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  戻る / Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
