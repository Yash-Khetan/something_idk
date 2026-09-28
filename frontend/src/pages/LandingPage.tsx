import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="py-6 sm:py-10 space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-12 shadow-xl border border-blue-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wide">
            <span>🇮🇳</span>
            <span>{t('heroBadge')}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            {t('heroTitle')}
          </h1>

          <p className="text-base sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t('heroDesc')}
          </p>

          <div className="flex justify-center pt-2">
            <AudioPlayerButton textToSpeak={t('heroDesc')} size="lg" label="Listen Page Overview 🔊" />
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/voice"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-blue-950 font-black py-4 px-8 rounded-2xl text-lg shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🎙️</span>
              <span>{t('btnStartVoice')}</span>
            </Link>

            <Link
              to="/profile"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl text-lg border border-white/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              <span>📝</span>
              <span>{t('btnStartForm')}</span>
            </Link>

            <Link
              to="/whatsapp-simulator"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>💬</span>
              <span>{t('btnWhatsAppBot')}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Official PM-AJAY GIA Grant Highlights */}
      <section className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
            Scheme Entitlements
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            {t('pmAjayHighlightTitle')}
          </h2>
          <p className="text-sm sm:text-base text-gray-700 mt-1">
            {t('pmAjayHighlightDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-amber-100 text-amber-900 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
              💰
            </div>
            <h3 className="font-extrabold text-gray-900 text-lg mb-2">₹50,000 Capital Subsidy</h3>
            <p className="text-xs text-gray-600">
              50% non-repayable project grant under PM-AJAY Grants-in-Aid for individual self-employment micro-units.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
              🎓
            </div>
            <h3 className="font-extrabold text-gray-900 text-lg mb-2">100% Free NSQF Skilling</h3>
            <p className="text-xs text-gray-600">
              Government-certified training in 10+ high-demand sectors with free lodging, boarding stipend, and toolkits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-green-100 text-green-900 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 shadow-inner">
              🏦
            </div>
            <h3 className="font-extrabold text-gray-900 text-lg mb-2">4% - 6% Low Interest Loans</h3>
            <p className="text-xs text-gray-600">
              Direct linkage with NSFDC (National Scheduled Castes Finance and Development Corporation) credit.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8">
          {t('howItWorksTitle')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xl mb-4 shadow">
              1
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('step1Title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('step1Desc')}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xl mb-4 shadow">
              2
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('step2Title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('step2Desc')}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
            <div className="w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center font-extrabold text-xl mb-4 shadow">
              3
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{t('step3Title')}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t('step3Desc')}</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA to Voice Experience */}
      <section className="text-center py-6">
        <div className="inline-block bg-blue-50 border border-blue-200 rounded-3xl p-8 max-w-3xl">
          <h3 className="text-2xl font-black text-blue-950 mb-3">
            Ready to find your livelihood pathway?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto text-sm sm:text-base">
            It only takes 2 minutes to talk to our AI voice assistant in your native language.
          </p>
          <Link
            to="/voice"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-md transition-all"
          >
            <span>🎙️</span>
            <span>{t('btnStartVoice')}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
