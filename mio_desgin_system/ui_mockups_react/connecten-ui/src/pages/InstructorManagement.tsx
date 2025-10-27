import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  DollarSign,
  Star,
  Clock,
  Award,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  Activity,
  Home,
  Key,
  CreditCard
} from 'lucide-react';

interface Instructor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  rating: number;
  totalLessons: number;
  activeStudents: number;
  monthlyRevenue: number;
  schedule: Schedule[];
  studioAccess: StudioAccess;
  paymentInfo: PaymentInfo;
  status: 'active' | 'inactive' | 'vacation';
}

interface Schedule {
  dayOfWeek: string;
  time: string;
  lessonName: string;
  studio: string;
}

interface StudioAccess {
  hasKeyCard: boolean;
  accessLevel: 'full' | 'limited' | 'scheduled';
  discountRate: number;
  freeHours: number;
}

interface PaymentInfo {
  baseSalary: number;
  perLessonRate: number;
  bonusEligible: boolean;
  lastPayment: string;
  nextPayment: string;
}

const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: '山田 陽子',
    email: 'yamada@example.com',
    phone: '090-1234-5678',
    specialties: ['バレエ', 'コンテンポラリー'],
    rating: 4.8,
    totalLessons: 156,
    activeStudents: 45,
    monthlyRevenue: 450000,
    schedule: [
      { dayOfWeek: '月', time: '10:00-11:30', lessonName: 'バレエ基礎', studio: '渋谷スタジオA' },
      { dayOfWeek: '水', time: '14:00-15:30', lessonName: 'バレエ中級', studio: '渋谷スタジオB' },
      { dayOfWeek: '金', time: '18:00-19:30', lessonName: 'コンテンポラリー', studio: '横浜スタジオ' }
    ],
    studioAccess: {
      hasKeyCard: true,
      accessLevel: 'full',
      discountRate: 50,
      freeHours: 10
    },
    paymentInfo: {
      baseSalary: 200000,
      perLessonRate: 5000,
      bonusEligible: true,
      lastPayment: '2024-12-25',
      nextPayment: '2024-01-25'
    },
    status: 'active'
  },
  {
    id: '2',
    name: '佐々木 健太',
    email: 'sasaki@example.com',
    phone: '090-2345-6789',
    specialties: ['ヒップホップ', 'ブレイクダンス'],
    rating: 4.9,
    totalLessons: 203,
    activeStudents: 62,
    monthlyRevenue: 580000,
    schedule: [
      { dayOfWeek: '火', time: '16:00-17:30', lessonName: 'キッズヒップホップ', studio: '渋谷スタジオA' },
      { dayOfWeek: '木', time: '19:00-20:30', lessonName: 'ヒップホップ上級', studio: '渋谷スタジオA' },
      { dayOfWeek: '土', time: '13:00-14:30', lessonName: 'ブレイクダンス', studio: '横浜スタジオ' }
    ],
    studioAccess: {
      hasKeyCard: true,
      accessLevel: 'full',
      discountRate: 70,
      freeHours: 15
    },
    paymentInfo: {
      baseSalary: 250000,
      perLessonRate: 6000,
      bonusEligible: true,
      lastPayment: '2024-12-25',
      nextPayment: '2024-01-25'
    },
    status: 'active'
  }
];

const InstructorManagement: React.FC = () => {
  const [instructors, setInstructors] = useState<Instructor[]>(mockInstructors);
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'schedule' | 'payments'>('list');

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEditInstructor = (instructor: Instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const totalInstructors = instructors.length;
  const activeInstructors = instructors.filter(i => i.status === 'active').length;
  const totalMonthlyRevenue = instructors.reduce((sum, i) => sum + i.monthlyRevenue, 0);
  const averageRating = instructors.reduce((sum, i) => sum + i.rating, 0) / instructors.length;

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
              <Users className="h-8 w-8 text-purple-500" />
              講師管理
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              講師情報・スケジュール・報酬管理
            </p>
          </div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新規講師登録
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">総数</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalInstructors}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              アクティブ: {activeInstructors}名
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">評価</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {averageRating.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">平均評価</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">レッスン</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {instructors.reduce((sum, i) => sum + i.schedule.length, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">週間レッスン数</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">月間</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ¥{totalMonthlyRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">総報酬額</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mt-6">
          {(['list', 'schedule', 'payments'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab === 'list' && '講師一覧'}
              {tab === 'schedule' && 'スケジュール管理'}
              {tab === 'payments' && '報酬管理'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Instructor List Tab */}
      {activeTab === 'list' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="講師名・専門分野で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {instructor.name}
                        </h3>
                        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {instructor.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {instructor.phone}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {instructor.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">評価</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {instructor.rating}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">受講生</p>
                          <p className="font-medium text-gray-900 dark:text-white mt-1">
                            {instructor.activeStudents}名
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">レッスン</p>
                          <p className="font-medium text-gray-900 dark:text-white mt-1">
                            週{instructor.schedule.length}回
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">月収</p>
                          <p className="font-medium text-gray-900 dark:text-white mt-1">
                            ¥{instructor.monthlyRevenue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditInstructor(instructor)}
                      className="p-2 text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Studio Access Info */}
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    スタジオ利用権限
                  </h4>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Key className={`h-4 w-4 ${instructor.studioAccess.hasKeyCard ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className="text-gray-600 dark:text-gray-400">
                        {instructor.studioAccess.hasKeyCard ? 'キーカード有' : 'キーカード無'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-purple-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {instructor.studioAccess.accessLevel === 'full' ? '24時間利用可' : '時間制限あり'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {instructor.studioAccess.discountRate}%割引
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        月{instructor.studioAccess.freeHours}時間無料
                      </span>
                    </div>
                  </div>
                </div>

                {/* Schedule Preview */}
                <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    今週のスケジュール
                  </h4>
                  <div className="space-y-2">
                    {instructor.schedule.slice(0, 3).map((schedule, index) => (
                      <div key={index} className="flex items-center gap-4 text-sm">
                        <span className="w-12 font-medium text-gray-700 dark:text-gray-300">
                          {schedule.dayOfWeek}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {schedule.time}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {schedule.lessonName}
                        </span>
                        <span className="text-gray-500 dark:text-gray-500">
                          @{schedule.studio}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              講師報酬管理
            </h2>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2">
              <Download className="h-4 w-4" />
              報酬明細エクスポート
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    講師名
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    基本給
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    レッスン単価
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    今月レッスン数
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    今月支払予定
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    次回支払日
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-gray-700">
                {instructors.map((instructor) => {
                  const monthlyLessons = instructor.schedule.length * 4;
                  const lessonPay = monthlyLessons * instructor.paymentInfo.perLessonRate;
                  const totalPay = instructor.paymentInfo.baseSalary + lessonPay;

                  return (
                    <tr key={instructor.id}>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {instructor.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {instructor.specialties.join(', ')}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        ¥{instructor.paymentInfo.baseSalary.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        ¥{instructor.paymentInfo.perLessonRate.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        {monthlyLessons}回
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          ¥{totalPay.toLocaleString()}
                        </p>
                        {instructor.paymentInfo.bonusEligible && (
                          <span className="text-xs text-green-600 dark:text-green-400">
                            ボーナス対象
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        {instructor.paymentInfo.nextPayment}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          詳細
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default InstructorManagement;