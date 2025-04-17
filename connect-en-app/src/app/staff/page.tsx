'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

// 仮データ - スタッフ情報
const STAFF_DATA = [
  { 
    id: 1, 
    name: '山田 先生', 
    nameKana: 'やまだ せんせい',
    gender: '女性',
    birthdate: '1985-06-15',
    email: 'yamada@example.com',
    phone: '090-1234-5678',
    address: '東京都渋谷区神南1-2-3',
    department: '講師',
    position: 'シニアインストラクター',
    specialty: ['バレエ', 'コンテンポラリー'],
    hiring_date: '2018-04-01',
    salary: '時給制',
    hourly_rate: 3000,
    certification: ['全米ヨガアライアンスRYT200', 'バレエ指導者資格'],
    bio: '幼少期からクラシックバレエを学び、大学卒業後は海外でのダンス活動も経験。10年以上の指導歴を持つベテラン講師です。',
    image: '/images/staff-1.jpg',
    status: '在籍中',
    shifts: [
      { day: '月', start: '10:00', end: '15:00' },
      { day: '水', start: '13:00', end: '19:00' },
      { day: '金', start: '15:00', end: '20:00' },
    ]
  },
  { 
    id: 2, 
    name: '鈴木 先生', 
    nameKana: 'すずき せんせい',
    gender: '男性',
    birthdate: '1990-09-22',
    email: 'suzuki@example.com',
    phone: '090-8765-4321',
    address: '東京都新宿区西新宿7-8-9',
    department: '講師',
    position: 'インストラクター',
    specialty: ['ジャズダンス', 'ヒップホップ'],
    hiring_date: '2020-01-15',
    salary: '時給制',
    hourly_rate: 2500,
    certification: ['JADP認定ダンスインストラクター'],
    bio: 'プロダンサーとして活動後、指導者に転身。エネルギッシュなレッスンが人気の講師です。',
    image: '/images/staff-2.jpg',
    status: '在籍中',
    shifts: [
      { day: '火', start: '14:00', end: '20:00' },
      { day: '木', start: '14:00', end: '20:00' },
      { day: '土', start: '10:00', end: '18:00' },
    ]
  },
  { 
    id: 3, 
    name: '佐藤 先生', 
    nameKana: 'さとう せんせい',
    gender: '男性',
    birthdate: '1988-11-05',
    email: 'sato@example.com',
    phone: '090-5555-6666',
    address: '東京都世田谷区太子堂3-4-5',
    department: '講師',
    position: 'インストラクター',
    specialty: ['ヒップホップ', 'ブレイクダンス'],
    hiring_date: '2019-06-01',
    salary: '時給制',
    hourly_rate: 2800,
    certification: ['ストリートダンス指導者認定'],
    bio: '国内外のダンスバトルで受賞経験あり。独自のスタイルと熱心な指導で初心者からプロ志望まで幅広く対応します。',
    image: '/images/staff-3.jpg',
    status: '在籍中',
    shifts: [
      { day: '月', start: '16:00', end: '21:00' },
      { day: '水', start: '16:00', end: '21:00' },
      { day: '土', start: '14:00', end: '20:00' },
    ]
  },
  { 
    id: 4, 
    name: '高橋 スタッフ', 
    nameKana: 'たかはし すたっふ',
    gender: '女性',
    birthdate: '1993-03-28',
    email: 'takahashi@example.com',
    phone: '090-7777-8888',
    address: '東京都目黒区中目黒2-3-4',
    department: '事務',
    position: 'フロントスタッフ',
    specialty: ['受付業務', '会員管理'],
    hiring_date: '2021-09-01',
    salary: '時給制',
    hourly_rate: 1200,
    certification: ['秘書検定2級', 'ビジネス実務検定3級'],
    bio: '明るい接客と丁寧な対応が得意です。会員さんからの信頼も厚いフロントスタッフです。',
    image: '/images/staff-4.jpg',
    status: '在籍中',
    shifts: [
      { day: '月', start: '9:00', end: '15:00' },
      { day: '火', start: '9:00', end: '15:00' },
      { day: '水', start: '9:00', end: '15:00' },
      { day: '木', start: '9:00', end: '15:00' },
      { day: '金', start: '9:00', end: '15:00' },
    ]
  },
  { 
    id: 5, 
    name: '田中 マネージャー', 
    nameKana: 'たなか まねーじゃー',
    gender: '男性',
    birthdate: '1980-12-10',
    email: 'tanaka@example.com',
    phone: '090-1111-2222',
    address: '東京都港区六本木1-2-3',
    department: '管理',
    position: 'マネージャー',
    specialty: ['施設運営', 'スタッフ管理', '経営企画'],
    hiring_date: '2017-02-01',
    salary: '月給制',
    hourly_rate: null,
    certification: ['スポーツクラブマネジメント資格', '経営管理士'],
    bio: 'スポーツクラブでの勤務経験を活かし、スタジオの運営管理を担当。効率的な運営と顧客満足度向上に貢献しています。',
    image: '/images/staff-5.jpg',
    status: '在籍中',
    shifts: [
      { day: '月', start: '10:00', end: '19:00' },
      { day: '火', start: '10:00', end: '19:00' },
      { day: '水', start: '10:00', end: '19:00' },
      { day: '木', start: '10:00', end: '19:00' },
      { day: '金', start: '10:00', end: '19:00' },
    ]
  },
  { 
    id: 6, 
    name: '伊藤 先生', 
    nameKana: 'いとう せんせい',
    gender: '女性',
    birthdate: '1992-05-17',
    email: 'ito@example.com',
    phone: '090-3333-4444',
    address: '東京都品川区西五反田5-6-7',
    department: '講師',
    position: 'インストラクター',
    specialty: ['ヨガ', 'ピラティス'],
    hiring_date: '2020-04-01',
    salary: '時給制',
    hourly_rate: 2300,
    certification: ['全米ヨガアライアンスRYT500', 'マットピラティス指導者資格'],
    bio: 'ヨガインストラクターとして豊富な経験を持ち、心と体のバランスを整える指導が評判です。',
    image: '/images/staff-6.jpg',
    status: '休職中',
    shifts: []
  },
];

