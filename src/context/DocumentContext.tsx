import React, { createContext, useContext, useState, useCallback, useMemo, useDeferredValue } from 'react';
import type { DocumentRecord, DocumentHistory } from '../types';
import { mockDocuments } from '../data';
import { DocumentService } from '../services/documentService';
import { syncWithLatestHistory, generateId } from '../utils';
import { useProjects } from './ProjectContext';
import { useUI } from './UIContext';
import { useAudit } from './AuditContext';

interface DocumentContextType {
  documents: DocumentRecord[];
  filteredDocuments: DocumentRecord[];
  selectedDocIds: Set<string>;
  draftEdits: Record<string, any>;
  selectedHistoryDocId: string | null;
  linkModalData: any | null;
  
  // Actions
  handleBatchUpdate: (updates: { id: string, fields: any }[]) => void;
  handleBulkSubmit: (rows: any[]) => void;
  handleDraftChange: (id: string, field: string, value: any) => void;
  saveDraft: (id: string) => void;
  cancelDraft: (id: string) => void;
  saveHistoryDraft: (docId: string, historyId: string, updatedHistory: any) => void;
  setSelectedHistoryDocId: (id: string | null) => void;
  setLinkModalData: (data: any | null) => void;
  toggleSelectDoc: (id: string) => void;
  toggleSelectAll: (ids: string[], isSelected: boolean) => void;
  isDirty: (id: string, original: any) => boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentProject } = useProjects();
  const { searchQuery, activeFilters } = useUI();
  const { addLog } = useAudit();

  const [documents, setDocuments] = useState<DocumentRecord[]>(syncWithLatestHistory(mockDocuments));
  const [selectedDocIds, setSelectedDocIds] = useState<Set<string>>(new Set());
  const [draftEdits, setDraftEdits] = useState<Record<string, any>>({});
  const [selectedHistoryDocId, setSelectedHistoryDocId] = useState<string | null>(null);
  const [linkModalData, setLinkModalData] = useState<any | null>(null);

  const deferredSearchKey = useDeferredValue(searchQuery);

  const filteredDocuments = useMemo(() => {
    return DocumentService.filterDocuments(documents, {
      projectId: currentProject?.id,
      searchQuery: deferredSearchKey,
      filters: activeFilters
    });
  }, [documents, currentProject?.id, deferredSearchKey, activeFilters]);

  const handleBatchUpdate = useCallback((updates: { id: string, fields: any }[]) => {
    setDocuments(prevDocs => {
      const updateMap = new Map(updates.map(u => [u.id, u.fields]));
      const updatedDocs = prevDocs.map(doc => {
        const fields = updateMap.get(doc.id);
        if (!fields) return doc;

        const updatedDoc = { ...doc, ...fields };
        const newHistoryLog: DocumentHistory = {
          id: generateId(),
          date: new Date().toISOString(),
          timestamp: Date.now(),
          ...fields
        };
        return { ...updatedDoc, history: [newHistoryLog, ...updatedDoc.history] };
      });

      addLog('DOCUMENT', 'UPDATE', `Bulk update: ${updates.length} docs`, '', { projectId: currentProject?.id });
      return updatedDocs;
    });
  }, [addLog, currentProject?.id]);

  const handleBulkSubmit = useCallback((rows: any[]) => {
    if (!currentProject) return;
    const newDocs: DocumentRecord[] = rows.map((row, idx) => {
      const id = generateId();
      return {
        id,
        projectId: currentProject.id,
        disiplin: row.disiplin,
        noDokumen: row.noDokumen,
        namaDokumen: row.namaDokumen,
        previewReport: 'A',
        transmittalType: 'IN',
        transmittalNo: '-',
        tanggalTransmittal: new Date().toISOString().split('T')[0],
        issue: 'IFA - For Approval',
        noRevisi: 0,
        lokasiStatus: 'IDS',
        deskripsiLink: '-',
        history: [{
          id: generateId(),
          date: new Date().toISOString(),
          timestamp: Date.now(),
          transmittalType: 'IN',
          transmittalNo: '-',
          tanggalTransmittal: new Date().toISOString().split('T')[0],
          lokasiStatus: 'IDS',
          previewReport: 'A',
          issue: 'IFA - For Approval',
          noRevisi: 0
        }],
        createdAt: Date.now() + idx
      };
    });
    setDocuments(prev => [...newDocs, ...prev]);
    addLog('DOCUMENT', 'CREATE', `Bulk registered ${newDocs.length} docs`, '', { projectId: currentProject.id });
  }, [currentProject, addLog]);

  const handleDraftChange = useCallback((id: string, field: string, value: any) => {
    setDraftEdits(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  }, []);

  const cancelDraft = useCallback((id: string) => {
    setDraftEdits(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const saveDraft = useCallback((id: string) => {
    const draft = draftEdits[id];
    if (!draft) return;
    setDocuments(prev => prev.map(doc => {
      if (doc.id !== id) return doc;
      const updated = { ...doc, ...draft };
      const newHistory: DocumentHistory = {
        id: generateId(),
        date: new Date().toISOString(),
        timestamp: Date.now(),
        ...draft
      };
      return { ...updated, history: [newHistory, ...doc.history] };
    }));
    cancelDraft(id);
    addLog('DOCUMENT', 'UPDATE', `Updated doc ${id}`, '', { projectId: currentProject?.id });
  }, [draftEdits, cancelDraft, addLog, currentProject?.id]);

  const saveHistoryDraft = useCallback((docId: string, historyId: string, updatedHistory: any) => {
    setDocuments(prev => prev.map(doc => {
      if (doc.id !== docId) return doc;
      const newHistory = doc.history.map(h => h.id === historyId ? { ...h, ...updatedHistory } : h);
      let updatedDoc = { ...doc, history: newHistory };
      if (historyId === doc.history[0]?.id) updatedDoc = { ...updatedDoc, ...updatedHistory };
      return updatedDoc;
    }));
    addLog('DOCUMENT', 'UPDATE', `Updated history ${historyId} for doc ${docId}`, '', { projectId: currentProject?.id });
  }, [addLog, currentProject?.id]);

  const toggleSelectDoc = useCallback((id: string) => {
    setSelectedDocIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback((ids: string[], isSelected: boolean) => {
    setSelectedDocIds(isSelected ? new Set(ids) : new Set());
  }, []);

  const isDirty = useCallback((id: string, original: any) => {
    const d = draftEdits[id];
    if (!d) return false;
    return Object.keys(d).some(k => d[k] !== (original as any)[k]);
  }, [draftEdits]);

  const value = {
    documents, filteredDocuments, selectedDocIds, draftEdits, selectedHistoryDocId, linkModalData,
    handleBatchUpdate, handleBulkSubmit, handleDraftChange, saveDraft, cancelDraft, saveHistoryDraft,
    setSelectedHistoryDocId, setLinkModalData, toggleSelectDoc, toggleSelectAll, isDirty
  };

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) throw new Error('useDocuments must be used within DocumentProvider');
  return context;
};
