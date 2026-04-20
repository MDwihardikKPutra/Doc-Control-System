import React from 'react';
import { PieChart as PieChartIcon, Activity } from 'lucide-react';

interface StatusDistributionProps {
  stats: {
    approved: number;
    comments: number;
    rejected: number;
    total: number;
    rejectRate: number;
  };
}

export const StatusDistribution: React.FC<StatusDistributionProps> = ({ stats }) => {
  const distribution = [
    { label: 'Approved (A)', count: stats.approved, color: 'var(--status-a-text)', barColor: 'var(--status-a-dot, #10b981)', pct: Math.round((stats.approved / stats.total || 0) * 100) },
    { label: 'Comments (B)', count: stats.comments, color: 'var(--status-b-text)', barColor: 'var(--status-b-dot, #f59e0b)', pct: Math.round((stats.comments / stats.total || 0) * 100) },
    { label: 'Rejected (C)', count: stats.rejected, color: 'var(--status-c-text)', barColor: 'var(--status-c-dot, #ef4444)', pct: Math.round((stats.rejected / stats.total || 0) * 100) },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Status Breakdown */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <PieChartIcon size={16} /> Status Distribution
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {distribution.map(item => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 800 }}>{item.count}</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                 <div style={{ height: '100%', width: `${item.pct}%`, backgroundColor: item.barColor, transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Index */}
      <div className="card" style={{ padding: '24px', flex: 1 }}>
        <h3 style={{ fontSize: '12px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Activity size={16} /> Quality Index
        </h3>
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ fontSize: '32px', fontWeight: 900, color: stats.rejectRate > 20 ? 'var(--status-c-text)' : 'var(--text-primary)', letterSpacing: '-0.02em' }}>{stats.rejectRate}%</div>
            <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '4px' }}>Historical Reject Rate</div>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic', marginTop: '12px', opacity: 0.8 }}>
          {stats.rejectRate > 20 ? 'High revision volume detected' : 'Standard engineering quality'}
        </div>
      </div>
    </div>
  );
};
