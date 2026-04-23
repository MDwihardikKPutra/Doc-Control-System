import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, LayoutGrid, TrendingUp, History, Database, HelpCircle } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useProjects } from '../../context/ProjectContext';
import { slugify } from '../../utils';

export const AppSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSidebarCollapsed } = useUI();
  const { setCurrentProject, currentProject } = useProjects();

  const handleHomeClick = () => {
    setCurrentProject(null);
    navigate('/projects');
  };

  const menuItems = [
    { path: '/projects', icon: LayoutGrid, label: 'Projects', enabled: true },
    { path: currentProject ? `/${slugify(currentProject.name)}/tracking` : '/tracking', icon: Database, label: 'Tracking', enabled: !!currentProject },
    { path: currentProject ? `/${slugify(currentProject.name)}/insights` : '/insights', icon: TrendingUp, label: 'Insights', enabled: !!currentProject },
    { path: '/audit', icon: History, label: 'Audit Log', enabled: !!currentProject },
    { path: '/help', icon: HelpCircle, label: 'Help Center', enabled: true },
  ];

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        <div style={{ 
          backgroundColor: 'var(--accent)', 
          width: '28px', 
          height: '28px', 
          borderRadius: '6px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0
        }}>
          <FileText color="white" size={16} />
        </div>
        {!isSidebarCollapsed && (
          <span style={{ fontWeight: 800, letterSpacing: '-0.02em', fontSize: '15px' }}>DMS Core</span>
        )}
      </div>
      
      <nav className="sidebar-menu">
        {menuItems.map(item => {
          const isActive = (item.path === '/projects' && location.pathname === '/projects') || 
                           (item.path !== '/projects' && location.pathname.startsWith(item.path));
          
          return (
            <Link 
              key={item.label}
              to={item.enabled ? item.path : '#'} 
              className={`menu-item ${isActive ? 'active' : ''} ${!item.enabled ? 'disabled' : ''}`}
              style={{ 
                opacity: !item.enabled ? 0.3 : 1, 
                pointerEvents: !item.enabled ? 'none' : 'auto',
                cursor: !item.enabled ? 'not-allowed' : 'pointer'
              }}
            >
              <item.icon size={16} />
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
