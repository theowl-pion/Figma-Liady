'use client';

import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle">
      <button
        className={`language-btn ${language === 'en' ? 'language-btn--active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <button
        className={`language-btn ${language === 'it' ? 'language-btn--active' : ''}`}
        onClick={() => setLanguage('it')}
      >
        IT
      </button>
    </div>
  );
}
