import React, { useState } from 'react';
import { Brain, Heart, Briefcase, Users, Zap, Activity, Sparkles, ChevronRight, Search } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { TestType } from '@/types';

interface TestCardProps {
  type: TestType;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  onClick: () => void;
}

const TestCard: React.FC<TestCardProps> = ({ title, description, icon: Icon, gradient, onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-left group"
  >
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-base">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
    </div>
  </button>
);

export const Discover: React.FC = () => {
  const { t } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'IQ' | 'QUIZ' | 'OTHERS'>('IQ');

  const tests = [
    {
      type: 'IQ' as TestType,
      title: t.tests?.iq || 'IQ Test',
      description: 'Avalie sua inteligência cognitiva com desafios lógicos e matemáticos.',
      icon: Brain,
      color: 'indigo',
      gradient: 'gradient-primary',
      category: 'IQ',
    },
    {
      type: 'EQ' as TestType,
      title: t.tests?.eq || 'Emotional Intelligence',
      description: 'Descubra sua capacidade de entender e gerenciar emoções.',
      icon: Heart,
      color: 'pink',
      gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
      category: 'OTHERS',
    },
    {
      type: 'PERSONALITY' as TestType,
      title: t.tests?.personality || 'Personality',
      description: 'Conheça seu tipo de personalidade baseado em traços únicos.',
      icon: Users,
      color: 'purple',
      gradient: 'bg-gradient-to-br from-purple-500 to-violet-500',
      category: 'QUIZ',
    },
    {
      type: 'VOCATIONAL' as TestType,
      title: t.tests?.vocational || 'Vocational Test',
      description: 'Encontre a carreira ideal para seu perfil.',
      icon: Briefcase,
      color: 'green',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-500',
      category: 'QUIZ',
    },
    {
      type: 'NEURO' as TestType,
      title: t.tests?.neuro || 'Neuro Assessment',
      description: 'Avalie funções cognitivas como memória e atenção.',
      icon: Zap,
      color: 'yellow',
      gradient: 'bg-gradient-to-br from-amber-500 to-orange-500',
      category: 'IQ',
    },
    {
      type: 'PSYCH' as TestType,
      title: t.tests?.psych || 'Psychological Assessment',
      description: 'Obtenha insights sobre seu bem-estar mental.',
      icon: Activity,
      color: 'cyan',
      gradient: 'bg-gradient-to-br from-cyan-500 to-blue-500',
      category: 'OTHERS',
    },
  ];

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = test.category === activeTab;
    return searchQuery ? matchesSearch : matchesTab;
  });

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          {t.discover}
        </h1>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full bg-muted rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Tabs */}
      {!searchQuery && (
        <div className="px-4 mb-4">
          <div className="flex bg-muted rounded-xl p-1">
            <button
              onClick={() => setActiveTab('IQ')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'IQ'
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              QI
            </button>
            <button
              onClick={() => setActiveTab('QUIZ')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'QUIZ'
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Quiz
            </button>
            <button
              onClick={() => setActiveTab('OTHERS')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'OTHERS'
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Outros
            </button>
          </div>
        </div>
      )}

      {/* Tests Grid */}
      <div className="px-4 space-y-3">
        {filteredTests.length > 0 ? (
          filteredTests.map((test) => (
            <TestCard
              key={test.type}
              {...test}
              onClick={() => navigate(`/test/${test.type.toLowerCase()}`)}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t.noResults}</p>
          </div>
        )}
      </div>

      {/* Featured Banner */}
      <div className="p-4 mt-4">
        <div className="gradient-primary rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <h3 className="text-lg font-bold mb-2">🧠 Teste Completo de QI</h3>
            <p className="text-white/80 text-sm mb-4">
              Descubra seu potencial cognitivo com nosso teste mais completo.
            </p>
            <button
              onClick={() => navigate('/test/iq')}
              className="bg-white text-primary px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              {t.startNow || 'Começar Agora'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
