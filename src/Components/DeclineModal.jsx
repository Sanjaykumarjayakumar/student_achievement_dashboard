import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import './DeclineModal.css';

const DeclineModal = ({ onClose, onConfirm }) => {
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!remarks.trim()) {
      setError('Please provide a reason for declining this request');
      return;
    }

    if (remarks.trim().length < 10) {
      setError('Please provide a more detailed reason (at least 10 characters)');
      return;
    }

    onConfirm(remarks);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content decline-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-with-icon">
            <div className="warning-icon">
              <AlertCircle size={24} />
            </div>
            <h2>Decline Request</h2>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <p className="decline-message">
            Please provide a reason for declining this request. This will help the student understand why their submission was not approved.
          </p>

          <div className="form-group">
            <label htmlFor="remarks">Remarks *</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={handleRemarksChange}
              placeholder="Enter your reason for declining this request..."
              className={`remarks-textarea ${error ? 'error' : ''}`}
              rows="5"
            />
            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            <div className="char-count">
              {remarks.length} characters
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-confirm-decline" onClick={handleSubmit}>
            Decline Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeclineModal;
