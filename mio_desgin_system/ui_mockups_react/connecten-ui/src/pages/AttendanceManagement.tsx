import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCheck,
  UserX,
  Clock,
  Calendar,
  Download,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  BarChart3,
  Activity
} from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  lessonId: string;
  lessonName: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: string;
  note?: string;
}

interface Student {
  id: string;
  name: string;
  attendanceRate: number;
  totalClasses: number;
  attendedClasses: number;
  recentStatus: 'improving' | 'declining' | 'stable';
}

interface Lesson {
  id: string;
  name: string;
  instructor: string;
  time: string;
  date: string;
  enrolled: number;
  attended: number;
}

const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: 's1',
    studentName: '田中 花子',
    lessonId: 'l1',
    lessonName: 'バレエ基礎',
    date: '2024-01-22',
    time: '10:00',
    status: 'present',
    checkInTime: '09:55'
  },
  {
    id: '2',
    studentId: 's2',
    studentName: '佐藤 太郎',
    lessonId: 'l1',
    lessonName: 'バレエ基礎',
    date: '2024-01-22',
    time: '10:00',
    status: 'late',
    checkInTime: '10:15',
    note: '電車遅延のため'
  },
  {
    id: '3',
    studentId: 's3',
    studentName: '鈴木 美咲',
    lessonId: 'l1',
    lessonName: 'バレエ基礎',
    date: '2024-01-22',
    time: '10:00',
    status: 'absent',
    note: '体調不良'
  }
];

const mockStudents: Student[] = [
  { id: 's1', name: '田中 花子', attendanceRate: 95, totalClasses: 40, attendedClasses: 38, recentStatus: 'stable' },
  { id: 's2', name: '佐藤 太郎', attendanceRate: 75, totalClasses: 40, attendedClasses: 30, recentStatus: 'declining' },
  { id: 's3', name: '鈴木 美咲', attendanceRate: 60, totalClasses: 40, attendedClasses: 24, recentStatus: 'declining' },
  { id: 's4', name: '高橋 健一', attendanceRate: 90, totalClasses: 40, attendedClasses: 36, recentStatus: 'improving' }
];

const todayLessons: Lesson[] = [
  { id: 'l1', name: 'バレエ基礎', instructor: '山田先生', time: '10:00', date: '2024-01-22', enrolled: 15, attended: 12 },
  { id: 'l2', name: 'ヒップホップ中級', instructor: '佐々木先生', time: '14:00', date: '2024-01-22', enrolled: 20, attended: 18 },
  { id: 'l3', name: 'ジャズダンス', instructor: '田中先生', time: '16:00', date: '2024-01-22', enrolled: 12, attended: 0 },
  { id: 'l4', name: 'キッズダンス', instructor: '鈴木先生', time: '17:00', date: '2024-01-22', enrolled: 25, attended: 0 }
];

const AttendanceManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(todayLessons[0]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'check-in' | 'history' | 'analytics'>('check-in');

  const handleStatusChange = (recordId: string, newStatus: AttendanceRecord['status']) => {
    setAttendanceRecords(prev =>
      prev.map(record =>
        record.id === recordId ? { ...record, status: newStatus, checkInTime: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) } : record
      )
    );
  };

  const handleQuickCheckIn = (studentId: string, studentName: string) => {
    if (!selectedLesson) return;

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      studentId,
      studentName,
      lessonId: selectedLesson.id,
      lessonName: selectedLesson.name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: selectedLesson.time,
      status: 'present',
      checkInTime: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })
    };

    setAttendanceRecords(prev => [...prev, newRecord]);
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'late':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'excused':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusLabel = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return '出席';
      case 'absent':
        return '欠席';
      case 'late':
        return '遅刻';
      case 'excused':
        return '公欠';
    }
  };

  const lowAttendanceStudents = mockStudents.filter(s => s.attendanceRate < 70);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <UserCheck className="h-8 w-8 text-purple-500" />
              出席管理
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              リアルタイム出席確認・出席率分析
            </p>
          </div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2">
            <Download className="h-4 w-4" />
            出席データエクスポート
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {(['check-in', 'history', 'analytics'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'check-in' && 'リアルタイム受付'}
              {tab === 'history' && '出席履歴'}
              {tab === 'analytics' && '出席分析'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Real-time Check-in Tab */}
      {activeTab === 'check-in' && (
        <>
          {/* Today's Lessons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              本日のレッスン
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {todayLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setSelectedLesson(lesson)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedLesson?.id === lesson.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">{lesson.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lesson.time}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.instructor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {lesson.attended}/{lesson.enrolled}名
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Current Lesson Attendance */}
          {selectedLesson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedLesson.name} - 出席確認
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="生徒を検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">生徒名</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">ステータス</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">チェックイン時刻</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">備考</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-700">
                    {attendanceRecords
                      .filter(record => record.lessonId === selectedLesson.id)
                      .map((record) => (
                        <tr key={record.id}>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-900 dark:text-white">{record.studentName}</p>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(record.status)}
                              <span className="text-sm text-gray-700 dark:text-gray-300">
                                {getStatusLabel(record.status)}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {record.checkInTime || '-'}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {record.note || '-'}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleStatusChange(record.id, 'present')}
                                className="text-green-600 hover:text-green-700 p-1"
                                title="出席"
                              >
                                <CheckCircle className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(record.id, 'late')}
                                className="text-yellow-600 hover:text-yellow-700 p-1"
                                title="遅刻"
                              >
                                <Clock className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleStatusChange(record.id, 'absent')}
                                className="text-red-600 hover:text-red-700 p-1"
                                title="欠席"
                              >
                                <XCircle className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Activity className="h-8 w-8 text-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">今月</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">85.2%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">平均出席率</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">+2.5% 前月比</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">要注意</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowAttendanceStudents.length}名</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">出席率70%未満</p>
              <button className="text-sm text-purple-600 hover:text-purple-700 mt-2">詳細を見る →</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="h-8 w-8 text-purple-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">今週</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">324回</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">総出席数</p>
              <p className="text-sm text-gray-500 mt-2">平均: 46.3回/日</p>
            </motion.div>
          </div>

          {/* Low Attendance Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              出席率低下アラート
            </h2>
            <div className="space-y-4">
              {lowAttendanceStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-yellow-100 dark:bg-yellow-800/50 rounded-full flex items-center justify-center">
                      <UserX className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        出席率: {student.attendanceRate}% ({student.attendedClasses}/{student.totalClasses}回)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {student.recentStatus === 'declining' && (
                      <span className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 rotate-180" />
                        低下傾向
                      </span>
                    )}
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                      詳細確認
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AttendanceManagement;