export enum AppLanguage {
  PT = 'PT',
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  DE = 'DE',
  IT = 'IT',
  RU = 'RU',
  CN = 'CN'
}

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  age: number;
  avatar: string;
  password?: string;
  isPrivate: boolean;
  bio: string;
  dailyMood?: string;
};

export type TestType = 'QUIZ' | 'IQ' | 'EQ' | 'VOCATIONAL' | 'PERSONALITY' | 'RELATIONSHIP' | 'NEURO' | 'PSYCH';

export type Question = {
  id: number;
  text: string;
  visual?: string;
  keywords?: string[];
  category?: string;
  options?: string[];
  correctIndex?: number;
  weights?: Record<string, number>[];
};

export type TestResult = {
  id: string;
  userId: string;
  type: TestType;
  score: number | string;
  details: Record<string, any>;
  analysis?: string;
  date: string;
  title: string;
};

export type Comment = {
  id: string;
  userId: string;
  text: string;
  timestamp: string;
};

export type Post = {
  id: string;
  userId: string;
  content: string;
  media?: { type: 'image' | 'video'; url: string };
  likes: string[];
  comments: Comment[];
  timestamp: string;
  linkedResult?: string;
};

export type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
};

export type Chat = {
  id: string;
  participants: string[];
  messages: Message[];
  lastActivity: string;
};
