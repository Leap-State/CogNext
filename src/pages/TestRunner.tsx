import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Brain, Heart, Briefcase, Users, Zap, Activity } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { TestType, Question } from '@/types';

const testQuestions: Record<string, Question[]> = {
  iq: [
    { id: 1, text: 'Qual número vem a seguir: 2, 4, 8, 16, ?', options: ['24', '32', '28', '20'], correctIndex: 1 },
    { id: 2, text: 'Se CASA = 4, PORTA = 5, então JANELA = ?', options: ['5', '6', '7', '8'], correctIndex: 1 },
    { id: 3, text: 'Complete a sequência: A, C, E, G, ?', options: ['H', 'I', 'J', 'K'], correctIndex: 1 },
    { id: 4, text: 'Qual figura completa o padrão? ○□△ ○□△ ○□?', options: ['○', '□', '△', '◇'], correctIndex: 2 },
    { id: 5, text: 'Se 3 + 5 = 16, 4 + 6 = 24, então 5 + 7 = ?', options: ['32', '35', '36', '40'], correctIndex: 2 },
  ],
  eq: [
    { id: 1, text: 'Quando alguém te critica, você geralmente:', options: ['Fico muito chateado(a)', 'Reflito sobre o feedback', 'Ignoro completamente', 'Contra-ataco'], correctIndex: 1 },
    { id: 2, text: 'Em situações de estresse, você:', options: ['Respiro fundo e analiso', 'Fico ansioso(a)', 'Evito pensar nisso', 'Procuro ajuda'], correctIndex: 0 },
    { id: 3, text: 'Quando um amigo está triste, você:', options: ['Tento animá-lo(a)', 'Escuto atentamente', 'Dou espaço', 'Dou conselhos'], correctIndex: 1 },
    { id: 4, text: 'Como você lida com conflitos?', options: ['Evito a todo custo', 'Busco compromisso', 'Imponho minha visão', 'Deixo o tempo resolver'], correctIndex: 1 },
    { id: 5, text: 'Você consegue identificar suas emoções facilmente?', options: ['Sempre', 'Geralmente', 'Às vezes', 'Raramente'], correctIndex: 0 },
  ],
  personality: [
    { id: 1, text: 'Em festas, você prefere:', options: ['Conversar com muitas pessoas', 'Ficar com amigos próximos', 'Observar de longe', 'Depende do humor'], correctIndex: 0 },
    { id: 2, text: 'Ao tomar decisões, você confia mais em:', options: ['Lógica e fatos', 'Intuição e sentimentos', 'Experiências passadas', 'Opiniões de outros'], correctIndex: 0 },
    { id: 3, text: 'Você se considera mais:', options: ['Planejador(a)', 'Espontâneo(a)', 'Ambos igualmente', 'Nenhum dos dois'], correctIndex: 0 },
    { id: 4, text: 'Em trabalhos em grupo, você prefere:', options: ['Liderar', 'Colaborar', 'Trabalhar independente', 'Depende da tarefa'], correctIndex: 0 },
    { id: 5, text: 'Como você recarrega suas energias?', options: ['Socializando', 'Ficando sozinho(a)', 'Praticando hobbies', 'Descansando'], correctIndex: 0 },
  ],
  vocational: [
    { id: 1, text: 'Qual área mais te interessa?', options: ['Tecnologia', 'Saúde', 'Artes', 'Negócios'], correctIndex: 0 },
    { id: 2, text: 'Você prefere trabalhar com:', options: ['Dados e números', 'Pessoas', 'Ideias criativas', 'Processos'], correctIndex: 0 },
    { id: 3, text: 'Ambiente de trabalho ideal:', options: ['Escritório estruturado', 'Remoto/Flexível', 'Externo/Campo', 'Laboratório'], correctIndex: 0 },
    { id: 4, text: 'O que mais te motiva?', options: ['Dinheiro', 'Impacto social', 'Reconhecimento', 'Crescimento pessoal'], correctIndex: 0 },
    { id: 5, text: 'Como você resolve problemas?', options: ['Analiticamente', 'Criativamente', 'Colaborativamente', 'Intuitivamente'], correctIndex: 0 },
  ],
  neuro: [
    { id: 1, text: 'Lembre-se desta sequência: 7, 3, 9, 1. Qual era o segundo número?', options: ['7', '3', '9', '1'], correctIndex: 1 },
    { id: 2, text: 'Qual palavra NÃO pertence ao grupo: Maçã, Banana, Cenoura, Laranja?', options: ['Maçã', 'Banana', 'Cenoura', 'Laranja'], correctIndex: 2 },
    { id: 3, text: 'Se "gato" é para "felino", então "cachorro" é para:', options: ['Canino', 'Animal', 'Pet', 'Mamífero'], correctIndex: 0 },
    { id: 4, text: 'Quantos segundos há em 2 minutos e 30 segundos?', options: ['130', '150', '160', '180'], correctIndex: 1 },
    { id: 5, text: 'Qual é o resultado de 15 - 7 + 3 × 2?', options: ['14', '22', '16', '12'], correctIndex: 0 },
  ],
  psych: [
    { id: 1, text: 'Nas últimas semanas, você se sentiu mais:', options: ['Animado(a)', 'Normal', 'Ansioso(a)', 'Triste'], correctIndex: 0 },
    { id: 2, text: 'Como está seu sono?', options: ['Ótimo', 'Regular', 'Irregular', 'Ruim'], correctIndex: 0 },
    { id: 3, text: 'Você tem conseguido se concentrar?', options: ['Muito bem', 'Bem', 'Com dificuldade', 'Muito difícil'], correctIndex: 0 },
    { id: 4, text: 'Como está seu nível de energia?', options: ['Alto', 'Normal', 'Baixo', 'Muito baixo'], correctIndex: 0 },
    { id: 5, text: 'Você se sente satisfeito(a) com sua vida?', options: ['Muito', 'Moderadamente', 'Pouco', 'Nada'], correctIndex: 0 },
  ],
};

const testInfo: Record<string, { title: string; icon: React.ElementType; gradient: string }> = {
  iq: { title: 'Teste de QI', icon: Brain, gradient: 'gradient-primary' },
  eq: { title: 'Inteligência Emocional', icon: Heart, gradient: 'bg-gradient-to-br from-pink-500 to-rose-500' },
  personality: { title: 'Personalidade', icon: Users, gradient: 'bg-gradient-to-br from-purple-500 to-violet-500' },
  vocational: { title: 'Teste Vocacional', icon: Briefcase, gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500' },
  neuro: { title: 'Neuroavaliação', icon: Zap, gradient: 'bg-gradient-to-br from-amber-500 to-orange-500' },
  psych: { title: 'Avaliação Psicológica', icon: Activity, gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500' },
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
  const questions = testQuestions[testType] || testQuestions.iq;
  const info = testInfo[testType] || testInfo.iq;
  const Icon = info.icon;

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
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Teste Completo!</h2>
          <p className="text-muted-foreground mb-8">{t.yourScore || 'Sua pontuação'}:</p>
          
          <div className="relative w-40 h-40 mb-8">
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

          <div className="flex gap-3 w-full max-w-xs">
            <Button
              onClick={() => navigate('/discover')}
              variant="outline"
              className="flex-1"
            >
              {t.back || 'Voltar'}
            </Button>
            <Button
              onClick={() => navigate('/profile')}
              className="flex-1 gradient-primary"
            >
              Ver Perfil
            </Button>
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
