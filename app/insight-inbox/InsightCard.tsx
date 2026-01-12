import { Insight, InsightStatus } from '../types';
import ConfidenceBadge from './ConfidenceBadge';

interface InsightCardProps {
  insight: Insight;
  onSave: (id: string) => void;
  onDismiss: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const statusLabels: Record<InsightStatus, string> = {
  new: 'New',
  saved: 'Saved',
  dismissed: 'Dismissed',
};

export default function InsightCard({ insight, onSave, onDismiss, onViewDetails }: InsightCardProps) {
  const { id, title, summary, confidence, status } = insight;
  const isDismissed = status === 'dismissed';

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
            Save
          </button>
        )}
        <button className="insight-btn insight-btn--secondary" onClick={() => onDismiss(id)}>
          Dismiss
        </button>
        <button className="insight-btn insight-btn--text" onClick={() => onViewDetails(id)}>
          View Details
        </button>
      </div>
    </div>
  );
}
