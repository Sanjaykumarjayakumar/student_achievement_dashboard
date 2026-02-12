import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Internships.css';

const InternshipDetails = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('internships') || '[]');
    const found = saved.find((item) => String(item.id) === String(id));
    setInternship(found || null);
  }, [id]);

  const status = internship?.endDate ? 'Completed' : 'Ongoing';

  return (
    <div className="internships-container">
      <div className="internships-header">
        <h1>Internship Details</h1>
        <Link to="/internships" className="btn-add">Back to Internships</Link>
      </div>

      <div className="form-container">
        <h2>Details</h2>
        <div className="internship-form">
          <div className="form-group">
            <label>Internship Title</label>
            <input className="form-input" value={internship?.title || ''} readOnly />
          </div>

          <div className="form-group">
            <label>Company</label>
            <input className="form-input" value={internship?.company || ''} readOnly />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input className="form-input" value={internship?.startDate || ''} readOnly />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input className="form-input" value={internship?.endDate || ''} readOnly />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input className="form-input" value={internship ? status : ''} readOnly />
          </div>

          <div className="form-group">
            <label>Uploaded PDF Name</label>
            <input className="form-input" value={internship?.internshipPdfName || ''} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
