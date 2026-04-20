import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { DocumentRow } from './DocumentRow';
import { useUI } from '../../context/UIContext';
import { useDocuments } from '../../context/DocumentContext';

export const COLUMN_MAP: Record<string, string> = {
  disiplin: 'Discipline',
  noDokumen: 'Doc No',
  namaDokumen: 'Document Title',
  previewReport: 'Status',
  transmittal: 'Transmittal',
  tanggal: 'Date',
  issue: 'Issue',
  noRevisi: 'Rev',
  lokasiStatus: 'Location',
  deskripsiLink: 'Link'
};

interface DocumentTableProps {
  documents: any[];
  columnWidths: Record<string, number>;
  handleResizeStart: (e: React.MouseEvent, id: string) => void;
  toggleColumn: (colId: string) => void;
  setSelectedHistoryDocId: (id: string | null) => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  documents, columnWidths, handleResizeStart, toggleColumn, setSelectedHistoryDocId
}) => {
  const { visibleColumns } = useUI();
  const { selectedDocIds, toggleSelectAll, toggleSelectDoc } = useDocuments();
  
  const allDocIds = documents.map(d => d.id);
  const isAllSelected = allDocIds.length > 0 && allDocIds.every(id => selectedDocIds.has(id));

  return (
    <div className="table-scroll-area">
      <table className="data-table">
        <thead>
          <tr style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: '#fafafa' }}>
            <th key="select-head" style={{ width: '40px', textAlign: 'center', borderBottom: '1.5px solid var(--border-color)' }}>
              <input 
                type="checkbox" 
                checked={isAllSelected} 
                onChange={() => toggleSelectAll(allDocIds, !isAllSelected)}
                style={{ cursor: 'pointer', width: '14px', height: '14px' }}
              />
            </th>
            <th key="control-head" style={{ width: columnWidths.control || 35 }}>-</th>
            <th key="no-head" style={{ width: columnWidths.no || 45 }}>No</th>
            {Object.entries(COLUMN_MAP).map(([colId, label]) => {
               return visibleColumns.has(colId) ? (
                 <th key={colId} style={{
                   width: columnWidths[colId] || 150,
                   textAlign: (colId === 'noRevisi' || colId === 'deskripsiLink') ? 'center' : undefined,
                   paddingLeft: colId === 'disiplin' ? '8px' : undefined,
                   paddingRight: colId === 'disiplin' ? '12px' : undefined
                 }} className={colId === 'namaDokumen' ? 'wrap-text' : undefined}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: (colId === 'noRevisi' || colId === 'deskripsiLink') ? 'center' : 'space-between', gap: '4px' }}>
                     {label}
                     <Minus size={12} style={{ cursor: 'pointer', opacity: 0.3, flexShrink: 0 }} onClick={() => toggleColumn(colId)} />
                   </div>
                   <div 
                     className="resizer-handle" 
                     onMouseDown={(e) => handleResizeStart(e, colId)}
                   />
                 </th>
               ) : (
                 <th key={colId} style={{ width: '28px', padding: '0 2px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f1f5f9' }} onClick={() => toggleColumn(colId)} title={`Show ${label}`}>
                   <Plus size={12} color="#64748b" />
                 </th>
               );
             })}
            <th key="action-head" style={{ width: columnWidths.action || 80, textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, idx) => (
            <DocumentRow 
              key={doc.id}
              doc={doc}
              idx={idx}
              isDimmed={false}
              isSelected={selectedDocIds.has(doc.id)}
              onToggleSelect={() => toggleSelectDoc(doc.id)}
              setSelectedHistoryDocId={setSelectedHistoryDocId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
