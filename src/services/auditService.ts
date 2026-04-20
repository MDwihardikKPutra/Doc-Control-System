import type { SystemLog } from '../types';
import { generateId } from '../utils';

export const AuditService = {
  /**
   * Creates a standardized system log entry.
   */
  createLog: (
    type: SystemLog['type'],
    action: SystemLog['action'],
    description: string,
    details?: string,
    metadata?: any
  ): SystemLog => {
    return {
      id: generateId(),
      timestamp: Date.now(),
      date: new Date().toISOString(),
      user: 'Doc Control',
      type,
      action,
      description,
      details,
      ...metadata
    };
  }
};
