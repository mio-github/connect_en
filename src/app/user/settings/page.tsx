'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

export default function SettingsPage() {
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Mock user data
  const userData = {
    name: '田中 花子',
    email: 'hanako.tanaka@example.com',
    phone: '090-1234-5678',
    hasPaymentMethod: true,
    hasMembershipPayment: true,
  };

  const settingsGroups = [
    {
      title: 'アカウント設定',
      items: [
        {
          icon: '📧',
          title: 'メールアドレス変更',
          description: 'アカウントのメールアドレスを変更します',
          href: '/user/settings/email',
        },
        {
          icon: '🔒',
          title: 'パスワード変更',
          description: 'アカウントのパスワードを変更します',
          href: '/user/settings/password',
        }
      ],
    },
    {
      title: '支払い設定',
      items: [
        {
          icon: '💳',
          title: 'クレジットカード管理',
          description: userData.hasPaymentMethod ? 'クレジットカード情報を編集・更新します' : 'クレジットカード情報を登録します',
          href: '/user/settings/payment',
          badge: userData.hasPaymentMethod ? '登録済み' : '未登録',
          badgeColor: userData.hasPaymentMethod ? 'green' : 'gray',
        },
        {
          icon: '💰',
          title: '月謝支払い設定',
          description: userData.hasMembershipPayment ? '月謝の支払い方法を管理します' : '月謝の支払い方法を設定します',
          href: '/user/settings/membership',
          badge: userData.hasMembershipPayment ? '設定済み' : '未設定',
          badgeColor: userData.hasMembershipPayment ? 'green' : 'gray',
        }
      ],
    },
    {
      title: '規約・ポリシー',
      items: [
        {
          icon: '📝',
          title: '利用規約',
          description: 'EnDanceStudioの利用規約を確認します',
          href: '/user/settings/terms',
        },
        {
          icon: '🔐',
          title: 'プライバシーポリシー',
          description: '個人情報の取り扱いについて確認します',
          href: '/user/settings/privacy',
        },
        {
          icon: '🏢',
          title: '施設利用規約',
          description: 'スタジオ施設の利用規約を確認します',
          href: '/user/settings/facility-terms',
        }
      ],
    },
  ];

  const handleLogout = () => {
    // Mock logout functionality
    // In a real app, this would make an API call to logout
    router.push('/user');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">設定</h1>
      
      {/* Profile Summary */}
      <Card>
        <div className="p-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-primary-light flex items-center justify-center text-primary text-2xl font-bold">
              {userData.name.charAt(0)}
            </div>
            <div className="ml-6">
              <h2 className="text-xl font-medium">{userData.name}</h2>
              <div className="mt-1 text-sm text-gray-500">
                <p>{userData.email}</p>
                <p>{userData.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Settings Groups */}
      {settingsGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-4">
          <h2 className="text-lg font-medium">{group.title}</h2>
          <div className="space-y-3">
            {group.items.map((item, itemIndex) => (
              <Link href={item.href} key={itemIndex}>
                <Card>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="text-2xl mr-4">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{item.title}</h3>
                          {item.badge && (
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                              item.badgeColor === 'green' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <div className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
      
      {/* Logout */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex justify-center">
          {!showLogoutConfirm ? (
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              ログアウト
            </button>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
              <h3 className="font-medium mb-2 text-center">ログアウトしますか？</h3>
              <div className="flex justify-center space-x-4 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  キャンセル
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                >
                  ログアウト
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
