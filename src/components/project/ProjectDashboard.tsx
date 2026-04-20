import React, { useState } from 'react';
import { Plus, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { useAudit } from '../../context/AuditContext';
import { useNavigate } from 'react-router-dom';
import { AddProjectSidebar } from './AddProjectSidebar';
import { slugify } from '../../utils';

export const ProjectDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    projects, addProject, updateProject, deleteProject, 
    setCurrentProject 
  } = useProjects();
  const { addLog } = useAudit();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleSelectProject = (proj: any) => {
    setCurrentProject(proj);
    navigate(`/${slugify(proj.name)}/tracking`);
  };

  const handleAddClick = () => {
    setEditingProject(null);
    setIsSidebarOpen(true);
  };

  const handleEditClick = (proj: any) => {
    setEditingProject(proj);
    setIsSidebarOpen(true);
  };

  const handleProjectSubmit = (data: any, editingId: string | null) => {
    if (editingId) {
      if (updateProject(editingId, data)) {
        addLog('PROJECT', 'UPDATE', `Updated project ${data.code}`, `Modified details for ${data.name}`, { projectId: editingId });
        setIsSidebarOpen(false);
      }
    } else {
      if (addProject(data)) {
        addLog('PROJECT', 'CREATE', `Created project ${data.code}`, data.name);
        setIsSidebarOpen(false);
      }
    }
  };

  return (
    <div style={{ padding: 'var(--p-page)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.02em' }}>Workspace</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{projects.length} Active Projects & Portfolios</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddClick} style={{ padding: '0 24px', height: '40px', borderRadius: '10px' }}>
          <Plus size={14} /> New Project
        </button>
      </div>

      <div className="table-container" style={{ borderRadius: 'var(--radius-main)' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '120px', paddingLeft: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Code</th>
              <th style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Project Description</th>
              <th style={{ width: '180px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Client</th>
              <th style={{ width: '150px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lead</th>
              <th style={{ width: '120px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ width: '100px', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Actions</th>
              <th style={{ width: '60px' }}></th>
            </tr>
          </thead>
          <tbody>
            {projects.map(proj => (
              <tr key={proj.id} style={{ cursor: 'pointer' }} onClick={() => handleSelectProject(proj)}>
                <td style={{ fontWeight: 800, color: 'var(--accent)', paddingLeft: '24px' }}>{proj.code}</td>
                <td style={{ padding: '16px 12px' }}>
                  <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '14px' }}>{proj.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{proj.description}</div>
                </td>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{proj.client || '-'}</td>
                <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{proj.pm || '-'}</td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ 
                    fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px',
                    backgroundColor: proj.status === 'Active' ? 'var(--status-a-bg)' : 'var(--status-c-bg)',
                    color: proj.status === 'Active' ? 'var(--status-a-text)' : 'var(--status-c-text)',
                    border: '1px solid var(--border-color)',
                    display: 'inline-block'
                  }}>
                    {proj.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button 
                      className="btn" 
                      style={{ padding: '8px', color: 'var(--text-secondary)', border: 'none', background: 'transparent', borderRadius: '8px' }} 
                      onClick={(e) => { e.stopPropagation(); handleEditClick(proj); }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-soft)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="btn" 
                      style={{ padding: '8px', color: 'var(--status-c-text)', border: 'none', background: 'transparent', borderRadius: '8px' }} 
                      onClick={(e) => { e.stopPropagation(); deleteProject(proj.id); addLog('PROJECT', 'DELETE', `Deleted project ${proj.code}`, '', { projectId: proj.id }); }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--status-c-bg)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <ChevronRight size={16} color="var(--text-secondary)" />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                   No active projects. Start by creating a new repository.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        initialData={editingProject}
        onSubmit={(data) => handleProjectSubmit(data, editingProject?.id || null)}
      />
    </div>
  );
};
