import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS as DEFAULT_TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'mr', label: 'मराठी', shortLabel: 'MR' },
  { code: 'hi', label: 'हिंदी', shortLabel: 'HI' },
];

/**
 * Legacy compatibility no-op function so that any external or cached calls
 * won't throw an undefined error.
 */
export function retriggerTranslation() {
  // Native translation system updates reactively via state, no hack required.
}

export function LanguageProvider({ children }) {
  // 1. Language preference: Supports ?lang= query param or 'en' as default, persisted in localStorage
  const [language, setLanguageState] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang && (urlLang === 'en' || urlLang === 'mr' || urlLang === 'hi')) {
          localStorage.setItem('urja_lang', urlLang);
          return urlLang;
        }
      }
      const saved = localStorage.getItem('urja_lang');
      if (saved && (saved === 'en' || saved === 'mr' || saved === 'hi')) {
        return saved;
      }
      return 'en';
    } catch {
      return 'en';
    }
  });

  // 2. Active translation dictionaries: Initialized from bundled static data for 0ms initial render
  const [translations, setTranslations] = useState(DEFAULT_TRANSLATIONS);
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);

  // 3. Fetch latest database-stored translations from backend on mount
  const fetchDbTranslations = useCallback(async () => {
    try {
      setIsLoadingTranslations(true);
      const res = await fetch('/api/translations');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.translations) {
          setTranslations((prev) => {
            const next = { ...prev };
            ['en', 'mr', 'hi'].forEach((lang) => {
              if (data.translations[lang]) {
                next[lang] = {
                  ...(next[lang] || {}),
                  ...data.translations[lang],
                };
              }
            });
            return next;
          });
        }
      }
    } catch (err) {
      console.warn('⚠️ [Translations] Could not fetch DB translations, using local dictionary:', err.message);
    } finally {
      setIsLoadingTranslations(false);
    }
  }, []);

  useEffect(() => {
    fetchDbTranslations();
  }, [fetchDbTranslations]);

  // 4. Update language with immediate localStorage persistence & document tag sync
  const setLanguage = useCallback((newLang) => {
    if (!newLang || (newLang !== 'en' && newLang !== 'mr' && newLang !== 'hi')) {
      return;
    }
    setLanguageState(newLang);
    try {
      localStorage.setItem('urja_lang', newLang);
      document.documentElement.lang = newLang;
      // Trigger a clean standard event for any interested elements
      window.dispatchEvent(new CustomEvent('urja:language-changed', { detail: { language: newLang } }));
    } catch (err) {
      console.warn('Error saving language choice:', err);
    }
  }, []);

  // Sync document html lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // 5. Fast, safe translation helper
  const t = useCallback(
    (key, fallback) => {
      if (!key) return '';
      const currentDict = translations[language] || translations.en || {};
      const englishDict = translations.en || {};

      if (currentDict[key] !== undefined && currentDict[key] !== '') {
        return currentDict[key];
      }
      if (englishDict[key] !== undefined && englishDict[key] !== '') {
        return englishDict[key];
      }
      return fallback !== undefined ? fallback : key;
    },
    [language, translations]
  );

  // 6. Admin helper: Save a single translation key to database & update state immediately
  const saveTranslation = useCallback(async (langCode, transKey, transValue, category = 'general') => {
    try {
      const res = await fetch('/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang_code: langCode,
          trans_key: transKey,
          trans_value: transValue,
          category,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTranslations((prev) => ({
          ...prev,
          [langCode]: {
            ...(prev[langCode] || {}),
            [transKey]: transValue,
          },
        }));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }, []);

  // 7. Admin helper: Batch save multiple translation edits to database & update state
  const saveBatchTranslations = useCallback(async (items) => {
    try {
      const res = await fetch('/api/translations/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.success) {
        setTranslations((prev) => {
          const next = { ...prev };
          items.forEach((item) => {
            if (!next[item.lang_code]) next[item.lang_code] = {};
            next[item.lang_code][item.trans_key] = item.trans_value;
          });
          return next;
        });
        return { success: true, count: data.count };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        translations,
        isLoadingTranslations,
        refreshTranslations: fetchDbTranslations,
        saveTranslation,
        saveBatchTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
