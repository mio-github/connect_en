import React from 'react';
import { MemberHeader } from './MemberHeader';
import { MemberNavigation } from './MemberNavigation';

interface MemberLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  memberName?: string;
}

export const MemberLayout: React.FC<MemberLayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  memberName = "田中 花子"
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <MemberHeader 
        memberName={memberName}
        onPageChange={onPageChange}
      />
      
      <div className="flex">
        <MemberNavigation 
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};