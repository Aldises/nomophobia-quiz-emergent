import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const QuizResults = ({ score, onRestart, translations }) => {
  const getScoreCategory = (score) => {
    if (score >= 20 && score <= 59) return 'mild';
    if (score >= 60 && score <= 99) return 'moderate';
    if (score >= 100 && score <= 140) return 'severe';
    return 'mild';
  };

  const category = getScoreCategory(score);
  
  const getCategoryColor = (category) => {
    switch (category) {
      case 'mild': return 'bg-green-100 text-green-800 border-green-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'severe': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDefinition = (category) => {
    switch (category) {
      case 'mild': return translations.mildDef;
      case 'moderate': return translations.moderateDef;
      case 'severe': return translations.severeDef;
      default: return translations.mildDef;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {/* Results Card */}
      <Card className="mb-6 sm:mb-8 border-2 border-gray-100 shadow-xl">
        <CardHeader className="text-center pb-2 sm:pb-4 px-4 sm:px-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {translations.yourScore}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center px-4 sm:px-6">
          {/* Score Display */}
          <div className="mb-6 sm:mb-8">
            <div className="text-4xl sm:text-6xl font-bold text-purple-600 mb-2">
              {score}
            </div>
            <div className="text-lg sm:text-xl text-gray-600">
              {translations.outOf}
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-6 sm:mb-8">
            <div className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
              {translations.category}:
            </div>
            <Badge 
              className={`text-base sm:text-lg px-4 sm:px-6 py-2 font-semibold ${getCategoryColor(category)}`}
            >
              {translations[category]}
            </Badge>
          </div>

          {/* Definition */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
              {translations.definition}:
            </h3>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200">
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-left">
                {getDefinition(category)}
              </p>
            </div>
          </div>

          {/* Restart Button */}
          <Button
            onClick={onRestart}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base"
          >
            {translations.restart}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;