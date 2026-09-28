import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { SupportedLanguage } from '../i18n/translations';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('navHome'), icon: '🏠' },
    { to: '/voice', label: t('navVoiceAssistant'), icon: '🎙️' },
    { to: '/profile', label: t('navManualForm'), icon: '📝' },
    { to: '/resume', label: t('navResume'), icon: '📄' },
    { to: '/opportunities', label: t('navOpportunities'), icon: '💼' },
    { to: '/whatsapp-simulator', label: t('navWhatsApp'), icon: '💬' },
    { to: '/admin', label: t('navAdmin'), icon: '📊' },
  ];

  const languages: { code: SupportedLanguage; label: string; script: string }[] = [
    { code: 'Hindi', label: 'Hindi', script: 'हिंदी' },
    { code: 'Marathi', label: 'Marathi', script: 'मराठी' },
    { code: 'English', label: 'English', script: 'English' },
  ];

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header-inner">
        <div className="site-header-row">
          <Link to="/" className="site-brand">
            <span className="site-brand-mark" aria-hidden="true">PM</span>
            <span className="site-brand-copy">
              <span className="site-brand-title">{t('portalTitle')}</span>
              <span className="site-brand-subtitle">{t('portalSubtitle')}</span>
            </span>
          </Link>

          <nav className="site-nav-desktop" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = link.to === '/'
                ? location.pathname === '/'
                : location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`site-nav-link${isActive ? ' is-active' : ''}`}
                >
                  <span className="site-nav-icon" aria-hidden="true">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="site-language-group" role="group" aria-label="Choose language">
            <span className="site-language-label">Language</span>
            <div className="site-language-switcher">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  type="button"
                  aria-pressed={language === l.code}
                  className={`site-language-option${language === l.code ? ' is-active' : ''}`}
                  title={`Switch to ${l.label}`}
                >
                  {l.script}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className="site-nav-mobile" aria-label="Main navigation">
        {navLinks.map((link) => {
          const isActive = link.to === '/'
            ? location.pathname === '/'
            : location.pathname === link.to || location.pathname.startsWith(`${link.to}/`);
          return (
            <Link
              key={link.to}
              to={link.to}
              aria-current={isActive ? 'page' : undefined}
              className={`site-nav-link${isActive ? ' is-active' : ''}`}
            >
              <span className="site-nav-icon" aria-hidden="true">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
