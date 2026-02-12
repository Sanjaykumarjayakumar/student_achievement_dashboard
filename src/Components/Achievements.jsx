import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from './ToastProvider';
import './Achievements.css';

const Achievements = () => {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    organizingBody: '',
    date: '',
    endDate: '',
    description: ''
  });

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = () => {
    const saved = JSON.parse(localStorage.getItem('achievements') || '[]');
    setAchievements(saved);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.organizingBody || !formData.date) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAchievement = {
      ...formData,
      id: Date.now(),
      category: 'student achievement dashboard project',
      verificationStatus: 'pending'
    };

    const updatedAchievements = [...achievements, newAchievement];
    localStorage.setItem('achievements', JSON.stringify(updatedAchievements));
    
    setAchievements(updatedAchievements);
    setFormData({
      title: '',
      organizingBody: '',
      date: '',
      endDate: '',
      description: ''
    });
    setShowForm(false);
  };

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h1>Achievements</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-add">
            <Plus size={20} />
            Add Achievement
          </button>
        )}
      </div>

      {showForm ? (
        <div className="form-container">
          <h2>Add Achievement</h2>
          <form onSubmit={handleSubmit} className="achievement-form">
            <div className="form-group">
              <label htmlFor="title">Achievement Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="organizingBody">Organizing Body *</label>
              <input
                type="text"
                id="organizingBody"
                name="organizingBody"
                value={formData.organizingBody}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Add Achievement
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-container">
          {achievements.length > 0 ? (
            <table className="achievements-table">
              <thead>
                <tr>
                  <th>Achievement Title</th>
                  <th>Organizing Body</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((achievement) => (
                  <tr key={achievement.id}>
                    <td>{achievement.title}</td>
                    <td>{achievement.organizingBody}</td>
                    <td>{achievement.date ? new Date(achievement.date).toLocaleDateString() : '-'}</td>
                    <td>{achievement.endDate ? new Date(achievement.endDate).toLocaleDateString() : '-'}</td>
                    <td>
                      <span className={`status-badge ${achievement.verificationStatus}`}>
                        {achievement.verificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-achievements">
              <p>No achievements available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Achievements;
