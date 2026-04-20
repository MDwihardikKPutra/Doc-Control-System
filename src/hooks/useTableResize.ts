import { useState, useRef, useCallback } from 'react';

const DEFAULT_WIDTHS: Record<string, number> = {
  control: 35,
  no: 45,
  disiplin: 250,
  noDokumen: 180,
  namaDokumen: 350,
  previewReport: 170,
  transmittal: 130,
  tanggal: 120,
  issue: 140,
  noRevisi: 45,
  lokasiStatus: 140,
  deskripsiLink: 80,
  action: 80
};

export const useTableResize = () => {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('dms_column_widths');
    return saved ? JSON.parse(saved) : DEFAULT_WIDTHS;
  });

  const resizingColumn = useRef<{ id: string, startX: number, startWidth: number } | null>(null);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn.current) return;
    const { id, startX, startWidth } = resizingColumn.current;
    const diff = e.pageX - startX;
    const newWidth = Math.max(30, startWidth + diff); // Min width 30px
    
    setColumnWidths(prev => ({
      ...prev,
      [id]: newWidth
    }));
  }, []);

  const handleResizeEnd = useCallback(() => {
    resizingColumn.current = null;
    document.body.classList.remove('resizing');
    window.removeEventListener('mousemove', handleResizeMove);
    window.removeEventListener('mouseup', handleResizeEnd);
    
    // Save to localStorage using the current state
    setColumnWidths(prev => {
       localStorage.setItem('dms_column_widths', JSON.stringify(prev));
       return prev;
    });
  }, [handleResizeMove]);

  const handleResizeStart = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    resizingColumn.current = {
      id,
      startX: e.pageX,
      startWidth: columnWidths[id] || DEFAULT_WIDTHS[id]
    };
    document.body.classList.add('resizing');
    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeEnd);
  }, [columnWidths, handleResizeMove, handleResizeEnd]);

  return { columnWidths, handleResizeStart };
};
