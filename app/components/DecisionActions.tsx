'use client';

import { DecisionState, ActionType } from '../types';
import { XCircle, CheckCircle, AlertTriangle, Info } from 'react-feather';
import { useLanguage } from '../context/LanguageContext';

interface DecisionActionsProps {
  status: DecisionState;
  onAction: (action: ActionType) => void;
}

export default function DecisionActions({ status, onAction }: DecisionActionsProps) {
  const { t } = useLanguage();
  const isDisabled = status !== 'pending';
  const isProcessing = status === 'processing';

  return (
    <div className="card decision-actions">
      <h2 className="card-title">{t('dr.yourDecision')}</h2>
      <p className="decision-disclaimer">
        {t('dr.disclaimer')}
      </p>

      <div className="action-buttons">
        <button
          className="btn btn-reject"
          onClick={() => onAction('reject')}
          disabled={isDisabled}
        >
          <XCircle size={16} />
          {isProcessing ? t('dr.processing') : t('dr.rejectRecommendation')}
        </button>

        <button
          className="btn btn-review"
          onClick={() => onAction('review')}
          disabled={isDisabled}
        >
          <AlertTriangle size={16} />
          {isProcessing ? t('dr.processing') : t('dr.requestReview')}
        </button>

        <button
          className="btn btn-approve"
          onClick={() => onAction('approve')}
          disabled={isDisabled}
        >
          <CheckCircle size={16} />
          {isProcessing ? t('dr.processing') : t('dr.approveRecommendation')}
        </button>
      </div>

      <p className="action-hint">
        <Info size={16} color="#9CA3AF" />
        {t('dr.actionHint')}
      </p>
    </div>
  );
}
