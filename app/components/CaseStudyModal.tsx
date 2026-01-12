'use client';

import { X } from 'react-feather';

interface CaseStudyContent {
  title: string;
  sections: {
    heading: string;
    content: string | string[];
  }[];
  takeaway: string;
}

const caseStudies: Record<string, CaseStudyContent> = {
  'AI Decision Review': {
    title: 'Regulated AI Decision Interface',
    sections: [
      {
        heading: 'Overview',
        content: 'This project explores how to design a regulated AI interface where AI supports decisions, but humans remain fully responsible. The focus is on clarity, accountability, and correct behavior under risk, rather than speed or automation.\n\nThe interface is designed for high-impact environments (e.g. finance, insurance, compliance), where a wrong decision can have legal or ethical consequences.',
      },
      {
        heading: 'The Problem',
        content: [
          'Many AI-powered tools present recommendations without clearly defining:',
          '• who is responsible for the final decision',
          '• how confident the AI actually is',
          '• what happens when uncertainty is high',
          '',
          'This often leads to over-trust in AI, unclear accountability, and poorly designed "Approve / Reject" flows that hide risk instead of managing it.',
          '',
          'The challenge was to design an interface where:',
          '• AI can explain itself',
          '• humans stay in control',
          '• responsibility is explicit',
          '• system behavior is predictable and auditable',
        ],
      },
      {
        heading: 'The Thinking',
        content: [
          'I approached this as a system design problem, not a UI problem.',
          '',
          'Key principles:',
          '• AI proposes, humans decide',
          '• Every decision must be traceable',
          '• Uncertainty must be visible, not hidden',
          '• The interface must slow users down when risk is high',
          '',
          'Instead of optimizing for speed, the design optimizes for correctness and trust calibration.',
        ],
      },
      {
        heading: 'The Solution',
        content: [
          'I designed a single-case decision interface with clear structure:',
          '',
          '• An AI recommendation section explaining the model\'s output',
          '• A confidence indicator that frames how reliable the insight is',
          '• A detailed explanation area that can be expanded on demand',
          '• A decision section with explicit actions: Approve, Reject, Request review',
          '',
          'Each action follows a confirmation → loading → final state flow, making state transitions explicit and unambiguous.',
          '',
          'The interface enforces rules through behavior:',
          '• actions are disabled during processing',
          '• final states lock further changes',
          '• responsibility is clearly tied to the human user',
        ],
      },
      {
        heading: 'What I Intentionally Did Not Build',
        content: [
          'To keep the system realistic and focused, I intentionally avoided:',
          '',
          '• dashboards or multi-case views',
          '• automation or auto-approval',
          '• alerts or nudges pushing users to act faster',
          '• backend logic or real model integration',
          '',
          'The goal was to design and validate the decision experience, not to simulate a full product.',
        ],
      },
      {
        heading: 'Prototype Validation',
        content: [
          'To validate that the design logic actually works, I built a lightweight React prototype.',
          '',
          'The prototype demonstrates:',
          '• real state transitions on the same page',
          '• loading and disabled states',
          '• confirmation flows',
          '• how UI enforces responsibility rules',
          '',
          'This was done to validate behavior, not to showcase frontend complexity.',
        ],
      },
      {
        heading: 'What This Project Demonstrates',
        content: [
          'This project demonstrates my ability to:',
          '',
          '• design interfaces for high-risk, regulated systems',
          '• think in terms of states, roles, and responsibility',
          '• translate abstract AI behavior into understandable UX',
          '• collaborate naturally with engineers by designing systems, not just screens',
        ],
      },
    ],
    takeaway: 'This project shows how AI interfaces can be designed to support human judgment without replacing responsibility.',
  },
  'Insight Inbox': {
    title: 'AI Insight Inbox',
    sections: [
      {
        heading: 'Overview',
        content: 'This project explores how AI generated insights can be presented in a way that helps humans understand what changed and why, without forcing decisions or creating unnecessary urgency.\n\nThe focus is on sense making, information clarity, and everyday usage rather than automation or control.',
      },
      {
        heading: 'The Problem',
        content: [
          'AI systems generate large volumes of signals such as trends, anomalies, predictions, and summaries. In many products, these appear as dashboards or alerts that are difficult to prioritize and even harder to interpret.',
          '',
          'Users are often left asking what actually matters today, why it matters, and how much they should trust the signal.',
          '',
          'The challenge was to design an interface that reduces cognitive load while preserving the meaning behind AI outputs.',
        ],
      },
      {
        heading: 'The Thinking',
        content: [
          'I approached this as an information design problem rather than a data visualization problem.',
          '',
          'The goal was to prioritize explanation before action, keep the experience calm rather than urgent, and favor context over raw metrics. Consistency and readability were treated as core design requirements so the interface could be used daily without friction.',
          '',
          'Instead of dashboards or alerts, I framed AI outputs as an inbox of insights that users can review, organize, and return to over time.',
        ],
      },
      {
        heading: 'The Solution',
        content: [
          'I designed a single page AI Insight Inbox with a clear reading flow.',
          '',
          'The interface includes a lightweight header for time context, a vertical feed of insight cards, and a details modal that expands context without breaking the reading flow.',
          '',
          'Each insight card explains what changed, why it matters, and how confident the AI is, allowing users to scan quickly while still understanding the reasoning behind each insight.',
        ],
      },
      {
        heading: 'What I Intentionally Did Not Build',
        content: [
          'To keep the experience focused and calm, I intentionally avoided dashboards, charts, alerts, approval workflows, and automation that would force action.',
          '',
          'These patterns would increase pressure and move the product away from its goal of everyday understanding.',
        ],
      },
      {
        heading: 'Prototype Validation',
        content: [
          'To validate interaction logic and information hierarchy, I built a lightweight React prototype.',
          '',
          'The prototype demonstrates insight state changes, modal behavior, loading states, and empty states to ensure the design works in real usage and not only in static screens.',
        ],
      },
      {
        heading: 'What This Project Demonstrates',
        content: [
          'This project demonstrates my ability to design AI interfaces focused on understanding rather than control, structure information for repeated use, and balance clarity and density in data heavy products.',
        ],
      },
    ],
    takeaway: 'This project shows how AI insights can be designed as calm and readable signals that help humans stay informed without forcing decisions.',
  },
};

interface CaseStudyModalProps {
  title: string;
  onClose: () => void;
}

export default function CaseStudyModal({ title, onClose }: CaseStudyModalProps) {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const caseStudy = caseStudies[title];

  if (!caseStudy) {
    return null;
  }

  return (
    <div className="case-study-modal-overlay" onClick={handleOverlayClick}>
      <div className="case-study-modal">
        <div className="case-study-modal-header">
          <span className="case-study-modal-title">Case Study</span>
          <button
            className="case-study-modal-close"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div className="case-study-modal-body">
          <h1 className="case-study-modal-content-title">{caseStudy.title}</h1>
          <div className="case-study-modal-content">
            {caseStudy.sections.map((section, index) => (
              <div key={index} className="case-study-section">
                <h3 className="case-study-section-heading">{section.heading}</h3>
                {Array.isArray(section.content) ? (
                  <div className="case-study-section-text">
                    {section.content.map((line, i) => (
                      <p key={i}>{line || '\u00A0'}</p>
                    ))}
                  </div>
                ) : (
                  <p className="case-study-section-text">{section.content}</p>
                )}
              </div>
            ))}
            {caseStudy.takeaway && (
              <div className="case-study-takeaway">
                <span className="case-study-takeaway-label">Takeaway:</span> {caseStudy.takeaway}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
