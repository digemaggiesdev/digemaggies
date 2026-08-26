import React, { useState } from 'react';
import { projectsData } from '../data/siteData';

const ProjectSelector = () => {
  const [activeProjectId, setActiveProjectId] = useState(projectsData[0].id);

  const activeProject = projectsData.find((p) => p.id === activeProjectId) || projectsData[0];

  return (
    <section className="card project-selector-section" id="projects">
      <div className="section-kicker">Interactive Showcase</div>
      <h2>Explore Our TBM Engineering & Subsystems</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Select a subsystem or build focus below to inspect the design, technical specs, and engineering challenges solved by Dig 'Em Aggies.
      </p>

      <div className="project-selector">
        <div className="project-nav" role="tablist" aria-label="TBM Project Subsystems">
          {projectsData.map((project) => (
            <button
              key={project.id}
              role="tab"
              aria-selected={activeProjectId === project.id}
              className={`project-tab ${activeProjectId === project.id ? 'active' : ''}`}
              onClick={() => setActiveProjectId(project.id)}
            >
              {project.title}
            </button>
          ))}
        </div>

        <div className="project-display">
          <div className="project-image-wrapper">
            <img src={activeProject.image} alt={activeProject.title} />
            <span className="project-badge">{activeProject.category}</span>
          </div>

          <div className="project-details">
            <h3>{activeProject.title}</h3>
            <p className="project-tagline">{activeProject.tagline}</p>
            <p className="project-description">{activeProject.description}</p>

            <div className="project-specs">
              {activeProject.specs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-label">{spec.label}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSelector;
