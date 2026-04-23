import React from 'react';
import { RightSidebar } from '../common/RightSidebar';
import { HistoryTable } from './HistoryTable';
import { useDocuments } from '../../context/DocumentContext';

interface HistorySidebarProps {
  selectedDocId: string | null;
  onClose: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ selectedDocId, onClose }) => {
  const { documents } = useDocuments();

  const doc = documents.find(d => d.id === selectedDocId);

  return (
    <RightSidebar
      isOpen={!!selectedDocId}
      onClose={onClose}
      title="Revision History"
      width="1200px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <button className="btn" onClick={onClose} style={{ height: '32px', padding: '0 20px', fontSize: '11px', fontWeight: 700 }}>
            Tutup
          </button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {doc ? (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', backgroundColor: 'var(--accent-soft)', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '4px' }}>Document Reference</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{doc.noDokumen}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{doc.namaDokumen}</div>
            </div>
            
            <div style={{ flex: 1, overflow: 'auto' }}>
              <table className="data-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                <tbody>
                  <HistoryTable 
                    doc={doc}
                    hideDiscipline={true}
                  />
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Data dokumen tidak ditemukan.
          </div>
        )}
      </div>
    </RightSidebar>
  );
};
