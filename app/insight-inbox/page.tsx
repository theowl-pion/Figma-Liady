'use client';

import { useState, useEffect, useRef } from 'react';
import { Inbox, Trash2, ChevronDown, Check } from 'react-feather';
import { Insight, InsightStatus } from '../types';
import InsightCard from './InsightCard';
import DetailsModal from './DetailsModal';

const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Increase in churn risk for Segment B',
    summary: 'Churn probability increased by 18% compared to last week. Some engagement signals show variation across users in Segment B.',
    confidence: 'Medium',
    confidenceExplanation: 'Based on engagement patterns from the last 30 days.',
    supportingSignals: [
      'Decrease in weekly activity',
      'Lower feature engagement',
      'Increased inactivity',
    ],
    nextStep: 'Consider reviewing onboarding changes.',
    status: 'new',
  },
  {
    id: '2',
    title: 'Increase in churn risk for Segment B',
    summary: 'Churn probability increased by 18% compared to last week, driven by a consistent drop in weekly engagement across Segment B.',
    confidence: 'High',
    confidenceExplanation: 'Strong correlation with historical churn patterns.',
    supportingSignals: [
      'Decrease in weekly activity',
      'Lower feature engagement',
      'Increased inactivity',
    ],
    nextStep: 'Consider reviewing onboarding changes.',
    status: 'saved',
  },
  {
    id: '3',
    title: 'Increase in churn risk for Segment B',
    summary: 'Early indicators suggest a potential increase in churn risk, but recent user activity is inconsistent.',
    confidence: 'Low',
    confidenceExplanation: 'Limited data available for this segment.',
    supportingSignals: [
      'Decrease in weekly activity',
      'Lower feature engagement',
      'Increased inactivity',
    ],
    nextStep: 'Consider reviewing onboarding changes.',
    status: 'saved',
  },
];

type FilterPeriod = 'today' | 'last7days';
type ViewFilter = 'active' | 'dismissed';

const viewFilterOptions: { value: ViewFilter; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'dismissed', label: 'Dismissed' },
];

export default function InsightInboxPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [filter, setFilter] = useState<FilterPeriod>('today');
  const [viewFilter, setViewFilter] = useState<ViewFilter>('active');
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const viewDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (viewDropdownRef.current && !viewDropdownRef.current.contains(event.target as Node)) {
        setIsViewDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setInsights(mockInsights);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filter]);

  const handleSave = (id: string) => {
    setInsights((prev) =>
      prev.map((insight) =>
        insight.id === id ? { ...insight, status: 'saved' as InsightStatus } : insight
      )
    );
  };

  const handleDismiss = (id: string) => {
    setInsights((prev) =>
      prev.map((insight) =>
        insight.id === id ? { ...insight, status: 'dismissed' as InsightStatus } : insight
      )
    );
  };

  const handleViewDetails = (id: string) => {
    const insight = insights.find((i) => i.id === id);
    if (insight) {
      setSelectedInsight(insight);
    }
  };

  const handleCloseModal = () => {
    setSelectedInsight(null);
  };

  // Filter insights based on view filter
  const filteredInsights = insights.filter((insight) => {
    if (viewFilter === 'dismissed') {
      return insight.status === 'dismissed';
    }
    return insight.status !== 'dismissed';
  });

  const dismissedCount = insights.filter((i) => i.status === 'dismissed').length;

  return (
    <div className="insight-inbox-container">
      <header className="insight-inbox-header">
        <div className="insight-inbox-header-left">
          <h1 className="insight-inbox-title">Insight Inbox</h1>
          <p className="insight-inbox-subtitle">Insights for today</p>
        </div>
        <div className="insight-inbox-filters">
          <div className="insight-view-dropdown" ref={viewDropdownRef}>
            <button
              type="button"
              className={`insight-view-dropdown-trigger ${isViewDropdownOpen ? 'insight-view-dropdown-trigger--open' : ''}`}
              onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
            >
              <span className="insight-view-dropdown-label">
                {viewFilter === 'active' ? 'Active' : `Dismissed${dismissedCount > 0 ? ` (${dismissedCount})` : ''}`}
              </span>
              <ChevronDown size={14} className={`insight-view-dropdown-chevron ${isViewDropdownOpen ? 'insight-view-dropdown-chevron--open' : ''}`} />
            </button>

            {isViewDropdownOpen && (
              <ul className="insight-view-dropdown-menu">
                {viewFilterOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`insight-view-dropdown-item ${viewFilter === option.value ? 'insight-view-dropdown-item--selected' : ''}`}
                    onClick={() => {
                      setViewFilter(option.value);
                      setIsViewDropdownOpen(false);
                    }}
                  >
                    <span>
                      {option.label}
                      {option.value === 'dismissed' && dismissedCount > 0 && ` (${dismissedCount})`}
                    </span>
                    {viewFilter === option.value && <Check size={14} />}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span className="insight-filter-divider" />
          <button
            className={`insight-filter-btn ${filter === 'today' ? 'insight-filter-btn--active' : ''}`}
            onClick={() => setFilter('today')}
          >
            Today
          </button>
          <button
            className={`insight-filter-btn ${filter === 'last7days' ? 'insight-filter-btn--active' : ''}`}
            onClick={() => setFilter('last7days')}
          >
            Last 7 days
          </button>
        </div>
      </header>

      <main className="insight-inbox-main">
        {loading ? (
          <div className="insight-skeleton-list">
            {[1, 2, 3].map((i) => (
              <div key={i} className="insight-skeleton-card">
                <div className="insight-skeleton-title" />
                <div className="insight-skeleton-text" />
                <div className="insight-skeleton-text insight-skeleton-text--short" />
              </div>
            ))}
          </div>
        ) : filteredInsights.length === 0 ? (
          <div className="insight-empty-state">
            <div className="insight-empty-state-icon">
              {viewFilter === 'dismissed' ? <Trash2 size={24} /> : <Inbox size={24} />}
            </div>
            <h3 className="insight-empty-state-title">
              {viewFilter === 'dismissed' ? 'No dismissed insights' : 'All caught up!'}
            </h3>
            <p className="insight-empty-state-text">
              {viewFilter === 'dismissed'
                ? 'Insights you dismiss will appear here for reference.'
                : 'No new insights for this period. Check back later for updates.'}
            </p>
          </div>
        ) : (
          <div className="insight-cards-list">
            {filteredInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                onSave={handleSave}
                onDismiss={handleDismiss}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </main>

      {selectedInsight && (
        <DetailsModal insight={selectedInsight} onClose={handleCloseModal} />
      )}
    </div>
  );
}
