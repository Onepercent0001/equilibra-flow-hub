
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MobileSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-equilibra-background">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
