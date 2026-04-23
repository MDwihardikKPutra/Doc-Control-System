import React, { useState, useEffect, useMemo } from 'react';
import { RightSidebar } from '../common/RightSidebar';
import { PreviewDropdown, IssueDropdown } from './StatusDropdowns';
import type { DocumentRecord } from '../../types';

interface AddTransmittalSidebarProps {
  isOpen: boolean;
  selectedIds: string[];
  documents: DocumentRecord[];
  onApply: (updates: { id: string, fields: any }[]) => void;
  onClose: () => void;
  uniqueLocations: string[];
}

interface BatchRow {
  id: string;
  docNo: string;
  docName: string;
  transmittalNo: string;
  previewReport: string;
  issue: string;
  noRevisi: number;
}

export const AddTransmittalSidebar: React.FC<AddTransmittalSidebarProps> = ({
  isOpen, selectedIds, documents, onApply, onClose, uniqueLocations
}) => {
  const [globalType, setGlobalType] = useState('IN');
  const [globalDate, setGlobalDate] = useState(new Date().toISOString().split('T')[0]);
  const [globalLocation, setGlobalLocation] = useState('IDS (PT INFORMATION DATASYSTEM)');
  const [globalTransmittalNo, setGlobalTransmittalNo] = useState('');
  const [rowItems, setRowItems] = useState<BatchRow[]>([]);

  const allDocIds = useMemo(() => documents.map(d => d.id), [documents]);

  // Initialize rows when sidebar opens or selection changes
  useEffect(() => {
    if (isOpen) {
      const selectedDocs = documents.filter(d => selectedIds.includes(d.id));
      const initialRows: BatchRow[] = selectedDocs.map(doc => ({
        id: doc.id,
        docNo: doc.noDokumen,
        docName: doc.namaDokumen,
        transmittalNo: doc.transmittalNo || '',
        previewReport: doc.previewReport || 'A',
        issue: doc.issue || 'IFA - For Approval',
        noRevisi: doc.noRevisi || 0
      }));
      setRowItems(initialRows);
    }
  }, [isOpen, selectedIds, documents]);

  const updateRow = (id: string, field: keyof BatchRow, value: any) => {
    setRowItems(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleApply = () => {
    // Validation: Require key fields
    if (!globalTransmittalNo.trim()) {
      alert("Nomor Transmittal wajib diisi.");
      return;
    }
    if (!globalDate) {
      alert("Tanggal wajib diisi.");
      return;
    }
    if (!globalLocation) {
      alert("Lokasi wajib dipilih.");
      return;
    }

    const updates = rowItems.map(row => ({
      id: row.id,
      fields: {
        transmittalType: globalType,
        tanggalTransmittal: globalDate,
        lokasiStatus: globalLocation,
        transmittalNo: globalTransmittalNo || row.transmittalNo,
        previewReport: row.previewReport,
        issue: row.issue,
        noRevisi: row.noRevisi
      }
    }));
    onApply(updates);
    onClose();
  };

  return (
    <RightSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Mass Update Spreadsheet"
      width="1000px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontSize: '13px' }}>
        
        {/* COMPACT HEADER AT TOP */}
        <div style={{ 
          padding: '8px 20px', 
          borderBottom: '1px solid var(--border-color)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ backgroundColor: 'var(--text-primary)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
              {rowItems.length} Docs
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700 }}>BATCH EDITOR</div>
          </div>
        </div>

        <div style={{ padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          
          {/* GLOBAL DEFAULTS - ULTRA CLEAN */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '12px',
            padding: '6px 12px',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            border: '1px solid var(--border-color)'
          }}>
            <div className="form-group" style={{ gap: '2px' }}>
              <label className="form-label" style={{ color: 'var(--text-primary)', fontSize: '9px', fontWeight: 900 }}>TIPE</label>
              <div style={{ display: 'flex', gap: '2px', backgroundColor: '#f8fafc', padding: '2px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                {['IN', 'OUT'].map(t => (
                  <button
                    key={t}
                    onClick={() => setGlobalType(t)}
                    style={{
                      flex: 1,
                      padding: '2px 0',
                      borderRadius: '3px',
                      border: 'none',
                      fontSize: '10px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      backgroundColor: globalType === t ? '#fff' : 'transparent',
                      color: globalType === t ? 'var(--accent)' : 'var(--text-secondary)',
                      boxShadow: globalType === t ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group" style={{ gap: '2px' }}>
              <label className="form-label" style={{ color: 'var(--text-primary)', fontSize: '9px', fontWeight: 900 }}>TANGGAL</label>
              <input 
                type="date"
                className="form-input"
                value={globalDate}
                onChange={e => setGlobalDate(e.target.value)}
                style={{ height: '28px', backgroundColor: '#f8fafc', fontSize: '11px', padding: '0 6px' }}
              />
            </div>

            <div className="form-group" style={{ gap: '2px' }}>
              <label className="form-label" style={{ color: 'var(--text-primary)', fontSize: '9px', fontWeight: 900 }}>LOKASI</label>
              <select 
                className="form-input"
                value={globalLocation} 
                onChange={e => setGlobalLocation(e.target.value)}
                style={{ height: '28px', backgroundColor: '#f8fafc', fontWeight: 600, fontSize: '10px', padding: '0 4px' }}
              >
                <option value="">Pilih Lokasi...</option>
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                <option value="IDS (PT INFORMATION DATASYSTEM)">IDS (PT INFORMATION DATASYSTEM)</option>
                <option value="CLIENT SITE">CLIENT SITE</option>
              </select>
            </div>

            <div className="form-group" style={{ gap: '2px' }}>
              <label className="form-label" style={{ color: 'var(--text-primary)', fontSize: '9px', fontWeight: 900 }}>NO TRANSMITTAL</label>
              <input 
                type="text"
                className="form-input"
                value={globalTransmittalNo}
                onChange={e => {
                  const val = e.target.value;
                  setGlobalTransmittalNo(val);
                  // Apply to all rows immediately for visual feedback
                  setRowItems(prev => prev.map(row => ({ ...row, transmittalNo: val })));
                }}
                style={{ height: '28px', backgroundColor: '#f8fafc', fontWeight: 700, fontSize: '11px', padding: '0 8px' }}
              />
            </div>
          </div>

          {/* SPREADSHEET TABLE - CLEAN & MINIMAL */}
          <div style={{ 
            border: '1px solid var(--border-color)', 
            borderRadius: '12px', 
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', backgroundColor: '#fff' }}>
                  <th style={{ padding: '4px 12px', textAlign: 'left', fontSize: '9px', fontWeight: 900, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>DOKUMEN</th>
                  <th style={{ padding: '4px 12px', textAlign: 'left', fontSize: '9px', fontWeight: 900, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>STATUS</th>
                  <th style={{ padding: '4px 12px', textAlign: 'left', fontSize: '9px', fontWeight: 900, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>ISSUE FLOW</th>
                  <th style={{ padding: '4px 12px', textAlign: 'center', fontSize: '9px', fontWeight: 900, color: 'var(--text-secondary)', letterSpacing: '0.05em', width: '60px' }}>REV</th>
                </tr>
              </thead>
              <tbody>
                {rowItems.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: idx === rowItems.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                    <td style={{ padding: '4px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '11px', color: 'var(--text-primary)', marginBottom: '1px' }}>{row.docNo}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', opacity: 0.8 }}>{row.docName}</div>
                    </td>
                    <td style={{ padding: '2px 12px' }}>
                      <PreviewDropdown 
                        id={row.id} 
                        val={row.previewReport} 
                        draftEdits={{}} 
                        onDraftChange={(_id, _f, v) => updateRow(row.id, 'previewReport', v)} 
                      />
                    </td>
                    <td style={{ padding: '2px 12px' }}>
                      <IssueDropdown 
                        id={row.id} 
                        val={row.issue} 
                        draftEdits={{}} 
                        onDraftChange={(_id, _f, v) => updateRow(row.id, 'issue', v)} 
                      />
                    </td>
                    <td style={{ padding: '2px 12px', textAlign: 'center' }}>
                      <input 
                        type="number"
                        className="form-input"
                        value={row.noRevisi}
                        onChange={e => updateRow(row.id, 'noRevisi', parseInt(e.target.value) || 0)}
                        style={{ textAlign: 'center', width: '40px', border: '1px solid #e2e8f0', height: '22px', fontSize: '10px', padding: 0 }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '0 0 6px 0' }}>
            <button className="btn" onClick={onClose} style={{ height: '28px', padding: '0 12px', fontSize: '11px', borderRadius: '4px' }}>
              Batal
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleApply}
              style={{ 
                height: '28px', 
                padding: '0 16px', 
                borderRadius: '4px', 
                fontWeight: 800,
                fontSize: '11px'
              }}
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </RightSidebar>
  );
};
