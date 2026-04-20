import React, { Fragment, useState } from 'react';
import { ChevronUp, ChevronDown, Check, X, History, Plus, Link as LinkIcon } from 'lucide-react';
import { InlineInput } from '../common/InlineInput';
import { PreviewDropdown, IssueDropdown, TransmittalUnit } from './StatusDropdowns';
import { HistoryTable } from './HistoryTable';
import { useUI } from '../../context/UIContext';
import { useDocuments } from '../../context/DocumentContext';
import { COLUMN_MAP } from './DocumentTable';

interface DocumentRowProps {
  doc: any;
  idx: number;
  isDimmed: boolean;
  isSelected: boolean;
  onToggleSelect: () => void;
  setSelectedHistoryDocId: (id: string | null) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({
  doc, idx, isDimmed, isSelected, onToggleSelect, setSelectedHistoryDocId
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleRow = () => setIsExpanded(!isExpanded);

  const { 
    visibleColumns, columnWidths, setLinkModalData 
  } = useUI();

  const {
    documents,
    draftEdits,
    handleDraftChange,
    saveDraft,
    cancelDraft,
    isDirty
  } = useDocuments();

  const uniqueLocations = React.useMemo(() => 
    Array.from(new Set(documents.map(d => d.lokasiStatus))).sort(),
    [documents]
  );

  const handleAddNewLocation = () => {
    const newLoc = window.prompt("Enter new Location name:");
    if (newLoc && newLoc.trim() !== '') {
       // Logic to add global location if needed
    }
  };

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
          opacity: isDimmed ? 0.35 : 1, 
          filter: isDimmed ? 'grayscale(0.8)' : 'none',
          backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.04)' : undefined
        }}
      >
        <td style={{ textAlign: 'center', width: '40px' }}>
          <input 
            type="checkbox" 
            checked={isSelected} 
            onChange={onToggleSelect}
            style={{ cursor: 'pointer', width: '14px', height: '14px' }}
          />
        </td>
        <td style={{ textAlign: 'center', width: columnWidths.control || 35 }}>
          <button onClick={toggleRow} className="btn" style={{ padding: '4px' }}>
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </td>
        <td style={{ textAlign: 'center', width: columnWidths.no || 45 }}>{idx + 1}</td>
        
        {Object.keys(COLUMN_MAP).map(colId => {
          if (!visibleColumns.has(colId)) {
            return <td key={`${colId}-col-${doc.id}`} style={{ width: '28px', padding: 0 }}></td>;
          }

          return (
            <td key={`${colId}-${doc.id}`} style={{
              paddingLeft: colId === 'disiplin' ? '8px' : colId === 'noRevisi' ? '4px' : undefined,
              paddingRight: colId === 'disiplin' ? '12px' : colId === 'noRevisi' ? '4px' : undefined,
              width: columnWidths[colId] || 150,
              minWidth: columnWidths[colId] || 150,
              whiteSpace: colId === 'tanggal' ? 'nowrap' : undefined,
              verticalAlign: 'middle'
            }} className={(colId === 'namaDokumen' || colId === 'disiplin' || colId === 'noDokumen') ? 'wrap-text' : undefined}>
              {colId === 'disiplin' && <InlineInput id={doc.id} val={doc.disiplin} fieldKey="disiplin" draftEdits={draftEdits} onDraftChange={handleDraftChange} multiline={true} width="100%" />}
              {colId === 'noDokumen' && <InlineInput id={doc.id} val={doc.noDokumen} fieldKey="noDokumen" draftEdits={draftEdits} onDraftChange={handleDraftChange} bold multiline={true} width="100%" fontSize="11px" />}
              {colId === 'namaDokumen' && <InlineInput id={doc.id} val={doc.namaDokumen} fieldKey="namaDokumen" draftEdits={draftEdits} onDraftChange={handleDraftChange} multiline={true} />}
              {colId === 'previewReport' && <PreviewDropdown id={doc.id} val={doc.previewReport} draftEdits={draftEdits} onDraftChange={handleDraftChange} />}
              {colId === 'transmittal' && <TransmittalUnit id={doc.id} typeVal={doc.transmittalType} noVal={doc.transmittalNo} draftEdits={draftEdits} onDraftChange={handleDraftChange} mainDocRef={doc} />}
              {colId === 'tanggal' && <InlineInput id={doc.id} val={doc.tanggalTransmittal} fieldKey="tanggalTransmittal" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="date" align="center" />}
              {colId === 'issue' && <IssueDropdown id={doc.id} val={doc.issue} draftEdits={draftEdits} onDraftChange={handleDraftChange} />}
              {colId === 'noRevisi' && <InlineInput id={doc.id} val={doc.noRevisi} fieldKey="noRevisi" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="number" align="center" bold width="100%" />}
              {colId === 'lokasiStatus' && <InlineInput id={doc.id} val={doc.lokasiStatus} fieldKey="lokasiStatus" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="select" options={uniqueLocations} onAddNewOption={handleAddNewLocation} />}
              {colId === 'deskripsiLink' && (
                <div onClick={() => setLinkModalData({ id: doc.id, link: doc.deskripsiLink, isHistory: false })} style={{ cursor: 'pointer', color: doc.deskripsiLink !== '-' ? '#3b82f6' : '#cbd5e1' }}>
                  <LinkIcon size={14} />
                </div>
              )}
            </td>
          );
        })}

        <td style={{ backgroundColor: isOuterDirty ? 'rgba(16, 185, 129, 0.1)' : 'transparent', textAlign: 'center', width: columnWidths.action || 80 }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {isOuterDirty ? (
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
                <button onClick={toggleRow} className="btn" style={{ opacity: 0.5, padding: '4px' }} title="Expand Dropdown">
                  <Plus size={14} />
                </button>
              </Fragment>
            )}
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr key={`expanded-${doc.id}`}>
          <td colSpan={14} style={{ padding: 0 }}>
            <HistoryTable 
              doc={doc} 
              hideDiscipline={true}
              isCompact={true}
            />
          </td>
        </tr>
      )}
    </Fragment>
  );
};
