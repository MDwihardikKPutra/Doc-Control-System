import type { Project, SystemLog, DocumentRecord } from './types';


export const mockProjects: Project[] = [
  { id: 'p1', name: 'MDR Project Jakarta', code: 'JKT-001', description: 'Document tracking for Jakarta Head Office', status: 'Active' },
  { id: 'p2', name: 'Surabaya Construction', code: 'SUB-202', description: 'On-site document management for Surabaya plant', status: 'Active' },
  { id: 'p3', name: 'Kalimantan Bridge', code: 'KAL-77', description: 'Infrastructure project documents', status: 'On Hold' },
  { id: 'p4', name: 'Kalimantan Rail', code: 'KAL-99', description: 'New rail alignment project', status: 'Active' },
];

export const mockDocuments: DocumentRecord[] = [
  {
    id: "1", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-GNL-DWG-001",
    namaDokumen: "General Layout Sipil",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "004", tanggalTransmittal: "2026-03-16",
    issue: "IFA - For Re-Approval", noRevisi: 3, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h1-1", date: "16/03/2026, 10:00:00", timestamp: 1773900000000, transmittalType: "IN", transmittalNo: "004", tanggalTransmittal: "2026-03-16", lokasiStatus: "PGE", previewReport: "A", issue: "IFA - For Re-Approval", noRevisi: 3, deskripsiLink: "-" },
      { id: "h1-2", date: "12/03/2026, 10:00:00", timestamp: 1773554400000, transmittalType: "OUT", transmittalNo: "014", tanggalTransmittal: "2026-03-12", lokasiStatus: "PGE", previewReport: "A", issue: "IFA - For Re-Approval", noRevisi: 3, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "2", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-CIV-DWG-001",
    namaDokumen: "Cable trench / U-ditch incl penutup",
    previewReport: 'C',
    transmittalType: "IN", transmittalNo: "034", tanggalTransmittal: "2026-03-20",
    issue: "IFA - For Approval", noRevisi: 3, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h2-1", date: "20/03/2026, 10:00:00", timestamp: 1774245600000, transmittalType: "IN", transmittalNo: "034", tanggalTransmittal: "2026-03-20", lokasiStatus: "PGE", previewReport: "C", issue: "IFA - For Approval", noRevisi: 3, deskripsiLink: "-" },
      { id: "h2-2", date: "16/02/2026, 10:00:00", timestamp: 1771477200000, transmittalType: "OUT", transmittalNo: "008", tanggalTransmittal: "2026-02-16", lokasiStatus: "PGE", previewReport: "C", issue: "IFA - For Approval", noRevisi: 3, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "3", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-CIV-DWG-002",
    namaDokumen: "Cutting Length Cable",
    previewReport: 'A',
    transmittalType: "OUT", transmittalNo: "003", tanggalTransmittal: "2026-02-14",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h3-1", date: "14/02/2026, 10:00:00", timestamp: 1771304400000, transmittalType: "OUT", transmittalNo: "003", tanggalTransmittal: "2026-02-14", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h3-2", date: "13/02/2026, 10:00:00", timestamp: 1771218000000, transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-13", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "4", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-CIV-DWG-003",
    namaDokumen: "Grounding System",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-13",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h4-1", date: "13/02/2026, 10:00:00", timestamp: 1771218000000, transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-13", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h4-2", date: "13/02/2026, 09:00:00", timestamp: 1771214400000, transmittalType: "OUT", transmittalNo: "007", tanggalTransmittal: "2026-02-12", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "5", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-CIV-DWG-004",
    namaDokumen: "Pondasi & Steel Structure Lightning Arrester (LA) & Cable Sealing End",
    previewReport: 'C',
    transmittalType: "IN", transmittalNo: "034", tanggalTransmittal: "2026-03-16",
    issue: "IFA - For Re-Approval", noRevisi: 2, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h5-1", date: "16/03/2026, 10:00:00", timestamp: 1773900000000, transmittalType: "IN", transmittalNo: "034", tanggalTransmittal: "2026-03-16", lokasiStatus: "PGE", previewReport: "C", issue: "IFA - For Re-Approval", noRevisi: 2, deskripsiLink: "-" },
      { id: "h5-2", date: "26/02/2026, 10:00:00", timestamp: 1772341200000, transmittalType: "OUT", transmittalNo: "011", tanggalTransmittal: "2026-02-26", lokasiStatus: "PGE", previewReport: "C", issue: "IFA - For Re-Approval", noRevisi: 2, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "6", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-CIV-DWG-005",
    namaDokumen: "Support Cable Trench",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "004", tanggalTransmittal: "2026-03-16",
    issue: "IFA - For Re-Approval", noRevisi: 2, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h6-1", date: "16/03/2026, 10:00:00", timestamp: 1773900000000, transmittalType: "IN", transmittalNo: "004", tanggalTransmittal: "2026-03-16", lokasiStatus: "PGE", previewReport: "A", issue: "IFA - For Re-Approval", noRevisi: 2, deskripsiLink: "-" },
      { id: "h6-2", date: "12/03/2026, 10:00:00", timestamp: 1773554400000, transmittalType: "OUT", transmittalNo: "014", tanggalTransmittal: "2026-03-12", lokasiStatus: "PGE", previewReport: "A", issue: "IFA - For Re-Approval", noRevisi: 2, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "7", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-EM-DWG-001",
    namaDokumen: "Kabel Earthing / Grounding N2XY-1 0/1 kV 1x300",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-13",
    issue: "IFA - For Approval", noRevisi: 2, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h7-1", date: "13/02/2026, 10:00:00", timestamp: 1771218000000, transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-13", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 2, deskripsiLink: "-" },
      { id: "h7-2", date: "13/02/2026, 09:00:00", timestamp: 1771214400000, transmittalType: "OUT", transmittalNo: "007", tanggalTransmittal: "2026-02-13", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 2, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "8", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-EM-DWG-002",
    namaDokumen: "Cable Sealing End (CSE) & SVL Earthing Link Box",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-20",
    issue: "IFA - For Approval", noRevisi: 2, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h8-1", date: "20/02/2026, 10:00:00", timestamp: 1771909200000, transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-20", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 2, deskripsiLink: "-" },
      { id: "h8-2", date: "14/02/2026, 10:00:00", timestamp: 1771304400000, transmittalType: "OUT", transmittalNo: "003", tanggalTransmittal: "2026-02-14", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 2, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "9", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-EM-DWG-003",
    namaDokumen: "Kabel SKTT 150kV / UGC 1x630 mm2",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-13",
    issue: "IFA - For Approval", noRevisi: 2, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h9-1", date: "13/02/2026, 10:00:00", timestamp: 1771218000000, transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-13", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 2, deskripsiLink: "-" },
      { id: "h9-2", date: "13/02/2026, 09:00:00", timestamp: 1771214400000, transmittalType: "OUT", transmittalNo: "007", tanggalTransmittal: "2026-02-13", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 2, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "10", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-EM-DWG-004",
    namaDokumen: "Accessories Clam Connector",
    previewReport: 'A',
    transmittalType: "OUT", transmittalNo: "017", tanggalTransmittal: "2026-04-03",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h10-1", date: "03/04/2026, 10:00:00", timestamp: 1775455200000, transmittalType: "OUT", transmittalNo: "017", tanggalTransmittal: "2026-04-03", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" },
      { id: "h10-2", date: "16/03/2026, 10:00:00", timestamp: 1773900000000, transmittalType: "IN", transmittalNo: "034", tanggalTransmittal: "2026-03-16", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "11", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-EM-DWG-005",
    namaDokumen: "Single Line Diagram",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-18",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h11-1", date: "18/02/2026, 10:00:00", timestamp: 1771736400000, transmittalType: "IN", transmittalNo: "015", tanggalTransmittal: "2026-02-18", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h11-2", date: "12/02/2026, 10:00:00", timestamp: 1771131600000, transmittalType: "OUT", transmittalNo: "012", tanggalTransmittal: "2026-02-12", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "12", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-EM-DWG-006",
    namaDokumen: "Grounding Panel",
    previewReport: 'B',
    transmittalType: "OUT", transmittalNo: "017", tanggalTransmittal: "2026-04-03",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h12-1", date: "03/04/2026, 10:00:00", timestamp: 1775455200000, transmittalType: "OUT", transmittalNo: "017", tanggalTransmittal: "2026-04-03", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "B", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" },
      { id: "h12-2", date: "16/03/2026, 10:00:00", timestamp: 1773900000000, transmittalType: "IN", transmittalNo: "034", tanggalTransmittal: "2026-03-16", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "B", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "13", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "IDS-KLK-DED-EM-DWG-007",
    namaDokumen: "Kabel Conductor AAAC 630 mm2",
    previewReport: '',
    transmittalType: "IN", transmittalNo: "050", tanggalTransmittal: "2026-04-01",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h13-1", date: "01/04/2026, 10:00:00", timestamp: 1775282400000, transmittalType: "IN", transmittalNo: "050", tanggalTransmittal: "2026-04-01", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "14", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "003/MA-PIP/S/I/2026",
    namaDokumen: "Material Approval Kabel 1x300mm2",
    previewReport: 'A',
    transmittalType: "OUT", transmittalNo: "007", tanggalTransmittal: "2026-02-13",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h14-1", date: "13/02/2026, 10:00:00", timestamp: 1771218000000, transmittalType: "OUT", transmittalNo: "007", tanggalTransmittal: "2026-02-13", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" },
      { id: "h14-2", date: "10/02/2026, 10:00:00", timestamp: 1770958800000, transmittalType: "IN", transmittalNo: "013", tanggalTransmittal: "2026-02-10", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "15", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "004/MA-PIPS/S/I/2026",
    namaDokumen: "Material Approval Cable Sealing End (CSE) & Kabel 1x630mm2 SKTT 150 kV",
    previewReport: 'B',
    transmittalType: "IN", transmittalNo: "033", tanggalTransmittal: "2026-03-12",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h15-1", date: "12/03/2026, 10:00:00", timestamp: 1773554400000, transmittalType: "IN", transmittalNo: "033", tanggalTransmittal: "2026-03-12", lokasiStatus: "PGE", previewReport: "B", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h15-2", date: "27/02/2026, 10:00:00", timestamp: 1772427600000, transmittalType: "OUT", transmittalNo: "012", tanggalTransmittal: "2026-02-27", lokasiStatus: "PGE", previewReport: "B", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "16", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "005/MA-PIP/S/I/2026",
    namaDokumen: "Material Approval Accessories Clam Connector",
    previewReport: 'A',
    transmittalType: "OUT", transmittalNo: "017", tanggalTransmittal: "2026-04-03",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", deskripsiLink: "-",
    history: [
      { id: "h16-1", date: "03/04/2026, 10:00:00", timestamp: 1775455200000, transmittalType: "OUT", transmittalNo: "017", tanggalTransmittal: "2026-04-03", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h16-2", date: "16/03/2026, 10:00:00", timestamp: 1773900000000, transmittalType: "IN", transmittalNo: "034", tanggalTransmittal: "2026-03-16", lokasiStatus: "IDS (PT INFORMATION DATASYSTEM)", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "17", projectId: "p1", disiplin: "IDS - SHOP DRAWING EVAKUASI DAYA",
    noDokumen: "006/MA-PIPS/I/2026",
    namaDokumen: "Material Approval Kabel Conductor AAAC 630 m2",
    previewReport: 'A',
    transmittalType: "IN", transmittalNo: "050", tanggalTransmittal: "2026-04-01",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h17-1", date: "01/04/2026, 10:00:00", timestamp: 1775282400000, transmittalType: "IN", transmittalNo: "050", tanggalTransmittal: "2026-04-01", lokasiStatus: "PGE", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h17-2", date: "16/03/2026, 10:00:00", timestamp: 1773900000000, transmittalType: "OUT", transmittalNo: "015", tanggalTransmittal: "2026-03-16", lokasiStatus: "PGE", previewReport: "A", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "18", projectId: "p1", disiplin: "Process - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-PRO-PFD-001",
    namaDokumen: "PFD of Fuel Oil System",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "041", tanggalTransmittal: "2026-03-31",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h18-1", date: "31/03/2026, 10:00:00", timestamp: 1775196000000, transmittalType: "OUT", transmittalNo: "041", tanggalTransmittal: "2026-03-31", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "19", projectId: "p1", disiplin: "Process - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-PRO-PFD-002",
    namaDokumen: "PFD of Fire Fighting System",
    previewReport: 'B',
    transmittalType: "IN", transmittalNo: "017", tanggalTransmittal: "2026-04-03",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", deskripsiLink: "-",
    history: [
      { id: "h19-1", date: "03/04/2026, 10:00:00", timestamp: 1775455200000, transmittalType: "IN", transmittalNo: "017", tanggalTransmittal: "2026-04-03", lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", previewReport: "B", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" },
      { id: "h19-2", date: "25/02/2026, 10:00:00", timestamp: 1772152800000, transmittalType: "OUT", transmittalNo: "027", tanggalTransmittal: "2026-02-25", lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "20", projectId: "p1", disiplin: "Process - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-PRO-PID-001",
    namaDokumen: "P&ID of Fuel Oil System",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "040", tanggalTransmittal: "2026-03-31",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h20-1", date: "31/03/2026, 10:00:00", timestamp: 1775196000000, transmittalType: "OUT", transmittalNo: "040", tanggalTransmittal: "2026-03-31", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "21", projectId: "p1", disiplin: "Process - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-PRO-PID-002",
    namaDokumen: "P&ID of Fire Fighting System",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "027", tanggalTransmittal: "2026-02-25",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h21-1", date: "25/02/2026, 10:00:00", timestamp: 1772152800000, transmittalType: "OUT", transmittalNo: "027", tanggalTransmittal: "2026-02-25", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "22", projectId: "p1", disiplin: "Process - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-PRO-PID-003",
    namaDokumen: "P&ID of Compressed Air System",
    previewReport: 'C',
    transmittalType: "OUT", transmittalNo: "041", tanggalTransmittal: "2026-03-31",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h22-1", date: "31/03/2026, 10:00:00", timestamp: 1775196000000, transmittalType: "OUT", transmittalNo: "041", tanggalTransmittal: "2026-03-31", lokasiStatus: "PGE", previewReport: "C", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" },
      { id: "h22-2", date: "26/02/2026, 10:00:00", timestamp: 1772239200000, transmittalType: "IN", transmittalNo: "011", tanggalTransmittal: "2026-02-26", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "23", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-DWG-001",
    namaDokumen: "General Layout of Mechanical Equipment",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "048", tanggalTransmittal: "2026-04-01",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h23-1", date: "01/04/2026, 10:00:00", timestamp: 1775282400000, transmittalType: "OUT", transmittalNo: "048", tanggalTransmittal: "2026-04-01", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "24", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-DWG-004",
    namaDokumen: "General Arrangement Drawing of Settlement Tank 500 kL",
    previewReport: 'B',
    transmittalType: "IN", transmittalNo: "003", tanggalTransmittal: "2026-01-13",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", deskripsiLink: "-",
    history: [
      { id: "h24-1", date: "13/01/2026, 10:00:00", timestamp: 1768543200000, transmittalType: "IN", transmittalNo: "003", tanggalTransmittal: "2026-01-13", lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", previewReport: "B", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h24-2", date: "10/01/2026, 10:00:00", timestamp: 1768284000000, transmittalType: "OUT", transmittalNo: "003", tanggalTransmittal: "2026-01-10", lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", previewReport: "", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "25", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-DWG-005",
    namaDokumen: "General Arrangement Drawing of Clean Tank 150 KL",
    previewReport: 'B',
    transmittalType: "IN", transmittalNo: "003", tanggalTransmittal: "2026-01-13",
    issue: "IFA - For Approval", noRevisi: 1, lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", deskripsiLink: "-",
    history: [
      { id: "h25-1", date: "13/01/2026, 10:00:00", timestamp: 1768543200000, transmittalType: "IN", transmittalNo: "003", tanggalTransmittal: "2026-01-13", lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", previewReport: "B", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" },
      { id: "h25-2", date: "10/01/2026, 10:00:00", timestamp: 1768284000000, transmittalType: "OUT", transmittalNo: "003", tanggalTransmittal: "2026-01-10", lokasiStatus: "HJP (PT HUTAMA JAYA PERKASA)", previewReport: "", issue: "IFA - For Approval", noRevisi: 1, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "26", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-LST-001",
    namaDokumen: "Mechanical Equipment List",
    previewReport: '',
    transmittalType: "IN", transmittalNo: "-", tanggalTransmittal: "-",
    issue: "-", noRevisi: 0, lokasiStatus: "-", deskripsiLink: "-",
    history: [], createdAt: 0
  },
  {
    id: "27", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-LST-002",
    namaDokumen: "Approval Painting of Fuel Tank 500kl & 150KL Work",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "055", tanggalTransmittal: "2026-04-09",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h27-1", date: "09/04/2026, 10:00:00", timestamp: 1775973600000, transmittalType: "OUT", transmittalNo: "055", tanggalTransmittal: "2026-04-09", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "28", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-E&WM-001",
    namaDokumen: "Equipment & Work Method of Fuel Tank 500kl & 150KL Work",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "042", tanggalTransmittal: "2026-03-31",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h28-1", date: "31/03/2026, 10:00:00", timestamp: 1775196000000, transmittalType: "OUT", transmittalNo: "042", tanggalTransmittal: "2026-03-31", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "29", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-ITP-001",
    namaDokumen: "Inspection Test Plan of Fuel Tank 500kl & 150KL Work",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "054", tanggalTransmittal: "2026-04-07",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h29-1", date: "07/04/2026, 10:00:00", timestamp: 1775800800000, transmittalType: "OUT", transmittalNo: "054", tanggalTransmittal: "2026-04-07", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "30", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-ITP-004",
    namaDokumen: "Inspection Test Plan of Package Work",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "020", tanggalTransmittal: "2026-02-24",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h30-1", date: "24/02/2026, 10:00:00", timestamp: 1772066400000, transmittalType: "OUT", transmittalNo: "020", tanggalTransmittal: "2026-02-24", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "31", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-CAL-001",
    namaDokumen: "Calculation of Design Settlement Tank 500 kL",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "043", tanggalTransmittal: "2026-03-31",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h31-1", date: "31/03/2026, 10:00:00", timestamp: 1775196000000, transmittalType: "OUT", transmittalNo: "043", tanggalTransmittal: "2026-03-31", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  },
  {
    id: "32", projectId: "p1", disiplin: "MECHANICAL TANGKI 500 KL & 150 KL - HJP - SHOP DRAWING FUEL OIL & FIRE FIGHTING SYSTEMS",
    noDokumen: "HJP-KLK-DED-MEC-CAL-002",
    namaDokumen: "Calculation of Design Settlement Tank 150 kL",
    previewReport: '',
    transmittalType: "OUT", transmittalNo: "043", tanggalTransmittal: "2026-03-31",
    issue: "IFA - For Approval", noRevisi: 0, lokasiStatus: "PGE", deskripsiLink: "-",
    history: [
      { id: "h32-1", date: "31/03/2026, 10:00:00", timestamp: 1775196000000, transmittalType: "OUT", transmittalNo: "043", tanggalTransmittal: "2026-03-31", lokasiStatus: "PGE", previewReport: "", issue: "IFA - For Approval", noRevisi: 0, deskripsiLink: "-" }
    ], createdAt: 0
  }
];

export const mockLogs: SystemLog[] = [
  {
    id: 'l1',
    timestamp: 1776321600000,
    date: '16/04/2026, 13:00:00',
    user: 'Doc Control',
    type: 'SYSTEM',
    action: 'CREATE',
    description: 'System updated with MDR spreadsheet data (rows 1-17) and specific locations.',
  }
];
