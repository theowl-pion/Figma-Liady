import { DecisionState, ActionType } from '../types';
import { XCircle, CheckCircle, AlertTriangle, Info } from 'react-feather';

interface DecisionActionsProps {
  status: DecisionState;
  onAction: (action: ActionType) => void;
}

export default function DecisionActions({ status, onAction }: DecisionActionsProps) {
  const isDisabled = status !== 'pending';
  const isProcessing = status === 'processing';

  return (
    <div className="card decision-actions">
      <h2 className="card-title">Your Decision</h2>
      <p className="decision-disclaimer">
        By approving or rejecting this recommendation, you confirm that you have reviewed the AI output and take responsibility for the final decision.
      </p>

      <div className="action-buttons">
        <button
          className="btn btn-reject"
          onClick={() => onAction('reject')}
          disabled={isDisabled}
        >
          <XCircle size={16} />
          {isProcessing ? 'Processing...' : 'Reject Recommendation'}
        </button>

        <button
          className="btn btn-review"
          onClick={() => onAction('review')}
          disabled={isDisabled}
        >
          <AlertTriangle size={16} />
          {isProcessing ? 'Processing...' : 'Request review'}
        </button>

        <button
          className="btn btn-approve"
          onClick={() => onAction('approve')}
          disabled={isDisabled}
        >
          <CheckCircle size={16} />
          {isProcessing ? 'Processing...' : 'Approve Recommendation'}
        </button>
      </div>

      <p className="action-hint">
        <Info size={16} color="#9CA3AF" />
        If you're unsure, you can request a review from a senior role. The case will remain pending until a decision is made.
      </p>
    </div>
  );
}
