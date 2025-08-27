import React from 'react';

interface TenantNotFoundPageProps {
  searchParams: {
    subdomain?: string;
  };
}

export default function TenantNotFoundPage({ searchParams }: TenantNotFoundPageProps) {
  const { subdomain } = searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            テナントが見つかりません
          </h1>
          <p className="text-gray-600">
            Customer Not Found
          </p>
        </div>

        <div className="mb-6">
          {subdomain && (
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700">
                アクセスしようとしたテナント:
              </p>
              <p className="font-mono text-lg text-gray-900">
                {subdomain}
              </p>
            </div>
          )}
          
          <p className="text-gray-600 mb-4">
            指定されたテナントは存在しないか、アクセス権限がありません。
          </p>
          
          <p className="text-sm text-gray-500">
            The specified tenant does not exist or you don't have access permissions.
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="/tenant-select"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            テナント選択画面に戻る
          </a>
          
          <div className="text-sm text-gray-500">
            <p>または</p>
            <a 
              href="mailto:support@connecten.com" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              サポートに連絡する
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            ConnectEn SaaS Platform
          </p>
        </div>
      </div>
    </div>
  );
}