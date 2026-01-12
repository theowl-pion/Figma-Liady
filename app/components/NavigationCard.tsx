import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'react-feather';

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  figmaUrl?: string;
  onCaseStudy?: () => void;
}

export default function NavigationCard({
  title,
  description,
  href,
  icon,
  figmaUrl,
  onCaseStudy
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
          Case Study
        </button>
        {figmaUrl && (
          <a
            href={figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-card-btn nav-card-btn--secondary"
          >
            Figma
            <ExternalLink size={14} />
          </a>
        )}
        <Link href={href} className="nav-card-btn nav-card-btn--primary">
          Open Project
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
