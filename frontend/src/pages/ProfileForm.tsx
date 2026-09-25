import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", 
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function ProfileForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validatePhone = (phone: string) => {
    if (phone && !/^\d{10}$/.test(phone)) {
      return 'Mobile number must be exactly 10 digits';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setPhoneError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validation
    const phoneValidation = validatePhone(data.phone as string);
    if (phoneValidation) {
      setPhoneError(phoneValidation);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/beneficiaries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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

  const inputClass = "w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 hover:bg-gray-50 transition-colors";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const sectionClass = "bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6";

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
        <p className="text-gray-500">Tell us about yourself to find the best opportunities.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm mb-6 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        
        {/* Personal Details */}
        <div className={sectionClass}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Personal Details</h3>
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
              <input type="text" id="name" name="name" required className={inputClass} placeholder="Enter your full name" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className={labelClass}>Mobile Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  maxLength={10}
                  className={`${inputClass} ${phoneError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`} 
                  placeholder="10-digit number" 
                  onChange={(e) => setPhoneError(validatePhone(e.target.value))}
                />
                {phoneError && <p className="text-red-500 text-xs mt-1.5">{phoneError}</p>}
              </div>

              <div>
                <label htmlFor="language" className={labelClass}>Preferred Language <span className="text-red-500">*</span></label>
                <select id="language" name="language" required className={inputClass}>
                  <option value="">Select Language</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Bengali">Bengali</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={sectionClass}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="state" className={labelClass}>State</label>
              <select id="state" name="state" className={inputClass}>
                <option value="">Select State</option>
                {INDIAN_STATES.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="district" className={labelClass}>District</label>
              <input type="text" id="district" name="district" className={inputClass} placeholder="Enter your district" />
            </div>
          </div>
        </div>

        {/* Education & Skills */}
        <div className={sectionClass}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Education & Work</h3>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="education" className={labelClass}>Highest Education</label>
                <select id="education" name="education" className={inputClass}>
                  <option value="">Select Education</option>
                  <option value="Below 8th Standard">Below 8th Standard</option>
                  <option value="8th Pass">8th Pass</option>
                  <option value="10th Pass">10th Pass</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="ITI / Diploma">ITI / Diploma</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post Graduate">Post Graduate</option>
                </select>
              </div>

              <div>
                <label htmlFor="currentOccupation" className={labelClass}>Current Occupation</label>
                <input type="text" id="currentOccupation" name="currentOccupation" placeholder="e.g., Daily Wager, Student" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className={labelClass}>Interests & Skills</label>
              <input type="text" id="interests" name="interests" placeholder="e.g., Tailoring, Data Entry, Driving, Plumbing" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className={sectionClass}>
          <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="mobility" className={labelClass}>Willingness to Travel</label>
              <select id="mobility" name="mobility" className={inputClass}>
                <option value="">Select Option</option>
                <option value="Cannot travel far">Cannot travel far</option>
                <option value="Willing to travel within district">Willing to travel within district</option>
                <option value="Willing to travel within state">Willing to travel within state</option>
                <option value="Willing to relocate anywhere">Willing to relocate anywhere</option>
              </select>
            </div>

            <div>
              <label htmlFor="employmentPreference" className={labelClass}>Employment Preference</label>
              <select id="employmentPreference" name="employmentPreference" className={inputClass}>
                <option value="">Select Preference</option>
                <option value="Job">Job</option>
                <option value="Self-employment">Self-employment</option>
                <option value="Either">Either</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2 pb-12 text-right">
          <button 
            type="submit" 
            disabled={isSubmitting || !!phoneError}
            className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-150 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Profile...
              </span>
            ) : 'Create My Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
