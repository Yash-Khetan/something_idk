import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import type { SupportedLanguage } from '../i18n/translations';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t('navHome'), icon: '🏠' },
    { to: '/voice', label: t('navVoiceAssistant'), icon: '🎙️', highlight: true },
    { to: '/profile', label: t('navManualForm'), icon: '📝' },
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Govt Scheme Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-white to-green-700 h-1"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Portal Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center text-white font-bold text-lg shadow-sm border border-blue-950">
              <span className="text-amber-400">PM</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-900 tracking-tight text-lg group-hover:text-blue-700 transition-colors">
                  {t('portalTitle')}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded border border-amber-200">
                  NSQF + GIA
                </span>
              </div>
              <p className="text-xs text-gray-500 hidden md:block">
                {t('portalSubtitle')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-700 text-white shadow-sm'
                      : link.highlight
                      ? 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Regional Language Switcher */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 p-1 rounded-lg border border-gray-200 flex items-center gap-1 shadow-inner">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    language === l.code
                      ? 'bg-blue-800 text-white shadow'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                  title={`Switch to ${l.label}`}
                >
                  {l.script}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden border-t border-gray-100 bg-gray-50 overflow-x-auto py-2 px-3 flex gap-2">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                isActive
                  ? 'bg-blue-800 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 shadow-sm'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
