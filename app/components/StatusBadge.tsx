'use client';

import { DecisionState } from '../types';
import { FileText, CheckCircle, XCircle, AlertTriangle, Info } from 'react-feather';
import { useLanguage } from '../context/LanguageContext';

interface StatusBadgeProps {
  status: DecisionState;
}

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
  const { t } = useLanguage();

  const statusConfig: Record<DecisionState, { label: string; message: string; color: string }> = {
    pending: { label: t('dr.pending'), message: t('dr.awaitingDecision'), color: '#6B7280' },
    processing: { label: t('dr.processing'), message: t('dr.processing'), color: '#6B7280' },
    approved: { label: t('dr.approved'), message: t('dr.decisionRecorded'), color: '#16a34a' },
    rejected: { label: t('dr.rejected'), message: t('dr.decisionRecorded'), color: '#dc2626' },
    under_review: { label: t('dr.underReview'), message: t('dr.escalatedForReview'), color: '#F59E0B' },
  };

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
