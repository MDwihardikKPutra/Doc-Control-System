import React, { useState, useEffect } from 'react';
import { RightSidebar } from '../common/RightSidebar';

interface AddProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onSubmit: (data: any) => void;
}

export const AddProjectSidebar: React.FC<AddProjectSidebarProps> = ({ 
  isOpen, onClose, initialData, onSubmit
}) => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    status: 'Active',
    client: '',
    pm: '',
    description: '',
    predefinedLocations: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          code: initialData.code || '',
          name: initialData.name || '',
          status: initialData.status || 'Active',
          client: initialData.client || '',
          pm: initialData.pm || '',
          description: initialData.description || '',
          predefinedLocations: initialData.predefinedLocations || ''
        });
      } else {
        setFormData({
          code: '',
          name: '',
          status: 'Active',
          client: '',
          pm: '',
          description: '',
          predefinedLocations: ''
        });
      }
    }
  }, [isOpen, initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditMode = !!initialData;

  return (
    <RightSidebar
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Project Details" : "Register New Project"}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
          <button type="button" className="btn" style={{ height: '32px', padding: '0 16px' }} onClick={onClose}>Discard</button>
          <button 
            type="submit" 
            form="add-project-sidebar-form"
            className="btn btn-primary" 
            style={{ height: '32px', padding: '0 20px' }}
          >
            {isEditMode ? "Save Changes" : "Create Project"}
          </button>
        </div>
      }
    >
      <form id="add-project-sidebar-form" onSubmit={handleLocalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Project Code</label>
            <input 
              required 
              type="text" 
              name="code" 
              value={formData.code} 
              onChange={handleInputChange} 
              className="form-input" 
              placeholder="e.g. MDR-JKT-2026"
              disabled={isEditMode}
              style={{ backgroundColor: isEditMode ? '#f1f5f9' : undefined, cursor: isEditMode ? 'not-allowed' : undefined }}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Initial Status</label>
            <select 
              name="status" 
              value={formData.status} 
              onChange={handleInputChange} 
              className="form-select"
            >
              <option value="Active">Active</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Project Name</label>
          <input 
            required 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            className="form-input" 
            placeholder="Official project title"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Client Name</label>
            <input 
              type="text" 
              name="client" 
              value={formData.client} 
              onChange={handleInputChange} 
              className="form-input" 
              placeholder="e.g. Pertamina"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Project Manager</label>
            <input 
              type="text" 
              name="pm" 
              value={formData.pm} 
              onChange={handleInputChange} 
              className="form-input" 
              placeholder="e.g. John Doe"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea 
            required 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange} 
            className="form-input" 
            rows={3}
            style={{ resize: 'none' }}
            placeholder="Provide a brief overview of the project scope..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Predefined Locations (Comma separated)</label>
          <textarea 
            name="predefinedLocations" 
            value={formData.predefinedLocations} 
            onChange={handleInputChange} 
            className="form-input" 
            rows={3}
            style={{ resize: 'none', border: '1px dashed var(--border-color)', backgroundColor: 'var(--bg-main)' }}
            placeholder="e.g. HJP, IDS, PGE, Client Office"
          />
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Separate each location name with a comma.</p>
        </div>
      </form>
    </RightSidebar>
  );
};
