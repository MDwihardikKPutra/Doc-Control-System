import React, { useMemo } from 'react';
import { Search, Filter, Activity, Plus, Download, ChevronDown } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useDocuments } from '../../context/DocumentContext';

interface DocumentControlPanelProps {
  setIsModalOpen: (open: boolean) => void;
}

export const DocumentControlPanel: React.FC<DocumentControlPanelProps> = ({
  setIsModalOpen
}) => {
  const { 
    searchQuery, setSearchQuery, activeFilters, setActiveFilters 
  } = useUI();
  
  const { documents } = useDocuments();

  const uniqueDisiplin = useMemo(() => 
    Array.from(new Set(documents.map(d => d.disiplin))).sort(),
    [documents]
  );

  return (
    <div style={{ 
      padding: '0 12px', 
      borderBottom: '1.5px solid var(--border-color)', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      backgroundColor: '#ffffff',
      height: '44px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
        {/* SEARCH SECTION */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          width: '240px', 
          flexShrink: 0 
        }}>
          <Search size={16} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Cari dokumen..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', width: '100%', color: 'var(--text-primary)', fontWeight: 500 }} 
          />
        </div>

        {/* SEPARATOR */}
        <div style={{ width: '1.5px', height: '24px', backgroundColor: 'var(--border-color)', flexShrink: 0 }}></div>
        
        {/* FILTERS SECTION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} color="var(--text-secondary)" />
              <div style={{ position: 'relative' }}>
                <select 
                  value={activeFilters.disiplin} 
                  onChange={e => setActiveFilters(p => ({...p, disiplin: e.target.value}))} 
                  style={{ 
                    border: 'none', 
                    padding: '0 20px 0 0',
                    background: 'transparent', 
                    fontSize: '13px', 
                    fontWeight: 600, 
                    color: activeFilters.disiplin ? 'var(--accent)' : 'var(--text-primary)', 
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none',
                    maxWidth: '200px'
                  }}
                >
                  <option value="">Semua Disiplin</option>
                  {uniqueDisiplin.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ChevronDown size={12} color="var(--text-secondary)" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="var(--text-secondary)" />
              <div style={{ position: 'relative' }}>
                <select 
                  value={activeFilters.previewReport} 
                  onChange={e => setActiveFilters(p => ({...p, previewReport: e.target.value}))} 
                  style={{ 
                    border: 'none', 
                    padding: '0 20px 0 0',
                    background: 'transparent', 
                    fontSize: '13px', 
                    fontWeight: 600, 
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
                <ChevronDown size={12} color="var(--text-secondary)" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>
        </div>
      </div>
      
      {/* ACTIONS SECTION */}
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
        <button className="btn" style={{ 
          height: '30px', 
          padding: '0 12px', 
          border: 'none', 
          background: 'transparent', 
          borderRadius: '4px', 
          fontSize: '12px', 
          fontWeight: 600, 
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Download size={15} /> Ekspor
        </button>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)} style={{ height: '30px', padding: '0 16px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
          <Plus size={16} /> Tambah Dokumen
        </button>
      </div>
    </div>
  );
};
