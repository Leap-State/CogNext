import React from 'react';
import { Star, Trophy, TrendingUp, Award } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const Highlights: React.FC = () => {
  const { t, users, results } = useApp();

  // Mock highlights data
  const topScorers = [
    { userId: '1', testType: 'IQ', score: 142, rank: 1 },
    { userId: '2', testType: 'EQ', score: 95, rank: 2 },
    { userId: '3', testType: 'Personality', score: 'INTJ', rank: 3 },
  ];

  const achievements = [
    { id: '1', title: 'Primeiro Teste', description: 'Complete seu primeiro teste', icon: Star, earned: true },
    { id: '2', title: 'Gênio', description: 'Obtenha 140+ no QI', icon: Trophy, earned: false },
    { id: '3', title: 'Consistente', description: 'Complete 5 testes', icon: TrendingUp, earned: false },
    { id: '4', title: 'Explorador', description: 'Complete todos os tipos de testes', icon: Award, earned: false },
  ];

  const getUserById = (userId: string) => users.find((u) => u.id === userId);

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          {t.highlights}
        </h1>
      </div>

      {/* Leaderboard */}
      <div className="p-4">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Top Performers
        </h2>
        <div className="space-y-3">
          {topScorers.map((scorer, index) => {
            const user = getUserById(scorer.userId);
            if (!user) return null;

            return (
              <div
                key={scorer.userId}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  index === 0
                    ? 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-2 border-amber-500/30'
                    : 'bg-muted'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    index === 0
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                      : index === 1
                      ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white'
                      : 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                  }`}
                >
                  {scorer.rank}
                </div>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{scorer.testType}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground text-lg">{scorer.score}</p>
                  <p className="text-xs text-muted-foreground">pontos</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="p-4">
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Conquistas
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-2xl border transition-all ${
                  achievement.earned
                    ? 'bg-primary/10 border-primary/30'
                    : 'bg-muted border-border opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    achievement.earned ? 'gradient-primary' : 'bg-muted-foreground/20'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <h3 className={`font-semibold text-sm ${achievement.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {achievement.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="p-4">
        <div className="gradient-primary rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <p className="text-white/80 text-sm font-medium mb-1">🔥 Desafio Semanal</p>
            <h3 className="text-xl font-bold mb-2">Complete 3 Testes</h3>
            <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-2">
              <div className="bg-white h-full rounded-full w-1/3 transition-all" />
            </div>
            <p className="text-white/80 text-sm">1 de 3 completos</p>
          </div>
        </div>
      </div>
    </div>
  );
};
