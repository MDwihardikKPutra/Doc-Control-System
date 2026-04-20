import React, { createContext, useContext, useState, useCallback } from 'react';
import type { SystemLog } from '../types';
import { mockLogs } from '../data';
import { AuditService } from '../services/auditService';

interface AuditContextType {
  logs: SystemLog[];
  addLog: (type: SystemLog['type'], action: SystemLog['action'], description: string, details?: string, metadata?: any) => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<SystemLog[]>(mockLogs);

  const addLog = useCallback((type: SystemLog['type'], action: SystemLog['action'], description: string, details?: string, metadata?: any) => {
    const newLog = AuditService.createLog(type, action, description, details, metadata);
    setLogs(prev => [newLog, ...prev]);
  }, []);

  return <AuditContext.Provider value={{ logs, addLog }}>{children}</AuditContext.Provider>;
};

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (context === undefined) throw new Error('useAudit must be used within AuditProvider');
  return context;
};
