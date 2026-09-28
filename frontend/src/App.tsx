import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import LandingPage from './pages/LandingPage';
import VoiceAssistantPage from './pages/VoiceAssistantPage';
import ProfileForm from './pages/ProfileForm';
import ProfileSummary from './pages/ProfileSummary';
import OpportunitiesPage from './pages/OpportunitiesPage';
import WhatsAppSimulatorPage from './pages/WhatsAppSimulatorPage';
import AdminPage from './pages/AdminPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/voice" element={<VoiceAssistantPage />} />
              <Route path="/resume" element={<ResumeBuilderPage />} />
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/profile/:id" element={<ProfileSummary />} />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/whatsapp-simulator" element={<WhatsAppSimulatorPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-6 mt-12 text-center text-xs text-gray-500 space-y-1">
            <p className="font-semibold text-gray-700">
              PM-AJAY (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana) Livelihood & Skilling Assistant
            </p>
            <p>
              Aligned with National Skill Qualification Framework (NSQF) & Ministry of Social Justice & Empowerment, GoI.
            </p>
          </footer>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
