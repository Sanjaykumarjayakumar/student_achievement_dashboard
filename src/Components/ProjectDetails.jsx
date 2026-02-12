import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Projects.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('projects') || '[]');
    const found = saved.find((item) => String(item.id) === String(id));
    setProject(found || null);
  }, [id]);

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>Project Details</h1>
        <Link to="/projects" className="btn-add">Back to Projects</Link>
      </div>

      <div className="form-container">
        <h2>Details</h2>
        <div className="project-form">
          <div className="form-group">
            <label>Project Title</label>
            <input className="form-input" value={project?.title || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-input" rows="4" value={project?.description || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Technologies</label>
            <input className="form-input" value={Array.isArray(project?.technologies) ? project.technologies.join(', ') : ''} readOnly />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input className="form-input" value={project?.startDate || ''} readOnly />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input className="form-input" value={project?.endDate || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Project URL</label>
            <input className="form-input" value={project?.projectUrl || ''} readOnly />
          </div>
          <div className="form-group">
            <label>GitHub URL</label>
            <input className="form-input" value={project?.githubUrl || ''} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
