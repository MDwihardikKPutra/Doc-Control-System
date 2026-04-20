import React from 'react';
import { X } from 'lucide-react';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ 
  isOpen, onClose, title, children, footer, width = '600px'
}) => {
  return (
    <div className={`right-sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="right-sidebar-container" style={{ width, maxWidth: '95vw' }} onClick={e => e.stopPropagation()}>
        <div className="sidebar-content-header" style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 900, color: 'var(--text-primary)', margin: 0 }}>{title}</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            style={{ padding: '6px', borderRadius: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-secondary)' }}
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="sidebar-content-body">
          {children}
        </div>

        {footer && (
          <div className="sidebar-content-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
