Berarti arah sistemnya bukan “document storage”, tapi lebih ke **document tracking board**—daftar dokumen sudah ada, sistem hanya jadi tempat memantau status, perpindahan, dan revisinya.

Aku rapikan PRD-nya biar konsisten dengan itu.

---

# **Product Requirements Document (PRD)**

## **Document Tracking System (DTS)**

### 1. **Latar Belakang**

Dokumen proyek sudah tersimpan di luar sistem (misalnya Google Drive), namun proses tracking masih dilakukan manual melalui spreadsheet. Hal ini menyulitkan dalam menjaga konsistensi status, memantau progres, dan melacak revisi.

Sistem ini difokuskan sebagai alat kontrol dan monitoring, bukan penyimpanan dokumen.

---

### 2. **Tujuan**

* Menyediakan daftar terpusat seluruh dokumen proyek
* Mempermudah tracking status dan lokasi dokumen
* Menjaga konsistensi data dan histori perubahan
* Memberikan visibilitas progress secara cepat dan jelas

---

### 3. **Ruang Lingkup**

#### **In Scope**

* Listing dokumen (tanpa upload file)
* Tracking status approval
* Tracking lokasi dokumen
* Manajemen revisi
* Link ke dokumen eksternal
* Dashboard monitoring

#### **Out of Scope**

* Upload / penyimpanan file
* File preview dalam sistem
* Integrasi storage (Drive, S3, dll)

---

### 4. **Pengguna**

**Doc Control (single user)**

* Menginput daftar dokumen
* Mengupdate status dan lokasi
* Mengelola revisi
* Memastikan data tetap konsisten

---

### 5. **Konsep Utama**

#### **5.1 Document as Record (Bukan File)**

Dokumen direpresentasikan sebagai **data/record**, bukan file.
File asli tetap berada di luar sistem dan hanya direferensikan melalui link.

---

#### **5.2 External Link**

Setiap dokumen memiliki:

* Link ke file (Google Drive / SharePoint / dll)
* Sistem tidak menyimpan file tersebut

---

#### **5.3 Project-Based Lokasi**

Setiap project memiliki daftar lokasi/status sendiri, misalnya:

* Under Review PGE
* IDS
* HJP

Lokasi ini:

* Bisa dikustom per project
* Digunakan untuk tracking perpindahan dokumen

---

#### **5.4 Status Approval**

Status bersifat standar:

* **A – Approved**
* **B – Approved with Note**
* **C – Not Approved**

---

#### **5.5 Revisi**

* Setiap dokumen memiliki nomor revisi
* Revisi dicatat sebagai perubahan status/data
* Tidak ada file baru yang diupload, hanya update metadata

---

### 6. **Fitur Utama**

#### **6.1 Document Listing**

* Input data dokumen (manual atau bulk)
* Field utama:

  * No Dokumen
  * Nama Dokumen
  * Disiplin
  * Project
  * Link Dokumen
  * Tanggal masuk / keluar

---

#### **6.2 Status Tracking**

* Update:

  * Status approval (A/B/C)
  * Issue (IFA / Re-Approval)
  * Lokasi dokumen
* Perubahan langsung tercermin di dashboard

---

#### **6.3 Revisi Management**

* Increment nomor revisi
* Update tanggal dan status
* Histori perubahan tetap tersimpan

---

#### **6.4 Project Configuration**

* Membuat project
* Menentukan daftar lokasi/status untuk project tersebut
* Lokasi hanya berlaku dalam project itu

---

#### **6.5 Dashboard**

* Total dokumen per status
* Dokumen pending review
* Progress per project
* Visual sederhana (mirip spreadsheet, tapi lebih terstruktur)

---

#### **6.6 Histori Perubahan**

* Mencatat setiap perubahan:

  * Status
  * Lokasi
  * Revisi
* Berguna untuk audit dan tracking masalah

---

### 7. **Alur Sistem**

#### **7.1 Input Dokumen**

Doc Control:

* Menambahkan record dokumen
* Menyertakan link eksternal
* Menentukan project dan lokasi awal

---

#### **7.2 Update Status**

Doc Control:

* Mengupdate hasil review
* Mengubah status approval
* Memindahkan lokasi dokumen sesuai progres

---

#### **7.3 Revisi**

Jika dokumen perlu revisi:

* Status menjadi Re-Approval
* Nomor revisi bertambah
* Data diperbarui (tanpa upload file baru)

---

### 8. **Kebutuhan Non-Fungsional**

* Cepat dan ringan (karena tanpa file handling)
* Mudah digunakan (mirip spreadsheet)
* Konsistensi data tinggi
* Mendukung jumlah data besar
* Audit trail tersedia

---

### 9. **Struktur Data (Konseptual)**

#### **Project**

Menyimpan informasi project

#### **Lokasi Project**

Daftar lokasi/status khusus untuk tiap project

#### **Dokumen**

Menyimpan seluruh metadata dokumen:

* Identitas dokumen
* Link eksternal
* Status
* Lokasi
* Revisi

#### **Histori**

Menyimpan log perubahan dokumen

---

### 10. **Indikator Keberhasilan**

* Tracking dokumen lebih cepat dan jelas
* Tidak ada perbedaan status antar data
* Revisi terdokumentasi dengan baik
* Penggunaan spreadsheet manual berkurang atau hilang

---

### 11. **Arah Pengembangan**

* Bulk import dari Excel
* Notifikasi perubahan status
* Multi-user (reviewer/client)
* Integrasi langsung ke storage

---

Kalau dilihat sekarang, sistemmu ini jadi lebih “tajam”:

Bukan tempat simpan file, tapi **satu sumber kebenaran untuk status dokumen**.

Dan itu justru yang biasanya paling sering kacau di project.
