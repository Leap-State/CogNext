import React, { useState } from 'react';
import { Brain, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Login: React.FC = () => {
  const { login, register, t } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    age: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (!formData.username || !formData.password) {
        setError(t.fillAll);
        return;
      }
      const success = login(formData.username, formData.password);
      if (!success) {
        setError(t.loginError);
      }
    } else {
      if (!formData.username || !formData.email || !formData.password || !formData.name) {
        setError(t.fillAll);
        return;
      }
      const success = register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        age: parseInt(formData.age) || 18,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
        isPrivate: false,
        bio: '',
      });
      if (!success) {
        setError(t.userExists);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gradient-secondary">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary shadow-primary mb-4 animate-bounce-in">
            <Brain className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">CogNext</h1>
          <p className="text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-primary" />
            {t.unlock}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl p-6 shadow-xl animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.name}</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.name}
                  className="h-12"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.username}</label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder={t.username}
                className="h-12"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.email}</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.email}
                  className="h-12"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t.password}</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t.age}</label>
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="18"
                  min="13"
                  max="120"
                  className="h-12"
                />
              </div>
            )}

            {error && (
              <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded-lg animate-scale-in">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full h-12 text-base font-semibold gradient-primary hover:opacity-90 transition-opacity">
              {isLogin ? t.enter : t.createAccount}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-primary text-sm font-medium hover:underline"
            >
              {isLogin ? t.noAccount : `${t.enter}?`}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
