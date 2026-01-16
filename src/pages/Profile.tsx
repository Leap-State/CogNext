import React, { useState } from 'react';
import { Settings, MapPin, Calendar, Shield, Edit3, LogOut, ChevronRight, Globe } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppLanguage } from '@/types';

export const Profile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, users, posts, results, logout, updateUser, t, language, setLanguage } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    age: user?.age?.toString() || '',
  });

  const profileUser = id ? users.find((u) => u.id === id) : user;
  const isOwnProfile = !id || id === user?.id;

  if (!profileUser) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Usuário não encontrado</p>
      </div>
    );
  }

  const userPosts = posts.filter((p) => p.userId === profileUser.id);
  const userResults = results.filter((r) => r.userId === profileUser.id);

  const handleSave = () => {
    updateUser({
      name: editData.name,
      bio: editData.bio,
      age: parseInt(editData.age) || user?.age,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const languages: { code: AppLanguage; name: string; flag: string }[] = [
    { code: AppLanguage.PT, name: 'Português', flag: '🇧🇷' },
    { code: AppLanguage.EN, name: 'English', flag: '🇺🇸' },
    { code: AppLanguage.ES, name: 'Español', flag: '🇪🇸' },
    { code: AppLanguage.FR, name: 'Français', flag: '🇫🇷' },
    { code: AppLanguage.DE, name: 'Deutsch', flag: '🇩🇪' },
    { code: AppLanguage.IT, name: 'Italiano', flag: '🇮🇹' },
  ];

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">{t.profile}</h1>
        {isOwnProfile && (
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
          >
            <Settings size={20} />
          </button>
        )}
      </div>

      {/* Settings Panel */}
      {showSettings && isOwnProfile && (
        <div className="p-4 bg-muted/50 border-b border-border animate-slide-up">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Globe size={18} />
            {t.language}
          </h3>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  language === lang.code
                    ? 'gradient-primary text-white'
                    : 'bg-card text-foreground hover:bg-muted border border-border'
                }`}
              >
                {lang.flag} {lang.name}
              </button>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 text-destructive hover:opacity-80 transition-opacity"
          >
            <LogOut size={18} />
            <span className="font-medium">{t.logout}</span>
          </button>
        </div>
      )}

      {/* Profile Info */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <img
            src={profileUser.avatar}
            alt={profileUser.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20"
          />
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  placeholder={t.displayName}
                />
                <Input
                  value={editData.age}
                  onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                  type="number"
                  placeholder={t.age}
                />
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  placeholder={t.bio}
                  className="w-full bg-muted rounded-lg p-3 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" className="gradient-primary">
                    {t.saveChanges}
                  </Button>
                  <Button onClick={() => setIsEditing(false)} size="sm" variant="ghost">
                    {t.cancel}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-foreground">{profileUser.name}</h2>
                  {profileUser.isPrivate && (
                    <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-md text-xs font-medium flex items-center gap-1">
                      <Shield size={12} /> {t.privateProfile}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">@{profileUser.username}</p>
                {isOwnProfile && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-2 text-primary text-sm font-medium flex items-center gap-1 hover:opacity-80"
                  >
                    <Edit3 size={14} /> {t.edit}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {!isEditing && (
          <>
            <p className="mt-4 text-foreground leading-relaxed">{profileUser.bio}</p>
            <div className="flex gap-4 mt-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> Global
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {t.joined} 2023
              </span>
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border-b border-border">
        <div className="py-4 text-center border-r border-border">
          <p className="text-2xl font-bold text-foreground">{userPosts.length}</p>
          <p className="text-muted-foreground text-sm">Posts</p>
        </div>
        <div className="py-4 text-center border-r border-border">
          <p className="text-2xl font-bold text-foreground">{userResults.length}</p>
          <p className="text-muted-foreground text-sm">Testes</p>
        </div>
        <div className="py-4 text-center">
          <p className="text-2xl font-bold text-foreground">
            {userPosts.reduce((acc, p) => acc + p.likes.length, 0)}
          </p>
          <p className="text-muted-foreground text-sm">Curtidas</p>
        </div>
      </div>

      {/* Recent Tests */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-3">{t.recentTests || 'Testes Recentes'}</h3>
        {userResults.length > 0 ? (
          <div className="space-y-3">
            {userResults.slice(0, 3).map((result) => (
              <div
                key={result.id}
                className="bg-muted rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{result.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Pontuação: {result.score}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground" size={20} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">{t.noTests}</p>
        )}
      </div>

      {/* Recent Posts */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-3">Posts Recentes</h3>
        {userPosts.length > 0 ? (
          <div className="space-y-3">
            {userPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-muted rounded-xl p-4">
                <p className="text-foreground line-clamp-2">{post.content}</p>
                <div className="flex gap-4 mt-2 text-muted-foreground text-sm">
                  <span>❤️ {post.likes.length}</span>
                  <span>💬 {post.comments.length}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">{t.noPosts}</p>
        )}
      </div>
    </div>
  );
};
