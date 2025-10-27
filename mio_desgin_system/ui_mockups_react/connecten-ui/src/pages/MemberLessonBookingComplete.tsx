import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, User, QrCode, Home, Mail } from 'lucide-react';
import { MemberHeader } from '../components/Layout/MemberHeader';

interface BookingDetails {
  bookingId: string;
  lessonName: string;
  lessonNameEn: string;
  date: string;
  dayOfWeek: string;
  time: string;
  duration: string;
  studio: string;
  room: string;
  instructor: string;
  instructorEn: string;
  price: number;
  earnedPoints: number;
}

export const MemberLessonBookingComplete: React.FC = () => {
  // ダミーデータ
  const bookingDetails: BookingDetails = {
    bookingId: 'BK-20241027-0001',
    lessonName: 'ヒップホップ初級',
    lessonNameEn: 'Hip Hop Beginner',
    date: '2024-12-15',
    dayOfWeek: '金曜日',
    time: '19:00',
    duration: '60分',
    studio: '渋谷スタジオ',
    room: 'スタジオA',
    instructor: '佐藤 健太',
    instructorEn: 'Kenta Sato',
    price: 3000,
    earnedPoints: 100
  };

  const memberInfo = {
    name: '田中 花子',
    email: 'hanako.tanaka@example.com'
  };

  // QRコード用のダミーデータ（実際はAPIから取得）
  const qrCodeData = `BOOKING:${bookingDetails.bookingId}`;

  const handleGoToMyPage = () => {
    console.log('Navigate to My Page');
  };

  const handleViewReservations = () => {
    console.log('Navigate to Reservations');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberHeader
        memberName={memberInfo.name}
        onPageChange={(page) => console.log('Navigate to:', page)}
      />

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* 成功メッセージ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            予約が完了しました
          </h1>
          <p className="text-gray-600">
            Booking Completed Successfully
          </p>
        </div>

        {/* 予約詳細カード */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">予約番号 / Booking ID</div>
                <div className="text-lg font-bold text-purple-600">{bookingDetails.bookingId}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">予約日時</div>
                <div className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString('ja-JP')} {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>

          {/* レッスン情報 */}
          <div className="space-y-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">{bookingDetails.lessonName}</div>
              <div className="text-gray-600">{bookingDetails.lessonNameEn}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-1">日付</div>
                  <div className="font-semibold text-gray-900">
                    {bookingDetails.date}
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingDetails.dayOfWeek}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-1">時間</div>
                  <div className="font-semibold text-gray-900">
                    {bookingDetails.time}
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingDetails.duration}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-1">スタジオ</div>
                  <div className="font-semibold text-gray-900">
                    {bookingDetails.studio}
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingDetails.room}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-600 mb-1">インストラクター</div>
                  <div className="font-semibold text-gray-900">
                    {bookingDetails.instructor}
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingDetails.instructorEn}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 料金とポイント */}
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">お支払い金額</span>
              <span className="text-lg font-bold text-gray-900">¥{bookingDetails.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">獲得ポイント</span>
              <span className="text-lg font-bold text-green-600">+{bookingDetails.earnedPoints}pt</span>
            </div>
          </div>
        </div>

        {/* QRコード */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <QrCode className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">受付用QRコード</h2>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              当日、受付でこのQRコードをご提示ください
            </p>

            {/* QRコード表示エリア（ダミー） */}
            <div className="flex justify-center mb-4">
              <div className="bg-white border-4 border-purple-600 p-4 rounded-2xl inline-block">
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg">
                  <div className="text-center text-gray-500">
                    <QrCode className="h-16 w-16 mx-auto mb-2" />
                    <div className="text-xs">QR Code</div>
                    <div className="text-xs font-mono mt-2">{bookingDetails.bookingId}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-sm text-purple-900">
              <p className="font-medium mb-1">💡 ご利用方法</p>
              <p className="text-purple-700">
                レッスン開始15分前から受付可能です。スタジオ受付にてこのQRコードをスキャンしてください。
              </p>
            </div>
          </div>
        </div>

        {/* 確認メール送信通知 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-3">
            <Mail className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">予約確認メールを送信しました</h3>
              <p className="text-sm text-blue-800">
                {memberInfo.email} に予約確認メールを送信しました。
                <br />
                メールが届かない場合は、迷惑メールフォルダをご確認ください。
              </p>
            </div>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-amber-900 mb-3">ご注意事項</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>レッスン開始15分前までにご来店ください</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>動きやすい服装でお越しください</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>キャンセルは24時間前まで無料です</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>飲み物をご持参いただくことをお勧めします</span>
            </li>
          </ul>
        </div>

        {/* アクションボタン */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleGoToMyPage}
            className="bg-purple-600 text-white py-4 px-6 rounded-lg font-bold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="h-5 w-5" />
            <span>マイページへ / My Page</span>
          </button>

          <button
            onClick={handleViewReservations}
            className="bg-white border-2 border-purple-300 text-purple-700 py-4 px-6 rounded-lg font-bold hover:bg-purple-50 hover:border-purple-400 transition-colors flex items-center justify-center space-x-2"
          >
            <Calendar className="h-5 w-5" />
            <span>予約一覧 / Reservations</span>
          </button>
        </div>
      </main>
    </div>
  );
};
