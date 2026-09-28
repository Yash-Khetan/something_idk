import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface EducationEntry {
  qualification: string;
  institution: string;
  year: string;
}

interface ExperienceEntry {
  role: string;
  organization: string;
  duration: string;
  details: string;
}

interface ResumeData {
  fullName: string;
  profession: string;
  phone: string;
  email: string;
  location: string;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: string;
  certifications: string;
  languages: string;
}

interface RecognitionResult {
  isFinal: boolean;
  0: { transcript: string };
}

interface RecognitionEvent {
  resultIndex: number;
  results: ArrayLike<RecognitionResult>;
}

interface RecognitionErrorEvent {
  error: string;
}

interface BrowserSpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

const initialResume: ResumeData = {
  fullName: '',
  profession: '',
  phone: '',
  email: '',
  location: '',
  summary: '',
  education: [{ qualification: '', institution: '', year: '' }],
  experience: [{ role: '', organization: '', duration: '', details: '' }],
  skills: '',
  certifications: '',
  languages: ''
};

function getSpeechRecognitionConstructor() {
  const browserWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
}

interface ResumeFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onDictate: () => void;
  isListening: boolean;
  multiline?: boolean;
  type?: string;
  placeholder?: string;
}

function ResumeField({
  label,
  value,
  onChange,
  onDictate,
  isListening,
  multiline = false,
  type = 'text',
  placeholder
}: ResumeFieldProps) {
  const controlClasses = 'w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-100';

  return (
    <label className="block space-y-1.5 text-sm font-semibold text-gray-700">
      <span>{label}</span>
      <span className="flex items-start gap-2">
        {multiline ? (
          <textarea
            value={value}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`${controlClasses} resize-y`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={event => onChange(event.target.value)}
            placeholder={placeholder}
            className={controlClasses}
          />
        )}
        <button
          type="button"
          onClick={onDictate}
          aria-label={`${isListening ? 'Stop' : 'Dictate'} ${label}`}
          title={`${isListening ? 'Stop dictating' : 'Dictate'} ${label}`}
          className={`h-10 w-10 shrink-0 rounded-md border text-base transition ${
            isListening
              ? 'border-red-300 bg-red-50 text-red-700'
              : 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-teal-50 hover:text-teal-800'
          }`}
        >
          {isListening ? '■' : '🎙️'}
        </button>
      </span>
    </label>
  );
}

