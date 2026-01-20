import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Brain, Heart, Briefcase, Users, Zap, Activity, Share2, Shuffle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { TestType } from '@/types';
import { getScoreLabel } from '@/lib/scoreLabels';
import { testQuestions, testInfo } from '@/data/testQuestions';

const testIcons: Record<string, React.ElementType> = {
  iq: Brain,
  eq: Heart,
  personality: Users,
  vocational: Briefcase,
  neuro: Zap,
  psych: Activity,
};

// Função para embaralhar array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const TestRunner: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const { t, addResult, user } = useApp();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  const testType = type?.toLowerCase() || 'iq';
  const info = testInfo[testType] || testInfo.iq;
  const Icon = testIcons[testType] || Brain;
  
  // Embaralha e seleciona 10 perguntas aleatórias
  const questions = useMemo(() => {
    const allQuestions = testQuestions[testType] || testQuestions.iq;
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, Math.min(10, shuffled.length));
  }, [testType]);

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correct = 0;
      questions.forEach((q, i) => {
        if (newAnswers[i] === q.correctIndex) correct++;
      });
      const finalScore = Math.round((correct / questions.length) * 100);
      setScore(finalScore);
      setIsComplete(true);

      // Save result
      if (user) {
        addResult({
          userId: user.id,
          type: testType.toUpperCase() as TestType,
          score: finalScore,
          details: { answers: newAnswers, correct },
          title: info.title,
        });
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    const scoreInfo = getScoreLabel(testType, score);
    
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/discover')} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">{info.title}</h1>
        </div>

        {/* Result */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-scale-in">
          <div className={`w-24 h-24 rounded-full ${info.gradient} flex items-center justify-center mb-6 shadow-lg`}>
            <span className="text-4xl">{scoreInfo.emoji}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">{scoreInfo.label}</h2>
          <p className="text-muted-foreground mb-6 max-w-xs">{scoreInfo.description}</p>
          
          <div className="relative w-40 h-40 mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeDasharray={`${score * 2.83} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{score}%</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{t.yourScore || 'Sua pontuação'}</p>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button
              onClick={() => {
                const shareText = `🧠 Fiz o ${info.title} no CogNext e meu resultado foi: ${scoreInfo.emoji} ${scoreInfo.label}! Faça o seu também!`;
                if (navigator.share) {
                  navigator.share({ text: shareText });
                } else {
                  navigator.clipboard.writeText(shareText);
                }
              }}
              className="w-full gradient-primary"
            >
              <Share2 size={18} className="mr-2" />
              Compartilhar Resultado
            </Button>
            
            <div className="flex gap-3">
              <Button
                onClick={() => navigate('/discover')}
                variant="outline"
                className="flex-1"
              >
                {t.back || 'Voltar'}
              </Button>
              <Button
                onClick={() => navigate('/profile')}
                variant="outline"
                className="flex-1"
              >
                Ver Perfil
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate('/discover')} className="text-muted-foreground hover:text-foreground">
            <ChevronLeft size={24} />
          </button>
          <div className={`w-8 h-8 rounded-lg ${info.gradient} flex items-center justify-center`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">{info.title}</h1>
          <span className="ml-auto text-sm text-muted-foreground">
            {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 p-6 animate-fade-in">
        <div className="mb-8">
          <p className="text-xl font-semibold text-foreground leading-relaxed">
            {question.text}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className="w-full p-4 bg-card border-2 border-border rounded-xl text-left text-foreground font-medium hover:border-primary hover:bg-primary/5 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
