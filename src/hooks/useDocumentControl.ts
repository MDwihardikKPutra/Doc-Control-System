import { useState, useCallback, useEffect } from 'react';
import { mockProjects, mockLogs } from '../data';
import type { DocumentRecord, DocumentHistory, Project, SystemLog } from '../types';

// Helper to get latest history and sync with main fields
const syncWithLatestHistory = (docs: DocumentRecord[]): DocumentRecord[] => {
  return docs.map(doc => {
    if (!doc.history || doc.history.length === 0) return doc;
    
    // Sort history by timestamp desc to get the truly latest
    const sortedHistory = [...doc.history].sort((a, b) => b.timestamp - a.timestamp);
    const latest = sortedHistory[0];
    
    return {
      ...doc,
      previewReport: latest.previewReport,
      transmittalType: latest.transmittalType,
      transmittalNo: latest.transmittalNo,
      tanggalTransmittal: latest.tanggalTransmittal,
      issue: latest.issue,
      noRevisi: latest.noRevisi,
      lokasiStatus: latest.lokasiStatus,
      deskripsiLink: latest.deskripsiLink || '-'
    };
  });
};

export const useDocumentControl = (initialDocuments: DocumentRecord[]) => {
  const [documents, setDocuments] = useState<DocumentRecord[]>(syncWithLatestHistory(initialDocuments));
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({ disiplin: '', previewReport: '', issue: '' });
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);

  // Draft Editing State
  const [draftEdits, setDraftEdits] = useState<Record<string, any>>({});

  const [linkInput, setLinkInput] = useState('');
  const [linkModalData, setLinkModalData] = useState<{ id: string, val: string, isHistory: boolean, docId?: string } | null>(null);
  const [selectedHistoryDocId, setSelectedHistoryDocId] = useState<string | null>(null);

  // Column Visibility State
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(new Set([
    'disiplin', 'noDokumen', 'namaDokumen', 'previewReport', 'transmittal', 'tanggal', 'issue', 'noRevisi', 'lokasiStatus', 'deskripsiLink'
  ]));

  // Selection state for Bulk Update
  const [selectedDocIds, setSelectedDocIds] = useState<Set<string>>(new Set());

  // Project state
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState({
    code: '',
    name: '',
    client: '',
    pm: '',
    description: '',
    status: 'Active' as 'Active' | 'Completed' | 'On Hold',
    predefinedLocations: ''
  });
  const [projectLocations, setProjectLocations] = useState<Record<string, string[]>>({});

  const [formData, setFormData] = useState({
    disiplin: '',
    noDokumen: '',
    namaDokumen: '',
    previewReport: 'A' as 'A'|'B'|'C'|'',
    transmittalType: 'IN' as 'IN'|'OUT'|'',
    transmittalNo: '',
    tanggalTransmittal: '',
    issue: '',
    noRevisi: 0,
    lokasiStatus: '',
    deskripsiLink: '',
  });

  // CALLBACKS
  const toggleColumn = useCallback((colId: string) => {
    setVisibleColumns(prev => {
      const next = new Set(prev);
      if (next.has(colId)) next.delete(colId);
      else next.add(colId);
      return next;
    });
  }, []);

  const addLog = useCallback((type: SystemLog['type'], action: SystemLog['action'], description: string, details?: string, metadata?: any) => {
    const newLog: SystemLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      date: new Date().toLocaleString('en-GB'),
      user: 'Doc Control',
      type,
      action,
      description,
      details,
      ...metadata
    };
    setLogs(prev => [newLog, ...prev]);
  }, []);

  const toggleSelectDoc = useCallback((id: string) => {
    setSelectedDocIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback((ids: string[], forceAll?: boolean) => {
    setSelectedDocIds(prev => {
      if (forceAll === false || (prev.size === ids.length && forceAll === undefined)) {
        return new Set();
      }
      return new Set(ids);
    });
  }, []);

  const handleDraftChange = useCallback((id: string, field: string, value: any) => {
    setDraftEdits(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value
      }
    }));
  }, []);

  const cancelDraft = useCallback((id: string) => {
    setDraftEdits(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  }, []);

  const saveDraft = useCallback((id: string) => {
    setDraftEdits(prevDrafts => {
      const draft = prevDrafts[id];
      if (!draft) return prevDrafts;

      setDocuments(prevDocs => {
        const oldDoc = prevDocs.find(d => d.id === id);
        const diffs: string[] = [];
        
        if (oldDoc) {
          const processedDraft = { ...draft };
          if (processedDraft.noRevisi !== undefined) processedDraft.noRevisi = parseInt(processedDraft.noRevisi) || 0;
          
          Object.keys(processedDraft).forEach(key => {
            const val = processedDraft[key];
            const oldVal = (oldDoc as any)[key];
            if (val !== undefined && val !== oldVal) {
              diffs.push(`${key}: ${oldVal} → ${val}`);
            }
          });
          
          if (diffs.length > 0) {
            addLog('DOCUMENT', 'UPDATE', `Updated document ${oldDoc.noDokumen}`, diffs.join(', '), { projectId: oldDoc.projectId, docNo: oldDoc.noDokumen });
          }
        }

        return prevDocs.map(doc => {
          if (doc.id === id) {
            const processedDraft = { ...draft };
            if (processedDraft.noRevisi !== undefined) {
              processedDraft.noRevisi = parseInt(processedDraft.noRevisi) || 0;
            }
            
            const updatedDoc = { ...doc, ...processedDraft };
            
            // Business Logic: only spawn new history row if Transmittal or Revision changes
            const isNewHistory = 
              (processedDraft.transmittalType !== undefined && processedDraft.transmittalType !== doc.transmittalType) ||
              (processedDraft.transmittalNo !== undefined && processedDraft.transmittalNo !== doc.transmittalNo) ||
              (processedDraft.noRevisi !== undefined && processedDraft.noRevisi !== doc.noRevisi);

            if (isNewHistory) {
              const newHistoryLog: DocumentHistory = {
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toLocaleString('en-GB'),
                timestamp: Date.now(),
                transmittalType: updatedDoc.transmittalType,
                transmittalNo: updatedDoc.transmittalNo,
                tanggalTransmittal: updatedDoc.tanggalTransmittal,
                lokasiStatus: updatedDoc.lokasiStatus,
                previewReport: updatedDoc.previewReport,
                issue: updatedDoc.issue,
                noRevisi: updatedDoc.noRevisi,
                deskripsiLink: updatedDoc.deskripsiLink
              };
              updatedDoc.history = [newHistoryLog, ...updatedDoc.history];
            } else {
              // Otherwise, just sync the current top history row with the updated status/location
              if (updatedDoc.history && updatedDoc.history.length > 0) {
                 updatedDoc.history[0] = {
                   ...updatedDoc.history[0],
                   transmittalType: updatedDoc.transmittalType,
                   transmittalNo: updatedDoc.transmittalNo,
                   tanggalTransmittal: updatedDoc.tanggalTransmittal,
                   lokasiStatus: updatedDoc.lokasiStatus,
                   previewReport: updatedDoc.previewReport,
                   issue: updatedDoc.issue,
                   noRevisi: updatedDoc.noRevisi,
                   deskripsiLink: updatedDoc.deskripsiLink
                 };
              }
            }

            return updatedDoc;
          }
          return doc;
        });
      });

      const newState = { ...prevDrafts };
      delete newState[id];
      return newState;
    });
  }, [addLog]);

  const saveHistoryDraft = useCallback((docId: string, logId: string) => {
    setDraftEdits(prevDrafts => {
      const draft = prevDrafts[logId];
      if (!draft) return prevDrafts;

      setDocuments(prevDocs => 
        prevDocs.map(doc => {
          if (doc.id === docId) {
            const processedDraft = { ...draft };
            if (processedDraft.noRevisi !== undefined) {
               processedDraft.noRevisi = parseInt(processedDraft.noRevisi) || 0;
            }
            const newHistory = doc.history.map(log => 
              log.id === logId ? { ...log, ...processedDraft } : log
            );
            return { ...doc, history: newHistory };
          }
          return doc;
        })
      );

      const newState = { ...prevDrafts };
      delete newState[logId];
      return newState;
    });
  }, []);

  const handleBatchUpdate = useCallback((updates: { id: string, fields: any }[]) => {
    setDocuments(prevDocs => {
      const updateMap = new Map(updates.map(u => [u.id, u.fields]));
      
      const updatedDocs = prevDocs.map(doc => {
        const fields = updateMap.get(doc.id);
        if (!fields) return doc;

        const updatedDoc = { ...doc, ...fields };
        
        // Business Logic: always spawn new history row for batch transmittal
        const newHistoryLog: DocumentHistory = {
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toLocaleString('en-GB'),
          timestamp: Date.now(),
          transmittalType: updatedDoc.transmittalType,
          transmittalNo: updatedDoc.transmittalNo,
          tanggalTransmittal: updatedDoc.tanggalTransmittal,
          lokasiStatus: updatedDoc.lokasiStatus,
          previewReport: updatedDoc.previewReport,
          issue: updatedDoc.issue,
          noRevisi: updatedDoc.noRevisi,
          deskripsiLink: updatedDoc.deskripsiLink
        };
        
        return {
          ...updatedDoc,
          history: [newHistoryLog, ...updatedDoc.history]
        };
      });

      // Audit Log
      const affectedDocNos = prevDocs.filter(d => updateMap.has(d.id)).map(d => d.noDokumen);
      addLog('DOCUMENT', 'UPDATE', `Bulk update: Added Transmittal to ${updates.length} documents`, `Updated: ${affectedDocNos.join(', ')}`, { projectId: currentProject?.id });

      return updatedDocs;
    });
    
    // Clear selection after update
    setSelectedDocIds(new Set());
  }, [addLog, currentProject, setSelectedDocIds]);


  const handleSetLinkDraft = useCallback(() => {
    if (!linkModalData) return;
    const { id } = linkModalData;
    handleDraftChange(id, 'deskripsiLink', linkInput);
    setLinkModalData(null);
    setLinkInput('');
  }, [linkModalData, linkInput, handleDraftChange]);

  const openLinkModal = useCallback((id: string, currentVal: string, isHistory: boolean, docId?: string) => {
    setLinkModalData({ id, val: currentVal, isHistory, docId });
    const draftVal = draftEdits[id]?.deskripsiLink;
    setLinkInput(draftVal !== undefined ? draftVal : (currentVal === '-' ? '' : currentVal));
  }, [draftEdits]);

  const isDirty = useCallback((id: string, originalObj: any) => {
    const draft = draftEdits[id];
    if (!draft) return false;
    for (const key in draft) {
      if (draft[key] !== undefined && draft[key] !== originalObj[key]) {
        return true;
      }
    }
    return false;
  }, [draftEdits]);

  const toggleRow = useCallback((id: string) => {
    setExpandedRows(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) newExpanded.delete(id);
      else newExpanded.add(id);
      return newExpanded;
    });
  }, []);

  // Effects
  useEffect(() => {
    setDocuments(syncWithLatestHistory(initialDocuments));
  }, [initialDocuments]);

  useEffect(() => {
    setLogs(mockLogs);
  }, [mockLogs]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    const newDocId = Math.random().toString(36).substr(2, 9);
    const newDocObj: DocumentRecord = {
      ...formData,
      id: newDocId,
      projectId: currentProject?.id || 'p1',
      history: [{
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toLocaleString('en-GB'),
        timestamp: Date.now(),
        transmittalType: formData.transmittalType,
        transmittalNo: formData.transmittalNo,
        tanggalTransmittal: formData.tanggalTransmittal,
        lokasiStatus: formData.lokasiStatus,
        previewReport: formData.previewReport,
        issue: formData.issue,
        noRevisi: formData.noRevisi
      }],
      createdAt: Date.now()
    };

    setDocuments(prev => [newDocObj, ...prev]);
    addLog('DOCUMENT', 'CREATE', `Added new document: ${formData.noDokumen}`, `Initial Transmittal: ${formData.transmittalNo}, Status: ${formData.previewReport}`, { projectId: newDocObj.projectId, docNo: formData.noDokumen });
    
    setFormData({
      disiplin: '', noDokumen: '', namaDokumen: '', previewReport: 'A',
      transmittalType: 'IN', transmittalNo: '', tanggalTransmittal: '',
      issue: '', noRevisi: 0, lokasiStatus: '', deskripsiLink: ''
    });
    setIsModalOpen(false);
  }, [formData, currentProject, setDocuments, setIsModalOpen, addLog]);

  const handleBulkSubmit = useCallback((rows: any[]) => {
    if (!currentProject) return;

    const newDocs: DocumentRecord[] = rows.map((row, idx) => {
      const id = Math.random().toString(36).substr(2, 9);
      const doc: DocumentRecord = {
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
        lokasiStatus: 'IDS (PT Information System)',
        deskripsiLink: '-',
        history: [{
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toLocaleString('en-GB'),
          timestamp: Date.now(),
          transmittalType: 'IN',
          transmittalNo: '-',
          tanggalTransmittal: new Date().toISOString().split('T')[0],
          lokasiStatus: 'IDS (PT Information System)',
          previewReport: 'A',
          issue: 'IFA - For Approval',
          noRevisi: 0
        }],
        createdAt: Date.now() + idx
      };
      return doc;
    });

    setDocuments(prev => [...newDocs, ...prev]);
    
    // Log the bulk action
    addLog(
      'DOCUMENT', 
      'CREATE', 
      `Bulk registered ${newDocs.length} documents for project ${currentProject.code}`,
      newDocs.map(d => `${d.noDokumen}: ${d.namaDokumen}`).join('\n'),
      { projectId: currentProject.id }
    );
  }, [currentProject, setDocuments, addLog]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'noRevisi' ? parseInt(value) || 0 : value }));
  }, []);

  const handleProjectInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const openEditProject = useCallback((project: Project) => {
    setProjectFormData({
      code: project.code,
      name: project.name,
      client: project.client || '',
      pm: project.pm || '',
      description: project.description,
      status: project.status,
      predefinedLocations: projectLocations[project.id]?.join(', ') || ''
    });
    setEditingProjectId(project.id);
    setIsProjectModalOpen(true);
  }, [projectLocations]);

  const closeProjectModal = useCallback(() => {
    setProjectFormData({ code: '', name: '', client: '', pm: '', description: '', status: 'Active', predefinedLocations: '' });
    setEditingProjectId(null);
    setIsProjectModalOpen(false);
  }, []);

  const handleDeleteProject = useCallback((projectId: string) => {
    if (!window.confirm("Are you sure? This will delete the project and all its associated documents permanently.")) return;
    
    const proj = projects.find(p => p.id === projectId);
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setDocuments(prev => prev.filter(doc => doc.projectId !== projectId));
    
    setProjectLocations(prev => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });

    addLog('PROJECT', 'DELETE', `Deleted project ${proj?.code || projectId}`, `Removed project and all its tracking documents.`, { projectId });
    setCurrentProject(curr => curr?.id === projectId ? null : curr);
  }, [projects, addLog]);

  const handleProjectSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProjectId) {
      // UPDATE
      setProjects(prev => prev.map(p => p.id === editingProjectId ? {
        ...p,
        code: projectFormData.code,
        name: projectFormData.name,
        client: projectFormData.client,
        pm: projectFormData.pm,
        description: projectFormData.description,
        status: projectFormData.status
      } : p));
      
      addLog('PROJECT', 'UPDATE', `Updated project ${projectFormData.code}`, `Modified details for ${projectFormData.name}`, { projectId: editingProjectId });
      
      const locations = projectFormData.predefinedLocations
        ? projectFormData.predefinedLocations.split(',').map(l => l.trim()).filter(Boolean)
        : [];
      setProjectLocations(prev => ({ ...prev, [editingProjectId]: locations }));
      
    } else {
      // CREATE
      const projectId = Math.random().toString(36).substr(2, 9);
      const newProject: Project = {
        id: projectId,
        code: projectFormData.code,
        name: projectFormData.name,
        client: projectFormData.client,
        pm: projectFormData.pm,
        description: projectFormData.description,
        status: projectFormData.status
      };

      setProjects(prev => [newProject, ...prev]);
      addLog('PROJECT', 'CREATE', `Created project ${projectFormData.code}`, projectFormData.name, { projectId });

      const locations = projectFormData.predefinedLocations
        ? projectFormData.predefinedLocations.split(',').map(l => l.trim()).filter(Boolean)
        : [];
      setProjectLocations(prev => ({ ...prev, [projectId]: locations }));
    }
    
    closeProjectModal();
  }, [projectFormData, editingProjectId, addLog, closeProjectModal]);

  const addLocation = useCallback((projectId: string, location: string) => {
    if (!location) return;
    setProjectLocations(prev => {
      const current = prev[projectId] || [];
      if (current.includes(location)) return prev;
      return { ...prev, [projectId]: [...current, location] };
    });
  }, []);

  const getLocationsForProject = useCallback((projectId: string) => {
    // Basic defaults + project-specific customs
    const defaults = ['IDS (PT INFORMATION DATASYSTEM)', 'PGE', 'HJP (PT HUTAMA JAYA PERKASA)'];
    const customs = projectLocations[projectId] || [];
    return Array.from(new Set([...defaults, ...customs]));
  }, [projectLocations]);

  return {
    documents,
    setDocuments,
    projects,
    setProjects,
    currentProject,
    setCurrentProject,
    isModalOpen,
    setIsModalOpen,
    isProjectModalOpen,
    setIsProjectModalOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    expandedRows,
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    linkModalData,
    setLinkModalData,
    linkInput,
    setLinkInput,
    draftEdits,
    handleDraftChange,
    cancelDraft,
    saveDraft,
    saveHistoryDraft,
    handleSetLinkDraft,
    openLinkModal,
    isDirty,
    toggleRow,
    formData,
    handleInputChange,
    handleSubmit,
    projectFormData,
    handleProjectInputChange,
    handleProjectSubmit,
    openEditProject,
    handleDeleteProject,
    closeProjectModal,
    editingProjectId,
    addLocation,
    getLocationsForProject,
    logs,
    handleBulkSubmit,
    visibleColumns,
    toggleColumn,
    selectedHistoryDocId,
    setSelectedHistoryDocId,
    selectedDocIds,
    toggleSelectDoc,
    toggleSelectAll,
    handleBatchUpdate
  };
};
