import React, { Fragment, memo } from 'react';
import { ChevronUp, ChevronDown, Check, X, History, ExternalLink, Edit3 } from 'lucide-react';
import { InlineInput } from '../common/InlineInput';
import { PreviewDropdown, IssueDropdown, TransmittalUnit } from './StatusDropdowns';
import { HistoryTable } from './HistoryTable';
import { useUI } from '../../context/UIContext';
import type { LinkModalData } from '../../context/UIContext';
import { useDocuments } from '../../context/DocumentContext';
import { COLUMN_MAP } from './DocumentTable';
import type { DocumentRecord } from '../../types';

interface DocumentRowProps {
  doc: DocumentRecord;
  idx: number;
  isDimmed: boolean;
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: () => void;
  onToggleExpand: () => void;
  setSelectedHistoryDocId: (id: string | null) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = memo(({
  doc, idx, isDimmed, isSelected, isExpanded, onToggleSelect, onToggleExpand, setSelectedHistoryDocId
}) => {

  const { 
    visibleColumns, columnWidths, setLinkModalData, isReadOnly
  } = useUI();

  const {
    documents,
    draftEdits,
    handleDraftChange,
    saveDraft,
    cancelDraft,
    isDirty,
    uniqueLocations
  } = useDocuments();

  const isOuterDirty = isDirty(doc.id, doc);
  
  const isApproved = doc.previewReport === 'A';
  const isRejected = doc.previewReport === 'C';
  const transType = doc.transmittalType?.toUpperCase() || '';
  
  let statusClass = '';
  if (isApproved) {
    statusClass = 'row-status-ok';
  } else if (isRejected) {
    statusClass = 'row-status-alert';
  } else if (transType === 'IN') {
    statusClass = 'row-status-ok';
  } else if (transType === 'OUT') {
    statusClass = 'row-status-alert';
  }

  if (isExpanded) {
    statusClass += ' is-solid';
  }

  return (
    <Fragment>
      <tr 
        className={`${statusClass} ${isSelected ? 'row-selected' : ''}`}
        style={{ 
          opacity: isDimmed ? 0.25 : 1, 
          filter: isDimmed ? 'grayscale(1)' : 'none',
          backgroundColor: (isSelected ? 'rgba(59, 130, 246, 0.04)' : undefined),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: isDimmed ? 'none' : 'auto'
        }}
      >
        {!isReadOnly && (
          <td style={{ textAlign: 'left', paddingLeft: '8px', width: '40px' }}>
            <input 
              type="checkbox" 
              checked={isSelected} 
              onChange={onToggleSelect}
              disabled={isReadOnly}
              style={{ cursor: isReadOnly ? 'default' : 'pointer', width: '14px', height: '14px', opacity: isReadOnly ? 0.3 : 1 }}
            />
          </td>
        )}
        <td style={{ textAlign: 'left', paddingLeft: '8px', width: columnWidths.control || 35 }}>
          <button onClick={onToggleExpand} className="btn" style={{ padding: '4px' }}>
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </td>
        <td style={{ textAlign: 'left', paddingLeft: '8px', width: columnWidths.no || 40, minWidth: columnWidths.no || 40, maxWidth: columnWidths.no || 40 }}>{idx + 1}</td>
        
        {Object.keys(COLUMN_MAP).map(colId => {
          if (!visibleColumns.has(colId)) {
            return <td key={`${colId}-col-${doc.id}`} style={{ width: '28px', minWidth: '28px', maxWidth: '28px', padding: 0 }}></td>;
          }

          const widthKey = colId === 'previewReport' ? 'status' : colId === 'tanggal' ? 'tanggalTransmittal' : colId === 'deskripsiLink' ? 'link' : colId;
          const currentWidth = columnWidths[widthKey] || 150;

          return (
            <td key={`${colId}-${doc.id}`} 
              onClick={(colId === 'noDokumen' || colId === 'namaDokumen') ? onToggleExpand : undefined}
              style={{
                paddingLeft: '8px',
                paddingRight: colId === 'disiplin' ? '12px' : '4px',
                width: currentWidth,
                minWidth: currentWidth,
                maxWidth: currentWidth,
                whiteSpace: colId === 'tanggal' ? 'nowrap' : undefined,
                textAlign: 'left',
                cursor: (colId === 'noDokumen' || colId === 'namaDokumen') ? 'pointer' : 'default'
              }} className={(colId === 'namaDokumen' || colId === 'disiplin' || colId === 'noDokumen') ? 'wrap-text' : undefined}>
              {colId === 'disiplin' && <InlineInput id={doc.id} val={doc.disiplin} fieldKey="disiplin" draftEdits={draftEdits} onDraftChange={handleDraftChange} multiline={true} width="100%" editable={!isReadOnly} />}
              {colId === 'noDokumen' && <InlineInput id={doc.id} val={doc.noDokumen} fieldKey="noDokumen" draftEdits={draftEdits} onDraftChange={handleDraftChange} bold multiline={true} width="100%" fontSize="11px" editable={!isReadOnly} />}
              {colId === 'namaDokumen' && <InlineInput id={doc.id} val={doc.namaDokumen} fieldKey="namaDokumen" draftEdits={draftEdits} onDraftChange={handleDraftChange} bold multiline={true} editable={!isReadOnly} />}
              {colId === 'previewReport' && <PreviewDropdown id={doc.id} val={doc.previewReport} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={!isReadOnly} />}
              {colId === 'transmittal' && <TransmittalUnit id={doc.id} typeVal={doc.transmittalType} noVal={doc.transmittalNo} draftEdits={draftEdits} onDraftChange={handleDraftChange} mainDocRef={doc} editable={!isReadOnly} />}
              {colId === 'tanggal' && <InlineInput id={doc.id} val={doc.tanggalTransmittal} fieldKey="tanggalTransmittal" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="date" align="left" editable={!isReadOnly} />}
              {colId === 'issue' && <IssueDropdown id={doc.id} val={doc.issue} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={!isReadOnly} />}
              {colId === 'noRevisi' && <InlineInput id={doc.id} val={doc.noRevisi} fieldKey="noRevisi" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="number" align="left" bold width="100%" editable={!isReadOnly} />}
              {colId === 'lokasiStatus' && <InlineInput id={doc.id} val={doc.lokasiStatus} fieldKey="lokasiStatus" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="select" options={uniqueLocations} editable={!isReadOnly} />}
              {colId === 'deskripsiLink' && (
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <a 
                    href={doc.deskripsiLink && doc.deskripsiLink !== '-' ? (doc.deskripsiLink.startsWith('http') ? doc.deskripsiLink : `https://${doc.deskripsiLink}`) : undefined} 
                    onClick={(!doc.deskripsiLink || doc.deskripsiLink === '-') ? (e) => e.preventDefault() : undefined}
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      color: (doc.deskripsiLink && doc.deskripsiLink !== '-') ? 'var(--accent)' : '#e2e8f0', 
                      display: 'flex', 
                      alignItems: 'center',
                      cursor: (doc.deskripsiLink && doc.deskripsiLink !== '-') ? 'pointer' : 'default'
                    }}
                    title={(doc.deskripsiLink && doc.deskripsiLink !== '-') ? "Open Document" : "No Link Available"}
                  >
                    <ExternalLink size={14} />
                  </a>
                  <button 
                    onClick={() => !isReadOnly && setLinkModalData({ id: doc.id, link: doc.deskripsiLink, isHistory: false } satisfies LinkModalData)}
                    style={{ 
                      border: 'none', 
                      background: 'transparent', 
                      cursor: isReadOnly ? 'default' : 'pointer', 
                      color: '#94a3b8', 
                      padding: '4px', 
                      display: 'flex', 
                      alignItems: 'center',
                      opacity: isReadOnly ? 0.3 : 1
                    }}
                    title={isReadOnly ? undefined : "Edit Link"}
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              )}
            </td>
          );
        })}

        <td style={{ backgroundColor: isOuterDirty ? 'rgba(16, 185, 129, 0.1)' : 'transparent', textAlign: 'left', paddingLeft: '8px', width: columnWidths.action || 70, minWidth: columnWidths.action || 70, maxWidth: columnWidths.action || 70 }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start' }}>
            {isOuterDirty && !isReadOnly ? (
              <Fragment>
                <button onClick={() => saveDraft(doc.id)} className="btn" style={{ color: '#10b981', padding: '4px' }}><Check size={14} /></button>
                <button onClick={() => cancelDraft(doc.id)} className="btn" style={{ color: '#ef4444', padding: '4px' }}><X size={14} /></button>
              </Fragment>
            ) : (
              <Fragment>
                <button 
                  onClick={() => setSelectedHistoryDocId(doc.id)} 
                  className="btn" 
                  style={{ color: 'var(--accent)', opacity: 0.8, padding: '4px' }}
                  title="View Side History"
                >
                  <History size={14} />
                </button>
              </Fragment>
            )}
          </div>
        </td>
      </tr>
      {isExpanded && (
        <HistoryTable doc={doc} />
      )}
    </Fragment>
  );
});
