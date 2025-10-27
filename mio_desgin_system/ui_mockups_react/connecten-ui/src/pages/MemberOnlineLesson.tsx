import React, { useState } from 'react';
import { Video, Calendar, Clock, User, MonitorPlay, Volume2, Wifi, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { MemberHeader } from '../components/Layout/MemberHeader';

interface OnlineLesson {
  id: string;
  name: string;
  nameEn: string;
  instructor: string;
  instructorEn: string;
  date: string;
  time: string;
  duration: string;
  level: string;
  platform: string;
  meetingUrl: string;
  meetingId: string;
  password: string;
  status: 'upcoming' | 'live' | 'completed';
  thumbnail: string;
}

export const MemberOnlineLesson: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<OnlineLesson | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);

  const memberInfo = {
    name: '田中 花子'
  };

  // ダミーデータ
  const onlineLessons: OnlineLesson[] = [
    {
      id: 'OL-001',
      name: 'オンライン ヒップホップ入門',
      nameEn: 'Online Hip Hop Beginner',
      instructor: '佐藤 健太',
      instructorEn: 'Kenta Sato',
      date: '2024-12-01',
      time: '19:00',
      duration: '60分',
      level: '初級',
      platform: 'Zoom',
      meetingUrl: 'https://zoom.us/j/1234567890',
      meetingId: '123 456 7890',
      password: 'Dance2024',
      status: 'upcoming',
      thumbnail: ''
    },
    {
      id: 'OL-002',
      name: 'オンライン ジャズダンス',
      nameEn: 'Online Jazz Dance',
      instructor: '田中 美咲',
      instructorEn: 'Misaki Tanaka',
      date: '2024-11-30',
      time: '20:00',
      duration: '75分',
      level: '中級',
      platform: 'Google Meet',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      meetingId: 'abc-defg-hij',
      password: '',
      status: 'live',
      thumbnail: ''
    },
    {
      id: 'OL-003',
      name: 'オンライン バレエストレッチ',
      nameEn: 'Online Ballet Stretch',
      instructor: '山本 麗子',
      instructorEn: 'Reiko Yamamoto',
      date: '2024-11-25',
      time: '10:00',
      duration: '45分',
      level: '全レベル',
      platform: 'Zoom',
      meetingUrl: 'https://zoom.us/j/9876543210',
      meetingId: '987 654 3210',
      password: 'Stretch24',
      status: 'completed',
      thumbnail: ''
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">予約済み</span>;
      case 'live':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center">
          <span className="animate-pulse mr-1">●</span> ライブ配信中
        </span>;
      case 'completed':
        return <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">受講済み</span>;
      default:
        return null;
    }
  };

  const handleJoinLesson = (lesson: OnlineLesson) => {
    console.log('Joining lesson:', lesson);
    window.open(lesson.meetingUrl, '_blank');
  };

  const handleTestEnvironment = () => {
    setShowTestModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberHeader
        memberName={memberInfo.name}
        onPageChange={(page) => console.log('Navigate to:', page)}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* フェーズバッジ */}
        <div className="flex justify-end mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border-2 border-green-300">
            Phase 2
          </span>
        </div>

        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Video className="h-8 w-8 text-blue-600 mr-3" />
            オンラインレッスン
          </h1>
          <p className="text-gray-600 mt-2">Online Lessons</p>
        </div>

        {/* 環境テストボタン */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">初めてご利用の方へ</h3>
                <p className="text-sm text-blue-800">
                  オンラインレッスンに参加する前に、カメラ・マイク・インターネット接続をテストすることをお勧めします。
                </p>
              </div>
            </div>
            <button
              onClick={handleTestEnvironment}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <Wifi className="h-4 w-4" />
              <span>環境テスト</span>
            </button>
          </div>
        </div>

        {/* レッスン一覧 */}
        <div className="space-y-4">
          {onlineLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* レッスン情報 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{lesson.name}</h3>
                          {getStatusBadge(lesson.status)}
                        </div>
                        <p className="text-gray-600 text-sm">{lesson.nameEn}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{lesson.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{lesson.time} ({lesson.duration})</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{lesson.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MonitorPlay className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{lesson.platform}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {lesson.level}
                      </span>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex flex-col space-y-2 lg:w-48">
                    {lesson.status === 'live' && (
                      <button
                        onClick={() => handleJoinLesson(lesson)}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 animate-pulse"
                      >
                        <Video className="h-5 w-5" />
                        <span>参加する</span>
                      </button>
                    )}
                    {lesson.status === 'upcoming' && (
                      <button
                        onClick={() => setSelectedLesson(lesson)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span>詳細</span>
                      </button>
                    )}
                    {lesson.status === 'completed' && (
                      <button
                        disabled
                        className="bg-gray-300 text-gray-600 px-6 py-3 rounded-lg font-bold cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>受講済み</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 詳細モーダル */}
        {selectedLesson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLesson.name}</h2>
                <p className="text-gray-600">{selectedLesson.nameEn}</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">プラットフォーム</div>
                  <div className="font-semibold text-gray-900">{selectedLesson.platform}</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">ミーティングURL</div>
                  <div className="font-mono text-sm text-blue-600 break-all">{selectedLesson.meetingUrl}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">ミーティングID</div>
                    <div className="font-mono text-gray-900">{selectedLesson.meetingId}</div>
                  </div>

                  {selectedLesson.password && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">パスワード</div>
                      <div className="font-mono text-gray-900">{selectedLesson.password}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  参加方法
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                  <li>レッスン開始10分前からURLにアクセスできます</li>
                  <li>{selectedLesson.platform}アプリが起動します（未インストールの場合はダウンロードしてください）</li>
                  <li>ミーティングIDとパスワードを入力してください</li>
                  <li>カメラとマイクの許可を求められたら「許可」を選択してください</li>
                  <li>インストラクターの指示に従ってレッスンを受講してください</li>
                </ol>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleJoinLesson(selectedLesson)}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  <span>URLを開く</span>
                </button>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 環境テストモーダル */}
        {showTestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Wifi className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">環境テスト</h2>
                <p className="text-gray-600">視聴環境をチェックします</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">インターネット接続</span>
                  </div>
                  <span className="text-xs text-green-700">良好</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">カメラ</span>
                  </div>
                  <span className="text-xs text-green-700">利用可能</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Volume2 className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-900">マイク・スピーカー</span>
                  </div>
                  <span className="text-xs text-green-700">利用可能</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>✓ 準備完了</strong><br />
                  オンラインレッスンに参加できる環境が整っています。
                </p>
              </div>

              <button
                onClick={() => setShowTestModal(false)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
