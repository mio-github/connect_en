'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // モックアップのため、単純な検証だけを行います
    if (!email || !password) {
      setError('メールアドレスとパスワードを入力してください。');
      setLoading(false);
      return;
    }
    
    // 実際のアプリでは、ここでAPIリクエストを行いますが、モックアップでは
    // 単純にダッシュボードに遷移させます
    
    try {
      // 遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (err) {
      setError('ログインに失敗しました。');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center">
              <h1 className="text-2xl font-bold text-white">En</h1>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ConnectEn
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            エンダンススタジオERPシステム
          </p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <Input
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@en-dance.com"
            />
            
            <Input
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  ログイン状態を保存
                </label>
              </div>
              
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                  パスワードを忘れた場合
                </Link>
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'ログイン中...' : 'ログイン'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  アカウントをお持ちでない場合
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <Link href="/register">
                <Button variant="outline" className="w-full">
                  新規登録
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 