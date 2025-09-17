import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

export const MemberLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // ログイン処理のシミュレーション
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* ロゴとヘッダー */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">En</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            En Dance Studio
          </h1>
          <p className="mt-2 text-gray-600">
            会員ログイン / Member Login
          </p>
        </div>

        {/* ログインフォーム */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <div className="space-y-4">
              {/* メールアドレス */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス / Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your-email@example.com"
                    required
                  />
                </div>
              </div>

              {/* パスワード */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード / Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="パスワードを入力"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>

            {/* ログインボタン */}
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>ログイン / Login</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            {/* パスワードリセット */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-purple-600 hover:text-purple-500 hover:underline"
              >
                パスワードを忘れた方 / Forgot Password?
              </button>
            </div>
          </div>
        </form>

        {/* 新規会員登録 */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-4">
              まだ会員でない方 / Not a member yet?
            </p>
            <button className="w-full bg-white border-2 border-purple-300 text-purple-700 py-3 px-4 rounded-lg font-semibold hover:bg-purple-50 hover:border-purple-400 transition-colors">
              新規会員登録 / Sign Up
            </button>
          </div>
        </div>

        {/* フッター情報 */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2024 En Dance Studio. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-purple-600">利用規約</a>
            <a href="#" className="hover:text-purple-600">プライバシーポリシー</a>
            <a href="#" className="hover:text-purple-600">お問い合わせ</a>
          </div>
        </div>
      </div>
    </div>
  );
};