export interface Project {
  id: string;
  name: string;
  code: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold';
  client?: string;
  pm?: string;
}

export interface DocumentHistory {
  id: string;
  date: string;
  timestamp: number;
  transmittalType: 'IN' | 'OUT' | '';
  transmittalNo: string;
  tanggalTransmittal: string;
  lokasiStatus: string;
  previewReport: 'A' | 'B' | 'C' | '';
  issue: string;
  noRevisi: number;
  deskripsiLink?: string;
}

export interface SystemLog {
  id: string;
  timestamp: number;
  date: string;
  user: string;
  type: 'PROJECT' | 'DOCUMENT' | 'SYSTEM';
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  description: string;
  projectId?: string;
  docNo?: string;
  details?: string;
}

export interface DocumentRecord {
  id: string;
  projectId: string;
  disiplin: string;
  noDokumen: string;
  namaDokumen: string;
  previewReport: 'A' | 'B' | 'C' | '';
  transmittalType: 'IN' | 'OUT' | '';
  transmittalNo: string;
  tanggalTransmittal: string;
  issue: string;
  noRevisi: number;
  lokasiStatus: string;
  deskripsiLink: string;
  history: DocumentHistory[];
  createdAt: number;
}
