import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';

const SECTORS = [
  'All',
  'Apparel',
  'Electronics',
  'Plumbing',
  'Automotive',
  'IT-ITeS',
  'Healthcare',
  'Agriculture',
  'Construction',
  'Food Processing',
  'Handicrafts'
];

const STATES = [
  'All',
  'Maharashtra',
  'Uttar Pradesh',
  'Bihar',
  'Delhi'
];

export default function OpportunitiesPage() {
  const { language, t } = useLanguage();

  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [centers, setCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (selectedType !== 'all') queryParams.append('type', selectedType);
        if (selectedSector !== 'All') queryParams.append('sector', selectedSector);
        if (selectedState !== 'All') queryParams.append('state', selectedState);
        if (searchQuery.trim()) queryParams.append('search', searchQuery.trim());

        const [oppRes, centerRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/opportunities?${queryParams.toString()}`),
          fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/opportunities/training-centers?state=${selectedState}`)
        ]);

        const oppData = await oppRes.json();
        const centerData = await centerRes.json();

        setOpportunities(oppData || []);
        setCenters(centerData || []);
      } catch (err) {
        console.error('Failed to load opportunities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedType, selectedSector, selectedState, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8 px-2 sm:px-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full">
            Database-Driven Opportunities
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold mt-2">
            Local Jobs, Training Centers & PM-AJAY Grants
          </h1>
          <p className="text-sm sm:text-base text-blue-100 mt-1">
            Search live and verified opportunities, empanelled NSDC hubs, and ₹50,000 capital subsidies for self-employment.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {/* Search Box */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Search Keywords</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Solar, Tailor, Electrician"
              className="w-full p-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t('filterByType')}</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Opportunity Types</option>
              <option value="pm_ajay_grant">🎁 PM-AJAY Capital Grant (₹50,000)</option>
              <option value="job">💼 Wage Employment (Job)</option>
              <option value="self_employment">🏢 Self-Employment Business</option>
              <option value="training">🎓 Skill Training</option>
            </select>
          </div>

          {/* Sector Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t('filterBySector')}</label>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {SECTORS.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">{t('filterByState')}</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full p-2.5 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Badges Legend */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-500 border-t border-gray-100">
          <span className="font-semibold">Legend:</span>
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">
            ✓ Verified Official Scheme / Center
          </span>
          <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">
            🧪 Demo / Prototype Seed Data
          </span>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="py-12 text-center text-gray-500">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          Loading opportunities and training hubs...
        </div>
      ) : (
        <div className="space-y-8">
          {/* Opportunities Cards Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>💼</span>
              <span>Available Jobs, Grants & Schemes ({opportunities.length})</span>
            </h2>

            {opportunities.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center text-gray-500 border border-gray-200">
                No opportunities match the selected filters. Try choosing "All" sectors or states.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {opportunities.map((opp) => {
                  const title = language === 'Hindi' && opp.titleHi ? opp.titleHi :
                                language === 'Marathi' && opp.titleMr ? opp.titleMr : opp.title;
                  const desc = language === 'Hindi' && opp.descriptionHi ? opp.descriptionHi :
                               language === 'Marathi' && opp.descriptionMr ? opp.descriptionMr : opp.description;

                  return (
                    <div
                      key={opp.id}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:border-blue-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase ${
                            opp.type === 'pm_ajay_grant' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            opp.type === 'job' ? 'bg-blue-100 text-blue-900' : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {opp.type === 'pm_ajay_grant' ? '🎁 PM-AJAY GIA Grant' : opp.type.replace('_', ' ')}
                          </span>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            opp.isDemo ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {opp.isDemo ? 'Demo Seed' : 'Official Verified'}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-base text-gray-900">{title}</h3>
                        <p className="text-xs text-blue-800 font-semibold mt-0.5">🏢 {opp.organization}</p>
                        <p className="text-xs text-gray-600 mt-2 leading-relaxed">{desc}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-extrabold text-green-700 text-sm">{opp.salaryOrStipend}</span>
                          <span className="text-gray-500 font-medium">📍 {opp.district}, {opp.state}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-[11px] text-gray-500">Contact: {opp.contactInfo}</span>
                          <AudioPlayerButton textToSpeak={`${title}. ${desc}. ${opp.salaryOrStipend}`} size="sm" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Empanelled Training Centers Grid */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🏛️</span>
              <span>Empanelled PM-AJAY Training Centers ({centers.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {centers.map((center) => (
                <div key={center.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-green-100 text-green-800 rounded">
                        PM-AJAY Empanelled
                      </span>
                      <span className="text-xs text-gray-500">{center.district}, {center.state}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">{center.name}</h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">📍 {center.address}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">📞 {center.contactPhone}</span>
                    <a
                      href={`tel:${center.contactPhone}`}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                    >
                      Call Hub
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
