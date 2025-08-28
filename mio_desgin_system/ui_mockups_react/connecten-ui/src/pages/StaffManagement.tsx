import React, { useState } from 'react';
import { Button } from '../components/UI/Button';

interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'instructor' | 'manager' | 'reception' | 'admin';
  specialties: string[];
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
  hourlyRate: number;
  profileImage?: string;
  certifications: string[];
  experience: number; // years
}

export const StaffManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'schedule' | 'performance' | 'payroll'>('list');
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const sampleStaff: Staff[] = [
    {
      id: '1',
      name: '山田花子',
      email: 'hanako.yamada@endance.studio',
      phone: '090-1234-5678',
      role: 'instructor',
      specialties: ['バレエ', 'ジャズダンス'],
      status: 'active',
      joinDate: '2023-04-01',
      hourlyRate: 4500,
      certifications: ['RAD認定講師', '日本バレエ協会会員'],
      experience: 8
    },
    {
      id: '2',
      name: '佐藤健太',
      email: 'kenta.sato@endance.studio',
      phone: '090-2345-6789',
      role: 'instructor',
      specialties: ['ヒップホップ', 'ブレイキング'],
      status: 'active',
      joinDate: '2023-06-15',
      hourlyRate: 5000,
      certifications: ['ストリートダンス検定1級'],
      experience: 12
    },
    {
      id: '3',
      name: '高橋真一',
      email: 'shinichi.takahashi@endance.studio',
      phone: '090-3456-7890',
      role: 'instructor',
      specialties: ['ジャズダンス', 'モダンダンス'],
      status: 'active',
      joinDate: '2022-09-01',
      hourlyRate: 5500,
      certifications: ['NATA認定講師', 'ダンス指導員'],
      experience: 15
    },
    {
      id: '4',
      name: '鈴木美咲',
      email: 'misaki.suzuki@endance.studio',
      phone: '090-4567-8901',
      role: 'manager',
      specialties: ['ヨガ', 'ピラティス'],
      status: 'active',
      joinDate: '2022-03-01',
      hourlyRate: 3500,
      certifications: ['RYT200', 'ピラティス指導員'],
      experience: 6
    },
    {
      id: '5',
      name: '田中翔太',
      email: 'shota.tanaka@endance.studio',
      phone: '090-5678-9012',
      role: 'reception',
      specialties: [],
      status: 'on_leave',
      joinDate: '2023-10-01',
      hourlyRate: 1200,
      certifications: [],
      experience: 1
    }
  ];

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      instructor: { label: '講師', className: 'bg-blue-100 text-blue-800' },
      manager: { label: 'マネージャー', className: 'bg-purple-100 text-purple-800' },
      reception: { label: '受付', className: 'bg-green-100 text-green-800' },
      admin: { label: '管理者', className: 'bg-red-100 text-red-800' }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.instructor;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: '勤務中', className: 'bg-green-100 text-green-800' },
      inactive: { label: '退職', className: 'bg-gray-100 text-gray-800' },
      on_leave: { label: '休職中', className: 'bg-yellow-100 text-yellow-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>{config.label}</span>;
  };

  const handleStaffClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  return (
    <div className="staff-management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">スタッフ管理</h1>
          <p className="text-gray-600 mt-1">講師・スタッフの総合管理システム</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <i className="fas fa-download mr-2"></i>
            スタッフリスト出力
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            <i className="fas fa-user-plus mr-2"></i>
            新規スタッフ登録
          </Button>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { key: 'list', label: 'スタッフ一覧', icon: 'fas fa-users' },
            { key: 'schedule', label: 'シフト管理', icon: 'fas fa-calendar-check' },
            { key: 'performance', label: 'パフォーマンス', icon: 'fas fa-chart-bar' },
            { key: 'payroll', label: '給与管理', icon: 'fas fa-money-check-alt' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* スタッフ一覧タブ */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {/* 検索・フィルター */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">検索</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="名前、メールアドレスで検索"
                    className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">役職</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">全て</option>
                  <option value="instructor">講師</option>
                  <option value="manager">マネージャー</option>
                  <option value="reception">受付</option>
                  <option value="admin">管理者</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">状態</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">全て</option>
                  <option value="active">勤務中</option>
                  <option value="on_leave">休職中</option>
                  <option value="inactive">退職</option>
                </select>
              </div>
            </div>
          </div>

          {/* スタッフカード */}
          <div className="grid gap-4">
            {sampleStaff.map((staff) => (
              <div 
                key={staff.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleStaffClick(staff)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-2xl text-gray-400"></i>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{staff.name}</h3>
                        {getRoleBadge(staff.role)}
                        {getStatusBadge(staff.status)}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <i className="fas fa-envelope w-4"></i>
                          <span>{staff.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fas fa-phone w-4"></i>
                          <span>{staff.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fas fa-calendar w-4"></i>
                          <span>入社: {new Date(staff.joinDate).toLocaleDateString('ja-JP')}</span>
                        </div>
                      </div>
                      
                      {staff.specialties.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {staff.specialties.map((specialty, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      時給: ¥{staff.hourlyRate.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      経験: {staff.experience}年
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="secondary" size="sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                      <Button variant="secondary" size="sm">
                        <i className="fas fa-calendar-alt"></i>
                      </Button>
                      <Button variant="secondary" size="sm">
                        <i className="fas fa-envelope"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 他のタブのプレースホルダー */}
      {activeTab === 'schedule' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-calendar-check text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">シフト管理</h3>
          <p className="text-gray-600">スタッフのシフト管理と勤怠機能を実装予定</p>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-chart-bar text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">パフォーマンス分析</h3>
          <p className="text-gray-600">講師の評価とパフォーマンス分析機能を実装予定</p>
        </div>
      )}

      {activeTab === 'payroll' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <i className="fas fa-money-check-alt text-4xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">給与管理</h3>
          <p className="text-gray-600">給与計算と支払い管理機能を実装予定</p>
        </div>
      )}

      {/* スタッフ詳細/登録モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedStaff ? `${selectedStaff.name}の詳細` : '新規スタッフ登録'}
              </h2>
              <button
                onClick={() => { setShowModal(false); setSelectedStaff(null); }}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              {selectedStaff ? (
                // スタッフ詳細表示
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                      <i className="fas fa-user text-3xl text-gray-400"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedStaff.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        {getRoleBadge(selectedStaff.role)}
                        {getStatusBadge(selectedStaff.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">基本情報</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-500">メール:</span> {selectedStaff.email}</div>
                        <div><span className="text-gray-500">電話:</span> {selectedStaff.phone}</div>
                        <div><span className="text-gray-500">入社日:</span> {new Date(selectedStaff.joinDate).toLocaleDateString('ja-JP')}</div>
                        <div><span className="text-gray-500">経験年数:</span> {selectedStaff.experience}年</div>
                        <div><span className="text-gray-500">時給:</span> ¥{selectedStaff.hourlyRate.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">専門分野・資格</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-gray-500 text-sm">専門分野:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedStaff.specialties.map((specialty, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm">資格・認定:</span>
                          <div className="space-y-1 mt-1">
                            {selectedStaff.certifications.map((cert, index) => (
                              <div key={index} className="text-sm text-gray-700">• {cert}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // 新規スタッフ登録フォーム
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="名前を入力"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">役職</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">選択してください</option>
                        <option value="instructor">講師</option>
                        <option value="manager">マネージャー</option>
                        <option value="reception">受付</option>
                        <option value="admin">管理者</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                      <input
                        type="tel"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="090-0000-0000"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="secondary" onClick={() => { setShowModal(false); setSelectedStaff(null); }}>
                {selectedStaff ? '閉じる' : 'キャンセル'}
              </Button>
              {!selectedStaff && (
                <Button variant="primary">
                  スタッフを登録
                </Button>
              )}
              {selectedStaff && (
                <Button variant="primary">
                  情報を更新
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};