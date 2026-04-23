import React, { useMemo, useState } from 'react';
import { Search, Clock, ShieldCheck } from 'lucide-react';
import { useAudit } from '../../context/AuditContext';
import { useProjects } from '../../context/ProjectContext';

export const AuditLogPage: React.FC = () => {
  const { logs } = useAudit();
  const { currentProject } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');

  if (!currentProject) {
    return null;
  }

  // 2. Strict Scoping & Filtering
  const projectLogs = useMemo(() => {
    return logs.filter(log => log.projectId === currentProject.id);
  }, [logs, currentProject.id]);

  const filteredHistory = useMemo(() => {
    if (!searchTerm) return projectLogs;
    const q = searchTerm.toLowerCase();
    return projectLogs.filter(h => 
      h.description.toLowerCase().includes(q) ||
      (h.details?.toLowerCase().includes(q)) ||
      (h.docNo?.toLowerCase().includes(q))
    );
  }, [projectLogs, searchTerm]);

  const getActionColor = (action: string) => {
    switch(action) {
      case 'CREATE': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', dot: '#10b981' };
      case 'UPDATE': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', dot: '#3b82f6' };
      case 'DELETE': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', dot: '#ef4444' };
      default: return { bg: '#f1f5f9', color: '#64748b', dot: '#64748b' };
    }
  };

  return (
    <div style={{ padding: 'var(--p-page)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{ padding: '6px', backgroundColor: 'var(--accent-soft)', borderRadius: '6px', color: 'var(--accent)' }}>
              <ShieldCheck size={16} />
            </div>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>System Security</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.02em' }}>
            Activity Log: <span style={{ color: 'var(--accent)' }}>{currentProject.name}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Comprehensive event tracking and data integrity history for this project.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'white', padding: '10px 16px', borderRadius: '12px', border: '1.5px solid var(--border-color)', width: '320px', transition: 'all 0.2s' }}>
            <Search size={16} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search detailed logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%', color: 'var(--text-primary)', fontWeight: 500 }} 
            />
          </div>
        </div>
      </div>

      {/* Summary Stat (Minimal Visual) */}
      <div style={{ marginBottom: '24px', padding: '16px 20px', backgroundColor: 'white', borderRadius: '12px', border: '1.5px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Total Project Events</span>
          <span style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>{projectLogs.length}</span>
        </div>
        <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--border-color)' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Scope</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{currentProject.code} (Strict)</span>
        </div>
      </div>

      <div className="table-container" style={{ borderRadius: 'var(--radius-main)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
        <table className="data-table">
          <thead>
            <tr style={{ backgroundColor: '#fafafa' }}>
              <th style={{ width: '180px', paddingLeft: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Clock size={12} /> Timestamp
                </div>
              </th>
              <th style={{ width: '120px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</th>
              <th style={{ width: '110px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Log Description & Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((log) => {
              const theme = getActionColor(log.action);
              return (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '12px', paddingLeft: '24px', verticalAlign: 'top', paddingTop: '16px' }}>
                    {log.date}
                  </td>
                  <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)' }}>{log.type}</span>
                      {log.docNo && (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent)', backgroundColor: 'var(--accent-soft)', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
                          {log.docNo}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', verticalAlign: 'top', paddingTop: '16px' }}>
                    <span style={{ 
                      fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px',
                      backgroundColor: theme.bg, color: theme.color,
                      display: 'inline-flex', alignItems: 'center', gap: '6px'
                    }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: theme.dot }}></div>
                      {log.action}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                      {log.description}
                    </div>
                    {log.details && (
                      <div style={{ 
                        fontSize: '12px', color: 'var(--text-secondary)', 
                        backgroundColor: '#f8fafc', padding: '12px 16px', borderRadius: '8px', 
                        whiteSpace: 'pre-wrap', border: '1px solid #edf2f7',
                        fontFamily: 'monospace', lineHeight: '1.5'
                      }}>
                         {log.details}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            {filteredHistory.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <Clock size={32} style={{ opacity: 0.2 }} />
                    No activity records found for this project yet.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
