import React from 'react';
import { Check, X, Link as LinkIcon, History } from 'lucide-react';
import type { DocumentRecord } from '../../types';
import { InlineInput } from '../common/InlineInput';
import { PreviewDropdown, IssueDropdown, TransmittalUnit } from './StatusDropdowns';
import { useDocuments } from '../../context/DocumentContext';
import { useUI } from '../../context/UIContext';

interface HistoryTableProps {
  doc: DocumentRecord;
  onClose?: () => void;
  hideDiscipline?: boolean;
  isCompact?: boolean;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({
  doc, onClose, hideDiscipline, isCompact = false
}) => {
  const { 
    documents, draftEdits, handleDraftChange, saveHistoryDraft, 
    cancelDraft, isDirty 
  } = useDocuments();

  const { setLinkModalData } = useUI();

  const uniqueLocations = React.useMemo(() => 
    Array.from(new Set(documents.map(d => d.lokasiStatus))).sort(),
    [documents]
  );

  if (!doc.history || doc.history.length === 0) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '11px', backgroundColor: '#f8fafc' }}>No history records found.</div>;
  }

  const containerStyle: React.CSSProperties = isCompact 
    ? { zoom: '0.9', width: '111.11%' } 
    : {};

  return (
    <div style={{ ...containerStyle, padding: '0', backgroundColor: 'var(--bg-surface)', borderBottom: '2px solid var(--border-color)' }}>
      <div style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-main)', borderTop: '1px dashed var(--border-color)', borderBottom: '1.5px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={14} color="var(--text-primary)" />
          <h4 style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Revision History: {doc.noDokumen}
          </h4>
        </div>
        {onClose && (
          <button onClick={onClose} className="btn" style={{ padding: '2px', border: 'none', background: 'transparent' }}>
            <X size={16} color="var(--text-secondary)" />
          </button>
        )}
      </div>
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', tableLayout: 'fixed' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--bg-main)', textAlign: 'left', color: 'var(--text-primary)' }}>
            <th style={{ width: '30px', paddingLeft: '8px', borderBottom: '1.5px solid var(--border-color)' }}></th>
            <th style={{ width: '40px', textAlign: 'center', borderBottom: '1.5px solid var(--border-color)' }}>No</th>
            {!hideDiscipline && <th style={{ width: '120px', borderBottom: '1.5px solid var(--border-color)' }}>Discipline</th>}
            <th style={{ width: '150px', borderBottom: '1.5px solid var(--border-color)' }}>Doc Number</th>
            <th className="wrap-text" style={{ width: '220px', borderBottom: '1.5px solid var(--border-color)' }}>Document Title</th>
            <th style={{ width: '100px', borderBottom: '1.5px solid var(--border-color)' }}>Status</th>
            <th style={{ width: '100px', borderBottom: '1.5px solid var(--border-color)' }}>Transmittal</th>
            <th style={{ width: '110px', borderBottom: '1.5px solid var(--border-color)' }}>Date</th>
            <th style={{ width: '160px', borderBottom: '1.5px solid var(--border-color)' }}>Issue Flow</th>
            <th style={{ width: '40px', textAlign: 'center', borderBottom: '1.5px solid var(--border-color)' }}>Rev</th>
            <th style={{ width: '120px', borderBottom: '1.5px solid var(--border-color)' }}>Location</th>
            <th style={{ width: '50px', textAlign: 'center', borderBottom: '1.5px solid var(--border-color)' }}>Link</th>
            <th style={{ width: '70px', textAlign: 'center', borderBottom: '1.5px solid var(--border-color)' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {[...doc.history]
            .sort((a,b) => (b.timestamp || 0) - (a.timestamp || 0)) // Newest first
            .map((log, lIdx) => {
              const isLogDirty = isDirty(log.id, log);
              const type = log.transmittalType?.toUpperCase() || '';
              const statusClass = (type === 'IN' ? 'row-status-ok' : type === 'OUT' ? 'row-status-alert' : '') + ' is-solid';
              
              return (
              <tr key={log.id} className={statusClass} style={{ borderBottom: '1.5px solid var(--border-color)', opacity: isLogDirty ? 0.9 : 1 }}>
                <td style={{ textAlign: 'center' }}></td>
                <td style={{ textAlign: 'center' }}>
                   {doc.history.length - lIdx}
                </td>
                {!hideDiscipline && (
                  <td style={{ verticalAlign: 'top', minWidth: '250px' }} className="wrap-text">
                    {doc.disiplin}
                  </td>
                )}
                <td style={{ padding: '6px', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'normal', wordBreak: 'break-all', fontSize: '10px' }}>{doc.noDokumen}</td>
                <td className="wrap-text" style={{ padding: '6px', color: 'var(--text-primary)', fontSize: '10px', lineHeight: '1.2' }}>
                  <div style={{ fontWeight: 600, marginBottom: '2px' }}>{doc.namaDokumen}</div>
                  <div style={{ fontSize: '9px', color: 'var(--text-secondary)', opacity: 0.7 }}>Log ID: {log.id} | {log.date}</div>
                </td>
                <td style={{ padding: '2px' }}>
                  <PreviewDropdown id={log.id} val={log.previewReport} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={true} />
                </td>
                <td style={{ padding: '2px' }}>
                  <TransmittalUnit id={log.id} typeVal={log.transmittalType} noVal={log.transmittalNo} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={true} />
                </td>
                <td style={{ padding: '2px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <InlineInput id={log.id} val={log.tanggalTransmittal} fieldKey="tanggalTransmittal" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="date" align="center" editable={true} />
                </td>
                <td style={{ padding: '2px' }}>
                  <IssueDropdown id={log.id} val={log.issue} draftEdits={draftEdits} onDraftChange={handleDraftChange} editable={true} />
                </td>
                <td style={{ padding: '2px', textAlign: 'center' }}>
                  <InlineInput id={log.id} val={log.noRevisi} fieldKey="noRevisi" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="number" align="center" bold editable={true} width="100%" />
                </td>
                <td style={{ padding: '2px' }}>
                  <InlineInput id={log.id} val={log.lokasiStatus} fieldKey="lokasiStatus" draftEdits={draftEdits} onDraftChange={handleDraftChange} type="select" options={uniqueLocations} editable={true} />
                </td>
                <td style={{ padding: '2px', textAlign: 'center' }}>
                   <div onClick={() => setLinkModalData({ id: log.id, link: log.deskripsiLink || '-', isHistory: true })} style={{ cursor: 'pointer', color: log.deskripsiLink && log.deskripsiLink !== '-' ? 'var(--accent)' : 'var(--text-secondary)' }}>
                     <LinkIcon size={12} />
                   </div>
                </td>
                <td style={{ padding: '2px', textAlign: 'center' }}>
                   <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                     {isDirty(log.id, log) ? (
                       <>
                         <button onClick={() => saveHistoryDraft(doc.id, log.id, draftEdits[log.id])} className="btn" style={{ color: 'var(--status-a-dot)', padding: '2px' }} title="Save Change"><Check size={12} /></button>
                         <button onClick={() => cancelDraft(log.id)} className="btn" style={{ color: 'var(--status-c-dot)', padding: '2px' }} title="Cancel"><X size={12} /></button>
                       </>
                     ) : (
                       <span style={{ color: 'var(--border-color)', fontSize: '10px' }}>-</span>
                     )}
                   </div>
                </td>
              </tr>
            )})}
        </tbody>
      </table>
      </div>
    </div>
  );
};
