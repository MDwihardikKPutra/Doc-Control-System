import React, { Fragment } from 'react';
import { Check, X, ExternalLink, Edit3, History as HistoryIcon } from 'lucide-react';
import type { DocumentRecord } from '../../types';
import { InlineInput } from '../common/InlineInput';
import { PreviewDropdown, IssueDropdown, TransmittalUnit } from './StatusDropdowns';
import { useDocuments } from '../../context/DocumentContext';
import { useUI } from '../../context/UIContext';
import type { LinkModalData } from '../../context/UIContext';
import { COLUMN_MAP } from './DocumentTable';

interface HistoryTableProps {
  doc: DocumentRecord;
  hideDiscipline?: boolean;
}

/**
 * Re-built HistoryTable that renders as a sequence of <tr> elements
 * to perfectly align with the parent table's columns.
 */
export const HistoryTable: React.FC<HistoryTableProps> = ({ doc, hideDiscipline = false }) => {
  const { 
    draftEdits, handleDraftChange, saveHistoryDraft, 
    cancelDraft, isDirty, uniqueLocations
  } = useDocuments();

  const { setLinkModalData, isReadOnly, columnWidths, visibleColumns } = useUI();

  if (!doc.history || doc.history.length === 0) {
    return (
      <tr>
        <td colSpan={100} style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '11px', backgroundColor: '#f8fafc' }}>
          No history records found.
        </td>
      </tr>
    );
  }

  return (
    <Fragment>
      {/* Sub-Header Row for History - Perfectly symmetrical */}
      <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
        {!isReadOnly && <td style={{ width: '40px', minWidth: '40px', maxWidth: '40px', padding: 0 }}></td>}
        <td style={{ width: columnWidths.control || 35, minWidth: columnWidths.control || 35, maxWidth: columnWidths.control || 35, padding: 0 }}></td>
        <td style={{ 
          width: columnWidths.no || 40, 
          minWidth: columnWidths.no || 40, 
          maxWidth: columnWidths.no || 40, 
          fontSize: '9px', 
          fontWeight: 800, 
          color: 'var(--text-secondary)', 
          textTransform: 'uppercase', 
          paddingLeft: '8px' 
        }}>No</td>
        
        {Object.keys(COLUMN_MAP).map(colId => {
          if (!visibleColumns.has(colId)) return <td key={`h-head-${colId}`} style={{ width: '28px', minWidth: '28px', maxWidth: '28px', padding: 0 }}></td>;
          const widthKey = colId === 'previewReport' ? 'status' : colId === 'tanggal' ? 'tanggalTransmittal' : colId === 'deskripsiLink' ? 'link' : colId;
          const w = columnWidths[widthKey] || 150;
          // Hide discipline label if hideDiscipline is set
          const label = (hideDiscipline && colId === 'disiplin') ? '' : COLUMN_MAP[colId];
          return (
            <td key={`h-head-${colId}`} style={{ 
              width: w,
              minWidth: w,
              maxWidth: w,
              fontSize: '9px', 
              fontWeight: 800, 
              color: 'var(--text-secondary)', 
              textTransform: 'uppercase', 
              paddingLeft: '8px',
              paddingRight: colId === 'disiplin' ? '12px' : '4px'
            }}>
              {label}
            </td>
          );
        })}
        <td style={{ 
          width: columnWidths.action || 70, 
          minWidth: columnWidths.action || 70, 
          maxWidth: columnWidths.action || 70, 
          fontSize: '9px', 
          fontWeight: 800, 
          color: 'var(--text-secondary)', 
          textTransform: 'uppercase', 
          paddingLeft: '8px' 
        }}>Action</td>
      </tr>


      {/* History Data Rows */}
      {[...doc.history]
        .sort((a,b) => (b.timestamp || 0) - (a.timestamp || 0))
        .map((log, lIdx, sortedHistory) => {
          const type = log.transmittalType?.toUpperCase() || '';
          const isIn = type === 'IN';
          const isOut = type === 'OUT';
          const rowBg = isIn ? 'rgba(16, 185, 129, 0.08)' : isOut ? 'rgba(239, 68, 68, 0.08)' : 'transparent';

          return (
            <tr key={log.id} style={{ 
              backgroundColor: rowBg,
              borderBottom: '1px solid var(--border-color)'
            }}>
              {!isReadOnly && (
                <td style={{ width: '40px', minWidth: '40px', maxWidth: '40px', padding: 0 }}></td>
              )}
              <td style={{ width: columnWidths.control || 35, minWidth: columnWidths.control || 35, maxWidth: columnWidths.control || 35, padding: 0 }}></td>
              <td style={{ 
                width: columnWidths.no || 40, 
                minWidth: columnWidths.no || 40, 
                maxWidth: columnWidths.no || 40, 
                paddingLeft: '8px', 
                paddingRight: '4px', 
                fontSize: '11px', 
                color: 'var(--text-secondary)',
                verticalAlign: 'middle' 
              }}>
                {sortedHistory.length - lIdx}
              </td>

              {Object.keys(COLUMN_MAP).map(colId => {
                if (!visibleColumns.has(colId)) {
                  return <td key={`hc-${log.id}-${colId}`} style={{ width: '28px', minWidth: '28px', maxWidth: '28px', padding: 0 }}></td>;
                }

                const widthKey = colId === 'previewReport' ? 'status' : colId === 'tanggal' ? 'tanggalTransmittal' : colId === 'deskripsiLink' ? 'link' : colId;
                const w = columnWidths[widthKey] || 150;

                return (
                  <td key={`hc-${log.id}-${colId}`} style={{
                    width: w,
                    minWidth: w,
                    maxWidth: w,
                    paddingLeft: '8px',
                    paddingRight: colId === 'disiplin' ? '12px' : '4px',
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    verticalAlign: 'middle'
                  }}>
                    {colId === 'disiplin' && (
                      hideDiscipline 
                        ? null 
                        : <div style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>{doc.disiplin}</div>
                    )}
                    {colId === 'noDokumen' && (
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '10px', wordBreak: 'break-all' }}>
                        {doc.noDokumen}
                      </div>
                    )}
                    {colId === 'namaDokumen' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '10px', lineHeight: '1.2' }}>{doc.namaDokumen}</div>
                        <div style={{ fontSize: '8px', color: 'var(--text-secondary)', opacity: 0.7 }}>
                          ID: {log.id} | {log.date}
                        </div>
                      </div>
                    )}
                    {colId === 'previewReport' && (
                      <PreviewDropdown id={log.id} val={log.previewReport} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={!isReadOnly} />
                    )}
                    {colId === 'transmittal' && (
                      <TransmittalUnit id={log.id} typeVal={log.transmittalType} noVal={log.transmittalNo} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={!isReadOnly} />
                    )}
                    {colId === 'tanggal' && (
                      <InlineInput id={log.id} val={log.tanggalTransmittal} fieldKey="tanggalTransmittal" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="date" align="left" editable={!isReadOnly} />
                    )}
                    {colId === 'issue' && (
                      <IssueDropdown id={log.id} val={log.issue} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={!isReadOnly} />
                    )}
                    {colId === 'noRevisi' && (
                      <InlineInput id={log.id} val={log.noRevisi} fieldKey="noRevisi" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="number" align="left" bold editable={!isReadOnly} width="100%" />
                    )}
                    {colId === 'lokasiStatus' && (
                      <InlineInput id={log.id} val={log.lokasiStatus} fieldKey="lokasiStatus" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="select" options={uniqueLocations} editable={!isReadOnly} />
                    )}
                    {colId === 'deskripsiLink' && (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <a 
                          href={log.deskripsiLink && log.deskripsiLink !== '-' ? (log.deskripsiLink.startsWith('http') ? log.deskripsiLink : `https://${log.deskripsiLink}`) : undefined} 
                          onClick={(!log.deskripsiLink || log.deskripsiLink === '-') ? (e) => e.preventDefault() : undefined}
                          target="_blank" 
                          rel="noreferrer"
                          style={{ 
                            color: (log.deskripsiLink && log.deskripsiLink !== '-') ? 'var(--accent)' : '#e2e8f0', 
                            display: 'flex', 
                            cursor: (log.deskripsiLink && log.deskripsiLink !== '-') ? 'pointer' : 'default'
                          }}
                          title={(log.deskripsiLink && log.deskripsiLink !== '-') ? "Open Document" : "No Link Available"}
                        >
                          <ExternalLink size={12} />
                        </a>
                        <button 
                          onClick={() => !isReadOnly && setLinkModalData({ id: log.id, link: log.deskripsiLink || '-', isHistory: true, docId: doc.id } satisfies LinkModalData)}
                          style={{ border: 'none', background: 'transparent', cursor: isReadOnly ? 'default' : 'pointer', color: '#94a3b8', opacity: isReadOnly ? 0.3 : 1 }}
                          title={isReadOnly ? undefined : "Edit Link"}
                        >
                          <Edit3 size={12} />
                        </button>
                      </div>
                    )}
                  </td>
                );
              })}

              <td style={{ width: columnWidths.action || 70, padding: '8px 0', paddingLeft: '8px', verticalAlign: 'middle' }}>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-start' }}>
                  {isDirty(log.id, log) && !isReadOnly ? (
                    <Fragment>
                      <button onClick={() => saveHistoryDraft(doc.id, log.id, draftEdits[log.id])} className="btn" style={{ color: 'var(--status-a-dot)', padding: '2px' }} title="Save Change"><Check size={12} /></button>
                      <button onClick={() => cancelDraft(log.id)} className="btn" style={{ color: 'var(--status-c-dot)', padding: '2px' }} title="Cancel"><X size={12} /></button>
                    </Fragment>
                  ) : (
                    <span style={{ color: 'var(--border-color)', fontSize: '10px' }}>-</span>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
    </Fragment>
  );
};
