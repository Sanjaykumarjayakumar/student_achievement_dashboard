import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from './ToastProvider';
import './Certificates.css';

const Certificates = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    issuingOrg: '',
    issueDate: '',
    expiryDate: '',
    credentialField: '',
    certificatePdf: '',
    certificatePdfName: ''
  });

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = () => {
    const saved = JSON.parse(localStorage.getItem('certificates') || '[]');
    setCertificates(saved);
    if (saved.length > 0) {
      setShowForm(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      toast.error('Please upload only PDF file');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        certificatePdf: reader.result,
        certificatePdfName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.issuingOrg || !formData.issueDate || !formData.certificatePdf) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newCertificate = {
      ...formData,
      id: Date.now()
    };

    const updatedCertificates = [...certificates, newCertificate];
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
    
    setCertificates(updatedCertificates);
    setFormData({
      name: '',
      issuingOrg: '',
      issueDate: '',
      expiryDate: '',
      credentialField: '',
      certificatePdf: '',
      certificatePdfName: ''
    });
    setShowForm(false);
  };

  return (
    <div className="certificates-container">
      <div className="certificates-header">
        <h1>Certificates</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-add">
            <Plus size={20} />
            Add Certificate
          </button>
        )}
      </div>

      {showForm ? (
        <div className="form-container">
          <h2>Add Certificate</h2>
          <form onSubmit={handleSubmit} className="certificate-form">
            <div className="form-group">
              <label htmlFor="name">Certificate Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="issuingOrg">Issuing Organization *</label>
              <input
                type="text"
                id="issuingOrg"
                name="issuingOrg"
                value={formData.issuingOrg}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="issueDate">Issue Date *</label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="credentialField">Credenitional Field / Certificate URL</label>
              <input
                type="text"
                id="credentialField"
                name="credentialField"
                value={formData.credentialField}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="certificatePdf">Upload PDF *</label>
              <input
                type="file"
                id="certificatePdf"
                accept="application/pdf,.pdf"
                onChange={handlePdfChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Add Certificate
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-container">
          {certificates.length > 0 ? (
            <table className="certificates-table">
              <thead>
                <tr>
                  <th>Certificate Name</th>
                  <th>Issuing Organization</th>
                  <th>Issue Date</th>
                  <th>Expire Date</th>
                  <th>Credenitional Field / Certificate URL</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((certificate) => (
                  <tr key={certificate.id}>
                    <td>{certificate.name}</td>
                    <td>{certificate.issuingOrg}</td>
                    <td>{certificate.issueDate ? new Date(certificate.issueDate).toLocaleDateString() : '-'}</td>
                    <td>{certificate.expiryDate ? new Date(certificate.expiryDate).toLocaleDateString() : '-'}</td>
                    <td>{certificate.credentialField || certificate.credentialId || '-'}</td>
                    <td>{certificate.certificatePdfName || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-certificates">
              <p>No certificates available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Certificates;
