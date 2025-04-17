'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

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

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

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
    
    setMember(foundMember || null);
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">読み込み中...</div>
        </div>
      </Layout>
    );
  }

  if (!member) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-gray-500 mb-4">会員情報が見つかりませんでした。</div>
          <Button onClick={() => router.push('/members')}>会員一覧に戻る</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">会員詳細</h1>
          <p className="text-gray-600">{member.name}（{member.id}）の詳細情報</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/members')}>一覧に戻る</Button>
          <Button onClick={() => router.push(`/members/${member.id}/edit`)}>編集</Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>
            <table className="min-w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 w-1/3">会員番号</th>
                  <td className="px-4 py-3 text-sm">{member.id}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">氏名</th>
                  <td className="px-4 py-3 text-sm">{member.name}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">カナ</th>
                  <td className="px-4 py-3 text-sm">{member.kana}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">ステータス</th>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      member.status === '在籍' ? 'bg-green-100 text-green-800' :
                      member.status === '休会中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">会員種別</th>
                  <td className="px-4 py-3 text-sm">{member.memberType}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">連絡先情報</h2>
            <table className="min-w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 w-1/3">メールアドレス</th>
                  <td className="px-4 py-3 text-sm">{member.email}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">電話番号</th>
                  <td className="px-4 py-3 text-sm">{member.phone}</td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-xl font-semibold mb-4 mt-6">会員履歴</h2>
            <table className="min-w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50 w-1/3">入会日</th>
                  <td className="px-4 py-3 text-sm">{member.joinDate}</td>
                </tr>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 bg-gray-50">最終来店日</th>
                  <td className="px-4 py-3 text-sm">{member.lastVisit}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </Layout>
  );
}