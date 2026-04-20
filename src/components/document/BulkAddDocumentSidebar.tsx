import React, { useState, useMemo } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';
import { RightSidebar } from '../common/RightSidebar';
import { useDocuments } from '../../context/DocumentContext';

interface BulkAddDocumentSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (documents: any[]) => void;
}

export const BulkAddDocumentSidebar: React.FC<BulkAddDocumentSidebarProps> = ({ 
  isOpen, onClose, onSave 
}) => {
  const { documents } = useDocuments();
  const [rows, setRows] = useState([
    { id: Date.now(), disiplin: '', noDokumen: '', namaDokumen: '' }
  ]);
  
  const [addedDisciplines, setAddedDisciplines] = useState<string[]>([]);
  
  const allDisciplines = useMemo(() => {
    const fromDocs = Array.from(new Set(documents.map(d => d.disiplin)));
    return Array.from(new Set([...fromDocs, ...addedDisciplines])).sort();
  }, [documents, addedDisciplines]);

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now() + rows.length, disiplin: '', noDokumen: '', namaDokumen: '' }]);
  };

  const handleRemoveRow = (id: number) => {
    if (rows.length === 1) return;
    setRows(rows.filter(row => row.id !== id));
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleDisiplinChange = (id: number, value: string) => {
    if (value === 'ADD_NEW') {
      const newDisiplin = window.prompt("Enter new Discipline name:");
      if (newDisiplin && newDisiplin.trim() !== '') {
        const trimmed = newDisiplin.trim();
        if (!allDisciplines.includes(trimmed)) {
          setAddedDisciplines([...addedDisciplines, trimmed]);
        }
        handleInputChange(id, 'disiplin', trimmed);
      }
    } else {
      handleInputChange(id, 'disiplin', value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validRows = rows.filter(r => r.disiplin && r.noDokumen && r.namaDokumen);
    if (validRows.length === 0) {
      alert("Please fill at least one row completely.");
      return;
    }
    onSave(validRows);
    setRows([{ id: Date.now(), disiplin: '', noDokumen: '', namaDokumen: '' }]);
    onClose();
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '3px 6px',
    fontSize: '11px',
    border: '1px solid transparent',
    backgroundColor: '#f8fafc',
    borderRadius: '4px',
    outline: 'none',
    transition: 'all 0.15s',
    color: 'var(--text-primary)',
    fontWeight: 500
  };

  const inputFocusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--accent)';
    e.target.style.backgroundColor = '#ffffff';
  };

  const inputBlurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'transparent';
    e.target.style.backgroundColor = '#f8fafc';
  };

  return (
    <RightSidebar
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Document Registry"
      width="800px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
          <button type="button" className="btn" style={{ height: '32px', padding: '0 16px' }} onClick={onClose}>Discard</button>
          <button 
            type="submit" 
            form="bulk-add-doc-form"
            className="btn btn-primary" 
            style={{ height: '32px', padding: '0 20px' }}
          >
            Register {rows.length} Documents
          </button>
        </div>
      }
    >
      <div className="sidebar-content-body" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '10px', fontWeight: 900, letterSpacing: '0.05em' }}>
          <FileText size={12} color="var(--accent)" /> <span>HIGH-SPEED SPREADSHEET INPUT (MAX DENSITY)</span>
        </div>
        
        <form id="bulk-add-doc-form" onSubmit={handleSubmit} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowY: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
              <thead>
                <tr style={{ textAlign: 'left', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 10 }}>
                  <th style={{ padding: '6px 12px', width: '40px', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                  <th style={{ padding: '6px 8px', width: '180px', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Discipline</th>
                  <th style={{ padding: '6px 8px', width: '220px', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doc Number</th>
                  <th style={{ padding: '6px 8px', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Document Title</th>
                  <th style={{ padding: '6px 8px', width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '2px 12px', color: '#cbd5e1', fontSize: '11px', fontWeight: 700 }}>{index + 1}</td>
                    <td style={{ padding: '2px 4px' }}>
                      <select 
                        value={row.disiplin} 
                        onChange={e => handleDisiplinChange(row.id, e.target.value)}
                        onFocus={inputFocusStyle}
                        onBlur={inputBlurStyle}
                        style={inputStyle}
                        required
                      >
                        <option value="">Select...</option>
                        {allDisciplines.map(d => <option key={d} value={d}>{d}</option>)}
                        <option value="ADD_NEW" style={{ fontWeight: 600, color: 'var(--accent)' }}>+ Add New Disiplin...</option>
                      </select>
                    </td>
                    <td style={{ padding: '2px 8px' }}>
                      <input 
                        type="text" 
                        value={row.noDokumen} 
                        onChange={e => handleInputChange(row.id, 'noDokumen', e.target.value)}
                        onFocus={inputFocusStyle}
                        onBlur={inputBlurStyle}
                        placeholder="e.g. PJ-MECH-001"
                        style={inputStyle}
                        required
                      />
                    </td>
                    <td style={{ padding: '2px 8px' }}>
                      <input 
                        type="text" 
                        value={row.namaDokumen} 
                        onChange={e => handleInputChange(row.id, 'namaDokumen', e.target.value)}
                        onFocus={inputFocusStyle}
                        onBlur={inputBlurStyle}
                        placeholder="Enter full document title..."
                        style={inputStyle}
                        required
                      />
                    </td>
                    <td style={{ padding: '2px 4px', textAlign: 'center' }}>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveRow(row.id)}
                        disabled={rows.length === 1}
                        style={{ color: '#ef4444', background: 'transparent', border: 'none', cursor: rows.length > 1 ? 'pointer' : 'not-allowed', opacity: rows.length > 1 ? 0.6 : 0.1, padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ padding: '8px 16px', borderTop: '1px solid #f1f5f9', backgroundColor: '#ffffff' }}>
            <button 
              type="button" 
              onClick={handleAddRow}
              style={{ 
                width: '100%', 
                padding: '6px', 
                backgroundColor: '#f8fafc', 
                border: '1px dashed var(--border-color)', 
                borderRadius: '4px', 
                color: 'var(--text-secondary)', 
                fontSize: '12px', 
                fontWeight: 600,
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.backgroundColor = 'var(--accent-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
            >
              <Plus size={14} /> Add New Entry Line
            </button>
          </div>
        </form>
      </div>
    </RightSidebar>
  );
};
