import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  activeMenuItem?: string;
  tenantName?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeMenuItem, tenantName }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeMenuItem={activeMenuItem} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header tenantName={tenantName} />
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};