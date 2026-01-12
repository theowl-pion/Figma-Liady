import { Info } from 'react-feather';

export default function AIRecommendationCard() {
  return (
    <div className="card ai-recommendation-card">
      <div className="card-header">
        <h2 className="card-title">AI Recommendation</h2>
        <div className="confidence-badge">
          <Info size={16} color="#F59E0B" />
          <span className="confidence-label">Low confidence</span>
          <span className="confidence-divider">|</span>
          <Info size={16} color="#9CA3AF" />
          <span className="confidence-message">AI is uncertain / human judgment required</span>
        </div>
      </div>

      <div className="risk-banner">
        <span className="risk-label">High Risk :</span>
        <span className="risk-text">The model indicates a medium level of confidence based on available data</span>
      </div>

      <ul className="risk-factors">
        <li>Irregular income pattern over the last 12 months</li>
        <li>High debt-to-income ratio</li>
        <li>Limited credit history</li>
      </ul>
    </div>
  );
}
