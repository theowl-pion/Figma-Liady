import { Insight } from '../types';

interface DetailsModalProps {
  insight: Insight;
  onClose: () => void;
}

export default function DetailsModal({ insight, onClose }: DetailsModalProps) {
  const { title, supportingSignals, nextStep } = insight;

  return (
    <div className="insight-modal-overlay" onClick={onClose}>
      <div className="insight-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="insight-modal-title">{title}</h2>

        <div className="insight-modal-section">
          <h4 className="insight-modal-section-title">Supporting Signals:</h4>
          <ul className="insight-modal-signals">
            {supportingSignals.map((signal, index) => (
              <li key={index}>{signal}</li>
            ))}
          </ul>
        </div>

        {nextStep && (
          <p className="insight-modal-next-step">
            <strong>Next step:</strong> {nextStep}
          </p>
        )}

        <button className="insight-modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
