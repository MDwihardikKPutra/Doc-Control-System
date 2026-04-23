import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import type { DocumentRecord } from '../../types';

interface DropdownProps {
  id: string;
  val: any;
  draftEdits: Record<string, any>;
  onDraftChange: (id: string, field: string, value: any) => void;
  editable?: boolean;
}

export const PreviewDropdown: React.FC<DropdownProps> = ({ id, val, draftEdits, onDraftChange, editable = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const draftVal = draftEdits[id]?.previewReport;
  const activeVal = draftVal !== undefined ? draftVal : val;
  const isDirtyVal = draftVal !== undefined && draftVal !== val;
  
  const options = [
    { value: 'A', label: 'Approved', styleClass: 'status-A' },
    { value: 'B', label: 'w/ Notes', styleClass: 'status-B' },
    { value: 'C', label: 'Pending', styleClass: 'status-C' },
    { value: '', label: 'None', styleClass: '' }
  ];

  const activeOption = options.find(o => o.value === activeVal) || options[3];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', width: '100%', minWidth: '80px' }}
    >
      <div 
        className={`status-badge ${activeOption.styleClass}`} 
        onClick={() => editable && setIsOpen(!isOpen)}
        style={{ 
          cursor: editable ? 'pointer' : 'default',
          border: isDirtyVal ? 'var(--border-width) dashed var(--accent)' : 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          padding: '2px 10px',
          minWidth: 'max-content'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div className="dot"></div>
          {activeOption.label}
        </div>
        {editable && <ChevronDown size={10} style={{ opacity: 0.5, flexShrink: 0 }} />}
      </div>

      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          top: 'calc(100% + 4px)', 
          left: 0, 
          zIndex: 1000, 
          backgroundColor: '#ffffff', 
          border: 'var(--border-width) solid var(--border-color)', 
          borderRadius: '6px', 
          width: '140px',
          padding: '4px'
        }}>
          {options.map(opt => (
            <div 
              key={opt.value}
              onClick={() => { onDraftChange(id, 'previewReport', opt.value); setIsOpen(false); }}
              style={{ 
                padding: '6px 10px', 
                fontSize: '11px', 
                fontWeight: 600, 
                borderRadius: '4px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: activeVal === opt.value ? 'var(--bg-main)' : 'transparent',
                color: activeVal === opt.value ? 'var(--accent)' : 'var(--text-primary)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-main)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = activeVal === opt.value ? 'var(--bg-main)' : 'transparent'; }}
            >
              {opt.label}
              {activeVal === opt.value && <Check size={12} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const IssueDropdown: React.FC<DropdownProps> = ({ id, val, draftEdits, onDraftChange, editable = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const draftVal = draftEdits[id]?.issue;
  const activeVal = draftVal !== undefined ? draftVal : val;
  const isDirtyIssue = draftVal !== undefined && draftVal !== val;
  
  const options = [
    "IFA - For Approval",
    "IFR - For Review",
    "IFI - For Information",
    "IFC - Issued for Constr.",
    "As-Built",
    "Void"
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', width: '100%' }}
    >
      <div 
        className="status-badge" 
        onClick={() => editable && setIsOpen(!isOpen)}
        style={{ 
          cursor: editable ? 'pointer' : 'default',
          flex: 1, 
          backgroundColor: 'transparent', 
          color: 'var(--text-primary)', 
          border: isDirtyIssue ? 'var(--border-width) dashed var(--accent)' : 'none', 
          fontSize: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
          padding: '2px 10px'
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {activeVal || 'No Issue'}
        </span>
        {editable && <ChevronDown size={10} opacity={0.5} />}
      </div>

      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          top: 'calc(100% + 4px)', 
          left: 0, 
          zIndex: 1000, 
          backgroundColor: '#ffffff', 
          border: 'var(--border-width) solid var(--border-color)', 
          borderRadius: '6px', 
          width: '180px',
          padding: '4px'
        }}>
          {options.map(opt => (
            <div 
              key={opt}
              onClick={() => { onDraftChange(id, 'issue', opt); setIsOpen(false); }}
              style={{ 
                padding: '6px 10px', 
                fontSize: '11px', 
                fontWeight: 600, 
                borderRadius: '4px', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: activeVal === opt ? 'var(--bg-main)' : 'transparent',
                color: activeVal === opt ? 'var(--accent)' : 'var(--text-primary)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-main)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = activeVal === opt ? 'var(--bg-main)' : 'transparent'; }}
            >
              {opt}
              {activeVal === opt && <Check size={12} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TransmittalUnit: React.FC<{ id: string, typeVal: string, noVal: string, draftEdits: any, onDraftChange: any, mainDocRef?: DocumentRecord, editable?: boolean }> = ({ id, typeVal, noVal, draftEdits, onDraftChange, mainDocRef, editable = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const draftType = draftEdits[id]?.transmittalType;
  const activeType = draftType !== undefined ? draftType : typeVal;
  
  const draftNo = draftEdits[id]?.transmittalNo;
  const activeNo = draftNo !== undefined ? draftNo : noVal;

  const isDirtyType = draftType !== undefined && draftType !== typeVal;
  const isDirtyNo = draftNo !== undefined && draftNo !== noVal;
  const isDirtyFlow = isDirtyType || isDirtyNo;

  const handleTypeSwitch = (newType: string) => {
    onDraftChange(id, 'transmittalType', newType);
    if (newType !== '' && mainDocRef) {
       if (mainDocRef.transmittalType === newType) {
          onDraftChange(id, 'transmittalNo', mainDocRef.transmittalNo);
       } else {
          const pastLog = mainDocRef.history ? mainDocRef.history.find(h => h.transmittalType === newType) : null;
          onDraftChange(id, 'transmittalNo', pastLog?.transmittalNo || '');
       }
    } else if (newType === '') {
       onDraftChange(id, 'transmittalNo', '');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'flex-start' }}
    >
      {/* Read View */}
      <div 
        onClick={() => editable && setIsOpen(!isOpen)}
        style={{ 
          display: 'flex', 
          gap: '4px', 
          alignItems: 'center', 
          justifyContent: 'flex-start', 
          fontWeight: 800, 
          fontSize: '11px', 
          cursor: editable ? 'pointer' : 'default',
          padding: '2px 0px',
          borderRadius: '4px',
          backgroundColor: isDirtyFlow ? 'var(--accent-soft)' : 'transparent',
          border: isDirtyFlow ? 'var(--border-width) dashed var(--accent)' : '1px solid transparent',
          color: activeType === 'IN' ? '#2e7d32' : activeType === 'OUT' ? '#c62828' : 'var(--text-primary)',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => { if (editable) e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.05)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isDirtyFlow ? 'var(--accent-soft)' : 'transparent'; }}
      >
          <span>{activeType || '-'}</span>
          <span style={{ opacity: 0.3 }}>|</span>
          <span>{activeNo || '---'}</span>
          {editable && <ChevronDown size={10} opacity={0.4} />}
      </div>

      {/* Premium Popover */}
      {isOpen && (
        <div style={{ 
          position: 'absolute', 
          top: 'calc(100% + 6px)', 
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000, 
          backgroundColor: '#ffffff', 
          border: 'var(--border-width) solid var(--border-color)', 
          borderRadius: '8px', 
          width: '200px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
            Mode Transmital
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
            {['IN', 'OUT', ''].map(t => (
              <button
                key={t}
                onClick={() => handleTypeSwitch(t)}
                style={{
                  padding: '7px 0',
                  fontSize: '10px',
                  fontWeight: 700,
                  borderRadius: '6px',
                  border: activeType === t ? '1.5px solid var(--accent)' : '1px solid var(--border-color)',
                  backgroundColor: activeType === t ? 'var(--accent-soft)' : '#ffffff',
                  color: t === 'IN' ? '#059669' : t === 'OUT' ? '#e11d48' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {t === '' ? 'Kosong' : t}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
              Nomor Referensi
            </div>
            <input 
              autoFocus
              type="text"
              value={activeNo}
              onChange={(e) => onDraftChange(id, 'transmittalNo', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setIsOpen(false)}
              placeholder="Contoh: TR-2024-001"
              style={{ 
                padding: '8px 10px', 
                fontSize: '12px', 
                border: '1px solid var(--border-color)', 
                borderRadius: '6px',
                backgroundColor: '#f8fafc',
                outline: 'none',
                width: '100%',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.backgroundColor = '#fff'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.backgroundColor = '#f8fafc'; }}
            />
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            style={{ 
              marginTop: '6px',
              padding: '8px', 
              backgroundColor: 'var(--accent)', 
              color: '#ffffff', 
              border: 'none',
              borderRadius: '6px', 
              fontSize: '11px', 
              fontWeight: 700, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4f46e5'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Check size={14} /> Simpan Perubahan
          </button>
        </div>
      )}
    </div>
  );
};
