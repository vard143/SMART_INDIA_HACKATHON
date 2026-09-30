import React, { createContext, useContext, useState, useEffect } from 'react';
import { UILanguage, TribalLanguage } from '../types';
import { i18n } from '../services/i18nService';
import { speechService } from '../services/speechService';

interface LanguageContextType {
  uiLanguage: UILanguage;
  setUiLanguage: (lang: UILanguage) => void;
  targetTribalLanguage: TribalLanguage;
  setTargetTribalLanguage: (lang: TribalLanguage) => void;
  t: (key: string, lang?: UILanguage) => string;
  speakText: (text: string, lang?: TribalLanguage | UILanguage) => void;
  availableLanguages: { id: UILanguage; name: string; nativeName: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uiLanguage, setUiLanguageState] = useState<UILanguage>(() => {
    try {
      const stored = localStorage.getItem('bhashasetu_ui_lang');
      if (stored === 'hindi' || stored === 'english') {
        return stored as UILanguage;
      }
    } catch (e) {}
    return 'english';
  });

  const [targetTribalLanguage, setTargetTribalLanguageState] = useState<TribalLanguage>(() => {
    try {
      const stored = localStorage.getItem('bhashasetu_target_lang');
      if (stored && ['santhali', 'ho', 'mundari', 'kurukh', 'kharia'].includes(stored)) {
        return stored as TribalLanguage;
      }
    } catch (e) {}
    return 'santhali';
  });

  useEffect(() => {
    i18n.setLanguage(uiLanguage);
    try {
      localStorage.setItem('bhashasetu_ui_lang', uiLanguage);
    } catch (e) {}
  }, [uiLanguage]);

  const setUiLanguage = (lang: UILanguage) => {
    const cleanLang = lang === 'hindi' ? 'hindi' : 'english';
    setUiLanguageState(cleanLang);
    i18n.setLanguage(cleanLang);
  };

  const setTargetTribalLanguage = (lang: TribalLanguage) => {
    setTargetTribalLanguageState(lang);
    try {
      localStorage.setItem('bhashasetu_target_lang', lang);
    } catch (e) {}
  };

  const t = (key: string, lang?: UILanguage) => {
    return i18n.t(key, lang || uiLanguage);
  };

  const speakText = (text: string, lang?: TribalLanguage | UILanguage) => {
    const speakLang = (lang && ['santhali', 'ho', 'mundari', 'kurukh', 'kharia'].includes(lang))
      ? (lang as TribalLanguage)
      : targetTribalLanguage;
    speechService.speak(text, speakLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        uiLanguage,
        setUiLanguage,
        targetTribalLanguage,
        setTargetTribalLanguage,
        t,
        speakText,
        availableLanguages: i18n.getAvailableLanguages()
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
