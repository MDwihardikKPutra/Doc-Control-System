import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ChevronRight, User } from 'lucide-react';

interface AppHeaderProps {
  currentProject: any;
  onToggleSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ currentProject, onToggleSidebar }) => {
  return (
    <header className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Menu 
          size={16} 
          style={{ cursor: 'pointer', color: '#6e6e73' }} 
          onClick={onToggleSidebar} 
        />
        <div className="breadcrumb">
          <Link to="/">Beranda</Link>
          {currentProject && (
            <>
              <ChevronRight size={12} color="#86868b" />
              <span>{currentProject.name}</span>
            </>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '12px', fontWeight: 500, color: '#1d1d1f', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', backgroundColor: '#f5f5f7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={12} color="#1d1d1f" />
          </div>
          <span style={{ fontWeight: 600 }}>Doc Control</span>
        </div>
      </div>
    </header>
  );
};
