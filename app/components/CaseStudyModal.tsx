'use client';

import { X } from 'react-feather';
import { useLanguage } from '../context/LanguageContext';

interface CaseStudyModalProps {
  title: string;
  onClose: () => void;
}

export default function CaseStudyModal({ title, onClose }: CaseStudyModalProps) {
  const { t, language } = useLanguage();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Get the case study content based on the title and language
  const getCaseStudyContent = () => {
    if (title === 'AI Decision Review') {
      return {
        title: t('cs1.title'),
        sections: [
          { heading: t('cs1.overview.heading'), content: t('cs1.overview.content') },
          { heading: t('cs1.problem.heading'), content: t('cs1.problem.content') },
          { heading: t('cs1.thinking.heading'), content: t('cs1.thinking.content') },
          { heading: t('cs1.solution.heading'), content: t('cs1.solution.content') },
          { heading: t('cs1.notBuilt.heading'), content: t('cs1.notBuilt.content') },
          { heading: t('cs1.validation.heading'), content: t('cs1.validation.content') },
          { heading: t('cs1.demonstrates.heading'), content: t('cs1.demonstrates.content') },
        ],
        takeaway: t('cs1.takeaway'),
      };
    } else if (title === 'Insight Inbox') {
      return {
        title: t('cs2.title'),
        sections: [
          { heading: t('cs2.overview.heading'), content: t('cs2.overview.content') },
          { heading: t('cs2.problem.heading'), content: t('cs2.problem.content') },
          { heading: t('cs2.thinking.heading'), content: t('cs2.thinking.content') },
          { heading: t('cs2.solution.heading'), content: t('cs2.solution.content') },
          { heading: t('cs2.notBuilt.heading'), content: t('cs2.notBuilt.content') },
          { heading: t('cs2.validation.heading'), content: t('cs2.validation.content') },
          { heading: t('cs2.demonstrates.heading'), content: t('cs2.demonstrates.content') },
        ],
        takeaway: t('cs2.takeaway'),
      };
    }
    return null;
  };

  const caseStudy = getCaseStudyContent();

  if (!caseStudy) {
    return null;
  }

  return (
    <div className="case-study-modal-overlay" onClick={handleOverlayClick}>
      <div className="case-study-modal">
        <div className="case-study-modal-header">
          <span className="case-study-modal-title">{t('caseStudy.title')}</span>
          <button
            className="case-study-modal-close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="case-study-modal-body">
          <h1 className="case-study-modal-content-title">{caseStudy.title}</h1>
          <div className="case-study-modal-content">
            {caseStudy.sections.map((section, index) => (
              <div key={index} className="case-study-section">
                <h3 className="case-study-section-heading">{section.heading}</h3>
                <p className="case-study-section-text">{section.content}</p>
              </div>
            ))}
            {caseStudy.takeaway && (
              <div className="case-study-takeaway">
                <span className="case-study-takeaway-label">Takeaway:</span> {caseStudy.takeaway}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
