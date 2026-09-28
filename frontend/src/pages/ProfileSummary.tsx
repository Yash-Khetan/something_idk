import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';

export default function ProfileSummary() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'wage' | 'self_employment'>('all');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/beneficiaries/${id}/recommendations`);
        if (!res.ok) {
          throw new Error('Failed to load profile recommendations');
        }
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Error loading profile.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecommendations();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-bold text-gray-800">
          Generating your personalized PM-AJAY NSQF roadmap...
        </h2>
        <p className="text-sm text-gray-500">Matching official Sector Skill qualifications, skill-gap analysis, and grant schemes.</p>
      </div>
    );
  }

  if (error || !data || !data.beneficiary) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center bg-white rounded-2xl shadow p-8 border border-red-200">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-xl font-bold text-red-600 mt-2">{error || 'Beneficiary Profile Not Found'}</h2>
        <p className="text-gray-600 text-sm mt-2">Please create a new profile or use the Voice Assistant.</p>
        <Link to="/voice" className="mt-4 inline-block bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm">
          Go to Voice Assistant 🎙️
        </Link>
      </div>
    );
  }

  const { beneficiary, recommendations = [], trainingCenters = [], opportunities = [] } = data;

  const profileSummaryText = `Profile of ${beneficiary.name} from ${beneficiary.district || ''}, ${beneficiary.state || ''}. Education: ${beneficiary.education || 'Not specified'}. Occupation: ${beneficiary.currentOccupation || 'Not specified'}. Interests: ${beneficiary.interests || 'Skill skilling'}. Preference: ${beneficiary.employmentPreference || 'Either'}.`;

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8 px-2 sm:px-4">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <span>🇮🇳</span>
            <span>PM-AJAY Grants-in-Aid (GIA) Beneficiary Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t('recDashboardTitle')}
          </h1>
          <p className="text-sm text-blue-200 mt-1">
            Personalized NSQF pathways matched for <strong>{beneficiary.name}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AudioPlayerButton textToSpeak={profileSummaryText} size="lg" label="Listen Summary 🔊" />
          <Link
            to="/voice"
            className="bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            New Voice Assessment
          </Link>
        </div>
      </div>

      {/* Beneficiary Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xl shadow-inner">
              {beneficiary.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{beneficiary.name}</h2>
              <p className="text-xs text-gray-500">Beneficiary ID: {beneficiary.id.substring(0, 8)}... • {beneficiary.category || 'SC'}</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">
            Verified Beneficiary
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm">
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Location</p>
            <p className="font-semibold text-gray-900 mt-0.5">{[beneficiary.district, beneficiary.state].filter(Boolean).join(', ') || 'Not specified'}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Education</p>
            <p className="font-semibold text-gray-900 mt-0.5">{beneficiary.education || 'Not specified'}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Current Work</p>
            <p className="font-semibold text-gray-900 mt-0.5">{beneficiary.currentOccupation || 'Not specified'}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[11px]">Employment Preference</p>
            <p className="font-semibold text-blue-700 mt-0.5">{beneficiary.employmentPreference || 'Either'}</p>
          </div>
        </div>

        {/* PM-AJAY GIA Grant Entitlement Box */}
        <div className="mt-6 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎁</span>
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase">PM-AJAY Grant-in-Aid Eligibility</p>
              <p className="text-sm font-semibold text-amber-950">
                Eligible for ₹50,000 Capital Subsidy + 100% Free NSQF Skilling & Stipend
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-amber-200 text-amber-950 rounded-lg">
            Direct Central Benefit
          </span>
        </div>
      </div>

      {/* Filter Tabs (All / Wage Job / Self-Employment) */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-3">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900">
          Matched NSQF Certified Courses & Schemes
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
              activeTab === 'all' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Tracks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wage')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
              activeTab === 'wage' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            💼 Wage Jobs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('self_employment')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
              activeTab === 'self_employment' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🏢 ₹50k Grants & Business
          </button>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-8">
        {recommendations.map((rec: any, index: number) => {
          const course = rec.course;
          if (!course) return null;

          const title = language === 'Hindi' && course.titleHi ? course.titleHi :
                        language === 'Marathi' && course.titleMr ? course.titleMr : course.title;

          const description = language === 'Hindi' && course.descriptionHi ? course.descriptionHi :
                              language === 'Marathi' && course.descriptionMr ? course.descriptionMr : course.description;

          const reasons = language === 'Hindi' && rec.matchedReasonsHi?.length ? rec.matchedReasonsHi :
                          language === 'Marathi' && rec.matchedReasonsMr?.length ? rec.matchedReasonsMr : rec.matchedReasons;

          const skillGaps = language === 'Hindi' && rec.skillGapsHi?.length ? rec.skillGapsHi :
                            language === 'Marathi' && rec.skillGapsMr?.length ? rec.skillGapsMr : rec.skillGaps;

          const readoutSummary = `${title}. Match score ${rec.matchScore} percent. Minimum education required: ${course.minEducation}. Wage potential: ${course.wageEstimate}. PM-AJAY capital subsidy up to ₹50,000.`;

          return (
            <div
              key={rec.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card Header with Score */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-700 text-white">
                      #{index + 1} Best Match
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-800">
                      QP: {course.qpCode}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                      NSQF Level {course.nsqfLevel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      ⏱️ {course.durationHours} Hours (100% Free)
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">{title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{description}</p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <div className="text-center bg-white px-4 py-2 rounded-2xl border border-blue-200 shadow-sm">
                    <span className="text-2xl font-black text-blue-700">{rec.matchScore}%</span>
                    <p className="text-[10px] uppercase font-bold text-gray-500">{t('matchScore')}</p>
                  </div>
                  <AudioPlayerButton textToSpeak={readoutSummary} size="sm" />
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Why This Matches You (Explainability) */}
                <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100">
                  <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>💡</span>
                    <span>{t('whyMatchTitle')}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                    {reasons?.map((r: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skill Gap Analysis */}
                <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>🔍</span>
                    <span>{t('skillGapTitle')}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-gray-800">
                    {skillGaps?.map((g: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-700 font-bold">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dual Pathways Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Wage Track */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-gray-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">💼</span>
                        <h4 className="font-extrabold text-gray-900 text-sm">{t('wagePathwayTitle')}</h4>
                      </div>
                      <div className="space-y-2 text-xs text-gray-700 mt-3">
                        <p><strong>Estimated Salary:</strong> <span className="text-green-700 font-bold">{rec.wagePathway?.entrySalary}</span></p>
                        <p><strong>Training:</strong> {rec.wagePathway?.trainingDuration}</p>
                        <p><strong>Career Growth:</strong> {rec.wagePathway?.careerLadder}</p>
                        <p><strong>Placement:</strong> {rec.wagePathway?.placementAssistance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Self-Employment Track */}
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🏢</span>
                        <h4 className="font-extrabold text-emerald-950 text-sm">{t('selfEmploymentPathwayTitle')}</h4>
                      </div>
                      <div className="space-y-2 text-xs text-gray-800 mt-3">
                        <p><strong>Capital Subsidy:</strong> <span className="text-emerald-800 font-extrabold">{rec.selfEmploymentPathway?.pmAjaySubsidy}</span></p>
                        <p><strong>Est. Project Cost:</strong> {rec.selfEmploymentPathway?.estimatedProjectCost}</p>
                        <p><strong>Loan Support:</strong> {rec.selfEmploymentPathway?.nsfdcLoanSupport}</p>
                        <p><strong>Expected Earnings:</strong> <span className="text-green-800 font-bold">{rec.selfEmploymentPathway?.expectedMonthlyNetRevenue}</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PM-AJAY Official Grant & Application Note */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="font-bold text-gray-900">PM-AJAY GIA Benefit: </span>
                    <span>{course.pmAjayGrantDetails}</span>
                  </div>
                  <Link
                    to={`/opportunities?sector=${course.sector}`}
                    className="inline-flex items-center gap-1 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl text-xs whitespace-nowrap shadow-sm"
                  >
                    <span>View Local Jobs & Centers 🔍</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empanelled Training Centres Section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('trainingCentersTitle')}</h3>
            <p className="text-xs text-gray-500">Government empanelled skill hubs delivering PM-AJAY certified courses.</p>
          </div>
          <Link to="/opportunities?type=training" className="text-blue-700 text-xs font-bold hover:underline">
            {t('viewAllOpportunities')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainingCenters.slice(0, 4).map((center: any) => (
            <div key={center.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-gray-900">{center.name}</h4>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-800 rounded">
                  Empanelled
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">📍 {center.address}</p>
              <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
                <span className="text-gray-500">📞 {center.contactPhone}</span>
                <a
                  href={`tel:${center.contactPhone}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1 rounded-lg text-xs"
                >
                  Call Center
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Opportunities Section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('localJobsTitle')}</h3>
            <p className="text-xs text-gray-500">Matched wage employment and micro-enterprise grant schemes.</p>
          </div>
          <Link to="/opportunities" className="text-blue-700 text-xs font-bold hover:underline">
            {t('viewAllOpportunities')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {opportunities.slice(0, 4).map((opp: any) => (
            <div key={opp.id} className="p-4 rounded-2xl border border-gray-200 bg-white hover:border-blue-300 transition-all shadow-sm">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    opp.type === 'pm_ajay_grant' ? 'bg-amber-100 text-amber-900' :
                    opp.type === 'job' ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {opp.type === 'pm_ajay_grant' ? 'Govt Grant Subsidy' : opp.type.toUpperCase()}
                  </span>
                  <h4 className="font-bold text-sm text-gray-900 mt-1">{opp.title}</h4>
                </div>

                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  opp.isDemo ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                }`}>
                  {opp.isDemo ? 'Demo Seed' : 'Official'}
                </span>
              </div>

              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{opp.description}</p>
              
              <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                <span className="font-bold text-green-700">{opp.salaryOrStipend}</span>
                <span className="text-gray-500">📍 {opp.district}, {opp.state}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
