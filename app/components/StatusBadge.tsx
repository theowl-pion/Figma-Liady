import { DecisionState } from '../types';
import { FileText, CheckCircle, XCircle, AlertTriangle, Info } from 'react-feather';

interface StatusBadgeProps {
  status: DecisionState;
}

const statusConfig: Record<DecisionState, { label: string; message: string; color: string }> = {
  pending: { label: 'Pending', message: 'Waiting for a human decision', color: '#6B7280' },
  processing: { label: 'Processing', message: 'Processing your decision', color: '#6B7280' },
  approved: { label: 'Approved', message: 'Decision completed successfully', color: '#16a34a' },
  rejected: { label: 'Rejected', message: 'Decision rejected', color: '#dc2626' },
  under_review: { label: 'Under review', message: 'The case will remain pending until a decision is made.', color: '#F59E0B' },
};

function StatusIcon({ status, color }: { status: DecisionState; color: string }) {
  const props = { size: 16, color };
  switch (status) {
    case 'pending':
    case 'processing':
      return <FileText {...props} />;
    case 'approved':
      return <CheckCircle {...props} />;
    case 'rejected':
      return <XCircle {...props} />;
    case 'under_review':
      return <AlertTriangle {...props} />;
    default:
      return null;
  }
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className={`status-badge status-badge--${status}`}>
      <StatusIcon status={status} color={config.color} />
      <span className="status-badge-label" style={{ color: config.color }}>{config.label}</span>
      <span className="status-badge-divider">|</span>
      <Info size={16} color="#9CA3AF" />
      <span className="status-badge-message">{config.message}</span>
    </div>
  );
}
