import React from 'react';
import { Brain, Heart, Briefcase, Users, Zap, Sparkles, Lightbulb, MessageCircle, Flame, Star } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
}

const topics: Topic[] = [
  { id: 'all', name: 'Todos', icon: Sparkles, color: 'bg-primary' },
  { id: 'trending', name: 'Em Alta', icon: Flame, color: 'bg-orange-500' },
  { id: 'mental', name: 'Saúde Mental', icon: Brain, color: 'bg-violet-500' },
  { id: 'emotional', name: 'Emocional', icon: Heart, color: 'bg-pink-500' },
  { id: 'career', name: 'Carreira', icon: Briefcase, color: 'bg-emerald-500' },
  { id: 'relationships', name: 'Relacionamentos', icon: Users, color: 'bg-blue-500' },
  { id: 'motivation', name: 'Motivação', icon: Zap, color: 'bg-amber-500' },
  { id: 'tips', name: 'Dicas', icon: Lightbulb, color: 'bg-cyan-500' },
  { id: 'discussion', name: 'Discussão', icon: MessageCircle, color: 'bg-indigo-500' },
  { id: 'achievements', name: 'Conquistas', icon: Star, color: 'bg-yellow-500' },
];

interface TopicSelectorProps {
  selectedTopic: string;
  onSelectTopic: (topicId: string) => void;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({ selectedTopic, onSelectTopic }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {topics.map((topic) => {
        const Icon = topic.icon;
        const isSelected = selectedTopic === topic.id;
        
        return (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              isSelected
                ? `${topic.color} text-white shadow-md`
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon size={14} />
            <span>{topic.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export const getTopics = () => topics;
