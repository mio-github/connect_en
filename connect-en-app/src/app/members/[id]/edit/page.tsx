'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

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

export default function MemberEditPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Member>({
    id: '',
    name: '',
    kana: '',
    status: '',
    memberType: '',
    joinDate: '',
    lastVisit: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // 実際のアプリではAPIからデータを取得します
    // ダミーデータを使用
    const dummyMembers: Member[] = [
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

    // URLパラメータからIDを取得して会員を検索
    const memberId = params.id as string;
    const foundMember = dummyMembers.find(m => m.id === memberId);
    
    if (foundMember) {
      setFormData(foundMember);
    }
    
    setLoading(false);
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 実際のアプリではAPIを呼び出して保存処理を行います
    // ここではモック処理として、詳細ページに戻ります
    router.push(`/members/${formData.id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">読み込み中...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">会員編集</h1>
          <p className="text-gray-600">{formData.name}（{formData.id}）の情報を編集</p>
        </div>
        <div>
          <Button variant="outline" onClick={() => router.push(`/members/${formData.id}`)}>
            キャンセル
          </Button>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">基本情報</h2>
              <div className="space-y-4">
                <Input
                  label="会員番号"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  disabled
                />
                <Input
                  label="氏名"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="カナ"
                  name="kana"
                  value={formData.kana}
                  onChange={handleInputChange}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ステータス
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border-gray-300"
                  >
                    <option value="在籍">在籍</option>
                    <option value="休会中">休会中</option>
                    <option value="退会済み">退会済み</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    会員種別
                  </label>
                  <select
                    name="memberType"
                    value={formData.memberType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary border-gray-300"
                  >
                    <option value="一般会員">一般会員</option>
                    <option value="プレミアム会員">プレミアム会員</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">連絡先情報</h2>
              <div className="space-y-4">
                <Input
                  label="メールアドレス"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="電話番号"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <h2 className="text-xl font-semibold mb-4 mt-6">会員履歴</h2>
              <div className="space-y-4">
                <Input
                  label="入会日"
                  name="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="最終来店日"
                  name="lastVisit"
                  type="date"
                  value={formData.lastVisit}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button type="submit" size="lg">保存</Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
} 