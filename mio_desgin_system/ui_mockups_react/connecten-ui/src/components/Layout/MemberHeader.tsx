import React from 'react';
import { Bell, User, LogOut, Settings } from 'lucide-react';

interface MemberHeaderProps {
  memberName: string;
  onPageChange: (page: string) => void;
}

export const MemberHeader: React.FC<MemberHeaderProps> = ({
  memberName,
  onPageChange
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴとスタジオ名 */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-pink-500 dark:bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">En</span>
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-gray-900">En Dance Studio</h1>
              <p className="text-xs text-gray-500">会員サイト / Member Site</p>
            </div>
          </div>

          {/* 右側のメニュー */}
          <div className="flex items-center space-x-4">
            {/* 通知アイコン */}
            <button 
              className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => onPageChange('notifications')}
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">通知</span>
            </button>

            {/* ユーザーメニュー */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{memberName}</p>
                <p className="text-xs text-gray-500">プレミアム会員</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => onPageChange('mypage')}
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">マイページ</span>
                </button>
                
                <button 
                  className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => onPageChange('settings')}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">設定</span>
                </button>
                
                <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">ログアウト</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};