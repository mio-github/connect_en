import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';

interface Course {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  instructor: string;
  schedule: string;
  duration: number; // minutes
  price: number;
  capacity: number;
  enrolled: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'full' | 'upcoming' | 'ended';
  description: string;
  studio: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    name: 'ヒップホップ初級',
    category: 'ヒップホップ',
    level: 'beginner',
    instructor: '佐藤健太',
    schedule: '毎週月・水 19:00-20:30',
    duration: 90,
    price: 8000,
    capacity: 20,
    enrolled: 18,
    startDate: '2025-11-01',
    endDate: '2026-01-31',
    status: 'active',
    description: 'ヒップホップダンスの基礎から丁寧に指導します',
    studio: 'Studio A'
  },
  {
    id: '2',
    name: 'バレエ中級',
    category: 'バレエ',
    level: 'intermediate',
    instructor: '山田花子',
    schedule: '毎週火・木・土 10:00-11:30',
    duration: 90,
    price: 12000,
    capacity: 15,
    enrolled: 15,
    startDate: '2025-11-01',
    endDate: '2026-01-31',
    status: 'full',
    description: 'クラシックバレエの技術向上を目指します',
    studio: 'Studio B'
  },
  {
    id: '3',
    name: 'ジャズダンス上級',
    category: 'ジャズ',
    level: 'advanced',
    instructor: '高橋真一',
    schedule: '毎週金 20:00-21:30',
    duration: 90,
    price: 10000,
    capacity: 12,
    enrolled: 9,
    startDate: '2025-11-01',
    endDate: '2026-01-31',
    status: 'active',
    description: '舞台レベルのジャズダンステクニックを習得',
    studio: 'Studio A'
  },
  {
    id: '4',
    name: 'K-POP ダンス',
    category: 'K-POP',
    level: 'all-levels',
    instructor: '鈴木美咲',
    schedule: '毎週日 14:00-15:30',
    duration: 90,
    price: 9000,
    capacity: 25,
    enrolled: 22,
    startDate: '2025-11-01',
    endDate: '2026-01-31',
    status: 'active',
    description: '人気K-POPの振り付けを楽しく学びます',
    studio: 'Studio C'
  },
  {
    id: '5',
    name: 'キッズダンス',
    category: 'キッズ',
    level: 'beginner',
    instructor: '田中愛',
    schedule: '毎週土 15:00-16:00',
    duration: 60,
    price: 6000,
    capacity: 20,
    enrolled: 16,
    startDate: '2025-11-01',
    endDate: '2026-01-31',
    status: 'active',
    description: '小学生向けの楽しいダンスレッスン',
    studio: 'Studio B'
  },
  {
    id: '6',
    name: 'コンテンポラリー',
    category: 'コンテンポラリー',
    level: 'intermediate',
    instructor: '伊藤翔太',
    schedule: '毎週水 18:00-19:30',
    duration: 90,
    price: 11000,
    capacity: 15,
    enrolled: 0,
    startDate: '2025-12-01',
    endDate: '2026-02-28',
    status: 'upcoming',
    description: '表現力を重視した現代ダンス',
    studio: 'Studio A'
  }
];

export const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'enrolled'>('name');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(courses.map(c => c.category)));

  const filteredCourses = courses
    .filter(course => {
      const matchCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchLevel && matchSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return b.price - a.price;
        case 'enrolled':
          return b.enrolled - a.enrolled;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getLevelBadge = (level: string) => {
    const levelConfig = {
      'beginner': { label: '初級', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'intermediate': { label: '中級', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      'advanced': { label: '上級', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      'all-levels': { label: '全レベル', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
    };
    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig['all-levels'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { label: '募集中', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'full': { label: '満員', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      'upcoming': { label: '開講予定', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
      'ended': { label: '終了', className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['active'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getCapacityPercentage = (enrolled: number, capacity: number) => {
    return (enrolled / capacity) * 100;
  };

  const handleAddCourse = () => {
    console.log('Adding new course...');
  };

  const handleEditCourse = (courseId: string) => {
    console.log('Editing course:', courseId);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('このコースを削除しますか？')) {
      setCourses(prev => prev.filter(c => c.id !== courseId));
    }
  };

  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'active').length;
  const totalEnrolled = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const totalRevenue = courses.reduce((sum, c) => sum + (c.enrolled * c.price), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">コース一覧</h1>
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold rounded-full">
            Phase 2
          </span>
        </div>
        <p className="text-neutral-500 dark:text-gray-400">
          レッスンコースの管理・編集・新規作成を行えます
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <i className="fas fa-book text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">総コース数</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{totalCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <i className="fas fa-check-circle text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">募集中</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{activeCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <i className="fas fa-users text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">総受講者数</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{totalEnrolled}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
              <i className="fas fa-yen-sign text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">月間売上予測</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              検索
            </label>
            <input
              type="text"
              placeholder="コース名、講師名で検索"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              カテゴリ
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            >
              <option value="all">すべて</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              レベル
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            >
              <option value="all">すべて</option>
              <option value="beginner">初級</option>
              <option value="intermediate">中級</option>
              <option value="advanced">上級</option>
              <option value="all-levels">全レベル</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              並び順
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
            >
              <option value="name">名前順</option>
              <option value="price">価格順</option>
              <option value="enrolled">受講者数順</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="primary" onClick={handleAddCourse}>
            <i className="fas fa-plus" />
            新規コース作成
          </Button>
        </div>
      </motion.div>

      {/* Course Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {filteredCourses.map((course, index) => (
          <motion.div
            key={course.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
                  {course.name}
                </h3>
                {getStatusBadge(course.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <i className="fas fa-user w-5 text-gray-400" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <i className="fas fa-clock w-5 text-gray-400" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <i className="fas fa-map-marker-alt w-5 text-gray-400" />
                  <span>{course.studio}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <i className="fas fa-calendar w-5 text-gray-400" />
                  <span>{course.startDate} ~ {course.endDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {getLevelBadge(course.level)}
                <span className="text-xs text-gray-500 dark:text-gray-400">{course.category}</span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {course.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">受講者</span>
                  <span className="font-medium text-neutral-800 dark:text-white">
                    {course.enrolled} / {course.capacity}名
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      getCapacityPercentage(course.enrolled, course.capacity) >= 100
                        ? 'bg-red-500'
                        : getCapacityPercentage(course.enrolled, course.capacity) >= 80
                        ? 'bg-amber-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(getCapacityPercentage(course.enrolled, course.capacity), 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ¥{course.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/ 月</span>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => handleEditCourse(course.id)} fullWidth>
                  <i className="fas fa-edit" />
                  編集
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteCourse(course.id)} fullWidth>
                  <i className="fas fa-trash" />
                  削除
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-search text-gray-400 text-5xl mb-4" />
          <p className="text-gray-500 dark:text-gray-400">該当するコースが見つかりませんでした</p>
        </div>
      )}
    </div>
  );
};
