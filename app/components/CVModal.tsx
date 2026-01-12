'use client';

import { useState, useRef } from 'react';
import { X, Mail, Phone, MapPin, Download, ExternalLink, Globe } from 'react-feather';

type CVLanguage = 'en' | 'it';

interface CVModalProps {
  onClose: () => void;
}

const cvContent = {
  en: {
    download: 'Download CV',
    location: 'Robbiate (Lecco, Italy)',
    email: 'mycontactpro@yahoo.com',
    phone: '+39 351 805 8441',
    languagesTitle: 'Languages',
    languages: 'French (Native) · English (Advanced) · Italian (Fluent)',
    profileTitle: 'Profile',
    profile: 'Product Designer with a strong front-end development background, focused on designing interfaces for complex systems where clarity, responsibility, and behavior matter. I specialize in state-driven interfaces, decision-heavy workflows, and AI-supported products, bridging design and engineering through system thinking and real implementation.',
    coreSkillsTitle: 'Core Skills',
    skillCategories: [
      {
        title: 'Product & System Design',
        skills: [
          'Complex workflows and state design',
          'Decision-driven and regulated interfaces',
          'Information architecture and hierarchy',
          'AI and data-driven product UX',
        ],
      },
      {
        title: 'Design & Prototyping',
        skills: [
          'Figma (components, variants, auto-layout, prototyping)',
          'Interaction and behavior modeling',
        ],
      },
      {
        title: 'Technical Background',
        skills: [
          'Strong frontend literacy',
          'React and JavaScript understanding',
          'Design to code collaboration',
        ],
      },
    ],
    experienceTitle: 'Professional Experience',
    experiences: [
      {
        role: 'Technical Systems Analyst',
        company: 'Elemaster · Italy',
        period: '2023 – 2025',
        points: [
          'Worked in a regulated production environment focused on system reliability and correctness',
          'Analyzed failures, documented system states, and supported traceability across teams',
          'Reinforced a design approach centered on clarity, responsibility, and error prevention',
        ],
      },
      {
        role: 'Front-End Developer',
        company: 'Mediatica · Remote',
        period: '2022 – 2024',
        points: [
          'Built interfaces for enterprise and government digital platforms',
          'Developed reusable component systems in collaboration with designers and engineers',
          'Contributed to complex, data-driven and regulated products',
        ],
      },
      {
        role: 'Front-End Developer',
        company: 'Reply · Milan',
        period: '2020 – 2022',
        points: [
          'Contributed to the migration of a large enterprise platform',
          'Built modular UI components aligned with design systems',
          'Worked closely with cross-functional teams',
        ],
      },
      {
        role: 'Front-End Developer Intern',
        company: 'Accenture · Milan',
        period: '2019 – 2020',
        points: [
          'Supported UI and frontend development on a banking platform',
          'Gained experience in large-scale enterprise environments',
        ],
      },
      {
        role: 'Founder / Developer',
        company: 'Independent Projects',
        period: '2019 – Present',
        points: [
          'Designed and built multiple production SaaS products',
          'Owned product design, frontend implementation, and system logic',
          'Iterated based on real user feedback and usage',
        ],
      },
    ],
    educationTitle: 'Education',
    education: [
      {
        degree: 'Computer Science (not completed)',
        school: 'University of Milan-Bicocca',
      },
      {
        degree: 'Scientific High School Diploma',
        school: 'Notre Dame College',
      },
    ],
    availabilityTitle: 'Availability',
    availability: 'Available to start immediately',
  },
  it: {
    download: 'Scarica CV',
    location: 'Robbiate (Lecco, Italia)',
    email: 'mycontactpro@yahoo.com',
    phone: '+39 351 805 8441',
    languagesTitle: 'Lingue',
    languages: 'Francese (madrelingua) · Inglese (avanzato) · Italiano (fluente)',
    profileTitle: 'Profilo',
    profile: "Product Designer con un solido background in front-end development, specializzato nella progettazione di interfacce per sistemi complessi, dove chiarezza, responsabilità e comportamento dell'interfaccia sono fondamentali. Mi occupo di interfacce state-driven, flussi decisionali complessi e prodotti supportati da AI, lavorando all'intersezione tra design e sviluppo attraverso un approccio sistemico e orientato all'implementazione reale.",
    coreSkillsTitle: 'Competenze Chiave',
    skillCategories: [
      {
        title: 'Product & System Design',
        skills: [
          'Progettazione di flussi complessi e gestione degli stati',
          'Interfacce decisionali e sistemi regolamentati',
          "Architettura dell'informazione e gerarchia dei contenuti",
          'UX per prodotti AI e data-driven',
        ],
      },
      {
        title: 'Design & Prototipazione',
        skills: [
          'Figma (componenti, varianti, auto-layout, prototipazione)',
          'Interaction design e modellazione del comportamento',
        ],
      },
      {
        title: 'Background Tecnico',
        skills: [
          'Solida comprensione dei sistemi front-end',
          'Conoscenza di React e JavaScript a supporto del design',
          'Collaborazione design–sviluppo e validazione design to code',
        ],
      },
    ],
    experienceTitle: 'Esperienza Professionale',
    experiences: [
      {
        role: 'Technical Systems Analyst',
        company: 'Elemaster · Italia',
        period: '2023 – 2025',
        points: [
          'Attività in ambiente produttivo regolamentato, con focus su affidabilità e correttezza dei sistemi',
          'Analisi dei guasti, documentazione degli stati di sistema e supporto alla tracciabilità',
          'Rafforzamento di un approccio progettuale orientato a chiarezza, responsabilità e prevenzione degli errori',
        ],
      },
      {
        role: 'Front-End Developer',
        company: 'Mediatica · Remote',
        period: '2022 – 2024',
        points: [
          'Sviluppo di interfacce per piattaforme enterprise e governative',
          'Progettazione e implementazione di sistemi di componenti riutilizzabili',
          'Collaborazione continua con designer e team di sviluppo su prodotti complessi e data-driven',
        ],
      },
      {
        role: 'Front-End Developer',
        company: 'Reply · Milano',
        period: '2020 – 2022',
        points: [
          'Partecipazione alla migrazione di una piattaforma enterprise su larga scala',
          'Sviluppo di componenti UI modulari allineati ai design system',
          'Collaborazione con team multifunzionali',
        ],
      },
      {
        role: 'Front-End Developer Intern',
        company: 'Accenture · Milano',
        period: '2019 – 2020',
        points: [
          'Supporto allo sviluppo UI e frontend su piattaforma bancaria',
          'Esperienza in contesti enterprise strutturati e ad alta complessità',
        ],
      },
      {
        role: 'Founder / Developer',
        company: 'Progetti Indipendenti',
        period: '2019 – Presente',
        points: [
          'Progettazione e sviluppo di prodotti SaaS in ambiente di produzione',
          'Gestione completa del prodotto: design, frontend e logica di sistema',
          'Iterazione continua basata su feedback reali e dati di utilizzo',
        ],
      },
    ],
    educationTitle: 'Formazione',
    education: [
      {
        degree: 'Informatica (percorso non completato)',
        school: 'Università degli Studi di Milano-Bicocca',
      },
      {
        degree: 'Diploma di maturità scientifica',
        school: 'Notre Dame College',
      },
    ],
    availabilityTitle: 'Disponibilità',
    availability: 'Disponibile a iniziare da subito',
  },
};

