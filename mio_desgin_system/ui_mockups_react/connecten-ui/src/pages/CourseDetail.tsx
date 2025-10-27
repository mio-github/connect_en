import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';

interface CourseInfo {
  id: string;
  name: string;
  category: string;
  level: string;
  instructor: string;
  instructorBio: string;
  schedule: string;
  duration: number;
  price: number;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
  studio: string;
  requirements: string[];
  whatYouLearn: string[];
}

interface LessonSchedule {
  id: string;
  date: string;
  time: string;
  topic: string;
  attendance: number;
  status: 'completed' | 'upcoming' | 'cancelled';
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  enrollDate: string;
  attendanceRate: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

const mockCourseInfo: CourseInfo = {
  id: '1',
  name: 'ヒップホップ初級',
  category: 'ヒップホップ',
  level: '初級',
  instructor: '佐藤健太',
  instructorBio: '国内外のダンスコンテストで数々の受賞歴を持つプロダンサー。初心者にも分かりやすい指導に定評があります。',
  schedule: '毎週月・水 19:00-20:30',
  duration: 90,
  price: 8000,
  capacity: 20,
  enrolled: 18,
  startDate: '2025-11-01',
  endDate: '2026-01-31',
  status: 'active',
  description: 'ヒップホップダンスの基礎から丁寧に指導します。リズムの取り方、基本ステップ、アイソレーションなど、ダンスの楽しさを体感しながら学べます。',
  studio: 'Studio A',
  requirements: [
    '運動できる服装',
    '室内用シューズ',
    'タオル・飲み物'
  ],
  whatYouLearn: [
    'ヒップホップの基本リズム',
    '基礎ステップ（ランニングマン、ロジャーラビットなど）',
    'アイソレーション技術',
    '簡単な振付',
    '身体の使い方とバランス'
  ]
};

const mockLessonSchedule: LessonSchedule[] = [
  {
    id: '1',
    date: '2025-11-01',
    time: '19:00-20:30',
    topic: 'オリエンテーション＆基礎リズム',
    attendance: 18,
    status: 'upcoming'
  },
  {
    id: '2',
    date: '2025-11-04',
    time: '19:00-20:30',
    topic: '基本ステップ①（ランニングマン）',
    attendance: 17,
    status: 'upcoming'
  },
  {
    id: '3',
    date: '2025-11-08',
    time: '19:00-20:30',
    topic: '基本ステップ②（ロジャーラビット）',
    attendance: 0,
    status: 'upcoming'
  },
  {
    id: '4',
    date: '2025-11-11',
    time: '19:00-20:30',
    topic: 'アイソレーション基礎',
    attendance: 0,
    status: 'upcoming'
  }
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: '田中花子',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    enrollDate: '2025-10-15',
    attendanceRate: 95,
    paymentStatus: 'paid'
  },
  {
    id: '2',
    name: '佐藤太郎',
    email: 'sato@example.com',
    phone: '080-9876-5432',
    enrollDate: '2025-10-18',
    attendanceRate: 88,
    paymentStatus: 'paid'
  },
  {
    id: '3',
    name: '鈴木美咲',
    email: 'suzuki@example.com',
    phone: '070-1111-2222',
    enrollDate: '2025-10-20',
    attendanceRate: 92,
    paymentStatus: 'pending'
  },
  {
    id: '4',
    name: '高橋健一',
    email: 'takahashi@example.com',
    phone: '090-3333-4444',
    enrollDate: '2025-10-22',
    attendanceRate: 75,
    paymentStatus: 'overdue'
  }
];

export const CourseDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'students'>('overview');
  const [courseInfo] = useState<CourseInfo>(mockCourseInfo);
  const [lessonSchedule] = useState<LessonSchedule[]>(mockLessonSchedule);
  const [students] = useState<Student[]>(mockStudents);

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      'paid': { label: '支払済', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'pending': { label: '保留中', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
      'overdue': { label: '滞納', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['paid'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getLessonStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { label: '完了', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'upcoming': { label: '予定', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      'cancelled': { label: 'キャンセル', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['upcoming'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const capacityPercentage = (courseInfo.enrolled / courseInfo.capacity) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <i className="fas fa-arrow-left" />
            コース一覧に戻る
          </Button>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">
            {courseInfo.name}
          </h1>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold rounded-full">
            Phase 2
          </span>
        </div>
        <p className="text-neutral-500 dark:text-gray-400">
          {courseInfo.description}
        </p>
      </motion.div>

      {/* Course Summary */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-user text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">講師</span>
            </div>
            <p className="text-lg font-bold text-neutral-800 dark:text-white">
              {courseInfo.instructor}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-clock text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">スケジュール</span>
            </div>
            <p className="text-lg font-bold text-neutral-800 dark:text-white">
              {courseInfo.schedule}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-yen-sign text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">月額料金</span>
            </div>
            <p className="text-lg font-bold text-neutral-800 dark:text-white">
              ¥{courseInfo.price.toLocaleString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-users text-primary-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">受講者数</span>
            </div>
            <p className="text-lg font-bold text-neutral-800 dark:text-white">
              {courseInfo.enrolled} / {courseInfo.capacity}名
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  capacityPercentage >= 100
                    ? 'bg-red-500'
                    : capacityPercentage >= 80
                    ? 'bg-amber-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(capacityPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Button variant="primary">
          <i className="fas fa-edit" />
          コース編集
        </Button>
        <Button variant="secondary">
          <i className="fas fa-user-plus" />
          受講者追加
        </Button>
        <Button variant="secondary">
          <i className="fas fa-download" />
          データ出力
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-info-circle mr-2" />
              概要
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'schedule'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-calendar mr-2" />
              レッスンスケジュール
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'students'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-users mr-2" />
              申込者一覧
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                  コース詳細
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">カテゴリ</p>
                    <p className="font-medium text-neutral-800 dark:text-white">{courseInfo.category}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">レベル</p>
                    <p className="font-medium text-neutral-800 dark:text-white">{courseInfo.level}</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">開講期間</p>
                    <p className="font-medium text-neutral-800 dark:text-white">
                      {courseInfo.startDate} ~ {courseInfo.endDate}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">スタジオ</p>
                    <p className="font-medium text-neutral-800 dark:text-white">{courseInfo.studio}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                  講師について
                </h3>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <p className="font-medium text-neutral-800 dark:text-white mb-2">
                    {courseInfo.instructor}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {courseInfo.instructorBio}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                  学べること
                </h3>
                <ul className="space-y-2">
                  {courseInfo.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-3">
                  持ち物・服装
                </h3>
                <ul className="space-y-2">
                  {courseInfo.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className="fas fa-circle text-primary-500 text-xs mt-2" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      日時
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      時間
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      レッスン内容
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      出席者
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {lessonSchedule.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {lesson.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {lesson.time}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {lesson.topic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {lesson.attendance > 0 ? `${lesson.attendance}名` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getLessonStatusBadge(lesson.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      氏名
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      連絡先
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      入会日
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      出席率
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      支払状況
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                        <div>{student.email}</div>
                        <div className="text-xs text-gray-500">{student.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {student.enrollDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            student.attendanceRate >= 90
                              ? 'text-green-600 dark:text-green-400'
                              : student.attendanceRate >= 70
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {student.attendanceRate}%
                          </span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                student.attendanceRate >= 90
                                  ? 'bg-green-500'
                                  : student.attendanceRate >= 70
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${student.attendanceRate}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPaymentStatusBadge(student.paymentStatus)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
