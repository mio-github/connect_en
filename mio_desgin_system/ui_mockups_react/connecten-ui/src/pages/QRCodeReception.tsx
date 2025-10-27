import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  QrCode,
  Smartphone,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Activity,
  Shield,
  Wifi,
  Battery,
  RefreshCw,
  Settings,
  Download
} from 'lucide-react';

interface QRScanResult {
  id: string;
  studentName: string;
  studentId: string;
  membershipType: string;
  lessonName: string;
  time: string;
  status: 'valid' | 'invalid' | 'duplicate' | 'expired';
  scanTime: string;
}

interface SystemStatus {
  scannerActive: boolean;
  internetConnection: boolean;
  batteryLevel: number;
  lastSync: string;
  todayScans: number;
  queueLength: number;
}

const mockScanResults: QRScanResult[] = [
  {
    id: '1',
    studentName: '田中 花子',
    studentId: 'STU001',
    membershipType: '月謝会員',
    lessonName: 'バレエ基礎',
    time: '10:00',
    status: 'valid',
    scanTime: '09:58'
  },
  {
    id: '2',
    studentName: '佐藤 太郎',
    studentId: 'STU002',
    membershipType: 'ドロップイン',
    lessonName: 'バレエ基礎',
    time: '10:00',
    status: 'valid',
    scanTime: '10:05'
  },
  {
    id: '3',
    studentName: '鈴木 美咲',
    studentId: 'STU003',
    membershipType: '月謝会員',
    lessonName: 'バレエ基礎',
    time: '10:00',
    status: 'duplicate',
    scanTime: '10:12'
  }
];

const QRCodeReception: React.FC = () => {
  const [scanResults, setScanResults] = useState<QRScanResult[]>(mockScanResults);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    scannerActive: true,
    internetConnection: true,
    batteryLevel: 85,
    lastSync: '10:15',
    todayScans: 127,
    queueLength: 3
  });
  const [selectedLesson, setSelectedLesson] = useState('バレエ基礎 10:00');
  const [waitingQueue, setWaitingQueue] = useState(8);
  const [currentScan, setCurrentScan] = useState<string>('');

  // Simulate real-time scanning
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastSync: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: QRScanResult['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'invalid':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'duplicate':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'expired':
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: QRScanResult['status']) => {
    switch (status) {
      case 'valid':
        return '受付完了';
      case 'invalid':
        return '無効なQR';
      case 'duplicate':
        return '重複スキャン';
      case 'expired':
        return '期限切れ';
    }
  };

  const getStatusColor = (status: QRScanResult['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200';
      case 'invalid':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200';
      case 'duplicate':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200';
      case 'expired':
        return 'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8"
      >
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <QrCode className="h-10 w-10 text-teal-600" />
              QRコード受付システム
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              動的QRコード・リアルタイム出席管理
            </p>
          </div>
          <button className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 flex items-center gap-2 shadow-lg">
            <Settings className="h-5 w-5" />
            システム設定
          </button>
        </div>

        {/* System Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <Activity className={`h-6 w-6 ${systemStatus.scannerActive ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                systemStatus.scannerActive
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {systemStatus.scannerActive ? 'ACTIVE' : 'OFFLINE'}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">スキャナー</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {systemStatus.scannerActive ? '正常動作中' : 'オフライン'}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <Wifi className={`h-6 w-6 ${systemStatus.internetConnection ? 'text-blue-500' : 'text-red-500'}`} />
              <span className="text-sm text-gray-500 dark:text-gray-400">同期: {systemStatus.lastSync}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {systemStatus.internetConnection ? '接続中' : '切断'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">インターネット接続</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <Battery className={`h-6 w-6 ${systemStatus.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} />
              <span className="text-sm text-gray-500 dark:text-gray-400">{systemStatus.batteryLevel}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">バッテリー</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">デバイス状態</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <Users className="h-6 w-6 text-purple-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">本日</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{systemStatus.todayScans}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">受付完了数</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Scanner Interface */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-teal-600" />
            リアルタイムスキャン
          </h2>

          {/* Scanner Viewport */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6 relative overflow-hidden">
            <div className="aspect-square bg-gray-800 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center relative">
              <QrCode className="h-16 w-16 text-gray-400" />

              {/* Scanning Animation */}
              <motion.div
                className="absolute inset-0 border-2 border-teal-500"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Scanning Line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-teal-500 shadow-lg shadow-teal-500/50"
                animate={{
                  top: ["10%", "90%", "10%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <p className="text-center text-gray-400 mt-4">
              QRコードをスキャンエリアに表示してください
            </p>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <button className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-xl hover:bg-teal-700 flex items-center justify-center gap-2">
                <RefreshCw className="h-5 w-5" />
                スキャナー再起動
              </button>
              <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center gap-2">
                <Shield className="h-5 w-5" />
                セキュリティ確認
              </button>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
              <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">高負荷時の注意</span>
              </div>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                発表会前後など大人数が同時にアクセスする場合は、待機システムが自動的に作動します。
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recent Scan Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-teal-600" />
              受付履歴
            </h2>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center gap-1">
              <Download className="h-4 w-4" />
              エクスポート
            </button>
          </div>

          <div className="space-y-4">
            {scanResults.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border rounded-xl p-4 ${getStatusColor(result.status)}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {result.studentName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ID: {result.studentId} | {result.membershipType}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="text-sm font-medium">
                      {getStatusLabel(result.status)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {result.lessonName} ({result.time})
                  </span>
                  <span className="text-gray-500 dark:text-gray-500">
                    スキャン: {result.scanTime}
                  </span>
                </div>

                {result.status === 'duplicate' && (
                  <div className="mt-3 pt-3 border-t border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      ⚠️ 重複検出: この生徒は既に受付済みです
                    </p>
                  </div>
                )}

                {result.status === 'invalid' && (
                  <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      ❌ 無効なQRコード: 使い回しまたは偽造の可能性
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Queue Status */}
          <div className="mt-6 pt-6 border-t dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-blue-800 dark:text-blue-200">受付待ち</span>
                <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {waitingQueue}名
                </span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                予想待ち時間: 約{Math.ceil(waitingQueue / 2)}分
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Security Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="h-6 w-6 text-teal-600" />
          セキュリティ機能
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">動的QRコード</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              毎回異なるユニークなQRコードを生成し、使い回しを完全に防止
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">不正利用防止</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              リアルタイム認証と重複チェックで、なりすましや不正アクセスを防止
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">高負荷対応</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              最大1000人/時間の同時アクセスに対応した待機システム
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QRCodeReception;