export default function CVModal({ onClose }: CVModalProps) {
  const [cvLang, setCvLang] = useState<CVLanguage>('en');
  const content = cvContent[cvLang];
  const cvContentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    // Open print dialog - user can save as PDF
    // The CV content will be printed exactly as it appears on screen
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const cvHtml = cvContentRef.current?.innerHTML || '';

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Fouad Liady - CV (${cvLang.toUpperCase()})</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              color: #1a1a1a;
              background: #fff;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            .cv-header {
              margin-bottom: 32px;
              padding-bottom: 24px;
              border-bottom: 1px solid #E5E7EB;
            }
            .cv-header-top {
              display: flex;
              gap: 28px;
              align-items: flex-start;
            }
            .cv-photo-img {
              width: 120px;
              height: auto;
              border-radius: 12px;
            }
            .cv-header-info {
              flex: 1;
            }
            .cv-name {
              font-size: 32px;
              font-weight: 700;
              color: #1a1a1a;
              margin: 0 0 4px 0;
            }
            .cv-role {
              font-size: 16px;
              color: #6B7280;
              margin: 0 0 16px 0;
            }
            .cv-contact {
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              margin-bottom: 12px;
            }
            .cv-contact-item {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 13px;
              color: #6B7280;
              text-decoration: none;
            }
            a.cv-contact-item,
            .cv-contact-item--portfolio {
              color: #2563EB;
            }
            .cv-languages {
              font-size: 13px;
              color: #6B7280;
            }
            .cv-languages strong {
              color: #1a1a1a;
            }
            .cv-section {
              margin-bottom: 28px;
            }
            .cv-section-title {
              font-size: 14px;
              font-weight: 600;
              color: #1a1a1a;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin: 0 0 16px 0;
              padding-bottom: 8px;
              border-bottom: 2px solid #1a1a1a;
            }
            .cv-section-text {
              font-size: 14px;
              color: #444;
              line-height: 1.7;
            }
            .cv-skills-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
            }
            .cv-skill-category-title {
              font-size: 13px;
              font-weight: 600;
              color: #1a1a1a;
              margin: 0 0 10px 0;
            }
            .cv-skill-list {
              list-style: none;
              margin: 0;
              padding: 0;
            }
            .cv-skill-list li {
              font-size: 13px;
              color: #444;
              line-height: 1.5;
              margin-bottom: 6px;
            }
            .cv-experiences {
              display: flex;
              flex-direction: column;
              gap: 24px;
            }
            .cv-experience {
              padding-bottom: 20px;
              border-bottom: 1px solid #F3F4F6;
            }
            .cv-experience:last-child {
              border-bottom: none;
            }
            .cv-experience-header {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              margin-bottom: 4px;
            }
            .cv-experience-role {
              font-size: 15px;
              font-weight: 600;
              color: #1a1a1a;
              margin: 0;
            }
            .cv-experience-period {
              font-size: 12px;
              color: #9CA3AF;
            }
            .cv-experience-company {
              font-size: 13px;
              color: #6B7280;
              margin: 0 0 12px 0;
            }
            .cv-experience-points {
              list-style: disc;
              margin: 0;
              padding-left: 20px;
            }
            .cv-experience-points li {
              font-size: 13px;
              color: #444;
              line-height: 1.5;
              margin-bottom: 6px;
            }
            .cv-education {
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            .cv-education-degree {
              font-size: 14px;
              font-weight: 500;
              color: #1a1a1a;
              margin: 0 0 2px 0;
            }
            .cv-education-school {
              font-size: 13px;
              color: #6B7280;
              margin: 0;
            }
            .cv-section--availability {
              background: #F9FAFB;
              padding: 20px;
              border-radius: 12px;
            }
            .cv-section--availability .cv-section-title {
              border-bottom: none;
              padding-bottom: 0;
              margin-bottom: 8px;
            }
            .cv-availability-text {
              font-size: 14px;
              color: #16a34a;
              font-weight: 500;
              margin: 0;
            }
            .cv-footer {
              margin-top: 32px;
              padding-top: 24px;
              border-top: 1px solid #E5E7EB;
              text-align: center;
            }
            .cv-portfolio-link {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              font-size: 14px;
              font-weight: 500;
              color: #2563EB;
              text-decoration: none;
              padding: 12px 24px;
              background: #EFF6FF;
              border-radius: 24px;
            }
            svg {
              display: inline-block;
              vertical-align: middle;
            }
            @media print {
              body {
                padding: 20px;
              }
              a {
                text-decoration: none;
              }
            }
          </style>
        </head>
        <body>
          ${cvHtml}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cv-modal-header">
          <div className="cv-modal-header-left">
            <h2 className="cv-modal-title">Curriculum Vitae</h2>
            <div className="cv-lang-toggle">
              <button
                className={`cv-lang-btn ${cvLang === 'en' ? 'cv-lang-btn--active' : ''}`}
                onClick={() => setCvLang('en')}
              >
                EN
              </button>
              <button
                className={`cv-lang-btn ${cvLang === 'it' ? 'cv-lang-btn--active' : ''}`}
                onClick={() => setCvLang('it')}
              >
                IT
              </button>
            </div>
          </div>
          <div className="cv-modal-header-right">
            <button className="cv-download-btn" onClick={handleDownload}>
              <Download size={14} />
              {content.download}
            </button>
            <button className="cv-modal-close" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="cv-modal-body">
          <div className="cv-content" ref={cvContentRef}>
            <header className="cv-header">
              <div className="cv-header-top">
                <div className="cv-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/profile.jpg"
                    alt="Fouad Liady"
                    className="cv-photo-img"
                  />
                </div>
                <div className="cv-header-info">
                  <h1 className="cv-name">Fouad Liady</h1>
                  <p className="cv-role">Product Designer</p>
                  <div className="cv-contact">
                    <a href="https://figma-liady.vercel.app" target="_blank" rel="noopener noreferrer" className="cv-contact-item cv-contact-item--portfolio">
                      <Globe size={14} />
                      Portfolio: figma-liady.vercel.app
                    </a>
                    <a href={`mailto:${content.email}`} className="cv-contact-item">
                      <Mail size={14} />
                      {content.email}
                    </a>
                    <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="cv-contact-item">
                      <Phone size={14} />
                      {content.phone}
                    </a>
                    <span className="cv-contact-item">
                      <MapPin size={14} />
                      {content.location}
                    </span>
                  </div>
                  <p className="cv-languages">
                    <strong>{content.languagesTitle}:</strong> {content.languages}
                  </p>
                </div>
              </div>
            </header>

            <section className="cv-section">
              <h2 className="cv-section-title">{content.profileTitle}</h2>
              <p className="cv-section-text">{content.profile}</p>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">{content.coreSkillsTitle}</h2>
              <div className="cv-skills-grid">
                {content.skillCategories.map((category, idx) => (
                  <div key={idx} className="cv-skill-category">
                    <h3 className="cv-skill-category-title">{category.title}</h3>
                    <ul className="cv-skill-list">
                      {category.skills.map((skill, sIdx) => (
                        <li key={sIdx}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">{content.experienceTitle}</h2>
              <div className="cv-experiences">
                {content.experiences.map((exp, idx) => (
                  <div key={idx} className="cv-experience">
                    <div className="cv-experience-header">
                      <h3 className="cv-experience-role">{exp.role}</h3>
                      <span className="cv-experience-period">{exp.period}</span>
                    </div>
                    <p className="cv-experience-company">{exp.company}</p>
                    <ul className="cv-experience-points">
                      {exp.points.map((point, pIdx) => (
                        <li key={pIdx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-section">
              <h2 className="cv-section-title">{content.educationTitle}</h2>
              <div className="cv-education">
                {content.education.map((edu, idx) => (
                  <div key={idx} className="cv-education-item">
                    <h3 className="cv-education-degree">{edu.degree}</h3>
                    <p className="cv-education-school">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="cv-section cv-section--availability">
              <h2 className="cv-section-title">{content.availabilityTitle}</h2>
              <p className="cv-availability-text">{content.availability}</p>
            </section>

            <footer className="cv-footer">
              <a
                href="https://figma-liady.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-portfolio-link"
              >
                <ExternalLink size={14} />
                figma-liady.vercel.app
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
