import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const LanguageSelector = ({ currentLanguage, onLanguageChange, translations }) => {
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">
        {translations[currentLanguage].languageSelector}:
      </span>
      <Select value={currentLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-32 h-8 border-gray-300 focus:border-purple-500 focus:ring-purple-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;