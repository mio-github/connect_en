'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function UserRegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    memberCode: '',
    acceptTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simple validation for mockup purposes
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('すべての必須項目を入力してください。');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません。');
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError('利用規約に同意してください。');
      setLoading(false);
      return;
    }
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an API call to register the user
      router.push('/user/register/confirmation');
    } catch (err) {
      setError('登録に失敗しました。もう一度お試しください。');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center">
              <h1 className="text-xl font-bold text-white">En</h1>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            マイページ登録
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            EnDanceStudio会員サイトへの登録
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg px-8 pt-6 pb-8 mb-4">
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">基本情報</h3>
              
              <Input
                label="お名前 (必須)"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              
              <Input
                label="メールアドレス (必須)"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
              <Input
                label="パスワード (必須)"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              
              <Input
                label="パスワード確認 (必須)"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              
              <Input
                label="電話番号 (必須)"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">会員情報</h3>
              
              <Input
                label="会員コード (スタジオ会員の方)"
                type="text"
                name="memberCode"
                value={formData.memberCode}
                onChange={handleChange}
              />
              
              <div className="text-sm text-gray-600">
                <p>※会員コードをお持ちの方は入力してください。</p>
                <p>※入力された会員コードが有効な場合、会員特典が自動的に適用されます。</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">利用規約</h3>
              
              <div className="h-40 overflow-y-scroll p-4 border border-gray-300 rounded bg-gray-50 text-sm">
                <h4 className="font-medium mb-2">EnDanceStudio利用規約</h4>
                <p className="mb-2">本利用規約（以下「本規約」といいます）は、EnDanceStudio（以下「当社」といいます）が提供するサービス（以下「本サービス」といいます）の利用条件を定めるものです。</p>
                <p className="mb-2">第1条（適用範囲）</p>
                <p className="mb-2">本規約は、本サービスの利用に関する当社と登録ユーザー（以下「ユーザー」といいます）との間の権利義務関係を定めることを目的とし、ユーザーと当社の間の本サービスの利用に関わる一切の関係に適用されます。</p>
                <p className="mb-2">第2条（利用登録）</p>
                <p className="mb-2">本サービスの利用を希望する者は、本規約を遵守することに同意し、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって利用登録が完了するものとします。</p>
                <p className="mb-2">...</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                    利用規約に同意する (必須)
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-6">
              <Link href="/user/login" className="text-sm text-gray-600 hover:text-primary">
                ← ログイン画面に戻る
              </Link>
              
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? '登録中...' : '登録する'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
