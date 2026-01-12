'use client';

import { useState } from 'react';
import { AlertTriangle } from 'react-feather';
import { useLanguage } from '../context/LanguageContext';

export default function ExplanationSection() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card explanation-section">
      <div className="explanation-header">
        <h2 className="card-title">{expanded ? t('dr.keyFactors') : t('dr.explanation')}</h2>
        <button
          className={`view-detailed-btn ${expanded ? 'view-detailed-btn--close' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          <AlertTriangle size={16} />
          {expanded ? t('dr.hideDetailed') : t('dr.viewDetailed')}
        </button>
      </div>

      {!expanded && (
        <p className="explanation-text">
          {t('dr.explanationText')}
        </p>
      )}

      <div className={`explanation-expanded-content ${expanded ? 'explanation-expanded-content--visible' : 'explanation-expanded-content--hidden'}`}>
        <p className="explanation-text">
          {t('dr.explanationText')}
        </p>

        <ul className="explanation-factors" style={{ marginTop: '16px' }}>
          <li>{t('dr.factor1')}</li>
          <li>{t('dr.factor2')}</li>
          <li>{t('dr.factor3')}</li>
          <li>{t('dr.factor4')}</li>
        </ul>

        <div className="known-limitations" style={{ marginTop: '24px' }}>
          <h3 className="limitations-title">{t('dr.knownLimitations')}</h3>
          <p className="limitations-text">
            {t('dr.limitationsText')}
          </p>
        </div>
      </div>
    </div>
  );
}
