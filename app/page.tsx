'use client';

import { useState } from 'react';
import { FileText, Inbox, X } from 'react-feather';
import NavigationCard from './components/NavigationCard';
import CaseStudyModal from './components/CaseStudyModal';

const personalProjects = [
  { name: 'Vederian', url: 'https://www.vederian.com/' },
  { name: 'Qosmia', url: 'https://www.qosmia.it/' },
  { name: 'Qolokio', url: 'https://www.qolokio.com/' },
  { name: 'Intervueo', url: 'https://www.intervueo.com/' },
];

export default function Home() {
  const [caseStudyModal, setCaseStudyModal] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string>('');

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="landing-title">Hi, I'm Fouad.</h1>
        <p className="landing-subtitle">
          I design product interfaces for complex systems, where clarity, responsibility, and behavior really matter.
        </p>
        <p className="landing-subtitle">
          With a background in front-end development, I focus on state-driven interfaces and decision-heavy workflows.
        </p>
      </header>

      <main className="landing-main">
        <div className="nav-cards-grid">
          <NavigationCard
            title="Regulated AI Decision Interface"
            description="A high-stakes AI decision interface where humans remain fully responsible. Designed to make uncertainty visible, enforce clear state transitions, and support correct decision-making in regulated environments."
            href="/decision-review"
            icon={<FileText size={24} />}
            figmaUrl="https://figma.com"
            onCaseStudy={() => setCaseStudyModal('AI Decision Review')}
          />

          <NavigationCard
            title="AI Insight Inbox"
            description="A calm, single-page interface for reviewing AI-generated insights. Designed to help users understand what changed and why, without forcing decisions or overwhelming them with data."
            href="/insight-inbox"
            icon={<Inbox size={24} />}
            figmaUrl="https://figma.com"
            onCaseStudy={() => setCaseStudyModal('Insight Inbox')}
          />
        </div>
      </main>

      <section className="personal-projects-section">
        <h2 className="personal-projects-title">Development Work</h2>
        <div className="personal-projects-grid">
          {personalProjects.map((project) => (
            <button
              key={project.name}
              className="personal-project-btn"
              onClick={() => {
                setPreviewUrl(project.url);
                setPreviewName(project.name);
              }}
            >
              {project.name}
            </button>
          ))}
        </div>
      </section>

      {caseStudyModal && (
        <CaseStudyModal
          title={caseStudyModal}
          onClose={() => setCaseStudyModal(null)}
        />
      )}

      {previewUrl && (
        <div className="desktop-preview-overlay" onClick={() => setPreviewUrl(null)}>
          <div className="desktop-preview-modal" onClick={(e) => e.stopPropagation()}>
            <div className="desktop-preview-header">
              <span className="desktop-preview-title">{previewName}</span>
              <div className="desktop-preview-actions">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="desktop-preview-link"
                >
                  Open in new tab
                </a>
                <button
                  className="desktop-preview-close"
                  onClick={() => setPreviewUrl(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="desktop-preview-browser">
              <div className="desktop-preview-toolbar">
                <div className="desktop-preview-dots">
                  <span className="desktop-preview-dot desktop-preview-dot--red" />
                  <span className="desktop-preview-dot desktop-preview-dot--yellow" />
                  <span className="desktop-preview-dot desktop-preview-dot--green" />
                </div>
                <div className="desktop-preview-url-bar">{previewUrl}</div>
              </div>
              <iframe
                src={previewUrl}
                className="desktop-preview-iframe"
                title={previewName}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
