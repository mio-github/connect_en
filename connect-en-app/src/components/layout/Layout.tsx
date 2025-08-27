'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed left-0 top-0 h-full z-20">
        <Sidebar />
      </div>
      <div className="flex-1 ml-64">
        <div className="fixed top-0 right-0 left-64 z-30">
          <Header />
        </div>
        <main className="pt-24 px-8 pb-8 max-w-7xl mx-auto bg-white min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
