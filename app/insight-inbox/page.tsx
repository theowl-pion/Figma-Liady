'use client';

import { useState, useEffect, useRef } from 'react';
import { Inbox, Trash2, ChevronDown, Check } from 'react-feather';
import { Insight, InsightStatus } from '../types';
import InsightCard from './InsightCard';
import DetailsModal from './DetailsModal';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

type FilterPeriod = 'today' | 'last7days';
type ViewFilter = 'active' | 'dismissed';

export default function InsightInboxPage() {
  const { t } = useLanguage();

  const mockInsights: Insight[] = [
    {
      id: '1',
      title: t('ii.insight1.title'),
      summary: t('ii.insight1.summary'),
      confidence: 'Medium',
      confidenceExplanation: t('ii.insight1.explanation'),
      supportingSignals: [
        t('ii.insight1.signal1'),
        t('ii.insight1.signal2'),
        t('ii.insight1.signal3'),
      ],
      nextStep: t('ii.insight1.nextStep'),
      status: 'new',
    },
    {
      id: '2',
      title: t('ii.insight2.title'),
      summary: t('ii.insight2.summary'),
      confidence: 'High',
      confidenceExplanation: t('ii.insight2.explanation'),
      supportingSignals: [
        t('ii.insight1.signal1'),
        t('ii.insight1.signal2'),
        t('ii.insight1.signal3'),
      ],
      nextStep: t('ii.insight1.nextStep'),
      status: 'saved',
    },
    {
      id: '3',
      title: t('ii.insight3.title'),
      summary: t('ii.insight3.summary'),
      confidence: 'Low',
      confidenceExplanation: t('ii.insight3.explanation'),
      supportingSignals: [
        t('ii.insight1.signal1'),
        t('ii.insight1.signal2'),
        t('ii.insight1.signal3'),
      ],
      nextStep: t('ii.insight1.nextStep'),
      status: 'saved',
    },
  ];

  const viewFilterOptions: { value: ViewFilter; label: string }[] = [
    { value: 'active', label: t('ii.active') },
    { value: 'dismissed', label: t('ii.dismissed') },
  ];

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
          <h1 className="insight-inbox-title">{t('ii.title')}</h1>
          <p className="insight-inbox-subtitle">{t('ii.subtitle')}</p>
        </div>
        <div className="insight-inbox-filters">
          <div className="insight-view-dropdown" ref={viewDropdownRef}>
            <button
              type="button"
              className={`insight-view-dropdown-trigger ${isViewDropdownOpen ? 'insight-view-dropdown-trigger--open' : ''}`}
              onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
            >
              <span className="insight-view-dropdown-label">
                {viewFilter === 'active' ? t('ii.active') : `${t('ii.dismissed')}${dismissedCount > 0 ? ` (${dismissedCount})` : ''}`}
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
            {t('ii.today')}
          </button>
          <button
            className={`insight-filter-btn ${filter === 'last7days' ? 'insight-filter-btn--active' : ''}`}
            onClick={() => setFilter('last7days')}
          >
            {t('ii.last7days')}
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
              {viewFilter === 'dismissed' ? t('ii.emptyDismissed') : t('ii.emptyActive')}
            </h3>
            <p className="insight-empty-state-text">
              {viewFilter === 'dismissed'
                ? t('ii.emptyDismissedText')
                : t('ii.emptyActiveText')}
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
