import React, { useState } from 'react';
import { 
  Activity, 
  Database, 
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

// BLUEPRINT GRID BACKGROUND HELPER
const BLUEPRINT_GRID = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23e2e8f0' stroke-width='0.5'/%3E%3C/svg%3E")`;

export const HelpCenterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'arch' | 'sync' | 'lifecycle' | 'audit'>('arch');

  const menuItems = [
    { id: 'arch' as const, label: '01. DATA ARCHITECTURE', desc: 'Schema & ER-Model', icon: Database },
    { id: 'sync' as const, label: '02. REACTIVE SYNC LOGIC', desc: 'Algorithm & State', icon: Zap },
    { id: 'lifecycle' as const, label: '03. DOCUMENT LIFECYCLE', desc: 'Procedures & Locks', icon: Activity },
    { id: 'audit' as const, label: '04. AUDIT & STANDARDS', desc: 'Traceability Specs', icon: ShieldCheck },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'arch':
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ borderBottom: `1.5px solid var(--text-primary)`, paddingBottom: '20px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>01. System Data Architecture</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spesifikasi teknis model data objek Document Control.</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '20px' }}>
              
              <section style={{ marginBottom: '48px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px', color: 'var(--text-secondary)' }}>
                   Entity-Relationship Logical Flow
                </h4>
                
                {/* CSS FLOWCHART WITH BLUEPRINT GRID */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  padding: '40px',
                  border: '1px solid var(--border-color)',
                  backgroundImage: BLUEPRINT_GRID,
                  backgroundColor: '#ffffff',
                  marginBottom: '40px' 
                }}>
                   <div style={{ padding: '10px 20px', border: `1px solid var(--text-primary)`, backgroundColor: 'white', fontSize: '10px', fontWeight: 900 }}>PROJECT_WORKSPACE (ID, CODE)</div>
                   <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--text-primary)' }}></div>
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '1px', backgroundColor: 'var(--text-primary)' }}></div>
                      <div style={{ padding: '3px 6px', border: `1px solid var(--text-primary)`, fontSize: '8px', fontWeight: 800, backgroundColor: 'white' }}>1 : N</div>
                      <div style={{ width: '8px', height: '1px', backgroundColor: 'var(--text-primary)' }}></div>
                   </div>
                   <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--text-primary)' }}></div>
                   <div style={{ padding: '10px 20px', border: `1px solid var(--text-primary)`, backgroundColor: 'white', fontSize: '10px', fontWeight: 900 }}>DOCUMENT_ASSET (noDokumen, projectId)</div>
                   <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--text-primary)' }}></div>
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '1px', backgroundColor: 'var(--text-primary)' }}></div>
                      <div style={{ padding: '3px 6px', border: `1px solid var(--text-primary)`, fontSize: '8px', fontWeight: 800, backgroundColor: 'white' }}>REVISIONS</div>
                      <div style={{ width: '8px', height: '1px', backgroundColor: 'var(--text-primary)' }}></div>
                   </div>
                   <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--text-primary)' }}></div>
                   <div style={{ padding: '10px 20px', border: `1px solid var(--text-primary)`, backgroundColor: 'white', fontSize: '10px', fontWeight: 900 }}>REVISION_ENTRY (timestamp, transmittalNo)</div>
                </div>

                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
                  Sistem ini mematuhi standar integritas data di mana satu dokumen bertindak sebagai kontainer tunggal untuk seluruh riwayat peredarannya.
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--text-primary)' }}>
                      <th style={{ padding: '10px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Field Name</th>
                      <th style={{ padding: '10px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value Type</th>
                      <th style={{ padding: '10px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Logic Spec</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 0', fontWeight: 700 }}>noDokumen</td>
                      <td style={{ padding: '12px 0' }}>Unique String</td>
                      <td style={{ padding: '12px 0', color: 'var(--text-secondary)' }}>Kunci utama identifikasi aset di seluruh sistem.</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 0', fontWeight: 700 }}>history[]</td>
                      <td style={{ padding: '12px 0' }}>Array&lt;Obj&gt;</td>
                      <td style={{ padding: '12px 0', color: 'var(--text-secondary)' }}>Tumpukan data kronologis pelacakan revisi.</td>
                    </tr>
                  </tbody>
                </table>
              </section>

            </div>
          </div>
        );
      case 'sync':
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ borderBottom: `1.5px solid var(--text-primary)`, paddingBottom: '20px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>02. Reactive Sync Algorithm</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mekanisme sinkronisasi real-time dashboard.</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              <section style={{ marginBottom: '48px' }}>
                 <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px', color: 'var(--text-secondary)' }}>Synchronous Data Projection Path</h4>
                 
                 <div style={{ 
                   display: 'flex', 
                   alignItems: 'center', 
                   gap: '12px', 
                   padding: '40px',
                   border: '1px solid var(--border-color)',
                   backgroundImage: BLUEPRINT_GRID,
                   backgroundColor: '#ffffff',
                   marginBottom: '40px',
                   justifyContent: 'center'
                 }}>
                    <div style={{ padding: '12px', border: '1px solid var(--text-primary)', fontSize: '9px', textAlign: 'center', backgroundColor: 'white', width: '120px', fontWeight: 800 }}>
                       INPUT EVENT<br/>History Added
                    </div>
                    <ArrowRight size={14} />
                    <div style={{ padding: '12px', border: '1px solid var(--text-primary)', fontSize: '9px', textAlign: 'center', backgroundColor: '#f8fafc', width: '160px', fontWeight: 900 }}>
                       ALGORITHM<br/>syncWithLatestHistory()
                    </div>
                    <ArrowRight size={14} />
                    <div style={{ padding: '12px', border: '1px solid var(--text-primary)', fontSize: '9px', textAlign: 'center', backgroundColor: 'white', width: '120px', fontWeight: 800 }}>
                       OUTPUT<br/>Projected State
                    </div>
                 </div>

                 <div style={{ padding: '24px', backgroundColor: '#0f172a', color: '#cbd5e1', borderRadius: '0px', border: '1px solid #1e293b', fontFamily: 'monospace', fontSize: '11px', lineHeight: '1.6' }}>
                    <span style={{ color: '#94a3b8' }}>// Reactive Computation Logic</span><br/>
                    function sync(doc) &#123;<br/>
                    &nbsp;&nbsp;const latest = doc.history.sort((a,b) =&gt; b.timestamp - a.timestamp)[0];<br/>
                    &nbsp;&nbsp;return &#123; ...doc, ...latest &#125;;<br/>
                    &#125;
                 </div>
              </section>
            </div>
          </div>
        );
      case 'lifecycle':
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ borderBottom: `1.5px solid var(--text-primary)`, paddingBottom: '20px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>03. Document Lifecycle Path</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Protokol alur pergerakan dokumen proyek.</p>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              <section style={{ marginBottom: '48px' }}>
                 <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '32px', color: 'var(--text-secondary)' }}>Status State Machine</h4>
                 
                 <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '24px', 
                    padding: '32px',
                    border: '1px solid var(--border-color)',
                    backgroundImage: BLUEPRINT_GRID,
                    backgroundColor: '#ffffff'
                 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                       <div style={{ padding: '16px', border: '1px solid var(--text-primary)', backgroundColor: 'white' }}>
                          <div style={{ fontSize: '8px', fontWeight: 900, color: '#059669', marginBottom: '4px' }}>ACCESS: UNLOCKED</div>
                          <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>1. Internal Processing</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>Metadata dapat diperbarui secara manual.</div>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'center' }}><ChevronDown size={14} /></div>
                       <div style={{ padding: '16px', border: '1.5px solid var(--text-primary)', backgroundColor: '#fff5f5' }}>
                          <div style={{ fontSize: '8px', fontWeight: 900, color: '#dc2626', marginBottom: '4px' }}>ACCESS: LOCKED</div>
                          <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>2. Transmittal Out (Review)</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>Sistem membekukan metadata untuk menjaga integritas audit klien.</div>
                       </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                       <div style={{ padding: '16px', border: '1px solid var(--text-primary)', backgroundColor: 'white' }}>
                          <div style={{ fontSize: '8px', fontWeight: 900, color: '#059669', marginBottom: '4px' }}>ACCESS: RESTORED</div>
                          <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>3. Transmittal In (Return)</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>Input TR-IN melepaskan kunci metadata sistem.</div>
                       </div>
                       <div style={{ display: 'flex', justifyContent: 'center' }}><ChevronDown size={14} /></div>
                       <div style={{ padding: '16px', border: '1px solid var(--text-primary)', backgroundColor: '#f8fafc' }}>
                          <div style={{ fontSize: '8px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>STATE: FINALIZED</div>
                          <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>4. Approval & Archive</div>
                          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>Siklus teknis selesai dengan status Approved.</div>
                       </div>
                    </div>
                 </div>
              </section>
            </div>
          </div>
        );
      case 'audit':
        return (
          <div style={{ height: '100%' }}>
            <div style={{ borderBottom: `1.5px solid var(--text-primary)`, paddingBottom: '20px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>04. Accountability Standards</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Protokol audit dan integritas data operasional.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
               <section style={{ paddingLeft: '24px', borderLeft: '1px solid var(--text-primary)' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '12px', textTransform: 'uppercase' }}>Technical Audit Trail</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    Setiap mutasi database melalui antarmuka web (Batch Update, Bulk Add, atau Single Edit) secara atomik menciptakan entry log audit untuk menjamin ketertelusuran penuh.
                  </p>
               </section>

               <section style={{ paddingLeft: '24px', borderLeft: '1px solid var(--text-primary)' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '12px', textTransform: 'uppercase' }}>Integrity Protocols</h4>
                  <ul style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
                    <li><strong>[01] LINK VALIDITY:</strong> Tautan dokumen cloud storage bersifat mandiri per revisi.</li>
                    <li><strong>[02] KEY UNIQUENESS:</strong> Validasi nomor dokumen dilakukan saat commit data registrasi.</li>
                    <li><strong>[03] TIME COMPLIANCE:</strong> Semua timestamp menggunakan standar UTC untuk konsistensi log global.</li>
                  </ul>
               </section>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', overflow: 'hidden', backgroundColor: 'transparent' }}>
      
      {/* LEFT NAVIGATION: MINIMALIST PROFESSIONAL */}
      <div style={{ 
        width: '280px', 
        borderRight: '1px solid var(--border-color)', 
        backgroundColor: '#ffffff', 
        padding: '60px 0', 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        <div style={{ padding: '0 32px' }}>
          <div style={{ fontSize: '9px', fontWeight: 900, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '40px', letterSpacing: '0.25em' }}>Manual Contents</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  border: 'none',
                  backgroundColor: activeTab === item.id ? 'var(--text-primary)' : 'transparent',
                  color: activeTab === item.id ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease-in-out',
                  borderRadius: 0,
                  borderLeft: activeTab === item.id ? '4px solid #10b981' : '4px solid transparent'
                }}
              >
                <item.icon size={14} />
                <div>
                   <div style={{ fontSize: '11px', fontWeight: 800 }}>{item.label}</div>
                   <div style={{ fontSize: '8px', opacity: 0.6, marginTop: '2px' }}>{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', padding: '0 32px' }}>
           <div style={{ padding: '20px', border: '1px solid var(--border-color)', backgroundColor: 'transparent' }}>
              <div style={{ fontSize: '9px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doc-Control Standard</div>
              <p style={{ fontSize: '9px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Technical Manual v1.4.1. Berdasarkan standar industri pelacakan dokumen proyek.</p>
           </div>
        </div>
      </div>

      {/* MAIN VIEWPORT: HIGH-DENSITY FLAT */}
      <div style={{ flex: 1, padding: '60px 80px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: '900px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {renderContent()}
        </div>
      </div>

    </div>
  );
};
