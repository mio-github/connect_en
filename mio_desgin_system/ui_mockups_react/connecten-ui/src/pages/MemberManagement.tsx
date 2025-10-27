import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { MemberTable } from '../components/Members/MemberTable';
import { MemberForm } from '../components/Members/MemberForm';

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastVisit?: string;
}

const mockMembers: Member[] = [
  {
    id: '1',
    name: '田中花子',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    plan: 'プレミアム',
    status: 'active',
    joinDate: '2024-01-15',
    lastVisit: '2024-08-25'
  },
  {
    id: '2',
    name: '佐藤太郎',
    email: 'sato@example.com',
    phone: '080-9876-5432',
    plan: 'ベーシック',
    status: 'active',
    joinDate: '2024-02-20',
    lastVisit: '2024-08-20'
  },
  {
    id: '3',
    name: '鈴木美咲',
    email: 'suzuki@example.com',
    phone: '070-1111-2222',
    plan: 'VIP',
    status: 'suspended',
    joinDate: '2024-03-10',
    lastVisit: '2024-08-15'
  },
  {
    id: '4',
    name: '高橋健一',
    email: 'takahashi@example.com',
    phone: '090-3333-4444',
    plan: 'ベーシック',
    status: 'inactive',
    joinDate: '2024-04-05',
    lastVisit: '2024-07-30'
  },
  {
    id: '5',
    name: '伊藤さくら',
    email: 'ito@example.com',
    phone: '080-5555-6666',
    plan: 'プレミアム',
    status: 'active',
    joinDate: '2024-05-12',
    lastVisit: '2024-08-26'
  }
];

export const MemberManagement: React.FC = () => {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'form'>('list');

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleAddMember = () => {
    setSelectedMember(null);
    setViewMode('form');
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setViewMode('form');
  };

  const handleDeleteMember = (memberId: string) => {
    if (confirm('この会員を削除しますか？')) {
      setMembers(prev => prev.filter(member => member.id !== memberId));
    }
  };

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (selectedMember) {
      // Update existing member
      setMembers(prev => prev.map(member =>
        member.id === selectedMember.id
          ? { ...member, ...formData }
          : member
      ));
    } else {
      // Add new member
      const newMember: Member = {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setMembers(prev => [...prev, newMember]);
    }

    setIsLoading(false);
    setViewMode('list');
  };

  const handleFormCancel = () => {
    setSelectedMember(null);
    setViewMode('list');
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting members...');
  };

  const activeMembers = members.filter(m => m.status === 'active').length;
  const totalMembers = members.length;
  const newMembersThisMonth = members.filter(m => {
    const joinDate = new Date(m.joinDate);
    const thisMonth = new Date();
    return joinDate.getMonth() === thisMonth.getMonth() && 
           joinDate.getFullYear() === thisMonth.getFullYear();
  }).length;

  // 一覧画面の表示
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">会員一覧</h1>
          <p className="text-neutral-500 dark:text-gray-400">会員情報の確認・編集・新規登録を行えます</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <i className="fas fa-users text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">総会員数</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-white">{totalMembers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <i className="fas fa-user-check text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">アクティブ会員</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-white">{activeMembers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <i className="fas fa-user-plus text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">今月の新規会員</p>
                <p className="text-2xl font-bold text-neutral-800 dark:text-white">{newMembersThisMonth}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Actions */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="会員名、メール、電話番号で検索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="fas fa-search"
                fullWidth
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                icon="fas fa-download"
                onClick={handleExport}
              >
                エクスポート
              </Button>
              <Button
                variant="primary"
                icon="fas fa-plus"
                onClick={handleAddMember}
              >
                新規会員登録
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Members Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <MemberTable
            members={filteredMembers}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
          />
        </motion.div>
      </div>
    );
  }

  // 登録・編集画面の表示
  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-4"
      >
        <Button
          variant="ghost"
          icon="fas fa-arrow-left"
          onClick={handleFormCancel}
        >
          一覧に戻る
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white mb-1">
            {selectedMember ? '会員情報編集' : '新規会員登録'}
          </h1>
          <p className="text-neutral-500 dark:text-gray-400">
            {selectedMember ? '会員情報を編集してください' : '新しい会員の情報を入力してください'}
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <MemberForm
          initialData={selectedMember || undefined}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};