import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Image, X, Send, Trash2, Edit3 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

export const Feed: React.FC = () => {
  const { posts, users, user, addPost, editPost, deletePost, likePost, addComment, t, language } = useApp();

  const [newContent, setNewContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'image' | 'video'; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [openCommentsId, setOpenCommentsId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const locale = language === 'PT' ? ptBR : enUS;

  const handlePost = () => {
    if (!newContent.trim() && !selectedMedia) return;
    addPost(newContent, selectedMedia || undefined);
    setNewContent('');
    setSelectedMedia(null);
  };

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const type = file.type.startsWith('video') ? 'video' : 'image';
      const url = URL.createObjectURL(file);
      setSelectedMedia({ type, url });
    }
  };

  const handleSaveEdit = (postId: string) => {
    editPost(postId, editContent);
    setEditingId(null);
    setEditContent('');
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    addComment(postId, commentText);
    setCommentText('');
  };

  const getUserById = (userId: string) => users.find((u) => u.id === userId);

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold text-foreground">Feed</h1>
      </div>

      {/* Create Post */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="flex-1">
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder={t.writeSomething}
              className="w-full resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none min-h-[60px]"
              rows={2}
            />

            {selectedMedia && (
              <div className="relative mt-2 rounded-xl overflow-hidden">
                {selectedMedia.type === 'image' ? (
                  <img src={selectedMedia.url} alt="Preview" className="w-full max-h-48 object-cover" />
                ) : (
                  <video src={selectedMedia.url} controls className="w-full max-h-48" />
                )}
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white hover:bg-black/80"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors"
              >
                <Image size={20} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleMediaSelect}
                className="hidden"
              />
              <Button
                onClick={handlePost}
                disabled={!newContent.trim() && !selectedMedia}
                className="gradient-primary px-6 h-9 text-sm font-semibold"
              >
                {t.post}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="divide-y divide-border">
        {posts.map((post) => {
          const author = getUserById(post.userId);
          if (!author) return null;

          const isOwnPost = user?.id === post.userId;
          const hasLiked = user ? post.likes.includes(user.id) : false;

          return (
            <article key={post.id} className="p-4 animate-fade-in">
              {/* Post Header */}
              <div className="flex items-start gap-3">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground truncate">{author.name}</span>
                    <span className="text-muted-foreground text-sm">@{author.username}</span>
                    <span className="text-muted-foreground text-xs">
                      · {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale })}
                    </span>
                  </div>

                  {/* Content */}
                  {editingId === post.id ? (
                    <div className="mt-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-3 bg-muted rounded-xl text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                      />
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" onClick={() => handleSaveEdit(post.id)} className="gradient-primary">
                          {t.saveChanges}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                          {t.cancel}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1 text-foreground whitespace-pre-wrap">{post.content}</p>
                  )}

                  {/* Media */}
                  {post.media && (
                    <div className="mt-3 rounded-xl overflow-hidden">
                      {post.media.type === 'image' ? (
                        <img src={post.media.url} alt="" className="w-full object-cover max-h-80" />
                      ) : (
                        <video src={post.media.url} controls className="w-full max-h-80" />
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-6 mt-3">
                    <button
                      onClick={() => likePost(post.id)}
                      className={`flex items-center gap-1.5 text-sm transition-colors ${
                        hasLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                      }`}
                    >
                      <Heart size={18} fill={hasLiked ? 'currentColor' : 'none'} />
                      <span>{post.likes.length}</span>
                    </button>

                    <button
                      onClick={() => setOpenCommentsId(openCommentsId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span>{post.comments.length}</span>
                    </button>

                    <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>

                  {/* Comments */}
                  {openCommentsId === post.id && (
                    <div className="mt-4 space-y-3 animate-slide-up">
                      {post.comments.map((comment) => {
                        const commentAuthor = getUserById(comment.userId);
                        return (
                          <div key={comment.id} className="flex gap-2">
                            <img
                              src={commentAuthor?.avatar}
                              alt=""
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div className="bg-muted rounded-xl px-3 py-2 flex-1">
                              <span className="font-medium text-sm text-foreground">
                                {commentAuthor?.name}
                              </span>
                              <p className="text-sm text-foreground">{comment.text}</p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="flex gap-2 items-center">
                        <img
                          src={user?.avatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            placeholder={t.writeComment}
                            className="w-full bg-muted rounded-full px-4 py-2 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:opacity-80"
                          >
                            <Send size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* More Options */}
                {isOwnPost && (
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === post.id ? null : post.id)}
                      className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {menuOpenId === post.id && (
                      <div className="absolute right-0 top-8 bg-card border border-border rounded-xl shadow-lg py-1 min-w-[140px] z-50 animate-scale-in">
                        <button
                          onClick={() => {
                            setEditingId(post.id);
                            setEditContent(post.content);
                            setMenuOpenId(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted"
                        >
                          <Edit3 size={16} /> {t.edit}
                        </button>
                        <button
                          onClick={() => {
                            setConfirmDeleteId(post.id);
                            setMenuOpenId(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-muted"
                        >
                          <Trash2 size={16} /> {t.delete}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Delete Confirmation */}
              {confirmDeleteId === post.id && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-card rounded-2xl p-6 w-full max-w-sm animate-scale-in">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{t.delete}?</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Esta ação não pode ser desfeita.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        onClick={() => setConfirmDeleteId(null)}
                        className="flex-1"
                      >
                        {t.cancel}
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          deletePost(post.id);
                          setConfirmDeleteId(null);
                        }}
                        className="flex-1"
                      >
                        {t.delete}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
