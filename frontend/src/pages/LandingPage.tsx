import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        PM-AJAY Livelihood Assistant
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Find the right skills, training and livelihood opportunities for you. Available in regional languages.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link 
          to="/profile" 
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-150 ease-in-out shadow-md"
        >
          Start My Livelihood Journey
        </Link>
        <a 
          href="#how-it-works" 
          className="bg-white hover:bg-gray-50 text-blue-700 font-bold py-3 px-8 rounded-lg text-lg border border-blue-700 transition duration-150 ease-in-out"
        >
          How It Works
        </a>
      </div>

      <div id="how-it-works" className="w-full max-w-4xl pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div>
            <h3 className="text-lg font-bold mb-2">Tell us about yourself</h3>
            <p className="text-gray-600">Share your education, skills, and preferences to help us understand you better.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div>
            <h3 className="text-lg font-bold mb-2">Discover opportunities</h3>
            <p className="text-gray-600">We match your profile with suitable skills, training, and jobs in your area.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div>
            <h3 className="text-lg font-bold mb-2">Get your roadmap</h3>
            <p className="text-gray-600">Receive a personalized plan to achieve your livelihood goals step-by-step.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
