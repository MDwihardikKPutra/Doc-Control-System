import React, { useState, useEffect } from 'react';
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

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
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
          padding: '12px 24px', 
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
            <div style={{ backgroundColor: 'var(--text-primary)', color: '#fff', padding: '3px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 800 }}>
              {rowItems.length} Docs
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 600 }}>Batch Editor</div>
          </div>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
          
          {/* GLOBAL DEFAULTS - ULTRA CLEAN */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '24px',
            padding: '20px 24px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid var(--border-color)'
          }}>
            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-primary)' }}>Tipe Transmittal</label>
              <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f8fafc', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                {['IN', 'OUT'].map(t => (
                  <button
                    key={t}
                    onClick={() => setGlobalType(t)}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      backgroundColor: globalType === t ? '#fff' : 'transparent',
                      color: globalType === t ? 'var(--accent)' : 'var(--text-secondary)',
                      boxShadow: globalType === t ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-primary)' }}>Tanggal</label>
              <input 
                type="date"
                className="form-input"
                value={globalDate}
                onChange={e => setGlobalDate(e.target.value)}
                style={{ height: '42px', backgroundColor: '#f8fafc' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-primary)' }}>Lokasi</label>
              <select 
                className="form-input"
                value={globalLocation} 
                onChange={e => setGlobalLocation(e.target.value)}
                style={{ height: '42px', backgroundColor: '#f8fafc' }}
              >
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: 'var(--text-primary)' }}>No. Transmittal Global</label>
              <input 
                type="text"
                className="form-input"
                placeholder="TR-..."
                value={globalTransmittalNo}
                onChange={e => setGlobalTransmittalNo(e.target.value)}
                style={{ height: '42px', backgroundColor: '#f8fafc', fontWeight: 600 }}
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
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>DOKUMEN</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>NO. TRANSMITTAL</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>STATUS</th>
                  <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>ISSUE FLOW</th>
                  <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em', width: '80px' }}>REV</th>
                </tr>
              </thead>
              <tbody>
                {rowItems.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: idx === rowItems.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>{row.docNo}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', opacity: 0.8 }}>{row.docName}</div>
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <input 
                        type="text"
                        className="form-input"
                        placeholder="TR-..."
                        value={row.transmittalNo}
                        onChange={e => updateRow(row.id, 'transmittalNo', e.target.value)}
                        style={{ fontWeight: 600, border: '1px solid #e2e8f0' }}
                      />
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <PreviewDropdown 
                        id={row.id} 
                        val={row.previewReport} 
                        draftEdits={{}} 
                        onDraftChange={(_id, _f, v) => updateRow(row.id, 'previewReport', v)} 
                      />
                    </td>
                    <td style={{ padding: '12px 20px' }}>
                      <IssueDropdown 
                        id={row.id} 
                        val={row.issue} 
                        draftEdits={{}} 
                        onDraftChange={(_id, _f, v) => updateRow(row.id, 'issue', v)} 
                      />
                    </td>
                    <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                      <input 
                        type="number"
                        className="form-input"
                        value={row.noRevisi}
                        onChange={e => updateRow(row.id, 'noRevisi', parseInt(e.target.value) || 0)}
                        style={{ textAlign: 'center', width: '60px', border: '1px solid #e2e8f0' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ACTION BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '12px 0' }}>
            <button className="btn" onClick={onClose} style={{ height: '44px', padding: '0 28px', fontSize: '14px', borderRadius: '12px' }}>
              Batal
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleApply}
              style={{ 
                height: '44px', 
                padding: '0 36px', 
                borderRadius: '12px', 
                fontWeight: 800,
                fontSize: '14px'
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
