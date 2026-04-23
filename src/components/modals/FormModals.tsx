import { RightSidebar } from '../common/RightSidebar';

interface LinkModalProps {
  modalData: any;
  linkInput: string;
  setLinkInput: (v: string) => void;
  onClose: () => void;
  onSave: () => void;
}

export const LinkModal: React.FC<LinkModalProps> = ({ modalData, linkInput, setLinkInput, onClose, onSave }) => {
  return (
    <RightSidebar 
      isOpen={!!modalData} 
      onClose={onClose} 
      title="Update Document Link" 
      width="450px"
      footer={
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
          <button onClick={onClose} className="btn" style={{ height: '32px', padding: '0 16px' }}>Cancel</button>
          <button onClick={onSave} className="btn btn-primary" style={{ height: '32px', padding: '0 20px' }}>OK</button>
        </div>
      }
    >
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>URL / File Path</label>
          <input 
            type="text" 
            value={linkInput} 
            onChange={(e) => setLinkInput(e.target.value)} 
            placeholder="https://example.com/file.pdf"
            autoFocus
            className="form-input"
            style={{ fontWeight: 600 }}
          />
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>Type the link address or path to the document.</p>
        </div>
      </div>
    </RightSidebar>
  );
};
