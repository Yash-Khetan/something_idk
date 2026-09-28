import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';

const INDIAN_STATES = [
  "Maharashtra", "Uttar Pradesh", "Bihar", "Delhi", "Andhra Pradesh", "Arunachal Pradesh", "Assam", 
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
  "Kerala", "Madhya Pradesh", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttarakhand", "West Bengal"
];

export default function ProfileForm() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    language: language,
    state: 'Maharashtra',
    district: '',
    education: '10th Pass',
    currentOccupation: '',
    interests: '',
    mobility: 'Willing to travel within district',
    employmentPreference: 'Either',
    category: 'SC',
    gender: 'Male',
    annualIncomeTier: '< 1 Lakh'
  });

  const validatePhone = (phone: string) => {
    if (phone && !/^\d{10}$/.test(phone)) {
      return 'Mobile number must be exactly 10 digits';
    }
    return '';
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'phone') {
      setPhoneError(validatePhone(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const phoneValidation = validatePhone(formData.phone);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/beneficiaries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create profile');
      }

      const result = await response.json();
      navigate(`/profile/${result.id}`);
    } catch (err) {
      setError('An error occurred while saving your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm";
  const labelClass = "block text-xs font-bold text-gray-700 uppercase mb-1.5";
  const sectionClass = "bg-white p-6 rounded-3xl shadow-sm border border-gray-200 mb-6";

  return (
    <div className="max-w-3xl mx-auto py-6 px-2 sm:px-4">
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-bold">
          <span>📝</span>
          <span>PM-AJAY Direct Beneficiary Profiler</span>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          Create Beneficiary Profile
        </h2>
        <p className="text-sm text-gray-500 max-w-lg mx-auto">
          Fill in details below to match with 100% free NSQF skill training and ₹50,000 PM-AJAY capital subsidies.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-sm mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Personal Details */}
        <div className={sectionClass}>
          <h3 className="text-base font-extrabold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Personal & Demographic Details</span>
            <AudioPlayerButton textToSpeak="Please enter your full name, phone number, gender, and preferred language." size="sm" />
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={inputClass}
                placeholder="e.g. Ramesh Kumar / Sunita Devi"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="phone" className={labelClass}>Mobile Number</label>
                <input
                  type="tel"
                  id="phone"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`${inputClass} ${phoneError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="10-digit number"
                />
                {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
              </div>

              <div>
                <label htmlFor="language" className={labelClass}>Preferred Language <span className="text-red-500">*</span></label>
                <select
                  id="language"
                  required
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className={inputClass}
                >
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className={labelClass}>Category (PM-AJAY Target)</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className={inputClass}
                >
                  <option value="SC">Scheduled Caste (SC - Primary)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="OBC">OBC</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={sectionClass}>
          <h3 className="text-base font-extrabold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Location</span>
            <AudioPlayerButton textToSpeak="Select your state and district to find nearby training centers and jobs." size="sm" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className={labelClass}>State</label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className={inputClass}
              >
                {INDIAN_STATES.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="district" className={labelClass}>District</label>
              <input
                type="text"
                id="district"
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
                className={inputClass}
                placeholder="e.g. Pune / Varanasi / Nagpur / Patna"
              />
            </div>
          </div>
        </div>

        {/* Education & Skills */}
        <div className={sectionClass}>
          <h3 className="text-base font-extrabold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Education & Trade Interests</span>
            <AudioPlayerButton textToSpeak="Tell us your highest education level and trades or skills you are interested in." size="sm" />
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="education" className={labelClass}>Highest Education</label>
                <select
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleChange('education', e.target.value)}
                  className={inputClass}
                >
                  <option value="Below 8th Standard">Below 8th Standard</option>
                  <option value="8th Pass">8th Pass</option>
                  <option value="10th Pass">10th Pass</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="ITI / Diploma">ITI / Diploma</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              <div>
                <label htmlFor="currentOccupation" className={labelClass}>Current Occupation</label>
                <input
                  type="text"
                  id="currentOccupation"
                  value={formData.currentOccupation}
                  onChange={(e) => handleChange('currentOccupation', e.target.value)}
                  placeholder="e.g. Daily wage worker, Homemaker, Student"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className={labelClass}>Trades & Skills of Interest</label>
              <input
                type="text"
                id="interests"
                value={formData.interests}
                onChange={(e) => handleChange('interests', e.target.value)}
                placeholder="e.g. Tailoring, Solar Panel Technician, Electrician, Data Entry, Bike Repair, Plumbing"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={sectionClass}>
          <h3 className="text-base font-extrabold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
            <span>Livelihood Preferences</span>
            <AudioPlayerButton textToSpeak="Choose your travel willingness and whether you prefer a monthly salary job or starting your own business." size="sm" />
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mobility" className={labelClass}>Willingness to Travel</label>
              <select
                id="mobility"
                value={formData.mobility}
                onChange={(e) => handleChange('mobility', e.target.value)}
                className={inputClass}
              >
                <option value="Cannot travel far">Cannot travel far (Near home)</option>
                <option value="Willing to travel within district">Willing to travel within district</option>
                <option value="Willing to travel within state">Willing to travel within state</option>
                <option value="Willing to relocate anywhere">Willing to relocate anywhere</option>
              </select>
            </div>

            <div>
              <label htmlFor="employmentPreference" className={labelClass}>Employment Preference</label>
              <select
                id="employmentPreference"
                value={formData.employmentPreference}
                onChange={(e) => handleChange('employmentPreference', e.target.value)}
                className={inputClass}
              >
                <option value="Either">Either (Jobs or Business)</option>
                <option value="Job">Monthly Wage Employment (Job)</option>
                <option value="Self-employment">Self-Employment Enterprise (₹50k Grant)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2 pb-12 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !!phoneError}
            className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-black py-4 px-10 rounded-2xl text-base shadow-lg transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Matching NSQF Courses...' : 'Generate My NSQF Roadmap 🚀'}
          </button>
        </div>
      </form>
    </div>
  );
}
