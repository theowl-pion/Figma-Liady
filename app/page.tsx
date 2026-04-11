'use client';

import { useState } from 'react';
import { FileText, Inbox, X, User } from 'react-feather';
import NavigationCard from './components/NavigationCard';
import CaseStudyModal from './components/CaseStudyModal';
import CVModal from './components/CVModal';
import LanguageToggle from './components/LanguageToggle';
import { useLanguage } from './context/LanguageContext';

const personalProjects = [
  { name: 'Vederian', url: 'https://vederian.vercel.app/' },
  { name: 'Intervueo', url: 'https://www.intervueo.xyz/' },
  { name: 'Iotutela', url: 'https://iotutela.it/' },
  { name: 'Qrtaap', url: 'https://qrtaap.vercel.app/' },
  { name: 'Data Story', url: 'https://data-pion.vercel.app/projects/data-story-video-system' },
];

export default function Home() {
  const { t } = useLanguage();
  const [caseStudyModal, setCaseStudyModal] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewName, setPreviewName] = useState<string>('');
  const [showCV, setShowCV] = useState(false);

  return (
    <div className="landing-container">
      <div className="top-right-actions">
        <button className="cv-btn" onClick={() => setShowCV(true)}>
          <User size={14} />
          Curriculum
        </button>
        <LanguageToggle />
      </div>
      <header className="landing-header">
        <h1 className="landing-title">{t('landing.greeting')}</h1>
        <p className="landing-subtitle">
          {t('landing.intro1')}
        </p>
        <p className="landing-subtitle">
          {t('landing.intro2')}
        </p>
      </header>

      <main className="landing-main">
        <div className="nav-cards-grid">
          <NavigationCard
            title={t('project1.title')}
            description={t('project1.description')}
            href="/decision-review"
            icon={<FileText size={24} />}
            figmaUrl="https://www.figma.com/design/fKbJQ5OSbDAPNCZ9RNdGPj/Regulated-AI-Decision-System?node-id=8-34&t=n6RYNyai18GpuDgO-1"
            onCaseStudy={() => setCaseStudyModal('AI Decision Review')}
            caseStudyLabel={t('btn.caseStudy')}
            figmaLabel={t('btn.figma')}
            openProjectLabel={t('btn.openProject')}
          />

          <NavigationCard
            title={t('project2.title')}
            description={t('project2.description')}
            href="/insight-inbox"
            icon={<Inbox size={24} />}
            figmaUrl="https://www.figma.com/design/avJe5YBThCuhCjEbLerPWz/AI-Insight-Inbox?node-id=5-89&t=4aW7lBG0MAlfW6uN-1"
            onCaseStudy={() => setCaseStudyModal('Insight Inbox')}
            caseStudyLabel={t('btn.caseStudy')}
            figmaLabel={t('btn.figma')}
            openProjectLabel={t('btn.openProject')}
          />
        </div>
      </main>

      <section className="personal-projects-section">
        <h2 className="personal-projects-title">{t('landing.devWork')}</h2>
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

      {showCV && <CVModal onClose={() => setShowCV(false)} />}

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
                  {t('btn.openInNewTab')}
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
