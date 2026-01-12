import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'react-feather';

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  figmaUrl?: string;
  onCaseStudy?: () => void;
  caseStudyLabel?: string;
  figmaLabel?: string;
  openProjectLabel?: string;
}

export default function NavigationCard({
  title,
  description,
  href,
  icon,
  figmaUrl,
  onCaseStudy,
  caseStudyLabel = 'Case Study',
  figmaLabel = 'Figma',
  openProjectLabel = 'Open Project'
}: NavigationCardProps) {
  return (
    <div className="nav-card">
      <div className="nav-card-header">
        <div className="nav-card-icon">{icon}</div>
        <div className="nav-card-content">
          <h3 className="nav-card-title">{title}</h3>
          <p className="nav-card-description">{description}</p>
        </div>
      </div>
      <div className="nav-card-actions">
        <button
          type="button"
          className="nav-card-btn nav-card-btn--secondary"
          onClick={onCaseStudy}
        >
          {caseStudyLabel}
        </button>
        {figmaUrl && (
          <a
            href={figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-card-btn nav-card-btn--secondary"
          >
            {figmaLabel}
            <ExternalLink size={14} />
          </a>
        )}
        <Link href={href} className="nav-card-btn nav-card-btn--primary">
          {openProjectLabel}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
