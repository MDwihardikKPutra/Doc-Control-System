import type { DocumentRecord } from '../types';

export const DocumentService = {
  /**
   * Filters documents based on a complex set of criteria.
   */
  filterDocuments: (
    documents: DocumentRecord[],
    options: {
      projectId?: string;
      searchQuery?: string;
      filters?: { disiplin: string; previewReport: string; issue: string };
    }
  ): DocumentRecord[] => {
    const { projectId, searchQuery, filters } = options;
    const query = searchQuery?.toLowerCase().trim();

    return documents.filter(doc => {
      const matchesProject = !projectId || doc.projectId === projectId;
      const matchesSearch = !query || 
        doc.noDokumen.toLowerCase().includes(query) ||
        doc.namaDokumen.toLowerCase().includes(query);
      
      const matchesDisiplin = !filters?.disiplin || doc.disiplin === filters.disiplin;
      const matchesReport = !filters?.previewReport || doc.previewReport === filters.previewReport;
      const matchesIssue = !filters?.issue || doc.issue === filters.issue;

      return matchesProject && matchesSearch && matchesDisiplin && matchesReport && matchesIssue;
    });
  },

  /**
   * Calculates comprehensive project statistics in a single pass.
   */
  calculateProjectStats: (documents: DocumentRecord[], projectId: string) => {
    const filteredDocs = documents.filter(doc => doc.projectId === projectId);
    const total = filteredDocs.length;
    
    let approved = 0;
    let pending = 0;
    let rejected = 0;
    let comments = 0;
    let totalRejectedDocs = 0;
    const disciplines: Record<string, { total: number, approved: number, totalDays: number, count: number }> = {};
    const timeline: Record<string, number> = {};

    filteredDocs.forEach(doc => {
      if (doc.previewReport === 'A') approved++;
      else if (!doc.previewReport) pending++;
      else if (doc.previewReport === 'C') rejected++;
      else if (doc.previewReport === 'B') comments++;

      if (doc.history.some(h => h.previewReport === 'C')) totalRejectedDocs++;

      const disc = doc.disiplin || 'Uncategorized';
      if (!disciplines[disc]) disciplines[disc] = { total: 0, approved: 0, totalDays: 0, count: 0 };
      
      disciplines[disc].total++;
      
      const historyItems = [...doc.history].sort((a, b) => a.timestamp - b.timestamp);
      const approvedEntry = historyItems.find(h => h.previewReport === 'A');

      if (doc.previewReport === 'A') {
        disciplines[disc].approved++;
        if (approvedEntry) {
          const date = new Date(approvedEntry.timestamp).toISOString().split('T')[0];
          timeline[date] = (timeline[date] || 0) + 1;
        }
      }

      const startTs = (historyItems.length > 0 ? historyItems[0].timestamp : doc.createdAt) || Date.now();
      const endTs = approvedEntry ? approvedEntry.timestamp : Date.now();
      const diff = endTs - startTs;
      const durationDays = isNaN(diff) ? 0 : Math.max(0, diff / (1000 * 60 * 60 * 24));
      
      disciplines[disc].totalDays += durationDays;
      disciplines[disc].count++;
    });

    const journeyData = Object.keys(timeline).sort().reduce((acc, date) => {
      const prevCount = acc.length > 0 ? acc[acc.length - 1].count : 0;
      acc.push({ 
        date: date.split('-').slice(1).reverse().join('/'), 
        count: prevCount + timeline[date] 
      });
      return acc;
    }, [] as any[]);

    return {
      total, approved, pending, rejected, comments,
      approvedPct: total > 0 ? Math.round((approved / total) * 100) : 0,
      rejectRate: total > 0 ? Math.round((totalRejectedDocs / total) * 100) : 0,
      disciplines: Object.entries(disciplines).map(([name, val]) => ({ 
        name, 
        total: val.total,
        approved: val.approved,
        avgDays: Math.round(val.totalDays / val.count) || 0
      })).sort((a, b) => b.total - a.total),
      journeyData: journeyData.length > 0 ? journeyData : [{ date: 'Start', count: 0 }, { date: 'Today', count: 0 }]
    };
  }
};
