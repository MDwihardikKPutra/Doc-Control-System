# API Specification (Internal Modules)

This document provides a formal specification of the internal data services and state interfaces (Hooks) used in the Document Management System. It follows an OpenAPI-style documentation format to prepare for future backend integration.

## 📋 Table of Contents
- [Data Schemas](#-data-schemas)
- [Project Service API](#-project-service-api)
- [Document Service API](#-document-service-api)
- [Audit & Logging API](#-audit-logging-api)

---

## 🏗️ Data Schemas

### Project
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Globally unique identifier (crypto-safe). |
| `code` | `string` | Unique project code (e.g., P-2026-001). |
| `name` | `string` | Human-readable project name. |
| `description` | `string` | Detailed project description. |
| `status` | `enum` | `Active` \| `Archived` |

### DocumentRecord
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Unique document identifier. |
| `projectId` | `uuid` | Reference to the parent Project. |
| `noDokumen` | `string` | Project-specific document number. |
| `disiplin` | `string` | Department or Discipline (e.g., MECHANICAL). |
| `previewReport` | `enum` | `A` (Approved) \| `B` (Notes) \| `C` (Rejected) |
| `history` | `array` | Collection of `DocumentHistory` entries. |

---

## 📦 Project Service API
Managed via `useProjects()` Hook.

### Add New Project
**Method:** `addProject(data)`
- **Input:** `Omit<Project, 'id'>`
- **Output:** `boolean` (Success/Fail)
- **Rules:** 
  - Validates project name for slug collisions before persistence.

### Update Project
**Method:** `updateProject(id, data)`
- **Input:** `id: string`, `Partial<Project>`
- **Output:** `boolean`

---

## 📄 Document Service API
Managed via `useDocuments()` Hook and `DocumentService`.

### Get Filtered Documents
**Method:** `DocumentService.filterDocuments(documents, options)`
- **Parameters:**
  - `projectId`: Filter by specific project.
  - `searchQuery`: Full-text search on Doc No and Title.
  - `filters`: Multi-criteria filter (Discipline, Status, Issue).
- **Complexity:** $O(N)$

### Calculate Analytics
**Method:** `DocumentService.calculateProjectStats(documents, projectId)`
- **Output:** 
  ```json
  {
    "total": 150,
    "approved": 45,
    "approvedPct": 30,
    "journeyData": [{"date": "01/01", "count": 10}],
    "disciplines": [{"name": "CIVIL", "avgDays": 12}]
  }
  ```
- **Description:** Single-pass calculation engine for S-Curve and Lead Time distribution.

---

## 🔍 Audit & Logging API
Managed via `useAudit()` Hook.

### Standardized Logging
**Method:** `addLog(type, action, description, details?, metadata?)`
- **Types:** `PROJECT` \| `DOCUMENT` \| `SYSTEM`
- **Actions:** `CREATE` \| `UPDATE` \| `DELETE`
- **Sample Entry:**
  ```json
  {
    "id": "uuid",
    "timestamp": 1713590000000,
    "date": "2026-04-20T04:29:41Z",
    "type": "DOCUMENT",
    "action": "UPDATE",
    "description": "Updated status to Approved"
  }
  ```

---

## 📡 Example Response (Mock Data)

### `GET /api/projects`
```json
[
  {
    "id": "84a3b8...",
    "code": "PJ-001",
    "name": "Refinery Expansion",
    "status": "Active"
  }
]
```

### `GET /api/documents`
```json
[
  {
    "id": "dc-102",
    "noDokumen": "PJ-CIV-001",
    "namaDokumen": "Foundation Detail Plan",
    "previewReport": "A",
    "history": []
  }
]
```
