import React from 'react';
import { BarChart } from 'lucide-react';

interface EfficiencyMatrixProps {
  disciplines: any[];
}

export const EfficiencyMatrix: React.FC<EfficiencyMatrixProps> = ({ disciplines }) => {
  return (
    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fafafa' }}>
        <BarChart size={16} color="var(--text-secondary)" />
        <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Efficiency Matrix</h3>
      </div>
      <div className="table-scroll-area" style={{ maxHeight: '320px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: '24px', fontSize: '11px', textTransform: 'uppercase' }}>Discipline</th>
              <th style={{ textAlign: 'center', fontSize: '11px', textTransform: 'uppercase' }}>Vol</th>
              <th style={{ textAlign: 'center', fontSize: '11px', textTransform: 'uppercase' }}>Approved</th>
              <th style={{ textAlign: 'right', paddingRight: '24px', fontSize: '11px', textTransform: 'uppercase' }}>Avg Aging</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.map((d, i) => (
              <tr key={i}>
                <td style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', padding: '12px 24px' }}>
                  {d.name.split(' - ')[0]}
                </td>
                <td style={{ textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{d.total}</td>
                <td style={{ textAlign: 'center', fontSize: '13px', color: 'var(--status-a-text)', fontWeight: 800 }}>{d.approved}</td>
                <td style={{ textAlign: 'right', fontSize: '13px', fontWeight: 800, color: d.avgDays > 14 ? 'var(--status-c-text)' : 'var(--text-primary)', paddingRight: '24px' }}>
                  {d.avgDays}d
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
