import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

export interface LinkModalData {
  id: string;
  link: string;
  isHistory: boolean;
  docId?: string;
}

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
  linkModalData: LinkModalData | null;
  setLinkModalData: (data: LinkModalData | null) => void;
  linkInput: string;
  setLinkInput: (v: string) => void;
  isReadOnly: boolean;
  setIsReadOnly: (v: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isBulkAddModalOpen, setIsBulkAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({ disiplin: '', previewReport: '', issue: '' });
  const [linkModalData, setLinkModalDataInternal] = useState<LinkModalData | null>(null);
  const [linkInput, setLinkInput] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
    'noDokumen', 'namaDokumen', 'previewReport', 'transmittal', 'tanggal', 'issue', 'noRevisi', 'lokasiStatus', 'deskripsiLink'
  ]));
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
    select: 40, noDokumen: 160, namaDokumen: 220, disiplin: 100, lokasiStatus: 140, 
    status: 90, transmittal: 70, tanggalTransmittal: 90, issue: 130, noRevisi: 35, 
    action: 70, control: 35, no: 40, link: 50
  });

  const toggleColumn = useCallback((id: string) => {
    setVisibleColumns(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const columnWidthsRef = useRef(columnWidths);
  useEffect(() => { columnWidthsRef.current = columnWidths; }, [columnWidths]);

  const handleResizeStart = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = columnWidthsRef.current[id] ?? 150;
    let rafId: number;

    const onMouseMove = (moveEvent: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const newWidth = Math.max(50, startWidth + (moveEvent.pageX - startX));
        setColumnWidths(prev => ({ ...prev, [id]: newWidth }));
      });
    };

    const onMouseUp = () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.classList.remove('resizing');
    };

    document.body.classList.add('resizing');
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []); // stable — no stale closure via ref

  const setLinkModalData = useCallback((data: LinkModalData | null) => {
    setLinkModalDataInternal(data);
    if (data) {
      setLinkInput(data.link || '-');
    } else {
      setLinkInput('');
    }
  }, []);

  const value = {
    isSidebarCollapsed, setIsSidebarCollapsed,
    isProjectModalOpen, setIsProjectModalOpen,
    isBulkAddModalOpen, setIsBulkAddModalOpen,
    searchQuery, setSearchQuery,
    activeFilters, setActiveFilters,
    visibleColumns, setVisibleColumns, toggleColumn,
    columnWidths, handleResizeStart,
    linkModalData, setLinkModalData,
    linkInput, setLinkInput,
    isReadOnly, setIsReadOnly
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) throw new Error('useUI must be used within UIProvider');
  return context;
};
