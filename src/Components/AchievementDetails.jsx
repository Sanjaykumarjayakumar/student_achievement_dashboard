import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Achievements.css';

const AchievementDetails = () => {
  const { id } = useParams();
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('achievements') || '[]');
    const found = saved.find((item) => String(item.id) === String(id));
    setAchievement(found || null);
  }, [id]);

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h1>Achievement Details</h1>
        <Link to="/achievements" className="btn-add">Back to Achievements</Link>
      </div>

      <div className="form-container">
        <h2>Details</h2>
        <div className="achievement-form">
          <div className="form-group">
            <label>Achievement Title</label>
            <input className="form-input" value={achievement?.title || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Organizing Body</label>
            <input className="form-input" value={achievement?.organizingBody || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input className="form-input" value={achievement?.date || ''} readOnly />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input className="form-input" value={achievement?.endDate || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input className="form-input" value={achievement?.verificationStatus || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input" rows="4" value={achievement?.description || ''} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetails;
