'use client';

import { Insight, InsightStatus } from '../types';
import ConfidenceBadge from './ConfidenceBadge';
import { useLanguage } from '../context/LanguageContext';

interface InsightCardProps {
  insight: Insight;
  onSave: (id: string) => void;
  onDismiss: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export default function InsightCard({ insight, onSave, onDismiss, onViewDetails }: InsightCardProps) {
  const { t } = useLanguage();
  const { id, title, summary, confidence, status } = insight;
  const isDismissed = status === 'dismissed';

  const statusLabels: Record<InsightStatus, string> = {
    new: t('ii.new'),
    saved: t('ii.saved'),
    dismissed: t('ii.dismissed'),
  };

  return (
    <div className={`insight-card ${isDismissed ? 'insight-card--dismissed' : ''}`}>
      <div className="insight-card-header">
        <h3 className="insight-card-title">{title}</h3>
        <span className={`insight-status-badge insight-status-badge--${status}`}>
          {statusLabels[status]}
        </span>
      </div>

      <p className="insight-card-summary">{summary}</p>

      <ConfidenceBadge level={confidence} />

      <div className="insight-card-actions">
        {status === 'new' && (
          <button className="insight-btn insight-btn--primary" onClick={() => onSave(id)}>
            {t('ii.save')}
          </button>
        )}
        <button className="insight-btn insight-btn--secondary" onClick={() => onDismiss(id)}>
          {t('ii.dismiss')}
        </button>
        <button className="insight-btn insight-btn--text" onClick={() => onViewDetails(id)}>
          {t('ii.viewDetails')}
        </button>
      </div>
    </div>
  );
}
