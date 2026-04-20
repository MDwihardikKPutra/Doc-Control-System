import React from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface MainLayoutProps {
  children: React.ReactNode;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  currentProject: any;
  onNavigateHome: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, isSidebarCollapsed, setIsSidebarCollapsed, currentProject
}) => {
  return (
    <div className="app-container">
      <AppSidebar />
      <main className="main-content">
        <AppHeader 
          currentProject={currentProject} 
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <div className="page-viewport">
          {children}
        </div>
      </main>
    </div>
  );
};