// 部署オプション
const DEPARTMENT_OPTIONS = [
  { label: 'すべて', value: 'all' },
  { label: '講師', value: 'instructor' },
  { label: '事務', value: 'office' },
  { label: '管理', value: 'management' },
];

// 在籍状態オプション
const STATUS_OPTIONS = [
  { label: 'すべて', value: 'all' },
  { label: '在籍中', value: 'active' },
  { label: '休職中', value: 'leave' },
  { label: '退職済', value: 'retired' },
];

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<'list' | 'shifts' | 'certifications'>('list');
  const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
  const [department, setDepartment] = useState<string>('all');
  const [status, setStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // スタッフ詳細を表示
  const handleStaffSelect = (staffId: number) => {
    setSelectedStaff(staffId);
  };

  // スタッフ詳細から戻る
  const handleBackToList = () => {
    setSelectedStaff(null);
  };

  // 選択したスタッフの情報を取得
  const selectedStaffData = selectedStaff !== null
    ? STAFF_DATA.find(staff => staff.id === selectedStaff)
    : null;

  // 検索とフィルタリングの適用
  const filteredStaff = STAFF_DATA
    .filter(staff => {
      // 部署フィルター
      if (department !== 'all') {
        const departmentMap: { [key: string]: string } = {
          'instructor': '講師',
          'office': '事務',
          'management': '管理'
        };
        if (staff.department !== departmentMap[department]) return false;
      }

      // 在籍状態フィルター
      if (status !== 'all') {
        const statusMap: { [key: string]: string } = {
          'active': '在籍中',
          'leave': '休職中',
          'retired': '退職済'
        };
        if (staff.status !== statusMap[status]) return false;
      }

      // 検索クエリ
      if (searchTerm) {
        return (
          staff.name.includes(searchTerm) ||
          staff.nameKana.includes(searchTerm) ||
          staff.department.includes(searchTerm) ||
          staff.position.includes(searchTerm) ||
          staff.specialty.some(specialty => specialty.includes(searchTerm))
        );
      }

      return true;
    });

  return (
    <Layout>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">スタッフ管理</h1>
          <p className="text-gray-600">スタッフの情報管理やシフト管理ができます。</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="primary">新規スタッフ登録</Button>
          <Button variant="outline">シフト一括管理</Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            className={`py-4 px-1 font-medium text-sm focus:outline-none ${
              activeTab === 'list'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('list')}
          >
            スタッフ一覧
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm focus:outline-none ${
              activeTab === 'shifts'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('shifts')}
          >
            シフト管理
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm focus:outline-none ${
              activeTab === 'certifications'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('certifications')}
          >
            資格・スキル管理
          </button>
        </div>
      </div>

      {/* スタッフ一覧 */}
      {activeTab === 'list' && !selectedStaff && (
        <div>
          {/* フィルターセクション */}
          <Card className="mb-6">
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">部署</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {DEPARTMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">状態</label>
                <select
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">検索</label>
                <Input
                  type="text"
                  placeholder="名前、スキルなど"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </Card>

          {/* スタッフリスト */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStaff.length === 0 ? (
              <div className="col-span-3 p-8 text-center text-gray-500">
                該当するスタッフが見つかりませんでした
              </div>
            ) : (
              filteredStaff.map(staff => (
                <Card key={staff.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 flex">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-gray-400">写真</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold">{staff.name}</h3>
                        <span 
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            staff.status === '在籍中' 
                              ? 'bg-green-100 text-green-800' 
                              : staff.status === '休職中'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {staff.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{staff.nameKana}</p>
                      <div className="mb-2">
                        <p className="text-sm">
                          <span className="font-medium">{staff.department}</span> / {staff.position}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {staff.specialty.map((specialty, index) => (
                          <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStaffSelect(staff.id)}
                    >
                      詳細
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* スタッフ詳細表示 */}
      {activeTab === 'list' && selectedStaff && selectedStaffData && (
        <div>
          <button 
            className="flex items-center text-sm text-blue-600 mb-4"
            onClick={handleBackToList}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            一覧に戻る
          </button>
          
          <Card className="overflow-hidden mb-6">
            <div className="border-b border-gray-200 p-6 flex flex-col md:flex-row">
              <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
                <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                  プロフィール写真
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedStaffData.name}</h2>
                    <p className="text-sm text-gray-500">{selectedStaffData.nameKana}</p>
                  </div>
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedStaffData.status === '在籍中' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedStaffData.status === '休職中'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedStaffData.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">{selectedStaffData.department} / {selectedStaffData.position}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedStaffData.specialty.map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">入社日: {selectedStaffData.hiring_date}</p>
                    <p className="text-sm text-gray-500">
                      給与形態: {selectedStaffData.salary}
                      {selectedStaffData.hourly_rate && ` (¥${selectedStaffData.hourly_rate.toLocaleString()}/時間)`}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">自己紹介</h3>
                  <p className="text-sm">{selectedStaffData.bio}</p>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">シフト管理</Button>
                  <Button variant="primary" size="sm">編集</Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">個人情報</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">生年月日</p>
                    <p className="font-medium">{selectedStaffData.birthdate}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">性別</p>
                    <p className="font-medium">{selectedStaffData.gender}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">住所</p>
                    <p className="font-medium">{selectedStaffData.address}</p>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">メールアドレス</p>
                    <p className="font-medium">{selectedStaffData.email}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">電話番号</p>
                    <p className="font-medium">{selectedStaffData.phone}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">保有資格</p>
                    <div className="mt-1">
                      {selectedStaffData.certification.map((cert, index) => (
                        <p key={index} className="text-sm">{cert}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <h3 className="text-lg font-medium mb-4">シフト情報</h3>
              {selectedStaffData.shifts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {selectedStaffData.shifts.map((shift, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-center mb-2 font-bold">{shift.day}曜日</div>
                      <div className="text-center text-sm">{shift.start} - {shift.end}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">シフト情報はありません</p>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* シフト管理タブ */}
      {activeTab === 'shifts' && (
        <div>
          <Card className="mb-6">
            <div className="p-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">スタッフシフト一覧</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">週間表示</Button>
                <Button size="sm" variant="outline">月間表示</Button>
              </div>
            </div>
            
            <div className="p-2 overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">スタッフ名</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">月</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">火</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">水</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">木</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">金</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">土</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">日</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {STAFF_DATA.filter(staff => staff.status === '在籍中').map(staff => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-xs text-gray-600">
                            {staff.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{staff.name}</div>
                            <div className="text-xs text-gray-500">{staff.department}</div>
                          </div>
                        </div>
                      </td>
                      {['月', '火', '水', '木', '金', '土', '日'].map((day, index) => {
                        const shift = staff.shifts.find(s => s.day === day);
                        return (
                          <td key={index} className="px-2 py-3 text-center">
                            {shift ? (
                              <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                {shift.start} - {shift.end}
                              </div>
                            ) : (
                              <div className="text-xs text-gray-400">-</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          <div className="flex justify-end">
            <Button variant="outline">シフトテンプレートを編集</Button>
          </div>
        </div>
      )}

      {/* 資格・スキル管理タブ */}
      {activeTab === 'certifications' && (
        <div>
          <Card className="mb-6">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">スタッフスキル・資格一覧</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">スタッフ名</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">部署</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">専門分野</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">保有資格</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">アクション</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {STAFF_DATA.map(staff => (
                      <tr key={staff.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full mr-2 flex items-center justify-center text-xs text-gray-600">
                              {staff.name.charAt(0)}
                            </div>
                            <div className="font-medium text-sm">{staff.name}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{staff.department}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {staff.specialty.map((specialty, index) => (
                              <span key={index} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            {staff.certification.map((cert, index) => (
                              <span key={index} className="text-sm">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button size="sm" variant="outline">編集</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-between">
            <div>
              <Button variant="outline">資格マスタ管理</Button>
            </div>
            <div>
              <Button variant="primary">資格・スキル追加</Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
} 