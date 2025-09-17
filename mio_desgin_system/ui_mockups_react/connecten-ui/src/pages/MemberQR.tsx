import React, { useState } from 'react';
import { QrCode, Smartphone, Clock, CheckCircle, RefreshCw, Share } from 'lucide-react';

export const MemberQR: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [qrExpiry, setQrExpiry] = useState(300); // 5分 = 300秒

  const memberInfo = {
    name: '田中 花子',
    memberId: 'EN-2024-001234',
    membershipType: 'プレミアム会員',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9ImJsYWNrIi8+PC9zdmc+'
  };

  const handleRefreshQR = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setQrExpiry(300); // リセット
    }, 1000);
  };

  // カウントダウンタイマー（実際の実装では useEffect を使用）
  React.useEffect(() => {
    const timer = setInterval(() => {
      setQrExpiry(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* ページヘッダー */}
      <div className="bg-indigo-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">マイQR</h1>
        <p className="text-indigo-100">My QR Code for Check-in</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QRコード表示 */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center space-y-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">チェックイン用QRコード</h2>
            
            {/* QRコード */}
            <div className="relative inline-block">
              <div className="bg-white border-4 border-gray-200 rounded-2xl p-4 shadow-inner">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  {/* 実際のQRコードをここに表示 */}
                  <div className="w-40 h-40 bg-purple-600 rounded-lg flex items-center justify-center">
                    <QrCode className="h-20 w-20 text-white" />
                  </div>
                </div>
              </div>
              
              {/* 有効期限表示 */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium ${
                qrExpiry > 60 ? 'bg-green-100 text-green-800' : 
                qrExpiry > 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                <Clock className="h-4 w-4 inline mr-1" />
                {formatTime(qrExpiry)}
              </div>
            </div>

            {/* 会員情報 */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="font-semibold text-gray-900">{memberInfo.name}</div>
              <div className="text-sm text-gray-600">会員番号: {memberInfo.memberId}</div>
              <div className="text-sm text-purple-600 font-medium">{memberInfo.membershipType}</div>
            </div>

            {/* 更新ボタン */}
            <button
              onClick={handleRefreshQR}
              disabled={isRefreshing}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2 mx-auto"
            >
              {isRefreshing ? (
                <RefreshCw className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
              <span>QRコード更新</span>
            </button>
          </div>
        </div>

        {/* 使用方法とお知らせ */}
        <div className="space-y-6">
          {/* 使用方法 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Smartphone className="h-5 w-5 mr-2 text-purple-600" />
              使用方法
            </h3>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">1</div>
                <div>
                  <div className="font-medium">受付でQRコードを提示</div>
                  <div className="text-gray-500">スタッフがスキャンします</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">2</div>
                <div>
                  <div className="font-medium">自動チェックイン完了</div>
                  <div className="text-gray-500">ポイントが自動加算されます</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs">3</div>
                <div>
                  <div className="font-medium">レッスン開始</div>
                  <div className="text-gray-500">楽しいレッスンをお過ごしください</div>
                </div>
              </div>
            </div>
          </div>

          {/* お知らせ・注意事項 */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              重要なお知らせ
            </h3>
            <div className="space-y-3 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <div>QRコードは5分ごとに自動更新されます</div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <div>レッスン開始15分前から使用可能です</div>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
                <div>スクリーンショットでも利用できます</div>
              </div>
            </div>
          </div>

          {/* 共有機能 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Share className="h-5 w-5 mr-2 text-purple-600" />
              家族と共有
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              ご家族の方がお子様の送迎で使用する場合
            </p>
            <button className="w-full bg-purple-100 text-purple-700 py-3 rounded-lg hover:bg-purple-200 transition-colors">
              家族用QRコードを生成
            </button>
          </div>

          {/* チェックイン履歴 */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">最近のチェックイン</h3>
            <div className="space-y-3">
              {[
                { date: '2024-11-28', lesson: 'ヒップホップ初級', time: '19:00', points: '+100pt' },
                { date: '2024-11-25', lesson: 'ジャズダンス中級', time: '20:15', points: '+120pt' },
                { date: '2024-11-22', lesson: 'オンラインバレエ', time: '18:30', points: '+80pt' }
              ].map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium text-gray-900">{entry.lesson}</div>
                    <div className="text-gray-500">{entry.date} {entry.time}</div>
                  </div>
                  <div className="text-green-600 font-medium">{entry.points}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};