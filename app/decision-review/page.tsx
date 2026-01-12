'use client';

import { useState } from 'react';
import { DecisionState, ActionType } from '../types';
import { RefreshCw } from 'react-feather';
import StatusBadge from '../components/StatusBadge';
import AIRecommendationCard from '../components/AIRecommendationCard';
import ExplanationSection from '../components/ExplanationSection';
import DecisionActions from '../components/DecisionActions';
import ConfirmationModal from '../components/ConfirmationModal';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

export default function DecisionReviewPage() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<DecisionState>('pending');
  const [modalAction, setModalAction] = useState<ActionType | null>(null);

  const handleAction = (action: ActionType) => {
    setModalAction(action);
  };

  const handleConfirm = () => {
    const action = modalAction;
    setModalAction(null);
    setStatus('processing');

    // Simulate async processing
    setTimeout(() => {
      if (action === 'approve') {
        setStatus('approved');
      } else if (action === 'reject') {
        setStatus('rejected');
      } else if (action === 'review') {
        setStatus('under_review');
      }
    }, 1000);
  };

  const handleCloseModal = () => {
    setModalAction(null);
  };

  const handleReset = () => {
    setStatus('pending');
  };

  return (
    <div className="container">
      <LanguageToggle />
      <header className="header">
        <div className="header-left">
          <div className="title-row">
            <h1 className="page-title">{t('dr.title')}</h1>
            {status !== 'pending' && (
              <button className="reset-btn" onClick={handleReset} title="Reset to pending">
                <RefreshCw size={14} />
                {t('dr.reset')}
              </button>
            )}
          </div>
          <div className="case-meta">
            <span>{t('dr.caseId')}: A-2391</span>
            <span>Assigned role: Analyst</span>
            <span>Created: 12 Mar 2024</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </header>

      <main className="main">
        <AIRecommendationCard />
        <ExplanationSection />
        <DecisionActions status={status} onAction={handleAction} />
      </main>

      {modalAction && (
        <ConfirmationModal
          action={modalAction}
          onConfirm={handleConfirm}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
