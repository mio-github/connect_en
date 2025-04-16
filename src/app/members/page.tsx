'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

// 会員データの型定義
interface Member {
  id: string;
  name: string;
  kana: string;
  status: string;
  memberType: string;
  joinDate: string;
  lastVisit: string;
  email: string;
  phone: string;
}

export default function MembersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ダミーデータ
  const members: Member[] = [
    {
      id: 'M001',
      name: '田中 花子',
      kana: 'タナカ ハナコ',
      status: '在籍',
      memberType: '一般会員',
      joinDate: '2024-01-15',
      lastVisit: '2024-04-14',
      email: 'tanaka.h@example.com',
      phone: '090-1234-5678'
    },
    {
      id: 'M002',
      name: '佐藤 太郎',
      kana: 'サトウ タロウ',
      status: '休会中',
      memberType: 'プレミアム会員',
      joinDate: '2023-08-20',
      lastVisit: '2024-03-31',
      email: 'sato.t@example.com',
      phone: '090-8765-4321'
    },
    {
      id: 'M003',
      name: '鈴木 一郎',
      kana: 'スズキ イチロウ',
      status: '在籍',
      memberType: '一般会員',
      joinDate: '2023-10-05',
      lastVisit: '2024-04-10',
      email: 'suzuki.i@example.com',
      phone: '090-2345-6789'
    },
    {
      id: 'M004',
      name: '山田 優子',
      kana: 'ヤマダ ユウコ',
      status: '退会済み',
      memberType: '一般会員',
      joinDate: '2022-05-15',
      lastVisit: '2023-12-20',
      email: 'yamada.y@example.com',
      phone: '090-3456-7890'
    },
    {
      id: 'M005',
      name: '伊藤 健太',
      kana: 'イトウ ケンタ',
      status: '在籍',
      memberType: 'プレミアム会員',
      joinDate: '2024-02-28',
      lastVisit: '2024-04-15',
      email: 'ito.k@example.com',
      phone: '090-4567-8901'
    }
  ];

  // 検索とフィルタリングを適用
  useEffect(() => {
    let result = [...members];
    
    // 検索クエリによるフィルタリング
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(member => 
        member.id.toLowerCase().includes(query) ||
        member.name.toLowerCase().includes(query) ||
        member.kana.toLowerCase().includes(query)
      );
    }
    
    // ステータスによるフィルタリング
    if (selectedStatus !== 'all') {
      const statusMap: Record<string, string> = {
        'active': '在籍',
        'inactive': '休会中',
        'expired': '退会済み'
      };
      result = result.filter(member => member.status === statusMap[selectedStatus]);
    }
    
    setFilteredMembers(result);
    setCurrentPage(1); // 検索・フィルタリング時は最初のページに戻る
  }, [searchQuery, selectedStatus]);

  // 会員詳細ページへ遷移
  const handleViewDetails = (memberId: string) => {
    router.push(`/members/${memberId}`);
  };

  // 会員編集ページへ遷移
  const handleEdit = (memberId: string) => {
    router.push(`/members/${memberId}/edit`);
  };

  // 検索をクリア
  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedStatus('all');
  };

  // ページネーション計算
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">会員管理</h1>
        <p className="text-gray-600">会員情報の検索・管理ができます。</p>
      </div>

      <Card>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="会員番号、名前、カナで検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="border rounded px-3 py-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">全てのステータス</option>
              <option value="active">在籍</option>
              <option value="inactive">休会中</option>
              <option value="expired">退会済み</option>
            </select>
            <Button onClick={() => {}}>検索</Button>
            <Button variant="outline" onClick={handleClearSearch}>クリア</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">会員番号</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">氏名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">カナ</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ステータス</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">会員種別</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">入会日</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">最終来店日</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{member.id}</td>
                  <td className="px-4 py-3 text-sm">{member.name}</td>
                  <td className="px-4 py-3 text-sm">{member.kana}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      member.status === '在籍' ? 'bg-green-100 text-green-800' :
                      member.status === '休会中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{member.memberType}</td>
                  <td className="px-4 py-3 text-sm">{member.joinDate}</td>
                  <td className="px-4 py-3 text-sm">{member.lastVisit}</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleViewDetails(member.id)}>詳細</Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(member.id)}>編集</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMembers.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            該当する会員情報がありません。
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            全{filteredMembers.length}件中 {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredMembers.length)}件を表示
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              前へ
            </Button>
            <Button 
              variant="outline"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              次へ
            </Button>
          </div>
        </div>
      </Card>
    </Layout>
  );
} 