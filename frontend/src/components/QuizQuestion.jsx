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
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {translations.question} {questionNumber} {translations.of} {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-600">
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
      <Card className="mb-8 border-2 border-gray-100 shadow-lg">
        <CardContent className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 leading-relaxed mb-8">
            {question[language]}
          </h2>

          {/* Likert Scale */}
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {likertScale.map((value) => (
                <div key={value} className="text-center">
                  <span className="text-xs font-medium text-gray-500">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-6">
              {likertScale.map((value) => (
                <button
                  key={value}
                  onClick={() => onAnswerChange(value)}
                  className={`
                    h-12 w-full rounded-lg border-2 transition-all duration-200 
                    flex items-center justify-center font-semibold text-sm
                    ${currentAnswer === value 
                      ? 'bg-purple-600 border-purple-600 text-white shadow-md transform scale-105' 
                      : 'bg-white border-gray-300 text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                    }
                  `}
                  aria-label={`${translations.likertLabels[value]} (${value})`}
                >
                  {value}
                </button>
              ))}
            </div>

            {/* Scale Labels */}
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>{translations.likertLabels[1]}</span>
              <span>{translations.likertLabels[4]}</span>
              <span>{translations.likertLabels[7]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          variant="outline"
          className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {translations.previous}
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!canGoNext}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
        >
          {questionNumber === totalQuestions ? translations.submit : translations.next}
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestion;