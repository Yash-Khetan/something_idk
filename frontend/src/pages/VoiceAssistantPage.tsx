import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AudioPlayerButton } from '../components/AudioPlayerButton';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

export default function VoiceAssistantPage() {
  const navigate = useNavigate();
  const { language, t, speakText, stopSpeaking } = useLanguage();

  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profile, setProfile] = useState<Record<string, any>>({
    name: '',
    language: language,
    state: '',
    district: '',
    education: '',
    currentOccupation: '',
    interests: '',
    mobility: '',
    employmentPreference: ''
  });

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [microphoneError, setMicrophoneError] = useState('');

  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef('');
  const submitAfterRecognitionRef = useRef(false);
  const recognitionFailedRef = useRef(false);
  const handleSendMessageRef = useRef<(text: string) => Promise<void>>(async () => {});
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Quick suggestions for low-literacy users in each language
  const suggestionsMap: Record<string, Record<number, string[]>> = {
    Hindi: {
      0: ["मेरा नाम रमेश कुमार है", "मेरा नाम सुनीता देवी है", "मेरा नाम राजेश है"],
      1: ["उत्तर प्रदेश, वाराणसी", "महाराष्ट्र, पुणे", "बिहार, पटना", "उत्तर प्रदेश, लखनऊ"],
      2: ["10वीं पास", "8वीं पास", "12वीं पास", "आईटीआई (ITI)", "स्नातक (Graduate)"],
      3: ["दैनिक मजदूरी", "गृहिणी", "छात्र / बेरोजगार", "खेती किसानी"],
      4: ["सिलाई एवं टेलरिंग", "सोलर पैनल एवं बिजली", "दोपहिया मैकेनिक", "कंप्यूटर डेटा एंट्री", "प्लंबिंग का काम"],
      5: ["जिले के अंदर", "राज्य के अंदर", "घर के पास ही", "कहीं भी जा सकते हैं"],
      6: ["स्वरोजगार (अपना काम/दुकान)", "मासिक वेतन की नौकरी", "दोनों में से कोई भी"]
    },
    Marathi: {
      0: ["माझे नाव सचिन जाधव आहे", "माझे नाव अनिकेत पाटील आहे", "माझे नाव प्रिया कांबळे आहे"],
      1: ["महाराष्ट्र, पुणे", "महाराष्ट्र, नागपूर", "महाराष्ट्र, नाशिक", "महाराष्ट्र, मुंबई"],
      2: ["१० वी पास", "८ वी पास", "१२ वी पास", "आयटीआय (ITI)", "पदवीधर (Graduate)"],
      3: ["रोजंदारी कामगार", "गृहिणी", "विद्यार्थी / बेरोजगार", "शेती काम"],
      4: ["शिलाई काम व गारमेंट्स", "सोलर पॅनल व इलेक्ट्रिशियन", "दुचाकी मेकॅनिक", "डेटा एंट्री व संगणक", "प्लंबिंग काम"],
      5: ["जिल्ह्यांतर्गत", "राज्यांतर्गत", "घराजवळच", "कुठेही तयार आहे"],
      6: ["स्वयंरोजगार (स्वतःचा व्यवसाय)", "मासिक पगाराची नोकरी", "काहीही चालेल"]
    },
    English: {
      0: ["My name is Ramesh Kumar", "My name is Sunita Devi", "My name is Aniket"],
      1: ["Maharashtra, Pune", "Uttar Pradesh, Varanasi", "Bihar, Patna", "Delhi"],
      2: ["10th Pass", "8th Pass", "12th Pass", "ITI / Diploma", "Graduate"],
      3: ["Daily Wage Worker", "Homemaker", "Unemployed Youth", "Agriculture"],
      4: ["Sewing & Tailoring", "Solar Panel & Electrician", "Two-Wheeler Mechanic", "Data Entry & Computer", "Plumbing"],
      5: ["Within District", "Within State", "Cannot travel far", "Anywhere"],
      6: ["Self-employment (Business)", "Monthly Salary Job", "Either"]
    }
  };

  const currentSuggestions = suggestionsMap[language]?.[stepIndex] || suggestionsMap.English[stepIndex] || [];

  // Setup Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const text = Array.from(event.results as Iterable<{ 0: { transcript: string } }>)
          .map(result => result[0].transcript)
          .join(' ');
        transcriptRef.current = text;
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        submitAfterRecognitionRef.current = false;
        recognitionFailedRef.current = true;
        setIsListening(false);
        const errors: Record<string, string> = {
          'not-allowed': 'Microphone access is blocked. Allow microphone access for this site in your browser and device settings, then reload.',
          'service-not-allowed': 'This browser is blocking its speech-recognition service. Try Chrome or Edge, or use the text input.',
          'audio-capture': 'No microphone was found. Connect a microphone and try again.',
          'no-speech': 'No speech was detected. Try speaking closer to the microphone.',
          network: 'The browser speech-recognition service could not connect. Check your internet connection and try again.'
        };
        setMicrophoneError(errors[event.error] || `Speech recognition failed (${event.error}). You can type your response instead.`);
      };

      recognition.onend = () => {
        setIsListening(false);
        const shouldSubmit = submitAfterRecognitionRef.current;
        submitAfterRecognitionRef.current = false;
        if (recognitionFailedRef.current) return;

        const finalTranscript = transcriptRef.current.trim();
        if (finalTranscript) {
          void handleSendMessageRef.current(finalTranscript);
        } else if (shouldSubmit) {
          setMicrophoneError('No speech was captured. Try again or type your response.');
        }
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      stopSpeaking();
    };
  }, []);

  // Fetch initial prompt on mount or language change
  useEffect(() => {
    const fetchInitialPrompt = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/conversation/prompt?step=0&language=${language}`);
        const data = await res.json();
        const botMsg: Message = {
          id: 'initial',
          sender: 'bot',
          text: data.question,
          timestamp: new Date()
        };
        setMessages([botMsg]);
        speakText(data.question, language);
      } catch (err) {
        console.error('Failed to load greeting:', err);
      }
    };

    fetchInitialPrompt();
  }, [language]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isProcessing]);

  const startVoiceInput = () => {
    stopSpeaking();
    setMicrophoneError('');
    if (!window.isSecureContext) {
      setMicrophoneError('Microphone access requires HTTPS or localhost. Open the app on localhost or a secure HTTPS address.');
      return;
    }
    if (!recognitionRef.current) {
      setSpeechSupported(false);
      setMicrophoneError('Speech recognition is unavailable in this browser. Use the text input instead.');
      return;
    }

    if (language === 'Hindi') {
      recognitionRef.current.lang = 'hi-IN';
    } else if (language === 'Marathi') {
      recognitionRef.current.lang = 'mr-IN';
    } else {
      recognitionRef.current.lang = 'en-IN';
    }

    transcriptRef.current = '';
    submitAfterRecognitionRef.current = false;
    recognitionFailedRef.current = false;
    setTranscript('');
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.warn('Could not start recognition:', e);
      setMicrophoneError('Could not start the microphone. Check this site’s microphone permission and try again.');
    }
  };

  const stopVoiceInputAndSend = () => {
    if (recognitionRef.current) {
      submitAfterRecognitionRef.current = true;
      recognitionRef.current.stop();
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isProcessing) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setTranscript('');
    setIsProcessing(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/conversation/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          message: textToSend,
          currentState: {
            stepIndex,
            profile
          }
        })
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      const data = await res.json();
      setStepIndex(data.stepIndex);
      setProfile(data.updatedProfile);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.nextPrompt,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(data.nextPrompt, language);

      if (data.isComplete && data.beneficiary) {
        setIsComplete(true);
        setTimeout(() => {
          navigate(`/profile/${data.beneficiary.id}`);
        }, 2200);
      }
    } catch (err) {
      console.error('Error in conversation:', err);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: language === 'Hindi'
          ? "माफ़ कीजिए, कोई तकनीकी त्रुटि हुई। कृपया दोबारा बोलें या लिखें।"
          : language === 'Marathi'
          ? "क्षमस्व, तांत्रिक अडचण आली आहे. कृपया पुन्हा बोला किंवा लिहा."
          : "Sorry, a technical error occurred. Please try speaking again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    handleSendMessageRef.current = handleSendMessage;
  }, [handleSendMessage]);

  return (
    <div className="max-w-6xl mx-auto py-2 px-2 sm:px-4">
      {/* Top Banner Header */}
      <div className="page-banner bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-blue-950 uppercase tracking-wide">
              Voice-First AI
            </span>
            <span className="text-xs text-blue-200">
              Language: <strong className="text-white">{language}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('voiceAssistantTitle')}
          </h1>
          <p className="text-sm text-blue-100 mt-0.5">
            {t('voiceAssistantSubtitle')}
          </p>
        </div>

        {/* PM-AJAY GIA Badge */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl text-xs sm:text-sm text-amber-200 font-semibold flex items-center gap-2">
          <span>🎁</span>
          <span>100% Free NSQF Skilling + ₹50,000 PM-AJAY Capital Grant</span>
        </div>
      </div>

      {!speechSupported && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-3 rounded-xl mb-4 text-xs font-medium">
          Note: Direct microphone speech recognition is recommended in Chrome/Edge. You can also use the text input and quick suggestion chips below.
        </div>
      )}
      {microphoneError && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-xl mb-4 text-sm">
          {microphoneError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Voice Chat Window */}
        <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 h-[680px]">
          {/* Chat Header Status */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                  🎙️
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">PM-AJAY Livelihood Guide</h2>
                <p className="text-xs text-green-600 font-medium">Ready in {language}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                Step {Math.min(stepIndex + 1, 7)} of 7
              </span>
            </div>
          </div>

          {/* Chat Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-blue-700 text-white flex-shrink-0 flex items-center justify-center text-sm font-bold">
                    PM
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  {msg.sender === 'bot' && (
                    <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-2">
                      <AudioPlayerButton textToSpeak={msg.text} size="sm" label="Replay 🔊" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className="flex items-center gap-2 text-gray-500 text-xs py-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center animate-spin">
                  ⏳
                </div>
                <span>{t('generatingRecommendations')}</span>
              </div>
            )}

            {isComplete && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center text-green-800 animate-pulse">
                <p className="font-bold text-base">🎉 Profile Complete!</p>
                <p className="text-xs mt-1">Redirecting you to your NSQF skill and grant roadmap...</p>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick-Reply Suggestions Chips */}
          {currentSuggestions.length > 0 && !isComplete && (
            <div className="p-3 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-1.5 font-medium">💡 Tap quick response or speak aloud:</p>
              <div className="flex flex-wrap gap-2">
                {currentSuggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(item)}
                    className="px-3 py-1.5 text-xs sm:text-sm bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 hover:border-blue-400 rounded-full font-medium transition-colors shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Voice & Text Input Controls */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
            {isListening ? (
              <div className="flex flex-col items-center py-2 space-y-3 bg-amber-50 rounded-xl p-3 border border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                  <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
                  <span>{t('micListening')}</span>
                </div>

                <p className="text-sm font-medium text-gray-700 italic min-h-[24px]">
                  "{transcript || '...'}"
                </p>

                <button
                  type="button"
                  onClick={stopVoiceInputAndSend}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <span>⏹️</span>
                  <span>Done Speaking (Send)</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Big Primary Mic Button */}
                <button
                  type="button"
                  onClick={startVoiceInput}
                  disabled={isProcessing || isComplete}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold p-3.5 sm:px-6 sm:py-3.5 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
                  title="Click and speak in Hindi/Marathi/English"
                >
                  <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                  <span className="hidden sm:inline font-extrabold">{t('micClickToSpeak')}</span>
                </button>

                {/* Text input fallback */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputText);
                  }}
                  className="flex-1 flex gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('typeMessagePlaceholder')}
                    disabled={isProcessing || isComplete}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isProcessing || isComplete}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-full text-sm font-bold shadow transition-colors disabled:opacity-40"
                  >
                    {t('btnSend')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Live Extracted Structured Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span>📋</span>
                <span>{t('liveProfileTitle')}</span>
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800 font-semibold">
                Auto Syncing
              </span>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Full Name</p>
                <p className="font-semibold text-gray-900 mt-0.5">
                  {profile.name || <span className="text-gray-400 italic">Listening for name...</span>}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Location</p>
                <p className="font-semibold text-gray-900 mt-0.5">
                  {[profile.district, profile.state].filter(Boolean).join(', ') || (
                    <span className="text-gray-400 italic">Listening for district/state...</span>
                  )}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Education Level</p>
                <p className="font-semibold text-gray-900 mt-0.5">
                  {profile.education || <span className="text-gray-400 italic">Listening for education...</span>}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Current Occupation</p>
                <p className="font-semibold text-gray-900 mt-0.5">
                  {profile.currentOccupation || <span className="text-gray-400 italic">Listening for occupation...</span>}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Skills & Interests</p>
                <p className="font-semibold text-blue-900 mt-0.5">
                  {profile.interests || <span className="text-gray-400 italic">Listening for trade interest...</span>}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">Travel & Preference</p>
                <p className="font-semibold text-gray-900 mt-0.5">
                  {[profile.mobility, profile.employmentPreference].filter(Boolean).join(' • ') || (
                    <span className="text-gray-400 italic">Listening for preference...</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <span>🛡️</span>
                <span>Verified PM-AJAY Grant Guarantee</span>
              </p>
              <p className="text-blue-800">
                100% government funded training with NSQF certification & ₹50,000 capital subsidy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
