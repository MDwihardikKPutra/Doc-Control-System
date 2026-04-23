import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import { AppSidebar as Sidebar } from './components/layout/AppSidebar';
import { DocumentTrackingView } from './components/document/DocumentTrackingView';
import { ProjectInsights } from './components/project/ProjectInsights';
import { AuditLogPage } from './components/audit/AuditLogPage';
import { ProjectDashboard as ProjectManagementPage } from './components/project/ProjectDashboard';
import { BulkAddDocumentSidebar } from './components/document/BulkAddDocumentSidebar';
import { HistorySidebar } from './components/document/HistorySidebar';
import { HelpCenterPage } from './components/info/HelpCenterPage';
import { LinkModal } from './components/modals/FormModals';

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

// Share Sync: Sets the ReadOnly mode active
const ShareSync: React.FC = () => {
  const { setIsReadOnly } = useUI();
  useEffect(() => {
    setIsReadOnly(true);
    return () => setIsReadOnly(false);
  }, [setIsReadOnly]);
  return <DocumentTrackingView />;
};

const App: React.FC = () => {
  const { 
    isBulkAddModalOpen, setIsBulkAddModalOpen,
    linkModalData, setLinkModalData, linkInput, setLinkInput,
    isReadOnly
  } = useUI();
  
  const { currentProject } = useProjects();
  const { 
    handleBulkSubmit, selectedHistoryDocId, setSelectedHistoryDocId,
    handleUpdateLink
  } = useDocuments();

  // Prevent Sidebar flicker on share links by checking URL directly
  const isSharePath = window.location.pathname.includes('/share');
  const shouldShowSidebar = !isReadOnly && !isSharePath;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#eef2f6', color: 'var(--text-primary)', fontSmooth: 'antialiased' }}>
      {shouldShowSidebar && <Sidebar />}
      
        <main style={{ 
          flex: 1, 
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden'
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<WorkspaceSync />} />
          <Route path="/audit" element={<AuditLogPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          
          {/* Main Scoped Routes - placed at bottom to avoid conflicts */}
          <Route path="/:projectSlug/*" element={<ProjectSync />}>
            <Route path="tracking" element={<DocumentTrackingView />} />
            <Route path="share" element={<ShareSync />} />
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

      <LinkModal 
        modalData={linkModalData}
        linkInput={linkInput}
        setLinkInput={setLinkInput}
        onClose={() => setLinkModalData(null)}
        onSave={() => {
          if (linkModalData) {
            handleUpdateLink(
              linkModalData.id, 
              linkInput, 
              linkModalData.isHistory, 
              linkModalData.docId || selectedHistoryDocId || undefined
            );
            setLinkModalData(null);
          }
        }}
      />
    </div>
  );
};

export default App;
