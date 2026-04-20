import type { DocumentRecord } from '../types';

/**
 * Generates a consistent short ID for entities.
 */
export const generateId = () => crypto.randomUUID();

/**
 * Modern Date Formatting for UI (locale-specific)
 */
export const formatUIDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Synchronizes a document with its latest history entry.
 * Ensures the top-level fields match the "current" reality of the document.
 */
export const syncWithLatestHistory = (docs: DocumentRecord[]): DocumentRecord[] => {
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
/**
 * Converts a string to a URL-friendly slug.
 */
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
