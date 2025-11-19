import React, { useState, useCallback } from 'react';
import { Question, QuizResult } from '../types';
import Timer from './Timer';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  onFinish: (result: QuizResult) => void;
}

const TOTAL_TIME = 120; // 2 minutes in seconds

const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);

  const handleTimeUp = useCallback(() => {
    // Calculate score
    let score = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswerIndex) {
        score++;
      }
    });
    
    onFinish({
      totalQuestions: questions.length,
      score,
      userAnswers,
      questions
    });
  }, [questions, userAnswers, onFinish]);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleTimeUp();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col h-full min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 sticky top-4 z-10 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl">
        <div>
          <h2 className="text-sm text-indigo-300 font-semibold uppercase tracking-wider">Question</h2>
          <p className="text-2xl font-bold text-white">{currentQuestionIndex + 1} <span className="text-slate-500 text-lg">/ {questions.length}</span></p>
        </div>
        <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} onTimeUp={handleTimeUp} />
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-800/50 border border-indigo-500/20 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm flex-grow flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h3 className="text-xl md:text-2xl font-medium text-white mb-8 leading-relaxed">
          {currentQuestion.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = userAnswers[currentQuestionIndex] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                className={`group relative p-4 md:p-5 rounded-xl text-left transition-all duration-200 border-2 flex items-center
                  ${isSelected 
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'bg-slate-900/50 border-slate-700 hover:border-indigo-400/50 hover:bg-slate-800'
                  }
                `}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 transition-colors
                   ${isSelected ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-500 text-slate-500 group-hover:border-indigo-300'}
                `}>
                  {isSelected ? <CheckCircle2 size={16} /> : <span className="text-sm font-bold">{String.fromCharCode(65 + idx)}</span>}
                </div>
                <span className={`text-base md:text-lg ${isSelected ? 'text-white font-medium' : 'text-slate-300'}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-8 flex justify-end">
           <button
            onClick={handleNext}
            disabled={userAnswers[currentQuestionIndex] === -1}
            className={`flex items-center px-8 py-3 rounded-full font-bold text-lg transition-all duration-300
              ${userAnswers[currentQuestionIndex] !== -1
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg hover:shadow-indigo-500/25 scale-100'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed grayscale'
              }
            `}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Exam' : 'Next Question'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;