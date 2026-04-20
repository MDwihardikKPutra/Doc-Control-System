import React, { createContext, useContext, useState, useCallback } from 'react';

interface UIContextType {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (v: boolean) => void;
  isProjectModalOpen: boolean;
  setIsProjectModalOpen: (v: boolean) => void;
  isBulkAddModalOpen: boolean;
  setIsBulkAddModalOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilters: { disiplin: string; previewReport: string; issue: string };
  setActiveFilters: React.Dispatch<React.SetStateAction<{ disiplin: string; previewReport: string; issue: string }>>;
  visibleColumns: Set<string>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Set<string>>>;
  toggleColumn: (id: string) => void;
  columnWidths: Record<string, number>;
  handleResizeStart: (e: React.MouseEvent, id: string) => void;
  linkModalData: any | null;
  setLinkModalData: (data: any | null) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isBulkAddModalOpen, setIsBulkAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({ disiplin: '', previewReport: '', issue: '' });
  const [linkModalData, setLinkModalData] = useState<any | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
    'noDokumen', 'namaDokumen', 'previewReport', 'transmittal', 'tanggal', 'issue', 'noRevisi', 'lokasiStatus', 'deskripsiLink'
  ]));
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    select: 40, noDokumen: 180, namaDokumen: 250, disiplin: 120, lokasiStatus: 180,
    previewReport: 80, transmittalNo: 150, tanggalTransmittal: 120, issue: 120, 
    noRevisi: 80, deskripsiLink: 150
  });

  const toggleColumn = useCallback((id: string) => {
    setVisibleColumns(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent, id: string) => {
    const startX = e.pageX;
    const startWidth = columnWidths[id];
    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.pageX - startX));
      setColumnWidths(prev => ({ ...prev, [id]: newWidth }));
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [columnWidths]);

  const value = {
    isSidebarCollapsed, setIsSidebarCollapsed,
    isProjectModalOpen, setIsProjectModalOpen,
    isBulkAddModalOpen, setIsBulkAddModalOpen,
    searchQuery, setSearchQuery,
    activeFilters, setActiveFilters,
    visibleColumns, setVisibleColumns, toggleColumn,
    columnWidths, handleResizeStart,
    linkModalData, setLinkModalData
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) throw new Error('useUI must be used within UIProvider');
  return context;
};
