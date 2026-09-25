import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
}

export default function ProfileSummary() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Beneficiary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/beneficiaries/${id}`);
        if (!response.ok) {
          throw new Error('Profile not found');
        }
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading your profile...</div>;
  }

  if (error || !profile) {
    return <div className="text-center py-12 text-red-600">{error || 'Profile not found'}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Your Profile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <p className="font-medium text-gray-900">{profile.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Language</p>
            <p className="font-medium text-gray-900">{profile.language}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Location</p>
            <p className="font-medium text-gray-900">{[profile.district, profile.state].filter(Boolean).join(', ') || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Education</p>
            <p className="font-medium text-gray-900">{profile.education || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Occupation</p>
            <p className="font-medium text-gray-900">{profile.currentOccupation || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Interests & Skills</p>
            <p className="font-medium text-gray-900">{profile.interests || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Mobility</p>
            <p className="font-medium text-gray-900">{profile.mobility || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Employment Preference</p>
            <p className="font-medium text-gray-900">{profile.employmentPreference || 'Not specified'}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 md:p-8 rounded-lg border border-gray-200 opacity-80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200/50 flex items-center justify-center backdrop-blur-sm z-10">
           <p className="text-gray-700 font-medium px-4 py-2 bg-white rounded shadow-sm">Your personalized livelihood recommendations will appear here.</p>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Opportunities</h3>
        <div className="space-y-4 filter blur-sm">
          <div className="bg-white p-4 rounded shadow-sm border border-gray-200 h-24"></div>
          <div className="bg-white p-4 rounded shadow-sm border border-gray-200 h-24"></div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button 
          disabled
          className="bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg opacity-90 cursor-not-allowed"
          title="Recommendation engine coming next."
        >
          Recommendation engine coming next
        </button>
      </div>
    </div>
  );
}
