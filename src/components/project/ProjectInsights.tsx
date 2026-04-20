import React, { useMemo, useState } from 'react';
import { Clock } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { useDocuments } from '../../context/DocumentContext';
import { DocumentService } from '../../services/documentService';

// Sub-components
import { KPISection } from './insights/KPISection';
import { ApprovalJourneyChart } from './insights/ApprovalJourneyChart';
import { EfficiencyMatrix } from './insights/EfficiencyMatrix';
import { StatusDistribution } from './insights/StatusDistribution';

export const ProjectInsights: React.FC = () => {
  const { projects, currentProject, setCurrentProjectById } = useProjects();
  const { documents } = useDocuments();
  
  const [selectedProjectId, setSelectedProjectId] = useState<string>(currentProject?.id || '');

  React.useEffect(() => {
    if (currentProject?.id && currentProject.id !== selectedProjectId) {
      setSelectedProjectId(currentProject.id);
    }
  }, [currentProject?.id]);

  const selectedProject = useMemo(() => 
    projects.find(p => p.id === selectedProjectId),
  [projects, selectedProjectId]);

  const stats = useMemo(() => {
    if (!selectedProjectId) return null;
    return DocumentService.calculateProjectStats(documents, selectedProjectId);
  }, [documents, selectedProjectId]);

  if (!currentProject || !stats) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Project not found</h2>
        <p>Please select a valid project from the Workspace.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 'var(--p-page)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Project Insights</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Performance analytics for <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedProject?.name}</span></p>
        </div>
        <select 
          value={selectedProjectId} 
          onChange={(e) => {
            const pid = e.target.value;
            setSelectedProjectId(pid);
            setCurrentProjectById(pid);
          }}
          className="form-select"
          style={{ width: '320px', fontWeight: 700 }}
        >
          {projects.map(p => <option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
        </select>
      </div>

      <KPISection stats={stats} />

      <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '24px' }}>
        <ApprovalJourneyChart journeyData={stats.journeyData} total={stats.total} />
        <StatusDistribution stats={stats} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Simple Aging Summary */}
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '0.05em' }}>
              <Clock size={16} /> Lead Time Distribution
            </h3>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)' }}>AVG DAYS TO COMPLETE</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stats.disciplines.slice(0, 5).map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{d.name.split(' - ')[0]}</span>
                  <span style={{ fontWeight: 900, color: d.avgDays > 14 ? 'var(--status-c-text)' : 'var(--text-secondary)' }}>{d.avgDays} Days</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, (d.avgDays / 30) * 100)}%`, backgroundColor: d.avgDays > 14 ? 'var(--status-c-text)' : 'var(--accent)', transition: 'width 1s ease-out' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <EfficiencyMatrix disciplines={stats.disciplines} />
      </div>
    </div>
  );
};
