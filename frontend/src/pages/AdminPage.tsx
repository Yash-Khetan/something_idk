import { useState, useEffect } from 'react';

interface Beneficiary {
  id: string;
  name: string;
  language: string;
  district: string;
  education: string;
  currentOccupation: string;
  createdAt: string;
}

export default function AdminPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
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

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Prototype Admin Dashboard</h2>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
          Total Beneficiaries: {beneficiaries.length}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading data...</div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {beneficiaries.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.language}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.district || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.education || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.currentOccupation || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {beneficiaries.length === 0 && (
            <div className="text-center py-8 text-gray-500">No beneficiaries found.</div>
          )}
        </div>
      )}
    </div>
  );
}