export default function ResumeBuilderPage() {
  const { language } = useLanguage();
  const [resume, setResume] = useState<ResumeData>(initialResume);
  const [activeField, setActiveField] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  const updateResume = (field: keyof Omit<ResumeData, 'education' | 'experience'>, value: string) => {
    setResume(current => ({ ...current, [field]: value }));
  };

  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    setResume(current => ({
      ...current,
      education: current.education.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry
      )
    }));
  };

  const updateExperience = (index: number, field: keyof ExperienceEntry, value: string) => {
    setResume(current => ({
      ...current,
      experience: current.experience.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [field]: value } : entry
      )
    }));
  };

  const startDictation = (fieldName: string, currentValue: string, update: (value: string) => void) => {
    if (activeField === fieldName) {
      recognitionRef.current?.stop();
      return;
    }

    const Recognition = getSpeechRecognitionConstructor();
    if (!Recognition) {
      setVoiceError('Voice input is not supported by this browser. Use Chrome or Edge, or type in the fields.');
      return;
    }
    if (!window.isSecureContext) {
      setVoiceError('Voice input requires HTTPS or localhost. Open this app on localhost or a secure HTTPS address.');
      return;
    }

    recognitionRef.current?.stop();
    setVoiceError('');
    const recognition = new Recognition();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : language === 'Marathi' ? 'mr-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = event => {
      const spokenText = event.results[event.resultIndex]?.[0]?.transcript.trim();
      if (spokenText) update(currentValue.trim() ? `${currentValue.trim()} ${spokenText}` : spokenText);
    };
    recognition.onerror = event => {
      const message = event.error === 'not-allowed'
        ? 'Microphone access is blocked. Allow it in your browser and device settings, then try again.'
        : event.error === 'no-speech'
          ? 'No speech was detected. Try again or type in the field.'
          : `Voice input failed (${event.error}). You can still type in the field.`;
      setVoiceError(message);
      setActiveField('');
    };
    recognition.onend = () => setActiveField('');
    recognitionRef.current = recognition;
    setActiveField(fieldName);
    try {
      recognition.start();
    } catch {
      setActiveField('');
      setVoiceError('Could not start voice input. Check microphone permission and try again.');
    }
  };

  const skills = resume.skills.split(/[\n,]/).map(skill => skill.trim()).filter(Boolean);
  const certifications = resume.certifications.split(/[\n,]/).map(item => item.trim()).filter(Boolean);
  const spokenLanguages = resume.languages.split(/[\n,]/).map(item => item.trim()).filter(Boolean);
  const contactDetails = [resume.phone, resume.email, resume.location].filter(Boolean);
  const hasResumeContent = Boolean(
    resume.fullName || resume.profession || resume.summary || skills.length ||
    resume.education.some(entry => entry.qualification || entry.institution) ||
    resume.experience.some(entry => entry.role || entry.organization)
  );

  return (
    <div className="resume-builder-page mx-auto max-w-7xl space-y-6 py-4 sm:py-8">
      <header className="page-heading no-print flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase text-teal-800">Career tools</p>
          <h1 className="mt-1 text-3xl font-black text-gray-950">Resume Builder</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600">
            Add your details by typing or dictating into any field. Your resume preview updates as you go.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!hasResumeContent}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-teal-800 px-5 text-sm font-bold text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span aria-hidden="true">⤓</span>
          Print / Save as PDF
        </button>
      </header>

      {voiceError && (
        <div role="alert" className="no-print rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          {voiceError}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
        <section className="no-print space-y-6" aria-label="Resume details form">
          <div className="space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Personal details</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ResumeField label="Full name" value={resume.fullName} onChange={value => updateResume('fullName', value)} onDictate={() => startDictation('fullName', resume.fullName, value => updateResume('fullName', value))} isListening={activeField === 'fullName'} />
              <ResumeField label="Job title or target role" value={resume.profession} onChange={value => updateResume('profession', value)} onDictate={() => startDictation('profession', resume.profession, value => updateResume('profession', value))} isListening={activeField === 'profession'} />
              <ResumeField label="Phone" type="tel" value={resume.phone} onChange={value => updateResume('phone', value)} onDictate={() => startDictation('phone', resume.phone, value => updateResume('phone', value))} isListening={activeField === 'phone'} />
              <ResumeField label="Email" type="email" value={resume.email} onChange={value => updateResume('email', value)} onDictate={() => startDictation('email', resume.email, value => updateResume('email', value))} isListening={activeField === 'email'} />
              <div className="sm:col-span-2">
                <ResumeField label="City, district, and state" value={resume.location} onChange={value => updateResume('location', value)} onDictate={() => startDictation('location', resume.location, value => updateResume('location', value))} isListening={activeField === 'location'} />
              </div>
              <div className="sm:col-span-2">
                <ResumeField label="Professional summary" multiline value={resume.summary} onChange={value => updateResume('summary', value)} onDictate={() => startDictation('summary', resume.summary, value => updateResume('summary', value))} isListening={activeField === 'summary'} placeholder="A few lines about your experience, strengths, and the work you want." />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Education</h2>
              <button type="button" onClick={() => setResume(current => ({ ...current, education: [...current.education, { qualification: '', institution: '', year: '' }] }))} className="text-sm font-bold text-teal-800 hover:text-teal-950">+ Add education</button>
            </div>
            {resume.education.map((entry, index) => (
              <div key={index} className="grid gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0 sm:grid-cols-[1fr_1fr_120px_auto]">
                <ResumeField label="Qualification" value={entry.qualification} onChange={value => updateEducation(index, 'qualification', value)} onDictate={() => startDictation(`education-${index}-qualification`, entry.qualification, value => updateEducation(index, 'qualification', value))} isListening={activeField === `education-${index}-qualification`} />
                <ResumeField label="School or institution" value={entry.institution} onChange={value => updateEducation(index, 'institution', value)} onDictate={() => startDictation(`education-${index}-institution`, entry.institution, value => updateEducation(index, 'institution', value))} isListening={activeField === `education-${index}-institution`} />
                <ResumeField label="Year" value={entry.year} onChange={value => updateEducation(index, 'year', value)} onDictate={() => startDictation(`education-${index}-year`, entry.year, value => updateEducation(index, 'year', value))} isListening={activeField === `education-${index}-year`} />
                {resume.education.length > 1 && <button type="button" onClick={() => setResume(current => ({ ...current, education: current.education.filter((_, entryIndex) => entryIndex !== index) }))} className="self-end pb-2 text-sm font-semibold text-red-700">Remove</button>}
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Work experience</h2>
              <button type="button" onClick={() => setResume(current => ({ ...current, experience: [...current.experience, { role: '', organization: '', duration: '', details: '' }] }))} className="text-sm font-bold text-teal-800 hover:text-teal-950">+ Add experience</button>
            </div>
            {resume.experience.map((entry, index) => (
              <div key={index} className="space-y-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="grid gap-3 sm:grid-cols-3">
                  <ResumeField label="Role" value={entry.role} onChange={value => updateExperience(index, 'role', value)} onDictate={() => startDictation(`experience-${index}-role`, entry.role, value => updateExperience(index, 'role', value))} isListening={activeField === `experience-${index}-role`} />
                  <ResumeField label="Employer" value={entry.organization} onChange={value => updateExperience(index, 'organization', value)} onDictate={() => startDictation(`experience-${index}-organization`, entry.organization, value => updateExperience(index, 'organization', value))} isListening={activeField === `experience-${index}-organization`} />
                  <ResumeField label="Dates or duration" value={entry.duration} onChange={value => updateExperience(index, 'duration', value)} onDictate={() => startDictation(`experience-${index}-duration`, entry.duration, value => updateExperience(index, 'duration', value))} isListening={activeField === `experience-${index}-duration`} />
                </div>
                <ResumeField label="Responsibilities and achievements" multiline value={entry.details} onChange={value => updateExperience(index, 'details', value)} onDictate={() => startDictation(`experience-${index}-details`, entry.details, value => updateExperience(index, 'details', value))} isListening={activeField === `experience-${index}-details`} />
                {resume.experience.length > 1 && <button type="button" onClick={() => setResume(current => ({ ...current, experience: current.experience.filter((_, entryIndex) => entryIndex !== index) }))} className="text-sm font-semibold text-red-700">Remove experience</button>}
              </div>
            ))}
          </div>

          <div className="space-y-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Skills and additional information</h2>
            </div>
            <div className="grid gap-4">
              <ResumeField label="Skills (separate with commas)" multiline value={resume.skills} onChange={value => updateResume('skills', value)} onDictate={() => startDictation('skills', resume.skills, value => updateResume('skills', value))} isListening={activeField === 'skills'} placeholder="Electrical repair, customer service, tailoring" />
              <ResumeField label="Certifications and training" multiline value={resume.certifications} onChange={value => updateResume('certifications', value)} onDictate={() => startDictation('certifications', resume.certifications, value => updateResume('certifications', value))} isListening={activeField === 'certifications'} />
              <ResumeField label="Languages you speak" value={resume.languages} onChange={value => updateResume('languages', value)} onDictate={() => startDictation('languages', resume.languages, value => updateResume('languages', value))} isListening={activeField === 'languages'} />
            </div>
          </div>
        </section>

        <section aria-label="Resume preview" className="resume-print-area min-h-[700px] rounded-md border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="border-b-2 border-teal-800 pb-5">
            <h2 className="break-words text-3xl font-black uppercase text-gray-950">{resume.fullName || 'Your Name'}</h2>
            {resume.profession && <p className="mt-1 text-lg font-semibold text-teal-900">{resume.profession}</p>}
            {contactDetails.length > 0 && <p className="mt-3 break-words text-sm text-gray-600">{contactDetails.join('  |  ')}</p>}
          </div>

          {resume.summary && <section className="mt-6"><h3 className="text-xs font-extrabold uppercase text-teal-900">Profile</h3><p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">{resume.summary}</p></section>}

          {resume.experience.some(entry => entry.role || entry.organization || entry.details) && (
            <section className="mt-6">
              <h3 className="text-xs font-extrabold uppercase text-teal-900">Work experience</h3>
              <div className="mt-3 space-y-4">
                {resume.experience.filter(entry => entry.role || entry.organization || entry.details).map((entry, index) => (
                  <article key={index}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h4 className="font-bold text-gray-900">{entry.role || entry.organization}</h4>
                      {entry.duration && <span className="text-xs text-gray-500">{entry.duration}</span>}
                    </div>
                    {entry.role && entry.organization && <p className="text-sm text-gray-600">{entry.organization}</p>}
                    {entry.details && <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-700">{entry.details}</p>}
                  </article>
                ))}
              </div>
            </section>
          )}

          {resume.education.some(entry => entry.qualification || entry.institution) && (
            <section className="mt-6">
              <h3 className="text-xs font-extrabold uppercase text-teal-900">Education</h3>
              <div className="mt-3 space-y-3">
                {resume.education.filter(entry => entry.qualification || entry.institution).map((entry, index) => (
                  <div key={index} className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                    <p><span className="font-bold text-gray-900">{entry.qualification}</span>{entry.institution && <span className="text-gray-600">{entry.qualification ? ` · ${entry.institution}` : entry.institution}</span>}</p>
                    {entry.year && <span className="text-xs text-gray-500">{entry.year}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && <section className="mt-6"><h3 className="text-xs font-extrabold uppercase text-teal-900">Skills</h3><ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-700">{skills.map((skill, index) => <li key={`${skill}-${index}`}>{skill}</li>)}</ul></section>}
          {certifications.length > 0 && <section className="mt-6"><h3 className="text-xs font-extrabold uppercase text-teal-900">Certifications and training</h3><ul className="mt-2 space-y-1 text-sm text-gray-700">{certifications.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></section>}
          {spokenLanguages.length > 0 && <section className="mt-6"><h3 className="text-xs font-extrabold uppercase text-teal-900">Languages</h3><p className="mt-2 text-sm text-gray-700">{spokenLanguages.join(' · ')}</p></section>}

          {!hasResumeContent && <p className="mt-12 text-center text-sm text-gray-400">Your resume preview will appear here as you enter details.</p>}
        </section>
      </div>
    </div>
  );
}