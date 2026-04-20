import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { AppSidebar as Sidebar } from './components/layout/AppSidebar';
import { DocumentTrackingView } from './components/document/DocumentTrackingView';
import { ProjectInsights } from './components/project/ProjectInsights';
import { AuditLogPage } from './components/audit/AuditLogPage';
import { ProjectDashboard as ProjectManagementPage } from './components/project/ProjectDashboard';
import { BulkAddDocumentSidebar } from './components/document/BulkAddDocumentSidebar';
import { HistorySidebar } from './components/document/HistorySidebar';

import { useUI } from './context/UIContext';
import { useProjects } from './context/ProjectContext';
import { useDocuments } from './context/DocumentContext';
import { slugify } from './utils';

// New component to reset project context when entering Workspace
const WorkspaceSync: React.FC = () => {
  const { setCurrentProject } = useProjects();
  useEffect(() => {
    setCurrentProject(null);
  }, [setCurrentProject]);
  return <ProjectManagementPage />;
};

// Helper component to sync URL state with Global Context
const ProjectSync: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { currentProject, setCurrentProjectBySlug } = useProjects();

  useEffect(() => {
    if (projectSlug) {
      if (!currentProject || slugify(currentProject.name) !== projectSlug) {
        setCurrentProjectBySlug(projectSlug);
      }
    }
  }, [projectSlug, currentProject, setCurrentProjectBySlug]);

  if (!currentProject) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Project not found</h2>
        <p>Please select a valid project from the Workspace.</p>
      </div>
    );
  }

  return <Outlet />;
};

const App: React.FC = () => {
  const { 
    isSidebarCollapsed, 
    isBulkAddModalOpen, setIsBulkAddModalOpen
  } = useUI();
  
  const { currentProject } = useProjects();
  const { handleBulkSubmit, selectedHistoryDocId, setSelectedHistoryDocId } = useDocuments();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fcfcfc', color: 'var(--text-primary)', fontSmooth: 'antialiased' }}>
      <Sidebar />
      
      <main style={{ 
        flex: 1, 
        marginLeft: isSidebarCollapsed ? '64px' : 'var(--sidebar-width)', 
        transition: 'margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<WorkspaceSync />} />
          <Route path="/audit" element={<AuditLogPage />} />
          
          {/* Main Scoped Routes - placed at bottom to avoid conflicts */}
          <Route path="/:projectSlug/*" element={<ProjectSync />}>
            <Route path="tracking" element={<DocumentTrackingView />} />
            <Route path="insights" element={currentProject ? <ProjectInsights /> : null} />
          </Route>

          {/* Legacy/Fallback Redirects */}
           <Route path="/tracking" element={<Navigate to="/projects" replace />} />
        </Routes>
      </main>

      <BulkAddDocumentSidebar 
        isOpen={isBulkAddModalOpen} 
        onClose={() => setIsBulkAddModalOpen(false)}
        onSave={handleBulkSubmit}
      />

      <HistorySidebar 
        selectedDocId={selectedHistoryDocId} 
        onClose={() => setSelectedHistoryDocId(null)} 
      />
    </div>
  );
};

export default App;
