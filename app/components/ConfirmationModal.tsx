'use client';

import { useState, useRef, useEffect } from 'react';
import { ActionType } from '../types';
import { ChevronDown, Check } from 'react-feather';
import { useLanguage } from '../context/LanguageContext';

interface ConfirmationModalProps {
  action: ActionType;
  onConfirm: (reviewer?: string) => void;
  onClose: () => void;
}

const reviewers = [
  { id: 'sarah', name: 'Sarah Johnson', role: 'Senior Analyst' },
  { id: 'michael', name: 'Michael Chen', role: 'Risk Manager' },
  { id: 'emily', name: 'Emily Williams', role: 'Compliance Officer' },
  { id: 'david', name: 'David Brown', role: 'Team Lead' },
];

export default function ConfirmationModal({ action, onConfirm, onClose }: ConfirmationModalProps) {
  const { t } = useLanguage();
  const [selectedReviewer, setSelectedReviewer] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isReviewAction = action === 'review';
  const canConfirm = !isReviewAction || selectedReviewer !== '';

  const selectedReviewerData = reviewers.find(r => r.id === selectedReviewer);

  const modalContent: Record<ActionType, { title: string; message: string; confirmLabel: string; confirmClass: string }> = {
    approve: {
      title: t('dr.modal.approveTitle'),
      message: t('dr.modal.approveMsg'),
      confirmLabel: t('dr.approveRecommendation'),
      confirmClass: 'btn-approve',
    },
    reject: {
      title: t('dr.modal.rejectTitle'),
      message: t('dr.modal.rejectMsg'),
      confirmLabel: t('dr.rejectRecommendation'),
      confirmClass: 'btn-reject',
    },
    review: {
      title: t('dr.modal.reviewTitle'),
      message: t('dr.modal.reviewMsg'),
      confirmLabel: t('dr.requestReview'),
      confirmClass: 'btn-review-confirm',
    },
  };

  const content = modalContent[action];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm(isReviewAction ? selectedReviewer : undefined);
    }
  };

  const handleSelectReviewer = (reviewerId: string) => {
    setSelectedReviewer(reviewerId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">{content.title}</h2>

        {isReviewAction && (
          <div className="reviewer-select-container">
            <label className="reviewer-label">{t('dr.modal.selectReviewer')}</label>
            <div className="custom-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className={`dropdown-trigger ${isDropdownOpen ? 'dropdown-trigger--open' : ''}`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedReviewerData ? (
                  <span className="dropdown-selected">
                    <span className="dropdown-selected-name">{selectedReviewerData.name}</span>
                    <span className="dropdown-selected-role">{selectedReviewerData.role}</span>
                  </span>
                ) : (
                  <span className="dropdown-placeholder">{t('dr.modal.chooseReviewer')}</span>
                )}
                <ChevronDown size={16} className={`dropdown-chevron ${isDropdownOpen ? 'dropdown-chevron--open' : ''}`} />
              </button>

              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  {reviewers.map((reviewer) => (
                    <li
                      key={reviewer.id}
                      className={`dropdown-item ${selectedReviewer === reviewer.id ? 'dropdown-item--selected' : ''}`}
                      onClick={() => handleSelectReviewer(reviewer.id)}
                    >
                      <div className="dropdown-item-content">
                        <span className="dropdown-item-name">{reviewer.name}</span>
                        <span className="dropdown-item-role">{reviewer.role}</span>
                      </div>
                      {selectedReviewer === reviewer.id && (
                        <Check size={16} className="dropdown-item-check" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <p className="modal-message">{content.message}</p>
        <div className="modal-actions">
          <button className="btn btn-close" onClick={onClose}>
            {t('btn.close')}
          </button>
          <button
            className={`btn ${content.confirmClass}`}
            onClick={handleConfirm}
            disabled={!canConfirm}
          >
            {content.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
