'use client';

import { Info } from 'react-feather';
import { useLanguage } from '../context/LanguageContext';

export default function AIRecommendationCard() {
  const { t } = useLanguage();

  return (
    <div className="card ai-recommendation-card">
      <div className="card-header">
        <h2 className="card-title">{t('dr.aiRecommendation')}</h2>
        <div className="confidence-badge">
          <Info size={16} color="#F59E0B" />
          <span className="confidence-label">{t('dr.confidence')}: Low</span>
          <span className="confidence-divider">|</span>
          <Info size={16} color="#9CA3AF" />
          <span className="confidence-message">{t('dr.confidenceNote')}</span>
        </div>
      </div>

      <div className="risk-banner">
        <span className="risk-label">{t('dr.risk')}</span>
        <span className="risk-text">{t('dr.riskText')}</span>
      </div>

      <ul className="risk-factors">
        <li>{t('dr.riskFactor1')}</li>
        <li>{t('dr.riskFactor2')}</li>
        <li>{t('dr.riskFactor3')}</li>
      </ul>
    </div>
  );
}
