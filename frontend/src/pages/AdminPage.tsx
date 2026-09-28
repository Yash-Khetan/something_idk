import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AudioPlayerButton } from '../components/AudioPlayerButton';

interface Beneficiary {
  id: string;
  name: string;
  phone: string;
  language: string;
  state: string;
  district: string;
  education: string;
  currentOccupation: string;
  interests: string;
  mobility: string;
  employmentPreference: string;
  category: string;
  createdAt: string;
}

export default function AdminPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/beneficiaries`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBeneficiaries(data);
      } catch (err) {
        setError('Failed to load beneficiaries.');
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const filtered = beneficiaries.filter(b => {
    const matchLang = selectedLanguage === 'All' || b.language === selectedLanguage;
    const matchSearch = !searchTerm ||
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.district && b.district.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.interests && b.interests.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchLang && matchSearch;
  });

  const langCounts = {
    Hindi: beneficiaries.filter(b => b.language === 'Hindi').length,
    Marathi: beneficiaries.filter(b => b.language === 'Marathi').length,
    English: beneficiaries.filter(b => b.language === 'English').length,
  };

  return (
    <div className="w-full py-6 space-y-6 px-2 sm:px-4">
      {/* Header */}
      <div className="page-banner bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
            Administrative Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            PM-AJAY Scheme Administrator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Monitoring regional voice assessments, NSQF skill mappings, and Grants-in-Aid disbursements.
          </p>
        </div>

        <Link
          to="/voice"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm shadow transition-colors"
        >
          + Launch Voice Assistant
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Beneficiaries</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{beneficiaries.length}</p>
          <p className="text-[11px] text-green-600 font-semibold mt-1">✓ 100% Profiled for PM-AJAY GIA</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Hindi (हिंदी) Sessions</p>
          <p className="text-3xl font-black text-blue-700 mt-1">{langCounts.Hindi}</p>
          <p className="text-[11px] text-gray-500 mt-1">Voice & Text interactions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Marathi (मराठी) Sessions</p>
          <p className="text-3xl font-black text-indigo-700 mt-1">{langCounts.Marathi}</p>
          <p className="text-[11px] text-gray-500 mt-1">Voice & Text interactions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">English Sessions</p>
          <p className="text-3xl font-black text-emerald-700 mt-1">{langCounts.English}</p>
          <p className="text-[11px] text-gray-500 mt-1">Voice & Text interactions</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-600 uppercase">Filter Language:</span>
          <div className="flex gap-1.5">
            {['All', 'Hindi', 'Marathi', 'English'].map((l) => (
              <button
                key={l}
                onClick={() => setSelectedLanguage(l)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  selectedLanguage === l ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or trade..."
            className="w-full p-2 text-xs border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading beneficiary records...</div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Beneficiary</th>
                <th className="px-5 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Language</th>
                <th className="px-5 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-5 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Education</th>
                <th className="px-5 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Trade Interest</th>
                <th className="px-5 py-3 text-left font-bold text-gray-500 uppercase tracking-wider">Preference</th>
                <th className="px-5 py-3 text-right font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{b.name}</div>
                    <div className="text-xs text-gray-400">{b.phone || 'No phone'} • {b.category || 'SC'}</div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      b.language === 'Hindi' ? 'bg-orange-100 text-orange-900' :
                      b.language === 'Marathi' ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {b.language}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-gray-700">
                    {[b.district, b.state].filter(Boolean).join(', ') || '-'}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap text-gray-700">{b.education || '-'}</td>
                  <td className="px-5 py-4 text-gray-900 font-medium max-w-xs truncate">{b.interests || '-'}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-blue-700 font-semibold">{b.employmentPreference || 'Either'}</td>
                  <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                    <AudioPlayerButton textToSpeak={`${b.name} from ${b.district}. Interested in ${b.interests}`} size="sm" />
                    <Link
                      to={`/profile/${b.id}`}
                      className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm"
                    >
                      View Roadmap →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-sm">
              No matching beneficiaries found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
