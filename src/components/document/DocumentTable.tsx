import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { useState, useCallback } from 'react';
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
  const { visibleColumns, isReadOnly } = useUI();
  const { selectedDocIds, toggleSelectAll, toggleSelectDoc } = useDocuments();
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedDocId(prev => (prev === id ? null : id));
  }, []);
  
  const allDocIds = documents.map(d => d.id);
  const isAllSelected = allDocIds.length > 0 && allDocIds.every(id => selectedDocIds.has(id));

  return (
    <div className="table-scroll-area">
      <table className="data-table">
        <thead>
          <tr style={{ position: 'sticky', top: 0, zIndex: 20 }}>
            {!isReadOnly && (
              <th key="select-head" className="col-select" style={{ width: '40px', textAlign: 'left', paddingLeft: '8px' }}>
                <input 
                  type="checkbox" 
                  checked={isAllSelected} 
                  onChange={() => !isReadOnly && toggleSelectAll(allDocIds, !isAllSelected)}
                  disabled={isReadOnly}
                  style={{ cursor: isReadOnly ? 'default' : 'pointer', width: '14px', height: '14px', opacity: isReadOnly ? 0.3 : 1 }}
                />
              </th>
            )}
            <th key="control-head" className="col-control" style={{ width: columnWidths.control || 35 }}>-</th>
            <th key="no-head" className="col-no" style={{ width: columnWidths.no || 40, minWidth: columnWidths.no || 40, maxWidth: columnWidths.no || 40 }}>No</th>
            {Object.entries(COLUMN_MAP).map(([colId, label]) => {
               const widthKey = colId === 'previewReport' ? 'status' : colId === 'tanggal' ? 'tanggalTransmittal' : colId === 'deskripsiLink' ? 'link' : colId;
               return visibleColumns.has(colId) ? (
                 <th key={colId} style={{
                   width: columnWidths[widthKey] || 150,
                   minWidth: columnWidths[widthKey] || 150,
                   maxWidth: columnWidths[widthKey] || 150,
                 }} className={colId === 'namaDokumen' ? 'wrap-text' : undefined}>
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                     {label}
                     <Minus 
                      size={12} 
                      style={{ 
                        cursor: 'pointer', 
                        opacity: 0.6, 
                        flexShrink: 0 
                      }} 
                      onClick={() => toggleColumn(colId)} 
                     />
                   </div>
                   <div 
                     className="resizer-handle" 
                     onMouseDown={(e) => handleResizeStart(e, colId)}
                   />
                 </th>
               ) : (
                 <th key={colId} style={{ width: '28px', minWidth: '28px', maxWidth: '28px', padding: '0 2px', textAlign: 'center', cursor: 'pointer' }} onClick={() => toggleColumn(colId)} title={`Show ${label}`}>
                   <Plus size={12} color="#94a3b8" />
                 </th>
               );
             })}
            <th key="action-head" style={{ width: columnWidths.action || 70, minWidth: columnWidths.action || 70, maxWidth: columnWidths.action || 70, textAlign: 'left', paddingLeft: '12px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, idx) => (
            <DocumentRow 
              key={doc.id}
              doc={doc}
              idx={idx}
              isExpanded={expandedDocId === doc.id}
              isDimmed={expandedDocId !== null && expandedDocId !== doc.id}
              isSelected={selectedDocIds.has(doc.id)}
              onToggleSelect={() => !isReadOnly && toggleSelectDoc(doc.id)}
              onToggleExpand={() => handleToggleExpand(doc.id)}
              setSelectedHistoryDocId={setSelectedHistoryDocId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
