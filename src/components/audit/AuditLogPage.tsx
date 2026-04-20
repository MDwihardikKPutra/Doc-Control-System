import React, { useMemo, useState } from 'react';
import { Search, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudit } from '../../context/AuditContext';
import { useProjects } from '../../context/ProjectContext';

export const AuditLogPage: React.FC = () => {
  const { logs } = useAudit();
  const { projects } = useProjects();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = useMemo(() => {
    if (!searchTerm) return logs;
    const q = searchTerm.toLowerCase();
    return logs.filter(h => 
      (h.docNo?.toLowerCase().includes(q)) || 
      h.description.toLowerCase().includes(q) ||
      (h.details?.toLowerCase().includes(q))
    );
  }, [logs, searchTerm]);

  const getActionColor = (action: string) => {
    switch(action) {
      case 'CREATE': return { bg: 'var(--status-a-bg)', color: 'var(--status-a-text)' };
      case 'UPDATE': return { bg: 'var(--status-b-bg)', color: 'var(--status-b-text)' };
      case 'DELETE': return { bg: 'var(--status-c-bg)', color: 'var(--status-c-text)' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const getProjectCode = (id?: string) => {
    if (!id) return '-';
    return projects.find(p => p.id === id)?.code || '-';
  };

  return (
    <div style={{ padding: 'var(--p-page)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.02em' }}>Unified Audit Log</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Tracking every system event: Projects, Documents, and Data edits.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '320px', backgroundColor: 'white', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <Search size={14} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%', color: 'var(--text-primary)' }} 
          />
        </div>
      </div>

      <div className="table-container" style={{ borderRadius: 'var(--radius-main)' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '180px', paddingLeft: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <Clock size={12} /> Timestamp
                </div>
              </th>
              <th style={{ width: '120px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</th>
              <th style={{ width: '100px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
              <th style={{ width: '140px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reference</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description / Changes</th>
              <th style={{ width: '80px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>View</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((log) => {
              const theme = getActionColor(log.action);
              return (
                <tr key={log.id}>
                  <td style={{ color: 'var(--text-secondary)', fontSize: '12px', paddingLeft: '20px' }}>{log.date}</td>
                  <td style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{log.type}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ 
                      fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '6px',
                      backgroundColor: theme.bg, color: theme.color, border: '1px solid var(--border-color)',
                      display: 'inline-block'
                    }}>
                      {log.action}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--accent)' }}>{getProjectCode(log.projectId)}</div>
                      {log.docNo && <div style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>{log.docNo}</div>}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px', color: 'var(--text-primary)' }}>{log.description}</div>
                    {log.details && (
                      <div style={{ 
                        fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic', 
                        backgroundColor: '#f8fafc', padding: '6px 10px', borderRadius: '6px', 
                        marginTop: '6px', whiteSpace: 'pre-wrap', border: '1px solid var(--border-color)' 
                      }}>
                         {log.details}
                      </div>
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {log.projectId && (
                      <Link 
                        to={`/project/${log.projectId}/tracking`}
                        style={{ color: 'var(--accent)', display: 'inline-flex', padding: '8px', borderRadius: '8px', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-soft)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <ExternalLink size={14} />
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
            {filteredHistory.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  No records found in audit history.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
