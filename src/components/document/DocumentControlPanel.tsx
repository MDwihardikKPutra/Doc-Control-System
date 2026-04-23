import React, { useMemo } from 'react';
import { Search, Filter, Activity, Plus, Download, ChevronDown, Share2, Check } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useDocuments } from '../../context/DocumentContext';

interface DocumentControlPanelProps {
  setIsModalOpen: (open: boolean) => void;
}

export const DocumentControlPanel: React.FC<DocumentControlPanelProps> = ({
  setIsModalOpen
}) => {
  const { 
    searchQuery, setSearchQuery, activeFilters, setActiveFilters, isReadOnly 
  } = useUI();
  
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    const url = window.location.href.replace('/tracking', '/share');
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const { documents } = useDocuments();

  const uniqueDisiplin = useMemo(() => 
    Array.from(new Set(documents.map(d => d.disiplin))).sort(),
    [documents]
  );

  return (
    <div style={{ 
      padding: '0 16px', 
      borderBottom: '1px solid var(--border-color)', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#ffffff',
      height: '48px',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
        {/* SEARCH BOX - MORE DEFINED */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          width: '280px', 
          flexShrink: 0,
          backgroundColor: '#f8fafc',
          padding: '6px 12px',
          borderRadius: '6px',
          border: '1px solid var(--border-color)'
        }}>
          <Search size={14} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            style={{ 
              border: 'none', 
              background: 'transparent', 
              outline: 'none', 
              fontSize: '12px', 
              width: '100%', 
              color: 'var(--text-primary)', 
              fontWeight: 500 
            }} 
          />
        </div>

        <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)', margin: '0 4px' }}></div>
        
        {/* FILTERS - TIGHTER & CLEANER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Discipline:</span>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                value={activeFilters.disiplin} 
                onChange={e => setActiveFilters(p => ({...p, disiplin: e.target.value}))} 
                style={{ 
                  border: 'none', 
                  padding: '2px 18px 2px 0',
                  background: 'transparent', 
                  fontSize: '12px', 
                  fontWeight: 700, 
                  color: activeFilters.disiplin ? 'var(--accent)' : 'var(--text-primary)', 
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none'
                }}
              >
                <option value="">Semua Disiplin</option>
                {uniqueDisiplin.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown size={12} color="var(--text-secondary)" style={{ position: 'absolute', right: 0, pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status:</span>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <select 
                value={activeFilters.previewReport} 
                onChange={e => setActiveFilters(p => ({...p, previewReport: e.target.value}))} 
                style={{ 
                  border: 'none', 
                  padding: '2px 18px 2px 0',
                  background: 'transparent', 
                  fontSize: '12px', 
                  fontWeight: 700, 
                  color: activeFilters.previewReport ? 'var(--accent)' : 'var(--text-primary)', 
                  cursor: 'pointer',
                  outline: 'none',
                  appearance: 'none'
                }}
              >
                <option value="">Semua Status</option>
                <option value="A">Approved</option>
                <option value="B">w/ Notes</option>
                <option value="C">Pending</option>
              </select>
              <ChevronDown size={12} color="var(--text-secondary)" style={{ position: 'absolute', right: 0, pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* ACTIONS */}
      {!isReadOnly && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="btn" style={{ 
            height: '32px', 
            padding: '0 12px', 
            borderRadius: '6px', 
            fontSize: '11px', 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)'
          }}>
            <Download size={14} /> Export
          </button>

          <button className="btn" onClick={handleCopyLink} style={{ 
            height: '32px', 
            padding: '0 12px', 
            borderRadius: '6px', 
            fontSize: '11px', 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: copied ? 'var(--status-a-bg)' : 'var(--accent-soft)',
            border: `1px solid ${copied ? 'var(--status-a-dot)' : 'var(--accent)'}`,
            color: copied ? 'var(--status-a-text)' : 'var(--accent)'
          }}>
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            {copied ? 'Copied' : 'Share Link'}
          </button>
          
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)', margin: '0 4px' }}></div>

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ 
            height: '32px', 
            padding: '0 16px', 
            borderRadius: '6px', 
            fontSize: '11px', 
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Plus size={14} /> Tambah Dokumen
          </button>
        </div>
      )}
    </div>
  );
};
