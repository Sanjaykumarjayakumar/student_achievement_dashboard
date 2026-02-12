import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Certificates.css';

const CertificateDetails = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('certificates') || '[]');
    const found = saved.find((item) => String(item.id) === String(id));
    setCertificate(found || null);
  }, [id]);

  return (
    <div className="certificates-container">
      <div className="certificates-header">
        <h1>Certificate Details</h1>
        <Link to="/certificates" className="btn-add">Back to Certificates</Link>
      </div>

      <div className="form-container">
        <h2>Details</h2>
        <div className="certificate-form">
          <div className="form-group">
            <label>Certificate Name</label>
            <input className="form-input" value={certificate?.name || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Issuing Organization</label>
            <input className="form-input" value={certificate?.issuingOrg || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Issue Date</label>
            <input className="form-input" value={certificate?.issueDate || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Expire Date</label>
            <input className="form-input" value={certificate?.expiryDate || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Credenitional / Certificate URL</label>
            <input className="form-input" value={certificate?.credentialField || certificate?.credentialId || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Uploaded PDF Name</label>
            <input className="form-input" value={certificate?.certificatePdfName || ''} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetails;
