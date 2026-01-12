import { ConfidenceLevel } from '../types';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
}

const confidenceColors: Record<ConfidenceLevel, string> = {
  High: '#16a34a',
  Medium: '#F59E0B',
  Low: '#dc2626',
};

export default function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const color = confidenceColors[level];

  return (
    <span className="confidence-score" style={{ color }}>
      Confidence score - {level}
    </span>
  );
}
