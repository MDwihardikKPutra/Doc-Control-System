import React from 'react';
import { Briefcase } from 'lucide-react';

interface ProjectSummaryCardProps {
  project: any;
  stats: {
    total: number;
    approved: number;
    approvedPct: number;
    approvedNote: number;
    approvedNotePct: number;
    pending: number;
    pendingPct: number;
  };
}

export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ project, stats }) => {
  return (
    <div className="card" style={{ padding: '0', marginBottom: '12px', overflow: 'hidden', border: 'var(--border-width) solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1.5fr', position: 'relative' }}>
      {/* Left Side: Project Details */}
      <div style={{ padding: '14px 20px', borderRight: 'var(--border-width) solid var(--border-color)', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Briefcase size={16} color="var(--accent)" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Reference</span>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: '1.2' }}>
            {project.code} <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>— {project.name}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Client</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{project.client || '-'}</div>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '2px' }}>Lead PM</div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{project.pm || '-'}</div>
          </div>
        </div>
      </div>

      {/* Right Side: Summary Metrics */}
      <div style={{ padding: '14px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#ffffff' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
           <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>Quick Metrics</span>
           <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)' }}>TOTAL: {stats.total} DOKUMEN</span>
         </div>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', border: 'var(--border-width) solid var(--border-color)', borderRadius: '8px' }}>
               <div style={{ fontSize: '8px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>APPROVED (A)</div>
               <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                 {stats.approved} <span style={{ fontSize: '11px', fontWeight: 700, color: '#10b981' }}>{stats.approvedPct}%</span>
               </div>
            </div>
            <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', border: 'var(--border-width) solid var(--border-color)', borderRadius: '8px' }}>
               <div style={{ fontSize: '8px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>W/ NOTES (B)</div>
               <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                 {stats.approvedNote} <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>{stats.approvedNotePct}%</span>
               </div>
            </div>
            <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', border: 'var(--border-width) solid var(--border-color)', borderRadius: '8px' }}>
               <div style={{ fontSize: '8px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>PENDING (C)</div>
               <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                 {stats.pending} <span style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444' }}>{stats.pendingPct}%</span>
               </div>
            </div>
         </div>
      </div>

      {/* Docked Progress Strip */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', display: 'flex' }}>
         <div style={{ width: `${stats.approvedPct}%`, backgroundColor: '#10b981', transition: 'width 0.5s ease' }} />
         <div style={{ width: `${stats.approvedNotePct}%`, backgroundColor: '#f59e0b', transition: 'width 0.5s ease' }} />
         <div style={{ width: `${stats.pendingPct}%`, backgroundColor: '#ef4444', transition: 'width 0.5s ease' }} />
      </div>
    </div>
  );
};
