import React, { createContext, useContext, useState, useEffect } from 'react';
import type { SupportedLanguage, FrontendTranslations } from '../i18n/translations';
import { frontendTranslations } from '../i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof FrontendTranslations) => string;
  speakText: (text: string, langOverride?: SupportedLanguage) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('pm_ajay_lang') as SupportedLanguage;
    return saved && ['English', 'Hindi', 'Marathi'].includes(saved) ? saved : 'Hindi';
  });

  const [isSpeaking, setIsSpeaking] = useState(false);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('pm_ajay_lang', lang);
  };

  const t = (key: keyof FrontendTranslations): string => {
    const dict = frontendTranslations[language] || frontendTranslations.English;
    return dict[key] || frontendTranslations.English[key] || String(key);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const speakText = (text: string, langOverride?: SupportedLanguage) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    if (!text || !text.trim()) return;

    const targetLang = langOverride || language;
    const utterance = new SpeechSynthesisUtterance(text);

    // Map language to BCP-47 language tag
    if (targetLang === 'Hindi') {
      utterance.lang = 'hi-IN';
    } else if (targetLang === 'Marathi') {
      utterance.lang = 'mr-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.95; // Slightly slower for low-literacy clarity
    utterance.pitch = 1.0;

    // Try finding matching native voice
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang.substring(0, 2)));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
    return () => {
      stopSpeaking();
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, speakText, stopSpeaking, isSpeaking }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
