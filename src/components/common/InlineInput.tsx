import React, { useState, useRef, useEffect } from 'react';

interface InlineInputProps {
  id: string;
  val: any;
  fieldKey: string;
  draftEdits: Record<string, any>;
  onDraftChange: (id: string, field: string, value: any) => void;
  type?: 'text' | 'number' | 'date' | 'select';
  bold?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  multiline?: boolean;
  options?: string[];
  onAddNewOption?: (fieldKey: string) => void;
  placeholder?: string;
  editable?: boolean;
  fontSize?: string;
}

export const InlineInput: React.FC<InlineInputProps> = ({ 
  id, val, fieldKey, draftEdits, onDraftChange, type = 'text', bold, align = 'left', width, multiline, options, onAddNewOption, placeholder, editable = true, fontSize = '14px'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const draftVal = draftEdits[id]?.[fieldKey];
  const activeVal = draftVal !== undefined ? draftVal : val;
  const isDirty = draftVal !== undefined && draftVal !== val;

  // Handle outside click to close editor
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsEditing(false);
      }
    }
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const renderDisplay = () => {
    if (type === 'date') {
      return activeVal ? new Date(activeVal).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '-';
    }
    if (activeVal === 0) return '0';
    return activeVal || (placeholder || '-');
  };

  if (isEditing && editable) {
    return (
      <div ref={containerRef} style={{ width: width || '100%' }}>
        {type === 'select' ? (
          <div style={{ display: 'flex', gap: '2px', width: '100%' }}>
            <select
              autoFocus
              value={activeVal}
              onChange={(e) => {
                if (e.target.value === 'ADD_NEW' && onAddNewOption) {
                  onAddNewOption(fieldKey);
                } else {
                  onDraftChange(id, fieldKey, e.target.value);
                  setIsEditing(false);
                }
              }}
              style={{
                width: '100%',
                padding: '2px 4px',
                fontSize: fontSize,
                border: 'var(--border-width) solid var(--accent)',
                borderRadius: '4px',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="">None</option>
              {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              {onAddNewOption && <option value="ADD_NEW">+ Add New</option>}
            </select>
          </div>
        ) : multiline ? (
          <textarea
            autoFocus
            value={activeVal === 0 ? '0' : activeVal || ''}
            onChange={(e) => onDraftChange(id, fieldKey, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setIsEditing(false);
              }
            }}
            style={{
              width: '100%',
              minHeight: '40px',
              padding: '4px 6px',
              fontSize: fontSize,
              border: 'var(--border-width) solid var(--accent)',
              borderRadius: '4px',
              outline: 'none',
              resize: 'vertical',
              backgroundColor: 'white',
              fontFamily: 'inherit'
            }}
          />
        ) : (
          <input
            autoFocus
            type={type}
            value={activeVal === 0 ? '0' : activeVal || ''}
            onChange={(e) => onDraftChange(id, fieldKey, e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            style={{
              width: width || '100%',
              padding: '2px 6px',
              fontSize: fontSize,
              border: 'var(--border-width) solid var(--accent)',
              borderRadius: '4px',
              outline: 'none',
              textAlign: align,
              backgroundColor: 'white',
              fontWeight: bold ? 700 : 400
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={() => editable && setIsEditing(true)}
      style={{ 
        cursor: editable ? 'pointer' : 'default',
        padding: '2px 4px',
        borderRadius: '4px',
        border: isDirty ? 'var(--border-width) dashed var(--accent)' : '1px solid transparent',
        backgroundColor: isDirty ? 'var(--accent-soft)' : 'transparent',
        fontWeight: bold || isDirty ? 600 : 400,
        textAlign: align,
        width: width || 'auto',
        fontSize: fontSize,
        color: (activeVal === '-' || !activeVal) && activeVal !== 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
        minHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        whiteSpace: multiline ? 'normal' : 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    >
      {renderDisplay()}
    </div>
  );
};
