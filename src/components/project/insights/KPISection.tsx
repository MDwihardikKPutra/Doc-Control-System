import React from 'react';
import { Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface KPISectionProps {
  stats: {
    total: number;
    approved: number;
    approvedPct: number;
    pending: number;
    comments: number;
    rejected: number;
  };
}

export const KPISection: React.FC<KPISectionProps> = ({ stats }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '16px' }}>
      {/* Total Registry */}
      <div className="card" style={{ padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Activity size={14} color="var(--accent)" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>REGISTRY</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.total}</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>DOCS</span>
        </div>
      </div>

      {/* Approved (A) */}
      <div className="card" style={{ padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <CheckCircle size={14} color="var(--status-a-text)" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>APPROVED (A)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.approved}</span>
          <div style={{ padding: '4px 10px', borderRadius: '12px', backgroundColor: 'var(--status-a-bg)', color: 'var(--status-a-text)', fontSize: '11px', fontWeight: 900 }}>
            {stats.approvedPct}%
          </div>
        </div>
      </div>

      {/* In Review (B) */}
      <div className="card" style={{ padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Clock size={14} color="var(--status-b-text)" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>IN REVIEW (B)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.pending + stats.comments}</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>PENDING</span>
        </div>
      </div>

      {/* Rejected (C) */}
      <div className="card" style={{ padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <AlertTriangle size={14} color="var(--status-c-text)" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>REJECTED (C)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.rejected}</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--status-c-text)' }}>ACTION</span>
        </div>
      </div>
    </div>
  );
};
