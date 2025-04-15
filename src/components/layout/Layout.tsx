import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pl-64">
        <Header />
        
        <main className="pt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
