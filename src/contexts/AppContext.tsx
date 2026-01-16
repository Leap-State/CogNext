import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Post, TestResult, Chat, AppLanguage, Comment } from '@/types';
import { getTranslation } from '@/lib/translations';

type AppContextType = {
  user: User | null;
  users: User[];
  posts: Post[];
  results: TestResult[];
  chats: Chat[];
  language: AppLanguage;
  login: (username: string, password: string) => boolean;
  register: (user: Omit<User, 'id'> & { password: string }) => boolean;
  logout: () => void;
  setLanguage: (lang: AppLanguage) => void;
  updateUser: (updates: Partial<User>) => void;
  addPost: (content: string, media?: { type: 'image' | 'video'; url: string }) => void;
  editPost: (id: string, content: string) => void;
  deletePost: (id: string) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  addResult: (result: Omit<TestResult, 'id' | 'date'>) => void;
  t: Record<string, any>;
};

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Maria Silva',
    username: 'maria',
    email: 'maria@email.com',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    password: '123456',
    isPrivate: false,
    bio: 'Apaixonada por psicologia e autoconhecimento 🧠✨',
    dailyMood: 'great',
  },
  {
    id: '2',
    name: 'João Santos',
    username: 'joao',
    email: 'joao@email.com',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    password: '123456',
    isPrivate: false,
    bio: 'Desenvolvedor e curioso sobre a mente humana.',
  },
  {
    id: '3',
    name: 'Ana Costa',
    username: 'ana',
    email: 'ana@email.com',
    age: 22,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    password: '123456',
    isPrivate: true,
    bio: 'Estudante de psicologia 📚',
  },
];

const defaultPosts: Post[] = [
  {
    id: '1',
    userId: '1',
    content: 'Acabei de fazer o teste de QI e fiquei surpresa com o resultado! 🧠 Quem mais já fez?',
    likes: ['2', '3'],
    comments: [
      { id: '1', userId: '2', text: 'Também fiz! Muito interessante!', timestamp: new Date().toISOString() },
    ],
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    userId: '2',
    content: 'O teste de personalidade me definiu perfeitamente. Sou INTJ! Alguém mais?',
    likes: ['1'],
    comments: [],
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [posts, setPosts] = useState<Post[]>(defaultPosts);
  const [results, setResults] = useState<TestResult[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [language, setLanguage] = useState<AppLanguage>(AppLanguage.PT);

  const t = getTranslation(language);

  useEffect(() => {
    const savedUser = localStorage.getItem('cognext_user');
    const savedLang = localStorage.getItem('cognext_language');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedLang) {
      setLanguage(savedLang as AppLanguage);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => (u.username === username || u.email === username) && u.password === password
    );
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('cognext_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (newUser: Omit<User, 'id'> & { password: string }): boolean => {
    const exists = users.some((u) => u.username === newUser.username || u.email === newUser.email);
    if (exists) return false;

    const userWithId: User = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers((prev) => [...prev, userWithId]);
    const { password: _, ...userWithoutPassword } = userWithId;
    setUser(userWithoutPassword as User);
    localStorage.setItem('cognext_user', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cognext_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? updatedUser : u)));
    localStorage.setItem('cognext_user', JSON.stringify(updatedUser));
  };

  const addPost = (content: string, media?: { type: 'image' | 'video'; url: string }) => {
    if (!user) return;
    const newPost: Post = {
      id: Date.now().toString(),
      userId: user.id,
      content,
      media,
      likes: [],
      comments: [],
      timestamp: new Date().toISOString(),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const editPost = (id: string, content: string) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, content } : p)));
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const likePost = (postId: string) => {
    if (!user) return;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const hasLiked = p.likes.includes(user.id);
          return {
            ...p,
            likes: hasLiked ? p.likes.filter((id) => id !== user.id) : [...p.likes, user.id],
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!user) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      text,
      timestamp: new Date().toISOString(),
    };
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
  };

  const addResult = (result: Omit<TestResult, 'id' | 'date'>) => {
    const newResult: TestResult = {
      ...result,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setResults((prev) => [newResult, ...prev]);
  };

  const handleSetLanguage = (lang: AppLanguage) => {
    setLanguage(lang);
    localStorage.setItem('cognext_language', lang);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        users,
        posts,
        results,
        chats,
        language,
        login,
        register,
        logout,
        setLanguage: handleSetLanguage,
        updateUser,
        addPost,
        editPost,
        deletePost,
        likePost,
        addComment,
        addResult,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
