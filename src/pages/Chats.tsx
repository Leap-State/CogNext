import React, { useState } from 'react';
import { Search, MessageCircle, Send, ChevronLeft, MoreVertical } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useParams, useNavigate } from 'react-router-dom';

export const Chats: React.FC = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const { t, users, user } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');

  // Mock chats data
  const mockChats = [
    {
      id: '1',
      participants: ['1', '2'],
      lastMessage: 'Olá! Como você foi no teste?',
      lastActivity: new Date(Date.now() - 300000).toISOString(),
      unread: 2,
    },
    {
      id: '2',
      participants: ['1', '3'],
      lastMessage: 'Parabéns pelo resultado!',
      lastActivity: new Date(Date.now() - 7200000).toISOString(),
      unread: 0,
    },
  ];

  const mockMessages = [
    { id: '1', senderId: '2', content: 'Oi! Vi que você fez o teste de QI', timestamp: new Date(Date.now() - 600000).toISOString() },
    { id: '2', senderId: user?.id || '1', content: 'Sim! Foi bem interessante', timestamp: new Date(Date.now() - 550000).toISOString() },
    { id: '3', senderId: '2', content: 'Qual foi seu resultado?', timestamp: new Date(Date.now() - 500000).toISOString() },
    { id: '4', senderId: user?.id || '1', content: 'Consegui 125! E você?', timestamp: new Date(Date.now() - 450000).toISOString() },
    { id: '5', senderId: '2', content: 'Olá! Como você foi no teste?', timestamp: new Date(Date.now() - 300000).toISOString() },
  ];

  const getUserById = (userId: string) => users.find((u) => u.id === userId);

  const getChatPartner = (participants: string[]) => {
    const partnerId = participants.find((id) => id !== user?.id);
    return partnerId ? getUserById(partnerId) : null;
  };

  // Chat Detail View
  if (chatId) {
    const chat = mockChats.find((c) => c.id === chatId);
    const partner = chat ? getChatPartner(chat.participants) : null;

    if (!partner) {
      return (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Conversa não encontrada</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-screen">
        {/* Chat Header */}
        <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/chats')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <img
            src={partner.avatar}
            alt={partner.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-semibold text-foreground">{partner.name}</p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {mockMessages.map((message) => {
            const isOwn = message.senderId === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    isOwn
                      ? 'gradient-primary text-white rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="sticky bottom-16 bg-card border-t border-border p-4">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="flex-1 bg-muted rounded-full px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              disabled={!messageText.trim()}
              className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white disabled:opacity-50 transition-opacity"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Chats List View
  const filteredChats = mockChats.filter((chat) => {
    const partner = getChatPartner(chat.participants);
    return partner?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-lg border-b border-border px-4 py-3">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          {t.chats}
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

      {/* Chats List */}
      <div className="divide-y divide-border">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => {
            const partner = getChatPartner(chat.participants);
            if (!partner) return null;

            return (
              <button
                key={chat.id}
                onClick={() => navigate(`/chats/${chat.id}`)}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="relative">
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-foreground">{partner.name}</p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(chat.lastActivity).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-muted-foreground truncate pr-4">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 rounded-full gradient-primary text-white text-xs flex items-center justify-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">{t.noResults}</p>
          </div>
        )}
      </div>
    </div>
  );
};
