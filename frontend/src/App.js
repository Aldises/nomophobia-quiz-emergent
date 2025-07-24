import React, { useState, useEffect } from 'react';
import './App.css';
import { questions, translations } from './data/questions';
import LanguageSelector from './components/LanguageSelector';
import QuizQuestion from './components/QuizQuestion';
import QuizResults from './components/QuizResults';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  // Load saved state from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nomophobia_language');
    const savedQuestion = localStorage.getItem('nomophobia_current_question');
    const savedAnswers = localStorage.getItem('nomophobia_answers');

    if (savedLanguage) setCurrentLanguage(savedLanguage);
    if (savedQuestion) setCurrentQuestion(parseInt(savedQuestion));
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('nomophobia_language', currentLanguage);
    localStorage.setItem('nomophobia_current_question', currentQuestion.toString());
    localStorage.setItem('nomophobia_answers', JSON.stringify(answers));
  }, [currentLanguage, currentQuestion, answers]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleAnswerChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calculate final score and show results
      const score = Object.values(answers).reduce((total, answer) => total + answer, 0);
      setTotalScore(score);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTotalScore(0);
    localStorage.removeItem('nomophobia_current_question');
    localStorage.removeItem('nomophobia_answers');
  };

  const canGoNext = answers[currentQuestion] !== undefined;
  const canGoPrevious = currentQuestion > 0;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4 sm:mb-6">
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
                translations={translations}
              />
            </div>
            
            {/* Logo Placeholder */}
            <div className="mb-6 sm:mb-8">
              <div className="w-28 h-12 sm:w-32 sm:h-16 mx-auto bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-lg sm:text-xl">DECLICK</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 px-2">
              {translations[currentLanguage].title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 px-2">
              {translations[currentLanguage].subtitle}
            </p>
          </div>

          <QuizResults 
            score={totalScore}
            onRestart={handleRestart}
            translations={translations[currentLanguage]}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              translations={translations}
            />
          </div>
          
          {/* Logo Placeholder */}
          <div className="mb-6 sm:mb-8">
            <div className="w-28 h-12 sm:w-32 sm:h-16 mx-auto bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg sm:text-xl">DECLICK</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 px-2">
            {translations[currentLanguage].title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 px-2">
            {translations[currentLanguage].subtitle}
          </p>
        </div>

        {/* Quiz */}
        <QuizQuestion
          question={questions[currentQuestion]}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          currentAnswer={answers[currentQuestion]}
          onAnswerChange={handleAnswerChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          translations={translations[currentLanguage]}
          language={currentLanguage}
        />
      </div>
    </div>
  );
}

export default App;