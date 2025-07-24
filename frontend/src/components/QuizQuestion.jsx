import React from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Card, CardContent } from './ui/card';

const QuizQuestion = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  currentAnswer, 
  onAnswerChange, 
  onNext, 
  onPrevious, 
  canGoNext, 
  canGoPrevious,
  translations,
  language 
}) => {
  const likertScale = [1, 2, 3, 4, 5, 6, 7];
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            {translations.question} {questionNumber} {translations.of} {totalQuestions}
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-600">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress 
          value={progress} 
          className="h-2"
          style={{
            '--progress-background': '#7b3887',
          }}
        />
      </div>

      {/* Question Card */}
      <Card className="mb-6 sm:mb-8 border-2 border-gray-100 shadow-lg">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed mb-6 sm:mb-8">
            {question[language]}
          </h2>

          {/* Likert Scale - Mobile Optimized */}
          <div className="space-y-4">
            {/* Scale Numbers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
              {likertScale.map((value) => (
                <div key={value} className="text-center">
                  <span className="text-xs font-medium text-gray-500">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Response Buttons */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6">
              {likertScale.map((value) => (
                <button
                  key={value}
                  onClick={() => onAnswerChange(value)}
                  className={`
                    h-10 sm:h-12 w-full rounded-lg border-2 transition-all duration-200 
                    flex items-center justify-center font-semibold text-sm
                    touch-manipulation
                    ${currentAnswer === value 
                      ? 'bg-purple-600 border-purple-600 text-white shadow-md transform scale-105' 
                      : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50 active:bg-purple-100'
                    }
                  `}
                  aria-label={`${translations.likertLabels[value]} (${value})`}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Scale Labels - Responsive */}
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span className="max-w-[80px] sm:max-w-none text-center sm:text-left">
                {translations.likertLabels[1]}
              </span>
              <span className="hidden sm:inline text-center">
                {translations.likertLabels[4]}
              </span>
              <span className="max-w-[80px] sm:max-w-none text-center sm:text-right">
                {translations.likertLabels[7]}
              </span>
            </div>

            {/* Mobile-only middle label */}
            <div className="sm:hidden text-center">
              <span className="text-xs text-gray-500">
                {translations.likertLabels[4]}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-3 sm:gap-4">
        <Button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          variant="outline"
          className="flex-1 sm:flex-none px-4 sm:px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm sm:text-base"
        >
          {translations.previous}
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="flex-1 sm:flex-none px-4 sm:px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 text-sm sm:text-base"
        >
          {questionNumber === totalQuestions ? translations.submit : translations.next}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;