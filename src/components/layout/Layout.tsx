'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      
      <div className="flex-1 ml-64">
        <div className="fixed top-0 right-0 left-64 z-10">
          <Header />
        </div>
        
        <main className="pt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
