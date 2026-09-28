import { useState } from 'react';
import { AudioPlayerButton } from '../components/AudioPlayerButton';
import type { SupportedLanguage } from '../i18n/translations';

export default function WhatsAppSimulatorPage() {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('Hindi');
  const [phoneNumber, setPhoneNumber] = useState('919876543210');
  const [messageType, setMessageType] = useState<'voice_note' | 'text'>('voice_note');
  const [customText, setCustomText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [pipelineTrace, setPipelineTrace] = useState<any>(null);

  const sampleVoiceNotes: Record<SupportedLanguage, string> = {
    Hindi: "नमस्ते, मेरा नाम राजेश कुमार है। मैं वाराणसी उत्तर प्रदेश से हूँ। मैंने 10वीं पास की है और मुझे सोलर पैनल या इलेक्ट्रीशियन का काम सीखना है। क्या मुझे सरकारी अनुदान मिल सकता है?",
    Marathi: "नमस्ते, माझे नाव सचिन पाटील आहे. मी पुणे, महाराष्ट्र येथून आहे. माझे १० वी शिक्षण झाले आहे आणि मला दुचाकी दुरुस्ती किंवा सोलरचे काम शिकायचे आहे. पीएम-अजय अनुदान कसे मिळेल?",
    English: "Hello, my name is Rajesh Kumar from Pune, Maharashtra. I have passed 10th standard and I want to learn two-wheeler technician or solar skills. Can you suggest government schemes?"
  };

  const handleSimulate = async (textOverride?: string) => {
    setIsLoading(true);
    const textToSend = textOverride !== undefined ? textOverride : (customText || sampleVoiceNotes[selectedLang]);

    const userEntry = {
      id: Date.now(),
      sender: 'user',
      type: messageType,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatLog(prev => [...prev, userEntry]);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/whatsapp/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromPhone: phoneNumber,
          messageType,
          text: textToSend,
          language: selectedLang
        })
      });

      if (!res.ok) throw new Error('WhatsApp simulation failed');

      const data = await res.json();
      setPipelineTrace(data);

      const botEntry = {
        id: Date.now() + 1,
        sender: 'bot',
        type: 'text',
        text: data.replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatLog(prev => [...prev, botEntry]);
      setCustomText('');
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-4 sm:py-6 space-y-6 px-2 sm:px-4">
      {/* Top Banner */}
      <div className="page-banner bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <span>💬</span>
            <span>Meta WhatsApp Business API Integration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            WhatsApp Voice-Note Simulator & Webhook Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Simulates the complete: <code>WhatsApp Voice Note → STT → AI Extraction → PM-AJAY NSQF Recs → Outbound WhatsApp Reply</code>
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-2xl text-xs text-emerald-200">
          Webhook Endpoint: <code>/api/whatsapp/webhook</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl shadow-sm border border-gray-200 space-y-5">
          <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 flex items-center gap-2">
            <span>⚙️</span>
            <span>Simulation Parameters</span>
          </h2>

          {/* Mode Selector (Voice Note vs Text Message) */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Interaction Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMessageType('voice_note')}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                  messageType === 'voice_note' ? 'bg-emerald-700 text-white shadow' : 'bg-gray-100 text-gray-700'
                }`}
              >
                🎤 Voice Note (Audio STT)
              </button>
              <button
                type="button"
                onClick={() => setMessageType('text')}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                  messageType === 'text' ? 'bg-emerald-700 text-white shadow' : 'bg-gray-100 text-gray-700'
                }`}
              >
                💬 Text Message
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Voice Note Language</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Hindi', 'Marathi', 'English'] as SupportedLanguage[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setSelectedLang(l)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                    selectedLang === l
                      ? 'bg-emerald-700 text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {l === 'Hindi' ? 'हिंदी (Hindi)' : l === 'Marathi' ? 'मराठी (Marathi)' : 'English'}
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">WhatsApp Mobile Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Quick Preset Voice Notes */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
              Preset Sample Voice Note ({selectedLang})
            </label>
            <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200 text-xs text-gray-800 italic">
              "{sampleVoiceNotes[selectedLang]}"
            </div>
            <button
              type="button"
              onClick={() => handleSimulate(sampleVoiceNotes[selectedLang])}
              disabled={isLoading}
              className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>🎙️</span>
              <span>Send Sample Voice Note</span>
            </button>
          </div>

          {/* Custom Voice/Text Input */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Or Type Custom Note</label>
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. My name is Ramesh from Varanasi. 10th pass, interested in electrician course..."
              className="w-full p-3 text-xs sm:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="button"
              onClick={() => handleSimulate()}
              disabled={!customText.trim() || isLoading}
              className="mt-2 w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow transition-colors disabled:opacity-40"
            >
              Send Custom Note
            </button>
          </div>

          {/* Meta API Env Variables Guide */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs space-y-1.5 text-gray-600">
            <p className="font-bold text-gray-800">Production WhatsApp Cloud API Setup:</p>
            <p>1. <code>WHATSAPP_PHONE_NUMBER_ID</code> - From Meta Developer App</p>
            <p>2. <code>WHATSAPP_ACCESS_TOKEN</code> - System User Access Token</p>
            <p>3. <code>WHATSAPP_VERIFY_TOKEN</code> - Webhook Verification Secret</p>
          </div>
        </div>

        {/* Right Column: Realistic WhatsApp Phone Mockup & Pipeline Logs */}
        <div className="lg:col-span-7 space-y-6">
          {/* WhatsApp UI Card */}
          <div className="bg-[#efeae2] rounded-3xl shadow-lg border border-gray-300 overflow-hidden flex flex-col h-[520px]">
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-lg border border-white/20">
                  PM
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">PM-AJAY Livelihood Assistant</h3>
                  <p className="text-[11px] text-emerald-200">Official Govt Helpdesk • Online</p>
                </div>
              </div>
              <span className="text-xs bg-emerald-800/80 px-2.5 py-1 rounded-full text-emerald-100 font-medium">
                WhatsApp Bot
              </span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatLog.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500 space-y-2">
                  <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center text-2xl shadow-sm">
                    💬
                  </div>
                  <p className="text-xs font-semibold">No messages yet.</p>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Click "Send Sample Voice Note" to simulate an incoming audio message from WhatsApp user.
                  </p>
                </div>
              ) : (
                chatLog.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 shadow text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none'
                          : 'bg-white text-gray-900 rounded-tl-none border border-gray-100'
                      }`}
                    >
                      {msg.type === 'voice_note' && msg.sender === 'user' && (
                        <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-green-200 text-green-900 font-bold text-xs">
                          <span>🎤 Voice Note (Simulated STT)</span>
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      
                      <div className="mt-2 pt-1 border-t border-black/5 flex justify-between items-center text-[10px] text-gray-500">
                        <span>{msg.time}</span>
                        {msg.sender === 'bot' && (
                          <AudioPlayerButton textToSpeak={msg.text} size="sm" label="Listen 🔊" />
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {isLoading && (
                <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl inline-flex items-center gap-2 text-xs text-gray-600 shadow-sm">
                  <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing Voice Note with Speech-to-Text & PM-AJAY matching...</span>
                </div>
              )}
            </div>
          </div>

          {/* Live Pipeline Trace Inspector */}
          {pipelineTrace && (
            <div className="bg-slate-900 text-slate-100 p-5 rounded-3xl shadow-sm text-xs font-mono space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-emerald-400 font-bold">✓ Backend Pipeline Trace</span>
                <span className="text-slate-400">Status: 200 OK</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                <div>
                  <p className="text-slate-400">1. STT Transcript:</p>
                  <p className="text-slate-200 truncate mt-0.5">{pipelineTrace.transcript}</p>
                </div>
                <div>
                  <p className="text-slate-400">2. Beneficiary ID:</p>
                  <p className="text-slate-200 mt-0.5">{pipelineTrace.beneficiaryId || 'Synced'}</p>
                </div>
                <div>
                  <p className="text-slate-400">3. Matched NSQF Courses:</p>
                  <p className="text-emerald-300 mt-0.5">{pipelineTrace.recommendations?.length || 0} Courses Generated</p>
                </div>
                <div>
                  <p className="text-slate-400">4. Nearest Training Hub:</p>
                  <p className="text-slate-200 truncate mt-0.5">{pipelineTrace.trainingCenter?.name || 'Varanasi/Pune Hub'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
