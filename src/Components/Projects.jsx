import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from './ToastProvider';
import './Projects.css';

const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    projectUrl: '',
    githubUrl: '',
    image: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const saved = JSON.parse(localStorage.getItem('projects') || '[]');
    setProjects(saved);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newProject = {
      ...formData,
      id: Date.now()
    };

    const updatedProjects = [...projects, newProject];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    
    setProjects(updatedProjects);
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      projectUrl: '',
      githubUrl: '',
      image: ''
    });
    setShowForm(false);
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Projects</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-add">
            <Plus size={20} />
            Add Project
          </button>
        )}
      </div>

      {showForm ? (
        <div className="form-container">
          <h2>Add Project</h2>
          <form onSubmit={handleSubmit} className="project-form">
            <div className="form-group">
              <label htmlFor="title">Project Title *</label>
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
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date *</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
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
            </div>

            <div className="form-group">
              <label htmlFor="projectUrl">Project URL</label>
              <input
                type="url"
                id="projectUrl"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://project-demo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubUrl">GitHub URL</label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Project Image (Optional)</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="image-preview" />
              )}
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                Add Project
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="table-container">
          {projects.length > 0 ? (
            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project Title</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>{project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}</td>
                    <td>{project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}</td>
                    <td>
                      <span className={`status-badge ${project.endDate ? 'completed' : 'ongoing'}`}>
                        {project.endDate ? 'Completed' : 'Ongoing'}
                      </span>
                    </td>
                    <td>
                      <a
                        href={project.projectUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-view"
                        onClick={(e) => {
                          if (!project.projectUrl) {
                            e.preventDefault();
                            toast.error('Project URL is not available');
                          }
                        }}
                      >
                        View Project
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-projects">
              <p>No projects available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
