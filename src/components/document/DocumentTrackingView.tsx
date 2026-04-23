import React from 'react';
import { ProjectSummaryCard } from './ProjectSummaryCard';
import { DocumentControlPanel } from './DocumentControlPanel';
import { DocumentTable } from './DocumentTable';
import { AddTransmittalSidebar } from './AddTransmittalSidebar';
import { Layers } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { useUI } from '../../context/UIContext';
import { useDocuments } from '../../context/DocumentContext';

export const DocumentTrackingView: React.FC = () => {
  const { currentProject } = useProjects();
  const { 
    activeFilters, 
    columnWidths,
    handleResizeStart,
    setIsBulkAddModalOpen: setIsModalOpen,
    toggleColumn,
    isReadOnly
  } = useUI();
  
  const {
    selectedDocIds,
    toggleSelectAll,
    handleBatchUpdate,
    filteredDocuments,
    setSelectedHistoryDocId
  } = useDocuments();

  const [isBatchSidebarOpen, setIsBatchSidebarOpen] = React.useState(false);

  // Stats calculation (purely visual derivation)
  const stats = React.useMemo(() => {
    const total = filteredDocuments.length;
    if (total === 0) return { total: 0, approved: 0, approvedPct: 0, approvedNote: 0, approvedNotePct: 0, pending: 0, pendingPct: 0 };
    
    const approved = filteredDocuments.filter(d => d.previewReport === 'A').length;
    const approvedNote = filteredDocuments.filter(d => d.previewReport === 'B').length;
    const pending = filteredDocuments.filter(d => d.previewReport === 'C').length;
    
    return {
      total,
      approved,
      approvedPct: Math.round((approved / total) * 100),
      approvedNote,
      approvedNotePct: Math.round((approvedNote / total) * 100),
      pending,
      pendingPct: Math.round((pending / total) * 100)
    };
  }, [filteredDocuments]);

  if (!currentProject) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>Project not found</h2>
        <p>Please select a valid project from the Workspace.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 'var(--gap-main)', 
      padding: isReadOnly ? '12px 16px' : 'var(--p-page)',
      height: '100%',
      flex: 1,
      minHeight: 0,
      overflow: 'hidden'
    }}>
      

      <div className="table-container" style={{ flex: 1, minHeight: 0 }}>
        <ProjectSummaryCard project={currentProject} stats={stats} isEmbedded={true} />
        {activeFilters.disiplin && (
          <div style={{ 
            padding: '12px 24px', 
            backgroundColor: '#ffffff', 
            borderBottom: '1px solid var(--border-color)', 
            fontSize: '14px', 
            fontWeight: 800, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            color: 'var(--accent)',
            letterSpacing: '0.02em'
          }}>
            <div style={{ width: '4px', height: '16px', backgroundColor: 'var(--accent)', borderRadius: '2px' }}></div>
            DESIGN DISCIPLINE: <span style={{ color: 'var(--text-primary)' }}>{activeFilters.disiplin}</span>
          </div>
        )}

        <DocumentControlPanel 
          setIsModalOpen={setIsModalOpen}
        />

        <DocumentTable 
          documents={filteredDocuments}
          columnWidths={columnWidths}
          handleResizeStart={handleResizeStart}
          toggleColumn={toggleColumn}
          setSelectedHistoryDocId={setSelectedHistoryDocId}
        />
      </div>

      {/* Floating Batch Action Trigger */}
      {selectedDocIds.size > 0 && !isReadOnly && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          backgroundColor: '#ffffff',
          padding: '12px 24px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          border: '1.5px solid var(--text-primary)',
          animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              backgroundColor: 'var(--accent)', 
              color: '#fff', 
              padding: '4px 10px',
              borderRadius: '8px', 
              fontSize: '12px',
              fontWeight: 900
            }}>
              {selectedDocIds.size}
            </div>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Dokumen Terpilih
            </span>
          </div>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => toggleSelectAll([], false)}
              className="btn"
              style={{ border: 'none', background: 'transparent', fontWeight: 700 }}
            >
              Batal
            </button>
            <button 
              onClick={() => setIsBatchSidebarOpen(true)}
              className="btn btn-primary"
              style={{ padding: '0 24px', height: '40px', borderRadius: '10px' }}
            >
              <Layers size={14} /> Add Transmittal
            </button>
          </div>
        </div>
      )}

      <AddTransmittalSidebar
        isOpen={isBatchSidebarOpen}
        selectedIds={Array.from(selectedDocIds)}
        documents={filteredDocuments}
        onApply={handleBatchUpdate}
        onClose={() => setIsBatchSidebarOpen(false)}
        uniqueLocations={Array.from(new Set(filteredDocuments.map(d => d.lokasiStatus).filter(Boolean))).sort()}
      />
    </div>
  );
};
