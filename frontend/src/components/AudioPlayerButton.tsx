import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { SupportedLanguage } from '../i18n/translations';

interface AudioPlayerButtonProps {
  textToSpeak: string;
  langOverride?: SupportedLanguage;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const AudioPlayerButton = ({
  textToSpeak,
  langOverride,
  size = 'md',
  className = '',
  label
}: AudioPlayerButtonProps) => {
  const { speakText, stopSpeaking, isSpeaking } = useLanguage();
  const [isPlayingThis, setIsPlayingThis] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingThis) {
      stopSpeaking();
      setIsPlayingThis(false);
    } else {
      speakText(textToSpeak, langOverride);
      setIsPlayingThis(true);
      // Timeout fallback
      setTimeout(() => {
        setIsPlayingThis(false);
      }, Math.max(3000, textToSpeak.length * 90));
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Listen audio"
      className={`inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-150 shadow-sm ${
        isPlayingThis && isSpeaking
          ? 'bg-amber-500 text-white animate-pulse'
          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
      } ${sizeClasses[size]} ${className}`}
      title="Listen in voice (Hindi/Marathi/English)"
    >
      {isPlayingThis && isSpeaking ? (
        <>
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>{label || 'Playing...'}</span>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        </>
      ) : (
        <>
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4a2 2 0 00-2 2v5a2 2 0 002 2h2.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06zM18.5 12a5.5 5.5 0 00-2.5-4.58v9.16a5.5 5.5 0 002.5-4.58zm2.5 0a8 8 0 00-4-6.93v1.65a6.5 6.5 0 010 10.56v1.65a8 8 0 004-6.93z" />
          </svg>
          <span>{label || 'Listen 🔊'}</span>
        </>
      )}
    </button>
  );
};
