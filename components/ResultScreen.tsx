import React from 'react';
import { QuizResult } from '../types';
import { RefreshCcw, Award, AlertCircle, Check, X } from 'lucide-react';

interface ResultScreenProps {
  result: QuizResult;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  let message = "";
  let colorClass = "";
  
  if (percentage >= 80) {
    message = "Excellent! You're ready for clinicals.";
    colorClass = "text-emerald-400";
  } else if (percentage >= 60) {
    message = "Good job, but review your venous drainage.";
    colorClass = "text-yellow-400";
  } else {
    message = "Study hard! Vascular anatomy is critical.";
    colorClass = "text-red-400";
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12 animate-in zoom-in duration-500">
        <div className="inline-block p-4 rounded-full bg-slate-800 mb-4 border border-slate-700 shadow-2xl">
          <Award className={`w-16 h-16 ${colorClass}`} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Exam Complete</h1>
        <p className={`text-xl font-medium ${colorClass}`}>{message}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl text-center backdrop-blur-sm">
          <p className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-2">Score</p>
          <p className={`text-4xl font-bold ${colorClass}`}>{percentage}%</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl text-center backdrop-blur-sm">
          <p className="text-slate-400 uppercase text-xs font-bold tracking-widest mb-2">Correct Answers</p>
          <p className="text-4xl font-bold text-white">{result.score} <span className="text-lg text-slate-500">/ {result.totalQuestions}</span></p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl text-center backdrop-blur-sm flex flex-col items-center justify-center">
             <button 
              onClick={onRestart}
              className="flex items-center justify-center px-6 py-3 bg-white text-indigo-900 hover:bg-indigo-50 font-bold rounded-full transition-colors w-full"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try Again
            </button>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2">Review Answers</h2>
        {result.questions.map((q, idx) => {
          const userAnswer = result.userAnswers[idx];
          const isCorrect = userAnswer === q.correctAnswerIndex;
          
          return (
            <div key={idx} className={`p-6 rounded-2xl border ${isCorrect ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${isCorrect ? 'bg-emerald-500 border-emerald-400' : 'bg-red-500 border-red-400'}`}>
                  {isCorrect ? <Check size={18} className="text-white" /> : <X size={18} className="text-white" />}
                </div>
                <div className="flex-grow">
                  <p className="text-lg font-medium text-white mb-4">{q.question}</p>
                  
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      let optClass = "text-slate-400";
                      let icon = null;

                      if (optIdx === q.correctAnswerIndex) {
                        optClass = "text-emerald-400 font-bold"; // Correct answer always green
                        icon = <Check className="inline w-4 h-4 ml-2" />;
                      } else if (optIdx === userAnswer && !isCorrect) {
                        optClass = "text-red-400 font-semibold line-through"; // Wrong user selection
                      }

                      return (
                        <div key={optIdx} className={`text-sm ${optClass}`}>
                          {String.fromCharCode(65 + optIdx)}. {opt} {icon}
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded-lg border border-indigo-500/10">
                    <div className="flex items-center text-indigo-400 text-sm font-bold mb-1">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Explanation
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultScreen;