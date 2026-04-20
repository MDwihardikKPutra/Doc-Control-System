import React from 'react';
import { X } from 'lucide-react';

interface LinkModalProps {
  modalData: any;
  linkInput: string;
  setLinkInput: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export const LinkModal: React.FC<LinkModalProps> = ({ modalData, linkInput, setLinkInput, onClose, onSave }) => {
  if (!modalData) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <div className="modal-content" style={{ width: '400px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Update Document Link</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}><X size={18} /></button>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#000000', marginBottom: '8px' }}>URL / File Path</label>
          <input 
            type="text" 
            value={linkInput} 
            onChange={(e) => setLinkInput(e.target.value)} 
            placeholder="https://example.com/file.pdf"
            autoFocus
            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1.5px solid #e2e8f0', fontSize: '13px', outline: 'none' }}
          />
          <p style={{ fontSize: '11px', color: '#000000', marginTop: '8px' }}>Type the link address or path to the document.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn">Cancel</button>
          <button onClick={onSave} className="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  );
};
