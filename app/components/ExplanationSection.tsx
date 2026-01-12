'use client';

import { useState } from 'react';
import { AlertTriangle } from 'react-feather';

export default function ExplanationSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card explanation-section">
      <div className="explanation-header">
        <h2 className="card-title">{expanded ? 'Detailed data used' : 'Explanation'}</h2>
        <button
          className={`view-detailed-btn ${expanded ? 'view-detailed-btn--close' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          <AlertTriangle size={16} />
          {expanded ? 'Close Detailed' : 'View Detailed'}
        </button>
      </div>

      {!expanded && (
        <p className="explanation-text">
          This recommendation is based on financial data from the last 24 months, including income stability, debt ratio, and credit history. The model compares these factors against historical patterns associated with similar cases.
        </p>
      )}

      <div className={`explanation-expanded-content ${expanded ? 'explanation-expanded-content--visible' : 'explanation-expanded-content--hidden'}`}>
        <p className="explanation-text">
          The model evaluated structured financial data provided by the applicant, including declared income, existing liabilities, and credit history records obtained from internal and third-party sources.
        </p>

        <p className="explanation-text" style={{ marginTop: '16px' }}>
          Data from the last 24 months was analyzed to identify patterns related to income stability, debt trends, and repayment behavior.
        </p>

        <ul className="explanation-factors" style={{ marginTop: '16px' }}>
          <li>Income volatility exceeding historical thresholds</li>
          <li>Debt-to-income ratio above recommended limits</li>
          <li>Limited repayment history with previous credit products</li>
          <li>Recent changes in employment status</li>
        </ul>

        <div className="known-limitations" style={{ marginTop: '24px' }}>
          <h3 className="limitations-title">Known limitations</h3>
          <p className="limitations-text">
            The model's confidence is reduced due to incomplete employment history data and limited long-term repayment records. External factors not captured in the available data may affect the accuracy of this assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
