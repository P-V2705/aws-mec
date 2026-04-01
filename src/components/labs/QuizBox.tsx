import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizBoxProps {
  questions: Question[];
  onComplete: () => void;
}

export default function QuizBox({ questions, onComplete }: QuizBoxProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const correct = index === questions[currentQuestion].correctIndex;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10 space-y-8 bg-purple-600/10 rounded-3xl border border-purple-500/30"
      >
        <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center text-purple-300 mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
          <Trophy size={40} />
        </div>
        <div>
          <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-2">Quiz Complete!</h3>
          <p className="text-blue-200/70 text-xl font-medium">You scored {score} out of {questions.length}</p>
        </div>
        <div className="pt-6 px-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
          >
            Claim Reward <ArrowRight size={20} />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</h3>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`w-8 h-1.5 rounded-full ${i <= currentQuestion ? 'bg-purple-500' : 'bg-gray-700'}`} />
          ))}
        </div>
      </div>

      <h4 className="text-2xl font-bold text-white leading-tight">{q.question}</h4>

      <div className="grid grid-cols-1 gap-4">
        {q.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrectOption = index === q.correctIndex;
          
          let borderColor = 'border-purple-500/20';
          let bgColor = 'bg-black/20';
          let textColor = 'text-blue-200/70';

          if (selectedOption !== null) {
            if (isCorrectOption) {
              borderColor = 'border-green-500';
              bgColor = 'bg-green-500/10';
              textColor = 'text-green-400';
            } else if (isSelected && !isCorrectOption) {
              borderColor = 'border-red-500';
              bgColor = 'bg-red-500/10';
              textColor = 'text-red-400';
            } else {
              borderColor = 'border-gray-800';
              bgColor = 'bg-black/10';
              textColor = 'text-gray-600';
            }
          } else {
            borderColor = 'hover:border-purple-500/50 hover:bg-purple-500/10';
            textColor = 'hover:text-white';
          }

          return (
            <motion.button
              key={index}
              whileHover={selectedOption === null ? { x: 10 } : {}}
              onClick={() => handleOptionSelect(index)}
              className={`p-6 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${borderColor} ${bgColor} ${textColor}`}
            >
              <span className="text-lg font-bold">{option}</span>
              {selectedOption !== null && isCorrectOption && <CheckCircle2 size={24} className="text-green-500" />}
              {selectedOption !== null && isSelected && !isCorrectOption && <XCircle size={24} className="text-red-500" />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedOption !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
